// DEMO del kit (no es un shot para publicar): prueba todas las piezas de kit-robert.jsx.
// Los textos son de ejemplo; los datos científicos de un shot real llevan fuente.
const ST = (n) => 'assets/stickers/' + n + '.png';

function DemoPiece() {
  const { T } = useComposition();
  const P = MUNDO_PIEL;
  // A (0–10 s): viaje macro → micro → macro por la piel
  const keys = [
    { t: 0, x: 540, y: 960, z: 1 },
    { t: 1.5, x: 540, y: 980, z: 1.1 },
    { t: 4.5, x: 540, y: P.sup + 8, z: 34 },
    { t: 7, x: 520, y: P.capilarY, z: 40 },
    { t: 9.5, x: 540, y: 960, z: 1 },
  ];
  const cam = camaraEn(T, keys);
  const micro = kprog(cam.z, 4, 12);
  const escena = (Tl) => <Camara T={Tl} keys={keys}><MundoPiel T={Tl} /></Camara>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {T < 10 && escena(T)}
      {T < 10 && <Ambiente T={T} n={36} o={micro} color="rgba(255,240,230,.5)" />}
      {T < 10 && <Escala T={T} z={cam.z} pxPorMm={P.pxPorMm} />}
      <Capitulo T={T} hasta={10} caps={[{ at: 0.3, titulo: 'La piel' }, { at: 5, titulo: 'Los vasos' }]} />
      <Subtitulo T={T} at={0.2} until={3.6} texto="Esa roncha no la hizo el mosquito: *la hiciste tú.*" />
      <Subtitulo T={T} at={5.2} until={8.2} texto="Por aquí corren tus *glóbulos rojos.*" />
      <Sticker T={T} src={ST('avatar_11_sorprendido')} at={1.6} until={4.2} lado="arriba-der" />
      <Medidor T={T} at={5.6} until={9.2} etiqueta="HISTAMINA (demo)" valor={(t) => kprog(t, 5.8, 8.6)} color={KC.pink} />
      <Lupa T={T} at={7.6} until={9.3} x={760} y={760} r={190} zoom={3} fx={540} fy={960} render={escena} />

      {/* B (10–14 s): el número + mito tachado + comparativa */}
      {T >= 10 && T < 14 && <div style={{ position:'absolute', inset:0, background:KC.yellow }}></div>}
      <NumeroGigante T={T} at={10.1} until={13.8} valor={100} sufijo="×" etiqueta="Te pueden preferir" y={430} />
      <MitoTachado T={T} at={10.8} tacharEn={11.8} until={13.8} texto="¿Sangre dulce?" y={760} />
      <Comparativa T={T} at={11.2} until={13.8} max={100} izq={{ etiqueta:'Tú', valor:100, color:KC.pink }} der={{ etiqueta:'Al lado', valor:1, texto:'1', color:KC.cyan }} />

      {/* C (14–17 s): pasos + cronómetro + cuadrícula que se llena */}
      {T >= 14 && T < 17 && <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>}
      {T >= 14 && T < 17 && <Cuadricula T={T} cols={40} filas={52} llenado={(t) => kprog(t, 14.2, 16.8)} tramos={[{ desde: 0, hasta: 0.25, color: KC.gold }, { desde: 0.25, hasta: 0.6, color: KC.mint }]} y={620} alto={820} />}
      <Pasos T={T} pasos={[{ at: 14.1, texto: 'Consigue una placa de Petri' }, { at: 15.4, texto: 'Espera a que se llene' }]} total={2} hasta={17} y={250} />
      <Cronometro T={T} at={14.1} until={16.9} factor={3600} etiqueta="TIME-LAPSE" y={1520} />

      {/* D (17–20.5 s): estudio + cierre */}
      {T >= 17 && <div style={{ position:'absolute', inset:0, background:KC.mint }}></div>}
      <TarjetaEstudio T={T} at={17.1} until={18.6} anio="2023" quien="Equipo de ejemplo · Ciudad" revista="Revista (demo del kit)" />
      <MarcaAgua T={T} num="00" hasta={18.8} />
      <CierreMarca T={T} at={18.8} />
    </div>
  );
}

function DemoKitApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <DemoPiece />
      </CompositionStage>
    </div>
  );
}
window.DemoKitApp = DemoKitApp;
