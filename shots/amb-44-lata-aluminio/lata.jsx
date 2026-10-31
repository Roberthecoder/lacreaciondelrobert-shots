// Shot Ambiental #44 · Una lata reciclada gasta 5 % de la energía — NARRADO (N3 capítulos y medidores).
// Datos: International Aluminium Institute (186 vs 8.3 GJ/t, 2019), The Aluminum Association (Bayer, Hall–Héroult, reciclaje,
// estudio RRS 2025), Packaging Insights 2025 (114 días), reporte KPI 2024 (43 % en 2023, 61 mil millones). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático.

// Lata de bebida vista de lado. Origen = centro del fondo. aplastada 0..1 (lata vieja chafada), color de la etiqueta.
function Lata({ x, y, s = 1, aplastada = 0, color = KC.pink, rot = 0, gris = false, o = 1 }) {
  const a = aplastada, sx = 1 + 0.18 * a, sy = 1 - 0.5 * a;
  const met = gris ? '#9aa0a8' : 'url(#ltMetal)';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * sx} ${s * sy})`} opacity={o}>
    <defs><linearGradient id="ltMetal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8f98a3" /><stop offset=".35" stopColor="#f4f6f9" /><stop offset=".7" stopColor="#c3c9d1" /><stop offset="1" stopColor="#7d8692" /></linearGradient></defs>
    <path d="M -85 -255 Q -82 -280 -64 -292 L 64 -292 Q 82 -280 85 -255 L 85 -25 Q 80 0 55 0 L -55 0 Q -80 0 -85 -25 Z" fill={met} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-85} y={-215} width={170} height={130} fill={gris ? '#7c838c' : color} stroke={KC.ink} strokeWidth={5} />
    {!gris && <path d="M -85 -160 Q -40 -195 0 -160 T 85 -160" stroke="#fff" strokeWidth={10} fill="none" opacity=".8" />}
    <ellipse cx={0} cy={-292} rx={64} ry={11} fill="#d7dce2" stroke={KC.ink} strokeWidth={5} />
    <rect x={-22} y={-300} width={44} height={14} rx={7} fill="#b9c0c8" stroke={KC.ink} strokeWidth={4} />
    {a > 0.2 && <g opacity={kclamp(a * 1.5, 0, 1)} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinejoin="round">
      <polyline points="-85,-240 -40,-225 0,-245 40,-222 85,-238" /><polyline points="-85,-60 -45,-78 0,-55 45,-80 85,-62" />
      <polyline points="-60,-200 -30,-130 -55,-95" opacity=".6" /></g>}
  </g>;
}
// Roca de bauxita: roca rojiza con granos redondos (pisolitos), como la bauxita de verdad.
function Bauxita({ x, y, s = 1, o = 1 }) {
  const gr = [[-90, -40, 16], [-40, -80, 12], [10, -30, 18], [60, -70, 13], [95, -20, 11], [-60, 10, 14], [40, 20, 15], [-10, 40, 10], [-110, -5, 9], [80, 35, 9]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -150 30 L -135 -50 L -80 -105 L 0 -120 L 80 -100 L 140 -45 L 160 25 L 110 70 L -10 80 L -110 68 Z" fill="#b5562f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -80 -105 L -30 -40 L 80 -100 M -30 -40 L -10 80" stroke="#8a3b1f" strokeWidth={6} fill="none" />
    {gr.map(([a, b, r], i) => <g key={i}><circle cx={a} cy={b} r={r} fill="#d98a52" stroke="#7a3318" strokeWidth={3} /><circle cx={a - r * 0.3} cy={b - r * 0.3} r={r * 0.3} fill="#f0b07f" /></g>)}
  </g>;
}
// Montoncito de polvo de alúmina.
function Polvo({ x, y, s = 1, p = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s} ${s * p})`}>
    <path d="M -130 0 Q -90 -70 -20 -95 Q 30 -110 70 -80 Q 120 -45 130 0 Z" fill="#f6f4ee" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={-100 + (i * 37) % 200} cy={-12 - ((i * 23) % 70)} r={3} fill="#c9c4b8" />)}
  </g>;
}
// Pico de minero.
function Pico({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-8} y={-10} width={16} height={190} rx={6} fill="#a8723f" stroke={KC.ink} strokeWidth={5} />
    <path d="M -110 -10 Q 0 -60 110 -10 Q 0 -35 -110 -10 Z" fill="#7d8692" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Celda de Hall–Héroult en corte (esquema): olla de acero con carbón, baño de criolita fundida con alúmina,
// ánodos de carbón, corriente, burbujas de CO2 en los ánodos y aluminio líquido en el fondo.
function Celda({ T, x, y, t0 }) {
  const u = Math.max(0, T - t0), corr = kprog(T, t0 + 0.4, t0 + 1.0), al = kprog(T, t0 + 1.0, t0 + 4.5);
  const an = [130, 330, 530];
  return <g transform={`translate(${x} ${y})`}>
    <rect x={30} y={-90} width={700} height={22} rx={8} fill="#c98a2a" stroke={KC.ink} strokeWidth={5} />
    {an.map((ax, i) => <rect key={'v' + i} x={ax + 62} y={-70} width={26} height={120} fill="#c98a2a" stroke={KC.ink} strokeWidth={4} />)}
    <rect x={0} y={60} width={760} height={460} rx={24} fill="#6f7782" stroke={KC.ink} strokeWidth={8} />
    <rect x={24} y={80} width={712} height={418} rx={14} fill="#26262b" />
    <rect x={44} y={150} width={672} height={250} fill="#ff8a1f" />
    <rect x={44} y={150} width={672} height={250} fill="#ffe11a" opacity={0.18 + 0.12 * Math.sin(u * 5)} />
    <rect x={44} y={400 - 0} width={672} height={78} fill="#dfe4ea" stroke={KC.ink} strokeWidth={4} />
    <rect x={44} y={400} width={672 * al} height={8} fill="#ffffff" opacity=".8" />
    {an.map((ax, i) => <rect key={'a' + i} x={ax} y={40} width={150} height={240} rx={8} fill="#3a3a40" stroke={KC.ink} strokeWidth={5} />)}
    {corr > 0 && an.map((ax, i) => <polyline key={'c' + i} points={`${ax + 75},-60 ${ax + 55},20 ${ax + 92},90 ${ax + 60},170 ${ax + 88},250`} stroke="#fff36b" strokeWidth={7} fill="none"
      strokeDasharray="22 16" strokeDashoffset={-u * 160} opacity={corr * (0.6 + 0.4 * Math.abs(Math.sin(u * 9 + i)))} strokeLinecap="round" />)}
    {u > 0.8 && Array.from({ length: 12 }, (_, k) => { const i = k % 3, lado = k % 2 ? -1 : 1, f = ((u * 0.55 + k * 0.137) % 1);
      const bx = an[i] + 75 + lado * 88 + Math.sin(u * 3 + k) * 6, by = 280 - f * 150;
      return <g key={'b' + k} opacity={f < 0.9 ? 1 : (1 - f) * 10}><circle cx={bx} cy={by} r={15} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={3} />
        {k % 4 === 0 && <text x={bx} y={by + 6} textAnchor="middle" style={{ font:`900 15px ${KF.texto}` }} fill={KC.ink}>CO₂</text>}</g>; })}
    {u > 1.0 && Array.from({ length: 6 }, (_, k) => { const f = ((u * 0.7 + k * 0.17) % 1); return <ellipse key={'d' + k} cx={90 + k * 110} cy={300 + f * 100} rx={9} ry={12} fill="#eef1f5" stroke={KC.ink} strokeWidth={2} opacity={f < 0.95 ? 1 : 0} />; })}
  </g>;
}
// Estaciones del reciclaje (íconos chicos).
function Hojuelas({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>{[[-30, -10, 20], [10, -25, -15], [28, 8, 40], [-12, 18, -30], [0, -2, 70]].map(([a, b, r], i) =>
    <path key={i} d="M -18 -8 L 14 -12 L 20 6 L -14 12 Z" transform={`translate(${a} ${b}) rotate(${r})`} fill="#d9dee4" stroke={KC.ink} strokeWidth={4} />)}</g>;
}
function Horno({ x, y, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-60} y={-55} width={120} height={95} rx={14} fill="#7d8692" stroke={KC.ink} strokeWidth={5} />
    <rect x={-38} y={-30} width={76} height={50} rx={10} fill="#ff8a1f" stroke={KC.ink} strokeWidth={4} />
    <path d={`M -20 15 Q -10 ${-10 + Math.sin(T * 8) * 6} 0 15 Q 10 ${-14 + Math.cos(T * 7) * 6} 20 15`} fill="#ffe11a" />
  </g>;
}
function Lingote({ x, y }) {
  return <g transform={`translate(${x} ${y})`}><path d="M -55 25 L -38 -20 L 38 -20 L 55 25 Z" fill="#e3e7ec" stroke={KC.ink} strokeWidth={5} /><path d="M -38 -20 L 38 -20 L 30 -5 L -30 -5 Z" fill="#fff" opacity=".7" /></g>;
}
function Rollo({ x, y }) {
  return <g transform={`translate(${x} ${y})`}><rect x={-40} y={10} width={95} height={14} fill="#d7dce2" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-30} cy={-5} r={38} fill="#d7dce2" stroke={KC.ink} strokeWidth={5} />{[28, 18, 8].map((r) => <circle key={r} cx={-30} cy={-5} r={r} fill="none" stroke="#8f98a3" strokeWidth={3} />)}</g>;
}
// Bote azul de reciclaje, camión, planta y estante.
function Bote({ x, y }) {
  return <g transform={`translate(${x} ${y})`}><path d="M -50 -90 L 50 -90 L 40 20 L -40 20 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <rect x={-58} y={-108} width={116} height={22} rx={6} fill="#3b5bff" stroke={KC.ink} strokeWidth={5} />
    <path d="M -16 -40 l 16 -22 l 16 22 M -20 -20 l 40 0" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" /></g>;
}
function Camion({ x, y }) {
  return <g transform={`translate(${x} ${y})`}><rect x={-80} y={-70} width={110} height={70} rx={8} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
    <path d="M 30 -50 L 65 -50 L 85 -22 L 85 0 L 30 0 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-50} cy={6} r={16} fill={KC.ink} /><circle cx={55} cy={6} r={16} fill={KC.ink} /></g>;
}
function Planta({ x, y }) {
  return <g transform={`translate(${x} ${y})`}><path d="M -80 20 L -80 -50 L -40 -25 L -40 -50 L 0 -25 L 0 -50 L 40 -25 L 40 -90 L 70 -90 L 70 20 Z" fill="#9aa3ae" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={55} cy={-110} r={14} fill="#fff" opacity=".8" /></g>;
}

function LataShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Bauxita, E: CUES.Electrolisis, M: CUES.Medidor, P: CUES.Pregunta, I: CUES.Infinito, Es: CUES.Estudio, Ti: CUES.Tienda, Ba: CUES.Basura, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // la lata que cae y rebota en el cuadro 0
  const caida = (t0) => { const u = T - t0; if (u < 0.45) return -260 + (u / 0.45) * (u / 0.45) * 1220; const r = u - 0.45; return 960 - Math.abs(Math.sin(r * 9)) * 90 * Math.exp(-r * 4.5); };
  const piso = <rect x={0} y={960} width={KW} height={300} fill="rgba(22,18,15,.18)" />;
  // reloj de días del viaje (Estudio + Tienda)
  const dias = T < K.Ti ? klerp(0, 54, kprog(T, K.Es + 3.6, K.Es + 7.4, kEase.suave)) : klerp(54, 114, kprog(T, K.Ti + 0.2, K.Ti + 2.6, kEase.suave));
  const viaje = kprog(T, K.Es + 3.6, K.Es + 7.4, kEase.suave);   // 0..1 entre bote → camión → planta → lata nueva
  const vuelta = kprog(T, K.I + 0.4, K.Ou, kEase.lineal || ((p) => p));
  const ang = (T - K.I - 0.4) * 1.6;   // radianes del marcador en el bucle
  const nVuelta = Math.max(1, Math.min(4, Math.floor(Math.max(0, ang) / (Math.PI * 2)) + 1));
  const recicl = kprog(T, K.Ba + 0.5, K.Ba + 2.2);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la lata vieja cae junto a la roca */}
      <Escena T={T} a={K.G} b={K.B}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{piso}<Bauxita x={250} y={890} s={1.05} /><Lata x={620} y={Math.min(960, caida(K.G - 0.1))} s={0.95} aplastada={1} rot={-8} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · capítulo 1: la bauxita y la alúmina */}
      <Escena T={T} a={K.B} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Bauxita x={300} y={720} s={1.7} />
          <path d={`M 470 820 Q 600 ${900} ${klerp(520, 680, kprog(T, K.B + 1.0, K.B + 1.8))} 960`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" opacity={kprog(T, K.B + 0.9, K.B + 1.2)} />
          {T > K.B + 1.8 && <path d="M 660 930 l 40 34 l -52 12 Z" fill={KC.ink} />}
          <Polvo x={780} y={1100} s={1.3} p={kprog(T, K.B + 2.0, K.B + 2.8, kEase.sale)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · capítulo 2: la olla eléctrica (Hall–Héroult) */}
      <Escena T={T} a={K.E} b={K.M}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 45%, #1d2a4a 0%, ${KC.noche} 70%)` }}></div>
        {svg(<Celda T={T} x={120} y={600} t0={K.E} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 4 · capítulo 3: el medidor de energía */}
      <Escena T={T} a={K.M} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <rect x={80} y={760} width={900 * kprog(T, K.M + 0.6, K.M + 3.2, kEase.suave)} height={110} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
          <rect x={80} y={1010} width={Math.max(8, 900 * (8.3 / 186) * kprog(T, K.M + 4.6, K.M + 5.4, kEase.suave))} height={110} rx={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.M + 4.5, K.M + 4.7)} />
          {T > K.M + 0.6 && <text x={80} y={735} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>aluminio nuevo (2019)</text>}
          {T > K.M + 3.2 && <text x={960} y={835} textAnchor="end" style={{ font:`400 64px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4} paintOrder="stroke">186 GJ</text>}
          {T > K.M + 4.5 && <text x={80} y={985} style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>aluminio reciclado</text>}
          {T > K.M + 5.4 && <text x={150} y={1088} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>~8 GJ</text>}
        </>)}
        <EscalaFija texto="energía por tonelada de aluminio" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.I} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={270} y={930} textAnchor="middle" style={{ font:`400 440px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 780)`}>?</text>
          <Lata x={270} y={1160} s={0.55} rot={Math.sin(T * 4) * 12} /></>)}
      </Escena>
      {/* 6 · capítulo 4: el bucle del reciclaje */}
      <Escena T={T} a={K.I} b={K.Es}>
        <FondoLunares color={KC.cyan} />
        {svg(<g transform="translate(500 820)">
          <circle r={250} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="26 18" strokeDashoffset={-T * 40} />
          {[[0, <Lata x={0} y={50} s={0.36} />], [1, <Hojuelas x={0} y={0} />], [2, <Horno x={0} y={0} T={T} />], [3, <Lingote x={0} y={0} />], [4, <Rollo x={0} y={0} />]].map(([i, el]) => {
            const a = -Math.PI / 2 + i * (Math.PI * 2 / 5); return <g key={i} transform={`translate(${Math.cos(a) * 250} ${Math.sin(a) * 250})`}>
              <circle r={78} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />{el}</g>; })}
          {T > K.I + 0.4 && <circle cx={Math.cos(-Math.PI / 2 + ang) * 250} cy={Math.sin(-Math.PI / 2 + ang) * 250} r={22} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />}
          {/* merma: una gotita gris se queda afuera en el horno */}
          {T > K.I + 3.2 && <g transform={`translate(${Math.cos(-Math.PI / 2 + 2 * Math.PI * 2 / 5) * 250 + 70} ${Math.sin(-Math.PI / 2 + 2 * Math.PI * 2 / 5) * 250 + 40 + kprog(T, K.I + 3.2, K.I + 4.0) * 70})`}>
            <ellipse rx={10} ry={13} fill="#8a8f99" stroke={KC.ink} strokeWidth={3} /></g>}
          <text x={0} y={-20} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>vuelta</text>
          <text x={0} y={70} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink}>{T > K.I + 0.4 ? nVuelta : 1}</text>
        </g>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7-8 · capítulo 5: el viaje de regreso (bote → lata nueva → tienda) */}
      <Escena T={T} a={K.Es} b={K.Ba}>
        <FondoLunares color={T < K.Ti ? KC.paper : KC.yellow} punto="rgba(0,0,0,.06)" />
        {svg(<>
          {T < K.Ti + 0.3 && <g opacity={kprog(T, K.Es + 3.2, K.Es + 3.6) * (1 - kprog(T, K.Ti, K.Ti + 0.3))}>
            <line x1={130} y1={900} x2={930} y2={900} stroke={KC.ink} strokeWidth={6} strokeDasharray="18 14" />
            <Bote x={130} y={880} /><Camion x={390} y={890} /><Planta x={650} y={890} /><Lata x={900} y={900} s={0.42} color="#d7dce2" o={kprog(T, K.Es + 7.0, K.Es + 7.4)} />
            <circle cx={130 + viaje * 770} cy={780} r={20} fill="#d7dce2" stroke={KC.ink} strokeWidth={5} />
          </g>}
          {T > K.Ti && <g opacity={kprog(T, K.Ti, K.Ti + 0.3)}>
            {[0, 1].map((f) => <rect key={f} x={90} y={720 + f * 230} width={620} height={22} rx={6} fill="#a8723f" stroke={KC.ink} strokeWidth={5} />)}
            {Array.from({ length: 8 }, (_, i) => { const f = Math.floor(i / 4), c = i % 4; return <Lata key={i} x={170 + c * 150} y={720 + f * 230} s={0.62}
              color={[KC.pink, KC.orange, KC.mint, KC.blue][c]} o={kprog(T, K.Ti + 0.3 + i * 0.18, K.Ti + 0.6 + i * 0.18)} />; })}
          </g>}
        </>)}
        {T > K.Es + 3.6 && <div style={{ position:'absolute', left:90, top:1060, zIndex:41, font:`700 64px ${KF.mono}`, color:KC.ink }}>día {Math.round(dias)}</div>}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · 43 de cada 100 latas */}
      <Escena T={T} a={K.Ba} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(Array.from({ length: 100 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10), ok = i < 43;
          const col = recicl > 0 ? (ok ? (i / 43 < recicl ? KC.leaf : '#d7dce2') : (recicl >= 1 ? '#7c838c' : '#d7dce2')) : '#d7dce2';
          return <g key={i} transform={`translate(${86 + c * 62} ${448 + r * 52})`}><rect x={-20} y={-22} width={40} height={44} rx={8} fill={col} stroke={KC.ink} strokeWidth={4} opacity={!ok && recicl >= 1 ? 0.75 : 1} />
            <rect x={-14} y={-26} width={28} height={6} rx={3} fill={KC.ink} opacity=".6" /></g>; }))}
      </Escena>
      {/* 10 · cierre: la misma lata y la misma roca, ya transformadas */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{piso}<Bauxita x={250} y={890} s={1.05} />
          <Lata x={620} y={960} s={0.95} aplastada={1 - kprog(T, K.C + 0.4, K.C + 1.6, kEase.rebote || kEase.sale)} rot={-8 * (1 - kprog(T, K.C + 0.4, K.C + 1.6))} />
          <Pico x={klerp(230, -260, kprog(T, K.C + 2.0, K.C + 4.0, kEase.suave))} y={640} s={0.9} rot={-30 - 20 * kprog(T, K.C + 2.0, K.C + 4.0)} o={1 - kprog(T, K.C + 3.4, K.C + 4.0)} /></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* capítulos y datos */}
      <Capitulo T={T} hasta={K.Ba} caps={[{ at: K.B, titulo: 'La roca' }, { at: K.E, titulo: 'La olla eléctrica' }, { at: K.M, titulo: 'El medidor' }, { at: K.I, titulo: 'El reciclaje' }, { at: K.Es, titulo: 'El viaje de regreso' }]} />
      <NumeroGigante T={T} at={K.G + 0.3} until={K.B - 0.2} valor={5} dur={1.0} sufijo=" %" etiqueta="de la energía" x={300} y={540} tam={220} color={KC.yellow} />
      <Medidor T={T} at={K.G + 1.2} until={K.B - 0.2} valor={(t) => kprog(t, K.G + 1.3, K.G + 2.6, kEase.suave)} etiqueta="aluminio nuevo (de la roca)" color={KC.red} y={1010} />
      <Medidor T={T} at={K.G + 2.8} until={K.B - 0.2} valor={(t) => 0.05 * kprog(t, K.G + 2.9, K.G + 3.6, kEase.suave)} etiqueta="aluminio de la lata" color={KC.leaf} y={1110} />
      <Etq T={T} at={K.B + 0.4} until={K.E - 0.2} x={330} y={470} texto="bauxita" tam={40} color={KC.ink} />
      <Chip T={T} at={K.B + 1.0} until={K.E - 0.2} texto="química (proceso Bayer)" x={330} y={1010} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.B + 2.4} until={K.E - 0.2} x={640} y={705} texto="alúmina" tam={40} color={KC.ink} />
      <Etq T={T} at={K.B + 2.8} until={K.E - 0.2} x={640} y={752} texto="óxido de aluminio" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 0.6} until={K.M - 0.2} x={1050} y={575} lado="izq" texto="corriente eléctrica" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.E + 1.2} until={K.M - 0.2} x={884} y={760} texto="ánodos" tam={26} />
      <Etq T={T} at={K.E + 1.8} until={K.M - 0.2} x={120} y={1150} texto="criolita fundida + alúmina" tam={28} color={KC.orange} />
      <Etq T={T} at={K.E + 3.0} until={K.M - 0.2} x={120} y={1198} texto="aluminio líquido (fondo)" tam={28} />
      <Chip T={T} at={K.E + 2.4} until={K.M - 0.2} texto="O + carbón del ánodo → CO₂" x={540} y={440} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.M + 1.2} until={K.P - 0.2} texto="IAI" x={150} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.M + 5.8} until={K.P - 0.2} texto="≈ 5 % de la energía" x={560} y={1066} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.I + 1.0} until={K.Es - 0.2} texto="sin cambiar sus propiedades" x={370} y={440} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.I + 3.6} until={K.Es - 0.2} x={740} y={1135} texto="merma pequeña" tam={26} color={KC.ink} lado="der" />
      <TarjetaEstudio T={T} at={K.Es + 0.3} until={K.Es + 3.3} anio="2025" quien="RRS · Estados Unidos" revista="para Aluminum Association y CMI (industria)" y={720} />
      <Etq T={T} at={K.Es + 3.8} until={K.Ti - 0.2} x={130} y={980} texto="bote" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Es + 7.0} until={K.Ti - 0.2} x={900} y={980} lado="izq" texto="lata nueva" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Es + 7.3} until={K.Ti - 0.1} texto="< 60 días" x={720} y={1100} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.Ti + 2.4} until={K.Ba - 0.1} texto="114 días ≈ casi 4 meses" x={540} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ba + 1.6} until={K.C - 0.2} x={1060} y={700} lado="izq" texto="43 recicladas" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Ba + 2.4} until={K.C - 0.2} x={1060} y={860} lado="izq" texto="57 no recicladas" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Ba + 0.3} until={K.C - 0.2} texto="EE. UU. 2023: 43 %" x={330} y={370} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ba + 3.4} until={K.C - 0.2} valor={61} dur={1.0} sufijo=" mil millones" etiqueta="latas no recicladas en 2023" x={540} y={1110} tam={96} color={KC.yellow} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou - 0.1} texto="no es basura" x={330} y={470} tam={40} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="*5 %* de la energía." />
      <Subtitulo T={T} idx={1} at={K.B + 0.1} until={K.E - 0.1} texto="Bauxita → *alúmina.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.M - 0.1} texto="Corriente → *sin oxígeno.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.P - 0.1} texto="186 GJ *contra unos 8.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.I - 0.1} texto="¿Se *desgasta?*" />
      <Subtitulo T={T} idx={5} at={K.I + 0.1} until={K.Es - 0.1} texto="Se funde *sin cambiar.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Ti - 0.1} texto="*Menos de 60 días.*" />
      <Subtitulo T={T} idx={7} at={K.Ti + 0.1} until={K.Ba - 0.1} texto="Tienda: *casi 4 meses.*" />
      <Subtitulo T={T} idx={8} at={K.Ba + 0.1} until={K.C - 0.1} texto="Solo *43 de cada 100.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es basura: *es roca.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Bauxita + 1.6, CUES.Electrolisis - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Medidor + 2.0, CUES.Pregunta - 0.6, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Infinito + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Infinito + 2.0, CUES.Estudio + 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 4.3, CUES.Tienda - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Basura + 0.3, CUES.Basura + 5.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" num="44" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LataApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LataShot /></CompositionStage></div>;
}
window.LataApp = LataApp;
