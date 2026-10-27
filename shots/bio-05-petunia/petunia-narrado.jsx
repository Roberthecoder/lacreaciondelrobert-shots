// Biotecnológico #05 · La petunia que brilla sola — versión NARRADA (N1 "Por dentro").
// Viaje: la maceta de noche (macro) → el hongo → adentro de un pétalo: el ciclo de 4 enzimas → 1986 → la misma maceta.

function PetuniaNarrado() {
  const { T, CUES: C } = useComposition();
  const FIN = C.Outro + 4;
  const L = [0, 3.7, 7.3, 11.3, 15.5].map((d) => C.Ciclo + d);            // las 5 frases del ciclo
  const noche = (a) => kprog(T, a, a + 0.6, kEase.suave);
  const brilla = (a, k = 1) => [1, 0.9, 0.75, 1, 0.95].map((v) => v * k * kprog(T, a + 0.2, a + 1.0));
  // el ciclo: revelado por frases; la molécula viaja; destello en la frase de la luciferasa
  const ver = T < L[1] ? 1 : T < L[2] ? 1 + kprog(T, L[1] + 0.3, L[1] + 1.8) : T < L[3] ? 2 + 1.6 * kprog(T, L[2] + 0.2, L[2] + 3.2) : T < L[4] ? 3.6 + 0.4 * kprog(T, L[3], L[3] + 1) : 4 + kprog(T, L[4] + 0.3, L[4] + 1.5);
  const gira = T < L[2] ? 0 : T < L[3] ? 2 * kprog(T, L[2] + 0.4, L[2] + 3.4, kEase.suave) : T < L[4] ? 2 + kprog(T, L[3] + 2.0, L[3] + 3.6, kEase.suave) : 3 + kprog(T, L[4] + 0.6, L[4] + 2.2, kEase.suave) + (T > L[4] + 2.4 ? (T - L[4] - 2.4) * 1.2 : 0);
  const flash = kprog(T, L[3] + 1.6, L[3] + 2.0) * (1 - kprog(T, L[3] + 2.6, L[3] + 4.0)) + (T > L[4] + 2.4 ? 0.4 * Math.max(0, Math.sin((T - L[4] - 2.4) * 1.2 * Math.PI / 2 * 1)) : 0);
  const activa = T < L[2] ? -1 : T < L[2] + 2.0 ? 0 : T < L[3] ? 1 : T < L[4] ? 2 : 3;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* GANCHO: se apaga el día y la flor se prende */}
      <Escena T={T} a={C.Gancho} b={C.Hongo} zoom={0.05}>
        <Cielo T={T} noche={noche(C.Gancho)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Maceta T={T} x={540} y={970} s={1.0} brillos={brilla(C.Gancho)} /></svg>
        <MitoTachado T={T} at={C.Gancho + 1.2} tacharEn={C.Gancho + 1.8} until={C.Hongo - 0.2} texto="pilas" x={250} y={420} />
        <MitoTachado T={T} at={C.Gancho + 1.6} tacharEn={C.Gancho + 2.2} until={C.Hongo - 0.2} texto="pintura" x={380} y={300} />
      </Escena>

      {/* HONGO: de dónde viene la luz */}
      <Escena T={T} a={C.Hongo} b={C.Ciclo}>
        <Cielo T={T} noche={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[[180, 1000], [930, 900]].map(([x, y], i) => <g key={i}><rect x={x - 40} y={y - 700} width={80} height={720} fill="#2b2433" stroke={KC.ink} strokeWidth={6} /></g>)}
          <HongoLuz T={T} x={300} y={1000} s={1.1} brillo={kprog(T, C.Hongo + 0.2, C.Hongo + 0.8)} />
          <HongoLuz T={T} x={420} y={1040} s={0.7} brillo={kprog(T, C.Hongo + 0.4, C.Hongo + 1.0)} />
          <g transform="translate(800 990) scale(0.6)"><Maceta T={T} x={0} y={0} brillos={[1, 1, 1, 1, 1].map((v) => v * kprog(T, C.Hongo + 2.4, C.Hongo + 3.2))} /></g>
          <g opacity={kprog(T, C.Hongo + 1.4, C.Hongo + 1.8)}><ADNHebra T={T} x={360 + 0} y={760} largo={380 * kprog(T, C.Hongo + 1.4, C.Hongo + 2.6)} alto={50} vueltas={2} colores={[LUZ, KC.cyan]} /></g>
        </svg>
        <Etq T={T} at={C.Hongo + 0.8} until={C.Ciclo - 0.2} x={300} y={1180} texto="Neonothopanus nambi" it color={LUZ} tam={30} />
        <Chip T={T} at={C.Hongo + 1.6} until={C.Ciclo - 0.2} texto="genes del hongo" y={660} borde={LUZ} tam={36} />
      </Escena>

      {/* CICLO: adentro de un pétalo */}
      <Escena T={T} a={C.Ciclo} b={C.Pregunta} zoom={0.03} origen="50% 50%">
        <FondoMarca T={T} patron="oscuro" />
        <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, C.Ciclo + 1.6, C.Ciclo + 2.4) }}>
          <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Petunia T={T} x={540} y={900} s={3.2} brillo={0.8} /></svg>
        </div>
        <Lupa T={T} at={C.Ciclo + 0.2} until={C.Ciclo + 2.0} x={540} y={520} r={200} fx={600} fy={860} interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a2b12" />{[[0.3, 0.35], [0.7, 0.3], [0.5, 0.7]].map(([a, b], i) => <g key={i}><rect x={a * r * 2 - 70} y={b * r * 2 - 50} width={140} height={100} rx={30} fill="#e9f7d9" stroke={KC.ink} strokeWidth={5} /><circle cx={a * r * 2} cy={b * r * 2} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>)}</svg>} etiqueta="RAYOS X · pétalo" tinte={LUZ} />
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, C.Ciclo + 1.4, C.Ciclo + 2.2) }}>
          <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><CicloCafeico T={T} cx={540} cy={820} R={290} ver={ver} gira={gira} flash={flash} enzimaActiva={activa} /></svg>
        </div>
        <Chip T={T} at={L[1] + 0.4} until={L[4] + 4} texto="4 enzimas del hongo" y={330} borde={KC.cyan} tam={36} />
        <Chip T={T} at={L[3] + 1.8} until={L[4]} texto="+ O₂ → luz verde" x={540} y={1180} borde={LUZ} tam={34} />
      </Escena>

      {/* PREGUNTA */}
      <Escena T={T} a={C.Pregunta} b={C.Estudio}>
        <Cielo T={T} noche={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Maceta T={T} x={540} y={970} brillos={[1, 1, 1, 1, 1]} /></svg>
        <Chip T={T} at={C.Pregunta + 0.1} until={C.Estudio - 0.1} texto="¿por qué hasta ahora?" x={300} y={420} borde={KC.coral} tam={44} />
      </Escena>

      {/* ESTUDIO: 1986, tabaco con gen de luciérnaga */}
      <Escena T={T} a={C.Estudio} b={C.Wood}>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(${mixHex(KC.yellow, '#1d1150', kprog(T, C.Estudio + 2.6, C.Estudio + 3.2))}, ${mixHex('#ffcf3a', '#0d1424', kprog(T, C.Estudio + 2.6, C.Estudio + 3.2))})` }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:kprog(T, C.Estudio + 2.6, C.Estudio + 3.0) }}>
          <Tabaco T={T} x={540} y={1010} brillo={kprog(T, C.Estudio + 3.6, C.Estudio + 4.2) * (1 - kprog(T, C.Estudio + 5.0, C.Estudio + 6.2))} />
          <g transform={`translate(${klerp(980, 820, kprog(T, C.Estudio + 3.0, C.Estudio + 3.5))} 560) rotate(${-25 * kprog(T, C.Estudio + 3.4, C.Estudio + 3.7)})`}>
            <path d="M -60 -50 L 60 -50 L 60 60 L -60 60 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} /><path d="M -60 -30 L -150 -80" stroke="#9aa4ae" strokeWidth={22} strokeLinecap="round" /><path d="M -60 -30 L -150 -80" stroke={KC.ink} strokeWidth={4} fill="none" />
            {T > C.Estudio + 3.6 && T < C.Estudio + 4.6 && [0, 1, 2, 3].map((i) => <circle key={i} cx={-160 - i * 18} cy={-70 + ((T * 400 + i * 30) % 120)} r={6} fill={LUZ} />)}
          </g>
        </svg>
        <TarjetaEstudio T={T} at={C.Estudio + 0.2} until={C.Estudio + 2.6} anio="1986" quien="Ow, Wood, DeLuca, Helinski y Howell" revista="UC San Diego · Science 234: 856" y={720} />
        <Etq T={T} at={C.Estudio + 3.2} until={C.Wood - 0.2} x={640} y={420} texto="luciferina de luciérnaga" color={LUZ} tam={28} />
        <Chip T={T} at={C.Estudio + 5.0} until={C.Wood - 0.2} texto="se apaga" x={300} y={420} borde={KC.coral} tam={36} />
      </Escena>

      {/* WOOD: de estudiante a fundador */}
      <Escena T={T} a={C.Wood} b={C.Aprobada}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <div style={{ position:'absolute', left:0, right:0, top:560, zIndex:41, textAlign:'center' }}>
          <div style={{ font:`400 220px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`7px ${KC.ink}`, textShadow:`9px 9px 0 ${KC.ink}` }}>{Math.round(klerp(1986, 2019, kprog(T, C.Wood + 0.8, C.Wood + 3.4, kEase.suave)))}</div>
          <div style={{ font:`900 54px ${KF.texto}`, color:KC.texto, textShadow:SOMBRA, marginTop:10 }}>Keith Wood</div>
          <div style={{ font:`700 34px ${KF.mono}`, color:KC.ink, marginTop:16, opacity:kprog(T, C.Wood + 3.4, C.Wood + 3.8) }}>cofundador de Light Bio</div>
        </div>
        <Chip T={T} at={C.Wood + 0.3} until={C.Wood + 3.2} texto="estudiante en 1986" y={430} borde={KC.ink} tam={38} />
      </Escena>

      {/* APROBADA: luz verde */}
      <Escena T={T} a={C.Aprobada} b={C.Extra}>
        <FondoMarca T={T} color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(540 760)"><rect x={-110} y={-280} width={220} height={560} rx={50} fill="#222" stroke={KC.ink} strokeWidth={9} />
            {[[-180, KC.red], [0, KC.yellow], [180, LUZ]].map(([dy, c], i) => <circle key={i} cy={dy} r={74} fill={i === 2 ? (T > C.Aprobada + 0.6 ? c : '#2c3a2c') : '#3a3333'} stroke={KC.ink} strokeWidth={6} />)}
            {T > C.Aprobada + 0.6 && <circle cy={180} r={140} fill={LUZ} opacity={0.3 + 0.1 * Math.sin(T * 6)} />}</g>
        </svg>
        <Chip T={T} at={C.Aprobada + 0.6} until={C.Extra - 0.2} texto="EE. UU. · sept. 2023" x={540} y={330} borde={KC.ink} tam={38} />
        <Chip T={T} at={C.Aprobada + 2.4} until={C.Extra - 0.2} texto="a la venta: 2024" x={540} y={1120} borde={KC.ink} tam={38} />
      </Escena>

      {/* EXTRA: flores jóvenes y no se carga con el sol */}
      <Escena T={T} a={C.Extra} b={C.Cierre}>
        <Cielo T={T} noche={T < C.Extra + 3.0 ? 1 : 1 - 0.7 * kprog(T, C.Extra + 3.0, C.Extra + 3.6)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Petunia T={T} x={330} y={680} s={1.5} brillo={1} />
          <Petunia T={T} x={760} y={700} s={1.25} brillo={0.35} rot={20} seed={3} />
          {T > C.Extra + 3.0 && <g transform={`translate(860 990) scale(${kprog(T, C.Extra + 3.0, C.Extra + 3.4, kEase.rebote)})`}><rect x={-60} y={-110} width={120} height={200} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={7} /><rect x={-24} y={-130} width={48} height={22} rx={6} fill={KC.ink} /><rect x={-46} y={30} width={92} height={46} rx={6} fill={KC.leaf} /><line x1={-90} y1={110} x2={90} y2={-130} stroke={KC.red} strokeWidth={14} strokeLinecap="round" /></g>}
        </svg>
        <Etq T={T} at={C.Extra + 0.6} until={C.Cierre - 0.2} x={330} y={900} texto="joven" color={LUZ} />
        <Etq T={T} at={C.Extra + 1.0} until={C.Cierre - 0.2} x={760} y={900} texto="vieja" color={KC.texto} />
      </Escena>

      {/* CIERRE: la misma maceta del inicio, con el ciclo dando vueltas */}
      <Escena T={T} a={C.Cierre} b={FIN} zoom={0.03}>
        <Cielo T={T} noche={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Maceta T={T} x={540} y={970} s={1.0} brillos={[1, 0.9, 0.75, 1, 0.95]} />
          <g opacity={kprog(T, C.Cierre + 0.6, C.Cierre + 1.4) * 0.9}><CicloCafeico T={T} cx={560} cy={720} R={110} ver={5} gira={(T - C.Cierre) * 1.4} flash={0.3 + 0.3 * Math.sin(T * 3)} etiquetas={false} /></g>
        </svg>
      </Escena>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={C.Gancho + 0.1} until={C.Hongo - 0.1} texto="Sin pilas ni pintura: *genes de un hongo.*" />
      <Subtitulo T={T} idx={1} at={C.Hongo + 0.1} until={C.Ciclo - 0.1} texto="La petunia luciérnaga: *luz de hongo.*" />
      <Subtitulo T={T} idx={2} at={L[0] + 0.1} until={L[1] - 0.1} texto="La planta ya hace *ácido cafeico.*" />
      <Subtitulo T={T} idx={3} at={L[1] + 0.1} until={L[2] - 0.1} texto="Un ciclo de *cuatro enzimas.*" />
      <Subtitulo T={T} idx={4} at={L[2] + 0.1} until={L[3] - 0.1} texto="Hispidina… *luciferina.*" />
      <Subtitulo T={T} idx={5} at={L[3] + 0.1} until={L[4] - 0.1} texto="La luciferasa la quema: *luz verde.*" />
      <Subtitulo T={T} idx={6} at={L[4] + 0.1} until={C.Pregunta - 0.1} texto="Y la cuarta recicla: *vuelta otra vez.*" />
      <Subtitulo T={T} idx={7} at={C.Pregunta + 0.05} until={C.Estudio - 0.1} texto="¿Por qué nadie *lo había logrado?*" />
      <Subtitulo T={T} idx={8} at={C.Estudio + 0.1} until={C.Wood - 0.1} texto="Brillaba… *pero había que darle luciferina.*" />
      <Subtitulo T={T} idx={9} at={C.Wood + 0.1} until={C.Aprobada - 0.1} texto="Keith Wood *cofundó la empresa.*" />
      <Subtitulo T={T} idx={10} at={C.Aprobada + 0.1} until={C.Extra - 0.1} texto="Luz verde en 2023; *venta en 2024.*" />
      <Subtitulo T={T} idx={11} at={C.Extra + 0.1} until={C.Cierre - 0.1} texto="No se carga con el sol: *la luz la fabrica ella.*" />
      <Subtitulo T={T} idx={12} at={C.Cierre + 0.1} until={C.Outro - 0.1} texto="Un hongo *dando vueltas por dentro.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [0, 3.6, 'avatar_11_sorprendido', 'gancho'],
        [C.Hongo + 1.8, C.Ciclo - 0.2, 'avatar_13_senalando_arriba', 'abajo-der'],
        [L[1], L[1] + 3.2, 'avatar_07_pensativo_puno', 'abajo-izq'],
        [L[3] + 1.5, L[4] + 0.6, 'avatar_11_sorprendido', 'arriba-der'],
        [C.Pregunta, C.Estudio + 0.4, 'avatar_06_pensativo_menton', 'arriba-der'],
        [C.Estudio + 3.6, C.Wood - 0.2, 'avatar_12_perfil_serio', 'abajo-izq'],
        [C.Wood + 3.2, C.Aprobada + 1.4, 'avatar_04_bajando_lentes', 'presentador'],
        [C.Extra + 0.4, C.Extra + 3.4, 'avatar_05_sonriendo_dientes_uniformes', 'abajo-der'],
        [C.Cierre + 0.3, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'abajo-izq'],
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="05" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PetuniaNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <PetuniaNarrado />
      </CompositionStage>
    </div>
  );
}
window.PetuniaNarradoApp = PetuniaNarradoApp;
