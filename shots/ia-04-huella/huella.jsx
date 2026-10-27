// Shot IA #04 · Lo que costó entrenar una IA: Llama 3 — NARRADO (N2 "El número").
// Cifras de la ficha oficial de Llama 3 (Meta, abril 2024): 7.7 M horas de GPU H100 (TDP 700 W), 2,290 t CO2eq (70B: 1,900 · 8B: 390),
// 100 % compensado por Meta, más de 15 billones (trillion) de tokens. 7,700,000 h ÷ 8,766 h/año = 878 años ("casi 880"). Ver guion.md.
// La llama del dibujo es solo un guiño al nombre del modelo (no es el logo de Meta).
const H_ANIO = 24 * 365.25;

function Llamita({ x, y, s = 1, T = 0 }) {
  const m = Math.sin(T * 2.5) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-70, -30, 40, 80].map((lx, i) => <rect key={i} x={lx} y={40} width={30} height={120} rx={12} fill="#f4e6cf" stroke={KC.ink} strokeWidth={7} />)}
    <ellipse cx={0} cy={30} rx={130} ry={80} fill="#f4e6cf" stroke={KC.ink} strokeWidth={8} />
    <g transform={`rotate(${m} 90 -10)`}>
      <rect x={70} y={-170} width={60} height={190} rx={28} fill="#f4e6cf" stroke={KC.ink} strokeWidth={8} />
      <ellipse cx={120} cy={-170} rx={58} ry={40} fill="#f4e6cf" stroke={KC.ink} strokeWidth={8} />
      <path d="M 82 -200 l -6 -46 l 22 34 M 112 -206 l 2 -46 l 14 40" fill="#f4e6cf" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={128} cy={-178} r={8} fill={KC.ink} /><path d="M 158 -160 q 10 6 0 12" stroke={KC.ink} strokeWidth={5} fill="none" />
    </g>
    <path d="M -130 20 q -30 -10 -24 -40" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Calendario que pasa años (contador).
function Calendario({ x, y, anio, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-120} width={300} height={260} rx={24} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-120} width={300} height={70} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    {[-90, 90].map((a) => <rect key={a} x={a - 10} y={-145} width={20} height={50} rx={8} fill={KC.ink} />)}
    <text x={0} y={70} textAnchor="middle" style={{ font:`400 120px ${KF.titulo}` }} fill={KC.ink}>{Math.floor(anio)}</text>
    <text x={0} y={-68} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff">AÑOS</text>
  </g>;
}
// Nube de CO2.
function Nube({ x, y, s = 1, o = 1, texto = 'CO₂' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -110 30 a 50 50 0 0 1 20 -90 a 70 70 0 0 1 130 -10 a 55 55 0 0 1 70 80 a 40 40 0 0 1 -30 50 Z" fill="#6b7180" stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={22} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill="#fff">{texto}</text>
  </g>;
}
function Arbol({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={80} fill="#8a5a2b" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-30} r={60} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Huella() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ll: CUES.Llama, H: CUES.Horas, Mu: CUES.Muchas, W: CUES.Watts, P: CUES.Pregunta, Co: CUES.CO2, Gr: CUES.Grande, Cm: CUES.Compensa, O: CUES.Ojo, Le: CUES.Leyo, Ex: CUES.Extra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const anios = 7.7e6 / H_ANIO;   // 878.4
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: una sola tarjeta y el calendario que corre hasta ~880 años */}
      <Escena T={T} a={K.G} b={K.Ll} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <TarjetaGPU T={T} x={380} y={990} s={1.25} calor={kprog(T, K.G + 1, K.G + 5)} />
          <Calendario x={380} y={650} anio={anios * kprog(T, K.G + 0.1, K.G + 5.5, kEase.suave)} s={1.0} />
        </>)}
      </Escena>
      {/* 2 · Llama 3, de Meta, abril de 2024 */}
      <Escena T={T} a={K.Ll} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<Llamita x={480} y={1000} s={1.6} T={T} />)}
      </Escena>
      {/* 3–5 · horas, muchas tarjetas, watts (fondo noche: dentro del centro de datos) */}
      <Escena T={T} a={K.H} b={K.P} zoom={0.03}>
        <FondoCircuito T={T} color={KC.orange} />
        {svg(<>
          {T < K.Mu && <TarjetaGPU T={T} x={540} y={1010} s={1.2} calor={0.4} />}
          {T >= K.Mu && Array.from({ length: 24 }, (_, i) => { const c = i % 4, r = Math.floor(i / 4), at = K.Mu + 0.2 + i * 0.06;
            return T > at ? <TarjetaGPU key={i} T={T + i * 0.1} x={170 + c * 245} y={600 + r * 110} s={0.5 * kprog(T, at, at + 0.3, kEase.rebote)} calor={kprog(T, K.W + 0.3, K.W + 1.6)} etiqueta="" /> : null; })}
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 7–8 · CO2: nubes que se apilan y la comparación grande / chico */}
      <Escena T={T} a={K.Co} b={K.Cm}>
        <FondoLunares color={KC.cyan} />
        {T < K.Gr && svg(Array.from({ length: 9 }, (_, i) => { const at = K.Co + 0.4 + i * 0.25; return T > at ? <Nube key={i} x={220 + (i % 3) * 320} y={klerp(1150, 720 + Math.floor(i / 3) * 150, kprog(T, at, at + 0.8, kEase.sale)) + Math.sin(T + i) * 10} s={0.95} /> : null; }))}
      </Escena>
      {/* 9–10 · compensar no es no emitir: báscula con nube y árboles */}
      <Escena T={T} a={K.Cm} b={K.Le}>
        <FondoLunares color={KC.yellow} />
        {svg((() => { const inc = T < K.O ? -6 * kprog(T, K.Cm + 0.6, K.Cm + 2) : -6 + 6 * kprog(T, K.O + 0.3, K.O + 1.2); const sube = kprog(T, K.O + 1.0, K.O + 3.5, kEase.suave);
          return <>
            <path d="M 540 1150 L 480 1230 L 600 1230 Z" fill={KC.ink} />
            <g transform={`rotate(${inc} 540 860)`}>
              <rect x={140} y={850} width={800} height={20} rx={10} fill={KC.ink} />
              <line x1={540} y1={860} x2={540} y2={1150} stroke={KC.ink} strokeWidth={14} />
              <Nube x={270} y={klerp(780, 640, sube)} s={1.0} />
              {[0, 1, 2].map((k) => <Arbol key={k} x={720 + k * 90} y={760} s={0.75} />)}
            </g>
            {T > K.O + 1.0 && <path d="M 270 760 L 270 700" stroke={KC.red} strokeWidth={10} strokeDasharray="14 10" markerEnd="" opacity={kprog(T, K.O + 1, K.O + 1.4)} />}
          </>; })())}
      </Escena>
      {/* 11 · leyó más de 15 billones de tokens */}
      <Escena T={T} a={K.Le} b={K.Ex}>
        <FondoCircuito T={T} color={KC.mint} />
        {svg(<>
          {Array.from({ length: 26 }, (_, i) => { const t0 = K.Le + 0.2 + i * 0.16, u = (T - t0) / 1.4; if (u < 0 || u > 1) return null;
            return <Ficha key={i} x={klerp(1150, 560, u)} y={klerp(560 + (i % 5) * 130, 980, u)} texto={['el', 'de', 'sol', '##mente', 'the', 'y', 'agua', 'la'][i % 8]} tam={30} o={1 - u * 0.7} s={1 - u * 0.5} color={[KC.yellow, KC.cyan, KC.mint, KC.pink][i % 4]} />; })}
          <Llamita x={420} y={1040} s={1.0} T={T} />
        </>)}
      </Escena>
      {/* 12 · y cada pregunta después también gasta */}
      <Escena T={T} a={K.Ex} b={K.C}>
        <FondoLunares color={KC.pink} />
        <CelularChat T={T} x={560} y={1000} s={0.8} tam={40} mensajes={[{ at: K.Ex + 0.3, yo: true, texto: '¿Me ayudas con mi tarea?' }, { at: K.Ex + 1.6, yo: false, texto: '¡Claro! …' }]} escribe={[K.Ex + 0.7, K.Ex + 1.6]} />
        {svg([0, 1, 2].map((k) => { const at = K.Ex + 1.7 + k * 0.9; return T > at ? <path key={k} d="M 0 -60 L -30 10 L -4 10 L -24 70 L 34 -14 L 6 -14 L 26 -60 Z" transform={`translate(${880} ${640 + k * 150}) scale(${kprog(T, at, at + 0.3, kEase.rebote)})`} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} /> : null; }))}
      </Escena>
      {/* 13 · cierre: regresa la tarjeta sola del inicio, ahora con la respuesta en pantalla */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <TarjetaGPU T={T} x={380} y={990} s={1.25} calor={1} />
          <Calendario x={380} y={650} anio={anios} s={1.0} />
        </>)}
        <div style={{ position:'absolute', left:620, top:900, width:400, zIndex:30, opacity:kprog(T, K.C + 1.0, K.C + 1.5), background:'#262c3a', color:KC.texto, borderRadius:'28px 28px 28px 6px', padding:'18px 24px', font:`800 36px/1.2 ${KF.texto}`, border:`4px solid ${KC.ink}` }}>¡Claro! Aquí está tu respuesta…</div>
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.Ll - 0.2} texto="1 sola tarjeta de video" x={380} y={430} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Ll + 0.3} until={K.H - 0.2} texto="Llama 3 · Meta · abril 2024" y={470} tam={44} borde={KC.ink} />
      <NumeroGigante T={T} at={K.H + 0.2} until={K.Mu - 0.2} valor={7.7} dec={1} dur={1.0} sufijo=" millones" etiqueta="horas de tarjetas H100" y={720} tam={120} color={KC.orange} />
      <Chip T={T} at={K.Mu + 0.4} until={K.W - 0.2} texto="muchísimas al mismo tiempo" x={380} y={460} tam={42} borde={KC.orange} />
      <Medidor T={T} at={K.W + 0.2} until={K.P - 0.2} valor={(t) => kprog(t, K.W + 0.3, K.W + 1.6)} etiqueta="cada tarjeta, hasta" texto={(v) => Math.round(v * 700) + ' W'} y={440} color={KC.red} />
      <NumeroGigante T={T} at={K.Co + 0.3} until={K.Gr - 0.2} valor={2290} dur={1.6} sufijo=" t" etiqueta="de CO₂ equivalente (Meta, 2024)" y={500} tam={150} color={KC.texto} />
      <Comparativa T={T} at={K.Gr + 0.2} until={K.Cm - 0.2} izq={{ valor: 1900, etiqueta: 'grande (70B)', color: KC.red, texto: '1,900 t' }} der={{ valor: 390, etiqueta: 'chico (8B)', color: KC.yellow, texto: '390 t' }} max={1900} y={560} alto={480} />
      <Chip T={T} at={K.Cm + 0.4} until={K.O - 0.2} texto="«100 % compensado» (según Meta)" y={460} tam={38} borde={KC.leaf} />
      <Chip T={T} at={K.O + 0.4} until={K.Le - 0.2} texto="compensar ≠ no emitir" x={420} y={460} tam={48} borde={KC.red} />
      <NumeroGigante T={T} at={K.Le + 1.6} until={K.Ex - 0.2} valor={15} dur={1.0} prefijo="+" sufijo=" billones" etiqueta="de tokens leídos" y={460} tam={110} color={KC.mint} />
      <Chip T={T} at={K.Ex + 2.4} until={K.C - 0.2} texto="usarla también gasta energía" x={540} y={460} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.C + 0.4} until={K.Ou} texto="≈ 880 años de 1 tarjeta" x={380} y={430} tam={42} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ll - 0.1} texto="Una sola tarjeta: *casi 880 años.*" />
      <Subtitulo T={T} idx={1} at={K.Ll + 0.1} until={K.H - 0.1} texto="Llama 3, de Meta: *abril de 2024.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.Mu - 0.1} texto="7.7 millones *de horas de tarjeta.*" />
      <Subtitulo T={T} idx={3} at={K.Mu + 0.1} until={K.W - 0.1} texto="No una: *muchísimas a la vez.*" />
      <Subtitulo T={T} idx={4} at={K.W + 0.1} until={K.P - 0.1} texto="Cada una: *hasta 700 watts.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Cuánta *contaminación?*" />
      <Subtitulo T={T} idx={6} at={K.Co + 0.1} until={K.Gr - 0.1} texto="Según Meta: *2,290 toneladas de CO₂.*" />
      <Subtitulo T={T} idx={7} at={K.Gr + 0.1} until={K.Cm - 0.1} texto="Grande: *1,900.* Chico: *390.*" />
      <Subtitulo T={T} idx={8} at={K.Cm + 0.1} until={K.O - 0.1} texto="Dice que compensó *el 100 %.*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.Le - 0.1} texto="Compensar *no es no emitir.*" />
      <Subtitulo T={T} idx={10} at={K.Le + 0.1} until={K.Ex - 0.1} texto="Leyó *más de 15 billones de tokens.*" />
      <Subtitulo T={T} idx={11} at={K.Ex + 0.1} until={K.C - 0.1} texto="Cada pregunta *también gasta.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Detrás: *casi 880 años de una tarjeta.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Horas + 1.0, CUES.Muchas - 0.1, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Muchas + 0.6, CUES.Watts - 0.1, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.CO2 + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Grande + 1.2, CUES.Compensa - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Ojo + 0.4, CUES.Leyo - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Leyo + 2.8, CUES.Extra - 0.1, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Extra + 0.5, CUES.Cierre - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="04" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuellaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Huella /></CompositionStage></div>;
}
window.HuellaApp = HuellaApp;
