// Biotecnológico #01 · Las ramas de la biotecnología por colores — versión NARRADA (N4 "La imagen que se llena").
// Escenas y subtítulos se ajustan a la voz con narrar.mjs (window.SUBS); sin voz usan los tiempos estimados.

function RamasNarrado() {
  const { T, CUES: C } = useComposition();
  const FIN = C.Outro + 4;
  // cuándo empieza cada rama (la gris arranca "sucia" en la pregunta; la oscura a media frase de la morada)
  const iniNegro = C.Morado + 0.45 * (C.Estudio - C.Morado);
  const INI = { rojo: C.Rojo, verde: C.Verde, blanco: C.Blanco, amarillo: C.Amarillo, azul: C.Azul, gris: C.Pregunta, cafe: C.Cafe, dorado: C.Dorado, morado: C.Morado, negro: iniNegro, naranja: C.Naranja };
  const orden = RAMAS.map((q) => q.k);
  let idx = -1; orden.slice(0, 10).forEach((k, i) => { if (T >= INI[k] - 0.2) idx = i; });
  const fondoRamas = idx < 0 ? RAMAS[0].fondo : mixHex(RAMAS[Math.max(0, idx - 1)].fondo, RAMAS[idx].fondo, kprog(T, INI[orden[idx]] - 0.2, INI[orden[idx]] + 0.3));
  const llenaHasta = (i) => kprog(T, INI[orden[i]] - 0.1, INI[orden[i]] + 0.6, kEase.sale);
  const GA = { cx: 540, cy: 1060, R: 410, w: 34 };

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* GANCHO: el "arcoíris" se pinta antes del segundo 1 y aparece lo que ya usaste hoy */}
      <Escena T={T} a={C.Gancho} b={C.Def} zoom={0.04}>
        <FondoMarca T={T} color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Arco T={T} cx={GA.cx} cy={GA.cy} R={GA.R} w={GA.w} n={10} llenas={(i) => kprog(T, C.Gancho + 0.05 + i * 0.07, C.Gancho + 0.75 + i * 0.07, kEase.sale)} chispas={kprog(T, C.Gancho + 1.2, C.Gancho + 1.6)} />
        </svg>
        <Nubes T={T} cx={GA.cx} cy={GA.cy} R={GA.R} />
        <Abanico T={T} at={C.Gancho + 2.0} cx={GA.cx} cy={GA.cy} R={480} r={48} />
      </Escena>

      {/* QUÉ ES: seres vivos que trabajan */}
      <Escena T={T} a={C.Def} b={C.Rojo}>
        <FondoMarca T={T} color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {kprog(T, C.Def + 0.3, C.Def + 0.7) > 0 && <g opacity={kprog(T, C.Def + 0.3, C.Def + 0.6)} transform={`translate(0 ${(1 - kprog(T, C.Def + 0.3, C.Def + 0.8, kEase.rebote)) * 80})`}><Bacteria T={T} x={230} y={700} largo={200} ancho={84} rot={-15} color="#7fd88a" seed={3} /></g>}
          {kprog(T, C.Def + 1.3, C.Def + 1.7) > 0 && <g opacity={kprog(T, C.Def + 1.3, C.Def + 1.6)}><Celula T={T} x={540} y={680} r={86} /></g>}
          {kprog(T, C.Def + 2.1, C.Def + 2.5) > 0 && <g opacity={kprog(T, C.Def + 2.1, C.Def + 2.4)}><Enzima x={850} y={700} s={2.4} boca={0.5 + 0.5 * Math.sin(T * 9)} /></g>}
          {[230, 540, 850].map((x, i) => <FlechaCurva key={i} T={T} x1={x} y1={800} x2={540 + (i - 1) * 60} y2={990} curva={(i - 1) * -40} p={kprog(T, C.Def + 2.8 + i * 0.15, C.Def + 3.4 + i * 0.15)} color={KC.ink} />)}
          {T > C.Def + 3.3 && <g transform={`translate(540 1060) scale(${kprog(T, C.Def + 3.3, C.Def + 3.8, kEase.rebote)}) rotate(${mece(T, 1, 0.3) * 4})`}>
            <rect x={-60} y={-70} width={120} height={140} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={7} /><rect x={-36} y={-100} width={72} height={36} rx={8} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
            <path d="M -30 0 L 30 0 M 0 -30 L 0 30" stroke={KC.red} strokeWidth={14} strokeLinecap="round" />
          </g>}
        </svg>
        <Etq T={T} at={C.Def + 0.6} until={C.Rojo - 0.2} x={140} y={560} texto="microbios" color={KC.ink} />
        <Etq T={T} at={C.Def + 1.5} until={C.Rojo - 0.2} x={470} y={560} texto="células" color={KC.ink} />
        <Etq T={T} at={C.Def + 2.3} until={C.Rojo - 0.2} x={760} y={560} texto="enzimas" color={KC.ink} />
      </Escena>

      {/* LAS RAMAS: un mismo lugar que se va llenando (arcoíris arriba, medallón al centro) */}
      <Escena T={T} a={C.Rojo} b={C.Estudio} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:fondoRamas }}></div>
        <FondoMarca T={T} color="transparent" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Arco T={T} cx={540} cy={650} R={250} w={19} n={10} llenas={llenaHasta} chispas={1} />
        </svg>
        {orden.slice(0, 10).map((k, i) => {
          const at = INI[k], sale = i < 9 ? INI[orden[i + 1]] - 0.25 : C.Estudio - 0.1;
          return <React.Fragment key={k}>
            <Medallon T={T} at={at} k={k} sale={sale} extra={k === 'gris' ? { limpia: kprog(T, C.Gris + 0.4, C.Gris + 3.4) } : {}} />
            <RotuloRama T={T} at={k === 'gris' ? C.Gris : at + 0.05} until={sale} k={k} />
          </React.Fragment>;
        })}
        {T >= C.Rojo && T < C.Estudio && <div style={{ position:'absolute', right:44, top:210, zIndex:44, font:`700 34px ${KF.mono}`, color:KC.texto, textShadow:SOMBRA }}>rama <span style={{ color:KC.yellow }}>{idx + 1}</span> / 10</div>}
        <Chip T={T} at={C.Pregunta + 0.1} until={C.Gris - 0.1} texto="¿?" y={330} tam={64} borde={KC.gold} />
      </Escena>

      {/* EL ARTÍCULO: DaSilva (UNESCO) y "casi nunca van solos" */}
      <Escena T={T} a={C.Estudio} b={C.Naranja}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <TarjetaEstudio T={T} at={C.Estudio + 0.2} until={C.Estudio + 2.6} anio="2004" quien="Edgar J. DaSilva · UNESCO" revista="Electronic Journal of Biotechnology" y={760} />
        {T > C.Estudio + 2.7 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[['rojo', -1], ['blanco', 0], ['dorado', 1]].map(([k, l], i) => {
            const R = RAMAS.find((q) => q.k === k), junta = kprog(T, C.Estudio + 3.0, C.Estudio + 4.2, kEase.suave), e = kprog(T, C.Estudio + 2.7 + i * 0.15, C.Estudio + 3.1 + i * 0.15, kEase.rebote);
            const x = 540 + l * klerp(300, 110, junta), y = 820 + (l === 0 ? -klerp(0, 90, junta) : 0);
            return <g key={k} transform={`translate(${x} ${y}) scale(${e})`}><circle r={170} fill={R.c} fillOpacity=".72" stroke={KC.ink} strokeWidth={8} /><text y={-110} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{R.n}</text></g>;
          })}
        </svg>}
        <Chip T={T} at={C.Estudio + 3.6} until={C.Naranja - 0.2} texto="insulina = roja + blanca + dorada" y={1090} tam={36} borde={KC.ink} />
      </Escena>

      {/* NARANJA: la que sumamos */}
      <Escena T={T} a={C.Naranja} b={C.Cierre}>
        <FondoMarca T={T} color={KC.orange} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Arco T={T} cx={540} cy={650} R={250} w={19} n={11} llenas={(i) => (i < 10 ? 1 : kprog(T, C.Naranja + 0.6, C.Naranja + 1.6, kEase.sale))} chispas={1} />
        </svg>
        <Medallon T={T} at={C.Naranja + 0.9} k="naranja" />
        <RotuloRama T={T} at={C.Naranja + 1.0} until={C.Cierre - 0.1} k="naranja" />
        <div style={{ position:'absolute', right:44, top:210, zIndex:44, font:`700 34px ${KF.mono}`, color:KC.texto, textShadow:SOMBRA }}>rama <span style={{ color:KC.yellow }}>11</span> / 10</div>
      </Escena>

      {/* CIERRE: el mismo arcoíris del inicio, ya con todo lo que es */}
      <Escena T={T} a={C.Cierre} b={FIN} zoom={0.03}>
        <FondoMarca T={T} color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Arco T={T} cx={GA.cx} cy={GA.cy} R={GA.R} w={GA.w * 10 / 11} n={11} llenas={() => 1} chispas={1} />
        </svg>
        <Nubes T={T} cx={GA.cx} cy={GA.cy} R={GA.R} />
        <Abanico T={T} at={C.Cierre + 0.1} cx={GA.cx} cy={GA.cy} R={480} r={44} n={11} etiquetas={kprog(T, C.Cierre + 1.2, C.Cierre + 1.6)} />
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={C.Gancho + 0.1} until={C.Def - 0.1} texto="No es un arcoíris: *es lo que la biotecnología ya hizo por ti.*" />
      <Subtitulo T={T} idx={1} at={C.Def + 0.1} until={C.Rojo - 0.1} texto="Poner a trabajar *a seres vivos.*" />
      <Subtitulo T={T} idx={2} at={C.Rojo + 0.1} until={C.Verde - 0.1} texto="Insulina, vacunas *y antibióticos.*" />
      <Subtitulo T={T} idx={3} at={C.Verde + 0.1} until={C.Blanco - 0.1} texto="Plantas que aguantan *plagas o sequía.*" />
      <Subtitulo T={T} idx={4} at={C.Blanco + 0.1} until={C.Amarillo - 0.1} texto="Enzimas que quitan manchas *en agua fría.*" />
      <Subtitulo T={T} idx={5} at={C.Amarillo + 0.1} until={C.Azul - 0.1} texto="Pan, queso y yogur *hechos por microbios.*" />
      <Subtitulo T={T} idx={6} at={C.Azul + 0.1} until={C.Pregunta - 0.1} texto="Medicinas en *algas y bacterias marinas.*" />
      <Subtitulo T={T} idx={7} at={C.Pregunta + 0.1} until={C.Gris - 0.1} texto="¿Y si la vida *limpiara lo que ensuciamos?*" />
      <Subtitulo T={T} idx={8} at={C.Gris + 0.1} until={C.Cafe - 0.1} texto="Microbios que *se comen la contaminación.*" />
      <Subtitulo T={T} idx={9} at={C.Cafe + 0.1} until={C.Dorado - 0.1} texto="Cultivar donde *casi no llueve.*" />
      <Subtitulo T={T} idx={10} at={C.Dorado + 0.1} until={C.Morado - 0.1} texto="Computadoras que *leen el ADN.*" />
      <Subtitulo T={T} idx={11} at={C.Morado + 0.1} until={C.Estudio - 0.1} texto="Leyes y ética… *y armas biológicas.*" />
      <Subtitulo T={T} idx={12} at={C.Estudio + 0.1} until={C.Naranja - 0.1} texto="2004: DaSilva los juntó… *y casi nunca van solos.*" />
      <Subtitulo T={T} idx={13} at={C.Naranja + 0.1} until={C.Cierre - 0.1} texto="Sumamos uno: *naranja, contarlo.*" />
      <Subtitulo T={T} idx={14} at={C.Cierre + 0.1} until={C.Outro - 0.1} texto="Es tu día, *pintado por seres vivos.*" />

      {/* stickers de reacción (re-ganchos) */}
      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={C.Pregunta + 0.1} until={C.Gris + 0.4} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={C.Estudio + 3.4} until={C.Naranja - 0.2} lado="arriba-der" />

      <MarcaAgua T={T} tema="bioquimica" num="01" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RamasNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <RamasNarrado />
      </CompositionStage>
    </div>
  );
}
window.RamasNarradoApp = RamasNarradoApp;
