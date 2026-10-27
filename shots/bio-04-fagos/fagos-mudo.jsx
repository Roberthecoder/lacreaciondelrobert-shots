// Biotecnológico #04 · Fagos — gemelo MUDO (M4 "Ciclo" lítico + conteo, loop de 61.5 s).
// Llega → inyecta → la bacteria arma ~200 fagos (≈25 min en time-lapse) → revienta → en la placa de Petri cada
// ciclo abre un claro ("calva") → zoom a la orilla de una calva: otra bacteria y otro fago llegando (= primer cuadro).

function FagosMudo() {
  const { T, CUES: C } = useComposition();
  const desc = (t0) => kprog(T, t0 - 1.5, t0 + 1.0, kEase.sale);           // el fago baja (en T = t0 - 0 ya va al 60 %)
  const enMicro = T < C.Placa + 0.6 || T > C.Vuelta + 5.4;
  const segunda = T > C.Vuelta;
  const y0 = segunda ? 0.983 * kEase.suave(kprog(T, C.Vuelta + 6, C.Vuelta + 13)) : desc(0);   // termina donde empieza el cuadro 0
  const calvas = [
    { x: 0, y: 0, r: 0.16 * kprog(T, C.Placa + 1.0, C.Placa + 6) },
    { x: -0.45, y: 0.25, r: 0.1 * kprog(T, C.Placa + 3.5, C.Placa + 8) }, { x: 0.4, y: -0.35, r: 0.12 * kprog(T, C.Placa + 4.5, C.Placa + 9) },
    { x: 0.35, y: 0.45, r: 0.09 * kprog(T, C.Placa + 5.5, C.Placa + 10) }, { x: -0.3, y: -0.5, r: 0.08 * kprog(T, C.Placa + 6.5, C.Placa + 11) },
    { x: -0.65, y: -0.1, r: 0.07 * kprog(T, C.Placa + 7.5, C.Placa + 12) },
  ];
  const zoomPlaca = klerp(4, 1, kprog(T, C.Placa, C.Placa + 1.2, kEase.suave)) * klerp(1, 6, kprog(T, C.Vuelta + 3, C.Vuelta + 5.4, kEase.suave));
  const copias = Math.round(200 * kprog(T, C.Copias + 0.6, C.Revienta + 0.6));
  const gen = T < C.Placa + 3 ? 1 : T < C.Placa + 7 ? 200 : 40000;
  const caps = [{ at: 0, titulo: 'Llega' }, { at: C.Inyecta, titulo: 'Inyecta' }, { at: C.Copias, titulo: 'Fábrica de fagos' }, { at: C.Revienta, titulo: 'Revienta' }, { at: C.Placa, titulo: 'En la placa' }, { at: C.Vuelta, titulo: 'Otra vez' }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {enMicro && <div style={{ position:'absolute', inset:0, opacity:T < C.Placa + 1 ? 1 - kprog(T, C.Placa, C.Placa + 0.6) : kprog(T, C.Vuelta + 4.8, C.Vuelta + 5.4) }}>
        <FondoMarca T={T} patron="oscuro" />
        <Ambiente T={T} n={26} seed={6} color="rgba(234,255,247,.3)" tam={[3, 8]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <EColiGrande T={T} x={540} y={1000} adn={segunda ? 0 : kprog(T, C.Inyecta + 0.8, C.Copias + 0.4)} copias={segunda ? 0 : kprog(T, C.Copias + 0.6, C.Revienta + 0.6)} rev={segunda ? 0 : kprog(T, C.Revienta + 0.9, C.Revienta + 2.2)} />
          {(segunda || T < C.Revienta + 1.0) && <Fago T={T} x={540} y={klerp(300, 814, y0)} s={0.75} patas={segunda ? kprog(T, C.Vuelta + 12.2, C.Vuelta + 13.6) : kprog(T, 0.2, 1.2)} contraida={segunda ? 0 : kprog(T, C.Inyecta + 0.3, C.Inyecta + 0.9, kEase.sale)} adn={segunda ? 1 : 1 - kprog(T, C.Inyecta + 0.8, C.Inyecta + 2.2)} />}
          {!segunda && <Estallido T={T} x={540} y={1000} p={kprog(T, C.Revienta + 0.9, C.Revienta + 3.4)} n={34} rad={620} />}
        </svg>
        {!segunda && <Cronometro T={T} at={C.Inyecta + 0.2} until={C.Revienta + 2.4} factor={25 * 60 / (C.Revienta + 1.0 - C.Inyecta - 0.2)} x={540} y={430} etiqueta="TIME-LAPSE" />}
        {!segunda && T > C.Copias + 0.6 && T < C.Revienta + 1.0 && <NumeroGigante T={T} at={C.Copias + 0.6} until={C.Revienta + 0.9} valor={copias} dur={0.01} prefijo="~" etiqueta="fagos adentro" y={1520} tam={140} color={KC.pink} />}
        <Escala T={T} z={1} pxPorMm={450000} y={1440} />
      </div>}
      {/* la placa de Petri: cada ciclo abre una calva */}
      {T > C.Placa - 0.2 && T < C.Vuelta + 5.6 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, C.Placa - 0.2, C.Placa + 0.6) * (1 - kprog(T, C.Vuelta + 4.8, C.Vuelta + 5.4)) }}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 860) scale(${zoomPlaca}) translate(${-540 - 0.16 * 420 * kprog(T, C.Vuelta + 3, C.Vuelta + 5.4)} -860)`}><Petri x={540} y={860} R={420} calvas={calvas} T={T} /></g>
        </svg>
        <div style={{ position:'absolute', left:0, right:0, top:1380, textAlign:'center', zIndex:41, opacity:kprog(T, C.Placa + 1, C.Placa + 1.4) * (1 - kprog(T, C.Vuelta + 2.6, C.Vuelta + 3)) }}>
          <span style={{ font:`400 120px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`6px 6px 0 ${KC.ink}` }}>{kformato(gen)}</span>
          <div style={{ font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:SOMBRA }}>{gen === 1 ? 'fago' : 'fagos'}</div>
        </div>
        <Chip T={T} at={C.Placa + 1.6} until={C.Vuelta + 2.6} texto="cada claro = bacterias que ya no están" y={430} tam={32} borde={KC.ink} />
      </div>}

      <Capitulo T={T} caps={caps} hasta={C.Outro} />
      {(T < C.Inyecta - 0.4 || T > C.Vuelta + 6) && <Chip T={T} at={T < C.Inyecta ? 0 : C.Vuelta + 6} until={T < C.Inyecta ? C.Inyecta - 0.8 : null} texto="Este virus solo come bacterias" y={520} tam={44} borde={KC.pink} />}
      <Etq T={T} at={0.4} until={C.Inyecta - 0.4} x={150} y={1290} texto="Escherichia coli" it color={ECOLI} />
      <Etq T={T} at={C.Vuelta + 6.4} until={C.Outro} x={150} y={1290} texto="Escherichia coli" it color={ECOLI} />
      <Subtitulo T={T} at={C.Inyecta + 0.4} until={C.Copias - 0.2} texto="Cola de jeringa: *inyecta su ADN*" />
      <Subtitulo T={T} at={C.Copias + 0.4} until={C.Revienta - 0.2} texto="La bacteria *solo hace fagos*" />
      <Subtitulo T={T} at={C.Revienta + 1.2} until={C.Placa - 0.2} texto="~25 minutos: *revienta*" />
      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={C.Revienta + 1.4} until={C.Placa - 0.3} lado="arriba-der" />

      <MarcaAgua T={T} tema="bioquimica" num="04" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

function FagosMudoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <FagosMudo />
      </CompositionStage>
    </div>
  );
}
window.FagosMudoApp = FagosMudoApp;
