// Fungi Mati #01 · ¿Qué es un hongo? — versión NARRADA (N1 "Por dentro") y gemelo MUDO (M4 "Ciclo").
// Guion y fuentes: guion.md. El dibujo es esquemático (escala aproximada).
const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = KSOMBRA;
const PX_MACRO = 6.6;          // champiñón: sombrero ≈ 5 cm ≈ 330 px
const PX_MICRO = 6800;         // hifa ≈ 5 µm ≈ 34 px

/* ---------- dibujos propios del tema ---------- */
// Manzano esquemático con manzanas. Base en (x, y).
function Manzano({ T, x, y, s = 1 }) {
  const m = [[-90, -360], [60, -400], [130, -300], [-140, -270], [0, -300], [-40, -430], [100, -470]];
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${mece(T, 3, 0.2) * 1.2})`}>
    <path d="M -26 0 L -16 -230 L 16 -230 L 26 0 Z" fill="#8a5a3b" stroke={KC.ink} strokeWidth={8} />
    {[[-110, -330, 120], [100, -340, 120], [0, -430, 140], [0, -300, 120]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? '#2fa84f' : '#3fbf4a'} stroke={KC.ink} strokeWidth={7} />)}
    {m.map(([mx, my], i) => <g key={i}><circle cx={mx} cy={my} r={24} fill={KC.red} stroke={KC.ink} strokeWidth={5} /><path d={`M ${mx} ${my - 22} l 4 -12`} stroke="#5a3a22" strokeWidth={4} /></g>)}
  </g>;
}
// Escarabajo visto desde arriba (su caparazón también es de quitina).
function Escarabajo({ T, x, y, s = 1 }) {
  const p = mece(T, 5, 0.6) * 8;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => [-40, 0, 40].map((dy, i) => <path key={k + '' + i} d={`M ${k * 50} ${dy} l ${k * 70} ${dy * 0.6 + (i === 1 ? p * k : -p * k)} l ${k * 20} ${30}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />))}
    <path d="M -20 -150 q -30 -50 -50 -70 M 20 -150 q 30 -50 50 -70" fill="none" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <ellipse cx={0} cy={-120} rx={42} ry={36} fill="#1f6f5c" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={20} rx={78} ry={120} fill="#22a37f" stroke={KC.ink} strokeWidth={8} />
    <line x1={0} y1={-90} x2={0} y2={135} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-30} cy={-20} rx={14} ry={50} fill="#7ff0c8" opacity=".5" />
  </g>;
}
// Cadena de quitina: anillos (N-acetilglucosamina) unidos en fila; cada anillo lleva un O (el N va en el grupo lateral, no en el anillo). Se dibuja de izquierda a derecha según p.
function CadenaQuitina({ x, y, n = 7, p = 1, s = 1, color = KC.gold2 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => { const q = kclamp(p * n - i, 0, 1); if (q <= 0) return null; const cx = i * 118, cy = (i % 2 ? 18 : -18);
      const hex = [0, 60, 120, 180, 240, 300].map((a) => `${cx + 44 * Math.cos((a + 30) * Math.PI / 180)},${cy + 44 * Math.sin((a + 30) * Math.PI / 180)}`).join(' ');
      return <g key={i} opacity={q} transform={`translate(0 ${(1 - q) * 30})`}>
        {i > 0 && <line x1={cx - 118 + 40} y1={(i - 1) % 2 ? 18 : -18} x2={cx - 40} y2={cy} stroke={color} strokeWidth={8} />}
        <polygon points={hex} fill="rgba(244,194,90,.18)" stroke={color} strokeWidth={8} strokeLinejoin="round" />
        <text x={cx} y={cy + (i % 2 ? 78 : -60)} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.texto}>O</text>
      </g>; })}
  </g>;
}
// Espora de champiñón: ovoide café (≈ 6–8 µm).
function EsporaAg({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}><ellipse rx={11} ry={8} fill="#5a3422" stroke={KC.ink} strokeWidth={2.5} /><ellipse cx={-3} cy={-2.5} rx={3.5} ry={2} fill="rgba(255,255,255,.35)" /></g>;
}
// Champiñón protagonista sobre el suelo (macro), con la red de micelio debajo.
function SueloChampi({ T, red = 1, brillo = 0, crece = 1, abre = 1, x = 540, s = 2.2, esporas, cielo = KC.mint, otro }) {
  const sup = MUNDO_SUELO.sup;
  let esp = null;
  if (esporas != null && T >= esporas) {
    const u = T - esporas;
    esp = Array.from({ length: 40 }, (_, i) => { const a = (i * 2.39) % 6.28, x0 = x + (i % 13 - 6) * 18 * s, y0 = sup - 175 * s, vy = 40 + (i % 5) * 14;
      const xx = x0 + Math.sin(u * 1.6 + i) * 26 + (i % 2 ? 1 : -1) * u * 22, yy = y0 + vy * u * 0.7 - 6 * Math.cos(a);
      return yy < sup - 6 ? <EsporaAg key={i} x={xx} y={yy} s={0.9} rot={i * 33} o={Math.min(1, u * 2)} /> : null; });
  }
  return <MundoSuelo T={T} red={red} brillo={brillo} ox={x} cielo={cielo}>
    <Champinon x={x} y={sup + 4} s={s} crece={crece} abre={abre} rot={mece(T, 2, 0.15) * 1.2} />
    {otro && <Champinon x={otro.x} y={sup + 4} s={otro.s} crece={otro.crece} abre={otro.abre} rot={mece(T, 6, 0.15) * 1.5} />}
    {esp}
  </MundoSuelo>;
}
// Pelo humano para comparar (≈ 60–80 µm; de 17 a 181 µm según la persona, Ley 1999), banda café con escamas.
function Pelo({ y = 1500, alto = 476, o = 1 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o }}>
    <rect x={-20} y={y} width={KW + 40} height={alto} fill="#3b2418" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${i * 130} ${y + 4} l 70 ${alto * 0.25} l -70 ${alto * 0.25}`} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth={8} />)}
  </svg>;
}

/* ---------- versión NARRADA ---------- */
function HongoNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, R: CUES.Red, C: CUES.Come, P: CUES.Pregunta, F: CUES.Fruto, M: CUES.Manzana, E: CUES.Estudio, Q: CUES.Quitina, L: CUES.Levadura, Ci: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const sup = MUNDO_SUELO.sup;
  // cámara macro: el champiñón entero → bajo tierra (al micelio)
  const keysG = [{ t: K.G, x: 540, y: 960, z: 1 }, { t: K.R - 0.6, x: 540, y: 960, z: 1.04 }, { t: K.R + 1.4, x: 600, y: sup + 120, z: 5 }];
  const cG = camaraEn(T, keysG);
  const keysP = [{ t: K.P - 0.4, x: 600, y: sup + 160, z: 3.2 }, { t: K.P + 1.2, x: 540, y: 960, z: 1 }, { t: K.F + 6, x: 540, y: 960, z: 1.05 }];
  const crece = kprog(T, K.F + 0.6, K.F + 4.2, kEase.suave), abre = kprog(T, K.F + 3.2, K.F + 5.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el champiñón brota y luego se ilumina el micelio bajo tierra (rayos X) */}
      <Escena T={T} a={K.G} b={K.R + 1.3} zoom={0}>
        <Camara T={T} keys={keysG}>
          <SueloChampi T={T} red={1} brillo={kprog(T, K.G + 2.4, K.G + 3.4)} crece={klerp(0.55, 1, kprog(T, K.G + 0.05, K.G + 0.7, kEase.rebote))} abre={klerp(0.6, 1, kprog(T, K.G + 0.05, K.G + 0.9))} esporas={K.G + 0.6} />
        </Camara>
        <Escala T={T} z={cG.z} pxPorMm={PX_MACRO} />
      </Escena>
      {/* 1-2 · hifas de cerca: red, micelio, comen por fuera */}
      <Escena T={T} a={K.R + 1.3} b={K.P} fondo="radial-gradient(circle at 50% 50%, #1b2333 0%, #0E0F12 75%)" zoom={0.04}>
        <Ambiente T={T} n={30} seed={12} color="rgba(234,255,247,.35)" tam={[3, 8]} />
        <HifasMicro T={T} g={kprog(T, K.R + 1.3, K.R + 6.5, kEase.suave) * 0.85 + kprog(T, K.C, K.C + 3) * 0.15} enzimas={kprog(T, K.C + 3.2, K.C + 4.2)} />
        <Pelo o={kprog(T, K.R + 2.4, K.R + 3.2) * (1 - kprog(T, K.R + 6.2, K.R + 7))} />
        <Escala T={T} z={1} pxPorMm={PX_MICRO} />
      </Escena>
      {/* 3-4 · regreso arriba y el champiñón crece (cuerpo fructífero) */}
      <Escena T={T} a={K.P} b={K.M} zoom={0}>
        <Camara T={T} keys={keysP}>
          <SueloChampi T={T} red={1} brillo={1 - kprog(T, K.P + 0.6, K.P + 1.6)} crece={T < K.F ? 0 : crece} abre={abre} esporas={K.F + 5.4} />
        </Camara>
        <Escala T={T} z={camaraEn(T, keysP).z} pxPorMm={PX_MACRO} />
      </Escena>
      {/* 5 · como el manzano */}
      <Escena T={T} a={K.M} b={K.E} fondo={KC.yellow}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.35) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={0} y={1180} width={KW} height={740} fill="#6b4a32" stroke={KC.ink} strokeWidth={8} />
          <Manzano T={T} x={290} y={1184} s={1.05} />
          {Array.from({ length: 18 }, (_, i) => <line key={i} x1={760 + Math.cos(i) * 20} y1={1190} x2={760 + Math.cos(i * 1.7) * 230} y2={1220 + (i % 6) * 60} stroke="#f4ecd8" strokeWidth={4} opacity={kprog(T, K.M + 0.4 + i * 0.04, K.M + 0.8 + i * 0.04)} />)}
          <Champinon x={790} y={1184} s={1.6} crece={1} abre={1} rot={mece(T, 4, 0.2) * 2} />
          <text x={540} y={800} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.M + 0.8, K.M + 1.2)}>=</text>
        </svg>
        <Chip T={T} at={K.M + 0.5} texto="fruto" x={290} y={560} borde={KC.red} tam={40} />
        <Chip T={T} at={K.M + 0.7} texto="fruto" x={790} y={560} borde={KC.red} tam={40} />
        <Chip T={T} at={K.M + 1.4} texto="árbol" x={290} y={1500} borde={KC.leaf} tam={40} />
        <Chip T={T} at={K.M + 1.6} texto="micelio" x={790} y={1500} borde={KC.mint} tam={40} />
      </Escena>
      {/* 6 · el estudio: más parientes de los animales */}
      <Escena T={T} a={K.E} b={K.Q} fondo={KC.lilac}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 24px, transparent 24px 48px)' }}></div>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="1993" quien="Baldauf y Palmer" revista="PNAS · 25 proteínas comparadas" y={760} />
        {T > K.E + 3.4 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {(() => { const p = kprog(T, K.E + 3.5, K.E + 5, kEase.sale), q = kprog(T, K.E + 4.6, K.E + 6, kEase.sale);
            return <g strokeLinecap="round" fill="none">
              <path d={`M 540 1150 L 540 ${klerp(1150, 1040, p)}`} stroke={KC.ink} strokeWidth={14} />
              <path d={`M 540 1040 L ${klerp(540, 230, p)} ${klerp(1040, 640, p)}`} stroke={KC.ink} strokeWidth={14} />
              <path d={`M 540 1040 L ${klerp(540, 700, p)} ${klerp(1040, 860, p)}`} stroke={KC.ink} strokeWidth={14} />
              <path d={`M 700 860 L ${klerp(700, 560, q)} ${klerp(860, 640, q)} M 700 860 L ${klerp(700, 860, q)} ${klerp(860, 640, q)}`} stroke={KC.ink} strokeWidth={14} />
              <circle cx={700} cy={860} r={26 * q} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            </g>; })()}
          <g opacity={kprog(T, K.E + 4.4, K.E + 5)}><Manzano T={T} x={230} y={600} s={0.38} /></g>
          <g opacity={kprog(T, K.E + 5.4, K.E + 6)}><Champinon x={560} y={600} s={0.9} /></g>
          <g opacity={kprog(T, K.E + 5.6, K.E + 6.2)}><Escarabajo T={T} x={860} y={520} s={0.55} /></g>
        </svg>}
        <Chip T={T} at={K.E + 4.4} texto="plantas" x={230} y={700} borde={KC.leaf} tam={36} />
        <Chip T={T} at={K.E + 5.4} texto="hongos" x={560} y={700} borde={KC.gold} tam={36} />
        <Chip T={T} at={K.E + 5.6} texto="animales" x={880} y={700} borde={KC.red} tam={36} />
      </Escena>
      {/* 7 · quitina: pared de la hifa = caparazón del escarabajo */}
      <Escena T={T} a={K.Q} b={K.L} fondo="radial-gradient(circle at 50% 40%, #1b2333 0%, #0E0F12 75%)">
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={-20} y={430} width={KW + 40} height={330} rx={160} fill="#eafff7" stroke={KC.ink} strokeWidth={10} />
          <rect x={-20} y={470} width={KW + 40} height={250} rx={120} fill="#cfeee3" />
          {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={((i * 220 + T * 30) % 1200) - 60} cy={595 + mece(T, i, 0.3) * 20} r={22} fill="#b18cff" />)}
          <CadenaQuitina x={150} y={440} p={kprog(T, K.Q + 0.3, K.Q + 2.2)} s={0.85} />
          <Escarabajo T={T} x={780} y={1060} s={kentrada(T, K.Q + 1.6, null, 'pop').s * 1.05} />
          <g opacity={kprog(T, K.Q + 2.2, K.Q + 2.8)}><CadenaQuitina x={640} y={880} n={3} s={0.45} /></g>
        </svg>
        <Etq T={T} at={K.Q + 0.8} until={K.L} x={120} y={360} texto="pared de la hifa" />
        <Chip T={T} at={K.Q + 2.0} texto="quitina" x={330} y={1060} borde={KC.gold} tam={48} mono />
      </Escena>
      {/* 8 · levadura: también es hongo, de una sola célula */}
      <Escena T={T} a={K.L} b={K.Ci} fondo={KC.pink}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <ellipse cx={540} cy={1600} rx={380} ry={90} fill="#d9e1e8" stroke={KC.ink} strokeWidth={9} />
          <path d={`M 170 1600 Q 540 ${1600 - klerp(150, 300, kprog(T, K.L, K.L + 4.5))} 910 1600 Z`} fill="#f2dcae" stroke={KC.ink} strokeWidth={9} />
          <path d="M 160 1600 Q 200 1780 540 1790 Q 880 1780 920 1600" fill="#d9e1e8" stroke={KC.ink} strokeWidth={9} />
        </svg>
        <Lupa T={T} at={K.L + 0.5} until={K.Ci - 0.3} x={540} y={680} r={280} fx={540} fy={1480} etiqueta="RAYOS X · masa de pan" tinte={KC.yellow}
          interior={(t, r) => <svg width={r * 2} height={r * 2}>{[[r * 0.6, r * 0.7, 0], [r * 1.35, r * 0.6, 1], [r * 0.9, r * 1.35, 2], [r * 1.55, r * 1.4, 3]].map(([cx, cy, i]) =>
            <Levadura key={i} x={cx} y={cy} r={r * 0.2} brote={kprog(t, K.L + 1 + i * 0.5, K.L + 3 + i * 0.5)} T={t} seed={i} rot={i * 40} />)}</svg>} />
        <Etq T={T} at={K.L + 1.6} until={K.Ci - 0.3} x={190} y={1080} texto="Saccharomyces cerevisiae" it lado="der" tam={30} />
        <Chip T={T} at={K.L + 2.4} until={K.Ci - 0.3} texto="1 célula · sin micelio" y={330} borde={KC.yellow} tam={38} />
      </Escena>
      {/* 9 · cierre: la misma imagen del inicio, ahora con el hongo completo a la vista */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.03}>
        <SueloChampi T={T} red={1} brillo={kprog(T, K.Ci + 0.6, K.Ci + 1.6)} crece={1} abre={1} />
        <Escala T={T} z={1} pxPorMm={PX_MACRO} />
      </Escena>

      {/* etiquetas del gancho / cierre */}
      <Etq T={T} at={K.G + 1.0} until={K.R - 0.4} x={560} y={500} texto="fruto" color={KC.texto} lado="izq" />
      <Etq T={T} at={K.G + 1.4} until={K.R - 0.4} x={560} y={556} texto="Agaricus bisporus" it tam={28} lado="izq" />
      <Chip T={T} at={K.G + 3.0} until={K.R - 0.4} texto="el hongo de verdad" y={1530} x={400} borde={KC.mint} tam={42} />
      <Chip T={T} at={K.Ci + 0.4} until={K.O} texto="lo que ves: el fruto" y={430} borde={KC.red} tam={42} />
      <Chip T={T} at={K.Ci + 1.4} until={K.O} texto="el hongo: el micelio" y={1530} x={400} borde={KC.mint} tam={42} />
      {/* micro */}
      <Etq T={T} at={K.R + 2.0} until={K.R + 6.2} x={330} y={480} texto="hifa" color="#eafff7" />
      <Etq T={T} at={K.R + 2.8} until={K.R + 6.2} x={120} y={1600} texto="pelo humano (≈ 60–80 µm)" tam={28} />
      <Chip T={T} at={K.R + 6.4} until={K.C - 0.2} texto="micelio = el cuerpo del hongo" y={430} borde={KC.mint} tam={42} />
      <MitoTachado T={T} at={K.C + 0.1} tacharEn={K.C + 0.7} until={K.C + 3.3} texto="raíces" x={250} y={420} tam={40} />
      <MitoTachado T={T} at={K.C + 0.5} tacharEn={K.C + 1.1} until={K.C + 3.3} texto="hojas" x={540} y={420} tam={40} />
      <MitoTachado T={T} at={K.C + 0.9} tacharEn={K.C + 1.6} until={K.C + 3.3} texto="fotosíntesis" x={820} y={520} tam={40} />
      <Etq T={T} at={K.C + 3.6} until={K.P - 0.2} x={1010} y={620} texto="enzimas" color={KC.yellow} lado="izq" />
      <Etq T={T} at={K.C + 4.4} until={K.P - 0.2} x={1010} y={900} texto="nutrientes" color={KC.mint} lado="izq" />
      <Chip T={T} at={K.C + 3.4} until={K.P - 0.2} texto="digiere por fuera" y={420} borde={KC.yellow} tam={42} />
      {/* fruto */}
      <Chip T={T} at={K.F + 0.4} until={K.M - 0.2} texto="humedad ✓  temperatura ✓" y={420} borde={KC.cyan} tam={38} />
      <Etq T={T} at={K.F + 4.4} until={K.M - 0.2} x={770} y={620} texto="cuerpo fructífero" tam={30} />
      <Etq T={T} at={K.F + 5.6} until={K.M - 0.2} x={300} y={1020} texto="esporas" lado="izq" tam={30} />

      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.R - 0.1} texto="No es el hongo: *es su fruto.*" />
      <Subtitulo T={T} idx={1} at={K.R + 0.1} until={K.R + 4.4} texto="Hilos más delgados que un pelo: *hifas.*" />
      <Subtitulo T={T} idx={2} at={K.R + 4.5} until={K.C - 0.1} texto="Juntas forman *el micelio.*" />
      <Subtitulo T={T} idx={3} at={K.C + 0.1} until={K.C + 3.2} texto="Sin raíces, sin hojas, *sin fotosíntesis.*" />
      <Subtitulo T={T} idx={4} at={K.C + 3.3} until={K.P - 0.1} texto="Suelta enzimas y *absorbe lo que queda.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.F - 0.1} texto="¿Para qué *sale un champiñón?*" />
      <Subtitulo T={T} idx={6} at={K.F + 0.1} until={K.M - 0.1} texto="Un *cuerpo fructífero* para soltar esporas." />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.E - 0.1} texto="Te comes *la manzana,* no el árbol." />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.Q - 0.1} texto="Más parientes *de los animales* que de las plantas." />
      <Subtitulo T={T} idx={9} at={K.Q + 0.1} until={K.L - 0.1} texto="Pared de *quitina,* como un escarabajo." />
      <Subtitulo T={T} idx={10} at={K.L + 0.1} until={K.Ci - 0.1} texto="La levadura también es hongo: *una sola célula.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.O - 0.1} texto="Es *la parte* que sí alcanzas a ver." />

      <Robert T={T} apariciones={[[0, 3.4, 'avatar_11_sorprendido', 'gancho'], [9, 12.2, 'avatar_13_senalando_arriba', 'bajo-der'], [18, 21.2, 'avatar_07_pensativo_puno', 'bajo-der'], [22.7, 25.2, 'avatar_06_pensativo_menton', 'arriba-der'], [27.5, 31, 'avatar_02_apuntando_camara', 'presentador-bajo'], [41.4, 43.4, 'avatar_11_sorprendido', 'bajo-der'], [44.5, 47.2, 'avatar_04_bajando_lentes', 'bajo-der'], [53.5, 57.4, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="01" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="biologia" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo MUDO: el ciclo de un champiñón en 61.5 s (loop) ---------- */
function HongoCiclo() {
  const { T, CUES } = useComposition();
  const K = { E: CUES.Espora, G: CUES.Germina, R: CUES.Red, U: CUES.Une, N: CUES.Nudo, C: CUES.Crece, S: CUES.Esporas, Ot: CUES.Otro, F: CUES.Outro };
  const sup = MUNDO_SUELO.sup;
  // espora que cae (inicio) — y la del final, que cae igual y empata con el cuadro 0
  const caida = (t0, t1) => klerp(380, sup - 10, kprog(T, t0, t1, (p) => p * p));
  const caps = [{ at: K.E + 0.2, titulo: 'Cae una espora' }, { at: K.G, titulo: 'Germina: sale una hifa' }, { at: K.R, titulo: 'Crece el micelio' },
    { at: K.U, titulo: 'En muchos hongos, dos se unen' }, { at: K.N, titulo: 'Un nudo de hifas' }, { at: K.C, titulo: 'Crece el champiñón' }, { at: K.S, titulo: 'Suelta esporas' }, { at: K.Ot, titulo: 'Otra vez' }];
  const crece = kprog(T, K.N + 2.5, K.C + 5, kEase.suave), abre = kprog(T, K.C + 4.2, K.C + 8, kEase.sale);
  const red = kprog(T, K.R, K.U + 2, kEase.suave);
  const macro = T < K.G + 0.3 || T > K.R - 0.3;
  const esporaFinalX = 540;
  // cámara: se acerca al nudo de hifas (primordio) y se aleja mientras crece el champiñón
  const keysC = [{ t: K.R, x: 540, y: 1040, z: 1.15 }, { t: K.U, x: 600, y: 1200, z: 1.5 }, { t: K.U + 6, x: 600, y: 1240, z: 1.7 }, { t: K.N + 1.4, x: 600, y: sup - 30, z: 3.2 },
    { t: K.N + 5.5, x: 600, y: sup - 80, z: 2.6 }, { t: K.C + 4, x: 580, y: 1000, z: 1.1 }, { t: K.S + 6, x: 580, y: 960, z: 1 }, { t: K.Ot + 1, x: 540, y: 960, z: 1 }];
  const zC = T > K.R && T < K.Ot + 0.4 ? camaraEn(T, keysC).z : 1;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* espora que cae → germina (macro) */}
      <Escena T={T} a={K.E - 1} b={K.G + 0.6} zoom={0.15} origen={`50% ${(sup / KH) * 100}%`}>
        <MundoSuelo T={T} red={0} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><EsporaAg x={540 + mece(T, 3, 0.4) * 40} y={caida(K.E, K.E + 4.5)} s={3} rot={T * 90} /></svg>
      </Escena>
      {/* germina: hifa de cerca */}
      <Escena T={T} a={K.G + 0.6} b={K.R} fondo="radial-gradient(circle at 50% 50%, #1b2333 0%, #0E0F12 75%)" zoom={0.04}>
        <Ambiente T={T} n={30} seed={12} color="rgba(234,255,247,.35)" tam={[3, 8]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><EsporaAg x={60} y={1250} s={4} /></svg>
        <HifasMicro T={T} g={kprog(T, K.G + 0.8, K.R - 0.2, kEase.suave)} enzimas={kprog(T, K.G + 4, K.G + 5)} />
        <Escala T={T} z={1} pxPorMm={PX_MICRO} />
      </Escena>
      {/* micelio que se extiende; un segundo micelio llega desde la derecha y se unen */}
      <Escena T={T} a={K.R} b={K.Ot + 0.4} zoom={0}>
        <Camara T={T} keys={keysC}>
        <MundoSuelo T={T} red={red} brillo={0.6 + 0.4 * kprog(T, K.U, K.U + 1)} ox={420}>
          {(() => { const arb = kArbolRadial(3, 220), p = kprog(T, K.U - 2, K.U + 3, kEase.suave), une = kprog(T, K.U + 3, K.U + 5);
            return <g style={{ filter:'drop-shadow(0 0 6px #b18cff)' }}>{arb.map((s, i) => { const q = kclamp((p - s.b) / (s.e - s.b), 0, 1); if (q <= 0) return null;
              return <line key={i} x1={760 + s.x1 * 0.12} y1={sup + 8 + s.y1 * 0.12} x2={760 + (s.x1 + (s.x2 - s.x1) * q) * 0.12} y2={sup + 8 + (s.y1 + (s.y2 - s.y1) * q) * 0.12} stroke={mixHex('#d7c4ff', '#eafff7', une)} strokeWidth={3.4} strokeLinecap="round" />; })}</g>; })()}
          {T > K.U + 3 && <circle cx={600} cy={sup + 130} r={40 + 30 * Math.sin((T - K.U) * 4)} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={1 - kprog(T, K.U + 5, K.U + 6.5)} />}
          <Champinon x={600} y={sup + 4} s={2.0} crece={T < K.N + 2.5 ? 0 : crece} abre={abre} rot={mece(T, 2, 0.15) * 1.2} />
          {T > K.N && T < K.N + 2.8 && <g>{Array.from({ length: 14 }, (_, i) => { const p = kprog(T, K.N + i * 0.1, K.N + 1.4 + i * 0.1); return <line key={i} x1={600 + Math.cos(i * 2.2) * 120 * (1 - p)} y1={sup + 40 + Math.sin(i * 1.3) * 60 * (1 - p)} x2={600} y2={sup + 4} stroke="#eafff7" strokeWidth={5} opacity={p} />; })}
            <circle cx={600} cy={sup - 6} r={kprog(T, K.N + 1, K.N + 2.6) * 22} fill="#f6eedf" stroke={KC.ink} strokeWidth={5} /></g>}
          {T > K.S && Array.from({ length: 60 }, (_, i) => { const t0 = K.S + 0.4 + i * 0.12, u = T - t0; if (u < 0) return null;
            const x = 600 + (i % 15 - 7) * 22 + Math.sin(u * 1.4 + i) * 30 + u * (i % 3 - 1) * 40, y = sup - 380 + u * 60; if (y > sup - 8) return null;
            return <EsporaAg key={i} x={x} y={y} s={1.2} rot={i * 37} o={Math.min(1, u * 3)} />; })}
          {T > K.Ot - 0.6 && <EsporaAg x={klerp(640, esporaFinalX, kprog(T, K.Ot - 0.6, K.Ot + 1.2))} y={klerp(sup - 330, 380, kprog(T, K.Ot - 0.6, K.Ot + 1.2, kEase.sale))} s={2.2} rot={T * 90} />}
        </MundoSuelo>
        </Camara>
      </Escena>
      {/* otra vez: la espora viaja por el aire y vuelve a caer (empata con el cuadro 0) */}
      <Escena T={T} a={K.Ot + 0.4} b={K.F + 4} zoom={0}>
        <MundoSuelo T={T} red={0} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><EsporaAg x={540 + mece(T, 3, 0.4) * 40} y={380} s={3} rot={T * 90} /></svg>
      </Escena>

      <Capitulo T={T} caps={caps} hasta={K.F} />
      <Etq T={T} at={K.E + 1.4} until={K.G} x={620} y={700} texto="espora" />
      <Etq T={T} at={K.G + 1.6} until={K.R - 0.3} x={330} y={480} texto="hifa" color="#eafff7" />
      <Chip T={T} at={K.R + 1} until={K.U - 0.2} texto="micelio" y={1530} x={400} borde={KC.mint} tam={44} />
      <Chip T={T} at={K.U + 0.6} until={K.N - 0.2} texto="+  =  un micelio nuevo" y={1530} x={400} borde={KC.lilac} tam={40} />
      <Chip T={T} at={K.N + 0.3} until={K.C - 0.2} texto="primordio" y={1530} x={400} borde={KC.yellow} tam={44} />
      <Chip T={T} at={K.S + 0.5} until={K.Ot - 0.2} texto="esporas" y={1530} x={400} borde={KC.gold} tam={44} />
      <Escala T={T} z={macro ? zC : 1} pxPorMm={macro ? PX_MACRO : PX_MICRO} />
      <Robert T={T} apariciones={[[0, 3.5, 'avatar_11_sorprendido', 'gancho'], [8, 11, 'avatar_13_senalando_arriba', 'bajo-der'], [16.5, 19.5, 'avatar_07_pensativo_puno', 'arriba-der'], [25, 28, 'avatar_11_sorprendido', 'arriba-der'], [31, 34, 'avatar_06_pensativo_menton', 'arriba-der'], [36.5, 40.5, 'avatar_02_apuntando_camara', 'presentador-bajo'], [48.2, 51.5, 'avatar_04_bajando_lentes', 'arriba-der'], [54.5, 57.8, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="01" hasta={K.F} />
      <CierreMarca T={T} at={K.F} tema="biologia" robert="assets/stickers/avatar_02_apuntando_camara.png" frase="El ciclo de un champiñón" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

window.HongoNarradoApp = kApp(HongoNarrado);
window.HongoCicloApp = kApp(HongoCiclo);
