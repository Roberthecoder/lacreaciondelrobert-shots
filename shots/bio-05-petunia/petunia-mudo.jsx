// Biotecnológico #05 · La petunia que brilla sola — gemelo MUDO (M4 "Ciclo", loop de 61.5 s).
// Día → anochece y las flores se prenden → adentro: el ciclo de 4 enzimas da vueltas (cada enzima, un sonido;
// la luz suena con "la nota de la luz verde") → las flores jóvenes brillan más → amanece: el sol tapa el brillo
// (que sigue ahí) y queda el mismo cuadro del inicio.

function PetuniaMudo() {
  const { T, CUES: C } = useComposition();
  const noche = kprog(T, C.Noche, C.Noche + 3.0, kEase.suave) * (1 - kprog(T, C.Amanecer + 1.0, C.Amanecer + 6.0, kEase.suave));
  const visible = noche;                                                       // el brillo se ve solo de noche
  const dentro = kprog(T, C.Ciclo1 - 0.6, C.Ciclo1 + 0.6) * (1 - kprog(T, C.Flores - 0.6, C.Flores + 0.4));
  // vueltas del ciclo: lento en el primero (paso a paso), más rápido después
  const gira = T < C.Ciclo1 + 1.5 ? 0 : T < C.Ciclo2 ? 4 * kprog(T, C.Ciclo1 + 1.5, C.Ciclo2 - 0.5) : 4 + (T - C.Ciclo2) * klerp(0.6, 1.6, kprog(T, C.Ciclo2, C.Flores));
  const paso = Math.floor(((gira % 4) + 4) % 4);
  const fl = (() => { const f = ((gira % 4) + 4) % 4; return f > 2 && f < 2.6 ? Math.sin((f - 2) / 0.6 * Math.PI) : 0; })();
  const ver = T < C.Ciclo2 ? klerp(1, 5, kprog(T, C.Ciclo1 + 0.6, C.Ciclo1 + 10.5)) : 5;
  const nuevo = kprog(T, C.Flores + 2.0, C.Flores + 5.0, kEase.sale);
  const caps = [{ at: 0, titulo: 'De día' }, { at: C.Noche, titulo: 'Anochece' }, { at: C.Ciclo1, titulo: '4 enzimas' }, { at: C.Ciclo2, titulo: 'Toda la noche' }, { at: C.Flores, titulo: 'Flores jóvenes' }, { at: C.Amanecer, titulo: 'Amanece' }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={{ position:'absolute', inset:0, opacity:1 - dentro }}>
        <Cielo T={T} noche={noche} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={1 - noche}>{Array.from({ length: 10 }, (_, i) => { const a = i * 0.628 + T * 0.4; return <line key={i} x1={880 + Math.cos(a) * 100} y1={420 + Math.sin(a) * 100} x2={880 + Math.cos(a) * 130} y2={420 + Math.sin(a) * 130} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />; })}</g>
          <Maceta T={T} x={540} y={970} brillos={[1, 0.9, 0.75 * (1 - 0.5 * kprog(T, C.Flores, C.Flores + 3)), 1, 0.95].map((v) => v * visible)} />
          {/* un botón nuevo que se abre (flor joven) */}
          <g transform={`translate(${540 + 250} ${970 - 380})`}><path d={`M -230 380 Q -60 200 0 0`} stroke="#2a9a3c" strokeWidth={10} fill="none" opacity={nuevo} />
            {nuevo > 0 && <Petunia T={T} s={0.3 + 0.6 * nuevo} brillo={visible * 1.1} seed={7} />}</g>
        </svg>
      </div>
      {/* adentro de un pétalo: el ciclo */}
      {dentro > 0 && <div style={{ position:'absolute', inset:0, opacity:dentro }}>
        <FondoMarca T={T} patron="oscuro" />
        <Ambiente T={T} n={30} seed={11} color="rgba(157,255,106,.25)" tam={[3, 8]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><CicloCafeico T={T} cx={540} cy={860} R={300} ver={ver} gira={gira} flash={fl} enzimaActiva={gira > 0 ? paso : -1} /></svg>
        {T < C.Ciclo2 && [0, 1, 2, 3].map((k) => <Chip key={k} T={T} at={C.Ciclo1 + 1.5 + k * (C.Ciclo2 - 0.5 - C.Ciclo1 - 1.5) / 4} until={C.Ciclo1 + 1.5 + (k + 1) * (C.Ciclo2 - 0.5 - C.Ciclo1 - 1.5) / 4 - 0.2} texto={`${k + 1} · ${ENZ[k]}`} y={1300} tam={34} borde={k === 2 ? LUZ : KC.cyan} mono />)}
        <Chip T={T} at={C.Ciclo2 + 0.5} until={C.Flores - 0.6} texto="vuelta y vuelta, toda la noche" y={1300} tam={34} borde={LUZ} />
      </div>}

      <Capitulo T={T} caps={caps} hasta={C.Outro} />
      {(T < C.Noche + 1 || T > C.Amanecer + 6) && <Chip T={T} at={T < C.Noche + 1 ? 0 : C.Amanecer + 6} until={T < C.Noche + 1 ? C.Noche + 0.6 : null} texto="Esta flor no tiene pilas" y={1300} tam={46} borde={KC.ink} />}
      <Chip T={T} at={C.Amanecer + 1.5} until={C.Amanecer + 5.8} texto="sigue brillando: el sol lo tapa" y={1300} tam={36} borde={KC.yellow} />
      <Etq T={T} at={C.Flores + 3.2} until={C.Amanecer} x={790} y={470} texto="joven: brilla más" color={LUZ} lado="izq" tam={28} />
      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [0, 3.5, 'avatar_11_sorprendido', 'gancho'],
        [C.Noche + 1.6, C.Noche + 4.6, 'avatar_04_bajando_lentes', 'arriba-der'],
        [C.Ciclo1 + 2.0, C.Ciclo1 + 5.0, 'avatar_07_pensativo_puno', 'arriba-der'],
        [C.Ciclo1 + 9.5, C.Ciclo1 + 12.5, 'avatar_13_senalando_arriba', 'arriba-der'],
        [C.Ciclo2 + 4.0, C.Ciclo2 + 7.0, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [C.Flores + 2.5, C.Flores + 6.5, 'avatar_11_sorprendido', 'presentador'],
        [C.Amanecer + 2.0, C.Amanecer + 5.0, 'avatar_06_pensativo_menton', 'arriba-der'],
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="05" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

function PetuniaMudoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <PetuniaMudo />
      </CompositionStage>
    </div>
  );
}
window.PetuniaMudoApp = PetuniaMudoApp;
