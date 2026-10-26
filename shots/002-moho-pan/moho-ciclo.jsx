// Shot 002 · El moho del pan — gemelo MUDO (formato M4 "Ciclo", loop de 61.5 s).
// Ciclo asexual de Rhizopus stolonifer. El último cuadro es igual al primero: el video vuelve a empezar sin corte.
// Sin días ni horas en pantalla (no hay fuente firme para pan a temperatura ambiente): el tiempo se ve con día/noche.

function DiaNoche({ T, hasta }) {
  if (T >= hasta) return null;
  const fase = (Math.sin((T / 8) * Math.PI * 2 - Math.PI / 2) + 1) / 2; // 0 día · 1 noche
  return <div style={{ position:'absolute', right:44, top:190, zIndex:44, width:84, height:84, borderRadius:'50%', background:mixHex('#ffd23f', '#b18cff', fase), boxShadow:`0 0 ${30 + 30 * (1 - fase)}px ${mixHex('#ffd23f', '#b18cff', fase)}`, border:`5px solid ${KC.ink}` }}>
    <div style={{ position:'absolute', left:20 + 40 * (1 - fase), top:8, width:62, height:62, borderRadius:'50%', background:KC.noche, opacity:fase }}></div>
  </div>;
}

function MohoCiclo() {
  const { T, CUES } = useComposition();
  const K = { L: CUES.Llega, G: CUES.Germina, I: CUES.Invade, S: CUES.Sube, C: CUES.Capsulas, R: CUES.Revientan, O: CUES.Otro, F: CUES.Outro };
  function mpk(t, x, y, z) { const p = mp(x, y); return { t, x: p.x, y: p.y, z }; }
  // punto real de la colonia que protagoniza (el más cercano a +560) y su altura
  const N = nodosPan(3), hI = N.reduce((b, n, i) => (Math.abs(n.x - 560) < Math.abs(N[b].x - 560) ? i : b), 0), HX = N[hI].x, HH = N[hI].h;
  const keys = [
    mpk(K.L, 0, -60, 900),
    mpk(K.G + 0.5, 0, -60, 900),
    mpk(K.I, 0, 300, 300),
    mpk(K.S, 0, 1300, 45),
    mpk(K.S + 1.8, 0, -60, 110),        // al nodo donde nació la red: ahí salen los rizoides
    mpk(K.S + 5.5, HX / 2, -300, 70),      // el estolón sale de ese nodo hacia el siguiente
    mpk(K.C, HX, -700, 70),
    mpk(K.C + 4, HX, -HH, 520),
    mpk(K.R + 0.2, HX, -HH, 520),
    mpk(K.R + 2.5, 300, -600, 70),
    mpk(K.R + 7.5, 0, -400, 30),
    { t: K.O + 2, x: 700, y: 800, z: 1.2 },
    { t: K.O + 6, x: 700 + 1200, y: 800, z: 1.2 },
    { t: K.O + 6.001, x: 700, y: 800, z: 1.2 },      // la rebanada nueva pasa a ser la principal (salto invisible)
    mpk(K.F, 0, -60, 900),
  ];
  const cam = camaraEn(T, keys);
  const nueva = T >= K.O + 6;                         // a partir de aquí todo empieza de cero
  const macro = {
    moho: nueva ? 0 : kprog(T, K.I, K.R + 4),
    rayosX: nueva ? 0 : kprog(T, K.R + 6, K.O + 1.5),
    soplo: K.O + 0.5,
    otra: !nueva ? { dx: 1200, moho: 0 } : null,
  };
  // espora: cae al inicio; al final otra cae desde arriba y queda en la misma posición del cuadro 0
  const yInicio = -230;
  let esp;
  if (T < K.O) esp = { y: klerp(yInicio, -8, kprog(T, K.L, K.L + 1.2, (p) => p * p)), germina: kprog(T, K.G + 0.3, K.G + 3.5) };
  else if (nueva) esp = { y: klerp(-1800, yInicio, kprog(T, K.O + 8, K.F, kEase.sale)), germina: 0 };
  else esp = null;
  // orden: 1) la red coloniza la miga · 2) de esa red salen los rizoides · 3) luego los estolones y los tallitos
  const micro = nueva ? { g: 0, colonia: 0, capsulas: 0, espora: esp } : {
    g: kprog(T, K.G + 2.5, K.I) * 0.15 + kprog(T, K.I, K.S) * 0.75,
    colonia: kprog(T, K.S + 0.6, K.S + 8.6),
    capsulas: kprog(T, K.C + 0.5, K.C + 6),
    revientan: N.map((n, i) => K.R + (i === hI ? 0.6 : 1.8 + ((i + 6 - hI) % 6) * 0.8)),
    espora: esp,
  };
  const microF = kprog(Math.log(cam.z), Math.log(28), Math.log(45));
  const caps = [
    { at: K.L + 0.2, titulo: 'Llega una espora' }, { at: K.G, titulo: 'Germina' }, { at: K.I, titulo: 'Invade la miga' },
    { at: K.S, titulo: 'Se ancla y sube' }, { at: K.C, titulo: 'Cápsulas de esporas' }, { at: K.R, titulo: 'Revientan' }, { at: K.O, titulo: 'Otro pan' },
  ];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <MundoMoho T={T} keys={keys} macro={macro} micro={micro} />
      <Ambiente T={T} n={30} o={microF * 0.8} color="rgba(234,255,247,.45)" tam={[3, 9]} />
      <Escala T={T} z={cam.z} pxPorMm={MUNDO_PAN.pxPorMm} />
      <Capitulo T={T} caps={caps} hasta={K.F} />
      <DiaNoche T={T} hasta={K.F} />

      <EtqMundo T={T} cam={cam} at={K.L + 1.3} until={K.G + 2} wx={0} wy={-8} dx={-40} texto="espora" lado="izq" />
      <Etq T={T} at={K.L + 1.8} until={K.G + 2} x={120} y={560} texto="Rhizopus stolonifer" it />
      <EtqMundo T={T} cam={cam} at={K.G + 3} until={K.I} wx={0} wy={90} dx={40} texto="hifa" />
      <EtqMundo T={T} cam={cam} at={K.S + 1.2} until={K.C} wx={-40} wy={170} dx={-30} texto="rizoides" lado="izq" />
      <EtqMundo T={T} cam={cam} at={K.S + 3.6} until={K.C} wx={HX / 2} wy={-170} dy={-24} texto="estolón" />
      <EtqMundo T={T} cam={cam} at={K.C + 4.2} until={K.R} wx={HX} wy={-HH} dx={100} texto="cápsula de esporas" />

      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={K.R + 0.7} until={K.R + 3} lado="arriba-der" />

      <MarcaAgua T={T} num="02" hasta={K.F} />
      <CierreMarca T={T} at={K.F} frase="El ciclo del moho del pan" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_ciclo.wav'} />
    </div>
  );
}

function MohoCicloApp() {
  return (
    <div style={{ position:'fixed', inset:0, background:'#000' }}>
      <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
        <MohoCiclo />
      </CompositionStage>
    </div>
  );
}
window.MohoCicloApp = MohoCicloApp;
