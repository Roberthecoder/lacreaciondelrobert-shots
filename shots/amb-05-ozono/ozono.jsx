// Shot Ambiental #05 · El agujero de ozono se está cerrando (Mario Molina y el Protocolo de Montreal) — NARRADO (N3 capítulos + N1 por dentro).
// Datos: WMO/UNEP (evaluación 2022, comunicado del 9 ene 2023), EPA (ciencia básica de la capa de ozono), NobelPrize.org (1995) y
// Molina y Rowland, Nature 249: 810 (1974). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// Lado: refrigerador y aerosol que sueltan nubecitas de CFC.
function Cocina({ T, a }) {
  const nubes = [];
  for (let k = 0; k < 7; k++) { const t0 = a + 0.3 + k * 0.55, u = kprog(T, t0, t0 + 3.2); if (u <= 0 || u >= 1) continue;
    const de = k % 2 ? [300, 700] : [760, 760];
    nubes.push(<g key={k} transform={`translate(${de[0] + Math.sin(u * 6 + k) * 40} ${de[1] - u * 520})`} opacity={1 - u}>
      <circle r={48} fill="#e9e3ff" stroke={KC.ink} strokeWidth={4} /><text y={12} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>CFC</text></g>); }
  return <g>
    <rect x={160} y={680} width={300} height={560} rx={30} fill="#f4f8ff" stroke={KC.ink} strokeWidth={9} />
    <line x1={160} y1={860} x2={460} y2={860} stroke={KC.ink} strokeWidth={7} />
    <rect x={410} y={740} width={20} height={80} rx={8} fill={KC.ink} /><rect x={410} y={900} width={20} height={120} rx={8} fill={KC.ink} />
    <text x={310} y={1290} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>refrigerador</text>
    <g transform={`translate(760 ${1000 + Math.sin(T * 8) * 4})`}>
      <rect x={-70} y={-150} width={140} height={330} rx={26} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
      <rect x={-40} y={-200} width={80} height={56} rx={10} fill="#bbb" stroke={KC.ink} strokeWidth={7} />
      <rect x={-50} y={-60} width={100} height={110} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
      <text y={10} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>spray</text>
    </g>
    <text x={760} y={1290} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>aerosol</text>
    {nubes}
  </g>;
}
// Un baño convertido en laboratorio: tina con matraces que burbujean.
function BanoLab({ T, a }) {
  const burb = (cx, cy, k) => Array.from({ length: 4 }, (_, i) => { const u = ((T * 0.8 + i * 0.25 + k * 0.13) % 1); return <circle key={i} cx={cx + Math.sin(u * 9 + i) * 10} cy={cy - u * 120} r={6 + i * 2} fill="#fff" opacity={1 - u} stroke={KC.ink} strokeWidth={2} />; });
  const matraz = (x, col, k) => <g key={k} transform={`translate(${x} 820) scale(${kprog(T, a + 0.5 + k * 0.35, a + 0.9 + k * 0.35, kEase.rebote)})`}>
    <path d="M -22 -110 L -22 -40 L -80 60 Q -88 80 -66 80 L 66 80 Q 88 80 80 60 L 22 -40 L 22 -110 Z" fill="#eaf7ff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -60 40 L 60 40 L 74 66 Q 78 76 64 76 L -64 76 Q -78 76 -74 66 Z" fill={col} />
    {burb(0, 30, k)}
  </g>;
  return <g>
    <rect x={0} y={1080} width={KW} height={300} fill="#cfe9e1" />
    {Array.from({ length: 10 }, (_, i) => <line key={i} x1={i * 120} y1={1080} x2={i * 120} y2={1380} stroke="#9cc9bb" strokeWidth={4} />)}
    <path d="M 120 900 L 960 900 Q 960 1120 800 1140 L 280 1140 Q 120 1120 120 900 Z" fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <rect x={100} y={880} width={880} height={36} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    {matraz(300, KC.pink, 0)}{matraz(540, KC.leaf, 1)}{matraz(780, KC.cyan, 2)}
  </g>;
}
// Vista de lado: suelo, cielo y la capa de ozono entre 15 y 40 km, con regla de altura. Escala: 14 px por km.
const OZ_Y0 = 1150, OZ_PXKM = 14;
const ozY = (km) => OZ_Y0 - km * OZ_PXKM;
function CieloLado({ T, a, rayos = true, oscuro = 0 }) {
  return <g>
    <defs><linearGradient id="cielo" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={mixHex('#9fdcff', '#1d2b6a', oscuro)} /><stop offset="100%" stopColor={mixHex('#2346ff', '#070b1d', oscuro)} /></linearGradient></defs>
    <rect x={0} y={0} width={KW} height={KH} fill="url(#cielo)" />
    <rect x={0} y={ozY(40)} width={KW} height={ozY(15) - ozY(40)} fill={KC.mint} opacity={0.28 + 0.06 * Math.sin(T * 2)} />
    {Array.from({ length: 40 }, (_, i) => { const r = krng(i + 7); const x = r() * KW, y = ozY(15 + r() * 25); return <Ozono key={i} x={x + Math.sin(T + i) * 6} y={y} s={0.32} rot={r() * 360} />; })}
    <path d={`M 0 ${OZ_Y0} Q 540 ${OZ_Y0 - 50} ${KW} ${OZ_Y0} L ${KW} ${KH} L 0 ${KH} Z`} fill="#58b85c" stroke={KC.ink} strokeWidth={8} />
    {/* regla de altura */}
    <line x1={70} y1={ozY(0)} x2={70} y2={ozY(50)} stroke="#fff" strokeWidth={5} />
    {[0, 10, 20, 30, 40, 50].map((km) => <g key={km}><line x1={60} y1={ozY(km)} x2={92} y2={ozY(km)} stroke="#fff" strokeWidth={5} /><text x={100} y={ozY(km) + 10} style={{ font:`700 28px ${KF.mono}` }} fill="#fff" stroke={KC.ink} strokeWidth={4} paintOrder="stroke">{km} km</text></g>)}
    {rayos && [0, 1, 2, 3].map((k) => { const u = kprog(T, a + 0.4 + k * 0.4, a + 1.4 + k * 0.4); if (u <= 0) return null; const x0 = 880 - k * 150, yEnd = ozY(30 + (k % 2) * 5), yy = klerp(120, yEnd, u);
      return <g key={k}><line x1={x0 + 60} y1={120} x2={x0 + 60 - (yy - 120) * 0.15} y2={yy} stroke="#c58bff" strokeWidth={12} strokeLinecap="round" strokeDasharray="26 14" />
        {u >= 1 && <circle cx={x0 + 60 - (yEnd - 120) * 0.15} cy={yEnd} r={22 + 6 * Math.sin(T * 9)} fill="#c58bff" opacity=".7" />}</g>; })}
  </g>;
}
// Documento del Protocolo de Montreal con sello.
function Protocolo({ T, a }) {
  const e = kprog(T, a + 0.1, a + 0.6, kEase.rebote), sello = kprog(T, a + 1.6, a + 2.0, kEase.rebote);
  return <g transform={`translate(540 860) rotate(-4) scale(${e})`}>
    <rect x={-300} y={-380} width={600} height={760} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <text x={0} y={-290} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={KC.ink}>PROTOCOLO</text>
    <text x={0} y={-220} textAnchor="middle" style={{ font:`400 62px ${KF.titulo}` }} fill={KC.ink}>DE MONTREAL</text>
    <text x={0} y={-160} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#5a524a">1987</text>
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={-240} y={-110 + i * 56} width={i % 3 === 2 ? 300 : 480} height={16} rx={8} fill="#d8d1c2" />)}
    <g transform={`translate(150 260) scale(${sello}) rotate(-14)`} opacity={sello}>
      <circle r={90} fill="none" stroke={KC.red} strokeWidth={10} /><text y={14} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.red}>FIRMADO</text>
    </g>
  </g>;
}
// Medalla esquemática del Nobel (sin reproducir el diseño real).
function Medalla({ T, at, x, y }) {
  if (T < at) return null; const e = kprog(T, at, at + 0.5, kEase.rebote);
  return <g transform={`translate(${x} ${y}) scale(${e}) rotate(${Math.sin(T * 2) * 4})`}>
    <path d="M -60 -230 L -20 -90 L 20 -90 L 60 -230 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    <circle r={110} fill={KC.gold} stroke={KC.ink} strokeWidth={9} /><circle r={80} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="8 8" />
    <text y={18} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>NOBEL</text>
  </g>;
}

function OzonoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Capa, Cf: CUES.CFC, M: CUES.Molina, S: CUES.Suben, P: CUES.Pregunta, Cl: CUES.Cloro, E: CUES.Estudio, Mo: CUES.Montreal, N: CUES.Noventa, F: CUES.Fechas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // Agujero: 1 al inicio, se encoge un poco en el gancho; en "Fechas" se cierra; en el cierre queda chiquito.
  const huecoG = klerp(1, 0.82, kprog(T, K.G + 0.2, K.Ca, kEase.suave));
  const huecoF = klerp(0.85, 0.05, kprog(T, K.F + 0.6, K.C, kEase.suave));
  const sube = kprog(T, K.S + 0.1, K.S + 1.4, kEase.suave), rompe = kprog(T, K.S + 1.4, K.S + 2.0, kEase.sale);
  // Cloro que atraviesa la nube de ozono y rompe moléculas (escena "Cloro").
  const clT = kprog(T, K.Cl + 0.2, K.E - 0.2);
  const clX = klerp(120, 960, clT), clY = 760 + Math.sin(clT * Math.PI * 4) * 220;
  const MOLS = Array.from({ length: 16 }, (_, i) => { const r = krng(30 + i); return { x: 140 + (i % 4) * 250 + r() * 60, y: 520 + Math.floor(i / 4) * 125 + r() * 30, rot: r() * 360 }; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el agujero (vista desde el polo sur) se encoge */}
      <Escena T={T} a={K.G} b={K.Ca}>
        <FondoEspacio T={T} />
        {svg(<g transform={`rotate(${T * 4} 540 840)`}><TierraPolo T={T} x={540} y={840} r={320} hueco={huecoG} etiqueta={false} /></g>)}
        <EscalaFija texto="2,000 km (aprox.)" largo={100} />
      </Escena>
      {/* 2 · la capa (vista de lado, regla de altura) */}
      <Escena T={T} a={K.Ca} b={K.Cf}>
        {svg(<><CieloLado T={T} a={K.Ca} /><Sol T={T} x={900} y={200} r={70} /></>)}
        <EscalaFija texto="10 km" largo={OZ_PXKM * 10} y={1480} />
      </Escena>
      {/* 3 · refrigeradores y aerosoles */}
      <Escena T={T} a={K.Cf} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {svg(<g transform="translate(0 -170)"><Cocina T={T} a={K.Cf} /></g>)}
        <EscalaFija texto="1 m" largo={330} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · Mario Molina: un baño convertido en laboratorio */}
      <Escena T={T} a={K.M} b={K.S}>
        <FondoLunares color={KC.mint} />
        {svg(<BanoLab T={T} a={K.M} />)}
        <EscalaFija texto="1 m" largo={330} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · suben, el sol los rompe y sueltan cloro */}
      <Escena T={T} a={K.S} b={K.P}>
        {svg(<><CieloLado T={T} a={K.S} rayos={false} oscuro={0.6} /><Sol T={T} x={880} y={190} r={70} />
          {rompe > 0 && <line x1={860} y1={260} x2={klerp(860, 560, rompe)} y2={klerp(260, ozY(27), rompe)} stroke={KC.yellow} strokeWidth={10} strokeDasharray="22 12" />}
          <CFC x={540} y={klerp(ozY(2), ozY(27), sube)} s={1.1} rot={T * 30} suelta={rompe} /></>)}
        <EscalaFija texto="10 km" largo={OZ_PXKM * 10} y={1480} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cl} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={300} y={960} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 880)`}>?</text>
          <Atomo x={300} y={1090} r={56} color={KC.leaf} letra="Cl" s={1 + 0.08 * Math.sin(T * 6)} /></>)}
      </Escena>
      {/* 7 · un cloro, más de cien mil ozonos (escena por dentro: fondo oscuro) */}
      <Escena T={T} a={K.Cl} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }} />
        <Ambiente T={T} n={30} color="rgba(127,227,255,.25)" />
        {svg(<>{MOLS.map((m, i) => { const d = Math.hypot(m.x - clX, m.y - clY), roto = T > K.Cl + 0.2 && (m.x < clX - 20 || d < 70);
          return <Ozono key={i} x={m.x} y={m.y} s={0.9} rot={m.rot + Math.sin(T + i) * 8} rompe={roto ? 1 : 0} o={roto ? 0.55 : 1} />; })}
          <g transform={`translate(${clX} ${clY})`}><circle r={90} fill={KC.leaf} opacity={0.18 + 0.1 * Math.sin(T * 10)} /><Atomo x={0} y={0} r={44} color={KC.leaf} letra="Cl" /></g></>)}
        <EscalaFija texto="0.1 nm (aprox.)" largo={30} color={KC.cyan} />
      </Escena>
      {/* 8 · el estudio y el Nobel */}
      <Escena T={T} a={K.E} b={K.Mo}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Medalla T={T} at={K.E + 3.0} x={540} y={1070} />)}
      </Escena>
      {/* 9 · Protocolo de Montreal */}
      <Escena T={T} a={K.Mo} b={K.N}>
        <FondoLunares color={KC.cyan} />
        {svg(<Protocolo T={T} a={K.Mo} />)}
      </Escena>
      {/* 10 · casi el 99 % eliminado */}
      <Escena T={T} a={K.N} b={K.F}>
        <FondoLunares color={KC.mint} />
        {svg(<g transform="translate(540 960)">{Array.from({ length: 10 }, (_, i) => { const tachado = T > K.N + 1.2 + i * 0.25;
          return <g key={i} transform={`translate(${(i % 5) * 170 - 340} ${Math.floor(i / 5) * 150 - 60}) scale(0.7)`}><CFC x={0} y={0} o={tachado ? 0.35 : 1} />
            {tachado && <path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}</g>; })}</g>)}
      </Escena>
      {/* 11–12 · se cierra el agujero y regreso a la imagen del inicio */}
      <Escena T={T} a={K.F} b={FIN}>
        <FondoEspacio T={T} />
        {svg(<><g transform={`rotate(${T * 4} 540 840)`}><TierraPolo T={T} x={540} y={840} r={320} hueco={T < K.C ? huecoF : 0.05} etiqueta={false} /></g>{T < K.C - 1.5 && huecoF > 0.25 && <text x={540} y={840 - 175 * huecoF * 0.84 - 26} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={6} paintOrder="stroke">agujero de ozono</text>}</>)}
        <EscalaFija texto="2,000 km (aprox.)" largo={100} />
      </Escena>

      {/* datos y etiquetas */}
      <Chip T={T} at={K.G + 0.3} until={K.Ca - 0.2} texto="se está cerrando" x={300} y={430} tam={42} borde={KC.lilac} />
      <Etq T={T} at={K.G + 0.6} until={K.Ca - 0.2} x={60} y={1530} texto="la Antártida, vista desde el polo sur" tam={26} />
      <Chip T={T} at={K.Ca + 0.3} until={K.Cf - 0.2} texto="capa de ozono · 15 a 40 km" y={ozY(27.5)} tam={38} borde={KC.mint} />
      <Etq T={T} at={K.Ca + 1.8} until={K.Cf - 0.2} x={640} y={ozY(44)} texto="luz ultravioleta" lado="izq" color="#e2c4ff" tam={30} />
      <Chip T={T} at={K.Cf + 1.6} until={K.M - 0.2} texto="gases CFC: «inofensivos»" y={430} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.3} until={K.S - 0.2} texto="Mario Molina · Ciudad de México" x={650} y={430} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.M + 1.6} until={K.S - 0.2} texto="de niño: su laboratorio en un baño" x={650} y={520} tam={30} borde={KC.pink} />
      <Etq T={T} at={K.S + 1.6} until={K.P - 0.1} x={620} y={ozY(30) - 150} texto="se suelta el cloro" tam={32} />
      <Chip T={T} at={K.S + 0.2} until={K.P - 0.2} texto="el sol rompe los CFC" x={620} y={430} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.P + 0.2} until={K.Cl - 0.1} texto="¿qué daño hace un poquito de cloro?" x={540} y={430} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.Cl + 0.3} until={K.E - 0.2} texto="1 átomo de cloro" y={430} tam={40} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.Cl + 0.8} until={K.E - 0.2} valor={100000} dur={2.4} prefijo="+" etiqueta="moléculas de ozono destruidas" y={1075} tam={120} color={KC.cyan} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Mo - 0.3} anio="1974" quien="Molina y Rowland" revista="Nature 249: 810–812" x={640} y={640} />
      <Chip T={T} at={K.E + 3.2} until={K.Mo - 0.3} texto="Nobel de Química 1995" y={1300} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Mo + 2.4} until={K.N - 0.2} texto="dejar de fabricar los CFC" y={1320} tam={38} borde={KC.red} />
      <NumeroGigante T={T} at={K.N + 0.3} until={K.F - 0.2} valor={99} dur={1.6} sufijo=" %" etiqueta="gases prohibidos eliminados (2023)" x={420} y={620} tam={200} color={KC.yellow} />
      <Chip T={T} at={K.F + 0.4} until={K.C - 0.2} texto="como antes del agujero (1980)" x={650} y={420} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.F + 2.2} until={K.C - 0.2} texto="2040 · casi todo el mundo" x={660} y={1440} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.F + 4.6} until={K.C - 0.2} texto="2066 · la Antártida" x={660} y={1530} tam={34} borde={KC.lilac} />
      <Chip T={T} at={K.C + 0.3} until={K.Ou - 0.1} texto="si le hacemos caso a la ciencia" x={400} y={430} tam={32} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="No se agranda: *se está cerrando.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.Cf - 0.1} texto="El ozono frena *la luz ultravioleta.*" />
      <Subtitulo T={T} idx={2} at={K.Cf + 0.1} until={K.M - 0.1} texto="Gases CFC *que parecían inofensivos.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.S - 0.1} texto="Mario Molina: *¿a dónde iban?*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.P - 0.1} texto="El sol los rompe: *cloro.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Cl - 0.1} texto="¿Qué daño hace *un poquito de cloro?*" />
      <Subtitulo T={T} idx={6} at={K.Cl + 0.1} until={K.E - 0.1} texto="1 cloro: *más de 100 mil ozonos.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Mo - 0.1} texto="Nature, 1974: *luego, el Nobel.*" />
      <Subtitulo T={T} idx={8} at={K.Mo + 0.1} until={K.N - 0.1} texto="Montreal, 1987: *dejar de fabricarlos.*" />
      <Subtitulo T={T} idx={9} at={K.N + 0.1} until={K.F - 0.1} texto="Y funcionó: *casi 99 % eliminado.*" />
      <Subtitulo T={T} idx={10} at={K.F + 0.1} until={K.C - 0.1} texto="Hacia 2040 el mundo, *2066 la Antártida.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Si le hacemos caso a la ciencia, *se arregla.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.CFC + 1.4, CUES.Molina - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Molina + 0.6, CUES.Suben + 1.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Cloro + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 2.6, CUES.Montreal - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Noventa + 0.4, CUES.Fechas - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Fechas + 2.8, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 0.2, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="05" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OzonoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><OzonoShot /></CompositionStage></div>;
}
window.OzonoApp = OzonoApp;
