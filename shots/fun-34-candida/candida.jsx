// Shot Fungi Mati #34 · La levadura que puedes compartir con tu pareja: Candida albicans — NARRADO (N1 Por dentro, gancho 2).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.
// Escalas: micro de la lengua 30 px/µm · formas 40 px/µm · epitelio 10 px/µm. Levadura ovalada ≈ 5 × 4 µm; hifa de paredes paralelas ≈ 2 µm de ancho.

const CA = { lev:'#fff4d6', lev2:'#f1dfae', hifa:'#fff4d6', piel:'#f2c29b', piel2:'#c98e6a', labio:'#e0607a', boca:'#5a1424', lengua:'#ff8fa3', encia:'#ff9fb2', placa:'#fffdf5', celula:'#f6b6a3', nucleo:'#a8516a' };

// Levadura ovalada con su brote (gemación). (x, y) = centro de la célula madre. brote 0..1.
function Levadura({ x, y, rx = 75, ry = 60, rot = 0, brote = 0, s = 1, op = 1, color = CA.lev }) {
  if (s <= 0) return null;
  const br = brote * 0.55;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
    {brote > 0 && <ellipse cx={-rx * 0.62 - rx * br * 0.55} cy={-ry * 0.62 - ry * br * 0.55} rx={rx * br} ry={ry * br} fill={color} stroke={KC.ink} strokeWidth={5} />}
    <ellipse rx={rx} ry={ry} fill={color} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-rx * 0.3} cy={-ry * 0.35} rx={rx * 0.28} ry={ry * 0.16} fill="#fff" opacity=".7" />
    <ellipse cx={rx * 0.15} cy={ry * 0.15} rx={rx * 0.32} ry={ry * 0.3} fill={CA.lev2} opacity=".7" />
  </g>;
}
// Hifa recta de paredes paralelas que sale de (x, y) con ángulo ang (grados). largo en px, ancho en px. septos cada `paso` px.
function Hifa({ x, y, ang = 0, largo, ancho = 60, paso = 170, color = CA.hifa }) {
  if (largo <= 2) return null;
  const n = Math.floor((largo - ancho) / paso);
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <rect x={-ancho / 2} y={-ancho / 2} width={largo + ancho / 2} height={ancho} rx={ancho / 2} fill={color} stroke={KC.ink} strokeWidth={Math.max(3, ancho / 10)} />
    <line x1={0} y1={-ancho * 0.22} x2={largo - ancho * 0.4} y2={-ancho * 0.22} stroke="#fff" strokeWidth={Math.max(2, ancho / 9)} opacity=".6" strokeLinecap="round" />
    {Array.from({ length: Math.max(0, n) }, (_, i) => <line key={i} x1={paso * (i + 1)} y1={-ancho / 2 + 2} x2={paso * (i + 1)} y2={ancho / 2 - 2} stroke={KC.ink} strokeWidth={Math.max(2, ancho / 14)} />)}
  </g>;
}
// Cara de frente, dormida sobre la almohada, con la boca entreabierta.
function Cara({ T, x, y, s = 1, pelo = '#3a2418', piel = CA.piel, largo = false, seed = 1 }) {
  const resp = 1 + Math.sin(T * 2.2 + seed) * 0.06;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {largo && <path d="M -120 -40 Q -150 120 -100 170 L 100 170 Q 150 120 120 -40 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />}
    <ellipse rx={105} ry={125} fill={piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -108 -20 Q -110 -140 0 -135 Q 110 -140 108 -20 Q 70 -90 0 -88 Q -70 -90 -108 -20 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />
    <path d="M -58 -5 Q -40 8 -22 -5 M 22 -5 Q 40 8 58 -5" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <ellipse cx={-62} cy={30} rx={18} ry={10} fill="#ff8fa3" opacity=".6" /><ellipse cx={62} cy={30} rx={18} ry={10} fill="#ff8fa3" opacity=".6" />
    <ellipse cx={0} cy={62} rx={22} ry={16 * resp} fill={CA.boca} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Burbuja que sale de la boca y muestra lo de adentro al microscopio.
function Burbuja({ x, y, r = 95, s = 1, desde, children }) {
  if (s <= 0) return null;
  return <g>
    {desde && <path d={`M ${desde[0]} ${desde[1]} L ${x} ${y + r * s * 0.9}`} stroke={KC.ink} strokeWidth={5} strokeDasharray="4 12" strokeLinecap="round" opacity={s} />}
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r={r} fill={KC.noche} stroke={KC.ink} strokeWidth={8} />
      <circle r={r - 8} fill="none" stroke={KC.white} strokeWidth={4} opacity=".85" />
      {children}
    </g>
  </g>;
}
// Almohada + cobija con las dos caras (gancho y cierre).
function Cama({ T, colchon = '#f7f3ff' }) {
  return <>
    <rect x={40} y={880} width={1000} height={290} rx={90} fill={colchon} stroke={KC.ink} strokeWidth={8} />
    <path d="M 120 920 Q 540 880 960 920" stroke="#d9d2ee" strokeWidth={8} fill="none" />
    <Cara T={T} x={320} y={1010} s={0.95} seed={1} />
    <Cara T={T} x={760} y={1020} s={0.95} pelo="#7a3b1c" piel="#e7b08a" largo seed={2} />
    <path d="M 0 1130 Q 540 1080 1080 1130 L 1080 1240 L 0 1240 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 1150 Q 540 1100 1080 1150" stroke="#6f86ff" strokeWidth={8} fill="none" />
  </>;
}
// Silueta de cuerpo con boca, intestino y piel encendidos.
function Cuerpo({ T, prog }) {
  const g = (i) => kprog(prog, i * 0.25, i * 0.25 + 0.3, kEase.rebote);
  const brillo = 0.6 + 0.4 * Math.sin(T * 5);
  return <g transform="translate(380 0)">
    <circle cx={0} cy={560} r={92} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <path d="M -130 680 Q 0 640 130 680 L 150 960 L 95 960 L 95 1180 L 15 1180 L 0 990 L -15 1180 L -95 1180 L -95 960 L -150 960 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {/* intestino */}
    <path d="M -60 820 Q -80 760 0 765 Q 80 760 60 820 Q 70 870 0 865 Q -70 870 -50 830 Q -30 800 20 815 Q 40 850 -5 850" stroke="#e98aa0" strokeWidth={20} fill="none" strokeLinecap="round" opacity={0.4 + 0.6 * g(1)} />
    {/* boca */}
    <ellipse cx={0} cy={600} rx={34} ry={18} fill={CA.boca} stroke={KC.ink} strokeWidth={5} />
    {[[0, 600, 0], [0, 815, 1], [-120, 760, 2], [130, 900, 2], [-60, 1100, 2], [70, 1120, 2], [-10, 500, 2]].map(([x, y, k], i) => {
      const s = g(k); return s > 0 ? <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
        <circle r={40} fill={KC.yellow} opacity={0.35 * brillo} />
        <Levadura x={0} y={0} rx={14} ry={11} brote={0.6} />
      </g> : null; })}
  </g>;
}
const LEV_LENGUA = [[260, 720, 10], [700, 860, -20], [430, 1010, 30], [860, 1080, 5]];
const LEV_NUEVAS = [[330, 640, 40], [190, 820, -10], [560, 760, 15], [620, 1040, -30], [300, 1100, 20], [800, 700, 60], [930, 920, 0], [470, 900, -40], [120, 1000, 10], [760, 1160, 25]];
const BACTS = (() => { const r = krng(34); return Array.from({ length: 26 }, (_, i) => [80 + r() * 920, 520 + r() * 680, r() * 180, i % 3]); })();
// Bebé (ícono)
function IcoBebe() {
  return <g>
    <circle r={90} fill={CA.piel} stroke={KC.ink} strokeWidth={7} />
    <path d="M -20 -88 Q 0 -120 20 -88" stroke={KC.ink} strokeWidth={6} fill="none" />
    <path d="M -45 -10 Q -32 2 -19 -10 M 19 -10 Q 32 2 45 -10" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={42} r={26} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={42} r={10} fill={KC.white} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Dentadura postiza (ícono): encía rosa en herradura con dientes blancos, arriba y abajo.
function IcoDentadura() {
  const fila = (y, dir) => <g transform={`translate(0 ${y})`}>
    <path d={`M -95 0 Q -95 ${dir * 60} 0 ${dir * 62} Q 95 ${dir * 60} 95 0 Z`} fill={CA.encia} stroke={KC.ink} strokeWidth={6} />
    {[-70, -42, -14, 14, 42, 70].map((dx, i) => <rect key={i} x={dx - 13} y={dir > 0 ? -30 : 0} width={26} height={30} rx={8} fill={KC.white} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
  return <g>{fila(-14, -1)}{fila(14, 1)}</g>;
}
function IcoCapsula() {
  return <g transform="rotate(-35)">
    <rect x={-100} y={-38} width={100} height={76} rx={38} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <rect x={0} y={-38} width={100} height={76} rx={38} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
    <rect x={-80} y={-24} width={60} height={12} rx={6} fill="#fff" opacity=".5" />
  </g>;
}
// Inhalador (ícono): cartucho metálico + carcasa en L con boquilla y una nube.
function IcoInhalador({ T }) {
  const p = (T * 0.8) % 1;
  return <g>
    <rect x={-28} y={-110} width={56} height={110} rx={14} fill="#c3ccd6" stroke={KC.ink} strokeWidth={6} />
    <path d="M -45 -30 L 45 -30 L 45 60 L 100 60 L 100 110 L -45 110 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[0, 1, 2].map((i) => <circle key={i} cx={120 + p * 40 + i * 18} cy={84 - i * 10} r={12 + p * 8} fill="#fff" opacity={(1 - p) * 0.8} />)}
  </g>;
}
// Ratón (ícono).
function Raton({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 70 20 Q 140 30 150 -20" stroke={KC.ink} strokeWidth={6} fill="none" />
    <ellipse cx={0} cy={0} rx={85} ry={52} fill="#e8e4ef" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-60} cy={-50} r={26} fill="#e8e4ef" stroke={KC.ink} strokeWidth={6} /><circle cx={-60} cy={-50} r={12} fill="#ffb3c4" />
    <circle cx={-72} cy={-8} r={7} fill={KC.ink} /><circle cx={-98} cy={8} r={8} fill="#ff8fa3" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Boca abierta vista de frente (macro): labios, cachetes por dentro, lengua y placas blancas.
function BocaGrande({ T, x = 520, y = 860, placas = 0, algodon = 0 }) {
  const P = [[-150, 60, 46, 26], [-40, 110, 60, 30], [90, 70, 50, 24], [10, 30, 36, 20], [-90, 150, 40, 22], [140, 150, 42, 22], [-300, -40, 40, 60], [-320, 90, 34, 48], [300, -30, 40, 60], [315, 80, 34, 46]];
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={430} ry={330} fill={CA.labio} stroke={KC.ink} strokeWidth={10} />
    <ellipse rx={370} ry={270} fill={CA.boca} stroke={KC.ink} strokeWidth={7} />
    {/* cachetes por dentro (paredes) */}
    <path d="M -370 0 Q -300 -200 -200 -250 L -250 230 Q -340 160 -370 0 Z" fill="#c4475e" opacity=".8" />
    <path d="M 370 0 Q 300 -200 200 -250 L 250 230 Q 340 160 370 0 Z" fill="#c4475e" opacity=".8" />
    {/* dientes de arriba */}
    <path d="M -260 -205 Q 0 -250 260 -205 L 250 -170 Q 0 -205 -250 -170 Z" fill={KC.white} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={-190} r={0} />
    {/* lengua */}
    <path d="M -250 270 Q -260 -40 0 -60 Q 260 -40 250 270 Z" fill={CA.lengua} stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -30 L 0 200" stroke="#e86b82" strokeWidth={8} strokeLinecap="round" />
    {P.map(([px, py, rx, ry], i) => { const s = kprog(placas, i / P.length * 0.8, i / P.length * 0.8 + 0.2, kEase.rebote); return s > 0 ? <g key={i} transform={`translate(${px} ${py}) scale(${s})`}>
      <ellipse rx={rx} ry={ry} fill={CA.placa} stroke="#cfc6b0" strokeWidth={4} />
      <circle cx={-rx * 0.4} cy={-ry * 0.2} r={ry * 0.5} fill={CA.placa} stroke="#cfc6b0" strokeWidth={3} />
      <circle cx={rx * 0.35} cy={ry * 0.1} r={ry * 0.45} fill={CA.placa} stroke="#cfc6b0" strokeWidth={3} />
    </g> : null; })}
    {algodon > 0 && <g transform={`translate(${klerp(600, 0, algodon)} ${klerp(-400, 20, algodon)}) scale(${0.6 + 0.4 * algodon}) rotate(${Math.sin(T * 2) * 4})`}>
      {[[-70, 0, 70], [0, -40, 80], [70, 0, 70], [0, 30, 75], [-30, -10, 60], [40, -20, 55]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" stroke="#d7d2c8" strokeWidth={5} />)}
      {[[-70, 0, 66], [0, -40, 76], [70, 0, 66], [0, 30, 71]].map(([cx, cy, r], i) => <circle key={'b' + i} cx={cx} cy={cy} r={r} fill="#fff" />)}
    </g>}
  </g>;
}

function CandidaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Casa, V: CUES.Vecinas, Ab: CUES.Antibiotico, Tr: CUES.Truco, Fo: CUES.Formas, P: CUES.Pregunta, In: CUES.Invade, Es: CUES.Estudio, Tx: CUES.Toxina, Pl: CUES.Placas, Q: CUES.Quien, Al: CUES.Algodon, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const burb = kprog(T, K.G + 0.25, K.G + 0.75, kEase.rebote);
  const capX = klerp(-200, 1300, kprog(T, K.Ab + 0.2, K.Ab + 1.8, kEase.suave));
  const hifaF = kprog(T, K.Fo + 0.2, K.Fo + 3.0, kEase.sale);      // la hifa se alarga (40 px/µm)
  const hifaIn = kprog(T, K.In + 0.3, K.In + 2.6, kEase.sale);     // la hifa entra a la célula (10 px/µm)
  const rompe = kprog(T, K.Tx + 0.2, K.Tx + 2.0);                  // la membrana se daña
  const QUIEN = [['recién nacidos', IcoBebe], ['dentadura postiza', IcoDentadura], ['antibióticos', IcoCapsula], ['inhalador de corticoides', IcoInhalador]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú y tu pareja, la misma levadura en la boca */}
      <Escena T={T} a={K.G} b={K.Ca} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cama T={T} />
          <Burbuja x={300} y={790} s={burb} desde={[320, 1072]}><Levadura x={0} y={0} rx={50} ry={40} rot={-10} brote={kprog(T, K.G + 0.8, K.G + 3.5)} /></Burbuja>
          <Burbuja x={740} y={800} s={kprog(T, K.G + 0.45, K.G + 0.95, kEase.rebote)} desde={[760, 1082]}><Levadura x={0} y={0} rx={50} ry={40} rot={-10} brote={kprog(T, K.G + 1.0, K.G + 3.7)} /></Burbuja>
          {T > K.G + 1.2 && <text x={520} y={830} textAnchor="middle" style={{ font:`400 ${130 * kprog(T, K.G + 1.2, K.G + 1.6, kEase.rebote)}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8}>=</text>}
        </>)}
      </Escena>
      {/* 2 · vive en la boca, el intestino y la piel */}
      <Escena T={T} a={K.Ca} b={K.V} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Cuerpo T={T} prog={kprog(T, K.Ca + 0.2, K.Ca + 2.6)} />)}
      </Escena>
      {/* 3–4 · al microscopio en tu lengua: las bacterias la mantienen a raya… hasta el antibiótico */}
      <Escena T={T} a={K.V} b={K.Tr} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          {BACTS.map(([x, y, r, c], i) => { const vida = 1 - kprog(T, K.Ab + 0.2 + (x + 200) / 1500 * 1.6, K.Ab + 0.6 + (x + 200) / 1500 * 1.6); const e = kprog(T, K.V - 0.3 + i * 0.03, K.V + 0.1 + i * 0.03, kEase.rebote);
            return e > 0 && vida > 0.02 ? <Bacteria key={i} T={T} x={x + Math.sin(T * 1.3 + i) * 8} y={y + Math.cos(T * 1.1 + i) * 8} rot={r + Math.sin(T + i) * 10} s={0.62 * e} color={[KC.mint, KC.cyan, KC.lilac][c]} vida={vida} seed={i} flagelo={c === 0} /> : null; })}
          {LEV_LENGUA.map(([x, y, r], i) => <Levadura key={i} x={x} y={y} rx={75} ry={60} rot={r} brote={0.3 + 0.2 * Math.sin(T + i)} s={kprog(T, K.V - 0.3, K.V + 0.3, kEase.rebote)} />)}
          {LEV_NUEVAS.map(([x, y, r], i) => { const s = kprog(T, K.Ab + 1.8 + i * 0.2, K.Ab + 2.2 + i * 0.2, kEase.rebote); return s > 0 ? <Levadura key={i} x={x} y={y} rx={75} ry={60} rot={r} brote={kprog(T, K.Ab + 2.2 + i * 0.2, K.Ab + 3.2 + i * 0.2)} s={s} /> : null; })}
          {T > K.Ab && T < K.Ab + 2.2 && <g transform={`translate(${capX} 600) rotate(-20)`}>
            <rect x={-110} y={-42} width={110} height={84} rx={42} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
            <rect x={0} y={-42} width={110} height={84} rx={42} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
            <path d={`M -130 -60 Q -300 0 -130 60`} stroke={KC.white} strokeWidth={10} fill="none" opacity=".5" />
          </g>}
        </>)}
      </Escena>
      {/* 5–6 · su truco: de levadura ovalada a hifa (40 px/µm) */}
      <Escena T={T} a={K.Tr} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Hifa x={300} y={860} ang={0} largo={hifaF * 620} ancho={80} paso={200} />
          <Levadura x={230} y={860} rx={100} ry={80} rot={0} brote={kprog(T, K.Tr - 0.3, K.Tr + 1.4)} s={kprog(T, K.Tr - 0.4, K.Tr + 0.2, kEase.rebote)} />
          {T < K.Fo + 0.6 && <g opacity={1 - kprog(T, K.Fo, K.Fo + 0.6)}>
            <path d="M 420 700 Q 560 600 700 700" stroke={KC.yellow} strokeWidth={10} fill="none" strokeLinecap="round" opacity={kprog(T, K.Tr + 0.5, K.Tr + 0.9)} />
            <path d="M 700 700 l -40 -6 m 40 6 l -14 -38" stroke={KC.yellow} strokeWidth={10} fill="none" strokeLinecap="round" opacity={kprog(T, K.Tr + 0.5, K.Tr + 0.9)} />
          </g>}
        </>)}
      </Escena>
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.In} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 8–10 · por dentro de la boca: la hifa entra, suelta candidalisina y daña la membrana (10 px/µm) */}
      <Escena T={T} a={K.In} b={K.Pl}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {[0, 1, 2].map((fila) => [0, 1, 2, 3, 4].map((col) => { const x = -80 + col * 260 + (fila % 2) * 130, y = 800 + fila * 140; const blanco = fila === 0 && col === 2;
            const gris = blanco ? kprog(T, K.Tx + 1.0, K.Tx + 2.4) : 0;
            return <g key={fila + '-' + col}>
              <rect x={x} y={y} width={250} height={130} rx={30} fill={mixHex(CA.celula, '#7d8089', gris)} stroke={blanco ? (rompe > 0 ? KC.red : KC.ink) : KC.ink} strokeWidth={blanco ? 7 : 5}
                strokeDasharray={blanco && rompe > 0 ? `${klerp(700, 40, rompe)} ${klerp(0, 30, rompe)}` : undefined} />
              <ellipse cx={x + 125} cy={y + 68} rx={34} ry={22} fill={mixHex(CA.nucleo, '#55585f', gris)} stroke={KC.ink} strokeWidth={4} />
            </g>; }))}
          {/* levaduras sobre la superficie: ovaladas, ≈ 5 µm */}
          {[[180, 774, 0], [270, 778, 20], [770, 772, -15], [880, 776, 5]].map(([x, y, r], i) => <Levadura key={i} x={x} y={y} rx={28} ry={22} rot={r} brote={i % 2 ? 0.7 : 0} />)}
          {/* la que se vuelve hifa (≈ 2 µm de ancho) y entra a la célula */}
          <Hifa x={540} y={770} ang={78} largo={hifaIn * 220} ancho={20} paso={90} />
          <Levadura x={520} y={762} rx={28} ry={22} rot={0} />
          {/* candidalisina: sale de la punta de la hifa */}
          {T > K.Es + 2.4 && Array.from({ length: 16 }, (_, i) => { const u = ((T - K.Es - 2.4) * 0.5 + i / 16) % 1; const a = i * 2.4; const tipX = 540 + Math.cos(78 * Math.PI / 180) * 220, tipY = 770 + Math.sin(78 * Math.PI / 180) * 220;
            const sal = kprog(T, K.Es + 2.4 + i * 0.08, K.Es + 2.7 + i * 0.08);
            return sal > 0 ? <circle key={i} cx={tipX + Math.cos(a) * (20 + u * 110)} cy={tipY + Math.sin(a) * (14 + u * 60)} r={7 * sal} fill={KC.red} stroke={KC.ink} strokeWidth={2} opacity={1 - u * 0.6} /> : null; })}
          {/* ratón sin la toxina: no enferma */}
          {T > K.Tx + 2.2 && <g opacity={kprog(T, K.Tx + 2.2, K.Tx + 2.6)}>
            <rect x={70} y={430} width={560} height={250} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
            <Raton x={220} y={570} s={kprog(T, K.Tx + 2.2, K.Tx + 2.6, kEase.rebote)} />
            <g transform="translate(400 530)"><Hifa x={0} y={0} ang={0} largo={150} ancho={22} paso={90} /></g>
            <path d="M 400 600 L 560 600" stroke={KC.ink} strokeWidth={0} />
            <path d="M 450 500 L 520 570 M 520 500 L 450 570" stroke={KC.red} strokeWidth={12} strokeLinecap="round" opacity={kprog(T, K.Tx + 2.7, K.Tx + 3.0)} />
          </g>}
        </>)}
      </Escena>
      {/* 11 · de regreso a la boca (macro): algodoncillo */}
      <Escena T={T} a={K.Pl} b={K.Q} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<BocaGrande T={T} placas={kprog(T, K.Pl + 0.6, K.Pl + 3.6)} />)}
      </Escena>
      {/* 12 · a quién le pasa más (CDC) */}
      <Escena T={T} a={K.Q} b={K.Al}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{QUIEN.map(([t, Ico], i) => { const s = kprog(T, K.Q + 0.4 + i * 1.1, K.Q + 0.8 + i * 1.1, kEase.rebote); const x = i % 2 ? 770 : 300, y = i < 2 ? 640 : 980;
          return s > 0 ? <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <circle r={130} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <g transform="scale(0.95)"><Ico T={T} /></g>
          </g> : null; })}</>)}
        {QUIEN.map(([t], i) => <div key={i} style={{ position:'absolute', left:(i % 2 ? 770 : 300) - 230, width:460, top:(i < 2 ? 640 : 980) + 140, textAlign:'center', zIndex:30,
          font:`900 ${t.length > 20 ? 30 : 36}px ${KF.texto}`, color:KC.ink, opacity:kprog(T, K.Q + 0.6 + i * 1.1, K.Q + 0.9 + i * 1.1) }}>{t}</div>)}
      </Escena>
      {/* 13 · se siente como algodón */}
      <Escena T={T} a={K.Al} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<BocaGrande T={T} placas={1} algodon={kprog(T, K.Al + 0.2, K.Al + 1.2, kEase.sale)} />)}
      </Escena>
      {/* 14 · cierre: la misma cama del inicio; la levadura, tranquila entre sus bacterias */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Cama T={T} />
          {[[300, 790, 1072, 320], [740, 800, 1082, 760]].map(([x, y, dy, dx], j) => <Burbuja key={j} x={x} y={y} s={kprog(T, K.C + 0.3 + j * 0.2, K.C + 0.8 + j * 0.2, kEase.rebote)} desde={[dx, dy]}>
            <Levadura x={0} y={0} rx={34} ry={27} brote={0.4} />
            {[0, 1, 2, 3, 4, 5].map((i) => { const a = i / 6 * Math.PI * 2 + T * 0.4; return <Bacteria key={i} T={T} x={Math.cos(a) * 62} y={Math.sin(a) * 62} rot={a * 57 + 90} s={0.28 * kprog(T, K.C + 1.0 + i * 0.12, K.C + 1.3 + i * 0.12, kEase.rebote)} color={[KC.mint, KC.cyan, KC.lilac][i % 3]} seed={i} flagelo={false} />; })}
          </Burbuja>)}
          {T > K.C + 0.8 && <text x={520} y={830} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.C + 0.8, K.C + 1.2)}>=</text>}
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 1.0} until={K.Ca - 0.3} x={60} y={520} texto="Candida albicans" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.G + 1.5} until={K.Ca - 0.3} x={60} y={584} texto="una levadura (hongo)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 0.5} until={K.V - 0.3} x={500} y={600} texto="boca" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.0} until={K.V - 0.3} x={500} y={815} texto="intestino" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.5} until={K.V - 0.3} x={560} y={900} texto="piel" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ca + 2.4} until={K.V - 0.3} texto="casi siempre: sin síntomas" x={420} y={430} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.V - 0.2} until={K.Ab - 0.3} texto="AL MICROSCOPIO · tu lengua" x={400} y={440} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.V + 0.6} until={K.Ab - 0.2} x={335} y={720} texto="levadura" tam={30} color={CA.lev} />
      <Etq T={T} at={K.V + 1.0} until={K.Ab - 0.2} x={1000} y={1190} texto="bacterias" lado="izq" tam={30} color={KC.mint} />
      <Chip T={T} at={K.V + 1.6} until={K.Ab - 0.2} texto="hipótesis: compiten con ella" x={420} y={530} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Ab + 0.3} until={K.Ab + 1.8} x={60} y={520} texto="antibiótico" tam={34} color={KC.white} />
      <Chip T={T} at={K.Ab + 2.0} until={K.Tr - 0.3} texto="ella puede ganar terreno" x={400} y={440} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Tr + 0.2} until={K.P - 0.3} texto="cambia de forma (dimorfismo)" x={420} y={440} tam={34} borde={KC.yellow} />
      <Etq T={T} at={K.Fo + 0.3} until={K.P - 0.3} x={180} y={1010} texto="levadura (gemación)" tam={30} color={CA.lev} />
      <Etq T={T} at={K.Fo + 1.4} until={K.P - 0.3} x={640} y={980} texto="hifa" tam={36} color={KC.yellow} />
      <Chip T={T} at={K.In - 0.2} until={K.Es - 0.2} texto="POR DENTRO · la piel de tu boca" x={420} y={440} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.In + 0.4} until={K.Es + 2.2} x={160} y={700} texto="levadura" tam={28} color={CA.lev} />
      <Etq T={T} at={K.In + 1.6} until={K.Pl - 0.3} x={600} y={930} texto="hifa" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.In + 0.8} until={K.Pl - 0.3} x={60} y={1215} texto="células de tu boca" tam={28} color={KC.white} />
      <Chip T={T} at={K.In + 2.4} until={K.Es - 0.2} texto="la hifa invade" x={400} y={560} tam={38} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.6} anio="2016" quien="Londres y Jena (Alemania)" revista="Moyes et al., Nature" x={540} y={560} />
      <Etq T={T} at={K.Es + 3.0} until={K.Pl - 0.3} x={700} y={1060} texto="candidalisina" tam={32} color={KC.red} />
      <Chip T={T} at={K.Tx + 0.4} until={K.Tx + 2.1} texto="daña la membrana" x={400} y={560} tam={38} borde={KC.red} />
      <Etq T={T} at={K.Tx + 2.5} until={K.Pl - 0.3} x={660} y={500} texto="ratón" tam={28} color={KC.white} />
      <Chip T={T} at={K.Tx + 2.9} until={K.Pl - 0.3} texto="sin toxina: no enfermaba la boca" x={380} y={740} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.Pl + 1.0} until={K.Q - 0.3} x={60} y={470} texto="algodoncillo" tam={44} color={KC.ink} />
      <Etq T={T} at={K.Pl + 1.4} until={K.Q - 0.3} x={60} y={530} texto="(candidiasis oral)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pl + 2.4} until={K.Q - 0.3} x={140} y={1225} texto="placas en la lengua" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Pl + 3.0} until={K.Q - 0.3} x={60} y={600} texto="y en los cachetes" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Q + 0.1} until={K.Al - 0.3} texto="más común en… (CDC)" x={540} y={430} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Al + 0.6} until={K.C - 0.2} texto="se siente como algodón" x={400} y={440} tam={36} borde={KC.white} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="tus bacterias la mantienen a raya" x={420} y={560} tam={32} borde={KC.mint} />

      {/* barras de escala (cuadran con el dibujo) */}
      <BarraEscala T={T} at={K.G} until={K.Ca} texto="10 cm" largo={140} />
      <BarraEscala T={T} at={K.Ca} until={K.V} texto="50 cm" largo={195} />
      <BarraEscala T={T} at={K.V} until={K.Tr} texto="10 µm" largo={300} />
      <BarraEscala T={T} at={K.Tr} until={K.P} texto="10 µm" largo={400} />
      <BarraEscala T={T} at={K.In} until={K.Pl} texto="20 µm" largo={200} />
      <BarraEscala T={T} at={K.Pl} until={K.Q} texto="2 cm" largo={320} />
      <BarraEscala T={T} at={K.Al} until={K.C} texto="2 cm" largo={320} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={140} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="Tú y tu pareja: *la misma levadura.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.V - 0.1} texto="Boca, intestino y piel: *casi siempre sin molestar.*" />
      <Subtitulo T={T} idx={2} at={K.V + 0.1} until={K.Ab - 0.1} texto="Tus bacterias *la mantienen a raya.*" />
      <Subtitulo T={T} idx={3} at={K.Ab + 0.1} until={K.Tr - 0.1} texto="Un antibiótico fuerte *barre bacterias.*" />
      <Subtitulo T={T} idx={4} at={K.Tr + 0.1} until={K.Fo - 0.1} texto="Su truco: *cambia de forma.*" />
      <Subtitulo T={T} idx={5} at={K.Fo + 0.1} until={K.P - 0.1} texto="De bolitas a hilos: *las hifas.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.In - 0.1} texto="¿Por qué *importa la forma?*" />
      <Subtitulo T={T} idx={7} at={K.In + 0.1} until={K.Es - 0.1} texto="La hifa *se mete en tus células.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Tx - 0.1} texto="Una toxina: *la candidalisina.*" />
      <Subtitulo T={T} idx={9} at={K.Tx + 0.1} until={K.Pl - 0.1} texto="Daña la membrana *de tus células.*" />
      <Subtitulo T={T} idx={10} at={K.Pl + 0.1} until={K.Q - 0.1} texto="Placas blancas: *algodoncillo.*" />
      <Subtitulo T={T} idx={11} at={K.Q + 0.1} until={K.Al - 0.1} texto="Bebés, dentadura, antibióticos, *inhaladores.*" />
      <Subtitulo T={T} idx={12} at={K.Al + 0.1} until={K.C - 0.1} texto="Como *algodón en la boca.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es tu enemiga: *espera.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Ca + 0.7, K.V - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ab + 0.5, K.Tr - 0.25, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Tr + 0.25, K.P - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.In - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.In + 0.5, K.Es - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Tx + 0.4, K.Pl - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pl + 0.6, K.Q - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Al + 0.25, K.C - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="34" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CandidaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CandidaShot /></CompositionStage></div>;
}
window.CandidaApp = CandidaApp;
