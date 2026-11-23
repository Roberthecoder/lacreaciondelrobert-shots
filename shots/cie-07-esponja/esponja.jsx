// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Científico #07 · La esponja de tu cocina por dentro — NARRADO (N1 "Por dentro" + N2 el número).
// Datos: Cardinale, Kaiser, Lueders, Schnell y Egert 2017, Scientific Reports 7: 5791 (PMC5517580). Ver guion.md y verificacion.md.
const AMA = '#ffd23f', AMA2 = '#e0aa1a', VERDE = '#2f9e5b';

// Esponja de cocina de frente. squeeze 0..1 (apretada), ventanas 0..1 (los poros se vuelven ventanas con bacterias).
function Esponja({ x, y, s = 1, squeeze = 0, ventanas = 0, T = 0, olor = 0 }) {
  const g = krng(11), poros = Array.from({ length: 34 }, () => ({ x: -190 + g() * 380, y: -60 + g() * 170, r: 8 + g() * 16 }));
  const sy = 1 - 0.25 * squeeze, sx = 1 + 0.08 * squeeze;
  return <g transform={`translate(${x} ${y}) scale(${s * sx} ${s * sy})`}>
    <defs>
      <linearGradient id="esp-am" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#ffe68a" /><stop offset="0.45" stopColor={AMA} /><stop offset="1" stopColor="#c98f12" /></linearGradient>
      <linearGradient id="esp-ve" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stopColor="#5cc286" /><stop offset="0.5" stopColor={VERDE} /><stop offset="1" stopColor="#1d6a3d" /></linearGradient>
    </defs>
    <ellipse cx={8} cy={150} rx={230} ry={26} fill="rgba(0,0,0,.35)" />
    <rect x={-220} y={-80} width={440} height={210} rx={30} fill="url(#esp-am)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-220} y={-150} width={440} height={80} rx={22} fill="url(#esp-ve)" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 22 }, (_, i) => <path key={'f' + i} d={`M ${-205 + i * 19} -140 l 14 58`} stroke="#164f2d" strokeWidth={3} opacity=".45" />)}
    <path d="M -196 -138 L 190 -138" stroke="#9fe0b8" strokeWidth={6} strokeLinecap="round" opacity=".55" />
    <path d="M -198 -62 Q -200 40 -186 110" stroke="#fff4c0" strokeWidth={8} strokeLinecap="round" fill="none" opacity=".45" />
    {poros.map((p, i) => ventanas > i / poros.length
      ? <g key={i}><rect x={p.x - 13} y={p.y - 13} width={26} height={26} rx={4} fill="#fff3a8" stroke={KC.ink} strokeWidth={4} /><circle cx={p.x + Math.sin(T * 3 + i) * 4} cy={p.y} r={6} fill={KC.mint} stroke={KC.ink} strokeWidth={2} /></g>
      : <ellipse key={i} cx={p.x} cy={p.y} rx={p.r} ry={p.r * 0.7} fill={AMA2} />)}
    {olor > 0 && [-120, 0, 120].map((dx, k) => <path key={k} d={`M ${dx} -170 q 30 -40 0 -80 q -30 -40 0 -80`} stroke={KC.leaf} strokeWidth={10} fill="none" strokeLinecap="round" opacity={olor * (0.5 + 0.5 * Math.sin(T * 4 + k))} transform={`translate(0 ${-((T * 30 + k * 20) % 30)})`} />)}
  </g>;
}
// Corte microscópico: fibras de la esponja con huecos; bacterias en los huecos y en capas (biopelícula) sobre la superficie.
function Microesponja({ T, lleno = 1 }) {
  const g = krng(5), bac = [];
  const huecos = [[300, 760, 150], [720, 700, 170], [520, 1020, 140], [850, 1060, 120], [200, 1080, 110]];
  huecos.forEach(([cx, cy, r], h) => { for (let k = 0; k < 26; k++) { const a = g() * Math.PI * 2, d = r * (0.75 + 0.2 * g());
    bac.push(<ellipse key={h * 40 + k} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} rx={10} ry={6} transform={`rotate(${a * 57} ${cx + Math.cos(a) * d} ${cy + Math.sin(a) * d})`} fill="#b8323a" stroke="#ff9a9a" strokeWidth={2} opacity={kclamp(lleno * 1.2 - k / 30, 0, 1)} />); } });
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <defs><radialGradient id="poro-in" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stopColor="#0d0b05" /><stop offset="0.8" stopColor="#1f1a0b" /><stop offset="1" stopColor="#3b3215" /></radialGradient></defs>
    <rect width={KW} height={KH} fill="#1a1a17" />
    <rect x={0} y={400} width={KW} height={1100} fill="#332d1a" />
    {Array.from({ length: 14 }, (_, i) => <path key={'v' + i} d={`M -20 ${430 + i * 78} C 260 ${400 + i * 78 + Math.sin(i) * 30} 760 ${460 + i * 78} 1100 ${420 + i * 78 + Math.cos(i) * 26}`} stroke="#4a4126" strokeWidth={10} fill="none" opacity=".6" />)}
    <g transform="translate(0 80) translate(540 900) scale(1.3) translate(-540 -900)">
    {huecos.map(([cx, cy, r], i) => <g key={i}><circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#d6bb52" strokeWidth={3} opacity=".35" /><circle cx={cx} cy={cy} r={r} fill="url(#poro-in)" stroke="#b39a35" strokeWidth={8} /></g>)}
    {bac}
    </g>
  </svg>;
}
function Micro({ x, y, s = 1, T, on = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><linearGradient id="micro-cu" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#dfe3ea" /><stop offset="1" stopColor="#8a93a1" /></linearGradient></defs>
    <ellipse cx={0} cy={150} rx={210} ry={20} fill="rgba(0,0,0,.35)" />
    <rect x={-200} y={-130} width={400} height={260} rx={24} fill="url(#micro-cu)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-170} y={-100} width={250} height={200} rx={14} fill={on ? `rgba(255,200,80,${0.5 + 0.3 * Math.sin(T * 12)})` : '#4a4f57'} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2].map((k) => <circle key={k} cx={140} cy={-60 + k * 50} r={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
function Calendario({ x, y, T, at }) {
  const n = Math.floor(kprog(T, at, at + 1.5) * 7);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-260} y={-200} width={520} height={400} rx={24} fill="#22303e" stroke={KC.ink} strokeWidth={9} />
    <rect x={-260} y={-200} width={520} height={90} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    <text x={0} y={-138} textAnchor="middle" style={{ font:`400 56px ${KF.titulo}` }} fill="#fff">CADA SEMANA</text>
    {Array.from({ length: 7 }, (_, i) => <g key={i}><rect x={-230 + i * 66} y={-70} width={56} height={56} rx={10} fill={i < n ? KC.mint : '#3a4858'} stroke={KC.ink} strokeWidth={4} />{i === 6 && n >= 7 && <path d={`M ${-224 + i * 66} -40 l 18 18 l 30 -36`} stroke="#0b1020" strokeWidth={8} fill="none" />}</g>)}
  </g>;
}

function EsponjaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Cu: CUES.Cubito, E: CUES.Estudio, A: CUES.Adn, H: CUES.Huecos, Q: CUES.Pregunta, I: CUES.Igual, M: CUES.Moraxella, O: CUES.Olor, R: CUES.Regresan, Cs: CUES.Consejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const sq = Math.max(0, Math.sin(T * 3.2)) * (T < K.G + 2 ? 1 : 0.3);
  const vent = kprog(T, K.G + 1.2, K.G + 3.6);
  // regresan: baja y vuelve a subir
  const baja = kprog(T, K.R + 0.6, K.R + 1.6, kEase.sale), sube = kprog(T, K.R + 2.4, K.R + 5.0, kEase.suave);
  const carga = 1 - 0.85 * baja + 0.85 * sube;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la esponja se aprieta y sus poros se vuelven ventanas */}
      <Escena T={T} a={K.G} b={K.Cu}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Esponja x={540} y={980} s={1.9} squeeze={sq} ventanas={vent} T={T} /><Goteo T={T} x={540} y0={1240} y1={1480} cada={0.5} color="rgba(80,180,255,.7)" desde={K.G} hasta={K.G + 2.2} r={14} /></>)}
      </Escena>
      {/* 2 · un cubito de 1 cm */}
      <Escena T={T} a={K.Cu} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<g transform={`translate(540 900) scale(${klerp(1.2, 2.4, kprog(T, K.Cu, K.Cu + 1.2, kEase.sale))})`}>
          <path d="M -120 -60 L 0 -120 L 120 -60 L 0 0 Z" fill={AMA} stroke={KC.ink} strokeWidth={7} />
          <path d="M -120 -60 L 0 0 L 0 140 L -120 80 Z" fill={AMA2} stroke={KC.ink} strokeWidth={7} />
          <path d="M 120 -60 L 0 0 L 0 140 L 120 80 Z" fill="#c99412" stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={-100 + (i * 37) % 200} cy={-40 + ((i * 53) % 160)} r={4} fill={KC.red} opacity={kprog(T, K.Cu + 1 + i * 0.05, K.Cu + 1.3 + i * 0.05)} />)}
        </g>)}
        <Escala T={T} z={1} pxPorMm={29} objetivo={240} y={1700} x={60} />
      </Escena>
      {/* 3 · el estudio: 14 esponjas */}
      <Escena T={T} a={K.E} b={K.A}>
        <FondoLunares color={KC.orange} />
        {/* modo cine: las 14 esponjas entran al empezar la escena (no 2.2 s después) y llenan el cuadro */}
        {svg(<>{Array.from({ length: 14 }, (_, i) => { const f = Math.floor(i / 5), c = i % 5, e = kprog(T, K.E + 0.25 + i * 0.1, K.E + 0.55 + i * 0.1);
          return e > 0 ? <g key={i} opacity={e}><Esponja x={140 + c * 200 + (f === 2 ? 100 : 0)} y={880 + f * 210} s={0.43} T={T} /></g> : null; })}</>)}
      </Escena>
      {/* 4 · ADN: 362 grupos */}
      <Escena T={T} a={K.A} b={K.H}>
        <FondoLunares color={KC.lilac} />
        {svg(<g transform="translate(560 1030) scale(1.3)">{Array.from({ length: 16 }, (_, i) => { const y = -300 + i * 40, ph = T * 2 + i * 0.5, x1 = Math.sin(ph) * 160, x2 = -x1;
          return <g key={i}><line x1={x1} y1={y} x2={x2} y2={y} stroke={KC.ink} strokeWidth={6} /><circle cx={x1} cy={y} r={16} fill={KC.pink} stroke={KC.ink} strokeWidth={5} /><circle cx={x2} cy={y} r={16} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} /></g>; })}</g>)}
      </Escena>
      {/* 5 · por dentro: huecos y capas de bacterias */}
      <Escena T={T} a={K.H} b={K.Q} fondo="#2a2412">
        <Microesponja T={T} lleno={kprog(T, K.H + 0.2, K.H + 2.2)} />
        <Escala T={T} z={1} pxPorMm={39000} y={1430} x={60} />
        <Etq T={T} at={K.H + 1.2} until={K.Q - 0.3} x={560} y={445} texto="fibra de la esponja" lado="der" />
        <Etq T={T} at={K.H + 1.8} until={K.Q - 0.3} x={250} y={1420} texto="bacterias en capas" lado="der" color="#ff8a8a" />
      </Escena>
      {/* 6 · pregunta: agua caliente o micro */}
      <Escena T={T} a={K.Q} b={K.I}>
        <FondoLunares color={KC.pink} />
        {svg(<><Micro x={540} y={1060} s={1.5} T={T} on={1} /><text x={540} y={800} textAnchor="middle" style={{ font:`400 220px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10}>?</text></>)}
      </Escena>
      {/* 7 · las limpiadas seguido no tenían menos */}
      <Escena T={T} a={K.I} b={K.M}>
        <FondoLunares color={KC.mint} />
        {/* modo cine: no es lámina; la esponja con sus bacterias sigue en pantalla bajo las barras */}
        {svg(<g opacity={0.9 * kprog(T, K.I + 0.1, K.I + 0.5)}><Esponja x={540} y={1340} s={1.15} ventanas={1} T={T} /></g>)}
      </Escena>
      {/* 8–9 · Moraxella y el olor */}
      <Escena T={T} a={K.M} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {T < K.O ? <g transform="translate(540 960) scale(1.6)">
            {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2 + T * 0.3, r = 160 + (i % 2) * 60;
              return <g key={i} transform={`translate(${Math.cos(a) * r} ${Math.sin(a) * r})`}><circle cx={-22} cy={0} r={26} fill={KC.pink} stroke={KC.ink} strokeWidth={6} /><circle cx={22} cy={0} r={26} fill={KC.pink} stroke={KC.ink} strokeWidth={6} /></g>; })}
            <defs><linearGradient id="camisa" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stopColor="#d8ecff" /><stop offset="1" stopColor="#7f9fc4" /></linearGradient></defs><path d="M -120 -80 L -60 -120 L 60 -120 L 120 -80 L 90 -40 L 60 -60 L 60 120 L -60 120 L -60 -60 L -90 -40 Z" fill="url(#camisa)" stroke={KC.ink} strokeWidth={8} /><path d="M -22 -120 Q 0 -96 22 -120" stroke="#5d7da3" strokeWidth={5} fill="none" />
            {[-40, 0, 40].map((dx, k) => <path key={k} d={`M ${dx} -140 q 20 -30 0 -60 q -20 -30 0 -60`} stroke={KC.leaf} strokeWidth={9} fill="none" opacity={0.5 + 0.5 * Math.sin(T * 4 + k)} />)}
          </g> : <Esponja x={540} y={1100} s={1.7} T={T} olor={kprog(T, K.O + 0.3, K.O + 1.2)} />}
        </>)}
        <Etq T={T} at={K.M + 1.0} until={K.O - 0.2} x={100} y={1480} texto="Moraxella osloensis" it lado="der" tam={40} />
      </Escena>
      {/* 10 · el micro baja la carga, pero regresan */}
      <Escena T={T} a={K.R} b={K.Cs}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Micro x={540} y={1000} s={1.8} T={T} on={T > K.R + 0.4 && T < K.R + 1.8 ? 1 : 0} />
          <Esponja x={459} y={1012} s={0.62} ventanas={kclamp(carga, 0, 1)} T={T} />
          {T > K.R + 0.4 && T < K.R + 1.8 && <rect x={540 - 170 * 1.8} y={1000 - 100 * 1.8} width={250 * 1.8} height={200 * 1.8} rx={22} fill={`rgba(255,190,70,${0.22 + 0.12 * Math.sin(T * 12)})`} />}</>)}
        <Medidor T={T} at={K.R + 0.2} until={K.Cs - 0.2} valor={carga} etiqueta="bacterias en la esponja" texto={() => (T < K.R + 2.4 ? 'bajan' : '¿vuelven a crecer?')} x={90} y={1460} ancho={900} color={KC.red} />
      </Escena>
      {/* 11 · consejo: cámbiala cada semana */}
      <Escena T={T} a={K.Cs} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g transform="translate(540 760) scale(1.3)"><Calendario x={0} y={0} T={T} at={K.Cs + 0.3} /></g>
          {(() => { const c = kprog(T, K.Cs + 1.9, K.Cs + 2.7, kEase.suave); return <>
            <g opacity={1 - c}><Esponja x={540 - 700 * c} y={1330} s={1.15} ventanas={1} T={T} /></g>
            {c > 0 && <Esponja x={540 + 700 * (1 - c)} y={1330} s={1.15} ventanas={0} T={T} />}
          </>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma esponja, un edificio lleno */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<Esponja x={540} y={980} s={1.9} ventanas={1} T={T} />)}
      </Escena>

      {/* datos */}
      <Chip T={T} at={K.G + 1.4} until={K.Cu - 0.2} texto="edificio de bacterias" x={540} y={500} tam={42} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Cu + 1.0} until={K.E - 0.2} valor={54} dur={1.0} sufijo=" mil millones" etiqueta="bacterias en 1 cm³ (algunas zonas)" x={540} y={1410} tam={100} color={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.A - 0.3} anio="2017" quien="Alemania · 14 esponjas usadas" revista="Cardinale et al. · Scientific Reports" x={540} y={470} />
      <NumeroGigante T={T} at={K.A + 0.6} until={K.H - 0.2} valor={362} dur={1.2} etiqueta="grupos de bacterias" x={540} y={470} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Q + 0.3} until={K.I - 0.2} texto="¿agua caliente o micro?" x={540} y={1500} tam={38} borde={KC.ink} />
      <Comparativa T={T} at={K.I + 0.3} until={K.M - 0.2} max={10} y={720} alto={300}
        izq={{ valor: 8, etiqueta: 'limpiadas seguido', color: '#4f7fc9', texto: '≈' }} der={{ valor: 8.3, etiqueta: 'sin limpiar', color: '#d98a3d', texto: '≈' }} />
      <Chip T={T} at={K.I + 1.6} until={K.M - 0.2} texto="de 4 comparadas: no tenían menos" x={540} y={620} tam={40} borde={KC.red} />
      <Chip T={T} at={K.O + 0.4} until={K.R - 0.2} texto="sospecha: culpable del olor" x={380} y={440} tam={36} borde={KC.leaf} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou - 0.1} texto="dale fecha de caducidad" x={540} y={500} tam={40} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Cu - 0.1} texto="No es esponja: *es un edificio.*" />
      <Subtitulo T={T} idx={1} at={K.Cu + 0.1} until={K.E - 0.1} texto="En 1 cm³: *hasta 54 mil millones.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.A - 0.1} texto="Alemania, 2017: *14 esponjas usadas.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.H - 0.1} texto="Por su ADN: *362 grupos.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.Q - 0.1} texto="En los huecos, *en capas.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.I - 0.1} texto="¿Agua caliente *o micro?*" />
      <Subtitulo T={T} idx={6} at={K.I + 0.1} until={K.M - 0.1} texto="De 4: las limpiadas *no tenían menos.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.O - 0.1} texto="En su ADN: más *Moraxella* (ropa que huele feo)." />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.R - 0.1} texto="¿La culpable *del olor?*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.Cs - 0.1} texto="Bajan, pero *quizá vuelven.*" />
      <Subtitulo T={T} idx={10} at={K.Cs + 0.1} until={K.C - 0.1} texto="Cámbiala *cada semana.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Dale *fecha de caducidad.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Cubito + 2.4, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Adn + 1.4, CUES.Huecos - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Igual + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Igual + 0.6, CUES.Moraxella - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Olor + 0.3, CUES.Regresan - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Regresan + 2.6, CUES.Consejo - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Consejo + 0.3, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EsponjaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EsponjaShot /></CompositionStage></div>;
}
window.EsponjaApp = EsponjaApp;
