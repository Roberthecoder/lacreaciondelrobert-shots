// Shot Fungi Mati #67 · La espina de rosal que te mete un hongo: esporotricosis — NARRADO (gancho 1 "Esto no es X: es Y" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (sin fotos de lesiones). No es consejo médico.

const SP = { piel:'#f2c29b', piel2:'#d99a72', tallo:'#3f8f3a', hoja:'#4fbf55', rosa:'#e8336d', rosa2:'#b81d50', hifa:'#fff4d6', lev:'#f4c25a', bulto:'#e9897a', linfa:'#62e0a0', guante:'#3fbf4a' };

function Rosal({ x, y, s = 1, T }) {
  const flor = (fx, fy, r, i) => <g key={i} transform={`translate(${fx} ${fy + Math.sin(T * 1.6 + i) * 4}) rotate(${Math.sin(T + i) * 4})`}>
    {Array.from({ length: 6 }, (_, k) => <ellipse key={k} cx={Math.cos(k * 1.05) * r * 0.5} cy={Math.sin(k * 1.05) * r * 0.5} rx={r * 0.55} ry={r * 0.45} fill={k % 2 ? SP.rosa : '#ff5b8e'} stroke={KC.ink} strokeWidth={5} />)}
    <circle r={r * 0.4} fill={SP.rosa2} stroke={KC.ink} strokeWidth={5} /></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 300 Q -10 100 20 -120 M 10 120 Q 120 60 180 -40 M 5 40 Q -110 0 -170 -90" stroke={SP.tallo} strokeWidth={18} fill="none" strokeLinecap="round" />
    {[[14, 210, 1], [4, 90, -1], [16, -40, 1], [100, 70, 1], [150, 0, -1], [-80, 20, -1], [-140, -50, 1]].map(([ex, ey, d], i) =>
      <path key={i} d={`M ${ex} ${ey} l ${d * 26} -8 l ${-d * 22} -14 Z`} fill="#2e6b2b" stroke={KC.ink} strokeWidth={3} />)}
    {[[60, 150, 20], [-60, 80, -30], [110, 20, 40], [-120, -20, -20]].map(([hx, hy, r], i) =>
      <ellipse key={i} cx={hx} cy={hy} rx={46} ry={24} transform={`rotate(${r} ${hx} ${hy})`} fill={SP.hoja} stroke={KC.ink} strokeWidth={5} />)}
    {flor(20, -150, 70, 0)}{flor(185, -70, 56, 1)}{flor(-175, -115, 60, 2)}
  </g>;
}
// Mano de lado con dedo índice. guante 0..1.
function Mano({ x, y, s = 1, rot = 0, guante = 0, gota = 0, manga = 0 }) {
  const c = guante > 0.5 ? SP.guante : SP.piel;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={120} y={-70} width={320} height={140} rx={30} fill={manga > 0.5 ? '#2346ff' : SP.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M 140 -80 Q 0 -90 -40 -60 L -200 -60 Q -240 -40 -200 -20 L -40 -20 Q -50 20 -30 40 L 60 70 Q 120 90 150 70 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {gota > 0 && guante < 0.5 && <circle cx={-205} cy={-28 + 30 * gota} r={9 + 4 * gota} fill={KC.red} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Hifa fina con conidios "en forma de flor" en la punta.
function HifaFlor({ x, y, s = 1, p = 1, rot = 0 }) {
  if (p <= 0) return null;
  const L = 320 * p;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 Q ${L * 0.4} -20 ${L} 0`} stroke={SP.hifa} strokeWidth={8} fill="none" strokeLinecap="round" />
    {p > 0.8 && Array.from({ length: 7 }, (_, k) => { const a = k / 7 * Math.PI * 2, o = kprog(p, 0.8, 1); return <ellipse key={k} cx={L + Math.cos(a) * 26 * o} cy={Math.sin(a) * 26 * o} rx={11 * o} ry={7 * o}
      transform={`rotate(${a * 57} ${L + Math.cos(a) * 26 * o} ${Math.sin(a) * 26 * o})`} fill="#f7efd9" stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Levadura alargada "como puro", con yema.
function Puro({ x, y, s = 1, rot = 0, yema = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={46} ry={17} fill={SP.lev} stroke={KC.ink} strokeWidth={4} />
    {yema > 0 && <ellipse cx={46 + 14 * yema} cy={0} rx={16 * yema} ry={9 * yema} fill={SP.lev} stroke={KC.ink} strokeWidth={4} />}
    <ellipse cx={-14} cy={-5} rx={10} ry={4} fill="rgba(255,255,255,.5)" />
  </g>;
}
function Brazo({ x, y, s = 1, n = 0, linfa = 0 }) {
  const B = [[-330, 10], [-190, -6], [-60, -16], [70, -24]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -470 -60 Q -500 0 -470 60 L 300 90 Q 420 90 440 0 Q 420 -90 300 -100 Z" fill={SP.piel} stroke={KC.ink} strokeWidth={9} />
    <path d="M -520 -40 Q -600 -50 -620 -10 Q -600 30 -520 40 Z" fill={SP.piel} stroke={KC.ink} strokeWidth={8} />
    {linfa > 0 && <path d="M -440 20 Q -200 -10 60 -24 T 380 -40" pathLength={1} stroke={SP.linfa} strokeWidth={10} fill="none" strokeDasharray={`${linfa} 2`} strokeLinecap="round" opacity=".85" />}
    {B.map(([bx, by], i) => { const on = kclamp(n - i, 0, 1); return on > 0 ? <g key={i}><circle cx={bx} cy={by} r={30 * on} fill={SP.bulto} stroke={KC.ink} strokeWidth={5} /><circle cx={bx - 8} cy={by - 8} r={8 * on} fill="#ffd0c4" /></g> : null; })}
  </g>;
}
function Gato({ x, y, s = 1, T, zarpa = 0 }) {
  const c = Math.sin(T * 3) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 140 40 Q 260 ${-20 + c} 250 ${-140 + c}`} stroke="#e39b3a" strokeWidth={26} fill="none" strokeLinecap="round" />
    <ellipse cx={40} cy={40} rx={150} ry={95} fill="#f0a94a" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-110} cy={-50} r={85} fill="#f0a94a" stroke={KC.ink} strokeWidth={8} />
    <path d="M -180 -100 L -170 -175 L -120 -125 Z M -60 -110 L -50 -180 L -100 -130 Z" fill="#f0a94a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <ellipse cx={-140} cy={-60} rx={9} ry={14} fill={KC.ink} /><ellipse cx={-80} cy={-60} rx={9} ry={14} fill={KC.ink} />
    <path d="M -120 -25 l 10 8 l 10 -8" stroke={KC.ink} strokeWidth={5} fill="none" />
    <g transform={`translate(${-150 - 60 * zarpa} ${100 - 40 * zarpa}) rotate(${-30 * zarpa})`}><ellipse rx={40} ry={26} fill="#f0a94a" stroke={KC.ink} strokeWidth={6} />
      {zarpa > 0.5 && [-14, 0, 14].map((d, i) => <path key={i} d={`M ${-30} ${d} l -26 -6`} stroke="#fff" strokeWidth={5} strokeLinecap="round" />)}</g>
  </g>;
}
function Mina({ T }) {
  return <g>
    <rect x={0} y={560} width={1080} height={700} fill="#2a1d14" />
    <path d="M 160 1260 L 160 760 Q 540 600 920 760 L 920 1260 Z" fill="#100b08" />
    {[[140, 760, 1260], [900, 760, 1260]].map(([x, a, b], i) => <rect key={i} x={x} y={a} width={60} height={b - a} fill="#8a5a2b" stroke={KC.ink} strokeWidth={6} />)}
    <rect x={120} y={720} width={840} height={56} fill="#9c6a35" stroke={KC.ink} strokeWidth={6} />
    {[[380, 1050], [620, 1080]].map(([x, y], i) => <g key={i}><path d={`M ${x - 50} ${y} Q ${x} ${y - 70} ${x + 50} ${y} Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      <circle cx={x} cy={y - 40} r={12} fill="#fff7c2" /><path d={`M ${x} ${y - 40} L ${x - 140} ${y + 120} L ${x + 140} ${y + 120} Z`} fill="#fff7c2" opacity={0.12 + 0.05 * Math.sin(T * 5 + i)} /></g>)}
  </g>;
}
// Mapa de Brasil esquemático.
function Brasil({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -160 Q 20 -200 130 -120 Q 200 -60 170 20 Q 120 140 30 190 Q -20 210 -40 150 Q -80 60 -150 20 Q -200 -40 -170 -110 Z" fill="#62c46f" stroke={KC.ink} strokeWidth={7} />
    <circle cx={110} cy={70} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

function EsporoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, En: CUES.Entra, Di: CUES.Dimorfo, Bu: CUES.Bulto, Ca: CUES.Cadena, P: CUES.Pregunta, Ga: CUES.Gatos, E: CUES.Estudio, Mx: CUES.Mexico, Mi: CUES.Mineros, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const pica = kprog(T, K.G + 0.1, K.G + 0.5, kEase.sale);
  const manoX = klerp(980, 700, pica);

  const interiorPiel = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill="#3a1a14" />
    <rect x={0} y={0} width={600} height={170} fill={SP.piel} /><rect x={0} y={170} width={600} height={430} fill="#e9a58a" />
    {Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={30 + (i % 7) * 90} cy={260 + Math.floor(i / 7) * 160} rx={38} ry={26} fill="#f6c3ad" stroke={KC.ink} strokeWidth={3} />)}
    {(() => { const p = kprog(t, K.En + 0.5, K.En + 1.4, kEase.sale); return <path d={`M 300 ${-40 + 260 * p} L 270 -60 L 330 -60 Z`} fill="#6b3a1c" stroke={KC.ink} strokeWidth={5} />; })()}
    {[[300, 230, 60], [300, 240, 140], [300, 235, -30]].map(([x, y, a], i) => <HifaFlor key={i} x={x} y={y} s={0.6} rot={a} p={kprog(t, K.En + 1.6 + i * 0.3, K.En + 3.2 + i * 0.3)} />)}
  </svg>;
  const interiorCierre = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 600 600" style={{ display:'block' }}>
    <rect width={600} height={600} fill="#123015" />
    <rect x={0} y={260} width={600} height={340} fill={SP.guante} stroke={KC.ink} strokeWidth={6} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${60 + i * 120} 270 q 30 -30 60 0`} stroke="#2a8a2e" strokeWidth={5} fill="none" />)}
    <path d="M 300 120 L 280 0 L 320 0 Z" fill="#6b3a1c" stroke={KC.ink} strokeWidth={5} transform={`translate(0 ${100 * kprog(t, K.C + 1.0, K.C + 1.6, kEase.sale) - 40 * kprog(t, K.C + 1.7, K.C + 2.3)})`} />
  </svg>;

  const tmp = klerp(25, 37, kprog(T, K.En + 2.0, K.En + 3.6, kEase.suave));
  const nB = 4 * kprog(T, K.Ca + 0.6, K.Ca + 3.2);
  const nCas = Math.round(4188 * kprog(T, K.E + 1.0, K.E + 3.0, kEase.suave));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la espina pica el dedo */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Rosal x={380} y={900} s={1.25} T={T} /><Mano x={manoX} y={960} s={0.9} gota={kprog(T, K.G + 0.6, K.G + 1.6)} /></>)}
      </Escena>
      {/* 1 · dónde vive: tierra, musgo, paja, rosales */}
      <Escena T={T} a={K.N} b={K.En} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{[['tierra', 290, 650, '#7a4a24'], ['musgo esfagno', 790, 650, '#6fbf5a'], ['paja', 290, 960, '#e8c25a'], ['rosales', 790, 960, SP.rosa]].map(([n, x, y, c], i) => { const p = kprog(T, K.N + 0.3 + i * 0.5, K.N + 0.8 + i * 0.5, kEase.rebote);
          return p > 0 ? <g key={i} transform={`translate(${x} ${y}) scale(${p})`}>
            <circle r={100} fill="#fff" stroke={KC.ink} strokeWidth={8} />
            {i === 0 && <path d="M -110 30 Q 0 -20 110 30 L 110 90 L -110 90 Z" fill={c} stroke={KC.ink} strokeWidth={5} />}
            {i === 1 && Array.from({ length: 9 }, (_, k) => <path key={k} d={`M ${-80 + k * 20} 80 q -6 -60 ${(k % 2 ? 10 : -10)} -110`} stroke={c} strokeWidth={12} fill="none" strokeLinecap="round" />)}
            {i === 2 && Array.from({ length: 8 }, (_, k) => <line key={k} x1={-90 + k * 10} y1={70} x2={-40 + k * 18} y2={-70} stroke={c} strokeWidth={9} strokeLinecap="round" />)}
            {i === 3 && <g><path d="M 0 90 L 0 -40" stroke={SP.tallo} strokeWidth={12} /><circle cy={-60} r={42} fill={c} stroke={KC.ink} strokeWidth={5} /></g>}
            <path d="M -100 -30 Q -40 -70 20 -40 T 100 -60" stroke={SP.hifa} strokeWidth={4} fill="none" opacity=".9" />
            <text y={138} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{n}</text>
          </g> : null; })}</>)}
      </Escena>
      {/* 2 · entra por una cortada; con tu calor cambia */}
      <Escena T={T} a={K.En} b={K.Di} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Mano x={700} y={980} s={0.9} gota={0.4} />
          <g transform="translate(150 820)"><rect x={-26} y={-220} width={52} height={330} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <circle cy={140} r={50} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><rect x={-12} y={100 - (tmp - 20) * 16} width={24} height={(tmp - 20) * 16 + 40} fill={KC.red} />
            <text x={50} y={-140} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{`${Math.round(tmp)} °C`}</text></g></>)}
        <Lupa T={T} at={K.En + 0.3} until={K.Di - 0.2} x={600} y={720} r={200} fx={502} fy={952} interior={interiorPiel} tinte={KC.gold2} etiqueta="POR DENTRO · piel" />
      </Escena>
      {/* 3 · afuera moho, adentro levadura en forma de puro */}
      <Escena T={T} a={K.Di} b={K.Bu} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <line x1={540} y1={600} x2={540} y2={1200} stroke="rgba(255,255,255,.3)" strokeWidth={4} strokeDasharray="14 10" />
          {[[90, 760, -10], [120, 900, 15], [70, 1040, -5]].map(([x, y, a], i) => <HifaFlor key={i} x={x} y={y} s={1.15} rot={a} p={kprog(T, K.Di + 0.2 + i * 0.3, K.Di + 1.6 + i * 0.3)} />)}
          {[[680, 740, 20, 0], [860, 800, -30, 1], [720, 920, 60, 0], [900, 970, 10, 1], [760, 1060, -20, 0]].map(([x, y, a, yv], i) => { const p = kprog(T, K.Di + 2.0 + i * 0.2, K.Di + 2.5 + i * 0.2, kEase.rebote);
            return p > 0 ? <Puro key={i} x={x} y={y} s={1.5 * p} rot={a} yema={yv * (0.5 + 0.5 * Math.sin(T * 2 + i))} /> : null; })}
        </>)}
      </Escena>
      {/* 4 · 1–12 semanas: bultito donde te picaste */}
      <Escena T={T} a={K.Bu} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Brazo x={560} y={940} s={1.0} n={kprog(T, K.Bu + 2.2, K.Bu + 2.8)} />
          <g transform="translate(260 680)"><rect x={-150} y={-120} width={300} height={220} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <rect x={-150} y={-120} width={300} height={60} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
            <text y={60} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={KC.ink}>{Math.max(1, Math.round(12 * kprog(T, K.Bu + 0.3, K.Bu + 2.2)))}</text>
            <text y={-78} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#fff">SEMANAS</text></g>
        </>)}
      </Escena>
      {/* 5 · en fila, subiendo por el brazo (vasos linfáticos) */}
      <Escena T={T} a={K.Ca} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<Brazo x={560} y={940} s={1.0} n={1 + nB * 0.75} linfa={kprog(T, K.Ca + 0.2, K.Ca + 1.6)} />)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Ga} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={250} y={1080} tam={460} />)}
      </Escena>
      {/* 7 · Brasil: de gatos a personas */}
      <Escena T={T} a={K.Ga} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<><Gato x={560} y={960} s={1.2} T={T} zarpa={kprog(T, K.Ga + 1.4, K.Ga + 1.7, kEase.rebote) * (1 - kprog(T, K.Ga + 2.6, K.Ga + 3.0))} />
          <Brasil x={880} y={720} s={0.6} /></>)}
      </Escena>
      {/* 8 · Fiocruz: 4,188 casos humanos (1997–2011) */}
      <Escena T={T} a={K.E} b={K.Mx} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<><Brasil x={540} y={880} s={1.15} />
          <text x={540} y={1150} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{kformato(nCas)}</text></>)}
      </Escena>
      {/* 9 · México: Jalisco con más casos publicados (hasta 2019) */}
      <Escena T={T} a={K.Mx} b={K.Mi} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MapaMexico x={60} y={560} ancho={520} conCA={false}>
            {(() => { const [jx, jy] = mxProy(-103.4, 20.7); return <circle cx={jx} cy={jy} r={22 + 5 * Math.sin(T * 4)} fill={KC.red} stroke={KC.ink} strokeWidth={5} />; })()}
          </MapaMexico>
          {[['Jalisco', 1698, KC.red], ['CDMX', 162, KC.orange], ['Puebla', 123, KC.orange]].map(([n, v, c], i) => { const p = kprog(T, K.Mx + 1.0 + i * 0.4, K.Mx + 2.2 + i * 0.4, kEase.sale), w = v / 1698 * 250 * p;
            return <g key={i}><rect x={620} y={720 + i * 130} width={Math.max(4, w)} height={80} rx={10} fill={c} stroke={KC.ink} strokeWidth={5} />
              <text x={620} y={706 + i * 130} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>{n}</text>
              {p > 0 && <text x={630 + Math.max(4, w)} y={775 + i * 130} style={{ font:`400 48px ${KF.titulo}` }} fill={KC.ink}>{kformato(Math.round(v * p))}</text>}</g>; })}
        </>)}
      </Escena>
      {/* 10 · mineros de oro en Sudáfrica, años 40 */}
      <Escena T={T} a={K.Mi} b={K.C} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'#1a120c' }}></div>
        {fsvg(<Mina T={T} />)}
      </Escena>
      {/* 11 · cierre: el mismo rosal, ahora con guante y manga larga */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Rosal x={380} y={900} s={1.25} T={T} /><Mano x={klerp(980, 700, kprog(T, K.C + 0.6, K.C + 1.2, kEase.sale))} y={960} s={0.9} guante={1} manga={1} /></>)}
        <Lupa T={T} at={K.C + 0.8} until={K.Ou} x={760} y={620} r={160} fx={520} fy={935} interior={interiorCierre} tinte={KC.mint} etiqueta="POR DENTRO · guante" />
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.6} until={K.N - 0.2} texto="¿solo un piquete?" x={290} y={470} tam={42} />
      <Chip T={T} at={K.G + 1.8} until={K.N - 0.2} texto="un hongo" x={290} y={560} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.N + 0.4} until={K.En - 0.3} x={60} y={520} texto="Sporothrix" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.En + 1.0} until={K.Di - 0.3} x={60} y={1120} texto="cortada o raspón" tam={30} color={KC.ink} />
      <Chip T={T} at={K.En + 2.2} until={K.Di - 0.3} texto="con tu calor, cambia de forma" x={540} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Di + 0.2} until={K.Bu - 0.3} texto="afuera · 25 °C · moho" x={280} y={640} tam={28} borde={SP.hifa} />
      <Chip T={T} at={K.Di + 1.9} until={K.Bu - 0.3} texto="adentro · 37 °C · levadura" x={800} y={640} tam={28} borde={SP.lev} />
      <Etq T={T} at={K.Di + 1.2} until={K.Bu - 0.3} x={60} y={1130} texto="conidios agrupados en flor" tam={24} color={SP.hifa} />
      <Etq T={T} at={K.Di + 2.8} until={K.Bu - 0.3} x={1030} y={1130} lado="izq" texto="forma de puro" tam={26} color={SP.lev} />
      <Etq T={T} at={K.Bu + 2.6} until={K.Ca - 0.3} x={60} y={1060} texto="donde te picaste" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 1.2} until={K.P - 0.3} x={60} y={1060} texto="vaso linfático" tam={30} color="#147a4a" />
      <Chip T={T} at={K.Ca + 2.0} until={K.P - 0.3} texto="en fila, subiendo" x={540} y={760} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Ga + 0.5} until={K.E - 0.3} x={60} y={560} texto="Sporothrix brasiliensis" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.Ga + 1.8} until={K.E - 0.3} texto="arañazos y mordidas" x={400} y={470} tam={36} borde={KC.red} />
      <Etq T={T} at={K.Ga + 0.8} until={K.E - 0.3} x={1020} y={880} lado="izq" texto="Brasil" tam={28} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 2.4} anio="1997–2011" quien="Fiocruz · Río de Janeiro" revista="Gremião et al., PLoS Pathogens, 2017" y={470} />
            <Chip T={T} at={K.E + 2.5} until={K.Mx - 0.3} texto="casos humanos registrados" x={540} y={520} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Mx + 0.2} until={K.Mi - 0.3} texto="una de las micosis bajo la piel más frecuentes" x={540} y={470} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Mx + 1.4} until={K.Mi - 0.3} x={60} y={1110} texto="casos publicados 1914–2019 · Toriello et al., 2020" tam={22} color={KC.ink} />
      <Chip T={T} at={K.Mx + 2.8} until={K.Mi - 0.3} texto="hasta 2019" x={800} y={610} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.Mi + 0.4} until={K.C - 0.3} texto="Sudáfrica · años 40" x={300} y={470} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.Mi + 1.4} until={K.C - 0.3} texto="+3,000 mineros de oro" x={300} y={560} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Mi + 2.2} until={K.C - 0.3} x={60} y={680} texto="el hongo estaba en la madera" tam={28} color={KC.texto} />
      <Chip T={T} at={K.C + 0.3} until={K.Ou} texto="tiene tratamiento (antifúngicos)" x={360} y={470} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="guantes y manga larga" x={360} y={560} tam={36} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.En} until={K.Di} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Di} until={K.Bu} texto="5 µm" largo={100} />
      <BarraEscala T={T} at={K.Bu} until={K.P} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.Ga} until={K.E} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Mx} until={K.Mi} texto="500 km" largo={80} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Te pudo meter *un hongo*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.En - 0.1} texto="Sporothrix: tierra, musgo, *rosales*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.Di - 0.1} texto="Con tu calor *cambia de forma*" />
      <Subtitulo T={T} idx={3} at={K.Di + 0.1} until={K.Bu - 0.1} texto="Moho afuera, *levadura* adentro" />
      <Subtitulo T={T} idx={4} at={K.Bu + 0.1} until={K.Ca - 0.1} texto="De 1 a 12 semanas: *un bultito*" />
      <Subtitulo T={T} idx={5} at={K.Ca + 0.1} until={K.P - 0.1} texto="En fila: *vasos linfáticos*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Ga - 0.1} texto="¿Y si *no tienes rosales?*" />
      <Subtitulo T={T} idx={7} at={K.Ga + 0.1} until={K.E - 0.1} texto="En Brasil: *de gatos* a personas" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Mx - 0.1} texto="*4,188* casos humanos" />
      <Subtitulo T={T} idx={9} at={K.Mx + 0.1} until={K.Mi - 0.1} texto="Jalisco: *más casos publicados*" />
      <Subtitulo T={T} idx={10} at={K.Mi + 0.1} until={K.C - 0.1} texto="*+3,000 mineros* en Sudáfrica" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Usa *guantes y manga larga*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.7, K.En - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Di + 0.6, K.Bu - 0.3, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Ca + 0.5, K.P - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.Ga + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Ga + 1.9, K.E - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.E + 2.6, K.Mx - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Mx + 3.6, K.Mi - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Mi + 1.6, K.C - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 0.8, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="67" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EsporoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EsporoShot /></CompositionStage></div>;
}
window.EsporoApp = EsporoApp;
