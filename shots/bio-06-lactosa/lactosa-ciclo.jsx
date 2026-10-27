// Shot bio-06 · GEMELO MUDO (M4 "Ciclo", 61.5 s en loop): el ciclo de la renovación del intestino.
// Un solo mundo continuo con la cámara viajando (nunca un corte seco). Termina donde empezó:
// la cripta hace células nuevas sin el gen y vuelve a entrar lactosa, que es el primer cuadro.
// La música sale de los datos y cuenta el estado (ver gen-audio.mjs). Sin voz: poco texto.

// Células viejas que se desprenden y se van flotando (escena "Muda").
function CelulasSueltas({ T, a, p = 0, n = 9 }) {
  if (p <= 0) return null;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: n }, (_, i) => {
      const g = krng(i * 23 + 5), at = a + i * 0.42, u = T - at;
      if (u < 0) return null;
      const x = 90 + g() * 900 + mece(T, i, 0.3) * 40, y = 1060 - u * 86 - g() * 60;
      const o = kclamp(1 - u / 6.5, 0, 1);
      return <g key={i} transform={`translate(${x} ${y}) rotate(${u * 34 + g() * 180}) scale(${0.8 + g() * 0.3})`} opacity={o * 0.9}>
        <rect x={-40} y={-52} width={80} height={104} rx={18} fill="#ffd0c8" stroke="#8e3b3b" strokeWidth={6} />
        <circle cy={12} r={17} fill="#c76a66" />
        {[0, 1, 2, 3].map((k) => <line key={k} x1={-30 + k * 20} y1={-52} x2={-30 + k * 20} y2={-66} stroke="#ffb0a4" strokeWidth={4} />)}
      </g>;
    })}
  </svg>;
}

function LactosaCiclo() {
  const { T, CUES } = useComposition();
  const K = { En: CUES.Entra, Pa: CUES.Pasa, Ga: CUES.Gas, Ll: CUES.Llega, Ha: CUES.Hace,
    Co: CUES.Corta, Mu: CUES.Muda, Cr: CUES.Cripta, Ou: CUES.Outro };
  const B = MUNDO_INTESTINO.baseY;

  // un solo viaje de cámara: lumen → borde → cripta → otra vez el lumen (el loop)
  const keys = [
    { t: K.En, x: 540, y: 900, z: 1 },
    { t: K.Pa, x: 560, y: 980, z: 1.08 },
    { t: K.Ga, x: 520, y: 880, z: 1.0 },
    { t: K.Ll, x: 540, y: 820, z: 0.98 },
    { t: K.Ha, x: 430, y: 1060, z: 1.5 },
    { t: K.Co, x: 560, y: 1000, z: 1.35 },
    { t: K.Mu, x: 540, y: 1020, z: 1.2 },
    { t: K.Cr, x: 452, y: B + 120, z: 2.1 },
    { t: K.Ou, x: 540, y: 900, z: 1 },
  ];
  const cam = camaraEn(T, keys);
  // estado del ciclo
  const lactasa = kprog(T, K.Ha + 0.3, K.Co - 0.3, kEase.sale) * (1 - kprog(T, K.Mu + 1.4, K.Cr, kEase.suave));
  const corta = kprog(T, K.Co + 0.2, K.Co + 2.6, kEase.suave) * (1 - kprog(T, K.Mu + 2.0, K.Cr - 0.2));
  const gas = kprog(T, K.Ga - 0.6, K.Ga + 1.6) * (1 - kprog(T, K.Co + 0.4, K.Co + 2.4))
            + kprog(T, K.Cr + 3.0, K.Ou - 0.2) * 0.7;
  const mols = T < K.Ha ? 10 : T < K.Mu ? 8 : T < K.Cr + 2.4 ? 4 : 9;

  const caps = [
    { at: K.En, titulo: 'entra la lactosa' },
    { at: K.Pa, titulo: 'nadie la corta' },
    { at: K.Ga, titulo: 'las bacterias la fermentan' },
    { at: K.Ll, titulo: 'llega el virus con el gen' },
    { at: K.Ha, titulo: 'la célula hace la enzima' },
    { at: K.Co, titulo: 'ahora sí se parte' },
    { at: K.Mu, titulo: 'las células viejas se van' },
    { at: K.Cr, titulo: 'la cripta hace células nuevas' },
  ];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Camara T={T} keys={keys} respira={1.2}>
        <MundoIntestino T={T} lactasa={lactasa} lactosa={mols} corta={corta}
          cripta={kprog(T, K.Cr - 0.8, K.Cr + 0.6)} gas={kclamp(gas, 0, 1)} />
        {/* virus que bajan con el gen (escena "Llega") */}
        {T > K.Ll - 1 && T < K.Ha + 1.2 && [0, 1, 2, 3].map((i) => {
          const at = K.Ll + 0.3 + i * 0.6, p = kprog(T, at, at + 2.4, kEase.suave);
          if (T < at) return null;
          return <svg key={i} width={KW} height={KH} style={{ position:'absolute', left:0, top:0, overflow:'visible' }}>
            <g transform={`translate(${250 + i * 200 + mece(T, i, 0.4) * 26} ${klerp(240, B - 150, p)})`}>
              <VirusAAV T={T} s={0.6} rot={(T - at) * 160} r={95} suelta={kclamp((p - 0.84) / 0.16, 0, 1)} />
            </g>
          </svg>;
        })}
        {/* el gen encendido en el borde mientras la enzima existe */}
        {lactasa > 0.05 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, overflow:'visible' }}>
          {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${110 + i * 176 - 26} ${B - 40} q 26 -22 52 0`}
            fill="none" stroke={GEN} strokeWidth={8} strokeLinecap="round" opacity={lactasa * 0.9}
            style={{ filter:`drop-shadow(0 0 12px ${GEN})` }} />)}
        </svg>}
      </Camara>
      <Ambiente T={T} n={30} seed={17} color="rgba(190,240,255,.28)" tam={[3, 9]} vel={-12} area={{ x: 0, y: 0, w: KW, h: 820 }} />

      <CelulasSueltas T={T} a={K.Mu + 0.4} p={kprog(T, K.Mu, K.Mu + 0.5)} />

      {/* poco texto: capítulos numerados bajo el logo + el estado + la escala */}
      <Capitulo T={T} caps={caps} hasta={K.Ou - 0.1} />
      <Escala T={T} z={cam.z} pxPorMm={MUNDO_INTESTINO.pxPorMm} />
      <Chip T={T} at={K.Ga + 0.4} until={K.Co + 0.2} texto="GAS" y={470} borde={KC.red} tam={54} mono />
      <Chip T={T} at={K.Co + 1.2} until={K.Mu + 1.0} texto="GLUCOSA + GALACTOSA" y={470} borde={KC.mint} tam={46} mono />
      <Chip T={T} at={K.Cr + 3.4} until={K.Ou - 0.1} texto="…y vuelve a empezar" y={470} borde={KC.gold} tam={46} />
      <NumeroGigante T={T} at={K.Mu + 0.2} until={K.Cr - 0.2} valor={5} prefijo="cada " sufijo=" días"
        etiqueta="SE CAMBIA TODO EL BORDE" y={640} tam={110} color={KC.yellow} />

      <MarcaAgua T={T} tema="bioquimica" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LactosaCicloApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <LactosaCiclo />
      </CompositionStage>
    </div>
  );
}
window.CelulasSueltas = CelulasSueltas;
window.LactosaCicloApp = LactosaCicloApp;
