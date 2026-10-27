// Biotecnológico #03 · CRISPR — gemelo MUDO (M4 "Ciclo" + M1: la fila CRISPR es la partitura). Loop de 61.5 s.
// Virus rosa ataca → la bacteria guarda un pedazo → vuelve y lo corta → virus cian → lo guarda → lo corta →
// la memoria suena como melodía → la vecina todavía no recuerda nada… y llega el virus rosa (primer cuadro).

function FagoArriba({ T, at, color, seed = 1, sale }) {
  if (T < at - 1.2) return null;
  const baja = kprog(T, at - 1.2, at, kEase.sale), iny = kprog(T, at + 0.1, at + 1.0), o = sale == null ? 1 : 1 - kprog(T, sale, sale + 0.5);
  return <g opacity={o}><FagoSifo T={T} x={540} y={klerp(120, 420, baja)} s={1.2} color={color} seed={seed} inyecta={iny} /></g>;
}

function CrisprMudo() {
  const { T, CUES: C } = useComposition();
  const rosa = VIRUS[0], cian = VIRUS[1];
  const esp = [];
  if (T < C.Vecina + 5) {
    if (T > C.Captura2) esp.push({ c: cian, entra: kprog(T, C.Captura2 + 1.6, C.Captura2 + 2.8) });
    if (T > C.Captura) esp.push({ c: rosa, entra: kprog(T, C.Captura + 2.4, C.Captura + 3.6) });
  }
  // la melodía de la memoria: se ilumina cada espaciador en orden
  const toca = (i) => { const t0 = C.Memoria + 1.0 + i * 0.9; return kprog(T, t0, t0 + 0.15) * (1 - kprog(T, t0 + 0.6, t0 + 0.9)) + (T > C.Memoria + 4 && T < C.Vecina ? 0.4 : 0); };
  const brilla = (i) => {
    if (T > C.Memoria && T < C.Vecina) return toca(i);
    const c = esp[i] && esp[i].c;
    if (c === rosa && T > C.Vuelve + 1.2 && T < C.Vuelve + 4.5) return 1;
    if (c === cian && T > C.Vuelve2 + 1.0 && T < C.Vuelve2 + 3.8) return 1;
    return 0;
  };
  const ataque = (a, color, en, cortaEn) => T > a - 0.2 && T < (cortaEn ? cortaEn + 2.2 : a + 9) && <g opacity={kprog(T, a + 0.4, a + 1.0) * (cortaEn ? 1 - kprog(T, cortaEn + 1.4, cortaEn + 2.2) : 1 - kprog(T, a + 7.0, a + 8.0))}>
    <ADNVirus T={T} x1={150} x2={930} y={1060} color={color} en={en} corte={cortaEn ? kprog(T, cortaEn, cortaEn + 0.8) : 0} />
  </g>;
  const casEn = (a, cortaEn, color) => T > a && T < cortaEn + 2.2 && <Cas T={T} x={klerp(260, 540 + 780 * (0.62 - 0.5), kprog(T, a, cortaEn, kEase.suave))} y={980} s={0.9} guia={color} corta={kprog(T, cortaEn, cortaEn + 0.3)} />;
  const recorte = (a, color) => T > a && T < a + 3.8 && <>
    {T < a + 2.4 && <><Enzimita x={470} y={1050} T={T} /><Enzimita x={610} y={1050} T={T} flip /></>}
    <g transform={`translate(${klerp(540, 330, kprog(T, a + 1.4, a + 3.0))} ${klerp(1060, 650, kprog(T, a + 1.4, a + 3.0, kEase.suave))})`} opacity={1 - kprog(T, a + 3.0, a + 3.6)}><rect x={-45} y={-32} width={90} height={64} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} /></g>
  </>;
  const enCelula = T < C.Vecina + 0.2 || T > C.Vecina + 5.2;
  const caps = [{ at: 0, titulo: 'Ataque' }, { at: C.Captura, titulo: 'Guarda un recuerdo' }, { at: C.Vuelve, titulo: 'Lo reconoce' },
    { at: C.Llega2, titulo: 'Otro virus' }, { at: C.Captura2, titulo: 'Otro recuerdo' }, { at: C.Vuelve2, titulo: 'Corte' }, { at: C.Memoria, titulo: 'Su memoria' }, { at: C.Vecina, titulo: 'La vecina' }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <FondoMarca T={T} patron="oscuro" />
      {enCelula && <div style={{ position:'absolute', inset:0, opacity:T < C.Vecina + 1 ? 1 - kprog(T, C.Vecina - 0.3, C.Vecina + 0.2) : kprog(T, C.Vecina + 5.2, C.Vecina + 5.8) }}>
        <CelulaGrande T={T}>
          <FagoArriba T={T} at={T < C.Vecina ? 0.6 : C.Vecina + 10 + 0.6} color={rosa} sale={T < C.Vecina ? C.Captura + 1 : null} />
          {T < C.Vecina && <>
            <FagoArriba T={T} at={C.Vuelve + 0.2} color={rosa} seed={2} sale={C.Vuelve + 2} />
            <FagoArriba T={T} at={C.Llega2 + 0.6} color={cian} seed={3} sale={C.Captura2 + 1} />
            <FagoArriba T={T} at={C.Vuelve2 + 0.2} color={cian} seed={4} sale={C.Vuelve2 + 2} />
          </>}
          {ataque(0.6, rosa, 0.5)}
          {recorte(C.Captura + 0.3, rosa)}
          {ataque(C.Vuelve + 0.2, rosa, 0.62, C.Vuelve + 4.6)}
          {casEn(C.Vuelve + 1.6, C.Vuelve + 4.6, rosa)}
          {ataque(C.Llega2 + 0.6, cian, 0.5)}
          {recorte(C.Captura2 - 0.5, cian)}
          {ataque(C.Vuelve2 + 0.2, cian, 0.62, C.Vuelve2 + 3.8)}
          {casEn(C.Vuelve2 + 1.2, C.Vuelve2 + 3.8, cian)}
          <Arreglo x={540} y={650} T={T} ancho={100} alto={76} espaciadores={esp} brilla={brilla} galeria={T > C.Memoria + 0.5 && T < C.Vecina ? 1 : 0} />
        </CelulaGrande>
      </div>}
      {/* la vecina: zoom afuera a la cadena */}
      {T > C.Vecina - 0.4 && T < C.Vecina + 5.8 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, C.Vecina - 0.4, C.Vecina + 0.2) * (1 - kprog(T, C.Vecina + 5.0, C.Vecina + 5.6)) }}>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 860) scale(${klerp(2.2, 1, kprog(T, C.Vecina - 0.4, C.Vecina + 1.4, kEase.suave)) * klerp(1, 2.2, kprog(T, C.Vecina + 3.6, C.Vecina + 5.6, kEase.suave))}) translate(${-540 - klerp(0, 162, kprog(T, C.Vecina + 2.6, C.Vecina + 4.6, kEase.suave)) + 162} -860)`}>
            <Cadena T={T} x={540} y={860} n={5} r={90} />
            <circle cx={540 - 162} cy={860} r={100} fill="none" stroke={KC.gold} strokeWidth={8} strokeDasharray="14 10" />
            <g transform="translate(378 860)"><Arreglo x={0} y={0} espaciadores={[{ c: cian }, { c: rosa }]} ancho={30} alto={26} etiqueta={false} /></g>
          </g>
        </svg>
        <Chip T={T} at={C.Vecina + 1.0} until={C.Vecina + 3.0} texto="esta ya recuerda" y={470} borde={KC.gold} tam={40} />
        <Chip T={T} at={C.Vecina + 3.0} until={C.Vecina + 5.2} texto="esta todavía no" y={470} borde={KC.pink} tam={40} />
      </div>}

      <Capitulo T={T} caps={caps} hasta={C.Outro} />
      {(T < C.Captura - 0.4 || T > C.Vecina + 5.2) && <Chip T={T} at={T < C.Captura ? 0 : C.Vecina + 5.2} until={T < C.Captura ? C.Captura - 0.8 : null} texto="Esta bacteria se va a vacunar sola" y={1390} tam={42} borde={KC.mint} />}
      <Etq T={T} at={1.6} until={C.Captura - 0.4} x={700} y={1130} texto="ADN del virus" color={KC.pink} />
      <Etq T={T} at={C.Captura + 3.4} until={C.Vuelve} x={760} y={650} texto="CRISPR" color={KC.gold2} />
      <Chip T={T} at={C.Vuelve + 4.8} until={C.Llega2} texto="CORTE" y={470} tam={52} borde={KC.red} />
      <Chip T={T} at={C.Vuelve2 + 4.0} until={C.Memoria} texto="CORTE" y={470} tam={52} borde={KC.red} />
      <Subtitulo T={T} at={C.Captura + 0.5} until={C.Vuelve - 0.2} texto="Le roba un pedazo *y lo guarda*" />
      <Subtitulo T={T} at={C.Vuelve + 0.5} until={C.Llega2 - 0.2} texto="Si vuelve, *lo reconoce y lo corta*" />
      <Subtitulo T={T} at={C.Memoria + 0.5} until={C.Vecina - 0.2} texto="Su memoria: *cada color, un virus*" />
      <Subtitulo T={T} at={C.Vecina + 0.5} until={C.Vecina + 5} texto="Así nació *CRISPR*" />
      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} apariciones={[
        [0, 3.5, 'avatar_11_sorprendido', 'gancho'],
        [C.Captura + 2.5, C.Captura + 5.5, 'avatar_13_senalando_arriba', 'abajo-der'],
        [C.Vuelve + 0.3, C.Vuelve + 3.0, 'avatar_10_serio_molesto', 'arriba-der'],
        [C.Llega2 + 2.0, C.Llega2 + 5.0, 'avatar_04_bajando_lentes', 'abajo-izq'],
        [C.Vuelve2 + 3.8, C.Memoria + 0.6, 'avatar_05_sonriendo_dientes_uniformes', 'abajo-der'],
        [C.Memoria + 1.0, C.Memoria + 5.0, 'avatar_11_sorprendido', 'presentador'],
        [C.Vecina + 2.0, C.Vecina + 5.5, 'avatar_06_pensativo_menton', 'abajo-izq'],
      ]} />
      <Etq T={T} at={0.2} until={C.Captura - 0.4} x={150} y={1500} texto="Streptococcus thermophilus" it tam={26} color={COCO} />

      <MarcaAgua T={T} tema="bioquimica" num="03" hasta={C.Outro} />
      <CierreMarca T={T} at={C.Outro} tema="bioquimica" frase="Shot Biotecnológico" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

function CrisprMudoApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <CrisprMudo />
      </CompositionStage>
    </div>
  );
}
window.CrisprMudoApp = CrisprMudoApp;
