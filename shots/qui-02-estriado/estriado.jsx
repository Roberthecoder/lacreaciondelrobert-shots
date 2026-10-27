// Químico #02 · Estriado por agotamiento — MUDO protagonista (M2 "¿Por qué NO…?", errores comunes) y base NARRADA (N3 "Capítulos").
// Protocolo de referencia: Sanders, E. R. (2012) JoVE 63: e3064. Guion y fuentes: guion.md. El dibujo es esquemático.
const AVS = (n) => 'assets/stickers/' + n + '.png';
const fondoPuntos = (c) => ({ position:'absolute', inset:0, background:c, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' });
const AGAR = '#f1d79a', RP = 360;                       // radio de la placa grande
const EST = kEstriado(RP - 20, 4);

// Placa con el estriado. trazo[q] 0..1 = cuánto se ha dibujado la zona q · crecen[q] 0..1 = colonias de la zona q.
// modo: 'bien' | 'confluente' (sin flamear: todo encimado) | 'regresa' (la 4ª toca la 1ª) | 'clava' (agar roto) | 'muerta' (asa caliente) | 'gotea'.
function PlacaEstriada({ T, x = 540, y = 960, s = 1, trazo = [1, 1, 1, 1], crecen = [0, 0, 0, 0], modo = 'bien', gota = 0, id = 'pe', color = '#f4efe4', borde = '#c9b48c', tapa = 0, rot = 0 }) {
  const extra = modo === 'regresa' ? [[EST.trazos[3].at(-1)[0], EST.trazos[3].at(-1)[1]], [-150, -170], [-200, -60]] : null;
  const densa = (q) => modo === 'confluente' || (modo === 'regresa' && q === 3);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <PlacaPetri x={0} y={0} r={RP} agar={AGAR} id={id} tapa={tapa} gota={gota}>
      {EST.trazos.map((pts, q) => { const p = trazo[q]; if (p <= 0) return null; const pp = kParcial(q === 3 && extra ? pts.concat(extra) : pts, p);
        return <path key={q} d={'M' + pp.map((v) => v.join(' ')).join(' L ')} fill="none" stroke={modo === 'clava' ? '#8a6a2a' : 'rgba(150,110,40,.35)'} strokeWidth={modo === 'clava' ? 12 : 5} strokeLinecap="round" strokeLinejoin="round" />; })}
      {modo === 'clava' && EST.trazos.map((pts, q) => trazo[q] > 0.5 && pts.slice(1).map((v, k) => k % 2 ? <path key={q + '_' + k} d={`M ${v[0]} ${v[1]} l ${12} ${18} l ${-8} ${14}`} fill="none" stroke="#6b4a1a" strokeWidth={4} /> : null))}
      {/* colonias */}
      {EST.colonias.map((c, i) => { const g = crecen[c.q]; if (g <= 0 || modo === 'muerta') return null;
        const k = kclamp(g * 1.6 - c.o * 0.6, 0, 1); if (k <= 0) return null;
        const big = densa(c.q) ? 1.8 : 1, rr = (densa(c.q) ? 12 : c.r) * k * big;
        const sm = modo === 'gotea' && (i % 3 === 0) ? 1 : 0;
        return <ellipse key={i} cx={c.x} cy={c.y + sm * 14 * gota} rx={rr * (1 + sm * gota * 0.8)} ry={rr * (1 + sm * gota * 1.6)} fill={color} stroke={borde} strokeWidth={c.q < 2 || densa(c.q) ? 1.5 : 3} opacity={0.95} />; })}
      {(modo === 'confluente') && crecen[0] > 0 && EST.trazos.map((pts, q) => <path key={'l' + q} d={'M' + pts.map((v) => v.join(' ')).join(' L ')} fill="none" stroke={color} strokeWidth={26 * crecen[q]} strokeLinecap="round" strokeLinejoin="round" opacity=".9" />)}
      {modo === 'regresa' && crecen[3] > 0 && <path d={'M' + EST.trazos[3].concat(extra).map((v) => v.join(' ')).join(' L ')} fill="none" stroke={color} strokeWidth={22 * crecen[3]} strokeLinecap="round" strokeLinejoin="round" opacity=".9" />}
      {/* zona 1 siempre "pasto" (muchas células encimadas) */}
      {crecen[0] > 0 && modo !== 'muerta' && <path d={'M' + EST.trazos[0].map((v) => v.join(' ')).join(' L ')} fill="none" stroke={color} strokeWidth={22 * crecen[0]} strokeLinecap="round" strokeLinejoin="round" opacity=".85" />}
    </PlacaPetri>
  </g>;
}
// Punta del asa siguiendo el trazo de la zona q (coordenadas de pantalla).
function puntaAsa(q, p, x = 540, y = 960, s = 1) { const pp = kParcial(EST.trazos[q], p), v = pp.at(-1); return [x + v[0] * s, y + v[1] * s]; }
// Números de las zonas.
function Zonas({ T, x = 540, y = 960, s = 1, o = 1 }) {
  return <g opacity={o}>{[-135, -45, 45, 135].map((a, q) => { const r = (RP + 50) * s, ax = x + Math.cos(a * Math.PI / 180) * r, ay = y + Math.sin(a * Math.PI / 180) * r;
    return <g key={q}><circle cx={ax} cy={ay} r={34} fill={KC.gold} stroke={KC.ink} strokeWidth={5} /><text x={ax} y={ay + 14} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>{q + 1}</text></g>; })}</g>;
}
// Gran X roja de "error".
function Tache({ x, y, p = 1, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}><path d={`M -90 -90 L ${-90 + 180 * kclamp(p * 2, 0, 1)} ${-90 + 180 * kclamp(p * 2, 0, 1)}`} stroke={KC.red} strokeWidth={34} strokeLinecap="round" />
    <path d={`M 90 -90 L ${90 - 180 * kclamp(p * 2 - 1, 0, 1)} ${-90 + 180 * kclamp(p * 2 - 1, 0, 1)}`} stroke={KC.red} strokeWidth={34} strokeLinecap="round" /></g>;
}

/* ---------- gemelo MUDO (protagonista): 5 errores comunes ---------- */
const ERRORES = [
  { k: 'Caliente', q: ['¿Por qué NO tocar la muestra', 'con el asa caliente?'], r: 'La mata. Enfríala en una orilla del agar.', modo: 'muerta' },
  { k: 'Clavar', q: ['¿Por qué NO clavar', 'el asa en el agar?'], r: 'Rompe el agar. Desliza sin presionar.', modo: 'clava' },
  { k: 'Flamear', q: ['¿Por qué NO saltarte el flameo', 'entre zona y zona?'], r: 'Cada zona debe llevar menos células.', modo: 'confluente' },
  { k: 'Regresar', q: ['¿Por qué NO regresar', 'a la primera zona?'], r: 'La última zona no toca la primera.', modo: 'regresa' },
  { k: 'Boca', q: ['¿Por qué NO incubar', 'la placa boca arriba?'], r: 'Boca abajo: el agua de la tapa no gotea.', modo: 'gotea' },
];
function EstriadoMudo() {
  const { T, CUES } = useComposition();
  const K = { I: CUES.Intro, B: CUES.Bien, F: CUES.Outro };
  ERRORES.forEach((e) => { K[e.k] = CUES[e.k]; });
  // dentro de cada error (9 s): 0–4.2 se hace el error · 4.2–6 incuba · 6–9 respuesta
  let act = null; ERRORES.forEach((e, i) => { if (T >= K[e.k] - 0.01 && T < (i < 4 ? K[ERRORES[i + 1].k] : K.B)) act = { ...e, a: K[e.k], i }; });
  const trazoDe = (a) => [kprog(T, a + 0.6, a + 1.4), kprog(T, a + 1.5, a + 2.2), kprog(T, a + 2.3, a + 3.0), kprog(T, a + 3.1, a + 4.0)];
  const crecenDe = (a, t0) => [0, 1, 2, 3].map((q) => kprog(T, a + t0 + q * 0.12, a + t0 + 1.6 + q * 0.12));
  // asa: posición y calor
  let asa = null;
  const flameo = (a, k) => kprog(T, a + k, a + k + 0.25) * (1 - kprog(T, a + k + 0.35, a + k + 0.7));
  if (act) {
    const a = act.a, tr = trazoDe(a), q = tr.findIndex((v) => v > 0 && v < 1);
    if (T < a + 4.1) { const qq = q < 0 ? (tr[3] >= 1 ? 3 : 0) : q; const [ax, ay] = puntaAsa(qq, tr[qq] || 0.001);
      asa = { x: ax, y: ay, cal: act.modo === 'muerta' ? 1 : 0, clava: act.modo === 'clava' }; }
  }
  // final: así sí (zonas con flameo entre cada una)
  const trB = [kprog(T, K.B + 0.3, K.B + 1), kprog(T, K.B + 1.3, K.B + 1.9), kprog(T, K.B + 2.2, K.B + 2.8), kprog(T, K.B + 3.1, K.B + 3.8)];
  const creB = [0, 1, 2, 3].map((q) => kprog(T, K.B + 4.4 + q * 0.4, K.B + 6 + q * 0.4));
  if (T >= K.B && T < K.B + 3.9) { const q = Math.max(0, trB.findIndex((v) => v < 1)); const [ax, ay] = puntaAsa(q, trB[q] || 0.001); asa = { x: ax, y: ay, cal: 0 }; }
  const sana = T >= K.B ? kprog(T, K.B + 4.4, K.B + 7.6) : 0;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={fondoPuntos(act ? [KC.pink, KC.orange, KC.lilac, KC.cyan, KC.yellow][act.i] : KC.mint)}></div>
      <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <Mechero T={T} x={940} y={1560} s={0.9} />
        {/* intro y final: placa limpia, lista para estriar (mismo cuadro → loop) */}
        {!act && T < K.B && <PlacaEstriada T={T} trazo={[0, 0, 0, 0]} id="pi" />}
        {act && <PlacaEstriada T={T} trazo={trazoDe(act.a)} crecen={act.modo === 'muerta' ? [0, 0, 0, 0] : crecenDe(act.a, 4.3)} modo={act.modo} id={'p' + act.i}
          tapa={act.modo === 'gotea' ? kprog(T, act.a + 4.1, act.a + 4.4) : 0} gota={act.modo === 'gotea' ? kprog(T, act.a + 4.4, act.a + 5.6) : 0} rot={act.modo === 'gotea' ? 0 : 0} />}
        {T >= K.B && <PlacaEstriada T={T} trazo={trB} crecen={creB} modo="bien" id="pb" tapa={kprog(T, K.F - 0.2, K.F)} />}
        {act && act.modo === 'gotea' && T > act.a + 4.4 && T < act.a + 6 && Array.from({ length: 8 }, (_, i) => { const u = ((T - act.a - 4.4) * 0.9 + i / 8) % 1; return <circle key={i} cx={300 + i * 70} cy={700 + u * 360} r={12} fill="#cfeef7" stroke="#2a7aa0" strokeWidth={3} opacity={Math.sin(Math.PI * u)} />; })}
        {act && act.modo === 'muerta' && T > act.a + 0.6 && T < act.a + 4.2 && Array.from({ length: 10 }, (_, i) => { const u = ((T - act.a) * 0.8 + i / 10) % 1; const [ax, ay] = asa ? [asa.x, asa.y] : [540, 960];
          return <circle key={i} cx={ax + Math.cos(i * 2.4) * 40 * u} cy={ay - 70 * u} r={10 + 10 * u} fill="#9aa4ae" opacity={(1 - u) * 0.7} />; })}
        {asa && <Asa x={asa.x} y={asa.y + (asa.clava ? 10 : 0)} ang={asa.clava ? -60 : -32} caliente={asa.cal} s={1.15} />}
        {act && T > act.a + 4.3 && T < act.a + 6 && <g opacity={kprog(T, act.a + 4.3, act.a + 4.6) * (1 - kprog(T, act.a + 5.7, act.a + 6))}>
          <rect x={300} y={600} width={480} height={90} rx={45} fill="rgba(14,15,18,.85)" stroke={KC.gold} strokeWidth={5} />
          <text x={540} y={660} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.texto}>{Math.round(kprog(T, act.a + 4.3, act.a + 5.8) * 48)} h · 37 °C</text></g>}
        {act && <Tache x={540} y={960} s={2.4} p={kprog(T, act.a + 6, act.a + 6.5) * (1 - kprog(T, act.a + 8.6, act.a + 9))} />}
      </svg>

      {/* pregunta fija arriba */}
      {T < K.F && <div style={{ position:'absolute', left:50, right:50, top:330, zIndex:44, textAlign:'center' }}>
        <div style={{ display:'inline-block', background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:26, padding:'14px 30px', boxShadow:`10px 10px 0 ${KC.ink}`, font:`900 50px/1.12 ${KF.texto}`, color:KC.ink,
          transform:`scale(${act ? klerp(1.15, 1, kprog(T, act.a, act.a + 0.35, kEase.rebote)) : 1})` }}>
          {act ? <>{act.q[0].split('NO')[0]}<span style={{ color:KC.red }}>NO</span>{act.q[0].split('NO')[1]}</> : null}
          {act ? <><br />{act.q[1]}</> : T < K.B ? <>5 errores que arruinan<br />un <span style={{ color:KC.red }}>estriado</span></> : <>Así <span style={{ color:KC.leaf }}>sí</span>: colonias aisladas</>}
        </div></div>}
      {act && <Chip T={T} at={act.a + 6.1} until={act.a + 8.8} texto={act.r} y={540} borde={KC.mint} tam={34} />}
      {act && <div style={{ position:'absolute', left:0, right:0, top:1560, zIndex:44, textAlign:'center' }}>
        <span style={{ display:'inline-block', background:KC.red, color:KC.paper, borderRadius:18, padding:'4px 26px 8px', font:`400 70px/1 ${KF.titulo}`, boxShadow:`8px 8px 0 ${KC.ink}`, transform:`scale(${klerp(1.3, 1, kprog(T, act.a, act.a + 0.4, kEase.rebote))})` }}>ERROR {act.i + 1}<span style={{ fontSize:40, opacity:.75 }}> / 5</span></span></div>}
      <Medidor T={T} at={K.I + 0.5} until={K.F - 0.3} etiqueta="COLONIAS AISLADAS" valor={() => (act ? 0.02 : T >= K.B ? sana : 0)} texto={(v) => Math.round(v * 100) + ' %'} y={1420} x={120} ancho={680} color={act ? KC.red : KC.mint} />
      <Zonas T={T} o={act || T >= K.B ? 0.9 : 0} />
      <MarcaAgua T={T} tema="quimica" num="02" hasta={K.F} />
      <CierreMarca T={T} at={K.F} tema="quimica" frase="Estriado por agotamiento: sin errores" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

/* ---------- base NARRADA (N3: las 4 zonas son 4 capítulos) ---------- */
function EstriadoNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Material, C1: CUES.Cuad1, C2: CUES.Cuad2, C3: CUES.Cuad3, P: CUES.Pregunta, C4: CUES.Cuad4, Er: CUES.Errores, E: CUES.Estudio, X: CUES.Extra, Ci: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const PY = 850, PS = 0.9;                           // placa más arriba: la zona 4 no queda tras el subtítulo
  const tr = [kprog(T, K.C1 + 0.4, K.C1 + 3.2), kprog(T, K.C2 + 1.6, K.C2 + 4), kprog(T, K.C3 + 1.2, K.C3 + 3.6), kprog(T, K.C4 + 0.1, K.C4 + 2.2)];
  const gancho = T < K.M;
  const trG = [kprog(T, K.G + 0.05, K.G + 0.9), kprog(T, K.G + 0.9, K.G + 1.6), kprog(T, K.G + 1.6, K.G + 2.3), kprog(T, K.G + 2.3, K.G + 3.0)];
  const cre = [0, 1, 2, 3].map((q) => kprog(T, K.C4 + 3 + q * 0.3, K.C4 + 5 + q * 0.3));
  const enPlaca = T >= K.C1 - 0.5 && T < K.Er + 0.2;
  let asa = null;
  const flamas = [K.C2 + 0.2, K.C3 + 0.1];
  const enFlama = flamas.some((t) => T >= t && T < t + 1.3);
  if (gancho) { const q = Math.max(0, trG.findIndex((v) => v < 1)); const [x, y] = puntaAsa(q < 0 ? 3 : q, (trG[q < 0 ? 3 : q]) || 0.001, 540, PY, PS); asa = { x, y, cal: 0 }; }
  else if (enFlama) asa = { x: 900, y: 1290, cal: 1, ang: -70 };
  else if (enPlaca && T < K.C4 + 2.3) { const q = tr.findIndex((v) => v > 0 && v < 1); if (q >= 0) { const [x, y] = puntaAsa(q, tr[q], 540, PY, PS); asa = { x, y, cal: Math.max(0, 1 - (T - (q === 1 ? flamas[0] + 1.3 : q === 2 ? flamas[1] + 1.3 : 0)) * 2) * (q > 0 ? 1 : 0) }; } }
  const caps = [{ at: K.C1, titulo: 'Zona 1: la muestra' }, { at: K.C2, titulo: 'Zona 2: un poquito' }, { at: K.C3, titulo: 'Zona 3: menos' }, { at: K.C4, titulo: 'Zona 4: una sola' }];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* gancho: el "garabato" se dibuja solo en 3 s */}
      <Escena T={T} a={K.G} b={K.M} fondo={KC.yellow}>
        <div style={fondoPuntos(KC.yellow)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <PlacaEstriada T={T} y={PY} s={PS} trazo={trG} crecen={[0, 0, 0, 0].map((_, q) => kprog(T, K.G + 3.2 + q * 0.2, K.G + 4.6 + q * 0.2))} id="pg" />
          {asa && gancho && <Asa x={asa.x} y={asa.y} s={1.15} />}
        </svg>
      </Escena>
      {/* material: placa, asa y mechero */}
      <Escena T={T} a={K.M} b={K.C1} fondo={KC.mint}>
        <div style={fondoPuntos(KC.mint)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[['placa', 0.3], ['asa', 1.4], ['flama', 2.4]].map(([n, d], i) => { const e = kentrada(T, K.M + d, null, 'pop'); if (T < K.M + d) return null;
            return <g key={n} opacity={e.o} transform={`translate(${[300, 560, 830][i]} ${[900, 760, 1000][i]}) scale(${e.s})`}>
              {n === 'placa' && <PlacaPetri x={0} y={0} r={190} agar={AGAR} id="pm" />}
              {n === 'asa' && <Asa x={-80} y={0} ang={70} caliente={kprog(T, K.M + 3.6, K.M + 4.4)} s={0.9} />}
              {n === 'flama' && <Mechero T={T} x={0} y={260} s={1.1} />}
            </g>; })}
        </svg>
        <Chip T={T} at={K.M + 0.5} until={K.C1 - 0.2} texto="agar" x={300} y={1150} borde={KC.gold} tam={36} />
        <Chip T={T} at={K.M + 1.6} until={K.C1 - 0.2} texto="asa" x={560} y={1150} borde={KC.blue} tam={36} />
        <Chip T={T} at={K.M + 2.6} until={K.C1 - 0.2} texto="mechero" x={830} y={1150} borde={KC.red} tam={36} />
      </Escena>
      {/* las cuatro zonas */}
      <Escena T={T} a={K.C1} b={K.Er} fondo={KC.cyan} zoom={0.02}>
        <div style={fondoPuntos(KC.cyan)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Mechero T={T} x={900} y={1560} s={0.8} />
          <PlacaEstriada T={T} y={PY} s={PS} trazo={tr} crecen={cre} id="pz" />
          <Zonas T={T} y={PY} s={PS} o={kprog(T, K.C1 + 0.2, K.C1 + 0.6)} />
          {asa && !gancho && <Asa x={asa.x} y={asa.y} ang={asa.ang || -32} caliente={asa.cal} s={1.1} />}
          {/* millones de células encimadas en la zona 1 (zoom) */}
        </svg>
        <Lupa T={T} at={K.C1 + 2.4} until={K.C2 - 0.2} x={760} y={560} r={190} fx={540 + EST.trazos[0][3][0] * PS} fy={PY + EST.trazos[0][3][1] * PS} etiqueta="millones de células" tinte={KC.red}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2633" />{Array.from({ length: 70 }, (_, i) => <rect key={i} x={(i * 53) % (r * 2)} y={(i * 37) % (r * 2)} width={26} height={12} rx={6} fill="#ff6b8a" transform={`rotate(${i * 29} ${(i * 53) % (r * 2)} ${(i * 37) % (r * 2)})`} />)}</svg>} />
        <Lupa T={T} at={K.C4 + 4.4} until={K.Er - 0.2} x={300} y={560} r={190} fx={540 + EST.colonias.find((c) => c.q === 3).x * PS} fy={PY + EST.colonias.find((c) => c.q === 3).y * PS} etiqueta="1 colonia = 1 célula" tinte={KC.mint}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2633" /><circle cx={r} cy={r} r={r * 0.7} fill="#f4efe4" opacity=".35" />{Array.from({ length: 40 }, (_, i) => { const a = i * 2.4, d = Math.sqrt(i / 40) * r * 0.6; return <rect key={i} x={r + Math.cos(a) * d - 12} y={r + Math.sin(a) * d - 6} width={24} height={12} rx={6} fill="#ff6b8a" />; })}</svg>} />
        <Cronometro T={T} at={K.C4 + 2.4} until={K.C4 + 4.6} factor={24 * 3600 / 2.2} etiqueta="INCUBANDO" y={1640} />
      </Escena>
      {/* errores comunes */}
      <Escena T={T} a={K.Er} b={K.E} fondo={KC.pink}>
        <div style={fondoPuntos(KC.pink)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[['muerta', 300, 640], ['clava', 780, 640], ['regresa', 540, 1060]].map(([m, x, y], i) => { const at = K.Er + 0.6 + i * 1.6; if (T < at) return null; const e = kentrada(T, at, null, 'pop');
            return <g key={m} opacity={e.o}><PlacaEstriada T={T} x={x} y={y} s={0.55 * e.s} trazo={[1, 1, 1, 1]} crecen={[1, 1, 1, 1]} modo={m} id={'er' + i} />
              <Tache x={x} y={y} s={1.2} p={kprog(T, at + 0.6, at + 1)} /></g>; })}
        </svg>
        {['asa caliente', 'clavarla', 'regresar a la 1'].map((t, i) => <Chip key={t} T={T} at={K.Er + 0.8 + i * 1.6} until={K.E - 0.2} texto={t} x={[300, 780, 540][i]} y={[880, 880, 1300][i]} borde={KC.red} tam={34} />)}
      </Escena>
      {/* el estudio: Sanders 2012, Serratia */}
      <Escena T={T} a={K.E} b={K.X} fondo={KC.lilac}>
        <div style={{ position:'absolute', inset:0, background:KC.lilac, backgroundImage:'repeating-linear-gradient(45deg, rgba(255,255,255,.12) 0 24px, transparent 24px 48px)' }}></div>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3} anio="2012" quien="Erin R. Sanders" revista="JoVE 63: e3064 · protocolo de estriado" y={700} />
        {T > K.E + 2.8 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:kprog(T, K.E + 2.8, K.E + 3.3) }}>
          <PlacaEstriada T={T} y={870} s={0.88} crecen={[0, 1, 2, 3].map((q) => kprog(T, K.E + 3.4 + q * 0.4, K.E + 5 + q * 0.4))} color="#e8384f" borde="#9a1a2a" id="ps" />
          <Zonas T={T} y={870} s={0.88} />
        </svg>}
        <Chip T={T} at={K.E + 3.4} until={K.X - 0.2} texto="24 h · 30 °C" y={460} borde={KC.gold} tam={44} mono />
        <Etq T={T} at={K.E + 5.2} until={K.X - 0.2} x={980} y={1430} texto="Serratia marcescens" it lado="izq" tam={30} color={KC.ink} />
      </Escena>
      {/* la bacteria roja en la regadera */}
      <Escena T={T} a={K.X} b={K.Ci} fondo="#d9eef5">
        <div style={{ position:'absolute', inset:0, background:'#d9eef5', backgroundImage:'linear-gradient(#b7d3de 4px, transparent 4px), linear-gradient(90deg, #b7d3de 4px, transparent 4px)', backgroundSize:'120px 120px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <path d={`M 0 1500 Q ${200 * kprog(T, K.X + 0.3, K.X + 3)} 1460 ${380 * kprog(T, K.X + 0.3, K.X + 3)} 1500 L 0 1500 Z`} fill="#ff6b7a" opacity=".85" />
          <path d={`M 0 1500 L 0 ${1500 - 760 * kprog(T, K.X + 0.3, K.X + 3)} Q 150 ${1500 - 560 * kprog(T, K.X + 0.3, K.X + 3)} 110 1500 Z`} fill="#ff6b7a" opacity=".85" />
          <rect x={0} y={1500} width={KW} height={420} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
          <rect x={700} y={300} width={60} height={300} rx={20} fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />
          <ellipse cx={730} cy={620} rx={110} ry={34} fill="#c3cbd3" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 14 }, (_, i) => { const u = ((T * 0.9 + i / 14) % 1); return <line key={i} x1={650 + (i * 13) % 160} y1={650 + u * 820} x2={650 + (i * 13) % 160} y2={680 + u * 820} stroke="#5ac8ff" strokeWidth={6} opacity=".7" />; })}
        </svg>
        <Lupa T={T} at={K.X + 1.2} until={K.Ci - 0.2} x={500} y={760} r={200} fx={50} fy={960} etiqueta="Serratia (pigmento rojo)" tinte={KC.red}
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#2a2633" />{Array.from({ length: 34 }, (_, i) => <rect key={i} x={(i * 61) % (r * 2 - 20)} y={(i * 43) % (r * 2 - 20)} width={36} height={16} rx={8} fill="#e8384f" transform={`rotate(${i * 33} ${(i * 61) % (r * 2)} ${(i * 43) % (r * 2)})`} />)}</svg>} />
      </Escena>
      {/* cierre: el garabato del inicio con sus colonias (filtro) */}
      <Escena T={T} a={K.Ci} b={FIN} fondo={KC.yellow} zoom={0.03}>
        <div style={fondoPuntos(KC.yellow)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <PlacaEstriada T={T} y={PY} s={PS} crecen={[1, 1, 1, 1]} id="pc" />
          <Zonas T={T} y={PY} s={PS} />
          {Array.from({ length: 24 }, (_, i) => { const u = kprog(T, K.Ci + 0.3 + i * 0.05, K.Ci + 1.8 + i * 0.05); return <circle key={i} cx={klerp(120 + (i % 6) * 20, 330, u)} cy={klerp(560 + Math.floor(i / 6) * 20, 760, u)} r={10} fill="#ff6b8a" opacity={1 - u} />; })}
        </svg>
        <Chip T={T} at={K.Ci + 0.4} until={K.O} texto="entra una multitud · sale una sola" y={460} borde={KC.gold} tam={36} />
      </Escena>

      <Capitulo T={T} caps={caps} hasta={K.Er} />
      <Chip T={T} at={K.P + 0.1} until={K.C4 + 2.2} texto="¿y en la última zona?" y={460} borde={KC.mint} tam={40} />
      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.M - 0.1} texto="No es un garabato: *separa una sola bacteria.*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.C1 - 0.1} texto="Placa, asa *y una flama.*" />
      <Subtitulo T={T} idx={2} at={K.C1 + 0.1} until={K.C2 - 0.1} texto="La muestra en una orilla: *millones de células.*" />
      <Subtitulo T={T} idx={3} at={K.C2 + 0.1} until={K.C3 - 0.1} texto="Flameas, giras *y arrastras un poquito.*" />
      <Subtitulo T={T} idx={4} at={K.C3 + 0.1} until={K.P - 0.1} texto="Cada pasada *lleva menos.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.C4 - 0.1} texto="¿Y qué pasa *en la última?*" />
      <Subtitulo T={T} idx={6} at={K.C4 + 0.1} until={K.Er - 0.1} texto="Cada célula forma *una colonia.*" />
      <Subtitulo T={T} idx={7} at={K.Er + 0.1} until={K.E - 0.1} texto="Errores: *caliente, clavada, de regreso.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.X - 0.1} texto="Colonias aisladas *en la cuarta zona.*" />
      <Subtitulo T={T} idx={9} at={K.X + 0.1} until={K.Ci - 0.1} texto="Esa bacteria roja *vive en tu regadera.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.O - 0.1} texto="Entra una multitud: *sale una sola.*" />
      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={K.P + 0.1} until={K.C4 + 1} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_11_sorprendido')} at={K.X + 2.4} until={K.Ci - 0.2} lado="arriba-der" />
      <MarcaAgua T={T} tema="quimica" num="02" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="quimica" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

window.EstriadoMudoApp = kApp(EstriadoMudo);
window.EstriadoNarradoApp = kApp(EstriadoNarrado);
