// Ambiental #04 · El gusano barrenador y las moscas estériles — NARRADA (N5 "El experimento" con mapa de México como medida
// + N1 rayos X) y gemelo MUDO (M1 "La música son los datos": el modelo de Knipling, cada mosca silvestre es una nota).
// Guion y fuentes: guion.md. El dibujo es esquemático (mosca: tórax azul verdoso metálico con 3 franjas oscuras y ojos rojizos).
const AVS = (n) => 'assets/stickers/' + n + '.png';
const METAL = '#1fa58f', METAL2 = '#2fd3b5', OJO = '#e0482b', LARVA = '#f3e6c8', PIEL = '#c98f5a', PIEL2 = '#a8703f';

/* ---------- dibujos ---------- */
// Mosca Cochliomyia hominivorax vista desde arriba. esteril = marca blanca de las de planta. aleteo con T.
function Mosca({ x, y, s = 1, rot = 0, T = 0, esteril = false, seed = 1, alas = 1 }) {
  const a = Math.sin(T * 60 + seed) * 18 * alas;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <g opacity=".55">
      <ellipse cx={-38} cy={10} rx={48} ry={18} transform={`rotate(${-30 + a})`} fill="#e9f6ff" stroke={KC.ink} strokeWidth={3} />
      <ellipse cx={38} cy={10} rx={48} ry={18} transform={`rotate(${30 - a})`} fill="#e9f6ff" stroke={KC.ink} strokeWidth={3} />
    </g>
    <ellipse cx={0} cy={40} rx={22} ry={30} fill={METAL} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-6} cy={34} rx={7} ry={14} fill={METAL2} opacity=".7" />
    <ellipse cx={0} cy={0} rx={24} ry={22} fill={METAL} stroke={KC.ink} strokeWidth={4} />
    {[-9, 0, 9].map((dx) => <line key={dx} x1={dx} y1={-14} x2={dx} y2={16} stroke="#0b3b33" strokeWidth={4} strokeLinecap="round" />)}
    <ellipse cx={0} cy={-30} rx={22} ry={14} fill="#c79a6a" stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-14} cy={-32} rx={10} ry={12} fill={OJO} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={14} cy={-32} rx={10} ry={12} fill={OJO} stroke={KC.ink} strokeWidth={3} />
    {esteril && <circle cx={0} cy={44} r={9} fill="#fff" stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Larva (gusano barrenador): cuerpo de segmentos con anillos de espinitas oscuras; la punta delgada es la cabeza.
function Larva({ x, y, s = 1, rot = 0, T = 0, seed = 1 }) {
  const w = Math.sin(T * 5 + seed) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${rot + w}) scale(${s})`}>
    <path d="M -60 0 C -60 -18 50 -22 70 -6 C 76 0 76 4 70 8 C 50 22 -60 18 -60 0 Z" fill={LARVA} stroke={KC.ink} strokeWidth={4} />
    {[-40, -22, -4, 14, 32, 48].map((sx, i) => <line key={i} x1={sx} y1={-16 + Math.abs(sx) * 0.05} x2={sx + 2} y2={16 - Math.abs(sx) * 0.05} stroke="#3a2a1a" strokeWidth={4} strokeDasharray="3 3" />)}
    <path d="M 70 -2 l 10 -4 M 70 4 l 10 4" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Vaca de lado (macro). herida = muestra la herida en el lomo.
function Vaca({ x, y, s = 1, T = 0, herida = 0, triste = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-300} y={-160} width={560} height={300} rx={140} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <path d="M -180 -150 Q -120 -60 -200 40 Q -260 -20 -240 -120 Z" fill={KC.ink} /><path d="M 60 -40 Q 160 -80 180 40 Q 100 90 40 40 Z" fill={KC.ink} />
    {[-220, -120, 120, 200].map((lx, i) => <rect key={i} x={lx} y={110} width={46} height={190} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={9} />)}
    <g transform={`translate(300 -120) rotate(${triste * 25 + mece(T, 2, 0.3) * 3})`}>
      <rect x={-20} y={-60} width={180} height={150} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={10} />
      <rect x={90} y={0} width={90} height={80} rx={34} fill="#f6a6b2" stroke={KC.ink} strokeWidth={8} />
      <circle cx={60} cy={-6} r={12} fill={KC.ink} /><path d="M 0 -60 l -40 -40 M 40 -60 l 10 -50" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    </g>
    <path d={`M -300 -40 q -60 ${40 + mece(T, 1, 0.4) * 20} -40 140`} stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" />
    {herida > 0 && <g opacity={herida}><ellipse cx={-30} cy={-150} rx={46} ry={20} fill="#b8323a" stroke={KC.ink} strokeWidth={5} /><ellipse cx={-30} cy={-152} rx={26} ry={9} fill="#6e1218" /></g>}
  </g>;
}
function Pasto({ T }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#9feaff, #00d2ff 55%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={170} cy={360} r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      <rect x={0} y={1180} width={KW} height={740} fill={KC.leaf} />
      <path d="M 0 1180 Q 270 1150 540 1180 T 1080 1180" fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
      {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M ${30 + i * 68} 1300 l 10 -28 l 10 28`} stroke="#2a9a3c" strokeWidth={6} fill="none" />)}
    </svg>
  </>;
}
// Avioneta que suelta cajas de moscas estériles. p 0..1 = recorrido de derecha a izquierda.
function Avioneta({ T, p, y = 520, suelta = true }) {
  const x = klerp(1250, -200, p);
  return <g>
    {suelta && Array.from({ length: 30 }, (_, i) => { const t0 = i * 0.033; if (p < t0) return null; const u = Math.min(1, (p - t0) * 3), fx = klerp(1250, -200, t0) + Math.sin(i) * 40;
      return <Mosca key={i} x={fx + mece(T, i, 0.5) * 20} y={y + 60 + u * 650} s={0.32} rot={mece(T, i, 0.3) * 40 + 180} T={T} esteril seed={i} />; })}
    <g transform={`translate(${x} ${y})`}>
      <rect x={-130} y={-28} width={260} height={56} rx={28} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      <rect x={-40} y={-90} width={60} height={180} rx={14} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
      <path d="M 110 -28 L 170 -80 L 180 -24 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={-110} cy={-8} r={14} fill="#bfefff" stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={-140} cy={0} rx={8} ry={44 * Math.abs(Math.sin(T * 30))} fill="#666" />
    </g>
  </g>;
}
// Puntos del mapa (lon, lat)
const LUG = { chiapas: [-92.6, 16.75], catazaja: [-91.98, 17.73], metapa: [-92.18, 14.83], panama: [-77.7, 8.2], texas: [-98.5, 30.4], curazao: [-69, 12.2] };
function Punto({ T, at, lugar, color = KC.red, r = 14, etiqueta, lado = 'der', mapa }) {
  if (T < at) return null; const [px, py] = mxProy(...LUG[lugar]); const k = kprog(T, at, at + 0.4, kEase.rebote), late = 1 + 0.4 * Math.max(0, Math.sin((T - at) * 6));
  return <g transform={`translate(${px} ${py})`}>
    <circle r={r * 2.2 * late} fill={color} opacity=".25" /><circle r={r * k} fill={color} stroke={KC.ink} strokeWidth={4} />
    {etiqueta && <text x={lado === 'der' ? 26 : -26} y={10} textAnchor={lado === 'der' ? 'start' : 'end'} style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink} opacity={k}>{etiqueta}</text>}
  </g>;
}

/* ---------- versión narrada ---------- */
function BarrenadorNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Huevos, Mu: CUES.Muere, Ma: CUES.Mas, F: CUES.Fabrica, P: CUES.Pregunta, U: CUES.Una, E: CUES.Estudio, B: CUES.Barrera, Ch: CUES.Chiapas, Me: CUES.Metapa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const llega = kprog(T, K.G + 0.05, K.G + 1.0, kEase.sale);
  // barrera: de la frontera de EE. UU. (1966) hasta Panamá; latitud del frente
  const frente = klerp(32.5, 8.5, kprog(T, K.B + 1.2, K.Ch - 0.4, kEase.suave));
  const sube = kprog(T, K.Ch + 0.4, K.Ch + 3.6, kEase.suave);     // la plaga avanza de Panamá a Chiapas
  const mapa = (children) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><MapaMexico x={40} y={500} ancho={1000}>{children}</MapaMexico></svg>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* gancho: la mosca llega volando a la vaca (acción desde 0.05 s) */}
      <Escena T={T} a={K.G} b={K.Mu} zoom={0.04}>
        <Pasto T={T} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Vaca x={500} y={1000} s={1.15} T={T} herida={1} />
          <Mosca x={klerp(-100, 470, llega) + (1 - llega) * Math.sin(T * 9) * 60} y={klerp(380, 805, llega)} s={klerp(2.6, 1.0, llega)} rot={klerp(-60, 10, llega)} T={T} alas={1 - kprog(T, K.G + 1.0, K.G + 1.2)} />
          {/* huevos: cientos, en capas como tejas a la orilla de la herida */}
          {T > K.H + 0.5 && Array.from({ length: 60 }, (_, i) => { const at = K.H + 0.5 + i * 0.03; if (T < at) return null; return <ellipse key={i} cx={420 + (i % 12) * 7} cy={828 - Math.floor(i / 12) * 5} rx={4} ry={9} transform={`rotate(-30 ${420 + (i % 12) * 7} ${828 - Math.floor(i / 12) * 5})`} fill="#fffbe8" stroke={KC.ink} strokeWidth={1.5} />; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.Mu} b={K.Ma}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Vaca x={480} y={1000} s={1.0} T={T} herida={1} triste={kprog(T, K.Mu + 0.5, K.Mu + 2.5)} /></svg>
      </Escena>
      <Escena T={T} a={K.Ma} b={K.P}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* planta: charolas de pupas bajo radiación y luego la avioneta */}
          {T < K.F + 2.6 && <g opacity={1 - kprog(T, K.F + 2.2, K.F + 2.6)}>
            {[0, 1, 2].map((r) => <g key={r} transform={`translate(540 ${760 + r * 150})`}><rect x={-330} y={-40} width={660} height={80} rx={14} fill="#c3cbd3" stroke={KC.ink} strokeWidth={7} />
              {Array.from({ length: 18 }, (_, i) => <ellipse key={i} cx={-300 + i * 35} cy={0} rx={13} ry={22} fill="#7a4a22" stroke={KC.ink} strokeWidth={3} />)}</g>)}
            {T > K.F + 0.8 && <g opacity={0.6 + 0.4 * Math.sin(T * 20)}>{[-260, -90, 90, 260].map((dx) => <path key={dx} d={`M ${540 + dx} 600 l -20 60 l 26 0 l -20 70`} stroke={KC.yellow} strokeWidth={9} fill="none" strokeLinejoin="round" />)}</g>}
          </g>}
          {T > K.F + 2.2 && <Avioneta T={T} p={kprog(T, K.F + 2.3, K.P + 0.4)} y={620} />}
          {T < K.F && <g transform="translate(540 900)">{Array.from({ length: 12 }, (_, i) => <Mosca key={i} x={(i % 4 - 1.5) * 150 + mece(T, i, 0.4) * 20} y={(Math.floor(i / 4) - 1) * 150} s={0.7} rot={mece(T, i, 0.2) * 50} T={T} esteril seed={i} />)}</g>}
        </svg>
      </Escena>
      <Escena T={T} a={K.P} b={K.U} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{Array.from({ length: 20 }, (_, i) => <Mosca key={i} x={150 + (i * 197) % 800} y={650 + (i * 131) % 500} s={0.55} rot={T * 60 + i * 40} T={T} esteril={i % 3 !== 0} seed={i} />)}</svg>
      </Escena>
      {/* la hembra se aparea una sola vez */}
      <Escena T={T} a={K.U} b={K.E}>
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.22)" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Mosca x={330} y={800} s={2.2} rot={20} T={T} seed={1} alas={0.2} />
          <Mosca x={klerp(900, 760, kprog(T, K.U + 0.4, K.U + 1.4))} y={800} s={2.2} rot={-20} T={T} esteril seed={2} alas={0.2} />
          <path d="M 540 640 c -30 -40 -90 -10 -60 40 l 60 60 l 60 -60 c 30 -50 -30 -80 -60 -40 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.U + 1.3, K.U + 1.6)} transform={`translate(0 ${-20 * Math.abs(Math.sin(T * 4))})`} />
          {T > K.U + 2.8 && Array.from({ length: 12 }, (_, i) => <g key={i} transform={`translate(${300 + (i % 6) * 95} ${1080 + Math.floor(i / 6) * 70})`}><ellipse rx={12} ry={24} fill="#fffbe8" stroke={KC.ink} strokeWidth={3} transform="rotate(-20)" />{T > K.U + 3.6 && <path d="M -16 -16 L 16 16 M 16 -16 L -16 16" stroke={KC.red} strokeWidth={6} strokeLinecap="round" />}</g>)}
        </svg>
      </Escena>
      {/* Curazao 1954 */}
      <Escena T={T} a={K.E} b={K.B}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7fc4ff, #2f7fff)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <path d="M 180 1000 C 260 900 420 920 560 860 C 700 800 880 760 920 820 C 960 880 820 940 700 980 C 560 1030 400 1100 260 1110 C 170 1115 130 1060 180 1000 Z" fill="#f1d08a" stroke={KC.ink} strokeWidth={9} />
          {Array.from({ length: 24 }, (_, i) => { const viva = i / 24 > kprog(T, K.E + 2.8, K.B - 0.4); return viva ? <Mosca key={i} x={260 + (i * 97) % 600} y={900 + (i * 53) % 160} s={0.42} rot={T * 80 + i * 30} T={T} seed={i} /> : null; })}
          {T > K.E + 1.8 && <Avioneta T={T} p={kprog(T, K.E + 1.8, K.B)} y={640} />}
        </svg>
      </Escena>
      {/* mapa: barrera que baja hasta Panamá, la plaga que sube a Chiapas y la planta de Metapa */}
      <Escena T={T} a={K.B} b={K.C} zoom={0.02}>
        <FondoLunares color={KC.cyan} />
        {mapa(<>
          {T < K.Ch + 0.5 && <g opacity={1 - kprog(T, K.Ch, K.Ch + 0.5)}>
            <line x1={-40} y1={mxProy(-118, frente)[1]} x2={1100} y2={mxProy(-118, frente)[1]} stroke={KC.leaf} strokeWidth={10} strokeDasharray="20 12" />
            <rect x={-40} y={0} width={1100} height={Math.max(0, mxProy(-118, frente)[1])} fill={KC.leaf} opacity=".22" />
          </g>}
          <Punto T={T} at={K.B + 1.0} lugar="texas" color={KC.leaf} etiqueta="EE. UU. libre · 1966" />
          <Punto T={T} at={K.B + 3.2} lugar="panama" color={KC.leaf} etiqueta="barrera · Panamá" lado="izq" />
          {T > K.Ch + 0.3 && (() => { const lon = klerp(-77.7, -92.6, sube), lat = klerp(8.2, 16.75, sube); const pts = []; for (let k = 0; k <= 20; k++) { const u = (k / 20) * sube; pts.push(mxProy(klerp(-77.7, -92.6, u), klerp(8.2, 16.75, u) + Math.sin(u * 9) * 0.6)); }
            return <g><polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={KC.red} strokeWidth={14} strokeLinecap="round" strokeDasharray="4 22" /><g transform={`translate(${mxProy(lon, lat)[0]} ${mxProy(lon, lat)[1]})`}><Mosca x={0} y={0} s={0.6} rot={-60} T={T} /></g></g>; })()}
          <Punto T={T} at={K.Ch + 3.4} lugar="catazaja" etiqueta="Chiapas · nov 2024" lado="izq" />
          <Punto T={T} at={K.Me + 0.8} lugar="metapa" color={KC.yellow} r={20} etiqueta="Metapa · jun 2026" lado="izq" />
        </>)}
      </Escena>
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <Pasto T={T} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Vaca x={500} y={1000} s={1.15} T={T} />
          <Avioneta T={T} p={kprog(T, K.C, K.Ou + 2)} y={480} />
        </svg>
      </Escena>

      {/* lupa de rayos X: los gusanos barrenando dentro de la herida */}
      <Lupa T={T} at={K.H + 2.2} until={K.Mu - 0.3} x={760} y={560} r={210} fx={460} fy={830} tinte={KC.red} etiqueta="RAYOS X · larvas"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#5a1a1e" />{Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 71) % (r * 2)} cy={(i * 43) % (r * 2)} r={18} fill="#7a2a2e" />)}
          {Array.from({ length: 7 }, (_, i) => <Larva key={i} x={60 + (i % 3) * 120 + Math.sin(t + i) * 8} y={60 + (i * 0.33 % 1) * 40 + ((t - K.H) * 22 + i * 50) % (r * 1.7)} s={0.9} rot={90 + mece(t, i, 0.3) * 20} T={t} seed={i} />)}</svg>} />
      {T < K.Mu - 0.3 && <Escala T={T} z={1} pxPorMm={9} y={1460} />}
      <Etq T={T} at={K.G + 1.4} until={K.H - 0.2} x={90} y={560} texto="Cochliomyia hominivorax" it tam={30} />
      <Chip T={T} at={K.H + 0.6} until={K.Mu - 0.3} texto="cientos de huevos" y={420} tam={42} borde={KC.red} />
      {T < K.Ma - 0.2 && <Contador T={T} at={K.Mu + 0.4} desde={0} hasta={10} dur={2.2} sufijo=" días" x={540} y={460} tam={90} color={KC.red} />}
      <Chip T={T} at={K.Mu + 2.6} until={K.Ma - 0.3} texto="también perros y personas" y={700} tam={40} borde={KC.red} />
      <MitoTachado T={T} at={K.Ma + 0.2} tacharEn={K.Ma + 1.2} until={K.F - 0.2} texto="solo veneno" y={480} tam={70} />
      <Chip T={T} at={K.Ma + 1.6} until={K.F - 0.2} texto="+ moscas estériles" y={620} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.F + 0.2} until={K.F + 2.3} texto="planta · radiación" y={420} tam={42} mono />
      <Etq T={T} at={K.F + 0.5} until={K.F + 2.2} x={120} y={1030} texto="pupas" color={KC.ink} />
      <Chip T={T} at={K.U + 0.3} until={K.E - 0.3} texto="se aparea 1 sola vez" y={420} tam={46} borde={KC.red} />
      <Etq T={T} at={K.U + 0.8} until={K.E - 0.3} x={200} y={1000} texto="hembra silvestre" color={KC.ink} />
      <Etq T={T} at={K.U + 1.2} until={K.E - 0.3} x={680} y={590} texto="macho estéril" color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.6} anio="1954" quien="Curazao · USDA" revista="Knipling y Bushland · técnica del insecto estéril" y={600} />
      <Chip T={T} at={K.E + 2.8} until={K.B - 0.3} texto="en unos meses: 0 moscas" y={1480} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.Me + 1.2} until={K.C - 0.3} texto="meta: 100 millones de moscas por semana" y={1480} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="no es la plaga: es la cura" y={1480} tam={46} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Sus larvas *se comen la carne viva.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Mu - 0.1} texto="Cientos de huevos *en una herida.*" />
      <Subtitulo T={T} idx={2} at={K.Mu + 0.1} until={K.Ma - 0.1} texto="Una vaca puede morir *en 5 a 10 días.*" />
      <Subtitulo T={T} idx={3} at={K.Ma + 0.1} until={K.F - 0.1} texto="No bastó el veneno: *más moscas.*" />
      <Subtitulo T={T} idx={4} at={K.F + 0.1} until={K.P - 0.1} texto="Moscas estériles *desde avionetas.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.U - 0.1} texto="¿Más moscas *para acabar con moscas?*" />
      <Subtitulo T={T} idx={6} at={K.U + 0.1} until={K.E - 0.1} texto="Una sola vez: *con estéril, no hay crías.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.B - 0.1} texto="Curazao, 1954: *la mosca desapareció.*" />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.Ch - 0.1} texto="La barrera *bajó hasta Panamá.*" />
      <Subtitulo T={T} idx={9} at={K.Ch + 0.1} until={K.Me - 0.1} texto="Noviembre de 2024: *Chiapas.*" />
      <Subtitulo T={T} idx={10} at={K.Me + 0.1} until={K.C - 0.1} texto="Metapa, 2026: *100 millones por semana.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es la plaga: *es la cura.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Huevos + 0.3, CUES.Huevos + 3.6, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Muere + 2.8, CUES.Mas - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Fabrica + 2.4, CUES.Pregunta - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Una + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Barrera - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Barrera + 0.3, CUES.Barrera + 3.6, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Chiapas + 0.3, CUES.Chiapas + 3.4, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Metapa + 1.5, CUES.Cierre - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="04" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={AVS('avatar_13_senalando_arriba')} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo mudo (M1: la música son los datos) ---------- */
// Modelo de Knipling (1955), población que no crece: 1,000,000 silvestres y 2,000,000 estériles por generación.
// Fértiles = silvestres × silvestres / (silvestres + estériles): 1,000,000 → 333,333 → 47,619 → 1,107 → < 1.
// Cada punto = 10,000 moscas silvestres = una nota. Las estériles (blancas) son el zumbido de fondo.
const KNIP = [1000000, 333333, 47619, 1107, 0];
function BarrenadorMudo() {
  const { T, CUES } = useComposition();
  const K = { Ca: CUES.Campo, G1: CUES.G1, G2: CUES.G2, G3: CUES.G3, G4: CUES.G4, Ce: CUES.Cero, M: CUES.Mapa, L: CUES.Loop };
  const FIN = K.L + 7;
  const g = [K.Ca, K.G1, K.G2, K.G3, K.G4, K.Ce].reduce((a, t, i) => (T >= t ? i : a), 0);   // escena actual
  const gen = Math.max(0, Math.min(4, g - 1));
  const N = T < K.G1 ? KNIP[0] : KNIP[gen];
  const ptos = (n) => Math.round(n / 10000);
  const loopVuelve = kprog(T, K.L + 0.5, FIN - 1);
  const silvestres = T >= K.L ? Math.round(100 * loopVuelve) : (T >= K.Ce ? 0 : Math.max(N > 0 ? 1 : 0, ptos(N)));
  const conEst = T >= K.G1 && T < K.Ce;
  const gr = krng(9), pos = Array.from({ length: 300 }, () => [80 + gr() * 920, 640 + gr() * 680, gr() * 360]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Escena T={T} a={K.Ca} b={K.M} zoom={0}>
        <Pasto T={T} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {conEst && pos.slice(100, 300).map(([x, y, r], i) => <Mosca key={'e' + i} x={x + mece(T, i, 0.3) * 30} y={y + mece(T, i + 7, 0.3) * 30} s={0.28} rot={r + T * 90} T={T} esteril seed={i} />)}
          {pos.slice(0, silvestres).map(([x, y, r], i) => <Mosca key={'s' + i} x={x + mece(T, i + 3, 0.3) * 30} y={y + mece(T, i + 9, 0.3) * 30} s={0.34} rot={r + T * 70} T={T} seed={i} />)}
          {T >= K.Ce && T < K.M && <Vaca x={520} y={1080} s={0.8} T={T} />}
        </svg>
      </Escena>
      <Escena T={T} a={K.M} b={K.L}>
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><MapaMexico x={40} y={600} ancho={1000}>
          <Punto T={T} at={K.M + 0.5} lugar="catazaja" etiqueta="nov 2024" lado="izq" />
          <Punto T={T} at={K.M + 2.5} lugar="metapa" color={KC.yellow} r={20} etiqueta="Metapa 2026" lado="izq" />
        </MapaMexico></svg>
      </Escena>
      <Escena T={T} a={K.L} b={FIN + 1} zoom={0}><Pasto T={T} /><svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{pos.slice(0, Math.round(100 * loopVuelve)).map(([x, y, r], i) => <Mosca key={i} x={x + mece(T, i + 3, 0.3) * 30} y={y + mece(T, i + 9, 0.3) * 30} s={0.34} rot={r + T * 70} T={T} seed={i} />)}</svg></Escena>

      {/* datos */}
      {(T < K.M - 0.2 || loopVuelve > 0.9) && <div style={{ position:'absolute', left:30, width:600, top:340, opacity: T >= K.L ? kprog(loopVuelve, 0.9, 1) : 1, textAlign:'center', zIndex:41, textShadow:KSOMBRA }}>
        <div style={{ font:`700 30px ${KF.mono}`, color:KC.texto, letterSpacing:2 }}>{T < K.G1 || T >= K.L ? 'MOSCAS SILVESTRES' : T < K.Ce ? `GENERACIÓN ${gen + 1}` : 'GENERACIÓN 5'}</div>
        <div style={{ font:`400 120px/1 ${KF.titulo}`, color: T >= K.L || (N > 0 && T < K.Ce) ? KC.yellow : KC.leaf, WebkitTextStroke:`4px ${KC.ink}` }}>{kformato(T >= K.L ? KNIP[0] : T >= K.Ce ? 0 : N)}</div>
        {conEst && <div style={{ font:`700 26px ${KF.mono}`, color:'#fff' }}>+ 2,000,000 estériles · {['2', '6', '42', '1,807'][gen]} : 1</div>}
      </div>}
      <Chip T={T} at={K.Ca + 0.4} until={K.Ce - 0.3} texto="1 punto = 10,000 moscas · 1 nota" x={330} y={600} tam={26} mono />
      <Chip T={T} at={K.Ce + 0.6} until={K.M - 0.3} texto="0 silvestres" x={330} y={620} tam={60} borde={KC.leaf} />
      <Chip T={T} at={K.M + 3.4} until={K.L - 0.3} texto="100 millones por semana" y={420} tam={44} borde={KC.yellow} />

      <Robert T={T} apariciones={[
        [CUES.Campo - 1, CUES.Campo + 3.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.G1 + 2, CUES.G1 + 6, 'avatar_10_serio_molesto', 'abajo-der'],
        [CUES.G2 + 2, CUES.G2 + 6, 'avatar_07_pensativo_puno', 'presentador'],
        [CUES.G3 + 2, CUES.G3 + 6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.G4 + 2, CUES.G4 + 6, 'avatar_12_perfil_serio', 'abajo-izq'],
        [CUES.Cero + 1, CUES.Cero + 6, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Mapa + 1, CUES.Mapa + 5, 'avatar_02_apuntando_camara', 'abajo-der'],
        [CUES.Loop + 2, CUES.Loop + 12, 'avatar_11_sorprendido', 'gancho']]} />
      <MarcaAgua T={T} tema="biologia" num="04" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BarrenadorNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BarrenadorNarrado /></CompositionStage></div>;
}
function BarrenadorMudoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BarrenadorMudo /></CompositionStage></div>;
}
window.BarrenadorNarradoApp = BarrenadorNarradoApp;
window.BarrenadorMudoApp = BarrenadorMudoApp;
