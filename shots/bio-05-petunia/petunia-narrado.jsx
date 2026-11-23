// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
// Biotecnológico #05 · La petunia que brilla sola — versión NARRADA (N1 "Por dentro").
// Viaje: la maceta de noche (macro) → el hongo → adentro de un pétalo: el ciclo de 4 enzimas → 1986 → la misma maceta.

// Belleza: la maceta de barro gana volumen (luz arriba a la izquierda, sombra abajo a la derecha) y sombra suave en el suelo.
function MacetaVol(props) {
  const { x = 540, y = 1100, s = 1 } = props;
  return <g>
    <ellipse cx={x + 20 * s} cy={y + 246 * s} rx={240 * s} ry={24 * s} fill="#000" opacity=".4" />
    <Maceta {...props} />
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <defs><linearGradient id="petMacVol" x1="0" y1="0" x2="1" y2="0.35"><stop offset="0" stopColor="#fff" stopOpacity=".24" /><stop offset=".42" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".42" /></linearGradient></defs>
      <path d="M -225 17 L 225 17 L 187 235 L -187 235 Z" fill="url(#petMacVol)" />
      <path d="M -225 17 L 225 17 L 221 42 L -221 42 Z" fill="#000" opacity=".28" />
      <rect x={-245} y={-35} width={490} height={46} rx={10} fill="url(#petMacVol)" />
      <path d="M -236 -30 L 120 -30" stroke="#fff" strokeWidth={5} strokeLinecap="round" opacity=".28" />
    </g>
  </g>;
}
// Belleza: tronco de árbol nocturno con volumen y corteza (antes: rectángulo plano con borde blanco).
function Tronco({ x, y }) {
  return <g>
    <path d={`M ${x - 48} ${y - 1110} L ${x + 48} ${y - 1110} L ${x + 64} ${y + 25} L ${x - 64} ${y + 25} Z`} fill="url(#petTronco)" stroke="#0a0710" strokeWidth={4} />
    {[-26, -4, 20, 36].map((d, i) => <path key={i} d={`M ${x + d} ${y - 1100} Q ${x + d + 10} ${y - 700 + i * 60} ${x + d * 1.15} ${y - 300} T ${x + d * 1.25} ${y + 20}`} stroke="#0b0812" strokeWidth={3} fill="none" opacity=".55" />)}
    <path d={`M ${x - 40} ${y - 1100} L ${x - 54} ${y + 20}`} stroke="#6b5a80" strokeWidth={5} opacity=".35" />
  </g>;
}

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
        <Cielo T={T} noche={0.82 + 0.18 * noche(C.Gancho)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><MacetaVol T={T} x={540} y={1160} s={1.5} brillos={brilla(C.Gancho)} />
          {/* modo cine: antes del segundo 3 ya asoma, atenuado, el hongo de donde viene la luz (escena siguiente) */}
          <g opacity={0.55 * kprog(T, C.Gancho + 2.0, C.Gancho + 2.7)}><HongoLuz T={T} x={125} y={1450} s={0.6} brillo={kprog(T, C.Gancho + 2.3, C.Gancho + 3.2)} /></g></svg>
        <MitoTachado T={T} at={C.Gancho + 1.2} tacharEn={C.Gancho + 1.8} until={C.Hongo - 0.2} texto="pilas" x={190} y={400} />
        <MitoTachado T={T} at={C.Gancho + 1.6} tacharEn={C.Gancho + 2.2} until={C.Hongo - 0.2} texto="pintura" x={300} y={265} />
      </Escena>

      {/* HONGO: de dónde viene la luz */}
      <Escena T={T} a={C.Hongo} b={C.Ciclo}>
        <Cielo T={T} noche={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <defs><linearGradient id="petTronco" x1="0" x2="1"><stop offset="0" stopColor="#3b3048" /><stop offset=".4" stopColor="#2a2233" /><stop offset="1" stopColor="#120e18" /></linearGradient></defs>
          {[[110, 1270], [1000, 1200]].map(([x, y], i) => <Tronco key={i} x={x} y={y} />)}
          <HongoLuz T={T} x={330} y={1260} s={2.0} brillo={kprog(T, C.Hongo + 0.2, C.Hongo + 0.8)} />
          <HongoLuz T={T} x={520} y={1360} s={1.1} brillo={kprog(T, C.Hongo + 0.4, C.Hongo + 1.0)} />
          <g transform="translate(810 1010) scale(0.75)"><MacetaVol T={T} x={0} y={0} brillos={[1, 1, 1, 1, 1].map((v) => v * kprog(T, C.Hongo + 2.4, C.Hongo + 3.2))} /></g>
          <g opacity={kprog(T, C.Hongo + 1.4, C.Hongo + 1.8)}><ADNHebra T={T} x={390} y={640} largo={400 * kprog(T, C.Hongo + 1.4, C.Hongo + 2.6)} alto={60} vueltas={2} colores={[LUZ, KC.cyan]} /></g>
        </svg>
        <Etq T={T} at={C.Hongo + 0.8} until={C.Ciclo - 0.2} x={210} y={1440} texto="Neonothopanus nambi" it color={LUZ} tam={30} />
        <Chip T={T} at={C.Hongo + 1.6} until={C.Ciclo - 0.2} texto="genes de hongos" x={590} y={520} borde={LUZ} tam={36} />
      </Escena>

      {/* CICLO: adentro de un pétalo */}
      <Escena T={T} a={C.Ciclo} b={C.Pregunta} zoom={0.03} origen="50% 50%">
        <FondoMarca T={T} patron="oscuro" />
        <div style={{ position:'absolute', inset:0, opacity:1 - 0.84 * kprog(T, C.Ciclo + 1.6, C.Ciclo + 2.4) }}>
          <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Petunia T={T} x={540} y={940} s={3.4} brillo={0.8} /></svg>
        </div>
        <Lupa T={T} at={C.Ciclo + 0.2} until={C.Ciclo + 2.0} x={540} y={520} r={220} fx={600} fy={900} interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1a2b12" />{[[0.3, 0.35], [0.7, 0.3], [0.5, 0.7]].map(([a, b], i) => <g key={i}><rect x={a * r * 2 - 70} y={b * r * 2 - 50} width={140} height={100} rx={30} fill="#e9f7d9" stroke={KC.ink} strokeWidth={5} /><circle cx={a * r * 2} cy={b * r * 2} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>)}</svg>} etiqueta="AL MICROSCOPIO · pétalo" tinte={LUZ} />
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, C.Ciclo + 1.4, C.Ciclo + 2.2) }}>
          <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><CicloCafeico T={T} cx={565} cy={940} R={310} ver={ver} gira={gira} flash={flash} enzimaActiva={activa} /></svg>
        </div>
        <Chip T={T} at={L[1] + 0.4} until={L[4] + 4} texto="4 enzimas del hongo" y={380} borde={KC.cyan} tam={36} />
        <Chip T={T} at={L[3] + 1.8} until={L[4]} texto="+ O₂ → luz verde" x={565} y={1100} borde={LUZ} tam={34} />
      </Escena>

      {/* PREGUNTA */}
      <Escena T={T} a={C.Pregunta} b={C.Estudio}>
        <Cielo T={T} noche={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><MacetaVol T={T} x={540} y={1160} s={1.5} brillos={[1, 1, 1, 1, 1]} /></svg>
        <Chip T={T} at={C.Pregunta + 0.1} until={C.Estudio - 0.1} texto="¿por qué hasta ahora?" x={340} y={245} borde={KC.coral} tam={44} />
      </Escena>

      {/* ESTUDIO: 1986, tabaco con gen de luciérnaga */}
      <Escena T={T} a={C.Estudio} b={C.Wood}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#1d1150, #0d1424)' }}></div>
        {/* modo cine: fondo oscuro y la planta de tabaco en pantalla desde que empieza la escena (antes: 2.6 s de lámina amarilla con solo la tarjeta) */}
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:kprog(T, C.Estudio + 0.05, C.Estudio + 0.5) }}>
          <g transform="translate(540 1250) scale(1.5)"><Tabaco T={T} x={0} y={0} brillo={kprog(T, C.Estudio + 3.6, C.Estudio + 4.2) * (1 - kprog(T, C.Estudio + 5.0, C.Estudio + 6.2))} /></g>
          <g transform={`translate(${klerp(1100, 850, kprog(T, C.Estudio + 3.0, C.Estudio + 3.5))} 430) rotate(${-25 * kprog(T, C.Estudio + 3.4, C.Estudio + 3.7)}) scale(1.45)`}>
            <path d="M -60 -50 L 60 -50 L 60 60 L -60 60 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={7} /><path d="M -60 -30 L -150 -80" stroke="#9aa4ae" strokeWidth={22} strokeLinecap="round" /><path d="M -60 -30 L -150 -80" stroke={KC.ink} strokeWidth={4} fill="none" />
            {T > C.Estudio + 3.6 && T < C.Estudio + 4.6 && [0, 1, 2, 3].map((i) => <circle key={i} cx={-160 - i * 18} cy={-70 + ((T * 400 + i * 30) % 120)} r={6} fill={LUZ} />)}
          </g>
        </svg>
        <TarjetaEstudio T={T} at={C.Estudio + 0.2} until={C.Estudio + 2.6} anio="1986" quien="Ow, de Wet, Helinski, Howell, Wood y DeLuca" revista="UC San Diego · Science 234: 856" y={300} />
        <Etq T={T} at={C.Estudio + 3.2} until={C.Wood - 0.2} x={480} y={255} texto="luciferina de luciérnaga" color={LUZ} tam={28} />
        <Chip T={T} at={C.Estudio + 5.0} until={C.Wood - 0.2} texto="se apaga" x={210} y={430} borde={KC.coral} tam={36} />
      </Escena>

      {/* WOOD: de estudiante a fundador */}
      <Escena T={T} a={C.Wood} b={C.Aprobada}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        {/* modo cine: el sujeto sigue detrás, atenuado: el tabaco de 1986 se vuelve la petunia que brilla conforme avanza el año */}
        {(() => { const u = kprog(T, C.Wood + 0.8, C.Wood + 3.4, kEase.suave); return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={0.3 * (1 - u)} transform="translate(540 1250) scale(1.5)"><Tabaco T={T} x={0} y={0} brillo={0} /></g>
          <g opacity={0.34 * u}><MacetaVol T={T} x={540} y={1200} s={1.5} brillos={[1, 0.9, 0.75, 1, 0.95]} /></g>
        </svg>; })()}
        <div style={{ position:'absolute', left:0, right:0, top:760, zIndex:41, textAlign:'center', opacity:1 - kprog(T, C.Aprobada - 0.35, C.Aprobada + 0.15) }}>
          <div style={{ font:`400 220px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`7px ${KC.ink}`, textShadow:`9px 9px 0 ${KC.ink}` }}>{Math.round(klerp(1986, 2024, kprog(T, C.Wood + 0.8, C.Wood + 3.4, kEase.suave)))}</div>
          <div style={{ font:`900 54px ${KF.texto}`, color:KC.texto, textShadow:SOMBRA, marginTop:10 }}>Keith Wood</div>
          <div style={{ font:`700 34px ${KF.mono}`, color:KC.ink, marginTop:16, opacity:kprog(T, C.Wood + 3.4, C.Wood + 3.8) }}>cofundador de Light Bio</div>
        </div>
        <Chip T={T} at={C.Wood + 0.3} until={C.Wood + 3.2} texto="estudiante en 1986" y={630} borde={KC.ink} tam={38} />
      </Escena>

      {/* APROBADA: luz verde */}
      <Escena T={T} a={C.Aprobada} b={C.Extra}>
        <FondoMarca T={T} color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(350 880) scale(1.5)"><rect x={-110} y={-280} width={220} height={560} rx={50} fill="#222" stroke={KC.ink} strokeWidth={9} />
            {[[-180, KC.red], [0, KC.yellow], [180, LUZ]].map(([dy, c], i) => <circle key={i} cy={dy} r={74} fill={i === 2 ? (T > C.Aprobada + 0.6 ? c : '#2c3a2c') : '#3a3333'} stroke={KC.ink} strokeWidth={6} />)}
            {T > C.Aprobada + 0.6 && <circle cy={180} r={140} fill={LUZ} opacity={0.3 + 0.1 * Math.sin(T * 6)} />}</g>
          {/* modo cine: la petunia aprobada sigue a cuadro junto al semáforo y se enciende con la luz verde */}
          <g opacity={0.85 * kprog(T, C.Aprobada + 0.05, C.Aprobada + 0.5)}><MacetaVol T={T} x={800} y={1180} s={1.0} brillos={[1, 0.9, 0.75, 1, 0.95].map((v) => v * kprog(T, C.Aprobada + 0.6, C.Aprobada + 1.2))} /></g>
        </svg>
        <Chip T={T} at={C.Aprobada + 0.6} until={C.Extra - 0.2} texto="EE. UU. · sept. 2023" x={540} y={330} borde={KC.ink} tam={38} />
        <Chip T={T} at={C.Aprobada + 2.4} until={C.Extra - 0.2} texto="a la venta: 2024" x={540} y={1450} borde={KC.ink} tam={38} />
      </Escena>

      {/* EXTRA: flores jóvenes y no se carga con el sol */}
      <Escena T={T} a={C.Extra} b={C.Cierre}>
        <Cielo T={T} noche={T < C.Extra + 3.0 ? 1 : 1 - 0.1 * kprog(T, C.Extra + 3.0, C.Extra + 3.6)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* modo cine: el cielo ya no se pone de día (fondo oscuro); el sol se dibuja aparte sobre el cielo de atardecer */}
          <g opacity={kprog(T, C.Extra + 3.0, C.Extra + 3.6)}><circle cx={872} cy={408} r={92} fill={KC.yellow} stroke="#0b1020" strokeWidth={8} /></g>
          <Petunia T={T} x={325} y={800} s={2.3} brillo={1} />
          <Petunia T={T} x={790} y={860} s={2.0} brillo={0.35} rot={20} seed={3} />
          {T > C.Extra + 3.0 && <g transform={`translate(560 1330) scale(${1.5 * kprog(T, C.Extra + 3.0, C.Extra + 3.4, kEase.rebote)})`}><rect x={-60} y={-110} width={120} height={200} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={7} /><rect x={-24} y={-130} width={48} height={22} rx={6} fill={KC.ink} /><rect x={-46} y={30} width={92} height={46} rx={6} fill={KC.leaf} /><line x1={-90} y1={110} x2={90} y2={-130} stroke={KC.red} strokeWidth={14} strokeLinecap="round" /></g>}
        </svg>
        <Etq T={T} at={C.Extra + 0.6} until={C.Cierre - 0.2} x={240} y={1095} texto="joven" color={LUZ} />
        <Etq T={T} at={C.Extra + 1.0} until={C.Cierre - 0.2} x={740} y={1110} texto="vieja" color={KC.texto} />
      </Escena>

      {/* CIERRE: la misma maceta del inicio, con el ciclo dando vueltas */}
      <Escena T={T} a={C.Cierre} b={FIN} zoom={0.03}>
        <Cielo T={T} noche={1} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <MacetaVol T={T} x={540} y={1160} s={1.5} brillos={[1, 0.9, 0.75, 1, 0.95]} />
          <g opacity={kprog(T, C.Cierre + 0.6, C.Cierre + 1.4) * 0.9}><CicloCafeico T={T} cx={560} cy={790} R={170} ver={5} gira={(T - C.Cierre) * 1.4} flash={0.3 + 0.3 * Math.sin(T * 3)} etiquetas={false} /></g>
        </svg>
      </Escena>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={C.Gancho + 0.1} until={C.Hongo - 0.1} texto="Sin pilas ni pintura: *genes de hongos.*" />
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
