// Shot Científico #10 · Tu voz grabada no suena rara: es tu voz sin tus huesos — NARRADO (N1 "Por dentro" + N5 la prueba de los oídos).
// Datos: Reinfeldt et al. 2010 (JASA), Hughes y Harrison 2013 (Perception), efecto de oclusión. Ver guion.md y verificacion.md.
const VAIRE = KC.cyan, VHUESO = KC.gold2;
// cabeza grande del shot: centro y escala
const CH = { x: 470, y: 820, s: 1.4 };
const cpt = (lx, ly) => [CH.x + lx * CH.s, CH.y + ly * CH.s];
const OREJA = cpt(-75, 10), BOCA = cpt(150, 100), GARGANTA = cpt(10, 160);

// Caracol del oído interno (espiral) que vibra.
function Coclea({ x, y, s = 1, T = 0, vibra = 0 }) {
  const pts = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * Math.PI * 5, r = 70 * Math.exp(-a * 0.16); pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`); }
  return <g transform={`translate(${x} ${y}) scale(${s * (1 + 0.04 * vibra * Math.sin(T * 40))})`}>
    <polyline points={pts.join(' ')} fill="none" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" />
    <polyline points={pts.join(' ')} fill="none" stroke="#f7b7c8" strokeWidth={20} strokeLinecap="round" />
    <polyline points={pts.join(' ')} fill="none" stroke={VHUESO} strokeWidth={6} strokeLinecap="round" opacity={vibra} strokeDasharray="10 12" strokeDashoffset={-T * 80} />
  </g>;
}
// Anillos dorados que viajan por el hueso de la garganta al oído.
function VibraHueso({ T, p = 1, desde = GARGANTA, hasta = OREJA, n = 5 }) {
  return <g>{Array.from({ length: n }, (_, i) => { const f = ((T * 0.8 + i / n) % 1); const x = klerp(desde[0], hasta[0], f), y = klerp(desde[1], hasta[1], f) - Math.sin(f * Math.PI) * 120;
    return <circle key={i} cx={x} cy={y} r={20 + 20 * Math.sin(f * Math.PI)} fill="none" stroke={VHUESO} strokeWidth={9} opacity={p * (1 - Math.abs(f - 0.5) * 1.2)} />; })}</g>;
}
// Ondas de aire: salen de la boca, rodean la cara y llegan a la oreja.
function VueltaAire({ T, p = 1 }) {
  const ruta = (f) => { const a = klerp(-0.25, -1.55, f) * Math.PI; return [CH.x + 70 + Math.cos(a) * -330, CH.y + 60 + Math.sin(a) * 300]; };
  return <g opacity={p}>{Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.45 + i / 6) % 1); const [x, y] = ruta(f);
    return <g key={i} transform={`translate(${x} ${y})`}><path d="M -16 -26 Q 6 0 -16 26 M 4 -36 Q 30 0 4 36" fill="none" stroke={VAIRE} strokeWidth={9} strokeLinecap="round" opacity={1 - Math.abs(f - 0.5)} /></g>; })}</g>;
}
function Microfono({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-14} y={60} width={28} height={180} rx={10} fill="#555" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-90} width={120} height={170} rx={60} fill="#cfd6e0" stroke={KC.ink} strokeWidth={9} />
    {[-50, -20, 10, 40].map((yy) => <line key={yy} x1={-48} y1={yy} x2={48} y2={yy} stroke={KC.ink} strokeWidth={5} opacity=".5" />)}
  </g>;
}
// Ecualizador: barras de grave (izq) a agudo (der). refuerzo 0..1 sube los graves en dorado.
function Ecualizador({ T, x, y, refuerzo = 0 }) {
  const n = 12;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-520} width={n * 66 + 40} height={580} rx={30} fill="rgba(10,12,20,.75)" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: n }, (_, i) => { const base = 140 + 120 * Math.abs(Math.sin(T * 4 + i * 0.9)), extra = refuerzo * Math.max(0, 1 - i / 5) * 260;
      return <g key={i}><rect x={i * 66} y={-base} width={46} height={base} rx={10} fill={VAIRE} stroke={KC.ink} strokeWidth={5} />
        {extra > 1 && <rect x={i * 66} y={-base - extra} width={46} height={extra} rx={10} fill={VHUESO} stroke={KC.ink} strokeWidth={5} />}</g>; })}
    <text x={0} y={46} style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>graves</text>
    <text x={n * 66 - 20} y={46} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={KC.texto}>agudos</text>
  </g>;
}
// Mano que tapa la oreja.
function ManoOreja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-90} width={140} height={170} rx={60} fill={CPIEL} stroke={KC.ink} strokeWidth={9} />
    {[-45, -15, 15, 45].map((xx) => <rect key={xx} x={xx - 14} y={-150} width={28} height={90} rx={14} fill={CPIEL} stroke={KC.ink} strokeWidth={7} />)}
    <rect x={-40} y={70} width={80} height={200} rx={30} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
  </g>;
}

function VozGrabada() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const habla = (a, b) => (T > a && T < b ? 0.5 + 0.5 * Math.sin(T * 17) : 0);
  const caras = ['tú', '?', '?', 'tú'];
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el celular suena y tú haces mueca */}
      <Escena T={T} a={K.Gancho} b={K.Caminos}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Celular x={300} y={880} s={1.5} T={T} rot={-8} />
          <OndasArco x={420} y={760} ang={-30} T={T} color={KC.yellow} largo={220} />
          <TextoSvg x={330} y={470} tam={96} color={KC.yellow} rot={-4} s={klerp(0.5, 1, kprog(T, K.Gancho + 0.1, K.Gancho + 0.5, kEase.rebote))}>¿ESA ES MI VOZ?</TextoSvg>
        </Lienzo>
      </Escena>
      {/* 1–2 · dos caminos: aire */}
      <Escena T={T} a={K.Caminos} b={K.Hueso} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <CabezaPerfil x={CH.x} y={CH.y} s={CH.s} boca={habla(K.Caminos, K.Hueso)} />
          <VueltaAire T={T} p={kprog(T, K.Aire + 0.2, K.Aire + 0.8)} />
          {T < K.Aire && <><FlechaRecta x1={BOCA[0] + 20} y1={BOCA[1]} x2={BOCA[0] + 230} y2={BOCA[1] - 260} p={kprog(T, K.Caminos + 0.5, K.Caminos + 1.2, kEase.sale)} color={VAIRE} />
            <FlechaRecta x1={GARGANTA[0]} y1={GARGANTA[1]} x2={OREJA[0] + 20} y2={OREJA[1] + 40} p={kprog(T, K.Caminos + 1.2, K.Caminos + 1.9, kEase.sale)} color={VHUESO} /></>}
        </Lienzo>
        <Chip T={T} at={K.Caminos + 0.6} until={K.Aire + 3} texto="1 · por el aire" x={780} y={420} tam={40} borde={VAIRE} />
        <Chip T={T} at={K.Caminos + 1.3} until={K.Aire - 0.1} texto="2 · por dentro" x={300} y={1180} tam={40} borde={VHUESO} />
        <Etq T={T} at={K.Aire + 1.0} until={K.Hueso - 0.2} x={OREJA[0] - 40} y={OREJA[1] + 300} texto="entra por tus oídos" lado="der" color={KC.texto} />
      </Escena>
      {/* 3 · por dentro: el cráneo vibra */}
      <Escena T={T} a={K.Hueso} b={K.Graves} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <CabezaPerfil x={CH.x} y={CH.y} s={CH.s} boca={habla(K.Hueso, K.Graves)} corte={1} />
          <VibraHueso T={T} p={kprog(T, K.Hueso + 0.5, K.Hueso + 1.2)} />
          <Coclea x={OREJA[0] + 30} y={OREJA[1] - 10} s={0.5} T={T} vibra={kprog(T, K.Hueso + 2, K.Hueso + 2.6)} />
        </Lienzo>
        <Lupa T={T} at={K.Hueso + 2.4} until={K.Graves - 0.3} x={740} y={470} r={190} fx={OREJA[0] + 30} fy={OREJA[1] - 10} tinte={VHUESO} etiqueta="POR DENTRO · OÍDO INTERNO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b1a2c" /><Coclea x={r} y={r} s={1.9} T={t} vibra={1} />
            {[0, 1, 2].map((i) => <circle key={i} cx={r} cy={r} r={((t * 60 + i * 50) % 150) + 20} fill="none" stroke={VHUESO} strokeWidth={5} opacity={1 - ((t * 60 + i * 50) % 150) / 150} />)}</svg>} />
        <Etq T={T} at={K.Hueso + 0.8} until={K.Hueso + 2.3} x={GARGANTA[0] + 60} y={GARGANTA[1] + 30} texto="vibra el hueso" lado="der" color={VHUESO} />
      </Escena>
      {/* 4 · los graves */}
      <Escena T={T} a={K.Graves} b={K.Micro} fondo={KC.dark}>
        <FondoMarca patron="oscuro" />
        <Lienzo><Ecualizador T={T} x={150} y={1060} refuerzo={kprog(T, K.Graves + 1.0, K.Graves + 2.6, kEase.sale)} /></Lienzo>
        <Chip T={T} at={K.Graves + 0.3} until={K.Micro - 0.2} texto="aire" x={330} y={420} tam={40} borde={VAIRE} />
        <Chip T={T} at={K.Graves + 1.2} until={K.Micro - 0.2} texto="+ hueso = más graves" x={600} y={500} tam={40} borde={VHUESO} />
      </Escena>
      {/* 5 · el micrófono solo capta aire */}
      <Escena T={T} a={K.Micro} b={K.Pregunta} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <CabezaPerfil x={CH.x - 120} y={CH.y} s={CH.s} boca={habla(K.Micro, K.Pregunta)} />
          <OndasArco x={BOCA[0] - 100} y={BOCA[1]} ang={0} T={T} color={VAIRE} largo={200} />
          <Microfono x={880} y={900} s={1.1} rot={-70} />
          <Celular x={860} y={1180} s={0.55} T={T} />
        </Lienzo>
        <Chip T={T} at={K.Micro + 0.5} until={K.Pregunta - 0.1} texto="micrófono = solo aire" x={540} y={430} tam={42} borde={VAIRE} />
      </Escena>
      {/* 6 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Estudio} />
      {/* 7 · el estudio: 80 personas calificando voces */}
      <Escena T={T} a={K.Estudio} b={K.Prueba} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          {T > K.Estudio + 2.6 && T < K.Resultado && Array.from({ length: 12 }, (_, i) => { const c = i % 3, f = Math.floor(i / 3), x = 230 + c * 310, y = 470 + f * 190, tu = [1, 6, 11].includes(i);
            const e = kprog(T, K.Estudio + 2.6 + i * 0.12, K.Estudio + 3.0 + i * 0.12, kEase.rebote);
            return <g key={i} transform={`translate(${x} ${y}) scale(${e})`}><rect x={-120} y={-75} width={240} height={150} rx={30} fill={tu && T > K.Estudio + 4.2 ? KC.yellow : '#fff'} stroke={KC.ink} strokeWidth={8} />
              <Celular x={-60} y={0} s={0.3} T={T + i} /><text x={30} y={18} style={{ font:`400 70px ${KF.titulo}` }} fill={KC.ink}>{tu && T > K.Estudio + 4.2 ? 'TÚ' : '★?'}</text></g>; })}
          {T >= K.Resultado - 0.3 && <g opacity={kprog(T, K.Resultado - 0.3, K.Resultado + 0.2)}>
            <BarraH x={140} y={640} ancho={800} v={0.86 * kprog(T, K.Resultado + 0.3, K.Resultado + 1.6, kEase.sale)} color={KC.yellow} etiqueta="tu voz · según tú" />
            <BarraH x={140} y={900} ancho={800} v={0.62 * kprog(T, K.Resultado + 1.2, K.Resultado + 2.5, kEase.sale)} color={KC.cyan} etiqueta="tu voz · según los demás" />
            <text x={540} y={1120} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>(barras ilustrativas: la tuya sale más alta)</text>
          </g>}
        </Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Estudio + 2.4} anio="2013" quien="80 personas · Pensilvania" revista="Hughes y Harrison · Perception" x={540} y={760} />
        <Chip T={T} at={K.Estudio + 4.2} until={K.Resultado - 0.3} texto="sin avisarles: 3 eran la suya" x={540} y={1210} tam={38} borde={KC.ink} />
      </Escena>
      {/* 9 · la prueba: tápate los oídos */}
      <Escena T={T} a={K.Prueba} b={K.Cierre} fondo={KC.noche}>
        <Ambiente T={T} n={20} color="rgba(255,255,255,.14)" />
        <Lienzo>
          <CabezaPerfil x={CH.x} y={CH.y} s={CH.s} boca={habla(K.Prueba + 1.2, K.Cierre)} corte={0.85} />
          <VibraHueso T={T} p={kprog(T, K.Prueba + 1.4, K.Prueba + 2)} n={7} />
          {Array.from({ length: 3 }, (_, i) => { const f = ((T * 0.9 + i / 3) % 1); return <circle key={i} cx={OREJA[0] + 30} cy={OREJA[1]} r={30 + f * 160} fill="none" stroke={VHUESO} strokeWidth={10} opacity={kprog(T, K.Prueba + 1.8, K.Prueba + 2.2) * (1 - f)} />; })}
          <g transform={`translate(0 ${(1 - kprog(T, K.Prueba + 0.3, K.Prueba + 1.0, kEase.rebote)) * 700})`}><ManoOreja x={OREJA[0] - 10} y={OREJA[1] + 20} s={1.2} /></g>
        </Lienzo>
        <Chip T={T} at={K.Prueba + 2.2} until={K.Cierre - 0.1} texto="más fuerte y más grave" x={380} y={420} tam={44} borde={VHUESO} />
      </Escena>
      {/* 10 · cierre: el mismo celular, ahora sonríes */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Celular x={300} y={880} s={1.5} T={T} rot={-8} />
          <OndasArco x={420} y={760} ang={-30} T={T} color={KC.yellow} largo={220} />
          <CabezaPerfil x={760} y={900} s={0.9} gesto="sonrie" />
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.6} until={K.Outro - 0.1} texto="la voz que todos conocen" x={540} y={440} tam={44} borde={KC.gold} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Caminos - 0.1} texto="No es otra persona: *es tu voz.*" />
      <Subtitulo T={T} idx={1} at={K.Caminos + 0.1} until={K.Aire - 0.1} texto="Te llega por *dos caminos.*" />
      <Subtitulo T={T} idx={2} at={K.Aire + 0.1} until={K.Hueso - 0.1} texto="Uno: *el aire.*" />
      <Subtitulo T={T} idx={3} at={K.Hueso + 0.1} until={K.Graves - 0.1} texto="Otro: *por el hueso.*" />
      <Subtitulo T={T} idx={4} at={K.Graves + 0.1} until={K.Micro - 0.1} texto="Por dentro: *más grave.*" />
      <Subtitulo T={T} idx={5} at={K.Micro + 0.1} until={K.Pregunta - 0.1} texto="El micrófono: *solo aire.*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Estudio - 0.1} texto="¿De verdad *odias tu voz?*" />
      <Subtitulo T={T} idx={7} at={K.Estudio + 0.1} until={K.Resultado - 0.1} texto="2013: *80 personas* calificaron voces." />
      <Subtitulo T={T} idx={8} at={K.Resultado + 0.1} until={K.Prueba - 0.1} texto="A la suya: *mejor calificación.*" />
      <Subtitulo T={T} idx={9} at={K.Prueba + 0.1} until={K.Cierre - 0.1} texto="Tápate los oídos: *más grave.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu voz *con cabeza incluida.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Hueso + 0.4, K.Hueso + 2.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Graves + 2.6, K.Micro - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Micro + 0.3, K.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Pregunta + 0.05, K.Estudio + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Resultado + 0.2, K.Prueba - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Prueba + 2.4, K.Cierre - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Cierre + 0.3, K.Outro - 0.1, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="10" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function VozGrabadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VozGrabada /></CompositionStage></div>;
}
window.VozGrabadaApp = VozGrabadaApp;
