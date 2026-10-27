// Biotecnológico #03 · CRISPR lo inventaron las bacterias — versión NARRADA (N1 "Por dentro" + N5 "El experimento").
// Viaje: yogur (macro) → cadena de bacterias → adentro de una bacteria (memoria CRISPR) → experimento → el mismo yogur.

// Interior de la lupa del gancho y del cierre: la cadena de bacterias con su CRISPR encendido.
function CadenaLupa({ T, r, brillo = 1 }) {
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0b2a1c" /><g transform={`translate(${r} ${r}) scale(${r / 260})`}><Cadena T={T} x={0} y={0} n={4} r={70} rot={-12} brillo={brillo} /></g></svg>;
}
// Bacteria grande por dentro (escena de captura y corte).
function CelulaGrande({ T, children }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <circle cx={540} cy={860} r={430} fill="#123524" stroke={COCO} strokeWidth={14} />
    <circle cx={540} cy={860} r={445} fill="none" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 3); const a = g() * 6.28, d = g() * 380; return <circle key={i} cx={540 + Math.cos(a) * d} cy={860 + Math.sin(a) * d} r={4 + g() * 5} fill="#2c6b48" opacity={0.5 + 0.3 * Math.sin(T + i)} />; })}
    {children}
  </svg>;
}

function CrisprNarrado() {
  const { T, CUES: C } = useComposition();
  const FIN = C.Outro + 4;
  const L1 = C.Captura, L2 = C.Captura + 3.9, L3 = C.Captura + 8.1;            // las 3 frases de la captura
  const C2 = C.Corte + 4.6;                                                      // segunda frase del corte
  const viejos = [{ c: VIRUS[1] }, { c: VIRUS[2] }];
  const nuevo = { c: VIRUS[0], entra: kprog(T, L2 + 0.4, L2 + 1.6) };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* GANCHO: el yogur y sus bacterias "vacunadas" */}
      <Escena T={T} a={C.Gancho} b={C.Ataque} zoom={0.04}>
        <FondoMarca T={T} color={KC.pink} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Yogur T={T} x={540} y={900} cuchara={kprog(T, C.Gancho + 0.1, C.Gancho + 1.3)} /></svg>
        <Lupa T={T} at={C.Gancho + 1.2} until={C.Ataque - 0.2} x={540} y={440} r={210} fx={540} fy={730} interior={(t, r) => <CadenaLupa T={t} r={r} brillo={kprog(t, C.Gancho + 2.2, C.Gancho + 2.8)} />} etiqueta="RAYOS X · yogur" tinte={KC.mint} />
        <Etq T={T} at={C.Gancho + 1.9} until={C.Ataque - 0.2} x={40} y={1160} texto="Streptococcus thermophilus" it tam={26} lado="der" />
      </Escena>

      {/* ATAQUE: los fagos aterrizan, inyectan y una bacteria revienta */}
      <Escena T={T} a={C.Ataque} b={C.Captura} zoom={0.05}>
        <FondoMarca T={T} patron="oscuro" />
        <Ambiente T={T} n={26} seed={4} color="rgba(234,255,247,.3)" tam={[3, 8]} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Cadena T={T} x={540} y={860} n={5} r={90} revienta={{ i: 2, p: kprog(T, C.Ataque + 3.6, C.Ataque + 4.6) }} />
          {[[-2, 0.2], [0, 0.0], [1, 0.5]].map(([k, d], j) => { const at = C.Ataque + 0.3 + d, cx = 540 + k * 162, aterriza = kprog(T, at, at + 1.0, kEase.sale);
            if (k === 0 && T > C.Ataque + 3.6) return null;
            return <FagoSifo key={j} T={T} x={cx + (1 - aterriza) * 200 * (j - 1)} y={klerp(300, 770, aterriza)} s={1.15} color={VIRUS[0]} seed={j} inyecta={kprog(T, at + 1.2, at + 2.4)} />; })}
          {T > C.Ataque + 3.7 && Array.from({ length: 9 }, (_, i) => { const a = (i / 9) * 6.28, f = kprog(T, C.Ataque + 3.7, C.Ataque + 5.5, kEase.sale); return <FagoSifo key={'n' + i} T={T} x={540 + Math.cos(a) * 320 * f} y={860 + Math.sin(a) * 320 * f} s={0.6} rot={a * 57 + 90} color={VIRUS[0]} seed={i} />; })}
        </svg>
        <Etq T={T} at={C.Ataque + 1.4} until={C.Captura - 0.2} x={700} y={460} texto="fago" color={KC.pink} />
        <Escala T={T} z={1} pxPorMm={200000} y={1440} />
        <Chip T={T} at={C.Ataque + 1.0} until={C.Captura - 0.2} texto="fagos agrandados ×5" x={780} y={1060} tam={26} mono borde={KC.pink} />
      </Escena>

      {/* CAPTURA + PREGUNTA + CORTE: adentro de una bacteria sobreviviente */}
      <Escena T={T} a={C.Captura} b={C.Estudio} zoom={0.03} origen="50% 50%">
        <FondoMarca T={T} patron="oscuro" />
        <CelulaGrande T={T}>
          {/* el ADN del virus entra (captura) y vuelve a entrar (pregunta/corte) */}
          {T < C.Pregunta && <g opacity={1 - kprog(T, L2 + 0.2, L2 + 0.8)}><ADNVirus T={T} x1={200} x2={880} y={1010} color={VIRUS[0]} en={0.5} /></g>}
          {T < C.Pregunta && T > L1 + 1.2 && <g transform={`translate(${klerp(540, 420, kprog(T, L1 + 2.0, L2 + 1.2))} ${klerp(1010, 640, kprog(T, L1 + 2.0, L2 + 1.2, kEase.suave))})`} opacity={1 - kprog(T, L2 + 1.0, L2 + 1.4)}>
            <rect x={-40} y={-28} width={80} height={56} rx={10} fill={VIRUS[0]} stroke={KC.ink} strokeWidth={6} /></g>}
          {T > L1 + 0.8 && T < L2 + 0.4 && <g><Enzimita x={470} y={1000} T={T} /><Enzimita x={610} y={1000} T={T} flip /></g>}
          {T >= C.Pregunta - 0.3 && <g opacity={kprog(T, C.Pregunta - 0.3, C.Pregunta + 0.3)}><ADNVirus T={T} x1={150} x2={930} y={1060} color={VIRUS[0]} en={0.62} corte={kprog(T, C2 + 0.6, C2 + 1.6)} /></g>}
          {/* copia en ARN y las tijeras que buscan */}
          {T > C.Corte + 0.3 && T < C2 + 0.2 && <path d={`M ${klerp(420, 560, kprog(T, C.Corte + 0.3, C.Corte + 1.6))} ${klerp(660, 820, kprog(T, C.Corte + 0.3, C.Corte + 1.6))} c 20 -12 40 12 60 0`} stroke={VIRUS[0]} strokeWidth={10} fill="none" strokeLinecap="round" opacity={1 - kprog(T, C.Corte + 1.6, C.Corte + 2.0)} />}
          {T > C.Corte + 1.4 && <Cas T={T} x={T < C2 ? klerp(560, 300 + 330 * kprog(T, C.Corte + 2.4, C2 + 0.3, kEase.suave), kprog(T, C.Corte + 1.4, C.Corte + 2.4)) : 630 + 0} y={klerp(840, 980, kprog(T, C.Corte + 1.4, C.Corte + 2.4))} s={0.95} corta={kprog(T, C2 + 0.4, C2 + 0.7)} />}
          <Arreglo x={540} y={650} T={T} ancho={100} alto={76} espaciadores={[nuevo, ...viejos]} brilla={(i) => (i === 0 ? kprog(T, C.Corte, C.Corte + 0.4) * (1 - kprog(T, C2, C2 + 0.5)) : 0)} galeria={kprog(T, L3 + 0.2, L3 + 1.6)} />
        </CelulaGrande>
        <Chip T={T} at={L2 + 0.6} until={C.Pregunta - 0.2} texto="CRISPR" y={400} tam={58} borde={KC.gold} />
        <Chip T={T} at={C.Pregunta + 0.05} until={C.Corte - 0.1} texto="¿otra vez?" y={400} tam={52} borde={KC.pink} />
        <Etq T={T} at={L1 + 0.6} until={L2} x={700} y={1100} texto="ADN del virus" color={KC.pink} />
        <Etq T={T} at={C.Corte + 0.6} until={C.Corte + 2.4} x={620} y={760} texto="copia en ARN" color={KC.pink} />
        <Chip T={T} at={C2 + 0.8} until={C.Estudio - 0.2} texto="ADIÓS" y={400} tam={64} borde={KC.red} />
      </Escena>

      {/* ESTUDIO: Danisco + U. Laval (2007): con recuerdo, resiste */}
      <Escena T={T} a={C.Estudio} b={C.Nobel}>
        <FondoMarca T={T} color={KC.yellow} />
        <TarjetaEstudio T={T} at={C.Estudio + 0.2} until={C.Estudio + 3.0} anio="2007" quien="Barrangou, Horvath, Moineau y equipo" revista="Danisco (Francia) · U. Laval (Quebec) · Science 315" y={720} />
        {T > C.Estudio + 3.0 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:kprog(T, C.Estudio + 3.0, C.Estudio + 3.4) }}>
          {[[320, false], [760, true]].map(([x, mem], i) => { const muere = mem ? 0 : kprog(T, C.Estudio + 4.4, C.Estudio + 6.0);
            return <g key={i} transform={`translate(${x} 820)`}>
              <rect x={-90} y={-260} width={180} height={460} rx={80} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={8} />
              <rect x={-78} y={-100} width={156} height={290} rx={70} fill={mixHex('#d9f5e3', '#fff8d6', muere)} />
              {Array.from({ length: 10 }, (_, k) => <circle key={k} cx={-40 + (k % 3) * 40} cy={-60 + Math.floor(k / 3) * 60} r={14} fill={COCO} stroke={KC.ink} strokeWidth={4} opacity={1 - muere} />)}
              {T > C.Estudio + 3.6 && Array.from({ length: 3 }, (_, k) => <FagoSifo key={'f' + k} T={T} x={-40 + k * 40} y={klerp(-300, -120, kprog(T, C.Estudio + 3.6, C.Estudio + 4.4))} s={0.25} color={VIRUS[0]} seed={k} />)}
              {mem && <g transform="translate(0 220)"><Arreglo x={0} y={0} espaciadores={[{ c: VIRUS[0] }]} ancho={40} alto={34} etiqueta={false} /></g>}
            </g>; })}
        </svg>}
        <Chip T={T} at={C.Estudio + 3.2} until={C.Nobel - 0.2} x={320} y={470} texto="sin recuerdo" tam={32} borde={KC.ink} />
        <Chip T={T} at={C.Estudio + 3.4} until={C.Nobel - 0.2} x={760} y={470} texto="con recuerdo" tam={32} borde={KC.pink} />
        <Chip T={T} at={C.Estudio + 6.2} until={C.Nobel - 0.2} texto="resiste" x={760} y={1120} borde={KC.leaf} tam={40} />
      </Escena>

      {/* NOBEL: Charpentier y Doudna */}
      <Escena T={T} a={C.Nobel} b={C.Extra}>
        <FondoMarca T={T} color={KC.lilac} patron="rayas" />
        <TarjetaEstudio T={T} at={C.Nobel + 0.2} until={C.Nobel + 2.6} anio="2012" quien="Charpentier y Doudna" revista="Science 337: 816" y={720} />
        {T > C.Nobel + 2.6 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 800) scale(${kprog(T, C.Nobel + 2.6, C.Nobel + 3.2, kEase.rebote)}) rotate(${mece(T, 2, 0.2) * 5})`}>
            <path d="M -60 -300 L 0 -150 L 60 -300" stroke={KC.blue} strokeWidth={34} fill="none" />
            <circle r={190} fill={KC.gold} stroke={KC.ink} strokeWidth={10} /><circle r={150} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
            <Cas x={0} y={10} s={0.8} guia={KC.red} corta={0.3 + 0.3 * Math.sin(T * 4)} T={T} />
          </g>
        </svg>}
        <Chip T={T} at={C.Nobel + 3.0} until={C.Extra - 0.2} texto="Nobel de Química 2020" y={470} borde={KC.gold} tam={44} />
      </Escena>

      {/* EXTRA: 1 de cada 3 bacterias, 3 de cada 4 arqueas */}
      <Escena T={T} a={C.Extra} b={C.Cierre}>
        <FondoMarca T={T} color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[0, 1, 2].map((i) => { const on = i === 0 && T > C.Extra + 1.2; return <g key={i} transform={`translate(${290 + i * 250} 640) scale(${kprog(T, C.Extra + 0.2 + i * 0.15, C.Extra + 0.6 + i * 0.15, kEase.rebote)})`}>
            <Bacteria T={T} x={0} y={0} largo={200} ancho={86} color={on ? KC.yellow : '#bfe8cf'} seed={i} adentro={on ? () => <rect x={-50} y={-9} width={100} height={18} rx={6} fill={REP} stroke={KC.ink} strokeWidth={4} /> : null} />
          </g>; })}
          {[0, 1, 2, 3].map((i) => { const on = i < 3 && T > C.Extra + 2.8; return <g key={i} transform={`translate(${230 + i * 207} 960) scale(${kprog(T, C.Extra + 1.6 + i * 0.12, C.Extra + 2.0 + i * 0.12, kEase.rebote)})`}>
            <path d="M -70 -40 Q -90 0 -70 40 L 70 40 Q 90 0 70 -40 Z" fill={on ? KC.yellow : '#d2c4f0'} stroke={KC.ink} strokeWidth={7} transform={`rotate(${mece(T, i, 0.3) * 6})`} />
            {on && <rect x={-40} y={-8} width={80} height={16} rx={6} fill={REP} stroke={KC.ink} strokeWidth={4} />}
          </g>; })}
        </svg>
        <Chip T={T} at={C.Extra + 1.2} until={C.Cierre - 0.2} texto="bacterias: ~1 de cada 3" y={480} tam={38} borde={KC.ink} />
        <Chip T={T} at={C.Extra + 2.8} until={C.Cierre - 0.2} texto="arqueas: ~3 de cada 4" y={1100} tam={38} borde={KC.ink} />
      </Escena>

      {/* CIERRE: el mismo yogur */}
      <Escena T={T} a={C.Cierre} b={FIN} zoom={0.03}>
        <FondoMarca T={T} color={KC.pink} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Yogur T={T} x={540} y={900} /></svg>
        <Lupa T={T} at={C.Cierre + 0.1} x={540} y={440} r={210} fx={540} fy={730} interior={(t, r) => <CadenaLupa T={t} r={r} brillo={1} />} etiqueta="tijeras originales" tinte={KC.gold} />
      </Escena>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={C.Gancho + 0.1} until={C.Ataque - 0.1} texto="Bacterias *vacunadas contra virus.*" />
      <Subtitulo T={T} idx={1} at={C.Ataque + 0.1} until={C.Captura - 0.1} texto="Virus que las revientan: *los fagos.*" />
      <Subtitulo T={T} idx={2} at={L1 + 0.1} until={L2 - 0.1} texto="Le roban al virus *un pedacito de ADN.*" />
      <Subtitulo T={T} idx={3} at={L2 + 0.1} until={L3 - 0.1} texto="Una fila de recuerdos: *CRISPR.*" />
      <Subtitulo T={T} idx={4} at={L3 + 0.1} until={C.Pregunta - 0.1} texto="Cada pedazo es *un virus que ya intentó matarla.*" />
      <Subtitulo T={T} idx={5} at={C.Pregunta + 0.05} until={C.Corte - 0.1} texto="¿Y si *ese virus vuelve?*" />
      <Subtitulo T={T} idx={6} at={C.Corte + 0.1} until={C2 - 0.1} texto="Copia el recuerdo y *las tijeras Cas buscan.*" />
      <Subtitulo T={T} idx={7} at={C2 + 0.1} until={C.Estudio - 0.1} texto="Mismo pedazo: *corte. Adiós.*" />
      <Subtitulo T={T} idx={8} at={C.Estudio + 0.1} until={C.Nobel - 0.1} texto="Cada recuerdo nuevo *las volvía resistentes.*" />
      <Subtitulo T={T} idx={9} at={C.Nobel + 0.1} until={C.Extra - 0.1} texto="Tijeras para *cortar el ADN que quisieran.*" />
      <Subtitulo T={T} idx={10} at={C.Extra + 0.1} until={C.Cierre - 0.1} texto="Y no es raro: *lo traen muchísimas.*" />
      <Subtitulo T={T} idx={11} at={C.Cierre + 0.1} until={C.Outro - 0.1} texto="Las inventó *lo que hay en tu yogur.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [0, 3.6, 'avatar_11_sorprendido', 'gancho'],
        [C.Ataque + 3.4, C.Ataque + 6.0, 'avatar_10_serio_molesto', 'abajo-der'],
        [C.Captura + 5.1, C.Captura + 7.9, 'avatar_04_bajando_lentes', 'abajo-izq'],
        [C.Pregunta, C.Corte + 1.3, 'avatar_07_pensativo_puno', 'arriba-der'],
        [C.Corte + 4.8, C.Estudio - 0.5, 'avatar_13_senalando_arriba', 'abajo-der'],
        [C.Estudio + 5.9, C.Nobel - 0.1, 'avatar_11_sorprendido', 'abajo-der'],
        [C.Nobel + 3.0, C.Extra - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'presentador'],
        [C.Extra + 2.8, C.Cierre - 0.1, 'avatar_06_pensativo_menton', 'abajo-izq'],
        [C.Cierre + 0.3, C.Outro - 0.1, 'avatar_02_apuntando_camara', 'abajo-der'],
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="03" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Par de enzimas que recortan el pedacito (Cas1-Cas2, esquemático).
function Enzimita({ x, y, T, flip = false }) {
  const b = 0.5 + 0.5 * Math.sin(T * 10);
  return <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}><path d={`M 0 0 L ${40 * Math.cos(0.5 * b)} ${-40 * Math.sin(0.5 * b)} A 40 40 0 1 0 ${40 * Math.cos(0.5 * b)} ${40 * Math.sin(0.5 * b)} Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={6} /></g>;
}

function CrisprNarradoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <CrisprNarrado />
      </CompositionStage>
    </div>
  );
}
Object.assign(window, { CadenaLupa, CelulaGrande, Enzimita });
window.CrisprNarradoApp = CrisprNarradoApp;
