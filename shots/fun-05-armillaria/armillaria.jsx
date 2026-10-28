// Shot Fungi Mati #05 · El hongo gigante (Armillaria ostoyae) — NARRADO (N2 "El número" + viaje N1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (la red y el mapa no son el contorno real).
const SUELO_Y = 900;
const CAFE_SOMBRERO = '#a8642a';

// El bosque en corte: cielo, suelo, dos coníferas, tres racimos de setas y (opcional) la red del hongo bajo tierra.
function Bosque({ T, at, red = 0, rayos = 0, cordon = 0, muere = 0, raizMala = 0, extra = 0 }) {
  return fsvg(<>
    <rect x={0} y={0} width={KW} height={SUELO_Y} fill="#9fe7d2" />
    {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={(i * 230 + T * 12) % 1300 - 100} cy={120 + (i % 3) * 70} r={46} fill="#fff" opacity=".55" />)}
    {extra > 0 && [-520, -300, 1150, 1400, 1650].map((xx, i) => <Conifera key={i} x={xx} y={SUELO_Y + 5} s={0.6} T={T} seed={i + 9} />)}
    <Conifera x={250} y={SUELO_Y + 5} s={0.8} T={T} seed={1} />
    <Conifera x={640} y={SUELO_Y + 5} s={0.52} T={T} seed={2} muere={muere} />
    <rect x={-800} y={SUELO_Y} width={KW + 1600} height={KH} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
    <rect x={-800} y={SUELO_Y - 10} width={KW + 1600} height={22} fill={FK.pasto} stroke={KC.ink} strokeWidth={6} />
    {/* raíces */}
    {[[250, -1], [250, 1], [250, 0]].map(([rx, k], i) => <path key={i} d={`M ${rx} ${SUELO_Y} q ${k * 60} 90 ${k * 150} 170`} stroke="#8a5a2b" strokeWidth={18} fill="none" strokeLinecap="round" />)}
    {[[-1], [1], [0]].map(([k], i) => <path key={'b' + i} d={`M 640 ${SUELO_Y} q ${k * 40} 70 ${k * 110} 130`} stroke={mixHex('#8a5a2b', '#2b1a10', raizMala)} strokeWidth={14} fill="none" strokeLinecap="round" />)}
    {rayos > 0 && <rect x={-800} y={SUELO_Y + 12} width={KW + 1600} height={KH} fill={FK.suelo} opacity={rayos * 0.75} />}
    {red > 0 && <RedHifas T={T} x={430} y={SUELO_Y + 10} g={red} seed={5} n={360} escala={0.28} ancho={3.2} color={FK.hifa} brillo={0.6} />}
    <Cordon x1={460} y1={SUELO_Y + 40} x2={690} y2={SUELO_Y + 120} p={cordon} onda={14} ancho={11} />
    <Racimo T={T} x={430} y={SUELO_Y + 6} at={at} pts={RACIMO_MIEL} s={0.85} sombrero={CAFE_SOMBRERO} />
    <Racimo T={T} x={880} y={SUELO_Y + 6} at={at + 0.5} pts={RACIMO_MIEL.slice(0, 4)} s={0.6} sombrero={CAFE_SOMBRERO} />
    <Racimo T={T} x={90} y={SUELO_Y + 6} at={at + 0.8} pts={RACIMO_MIEL.slice(0, 3)} s={0.55} sombrero={CAFE_SOMBRERO} />
  </>);
}

// Mapa de arriba del genet (mancha de bosque con su frontera). frente = 0..1 el borde avanza. dudas = huecos grises.
function MapaGenet({ T, cx = 470, cy = 720, r = 260, frente = 1, dudas = 0, puntos = 1 }) {
  const g = krng(8), n = 40;
  const forma = (k) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * k * (0.82 + 0.25 * Math.sin(a * 3 + 1) * 0.6 + 0.08 * Math.sin(a * 7)); return `${i ? 'L' : 'M'} ${(cx + Math.cos(a) * rr * 1.15).toFixed(1)} ${(cy + Math.sin(a) * rr * 0.85).toFixed(1)}`; }).join(' ') + ' Z';
  const arboles = Array.from({ length: 70 }, () => [cx + (g() - 0.5) * r * 3.2, cy + (g() - 0.5) * r * 2.4]);
  return fsvg(<>
    {arboles.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={20} fill="#2f9e44" stroke={KC.ink} strokeWidth={3} opacity=".7" />)}
    <path d={forma(Math.max(0.05, frente))} fill="rgba(255,225,26,.28)" stroke={KC.yellow} strokeWidth={8} strokeDasharray="22 12" strokeDashoffset={-T * 30} />
    {Array.from({ length: 14 }, (_, i) => { const a = i * 2.4, rr = r * 0.25 + (i % 5) * r * 0.13; const on = kprog(puntos, i / 14, i / 14 + 0.1);
      return on > 0 ? <circle key={i} cx={cx + Math.cos(a) * rr * 1.1} cy={cy + Math.sin(a) * rr * 0.8} r={12 * on} fill={KC.red} stroke={KC.ink} strokeWidth={4} /> : null; })}
    {dudas > 0 && [[-0.45, -0.2], [0.35, 0.3], [0.1, -0.45]].map(([u, v], i) => <g key={i} opacity={dudas}>
      <circle cx={cx + u * r} cy={cy + v * r} r={60} fill="#8a8f99" stroke={KC.ink} strokeWidth={5} opacity=".85" />
      <text x={cx + u * r} y={cy + v * r + 26} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4}>?</text></g>)}
  </>);
}

function Armillaria() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Fruto, Co: CUES.Cordones, R: CUES.Raiz, P: CUES.Pregunta, E: CUES.Estudio, Ca: CUES.Cajas, Fu: CUES.Fusion, N: CUES.Numero, Ed: CUES.Edad, O: CUES.Ojo, B: CUES.Brillo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: brotan las setas; a los 2.3 s el suelo se vuelve rayos X y aparece la red que las une
  const rayos = kprog(T, K.G + 2.2, K.G + 2.8);
  const red = kprog(T, K.G + 2.4, K.G + 5.2, kEase.suave);
  // cierre: la cámara se aleja y la red sigue más allá de la pantalla
  const lejos = kprog(T, K.C + 1.2, K.C + 4.2, kEase.suave);
  // cajas: dos colonias por caja que crecen; la izquierda se fusiona, la derecha deja un hueco
  const crece = kprog(T, K.Ca + 0.6, K.Fu + 0.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–4 · el bosque en corte: setas → red → cordón → raíz que muere */}
      <Escena T={T} a={K.G} b={K.P} zoom={0.04} origen="40% 50%">
        <Bosque T={T} at={K.G} rayos={rayos} red={red} cordon={kprog(T, K.Co + 0.3, K.Co + 3.2, kEase.suave)} raizMala={kprog(T, K.R, K.R + 1.2)} muere={kprog(T, K.R + 0.6, K.P - 0.2)} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 6 · el estudio: un bosque de Oregón con los árboles muestreados */}
      <Escena T={T} a={K.E} b={K.Ca}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>{Array.from({ length: 9 }, (_, i) => <Conifera key={i} x={110 + i * 108} y={1180 - (i % 2) * 30} s={0.32} T={T} seed={i} muere={i % 3 === 1 ? 0.8 : 0} />)}
          {Array.from({ length: 9 }, (_, i) => i % 3 === 1 ? <circle key={'p' + i} cx={110 + i * 108} cy={1100 - (i % 2) * 30} r={16 * kprog(T, K.E + 1.4 + i * 0.1, K.E + 1.7 + i * 0.1, kEase.rebote)} fill={KC.red} stroke={KC.ink} strokeWidth={4} /> : null)}</>)}
      </Escena>
      {/* 7–8 · cajas de cultivo: fusión = mismo individuo · hueco = otro individuo */}
      <Escena T={T} a={K.Ca} b={K.N}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Petri x={290} y={900} r={185}>
            <Colonia cx={-75 + 25 * crece} cy={0} r={20 + 95 * crece} seed={1} />
            <Colonia cx={75 - 25 * crece} cy={0} r={20 + 95 * crece} seed={2} />
          </Petri>
          <Petri x={790} y={900} r={185}>
            <Colonia cx={-80} cy={0} r={20 + 62 * crece} seed={3} color="#fff3dc" />
            <Colonia cx={80} cy={0} r={20 + 62 * crece} seed={4} color="#f0fff4" />
          </Petri>
          <Sello T={T} at={K.Fu + 0.6} x={290} y={900} texto="✓" color={KC.leaf} r={62} />
          <Sello T={T} at={K.Fu + 1.4} x={790} y={900} texto="✗" color={KC.red} r={62} rot={10} />
        </>)}
      </Escena>
      {/* 9 · 965 hectáreas en canchas de fútbol */}
      <Escena T={T} a={K.N} b={K.Ed} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:'#1f5130' }}></div>
        <Cuadricula T={T} cols={30} filas={45} x={90} y={640} ancho={900} alto={420} llenado={(t) => kprog(t, K.N + 1.4, K.N + 4.6)} lleno={KC.mint} vacio="rgba(255,255,255,.08)" />
      </Escena>
      {/* 10–11 · la edad y la duda: el mapa del genet */}
      <Escena T={T} a={K.Ed} b={K.B}>
        <div style={{ position:'absolute', inset:0, background:'#24402c' }}></div>
        <MapaGenet T={T} frente={kprog(T, K.Ed + 0.2, K.Ed + 4.5, kEase.suave)} dudas={kprog(T, K.O + 0.6, K.O + 1.2)} puntos={kprog(T, K.Ed + 0.2, K.Ed + 2.5)} />
        {fsvg(<g opacity={kprog(T, K.Ed + 1.5, K.Ed + 2)}><line x1={200} y1={1010} x2={750} y2={1010} stroke={KC.texto} strokeWidth={6} /><line x1={200} y1={990} x2={200} y2={1030} stroke={KC.texto} strokeWidth={6} /><line x1={750} y1={990} x2={750} y2={1030} stroke={KC.texto} strokeWidth={6} /><text x={475} y={1068} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>≈ 3.8 km</text></g>)}
      </Escena>
      {/* 12 · brilla en la oscuridad: madera podrida con hilos luminosos */}
      <Escena T={T} a={K.B} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:'#05070c' }}></div>
        <Ambiente T={T} n={30} color="rgba(160,255,140,.35)" />
        {fsvg(<>
          <rect x={120} y={760} width={840} height={260} rx={120} fill="#2a1d14" stroke="#0b0806" strokeWidth={8} />
          <ellipse cx={960} cy={890} rx={60} ry={130} fill="#3b2a1d" stroke="#0b0806" strokeWidth={8} />
          <RedHifas T={T} x={540} y={890} g={kprog(T, K.B + 0.2, K.B + 2.6)} seed={11} n={260} escala={0.16} ancho={3} color="#b6ff8f" circ={true} brillo={1.6 + 0.6 * Math.sin(T * 3)} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo bosque; la cámara se aleja y la red sigue más allá */}
      <Escena T={T} a={K.C} b={FIN} zoom={0} fondo={`linear-gradient(#9fe7d2 0 47%, ${FK.tierra} 47%)`}>
        <div style={{ position:'absolute', inset:0, transform:`scale(${klerp(1, 0.55, lejos)})`, transformOrigin:'40% 47%' }}>
          <Bosque T={T} at={K.C - 2} rayos={1} red={1} extra={lejos} />
          {fsvg(<>{[-1, 1].map((k) => <RedHifas key={k} T={T} x={430 + k * 650} y={SUELO_Y + 10} g={lejos} seed={6 + k} n={300} escala={0.28} ancho={3.2} color={FK.hifa} brillo={0.6} />)}</>, 21)}
        </div>
      </Escena>

      {/* textos y etiquetas */}
      <Chip T={T} at={K.G + 0.9} until={K.G + 2.6} texto="¿cientos de hongos?" y={470} x={360} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.G + 3.4} until={K.F - 0.2} texto="= 1 solo individuo" y={470} x={360} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.F + 0.3} until={K.Co - 0.3} x={540} y={760} texto="seta = fruto" tam={34} />
      <Etq T={T} at={K.F + 1.4} until={K.Co - 0.3} x={600} y={1130} texto="micelio (el hongo)" tam={32} color={KC.yellow} />
      <Etq T={T} at={K.F + 1.0} until={K.Co - 0.3} x={60} y={1540} texto="Armillaria ostoyae" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Co + 1.2} until={K.R - 0.2} x={720} y={1080} texto="cordón negro" tam={32} />
      <Etq T={T} at={K.R + 0.6} until={K.P - 0.2} x={700} y={1080} texto="raíz muerta" tam={32} color={KC.coral} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ca - 0.3} anio="2003" quien="Ferguson et al. · Oregón, EE. UU." revista="Can. J. For. Res. · bosque Malheur" y={830} />
      <Chip T={T} at={K.Ca + 0.3} until={K.N - 0.3} texto="muestra contra muestra" y={500} x={360} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Fu + 0.8} until={K.N - 0.3} texto="se fusionan: mismo" x={290} y={1140} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Fu + 1.6} until={K.N - 0.3} texto="hueco: otro individuo" x={790} y={1140} tam={30} borde={KC.red} />
      <NumeroGigante T={T} at={K.N + 0.3} until={K.Ed - 0.3} valor={965} dur={1.2} sufijo=" ha" etiqueta="un solo individuo" y={430} tam={170} />
      <Chip T={T} at={K.N + 1.6} until={K.N + 3.2} texto="1 cuadrito = 1 cancha de 105 × 68 m" y={585} tam={32} borde={KC.mint} />
      {kvisible(T, K.N + 1.4, K.Ed - 0.4, 0) && <Contador T={T} at={K.N + 1.4} desde={0} hasta={1351} dur={3.2} sufijo=" canchas" x={540} y={1110} tam={46} color={KC.yellow} />}
      <Chip T={T} at={K.N + 3.4} until={K.Ed - 0.3} texto="uno de los seres vivos más grandes" y={588} tam={34} borde={KC.yellow} />
      <div style={{ position:'absolute', left:0, right:0, top:400, zIndex:42, textAlign:'center', opacity:kprog(T, K.Ed + 2.2, K.Ed + 2.6) * (1 - kprog(T, K.O - 0.3, K.O)) }}>
        <span style={{ font:`400 110px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>{kformato(Math.round(klerp(0, 1900, kprog(T, K.Ed + 2.2, K.Ed + 3.0))))} – {kformato(Math.round(klerp(0, 8650, kprog(T, K.Ed + 2.6, K.Ed + 3.8))))}</span>
        <div style={{ font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>años (estimado)</div>
      </div>
      <Chip T={T} at={K.O + 0.5} until={K.B - 0.3} texto="¿sigue unido? no se sabe" y={1110} tam={40} borde={KC.coral} />
      <Chip T={T} at={K.O + 1.6} until={K.B - 0.3} texto="genes: 1 individuo" y={470} x={420} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.B + 1.2} until={K.C - 0.3} x={150} y={1110} texto="hilos de Armillaria que brillan" tam={32} color="#b6ff8f" />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="un solo gigante" y={470} x={330} tam={40} borde={KC.yellow} />

      {/* barra de escala de cada escena */}
      <BarraEscala T={T} at={K.G} until={K.P} texto="5 m" largo={160} />
      <BarraEscala T={T} at={K.Ca} until={K.N} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Ed} until={K.B} texto="1 km" largo={144} />
      <BarraEscala T={T} at={K.B} until={K.C} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="No son cientos: *puede ser uno solo.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Co - 0.1} texto="La seta es el fruto: *el hongo vive abajo.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.R - 0.1} texto="Cordones negros *entran por la raíz.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.P - 0.1} texto="Se come la raíz: *el árbol muere.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cómo sabes que *es uno solo?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.Ca - 0.1} texto="2003: *un bosque de Oregón.*" />
      <Subtitulo T={T} idx={6} at={K.Ca + 0.1} until={K.Fu - 0.1} texto="112 muestras, *frente a frente.*" />
      <Subtitulo T={T} idx={7} at={K.Fu + 0.1} until={K.N - 0.1} texto="Si se fusionan, *es el mismo.*" />
      <Subtitulo T={T} idx={8} at={K.N + 0.1} until={K.Ed - 0.1} texto="965 hectáreas: *+1,300 canchas.*" />
      <Subtitulo T={T} idx={9} at={K.Ed + 0.1} until={K.O - 0.1} texto="Entre *1,900 y 8,650 años.*" />
      <Subtitulo T={T} idx={10} at={K.O + 0.1} until={K.B - 0.1} texto="¿Unido? No se sabe. *Genes: uno.*" />
      <Subtitulo T={T} idx={11} at={K.B + 0.1} until={K.C - 0.1} texto="Sus hilos *brillan en la oscuridad.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Frutos de *un gigante escondido.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Co + 0.4, K.P - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.E + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 0.9, K.Ca + 2.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Fu + 0.3, K.N + 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ed - 0.2, K.Ed + 2.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.O + 0.3, K.B - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.B + 0.3, K.C - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.5, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="05" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArmillariaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Armillaria /></CompositionStage></div>;
}
window.ArmillariaApp = ArmillariaApp;
