// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Shot Científico #06 · No eres 10 bacterias por cada célula: es casi 1 a 1 — NARRADO (N2 "El número" + N4 "La imagen que se llena").
// Datos: Sender, Fuchs y Milo 2016, PLoS Biology 14: e1002533 (y su resumen en Cell 164: 337). Ver guion.md y verificacion.md.
const ROJO = '#e23b3b', BAC = KC.mint;

// belleza: degradados de volumen (glóbulo bicóncavo: borde grueso iluminado y centro hundido; loza y metal con luz arriba-izquierda)
function BcDefs() {
  return <defs>
    <radialGradient id="bc-glob" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#b82a2c" /><stop offset="0.38" stopColor="#c9393b" /><stop offset="0.72" stopColor="#f06a66" /><stop offset="0.9" stopColor="#d8403f" /><stop offset="1" stopColor="#9c1f22" /></radialGradient>
    <linearGradient id="bc-loza" x1="0" y1="0" x2="0.7" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c3cad6" /></linearGradient>
    <linearGradient id="bc-metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a9afb9" /><stop offset="1" stopColor="#5d636e" /></linearGradient>
    <linearGradient id="bc-agua" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d8f6ff" /><stop offset="1" stopColor="#8fd3ee" /></linearGradient>
    <linearGradient id="bc-papel" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#2c3550" /><stop offset="1" stopColor="#1b2134" /></linearGradient>
  </defs>;
}
function Globulo({ x, y, r = 60, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${0.92})`}>
    <circle r={r} fill="url(#bc-glob)" stroke="#ff9a96" strokeWidth={Math.max(2, r / 30)} />
    <ellipse cx={-r * 0.42} cy={-r * 0.5} rx={r * 0.22} ry={r * 0.1} transform={`rotate(-35 ${-r * 0.42} ${-r * 0.5})`} fill="#fff" opacity=".35" />
  </g>;
}
// Intestino esquemático: colon (marco) + intestino delgado (enredo). bacDelgado/bacColon = 0..1 cuántas bacterias se ven.
const COLON = 'M 260 1180 L 260 690 Q 260 620 330 620 L 750 620 Q 820 620 820 690 L 820 1120 Q 820 1180 760 1180 L 600 1180';
function Intestino({ T, bacDelgado = 0, bacColon = 0, resalta = 0 }) {
  const g = krng(7), pts = [];
  for (let i = 0; i < 26; i++) pts.push([390 + (i % 6) * 62 + Math.sin(i) * 14, 720 + Math.floor(i / 6) * 95 + (i % 2) * 18]);
  const delgado = 'M ' + pts.map((p) => p.join(' ')).join(' L ');
  const bD = [], bC = [];
  for (let i = 0; i < 26; i++) bD.push(<Bacteria key={i} x={pts[i][0]} y={pts[i][1]} rot={g() * 180} s={0.28} T={T} seed={i} color={BAC} flagelo={false} />);
  const colonPts = [[260, 1150], [260, 1050], [260, 950], [260, 850], [260, 740], [300, 640], [400, 620], [500, 620], [600, 620], [700, 620], [800, 660], [820, 760], [820, 860], [820, 960], [820, 1060], [780, 1170], [680, 1180]];
  colonPts.forEach(([x, y], i) => { for (let k = 0; k < 3; k++) bC.push(<Bacteria key={i * 3 + k} x={x + (g() - 0.5) * 50} y={y + (g() - 0.5) * 50} rot={g() * 180} s={0.3} T={T} seed={i + k} color={BAC} flagelo={false} />); });
  return <g>
    <path d={COLON} stroke={resalta ? KC.yellow : '#e7a07a'} strokeWidth={resalta ? 118 : 110} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={resalta ? 0.6 + 0.4 * Math.sin(T * 5) : 1} />
    <path d={COLON} stroke="#f4b892" strokeWidth={96} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={delgado} stroke="#e98fa0" strokeWidth={46} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={delgado} stroke="#f7b3bf" strokeWidth={32} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g opacity={bDelgadoOp(bacDelgado)}>{bD}</g>
    <g opacity={bacColon}>{bC}</g>
  </g>;
}
const bDelgadoOp = (v) => kclamp(v, 0, 1);
function Bascula({ x, y, T, aguja = 0 }) {
  const a = -60 + 120 * aguja + Math.sin(T * 9) * 2 * (1 - aguja);
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={172} rx={320} ry={24} fill="rgba(0,0,0,.4)" />
    <rect x={-240} y={-40} width={480} height={150} rx={30} fill="url(#bc-loza)" stroke={KC.ink} strokeWidth={9} />
    <rect x={-300} y={100} width={600} height={60} rx={20} fill="url(#bc-metal)" stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-40} r={150} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    {[-60, -30, 0, 30, 60].map((d, i) => <line key={i} x1={Math.sin(d * Math.PI / 180) * 120} y1={-40 - Math.cos(d * Math.PI / 180) * 120} x2={Math.sin(d * Math.PI / 180) * 140} y2={-40 - Math.cos(d * Math.PI / 180) * 140} stroke={KC.ink} strokeWidth={6} />)}
    <line x1={0} y1={-40} x2={Math.sin(a * Math.PI / 180) * 115} y2={-40 - Math.cos(a * Math.PI / 180) * 115} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />
    <circle cx={0} cy={-40} r={14} fill={KC.ink} />
  </g>;
}
function Excusado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={206} rx={190} ry={22} fill="rgba(0,0,0,.4)" />
    <rect x={40} y={-330} width={170} height={230} rx={20} fill="url(#bc-loza)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -180 -100 L 210 -100 Q 210 40 60 70 L 80 200 L -80 200 L -60 70 Q -180 40 -180 -100 Z" fill="url(#bc-loza)" stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 -70 Q -140 20 -60 50" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".7" />
    <ellipse cx={15} cy={-100} rx={180} ry={30} fill="url(#bc-agua)" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Bacterias() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Origen, L: CUES.Litro, Co: CUES.Colon, Q: CUES.Pregunta, H: CUES.Humanas, Cu: CUES.Cuenta, E: CUES.Estudio, P: CUES.Peso, B: CUES.Bano, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><BcDefs />{c}</svg>;
  const g = krng(3);
  const diez = Array.from({ length: 10 }, (_, i) => ({ x: 630 + (i % 3) * 150 + (g() - 0.5) * 40, y: 760 + Math.floor(i / 3) * 150 + (g() - 0.5) * 40, r: g() * 180 }));
  // gancho: 10 bacterias se van y queda ~1 (con 0.3 más)
  const vanse = kprog(T, K.G + 3.0, K.G + 4.2, kEase.suave);
  const conteo = kprog(T, K.C + 2.2, K.C + 5.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 1 célula contra 10 bacterias… que se van */}
      <Escena T={T} a={K.G} b={K.O} fondo={KC.noche}>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.18)" />
        {svg(<>
          <Globulo x={290} y={960} r={168} rot={T * 10} />
          {diez.map((d, i) => { const sale = i === 0 ? 0 : vanse; const ap = kprog(T, K.G + 0.05 + i * 0.12, K.G + 0.35 + i * 0.12, kEase.rebote);
            return <g key={i} opacity={1 - sale} transform={`translate(${sale * 500} 0)`}><Bacteria x={d.x} y={d.y + Math.sin(T * 2 + i) * 8} rot={d.r + T * 20} s={0.98 * ap} T={T} seed={i} color={BAC} /></g>; })}
        </>)}
        <Escala T={T} z={1} pxPorMm={22400} y={1430} x={60} />
      </Escena>
      {/* 2 · de dónde salió el 10:1 */}
      <Escena T={T} a={K.O} b={K.L}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {/* belleza: el sujeto del gancho (tu célula y sus bacterias) sigue a cuadro, a media luz, detrás de la hoja de la cuenta */}
        {svg(<g opacity={0.5}><Globulo x={215} y={1365} r={175} rot={T * 10} />
          {[[880, 560, 30], [935, 760, 110], [890, 1330, 70], [190, 600, 150]].map(([bx, by, br], i) => <Bacteria key={i} x={bx} y={by + Math.sin(T * 2 + i) * 8} rot={br + T * 20} s={0.9} T={T} seed={i} color={BAC} />)}</g>)}
        {svg(<g transform="translate(540 960) rotate(-4) scale(1.16)">
          <rect x={-318} y={-312} width={660} height={640} rx={10} fill="rgba(0,0,0,.45)" />
          <rect x={-330} y={-330} width={660} height={640} rx={10} fill="url(#bc-papel)" stroke={KC.ink} strokeWidth={6} />
          <text x={-280} y={-250} style={{ font:`400 70px ${KF.titulo}` }} fill="#f3f6ff">AÑOS 70</text>
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-280} y={-180 + k * 70} width={k === 2 ? 560 * kprog(T, K.O + 0.6, K.O + 1.6) : 520} height={18} rx={9} fill={k === 2 ? KC.red : '#56607c'} />)}
          <text x={-280} y={260} style={{ font:`700 34px ${KF.mono}` }} fill="#f3f6ff" opacity={kprog(T, K.O + 1.6, K.O + 2.2)}>~10¹⁴ bacterias (estimado)</text>
        </g>)}
      </Escena>
      {/* 3–4 · el litro de intestino vs. solo el colon */}
      <Escena T={T} a={K.L} b={K.Q}>
        <FondoLunares color={KC.pink} />
        {svg(<g transform="translate(540 970) scale(1.2) translate(-540 -900)"><Intestino T={T} bacDelgado={kprog(T, K.L + 0.3, K.L + 1.5) * (1 - kprog(T, K.Co + 0.3, K.Co + 1.4))} bacColon={kprog(T, K.L + 0.3, K.L + 1.5)} resalta={T > K.Co + 1.0 ? 1 : 0} /></g>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {/* encuadre: el intestino de la escena anterior (bacterias en el colon) sigue a cuadro, a media luz, y la pregunta encima */}
        <div style={{ position:'absolute', inset:0, background:'rgba(10,15,28,.85)' }}></div>
        {svg(<g opacity={0.55} transform="translate(540 970) scale(1.2) translate(-540 -900)"><Intestino T={T} bacDelgado={0} bacColon={1} resalta={1} /></g>)}
        {svg(<text x={540} y={1150} textAnchor="middle" style={{ font:`400 620px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 540 950)`}>?</text>)}
      </Escena>
      {/* 6 · 36 billones de células tuyas (hombre, Hatton et al. 2023); ~4 de cada 5 sin núcleo (≈29 de 36) */}
      <Escena T={T} a={K.H} b={K.Cu}>
        <FondoLunares color={KC.yellow} />
        {/* modo cine: los glóbulos y la cuadrícula vacía están desde que empieza la escena */}
        {svg(<g opacity={kprog(T, K.H + 0.1, K.H + 0.6)}>{Array.from({ length: 6 }, (_, i) => <Globulo key={i} x={i < 3 ? 145 : 935} y={790 + (i % 3) * 210} r={64} rot={T * 15 + i * 30} />)}</g>)}
        <Cuadricula T={T} cols={10} filas={10} llenado={kprog(T, K.H + 2.4, K.H + 4.4)} tramos={[{ desde: 0, hasta: 0.8, color: ROJO }, { desde: 0.8, hasta: 1, color: KC.blue }]} x={240} y={700} ancho={600} alto={600} vacio="rgba(255,255,255,.1)" />
      </Escena>
      {/* 7 · la cuenta: 36 (2023) contra 38 (2016) */}
      <Escena T={T} a={K.Cu} b={K.E}>
        <FondoLunares color={KC.cyan} />
        {/* modo cine: a cada barra, su sujeto (tu célula y la bacteria del gancho); encuadre: barras más altas y todo un poco más abajo */}
        {svg(<g opacity={kprog(T, K.Cu + 0.2, K.Cu + 0.7)}><Globulo x={340} y={400} r={84} rot={T * 10} /><Bacteria x={740} y={400} rot={T * 20} s={0.8} T={T} color={BAC} /></g>)}
      </Escena>
      {/* 8 · el estudio */}
      <Escena T={T} a={K.E} b={K.P}>
        <FondoLunares color={KC.orange} />
        {/* modo cine: el sujeto sigue en pantalla (la célula y la bacteria del gancho, frente a frente) */}
        {svg(<g opacity={kprog(T, K.E, K.E + 0.5)}><Globulo x={300} y={1060} r={200} rot={T * 10} /><Bacteria x={790} y={1060 + Math.sin(T * 2) * 8} rot={T * 20} s={1.17} T={T} color={BAC} /></g>)}
      </Escena>
      {/* 9 · el peso: ~200 g */}
      <Escena T={T} a={K.P} b={K.B}>
        <FondoLunares color={KC.mint} />
        {svg(<g transform="translate(540 1050) scale(1.5) translate(-540 -985)"><Bascula x={540} y={1000} T={T} aguja={kprog(T, K.P + 0.6, K.P + 1.6, kEase.rebote) * 0.25} /></g>)}
      </Escena>
      {/* 10 · al baño */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<Excusado x={500} y={1010} s={1.5} />)}
        <Medidor T={T} at={K.B + 0.8} until={K.C - 0.2} valor={1 - 0.3 * kprog(T, K.B + 2.0, K.B + 3.4, kEase.suave)} etiqueta="contenido del colon" texto={(v) => (v < 0.95 ? '−¼ a −⅓' : 'lleno')} x={90} y={1405} ancho={900} color={KC.orange} />
      </Escena>
      {/* 11 · cierre: la misma imagen del inicio, ahora casi 1 a 1, y la cuadrícula 30 vs 38 */}
      <Escena T={T} a={K.C} b={FIN} fondo={KC.noche}>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.18)" />
        {svg(<><Globulo x={290} y={730} r={160} rot={T * 10} /><Bacteria x={730} y={710} rot={T * 20} s={0.725} T={T} color={BAC} /><Bacteria x={850} y={830} rot={40 + T * 20} s={0.725 * 0.55} T={T} color={BAC} vida={0.9} /></>)}
        <Cuadricula T={T} cols={17} filas={4} llenado={conteo} tramos={[{ desde: 0, hasta: 36 / 74, color: ROJO }, { desde: 36 / 74, hasta: 1, color: BAC }]} x={60} y={1010} ancho={960} alto={245} vacio="rgba(255,255,255,.1)" />
      </Escena>

      {/* datos */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.G + 2.9} valor={10} desde={10} sufijo=" : 1" etiqueta="lo que te dijeron" x={330} y={520} tam={150} color={KC.yellow} />
      <MitoTachado T={T} at={K.G + 2.9} tacharEn={K.G + 3.1} until={K.O - 0.2} texto="10 : 1" x={330} y={460} tam={60} />
      <Chip T={T} at={K.G + 3.6} until={K.O - 0.2} texto="≈ 1 : 1" x={760} y={460} tam={70} borde={BAC} />
      <Chip T={T} at={K.O + 2.4} until={K.L - 0.2} texto="una cuenta de una sola frase" x={540} y={375} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.L + 0.4} until={K.Co - 0.1} texto="«1 litro lleno de bacterias»" x={540} y={395} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Co + 0.9} until={K.Q - 0.2} texto="casi todas: colon (~400 mL)" x={540} y={395} tam={34} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.H + 0.2} until={K.Cu - 0.2} valor={36} dur={1.0} sufijo=" billones" etiqueta="células tuyas (2023)" x={540} y={500} tam={130} color={KC.red} />
      <Chip T={T} at={K.H + 2.6} until={K.Cu - 0.2} texto="4 de cada 5 sin núcleo: glóbulos rojos y plaquetas" x={540} y={1385} tam={30} borde={ROJO} />
      <Comparativa T={T} at={K.Cu + 0.2} until={K.E - 0.2} max={40} y={560} alto={800}
        izq={{ valor: 36, etiqueta: 'células tuyas (2023)', color: ROJO, texto: '36' }} der={{ valor: 38, etiqueta: 'bacterias (2016)', color: BAC, texto: '38' }} />
      <Chip T={T} at={K.Cu + 0.6} until={K.E - 0.2} texto="billones" x={540} y={275} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Cu + 2.4} until={K.E - 0.2} texto="≈ una a una" x={540} y={1505} tam={44} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.P - 0.3} anio="2016" quien="Instituto Weizmann, Israel" revista="Sender, Fuchs y Milo · PLoS Biology" x={540} y={480} />
      <MitoTachado T={T} at={K.P + 2.2} tacharEn={K.P + 3.0} until={K.B - 0.2} texto="1 a 3 kg" x={320} y={460} tam={52} />
      <Chip T={T} at={K.P + 1.2} until={K.B - 0.2} texto="≈ 200 g" x={540} y={620} tam={64} borde={BAC} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="casi mitad y mitad" x={540} y={400} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="¿10 bacterias por célula? *Casi 1 a 1.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.L - 0.1} texto="Una cuenta rápida *de los años 70.*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.Co - 0.1} texto="Un litro *lleno de bacterias.*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.Q - 0.1} texto="Casi todas viven *en tu colon.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.H - 0.1} texto="¿Y cuántas *células tuyas?*" />
      <Subtitulo T={T} idx={5} at={K.H + 0.1} until={K.Cu - 0.1} texto="2023: *36 billones* (hombre)." />
      <Subtitulo T={T} idx={6} at={K.Cu + 0.1} until={K.E - 0.1} texto="Bacterias (2016): *38 billones.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.P - 0.1} texto="Instituto Weizmann, *2016.*" />
      <Subtitulo T={T} idx={8} at={K.P + 0.1} until={K.B - 0.1} texto="Todas juntas: *unos 200 gramos.*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.C - 0.1} texto="Al baño: *−¼ a −⅓ del colon.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Eres *casi mitad y mitad.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Origen + 0.4, CUES.Origen + 3.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Colon + 1.4, CUES.Pregunta - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Humanas + 1.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Cuenta + 2.6, CUES.Estudio - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Estudio + 0.4, CUES.Peso - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Peso + 3.2, CUES.Bano - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Bano + 0.4, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BacteriasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Bacterias /></CompositionStage></div>;
}
window.BacteriasApp = BacteriasApp;
