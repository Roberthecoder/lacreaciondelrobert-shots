// cine:oscurecido — fondos de este archivo ya adaptados por motor/kit/aplicar-cine.py (no volver a oscurecer)
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
    <defs>
      <linearGradient id="cep-acero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6a7683" /><stop offset=".5" stopColor="#47515c" /><stop offset="1" stopColor="#2c333b" /></linearGradient>
      <linearGradient id="cep-puerta" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7d8996" /><stop offset=".55" stopColor="#56616c" /><stop offset="1" stopColor="#363e47" /></linearGradient>
      <linearGradient id="cep-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#58626d" /><stop offset="1" stopColor="#353c44" /></linearGradient>
    </defs>
    <ellipse cx={0} cy={330} rx={250} ry={30} fill="#000" opacity=".4" />
    <rect x={-230} y={-300} width={460} height={620} rx={26} fill="url(#cep-acero)" stroke={KC.ink} strokeWidth={12} />
    <rect x={-200} y={-270} width={400} height={470} rx={16} fill="#0f1620" stroke={KC.ink} strokeWidth={8} />
    {abierto > 0.1 && Array.from({ length: 3 }, (_, r) => Array.from({ length: 4 }, (_, c) => (
      <rect key={r + '_' + c} x={-176 + c * 92} y={-244 + r * 150} width={76} height={128} rx={10}
        fill={mixHex('#2a3445', KC.cyan, 0.2 + 0.2 * ((r + c) % 2))} stroke="#5a6678" strokeWidth={5} opacity={abierto} />
    )))}
    <rect x={-230} y={210} width={460} height={110} rx={18} fill="url(#cep-base)" stroke={KC.ink} strokeWidth={10} />
    <rect x={-120} y={238} width={240} height={56} rx={10} fill="#0f1620" stroke={KC.ink} strokeWidth={6} />
    <text y={282} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.cyan}>{temp}</text>
    {/* puerta que se abre */}
    <g transform={`translate(${abierto * -430} 0) rotate(${abierto * -14} -230 0)`} opacity={1}>
      <rect x={-230} y={-300} width={460} height={510} rx={22} fill="url(#cep-puerta)" stroke={KC.ink} strokeWidth={12} />
      <path d="M -200 -270 L 60 -270 L -200 40 Z" fill="#ffffff" opacity=".07" />
      {[-150, -60, 30, 120].map((yy) => <line key={yy} x1={-196} y1={yy} x2={90} y2={yy} stroke="#2a3038" strokeWidth={3} opacity=".5" />)}
      <rect x={120} y={-80} width={44} height={180} rx={20} fill="#a9b3bd" stroke={KC.ink} strokeWidth={8} />
    </g>
    {etiqueta && <text y={370} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}

/* ---------- tanque de nitrógeno líquido ---------- */
function TanqueN2({ T, x = 0, y = 0, s = 1, abierto = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <linearGradient id="cep-acero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6a7683" /><stop offset=".5" stopColor="#47515c" /><stop offset="1" stopColor="#2c333b" /></linearGradient>
      <linearGradient id="cep-puerta" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7d8996" /><stop offset=".55" stopColor="#56616c" /><stop offset="1" stopColor="#363e47" /></linearGradient>
      <linearGradient id="cep-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#58626d" /><stop offset="1" stopColor="#353c44" /></linearGradient>
    </defs>
    <ellipse cx={0} cy={330} rx={230} ry={34} fill="rgba(0,0,0,.45)" />
    <rect x={-200} y={-250} width={400} height={580} rx={60} fill="url(#cep-acero)" stroke={KC.ink} strokeWidth={12} />
    <rect x={-168} y={-210} width={60} height={480} rx={30} fill="#c9d4de" opacity={0.22} />
    <rect x={-215} y={-296} width={430} height={66} rx={26} fill="url(#cep-base)" stroke={KC.ink} strokeWidth={11}
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
    <defs><radialGradient id="cep-cel" cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#8fdc98" /><stop offset=".6" stopColor="#4c9a5c" /><stop offset="1" stopColor="#2a5e37" /></radialGradient></defs>
    <ellipse cx={0} cy={0} rx={160} ry={110} fill="url(#cep-cel)" stroke="#c8ffd0" strokeWidth={8}
      opacity={1 - rompe * 0.3} transform={`scale(${1 + rompe * 0.08})`} />
    <path d="M -90 10 q 30 -40 60 -6 t 60 0 t 50 -10" fill="none" stroke="#bff5c6" strokeWidth={5} opacity=".45" />
    <ellipse cx={-60} cy={-50} rx={46} ry={16} fill="#ffffff" opacity=".18" transform="rotate(-18 -60 -50)" />
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
        {/* modo cine (pase a mano): fondo oscuro con motas (antes color plano con lunares) y el vial llena el alto del cuadro (antes s 2.3) */}
        <FondoMarca color={KC.cyan} T={T} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 1034) rotate(${mece(T, 1, 0.25) * 4})`}>
            <Vial x={0} y={0} s={4.1} etiqueta="C-07" escarcha={1} contenido="#9ad9b5" />
          </g>
          <Vaho T={T} x={540} y={420} w={480} n={12} o={0.8} />
        </svg>
        <Chip T={T} at={K.G + 0.6} until={K.Ce - 0.3} texto="vida en pausa" x={885} y={660} borde={KC.gold} tam={40} />
      </EscenaFundido>

      {/* 1 · CEPA — la ficha */}
      <EscenaFundido T={T} a={K.Ce} b={K.Ti} zoom={0.04}>
        {/* modo cine (pase a mano): el vial sigue grande (antes s 1.3) y la ficha ya no se sale del cuadro */}
        <FondoMarca color={KC.mint} T={T} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(210 1020) scale(3.1)"><Vial x={0} y={0} s={1} etiqueta="C-07" escarcha={0.6} contenido="#9ad9b5" /></g>
          <line x1={318} y1={1060} x2={400} y2={960} stroke={KC.ink} strokeWidth={5} strokeDasharray="12 10" opacity={kprog(T, K.Ce + 0.4, K.Ce + 0.8)} />
        </svg>
        <Aparece T={T} at={K.Ce + 0.4} until={K.Ti - 0.3} x={400} y={760} modo="pop">
          <div style={{ width:560, background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:22, padding:'22px 26px', boxShadow:'0 24px 60px rgba(0,0,0,.6)' }}>
            <div style={{ font:`900 54px ${KF.texto}`, color:KC.ink }}>C-07</div>
            {[['qué es', 'Escherichia coli'], ['de dónde', 'cepario del lab'], ['cómo', '−80 °C + glicerol']].map(([a, b], i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', gap:18, marginTop:16, font:`700 30px ${KF.mono}`, color:'#8f9bb8' }}>
                <span>{a}</span><span style={{ color:KC.ink, fontStyle: i === 0 ? 'italic' : 'normal' }}>{b}</span>
              </div>))}
          </div>
        </Aparece>
      </EscenaFundido>

      {/* 2 · TIPOS — cuatro tarjetas */}
      <EscenaFundido T={T} a={K.Ti} b={K.Cp} zoom={0.04}>
        {/* modo cine (pase a mano): las cuatro cepas van grandes y centradas (antes tarjetas de 320 px cargadas a la izquierda) y
            están desde el inicio, atenuadas; cada una se enciende cuando la voz la nombra */}
        <FondoMarca color={KC.lilac} T={T} />
        {TIPOS.map((t, i) => { const at = K.Ti + 0.2 + i * 0.4, e = T < at ? { o: 0, s: 1 } : kentrada(T, at, null, 'pop');
          const base = kprog(T, K.Ti + 0.02, K.Ti + 0.3);
          const [x, y] = [[290, 740], [790, 740], [290, 1210], [790, 1210]][i];
          return <div key={i} style={{ position:'absolute', left:x - 220, top:y - 205, width:440, height:410, opacity:base * (0.3 + 0.7 * e.o),
            transform:`scale(${T < at ? 0.94 : e.s}) rotate(${(i % 2 ? 2 : -2)}deg)`, background:'rgba(19,27,46,.72)', border:`5px solid ${KC.ink}`,
            borderRadius:30, boxShadow:'0 24px 60px rgba(0,0,0,.55)', textAlign:'center' }}>
            <svg width={440} height={300}><g transform={`translate(220 165) scale(2.0) rotate(${mece(T, i + 3, 0.3) * 5})`}>{t.d()}</g></svg>
            <div style={{ font:`900 50px ${KF.texto}`, color:KC.ink, marginTop:-4 }}>{t.n}</div>
          </div>; })}
      </EscenaFundido>

      {/* 3 · CEPARIO — la gradilla */}
      <EscenaFundido T={T} a={K.Cp} b={K.Cu} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #14202e 0%, #0E0F12 76%)' }}></div>
        <Gradilla T={T} cols={8} filas={9} encendidos={(t) => kprog(t, K.Cp - 0.4, K.Cu - 0.4)} x={80} y={500} ancho={920} alto={1000} vacio="rgba(170,205,235,.45)" />   {/* belleza: la gradilla completa se ve desde el inicio (huecos más visibles), arranca antes y baja 60 px */}   {/* modo cine: la gradilla llena el cuadro (antes 860 × 720) */}
        <Chip T={T} at={K.Cp + 0.4} until={K.Cu - 0.3} texto="una biblioteca viva" y={400} borde={KC.cyan} tam={46} />
      </EscenaFundido>

      {/* 4 · CUIDO — el congelador abierto */}
      <EscenaFundido T={T} a={K.Cu} b={K.Q} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0d1624, #0b0f19)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* modo cine (pase a mano): el ultracongelador va grande y al centro (antes s 0.95) */}
          <Congelador T={T} x={640} y={980} s={1.5} abierto={kprog(T, K.Cu + 0.4, K.Cu + 1.4, kEase.sale)} />
          <Vaho T={T} x={600} y={960} w={620} n={18} o={kprog(T, K.Cu + 1.0, K.Cu + 1.8)} />
        </svg>
        <Chip T={T} at={K.Cu + 1.6} until={K.Q - 0.3} texto="mi cepario" x={640} y={420} borde={KC.gold} tam={48} />
      </EscenaFundido>

      {/* 5 · PREGUNTA — re-gancho */}
      <EscenaFundido T={T} a={K.Q} b={K.C1} zoom={0.06} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 46% 50%, #16222e 0%, #0E0F12 74%)' }}></div>
        <Ambiente T={T} n={28} seed={11} color="rgba(191,233,255,.35)" tam={[3, 10]} vel={-12} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(540 960) rotate(${(T - K.Q) * 26})`}><Vial x={0} y={18} s={3.6} etiqueta="C-07" escarcha={1} contenido="#9ad9b5" /></g>
        </svg>
      </EscenaFundido>

      {/* 6-7 · CAPÍTULO 1 — −80 °C con glicerol */}
      <EscenaFundido T={T} a={K.C1} b={K.C2} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 46% 52%, #16222e 0%, #0E0F12 76%)' }}></div>
        <Ambiente T={T} n={22} seed={21} color="rgba(191,233,255,.3)" tam={[3, 9]} vel={-10} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* modo cine (pase a mano): la célula y sus cristales 1.35 veces más grandes y al centro */}
          <g transform="translate(430 960) scale(1.35)"><Congelacion T={T} x={0} y={0} glicerol={kprog(T, K.C1 + 1.6, K.C1 + 3.0, kEase.sale)} rompe={0} /></g>
        </svg>
        <Etiqueta T={T} at={K.C1 + 2.4} until={K.C2 - 0.3} x={560} y={715} texto="glicerol" color={KC.gold2} tam={36} />
        <Etiqueta T={T} at={K.C1 + 3.4} until={K.C2 - 0.3} x={60} y={1290} texto="el hielo no la rompe" color={HIELO} lado="der" tam={34} />
        <Medidor T={T} at={K.C1b + 0.3} until={K.C2 - 0.3} etiqueta="ACTIVIDAD DE LA CÉLULA"
          valor={(t) => klerp(1, 0.12, kprog(t, K.C1b + 0.4, K.C1b + 2.4, kEase.suave))}
          texto={(v) => (v > 0.3 ? 'bajando…' : 'baja, pero no cero')} y={1410} color={KC.cyan} />
        <Chip T={T} at={K.C1b + 2.6} until={K.C2 - 0.3} texto="se detiene a unos −130 °C" x={440} y={480} borde={KC.cyan} tam={36} />
      </EscenaFundido>

      {/* 8 · CAPÍTULO 2 — nitrógeno líquido */}
      <EscenaFundido T={T} a={K.C2} b={K.C3} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0b1422, #0b0f19)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* modo cine (pase a mano): el tanque va grande (antes s 1.0) */}
          <TanqueN2 T={T} x={470} y={1000} s={1.5} abierto={kprog(T, K.C2 + 0.5, K.C2 + 1.5, kEase.sale)} />
          <Vaho T={T} x={430} y={690} w={720} n={22} o={kprog(T, K.C2 + 1.0, K.C2 + 1.8)} />
        </svg>
        <Chip T={T} at={K.C2 + 2.4} until={K.C3 - 0.3} texto="décadas" x={790} y={365} borde={HIELO} tam={50} />
      </EscenaFundido>

      {/* 9 · CAPÍTULO 3 — liofilizar */}
      <EscenaFundido T={T} a={K.C3} b={K.D} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #241f33 0%, #0E0F12 76%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* modo cine (pase a mano): el vial al vacío va grande (antes 2.3) y el vapor sale de su boca */}
          <g transform="translate(540 990) scale(3.4)">
            <Vial x={0} y={0} s={1} etiqueta="C-07" contenido="#e9c46a" abierto={kprog(T, K.C3 + 0.3, K.C3 + 0.9, kEase.sale) * 0.45} />
          </g>
          {Array.from({ length: 14 }, (_, i) => { const at = K.C3 + 0.9 + i * 0.1, p = kprog(T, at, at + 1.8);
            if (T < at) return null; const g = krng(i * 9 + 1);
            return <circle key={i} cx={540 + (g() - 0.5) * 300 + Math.sin(p * 6 + i) * 40} cy={klerp(585, 230, p)}
              r={klerp(24, 6, p)} fill={HIELO} opacity={(1 - p) * 0.75} />; })}
        </svg>
        <Etiqueta T={T} at={K.C3 + 1.6} until={K.D - 0.3} x={385} y={470} lado="izq" texto="el agua se va" color={HIELO} tam={36} />
        <Medidor T={T} at={K.C3 + 0.6} until={K.D - 0.3} etiqueta="AGUA EN LA MUESTRA"
          valor={(t) => klerp(1, 0.02, kprog(t, K.C3 + 0.9, K.C3 + 3.2, kEase.suave))}
          texto={(v) => (v < 0.1 ? 'seca' : Math.round(v * 100) + ' %')} y={1440} color={HIELO} />
      </EscenaFundido>

      {/* 10 · DOS COPIAS */}
      <EscenaFundido T={T} a={K.D} b={K.M} zoom={0.04} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#0d1624, #0b0f19)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* modo cine (pase a mano): los dos congeladores llenan el ancho (antes escala 0.6) */}
          <g transform="translate(275 940) scale(0.94)"><Congelador T={T} x={0} y={0} s={1} abierto={0} etiqueta="copia 1" /></g>
          <g opacity={kprog(T, K.D + 0.5, K.D + 1.1)} transform="translate(805 940) scale(0.94)">
            <Congelador T={T} x={0} y={0} s={1} abierto={0} etiqueta="copia 2" /></g>
          <path d="M 500 900 L 580 900" stroke={KC.gold} strokeWidth={10} strokeDasharray="22 16" strokeDashoffset={-T * 40} />
        </svg>
        <Chip T={T} at={K.D + 0.9} until={K.M - 0.3} texto="en lugares distintos" y={480} borde={KC.gold} tam={48} />
      </EscenaFundido>

      {/* 11 · MUNDO */}
      <EscenaFundido T={T} a={K.M} b={K.C} zoom={0.03} fondo={KC.dark}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 54%, #14202e 0%, #0E0F12 78%)' }}></div>
        <Gradilla T={T} cols={10} filas={11} encendidos={(t) => kprog(t, K.M + 0.05, K.C - 0.4)} x={80} y={720} ancho={920} alto={760} color={KC.gold2} />   {/* modo cine: gradilla a todo lo ancho (antes 780 × 520) */}
      </EscenaFundido>
      {T >= K.M - 0.1 && T < K.C - 0.1 && <>
        <NumeroGigante T={T} at={K.M + 0.3} until={K.C - 0.3} valor={861} dur={2.6} etiqueta="COLECCIONES DE MICROBIOS" y={400} tam={170} color={KC.yellow} />
        <Chip T={T} at={K.M + 2.4} until={K.C - 0.3} texto="en 80 países · WDCM 2024" y={600} tam={40} />
      </>}

      {/* 12 · CIERRE — el vial del inicio, ahora con nombre */}
      <EscenaFundido T={T} a={K.C} b={FIN} zoom={0.05}>
        {/* modo cine (pase a mano): el mismo vial grande del gancho */}
        <FondoMarca color={KC.cyan} T={T} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(400 1034) rotate(${mece(T, 1, 0.25) * 4})`}>
            <Vial x={0} y={0} s={4.1} etiqueta="C-07" escarcha={1} contenido="#9ad9b5" />
          </g>
          <Vaho T={T} x={400} y={420} w={480} n={12} o={0.7} />
        </svg>
        <Etiqueta T={T} at={K.C + 1.0} until={K.Ou} x={590} y={1060} texto="Escherichia coli" it color={KC.ink} tam={38} />
        <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="1978 · la insulina" x={800} y={760} borde={KC.gold} tam={44} />
      </EscenaFundido>

      <Capitulo T={T} caps={caps} hasta={K.D - 0.2} />
      <Termometro T={T} at={K.C1 + 0.2} until={K.C3 - 0.4} temp={temp} x={950} y={640} alto={600} />

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
