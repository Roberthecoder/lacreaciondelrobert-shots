// Shot Químico #28 · Esto no es gelatina (el polvo superabsorbente del pañal) — NARRADO (N5 experimento + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const AGUA = '#9fd8ff', GEL = '#c6ecff', NA = '#b18cff', CL = '#7ee36a', CARGA = '#ff3b2f', CADENA = '#efe7d6', AMARRE = '#E8A62A';

// ---------- piezas del shot ----------
// Pañal de frente con una ventana recortada que deja ver la pelusa y los granitos de polvo.
function Panal({ T, x, y, s = 1, ventana = 1, corte = 0, rot = 0 }) {
  const R = krng(11);
  const granos = Array.from({ length: 26 }, () => [(R() - 0.5) * 250, (R() - 0.5) * 120, 5 + R() * 6]);
  const fibras = Array.from({ length: 14 }, () => [(R() - 0.5) * 260, (R() - 0.5) * 130, R() * 180]);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -300 -220 Q 0 -170 300 -220 L 270 -20 Q 180 60 200 220 Q 0 270 -200 220 Q -180 60 -270 -20 Z" fill="#ffffff" stroke={KC.ink} strokeWidth={11} strokeLinejoin="round" />
    <path d="M -230 -160 Q 0 -120 230 -160 L 205 -10 Q 140 60 150 170 Q 0 205 -150 170 Q -140 60 -205 -10 Z" fill="#f3eee2" stroke="#d9d2c2" strokeWidth={5} />
    {[-1, 1].map((k) => <rect key={k} x={k > 0 ? 250 : -330} y={-215} width={80} height={60} rx={14} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />)}
    {[-120, 0, 120].map((dx, i) => <circle key={i} cx={dx} cy={-150 + Math.abs(dx) * 0.05} r={13} fill={[KC.pink, KC.yellow, KC.mint][i]} stroke={KC.ink} strokeWidth={4} />)}
    {ventana > 0 && <g opacity={ventana}>
      <rect x={-150} y={-80} width={300} height={170} rx={20} fill="#fffaf0" stroke={KC.ink} strokeWidth={6} strokeDasharray="16 10" />
      {fibras.map(([fx, fy, a], i) => <path key={'f' + i} d={`M ${fx * 0.9 - 30} ${fy * 0.9} q 30 -14 60 0`} transform={`rotate(${a} ${fx * 0.9} ${fy * 0.9})`} stroke="#d8cdb5" strokeWidth={5} fill="none" strokeLinecap="round" />)}
      {granos.map(([gx, gy, r], i) => <circle key={'g' + i} cx={gx * 0.95} cy={gy * 0.95 + 5} r={r} fill="#ffffff" stroke="#8aa0b8" strokeWidth={3} />)}
    </g>}
    {corte > 0 && <path d={`M -260 -40 L ${klerp(-260, 260, corte)} -40`} stroke={KC.red} strokeWidth={8} strokeDasharray="20 12" strokeLinecap="round" />}
  </g>;
}
// Vaso con agua → gel. gel 0..1 (agua → gel brillante), giro en grados (180 = volteado). x, y = centro del vaso.
function VasoGel({ T, x, y, s = 1, nivel = 0.7, gel = 0, giro = 0 }) {
  const alto = 300;
  const R = krng(4);
  const brillos = Array.from({ length: 9 }, () => [(R() - 0.5) * 170, -R() * alto * nivel * 0.9 - 10, 4 + R() * 7]);
  return <g transform={`translate(${x} ${y}) rotate(${giro}) scale(${s})`}>
    <g transform={`translate(0 ${alto / 2})`}>
      <VasoLab x={0} y={0} s={1} liquido={mixHex(AGUA, GEL, gel)} nivel={nivel} ancho={220} alto={alto} marcas={false}>
        {gel > 0 && <g opacity={gel}>
          <path d={`M -100 ${-alto * nivel + 4} Q -50 ${-alto * nivel - 14} 0 ${-alto * nivel + 2} Q 50 ${-alto * nivel + 16} 100 ${-alto * nivel + 2}`} stroke="#ffffff" strokeWidth={6} fill="none" />
          {brillos.map(([bx, by, r], i) => <circle key={i} cx={bx} cy={by} r={r} fill="#ffffff" opacity={0.7} />)}
          <path d={`M -80 -30 Q -86 ${-alto * nivel * 0.5} -70 ${-alto * nivel + 30}`} stroke="#ffffff" strokeWidth={8} fill="none" opacity={0.55} strokeLinecap="round" />
        </g>}
      </VasoLab>
    </g>
  </g>;
}
// Molécula de agua chiquita.
function Aguita({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={0} y1={0} x2={-15} y2={12} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={15} y2={12} stroke={KC.ink} strokeWidth={5} />
    <circle r={13} fill={AGUA} stroke={KC.ink} strokeWidth={4} /><circle cx={-15} cy={12} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={15} cy={12} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Ion({ x, y, signo = '+', color = NA, r = 20, o = 1, s = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={4} />
    <text y={r * 0.42} textAnchor="middle" style={{ font:`700 ${r * 1.25}px ${KF.mono}` }} fill={KC.ink}>{signo}</text>
  </g>;
}
// La red del poliacrilato: cadenas en zigzag (filas) unidas por amarres dorados. Devuelve <g>.
// abre 0..1 (ovillo → red estirada) · cargas 0..1 · sodio 0..1 · apaga 0..1 (la sal tapa las cargas) · brillo 0..1 de los amarres.
const RED_C = 5, RED_F = 4;
function redNodos(T, cx, cy, abre) {
  const dx = klerp(95, 190, abre), dy = klerp(68, 120, abre);
  const N = [];
  for (let j = 0; j < RED_F; j++) for (let i = 0; i < RED_C; i++) {
    const ph = i * 1.7 + j * 2.3;
    N.push([cx + (i - (RED_C - 1) / 2) * dx + Math.sin(T * 1.3 + ph) * 8 * (1.2 - abre) + (j % 2 ? 22 : -22) * (1 - abre),
            cy + (j - (RED_F - 1) / 2) * dy + Math.cos(T * 1.1 + ph) * 8]);
  }
  return N;
}
function redCargas(N) {
  const C = [];
  for (let j = 0; j < RED_F; j++) for (let i = 0; i < RED_C - 1; i++) {
    const a = N[j * RED_C + i], b = N[j * RED_C + i + 1];
    C.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + ((i + j) % 2 ? 22 : -22)]);
  }
  return C;
}
function Red({ T, cx, cy, abre = 1, cargas = 0, sodio = 0, apaga = 0, brillo = 0, t0 = 0, sal = 0 }) {
  const N = redNodos(T, cx, cy, abre), C = redCargas(N);
  const cadenas = [];
  for (let j = 0; j < RED_F; j++) {
    let d = '';
    for (let i = 0; i < RED_C - 1; i++) {
      const a = N[j * RED_C + i], b = N[j * RED_C + i + 1];
      if (i === 0) d += `M ${a[0]} ${a[1]} `;
      for (let k = 1; k <= 4; k++) { const u = k / 4, z = k === 4 ? 0 : (k % 2 ? 1 : -1) * 16; d += `L ${klerp(a[0], b[0], u)} ${klerp(a[1], b[1], u) + z} `; }
    }
    cadenas.push(<path key={'c' + j} d={d} stroke={CADENA} strokeWidth={9} fill="none" strokeLinejoin="round" strokeLinecap="round" />);
  }
  const amarres = [];
  for (let j = 0; j < RED_F - 1; j++) for (let i = (j % 2); i < RED_C; i += 2) {
    const a = N[j * RED_C + i], b = N[(j + 1) * RED_C + i];
    amarres.push(<g key={'a' + j + i}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={AMARRE} strokeWidth={7} strokeDasharray="12 8" />
      {brillo > 0 && <circle cx={a[0]} cy={a[1]} r={26 + Math.sin(T * 8) * 4} fill={AMARRE} opacity={0.35 * brillo} />}
      <circle cx={a[0]} cy={a[1]} r={13} fill={AMARRE} stroke={KC.ink} strokeWidth={4} /><circle cx={b[0]} cy={b[1]} r={13} fill={AMARRE} stroke={KC.ink} strokeWidth={4} /></g>);
  }
  return <g>
    {cadenas}{amarres}
    {C.map(([x, y], k) => { const e = kprog(cargas * C.length, k, k + 1); if (e <= 0) return null;
      const s = klerp(1.6, 1, e), dim = 1 - apaga * 0.75;
      return <g key={'q' + k}>
        <Ion x={x} y={y} signo="–" color={mixHex(CARGA, '#7a6f6a', apaga)} r={19} s={s} o={e * dim + apaga * 0.25} />
        {sodio > 0 && <Ion x={x + 30 + Math.sin(T * 3 + k) * 6} y={y - 38 + Math.cos(T * 2.6 + k) * 6} signo="+" color={NA} r={15} o={kprog(sodio * C.length, k, k + 1)} />}
        {sal > 0 && k % 2 === 0 && <Ion x={klerp(x + (k % 4 ? 420 : -420), x - 30, kprog(sal * 1.4 - k * 0.02, 0, 1, kEase.sale))} y={klerp(y - 300, y + 30, kprog(sal * 1.4 - k * 0.02, 0, 1, kEase.sale))} signo="–" color={CL} r={15} />}
        {sal > 0 && k % 2 === 1 && <Ion x={klerp(x + (k % 4 === 1 ? -420 : 420), x - 26, kprog(sal * 1.4 - k * 0.02, 0, 1, kEase.sale))} y={klerp(y + 320, y + 30, kprog(sal * 1.4 - k * 0.02, 0, 1, kEase.sale))} signo="+" color={NA} r={15} />}
      </g>; })}
  </g>;
}
// Báscula de juguete: plato izquierdo con un granito, derecho con una gota gigante.
function Bascula({ T, x, y, inclina = 0, L = 300 }) {
  const a = inclina * 12 + Math.sin(T * 3) * 3;
  const r = a * Math.PI / 180;
  const pl = [x - Math.cos(r) * L, y - Math.sin(r) * L], pr = [x + Math.cos(r) * L, y + Math.sin(r) * L];
  return <g>
    <path d={`M ${x} ${y} L ${x - 80} ${y + 260} L ${x + 80} ${y + 260} Z`} fill={KC.orange} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <line x1={pl[0]} y1={pl[1]} x2={pr[0]} y2={pr[1]} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    {[pl, pr].map(([px, py], i) => <g key={i}><line x1={px} y1={py} x2={px} y2={py + 90} stroke={KC.ink} strokeWidth={6} />
      <path d={`M ${px - 110} ${py + 90} Q ${px} ${py + 150} ${px + 110} ${py + 90} Z`} fill="#f4efe4" stroke={KC.ink} strokeWidth={7} /></g>)}
    <circle cx={pl[0]} cy={pl[1] + 78} r={12} fill="#fff" stroke="#8aa0b8" strokeWidth={4} />
    <path d={`M ${pr[0]} ${pr[1] - 120} Q ${pr[0] + 90} ${pr[1] + 10} ${pr[0]} ${pr[1] + 88} Q ${pr[0] - 90} ${pr[1] + 10} ${pr[0]} ${pr[1] - 120} Z`} fill="#ffe36b" stroke={KC.ink} strokeWidth={7} />
    <text x={pr[0]} y={pr[1] + 40} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>×300?</text>
  </g>;
}
// Grano de almidón (anillos de crecimiento) con cadenas injertadas que le brotan.
function GranoAlmidon({ T, x, y, s = 1, injerto = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2, l = 150 * kprog(injerto * 12, i, i + 1), w = Math.sin(T * 3 + i) * 10;
      const x0 = Math.cos(a) * 150, y0 = Math.sin(a) * 120;
      return l > 0 ? <path key={i} d={`M ${x0} ${y0} q ${Math.cos(a) * l * 0.5 + w} ${Math.sin(a) * l * 0.5 - w} ${Math.cos(a) * l} ${Math.sin(a) * l}`} stroke={CADENA} strokeWidth={10} fill="none" strokeLinecap="round" /> : null; })}
    {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2, l = 150 * kprog(injerto * 12, i, i + 1);
      return l > 100 ? <Ion key={'i' + i} x={Math.cos(a) * (150 + l * 0.9)} y={Math.sin(a) * (120 + l * 0.9)} signo="–" color={CARGA} r={14} /> : null; })}
    <ellipse rx={160} ry={128} fill="#fbf3dc" stroke={KC.ink} strokeWidth={9} />
    {[110, 80, 52, 26].map((r, i) => <ellipse key={i} cx={-8} cy={-6} rx={r} ry={r * 0.8} fill="none" stroke="#d9c79c" strokeWidth={5} />)}
    <circle cx={-8} cy={-6} r={8} fill="#b9a26c" />
  </g>;
}
// Letrero retro "SUPER SLURPER" con popote.
function Letrero({ T, x, y, e = 1 }) {
  if (e <= 0) return null;
  return <g transform={`translate(${x} ${y}) rotate(-4) scale(${klerp(0.4, 1, e)})`} opacity={e}>
    <rect x={-330} y={-80} width={660} height={160} rx={30} fill={KC.pink} stroke={KC.ink} strokeWidth={10} />
    <text y={30} textAnchor="middle" style={{ font:`400 96px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} paintOrder="stroke">SUPER SLURPER</text>
    <path d="M 300 -60 L 390 -230" stroke="#fff" strokeWidth={26} strokeLinecap="round" /><path d="M 300 -60 L 390 -230" stroke={KC.red} strokeWidth={26} strokeDasharray="18 18" strokeLinecap="round" />
  </g>;
}

function Panal28() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Ca: CUES.Cargas, Rp: CUES.Repulsion, Os: CUES.Osmosis, Ge: CUES.Gel, Pr: CUES.Pregunta, Es: CUES.Estudio, Sa: CUES.Sal, Pe: CUES.Peoria, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: polvo, chorro, gel, vuelta
  const polvo = kprog(T, K.G - 0.3, K.G + 0.6);
  const vierte = kprog(T, K.G + 0.15, K.G + 0.5, kEase.sale) * (1 - kprog(T, K.G + 1.8, K.G + 2.1));
  const nivel = 0.68 * kprog(T, K.G + 0.3, K.G + 2.0, kEase.suave);
  const gel = kprog(T, K.G + 1.6, K.G + 2.6);
  const giro = 180 * kprog(T, K.G + 2.8, K.G + 3.4, kEase.suave);
  // red: se estira con el agua, la sal la encoge
  const abre = klerp(0.45, 1, kprog(T, K.Rp + 0.4, K.Rp + 3.0, kEase.suave));
  const R = krng(9);
  const aguas = Array.from({ length: 16 }, () => [R() * 2 - 1, R() * 2 - 1, R() * 360, R()]);
  const red = (T2, cx, cy, extra = {}) => <Red T={T2} cx={cx} cy={cy} abre={abre} cargas={kprog(T, K.Ca + 0.2, K.Ca + 2.4)} sodio={kprog(T, K.Ca + 1.8, K.Ca + 3.6)} brillo={kprog(T, K.Ge + 0.2, K.Ge + 0.8) * (1 - kprog(T, K.Pr - 0.4, K.Pr))} {...extra} />;
  const cx = 540, cy = 900;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: polvito + agua → gel → vaso volteado */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06} origen="62% 50%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Panal T={T} x={225} y={930} s={0.55} rot={-6} />
          {/* cucharita que suelta el polvo */}
          <g transform={`translate(${610} ${470 - polvo * 20}) rotate(${-20 + polvo * 50})`} opacity={1 - kprog(T, K.G + 0.7, K.G + 1.0)}>
            <rect x={-200} y={-12} width={170} height={22} rx={10} fill="#c9ced6" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={0} rx={50} ry={30} fill="#c9ced6" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={-4} rx={34} ry={16} fill="#fff" opacity={1 - polvo} />
          </g>
          {Array.from({ length: 22 }, (_, i) => { const t = (T - (K.G - 0.3) - i * 0.03) * 1.6; if (t < 0 || t > 1) return null;
            return <circle key={i} cx={620 + ((i * 37) % 60) - 30} cy={510 + t * 330} r={6} fill="#fff" stroke="#8aa0b8" strokeWidth={2} />; })}
          {/* chorro desde la jarra */}
          <Chorro T={T} x0={900} y0={600} x1={620} y1={760} color={AGUA} o={vierte} ancho={22} />
          <g opacity={1 - kprog(T, K.G + 2.1, K.G + 2.5)}><Botella x={960} y={470} s={0.6} inclina={klerp(-40, -110, vierte)} color="#e8f6ff" liquido={AGUA} tapa={KC.blue} /></g>
          <VasoGel T={T} x={600} y={880} s={1.1} nivel={Math.max(0.02, nivel)} gel={gel} giro={giro} />
          {giro >= 179 && <path d="M 430 1060 L 770 1060" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />}
        </SvgCapa>
      </Escena>
      {/* 1–5 · por dentro: la red del poliacrilato (una sola escena continua) */}
      <Escena T={T} a={K.Q} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {/* el granito que se acerca */}
          {T < K.Q + 1.6 && <g opacity={1 - kprog(T, K.Q + 0.9, K.Q + 1.6)}>
            <circle cx={cx} cy={cy} r={klerp(30, 700, kprog(T, K.Q - 0.3, K.Q + 1.5, kEase.suave))} fill="#e9f2ff" stroke="#8aa0b8" strokeWidth={10} />
          </g>}
          <g opacity={kprog(T, K.Q + 0.8, K.Q + 1.5)}>
            {/* borde del gel y lo de afuera (ósmosis) */}
            {T > K.Os - 0.3 && T < K.Ge + 0.6 && <g opacity={kprog(T, K.Os - 0.3, K.Os + 0.4) * (1 - kprog(T, K.Ge, K.Ge + 0.5))}>
              <rect x={cx - 480} y={cy - 330} width={960} height={575} rx={80} fill="rgba(198,236,255,.07)" stroke={GEL} strokeWidth={6} strokeDasharray="22 14" />
              <text x={cx} y={cy - 280} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={GEL}>ADENTRO</text>
              <text x={60} y={cy - 350} style={{ font:`700 40px ${KF.mono}` }} fill="#7fa7c9">AFUERA</text>
              <Ion x={300} y={cy - 362} signo="+" color={NA} r={15} />
              {Array.from({ length: 10 }, (_, i) => { const t = ((T - K.Os) * 0.5 + i / 10) % 1, a = i / 10 * Math.PI * 2;
                return <g key={i} opacity={1 - kprog(T, K.Ge, K.Ge + 0.5)}><Aguita x={cx + Math.cos(a) * klerp(620, 360, t)} y={cy + Math.sin(a) * klerp(520, 300, t)} s={1.1} rot={T * 60 + i * 40} o={Math.sin(t * Math.PI)} />
                  <path d={`M ${cx + Math.cos(a) * 560} ${cy + Math.sin(a) * 470} L ${cx + Math.cos(a) * 470} ${cy + Math.sin(a) * 390}`} stroke={AGUA} strokeWidth={6} markerEnd="" opacity={0.5} /></g>; })}
            </g>}
            {red(T, cx, cy)}
            {/* agua que entra y se queda entre las cadenas */}
            {aguas.map(([u, v, r0, d], i) => { const t0 = K.Rp + 0.2 + d * 2.2, e = kprog(T, t0, t0 + 1.0, kEase.sale);
              if (e <= 0) return null;
              const xf = cx + u * 360 * abre, yf = cy + v * 230 * abre;
              return <Aguita key={i} x={klerp(cx + u * 900, xf, e)} y={klerp(cy + v * 900, yf, e)} s={0.9} rot={r0 + T * 40} />; })}
            {/* repulsión entre cargas vecinas */}
            {T > K.Rp && T < K.Os + 0.3 && redCargas(redNodos(T, cx, cy, abre)).filter((_, k) => k % 2 === 0).map(([x, y], k) => {
              const o = kprog(T, K.Rp + 0.3, K.Rp + 0.8) * (1 - kprog(T, K.Os - 0.2, K.Os + 0.3)), w = 40 + Math.sin(T * 9 + k) * 10;
              return <g key={k} opacity={o}><path d={`M ${x - 30} ${y} l ${-w} 0 m 0 0 l 16 -12 m -16 12 l 16 12`} stroke={KC.yellow} strokeWidth={6} fill="none" strokeLinecap="round" />
                <path d={`M ${x + 30} ${y} l ${w} 0 m 0 0 l -16 -12 m 16 12 l -16 12`} stroke={KC.yellow} strokeWidth={6} fill="none" strokeLinecap="round" /></g>; })}
          </g>
          {/* el vaso volteado de nuevo, chiquito, en «queda gel» */}
          {T > K.Ge && <g opacity={kprog(T, K.Ge + 0.6, K.Ge + 1.0)}><circle cx={880} cy={480} r={130} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} /><VasoGel T={T} x={880} y={480} s={0.55} nivel={0.68} gel={1} giro={180} /></g>}
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta: ¿300 veces en pipí? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Bascula T={T} x={270} y={860} L={160} inclina={-1 + 2 * kprog(T, K.Pr + 0.6, K.Pr + 2.2, kEase.rebote)} />
          <text x={300} y={600} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 500)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 7 · 2025, Coimbra: el polvo de un pañal en agua pura y en orina de laboratorio */}
      <Escena T={T} a={K.Es} b={K.Sa}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {T < K.Es + 4.3 && <g opacity={1 - kprog(T, K.Es + 3.9, K.Es + 4.3)}>
            <Panal T={T} x={540} y={960} s={0.95} corte={kprog(T, K.Es + 1.4, K.Es + 2.6)} />
            <g transform={`translate(${klerp(250, 780, kprog(T, K.Es + 1.4, K.Es + 2.6))} ${910}) rotate(-30)`}>
              <rect x={-10} y={-130} width={20} height={110} rx={6} fill="#c9ced6" stroke={KC.ink} strokeWidth={5} />
              <rect x={-16} y={-20} width={32} height={130} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
            </g>
            {Array.from({ length: 16 }, (_, i) => { const t = kprog(T, K.Es + 2.6 + i * 0.06, K.Es + 3.6 + i * 0.06); if (t <= 0) return null;
              return <circle key={i} cx={420 + (i * 53) % 240} cy={1000 + t * 200} r={8} fill="#fff" stroke="#8aa0b8" strokeWidth={3} />; })}
          </g>}
          {T > K.Es + 3.9 && (() => {
            const o = kprog(T, K.Es + 3.9, K.Es + 4.3), h1 = 460 * kprog(T, K.Es + 4.2, K.Es + 5.6, kEase.sale), h2 = 460 * (20 / 295) * kprog(T, K.Es + 6.4, K.Es + 7.2, kEase.sale);
            return <g opacity={o}>
              <line x1={120} y1={1100} x2={960} y2={1100} stroke={KC.ink} strokeWidth={8} />
              <rect x={210} y={1100 - h1} width={240} height={h1} rx={14} fill={AGUA} stroke={KC.ink} strokeWidth={7} />
              <rect x={630} y={1100 - Math.max(h2, 0.01)} width={240} height={Math.max(h2, 0.01)} rx={8} fill="#ffe36b" stroke={KC.ink} strokeWidth={7} />
              {h1 > 40 && <text x={330} y={1080 - h1} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.ink}>≈ 295</text>}
              {T > K.Es + 6.6 && <text x={750} y={1075 - h2} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.ink}>≈ 20</text>}
              <text x={330} y={1150} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>agua pura</text>
              {T > K.Es + 6.4 && <text x={750} y={1150} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>orina de laboratorio</text>}
            </g>; })()}
        </SvgCapa>
      </Escena>
      {/* 8 · la sal tapa las cargas */}
      <Escena T={T} a={K.Sa} b={K.Pe} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Red T={T} cx={cx} cy={cy} abre={klerp(1, 0.72, kprog(T, K.Sa + 2.0, K.Sa + 4.0, kEase.suave))} cargas={1} sodio={1} apaga={kprog(T, K.Sa + 1.2, K.Sa + 3.0)} sal={kprog(T, K.Sa + 0.2, K.Sa + 2.4)} />
          {aguas.slice(0, 10).map(([u, v, r0], i) => { const sale = kprog(T, K.Sa + 2.4 + i * 0.12, K.Sa + 3.6 + i * 0.12, kEase.suave);
            return <Aguita key={i} x={cx + u * klerp(300, 900, sale)} y={cy + v * klerp(200, 900, sale)} s={0.9} rot={r0 + T * 40} o={1 - sale} />; })}
        </SvgCapa>
      </Escena>
      {/* 9 · 1973, Peoria: almidón con cadenas injertadas = Super Slurper */}
      <Escena T={T} a={K.Pe} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <GranoAlmidon T={T} x={560} y={920} s={0.9} injerto={kprog(T, K.Pe + 2.6, K.Pe + 5.0)} />
          <Letrero T={T} x={540} y={1530} e={kprog(T, K.Pe + 5.4, K.Pe + 5.9, kEase.rebote)} />
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: el vaso volteado del inicio, por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="62% 50%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Panal T={T} x={225} y={930} s={0.55} rot={-6} />
          <VasoGel T={T} x={600} y={880} s={1.1} nivel={0.68} gel={1} giro={180} />
          <path d="M 430 1060 L 770 1060" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
        </SvgCapa>
        <Lupa T={T} at={K.Ci + 0.5} until={K.Ou - 0.2} x={360} y={500} r={200} fx={600} fy={880} tinte={KC.cyan} etiqueta="POR DENTRO · el gel"
          interior={(T2, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1424" />
            <g transform={`translate(${r} ${r}) scale(0.42) translate(${-540} ${-900})`}><Red T={T2} cx={540} cy={900} abre={1} cargas={1} sodio={1} />
              {aguas.map(([u, v, r0], i) => <Aguita key={i} x={540 + u * 360} y={900 + v * 230} s={1} rot={r0 + T2 * 40} />)}</g></svg>} />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.2} until={K.G + 2.4} texto="¿gelatina?" x={300} y={470} tam={52} />
      <Chip T={T} at={K.G + 2.6} until={K.Q - 0.3} texto="unos segundos" x={300} y={470} tam={42} borde={KC.cyan} />
      <Etq T={T} at={K.G + 0.8} until={K.Q - 0.3} x={60} y={1500} texto="polvito del pañal" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Q + 1.6} until={K.Ca - 0.2} texto="poliacrilato de sodio" x={540} y={1500} tam={46} borde={CADENA} />
      <Etq T={T} at={K.Q + 2.6} until={K.Ca - 0.2} x={1030} y={1600} texto="amarres = red" lado="izq" tam={34} color={AMARRE} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Rp - 0.2} texto="–  carga negativa (COO⁻)" x={540} y={1500} tam={40} borde={CARGA} mono />
      <Chip T={T} at={K.Ca + 2.0} until={K.Rp - 0.2} texto="+  ion de sodio (Na⁺)" x={540} y={1610} tam={40} borde={NA} mono />
      <Chip T={T} at={K.Rp + 0.6} until={K.Os - 0.2} texto="las cargas se repelen" x={540} y={1500} tam={46} borde={KC.yellow} />
      <SvgCapa z={44}><Onomato T={T} at={K.G + 3.4} until={K.Q - 0.2} x={860} y={1000} texto="¡no cae!" color={KC.cyan} tam={80} />
      <Onomato T={T} at={K.Rp + 1.6} until={K.Rp + 3.4} x={840} y={560} texto="¡boing!" color={KC.yellow} tam={90} /></SvgCapa>
      <Chip T={T} at={K.Os + 0.6} until={K.Ge - 0.2} texto="mucho Na⁺ adentro → entra agua" x={540} y={1500} tam={38} borde={NA} />
      <Chip T={T} at={K.Ge + 0.3} until={K.Pr - 0.2} texto="amarres: no se disuelve" x={540} y={1500} tam={44} borde={AMARRE} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.6} anio="2025" quien="Univ. de Coimbra, Portugal" revista="Simões et al. · Gels" x={540} y={560} />
      <Chip T={T} at={K.Es + 4.4} until={K.Sa - 0.3} texto="veces su peso (g/g) · polvo de un pañal" x={540} y={1500} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Sa + 0.5} until={K.Pe - 0.2} texto="la sal tapa las cargas" x={540} y={1500} tam={46} borde={CL} />
      <Etq T={T} at={K.Sa + 0.8} until={K.Pe - 0.2} x={60} y={1600} texto="Na⁺ y Cl⁻ de la orina" tam={34} color={CL} />
      <TarjetaEstudio T={T} at={K.Pe + 0.2} until={K.Pe + 2.6} anio="1973" quien="USDA · Peoria, Illinois" revista="almidón + cadenas injertadas" x={540} y={560} />
      <Etq T={T} at={K.Pe + 2.8} until={K.Ci - 0.2} x={1030} y={1180} texto="grano de almidón" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Pe + 6.0} until={K.Ci - 0.2} texto="«el súper sorbedor»" x={540} y={1720} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="agua atrapada en una red con cargas" x={540} y={1500} tam={36} borde={KC.cyan} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es gelatina: *es agua atrapada.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Ca - 0.1} texto="Cadenas *amarradas en red.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Rp - 0.1} texto="Cargas negativas *y sodio.*" />
      <Subtitulo T={T} idx={3} at={K.Rp + 0.1} until={K.Os - 0.1} texto="Se repelen: *la red se estira.*" />
      <Subtitulo T={T} idx={4} at={K.Os + 0.1} until={K.Ge - 0.1} texto="El agua entra *a emparejar.*" />
      <Subtitulo T={T} idx={5} at={K.Ge + 0.1} until={K.Pr - 0.1} texto="No se disuelve: *queda gel.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿300 veces *en pipí?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Sa - 0.1} texto="Agua: ≈295. *Orina: ≈20.*" />
      <Subtitulo T={T} idx={8} at={K.Sa + 0.1} until={K.Pe - 0.1} texto="La sal *tapa las cargas.*" />
      <Subtitulo T={T} idx={9} at={K.Pe + 0.1} until={K.Ci - 0.1} texto="1973: *el Super Slurper.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Agua atrapada *por cargas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.6, CUES.Cargas - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Repulsion + 0.5, CUES.Osmosis - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Gel + 0.2, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.0, CUES.Sal - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Sal + 0.5, CUES.Peoria - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Peoria + 2.8, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="28" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PanalApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Panal28 /></CompositionStage></div>;
}
window.PanalApp = PanalApp;
