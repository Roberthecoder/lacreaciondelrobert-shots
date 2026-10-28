// Shot IA #01 · AlphaFold: la IA que adivina la forma de las proteínas — NARRADO (N2 "El número" + viaje N1).
// Guion y fuentes: guion.md. El dibujo es esquemático: la proteína es una cadena de 40 cuentas (no una proteína real).
const N_CUENTAS = 40;
const COLORES_AA = [KC.pink, KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac];
const LETRAS = 'MKTAYIAKQRQISFVKSHFSRQLEERLGLIEVQAPILSRV';

// Forma doblada (pseudo 3D) de la cadena: puntos compactos que giran con "ang".
function plegada(i, ang = 0, r = 1) {
  const x = 150 * Math.sin(i * 0.61) * Math.cos(i * 0.23) + 60 * Math.sin(i * 1.7);
  const y = 150 * Math.cos(i * 0.47) * Math.sin(i * 0.19 + 1) + 60 * Math.cos(i * 1.3);
  const z = 120 * Math.sin(i * 0.33 + 0.5);
  return [(x * Math.cos(ang) + z * Math.sin(ang)) * r, y * r, -x * Math.sin(ang) + z * Math.cos(ang)];
}
// Forma estirada: collar ondulado de lado a lado.
function estirada(i, T) { const u = i / (N_CUENTAS - 1); return [klerp(-470, 470, u), Math.sin(u * 9 + T * 2) * 40, 0]; }
// Curva suave (Catmull-Rom) que pasa por los puntos.
function curva(pts) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`; }
  return d;
}
// Proteína: f = 0 estirada · 1 doblada. estambre = 0..1 (1 = parece hilo de lana). confianza = colorea por confianza.
function Proteina({ T, x, y, s = 1, f = 1, estambre = 0, cuentas = 1, confianza = 0, letras = 0, gira = 0.6 }) {
  const ang = T * gira;
  const pts = Array.from({ length: N_CUENTAS }, (_, i) => {
    const fi = kclamp(f * 1.6 - (i / N_CUENTAS) * 0.6, 0, 1), e = kEase.suave(fi);
    const a = estirada(i, T), b = plegada(i, ang);
    return [klerp(a[0], b[0], e), klerp(a[1], b[1], e), klerp(a[2], b[2], e), i];
  });
  const lana = '#e9476f';
  const colorDe = (i) => confianza > 0 ? mixHex(COLORES_AA[i % 6], (i % 7 === 3 || i % 11 === 5) ? KC.orange : '#2f6dff', confianza) : COLORES_AA[Math.floor(i / 7) % 6];
  const orden = [...pts].sort((p, q) => p[2] - q[2]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={curva(pts)} fill="none" stroke={KC.ink} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" />
    <path d={curva(pts)} fill="none" stroke={estambre > 0.5 ? lana : '#f6f3ec'} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
    {estambre > 0 && <path d={curva(pts)} fill="none" stroke="#b02a4f" strokeWidth={6} strokeDasharray="4 14" opacity={estambre} />}
    {cuentas > 0 && orden.map(([px, py, pz, i]) => <g key={i} opacity={cuentas}>
      <circle cx={px} cy={py} r={(16 + pz * 0.03) * (letras ? 1.35 : 1)} fill={colorDe(i)} stroke={KC.ink} strokeWidth={5} />
      {letras > 0 && <text x={px} y={py + 9} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={letras}>{LETRAS[i]}</text>}
    </g>)}
  </g>;
}
// Cerradura (la pareja de la proteína) con su muesca triangular.
function Cerradura({ x, y, ok = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -170 -120 L 170 -120 L 170 120 L 40 120 L 0 50 L -40 120 L -170 120 Z" fill="#8e98ad" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <circle cx={0} cy={-30} r={34} fill={ok > 0.5 ? KC.mint : '#5c667a'} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Llave({ x, y, cuadrada = 0, T }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle cx={0} cy={-120} r={110} fill={KC.yellow} stroke={KC.ink} strokeWidth={9} />
    {[0, 1, 2, 3, 4, 5].map((k) => <circle key={k} cx={Math.cos(k + T) * 60} cy={-120 + Math.sin(k * 2 + T) * 50} r={20} fill={COLORES_AA[k]} stroke={KC.ink} strokeWidth={4} />)}
    {cuadrada < 0.5 ? <path d="M -40 -12 L 40 -12 L 0 64 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
      : <rect x={-46} y={-14} width={92} height={80} fill={KC.orange} stroke={KC.ink} strokeWidth={9} />}
  </g>;
}
// Cristal de proteína con rayos X y su patrón de puntos en la pantalla.
function Cristal({ T, a }) {
  const haz = kprog(T, a + 1.0, a + 1.6), pts = krng(11);
  const puntos = Array.from({ length: 46 }, () => [pts() * 2 - 1, pts() * 2 - 1, pts()]);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={40} y={830} width={150} height={120} rx={16} fill="#3c4458" stroke={KC.ink} strokeWidth={8} />
    <text x={115} y={900} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.yellow}>RX</text>
    {haz > 0 && <line x1={190} y1={890} x2={klerp(190, 820, haz)} y2={890} stroke={KC.yellow} strokeWidth={14} opacity={0.55 + 0.45 * Math.sin(T * 30)} />}
    <g transform={`translate(430 890) rotate(${T * 10})`}>
      <path d="M 0 -110 L 90 -55 L 90 55 L 0 110 L -90 55 L -90 -55 Z" fill="#b8f1ff" stroke={KC.ink} strokeWidth={8} opacity=".9" />
      <path d="M 0 -110 L 0 0 L 90 55 M 0 0 L -90 55" stroke="#5fc6e6" strokeWidth={5} fill="none" />
      {Array.from({ length: 9 }, (_, i) => <g key={i} transform={`translate(${((i % 3) - 1) * 46} ${(Math.floor(i / 3) - 1) * 46}) scale(.16)`}><Proteina T={T} x={0} y={0} f={1} cuentas={0} /></g>)}
    </g>
    <rect x={820} y={640} width={200} height={500} rx={12} fill="#10131a" stroke={KC.ink} strokeWidth={8} />
    {puntos.map(([u, v, d], i) => { const on = kprog(T, a + 1.6 + d * 2.2, a + 1.8 + d * 2.2); return on > 0 ? <circle key={i} cx={920 + u * 80} cy={890 + v * 220} r={4 + d * 7} fill="#fff" opacity={on * (0.4 + d * 0.6)} /> : null; })}
  </svg>;
}
// Disco duro esquemático (para los 23 TiB).
function Disco({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-90} width={140} height={180} rx={14} fill="#c3cbd3" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-15} r={50} fill="#e6ebf0" stroke={KC.ink} strokeWidth={5} /><circle cx={0} cy={-15} r={9} fill={KC.ink} />
    <path d="M 45 60 L 5 -10" stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
  </g>;
}

function AlphaFold() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Collar, D: CUES.Dobla, L: CUES.Llave, R: CUES.Rayos, P: CUES.Pregunta, Re: CUES.Red, E: CUES.Estudio, B: CUES.Base, O: CUES.Ojo, Pe: CUES.Pesa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // gancho: el "estambre" llega girando y a los 2.4 s se revela como proteína (cuentas de colores)
  const revela = kprog(T, K.G + 2.4, K.G + 3.2, kEase.sale);
  const llega = kprog(T, K.G, K.G + 0.8, kEase.rebote);
  const cuadrada = kprog(T, K.L + 1.4, K.L + 1.5);
  const entra = kprog(T, K.L + 0.3, K.L + 1.1, kEase.suave) * (1 - cuadrada * 0.35);
  const choca = cuadrada > 0 ? Math.sin((T - K.L - 1.5) * 40) * 10 * Math.exp(-(T - K.L - 1.5) * 3) : 0;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: estambre → proteína */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {svg(<Proteina T={T} x={500} y={980} s={klerp(0.3, 1.45, llega)} f={1} estambre={1 - revela} cuentas={revela} gira={1.2} />)}
      </Escena>
      {/* 2–3 · collar de cuentas que se dobla */}
      <Escena T={T} a={K.Co} b={K.L}>
        <FondoLunares color={T < K.D ? KC.yellow : KC.mint} />
        {svg(<Proteina T={T} x={540} y={940} s={1.05} f={1 - kprog(T, K.Co - 0.3, K.Co + 1.2, kEase.suave) + kprog(T, K.D + 0.3, K.D + 3.0)} letras={kprog(T, K.Co + 1.5, K.Co + 2.0) * (1 - kprog(T, K.D, K.D + 0.4))} gira={0.5} />)}
      </Escena>
      {/* 4 · la llave y la cerradura */}
      <Escena T={T} a={K.L} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Cerradura x={540} y={1060} ok={cuadrada < 0.5 && entra > 0.95 ? 1 : 0} />
          <g transform={`translate(${choca} 0)`}><Llave x={540} y={klerp(560, 995, entra)} cuadrada={cuadrada} T={T} /></g>
          {cuadrada > 0 && <path d="M 430 640 L 650 860 M 650 640 L 430 860" stroke={KC.red} strokeWidth={26} strokeLinecap="round" opacity={kprog(T, K.L + 1.6, K.L + 1.8)} />}
        </>)}
      </Escena>
      {/* 5 · cristales y rayos X (oscuro: es por dentro del laboratorio) */}
      <Escena T={T} a={K.R} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Cristal T={T} a={K.R} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Re} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 7 · la red lee la cadena de letras y sale la forma */}
      <Escena T={T} a={K.Re} b={K.E}>
        <FondoCircuito T={T} />
        {svg(<>
          {Array.from({ length: 14 }, (_, i) => { const u = kprog(T, K.Re + 0.3 + i * 0.12, K.Re + 1.8 + i * 0.12); return u < 1 ? <Ficha key={i} x={klerp(-60 + i * 62, 170, u)} y={klerp(640, 910, u)} texto={LETRAS[i]} tam={34} o={1 - u * 0.8} color={COLORES_AA[i % 6]} /> : null; })}
        </>)}
        <RedNeuronal T={T} x={200} y={650} ancho={520} alto={520} onda={((T - K.Re) * 0.45) % 1} />
        {svg(<Proteina T={T} x={900} y={910} s={0.5} f={kprog(T, K.Re + 2.4, K.Re + 4.2)} gira={0.9} />)}
      </Escena>
      {/* 8 · el estudio */}
      <Escena T={T} a={K.E} b={K.B}>
        <FondoLunares color={KC.orange} />
        {svg(<Proteina T={T} x={540} y={1450} s={0.6} f={1} gira={0.4} />)}
      </Escena>
      {/* 9 · 214 millones: el catálogo se llena */}
      <Escena T={T} a={K.B} b={K.O} zoom={0.03}>
        <FondoCircuito T={T} color={KC.mint} />
        {svg(Array.from({ length: 48 }, (_, i) => { const at = K.B + 0.8 + i * 0.07; if (T < at) return null; const c = i % 8, r = Math.floor(i / 8);
          return <g key={i} transform={`translate(${115 + c * 122} ${900 + r * 100}) scale(${0.17 * kprog(T, at, at + 0.3, kEase.rebote)})`}><Proteina T={T + i} x={0} y={0} f={1} gira={0.5} /></g>; }))}
      </Escena>
      {/* 10 · ojo: confianza de cada predicción */}
      <Escena T={T} a={K.O} b={K.Pe}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<Proteina T={T} x={540} y={930} s={1.3} f={1} confianza={kprog(T, K.O + 0.8, K.O + 2.0)} gira={0.5} />)}
      </Escena>
      {/* 11 · 23 TiB contra un celular */}
      <Escena T={T} a={K.Pe} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {Array.from({ length: 23 }, (_, i) => { const at = K.Pe + 0.4 + i * 0.06; return T > at ? <Disco key={i} x={150 + (i % 6) * 120 + (Math.floor(i / 6) % 2) * 40} y={1110 - Math.floor(i / 6) * 150} s={0.7 * kprog(T, at, at + 0.25, kEase.rebote)} /> : null; })}
          <g transform={`translate(880 1020) rotate(${Math.sin(T * 8) * 4 * kprog(T, K.Pe + 2, K.Pe + 2.3)})`}><rect x={-80} y={-150} width={160} height={300} rx={28} fill="#10131a" stroke={KC.ink} strokeWidth={9} /><rect x={-62} y={-120} width={124} height={230} rx={10} fill={KC.red} opacity={0.4 + 0.4 * Math.sin(T * 9)} /><text x={0} y={10} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#fff">LLENO</text></g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma imagen del inicio, ya entendida (proteína + su cerradura que encaja) */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Proteina T={T} x={500} y={900} s={1.45} f={1} estambre={kprog(T, K.C + 0.2, K.C + 0.8) * (1 - kprog(T, K.C + 1.8, K.C + 2.6))} cuentas={1 - kprog(T, K.C + 0.2, K.C + 0.8) + kprog(T, K.C + 1.8, K.C + 2.6)} gira={1.2} />
          <g opacity={kprog(T, K.C + 2.6, K.C + 3.2)}><Cerradura x={540} y={klerp(1500, 1280, kprog(T, K.C + 2.6, K.C + 3.4, kEase.sale))} ok={1} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.6} until={K.G + 2.3} x={110} y={620} texto="¿estambre?" tam={40} />
      <Etq T={T} at={K.G + 3.0} until={K.Co - 0.3} x={110} y={620} texto="proteína" tam={44} color={KC.yellow} />
      <Etq T={T} at={K.Co + 1.6} until={K.D - 0.2} x={80} y={740} texto="aminoácidos (cuentas)" tam={32} color={KC.ink} />
      <Chip T={T} at={K.D + 1.0} until={K.L - 0.3} texto="de la forma depende el trabajo" y={600} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.L + 1.7} until={K.R - 0.3} texto="otra forma: no entra" y={1500} tam={44} borde={KC.red} />
      <Chip T={T} at={K.R + 0.3} until={K.P - 0.3} texto="cristal + rayos X" y={560} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.R + 2.0} until={K.P - 0.3} x={1000} y={600} texto="patrón de puntos" lado="izq" tam={28} />
      <Chip T={T} at={K.Re + 0.2} until={K.E - 0.3} texto="AlphaFold · Google DeepMind" y={470} tam={38} borde={KC.cyan} />
      <Etq T={T} at={K.Re + 0.6} until={K.Re + 3} x={40} y={570} texto="cadena de letras" tam={28} />
      <Etq T={T} at={K.Re + 4.2} until={K.E - 0.3} x={1040} y={700} texto="forma predicha" lado="izq" tam={28} color={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.B - 0.3} anio="2021" quien="Jumper et al. · Google DeepMind" revista="Nature · el programa se liberó" y={830} />
      <NumeroGigante T={T} at={K.B + 0.4} until={K.O - 0.3} valor={214000000} dur={2.4} etiqueta="formas predichas · 2022" y={640} tam={130} />
      <Chip T={T} at={K.B + 3.0} until={K.O - 0.3} texto="gratis para cualquiera" y={1500} tam={40} borde={KC.mint} />
      <Chip T={T} at={K.O + 0.3} until={K.Pe - 0.3} texto="predicción ≠ medición" x={390} y={470} tam={46} borde={KC.orange} />
      <Etq T={T} at={K.O + 2.0} until={K.Pe - 0.3} x={80} y={1480} texto="azul: confiable · naranja: dudosa" tam={32} />
      <NumeroGigante T={T} at={K.Pe + 0.3} until={K.C - 0.3} valor={23} dur={1.2} sufijo=" TiB" etiqueta="toda la base de datos" y={560} tam={170} />
      <Chip T={T} at={K.C + 3.0} until={K.Ou} texto="no es un enredo: es una llave" y={470} tam={42} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="No es estambre: *es una proteína.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.D - 0.1} texto="Una cadena de *aminoácidos.*" />
      <Subtitulo T={T} idx={2} at={K.D + 0.1} until={K.L - 0.1} texto="Se dobla: *de su forma depende su trabajo.*" />
      <Subtitulo T={T} idx={3} at={K.L + 0.1} until={K.R - 0.1} texto="Otra forma: *la llave no entra.*" />
      <Subtitulo T={T} idx={4} at={K.R + 0.1} until={K.P - 0.1} texto="Para verla: *cristales y rayos X.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Re - 0.1} texto="¿Y si *la adivinas?*" />
      <Subtitulo T={T} idx={6} at={K.Re + 0.1} until={K.E - 0.1} texto="AlphaFold lee *la cadena de letras.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.B - 0.1} texto="2021: *Nature* y programa libre." />
      <Subtitulo T={T} idx={8} at={K.B + 0.1} until={K.O - 0.1} texto="214 millones *de formas, gratis.*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.Pe - 0.1} texto="Son predicciones: *hay que comprobarlas.*" />
      <Subtitulo T={T} idx={10} at={K.Pe + 0.1} until={K.C - 0.1} texto="23 tebibytes: *no caben en tu celular.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es un enredo: *es una llave.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Collar + 1.0, CUES.Collar + 4.4, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Llave + 1.6, CUES.Rayos + 3.0, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Red + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 0.6, CUES.Base - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Ojo + 0.9, CUES.Pesa - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pesa + 1.6, CUES.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AlphaFoldApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AlphaFold /></CompositionStage></div>;
}
window.AlphaFoldApp = AlphaFoldApp;
