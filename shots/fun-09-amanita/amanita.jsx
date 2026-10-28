// Shot Fungi Mati #09 · Los trucos no sirven: Amanita phalloides — NARRADO (gancho 6 "¿Por qué NO…?" + N2 "qué sí sirve").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

// Amanita phalloides de perfil: sombrero liso verde amarillento, láminas blancas, anillo arriba del pie y volva (copa) en la base.
function Amanita({ x, y, s = 1, crece = 1, rot = 0 }) {
  if (crece <= 0) return null;
  const h = 300 * kEase.sale(kclamp(crece * 1.3, 0, 1)), a = 240 * (0.5 + 0.5 * kEase.sale(kclamp(crece * 1.6 - 0.4, 0, 1)));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -50 0 Q -62 -60 -26 -70 L 26 -70 Q 62 -60 50 0 Z" fill="#fbf8ef" stroke={KC.ink} strokeWidth={6} />
    <path d="M -40 -40 Q 0 -20 40 -40" stroke="#c9c2b0" strokeWidth={4} fill="none" />
    <path d={`M -18 -60 L -14 ${-h} L 14 ${-h} L 18 -60 Z`} fill="#fbf8ef" stroke={KC.ink} strokeWidth={6} />
    {h > 120 && <path d={`M -16 ${-h * 0.82} Q -46 ${-h * 0.7} -38 ${-h * 0.62} Q 0 ${-h * 0.68} 38 ${-h * 0.62} Q 46 ${-h * 0.7} 16 ${-h * 0.82} Z`} fill="#fbf8ef" stroke={KC.ink} strokeWidth={5} />}
    <path d={`M ${-a / 2 + 8} ${-h + 4} Q 0 ${-h + a * 0.12} ${a / 2 - 8} ${-h + 4}`} stroke="#ffffff" strokeWidth={14} fill="none" />
    <path d={`M ${-a / 2} ${-h} Q ${-a / 2} ${-h - a * 0.5} 0 ${-h - a * 0.52} Q ${a / 2} ${-h - a * 0.5} ${a / 2} ${-h} Q 0 ${-h + a * 0.1} ${-a / 2} ${-h} Z`} fill="#b9c46a" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${-a * 0.3} ${-h - a * 0.36} Q 0 ${-h - a * 0.5} ${a * 0.25} ${-h - a * 0.4}`} stroke="#dfe7a0" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Olla con caldo y una cuchara de plata.
function Olla({ T, x, y, s = 1, fuego = 1, cuchara = 0, hongos = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fuego > 0 && [-120, -40, 40, 120].map((dx, i) => <path key={i} d={`M ${dx - 30} 150 Q ${dx} ${80 - 30 * Math.abs(Math.sin(T * 7 + i))} ${dx + 30} 150 Z`} fill={i % 2 ? KC.orange : KC.yellow} stroke={KC.ink} strokeWidth={4} opacity={fuego} />)}
    <path d="M -260 -60 L 260 -60 L 230 140 Q 0 170 -230 140 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={9} />
    <rect x={-290} y={-80} width={580} height={36} rx={14} fill="#b8c0c8" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-60} rx={250} ry={34} fill="#d9b77a" stroke={KC.ink} strokeWidth={6} />
    {hongos > 0 && [[-120, -66], [-20, -58], [90, -64]].map(([dx, dy], i) => <g key={i} transform={`translate(${dx} ${dy + Math.sin(T * 3 + i) * 4})`}><ellipse rx={46} ry={18} fill="#b9c46a" stroke={KC.ink} strokeWidth={5} /></g>)}
    {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.6 + i / 6) % 1); return <circle key={i} cx={-200 + i * 80} cy={-100 - u * 160} r={18 + u * 20} fill="#fff" opacity={(1 - u) * 0.6} />; })}
    <g transform={`translate(160 ${-60 - cuchara * 260}) rotate(${-25 + cuchara * 10})`}>
      <rect x={-12} y={-260} width={24} height={260} rx={10} fill="#e6e9ee" stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={0} cy={20} rx={44} ry={62} fill="#f3f5f8" stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={-12} cy={6} rx={12} ry={24} fill="#fff" />
    </g>
  </g>;
}
// Molécula de amatoxina (esquemática): anillo doble.
function Amatoxina({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <circle r={26} fill="none" stroke={KC.red} strokeWidth={9} /><circle r={26} fill="none" stroke={KC.ink} strokeWidth={3} />
    <line x1={-26} y1={0} x2={26} y2={0} stroke={KC.red} strokeWidth={7} />
  </g>;
}
// Persona (ícono).
function Persona({ x, y, s = 1, color = '#8fb6ff', mal = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-62} r={26} fill={mixHex('#f2c29b', '#a8c98a', mal)} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 20 Q -40 -26 0 -28 Q 40 -26 38 20 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function AmanitaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Amanita, M: CUES.Mitos, Co: CUES.Cocinar, Cg: CUES.Congelar, P: CUES.Pregunta, H: CUES.Higado, E: CUES.Estudio, R: CUES.Retraso, Tr: CUES.Trampa, Ts: CUES.Trasplante, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const sube = kprog(T, K.G + 0.3, K.G + 1.2, kEase.sale);
  const MITOS = ['cuchara de plata', 'ajo o cebolla', 'lo mordió un animal', 'sabe feo'];
  const bloqueo = kprog(T, K.H + 2.2, K.H + 2.8);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cuchara de plata sale del caldo */}
      <Escena T={T} a={K.G} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<><Olla T={T} x={460} y={980} s={1.1} cuchara={sube} /><Sello T={T} at={K.G + 3.0} x={330} y={560} texto="MITO" color={KC.red} r={110} /></>)}
      </Escena>
      {/* 2 · Amanita phalloides */}
      <Escena T={T} a={K.A} b={K.M} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1080} width={KW} height={900} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          {[[150, 1090, -20], [860, 1080, 30], [700, 1100, -50]].map(([x, y, r], i) => <path key={i} d="M -50 0 Q 0 -30 50 0 Q 0 20 -50 0 Z" transform={`translate(${x} ${y}) rotate(${r})`} fill="#c0702a" stroke={KC.ink} strokeWidth={4} />)}
          <Amanita x={420} y={1100} s={1.5} crece={kprog(T, K.A, K.A + 1.4)} />
          <Amanita x={720} y={1095} s={0.9} crece={kprog(T, K.A + 0.6, K.A + 1.8)} rot={8} />
        </>)}
      </Escena>
      {/* 3 · los mitos, tachados uno por uno */}
      <Escena T={T} a={K.M} b={K.Co}>
        <FondoLunares color={KC.pink} />
      </Escena>
      {/* 4–5 · cocinar y congelar no lo quitan */}
      <Escena T={T} a={K.Co} b={K.P}>
        <FondoLunares color={T < K.Cg ? KC.orange : KC.cyan} />
        {fsvg(<>
          {T < K.Cg + 0.3 && <g opacity={1 - kprog(T, K.Cg - 0.2, K.Cg + 0.3)}><Olla T={T} x={460} y={1000} s={1.0} cuchara={0} /></g>}
          {T > K.Cg - 0.3 && <g opacity={kprog(T, K.Cg - 0.3, K.Cg + 0.2)}>
            <rect x={200} y={640} width={520} height={460} rx={30} fill="#e8f6ff" stroke={KC.ink} strokeWidth={9} />
            <rect x={230} y={670} width={460} height={400} rx={18} fill="#c5ecff" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 10 }, (_, i) => <path key={i} d="M 0 -14 L 0 14 M -12 -7 L 12 7 M -12 7 L 12 -7" transform={`translate(${260 + (i % 5) * 100} ${700 + Math.floor(i / 5) * 330})`} stroke="#fff" strokeWidth={5} />)}
            {[[340, 900], [470, 880], [580, 910]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={52} ry={22} fill="#b9c46a" stroke={KC.ink} strokeWidth={5} />)}
          </g>}
          {Array.from({ length: 6 }, (_, i) => { const on = kprog(T, K.Co + 1.6 + i * 0.15, K.Co + 1.9 + i * 0.15, kEase.rebote); return on > 0 ? <Amatoxina key={i} x={300 + (i % 3) * 150} y={(T < K.Cg ? 880 : 960) + Math.floor(i / 3) * 70 + Math.sin(T * 2 + i) * 8} s={on} rot={T * 30 + i * 40} /> : null; })}
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 7 · en el hígado: frena la ARN polimerasa II */}
      <Escena T={T} a={K.H} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <circle cx={540} cy={880} r={330} fill={mixHex('#c25b4a', '#5f6672', kprog(T, K.H + 3.4, K.E - 0.3))} stroke={KC.ink} strokeWidth={8} opacity=".9" />
          <circle cx={540} cy={880} r={150} fill={mixHex('#7c3a9a', '#4b4f59', kprog(T, K.H + 3.4, K.E - 0.3))} stroke={KC.ink} strokeWidth={6} />
          <path d={`M 300 880 Q 400 ${860 + Math.sin(T * 4) * 10} 480 880`} stroke="#9ad7ff" strokeWidth={10} fill="none" />
          <g transform="translate(500 880)"><rect x={-50} y={-46} width={100} height={92} rx={28} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            <circle cx={-16} cy={-10} r={8} fill={KC.ink} /><circle cx={16} cy={-10} r={8} fill={KC.ink} /></g>
          {(() => { const L = 260 * kprog(T, K.H + 0.6, K.H + 2.2) * (1 - 0) ; return <path d={`M 550 880 q 40 ${-20 + Math.sin(T * 5) * 6} 80 0 t 80 0 t 80 0`} stroke="#ffe37a" strokeWidth={9} fill="none" strokeDasharray={`${L * (1 - bloqueo * 0.6)} 999`} />; })()}
          {bloqueo > 0 && <Amatoxina x={klerp(900, 520, bloqueo)} y={klerp(560, 830, bloqueo)} s={1.6} rot={T * 20} />}
          {bloqueo > 0.9 && <path d="M 610 810 L 690 890 M 690 810 L 610 890" stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={kprog(T, K.H + 2.8, K.H + 3.1)} />}
        </>)}
      </Escena>
      {/* 8–11 · el caso de California: 14 personas, síntomas tardíos, falsa mejoría, 3 trasplantes */}
      <Escena T={T} a={K.E} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.Tr && Array.from({ length: 14 }, (_, i) => { const on = kprog(T, K.E + 1.2 + i * 0.1, K.E + 1.5 + i * 0.1, kEase.rebote); return on > 0 ? <Persona key={i} x={150 + (i % 7) * 130} y={900 + Math.floor(i / 7) * 190} s={on} mal={kprog(T, K.R + 0.8, K.R + 2.2)} /> : null; })}
          {T >= K.Tr - 0.2 && T < K.Ts + 0.2 && <g opacity={kprog(T, K.Tr - 0.2, K.Tr + 0.3) * (1 - kprog(T, K.Ts - 0.2, K.Ts + 0.2))}>
            <line x1={120} y1={1120} x2={960} y2={1120} stroke={KC.ink} strokeWidth={6} /><line x1={120} y1={1120} x2={120} y2={640} stroke={KC.ink} strokeWidth={6} />
            {(() => { const pts = [[120, 700], [300, 1000], [420, 980], [560, 760], [700, 760], [960, 1100]]; const u = kprog(T, K.Tr, K.Tr + 2.6); const n = Math.max(2, Math.ceil(u * pts.length)); return <path d={'M ' + pts.slice(0, n).map((p) => p.join(' ')).join(' L ')} stroke={KC.red} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />; })()}
            <text x={300} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>horas</text>
            <text x={630} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>1–2 días</text>
            <text x={900} y={1170} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>3–5 días</text>
          </g>}
          {T >= K.Ts - 0.2 && Array.from({ length: 14 }, (_, i) => { const t3 = i < 3; return <g key={i} opacity={kprog(T, K.Ts - 0.2, K.Ts + 0.3)}><Persona x={150 + (i % 7) * 130} y={900 + Math.floor(i / 7) * 190} color={t3 ? KC.red : '#8fb6ff'} />
            {t3 && kprog(T, K.Ts + 0.8 + i * 0.3, K.Ts + 1.1 + i * 0.3) > 0 && <path d="M -30 -10 Q -40 -40 -5 -38 Q 30 -45 34 -10 Q 30 20 0 18 Q -28 16 -30 -10 Z" transform={`translate(${150 + i * 130} ${770}) scale(${kprog(T, K.Ts + 0.8 + i * 0.3, K.Ts + 1.1 + i * 0.3, kEase.rebote)})`} fill="#a0442e" stroke={KC.ink} strokeWidth={4} />}</g>; })}
        </>)}
      </Escena>
      {/* 12 · lo que sí sirve */}
      <Escena T={T} a={K.S} b={K.C}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1080} width={KW} height={900} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          <Amanita x={430} y={1100} s={1.4} />
          <g transform={`translate(${klerp(900, 520, kprog(T, K.S + 0.3, K.S + 1.2, kEase.sale))} 760)`}>
            <circle r={120} fill="rgba(200,240,255,.35)" stroke={KC.ink} strokeWidth={14} />
            <line x1={85} y1={85} x2={180} y2={180} stroke={KC.ink} strokeWidth={26} strokeLinecap="round" />
          </g>
        </>)}
      </Escena>
      {/* 13 · cierre: la misma olla y la misma cuchara; lo que salva es saber qué hongo es */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Olla T={T} x={460} y={980} s={1.1} cuchara={0.55} fuego={1 - kprog(T, K.C + 0.5, K.C + 1.5)} />
          <path d="M 520 380 L 780 640 M 780 380 L 520 640" stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={kprog(T, K.C + 0.8, K.C + 1.1)} transform="translate(-60 150)" />
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 1.4} until={K.G + 3.0} texto="¿se pone negra = veneno?" x={420} y={470} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.A + 1.2} until={K.M - 0.3} x={60} y={520} texto="Amanita phalloides" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.A + 1.8} until={K.M - 0.3} x={60} y={580} texto="“sombrero de la muerte”" tam={32} color={KC.ink} />
      <Etq T={T} at={K.A + 2.4} until={K.M - 0.3} x={640} y={900} texto="anillo" tam={28} color={KC.ink} />
      <Etq T={T} at={K.A + 2.8} until={K.M - 0.3} x={520} y={1150} texto="copa (volva)" tam={28} />
      {MITOS.map((t, i) => <MitoTachado key={i} T={T} at={K.M + 0.2 + i * 0.6} tacharEn={K.M + 2.6 + i * 0.4} until={K.Co - 0.3} texto={t} x={480} y={600 + i * 150} tam={50} />)}
      <Chip T={T} at={K.Co + 0.4} until={K.Cg - 0.3} texto="100 °C: el veneno sigue" x={400} y={480} tam={40} borde={KC.red} />
      <Etq T={T} at={K.Co + 2.0} until={K.Cg - 0.3} x={60} y={1150} texto="amatoxinas" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Cg + 0.4} until={K.P - 0.3} texto="7–8 meses congelados" x={400} y={480} tam={40} borde={KC.cyan} />
      <Etq T={T} at={K.H + 0.6} until={K.E - 0.3} x={60} y={480} texto="célula del hígado" tam={32} />
      <Etq T={T} at={K.H + 1.2} until={K.E - 0.3} x={60} y={1260 - 40} texto="ARN polimerasa II (la “máquina”)" tam={28} color={KC.yellow} />
      <Etq T={T} at={K.H + 2.4} until={K.E - 0.3} x={1040} y={560} texto="α-amanitina" lado="izq" tam={30} color={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.R - 0.3} anio="2016" quien="norte de California · 14 casos" revista="MMWR (CDC), 2017" y={560} />
      <Cronometro T={T} at={K.R + 0.2} until={K.Tr - 0.3} factor={3 * 3600} etiqueta="DESPUÉS DE COMER" x={400} y={500} />
      <Chip T={T} at={K.R + 1.6} until={K.Tr - 0.3} texto="vómito y diarrea" x={400} y={640} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Tr + 1.2} until={K.Ts - 0.3} texto="¿mejora? es una trampa" x={420} y={520} tam={38} borde={KC.red} />
      <NumeroGigante T={T} at={K.Ts + 0.3} until={K.S - 0.3} valor={3} dur={0.6} sufijo=" de 14" etiqueta="trasplante de hígado" x={420} y={520} tam={150} color={KC.red} />
      <Chip T={T} at={K.S + 1.2} until={K.C - 0.3} texto="✓ que lo identifique un experto" x={420} y={480} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.S + 2.4} until={K.C - 0.3} texto="¿mal? al médico y lleva el hongo" x={400} y={580} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="te salva saber qué hongo es" x={420} y={470} tam={38} borde={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.A} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.A} until={K.M} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Co} until={K.P} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.H} until={K.E} texto="10 µm" largo={150} />
      <BarraEscala T={T} at={K.S} until={K.C} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="¿La cuchara de plata? *Es un mito.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.M - 0.1} texto="Amanita phalloides *no avisa.*" />
      <Subtitulo T={T} idx={2} at={K.M + 0.1} until={K.Co - 0.1} texto="Plata, ajo, animales, sabor: *mitos.*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.Cg - 0.1} texto="Cocinarlo *no lo destruye.*" />
      <Subtitulo T={T} idx={4} at={K.Cg + 0.1} until={K.P - 0.1} texto="Ni congelado *7 u 8 meses.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Qué le hace *a tu cuerpo?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={K.E - 0.1} texto="Frena la fábrica *de proteínas.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.R - 0.1} texto="2016, California: *14 intoxicados.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Tr - 0.1} texto="Los síntomas *tardan horas.*" />
      <Subtitulo T={T} idx={9} at={K.Tr + 0.1} until={K.Ts - 0.1} texto="Parece que mejoras… *y falla el hígado.*" />
      <Subtitulo T={T} idx={10} at={K.Ts + 0.1} until={K.S - 0.1} texto="3 de 14: *trasplante de hígado.*" />
      <Subtitulo T={T} idx={11} at={K.S + 0.1} until={K.C - 0.1} texto="Que lo identifique *un experto.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Te salva *saber qué hongo es.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.A + 0.6, K.M - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Co + 0.6, K.Cg + 2.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.P + 0.05, K.H + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.6, K.R + 3.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Tr + 0.3, K.Ts - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ts + 0.4, K.S - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.S + 0.4, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AmanitaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AmanitaShot /></CompositionStage></div>;
}
window.AmanitaApp = AmanitaApp;
