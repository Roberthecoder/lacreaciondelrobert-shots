// Ambiental #02 · Las bacterias están ganando (resistencia a antibióticos) — NARRADA (N2 "El número" + N1 "Por dentro")
// y gemelo MUDO (M5 "La carrera" con la música hecha de los datos: cada división, una nota). Guion y fuentes: guion.md.
// El dibujo es esquemático: bacterias y "gen" (anillo rojo = plásmido con un gen de resistencia).
const AVS = (n) => 'assets/stickers/' + n + '.png';
const SENS = KC.mint, RES = KC.coral, OTRA = '#7fb2ff';

/* ---------- la colonia (mundo por dentro) ---------- */
// 46 lugares fijos dentro de un círculo. 4 traen el gen (resistentes).
const COL = (() => { const g = krng(12), L = []; let i = 0;
  while (L.length < 46 && i < 4000) { i++; const a = g() * Math.PI * 2, r = Math.sqrt(g()) * 330, x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (L.every((p) => Math.hypot(p.x - x, p.y - y) > 78)) L.push({ x, y, rot: g() * 360, res: false }); }
  [5, 17, 29, 40].forEach((k) => { if (L[k]) L[k].res = true; }); return L; })();
// kill 0..1: el antibiótico mata a las sensibles · crece 0..1: las resistentes ocupan los lugares vacíos
// lluvia: [t0, t1] partículas de antibiótico · todasRes: la colonia ya es toda resistente (el cierre)
function Colonia({ T, x = 540, y = 900, s = 1, kill = 0, crece = 0, lluvia, todasRes = false, fondo = true, conjuga = 0 }) {
  const g = krng(5), polvo = Array.from({ length: 60 }, () => [g() * 2 - 1, g() * 2 - 1, g()]);
  const enLluvia = lluvia && T > lluvia[0] && T < lluvia[1];
  const muertas = COL.filter((b) => !b.res);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {fondo && <><circle r={400} fill="#0E0F12" stroke={KC.ink} strokeWidth={12} /><circle r={386} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={6} /></>}
    {COL.map((b, i) => {
      const res = b.res || todasRes;
      const vida = res ? 1 : 1 - kprog(kill, (i / 46) * 0.5, (i / 46) * 0.5 + 0.5);
      return <g key={i} transform={`translate(${mece(T, i, 0.15) * 6} ${mece(T, i + 50, 0.15) * 6})`}><Bacteria x={b.x} y={b.y} rot={b.rot + mece(T, i, 0.1) * 10} s={0.72} T={T} seed={i} color={res ? RES : SENS} gen={res} vida={vida} /></g>;
    })}
    {/* hijas de las resistentes en los lugares que quedaron vacíos */}
    {!todasRes && muertas.map((b, i) => { const k = kprog(crece, i / muertas.length * 0.8, i / muertas.length * 0.8 + 0.2); if (k <= 0) return null;
      return <g key={'h' + i} transform={`translate(${b.x + 10} ${b.y - 8}) scale(${kEase.rebote(k)})`}><Bacteria x={0} y={0} rot={b.rot + 40} s={0.72} T={T} seed={i + 9} color={RES} gen /></g>; })}
    {/* conjugación: puente entre una resistente y una bacteria de otra especie */}
    {conjuga > 0 && <g>
      <line x1={COL[17].x} y1={COL[17].y} x2={-230} y2={-260} stroke={RES} strokeWidth={8} strokeDasharray="10 8" opacity={kprog(conjuga, 0, 0.2)} />
      <g transform={`translate(${klerp(COL[17].x, -230, kprog(conjuga, 0.25, 0.7))} ${klerp(COL[17].y, -260, kprog(conjuga, 0.25, 0.7))})`}><circle r={14} fill="none" stroke={KC.red} strokeWidth={7} /></g>
      <g transform="translate(-230 -260)"><circle r={44} fill={conjuga > 0.7 ? '#ffd0c8' : OTRA} stroke={KC.ink} strokeWidth={6} /><circle r={44} fill="none" stroke={KC.ink} strokeWidth={3} strokeDasharray="4 6" />{conjuga > 0.7 && <circle cx={10} cy={6} r={12} fill="none" stroke={KC.red} strokeWidth={6} />}</g>
    </g>}
    {enLluvia && polvo.map(([px, py, p], i) => { const u = ((T - lluvia[0]) * 0.7 + p) % 1; return <circle key={'p' + i} cx={px * 360} cy={klerp(-380, 380, u)} r={7} fill="#fff" opacity={0.8 * Math.sin(Math.PI * u)} />; })}
  </g>;
}
// Cápsula de antibiótico. abre 0..1 (se separan las mitades y sale el polvo).
function Capsula({ x, y, s = 1, abre = 0, rot = -20, T = 0 }) {
  const d = abre * 120;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {abre > 0 && Array.from({ length: 18 }, (_, i) => <circle key={i} cx={Math.cos(i * 1.7) * 90 * abre} cy={Math.sin(i * 2.3) * 60 * abre + 40 * abre} r={6} fill="#fff" stroke={KC.ink} strokeWidth={2} opacity={1 - abre * 0.4} />)}
    <g transform={`translate(${-d} 0)`}><path d="M 0 -50 L -90 -50 A 50 50 0 0 0 -90 50 L 0 50 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} /><rect x={-110} y={-34} width={60} height={14} rx={7} fill="#fff" opacity=".45" /></g>
    <g transform={`translate(${d} 0)`}><path d="M 0 -50 L 90 -50 A 50 50 0 0 1 90 50 L 0 50 Z" fill={KC.white} stroke={KC.ink} strokeWidth={8} /></g>
  </g>;
}
// Ícono de riesgo (cesárea, quimio, trasplante).
function TarjetaRiesgo({ T, at, until, x, y, titulo, dibujo }) {
  if (!kvisible(T, at, until)) return null; const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x - 140, top:y - 150, width:280, height:300, zIndex:30, opacity:e.o, transform:`scale(${e.s}) rotate(${mece(T, x, 0.2) * 2}deg)`, background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}`, textAlign:'center' }}>
    <svg width={280} height={200}><g transform="translate(140 100)">{dibujo}</g></svg>
    <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink }}>{titulo}</div>
  </div>;
}
const DIB = {
  cesarea: <g><ellipse cx={0} cy={10} rx={80} ry={60} fill="#f1b48f" stroke={KC.ink} strokeWidth={6} /><path d="M -40 30 L 40 30" stroke={KC.red} strokeWidth={8} strokeDasharray="10 6" /><path d="M 50 -60 L 90 -20 L 40 10 Z" fill="#c3cbd3" stroke={KC.ink} strokeWidth={5} /></g>,
  quimio: <g><rect x={-45} y={-80} width={90} height={110} rx={20} fill="#cdeeff" stroke={KC.ink} strokeWidth={6} /><rect x={-45} y={-20} width={90} height={50} rx={10} fill={KC.yellow} /><path d="M 0 30 L 0 80" stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={88} r={8} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>,
  trasplante: <g><path d="M 0 60 C -90 0 -70 -70 -20 -60 C 0 -55 0 -40 0 -36 C 0 -40 0 -55 20 -60 C 70 -70 90 0 0 60 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} /><path d="M -60 -70 L -20 -30" stroke={KC.ink} strokeWidth={6} strokeDasharray="8 6" /></g>,
};
// Tú (busto esquemático) con la cápsula en la mano: el macro del inicio y del final.
function Tu({ T, abre = 0, lupa = 0 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <g transform={`translate(540 1180) translate(0 ${mece(T, 3, 0.2) * 6})`}>
      <path d="M -330 300 Q -320 40 -140 0 L 140 0 Q 320 40 330 300 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={10} />
      <rect x={-60} y={-80} width={120} height={100} fill="#d99a6c" stroke={KC.ink} strokeWidth={10} />
      <ellipse cx={0} cy={-260} rx={170} ry={200} fill="#e8ad7f" stroke={KC.ink} strokeWidth={10} />
      <path d="M -170 -300 Q -150 -480 0 -470 Q 160 -480 175 -290 Q 120 -380 0 -380 Q -110 -380 -170 -300 Z" fill={KC.ink} />
      <circle cx={-60} cy={-260} r={14} fill={KC.ink} /><circle cx={60} cy={-260} r={14} fill={KC.ink} />
      <ellipse cx={0} cy={-150} rx={50} ry={30 + abre * 14} fill="#7a2b2b" stroke={KC.ink} strokeWidth={8} />
    </g>
  </svg>;
}

/* ---------- versión narrada ---------- */
function ResistenciaNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Az: CUES.Azar, B: CUES.Barre, Cr: CUES.Crecen, Co: CUES.Comparten, P: CUES.Pregunta, E: CUES.Estudio, An: CUES.Anual, R: CUES.Riesgo, F: CUES.Fleming, S: CUES.Sirve, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // una sola escena continua de la colonia: de la boca (macro) al intestino (micro) y de regreso
  const zoomCol = kprog(T, K.G + 1.2, K.G + 2.6, kEase.suave);
  const kill = kprog(T, K.G + 2.4, K.G + 4.2) * (T < K.Cr ? 1 : 1);
  const crece = kprog(T, K.Cr + 0.3, K.Cr + 3.0);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* macro: tú y la cápsula */}
      <Escena T={T} a={K.G} b={K.G + 2.2} zoom={0.25} origen="50% 70%">
        <FondoLunares color={KC.pink} punto="rgba(255,255,255,.25)" />
        <Tu T={T} abre={kprog(T, K.G + 0.1, K.G + 0.6)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Capsula x={klerp(800, 540, kprog(T, K.G, K.G + 1.1, kEase.suave))} y={klerp(420, 1030, kprog(T, K.G, K.G + 1.4, kEase.suave))} s={klerp(1.2, 0.5, kprog(T, K.G, K.G + 1.4))} rot={T * 200} />
        </svg>
      </Escena>
      {/* micro: la colonia, de la gancho a "comparten" */}
      <Escena T={T} a={K.G + 2.2} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #3a1626 0%, #0E0F12 75%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Colonia T={T} y={880} s={klerp(0.6, 1.15, zoomCol)} kill={kill} crece={crece} lluvia={[K.G + 2.2, K.G + 4.4]} fondo={false} conjuga={kprog(T, K.Co + 0.5, K.Co + 4)} />
          {/* segunda pastilla que ya no les hace nada */}
          {T > K.Cr + 2.6 && T < K.Co && <Capsula x={540} y={klerp(380, 520, kprog(T, K.Cr + 2.6, K.Cr + 3.4))} s={0.6} abre={kprog(T, K.Cr + 3.2, K.Cr + 3.7)} rot={0} />}
        </svg>
        <Ambiente T={T} n={24} seed={4} color="rgba(255,200,220,.25)" tam={[3, 8]} />
        <Escala T={T} z={klerp(0.6, 1.15, zoomCol)} pxPorMm={41760} />
      </Escena>
      <Escena T={T} a={K.P} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><Colonia T={T} y={900} s={0.8} kill={1} crece={1} /></svg>
      </Escena>
      <Escena T={T} a={K.E} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {/* 39 millones = 39 cuadros de 1 millón */}
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {T < K.An && Array.from({ length: 39 }, (_, i) => { const at = K.E + 3.0 + i * 0.05; if (T < at) return null; const p = kprog(T, at, at + 0.3, kEase.rebote);
            return <rect key={i} x={150 + (i % 13) * 62} y={980 + Math.floor(i / 13) * 62} width={52 * p} height={52 * p} rx={10} fill={KC.red} stroke={KC.ink} strokeWidth={4} />; })}
        </svg>
      </Escena>
      <Escena T={T} a={K.R} b={K.F}><FondoLunares color={KC.cyan} /></Escena>
      <Escena T={T} a={K.F} b={K.S}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(540 930)"><circle r={230} fill="#fff7e0" stroke={KC.ink} strokeWidth={10} /><circle r={230} fill="none" stroke="#c9b991" strokeWidth={4} transform="scale(0.94)" />
            <circle cx={-40} cy={-30} r={70 + 6 * Math.sin(T)} fill="#9ccf6a" stroke="#4e7a2a" strokeWidth={5} /><circle cx={-40} cy={-30} r={120} fill="none" stroke="#e9f6d8" strokeWidth={30} opacity=".8" />
            {[[110, 60], [90, -110], [-150, 120], [140, 150]].map(([bx, by], i) => <circle key={i} cx={bx} cy={by} r={14} fill="#f4e19a" stroke="#b49b3c" strokeWidth={3} />)}
          </g>
        </svg>
      </Escena>
      <Escena T={T} a={K.S} b={K.C}><FondoLunares color={KC.mint} /></Escena>
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #3a1626 0%, #0E0F12 75%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Colonia T={T} y={900} s={1.1} todasRes lluvia={[K.C + 0.6, K.C + 3.5]} fondo={false} />
          <Capsula x={540} y={klerp(380, 470, kprog(T, K.C, K.C + 0.7))} s={0.7} abre={kprog(T, K.C + 0.4, K.C + 0.9)} rot={0} />
        </svg>
      </Escena>

      {/* datos y chips */}
      <Chip T={T} at={K.G + 2.6} until={K.Az - 0.2} texto="tus bacterias · por dentro" y={1520} tam={36} borde={SENS} mono />
      <Etq T={T} at={K.Az + 0.6} until={K.B - 0.2} x={540 + COL[17].x * 1.15 + 50} y={880 + COL[17].y * 1.15} texto="gen de resistencia" color={RES} />
      <Chip T={T} at={K.Az + 0.3} until={K.B - 0.3} texto="unas pocas traen el gen" y={420} tam={44} borde={RES} />
      <Chip T={T} at={K.Cr + 2.6} until={K.Co - 0.3} texto="la misma pastilla: nada" y={420} tam={42} borde={RES} />
      <Etq T={T} at={K.Co + 1.2} until={K.P - 0.2} x={540 - 230 * 1.15 + 60} y={880 - 260 * 1.15 - 70} texto="otra especie" color={OTRA} />
      <Chip T={T} at={K.Co + 0.3} until={K.P - 0.3} texto="se pasan el gen" y={420} tam={42} borde={RES} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.8} anio="2024" quien="GRAM · IHME y Oxford" revista="The Lancet 404: 1199–1226" y={640} />
      <NumeroGigante T={T} at={K.E + 2.9} until={K.An - 0.3} valor={39} sufijo=" M" etiqueta="muertes 2025–2050 (pronóstico)" y={640} tam={230} color={KC.red} />
      <Comparativa T={T} at={K.An + 0.2} until={K.R - 0.3} max={2} y={520} alto={460} izq={{ valor: 1.14, etiqueta: '2021', texto: '1.14 M', color: KC.orange }} der={{ valor: 1.91, etiqueta: '2050', texto: '1.91 M', color: KC.red }} />
      <Chip T={T} at={K.An + 0.5} until={K.R - 0.3} texto="muertes por año (directas)" y={420} tam={38} />
      <TarjetaRiesgo T={T} at={K.R + 0.6} until={K.F - 0.3} x={250} y={800} titulo="cesárea" dibujo={DIB.cesarea} />
      <TarjetaRiesgo T={T} at={K.R + 1.3} until={K.F - 0.3} x={830} y={800} titulo="quimio" dibujo={DIB.quimio} />
      <TarjetaRiesgo T={T} at={K.R + 2.0} until={K.F - 0.3} x={540} y={1060} titulo="trasplante" dibujo={DIB.trasplante} />
      <TarjetaEstudio T={T} at={K.F + 0.4} until={K.S - 0.3} anio="1945" quien="Alexander Fleming" revista="discurso del Premio Nobel · Estocolmo" y={560} />
      <Etq T={T} at={K.F + 1.6} until={K.S - 0.3} x={560} y={1170} texto="Penicillium" it color={KC.ink} />
      <Chip T={T} at={K.S + 0.8} until={K.C - 0.3} texto="1 · solo con receta" y={720} tam={46} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.9} until={K.C - 0.3} texto="2 · como te los indicaron" y={880} tam={46} borde={KC.leaf} />
      <Chip T={T} at={K.S + 3.0} until={K.C - 0.3} texto="3 · no regales los que sobran" y={1040} tam={46} borde={KC.red} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="entrenadas" y={1520} tam={52} borde={RES} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Az - 0.1} texto="No las mató a todas: *escogió a las más duras.*" />
      <Subtitulo T={T} idx={1} at={K.Az + 0.1} until={K.B - 0.1} texto="Unas pocas traen *un gen que las protege.*" />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.Cr - 0.1} texto="El antibiótico *barre a las demás.*" />
      <Subtitulo T={T} idx={3} at={K.Cr + 0.1} until={K.Co - 0.1} texto="Se multiplican: *ya no les hace nada.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.P - 0.1} texto="Y se pasan el gen *entre especies.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué tan *grave* es?" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.An - 0.1} texto="2025–2050: *39 millones de muertes.*" />
      <Subtitulo T={T} idx={7} at={K.An + 0.1} until={K.R - 0.1} texto="De 1.1 millones al año *a casi 2.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.F - 0.1} texto="Sin antibióticos, *todo se vuelve riesgo.*" />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.S - 0.1} texto="Fleming *ya lo había advertido.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.C - 0.1} texto="Lo que *sí ayuda.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No mata a las débiles: *entrena a las duras.*" />

      <Sticker T={T} src={AVS('avatar_06_pensativo_menton')} at={K.P + 0.1} until={K.E - 0.2} lado="arriba-der" />
      <Sticker T={T} src={AVS('avatar_13_senalando_arriba')} at={K.S + 3.2} until={K.C - 0.2} lado="arriba-der" />

      <MarcaAgua T={T} tema="biologia" num="02" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo mudo (M5 "La carrera": cada división, una nota) ---------- */
// Regla escrita: "cada 20 min se duplican" (E. coli en condiciones de laboratorio). Generaciones 1 → 64.
// Antibiótico: mueren las verdes (la música se tapa); sobrevive 1 roja y vuelve a duplicarse (música libre);
// la segunda pastilla no hace nada; le pasa el gen a otra especie; el plato se llena de rojas y vuelve a quedar 1.
const DISCO = (() => { const L = []; for (let i = 0; i < 64; i++) { const a = i * 2.39996, r = 46 * Math.sqrt(i); L.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, rot: (i * 47) % 360 }); } return L; })();
function Plato({ T, n = 1, color = SENS, vivas = 1, otras = 0, s = 0.85 }) {
  return <g transform={`translate(540 960) scale(${s})`}>
    <circle r={420} fill="#f6f9ff" opacity=".18" stroke={KC.ink} strokeWidth={12} /><circle r={400} fill="#14161c" />
    <circle r={420} fill="none" stroke="#fff" strokeWidth={4} opacity=".5" />
    {DISCO.slice(0, Math.max(0, Math.floor(n))).map((b, i) => <Bacteria key={i} x={b.x} y={b.y} rot={b.rot + mece(T, i, 0.1) * 12} s={0.62} T={T} seed={i} color={typeof color === 'function' ? color(i) : color} gen={(typeof color === 'function' ? color(i) : color) === RES} vida={typeof vivas === 'function' ? vivas(i) : vivas} />)}
  </g>;
}
function ResistenciaMudo() {
  const { T, CUES } = useComposition();
  const K = { U: CUES.Una, D: CUES.Duplica, A: CUES.Antibiotico, S: CUES.Sobrevive, O: CUES.Otra, C: CUES.Comparte, L: CUES.Llena, Lo: CUES.Loop };
  const FIN = K.Lo + 7;
  // generación g → 2^g bacterias. Cada generación dura `paso` s.
  const gen = (t0, paso, max = 6) => Math.min(max, Math.max(0, Math.floor((T - t0) / paso) + 1));
  let n = 1, color = SENS, vivas = 1;
  if (T < K.D + 0.3) { n = 1; }
  else if (T < K.A) { n = Math.pow(2, gen(K.D + 0.3, 1.4)); }
  else if (T < K.S) { n = 64; color = (i) => (i === 37 ? RES : SENS); vivas = (i) => (i === 37 ? 1 : 1 - kprog(T, K.A + 1 + (i % 16) * 0.12, K.A + 2 + (i % 16) * 0.12)); }
  else if (T < K.O) { n = Math.pow(2, gen(K.S + 0.4, 1.4)); color = RES; }
  else if (T < K.L) { n = 64; color = RES; }
  else { n = 64; color = RES; }
  const vuelve = kprog(T, K.Lo + 3.5, FIN - 1);
  if (T >= K.Lo) { n = vuelve > 0.98 ? 1 : 64; color = vuelve > 0.98 ? SENS : RES; vivas = vuelve > 0.98 ? 1 : 1 - vuelve; }
  // el gen pasa a la otra especie durante "Comparte"
  const conj = kprog(T, K.C + 1, K.C + 5);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, ${T > K.A && T < K.S ? '#3a1626' : '#14202e'} 0%, #0E0F12 75%)` }}></div>
      <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        <Plato T={T} n={n} color={color} vivas={vivas} />
        {/* antibiótico que cae (dos veces) */}
        {[[K.A, K.A + 3], [K.O, K.O + 3]].map(([a, b], j) => T > a && T < b + 0.6 && <g key={j}>{Array.from({ length: 40 }, (_, i) => { const u = ((T - a) * 0.6 + i / 40) % 1; return <circle key={i} cx={540 + Math.cos(i * 2.1) * 380 * Math.sqrt((i % 10) / 10)} cy={klerp(560, 1360, u)} r={8} fill="#fff" opacity={0.85 * Math.sin(Math.PI * u) * (1 - kprog(T, b, b + 0.6))} />; })}</g>)}
        {[K.A, K.O].map((a, j) => T > a - 0.3 && T < a + 1.6 && <Capsula key={j} x={540} y={klerp(300, 560, kprog(T, a - 0.3, a + 0.4))} s={0.7} abre={kprog(T, a + 0.3, a + 0.9)} rot={0} />)}
        {/* otra especie que recibe el gen */}
        {T > K.C && T < K.Lo + 1 && <g opacity={kprog(T, K.C, K.C + 0.5) * (1 - kprog(T, K.Lo, K.Lo + 1))}>
          <line x1={540 + DISCO[20].x * 0.85} y1={960 + DISCO[20].y * 0.85} x2={880} y2={620} stroke={RES} strokeWidth={8} strokeDasharray="10 8" />
          <circle cx={klerp(540 + DISCO[20].x * 0.85, 880, kprog(conj, 0.2, 0.7))} cy={klerp(960 + DISCO[20].y * 0.85, 620, kprog(conj, 0.2, 0.7))} r={14} fill="none" stroke={KC.red} strokeWidth={7} />
          {Array.from({ length: Math.min(12, 1 + Math.floor(Math.max(0, T - K.L) / 0.9)) }, (_, i) => <g key={i} transform={`translate(${880 - (i % 4) * 70} ${620 - Math.floor(i / 4) * 60 + mece(T, i, 0.2) * 5})`}><circle r={30} fill={conj > 0.7 ? '#ffd0c8' : OTRA} stroke={KC.ink} strokeWidth={5} />{conj > 0.7 && <circle cx={6} cy={4} r={9} fill="none" stroke={KC.red} strokeWidth={5} />}</g>)}
        </g>}
      </svg>
      {/* la regla escrita y los contadores */}
      <Chip T={T} at={K.U + 0.3} until={FIN - 1.2} texto="regla: cada 20 min se duplican" y={1580} tam={36} borde={SENS} mono />
      <Cronometro T={T} at={K.U + 0.3} until={FIN - 1.2} factor={1200 / 1.4} x={540} y={410} etiqueta="TIEMPO SIMULADO" />
      <div style={{ position:'absolute', left:0, right:0, top:1330, textAlign:'center', zIndex:41, font:`700 64px ${KF.mono}`, color: color === RES ? RES : SENS, textShadow:KSOMBRA }}>{T >= K.A && T < K.S ? (vivas === 1 ? 64 : Math.max(1, Math.round(64 * (1 - kprog(T, K.A + 1, K.A + 3))))) : Math.floor(n)} bacteria{n === 1 && !(T >= K.A && T < K.S) ? '' : 's'}</div>
      <Chip T={T} at={K.A + 0.3} until={K.S - 0.2} texto="antibiótico" y={1480} tam={44} borde="#fff" />
      <Chip T={T} at={K.O + 1.4} until={K.C - 0.2} texto="no les hace nada" y={1480} tam={44} borde={RES} />
      <Chip T={T} at={K.C + 1.0} until={K.L - 0.2} texto="el gen pasa a otra especie" y={1480} tam={34} borde={OTRA} />

      <MarcaAgua T={T} tema="biologia" num="02" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ResistenciaNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ResistenciaNarrado /></CompositionStage></div>;
}
function ResistenciaMudoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ResistenciaMudo /></CompositionStage></div>;
}
window.ResistenciaNarradoApp = ResistenciaNarradoApp;
window.ResistenciaMudoApp = ResistenciaMudoApp;
