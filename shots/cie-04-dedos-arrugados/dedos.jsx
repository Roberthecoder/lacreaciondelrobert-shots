// Shot Científico #04 · Dedos arrugados: no es piel aguada, es tu sistema nervioso — NARRADO (N1 "Por dentro" + N5 el experimento).
// Datos: Kareklas et al. 2013 (Biol Lett), Wilder-Smith y Chow 2003 (Muscle Nerve), Haseleu et al. 2014 (PLoS One), Fustes et al. 2026 (revisión). Ver guion.md y verificacion.md.
const PIEL = '#f1b48f', PIEL2 = '#d98f6b', SANGRE = '#e23b3b', AGUA = 'rgba(80,180,255,.55)';

// Dedo visto por la yema (lado de la palma). w = arrugas 0..1. hincha = 0..1 (el mito). Coordenadas: punta en y ≈ -370.
function Dedo({ x, y, s = 1, w = 0, hincha = 0, rot = 0, nervio = false, cortado = false, T = 0 }) {
  const sx = 1 + 0.18 * hincha;
  const arrugas = [];
  for (let i = 0; i < 7; i++) {
    const xx = -75 + i * 25, ph = i * 1.7;
    let d = `M ${xx} -330`;
    for (let k = 1; k <= 12; k++) { const yy = -330 + k * 22; d += ` Q ${xx + Math.sin(ph + k * 1.3) * 16 * w + 8 * w} ${yy - 11} ${xx + Math.sin(ph + k * 0.9) * 10 * w} ${yy}`; }
    arrugas.push(<path key={i} d={d} stroke={PIEL2} strokeWidth={5 + 4 * w} fill="none" strokeLinecap="round" opacity={w} />);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * sx} ${s})`}>
    <path d="M -115 420 L -115 -250 A 115 120 0 0 1 115 -250 L 115 420 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={0} cy={-230} rx={20 + k * 16} ry={28 + k * 18} fill="none" stroke="rgba(150,80,50,.25)" strokeWidth={3} />)}
    {arrugas}
    <path d="M -80 10 Q 0 30 80 10" stroke={PIEL2} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -80 250 Q 0 270 80 250" stroke={PIEL2} strokeWidth={7} fill="none" strokeLinecap="round" />
    {nervio && <path d={`M 40 420 C 60 200 20 0 40 -300`} stroke={KC.yellow} strokeWidth={12} fill="none" strokeLinecap="round" opacity=".95" />}
    {nervio && !cortado && <circle cx={klerp(40, 40, 0)} cy={420 - ((T * 400) % 720)} r={14} fill="#fff" opacity=".9" />}
    {cortado && <g transform="translate(46 120)"><path d="M -36 -36 L 36 36 M 36 -36 L -36 36" stroke={KC.red} strokeWidth={16} strokeLinecap="round" /></g>}
  </g>;
}
// Mano abierta (palma) esquemática + planta del pie, con la piel sin pelo resaltada.
function ManoPie({ T, at }) {
  const g = kprog(T, at + 0.4, at + 1.2, kEase.sale), pulso = 0.5 + 0.5 * Math.sin(T * 5);
  const dedo = (x, y, h, r) => <rect x={x - 42} y={y - h} width={84} height={h + 40} rx={42} transform={`rotate(${r} ${x} ${y})`} fill={PIEL} stroke={KC.ink} strokeWidth={8} />;
  return <g>
    <g transform="translate(330 830) scale(.95)">
      {dedo(-120, -90, 230, -12)}{dedo(-40, -120, 280, -4)}{dedo(45, -120, 290, 3)}{dedo(125, -90, 240, 10)}
      <rect x={-180} y={-150} width={350} height={330} rx={120} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
      {dedo(-200, 60, 200, -50)}
      <ellipse cx={-5} cy={20} rx={150} ry={130} fill={KC.yellow} opacity={0.35 * g * (0.6 + 0.4 * pulso)} />
      {[[-148, -300], [-55, -360], [52, -372], [150, -312], [-330, -60]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={34} fill={KC.yellow} opacity={0.55 * g * (0.6 + 0.4 * pulso)} />)}
    </g>
    <g transform="translate(800 860) scale(.9)">
      <path d="M -80 -230 Q -130 -120 -110 20 Q -100 160 -60 250 Q 0 320 60 250 Q 100 160 100 0 Q 110 -140 70 -230 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} />
      {[[-70, -275, 32], [-15, -295, 26], [33, -290, 24], [72, -270, 22], [100, -235, 20]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={PIEL} stroke={KC.ink} strokeWidth={7} />)}
      <path d="M -80 -230 Q -130 -120 -110 20 Q -100 160 -60 250 Q 0 320 60 250 Q 100 160 100 0 Q 110 -140 70 -230 Z" fill={KC.yellow} opacity={0.35 * g * (0.6 + 0.4 * pulso)} />
    </g>
  </g>;
}
// Corte de la yema (dentro): piel arriba, pulpa con vasos y un nervio. vaso = 1 abierto → 0.4 cerrado; pliegue 0..1.
function CorteYema({ T, vaso = 1, pliegue = 0, senal = 0 }) {
  const y0 = 560 + 40 * pliegue, amp = 46 * pliegue, X0 = -40, X1 = 1120;
  const sup = (dy) => { let d = `M ${X0} ${y0 + dy}`; for (let x = X0; x <= X1; x += 20) d += ` L ${x} ${(y0 + dy + Math.sin(x / 70) * amp).toFixed(1)}`; return d; };
  const banda = sup(0) + ` L ${X1} ${y0 + 80 + Math.sin(X1 / 70) * amp * 0.7} ` + (() => { let d = ''; for (let x = X1; x >= X0; x -= 20) d += ` L ${x} ${(y0 + 80 + Math.sin(x / 70) * amp * 0.7).toFixed(1)}`; return d; })() + ' Z';
  const vasos = [790, 900, 1010];
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={y0 - 80} width={KW} height={900} fill="#5a1f2c" />
    <path d={sup(0) + ` L ${X1} 1500 L ${X0} 1500 Z`} fill="#c4687a" />
    <path d={banda} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
    {vasos.map((vy, i) => { const r = 30 * vaso; return <g key={i}>
      <rect x={-20} y={vy - r} width={KW + 40} height={r * 2} rx={r} fill={SANGRE} stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 9 }, (_, k) => { const xx = ((k * 140 + T * 160 * vaso * (i % 2 ? 1 : 1.2) + i * 50) % (KW + 100)) - 50; return <ellipse key={k} cx={xx} cy={vy} rx={18 * Math.max(vaso, 0.55)} ry={12 * vaso} fill="#ff8a8a" stroke="#8a1a1a" strokeWidth={3} />; })}
    </g>; })}
    <path d="M -20 1120 C 300 1080 500 1150 1100 1090" stroke={KC.yellow} strokeWidth={14} fill="none" />
    {senal > 0 && Array.from({ length: 4 }, (_, k) => { const u = ((T * 0.9 + k / 4) % 1); return <circle key={k} cx={klerp(-20, 1100, u)} cy={klerp(1120, 1090, u) + Math.sin(u * 9) * 18} r={16} fill="#fff" opacity={senal} />; })}
    <rect x={0} y={1180} width={KW} height={400} fill="#e9dcc9" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 14 }, (_, k) => <circle key={k} cx={40 + k * 75} cy={1240 + (k % 3) * 40} r={10} fill="#cdbca4" />)}
  </svg>;
}
// Barras de tiempo (relativo): con arrugas vs. sin arrugas.
function BarrasT({ T, at, until, filas, y = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = kprog(T, at + 0.1, at + 1.3, kEase.sale);
  return <div style={{ position:'absolute', left:70, top:y, width:940, zIndex:40, opacity:e.o }}>
    <div style={{ font:`700 30px ${KF.mono}`, color:KC.ink, marginBottom:14 }}>TIEMPO CON OBJETOS BAJO EL AGUA</div>
    {filas.map((f, i) => <div key={i} style={{ marginBottom:24 }}>
      <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
      <div style={{ width:820 * f.valor / 100 * g, height:76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
    </div>)}
  </div>;
}
function Recipientes({ T, a }) {
  const canicas = [];
  for (let k = 0; k < 8; k++) { const t0 = a + 0.6 + k * 0.7, u = kprog(T, t0, t0 + 0.6, kEase.suave); if (T < t0) continue;
    const x = klerp(330, 760, u), y = 1010 - Math.sin(u * Math.PI) * 220 + (u >= 1 ? 30 + (k % 3) * 8 : 0);
    canicas.push(<circle key={k} cx={u >= 1 ? 720 + (k % 4) * 26 : x} cy={u >= 1 ? 1080 - Math.floor(k / 4) * 26 : y} r={k % 5 === 4 ? 22 : 14} fill={k % 5 === 4 ? '#7d8796' : [KC.cyan, KC.pink, KC.mint, KC.yellow][k % 4]} stroke={KC.ink} strokeWidth={4} />); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={160} y={920} width={340} height={230} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={168} y={960} width={324} height={182} rx={16} fill={AGUA} />
    {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={210 + k * 50} cy={1100 - (k % 2) * 26} r={k === 5 ? 22 : 14} fill={k === 5 ? '#7d8796' : [KC.cyan, KC.pink, KC.mint, KC.yellow][k % 4]} stroke={KC.ink} strokeWidth={4} />)}
    <rect x={640} y={980} width={260} height={170} rx={18} fill="#c98b4a" stroke={KC.ink} strokeWidth={8} />
    {canicas}
    <text x={330} y={1200} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>bajo el agua</text>
    <text x={770} y={1200} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>caja</text>
  </svg>;
}

function Dedos() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Piel, M: CUES.Mito, N: CUES.Nervio, Q: CUES.Pregunta, V: CUES.Vasos, L: CUES.Pliegue, Pr: CUES.Prueba, E: CUES.Estudio, R: CUES.Rapido, B: CUES.Berlin, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const wG = kprog(T, K.G + 0.1, K.G + 2.6, kEase.suave);                 // arrugas del gancho (se mueven desde el cuadro 0)
  const wN = kprog(T, K.N + 0.8, K.N + 3.5, kEase.suave);
  const vaso = klerp(1, 0.42, kprog(T, K.V + 0.8, K.V + 3.2, kEase.suave));
  const pl = kprog(T, K.L + 0.3, K.L + 2.8, kEase.suave);
  const balanceo = Math.sin(T * 1.4) * 2;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la yema se arruga desde el cuadro 0, con gotas */}
      <Escena T={T} a={K.G} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Dedo x={420} y={1150} s={1.25} w={wG} rot={balanceo} />
          <Goteo T={T} x={300} y0={540} y1={700} cada={0.7} color={AGUA} desde={K.G} r={14} />
          <Goteo T={T} x={560} y0={520} y1={680} cada={0.9} color={AGUA} desde={K.G + 0.3} r={12} />
        </>)}
      </Escena>
      {/* 2 · piel sin pelo: palmas, yemas, plantas */}
      <Escena T={T} a={K.P} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {svg(<ManoPie T={T} at={K.P} />)}
      </Escena>
      {/* 3 · el mito: el agua entra y la hincha */}
      <Escena T={T} a={K.M} b={K.N}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Dedo x={540} y={1150} s={1.1} hincha={kprog(T, K.M + 0.5, K.M + 1.8, kEase.suave) * (1 - kprog(T, K.M + 2.4, K.M + 3.0))} />
          <Goteo T={T} x={420} y0={500} y1={760} cada={0.4} color={AGUA} desde={K.M} hasta={K.M + 2.2} r={16} />
          <Goteo T={T} x={660} y0={520} y1={760} cada={0.5} color={AGUA} desde={K.M + 0.2} hasta={K.M + 2.2} r={14} />
        </>)}
      </Escena>
      {/* 4 · el nervio dañado: ese dedo no se arruga */}
      <Escena T={T} a={K.N} b={K.Q}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Dedo x={250} y={1180} s={0.78} w={wN} nervio T={T} />
          <Dedo x={540} y={1180} s={0.78} w={0} nervio cortado={T > K.N + 0.4} T={T} />
          <Dedo x={830} y={1180} s={0.78} w={wN} nervio T={T} />
        </>)}
        <Etq T={T} at={K.N + 2.2} until={K.Q - 0.2} x={120} y={1440} texto="nervio dañado = sin arrugas" lado="der" tam={34} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.V} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6–7 · dentro de la yema: los vasos se cierran y la piel se pliega */}
      <Escena T={T} a={K.V} b={K.Pr} fondo={KC.noche} zoom={0.03}>
        <CorteYema T={T} vaso={vaso} pliegue={pl} senal={kprog(T, K.V + 0.2, K.V + 0.8) * (1 - kprog(T, K.L + 1, K.L + 2))} />
        <Ambiente T={T} n={24} color="rgba(255,255,255,.18)" />
        <Escala T={T} z={1} pxPorMm={200} y={1430} />
        <Etq T={T} at={K.V + 0.3} until={K.Pr - 0.3} x={560} y={500} texto="piel" lado="der" />
        <Etq T={T} at={K.V + 0.6} until={K.Pr - 0.3} x={120} y={735} texto="vasos sanguíneos" lado="der" />
        <Etq T={T} at={K.V + 0.9} until={K.Pr - 0.3} x={640} y={1170} texto="nervio" lado="der" color={KC.yellow} />
      </Escena>
      {/* 8 · prueba de nervios */}
      <Escena T={T} a={K.Pr} b={K.E}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <ellipse cx={540} cy={1150} rx={300} ry={60} fill="#fff" stroke={KC.ink} strokeWidth={8} />
          <path d="M 240 1150 L 280 1330 Q 540 1390 800 1330 L 840 1150" fill="#fff" stroke={KC.ink} strokeWidth={8} />
          <ellipse cx={540} cy={1160} rx={280} ry={46} fill={AGUA} />
          <Dedo x={540} y={klerp(900, 1050, kprog(T, K.Pr + 0.2, K.Pr + 1.2, kEase.suave))} s={0.7} w={kprog(T, K.Pr + 1.2, K.Pr + 2.8)} />
          <g transform={`translate(860 640) rotate(6) scale(${kprog(T, K.Pr + 1.0, K.Pr + 1.5, kEase.rebote)})`}>
            <rect x={-130} y={-170} width={260} height={330} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
            <rect x={-50} y={-190} width={100} height={40} rx={10} fill="#8a8f99" stroke={KC.ink} strokeWidth={6} />
            <text x={0} y={-90} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>nervios</text>
            <path d="M -50 0 l 30 34 l 70 -80" stroke={KC.leaf} strokeWidth={18} fill="none" strokeLinecap="round" />
          </g>
        </>)}
      </Escena>
      {/* 9 · el estudio de Newcastle (2013) */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.cyan} />
        <Recipientes T={T} a={K.E + 2.6} />
      </Escena>
      {/* 10 · 12 % menos tiempo */}
      <Escena T={T} a={K.R} b={K.B}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      {/* 11 · Berlín (2014): sin ventaja */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.mint} />
      </Escena>
      {/* 12 · cierre: la misma yema del inicio, ya arrugada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<Dedo x={420} y={1150} s={1.25} w={1} rot={balanceo} />)}
      </Escena>
      {(T < K.M || (T >= K.C && T < K.Ou)) && <Escala T={T} z={1} pxPorMm={14} y={1430} x={60} />}

      {/* datos */}
      <Chip T={T} at={K.G + 0.3} until={K.P - 0.2} texto="¿piel aguada?" x={300} y={440} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.P + 0.6} until={K.M - 0.2} x={120} y={470} texto="piel sin pelo" lado="der" tam={38} />
      <Etq T={T} at={K.P + 1.4} until={K.M - 0.2} x={330} y={1440} texto="palmas · yemas · plantas" lado="der" tam={32} />
      <MitoTachado T={T} at={K.M + 0.3} tacharEn={K.M + 2.6} until={K.N - 0.3} texto="«el agua la hincha»" x={600} y={440} tam={44} />
      <Chip T={T} at={K.V + 1.0} until={K.L - 0.1} texto="los vasos se cierran" x={430} y={430} tam={40} borde={SANGRE} />
      <Chip T={T} at={K.L + 0.3} until={K.Pr - 0.3} texto="menos sangre: se pliega" x={360} y={430} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Pr + 0.3} until={K.E - 0.2} texto="prueba de los nervios" x={540} y={440} tam={42} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.4} anio="2013" quien="Newcastle, Inglaterra" revista="Kareklas et al. · Biol. Lett." x={600} y={700} />
      <Chip T={T} at={K.E + 2.6} until={K.R - 0.2} texto="20 personas · canicas y pesas" x={540} y={830} tam={38} borde={KC.ink} />
      <BarrasT T={T} at={K.R + 0.2} until={K.B - 0.3} y={720} filas={[{ valor: 100, etiqueta: 'dedos lisos', color: KC.orange }, { valor: 88, etiqueta: 'dedos arrugados', color: KC.blue }]} />
      <NumeroGigante T={T} at={K.R + 1.4} until={K.B - 0.3} valor={12} prefijo="−" sufijo=" %" etiqueta="de tiempo" x={540} y={1520} tam={130} color={KC.blue} />
      <Chip T={T} at={K.R + 2.8} until={K.B - 0.3} texto="objetos secos: igual" x={540} y={1720} tam={34} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.B + 0.2} until={K.C - 0.3} anio="2014" quien="Berlín · 40 personas" revista="Haseleu et al. · PLoS One" x={640} y={760} />
      <Chip T={T} at={K.B + 2.4} until={K.C - 0.3} texto="no encontraron ventaja" x={540} y={1060} tam={44} borde={KC.red} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="¿para qué? sigue en debate" x={390} y={440} tam={38} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="No es piel aguada: *son tus nervios.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.M - 0.1} texto="Piel sin pelo: *palmas, yemas, plantas.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.N - 0.1} texto="¿El agua *la hincha?*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.Q - 0.1} texto="Nervio dañado: *no se arruga.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.V - 0.1} texto="¿Quién *arruga tu dedo?*" />
      <Subtitulo T={T} idx={5} at={K.V + 0.1} until={K.L - 0.1} texto="Tus nervios *cierran los vasitos.*" />
      <Subtitulo T={T} idx={6} at={K.L + 0.1} until={K.Pr - 0.1} texto="Menos sangre: *la piel se pliega.*" />
      <Subtitulo T={T} idx={7} at={K.Pr + 0.1} until={K.E - 0.1} texto="Una *prueba de nervios.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.R - 0.1} texto="Newcastle, 2013: *canicas bajo el agua.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.B - 0.1} texto="Arrugados: *12 % menos tiempo.*" />
      <Subtitulo T={T} idx={10} at={K.B + 0.1} until={K.C - 0.1} texto="Berlín, 2014: *sin ventaja.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Para qué? *Sigue en debate.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mito + 0.4, CUES.Nervio - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Nervio + 3.2, CUES.Pregunta - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Vasos + 1.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Pliegue + 0.8, CUES.Prueba - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Rapido - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Rapido + 0.4, CUES.Berlin - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Berlin + 0.3, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="04" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DedosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Dedos /></CompositionStage></div>;
}
window.DedosApp = DedosApp;
