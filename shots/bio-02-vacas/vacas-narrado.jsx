// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Biotecnológico #02 · Las vacas viven de microbios — versión NARRADA (N1 "Por dentro").
// Viaje: vaca en el pasto (macro) → rayos X del estómago → rumen al microscopio → la misma vaca, ya por dentro.

// Cadena de celulosa: glucosas unidas (para la Lupa sobre la hoja de pasto).
function Celulosa({ T, r }) {
  const D = r * 2;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#10301a" />
    {[0, 1, 2].map((f) => <g key={f} transform={`translate(${-60 + ((T * 30) % 104)} ${r - 110 + f * 110})`}>
      {Array.from({ length: 9 }, (_, i) => <Molecula key={i} x={i * 104} y={0} s={0.8} rot={i % 2 ? 180 : 0} color={i % 2 ? '#b8e986' : '#9ccf5a'} />)}
      {Array.from({ length: 9 }, (_, i) => <line key={'l' + i} x1={i * 104 + 26} y1={0} x2={i * 104 + 78} y2={0} stroke="#16120f" strokeWidth={6} />)}
    </g>)}
  </svg>;
}
// Pared del rumen con papilas: los ácidos entran y se van por la sangre.
function Pared({ T, a, agv }) {
  const g = krng(5), mol = Array.from({ length: 14 }, () => [g(), g(), Math.floor(g() * 3)]);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={1010} width={KW} height={400} fill="#6a3c43" />
    {Array.from({ length: 9 }, (_, i) => { const x = 60 + i * 120, h = 220 + (i % 3) * 30 + mece(T, i, 0.3) * 10;
      return <path key={i} d={`M ${x - 40} 1020 C ${x - 44} ${1020 - h}, ${x + 44} ${1020 - h}, ${x + 40} 1020 Z`} fill="#e39a9a" stroke={KC.ink} strokeWidth={6} />; })}
    <path d="M 0 1010 L 1080 1010" stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={1180} width={KW} height={70} fill="#76252c" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 8 }, (_, i) => <ellipse key={'g' + i} cx={((T * 160 + i * 140) % 1200) - 60} cy={1215} rx={26} ry={16} fill="#ff8a8a" stroke={KC.ink} strokeWidth={4} />)}
    {mol.map(([x0, f0, tipo], i) => { const vis = kclamp(agv * 14 - i, 0, 1); if (vis <= 0) return null;
      const f = ((T - a) * 0.22 + f0) % 1, x = 60 + Math.round(x0 * 8) * 120;
      const y = f < 0.7 ? klerp(560, 1180, f / 0.7) : 1215, xx = f < 0.7 ? x : x + (f - 0.7) * 900;
      return <AGV key={i} x={xx} y={y} tipo={tipo} s={0.95} rot={T * 40 + i * 30} />; })}
  </svg>;
}
// Microbios que bajan por el intestino y se vuelven aminoácidos.
function Intestino({ T, a }) {
  const g = krng(9), mic = Array.from({ length: 12 }, () => [g(), g()]);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <path d="M -40 600 C 300 560, 400 900, 700 860 S 1000 1000, 1120 1050" stroke="#e39a9a" strokeWidth={250} fill="none" strokeLinecap="round" />
    <path d="M -40 600 C 300 560, 400 900, 700 860 S 1000 1000, 1120 1050" stroke="#3b1d24" strokeWidth={200} fill="none" strokeLinecap="round" />
    {mic.map(([f0, k], i) => { const f = ((T - a) * 0.12 + f0) % 1, x = -40 + f * 1160, y = 600 + Math.sin(f * 3.2) * 150 + f * 300 + (k - 0.5) * 80;
      const dig = kprog(f, 0.45, 0.75);
      return dig < 1 ? <g key={i} opacity={1 - dig}><Bacteria T={T} x={x} y={y} largo={80} ancho={34} rot={f * 200 + i * 30} color={KC.mint} seed={i} flagelo={false} nucleoide={false} /></g>
        : <g key={i}>{Array.from({ length: 5 }, (_, j) => <circle key={j} cx={x + j * 16 - 32} cy={y + Math.sin(j + T * 3) * 6} r={9} fill={['#ff6b5a', KC.yellow, KC.cyan, KC.lilac, KC.mint][j]} stroke={KC.ink} strokeWidth={3} />)}</g>; })}
  </svg>;
}

// --- Pase a mano del estilo cine: piezas propias de la versión narrada (los dibujos compartidos no se tocan) ---
const NEGRO = '#0b1020';
const VX = 455, VY = 960, VS = 1.02;      // vaca del gancho, del rumen y del cierre
const MX = 410, MS = 0.94;                 // vaca del eructo y del biorreactor (deja lugar a la derecha)
// La misma vaca de vacas-comun.jsx, con manchas, ojo y nariz oscuros (en estilo cine KC.ink es claro y se perdían sobre
// el cuerpo blanco) y con `dentro` (0..1): una ventana de rayos X en la panza que deja ver el estómago del shot.
function VacaC({ T = 0, x = 0, y = 0, s = 1, mastica = 0, cola, eructo = 0, cabezaAbajo = 0, dentro = 0 }) {
  const mand = Math.max(0, Math.sin(mastica)) * 10, c = cola == null ? Math.sin(T * 1.7) * 12 : cola;
  const ch = cabezaAbajo * 70;
  const est = dentro > 0 ? Estomago({ T, r: 150 }).props.children : null;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`translate(-300 -90) rotate(${c})`}><path d="M 0 0 C -40 40 -50 120 -40 190" stroke={KC.ink} strokeWidth={10} fill="none" strokeLinecap="round" /><ellipse cx={-40} cy={200} rx={16} ry={28} fill={NEGRO} stroke={KC.ink} strokeWidth={5} /></g>
    {[[-230, 0], [-150, 1], [150, 0], [230, 1]].map(([px, k], i) => <g key={i} transform={`rotate(${Math.sin(T * 0.8 + i) * 1.2} ${px} 60)`}>
      <rect x={px - 26} y={40} width={52} height={210} rx={20} fill={i % 2 ? '#d9d6cf' : '#f1f3f8'} stroke={KC.ink} strokeWidth={8} /><rect x={px - 28} y={226} width={56} height={34} rx={10} fill="#3a2b22" stroke={KC.ink} strokeWidth={6} />
    </g>)}
    <path d="M -60 120 Q 0 190 60 120 Z" fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-320} y={-170} width={600} height={320} rx={150} fill="#f1f3f8" stroke={KC.ink} strokeWidth={9} />
    <path d="M -250 -150 C -200 -110 -150 -140 -130 -90 C -110 -40 -190 -20 -230 -60 C -270 -100 -290 -130 -250 -150 Z" fill={NEGRO} />
    <path d="M 20 -168 C 70 -120 140 -150 150 -100 C 160 -40 70 -40 40 -80 C 20 -110 0 -150 20 -168 Z" fill={NEGRO} />
    <path d="M -120 60 C -80 30 -20 50 -30 100 C -40 140 -110 130 -130 100 Z" fill={NEGRO} />
    <path d="M 160 40 C 200 20 250 40 240 90 C 220 120 170 110 160 80 Z" fill={NEGRO} />
    {dentro > 0 && <g opacity={dentro}>
      <ellipse cx={-48} cy={-6} rx={236} ry={142} fill="#06121c" stroke={KC.cyan} strokeWidth={6} strokeOpacity={0.65 + 0.3 * Math.sin(T * 3)} />
      <g transform="translate(-202 -158)">{est}</g>
    </g>}
    <g transform={`translate(300 ${-110 + ch}) rotate(${cabezaAbajo * 28 + mece(T, 5, 0.25) * 2})`}>
      <path d="M -20 -40 L -60 -66 L -40 -20 Z" fill="#f1f3f8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 10 -76 q 10 -30 30 -36" stroke="#e8d9b0" strokeWidth={12} fill="none" strokeLinecap="round" />
      <rect x={-30} y={-80} width={170} height={150} rx={60} fill="#f1f3f8" stroke={KC.ink} strokeWidth={9} />
      <path d="M 40 -80 C 70 -60 60 -20 30 -30 C 10 -40 10 -70 40 -80 Z" fill={NEGRO} />
      <circle cx={70} cy={-20} r={12} fill={NEGRO} /><circle cx={74} cy={-24} r={4} fill="#fff" />
      <rect x={70} y={10} width={110} height={60} rx={28} fill="#ffb3c7" stroke={KC.ink} strokeWidth={8} />
      <circle cx={150} cy={34} r={6} fill={NEGRO} /><circle cx={124} cy={34} r={6} fill={NEGRO} />
      <g transform={`translate(0 ${mand})`}><rect x={84} y={62} width={90} height={26} rx={13} fill="#ffb3c7" stroke={KC.ink} strokeWidth={7} /></g>
      {eructo > 0 && <g opacity={1 - kprog(eructo, 0.7, 1)} transform={`translate(${200 + eructo * 120} ${30 - eructo * 140}) scale(${0.4 + eructo})`}>
        {[[0, 0, 50], [50, -20, 40], [30, 30, 36], [-30, 20, 34]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#d8f0c0" stroke={KC.ink} strokeWidth={5} />)}
        <text x={10} y={14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={NEGRO}>CH₄</text>
      </g>}
    </g>
  </g>;
}
// El pastizal de vacas-comun.jsx, en su versión oscura (mismo tinte de cielo y de pasto): escenario propio de las escenas
// a escala real, sin franjas de color saturado a media pantalla.
function Pradera({ T, horizonte = 1160 }) {
  const mx = (c, t) => cineMix(c, '#0a0f1c', t);
  const pasto = mx('#3fbf4a', 0.6), pasto2 = mx('#3fbf4a', 0.8), brizna = mx('#3fbf4a', 0.3);
  return <>
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mx('#8fe8ff', 0.88)} 0%, ${mx('#00d2ff', 0.8)} 55%, ${mx('#7fe0c8', 0.7)} 100%)` }}></div>
    <Ambiente T={T} n={18} seed={31} color="rgba(223,231,255,.16)" tam={[3, 8]} vel={10} />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <defs><linearGradient id="vacas-pasto" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={pasto} /><stop offset="1" stopColor={pasto2} /></linearGradient></defs>
      <circle cx={900} cy={330} r={74} fill={mx('#ffd92e', 0.35)} />
      {[[190, 520, 80], [640, 250, 56]].map(([x, y, r], i) => <g key={i} transform={`translate(${mece(T, i + 4, 0.05) * 30} 0)`}><ellipse cx={x} cy={y} rx={r * 1.5} ry={r * 0.6} fill={mx('#ffffff', 0.74)} /></g>)}
      <path d={`M0 ${horizonte} Q 270 ${horizonte - 30} 540 ${horizonte} T 1080 ${horizonte} L 1080 ${KH} L 0 ${KH} Z`} fill="url(#vacas-pasto)" />
      <path d={`M0 ${horizonte} Q 270 ${horizonte - 30} 540 ${horizonte} T 1080 ${horizonte}`} fill="none" stroke={brizna} strokeWidth={6} />
      {[0, 1, 2, 3].map((f) => Array.from({ length: 12 - f * 2 }, (_, i) => { const k = 1 + f * 0.55, n = 12 - f * 2, x = (i + 0.5 + (f % 2) * 0.35) * (KW / n), y = horizonte + 110 + f * 175;
        return <path key={f + '-' + i} d={`M ${x - 9 * k} ${y} l ${(9 + mece(T, i + f * 7, 0.4) * 6) * k} ${-36 * k} l ${(9 - mece(T, i + f * 7, 0.4) * 6) * k} ${36 * k}`} stroke={brizna} strokeWidth={5 + f} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />; }))}
    </svg>
  </>;
}

function VacasNarrado() {
  const { T, CUES: C } = useComposition();
  const FIN = C.Outro + 4;
  const masca = T * 2 * Math.PI;                                    // ~1 masticada por segundo
  const vacaGancho = (extra = {}, x = VX, y = VY, s = VS) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><VacaC T={T} x={x} y={y} s={s} mastica={masca} {...extra} /></svg>;
  // bocado del gancho: la cabeza baja y sube con pasto en la boca antes del segundo 1
  const baja = kprog(T, C.Gancho, C.Gancho + 0.35, kEase.sale) * (1 - kprog(T, C.Gancho + 0.6, C.Gancho + 1.1, kEase.suave));
  const microF = (t) => kprog(t, C.Micro + 0.2, C.Micro + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* GANCHO: la vaca come pasto (macro) */}
      <Escena T={T} a={C.Gancho} b={C.Enzimas} zoom={0.04}>
        <Pradera T={T} />
        {/* antes del segundo 3 ya se ve hacia dónde va la historia: la panza se abre en rayos X y deja ver el estómago */}
        {vacaGancho({ cabezaAbajo: baja, dentro: kprog(T, C.Gancho + 1.9, C.Gancho + 2.7, kEase.suave) })}
        {T > C.Gancho + 0.5 && T < C.Gancho + 2.4 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><g transform={`translate(${VX + 428 * VS - kprog(T, C.Gancho + 0.5, C.Gancho + 2.4) * 20} ${VY - 50 * VS + Math.sin(T * 12) * 3})`}>{[-20, 0, 20].map((d) => <path key={d} d={`M ${d} 0 l ${d * 0.6} -50`} stroke={PASTO} strokeWidth={9} strokeLinecap="round" />)}</g></svg>}
      </Escena>

      {/* ENZIMAS: la hoja de pasto por dentro (celulosa) */}
      <Escena T={T} a={C.Enzimas} b={C.Rumen}>
        <FondoMarca T={T} color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* la hoja nace fuera del cuadro (antes terminaba en el aire a media pantalla) */}
          <path d={`M 500 2010 C ${505 + mece(T, 1, 0.2) * 20} 1450, 585 1000, ${600 + mece(T, 2, 0.2) * 30} 640`} stroke={KC.ink} strokeWidth={104} fill="none" strokeLinecap="round" />
          <path d={`M 500 2010 C ${505 + mece(T, 1, 0.2) * 20} 1450, 585 1000, ${600 + mece(T, 2, 0.2) * 30} 640`} stroke={PASTO} strokeWidth={88} fill="none" strokeLinecap="round" />
          <path d={`M 500 2010 C ${505 + mece(T, 1, 0.2) * 20} 1450, 585 1000, ${600 + mece(T, 2, 0.2) * 30} 640`} stroke={PASTO2} strokeWidth={8} fill="none" strokeLinecap="round" />
        </svg>
        <Lupa T={T} at={C.Enzimas + 0.2} until={C.Rumen - 0.3} x={540} y={770} r={310} fx={548} fy={1440} interior={(t, r) => <Celulosa T={t} r={r} />} etiqueta="POR DENTRO · hoja de pasto" tinte={KC.yellow} />
        <Etq T={T} at={C.Enzimas + 0.8} until={C.Rumen - 0.3} x={770} y={476} texto="celulosa" color={KC.yellow} />
        <MitoTachado T={T} at={C.Enzimas + 2.0} tacharEn={C.Enzimas + 2.6} until={C.Rumen - 0.3} texto="enzimas de vaca" y={1250} />
      </Escena>

      {/* RUMEN: rayos X del estómago */}
      <Escena T={T} a={C.Rumen} b={C.Micro} zoom={0.03}>
        <Pradera T={T} />
        {vacaGancho({ dentro: 1 })}
        <Lupa T={T} at={C.Rumen + 0.15} until={C.Micro - 0.2} x={480} y={440} r={225} fx={VX - 100 * VS} fy={VY - 20 * VS} interior={(t, r) => <Estomago T={t} r={r} />} etiqueta="POR DENTRO · estómago" />
        <Etq T={T} at={C.Rumen + 0.8} until={C.Micro - 0.2} x={292} y={312} texto="rumen" lado="izq" color={KC.yellow} />
        <Chip T={T} at={C.Rumen + 1.8} until={C.Micro - 0.2} texto="tibio · sin oxígeno" x={540} y={1340} borde={KC.cyan} tam={38} />
      </Escena>

      {/* MICRO + PREGUNTA: adentro del rumen */}
      <Escena T={T} a={C.Micro} b={C.Acidos} zoom={0.06} origen="50% 55%">
        {/* el mundo del rumen se agranda 1.15× y baja al centro del cuadro; la barra de escala se recalcula con el mismo factor */}
        <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transform:'translate(0px,110px) scale(1.15)', transformOrigin:'540px 790px' }}>
          <MundoRumen T={T} microbios={microF(T)} romper={kprog(T, C.Micro + 5.2, C.Micro + 7.8, kEase.suave)} agv={kprog(T, C.Micro + 6.5, C.Pregunta + 1.4)} />
        </div>
        <Escala T={T} z={1} pxPorMm={35000 * 1.15} y={1440} />
        <Etq T={T} at={C.Micro + 0.8} until={C.Micro + 5.0} x={40} y={392} texto="bacterias" color={KC.mint} />
        <Etq T={T} at={C.Micro + 1.4} until={C.Micro + 5.0} x={612} y={752} texto="hongos" color={KC.gold2} />
        <Etq T={T} at={C.Micro + 2.0} until={C.Micro + 5.0} x={650} y={470} texto="protozoarios" color={KC.lilac} />
        <Etq T={T} at={C.Micro + 2.6} until={C.Micro + 5.0} x={266} y={682} texto="arqueas" color="#c9a6ff" />
        <Chip T={T} at={C.Micro + 3.2} until={C.Micro + 5.2} texto="miles de millones por mililitro" y={1290} borde={KC.mint} tam={36} />
        <Etq T={T} at={C.Micro + 6.8} until={C.Acidos - 0.2} x={160} y={1475} texto="ácidos grasos volátiles" color={KC.yellow} tam={30} />
        <Chip T={T} at={C.Pregunta + 0.05} until={C.Acidos - 0.2} texto="¿y la vaca?" y={330} borde={KC.coral} tam={48} />
      </Escena>

      {/* ÁCIDOS: la pared del rumen los absorbe */}
      <Escena T={T} a={C.Acidos} b={C.Proteina} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 35%, #3b1d24 0%, #1a0d12 75%)' }}></div>
        {/* esquema (no a escala): la pared se agranda 1.25× para llenar el cuadro */}
        <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transform:'scale(1.25)', transformOrigin:'540px 1000px' }}>
          <Pared T={T} a={C.Acidos} agv={kprog(T, C.Acidos + 0.2, C.Acidos + 2.5)} />
        </div>
        <Etq T={T} at={C.Acidos + 1.0} until={C.Proteina - 0.2} x={70} y={1120} texto="pared del rumen" color={KC.texto} />
        <Etq T={T} at={C.Acidos + 1.8} until={C.Proteina - 0.2} x={640} y={1375} texto="sangre" color={KC.coral} />
        <Medidor T={T} at={C.Acidos + 2.4} until={C.Proteina - 0.2} etiqueta="ENERGÍA DE LA VACA" valor={(t) => 0.7 * kprog(t, C.Acidos + 2.6, C.Acidos + 4.6, kEase.sale)} texto={(v) => Math.round(v * 100) + ' %'} y={290} color={KC.yellow} />
      </Escena>

      {/* PROTEÍNA: los microbios bajan al intestino y se digieren */}
      <Escena T={T} a={C.Proteina} b={C.Estudio}>
        <FondoMarca T={T} color={KC.coral} patron="rayas" />
        {/* esquema (no a escala): el intestino se agranda 1.22× */}
        <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, transform:'scale(1.22)', transformOrigin:'540px 850px' }}>
          <Intestino T={T} a={C.Proteina} />
        </div>
        <Etq T={T} at={C.Proteina + 0.6} until={C.Estudio - 0.2} x={120} y={330} texto="intestino" color={KC.ink} />
        <Chip T={T} at={C.Proteina + 2.4} until={C.Estudio - 0.2} texto="microbios = su proteína" y={1380} borde={KC.ink} tam={40} />
      </Escena>

      {/* ESTUDIO: Bergman 1990, y tú contra la vaca */}
      <Escena T={T} a={C.Estudio} b={C.Metano}>
        <FondoMarca T={T} color={KC.yellow} />
        {/* ya no es lámina: la vaca del shot (con su estómago a la vista) sigue en cuadro toda la escena, atenuada */}
        <div style={{ position:'absolute', inset:0, opacity:0.62 }}>{vacaGancho({ dentro: 1 }, VX, 1310, 1.0)}</div>
        <TarjetaEstudio T={T} at={C.Estudio + 0.2} until={C.Estudio + 2.8} anio="1990" quien="Edward N. Bergman" revista="Physiological Reviews 70: 567–590" y={470} />
        <Comparativa T={T} at={C.Estudio + 3.0} until={C.Metano - 0.2} y={400} alto={480} max={80} izq={{ valor: 70, texto: '70 %', etiqueta: 'vaca', color: KC.mint }} der={{ valor: 10, texto: '~10 %', etiqueta: 'tú', color: KC.coral }} />
        <Chip T={T} at={C.Estudio + 3.2} until={C.Metano - 0.2} texto="energía que viene de microbios" y={330} tam={36} borde={KC.ink} />
      </Escena>

      {/* METANO: el eructo */}
      <Escena T={T} a={C.Metano} b={C.Biorreactor} zoom={0.04}>
        <Pradera T={T} />
        {vacaGancho({ dentro: 1, eructo: kprog(T, C.Metano + 1.6, C.Metano + 3.6) }, MX, VY, MS)}
        <Chip T={T} at={C.Metano + 0.5} until={C.Biorreactor - 0.2} texto="arqueas → metano" y={430} borde="#8b4dff" tam={40} />
        <MitoTachado T={T} at={C.Metano + 2.6} tacharEn={C.Metano + 3.3} until={C.Biorreactor - 0.2} texto="pedos" x={300} y={1340} />
      </Escena>

      {/* BIORREACTOR CON PATAS */}
      <Escena T={T} a={C.Biorreactor} b={C.Cierre}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <VacaC T={T} x={MX} y={VY} s={MS} mastica={masca} dentro={1} />
          <ellipse cx={MX - 48 * MS} cy={VY - 6 * MS} rx={262 * MS} ry={168 * MS} fill="none" stroke={KC.ink} strokeWidth={7} strokeDasharray="22 14" strokeDashoffset={-T * 40} />
          <FlechaCurva T={T} x1={1000} y1={560} x2={MX + 400 * MS} y2={VY - 90 * MS} p={kprog(T, C.Biorreactor + 0.4, C.Biorreactor + 1.0)} color={PASTO} curva={-60} />
        </svg>
        <Etq T={T} at={C.Biorreactor + 0.6} until={C.Cierre - 0.2} x={1010} y={515} texto="medio de cultivo" lado="izq" color={KC.ink} />
        <Etq T={T} at={C.Biorreactor + 3.2} until={C.Cierre - 0.2} x={110} y={720} texto="fábrica: microbios" color={KC.texto} />
        <Chip T={T} at={C.Biorreactor + 0.2} until={C.Cierre - 0.2} texto="BIORREACTOR CON PATAS" y={330} tam={46} borde={KC.ink} />
      </Escena>

      {/* CIERRE: la misma vaca del inicio, ya por dentro */}
      <Escena T={T} a={C.Cierre} b={FIN} zoom={0.03}>
        <Pradera T={T} />
        {vacaGancho({ dentro: 1 })}
        <Lupa T={T} at={C.Cierre + 0.1} x={480} y={440} r={225} fx={VX - 100 * VS} fy={VY - 20 * VS} interior={(t, r) => <Estomago T={t} r={r} />} etiqueta="sus microbios" tinte={KC.mint} />
      </Escena>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={C.Gancho + 0.1} until={C.Enzimas - 0.1} texto="No se alimenta de pasto: *de los microbios de su panza.*" />
      <Subtitulo T={T} idx={1} at={C.Enzimas + 0.1} until={C.Rumen - 0.1} texto="No puede digerir *la celulosa.*" />
      <Subtitulo T={T} idx={2} at={C.Rumen + 0.1} until={C.Micro - 0.1} texto="El rumen: *un tanque tibio y sin oxígeno.*" />
      <Subtitulo T={T} idx={3} at={C.Micro + 0.1} until={C.Micro + 5.0} texto="Bacterias, hongos, protozoarios *y arqueas.*" />
      <Subtitulo T={T} idx={4} at={C.Micro + 5.1} until={C.Pregunta - 0.1} texto="Rompen la fibra *y fermentan la celulosa.*" />
      <Subtitulo T={T} idx={5} at={C.Pregunta + 0.05} until={C.Acidos - 0.1} texto="¿Y la vaca *qué gana?*" />
      <Subtitulo T={T} idx={6} at={C.Acidos + 0.1} until={C.Proteina - 0.1} texto="Ácidos que le dan *~70 % de su energía.*" />
      <Subtitulo T={T} idx={7} at={C.Proteina + 0.1} until={C.Estudio - 0.1} texto="Se digiere a los microbios: *su principal proteína.*" />
      <Subtitulo T={T} idx={8} at={C.Estudio + 0.1} until={C.Metano - 0.1} texto="Vacas y borregos: 70 %. *Tú: cerca de 10.*" />
      <Subtitulo T={T} idx={9} at={C.Metano + 0.1} until={C.Biorreactor - 0.1} texto="Metano: casi todo *sale en eructos.*" />
      <Subtitulo T={T} idx={10} at={C.Biorreactor + 0.1} until={C.Cierre - 0.1} texto="El pasto es el medio; *los microbios, la fábrica.*" />
      <Subtitulo T={T} idx={11} at={C.Cierre + 0.1} until={C.Outro - 0.1} texto="Come pasto… *pero vive de sus microbios.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [0, 3.6, 'avatar_11_sorprendido', 'gancho'],
        [C.Rumen + 0.4, C.Micro - 0.3, 'avatar_13_senalando_arriba', 'abajo-der'],
        [C.Pregunta, C.Acidos + 1.8, 'avatar_07_pensativo_puno', 'arriba-der'],
        [C.Proteina + 0.5, C.Proteina + 3.5, 'avatar_05_sonriendo_dientes_uniformes', 'abajo-der'],
        [C.Estudio + 3.2, C.Metano - 0.3, 'avatar_04_bajando_lentes', 'abajo-izq'],
        [C.Metano + 1.4, C.Biorreactor - 0.2, 'avatar_11_sorprendido', 'presentador'],
        [C.Biorreactor + 3.0, C.Cierre - 0.3, 'avatar_08_recostado_mano', 'abajo-der'],
        [C.Cierre + 0.2, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'abajo-izq'],
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="02" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VacasNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <VacasNarrado />
      </CompositionStage>
    </div>
  );
}
Object.assign(window, { Celulosa, Pared, Intestino, VacaC, Pradera });
window.VacasNarradoApp = VacasNarradoApp;
