// Shot Fungi Mati #151 · Si los champiñones te caen mal, quizá no es alergia: es un azúcar — NARRADO (N1 Por dentro + N5 El experimento).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const TR = { plato:'#f7f4ec', plato2:'#d9d2c4', glu:'#ffd43b', fru:'#ff8a1f', oxi:'#ff3b2f', piel:'#f1b48f', colon:'#f39aa6', colon2:'#d9667a',
  agua:'#6fc3ff', mem:'#2fe0a8', prot:'#ff6b9a', vello:'#f6a6b2', vello2:'#e07c8e', naranja:'#ff8a1f' };

// Trehalosa: dos glucosas unidas por su carbono 1 (cara a cara) con un oxígeno en medio. (x, y) = el puente.
function Trehalosa({ x, y, s = 1, r = 46, brillo = 0, unos = false, partida = 0 }) {
  const sep = partida * 90;
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${TR.glu})` } : null}>
    {partida < 0.05 && <><line x1={-r * 0.95} y1={0} x2={r * 0.95} y2={0} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={0} r={r * 0.3} fill={TR.oxi} stroke={KC.ink} strokeWidth={4} /></>}
    <g transform={`translate(${-r * 1.75 - sep} 0)`}><MoleculaAzucar tipo="glucosa" r={r} gw={5} /></g>
    <g transform={`translate(${r * 1.75 + sep} 0) scale(-1 1)`}><MoleculaAzucar tipo="glucosa" r={r} gw={5} /></g>
    {unos && partida < 0.05 && <><text x={-r * 0.9} y={-r * 0.5} textAnchor="middle" style={{ font:`700 ${r * 0.55}px ${KF.mono}` }} fill={KC.ink}>1</text>
      <text x={r * 0.9} y={-r * 0.5} textAnchor="middle" style={{ font:`700 ${r * 0.55}px ${KF.mono}` }} fill={KC.ink}>1</text></>}
  </g>;
}
// Sacarosa: glucosa (hexágono) + fructosa (pentágono).
function Sacarosa({ x, y, s = 1, r = 46 }) {
  const pent = [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return `${(r * 1.75 + r * 0.95 * Math.cos(a)).toFixed(1)},${(r * 0.95 * Math.sin(a)).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-r * 0.9} y1={0} x2={r * 0.9} y2={0} stroke={KC.ink} strokeWidth={7} />
    <circle cx={0} cy={0} r={r * 0.3} fill={TR.oxi} stroke={KC.ink} strokeWidth={4} />
    <g transform={`translate(${-r * 1.75} 0)`}><MoleculaAzucar tipo="glucosa" r={r} gw={5} /></g>
    <polygon points={pent} fill={TR.fru} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}
function Plato({ x = 540, y = 1060 }) {
  return <g><ellipse cx={x} cy={y + 14} rx={400} ry={92} fill={TR.plato2} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={x} cy={y} rx={400} ry={86} fill={TR.plato} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={x} cy={y} rx={300} ry={58} fill="none" stroke={TR.plato2} strokeWidth={5} /></g>;
}
function Tenedor({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {[-24, -8, 8, 24].map((dx) => <rect key={dx} x={dx - 4} y={-110} width={8} height={110} rx={4} fill="#c9ced8" stroke={KC.ink} strokeWidth={3} />)}
    <path d="M -32 -110 Q 0 -150 32 -110 Z" fill="#c9ced8" stroke={KC.ink} strokeWidth={5} />
    <rect x={-12} y={-430} width={24} height={300} rx={12} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Pancita caricatura (torso con intestino dibujado). infla 0..1, grr 0..1 = rayitas de gruñido.
function Pancita({ T, x, y, r = 110, infla = 0, grr = 0 }) {
  const k = 1 + infla * 0.18 + Math.sin(T * 8) * 0.02 * infla;
  return <g transform={`translate(${x} ${y}) scale(${k})`}>
    <ellipse cx={0} cy={0} rx={r} ry={r * 1.1} fill={TR.piel} stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${-r * 0.5} ${-r * 0.3} q ${r * 0.5} ${-r * 0.3} ${r} 0 q ${-r * 0.1} ${r * 0.5} ${-r * 0.5} ${r * 0.35} q ${-r * 0.4} ${r * 0.2} ${-r * 0.2} ${r * 0.6}`} stroke={TR.colon2} strokeWidth={10} fill="none" strokeLinecap="round" />
    <circle cx={0} cy={r * 0.25} r={6} fill={KC.ink} />
    {grr > 0 && [0, 1, 2].map((i) => <path key={i} d={`M ${r * 1.15} ${-r * 0.4 + i * r * 0.4} q 20 -12 40 0 q 20 12 40 0`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" opacity={grr * (0.5 + 0.5 * Math.sin(T * 9 + i))} />)}
  </g>;
}
function Bascula({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-40} width={400} height={100} rx={20} fill="#e8e3d8" stroke={KC.ink} strokeWidth={8} />
    <rect x={-80} y={-10} width={160} height={46} rx={8} fill="#0d1424" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={26} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.mint}>1 kg</text>
    <rect x={-230} y={-70} width={460} height={34} rx={14} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
    {[[-150, -70, 0.55], [-60, -70, 0.6], [40, -70, 0.55], [130, -70, 0.6], [-100, -140, 0.5], [0, -150, 0.55], [95, -135, 0.5]].map(([cx, cy, s], i) => <Champinon key={i} x={cx} y={cy} s={s} rot={mece(T, i, 0.2) * 3} />)}
  </g>;
}
function Cucharita({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-200} y={-12} width={170} height={24} rx={12} fill="#c9ced8" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={20} cy={0} rx={70} ry={40} fill="#c9ced8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 -6 Q 20 -46 70 -6 Z" fill="#fffdf6" stroke={KC.ink} strokeWidth={4} />
    <text x={20} y={90} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>1 g</text>
  </g>;
}
// Célula de hongo: membrana doble, proteínas plegadas y trehalosas (reserva → escudo).
function CelulaHongo({ T, x = 540, y = 905, rx = 380, ry = 225, llena = 0, escudo = 0, estres = 0 }) {
  const n = 18, g = krng(7), puntos = Array.from({ length: n }, () => [(g() - 0.5) * rx * 1.3, (g() - 0.5) * ry * 1.2]);
  const deforma = estres * (1 - escudo);
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill="rgba(47,224,168,.08)" stroke={TR.mem} strokeWidth={10} strokeDasharray={deforma > 0.3 ? '30 14' : 'none'} />
    <ellipse cx={0} cy={0} rx={rx - 18} ry={ry - 18} fill="none" stroke={TR.mem} strokeWidth={5} opacity=".7" />
    {[[-150, -40], [40, 60], [180, -60]].map(([px, py], i) => <path key={i} d={`M ${px - 50} ${py} q 25 -50 50 0 t 50 0 q -20 40 -50 30`} stroke={TR.prot} strokeWidth={14} fill="none" strokeLinecap="round" transform={`translate(${px} ${py}) scale(${1 + deforma * 0.3} ${1 - deforma * 0.4}) translate(${-px} ${-py})`} />)}
    {puntos.map(([px, py], i) => { const a = (i / n) * Math.PI * 2, bx = Math.cos(a) * (rx - 50), by = Math.sin(a) * (ry - 46);
      const u = kclamp(llena * 1.5 - i / n * 0.5, 0, 1); if (u <= 0) return null;
      const qx = klerp(px, bx, escudo), qy = klerp(py, by, escudo);
      return <g key={i} opacity={u}><Trehalosa x={qx + Math.sin(T * 2 + i) * 4} y={qy} s={0.22} /></g>; })}
  </g>;
}
function Sol({ x, y, o = 1, T }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={0} x2={Math.cos(i * Math.PI / 4 + T) * 80} y2={Math.sin(i * Math.PI / 4 + T) * 80} stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" />)}
    <circle r={48} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Frio({ x, y, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-16} y={-90} width={32} height={130} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={50} r={26} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} /><rect x={-7} y={-20} width={14} height={60} fill={KC.cyan} />
    <g transform="translate(70 -30)">{[0, 60, 120].map((a) => <line key={a} x1={-34} y1={0} x2={34} y2={0} stroke="#bfefff" strokeWidth={8} strokeLinecap="round" transform={`rotate(${a})`} />)}</g>
  </g>;
}
// Vellosidades del intestino delgado (dedos con borde en cepillo). base y.
function Vellosidades({ y = 1180, alto = 420 }) {
  return <g>{[150, 340, 540, 740, 930].map((cx, i) => { const h = alto * (i === 2 ? 1 : 0.85);
    const d = `M ${cx - 70} ${y} L ${cx - 70} ${y - h + 70} Q ${cx - 70} ${y - h} ${cx} ${y - h} Q ${cx + 70} ${y - h} ${cx + 70} ${y - h + 70} L ${cx + 70} ${y}`;
    return <g key={i}><path d={d} fill={TR.vello} stroke={KC.ink} strokeWidth={8} />
      <path d={d} fill="none" stroke={TR.vello2} strokeWidth={14} strokeDasharray="3 8" transform="translate(0 0)" opacity=".9" /></g>; })}
    <rect x={-20} y={y} width={1120} height={60} fill={TR.vello2} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Enzima({ x, y, s = 1, color = KC.pink, abre = 0.5, rot = 0 }) {
  const a = (20 + abre * 26) * Math.PI / 180;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(a) * 90} ${-Math.sin(a) * 90} A 90 90 0 1 0 ${Math.cos(a) * 90} ${Math.sin(a) * 90} Z`} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-26} cy={-38} r={10} fill={KC.ink} />
  </g>;
}
// Mapa esquemático: Groenlandia y Dinamarca.
function MapaNorte({ x, y, p = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M 60 40 Q 120 -20 220 10 Q 300 30 290 120 Q 280 220 220 300 Q 170 360 130 330 Q 90 280 70 200 Q 20 120 60 40 Z" fill="#f4f1ea" stroke={KC.ink} strokeWidth={7} />
    <text x={170} y={180} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>Groenlandia</text>
    <path d="M 560 250 Q 590 220 620 240 Q 640 270 615 300 Q 585 320 565 295 Z" fill="#ffd34d" stroke={KC.ink} strokeWidth={6} />
    <text x={600} y={350} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>Dinamarca</text>
    <FlechaCurva x1={560} y1={240} x2={300} y2={150} p={p} curva={-80} color={KC.ink} grosor={7} />
  </g>;
}
function Persona({ x, y, color }) {
  return <g transform={`translate(${x} ${y})`}><circle cx={0} cy={-14} r={9} fill={color} stroke={KC.ink} strokeWidth={3} />
    <path d="M -12 16 Q -12 -2 0 -2 Q 12 -2 12 16 Z" fill={color} stroke={KC.ink} strokeWidth={3} /></g>;
}
// Colon (tubo) con agua que entra, bacterias y burbujas.
function Colon({ T, agua = 0, bact = 0, gas = 0 }) {
  return <g>
    <rect x={-40} y={720} width={1160} height={360} rx={180} fill={TR.colon} stroke={KC.ink} strokeWidth={10} />
    {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${60 + i * 135} 724 Q ${80 + i * 135} 900 ${60 + i * 135} 1076`} stroke={TR.colon2} strokeWidth={6} fill="none" opacity=".6" />)}
    {agua > 0 && Array.from({ length: 10 }, (_, i) => { const u = kclamp(agua * 1.6 - i * 0.06, 0, 1); return u > 0 ? <path key={i} d="M 0 -16 q 12 18 0 26 q -12 -8 0 -26 Z" fill={TR.agua} stroke={KC.ink} strokeWidth={3}
      transform={`translate(${klerp(-20, 260 + (i % 5) * 70, u)} ${klerp(650, 830 + Math.floor(i / 5) * 110, u)}) scale(1.6)`} /> : null; })}
    {bact > 0 && [[620, 850, 20], [780, 960, -30], [900, 830, 60], [700, 1010, 5]].map(([bx, by, r], i) => <g key={i} opacity={kclamp(bact * 2 - i * 0.2, 0, 1)}><Bacteria T={T} x={bx} y={by} rot={r + mece(T, i, 0.3) * 8} largo={150} ancho={60} seed={i + 2} /></g>)}
    {gas > 0 && Array.from({ length: 10 }, (_, i) => { const f = (T * 0.6 + i * 0.13) % 1; return <circle key={i} cx={640 + (i % 5) * 70 + Math.sin(T * 3 + i) * 12} cy={1040 - f * 300} r={10 + (i % 3) * 6} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={3} opacity={gas * (1 - f * 0.6)} />; })}
  </g>;
}
function Cromosoma({ x, y, s = 1, banda = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => <g key={k} transform={`rotate(${k * 10})`}>
      <rect x={-34} y={-280} width={68} height={250} rx={34} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
      <rect x={-34} y={30} width={68} height={300} rx={34} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
      <rect x={-34} y={200} width={68} height={34} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} opacity={banda} />
    </g>)}
    <circle r={26} fill={KC.violet} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Anticuerpo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round">
    <path d="M 0 100 L 0 0 L -70 -90 M 0 0 L 70 -90" stroke="#2346ff" strokeWidth={26} fill="none" />
    <path d="M 0 100 L 0 0 L -70 -90 M 0 0 L 70 -90" stroke={KC.ink} strokeWidth={4} fill="none" />
  </g>;
}
function Tarjeta({ x, y, w, h, titulo, color = KC.paper, children }) {
  return <g><rect x={x} y={y} width={w} height={h} rx={30} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text x={x + w / 2} y={y + 64} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>{children}</g>;
}

const CHAMPIS = [[400, 1060, 0.85], [540, 1070, 0.95], [680, 1060, 0.85]];
const P100 = Array.from({ length: 100 }, (_, i) => [180 + (i % 10) * 80, 720 + Math.floor(i / 10) * 46]);
const OCHO = [3, 17, 28, 41, 55, 62, 79, 94];   // posiciones ilustrativas

function TrehalosaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, No: CUES.Nombre, Fo: CUES.Forma, Cu: CUES.Cuanto, Es: CUES.Escudo, Le: CUES.Levadura, P: CUES.Pregunta, Tr: CUES.Trehalasa,
    Est: CUES.Estudio, Oc: CUES.Ocho, Co: CUES.Colon, Ge: CUES.Gen, Oj: CUES.Ojo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const pincha = kprog(T, K.G, K.G + 0.45, kEase.suave), alza = kprog(T, K.G + 1.4, K.G + 2.2, kEase.suave);
  const sube = kprog(T, K.No, K.No + 1.2, kEase.sale);
  const corta = kprog(T, K.Tr + 1.8, K.Tr + 2.4), baja = kprog(T, K.Tr + 0.2, K.Tr + 1.5, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho: el tenedor pincha; la panza gruñe; sale la trehalosa */}
      <Escena T={T} a={K.G} b={K.Fo} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato />
          {CHAMPIS.map(([cx, cy, s], i) => <Champinon key={i} x={cx} y={cy} s={s} />)}
          <Tenedor x={560} y={klerp(500, 900, pincha) - alza * 420} rot={8} />
          <Pancita T={T} x={210} y={720} r={95} grr={kprog(T, K.G + 0.4, K.G + 0.9) * (1 - kprog(T, K.No, K.No + 0.4))} />
          {sube > 0 && <Trehalosa x={560} y={klerp(860, 640, sube)} s={klerp(0.3, 1.2, sube)} brillo={0.8} unos />}
        </>)}
      </Escena>
      {/* 3 · no es el azúcar de mesa */}
      <Escena T={T} a={K.Fo} b={K.Cu} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Tarjeta x={50} y={640} w={470} h={380} titulo="azúcar de mesa">
            <g transform="translate(150 790)"><rect x={-50} y={-50} width={100} height={100} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={6} /><path d="M -50 -50 L -20 -80 L 80 -80 L 50 -50 M 50 50 L 80 20 L 80 -80" fill="none" stroke={KC.ink} strokeWidth={6} /></g>
            <Sacarosa x={330} y={800} s={0.85} r={46} />
            <path d="M 90 720 L 480 1000 M 480 720 L 90 1000" stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={0.8 * kprog(T, K.Fo + 1.2, K.Fo + 1.5)} />
          </Tarjeta>
          <Tarjeta x={560} y={640} w={470} h={380} titulo="trehalosa">
            <Trehalosa x={795} y={840} s={0.95} unos />
          </Tarjeta>
        </>)}
      </Escena>
      {/* 4 · cuánto trae: ≈ 1 g por kilo */}
      <Escena T={T} a={K.Cu} b={K.Es} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<><Bascula x={370} y={1080} T={T} /><Cucharita x={860} y={1020} /></>)}
      </Escena>
      {/* 5 · reserva y escudo (al microscopio) */}
      <Escena T={T} a={K.Es} b={K.Le} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <CelulaHongo T={T} llena={kprog(T, K.Es + 0.3, K.Es + 1.6)} escudo={kprog(T, K.Es + 2.6, K.Es + 3.6, kEase.suave)} estres={kprog(T, K.Es + 2.0, K.Es + 2.6)} />
          <Sol x={170} y={500} T={T} o={kprog(T, K.Es + 2.0, K.Es + 2.4)} />
          <Frio x={350} y={510} o={kprog(T, K.Es + 2.4, K.Es + 2.8)} />
        </>)}
      </Escena>
      {/* 6 · levadura seca */}
      <Escena T={T} a={K.Le} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {[[200, 860], [330, 820], [260, 980], [400, 960]].map(([lx, ly], i) => <Levadura key={i} x={lx} y={ly} r={62} T={T} seed={i} />)}
          <g opacity={0.45} style={{ filter:'grayscale(1)' }}>{[[680, 860], [810, 820], [740, 980], [880, 960]].map(([lx, ly], i) => <Levadura key={i} x={lx} y={ly} r={62} T={0} seed={i} rot={20} />)}</g>
          <path d="M 250 1100 L 290 1140 L 360 1060" stroke={KC.mint} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={kprog(T, K.Le + 1.0, K.Le + 1.3)} />
          <path d="M 740 1060 L 820 1140 M 820 1060 L 740 1140" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.Le + 1.4, K.Le + 1.7)} />
          <line x1={540} y1={740} x2={540} y2={1100} stroke="rgba(255,255,255,.3)" strokeWidth={4} strokeDasharray="14 10" />
        </>)}
      </Escena>
      {/* 7 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Tr} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Pancita T={T} x={300} y={1000} r={120} grr={1} /><Interrogacion T={T} x={300} y={830} tam={300} /><Trehalosa x={250} y={480} s={0.7} /></>)}
      </Escena>
      {/* 8 · la trehalasa en tus vellosidades */}
      <Escena T={T} a={K.Tr} b={K.Est} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <Vellosidades y={1180} alto={420} />
          <Trehalosa x={540} y={klerp(460, 700, baja)} s={0.8} partida={corta} />
          {corta >= 1 && [-1, 1].map((k) => { const u = kprog(T, K.Tr + 2.4, K.Tr + 3.6, kEase.suave); return <g key={k} opacity={1 - kprog(T, K.Tr + 3.3, K.Tr + 3.8)}>
            <MoleculaAzucar tipo="glucosa" x={540 + k * klerp(210, 40, u)} y={klerp(700, 900, u)} r={34} gw={4} /></g>; })}
          {T < K.Tr + 2.8 && <g opacity={kprog(T, K.Tr + 1.0, K.Tr + 1.4) * (1 - kprog(T, K.Tr + 2.4, K.Tr + 2.8))}>
            <Enzima x={klerp(1150, 650, kprog(T, K.Tr + 1.0, K.Tr + 1.8, kEase.sale))} y={590} s={0.85} rot={150} abre={T > K.Tr + 1.8 && T < K.Tr + 2.0 ? 0 : 0.8} /></g>}
        </>)}
      </Escena>
      {/* 9 · el estudio de 1988 */}
      <Escena T={T} a={K.Est} b={K.Oc} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<MapaNorte x={180} y={760} p={kprog(T, K.Est + 1.8, K.Est + 2.8)} />)}
      </Escena>
      {/* 10 · al menos 8 de cada 100 (de 97 estudiados) */}
      <Escena T={T} a={K.Oc} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>{P100.map(([px, py], i) => { const k = OCHO.indexOf(i); const on = k >= 0 ? kprog(T, K.Oc + 0.4 + k * 0.12, K.Oc + 0.6 + k * 0.12) : 0;
          return <Persona key={i} x={px} y={py} color={mixHex('#f4f1ea', TR.naranja, on)} />; })}</>)}
      </Escena>
      {/* 11 · en el colon: jala agua y puede fermentarse */}
      <Escena T={T} a={K.Co} b={K.Ge} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={12} />
        {fsvg(<>
          <Colon T={T} agua={kprog(T, K.Co + 0.9, K.Co + 2.4)} bact={kprog(T, K.Co + 2.2, K.Co + 3.0)} gas={kprog(T, K.Co + 3.0, K.Co + 3.6)} />
          {[0, 1, 2].map((i) => { const u = kprog(T, K.Co + 0.1 + i * 0.2, K.Co + 1.6 + i * 0.2, kEase.sale); return <Trehalosa key={i} x={klerp(-120, 300 + i * 180, u)} y={830 + (i % 2) * 120} s={0.55} />; })}
          <Pancita T={T} x={180} y={510} r={80} infla={kprog(T, K.Co + 3.2, K.Co + 4.4)} />
        </>)}
      </Escena>
      {/* 12 · el gen TREH */}
      <Escena T={T} a={K.Ge} b={K.Oj} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Cromosoma x={210} y={850} s={0.95} banda={kprog(T, K.Ge + 0.6, K.Ge + 1.0)} />
          <ADNHebra T={T} x={450} y={760} largo={520} alto={70} vueltas={2.5} resalta={(u) => Math.abs(u - 0.5) < 0.06} />
          {[['GG', 240, KC.mint], ['AG', 160, KC.gold2], ['AA', 80, TR.naranja]].map(([lab, h, col], i) => { const u = kprog(T, K.Ge + 2.0 + i * 0.2, K.Ge + 2.6 + i * 0.2, kEase.sale);
            return <g key={lab}><rect x={500 + i * 150} y={1080 - h * u} width={100} height={h * u} fill={col} stroke={KC.ink} strokeWidth={6} />
              <text x={550 + i * 150} y={1118} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{lab}</text></g>; })}
          <line x1={480} y1={1080} x2={960} y2={1080} stroke={KC.ink} strokeWidth={6} />
          <text x={730} y={1160} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Ge + 2.4, K.Ge + 2.8)}>actividad de la enzima · esquemático</text>
        </>)}
      </Escena>
      {/* 13 · ojo: alergia ≠ falta de una enzima */}
      <Escena T={T} a={K.Oj} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Tarjeta x={50} y={640} w={440} h={440} titulo="alergia"><Anticuerpo x={270} y={880} s={1.1} />
            <text x={270} y={1050} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>sistema inmune</text></Tarjeta>
          <text x={540} y={900} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>≠</text>
          <Tarjeta x={590} y={640} w={440} h={440} titulo="falta una enzima"><Enzima x={810} y={880} s={1.0} color={KC.pink} abre={0.6 + 0.4 * Math.sin(T * 6)} rot={180} />
            <text x={810} y={1050} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>trehalasa baja</text></Tarjeta>
        </>)}
      </Escena>
      {/* 14 · cierre: el mismo plato, con el azúcar sin cortar */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Plato />
          {CHAMPIS.map(([cx, cy, s], i) => <Champinon key={i} x={cx} y={cy} s={s} />)}
          <Tenedor x={880} y={1000} rot={40} />
          <Trehalosa x={540} y={720 + Math.sin(T * 2) * 10} s={1.0} brillo={0.7} />
          <Enzima x={300} y={720} s={0.55} color={KC.pink} rot={20} abre={0.6 + 0.4 * Math.sin(T * 5)} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.7} tacharEn={K.G + 1.8} until={K.No - 0.3} texto="¿alergia?" x={300} y={440} tam={50} />
      <Chip T={T} at={K.G + 2.2} until={K.No - 0.3} texto="¿un azúcar?" x={300} y={540} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.No + 0.6} until={K.Fo - 0.3} x={60} y={460} texto="trehalosa" tam={44} color={KC.ink} />
      <Chip T={T} at={K.No + 1.0} until={K.Fo - 0.3} texto="también: micosa" x={300} y={545} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.No + 1.3} until={K.Fo - 0.3} x={400} y={760} texto="glucosa + glucosa" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Fo + 0.6} until={K.Cu - 0.3} texto="sacarosa = glucosa + fructosa" x={285} y={1075} tam={22} borde={KC.ink} />
      <Chip T={T} at={K.Fo + 1.6} until={K.Cu - 0.3} texto="enlace 1 ↔ 1: cara a cara" x={795} y={1075} tam={22} borde={KC.gold} />
      <NumeroGigante T={T} at={K.Cu + 0.4} until={K.Es - 0.3} valor={1} dur={0.5} prefijo="≈ " sufijo=" g / kg" x={540} y={500} tam={140} color={KC.yellow} />
      <Chip T={T} at={K.Cu + 1.0} until={K.Es - 0.3} texto="champiñón fresco · medido en 2013" x={540} y={650} tam={30} borde={KC.gold} />
      <Etq T={T} at={K.Cu + 1.6} until={K.Es - 0.3} x={60} y={760} texto="Agaricus bisporus" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.1} until={K.Le - 0.3} texto="AL MICROSCOPIO · CÉLULA DE HONGO" x={420} y={400} tam={26} borde={KC.cyan} mono />
      <Chip T={T} at={K.Es + 0.8} until={K.Es + 2.0} texto="reserva" x={380} y={640} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.Es + 3.0} until={K.Le - 0.3} texto="escudo: membranas y proteínas" x={380} y={640} tam={26} borde={KC.mint} />
      <Etq T={T} at={K.Es + 2.2} until={K.Le - 0.3} x={60} y={590} texto="sequedad · frío" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Le + 0.2} until={K.P - 0.3} x={60} y={470} texto="Saccharomyces cerevisiae" it tam={30} color={KC.texto} />
      <Chip T={T} at={K.Le + 0.5} until={K.P - 0.3} texto="tras mucho tiempo seca" x={540} y={600} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Le + 0.9} until={K.P - 0.3} x={150} y={700} texto="con trehalosa" tam={28} color={KC.mint} />
      <Etq T={T} at={K.Le + 1.3} until={K.P - 0.3} x={640} y={700} texto="sin trehalosa" tam={28} color={KC.red} />
      <Chip T={T} at={K.Tr + 0.1} until={K.Est - 0.3} texto="POR DENTRO · TU INTESTINO DELGADO" x={540} y={400} tam={26} borde={KC.cyan} mono />
      <Etq T={T} at={K.Tr + 1.4} until={K.Tr + 2.6} x={60} y={600} texto="trehalasa" tam={34} color={KC.pink} />
      <Etq T={T} at={K.Tr + 2.6} until={K.Est - 0.3} x={60} y={600} texto="2 glucosas → se absorben" tam={30} color={TR.glu} />
      <Etq T={T} at={K.Tr + 0.6} until={K.Est - 0.3} x={60} y={690} texto="vellosidades" tam={26} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Est + 0.2} until={K.Oc - 0.3} anio="1988" quien="U. de Copenhague" revista="Scand. J. Gastroenterol., 1988" x={360} y={560} />
      <Chip T={T} at={K.Est + 2.0} until={K.Oc - 0.3} texto="biopsias de 97 adultos" x={760} y={800} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Oc + 0.3} until={K.Co - 0.3} valor={8} dur={0.6} prefijo="≥ " sufijo=" % de 97" x={340} y={470} tam={96} color={TR.naranja} />
      <Chip T={T} at={K.Oc + 0.8} until={K.Co - 0.3} texto="de 97 adultos estudiados (1988)" x={400} y={585} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Oc + 1.2} until={K.Co - 0.3} texto="trehalasa baja" x={400} y={650} tam={24} borde={TR.naranja} />
      <Etq T={T} at={K.Co + 1.2} until={K.Ge - 0.3} x={340} y={680} texto="jala agua" tam={30} color={TR.agua} />
      <Chip T={T} at={K.Co + 3.0} until={K.Ge - 0.3} texto="gases" x={620} y={480} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Co + 3.3} until={K.Ge - 0.3} texto="diarrea" x={860} y={480} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Co + 3.8} until={K.Ge - 0.3} texto="varía de persona a persona" x={740} y={575} tam={24} borde={KC.ink} />
      <Etq T={T} at={K.Co + 2.4} until={K.Ge - 0.3} x={60} y={1120} texto="colon · bacterias" tam={26} color={KC.texto} />
      <Etq T={T} at={K.Ge + 0.8} until={K.Oj - 0.3} x={60} y={500} texto="TREH · cromosoma 11" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ge + 1.4} until={K.Oj - 0.3} texto="una letra cambia: G → A" x={480} y={650} tam={22} borde={KC.gold} mono />
      <Etq T={T} at={K.Oj + 1.2} until={K.C - 0.3} x={600} y={560} texto="No es consejo médico." tam={26} color={KC.ink} />
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 0.8} until={K.Ou} texto="¿alergia?" x={300} y={440} tam={50} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="un azúcar sin cortar" x={300} y={540} tam={36} borde={KC.gold} />

      {/* barras de escala (color claro del kit) */}
      <BarraEscala T={T} at={K.G} until={K.Fo} texto="2 cm" largo={150} />
      <BarraEscala T={T} at={K.Fo} until={K.Cu} texto="moléculas esquemáticas" largo={0} />
      <BarraEscala T={T} at={K.Cu} until={K.Es} texto="2 cm" largo={110} />
      <BarraEscala T={T} at={K.Es} until={K.P} texto="5 µm" largo={140} />
      <BarraEscala T={T} at={K.P} until={K.Tr} texto="dibujo esquemático" largo={0} />
      <BarraEscala T={T} at={K.Tr} until={K.Est} texto="0.5 mm (vellosidades)" largo={140} />
      <BarraEscala T={T} at={K.Est} until={K.Oc} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.Oc} until={K.Co} texto="100 personitas = esquema" largo={0} />
      <BarraEscala T={T} at={K.Co} until={K.Ge} texto="dibujo esquemático" largo={0} />
      <BarraEscala T={T} at={K.Ge} until={K.Oj} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.Oj} until={K.C} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="2 cm" largo={150} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.No - 0.1} texto="Quizá no es alergia: *es un azúcar.*" />
      <Subtitulo T={T} idx={1} at={K.No + 0.1} until={K.Fo - 0.1} texto="Trehalosa: *el azúcar de los hongos.*" />
      <Subtitulo T={T} idx={2} at={K.Fo + 0.1} until={K.Cu - 0.1} texto="No es azúcar de mesa: *dos glucosas.*" />
      <Subtitulo T={T} idx={3} at={K.Cu + 0.1} until={K.Es - 0.1} texto="≈ 1 gramo *por kilo de champiñón.*" />
      <Subtitulo T={T} idx={4} at={K.Es + 0.1} until={K.Le - 0.1} texto="Reserva y escudo *contra sequedad y frío.*" />
      <Subtitulo T={T} idx={5} at={K.Le + 0.1} until={K.P - 0.1} texto="Sin ella, la levadura seca *no aguanta.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Tr - 0.1} texto="¿Y tú *cómo la digieres?*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.Est - 0.1} texto="La trehalasa *la corta en dos glucosas.*" />
      <Subtitulo T={T} idx={8} at={K.Est + 0.1} until={K.Oc - 0.1} texto="1988: biopsias de *97 adultos de Groenlandia.*" />
      <Subtitulo T={T} idx={9} at={K.Oc + 0.1} until={K.Co - 0.1} texto="Al menos 8 de cada 100: *muy poca trehalasa.*" />
      <Subtitulo T={T} idx={10} at={K.Co + 0.1} until={K.Ge - 0.1} texto="En el colon: *puede haber gases y diarrea.*" />
      <Subtitulo T={T} idx={11} at={K.Ge + 0.1} until={K.Oj - 0.1} texto="Su gen: *TREH.*" />
      <Subtitulo T={T} idx={12} at={K.Oj + 0.1} until={K.C - 0.1} texto="Una alergia *es otra cosa.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Quizá no es alergia: *es un azúcar sin cortar.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Fo + 0.3, K.Cu - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Es + 0.3, K.Le - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.Tr + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Est + 0.3, K.Oc - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Oc + 0.3, K.Co - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ge + 0.3, K.Oj - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Oj + 0.2, K.C - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.C + 0.2, K.Ou - 0.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="151" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TrehalosaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TrehalosaShot /></CompositionStage></div>;
}
window.TrehalosaApp = TrehalosaApp;
