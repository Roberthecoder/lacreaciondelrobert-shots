// Shot Fungi Mati #06 · El hongo que caza gusanos (Arthrobotrys oligospora) — NARRADO (N5 "El experimento" + viaje N1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (proporciones de la red y del gusano ilustrativas).
const PX_MM = 700;   // microscopio: 1 mm = 700 px (un C. elegans adulto mide ~1 mm de largo y ~100 µm de ancho)
const TRAMPA = { x: 470, y: 800 };

// Fondo de microscopio: oscuro, con hifas tenues alrededor.
function Micro({ T, seed = 4 }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 45% 45%, #18263a 0%, #0b111c 70%)' }}></div>
    <Ambiente T={T} n={26} color="rgba(180,220,255,.18)" />
    {fsvg(<><RedHifas T={T} x={TRAMPA.x - 220} y={TRAMPA.y + 20} g={1} seed={seed} n={200} escala={0.3} ancho={2.5} color="rgba(255,244,214,.35)" circ={true} /></>, 5)}
  </>;
}
// Suelo (macro): cielo con lunares arriba, tierra con piedritas y restos de hojas.
function Suelo({ T, comer = 0, hifas = 0, gusanos = 0 }) {
  const g = krng(3), pied = Array.from({ length: 34 }, () => [g() * KW, 560 + g() * 1300, 14 + g() * 30]);
  return <>
    <FondoLunares color={KC.yellow} />
    {fsvg(<>
      <rect x={0} y={520} width={KW} height={KH} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
      <rect x={0} y={510} width={KW} height={22} fill={FK.pasto} stroke={KC.ink} strokeWidth={6} />
      {pied.map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.7} fill={i % 3 ? '#8a6a4a' : '#a88664'} stroke={KC.ink} strokeWidth={4} />)}
      {[[260, 760], [720, 690], [560, 980]].map(([x, y], i) => <path key={i} d="M -60 0 Q 0 -40 60 0 Q 0 40 -60 0 Z" transform={`translate(${x} ${y}) rotate(${i * 40 - 20}) scale(${1 - comer * 0.55})`} fill="#c0702a" stroke={KC.ink} strokeWidth={5} />)}
      {hifas > 0 && <RedHifas T={T} x={480} y={820} g={hifas} seed={9} n={260} escala={0.2} ancho={3} color={FK.hifa} circ={true} />}
      {gusanos > 0 && [[880, 760, 0], [180, 1000, 2], [800, 1060, 4]].map(([x, y, f], i) => <g key={i} opacity={kprog(gusanos, i * 0.2, i * 0.2 + 0.3)}><Gusano T={T} x={x + Math.sin(T + f) * 20} y={y} largo={130} ancho={12} ang={170 + i * 20} fase={f} /></g>)}
    </>)}
  </>;
}
// Molécula de los gusanos (ascarósido, esquemática): anillo de azúcar + cola.
function Ascarosido({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -20 -12 L 0 -24 L 20 -12 L 20 12 L 0 24 L -20 12 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} />
    <path d="M 20 0 l 14 -10 l 14 10 l 14 -10 l 14 10" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}

function Cazador() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ti: CUES.Tierra, H: CUES.Hambre, R: CUES.Red, P: CUES.Pregunta, E: CUES.Estudio, Es: CUES.Espia, O: CUES.Olor, Pe: CUES.Pega, D: CUES.Digiere, Da: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const llega = kprog(T, K.G, K.G + 2.2, kEase.sale);           // el gusano llega a la trampa
  const atorado = kprog(T, K.G + 2.0, K.G + 2.4);
  const cabezaX = klerp(1150, TRAMPA.x + 40, llega);
  const lleno = kprog(T, K.Pe + 1.0, K.D + 1.6), apagado = kprog(T, K.D + 0.4, K.D + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el gusano llega y se queda pegado en la red */}
      <Escena T={T} a={K.G} b={K.Ti} zoom={0.05} origen="45% 45%">
        <Micro T={T} />
        {fsvg(<>
          <TrampaRed T={T} x={TRAMPA.x} y={TRAMPA.y} s={1.3} r={26} prog={1} gotas={1} />
          <Gusano T={T} x={cabezaX} y={TRAMPA.y + 10} largo={PX_MM} ancho={70} ang={180} ondula={1 - atorado * 0.4} />
        </>, 20)}
      </Escena>
      {/* 2–3 · en la tierra: come restos; le falta comida y aparecen nematodos */}
      <Escena T={T} a={K.Ti} b={K.R} zoom={0.04}>
        <Suelo T={T} comer={kprog(T, K.Ti + 1, K.H)} hifas={kprog(T, K.Ti + 0.3, K.Ti + 4, kEase.suave)} gusanos={kprog(T, K.H + 1.6, K.H + 3.2)} />
      </Escena>
      {/* 4 · la hifa se enrosca: red pegajosa */}
      <Escena T={T} a={K.R} b={K.P} zoom={0.06}>
        <Micro T={T} seed={7} />
        {fsvg(<TrampaRed T={T} x={430} y={860} s={2.2} r={26} prog={kprog(T, K.R + 0.1, K.R + 2.2)} gotas={kprog(T, K.R + 2.0, K.R + 2.8)} />, 20)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 6–7 · el experimento: solo moléculas, sin gusanos → trampas */}
      <Escena T={T} a={K.E} b={K.O}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Petri x={470} y={900} r={240}>
            <RedHifas T={T} x={0} y={0} g={1} seed={12} n={240} escala={0.13} ancho={2.5} color="#e9dcc0" circ={true} />
            {Array.from({ length: 7 }, (_, i) => { const at = K.Es + 0.4 + i * 0.35; const a = i * 0.9 + 0.4, rr = 60 + (i % 3) * 55;
              return T > at ? <TrampaRed key={i} T={T} x={Math.cos(a) * rr} y={Math.sin(a) * rr} s={0.42} r={26} prog={kprog(T, at, at + 0.8)} gotas={kprog(T, at + 0.6, at + 1)} color="#7a4a22" /> : null; })}
          </Petri>
          {Array.from({ length: 6 }, (_, i) => { const t0 = K.E + 1.4 + i * 0.4, u = kprog(T, t0, t0 + 1.0, kEase.suave);
            return T > t0 ? <g key={i} opacity={1 - kprog(T, t0 + 1.0, t0 + 1.6)}><Ascarosido x={260 + i * 80} y={klerp(560, 820 + (i % 2) * 90, u)} s={1.1} rot={T * 40 + i * 30} /></g> : null; })}
        </>)}
      </Escena>
      {/* 8 · olores que atraen: los gusanos van hacia el hongo */}
      <Escena T={T} a={K.O} b={K.Pe}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <circle cx={250} cy={920} r={170} fill="#f3e6c4" stroke={KC.ink} strokeWidth={7} />
          <RedHifas T={T} x={250} y={920} g={1} seed={2} n={200} escala={0.09} ancho={2.5} color="#7a5a3a" circ={true} />
          {[0, 1, 2, 3].map((k) => { const u = ((T - K.O) * 0.45 + k / 4) % 1; return <circle key={k} cx={250} cy={920} r={180 + u * 520} fill="none" stroke={KC.violet} strokeWidth={8} strokeDasharray="30 22" opacity={(1 - u) * 0.7} />; })}
          <g opacity={kprog(T, K.O + 0.8, K.O + 1.2)}><circle cx={430} cy={560} r={34} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} /><rect x={410} y={548} width={40} height={24} rx={12} fill="#fff" opacity=".6" /></g>
          <g opacity={kprog(T, K.O + 2.2, K.O + 2.6)}><path d="M 430 660 c -20 -30 -60 -10 -40 20 l 40 40 l 40 -40 c 20 -30 -20 -50 -40 -20 z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} /><text x={490} y={690} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>?</text></g>
          {[[0, 820, 0], [1, 1000, 2], [2, 1150, 4]].map(([i, y, f]) => { const u = kprog(T, K.O + 2.6 + i * 0.3, K.Pe, kEase.suave); return <Gusano key={i} T={T} x={klerp(1000, 470, u)} y={y} largo={240} ancho={22} ang={180} fase={f} />; })}
        </>)}
      </Escena>
      {/* 9–10 · pegado: el hongo atraviesa la cutícula, crece por dentro y lo digiere */}
      <Escena T={T} a={K.Pe} b={K.Da}>
        <Micro T={T} />
        {fsvg(<>
          <TrampaRed T={T} x={TRAMPA.x} y={TRAMPA.y} s={1.3} r={26} prog={1} gotas={1} />
          <Gusano T={T} x={TRAMPA.x + 40} y={TRAMPA.y + 10} largo={PX_MM} ancho={70} ang={180} ondula={0.6 * (1 - apagado)} lleno={lleno} apagado={apagado} />
          {kprog(T, K.Pe + 0.5, K.Pe + 1.0) > 0 && <circle cx={TRAMPA.x + 50} cy={TRAMPA.y + 10} r={14 * kprog(T, K.Pe + 0.5, K.Pe + 1.0, kEase.rebote)} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />}
          {T > K.D && Array.from({ length: 16 }, (_, i) => { const u = ((T - K.D) * 0.6 + i / 16) % 1; return <circle key={i} cx={TRAMPA.x + 80 + i * 38} cy={TRAMPA.y + 10 + Math.sin(i * 2 + T * 3) * 22} r={5} fill={KC.cyan} opacity={(1 - u) * 0.9} />; })}
        </>, 20)}
      </Escena>
      {/* 11 · más de 200 especies (dato de 2013) */}
      <Escena T={T} a={K.Da} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {fsvg(Array.from({ length: 20 }, (_, i) => { const at = K.Da + 1.0 + i * 0.1; const c = i % 5, r = Math.floor(i / 5);
          return T > at ? <TrampaRed key={i} T={T} x={190 + c * 175} y={760 + r * 120} s={0.55 * kprog(T, at, at + 0.3, kEase.rebote)} r={26} prog={1} gotas={0.6} color="#fffaf0" /> : null; }))}
      </Escena>
      {/* 12 · cierre: la misma trampa del inicio, ya con su presa digerida */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="45% 45%">
        <Micro T={T} />
        {fsvg(<>
          <TrampaRed T={T} x={TRAMPA.x} y={TRAMPA.y} s={1.3} r={26} prog={1} gotas={1} />
          <Gusano T={T} x={TRAMPA.x + 40} y={TRAMPA.y + 10} largo={PX_MM} ancho={70} ang={180} ondula={0} lleno={1} apagado={0.8} />
        </>, 20)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.5} until={K.Ti - 0.3} texto="trampa pegajosa" x={360} y={560} tam={44} borde={KC.cyan} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.4} x={1040} y={760} texto="nematodo" lado="izq" tam={34} />
      <Etq T={T} at={K.Ti + 0.6} until={K.H - 0.3} x={60} y={600} texto="Arthrobotrys oligospora" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ti + 2.4} until={K.H - 0.3} x={340} y={1100} texto="come restos de hojas" tam={30} />
      <Medidor T={T} at={K.H + 0.2} until={K.R - 0.3} valor={(t) => klerp(0.9, 0.08, kprog(t, K.H + 0.4, K.H + 2.2))} etiqueta="comida" x={420} y={600} ancho={580} color={KC.orange} />
      <Etq T={T} at={K.H + 2.6} until={K.R - 0.3} x={60} y={1150} texto="nematodos (gusanos diminutos)" tam={30} />
      <Chip T={T} at={K.R + 1.0} until={K.P - 0.3} texto="red pegajosa" x={360} y={560} tam={44} borde={KC.cyan} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="2013" quien="Hsueh et al. · Caltech" revista="Current Biology 23: 83–86" y={560} />
      <Etq T={T} at={K.E + 3.5} until={K.Es - 0.2} x={60} y={560} texto="moléculas de gusano (ascarósidos)" tam={30} />
      <Chip T={T} at={K.Es + 0.6} until={K.O - 0.3} texto="0 gusanos → trampas" x={380} y={560} tam={42} borde={KC.yellow} />
      <Chip T={T} at={K.O + 0.3} until={K.O + 2.8} texto="2017 · eLife" x={300} y={480} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.O + 1.0} until={K.Pe - 0.3} x={480} y={560} texto="olor a comida" tam={30} color={KC.ink} />
      <Etq T={T} at={K.O + 2.4} until={K.Pe - 0.3} x={540} y={680} texto="¿pareja?" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Pe + 0.8} until={K.D - 0.2} x={TRAMPA.x + 60} y={TRAMPA.y - 120} texto="atraviesa la cutícula" tam={32} />
      <Etq T={T} at={K.D + 0.4} until={K.Da - 0.3} x={TRAMPA.x + 60} y={TRAMPA.y + 130} texto="enzimas: lo digiere" tam={32} color={KC.cyan} />
      <NumeroGigante T={T} at={K.Da + 0.2} until={K.C - 0.3} valor={200} prefijo="+" dur={1.0} etiqueta="especies que atacan gusanos" x={420} y={520} tam={170} />
      <Etq T={T} at={K.Da + 2.2} until={K.C - 0.3} x={110} y={1180} texto="1 ícono = 10 especies · conteo de 2013" tam={28} />
      <Chip T={T} at={K.C + 1.0} until={K.Ou} texto="la boca de un cazador" x={380} y={560} tam={44} borde={KC.yellow} />

      {/* escala */}
      {[[K.G, K.Ti], [K.R, K.P], [K.Pe, K.Da], [K.C, K.Ou]].map(([a, b], i) => T >= a && T < b ? <Escena key={i} T={T} a={a} b={b} zoom={0}><Escala T={T} z={1} pxPorMm={PX_MM} /></Escena> : null)}
      <BarraEscala T={T} at={K.Ti} until={K.R} texto="1 cm" largo={180} />
      <BarraEscala T={T} at={K.E} until={K.O} texto="2 cm" largo={160} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ti - 0.1} texto="No es moho: *es una trampa.*" />
      <Subtitulo T={T} idx={1} at={K.Ti + 0.1} until={K.H - 0.1} texto="Vive en la tierra *comiendo restos.*" />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.R - 0.1} texto="Sin comida y con gusanos: *cambia de plan.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.P - 0.1} texto="Sus hilos forman *redes pegajosas.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cómo sabe *que hay gusanos?*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.Es - 0.1} texto="Solo las *moléculas de los gusanos.*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.O - 0.1} texto="Sin gusanos, trampas: *los espiaba.*" />
      <Subtitulo T={T} idx={7} at={K.O + 0.1} until={K.Pe - 0.1} texto="2017: *olores que los atraen.*" />
      <Subtitulo T={T} idx={8} at={K.Pe + 0.1} until={K.D - 0.1} texto="Atraviesa su cutícula *y crece adentro.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.Da - 0.1} texto="Se lo come *desde adentro.*" />
      <Subtitulo T={T} idx={10} at={K.Da + 0.1} until={K.C - 0.1} texto="2013: *más de 200 especies.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Era la boca *de un cazador.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.Ti + 1.0, K.H - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 1.0, K.R - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.P + 0.05, K.E + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 0.3, K.O + 1.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.O + 3.0, K.Pe - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.Pe + 0.5, K.Da - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Da + 0.5, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CazadorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Cazador /></CompositionStage></div>;
}
window.CazadorApp = CazadorApp;
