// Biotecnológico #01 · Las ramas por colores — gemelo MUDO (M1 "La música son los datos", loop de 61.5 s).
// Cada rama suma su capa de sonido (el latido de la roja a 72 por minuto marca el pulso de todo).
// El final borra el arcoíris banda por banda y queda igual que el primer cuadro: vuelve a empezar sin corte.

const MUDO_SUB = {
  rojo: 'Insulina, vacunas y *antibióticos*', verde: 'Plantas que aguantan *plagas y sequía*', blanco: 'Enzimas que quitan *manchas en frío*',
  amarillo: 'Pan, queso y yogur: *microbios*', azul: 'Medicinas *del mar*', gris: 'Microbios que *limpian*',
  cafe: 'Cultivar *en el desierto*', dorado: 'Computadoras que *leen ADN*', morado: 'Leyes *y ética*', negro: 'Armas biológicas *y cómo frenarlas*',
};

function RamasMudo() {
  const { T, CUES: C } = useComposition();
  const orden = RAMAS.slice(0, 10).map((q) => q.k);
  const nombres = ['Rojo', 'Verde', 'Blanco', 'Amarillo', 'Azul', 'Gris', 'Cafe', 'Dorado', 'Morado', 'Negro'];
  const INI = {}; orden.forEach((k, i) => { INI[k] = C[nombres[i]]; });
  let idx = -1; orden.forEach((k, i) => { if (T >= INI[k] - 0.2) idx = i; });
  const enColores = T >= C.Rojo - 0.6 && T < C.Todo + 0.5;
  // el arcoíris grande del inicio se encoge arriba mientras suenan las ramas y vuelve a crecer al final
  const m = kprog(T, C.Rojo - 0.7, C.Rojo + 0.1, kEase.suave) * (1 - kprog(T, C.Todo - 0.4, C.Todo + 0.5, kEase.suave));
  const A = { cx: 540, cy: klerp(1060, 650, m), R: klerp(410, 250, m), w: klerp(34, 19, m) };
  const borra = (i) => 1 - kprog(T, C.Todo + 2.4 + (9 - i) * 0.17, C.Todo + 2.7 + (9 - i) * 0.17, kEase.suave);
  const llenas = (i) => kprog(T, INI[orden[i]] - 0.05, INI[orden[i]] + 0.5, kEase.sale) * borra(i);
  const fondo = idx < 0 || T > C.Todo + 0.2 ? KC.cyan : mixHex(idx === 0 ? KC.cyan : RAMAS[idx - 1].fondo, RAMAS[idx].fondo, kprog(T, INI[orden[idx]] - 0.2, INI[orden[idx]] + 0.3));
  const fondoFin = mixHex(fondo, KC.cyan, kprog(T, C.Todo - 0.3, C.Todo + 0.4));
  const pulso = 1 + 0.025 * Math.exp(-((T % (60 / 72)) * 9));               // todo late a 72 por minuto
  const enInicio = T < C.Rojo - 0.4 || T > C.Todo + 3.6;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={{ position:'absolute', inset:0, background:fondoFin }}></div>
      <FondoMarca T={T} color="transparent" />
      <div style={{ position:'absolute', inset:0, transform:`scale(${pulso})`, transformOrigin:'50% 40%' }}>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Arco T={T} cx={A.cx} cy={A.cy} R={A.R} w={A.w} n={10} llenas={llenas} chispas={1} />
        </svg>
        <div style={{ opacity:1 - m }}><Nubes T={T} cx={A.cx} cy={A.cy} R={A.R} /></div>
        {orden.map((k, i) => <Medallon key={k} T={T} at={INI[k] + 0.15} k={k} sale={i < 9 ? INI[orden[i + 1]] - 0.25 : C.Todo - 0.3} extra={k === 'gris' ? { limpia: kprog(T, INI.gris + 1.2, INI.gris + 4.2) } : {}} />)}
        {T > C.Todo - 0.1 && T < C.Todo + 3.2 && <div style={{ opacity:1 - kprog(T, C.Todo + 2.4, C.Todo + 3.0) }}><Abanico T={T} at={C.Todo + 0.1} cx={540} cy={1060} R={480} r={46} n={10} /></div>}
      </div>
      {orden.map((k, i) => <RotuloRama key={k} T={T} at={INI[k] + 0.1} until={i < 9 ? INI[orden[i + 1]] - 0.25 : C.Todo - 0.3} k={k} />)}
      {enColores && T < C.Todo - 0.2 && <div style={{ position:'absolute', right:44, top:210, zIndex:44, font:`700 34px ${KF.mono}`, color:KC.texto, textShadow:SOMBRA }}>rama <span style={{ color:KC.yellow }}>{Math.max(1, idx + 1)}</span> / 10</div>}

      {/* capas que suenan: una luz por rama (se van sumando) */}
      {enColores && <div style={{ position:'absolute', left:0, right:0, top:1480, zIndex:40, display:'flex', justifyContent:'center', gap:14 }}>
        {RAMAS.slice(0, 10).map((q, i) => { const on = llenas(i) > 0.5; const b = on ? 0.6 + 0.4 * Math.abs(Math.sin(T * (2 + i * 0.7) + i)) : 0.15;
          return <div key={i} style={{ width:58, height:20 + 70 * b, alignSelf:'flex-end', borderRadius:12, background:q.c, border:`5px solid ${KC.ink}`, opacity:on ? 1 : 0.35 }}></div>; })}
      </div>}

      {/* primer texto (gancho) y su regreso al final: el loop */}
      {enInicio && <div style={{ position:'absolute', left:0, right:0, top:430, zIndex:44, textAlign:'center', opacity:T < C.Rojo ? 1 - kprog(T, C.Rojo - 0.7, C.Rojo - 0.3) : kprog(T, C.Todo + 3.6, C.Todo + 4.0) }}>
        <span style={{ display:'inline-block', background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:24, padding:'8px 30px 12px', font:`400 78px/1 ${KF.titulo}`, color:KC.ink, boxShadow:`10px 10px 0 ${KC.ink}`, transform:`rotate(-2deg) scale(${1 + 0.03 * Math.sin(T * 7.54)})` }}>ESTO NO ES UN ARCOÍRIS</span>
      </div>}
      {orden.map((k, i) => <Subtitulo key={k} T={T} at={INI[k] + 0.6} until={(i < 9 ? INI[orden[i + 1]] : C.Todo) - 0.25} texto={MUDO_SUB[k]} />)}
      <Subtitulo T={T} at={C.Todo + 0.3} until={C.Todo + 3.3} texto="Es lo que la biotecnología *ya hizo por ti hoy*" />
      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={INI.gris + 0.2} until={INI.gris + 1.6} lado="arriba-der" />

      <MarcaAgua T={T} tema="bioquimica" num="01" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

function RamasMudoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <RamasMudo />
      </CompositionStage>
    </div>
  );
}
window.RamasMudoApp = RamasMudoApp;
