// Shot Químico #35 · Esa vela no quema la cera que ves (quema cera hecha vapor) — NARRADO (N1 por dentro + N3 capítulos + Faraday 1860–61).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const CERA = '#fbf3df', CERA2 = '#e6d6b0', LIQ = '#ffc94d', MECHA = '#2e2219', VAPOR = '#c9d6e8', ALGODON = '#f5efe2', MADERA = '#e8c48a';

// Llama de vela: gota amarilla, núcleo oscuro, base azul y halo. Origen = punta de la mecha. f = 0..1 tamaño.
function FlamaVela({ T, x, y, s = 1, f = 1, glow = 1, seed = 0 }) {
  if (f <= 0.001) return null;
  const w = Math.sin(T * 13 + seed) * 0.05 + Math.sin(T * 5.1 + seed) * 0.04, k = s * f, sk = Math.sin(T * 3.3 + seed) * 4;
  return <g transform={`translate(${x} ${y}) skewX(${sk}) scale(${k * (1 - w * 0.5)} ${k * (1 + w)})`}>
    {glow > 0 && <><circle cx={0} cy={-120} r={240} fill="#ffd36b" opacity={0.16 * glow} /><circle cx={0} cy={-110} r={150} fill="#ffe9a8" opacity={0.24 * glow} /></>}
    <path d="M 0 -290 Q 62 -150 54 -46 Q 46 18 0 22 Q -46 18 -54 -46 Q -62 -150 0 -290 Z" fill="#ffb81a" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -255 Q 42 -140 38 -60 Q 32 -8 0 -6 Q -32 -8 -38 -60 Q -42 -140 0 -255 Z" fill="#fff1a6" opacity={0.9} />
    <path d="M 0 -150 Q 24 -90 22 -36 Q 14 -6 0 -6 Q -14 -6 -22 -36 Q -24 -90 0 -150 Z" fill="#8a6a44" opacity={0.5} />
    <path d="M -50 -34 Q -44 18 0 21 Q 44 18 50 -34 Q 24 -12 0 -12 Q -24 -12 -50 -34 Z" fill="#3f7bff" opacity={0.85} />
  </g>;
}
// Vela con platito. Origen = centro de la cara de arriba. copa = 0..1 cera líquida. flama = 0..1.
function Vela({ T, x, y, s = 1, W = 180, H = 420, flama = 1, copa = 0.7, glow = 1, seed = 0, plato = true, fs = 0.8 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {plato && <ellipse cx={0} cy={H + 8} rx={W * 0.95} ry={W * 0.22} fill="#d6dbe3" stroke={KC.ink} strokeWidth={7} />}
    <rect x={-W / 2} y={0} width={W} height={H} fill={CERA} stroke={KC.ink} strokeWidth={8} />
    <rect x={-W / 2 + 16} y={14} width={18} height={H - 34} rx={9} fill="#fff" opacity={0.75} />
    <rect x={W / 2 - 34} y={10} width={22} height={H - 18} fill={CERA2} opacity={0.6} />
    <path d={`M ${W / 2 - 8} 6 Q ${W / 2 + 14} 60 ${W / 2 + 2} 118 Q ${W / 2 - 12} 126 ${W / 2 - 12} 96 Z`} fill={CERA} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={0} cy={0} rx={W / 2} ry={W * 0.17} fill={CERA} stroke={KC.ink} strokeWidth={8} />
    {copa > 0 && <ellipse cx={0} cy={2} rx={W / 2 * 0.82 * copa} ry={W * 0.14 * copa} fill={LIQ} opacity={0.92} />}
    <path d="M 0 4 Q -4 -20 2 -42" stroke={MECHA} strokeWidth={9} fill="none" strokeLinecap="round" />
    {flama > 0.05 && <circle cx={2} cy={-42} r={6} fill="#ff6a1a" />}
    <FlamaVela T={T} x={2} y={-34} s={fs} f={flama} glow={glow} seed={seed} />
  </g>;
}
// Humo blanco que sube de la mecha (vapor de cera que se enfría). f = 0..1 altura; fuego = 0..1 tramo encendido desde arriba.
function HumoVela({ T, x, y, f = 1, o = 1, alto = 420, seed = 0, fuego = -1 }) {
  if (o <= 0 || f <= 0) return null;
  const n = 24;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => {
    const q = i / (n - 1); if (q > f) return null;
    const yy = y - q * alto, xx = x + Math.sin(q * 7 - T * 3 + seed) * (8 + q * 40);
    const ard = fuego >= 0 && q >= 1 - fuego;
    return <circle key={i} cx={xx} cy={yy} r={10 + q * 24} fill={ard ? '#ffb81a' : '#f4f6fa'} opacity={(ard ? 0.95 : 0.75) * (1 - q * 0.6)} />;
  })}</g>;
}
// Astilla de madera con llamita en la punta (la punta es el origen; el palo sale hacia la derecha y arriba).
function Astilla({ T, x, y, llama = 1 }) {
  return <g>
    <g transform={`translate(${x} ${y}) rotate(-35)`}>
      <rect x={0} y={-9} width={360} height={18} rx={6} fill={MADERA} stroke={KC.ink} strokeWidth={5} />
      <rect x={0} y={-9} width={40} height={18} rx={6} fill="#3a2414" />
    </g>
    <FlamaVela T={T} x={x} y={y + 4} s={0.3} f={llama} glow={0.6} seed={2} />
  </g>;
}
function Termometro({ x, y, v }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-260} width={52} height={300} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-12} y={20 - 240 * v} width={24} height={240 * v + 10} rx={10} fill={KC.red} />
    <circle cx={0} cy={50} r={40} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function BarraEscala({ x = 70, y = 1440, px = 120, texto = '1 cm', color = KC.ink }) {
  return <g><line x1={x} y1={y} x2={x + px} y2={y} stroke={color} strokeWidth={8} /><line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={color} strokeWidth={6} /><line x1={x + px} y1={y - 14} x2={x + px} y2={y + 14} stroke={color} strokeWidth={6} />
    <text x={x + px / 2} y={y - 22} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{texto}</text></g>;
}
function Flecha({ x, y, alto = 200, color = KC.cyan, T, fase = 0, o = 1 }) {
  const d = ((T * 120 + fase) % 40);
  return <g opacity={o}>
    <line x1={x} y1={y} x2={x} y2={y - alto} stroke={color} strokeWidth={12} strokeDasharray="26 14" strokeDashoffset={d} strokeLinecap="round" />
    <path d={`M ${x - 26} ${y - alto + 20} L ${x} ${y - alto - 16} L ${x + 26} ${y - alto + 20} Z`} fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Hilos de algodón trenzados de la mecha (x central, de y0 abajo a y1 arriba).
function Mecha({ x, y0, y1, color = ALGODON, amp = 40, ancho = 26 }) {
  return <g>{[0, 2.1, 4.2].map((ph, k) => {
    const pts = Array.from({ length: 40 }, (_, i) => { const q = i / 39, yy = klerp(y0, y1, q); return `${x + Math.sin(q * 14 + ph) * amp} ${yy}`; }).join(' L ');
    return <g key={k}><path d={`M ${pts}`} fill="none" stroke={KC.ink} strokeWidth={ancho + 10} strokeLinecap="round" /><path d={`M ${pts}`} fill="none" stroke={color} strokeWidth={ancho} strokeLinecap="round" /></g>;
  })}</g>;
}
// Recorrido del tubo de Faraday: u = 0..3 (curva de entrada, tramo recto, codo hacia arriba).
const TUBO = 'M 305 820 Q 330 700 460 690 L 780 690 Q 860 690 860 610';
function enTubo(u) {
  const q = (a, c, b, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;
  if (u < 1) return [q(305, 330, 460, u), q(820, 700, 690, u)];
  if (u < 2) return [klerp(460, 780, u - 1), 690];
  const t = Math.min(u - 2, 1); return [q(780, 860, 860, t), q(690, 690, 610, t)];
}

function Vela35() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Copa, Me: CUES.Mecha, Va: CUES.Vapor, Br: CUES.Brillo, Pr: CUES.Pregunta, Fa: CUES.Faraday, Hu: CUES.Humo, Es: CUES.Espacio, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // capítulo 1: derrite
  const derr = kprog(T, K.Co + 0.3, K.Co + 3.2, kEase.suave);
  // capítulo 2: sube por la mecha
  const moja = kprog(T, K.Me + 0.4, K.Me + 4.0, kEase.suave);
  // Faraday
  const tuboIn = kprog(T, K.Fa + 3.0, K.Fa + 3.8, kEase.sale), t0v = K.Fa + 4.2, frente = Math.max(0, (T - t0v) * 1.3);
  const ast = kprog(T, K.Fa + 6.0, K.Fa + 6.9, kEase.sale), astSale = kprog(T, K.Fa + 8.2, K.Fa + 8.9, kEase.suave);
  const llama2 = kprog(T, K.Fa + 7.0, K.Fa + 7.5, kEase.rebote);
  // Humo
  const apaga = kprog(T, K.Hu + 0.5, K.Hu + 0.9), prende = kprog(T, K.Hu + 4.8, K.Hu + 5.3, kEase.sale);
  const astH = kprog(T, K.Hu + 2.2, K.Hu + 3.2, kEase.sale), astHsale = kprog(T, K.Hu + 5.4, K.Hu + 6.2, kEase.suave);
  const baja = kprog(T, K.Hu + 3.9, K.Hu + 4.8);
  const R = krng(35);
  const hollin = Array.from({ length: 46 }, () => [R(), R() * 2 - 1]);
  const estrellas = Array.from({ length: 50 }, () => [R() * KW, R() * KH, 1 + R() * 3]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la vela en la mesa */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.05} origen="38% 40%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vela T={T} x={400} y={760} copa={0.75} />
          {T > K.G + 2.0 && <g opacity={kprog(T, K.G + 2.0, K.G + 2.5)}>
            {Array.from({ length: 9 }, (_, i) => { const a = ((T - K.G) * 0.7 + i / 9) % 1; return <circle key={i} cx={402 + Math.sin(i * 2.3) * a * 40} cy={712 - a * 110} r={9 + a * 8} fill={VAPOR} stroke={KC.ink} strokeWidth={2} opacity={1 - a} />; })}
            <circle cx={402} cy={660} r={70 + Math.sin(T * 6) * 6} fill="none" stroke={KC.pink} strokeWidth={8} strokeDasharray="18 12" strokeDashoffset={-T * 40} />
          </g>}
          <BarraEscala x={70} y={1450} px={80} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 1 · capítulo 1: la copita de cera líquida */}
      <Escena T={T} a={K.Co} b={K.Me} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Vela T={T} x={540} y={980} s={2.4} H={500} copa={0.15 + 0.85 * derr} plato={false} />
          {[270, 810].map((fx, i) => <Flecha key={i} T={T} x={fx} y={1200} alto={170} color="#bff3ff" fase={i * 20} o={kprog(T, K.Co + 1.2, K.Co + 1.7)} />)}
          {T > K.Co + 0.2 && <g opacity={kprog(T, K.Co + 0.2, K.Co + 0.6)}><Termometro x={975} y={760} v={0.25 + 0.6 * derr} /></g>}
        </SvgCapa>
      </Escena>
      {/* 2 · capítulo 2: capilaridad en los hilos de la mecha */}
      <Escena T={T} a={K.Me} b={K.Va} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} seed={9} color="rgba(255,210,120,.22)" />
        <SvgCapa>
          <path d="M 0 1090 Q 270 1070 540 1090 T 1080 1090 L 1080 1240 L 0 1240 Z" fill={LIQ} opacity={0.9} />
          <Mecha x={420} y0={1230} y1={380} />
          <clipPath id="mojado"><rect x={0} y={klerp(1230, 470, moja)} width={KW} height={KH} /></clipPath>
          <g clipPath="url(#mojado)"><Mecha x={420} y0={1230} y1={380} color={LIQ} ancho={20} /></g>
          <path d="M 380 380 Q 420 330 460 380 L 460 460 L 380 460 Z" fill="#1d1712" stroke={KC.ink} strokeWidth={6} />
          {T > K.Me + 0.4 && Array.from({ length: 14 }, (_, i) => { const yy = 1150 - (((T - K.Me) * 170 + i * 55) % 700); if (yy < klerp(1150, 470, moja)) return null;
            return <circle key={i} cx={420 + Math.sin(yy / 50 + i) * 34} cy={yy} r={12} fill={LIQ} stroke={KC.ink} strokeWidth={3} />; })}
          {T > K.Me + 1.6 && <g opacity={kprog(T, K.Me + 1.6, K.Me + 2.1)}>
            <rect x={750} y={680} width={180} height={250} rx={14} fill="rgba(220,240,255,.18)" stroke={KC.texto} strokeWidth={6} />
            <rect x={756} y={820} width={168} height={104} fill="#5fb8ff" opacity={0.8} />
            <rect x={815} y={540} width={50} height={360} fill="#ffffff" stroke={KC.ink} strokeWidth={5} />
            <rect x={818} y={klerp(897, 570, kprog(T, K.Me + 2.0, K.Me + 4.6, kEase.suave))} width={44} height={330} fill="#5fb8ff" opacity={0.85} clipPath="url(#servi)" />
            <clipPath id="servi"><rect x={818} y={543} width={44} height={354} /></clipPath>
            <text x={840} y={980} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>servilleta</text>
          </g>}
          <BarraEscala x={70} y={1450} px={150} texto="1 mm" color={KC.texto} />
        </SvgCapa>
      </Escena>
      {/* 3 · capítulo 3: el vapor se junta con el oxígeno y arde */}
      <Escena T={T} a={K.Va} b={K.Br} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Mecha x={540} y0={1250} y1={1010} amp={22} ancho={20} />
          <path d="M 512 1010 Q 540 975 568 1010 L 568 1050 L 512 1050 Z" fill="#1d1712" stroke={KC.ink} strokeWidth={5} />
          {T > K.Va + 0.2 && Array.from({ length: 26 }, (_, i) => { const a = ((T - K.Va) * 0.55 + i / 26) % 1;
            return <circle key={i} cx={540 + Math.sin(i * 2.37) * a * 150} cy={995 - a * 400} r={13} fill={VAPOR} stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Va + 0.2, K.Va + 0.8) * (1 - a * 0.6)} />; })}
          {T > K.Va + 1.4 && Array.from({ length: 8 }, (_, i) => { const lado = i % 2 ? 1 : -1, a = ((T - K.Va - 1.4) * 0.45 + i / 8) % 1;
            return <Mol key={i} tipo="o2" x={540 + lado * klerp(480, 215, a)} y={640 + (i >> 1) * 85} s={0.5} rot={T * 50 + i * 40} o={kprog(T, K.Va + 1.4, K.Va + 1.9) * (1 - kprog(a, 0.85, 1))} />; })}
          {T > K.Va + 2.4 && <g opacity={kprog(T, K.Va + 2.4, K.Va + 3.0)}>
            <path d="M 540 470 Q 760 760 700 960 Q 660 1050 540 1050 Q 420 1050 380 960 Q 320 760 540 470 Z" fill="rgba(255,170,40,.10)" stroke="#ffb81a" strokeWidth={22 + Math.sin(T * 12) * 3} strokeDasharray="2400" strokeDashoffset={2400 * (1 - kprog(T, K.Va + 2.4, K.Va + 3.4))} />
            <path d="M 540 470 Q 760 760 700 960 Q 660 1050 540 1050 Q 420 1050 380 960 Q 320 760 540 470 Z" fill="none" stroke="#fff1a6" strokeWidth={6} opacity={0.8} />
          </g>}
        </SvgCapa>
      </Escena>
      {/* 4 · el brillo amarillo: hollín incandescente */}
      <Escena T={T} a={K.Br} b={K.Pr} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <FlamaVela T={T} x={540} y={1150} s={2.5} glow={0.25} />
          {T > K.Br + 0.3 && hollin.map(([ph, dx], i) => { const a = ((T - K.Br) * 0.42 + ph) % 1, yy = klerp(930, 520, a);
            const c = a < 0.25 ? '#1b1b1b' : a < 0.55 ? mixHex('#2a1408', '#ff5a1a', (a - 0.25) / 0.3) : mixHex('#ff5a1a', '#fffbe0', Math.min(1, (a - 0.55) / 0.3));
            return <circle key={i} cx={540 + dx * 70 * (1 - a * 0.4)} cy={yy} r={10} fill={c} stroke={a < 0.5 ? '#000' : 'none'} strokeWidth={2} opacity={kprog(T, K.Br + 0.3, K.Br + 0.9) * (a > 0.92 ? (1 - a) / 0.08 : 1)} />; })}
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Fa} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Vela T={T} x={300} y={820} H={330} />
          <text x={300} y={560} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 300 460)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 6 · Faraday, 1860–61: el tubito */}
      <Escena T={T} a={K.Fa} b={K.Hu} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Vela T={T} x={300} y={930} s={0.85} H={250} />
          {tuboIn > 0 && <g transform={`translate(${(1 - tuboIn) * 420} ${(1 - tuboIn) * -260})`} opacity={tuboIn}>
            <path d={TUBO} fill="none" stroke={KC.ink} strokeWidth={42} strokeLinecap="round" />
            <path d={TUBO} fill="none" stroke="#dff4ff" strokeWidth={30} strokeLinecap="round" />
            <path d={TUBO} fill="none" stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.8} transform="translate(-4 -8)" />
          </g>}
          {frente > 0 && Array.from({ length: 16 }, (_, i) => { let u = frente - i * 0.19; if (u < 0) return null; if (frente > 3) u = u % 3; if (u > 3) return null;
            const [px, py] = enTubo(u); return <circle key={i} cx={px} cy={py} r={9} fill="#ffffff" stroke="#8a95a8" strokeWidth={2} opacity={0.9} />; })}
          {ast > 0 && <g transform={`translate(${astSale * 400} ${astSale * -300})`} opacity={1 - astSale}><Astilla T={T} x={klerp(1150, 880, ast)} y={klerp(260, 560, ast)} llama={1} /></g>}
          {llama2 > 0 && <FlamaVela T={T} x={860} y={615} s={0.62} f={llama2} glow={1} seed={4} />}
        </SvgCapa>
      </Escena>
      {/* 7 · el humo que se vuelve a encender (demostración) */}
      <Escena T={T} a={K.Hu} b={K.Es} zoom={0.04} origen="40% 45%">
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Vela T={T} x={420} y={800} H={380} flama={(1 - apaga) + prende} copa={0.75} />
          <HumoVela T={T} x={422} y={756} f={kprog(T, K.Hu + 0.8, K.Hu + 2.0)} o={1 - kprog(T, K.Hu + 5.0, K.Hu + 5.6)} fuego={baja > 0 ? baja : -1} />
          {T > K.Hu + 0.1 && T < K.Hu + 1.3 && [0, 1, 2].map((i) => { const p = kprog(T, K.Hu + 0.1 + i * 0.08, K.Hu + 0.9 + i * 0.08);
            return <path key={i} d={`M ${klerp(60, 260, p)} ${640 + i * 40} Q ${klerp(140, 330, p)} ${620 + i * 40} ${klerp(200, 380, p)} ${650 + i * 40}`} fill="none" stroke="#ffffff" strokeWidth={10} strokeLinecap="round" opacity={1 - p} />; })}
          {astH > 0 && <g transform={`translate(${astHsale * 500} ${astHsale * -300})`} opacity={1 - astHsale}><Astilla T={T} x={klerp(1150, 470, astH)} y={klerp(200, 430, astH)} llama={1} /></g>}
          {astH > 0.9 && astHsale < 0.2 && <g opacity={kprog(T, K.Hu + 3.1, K.Hu + 3.4)}>
            <line x1={600} y1={440} x2={600} y2={710} stroke={KC.ink} strokeWidth={6} strokeDasharray="12 10" />
            <line x1={580} y1={440} x2={620} y2={440} stroke={KC.ink} strokeWidth={6} /><line x1={580} y1={710} x2={620} y2={710} stroke={KC.ink} strokeWidth={6} />
            <text x={630} y={590} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>unos cm</text>
          </g>}
          <BarraEscala x={70} y={1450} px={80} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 8 · en el espacio: llama redonda y azul */}
      <Escena T={T} a={K.Es} b={K.Ci} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {estrellas.map(([sx, sy, r], i) => <circle key={i} cx={sx} cy={sy} r={r} fill="#fff" opacity={0.35 + 0.35 * Math.sin(T * 2 + i)} />)}
          <Vela T={T} x={290} y={820} s={0.8} H={250} />
          {[200, 380].map((fx, i) => <Flecha key={i} T={T} x={fx} y={740} alto={260} color={KC.orange} fase={i * 20} o={kprog(T, K.Es + 0.6, K.Es + 1.1)} />)}
          <g opacity={kprog(T, K.Es + 1.3, K.Es + 1.8)}>
            <Vela T={T} x={790} y={820} s={0.8} H={250} flama={0} />
            {(() => { const k = kprog(T, K.Es + 1.6, K.Es + 2.4, kEase.rebote) * (1 + Math.sin(T * 5) * 0.03); return <g transform={`translate(792 782) scale(${k})`}>
              <circle r={130} fill="#2b5cff" opacity={0.28} />
              <circle r={100} fill="#4f86ff" opacity={0.5} />
              <circle r={100} fill="none" stroke="#9cc3ff" strokeWidth={12} />
              <circle r={60} fill="#0d1424" opacity={0.55} />
            </g>; })()}
          </g>
          <text x={290} y={1120} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.texto} opacity={kprog(T, K.Es + 0.4, K.Es + 0.9)}>TIERRA</text>
          <text x={790} y={1120} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill="#9cc3ff" opacity={kprog(T, K.Es + 1.6, K.Es + 2.1)}>MICROGRAVEDAD</text>
        </SvgCapa>
      </Escena>
      {/* 9 · cierre: la misma vela del inicio, ya entendida */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="38% 40%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Vela T={T} x={400} y={760} copa={0.75} />
          {Array.from({ length: 9 }, (_, i) => { const a = ((T - K.Ci) * 0.7 + i / 9) % 1; return <circle key={i} cx={402 + Math.sin(i * 2.3) * a * 40} cy={712 - a * 110} r={9 + a * 8} fill={VAPOR} stroke={KC.ink} strokeWidth={2} opacity={(1 - a) * kprog(T, K.Ci, K.Ci + 0.5)} />; })}
          <BarraEscala x={70} y={1450} px={80} texto="1 cm" />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.9} until={K.G + 3.0} texto="¿arde la cera sólida?" x={320} y={340} tam={40} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.0} x={500} y={1000} texto="cera sólida" tam={36} color={KC.ink} />
      <Etq T={T} at={K.G + 2.3} until={K.Co - 0.3} x={330} y={640} texto="vapor" lado="izq" tam={36} color={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.Co - 0.3} texto="arde: cera hecha vapor" x={540} y={1500} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.Co + 0.4} until={K.Me - 0.2} texto="Cap. 1 · se derrite" x={540} y={1500} tam={44} borde={LIQ} />
      <Etq T={T} at={K.Co + 1.0} until={K.Me - 0.2} x={350} y={990} texto="cera líquida" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Co + 1.6} until={K.Me - 0.2} texto="aire frío: el borde sigue sólido" x={540} y={1610} tam={34} borde="#bff3ff" />
      <Chip T={T} at={K.Me + 0.4} until={K.Va - 0.2} texto="Cap. 2 · capilaridad" x={540} y={1500} tam={44} borde={LIQ} />
      <Etq T={T} at={K.Me + 0.8} until={K.Va - 0.2} x={480} y={1030} texto="hilos de algodón" tam={30} color={KC.texto} />
      <Chip T={T} at={K.Va + 2.6} until={K.Br - 0.2} texto="Cap. 3 · vapor + O₂ → arde" x={540} y={1500} tam={42} borde="#ffb81a" />
      <Etq T={T} at={K.Va + 0.6} until={K.Br - 0.2} x={600} y={880} texto="vapor de cera" tam={30} color={VAPOR} />
      <Etq T={T} at={K.Va + 1.8} until={K.Br - 0.2} x={1040} y={1150} texto="O₂ del aire" lado="izq" tam={30} color="#ff8a80" />
      <Chip T={T} at={K.Br + 0.6} until={K.Pr - 0.2} texto="hollín incandescente" x={540} y={1500} tam={44} borde={KC.orange} />
      <Etq T={T} at={K.Br + 1.2} until={K.Pr - 0.2} x={640} y={600} texto="hollín (C)" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Br + 2.4} until={K.Pr - 0.2} x={600} y={1120} texto="base azul: sin hollín" tam={30} color="#9cc3ff" />
      <Chip T={T} at={K.Pr + 0.3} until={K.Fa - 0.1} texto="¿qué es lo que arde?" x={540} y={1500} tam={44} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.Fa + 0.2} until={K.Fa + 2.9} anio="1860–61" quien="Faraday · Royal Institution, Londres" revista="The Chemical History of a Candle (1861)" x={540} y={560} />
      <Etq T={T} at={K.Fa + 3.4} until={K.Fa + 6.0} x={330} y={870} texto="parte oscura" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Fa + 4.2} until={K.Fa + 7.2} texto="el vapor viaja por el tubo" x={540} y={1500} tam={40} borde="#dff4ff" />
      <Chip T={T} at={K.Fa + 7.4} until={K.Hu - 0.2} texto="¡una vela por tubería!" x={540} y={1500} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.Fa + 7.8} until={K.Hu - 0.2} x={800} y={470} texto="2.ª llama" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Hu + 1.0} until={K.Hu + 5.4} texto="humo = cera evaporada" x={540} y={1500} tam={44} borde="#ffffff" />
      <Chip T={T} at={K.Hu + 5.6} until={K.Es - 0.2} texto="⚠️ fuego de verdad · no es un juego" x={540} y={1500} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Es + 2.8} until={K.Ci - 0.2} texto="redonda · azul · sin hollín" x={540} y={1500} tam={42} borde="#9cc3ff" />
      <Etq T={T} at={K.Ci + 0.4} until={K.Ou} x={340} y={520} texto="hollín" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ci + 0.8} until={K.Ou} x={340} y={660} texto="vapor" lado="izq" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Ci + 1.2} until={K.Ou} x={420} y={730} texto="mecha: capilaridad" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ci + 1.6} until={K.Ou} x={470} y={800} texto="copita líquida" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ci + 2.0} until={K.Ou} x={500} y={1000} texto="cera sólida" tam={30} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="Arde la *cera hecha vapor.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.Me - 0.1} texto="El calor hace *una copita.*" />
      <Subtitulo T={T} idx={2} at={K.Me + 0.1} until={K.Va - 0.1} texto="Sube por *capilaridad.*" />
      <Subtitulo T={T} idx={3} at={K.Va + 0.1} until={K.Br - 0.1} texto="Vapor + oxígeno: *arde.*" />
      <Subtitulo T={T} idx={4} at={K.Br + 0.1} until={K.Pr - 0.1} texto="Lo amarillo: *hollín que brilla.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Fa - 0.1} texto="¿Cómo sabemos *que es el vapor?*" />
      <Subtitulo T={T} idx={6} at={K.Fa + 0.1} until={K.Hu - 0.1} texto="Faraday lo *sacó con un tubo.*" />
      <Subtitulo T={T} idx={7} at={K.Hu + 0.1} until={K.Es - 0.1} texto="El humo *la vuelve a encender.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Ci - 0.1} texto="En el espacio: *redonda y azul.*" />
      <Subtitulo T={T} idx={9} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Arde la cera *hecha vapor.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Copa + 0.5, CUES.Mecha - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Mecha + 0.5, CUES.Vapor - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Vapor + 0.5, CUES.Brillo - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Brillo + 0.5, CUES.Pregunta - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Faraday - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Faraday + 3.2, CUES.Humo - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Humo + 0.5, CUES.Espacio - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Espacio + 0.6, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="35" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VelaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Vela35 /></CompositionStage></div>;
}
window.VelaApp = VelaApp;
