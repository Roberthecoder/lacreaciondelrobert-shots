// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Ambiental #09 · Seis de cada diez litros de Guadalajara salen de un lago de 8 m (Chapala) — NARRADO (N2 el número + N4 la imagen que se llena).
// Datos: Comisión Estatal del Agua de Jalisco (CEA), página "Lago de Chapala" y nivel diario del 27 oct 2026. Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (la silueta del lago es aproximada).

// Silueta esquemática del lago (79 × 28 km) en una caja de ancho w. ciénega 0..1 = el lóbulo del oriente que se secó (1902-1910).
const CH_PATH = 'M 0 150 Q 20 80 120 70 Q 230 40 330 70 Q 420 30 520 50 Q 640 30 760 60 Q 860 70 900 130 Q 880 210 780 230 Q 700 300 600 290 Q 520 320 430 290 Q 330 310 240 270 Q 130 270 60 230 Q 0 210 0 150 Z';
function Lago({ x, y, w = 900, nivel = 1, cienega = 0, T = 0, reparto = 0, color = '#2f8fd8' }) {
  const s = w / 900;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cienega > 0 && <path d="M 880 100 Q 980 60 1060 110 Q 1100 190 1020 240 Q 940 260 880 200 Z" fill={mixHex('#2f8fd8', '#7cc46a', kclamp(cienega * 2 - 1, 0, 1))} stroke={KC.ink} strokeWidth={6 / s} opacity={kclamp(cienega * 3, 0, 1)} />}
    {cienega > 0.5 && Array.from({ length: 6 }, (_, i) => <line key={i} x1={900 + i * 28} y1={120} x2={900 + i * 28} y2={230} stroke="#4f9a44" strokeWidth={4 / s} opacity={kclamp(cienega * 2 - 1, 0, 1)} />)}
    {cienega > 0 && <line x1={885} y1={95} x2={880} y2={220} stroke={KC.ink} strokeWidth={10 / s} strokeLinecap="round" opacity={kclamp(cienega * 2 - 0.6, 0, 1)} />}
    <path d={CH_PATH} fill="url(#ch-lecho)" stroke={KC.ink} strokeWidth={8 / s} />   {/* modo cine: lecho seco en arena oscura (antes #d9c79a, una mancha clara a media pantalla) */}
    <g transform={`translate(450 175) scale(${0.35 + 0.65 * nivel}) translate(-450 -175)`}>
      <path d={CH_PATH} fill={color === '#2f8fd8' ? 'url(#ch-agua)' : color} opacity={0.95} />
      {/* belleza: lo más hondo, un poco más oscuro al centro, y la orilla clara (el lago es bajito: la orilla brilla) */}
      <g transform="translate(450 175) scale(0.62 0.5) translate(-450 -175)"><path d={CH_PATH} fill="#1a5a96" opacity={0.45} /></g>
      <path d={CH_PATH} fill="none" stroke="#a9dcff" strokeWidth={7 / s} opacity={0.7} />
      {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M ${150 + i * 140} ${150 + (i % 2) * 40} q 20 ${-8 + Math.sin(T * 2 + i) * 4} 40 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}
    </g>
    {reparto > 0 && <g opacity={reparto}><path d="M 560 300 Q 640 230 780 230 Q 700 300 600 290 Z" fill={KC.orange} opacity={0.8} />
      <path d="M 540 315 Q 640 220 800 222" stroke={KC.ink} strokeWidth={6 / s} strokeDasharray="14 10" fill="none" /></g>}
  </g>;
}
// Botella de un litro que se llena. lleno 0..1, color del agua.
function Litro({ x, y, lleno = 0, color = '#2f8fd8', s = 1 }) {
  const h = 200 * lleno;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={6} rx={46} ry={9} fill="#000" opacity={0.35} />
    <rect x={-40} y={-200} width={80} height={200} rx={16} fill="url(#ch-vidrio)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-34} y={-6 - h + 6} width={68} height={Math.max(0, h - 6)} rx={10} fill={color === '#2f8fd8' ? 'url(#ch-agua-v)' : 'url(#ch-gris-v)'} />
    {h > 14 && <line x1={-30} y1={-h + 4} x2={30} y2={-h + 4} stroke="#ffffff" strokeWidth={3} opacity={0.55} />}
    <rect x={-28} y={-186} width={9} height={160} rx={4} fill="#ffffff" opacity={0.28} />
    <rect x={-20} y={-232} width={40} height={34} rx={6} fill="url(#ch-tapa)" stroke={KC.ink} strokeWidth={5} />
    {[-218, -208].map((yy) => <line key={yy} x1={-16} y1={yy} x2={16} y2={yy} stroke="#7d8aa0" strokeWidth={2} />)}
  </g>;
}
// Indicador de nivel del lago (columna vertical con porcentaje).
function Nivel({ T, x, y, valor, etiqueta, color = '#2f8fd8', alto = 520, numero = true }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-70} y={-alto} width={140} height={alto} rx={20} fill="rgba(255,255,255,.14)" stroke={KC.ink} strokeWidth={7} />
    <rect x={-60} y={-alto * valor + 10 - 10} width={120} height={Math.max(0, alto * valor - 10)} rx={14} fill={color === '#2f8fd8' ? 'url(#ch-agua-v)' : color} />
    <rect x={-52} y={-alto + 14} width={12} height={alto - 28} rx={6} fill="#ffffff" opacity={0.16} />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={-70} y1={-alto * q} x2={-40} y2={-alto * q} stroke={KC.ink} strokeWidth={4} />)}
    {numero && <text x={0} y={-alto - 24} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>{kformato(valor * 100, 0)} %</text>}
    {etiqueta && <text x={0} y={60} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}

function ChapalaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, L: CUES.Lago, Pl: CUES.Plano, P: CUES.Pregunta, Es: CUES.Estiaje, M: CUES.Minimo, Ci: CUES.Cienega, H: CUES.Hoy, R: CUES.Reparto, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // belleza: degradados del mismo tono (claro arriba-izquierda, oscuro abajo-derecha) para el agua, el vidrio y el lecho
  const defs = <defs>
    <linearGradient id="ch-agua" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6cbcf2" /><stop offset="0.55" stopColor="#2f8fd8" /><stop offset="1" stopColor="#1d64a8" /></linearGradient>
    <linearGradient id="ch-agua-v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5aaee8" /><stop offset="0.5" stopColor="#2f8fd8" /><stop offset="1" stopColor="#1f68ad" /></linearGradient>
    <linearGradient id="ch-gris-v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#cfd8e1" /><stop offset="0.5" stopColor="#b8c4cf" /><stop offset="1" stopColor="#8f9cab" /></linearGradient>
    <linearGradient id="ch-vidrio" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffffff" stopOpacity="0.62" /><stop offset="0.45" stopColor="#dfe8f2" stopOpacity="0.45" /><stop offset="1" stopColor="#9fb0c4" stopOpacity="0.55" /></linearGradient>
    <linearGradient id="ch-tapa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f7fb" /><stop offset="1" stopColor="#b9c4d3" /></linearGradient>
    <radialGradient id="ch-lecho" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stopColor="#8a7a55" /><stop offset="1" stopColor="#5a4f37" /></radialGradient>
  </defs>;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{defs}{c}</svg>;
  // belleza: el lago viaja de su lugar en la escena anterior a su lugar en esta (una sola escena que se transforma, sin dos
  // lagos encimados en la disolvencia). de/a = [x, y, w].
  const viaja = (t0, de, a) => { const u = kprog(T, t0 + 0.8, t0 + 2.0, kEase.suave); /* espera a que la escena anterior se disuelva */ return de.map((v, i) => klerp(v, a[i], u)); };
  const km10 = (w) => Math.round(w / 79 * 10);
  const litros = (t0) => Array.from({ length: 10 }, (_, i) => { const lleno = kprog(T, t0 + 0.1 + i * 0.12, t0 + 0.6 + i * 0.12, kEase.sale);
    // modo cine (pase a mano): las diez botellas van en dos filas de cinco, casi tres veces más grandes (antes una fila con s 0.6)
    return <Litro key={i} x={140 + (i % 5) * 200} y={i < 5 ? 900 : 1380} lleno={lleno} color={i < 6 ? '#2f8fd8' : '#b8c4cf'} s={1.75} />; });
  // el lago, atenuado detrás de las botellas: antes del segundo 3 ya se ve hacia dónde va la historia
  const lagoFondo = (t0) => <g opacity={0.3 * kprog(T, t0, t0 + 0.8)}><Lago x={-90} y={720} w={1260} T={T} /></g>;
  // nivel que sube y baja (lluvias y secas) en "Estiaje"
  const osc = 0.55 + 0.25 * Math.sin((T - K.Es) * 2.2);
  const nivM = klerp(0.7, 954 / 7897, kprog(T, K.M + 0.3, K.M + 2.0, kEase.suave));
  const nivH = klerp(954 / 7897, 0.7018, kprog(T, K.H + 0.3, K.H + 2.0, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 10 litros, 6 de Chapala */}
      <Escena T={T} a={K.G} b={K.L}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{lagoFondo(K.G + 2.0)}{litros(K.G)}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · el lago visto desde arriba: 79 × 28 km */}
      <Escena T={T} a={K.L} b={K.Pl}>
        <FondoLunares color={KC.mint} />
        {/* modo cine (pase a mano): el lago a todo lo ancho y al centro del cuadro (antes arriba, en y 620) */}
        {svg(<><Lago x={36} y={790} w={960} T={T} />
          <line x1={36} y1={715} x2={996} y2={715} stroke={KC.ink} strokeWidth={6} /><text x={516} y={690} textAnchor="middle" style={{ font:`700 54px ${KF.mono}` }} fill={KC.ink}>79 km</text>
          <line x1={1030} y1={790 + 32} x2={1030} y2={790 + 341} stroke={KC.ink} strokeWidth={6} /><text x={1020} y={790 + 395} textAnchor="end" style={{ font:`700 46px ${KF.mono}` }} fill={KC.ink}>28 km</text></>)}
        <EscalaFija texto="10 km" largo={Math.round(960 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · si lo dibujaras de un metro: una décima de milímetro de hondo */}
      <Escena T={T} a={K.Pl} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {/* modo cine (pase a mano): esta escena era lámina (una línea de 2 px sobre fondo vacío). Ahora el lago sigue en pantalla,
            atenuado, visto desde arriba, y debajo va su corte de lado: la línea de "1 m de largo" */}
        {/* belleza: el lago se queda exactamente donde estaba en la escena anterior (antes saltaba arriba y se veían dos lagos
            encimados) y se atenúa; su corte de lado, la línea de "1 m de largo", va debajo con el mismo ancho */}
        {svg(<><g opacity={1 - 0.5 * kprog(T, K.Pl, K.Pl + 1.0)}><Lago x={36} y={790} w={960} T={T} /></g>
          <line x1={36} y1={1300} x2={36 + 960 * kprog(T, K.Pl + 0.1, K.Pl + 1.0, kEase.sale)} y2={1300} stroke="#2f8fd8" strokeWidth={2} />
          <line x1={36} y1={1275} x2={36} y2={1325} stroke={KC.ink} strokeWidth={5} /><line x1={996} y1={1275} x2={996} y2={1325} stroke={KC.ink} strokeWidth={5} />
          <text x={516} y={1250} textAnchor="middle" style={{ font:`700 48px ${KF.mono}` }} fill={KC.ink}>1 m de largo</text></>)}
        <EscalaFija texto="10 cm" largo={96} y={1480} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.Pl + 1.4} until={K.P - 0.2} x={540} y={540} r={180} fx={516} fy={1300} zoom={8} tinte={KC.cyan} etiqueta="AUMENTADO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d1626" /><rect x={0} y={r - 5} width={r * 2} height={10} fill="#2f8fd8" />
          <text x={r} y={r - 34} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>0.1 mm</text></svg>} />
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {/* modo cine (pase a mano): pregunta y botella al centro y la botella grande (antes s 0.6 a la izquierda) */}
        {/* belleza: la botella grande delante del lago (que sigue detrás bajo el velo); el "?" chico encima, sin tapar nada */}
        {svg(<><text x={540} y={600} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 540 540)`}>?</text>
          <Litro x={540} y={1170} lleno={0.6} s={2.1} /></>)}
      </Escena>
      {/* 5 · sube con las lluvias y baja en secas */}
      <Escena T={T} a={K.Es} b={K.M}>
        <FondoLunares color={KC.yellow} />
        {/* modo cine (pase a mano): medidor, nube y sol 1.35 veces más grandes y al centro; cara del sol en tinta oscura */}
        {svg(<g transform="translate(540 960) scale(1.35) translate(-520 -860)"><Nivel T={T} x={300} y={1150} valor={osc} etiqueta="nivel del lago" numero={false} />
          <g transform="translate(720 600)" opacity={osc > 0.55 ? 1 : 0.25}><ellipse rx={150} ry={60} fill="#cfd8e3" stroke={KC.ink} strokeWidth={6} />{Array.from({ length: 5 }, (_, i) => { const u = ((T * 1.4 + i / 5) % 1); return <line key={i} x1={-80 + i * 40} y1={60 + u * 160} x2={-90 + i * 40} y2={90 + u * 160} stroke="#2f8fd8" strokeWidth={6} />; })}</g>
          <g opacity={osc <= 0.55 ? 1 : 0.25}><Sol T={T} x={760} y={980} r={80} />
            <g transform="translate(760 980)"><circle cx={-25} cy={-10} r={8} fill="#0b1020" /><circle cx={25} cy={-10} r={8} fill="#0b1020" /><path d="M -25 25 Q 0 45 25 25" stroke="#0b1020" strokeWidth={6} fill="none" strokeLinecap="round" /></g></g></g>)}
      </Escena>
      {/* 6 · el mínimo de 1955 */}
      <Escena T={T} a={K.M} b={K.Ci}>
        <FondoLunares color={KC.orange} />
        {/* modo cine (pase a mano): el lago a todo lo ancho (antes 600 px) y el medidor debajo, al centro */}
        {svg(<><Lago x={60} y={680} w={960} nivel={kclamp(nivM / 0.7, 0.12, 1)} T={T} /><Nivel T={T} x={540} y={1480} valor={nivM} etiqueta="jun 1955" alto={380} /></>)}
        <EscalaFija texto="10 km" largo={Math.round(960 / 79 * 10)} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · la Ciénega: 50 mil hectáreas convertidas en cultivo */}
      <Escena T={T} a={K.Ci} b={K.H}>
        <FondoLunares color={KC.mint} />
        {/* modo cine (pase a mano): lago y Ciénega a todo lo ancho y al centro (antes 780 px, arriba). El lóbulo empieza como parte
            del lago, se le pone el bordo y se vuelve verde de cultivo, como dice el guion, y se queda hasta el final (antes se
            desvanecía a los 4 s y la etiqueta apuntaba a un hueco) */}
        {(() => { const [x, y, w] = viaja(K.Ci, [60, 680, 960], [16, 800, 850]); return <>
          {svg(<Lago x={x} y={y} w={w} cienega={0.5 + 0.5 * kprog(T, K.Ci + 1.5, K.Ci + 4.0)} T={T} />)}
          <EscalaFija texto="10 km" largo={km10(w)} y={1480} color={KC.ink} /></>; })()}
      </Escena>
      {/* 8 · hoy: 70 % (27 oct 2026) */}
      <Escena T={T} a={K.H} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {/* modo cine (pase a mano): mismo encuadre grande que en 1955 */}
        {(() => { const [x, y, w] = viaja(K.H, [16, 800, 850], [60, 680, 960]); return <>
          {svg(<><Lago x={x} y={y} w={w} nivel={kclamp(nivH / 0.7, 0.12, 1)} T={T} /><g opacity={kprog(T, K.H + 0.3, K.H + 1.1)}><Nivel T={T} x={540} y={1480} valor={nivH} etiqueta="27 oct 2026" alto={380} /></g></>)}
          <EscalaFija texto="10 km" largo={km10(w)} y={1480} color={KC.ink} /></>; })()}
      </Escena>
      {/* 9 · Jalisco 86 %, Michoacán 14 % */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {/* modo cine (pase a mano): el lago a todo lo ancho y al centro */}
        {(() => { const [x, y, w] = viaja(K.R, [60, 680, 960], [50, 780, 980]); return <>
          {svg(<Lago x={x} y={y} w={w} T={T} reparto={kprog(T, K.R + 1.2, K.R + 2.0)} />)}
          <EscalaFija texto="10 km" largo={km10(w)} y={1480} color={KC.ink} /></>; })()}
      </Escena>
      {/* 10 · cierre: regreso a los 10 litros */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{lagoFondo(K.C - 0.4)}{litros(K.C - 0.6)}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.L - 0.2} valor={6} dur={1.2} sufijo=" de 10" etiqueta="litros en Guadalajara:" x={540} y={330} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.G + 3.2} until={K.L - 0.2} texto="lleno: 8 m en lo más hondo" y={1455} x={640} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.L + 0.3} until={K.Pl - 0.2} texto="Lago de Chapala · el más grande de México" y={1300} x={540} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Pl + 0.4} until={K.P - 0.2} texto="1 m de largo → 0.1 mm de hondo" y={265} x={540} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Es + 0.3} until={K.M - 0.2} texto="lluvias: sube · secas: baja" y={400} x={540} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.M + 2.0} until={K.Ci - 0.2} texto="954 millones de m³ (12 %)" y={410} x={540} tam={38} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.6} until={K.H - 0.2} texto="1902–1910: 50 mil ha a cultivo" y={650} x={540} tam={38} borde={KC.leaf} />
      <Etq T={T} at={K.Ci + 2.0} until={K.H - 0.2} x={1040} y={1090} texto="Ciénega de Chapala" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.H + 2.2} until={K.R - 0.2} texto="CEA Jalisco: 70.18 % de su capacidad" y={410} x={540} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.R + 1.6} until={K.C - 0.2} x={150} y={1220} texto="Jalisco 86 %" tam={40} color={KC.ink} />
      <Etq T={T} at={K.R + 2.0} until={K.C - 0.2} x={620} y={1220} texto="Michoacán 14 %" tam={40} color={KC.ink} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou - 0.1} texto="enorme, pero muy bajito" y={370} x={540} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.L - 0.1} texto="6 de cada 10 litros: *un lago de 8 metros.*" />
      <Subtitulo T={T} idx={1} at={K.L + 0.1} until={K.Pl - 0.1} texto="Chapala: *79 km de largo.*" />
      <Subtitulo T={T} idx={2} at={K.Pl + 0.1} until={K.P - 0.1} texto="De 1 metro de largo: *0.1 mm de hondo.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Aguanta *a una ciudad?*" />
      <Subtitulo T={T} idx={4} at={K.Es + 0.1} until={K.M - 0.1} texto="Sube con lluvias, *baja en secas.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.Ci - 0.1} texto="Junio de 1955: *menos de 1/8.*" />
      <Subtitulo T={T} idx={6} at={K.Ci + 0.1} until={K.H - 0.1} texto="50 mil hectáreas: *casi un tercio.*" />
      <Subtitulo T={T} idx={7} at={K.H + 0.1} until={K.R - 0.1} texto="27 de octubre de 2026: *70 %.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.C - 0.1} texto="Jalisco y *Michoacán (14 %).*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un lago enorme, *pero muy bajito.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Lago + 2.6, CUES.Plano + 0.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estiaje + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Minimo + 2.6, CUES.Cienega - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cienega + 4.4, CUES.Hoy - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Hoy + 3.6, CUES.Reparto - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Reparto + 2.2, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ChapalaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ChapalaShot /></CompositionStage></div>;
}
window.ChapalaApp = ChapalaApp;
