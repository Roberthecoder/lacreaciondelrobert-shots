// Biotecnológico #02 · Las vacas viven de microbios — gemelo MUDO (M4 "Ciclo", loop de 61.5 s).
// Pasto → bocado → rumiar (60 masticadas por bolo) → rumen → energía → proteína → eructo → abono → pasto otra vez.
// El último cuadro antes del cierre es igual al primero: la vaca pastando en el mismo pasto.

function Bosta({ x, y, p = 1, T = 0 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.sale(kclamp(p, 0, 1))})`}>
    <ellipse cx={0} cy={0} rx={70} ry={26} fill="#6b4a2e" stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={-18} rx={48} ry={20} fill="#7a5634" stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={-34} rx={26} ry={14} fill="#8a6440" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function VacasMudo() {
  const { T, CUES: C } = useComposition();
  const masca = T * 2 * Math.PI;
  // pasto: alto al inicio, se lo come, y vuelve a crecer al final (loop)
  const alto = 1 - kprog(T, C.Pasto + 0.5, C.Bocado - 0.5) * 0.7 + kprog(T, C.Suelo + 4, C.Outro - 1.2) * 0.7;
  const pastando = T < C.Bocado - 0.3 || T > C.Suelo + 6;
  const escenaVaca = (extra = {}) => <>
    <Pastizal T={T} horizonte={1100} />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      {Array.from({ length: 9 }, (_, i) => { const x = 700 + i * 34, h = 60 + 70 * alto * (0.7 + 0.3 * Math.sin(i * 2.1)); return <path key={i} d={`M ${x} 1110 q ${mece(T, i, 0.4) * 10} ${-h / 2} ${mece(T, i + 3, 0.3) * 14} ${-h}`} stroke={PASTO2} strokeWidth={10} fill="none" strokeLinecap="round" />; })}
      <Vaca T={T} x={460} y={880} s={0.9} mastica={masca} {...extra} />
    </svg>
  </>;
  const caps = [
    { at: C.Pasto + 0.3, titulo: 'Come pasto' }, { at: C.Bocado, titulo: 'Rumia' }, { at: C.Rumen, titulo: 'Fermenta' },
    { at: C.Energia, titulo: 'Energía' }, { at: C.Proteina, titulo: 'Proteína' }, { at: C.Eructo, titulo: 'Metano' }, { at: C.Suelo, titulo: 'Abono' },
  ];
  // rumiar: un bolo sube por el esófago y se mastica 60 veces (time-lapse ×10)
  const bolo = kprog(T, C.Bocado + 0.3, C.Bocado + 1.2, kEase.suave);
  const masticadas = Math.floor(60 * kprog(T, C.Bocado + 1.2, C.Rumen - 0.4));
  const pasos = (i0) => [C.Rumen + 3.0, C.Rumen + 4.4, C.Rumen + 5.8, C.Rumen + 7.2][i0];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1. come pasto  ·  7. y vuelve a comer (mismo cuadro del inicio) */}
      <Escena T={T} a={C.Pasto} b={C.Bocado} zoom={0.02}>{escenaVaca({ cabezaAbajo: 1 })}</Escena>
      {/* 2. rumia: el bolo sube y se mastica 60 veces */}
      <Escena T={T} a={C.Bocado} b={C.Rumen} zoom={0.03}>
        {escenaVaca({ cabezaAbajo: 0, mastica: T * 2 * Math.PI * 10 * kprog(T, C.Bocado + 1.2, C.Bocado + 1.3) })}
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <path d="M 420 880 C 600 840, 660 820, 760 800" stroke="#e39a9a" strokeWidth={22} fill="none" strokeLinecap="round" opacity=".8" />
          {bolo < 1 && <circle cx={klerp(420, 760, bolo)} cy={klerp(880, 800, bolo)} r={22} fill={FIBRA} stroke={KC.ink} strokeWidth={5} />}
        </svg>
        <Cronometro T={T} at={C.Bocado + 1.2} until={C.Rumen - 0.3} factor={10} x={540} y={450} etiqueta="TIME-LAPSE ×10" />
        <NumeroGigante T={T} at={C.Bocado + 1.2} until={C.Rumen - 0.3} valor={masticadas} dur={0.01} etiqueta="masticadas por bolo" y={1500} tam={160} />
      </Escena>
      {/* 3. rumen: llegan bacterias, hongos, protozoarios y arqueas */}
      <Escena T={T} a={C.Rumen} b={C.Energia} zoom={0.05}>
        <div style={{ opacity:1 - kprog(T, C.Rumen + 2.2, C.Rumen + 2.8) }}>{escenaVaca({ brillo: 1 })}</div>
        <div style={{ position:'absolute', inset:0, opacity:kprog(T, C.Rumen + 2.2, C.Rumen + 2.8) }}>
          <MundoRumen T={T} microbios={kprog(T, C.Rumen + 2.8, C.Rumen + 8)} romper={kprog(T, C.Rumen + 6.5, C.Energia)} agv={kprog(T, C.Rumen + 8, C.Energia + 1)} />
          <Escala T={T} z={1} pxPorMm={35000} y={1440} />
        </div>
        <Lupa T={T} at={C.Rumen + 0.2} until={C.Rumen + 2.2} x={560} y={450} r={220} fx={406} fy={889} interior={(t, r) => <Estomago T={t} r={r} />} etiqueta="RAYOS X" />
        {['bacterias', 'hongos', 'protozoarios', 'arqueas'].map((n, i) => <Etq key={n} T={T} at={pasos(i)} until={C.Energia - 0.3} x={[110, 600, 760, 300][i]} y={[470, 660, 440, 600][i]} lado={i === 2 ? 'izq' : 'der'} texto={n} color={[KC.mint, KC.gold2, KC.lilac, '#c9a6ff'][i]} />)}
      </Escena>
      {/* 4. energía: los ácidos cruzan la pared */}
      <Escena T={T} a={C.Energia} b={C.Proteina} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 35%, #3b1d24 0%, #1a0d12 75%)' }}></div>
        <Pared T={T} a={C.Energia} agv={kprog(T, C.Energia + 0.2, C.Energia + 2.5)} />
        <Medidor T={T} at={C.Energia + 1.0} until={C.Proteina - 0.3} etiqueta="ENERGÍA DE LA VACA" valor={(t) => 0.7 * kprog(t, C.Energia + 1.2, C.Proteina - 1.5, kEase.sale)} texto={(v) => Math.round(v * 100) + ' %'} y={430} color={KC.yellow} />
      </Escena>
      {/* 5. proteína: los microbios bajan y se digieren */}
      <Escena T={T} a={C.Proteina} b={C.Eructo}>
        <FondoMarca T={T} color={KC.coral} patron="rayas" />
        <Intestino T={T} a={C.Proteina - 3} />
        <Chip T={T} at={C.Proteina + 1.2} until={C.Eructo - 0.3} texto="microbios = proteína" y={1110} borde={KC.ink} tam={40} />
      </Escena>
      {/* 6. eructo con metano  ·  7. abono y pasto que vuelve a crecer */}
      <Escena T={T} a={C.Eructo} b={C.Outro + 4} zoom={0.02}>
        {escenaVaca({ eructo: kprog(T, C.Eructo + 1.2, C.Eructo + 3.6), cabezaAbajo: kprog(T, C.Suelo + 5, C.Suelo + 6.5, kEase.suave) })}
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Bosta x={160} y={1135} p={kprog(T, C.Suelo + 0.3, C.Suelo + 0.9) * (1 - kprog(T, C.Suelo + 3, C.Suelo + 4.5))} />
          {T > C.Suelo + 2.6 && Array.from({ length: 6 }, (_, i) => { const f = kprog(T, C.Suelo + 2.6 + i * 0.15, C.Suelo + 4.6 + i * 0.15); return <path key={i} d={`M ${100 + i * 24} 1140 l 0 ${-80 * f}`} stroke={PASTO2} strokeWidth={8} strokeLinecap="round" opacity={1 - kprog(T, C.Outro - 1.2, C.Outro - 0.4)} />; })}
        </svg>
        <Chip T={T} at={C.Eructo + 1.0} until={C.Suelo - 0.3} texto="CH₄ sale por la boca" y={430} borde="#8b4dff" tam={40} />
        <Chip T={T} at={C.Suelo + 0.8} until={C.Suelo + 4.5} texto="abono → pasto nuevo" y={430} borde={KC.leaf} tam={40} />
      </Escena>

      <Capitulo T={T} caps={caps} hasta={C.Outro} />
      {/* primer texto (gancho) y su regreso al final */}
      {(T < C.Bocado - 0.3 || T > C.Suelo + 5.5) && <Chip T={T} at={T < C.Bocado ? 0 : C.Suelo + 5.5} until={T < C.Bocado ? C.Bocado - 0.6 : null} texto="Esta vaca no vive del pasto" y={470} tam={48} borde={KC.ink} />}
      <Subtitulo T={T} at={C.Bocado + 1.4} until={C.Rumen - 0.2} texto="Regresa el bocado *y lo mastica otra vez*" />
      <Subtitulo T={T} at={C.Rumen + 3} until={C.Energia - 0.2} texto="Lo que digiere el pasto *son sus microbios*" />
      <Subtitulo T={T} at={C.Energia + 0.4} until={C.Proteina - 0.2} texto="~70 % de su energía: *ácidos de microbios*" />
      <Subtitulo T={T} at={C.Proteina + 0.4} until={C.Eructo - 0.2} texto="Y se come *a sus microbios*" />
      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={C.Eructo + 2.2} until={C.Suelo - 0.4} lado="abajo-der" />

      <MarcaAgua T={T} tema="bioquimica" num="02" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

function VacasMudoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <VacasMudo />
      </CompositionStage>
    </div>
  );
}
window.VacasMudoApp = VacasMudoApp;
