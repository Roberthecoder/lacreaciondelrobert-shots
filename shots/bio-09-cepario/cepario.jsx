// Shot bio-09 · Biotecnológico #09 — "Un cepario: vida en pausa".
// Dos versiones en un mismo archivo: CeparioNarradoApp (N3 + N1) y CeparioDatosApp (gemelo mudo M1).
// Guion y fuentes: guion.md. Todos los dibujos son esquemáticos.

const CAVS = (n) => 'assets/stickers/' + n + '.png';
const HIELO = '#bfe9ff', VAHO = 'rgba(220,245,255,.55)', ACERO = '#c3cbd3';
const T80 = -80, T196 = -196;

/* ---------- vaho frío que cae ---------- */
function Vaho({ T, x, y, w = 420, n = 14, seed = 4, o = 1 }) {
  const g = krng(seed);
  return <g opacity={o}>
    {Array.from({ length: n }, (_, i) => {
      const f = g(), p = ((T * 0.45 + f) % 1);
      return <ellipse key={i} cx={x + (g() - 0.5) * w + mece(T, i, 0.25) * 26} cy={y + p * 320}
        rx={klerp(26, 86, p)} ry={klerp(16, 44, p)} fill={VAHO} opacity={(1 - p) * 0.5} />;
    })}
  </g>;
}

/* ---------- termómetro vertical con la temperatura real ---------- */
function Termometro({ T, at, until, temp, x = 920, y = 520, alto = 620 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const v = typeof temp === 'function' ? temp(T) : temp;
  const p = kclamp((v + 200) / 240, 0, 1);              // de −200 °C a +40 °C
  const col = v <= -150 ? '#7fd4ff' : v <= -60 ? '#4fb0ff' : '#ff6b5a';
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, opacity:e.o }}>
    <div style={{ position:'relative', width:62, height:alto, borderRadius:31, background:'rgba(0,0,0,.55)', border:`5px solid ${KC.texto}`, overflow:'hidden' }}>
      <div style={{ position:'absolute', left:0, right:0, bottom:0, height:`${p * 100}%`, background:col, boxShadow:`0 0 26px ${col}` }}></div>
      {[-196, -130, -80, 0].map((m) => <div key={m} style={{ position:'absolute', left:0, right:0, bottom:`${(m + 200) / 240 * 100}%`,
        height:3, background:'rgba(255,255,255,.55)' }}></div>)}
    </div>
    <div style={{ marginTop:12, marginLeft:-44, width:150, font:`700 40px ${KF.mono}`, color:col, textShadow:KSOMBRA, textAlign:'center' }}>{Math.round(v)}°</div>
  </div>;
}

/* ---------- ultracongelador con sus gradillas ---------- */
function Congelador({ T, x = 0, y = 0, s = 1, abierto = 0, etiqueta, temp = '−80 °C' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-230} y={-300} width={460} height={620} rx={26} fill={ACERO} stroke={KC.ink} strokeWidth={12} />
    <rect x={-200} y={-270} width={400} height={470} rx={16} fill="#0f1620" stroke={KC.ink} strokeWidth={8} />
    {abierto > 0.1 && Array.from({ length: 3 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
      <rect key={r + '_' + c} x={-176 + c * 92} y={-244 + r * 150} width={76} height={128} rx={10}
        fill={mixHex('#2a3445', KC.cyan, 0.2 + 0.2 * ((r + c) % 2))} stroke="#5a6678" strokeWidth={5} opacity={abierto} />
    )))}
    <rect x={-230} y={210} width={460} height={110} rx={18} fill="#9aa4ae" stroke={KC.ink} strokeWidth={10} />
    <rect x={-120} y={238} width={240} height={56} rx={10} fill="#0f1620" stroke={KC.ink} strokeWidth={6} />
    <text y={282} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.cyan}>{temp}</text>
    {/* puerta que se abre */}
    <g transform={`translate(${abierto * -430} 0) rotate(${abierto * -14} -230 0)`} opacity={1}>
      <rect x={-230} y={-300} width={460} height={510} rx={22} fill="#dfe5ea" stroke={KC.ink} strokeWidth={12} />
      <rect x={120} y={-80} width={44} height={180} rx={20} fill="#8b96a0" stroke={KC.ink} strokeWidth={8} />
    </g>
    {etiqueta && <text y={370} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}

/* ---------- tanque de nitrógeno líquido ---------- */
function TanqueN2({ T, x = 0, y = 0, s = 1, abierto = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={330} rx={210} ry={34} fill="rgba(0,0,0,.25)" />
    <rect x={-200} y={-250} width={400} height={580} rx={60} fill={ACERO} stroke={KC.ink} strokeWidth={12} />
    <rect x={-168} y={-210} width={60} height={480} rx={30} fill="#eef3f7" opacity={0.6} />
    <rect x={-215} y={-296} width={430} height={66} rx={26} fill="#8b96a0" stroke={KC.ink} strokeWidth={11}
      transform={`translate(${-abierto * 30} ${-abierto * 70})`} />
    <rect x={-120} y={120} width={240} height={70} rx={12} fill="#0f1620" stroke={KC.ink} strokeWidth={7} />
    <text y={174} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill="#7fd4ff">−196 °C</text>
    {[0, 1, 2].map((i) => <rect key={i} x={-142 + i * 96} y={-190} width={76} height={150} rx={10}
      fill="#2a3445" stroke="#5a6678" strokeWidth={5} opacity={abierto} />)}
  </g>;
}

/* ---------- cristales de hielo entre células (con o sin glicerol) ----------
   glicerol: 0..1 — con glicerol los cristales son chiquitos y la célula no se rompe. */
function Congelacion({ T, x = 540, y = 900, glicerol = 0, rompe = 0 }) {
  const g = krng(17);
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 16 }, (_, i) => {
      const a = g() * Math.PI * 2, r = 120 + g() * 230, tam = klerp(46, 13, glicerol);
      const cx = Math.cos(a) * r, cy = Math.sin(a) * r * 0.7;
      return <g key={i} transform={`translate(${cx} ${cy}) rotate(${g() * 90 + T * 6})`}>
        {[0, 60, 120].map((k) => <line key={k} x1={-tam * Math.cos(k * Math.PI / 180)} y1={-tam * Math.sin(k * Math.PI / 180)}
          x2={tam * Math.cos(k * Math.PI / 180)} y2={tam * Math.sin(k * Math.PI / 180)} stroke={HIELO} strokeWidth={6} strokeLinecap="round" />)}
      </g>;
    })}
    {/* la célula */}
    <ellipse cx={0} cy={0} rx={160} ry={110} fill="#7ee787" stroke={KC.ink} strokeWidth={9}
      opacity={1 - rompe * 0.3} transform={`scale(${1 + rompe * 0.08})`} />
    {rompe > 0.2 && [[-60, -40], [40, 30], [90, -20]].map(([px, py], i) => <path key={i}
      d={`M ${px} ${py} l ${20 + rompe * 30} ${-30 - rompe * 20} l ${-10} ${40}`} fill="none" stroke="#1d5e2a" strokeWidth={7} />)}
    {glicerol > 0 && Array.from({ length: 9 }, (_, i) => { const a = i / 9 * Math.PI * 2;
      return <circle key={'gl' + i} cx={Math.cos(a) * 210} cy={Math.sin(a) * 150} r={klerp(0, 20, glicerol)}
        fill={KC.gold2} stroke={KC.ink} strokeWidth={4} opacity={0.9} />; })}
  </g>;
}

/* ---------- cuatro tipos de cepa ---------- */
const TIPOS = [
  { n: 'bacteria', d: () => <g><rect x={-70} y={-28} width={140} height={56} rx={28} fill="#7ee787" stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 2 q 20 -22 40 0 q 20 22 40 0" fill="none" stroke="#2f7a44" strokeWidth={6} /></g> },
  { n: 'levadura', d: () => <g><ellipse cx={-10} cy={6} rx={56} ry={48} fill="#f6d06a" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={42} cy={-34} rx={24} ry={21} fill="#f9dd92" stroke={KC.ink} strokeWidth={6} /></g> },
  { n: 'moho', d: () => <g><path d="M -60 40 L -10 -10 L 40 40 M -10 -10 L -10 -46" fill="none" stroke="#9aa4ae" strokeWidth={7} strokeLinecap="round" />
    <circle cx={-10} cy={-56} r={22} fill="#4a3b6b" stroke={KC.ink} strokeWidth={6} /></g> },
  { n: 'alga', d: () => <g><circle r={46} fill="#2fe0a8" stroke={KC.ink} strokeWidth={7} />
    <path d="M -24 -10 q 24 24 48 0" fill="none" stroke="#11795c" strokeWidth={6} /><circle cx={-14} cy={-16} r={9} fill="#0f6b50" /></g> },
];

/* ================= VERSIÓN NARRADA ================= */
function CeparioNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ce: CUES.Cepa, Ti: CUES.Tipos, Cp: CUES.Cepario, Cu: CUES.Cuido, Q: CUES.Pregunta,
    C1: CUES.Cap1, C1b: CUES.Cap1b, C2: CUES.Cap2, C3: CUES.Cap3, D: CUES.Dos, M: CUES.Mundo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caps = [{ at: K.C1, titulo: '−80 °C' }, { at: K.C2, titulo: 'nitrógeno líquido' }, { at: K.C3, titulo: 'liofilizar' }];
  // el termómetro sigue los tres capítulos
  const temp = (t) => t < K.C2 ? klerp(20, T80, kprog(t, K.C1, K.C1 + 2.2, kEase.suave))
    : t < K.C3 ? klerp(T80, T196, kprog(t, K.C2 + 0.3, K.C2 + 2.0, kEase.suave))
    : klerp(T196, -20, kprog(t, K.C3 + 0.4, K.C3 + 2.0, kEase.suave));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>

      {/* 0 · GANCHO — el vial con escarcha */}
      <EscenaFundido T={T} a={K.G} b={K.Ce} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.cyan, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.32) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 880) rotate(${mece(T, 1, 0.25) * 4})`}>
            <Vial x={0} y={0} s={2.3} etiqueta="C-07" escarcha={1} contenido="#9ad9b5" />
          </g>
          <Vaho T={T} x={540} y={560} w={280} n={10} o={0.8} />
        </svg>
        <Chip T={T} at={K.G + 0.6} until={K.Ce - 0.3} texto="vida en pausa" y={430} borde={KC.gold} tam={48} />
      </EscenaFundido>

      {/* 1 · CEPA — la ficha */}
      <EscenaFundido T={T} a={K.Ce} b={K.Ti} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.mint, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(230 900) scale(1.3)"><Vial x={0} y={0} s={1} etiqueta="C-07" escarcha={0.6} contenido="#9ad9b5" /></g>
        </svg>
        <Aparece T={T} at={K.Ce + 0.4} until={K.Ti - 0.3} x={470} y={640} modo="pop">
          <div style={{ width:520, background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:22, padding:'20px 26px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
            <div style={{ font:`900 44px ${KF.texto}`, color:KC.ink }}>C-07</div>
            {[['qué es', 'Escherichia coli'], ['de dónde', 'cepario del lab'], ['cómo', '−80 °C + glicerol']].map(([a, b], i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', gap:18, marginTop:12, font:`700 28px ${KF.mono}`, color:'#5a524a' }}>
                <span>{a}</span><span style={{ color:KC.ink, fontStyle: i === 0 ? 'italic' : 'normal' }}>{b}</span>
              </div>))}
          </div>
        </Aparece>
      </EscenaFundido>

      {/* 2 · TIPOS — cuatro tarjetas */}
      <EscenaFundido T={T} a={K.Ti} b={K.Cp} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.lilac, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.28) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        {TIPOS.map((t, i) => { const at = K.Ti + 0.2 + i * 0.4, e = kentrada(T, at, null, 'pop');
          if (T < at) return null;
          const [x, y] = [[250, 720], [700, 720], [250, 1070], [700, 1070]][i];
          return <div key={i} style={{ position:'absolute', left:x - 160, top:y - 140, width:320, height:280, opacity:e.o,
            transform:`scale(${e.s}) rotate(${(i % 2 ? 2 : -2)}deg)`, background:KC.paper, border:`6px solid ${KC.ink}`,
            borderRadius:24, boxShadow:`10px 10px 0 ${KC.ink}`, textAlign:'center' }}>
            <svg width={320} height={190}><g transform={`translate(160 110) scale(1.15) rotate(${mece(T, i + 3, 0.3) * 5})`}>{t.d()}</g></svg>
            <div style={{ font:`900 38px ${KF.texto}`, color:KC.ink, marginTop:-8 }}>{t.n}</div>
          </div>; })}
      </EscenaFundido>

      {/* 3 · CEPARIO — la gradilla */}
      <EscenaFundido T={T} a={K.Cp} b={K.Cu} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #14202e 0%, #0E0F12 76%)' }}></div>
        <Gradilla T={T} cols={8} filas={9} encendidos={(t) => kprog(t, K.Cp + 0.2, K.Cu - 0.2)} x={110} y={470} ancho={860} alto={720} />
        <Chip T={T} at={K.Cp + 0.4} until={K.Cu - 0.3} texto="una biblioteca viva" y={400} borde={KC.cyan} tam={44} />
      </EscenaFundido>

      {/* 4 · CUIDO — el congelador abierto */}
      <EscenaFundido T={T} a={K.Cu} b={K.Q} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#17283a, #0E0F12)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Congelador T={T} x={560} y={820} s={0.95} abierto={kprog(T, K.Cu + 0.4, K.Cu + 1.4, kEase.sale)} />
          <Vaho T={T} x={520} y={800} w={420} n={16} o={kprog(T, K.Cu + 1.0, K.Cu + 1.8)} />
        </svg>
        <Chip T={T} at={K.Cu + 1.6} until={K.Q - 0.3} texto="mi cepario" y={430} borde={KC.gold} tam={44} />
      </EscenaFundido>

      {/* 5 · PREGUNTA — re-gancho */}
      <EscenaFundido T={T} a={K.Q} b={K.C1} zoom={0.06} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 46% 50%, #16222e 0%, #0E0F12 74%)' }}></div>
        <Ambiente T={T} n={28} seed={11} color="rgba(191,233,255,.35)" tam={[3, 10]} vel={-12} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(460 900) rotate(${(T - K.Q) * 26})`}><Vial x={0} y={0} s={2.1} etiqueta="C-07" escarcha={1} contenido="#9ad9b5" /></g>
        </svg>
      </EscenaFundido>

      {/* 6-7 · CAPÍTULO 1 — −80 °C con glicerol */}
      <EscenaFundido T={T} a={K.C1} b={K.C2} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 46% 52%, #16222e 0%, #0E0F12 76%)' }}></div>
        <Ambiente T={T} n={22} seed={21} color="rgba(191,233,255,.3)" tam={[3, 9]} vel={-10} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Congelacion T={T} x={470} y={900} glicerol={kprog(T, K.C1 + 1.6, K.C1 + 3.0, kEase.sale)} rompe={0} />
        </svg>
        <Etiqueta T={T} at={K.C1 + 2.4} until={K.C2 - 0.3} x={600} y={600} texto="glicerol" color={KC.gold2} tam={32} />
        <Etiqueta T={T} at={K.C1 + 3.4} until={K.C2 - 0.3} x={60} y={1170} texto="el hielo no la rompe" color={HIELO} lado="der" tam={30} />
        <Medidor T={T} at={K.C1b + 0.3} until={K.C2 - 0.3} etiqueta="ACTIVIDAD DE LA CÉLULA"
          valor={(t) => klerp(1, 0.12, kprog(t, K.C1b + 0.4, K.C1b + 2.4, kEase.suave))}
          texto={(v) => (v > 0.3 ? 'bajando…' : 'baja, pero no cero')} y={1560} color={KC.cyan} />
        <Chip T={T} at={K.C1b + 2.6} until={K.C2 - 0.3} texto="se detiene a unos −130 °C" x={420} y={400} borde={KC.cyan} tam={34} />
      </EscenaFundido>

      {/* 8 · CAPÍTULO 2 — nitrógeno líquido */}
      <EscenaFundido T={T} a={K.C2} b={K.C3} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0f2234, #0E0F12)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <TanqueN2 T={T} x={520} y={900} s={1.0} abierto={kprog(T, K.C2 + 0.5, K.C2 + 1.5, kEase.sale)} />
          <Vaho T={T} x={470} y={700} w={520} n={20} o={kprog(T, K.C2 + 1.0, K.C2 + 1.8)} />
        </svg>
        <Chip T={T} at={K.C2 + 2.4} until={K.C3 - 0.3} texto="décadas" y={430} borde={HIELO} tam={46} />
      </EscenaFundido>

      {/* 9 · CAPÍTULO 3 — liofilizar */}
      <EscenaFundido T={T} a={K.C3} b={K.D} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #241f33 0%, #0E0F12 76%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(520 840) scale(2.3)">
            <Vial x={0} y={0} s={1} etiqueta="C-07" contenido="#e9c46a" abierto={kprog(T, K.C3 + 0.3, K.C3 + 0.9, kEase.sale) * 0.45} />
          </g>
          {Array.from({ length: 14 }, (_, i) => { const at = K.C3 + 0.9 + i * 0.1, p = kprog(T, at, at + 1.8);
            if (T < at) return null; const g = krng(i * 9 + 1);
            return <circle key={i} cx={470 + (g() - 0.5) * 220 + Math.sin(p * 6 + i) * 30} cy={klerp(760, 300, p)}
              r={klerp(16, 4, p)} fill={HIELO} opacity={(1 - p) * 0.75} />; })}
        </svg>
        <Etiqueta T={T} at={K.C3 + 1.6} until={K.D - 0.3} x={110} y={560} texto="el agua se va" color={HIELO} tam={32} />
        <Medidor T={T} at={K.C3 + 0.6} until={K.D - 0.3} etiqueta="AGUA EN LA MUESTRA"
          valor={(t) => klerp(1, 0.02, kprog(t, K.C3 + 0.9, K.C3 + 3.2, kEase.suave))}
          texto={(v) => (v < 0.1 ? 'seca' : Math.round(v * 100) + ' %')} y={1560} color={HIELO} />
      </EscenaFundido>

      {/* 10 · DOS COPIAS */}
      <EscenaFundido T={T} a={K.D} b={K.M} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#17283a, #0E0F12)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(280 880) scale(0.6)"><Congelador T={T} x={0} y={0} s={1} abierto={0} etiqueta="copia 1" /></g>
          <g opacity={kprog(T, K.D + 0.5, K.D + 1.1)} transform="translate(800 880) scale(0.6)">
            <Congelador T={T} x={0} y={0} s={1} abierto={0} etiqueta="copia 2" /></g>
          <path d="M 450 880 L 630 880" stroke={KC.gold} strokeWidth={10} strokeDasharray="22 16" strokeDashoffset={-T * 40} />
        </svg>
        <Chip T={T} at={K.D + 0.9} until={K.M - 0.3} texto="en lugares distintos" y={430} borde={KC.gold} tam={44} />
      </EscenaFundido>

      {/* 11 · MUNDO */}
      <EscenaFundido T={T} a={K.M} b={K.C} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 54%, #14202e 0%, #0E0F12 78%)' }}></div>
        <Gradilla T={T} cols={10} filas={11} encendidos={(t) => kprog(t, K.M + 0.3, K.C - 0.4)} x={150} y={700} ancho={780} alto={520} color={KC.gold2} />
      </EscenaFundido>
      {T >= K.M - 0.1 && T < K.C - 0.1 && <>
        <NumeroGigante T={T} at={K.M + 0.3} until={K.C - 0.3} valor={861} dur={2.6} etiqueta="COLECCIONES DE MICROBIOS" y={420} tam={110} color={KC.yellow} />
        <Chip T={T} at={K.M + 2.4} until={K.C - 0.3} texto="en 80 países · WDCM 2024" y={560} tam={38} />
      </>}

      {/* 12 · CIERRE — el vial del inicio, ahora con nombre */}
      <EscenaFundido T={T} a={K.C} b={FIN} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.cyan, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.32) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(430 880) rotate(${mece(T, 1, 0.25) * 4})`}>
            <Vial x={0} y={0} s={2.3} etiqueta="C-07" escarcha={1} contenido="#9ad9b5" />
          </g>
          <Vaho T={T} x={430} y={560} w={280} n={10} o={0.7} />
        </svg>
        <Etiqueta T={T} at={K.C + 1.0} until={K.Ou} x={600} y={740} texto="Escherichia coli" it color={KC.ink} tam={34} />
        <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="1978 · la insulina" x={330} y={430} borde={KC.gold} tam={42} />
      </EscenaFundido>

      <Capitulo T={T} caps={caps} hasta={K.D - 0.2} />
      <Termometro T={T} at={K.C1 + 0.2} until={K.C3 - 0.4} temp={temp} x={900} y={560} alto={600} />

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ce - 0.1} texto="Este frasco no está vacío: *vida en pausa.*" />
      <Subtitulo T={T} idx={1} at={K.Ce + 0.1} until={K.Ti - 0.1} texto="Adentro hay *una cepa,* con nombre y ficha." />
      <Subtitulo T={T} idx={2} at={K.Ti + 0.1} until={K.Cp - 0.1} texto="Bacteria, levadura, *moho, alga.*" />
      <Subtitulo T={T} idx={3} at={K.Cp + 0.1} until={K.Cu - 0.1} texto="Un cepario: *una biblioteca viva.*" />
      <Subtitulo T={T} idx={4} at={K.Cu + 0.1} until={K.Q - 0.1} texto="La regla: *que nada cambie.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.C1 - 0.1} texto="¿Cómo detienes la vida *sin matarla?*" />
      <Subtitulo T={T} idx={6} at={K.C1 + 0.1} until={K.C1b - 0.1} texto="−80 °C y *glicerol,* para que el hielo no rompa." />
      <Subtitulo T={T} idx={7} at={K.C1b + 0.1} until={K.C2 - 0.1} texto="Es la *copia de trabajo.*" />
      <Subtitulo T={T} idx={8} at={K.C2 + 0.1} until={K.C3 - 0.1} texto="Nitrógeno líquido: *−196 °C, décadas.*" />
      <Subtitulo T={T} idx={9} at={K.C3 + 0.1} until={K.D - 0.1} texto="O *liofilizar:* quitarles el agua." />
      <Subtitulo T={T} idx={10} at={K.D + 0.1} until={K.M - 0.1} texto="Lo recomendado: *dos copias.*" />
      <Subtitulo T={T} idx={11} at={K.M + 0.1} until={K.C - 0.1} texto="En el mundo: *861 colecciones de microbios.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="En un frasco así vive *esa E. coli.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // el gancho: el frasco no está vacío
        [8.0,  11.2, 'avatar_13_senalando_arriba', 'arriba-der'],  // señala los cuatro tipos de cepa
        [15.8, 19.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],  // «yo cuido uno»: el cepario es suyo
        [19.7, 22.0, 'avatar_06_pensativo_menton', 'arriba-der'],  // re-gancho: ¿cómo detienes la vida?
        [28.0, 31.5, 'avatar_04_bajando_lentes',   'arriba-der'],  // el matiz: a −80 no se detiene del todo
        [34.0, 37.6, 'avatar_12_perfil_serio',     'arriba-der'],  // nitrógeno líquido: décadas
        [39.0, 42.6, 'avatar_07_pensativo_puno',   'arriba-der'],  // liofilizar: quitarles el agua
        [47.0, 51.6, 'avatar_02_apuntando_camara', 'presentador'],  // GRANDE: 861 colecciones de microbios en 80 países
        [52.4, 57.9, 'avatar_13_senalando_arriba', 'gancho'],  // cierre: en un frasco así vive esa E. coli
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ================= GEMELO MUDO (M1 · la música son los datos) ================= */
function CeparioDatos() {
  const { T, CUES } = useComposition();
  const K = { V: CUES.Vacia, F: CUES.Frio, N: CUES.Nitro, L: CUES.Liofil, M: CUES.Mundo, R: CUES.Respaldo, Ci: CUES.Cierra, Ou: CUES.Outro };
  const COLS = 8, FIL = 10, NV = COLS * FIL;          // 80 viales
  // cada bloque llena su tercio de la gradilla
  const bloque = (a, b, n0, n1) => klerp(n0, n1, kprog(T, a, b, kEase.suave));
  const llenos = T < K.F ? 0 : T < K.N ? bloque(K.F + 0.3, K.N - 0.3, 0, 32)
    : T < K.L ? bloque(K.N, K.L - 0.3, 32, 56) : T < K.Ci ? bloque(K.L, K.M - 0.3, 56, 80) : 80;
  const apaga = kprog(T, K.Ci + 0.6, K.Ou - 0.4, kEase.suave);   // se apaga vial por vial: cierra el loop
  const k = Math.round(llenos * (1 - apaga));
  const temp = T < K.N ? T80 : T196;
  const col = T < K.N ? KC.cyan : T < K.L ? HIELO : KC.gold2;
  // cada vial guarda el color del método con el que se guardó (los 3 bloques no se repintan)
  const colorVial = (i) => (i < 32 ? KC.cyan : i < 56 ? HIELO : KC.gold2);
  const parte = kprog(T, K.R + 0.4, K.R + 2.0, kEase.suave);   // las dos copias se separan

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 48%, #14202e 0%, #0E0F12 78%)' }}></div>
      <Ambiente T={T} n={26} seed={13} color="rgba(191,233,255,.26)" tam={[3, 9]} vel={-11} />

      <div style={{ position:'absolute', inset:0, transform:`translateX(${-parte * 120}px)` }}>
        <Gradilla T={T} cols={COLS} filas={FIL} encendidos={k / NV} x={110} y={520} ancho={860} alto={880} color={colorVial} />
      </div>
      {parte > 0.02 && <div style={{ position:'absolute', inset:0, transform:`translateX(${(1 - parte) * 120 + 120}px)`, opacity:parte }}>
        <Gradilla T={T} cols={COLS} filas={FIL} encendidos={k / NV} x={110} y={520} ancho={860} alto={880} color={colorVial} o={0.85} />
      </div>}
      <Contador T={T} at={K.F} desde={0} hasta={1} dur={0.01} x={-999} y={-999} />
      <div style={{ position:'absolute', left:0, right:0, top:300, textAlign:'center', zIndex:41,
        font:`700 96px ${KF.mono}`, color:col, textShadow:KSOMBRA }}>{k} / {NV}</div>

      <Termometro T={T} at={K.F - 0.3} until={K.L - 0.4} temp={temp} x={930} y={560} alto={560} />
      <Chip T={T} at={K.V + 0.4} until={K.F - 0.2} texto="un cepario, vial por vial" x={330} y={430} tam={40} />
      <Chip T={T} at={K.F + 0.3} until={K.N - 0.2} texto="−80 °C · copia de trabajo" x={330} y={430} borde={KC.cyan} tam={40} />
      <Chip T={T} at={K.N + 0.3} until={K.L - 0.2} texto="−196 °C · décadas" x={330} y={430} borde={HIELO} tam={40} />
      <Chip T={T} at={K.L + 0.3} until={K.M - 0.2} texto="liofilizadas · sin agua" x={330} y={430} borde={KC.gold2} tam={40} />
      {T >= K.M - 0.2 && T < K.Ci - 0.1 && <>
        <NumeroGigante T={T} at={K.M + 0.2} until={K.R + 0.4} valor={861} dur={2.8} etiqueta="COLECCIONES EN EL MUNDO" y={1540} tam={100} color={KC.yellow} />
      </>}
      <Chip T={T} at={K.R + 2.2} until={K.Ci + 0.4} texto="dos copias · 80 países" x={330} y={430} borde={KC.gold} tam={40} />
      <Chip T={T} at={K.Ci + 0.8} until={K.Ou - 0.1} texto="…y vuelve a empezar" x={330} y={430} borde={KC.gold} tam={44} />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // la gradilla vacía
        [6.0,  9.5,  'avatar_13_senalando_arriba', 'arriba-der'],  // −80 °C: empieza a llenarse
        [12.0, 15.5, 'avatar_04_bajando_lentes',   'arriba-der'],  // vial por vial
        [18.0, 21.5, 'avatar_06_pensativo_menton', 'arriba-der'],  // nitrógeno líquido
        [24.0, 27.5, 'avatar_12_perfil_serio',     'arriba-der'],  // décadas en pausa
        [30.0, 33.5, 'avatar_07_pensativo_puno',   'arriba-der'],  // liofilizadas
        [37.5, 41.0, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],  // la gradilla llena
        [47.0, 51.5, 'avatar_02_apuntando_camara', 'presentador'],  // GRANDE: dos copias, 861 colecciones en 80 países
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="09" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CeparioNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <CeparioNarrado />
    </CompositionStage>
  </div>;
}
function CeparioDatosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <CeparioDatos />
    </CompositionStage>
  </div>;
}
window.Termometro = Termometro; window.Congelador = Congelador; window.TanqueN2 = TanqueN2;
window.CeparioNarradoApp = CeparioNarradoApp;
window.CeparioDatosApp = CeparioDatosApp;
