// DEMO del kit (no es un shot para publicar): prueba todas las piezas de kit-robert.jsx.
// Los textos son de ejemplo; los datos científicos de un shot real llevan fuente.
const ST = (n) => 'assets/stickers/' + n + '.png';

// Brazo de ejemplo (por fuera) y su interior para la Lupa en modo rayos X.
function BrazoFuera({ T }) {
  const m = mece(T, 3, 0.3) * 6;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <path d={`M -40 ${1180 + m} C 260 ${1120 + m}, 560 ${1060 + m}, 820 ${1000 + m} L 860 1160 C 600 ${1220 + m}, 300 ${1290 + m}, -40 ${1330 + m} Z`} fill="#f1b48f" stroke={KC.ink} strokeWidth="8" />
    <circle cx={900} cy={1080 + m} r={120} fill="#f1b48f" stroke={KC.ink} strokeWidth="8" />
  </svg>;
}
function BrazoDentro({ T, r }) {
  const D = r * 2;
  const glob = Array.from({ length: 9 }, (_, i) => ((T * 140 + i * D / 9) % (D + 60)) - 30);
  return <svg width={D} height={D}><g transform={`rotate(-12 ${r} ${r}) translate(${-D * 0.25} 0) scale(1.5 1)`}>
    <rect x="0" y={D * 0.18} width={D} height={D * 0.64} fill="#d98f6b" opacity=".25" />
    <rect x="-10" y={D * 0.33} width={D + 20} height={D * 0.12} rx={D * 0.06} fill="#eef6ff" opacity=".92" />
    <rect x="-10" y={D * 0.53} width={D + 20} height={D * 0.09} rx={D * 0.045} fill="#eef6ff" opacity=".85" />
    <rect x="-10" y={D * 0.66} width={D + 20} height={D * 0.07} fill="#e23b3b" opacity=".55" />
    {glob.map((gx, i) => <ellipse key={i} cx={gx} cy={D * 0.695 + (i % 3 - 1) * 6} rx="16" ry="10" fill="#ff5a5a" />)}
  </g></svg>;
}

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

      {/* E (17–21 s): Lupa en modo rayos X — el brazo por fuera, el hueso y la sangre por dentro */}
      {T >= 17 && T < 21 && <div style={{ position:'absolute', inset:0, background:KC.pink }}></div>}
      {T >= 17 && T < 21 && <BrazoFuera T={T} />}
      <Lupa T={T} at={17.6} until={20.4} x={600} y={560} r={240} fx={(t) => 420 + 6 * Math.sin(t * 2)} fy={1090} interior={(t, r) => <BrazoDentro T={t} r={r} />} etiqueta="POR DENTRO (demo)" />
      <Subtitulo T={T} at={17.4} until={20.5} texto="Por fuera no ves *el hueso* ni la sangre." />

      {/* D (21–24.5 s): estudio + cierre */}
      {T >= 21 && <div style={{ position:'absolute', inset:0, background:KC.mint }}></div>}
      <TarjetaEstudio T={T} at={21.1} until={22.6} anio="2023" quien="Equipo de ejemplo · Ciudad" revista="Revista (demo del kit)" />
      <MarcaAgua T={T} num="00" hasta={22.8} />
      <CierreMarca T={T} at={22.8} />
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
