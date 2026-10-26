// Shot 002 · El moho del pan — versión NARRADA (formato N1 "Por dentro").
// Las escenas y subtítulos se ajustan a la voz con narrar.mjs (window.SUBS); sin voz usan los tiempos estimados.
// Guion y fuentes: guion.md

function MohoNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Espora, H: CUES.Hifa, P: CUES.Punta, Pu: CUES.Puntitos, V: CUES.Vuelan, U: CUES.USDA, Q: CUES.Queso, Hu: CUES.Huelas, Te: CUES.Tempeh, C: CUES.Cierre, O: CUES.Outro };
  const M = MUNDO_PAN.mancha;

  /* ---- cámara (coordenadas macro; mp() = punto del mundo micro) ---- */
  const keys = [
    { t: K.G, x: 540, y: 900, z: 1 },
    { t: K.E + 0.2, x: 600, y: 800, z: 1.8 },
    mpk(K.E + 3.4, 40, -60, 500),
    mpk(K.H + 2.6, 0, -40, 900),
    mpk(K.H + 9.0, 0, 700, 110),
    mpk(K.P + 1.8, 0, 1400, 48),
    mpk(K.Pu + 1.4, 300, -1050, 520),
    mpk(K.V + 0.3, 300, -1050, 520),
    mpk(K.V + 3.4, 250, -800, 110),
    { t: K.U + 1.6, x: 560, y: 860, z: 1.15 },
    { t: K.Hu, x: 560, y: 860, z: 1.15 },
    { t: K.Hu + 3, x: 590, y: 820, z: 1.35 },
    { t: K.C, x: 540, y: 900, z: 1 },
    { t: K.O, x: 540, y: 900, z: 1.08 },
  ];
  function mpk(t, x, y, z) { const p = mp(x, y); return { t, x: p.x, y: p.y, z }; }
  const cam = camaraEn(T, keys);

  /* ---- estado del moho ---- */
  const rebobinado = T >= K.E && T < K.U;                // en el viaje la rebanada está limpia
  const macro = {
    moho: rebobinado ? 0 : 1,
    rayosX: T < K.E ? kprog(T, K.G + 2.3, K.G + 3.2) * (1 - kprog(T, K.E - 0.5, K.E)) : T >= K.U ? kprog(T, K.U + 0.6, K.U + 2.6) : 0,
    soplo: T < K.E ? K.G + 0.3 : T >= K.Hu && T < K.Te ? K.Hu + 1.2 : K.C + 1.6,
  };
  const micro = {
    g: kprog(T, K.H + 2.4, K.H + 9.4) * 0.5 + kprog(T, K.P, K.P + 2.2) * 0.42,
    tallos: kprog(T, K.P + 0.3, K.P + 2.2) * 0.4 + kprog(T, K.Pu, K.Pu + 1.6) * 0.6,
    capsulas: kprog(T, K.Pu + 1.6, K.Pu + 4.4),
    revientan: [1.3, 1.6, 1.0, 0.4, 1.9, 2.2, 1.5].map((d) => K.V + d),
    espora: T >= K.E + 1.4 ? { y: klerp(-330, -8, kprog(T, K.E + 1.4, K.E + 3.2, (p) => p * p)), germina: kprog(T, K.H + 0.2, K.H + 3.0) } : null,
    pelo: kprog(T, K.E + 2.6, K.E + 3.4) * (1 - kprog(T, K.H + 0.5, K.H + 1.5)),
  };
  const enMundo = !(T >= K.Q && T < K.Hu) && !(T >= K.Te && T < K.C);
  const microF = kprog(Math.log(cam.z), Math.log(28), Math.log(45));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {enMundo && <MundoMoho T={T} keys={keys} macro={macro} micro={micro} />}
      {enMundo && <Ambiente T={T} n={30} o={microF * 0.8} color="rgba(234,255,247,.45)" tam={[3, 9]} />}
      {enMundo && T < K.O && <Escala T={T} z={cam.z} pxPorMm={MUNDO_PAN.pxPorMm} />}
      {T >= K.Q && T < K.Hu && <QuesoZanahoria T={T} at={K.Q} />}
      {T >= K.Hu && T < K.Te && <Nariz T={T} at={K.Hu} />}
      {T >= K.Te && T < K.C && <Tempeh T={T} at={K.Te} />}

      {/* etiquetas científicas */}
      <Etq T={T} at={K.E + 3.0} until={K.H + 1.2} x={420} y={1090} texto="espora · ~10 µm" lado="izq" />
      <Etq T={T} at={K.E + 3.3} until={K.H + 1.2} x={700} y={640} texto="un pelo · ~70 µm" />
      <Etq T={T} at={K.H + 2.6} until={K.H + 6} x={620} y={1120} texto="hifa" />
      <Etq T={T} at={K.H + 6} until={K.P} x={560} y={700} texto="almidón" color={KC.gold2} />
      <Etq T={T} at={K.Pu + 2.0} until={K.V + 0.3} x={640} y={960} texto="cápsula de esporas" />
      <Etq T={T} at={K.Pu + 2.6} until={K.V + 2.8} x={120} y={300} texto="Rhizopus stolonifer" it />

      {/* fuente */}
      <TarjetaEstudio T={T} at={K.U + 0.8} until={K.U + 4.6} anio="USDA" quien="Depto. de Agricultura de EE. UU." revista="«Molds on Food», 2013" y={560} />
      <Chip T={T} at={K.U + 4.8} until={K.Q - 0.15} texto="Pan con moho: se tira entero" y={420} borde={KC.red} tam={44} />
      <Chip T={T} at={K.Hu + 1.0} until={K.Te - 0.15} texto="No lo huelas" x={380} y={420} borde={KC.red} fondo={KC.red} tam={52} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.E - 0.1} texto="Esa mancha no es todo el moho: tu pan ya está *tomado por dentro.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.H - 0.1} texto="Todo empezó con *una espora,* más delgada que un pelo." />
      <Subtitulo T={T} idx={2} at={K.H + 0.1} until={K.H + 3.8} texto="Germinó y le salió *un hilo: una hifa.*" />
      <Subtitulo T={T} idx={3} at={K.H + 3.9} until={K.P - 0.1} texto="Se mete por la miga *digiriendo el almidón.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Pu - 0.1} texto="Lo que ves arriba es *apenas la punta.*" />
      <Subtitulo T={T} idx={5} at={K.Pu + 0.1} until={K.Pu + 1.5} texto="¿Y esos *puntitos negros?*" />
      <Subtitulo T={T} idx={6} at={K.Pu + 1.5} until={K.V - 0.1} texto="Son *cápsulas llenas de esporas.*" />
      <Subtitulo T={T} idx={7} at={K.V + 0.1} until={K.U - 0.1} texto="Revientan y las esporas *vuelan al siguiente pan.*" />
      <Subtitulo T={T} idx={8} at={K.U + 0.1} until={K.Q - 0.1} texto="Es poroso: el moho *llega por debajo.*" />
      <Subtitulo T={T} idx={9} at={K.Q + 0.1} until={K.Hu - 0.1} texto="Queso duro o zanahoria: *corta con margen.*" />
      <Subtitulo T={T} idx={10} at={K.Hu + 0.1} until={K.Te - 0.1} texto="Respirarlo puede *causarte problemas.*" />
      <Subtitulo T={T} idx={11} at={K.Te + 0.1} until={K.C - 0.1} texto="Sus primos hacen *el tempeh.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.O - 0.1} texto="No es el principio del moho: *es el final de su ciclo.*" />

      {/* stickers de reacción */}
      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={K.P + 0.3} until={K.Pu - 0.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={K.Pu + 0.1} until={K.Pu + 2.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_10_serio_molesto')} at={K.Hu + 0.4} until={K.Te - 0.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_04_bajando_lentes')} at={K.Te + 0.6} until={K.C - 0.2} lado="arriba-der" />

      <MarcaAgua T={T} num="02" hasta={K.O} />
      <CierreMarca T={T} at={K.O} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Audio sincronizado al tiempo de reproducción (como en el shot 001).
function AudioPista({ src }) {
  const { time, playing } = useComposition();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const a = ref.current; if (!a || !src) return;
    if (playing) { if (a.paused) { const pr = a.play(); if (pr && pr.catch) pr.catch(() => {}); } if (Math.abs(a.currentTime - time) > 0.25) a.currentTime = time; }
    else { if (!a.paused) a.pause(); if (Math.abs(a.currentTime - time) > 0.05) a.currentTime = time; }
  });
  return src ? <audio ref={ref} src={src} preload="auto" style={{ display:'none' }} /> : null;
}

function MohoNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <MohoNarrado />
      </CompositionStage>
    </div>
  );
}
window.AudioPista = AudioPista;
window.MohoNarradoApp = MohoNarradoApp;
