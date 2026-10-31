// Shot IA #09 · El detector de IA que acusa a quien escribe sencillo — NARRADO (N2 "El número" + N4 "La imagen que se llena").
// Datos: Liang, Yuksekgonul, Mao, Wu y Zou, "GPT detectors are biased against non-native English writers", Patterns 4(7):100779 (2023). Ver guion.md y verificacion.md.
const AZUL = '#2f6dff';

// Hoja de ensayo con renglones "a mano", sello rojo "IA" (sello 0..1) que se tacha (tacha 0..1).
function Ensayo({ x, y, s = 1, sello = 0, tacha = 0, seed = 2 }) {
  const r = krng(seed);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-280} width={420} height={560} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    <line x1={-160} y1={-280} x2={-160} y2={280} stroke={KC.pink} strokeWidth={4} opacity=".6" />
    <text x={-130} y={-200} style={{ font:`italic 700 46px ${KF.mono}` }} fill="#2b3a8a">My essay</text>
    {Array.from({ length: 9 }, (_, i) => { const yy = -130 + i * 44, l = 230 + r() * 80; let d = `M -130 ${yy}`; for (let k = 0; k < 10; k++) d += ` q ${l / 20} ${-6 - r() * 6} ${l / 10} 0`;
      return <path key={i} d={d} stroke="#2b3a8a" strokeWidth={4} fill="none" opacity=".75" />; })}
    {sello > 0 && <g transform={`translate(70 40) rotate(-14) scale(${klerp(2.2, 1, sello)})`} opacity={Math.min(1, sello * 2)}>
      <rect x={-120} y={-62} width={240} height={124} rx={18} fill="rgba(255,59,47,.12)" stroke={KC.red} strokeWidth={10} />
      <text y={36} textAnchor="middle" style={{ font:`400 104px ${KF.titulo}` }} fill={KC.red}>IA</text>
      {tacha > 0 && <line x1={-140} y1={50} x2={-140 + 280 * tacha} y2={-50} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />}
    </g>}
  </g>;
}
// Escáner/detector esquemático.
function Escaner({ x, y, s = 1, T = 0, pantalla = '', color = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-120} width={300} height={240} rx={26} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-92} width={240} height={150} rx={14} fill="#0d1424" />
    <rect x={-120} y={-92 + ((T * 120) % 150)} width={240} height={6} fill={color} opacity=".7" />
    <text y={6} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={color}>{pantalla}</text>
    <circle cx={-100} cy={90} r={12} fill={KC.red} /><circle cx={-64} cy={90} r={12} fill={KC.yellow} /><circle cx={-28} cy={90} r={12} fill={KC.mint} />
  </g>;
}
// Barras horizontales con decimales (o texto en lugar del número).
function BarrasH({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 38px ${KF.texto}`, color:f.tinta || KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 700 * f.valor / 100 * g), height:76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 70px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{f.texto || `${kformato(f.valor * g, 1)} %`}</div>
        </div>
      </div>; })}
  </div>;
}
// Cuadrícula de 91 hojitas: rojas = marcadas por al menos un detector; oscuras = por los siete.
function Hojitas({ T, rojas, negras, x = 95, y = 660 }) {
  const cols = 16, out = [];
  for (let i = 0; i < 91; i++) { const c = i % cols, rr = Math.floor(i / cols), px = x + c * 56, py = y + rr * 76;
    const roja = i < rojas, negra = i < negras;
    out.push(<g key={i} transform={`translate(${px} ${py})`}>
      <rect width={42} height={56} rx={6} fill={negra ? '#3a0d0b' : roja ? KC.red : '#fffdf6'} stroke={KC.ink} strokeWidth={4} />
      {[13, 25, 37].map((ly) => <line key={ly} x1={8} y1={ly} x2={34} y2={ly} stroke={negra ? KC.red : roja ? '#ffd0cc' : '#2b3a8a'} strokeWidth={3} opacity=".7" />)}
    </g>); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{out}</svg>;
}
// Tarjeta de cita con texto que se acomoda en varias líneas.
function Cita({ T, at, until, texto, quien, y = 1000 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:90, right:90, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'22px 34px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ font:`900 46px/1.2 ${KF.texto}`, color:KC.ink }}>{texto}</div>
    <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:12 }}>{quien}</div>
  </div>;
}
// Birrete.
function Birrete({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2) * 5;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -120 40 L -120 110 Q 0 160 120 110 L 120 40 Z" fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -60 L 230 30 L 0 120 L -230 30 Z" fill="#2b2b33" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <line x1={0} y1={30} x2={170} y2={60} stroke={KC.yellow} strokeWidth={8} /><line x1={170} y1={60} x2={170} y2={150} stroke={KC.yellow} strokeWidth={8} />
    <circle cx={170} cy={160} r={16} fill={KC.yellow} />
  </g>;
}
// Sombrero de copa (para el robotito "literario").
function Copa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-10} width={300} height={30} rx={12} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    <rect x={-95} y={-170} width={190} height={170} rx={10} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    <rect x={-95} y={-50} width={190} height={26} fill={KC.pink} />
  </g>;
}

function Detectores() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nativos, E: CUES.Estudio, M: CUES.Marcas, P: CUES.Pregunta, Pr: CUES.Predecible, Pu: CUES.Prueba, Tr: CUES.Trampa, R: CUES.Riesgo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const rojas = Math.round(89 * kprog(T, K.M + 0.3, K.M + 3.0, kEase.suave)), negras = Math.round(18 * kprog(T, K.M + 3.6, K.M + 5.2, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu ensayo con sello de IA */}
      <Escena T={T} a={K.G} b={K.N}>
        <FondoLunares color={KC.yellow} />
        {svg(<Ensayo x={360} y={890} s={0.95} sello={kprog(T, K.G + 0.35, K.G + 0.75, kEase.sale)} />)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 3.6} until={K.N - 0.2} valor={61.3} dec={1} dur={1.0} sufijo=" %" etiqueta="" x={800} y={1010} tam={120} color={KC.red} />
      <Chip T={T} at={K.G + 4.2} until={K.N - 0.2} texto="inglés no nativo → «IA»" x={800} y={870} tam={32} borde={KC.red} />
      {/* 2 · los nativos */}
      <Escena T={T} a={K.N} b={K.E}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <BarrasH T={T} at={K.N + 0.3} until={K.E - 0.2} filas={[{ valor: 61.3, etiqueta: 'no nativos (examen TOEFL)', color: KC.red }, { valor: 0, texto: 'casi nunca', etiqueta: 'nativos (8.º grado, EE. UU.)', color: AZUL, at: K.N + 1.6 }]} />
      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.M}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 7 }, (_, i) => <g key={i} opacity={kprog(T, K.E + 1.4 + i * 0.15, K.E + 1.7 + i * 0.15)}><Escaner x={120 + i * 140} y={990} s={0.4} T={T + i} /></g>)}</>)}
      </Escena>
      {/* 4 · las 91 hojas se marcan */}
      <Escena T={T} a={K.M} b={K.P}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <Hojitas T={T} rojas={rojas} negras={negras} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pr} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6 · qué tan predecible */}
      <Escena T={T} a={K.Pr} b={K.Pu}>
        <FondoCircuito T={T} />
      </Escena>
      <Chip T={T} at={K.Pr + 1.2} until={K.Pu - 0.2} texto="The food is very good." x={540} y={560} tam={44} mono borde={KC.red} />
      <Medidor T={T} at={K.Pr + 1.5} until={K.Pu - 0.2} y={640} etiqueta="frase sencilla" color={KC.red} valor={(t) => 0.88 * kprog(t, K.Pr + 1.6, K.Pr + 2.6, kEase.sale)} texto={(v) => v > 0.6 ? 'muy predecible → «IA»' : ''} />
      <Chip T={T} at={K.Pr + 3.2} until={K.Pu - 0.2} texto="The soup tasted like rain." x={540} y={880} tam={44} mono borde={KC.mint} />
      <Medidor T={T} at={K.Pr + 3.5} until={K.Pu - 0.2} y={960} etiqueta="frase rebuscada" color={KC.mint} valor={(t) => 0.3 * kprog(t, K.Pr + 3.6, K.Pr + 4.6, kEase.sale)} texto={(v) => v > 0.2 ? 'poco predecible → «humano»' : ''} />
      <Chip T={T} at={K.Pr + 3.8} until={K.Pu - 0.2} texto="ejemplo ilustrativo" x={540} y={1130} tam={28} borde={KC.texto} />
      {/* 7 · la prueba: palabras más rebuscadas */}
      <Escena T={T} a={K.Pu} b={K.Tr}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <Chip T={T} at={K.Pu + 0.3} until={K.Tr - 0.2} texto="falsos «IA» · promedio de 7 detectores" x={660} y={560} tam={32} borde={KC.ink} />
      <BarrasH T={T} at={K.Pu + 0.6} until={K.Tr - 0.2} top={680} filas={[{ valor: 61.3, etiqueta: 'ensayos originales', color: KC.red }, { valor: 11.6, etiqueta: 'con palabras más rebuscadas', color: KC.mint, at: K.Pu + 2.6 }]} />
      <Chip T={T} at={K.Pu + 3.2} until={K.Tr - 0.2} texto="(las palabras las cambió ChatGPT)" x={540} y={1060} tam={32} borde={KC.ink} />
      {/* 8 · al revés: ChatGPT "literario" se escapa */}
      <Escena T={T} a={K.Tr} b={K.R}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Robotito x={300} y={960} s={0.95} T={T} cara="seguro" />
          <g opacity={kprog(T, K.Tr + 0.3, K.Tr + 0.7)}><Copa x={300} y={780 + Math.sin(T * 3) * 6} s={0.8} /></g>
          <Escaner x={790} y={940} s={0.95} T={T} pantalla={T > K.Tr + 2.0 ? 'humano ✔' : '¿IA?'} color={T > K.Tr + 2.0 ? KC.mint : KC.cyan} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Tr + 0.6} until={K.R - 0.2} texto="«con lenguaje literario»" x={330} y={620} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Tr + 2.6} until={K.R - 0.2} texto="detección: casi cero" x={790} y={1140} tam={40} borde={KC.red} />
      {/* 9 · el riesgo */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<Birrete x={560} y={640} s={1.1} T={T} />)}
      </Escena>
      <Cita T={T} at={K.R + 1.0} until={K.C - 0.2} y={1000} texto="Los autores recomiendan no usar estos detectores para evaluar estudiantes, sobre todo si el inglés no es su idioma." quien="Liang et al., Patterns (2023)" />
      {/* 10 · cierre: el mismo ensayo */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<Ensayo x={360} y={890} s={0.95} sello={1} tacha={kprog(T, K.C + 2.2, K.C + 2.7, kEase.sale)} />)}
      </Escena>
      <Chip T={T} at={K.C + 2.8} until={K.Ou} texto="escrito por ti ✔" x={800} y={800} tam={46} borde={KC.leaf} />

      {/* otros textos */}
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.M - 0.3} anio="2023" quien="Universidad de Stanford" revista="Liang, Yuksekgonul, Mao, Wu y Zou · Patterns" y={650} />
      <Chip T={T} at={K.E + 2.6} until={K.M - 0.3} texto="7 detectores · 91 ensayos TOEFL" y={1130} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.3} until={K.M + 3.4} texto={`al menos 1 detector: ${rojas} de 91`} x={420} y={440} tam={38} borde={KC.red} />
      <Chip T={T} at={K.M + 3.5} until={K.P - 0.2} texto={`los 7 a la vez: ${negras} de 91`} x={420} y={440} tam={38} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Lo escribiste tú… *y el detector dice «IA».*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.E - 0.1} texto="Con nativos: *casi nunca.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.M - 0.1} texto="Stanford, 2023: *7 detectores, 91 ensayos.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.P - 0.1} texto="Al menos uno: *98 %.* Los siete: *1 de 5.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Pr - 0.1} texto="¿Por qué *justo contigo?*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Pu - 0.1} texto="Texto predecible: *«parece IA».*" />
      <Subtitulo T={T} idx={6} at={K.Pu + 0.1} until={K.Tr - 0.1} texto="Palabras rebuscadas: *de 61 a 12 %.*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.R - 0.1} texto="ChatGPT «literario»: *casi no lo detectan.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.C - 0.1} texto="No usarlos *para evaluar estudiantes.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Escribir sencillo *no es hacer trampa.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Nativos + 1.5, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Marcas - 0.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Marcas + 2.5, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Predecible + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Prueba + 1.5, CUES.Trampa - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Trampa + 0.5, CUES.Riesgo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Riesgo + 0.5, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function DetectoresApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Detectores /></CompositionStage></div>;
}
window.DetectoresApp = DetectoresApp;
