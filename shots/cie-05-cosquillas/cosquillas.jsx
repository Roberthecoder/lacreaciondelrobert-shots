// Shot Científico #05 · Por qué no te puedes hacer cosquillas — NARRADO (N5 "El experimento" + N1).
// Datos: Blakemore, Frith y Wolpert 1999 (J Cogn Neurosci, robots), Blakemore, Wolpert y Frith 1998 (Nat Neurosci, cerebelo) y 2000 (Neuroreport),
// Ishiyama y Brecht 2016 (Science) e Ishiyama, Kaufmann y Brecht 2019 (Curr Biol) con ratas. Ver guion.md y verificacion.md.
const PIEL = '#f1b48f', PIEL2 = '#d98f6b', OTRA = '#9a6a4a';

function Pie({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -80 -230 Q -130 -120 -110 20 Q -100 160 -60 250 Q 0 320 60 250 Q 100 160 100 0 Q 110 -140 70 -230 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    {[[-70, -275, 32], [-15, -295, 26], [33, -290, 24], [72, -270, 22], [100, -235, 20]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={PIEL} stroke={KC.ink} strokeWidth={7} />)}
    <path d="M -40 40 Q 0 70 40 40" stroke={PIEL2} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
// Mano que hace cosquillas: dedos que se menean. vel = qué tan rápido se mueven.
function ManoCosq({ x, y, s = 1, T, color = PIEL, rot = 0, vel = 14 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-66, -22, 22, 66].map((dx, i) => <rect key={i} x={dx - 19} y={-10} width={38} height={150} rx={19} fill={color} stroke={KC.ink} strokeWidth={7}
      transform={`rotate(${Math.sin(T * vel + i * 1.3) * 14} ${dx} -10)`} />)}
    <rect x={-100} y={-160} width={200} height={170} rx={60} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-330} width={120} height={190} rx={20} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Cerebro de lado con el cerebelo (abajo a la derecha). glow 0..1 resalta el cerebelo.
function Cerebro({ x, y, s = 1, glow = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 40 Q -330 -160 -150 -230 Q 0 -300 150 -240 Q 320 -170 300 0 Q 290 90 200 110 L -200 120 Q -290 110 -300 40 Z" fill="#f7a8c4" stroke={KC.ink} strokeWidth={9} />
    {[[-200, -120, -80, -60], [-60, -200, 40, -110], [90, -170, 200, -60], [-230, 20, -90, 60], [10, -40, 140, 40]].map(([a, b, c, d], i) =>
      <path key={i} d={`M ${a} ${b} Q ${(a + c) / 2 + 30} ${(b + d) / 2 - 40} ${c} ${d}`} stroke="#c45a86" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <path d="M 60 120 L 90 260 L 140 260 L 130 120 Z" fill="#f7a8c4" stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(220 150)">
      {glow > 0 && <ellipse rx={150} ry={100} fill={KC.yellow} opacity={0.45 * glow * (0.7 + 0.3 * Math.sin(T * 6))} />}
      <ellipse rx={115} ry={72} fill={glow > 0.5 ? '#ffd166' : '#e98fb2'} stroke={KC.ink} strokeWidth={8} />
      {[-40, -10, 20, 50].map((dy, i) => <path key={i} d={`M -95 ${dy * 0.9} Q 0 ${dy * 0.9 + 18} 95 ${dy * 0.9}`} stroke="#b0517a" strokeWidth={5} fill="none" />)}
    </g>
  </g>;
}
// Brazo robótico simple. ang = ángulo del segmento; punta = 'mango' o 'pincel'.
function Robot({ x, y, s = 1, ang = 0, punta = 'mango', color = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-30} width={180} height={60} rx={14} fill="#8a8f99" stroke={KC.ink} strokeWidth={8} />
    <rect x={-22} y={-200} width={44} height={180} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-200} r={30} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <g transform={`translate(0 -200) rotate(${ang})`}>
      <rect x={0} y={-20} width={200} height={40} rx={18} fill={color} stroke={KC.ink} strokeWidth={8} />
      {punta === 'mango' ? <rect x={190} y={-40} width={40} height={80} rx={14} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
        : <g><rect x={190} y={-14} width={50} height={28} rx={8} fill="#c98b4a" stroke={KC.ink} strokeWidth={6} />{[-10, 0, 10].map((d, i) => <path key={i} d={`M 240 ${d} l 50 ${d * 1.6}`} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />)}</g>}
    </g>
  </g>;
}
// Palma de la mano (vista de frente), para el robot que la roza.
function Palma({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-75, -25, 25, 75].map((dx, i) => <rect key={i} x={dx - 22} y={-240 + Math.abs(dx) * 0.4} width={44} height={170} rx={22} fill={PIEL} stroke={KC.ink} strokeWidth={7} />)}
    <rect x={-110} y={-110} width={220} height={220} rx={80} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-30} width={44} height={130} rx={22} transform="rotate(-35 -128 30)" fill={PIEL} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Rata con ondas de ultrasonido (chillidos). ondas 0..1.
function Rata({ x, y, s = 1, ondas = 0, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 150 40 Q 300 60 340 -20" stroke="#e8a0a8" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={170} ry={100} fill="#b9b4ae" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-170} cy={-30} rx={90} ry={66} fill="#b9b4ae" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-150} cy={-110} r={40} fill="#e8a0a8" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-200} cy={-44} r={10} fill={KC.ink} />
    <circle cx={-258} cy={-22} r={14} fill="#e8a0a8" stroke={KC.ink} strokeWidth={5} />
    {ondas > 0 && [0, 1, 2].map((k) => { const u = (T * 1.6 + k / 3) % 1; return <path key={k} d={`M ${-300 - u * 160} ${-120 - u * 60} q ${-50} ${100} 0 ${200}`} stroke={KC.yellow} strokeWidth={10} fill="none" opacity={ondas * (1 - u)} strokeLinecap="round" />; })}
  </g>;
}

function Cosquillas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Pd: CUES.Prediccion, V: CUES.Volumen, M: CUES.Menos, Q: CUES.Pregunta, E: CUES.Estudio, R: CUES.Robots, Co: CUES.Copia, Re: CUES.Retraso, Ce: CUES.Cerebelo, Ra: CUES.Ratas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const vol = 1 - 0.75 * kprog(T, K.V + 0.6, K.V + 2.4, kEase.suave);
  const ang = Math.sin(T * 2.4) * 25;
  const retraso = kprog(T, K.Re + 0.3, K.Re + 4.0, kEase.suave);
  const otra = kprog(T, K.C + 3.0, K.C + 3.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu mano en tu pie, y el medidor no sube */}
      <Escena T={T} a={K.G} b={K.Pd}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Pie x={330} y={980} s={1.2} rot={-8} /><ManoCosq x={500} y={760} s={0.9} T={T} rot={35} /></>)}
      </Escena>
      {/* 2 · el cerebro predice */}
      <Escena T={T} a={K.Pd} b={K.V}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cerebro x={420} y={820} s={1} />
          <g transform={`translate(780 560) scale(${kprog(T, K.Pd + 0.6, K.Pd + 1.1, kEase.rebote)})`}>
            <circle cx={-120} cy={120} r={16} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={-80} cy={70} r={24} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            <ellipse cx={20} cy={-30} rx={170} ry={120} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <text x={20} y={-50} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>"voy a sentir</text>
            <text x={20} y={0} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>esto"</text>
          </g>
        </>)}
      </Escena>
      {/* 3 · le baja el volumen */}
      <Escena T={T} a={K.V} b={K.M}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g transform="translate(330 850)">
            <path d="M -120 -60 L -40 -60 L 60 -150 L 60 150 L -40 60 L -120 60 Z" fill={KC.paper} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
            {[0, 1, 2].map((k) => <path key={k} d={`M ${110 + k * 60} -${90 + k * 40} Q ${170 + k * 70} 0 ${110 + k * 60} ${90 + k * 40}`} stroke={KC.ink} strokeWidth={12} fill="none" strokeLinecap="round" opacity={vol > (k + 1) / 3.2 ? 1 : 0.12} />)}
          </g>
          <rect x={800} y={560} width={60} height={560} rx={30} fill="rgba(0,0,0,.25)" stroke={KC.ink} strokeWidth={8} />
          <rect x={800} y={560 + 560 * (1 - vol)} width={60} height={560 * vol} rx={30} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
          <circle cx={830} cy={560 + 560 * (1 - vol)} r={56} fill="#fff" stroke={KC.ink} strokeWidth={9} />
        </>)}
      </Escena>
      {/* 4 · menos intenso, menos cosquilludo, menos agradable */}
      <Escena T={T} a={K.M} b={K.Q}>
        <FondoLunares color={KC.pink} />
        {svg(<ManoCosq x={540} y={950} s={0.8} T={T} rot={0} vel={6} />)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Q} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 6 · el estudio */}
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.orange} />
      </Escena>
      {/* 7–9 · los dos robots: copia al instante, luego con retraso */}
      <Escena T={T} a={K.R} b={K.Ce}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Robot x={230} y={1030} s={0.9} ang={-30 + ang} punta="mango" />
          <path d={`M 300 1030 C 420 1070 620 1070 680 1030`} stroke={KC.ink} strokeWidth={8} fill="none" strokeDasharray="20 12" strokeDashoffset={-T * 60} />
          <Robot x={760} y={1030} s={0.9} ang={-150 - (T > K.Re ? Math.sin((T - 0.5 * retraso) * 2.4) * 25 : ang) + 0} punta="pincel" color={KC.mint} />
          <Palma x={700} y={630} s={0.7} />
          <text x={230} y={1120} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>robot 1: lo mueves tú</text>
          <text x={760} y={1120} textAnchor="middle" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>robot 2: roza tu palma</text>
        </>)}
      </Escena>
      {/* 10 · el cerebelo */}
      <Escena T={T} a={K.Ce} b={K.Ra} fondo={KC.noche}>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.18)" />
        {svg(<Cerebro x={480} y={860} s={1.05} glow={kprog(T, K.Ce + 1.0, K.Ce + 1.8)} T={T} />)}
        <Etq T={T} at={K.Ce + 1.4} until={K.Ra - 0.3} x={560} y={1150} texto="cerebelo" lado="der" color={KC.yellow} tam={40} />
      </Escena>
      {/* 11 · las ratas */}
      <Escena T={T} a={K.Ra} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Rata x={600} y={900} s={1} ondas={T < K.Ra + 3.2 ? 1 : 0} T={T} />
          {T < K.Ra + 3.2 ? <ManoCosq x={600} y={640} s={0.6} T={T} rot={0} /> : <g transform="translate(860 640)"><circle r={60} fill="#fff" stroke={KC.ink} strokeWidth={7} /><path d="M -30 -30 L 30 30 M 30 -30 L -30 30" stroke={KC.red} strokeWidth={12} strokeLinecap="round" /></g>}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo pie; tu mano no sube el medidor, otra mano sí */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<><Pie x={330} y={980} s={1.2} rot={-8} />
          {otra < 1 && <g opacity={1 - otra}><ManoCosq x={500} y={760} s={0.9} T={T} rot={35} /></g>}
          {otra > 0 && <g opacity={otra}><ManoCosq x={500} y={760} s={0.9} T={T} rot={35} color={OTRA} vel={20} /></g>}</>)}
      </Escena>
      {(T < K.Pd || T >= K.C) && <Escala T={T} z={1} pxPorMm={2.5} y={1400} x={60} />}

      {/* datos */}
      <Chip T={T} at={K.G + 0.3} until={K.Pd - 0.2} texto="inténtalo" x={300} y={440} tam={48} borde={KC.ink} />
      <Medidor T={T} at={K.G + 0.2} until={K.Pd - 0.2} valor={0.08 + 0.04 * Math.sin(T * 7)} etiqueta="cosquillas" texto={() => 'casi nada'} y={1500} color={KC.pink} />
      <Chip T={T} at={K.Pd + 1.6} until={K.V - 0.2} texto="predicción" x={420} y={1140} tam={42} borde={KC.cyan} />
      <Chip T={T} at={K.V + 0.4} until={K.M - 0.2} texto="toque esperado → volumen bajo" x={540} y={440} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.M + 0.4} until={K.Q - 0.2} texto="↓ menos intenso" x={540} y={470} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.M + 1.4} until={K.Q - 0.2} texto="↓ menos cosquilludo" x={540} y={590} tam={44} borde={KC.pink} />
      <Chip T={T} at={K.M + 2.4} until={K.Q - 0.2} texto="↓ menos agradable" x={540} y={710} tam={44} borde={KC.pink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.R - 0.3} anio="1999" quien="Londres (UCL)" revista="Blakemore, Frith y Wolpert" x={620} y={820} />
      <Medidor T={T} at={K.Co + 0.2} until={K.Ce - 0.3} valor={T < K.Re ? 0.12 + 0.03 * Math.sin(T * 7) : 0.12 + 0.7 * retraso} etiqueta="cosquillas" texto={() => (T < K.Re ? 'como tu propio toque' : 'regresan')} y={1500} color={KC.pink} />
      <Chip T={T} at={K.Co + 0.3} until={K.Re - 0.1} texto="retraso: 0" x={540} y={440} tam={42} borde={KC.ink} mono />
      <Chip T={T} at={K.Re + 0.2} until={K.Ce - 0.3} texto="retraso o desvío ↑" x={540} y={440} tam={42} borde={KC.red} mono />
      <Chip T={T} at={K.Ce + 2.6} until={K.Ra - 0.3} texto="predice y apaga la sensación" x={540} y={460} tam={38} borde={KC.yellow} />
      <Chip T={T} at={K.Ra + 0.4} until={K.Ra + 3.1} texto="cosquillas: chillan (ultrasonido)" x={540} y={1100} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.Ra + 3.3} until={K.C - 0.3} texto="se tocan solas: silencio" x={540} y={1100} tam={40} borde={KC.red} />
      <Medidor T={T} at={K.C + 0.4} until={K.Ou - 0.1} valor={0.1 + 0.03 * Math.sin(T * 7) + 0.75 * otra} etiqueta="cosquillas" texto={() => (otra > 0.5 ? 'otra persona' : 'tu mano')} y={1500} color={KC.pink} />
      <Chip T={T} at={K.C + 3.2} until={K.Ou - 0.1} texto="necesitas a alguien más" x={400} y={440} tam={40} borde={KC.gold} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Pd - 0.1} texto="¿Cosquillas tú solo? *No puedes.*" />
      <Subtitulo T={T} idx={1} at={K.Pd + 0.1} until={K.V - 0.1} texto="Tu cerebro *predice el toque.*" />
      <Subtitulo T={T} idx={2} at={K.V + 0.1} until={K.M - 0.1} texto="Si acierta, *le baja el volumen.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.Q - 0.1} texto="Tu toque: *menos intenso.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.E - 0.1} texto="¿Y si *lo engañas?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.R - 0.1} texto="Londres, 1999: *dos robots.*" />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Co - 0.1} texto="Tú mueves uno, *el otro te roza.*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.Re - 0.1} texto="Al instante: *como tu propio toque.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.Ce - 0.1} texto="Con retraso: *regresan las cosquillas.*" />
      <Subtitulo T={T} idx={9} at={K.Ce + 0.1} until={K.Ra - 0.1} texto="El cerebelo *predice y apaga.*" />
      <Subtitulo T={T} idx={10} at={K.Ra + 0.1} until={K.C - 0.1} texto="Ratas: *solas, no chillan.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Necesitas *a alguien más.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_03_aburrido_manos_mejillas', 'gancho'],
        [CUES.Volumen + 0.3, CUES.Menos - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Menos + 3.2, CUES.Pregunta - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Robots + 2.6, CUES.Copia - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Retraso + 0.6, CUES.Cerebelo - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cerebelo + 0.3, CUES.Cerebelo + 2.4, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Ratas + 0.4, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_11_sorprendido', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="05" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CosquillasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cosquillas /></CompositionStage></div>;
}
window.CosquillasApp = CosquillasApp;
