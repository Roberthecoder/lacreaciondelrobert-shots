// Shot Fungi Mati #155 · El iceberg de los hongos — NARRADO, en MODO CINE (rehecho a mano el 26 nov 2026, pedido de Robert:
// «mucho más detallado… aplica el nuevo estilo cinematográfico»). Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.
// Un solo mundo: el cuadro 0 es el champiñón a pantalla completa sobre la punta del iceberg; la cámara se aleja, se hunde y baja por
// una columna de hielo y agua que se oscurece (paralaje: hielo, micelio, nieve marina, bokeh). Cada dato es una escena grande
// incrustada a su profundidad; al final la cámara se aleja hasta ver el iceberg entero con todo el micelio encendido.
// Piezas reutilizables: iceberg-cine.jsx.

/* ---------- TEXTOS Y CIFRAS (solo lo que dicen el guion y verificacion.md) ---------- */
const TX = {
  agaricus: 'Agaricus bisporus', noPlantas: 'no son plantas', sacch: 'Saccharomyces cerevisiae', penicillium: 'Penicillium',
  quitina: 'quitina', caparazon: 'caparazón',
  brillanLinea: 'especies que brillan · 132 conocidas (2024)',
  armAnio: '2003', armLinea: 'estudio · Oregón, EE. UU.', armillaria: 'Armillaria', armLinea2: '965 ha · Oregón, EE. UU. · estudio de 2003',
  muerde: 'muerde la vena', ophio: 'Ophiocordyceps', microscopio: 'AL MICROSCOPIO', nematodo: 'nematodo', anillo: 'anillo de 3 células',
  schizo: 'Schizophyllum commune', laminas: 'láminas partidas', sexosLinea: 'tipos de apareamiento (estimados)',
  radAnio: '2007', radLinea: 'laboratorio', negros: 'hongos negros · melanina', sinRad: 'sin radiación', conRad: 'con radiación',
  hipotesis: '¿la usan como energía? · hipótesis',
};

/* ---------- piezas fijas de este shot ---------- */
const MIC_N1 = icRamas({ seed: 21, x: 760, y: 1188, ang: Math.PI / 2, len: 230, gen: 4, nb: [4, 3, 2], dentro: (x, y) => y > 1188 && y < 1440 && x > 560 && x < 960, fuerza: 0.02, jit: 0.55, paso: 10, abre: [0.5, 0.7] });
const LEVS = [[540, 960, 140, 112, -20, 1], [240, 680, 112, 90, 30, 0], [860, 680, 104, 84, -40, 0.35], [210, 1250, 122, 98, 15, 0], [870, 1290, 130, 102, 60, 0.6], [560, 1530, 98, 80, 0, 0], [530, 470, 92, 74, 20, 0]];
const RED_LAZO = [[[-60, 1330], [1140, 1330]], [[-60, 640], [300, 760], [520, 700], [1140, 560]], [[200, 1600], [420, 1450], [640, 1500], [1140, 1420]]];
const HEXES_EL = (() => { const o = []; for (let y = -130; y < 380; y += 40) for (let x = -200; x <= 200; x += 36) { const ex = 218 - Math.max(0, (y - 120)) * 0.7; if (Math.abs(x) < ex - 10 && Math.abs(x) > 8) o.push([x + ((y / 40) % 2 ? 18 : 0), y]); } return o; })();

/* ---------- cámaras ---------- */
function interpKeys(T, keys) {   // keys: [t, ...valores]; interpolación suave entre llaves
  if (T <= keys[0][0]) return keys[0].slice(1);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (T <= b[0]) { const p = kEase.suave((T - a[0]) / (b[0] - a[0])); return a.slice(1).map((v, j) => klerp(v, b[j + 1], p)); }
  }
  return keys[keys.length - 1].slice(1);
}
// cámara de la vista general: interpola la escala en logaritmo y el centro según cuánto cambia lo que se ve (zoom anclado)
function camOV(T, keys) {
  let i = 0; while (i < keys.length - 2 && T > keys[i + 1][0]) i++;
  const a = keys[i], b = keys[i + 1];
  const p = kEase.suave(kclamp((T - a[0]) / (b[0] - a[0]), 0, 1));
  const s = Math.exp(klerp(Math.log(a[1]), Math.log(b[1]), p));
  const q = Math.abs(1 / b[1] - 1 / a[1]) < 1e-6 ? p : (1 / s - 1 / a[1]) / (1 / b[1] - 1 / a[1]);
  return { s, cx: klerp(a[2], b[2], q), cy: klerp(a[3], b[3], q) };
}

function IcebergShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N1: CUES.Nivel1, Pe: CUES.Penicilina, Qu: CUES.Quitina, Br: CUES.Brillan, Ar: CUES.Armillaria, Pr: CUES.Pregunta, Ho: CUES.Hormiga,
    La: CUES.Lazos, Se: CUES.Sexos, Ra: CUES.Radiacion, Ci: CUES.Cierre, Ou: CUES.Outro };
  const N1b = K.N1 + 3.3;

  /* ---------- estaciones del descenso: cada dato a su profundidad ---------- */
  const ST = [
    { id: 'planta', Y: 0, a: K.N1, b: N1b, dib: () => {
      const t = T - K.N1, sep = kprog(t, 1.8, 2.5, kEase.sale), aleja = kprog(t, 2.2, 3.0, kEase.suave);
      return <g>
        <ellipse cx={540} cy={1080} rx={620} ry={560} fill="#06101c" opacity=".35" />
        <SueloCorte x0={100} x1={985} y={1188} h={290} />
        <g opacity={1 - 0.62 * aleja} transform={`translate(${-36 * aleja} 0)`}><Plantula x={300} y={1192} s={1.18} T={T} /></g>
        {MIC_N1.map((b, i) => <Brilla key={i} d={b.d} w={Math.max(1, 2.4 - b.g * 0.45)} o={(0.55 + 0.45 * aleja) * (1 - b.g * 0.12)} />)}
        <ChampinonCine x={760} y={1192} s={0.4} id="chN1" />
        {sep > 0 && <g><line x1={540} y1={600} x2={540} y2={600 + 890 * sep} stroke="#e6f1ff" strokeWidth={2.5} opacity=".75" /><path d="M 540 588 l 9 12 l -9 12 l -9 -12 Z" fill="#e6f1ff" opacity={0.8 * sep} /></g>}
      </g>; } },
    { id: 'pan', Y: 1750, a: N1b, b: K.Pe, dib: () => {
      const t = T - N1b, zs = Math.pow(9, kprog(t, 1.0, 1.85, kEase.suave)), fr = kprog(t, 1.15, 1.95, kEase.suave);
      return <g>
        {fr < 1 && <g opacity={1 - kprog(t, 1.6, 1.95)} transform={`translate(640 990) scale(${zs}) translate(-640 -990)`}><HogazaCorte T={T} infla={kprog(t, -0.2, 1.3, kEase.suave)} /></g>}
        {fr > 0 && <g>
          <defs><clipPath id="lvC"><circle cx={640} cy={990} r={1700 * fr} /></clipPath></defs>
          <circle cx={640} cy={990} r={1700 * fr} fill="#0a1220" />
          <g clipPath="url(#lvC)">
            {LEVS.map(([x, y, rx, ry, rot, yema], i) => <Levadura key={i} x={x + 6 * Math.sin(T * 0.7 + i)} y={y + 5 * Math.cos(T * 0.6 + i)} rx={rx} ry={ry} rot={rot} yema={yema === 1 ? klerp(0.15, 1, kprog(t, 1.6, 3.6)) : yema} T={T} sd={i + 3} />)}
            {Array.from({ length: 16 }, (_, i) => { const c = LEVS[i % LEVS.length], u = ((t * 70 + i * 47) % 300); return <circle key={i} cx={c[0] + (i % 3 - 1) * 40 + 8 * Math.sin(T * 3 + i)} cy={c[1] - c[3] - u} r={5 + (i % 4) * 2.5} fill="none" stroke="#dbeeff" strokeWidth={2} opacity={0.75 * (1 - u / 300)} />; })}
          </g>
          <circle cx={640} cy={990} r={1700 * fr} fill="none" stroke="#cfe6ff" strokeWidth={3} opacity=".4" />
        </g>}
      </g>; } },
    { id: 'petri', Y: 3500, a: K.Pe, b: K.Qu, dib: () => <PetriCine T={T} crece={kprog(T - K.Pe, -0.3, 2.3, kEase.sale)} /> },
    { id: 'quitina', Y: 5300, a: K.Qu, b: K.Br, dib: () => {
      const t = T - K.Qu, fadeH = 1 - kprog(t, 2.3, 3.1), zH = 1 + 0.45 * kprog(t, 0, 2.3, kEase.suave), be = kprog(t, 2.2, 3.0);
      const flujo = kprog(t, 1.9, 3.3), yQ = 800 + (980 - 230 + 40 - 800) * zH;
      return <g>
        <defs><radialGradient id="quF" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#060b15" stopOpacity=".93" /><stop offset=".7" stopColor="#060b15" stopOpacity=".85" /><stop offset="1" stopColor="#060b15" stopOpacity="0" /></radialGradient></defs>
        {fadeH > 0 && <ellipse cx={540} cy={980} rx={1050} ry={900} fill="url(#quF)" opacity={fadeH} />}
        {fadeH > 0 && <g opacity={fadeH} transform={`translate(540 800) scale(${zH}) translate(-540 -800) translate(0 980)`}><HifaPared T={T} x0={-300} x1={1380} R={230} luzQ={kprog(t, 0.8, 2.0)} /></g>}
        {be > 0 && <g opacity={be} transform={`translate(540 1050) scale(${0.82 + 0.13 * kprog(t, 2.2, 4.8, kEase.sale)})`}>
          <EscarabajoCine T={T} x={0} y={0} s={1} iri={t * 0.22} mov={1} />
          {HEXES_EL.map(([x, y], i) => <path key={i} d={icHex(x, y, 10)} fill="none" stroke="#ffd27a" strokeWidth={2} opacity={0.4 * (1 - kprog(t, 3.3, 4.6))} />)}
        </g>}
        {flujo > 0 && flujo < 1 && Array.from({ length: 22 }, (_, i) => { const u = kclamp(flujo * 1.6 - i * 0.03, 0, 1); if (u <= 0 || u >= 1) return null; const x0 = 540 + (i - 11) * 40 * zH, y0 = yQ, x1 = 540 + HEXES_EL[(i * 5) % HEXES_EL.length][0] * 0.9, y1 = 1050 + 0.9 * HEXES_EL[(i * 5) % HEXES_EL.length][1]; const x = klerp(x0, x1, u) + Math.sin(u * 3.14) * (i % 2 ? 80 : -80), y = klerp(y0, y1, u); return <path key={i} d={icHex(x, y, 11)} fill="none" stroke="#ffd27a" strokeWidth={2.6} opacity={Math.sin(u * 3.14)} />; })}
      </g>; } },
    { id: 'mycena', Y: 7200, a: K.Br, b: K.Ar, dib: () => { const t = T - K.Br; return <g transform="translate(0 250)"><BosqueMycena T={T} luz={kprog(t, 0.7, 1.6)} lt={kprog(t, 0.6, 2.6)} /></g>; } },
    { id: 'bosque', Y: 9100, a: K.Ar, b: K.Pr, dib: () => <g transform="translate(0 170)"><BosqueCorte T={T} viaje={kprog(T - K.Ar, 2.0, 5.8)} /></g> },
    { id: 'pregunta', Y: 10900, a: K.Pr, b: K.Ho, drift: 200, dib: () => <g transform="translate(0 140)"><NudoMicelio T={T} /></g> },
    { id: 'hormiga', Y: 12150, a: K.Ho, b: K.La, pre: K.Pr, dib: () => {
      const t = T - K.Ho, sil = 1 - kprog(T, K.Ho - 0.2, K.Ho + 0.5);
      return <g opacity={1 - 0.72 * sil} transform="translate(0 320)">
        <HojaCine T={T} />
        <HormigaCine T={T} x={610} y={620} rot={-5} vive={1 - kprog(t, 2.5, 3.1)} muerde={kprog(t, 1.3, 1.8)} tallo={kprog(t, 3.5, 5.5, kEase.suave)} />
      </g>; } },
    { id: 'lazos', Y: 13950, a: K.La, b: K.Se, dib: () => {
      const t = T - K.La, inf = kprog(t, 1.75, 2.15, kEase.sale), atrapado = kprog(t, 1.8, 2.3);
      const hx = klerp(-160, 720, kprog(t, -0.5, 1.95, kEase.sale)) + 10 * Math.sin(T * 18) * atrapado * (1 - kprog(t, 2.3, 3.6));
      return <g transform="translate(0 90)">
        <defs><radialGradient id="lzF" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#050a12" stopOpacity=".95" /><stop offset=".72" stopColor="#050a12" stopOpacity=".88" /><stop offset="1" stopColor="#050a12" stopOpacity="0" /></radialGradient></defs>
        <ellipse cx={540} cy={980} rx={1100} ry={980} fill="url(#lzF)" />
        {RED_LAZO.map((p, i) => <g key={i}><Brilla d={icCurva(p.map(([x, y]) => [x, y - 22]))} color="#7fd8f0" w={2} o={0.55} nucleo="#cfefff" /><Brilla d={icCurva(p.map(([x, y]) => [x, y + 22]))} color="#7fd8f0" w={2} o={0.55} nucleo="#cfefff" /></g>)}
        <Nematodo T={T} hx={hx} cy={980} largo={1000} atrapado={atrapado} />
        <AnilloTrampa cx={540} cy={980} R={190} r0={112} inf={inf} T={T} />
      </g>; } },
    { id: 'schizo', Y: 15750, a: K.Se, b: K.Ra, dib: () => {
      const t = T - K.Se;
      return <g transform="translate(540 1000) scale(0.92) translate(-540 -880)">
        <RamaSchizo />
        <AbanicoLado x={150} y={1205} s={1.15} rot={-14} sd={1} />
        <AbanicoLado x={930} y={1068} s={1.3} rot={-6} sd={2} />
        <AbanicoDebajo x={330} y={1185} R={170} a0={1.1} a1={1.86} crece={kprog(t, -0.6, 0.8, kEase.sale)} T={T} sd={7} />
        <AbanicoDebajo x={770} y={1110} R={200} a0={1.14} a1={1.92} crece={kprog(t, -0.5, 1.0, kEase.sale)} T={T} sd={8} />
        <AbanicoDebajo x={545} y={1150} R={360} crece={kprog(t, -0.4, 1.2, kEase.sale)} T={T} sd={3} />
        <AbanicoLado x={420} y={1268} s={0.85} rot={176} sd={3} />
        <AbanicoLado x={700} y={1225} s={0.95} rot={172} sd={4} />
      </g>; } },
    { id: 'rad', Y: 17600, a: K.Ra, b: K.Ci, dib: () => {
      const t = T - K.Ra, g = kprog(t, 1.2, 7.2, kEase.suave);
      return <g>
        <MesaLab T={T} />
        <PlacaNegra cx={285} cy={1150} g={g} mas={0.15} sd={3} id="pnA" />
        <PlacaNegra cx={795} cy={1150} g={g} mas={1} sd={5} id="pnB" />
        <SimboloRadiacion x={950} y={905} r={30} />
        {Array.from({ length: 9 }, (_, i) => { const u = ((t * 0.9 + i / 9) % 1); return <circle key={i} cx={klerp(950, 800 + (i % 3 - 1) * 90, u)} cy={klerp(905, 1130 + (i % 2) * 40, u)} r={3.2} fill="#ffe38a" opacity={0.8 * Math.sin(u * 3.14)} />; })}
      </g>; } },
  ];
  const visibleO = (st) => kprog(T, (st.pre != null ? st.pre : st.a) - 0.8, (st.pre != null ? st.pre : st.a) - 0.2) * (1 - kprog(T, st.b + 0.2, st.b + 0.8));
  const zoomSt = (st) => 1 + 0.08 * kprog(T, st.a, st.b + 0.5);

  // cámara de la columna: llega a cada estación al empezar su frase y avanza despacio mientras dura
  const ck = [[K.G + 3.4, -1150]];
  ST.forEach((st) => { ck.push([st.a + 0.45, st.Y]); ck.push([st.b - 0.45, st.Y + (st.drift || 120)]); });
  ck.push([K.Ci + 1.2, ST[ST.length - 1].Y + 330]);
  const Y = interpKeys(T, ck)[0];
  const scr = (st, x, y) => { const z = zoomSt(st); return [540 + (x - 540) * z, 980 + (y - 980) * z + st.Y - Y]; };
  const S = Object.fromEntries(ST.map((s) => [s.id, s]));

  /* ---------- capas: vista general (gancho y cierre) y columna del descenso ---------- */
  const enCierre = T > K.Pr;
  const ov = enCierre
    ? camOV(T, [[K.Ci, 2.4, 600, 1450], [K.Ci + 2.1, 1, 540, 930], [K.Ou + 3.5, 0.955, 540, 925]])
    : camOV(T, [[K.G, 11.11, 540, 473.2], [K.G + 1.4, 8.4, 540, 482], [K.G + 3.0, 1.32, 548, 880], [K.N1 - 0.35, 1.16, 540, 930], [K.N1 + 0.7, 7.5, 420, 645]]);
  const ovO = enCierre ? kprog(T, K.Ci, K.Ci + 0.8) : 1 - kprog(T, K.N1 + 0.0, K.N1 + 0.5);
  const luz = enCierre ? 1900 : 520 + 1150 * kprog(T, K.G + 0.6, K.G + 3.8, kEase.suave);
  const colO = kprog(T, K.N1 - 0.45, K.N1 + 0.25) * (1 - kprog(T, K.Ci + 0.2, K.Ci + 1.0));
  const colS = enCierre ? 1 : klerp(0.7, 1, kprog(T, K.N1 - 0.45, K.N1 + 0.35, kEase.sale));
  const enPregunta = T > K.Pr - 0.2 && T < K.Ho + 0.3;

  const L = (st, x, y, rest) => { const [sx, sy] = scr(S[st], x, y); return { x: sx, y: sy, ...rest }; };
  const hxLazo = klerp(-160, 720, kprog(T - K.La, -0.5, 1.95, kEase.sale));

  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: KW, height: KH, overflow: 'hidden', background: '#0E0F12' }}>
      {/* columna del descenso */}
      {colO > 0.005 && <div style={{ position: 'absolute', inset: 0, opacity: colO, transform: `scale(${colS})`, transformOrigin: '540px 980px' }}>
        <ColumnaHielo T={T} Y={Y} pulso={enPregunta ? 1 : 0} luzMic={enPregunta ? 1.35 : 1} />
        <svg width={KW + 160} height={KH + 160} style={{ position: 'absolute', left: -80, top: -80, zIndex: 20, overflow: 'visible' }}><g transform="translate(80 80)">
          {ST.map((st) => { if (Math.abs(st.Y - Y) > 2300) return null; const o = visibleO(st); if (o <= 0.01) return null; const z = zoomSt(st);
            return <g key={st.id} opacity={o} transform={`translate(0 ${icF(st.Y - Y)}) translate(540 980) scale(${z}) translate(-540 -980)`}>{st.dib()}</g>; })}
        </g></svg>
        <BokehFrente T={T} Y={Y} o={0.9} />
      </div>}

      {/* vista general: champiñón → iceberg entero */}
      {ovO > 0.005 && <svg width={KW + 160} height={KH + 160} style={{ position: 'absolute', left: -80, top: -80, zIndex: 25, opacity: ovO, overflow: 'hidden' }}>
        <g transform={`translate(620 1040) scale(${ov.s}) translate(${-ov.cx} ${-ov.cy})`}>
          <IcebergEntero T={T} luz={luz} s={ov.s} nodos={enCierre ? kprog(T, K.Ci + 0.1, K.Ci + 1.8) : 0} niveles={enCierre ? kprog(T, K.Ci + 1.4, K.Ci + 2.4) : 0} />
        </g>
      </svg>}
      {ovO > 0.005 && !enCierre && <BokehFrente T={T} Y={(T - K.G) * 220} o={ovO * kprog(T, K.G + 1.2, K.G + 2.6)} />}

      {/* textos chicos, pegados a su objeto */}
      <Lbl T={T} at={K.G + 0.4} until={K.G + 2.1} x={600} y={960} dx={60} dy={60} texto={TX.agaricus} it />
      <Lbl T={T} at={K.N1 + 2.0} until={N1b + 0.1} {...L('planta', 540, 720)} dx={50} dy={-40} texto={TX.noPlantas} />
      <Lbl T={T} at={N1b + 1.95} until={K.Pe + 0.15} {...L('pan', 470, 860)} dx={-40} dy={-200} lado="izq" tam={26} texto={TX.sacch} it />
      <Lbl T={T} at={K.Pe + 0.35} until={K.Qu} {...L('petri', 430, 800)} dx={-110} dy={-230} lado="izq" texto={TX.penicillium} it />
      <Lbl T={T} at={K.Qu + 0.9} until={K.Qu + 2.4} {...L('quitina', 540 + 40 * (1 + 0.45 * kprog(T - K.Qu, 0, 2.3, kEase.suave)), 800 + 10 * (1 + 0.45 * kprog(T - K.Qu, 0, 2.3, kEase.suave)))} dx={70} dy={-230} texto={TX.quitina} />
      <Lbl T={T} at={K.Qu + 3.3} until={K.Br} {...L('quitina', 640, 1200)} dx={150} dy={210} texto={TX.caparazon} />
      <Lbl T={T} at={K.Ar + 2.3} until={K.Ar + 3.75} {...L('bosque', 372, 1115)} dx={70} dy={-150} texto={TX.armillaria} it />
      <Lbl T={T} at={K.Ho + 1.6} until={K.Ho + 3.3} {...L('hormiga', 610, 944)} dx={-120} dy={-150} lado="izq" texto={TX.muerde} />
      <Lbl T={T} at={K.Ho + 4.0} until={K.La} {...L('hormiga', 890, 1370)} dx={-220} dy={340} lado="izq" texto={TX.ophio} it />
      <Lbl T={T} at={K.La + 0.3} until={K.La + 1.55} {...L('lazos', hxLazo - 330, 1070)} dx={30} dy={240} texto={TX.nematodo} />
      <Lbl T={T} at={K.La + 1.6} until={K.Se} {...L('lazos', 700, 970)} dx={-40} dy={-180} lado="izq" texto={TX.anillo} />
      <Lbl T={T} at={K.Se + 0.5} until={K.Se + 2.3} {...L('schizo', 960, 1135)} dx={-60} dy={300} lado="izq" tam={27} texto={TX.schizo} it />
      <Lbl T={T} at={K.Se + 2.35} until={K.Se + 3.7} {...L('schizo', 476, 1074)} dx={60} dy={-300} lado="der" texto={TX.laminas} />
      <Lbl T={T} at={K.Ra + 3.0} until={K.Ra + 5.4} {...L('rad', 800, 1130)} dx={-60} dy={-300} lado="izq" texto={TX.negros} />

      {/* «al microscopio», pies de las placas */}
      {(() => { const o = kprog(T, K.La - 0.1, K.La + 0.4) * (1 - kprog(T, K.Se - 0.3, K.Se + 0.1)); return o > 0.01 ? <div style={{ position: 'absolute', left: 0, right: 0, top: 360, zIndex: 42, opacity: o, textAlign: 'center', font: `700 27px ${KF.mono}`, letterSpacing: '.24em', color: '#cfefff' }}>{TX.microscopio}</div> : null; })()}
      {(() => { const o = kprog(T, K.Ra + 0.6, K.Ra + 1.1) * (1 - kprog(T, K.Ci - 0.2, K.Ci + 0.4)); if (o <= 0.01) return null; const a = scr(S.rad, 285, 1345), b = scr(S.rad, 795, 1345);
        return [[a, TX.sinRad, 0], [b, TX.conRad, 1]].map(([p, tx, i]) => <div key={i} style={{ position: 'absolute', left: p[0], top: p[1], zIndex: 42, opacity: o, transform: 'translate(-50%,-50%)', font: `700 25px ${KF.mono}`, letterSpacing: '.06em', textTransform: 'uppercase', color: i ? '#ffe38a' : '#dfe9ff', whiteSpace: 'nowrap' }}>{tx}</div>); })()}

      {/* tarjetas de estudio y números grandes */}
      <Tarjeta T={T} at={K.Ar + 0.15} until={K.Ar + 2.35} anio={TX.armAnio} linea={TX.armLinea} y={400} />
      <Tarjeta T={T} at={K.Ra + 0.15} until={K.Ra + 2.9} anio={TX.radAnio} linea={TX.radLinea} y={400} />
      {(() => { const o = kprog(T, K.Ra + 5.6, K.Ra + 6.0) * (1 - kprog(T, K.Ci - 0.1, K.Ci + 0.3)); return o > 0.01 ? <div style={{ position: 'absolute', left: KW / 2, top: 400, zIndex: 43, opacity: o, transform: 'translate(-50%,-50%)', font: `700 28px ${KF.mono}`, color: '#ffe38a', border: '2px solid #ffe38a', borderRadius: 10, padding: '8px 18px', background: 'rgba(8,12,20,.7)', whiteSpace: 'nowrap' }}>{TX.hipotesis}</div> : null; })()}
      <NumeroCine T={T} at={K.Br + 1.0} until={K.Ar + 0.1} valor={100} prefijo="+" dur={1.2} linea={TX.brillanLinea} y={470} />
      <NumeroCine T={T} at={K.Ar + 3.7} until={K.Pr + 0.2} valor={9.65} desde={9.65} dec={2} prefijo="≈ " sufijo=" km²" dur={0.01} linea={TX.armLinea2} y={455} tam={136} />
      <NumeroCine T={T} at={K.Se + 3.7} until={K.Ra + 0.1} valor={23000} prefijo="≈ " dur={1.4} linea={TX.sexosLinea} y={455} tam={140} />

      {/* profundímetro: regla y nivel */}
      <ReglaProf Y={Y} o={colO} />
      <NivelMarca T={T} niveles={[[K.G + 1.7, K.G + 3.4, '', 'LA PUNTA'], [K.N1, K.Pe, '1', 'LO QUE TODOS SABEN'], [K.Pe, K.Br, '2', 'LO QUE POCOS SABEN'],
        [K.Br, K.Pr + 0.4, '3', 'PROFUNDO'], [K.Ho, K.Se, '4', 'EL ABISMO'], [K.Se, K.Ci + 0.6, '5', 'EL FONDO']]} />

      {/* barra de escala (abajo a la izquierda) */}
      {[[K.G, K.G + 2.0, '5 cm', 600], [K.G + 2.7, K.N1 + 0.2, 'iceberg esquemático', 0], [K.N1 + 0.3, N1b, '5 cm', 300], [N1b + 0.1, N1b + 1.3, '10 cm', 320],
        [N1b + 1.5, K.Pe + 0.3, '5 µm', 200], [K.Pe + 0.4, K.Qu, '1 cm', 93], [K.Qu + 0.2, K.Qu + 2.5, '1 µm', 100], [K.Qu + 2.7, K.Br, '1 cm', 400],
        [K.Br + 0.3, K.Ar, '1 cm', 90], [K.Ar + 0.3, K.Pr, '1 km', 500], [K.Ho + 0.3, K.La, '1 cm', 520], [K.La + 0.3, K.Se, '20 µm', 250],
        [K.Se + 0.3, K.Ra, '1 cm', 290], [K.Ra + 0.3, K.Ci, '1 cm', 51], [K.Ci + 1.6, K.Ou, 'iceberg esquemático', 0]].map(([a, b, tx, l], i) =>
        <BarraEscala key={i} T={T} at={a} until={b} texto={tx} largo={l} />)}

      <MarcaAgua T={T} tema="biologia" num="155" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function IcebergApp() {
  return <div style={{ position: 'fixed', inset: 0, background: '#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><IcebergShot /></CompositionStage></div>;
}
window.IcebergApp = IcebergApp;
