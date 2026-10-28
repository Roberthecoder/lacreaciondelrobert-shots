// Shot Científico #06 · No eres 10 bacterias por cada célula: es casi 1 a 1 — NARRADO (N2 "El número" + N4 "La imagen que se llena").
// Datos: Sender, Fuchs y Milo 2016, PLoS Biology 14: e1002533 (y su resumen en Cell 164: 337). Ver guion.md y verificacion.md.
const ROJO = '#e23b3b', BAC = KC.mint;

function Globulo({ x, y, r = 60, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(1 ${0.92})`}>
    <circle r={r} fill={ROJO} stroke={KC.ink} strokeWidth={Math.max(3, r / 12)} />
    <circle r={r * 0.45} fill="#ff7b7b" />
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
    <rect x={-240} y={-40} width={480} height={150} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-300} y={100} width={600} height={60} rx={20} fill="#8a8f99" stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-40} r={150} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    {[-60, -30, 0, 30, 60].map((d, i) => <line key={i} x1={Math.sin(d * Math.PI / 180) * 120} y1={-40 - Math.cos(d * Math.PI / 180) * 120} x2={Math.sin(d * Math.PI / 180) * 140} y2={-40 - Math.cos(d * Math.PI / 180) * 140} stroke={KC.ink} strokeWidth={6} />)}
    <line x1={0} y1={-40} x2={Math.sin(a * Math.PI / 180) * 115} y2={-40 - Math.cos(a * Math.PI / 180) * 115} stroke={KC.red} strokeWidth={10} strokeLinecap="round" />
    <circle cx={0} cy={-40} r={14} fill={KC.ink} />
  </g>;
}
function Excusado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={40} y={-330} width={170} height={230} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <path d="M -180 -100 L 210 -100 Q 210 40 60 70 L 80 200 L -80 200 L -60 70 Q -180 40 -180 -100 Z" fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={15} cy={-100} rx={180} ry={30} fill="#bfefff" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Bacterias() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Origen, L: CUES.Litro, Co: CUES.Colon, Q: CUES.Pregunta, H: CUES.Humanas, Cu: CUES.Cuenta, E: CUES.Estudio, P: CUES.Peso, B: CUES.Bano, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const g = krng(3);
  const diez = Array.from({ length: 10 }, (_, i) => ({ x: 600 + (i % 3) * 130 + (g() - 0.5) * 40, y: 860 + Math.floor(i / 3) * 110 + (g() - 0.5) * 40, r: g() * 180 }));
  // gancho: 10 bacterias se van y queda ~1 (con 0.3 más)
  const vanse = kprog(T, K.G + 3.0, K.G + 4.2, kEase.suave);
  const conteo = kprog(T, K.C + 2.2, K.C + 5.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 1 célula contra 10 bacterias… que se van */}
      <Escena T={T} a={K.G} b={K.O} fondo={KC.noche}>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.18)" />
        {svg(<>
          <Globulo x={290} y={990} r={120} rot={T * 10} />
          {diez.map((d, i) => { const sale = i === 0 ? 0 : vanse; const ap = kprog(T, K.G + 0.05 + i * 0.12, K.G + 0.35 + i * 0.12, kEase.rebote);
            return <g key={i} opacity={1 - sale} transform={`translate(${sale * 500} 0)`}><Bacteria x={d.x} y={d.y + Math.sin(T * 2 + i) * 8} rot={d.r + T * 20} s={0.7 * ap} T={T} seed={i} color={BAC} /></g>; })}
        </>)}
        <Escala T={T} z={1} pxPorMm={16000} y={1430} x={60} />
      </Escena>
      {/* 2 · de dónde salió el 10:1 */}
      <Escena T={T} a={K.O} b={K.L}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g transform="translate(540 860) rotate(-4)">
          <rect x={-330} y={-330} width={660} height={640} rx={10} fill="#f6e7c1" stroke={KC.ink} strokeWidth={8} />
          <text x={-280} y={-250} style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>AÑOS 70</text>
          {[0, 1, 2, 3, 4, 5].map((k) => <rect key={k} x={-280} y={-180 + k * 70} width={k === 2 ? 560 * kprog(T, K.O + 0.6, K.O + 1.6) : 520} height={18} rx={9} fill={k === 2 ? KC.red : '#cdbb94'} />)}
          <text x={-280} y={260} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.O + 1.6, K.O + 2.2)}>~10¹⁴ bacterias (estimado)</text>
        </g>)}
      </Escena>
      {/* 3–4 · el litro de intestino vs. solo el colon */}
      <Escena T={T} a={K.L} b={K.Q}>
        <FondoLunares color={KC.pink} />
        {svg(<Intestino T={T} bacDelgado={kprog(T, K.L + 0.3, K.L + 1.5) * (1 - kprog(T, K.Co + 0.3, K.Co + 1.4))} bacColon={kprog(T, K.L + 0.3, K.L + 1.5)} resalta={T > K.Co + 1.0 ? 1 : 0} />)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6 · 30 billones de células tuyas; 84 % glóbulos rojos */}
      <Escena T={T} a={K.H} b={K.Cu}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{T > K.H + 2.4 && Array.from({ length: 6 }, (_, i) => <Globulo key={i} x={150 + i * 155} y={1500 + (i % 2) * 30} r={52} rot={T * 15 + i * 30} />)}</>)}
        <Cuadricula T={T} cols={25} filas={4} llenado={kprog(T, K.H + 2.4, K.H + 4.4)} tramos={[{ desde: 0, hasta: 0.84, color: ROJO }, { desde: 0.84, hasta: 1, color: KC.blue }]} x={90} y={830} ancho={900} alto={150} vacio="rgba(0,0,0,.12)" />
      </Escena>
      {/* 7 · la cuenta: 30 contra 38 */}
      <Escena T={T} a={K.Cu} b={K.E}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      {/* 8 · el estudio */}
      <Escena T={T} a={K.E} b={K.P}>
        <FondoLunares color={KC.orange} />
      </Escena>
      {/* 9 · el peso: ~200 g */}
      <Escena T={T} a={K.P} b={K.B}>
        <FondoLunares color={KC.mint} />
        {svg(<Bascula x={540} y={1000} T={T} aguja={kprog(T, K.P + 0.6, K.P + 1.6, kEase.rebote) * 0.25} />)}
      </Escena>
      {/* 10 · al baño */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<Excusado x={360} y={1000} s={1} />)}
        <Medidor T={T} at={K.B + 0.8} until={K.C - 0.2} valor={1 - 0.3 * kprog(T, K.B + 2.0, K.B + 3.4, kEase.suave)} etiqueta="contenido del colon" texto={(v) => (v < 0.95 ? '−¼ a −⅓' : 'lleno')} x={90} y={1460} ancho={900} color={KC.orange} />
      </Escena>
      {/* 11 · cierre: la misma imagen del inicio, ahora casi 1 a 1, y la cuadrícula 30 vs 38 */}
      <Escena T={T} a={K.C} b={FIN} fondo={KC.noche}>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.18)" />
        {svg(<><Globulo x={300} y={720} r={110} rot={T * 10} /><Bacteria x={720} y={720} rot={T * 20} s={0.5} T={T} color={BAC} /><Bacteria x={800} y={790} rot={40 + T * 20} s={0.5 * 0.3 / 0.3 * 0.55} T={T} color={BAC} vida={0.9} /></>)}
        <Cuadricula T={T} cols={17} filas={4} llenado={conteo} tramos={[{ desde: 0, hasta: 30 / 68, color: ROJO }, { desde: 30 / 68, hasta: 1, color: BAC }]} x={90} y={930} ancho={900} alto={230} vacio="rgba(255,255,255,.1)" />
      </Escena>

      {/* datos */}
      <NumeroGigante T={T} at={K.G + 0.2} until={K.G + 2.9} valor={10} desde={10} sufijo=" : 1" etiqueta="lo que te dijeron" x={330} y={520} tam={150} color={KC.yellow} />
      <MitoTachado T={T} at={K.G + 2.9} tacharEn={K.G + 3.1} until={K.O - 0.2} texto="10 : 1" x={330} y={460} tam={60} />
      <Chip T={T} at={K.G + 3.6} until={K.O - 0.2} texto="≈ 1 : 1" x={760} y={460} tam={70} borde={BAC} />
      <Chip T={T} at={K.O + 2.4} until={K.L - 0.2} texto="una cuenta de una sola frase" x={540} y={440} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.L + 0.4} until={K.Co - 0.1} texto="«1 litro lleno de bacterias»" x={540} y={440} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Co + 0.9} until={K.Q - 0.2} texto="casi todas: colon (~400 mL)" x={400} y={440} tam={34} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.H + 0.2} until={K.Cu - 0.2} valor={30} dur={1.0} sufijo=" billones" etiqueta="células tuyas" x={540} y={560} tam={120} color={KC.red} />
      <Chip T={T} at={K.H + 2.6} until={K.Cu - 0.2} texto="84 % glóbulos rojos (sin núcleo)" x={540} y={1050} tam={34} borde={ROJO} />
      <Comparativa T={T} at={K.Cu + 0.2} until={K.E - 0.2} max={40} y={760} alto={320}
        izq={{ valor: 30, etiqueta: 'células tuyas', color: ROJO, texto: '30' }} der={{ valor: 38, etiqueta: 'bacterias', color: BAC, texto: '38' }} />
      <Chip T={T} at={K.Cu + 0.6} until={K.E - 0.2} texto="billones" x={540} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Cu + 2.4} until={K.E - 0.2} texto="1.3 : 1 ≈ una a una" x={540} y={1500} tam={44} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.P - 0.3} anio="2016" quien="Instituto Weizmann, Israel" revista="Sender, Fuchs y Milo · PLoS Biology" x={600} y={800} />
      <MitoTachado T={T} at={K.P + 2.2} tacharEn={K.P + 3.0} until={K.B - 0.2} texto="1 a 3 kg" x={320} y={460} tam={52} />
      <Chip T={T} at={K.P + 1.2} until={K.B - 0.2} texto="≈ 200 g" x={540} y={680} tam={64} borde={BAC} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou - 0.1} texto="casi mitad y mitad" x={540} y={440} tam={44} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="¿10 bacterias por célula? *Casi 1 a 1.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.L - 0.1} texto="Una cuenta rápida *de los años 70.*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.Co - 0.1} texto="Un litro *lleno de bacterias.*" />
      <Subtitulo T={T} idx={3} at={K.Co + 0.1} until={K.Q - 0.1} texto="Casi todas viven *en tu colon.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.H - 0.1} texto="¿Y cuántas *células tuyas?*" />
      <Subtitulo T={T} idx={5} at={K.H + 0.1} until={K.Cu - 0.1} texto="30 billones: *84 % glóbulos rojos.*" />
      <Subtitulo T={T} idx={6} at={K.Cu + 0.1} until={K.E - 0.1} texto="38 billones: *1.3 a 1.*" />
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
