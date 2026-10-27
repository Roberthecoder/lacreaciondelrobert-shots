// Shot bio-07 · Biotecnológico #07 — "El virus que se escribió desde una secuencia".
// Dos versiones en un mismo archivo: PolioNarradoApp (N4 + N2) y PolioDatosApp (gemelo mudo M1).
// TONO DE BIOSEGURIDAD: el shot cuenta qué significó y qué reglas dejó. No hay método ni pasos.
// Guion, correcciones y fuentes: guion.md. Todos los dibujos son esquemáticos.

const PAVS = (n) => 'assets/stickers/' + n + '.png';
const LETRAS = ['A', 'C', 'G', 'U'];
const LCOL = { A: '#ff6b5a', C: '#00d2ff', G: '#ffe11a', U: '#2fe0a8' };
const COLS = 50, FILAS = 150, TOTAL_LETRAS = COLS * FILAS;   // 7,500 letras = el genoma del poliovirus

/* ---------- la pantalla de letras (la imagen que se llena, formato N4) ----------
   llenado: 0..1 · La cuadrícula es de 50 × 150. Cada fila que se completa son 50 letras. */
function PantallaLetras({ T, llenado = 1, x = 70, y = 330, ancho = 940, alto = 1000, brillo = 0 }) {
  const k = Math.floor(kclamp(llenado, 0, 1) * TOTAL_LETRAS);
  const cw = ancho / COLS, ch = alto / FILAS;
  const g = krng(2002);
  const letra = Array.from({ length: TOTAL_LETRAS }, () => LETRAS[Math.floor(g() * 4)]);
  const filas = [];
  for (let r = 0; r < FILAS; r++) {
    const desde = r * COLS; if (desde >= k) break;
    const hasta = Math.min(COLS, k - desde);
    const nueva = k - desde < COLS;                      // la fila que se está escribiendo, más brillante
    for (let c = 0; c < hasta; c++) {
      const L = letra[desde + c];
      filas.push(<rect key={desde + c} x={c * cw + cw * 0.12} y={r * ch + ch * 0.12} width={cw * 0.76} height={ch * 0.76} rx={cw * 0.22}
        fill={LCOL[L]} opacity={nueva ? 1 : 0.82} />);
    }
  }
  return <svg style={{ position:'absolute', left:x, top:y, zIndex:20 }} width={ancho} height={alto}>
    <rect x={-10} y={-10} width={ancho + 20} height={alto + 20} rx={22} fill="#0a0d14" stroke={brillo > 0 ? KC.gold : '#2a3245'} strokeWidth={brillo > 0 ? 8 : 5}
      style={brillo > 0 ? { filter:`drop-shadow(0 0 ${18 * brillo}px ${KC.gold})` } : null} />
    {filas}
  </svg>;
}

/* ---------- cápside icosaédrica esquemática (el virus armado) ---------- */
function Capside({ T, x = 0, y = 0, r = 220, rot = 0, o = 1, color = '#c84b6a', color2 = '#9c2f4c' }) {
  const pt = (a, rr) => [rr * Math.cos((a - 90) * Math.PI / 180), rr * Math.sin((a - 90) * Math.PI / 180)];
  const ext = [0, 60, 120, 180, 240, 300].map((a) => pt(a, r));
  const med = [30, 90, 150, 210, 270, 330].map((a) => pt(a, r * 0.52));
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <circle r={r * 1.2} fill={color} opacity={0.16} />
    <polygon points={ext.map((p) => p.join(',')).join(' ')} fill={color} stroke={KC.ink} strokeWidth={r * 0.06} strokeLinejoin="round" />
    {ext.map((p, i) => <polygon key={i} points={`${med[i].join(',')} ${p.join(',')} ${ext[(i + 1) % 6].join(',')} ${med[(i + 1) % 6].join(',')}`}
      fill={i % 2 ? color2 : color} stroke={KC.ink} strokeWidth={r * 0.028} strokeLinejoin="round" />)}
    <polygon points={med.map((p) => p.join(',')).join(' ')} fill={color2} stroke={KC.ink} strokeWidth={r * 0.035} strokeLinejoin="round" />
    {med.map((p, i) => <circle key={'n' + i} cx={p[0] * 0.55} cy={p[1] * 0.55} r={r * 0.045} fill="rgba(255,255,255,.4)" />)}
  </g>;
}

/* ---------- silueta sobria del ratón (sin imagen cruda) ----------
   quieto: 0..1 — a 1 la silueta deja de moverse y se vuelve gris. */
function RatonSilueta({ T, x = 0, y = 0, s = 1, quieto = 0 }) {
  const b = mece(T, 3, 0.8) * 7 * (1 - quieto);
  const col = mixHex('#6f7a84', '#3a4149', quieto);
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${b * 0.5})`} opacity={0.9}>
    <path d={`M 120 -16 q 70 ${10 + b * 2} 92 -42`} fill="none" stroke={col} strokeWidth={11} strokeLinecap="round" />
    <ellipse cx={30} cy={-40} rx={104} ry={60} fill={col} />
    <circle cx={-72} cy={-62} r={46} fill={col} />
    <circle cx={-74} cy={-106} r={22} fill={col} />
    <line x1={-20} y1={16} x2={-20} y2={48} stroke={col} strokeWidth={11} strokeLinecap="round" />
    <line x1={76} y1={16} x2={76} y2={48} stroke={col} strokeWidth={11} strokeLinecap="round" />
  </g>;
}

/* ---------- papel / documento sellado ---------- */
function Documento({ T, x = 0, y = 0, w = 300, h = 380, titulo, pie, sello, rot = 0, sellado = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <line key={i} x1={-w / 2 + 26} y1={-h / 2 + 120 + i * 26} x2={w / 2 - 26 - (i % 3) * 40} y2={-h / 2 + 120 + i * 26}
      stroke="#b9b2a4" strokeWidth={7} strokeLinecap="round" />)}
    {titulo && <text y={-h / 2 + 64} textAnchor="middle" style={{ font:`900 ${Math.min(40, (w - 40) / (titulo.length * 0.6))}px ${KF.texto}` }} fill={KC.ink}>{titulo}</text>}
    {pie && <text y={h / 2 - 28} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#5a524a">{pie}</text>}
    {sello && sellado > 0 && <g transform={`rotate(-12) scale(${klerp(2.2, 1, kclamp(sellado, 0, 1))})`} opacity={kclamp(sellado * 1.6, 0, 1)}>
      <rect x={-104} y={-44} width={208} height={88} rx={14} fill="none" stroke={KC.red} strokeWidth={9} />
      <text y={14} textAnchor="middle" style={{ font:`900 42px ${KF.texto}` }} fill={KC.red}>{sello}</text>
    </g>}
  </g>;
}

/* ---------- candado que se cierra (las reglas) ---------- */
function Candado({ T, x = 0, y = 0, s = 1, cierra = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -46 -20 L -46 ${-20 - 66 * (1 - cierra * 0.35)} A 46 ${46 * (1 - cierra * 0.3)} 0 0 1 46 ${-20 - 66 * (1 - cierra * 0.35)} L 46 -20`}
      fill="none" stroke="#9aa4ae" strokeWidth={20} strokeLinecap="round" />
    <rect x={-72} y={-24} width={144} height={120} rx={22} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
    <circle cy={24} r={18} fill={KC.ink} /><rect x={-7} y={24} width={14} height={38} rx={6} fill={KC.ink} />
  </g>;
}

/* ================= VERSIÓN NARRADA ================= */
function PolioNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Equipo, S: CUES.Secuencia, P: CUES.Pedazos, A: CUES.Arman, R: CUES.Raton,
    Q: CUES.Pregunta, Po: CUES.Porque, Sc: CUES.Science, Cr: CUES.Critica, Re: CUES.Reglas, H: CUES.Hoy, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // el gancho: la cámara sale de unas pocas letras hasta ver la pantalla entera
  const zoomG = klerp(5.5, 1, kprog(T, K.G + 0.1, K.G + 2.8, kEase.suave));

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>

      {/* 0 · GANCHO — el genoma entero dibujado en una pantalla */}
      <EscenaFundido T={T} a={K.G} b={K.E} zoom={0} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 46%, #141a28 0%, #080a10 76%)' }}></div>
        <div style={{ position:'absolute', inset:0, transform:`scale(${zoomG})`, transformOrigin:'22% 36%' }}>
          <PantallaLetras T={T} llenado={kprog(T, K.G + 0.05, K.G + 3.4, kEase.sale)} />
        </div>
      </EscenaFundido>
      <NumeroGigante T={T} at={K.G + 2.0} until={K.E - 0.3} valor={7500} etiqueta="LETRAS" y={1500} tam={180} color={KC.yellow} />

      {/* 1 · EQUIPO */}
      <EscenaFundido T={T} a={K.E} b={K.S} zoom={0.05} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#141a28, #080a10)' }}></div>
        <Ambiente T={T} n={22} seed={7} color="rgba(120,180,255,.3)" tam={[3, 9]} />
        <PantallaLetras T={T} llenado={1} x={240} y={560} ancho={600} alto={620} />
      </EscenaFundido>
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.S - 0.3} anio="2002" quien="Cello, Paul y Wimmer" revista="Stony Brook, Nueva York" y={860} />

      {/* 2 · SECUENCIA — ya estaba publicada */}
      <EscenaFundido T={T} a={K.S} b={K.P} zoom={0.05} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#1a2033, #080a10)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Documento T={T} x={340} y={880} w={470} h={560} titulo="secuencia" pie="ya publicada" rot={-5} />
          {Array.from({ length: 16 }, (_, i) => { const at = K.S + 0.6 + i * 0.09, p = kprog(T, at, at + 1.6, kEase.sale);
            if (T < at) return null; const g = krng(i * 5 + 1);
            const L = LETRAS[Math.floor(g() * 4)];
            return <text key={i} x={klerp(380, 780 + g() * 180, p)} y={klerp(880, 560 + g() * 420, p)} opacity={p < 1 ? 1 : 0.9}
              textAnchor="middle" style={{ font:`700 ${34 + g() * 16}px ${KF.mono}` }} fill={LCOL[L]}>{L}</text>; })}
        </svg>
      </EscenaFundido>
      <Chip T={T} at={K.S + 1.6} until={K.P - 0.3} texto="sin muestra del virus" y={420} borde={KC.cyan} tam={42} />

      {/* 3 · PEDAZOS — llegan por correo */}
      <EscenaFundido T={T} a={K.P} b={K.A} zoom={0.04} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:KC.yellow, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {Array.from({ length: 10 }, (_, i) => { const at = K.P + 0.4 + i * 0.22, p = kprog(T, at, at + 1.1, kEase.rebote);
            if (T < at) return null; const g = krng(i * 13 + 2);
            const x = 170 + (i % 5) * 190, y = 880 + Math.floor(i / 5) * 230;
            return <g key={i} transform={`translate(${x} ${klerp(y - 260, y, p)}) rotate(${(g() - 0.5) * 18}) scale(${klerp(0.4, 1, p)})`} opacity={p}>
              <rect x={-80} y={-56} width={160} height={112} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              <path d="M -80 -56 L 0 6 L 80 -56" fill="none" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
              <rect x={30} y={-46} width={40} height={30} rx={5} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
            </g>; })}
        </svg>
      </EscenaFundido>
      {T >= K.P && T < K.A - 0.1 && <>
        <Contador T={T} at={K.P + 0.4} desde={0} hasta={100} dur={2.4} sufijo="+" x={540} y={470} tam={130} color={KC.yellow} />
        <Chip T={T} at={K.P + 0.6} until={K.A - 0.3} texto="pedacitos de ADN por correo" y={610} tam={40} />
        <NumeroGigante T={T} at={K.P + 2.9} until={K.A - 0.3} valor={100000} prefijo="$" y={1480} tam={130} color={KC.mint} />
      </>}

      {/* 4 · ARMAN — la tira se enrolla y aparece la cápside */}
      <EscenaFundido T={T} a={K.A} b={K.R} zoom={0.05} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #241a2a 0%, #080a10 74%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {Array.from({ length: 26 }, (_, i) => { const p = kprog(T, K.A + 0.2 + i * 0.03, K.A + 2.4, kEase.suave);
            const th = i / 26 * Math.PI * 2 - Math.PI / 2, rr = 300;
            const x0 = 60 + i * 38, y0 = 920, x1 = 540 + rr * Math.cos(th), y1 = 920 + rr * Math.sin(th);
            return <rect key={i} x={klerp(x0, x1, p) - 14} y={klerp(y0, y1, p) - 26} width={28} height={52} rx={8}
              fill={LCOL[LETRAS[i % 4]]} stroke={KC.ink} strokeWidth={4} transform={`rotate(${p * (th * 180 / Math.PI + 90)} ${klerp(x0, x1, p)} ${klerp(y0, y1, p)})`} />; })}
          <g opacity={kprog(T, K.A + 2.2, K.A + 3.2)}>
            <Capside T={T} x={540} y={920} r={290} rot={(T - K.A) * 18} />
          </g>
        </svg>
      </EscenaFundido>
      <Chip T={T} at={K.A + 2.8} until={K.R - 0.3} texto="un poliovirus que funcionaba" y={430} borde={KC.red} tam={42} />

      {/* 5 · RATÓN — sobrio */}
      <EscenaFundido T={T} a={K.R} b={K.Q} zoom={0.04} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#2a1418, #080a10)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <RatonSilueta T={T} x={540} y={930} s={2.0} quieto={kprog(T, K.R + 1.2, K.R + 2.4, kEase.suave)} />
        </svg>
      </EscenaFundido>
      <Chip T={T} at={K.R + 1.8} until={K.Q - 0.3} texto="los ratones se paralizaron" y={520} borde={KC.red} tam={44} />

      {/* 6 · PREGUNTA — re-gancho */}
      <EscenaFundido T={T} a={K.Q} b={K.Po} zoom={0.06} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 44% 48%, #1d2433 0%, #080a10 74%)' }}></div>
        <Ambiente T={T} n={26} seed={11} color="rgba(200,220,255,.32)" tam={[3, 9]} />
        <div style={{ position:'absolute', left:0, right:0, top:760, textAlign:'center',
          font:`400 340px/1 ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`10px ${KC.ink}`,
          transform:`scale(${klerp(0.7, 1, kprog(T, K.Q, K.Q + 0.6, kEase.rebote))})` }}>?</div>
      </EscenaFundido>

      {/* 7 · PORQUÉ — se lee y ahora también se escribe */}
      <EscenaFundido T={T} a={K.Po} b={K.Sc} zoom={0.04} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#111a2c, #080a10)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[0, 1].map((k) => { const y = 740 + k * 400, on = k === 0 ? 1 : kprog(T, K.Po + 1.8, K.Po + 2.6);
            return <g key={k} opacity={k === 0 ? kprog(T, K.Po + 0.3, K.Po + 0.9) : on}>
              <g transform={`translate(${k ? 760 : 250} ${y})`}>
                {k === 0 ? <g><path d="M -34 -60 q 34 30 0 60 q -34 30 0 60" fill="none" stroke={KC.cyan} strokeWidth={14} strokeLinecap="round" />
                  <path d="M 34 -60 q -34 30 0 60 q 34 30 0 60" fill="none" stroke={KC.pink} strokeWidth={14} strokeLinecap="round" /></g>
                  : <text y={30} textAnchor="middle" style={{ font:`700 86px ${KF.mono}` }} fill={KC.gold2}>ACGU</text>}
              </g>
              <path d={`M ${k ? 620 : 420} ${y} L ${k ? 400 : 640} ${y}`} stroke={on > 0.5 ? KC.gold : '#3b4255'} strokeWidth={12} strokeLinecap="round" />
              <path d={`M ${k ? 400 : 640} ${y} l ${k ? 46 : -46} -26 l 0 52 Z`} fill={on > 0.5 ? KC.gold : '#3b4255'} />
              <g transform={`translate(${k ? 250 : 760} ${y})`}>
                {k === 0 ? <text y={30} textAnchor="middle" style={{ font:`700 86px ${KF.mono}` }} fill={KC.gold2}>ACGU</text>
                  : <g><path d="M -34 -60 q 34 30 0 60 q -34 30 0 60" fill="none" stroke={KC.cyan} strokeWidth={14} strokeLinecap="round" />
                  <path d="M 34 -60 q -34 30 0 60 q 34 30 0 60" fill="none" stroke={KC.pink} strokeWidth={14} strokeLinecap="round" /></g>}
              </g>
            </g>; })}
        </svg>
        <Chip T={T} at={K.Po + 0.5} until={K.Sc - 0.3} texto="LEER" x={540} y={620} borde={KC.cyan} tam={42} mono />
        <Chip T={T} at={K.Po + 2.0} until={K.Sc - 0.3} texto="ESCRIBIR" x={540} y={1020} borde={KC.gold} tam={42} mono />
      </EscenaFundido>

      {/* 8 · SCIENCE */}
      <EscenaFundido T={T} a={K.Sc} b={K.Cr} zoom={0.05} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:KC.lilac, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.28) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`rotate(${mece(T, 4, 0.2) * 1.4} 490 860)`}>
            <rect x={180} y={520} width={620} height={680} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
            <rect x={180} y={520} width={620} height={130} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={10} />
            <text x={490} y={618} textAnchor="middle" style={{ font:`400 94px ${KF.titulo}` }} fill={KC.paper}>Science</text>
            <Capside T={T} x={490} y={890} r={160} rot={(T - K.Sc) * 12} />
            <text x={490} y={1150} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill="#5a524a">9 · agosto · 2002</text>
          </g>
        </svg>
      </EscenaFundido>

      {/* 9 · CRÍTICA */}
      <EscenaFundido T={T} a={K.Cr} b={K.Re} zoom={0.04} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:KC.coral, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.26) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>
        <Ambiente T={T} n={16} seed={23} color="rgba(255,255,255,.4)" tam={[5, 14]} vel={12} />
      </EscenaFundido>
      <Chip T={T} at={K.Cr + 0.4} until={K.Re - 0.3} texto="«irresponsable»" x={400} y={560} borde={KC.red} tam={48} />
      <Chip T={T} at={K.Cr + 1.9} until={K.Re - 0.3} texto="«de eso se trataba:" x={560} y={740} borde={KC.gold} tam={44} />
      <Chip T={T} at={K.Cr + 2.3} until={K.Re - 0.3} texto="advertir del riesgo»" x={560} y={870} borde={KC.gold} tam={44} />

      {/* 10 · REGLAS */}
      <EscenaFundido T={T} a={K.Re} b={K.H} zoom={0.04} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:KC.mint, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={kprog(T, K.Re + 0.3, K.Re + 0.9)}>
            <Documento T={T} x={320} y={790} w={400} h={470} titulo="Informe Fink" pie="2004" rot={-6}
              sello="REGLAS" sellado={kprog(T, K.Re + 1.4, K.Re + 1.9, kEase.sale)} />
          </g>
          <g opacity={kprog(T, K.Re + 1.1, K.Re + 1.7)}>
            <Documento T={T} x={750} y={900} w={400} h={470} titulo="NSABB" pie="2004" rot={5}
              sello="CONSEJO" sellado={kprog(T, K.Re + 2.6, K.Re + 3.1, kEase.sale)} />
          </g>
        </svg>
        <Chip T={T} at={K.Re + 3.4} until={K.H - 0.3} texto="bioseguridad" y={430} borde={KC.mint} tam={46} />
      </EscenaFundido>

      {/* 11 · HOY — se revisa el pedido y el cliente */}
      <EscenaFundido T={T} a={K.H} b={K.C} zoom={0.04} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:KC.cyan, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Documento T={T} x={470} y={830} w={460} h={540} titulo="pedido de ADN" pie="¿qué? · ¿quién?" rot={-3}
            sello="REVISADO" sellado={kprog(T, K.H + 2.2, K.H + 2.8, kEase.sale)} />
          <g transform={`translate(${790 + Math.sin((T - K.H) * 1.5) * 60} ${730 + Math.cos((T - K.H) * 1.2) * 50})`} opacity={kprog(T, K.H + 0.4, K.H + 1.0)}>
            <circle r={96} fill="rgba(0,210,255,.1)" stroke={KC.cyan} strokeWidth={12} />
            <line x1={68} y1={68} x2={150} y2={150} stroke={KC.cyan} strokeWidth={20} strokeLinecap="round" />
          </g>
        </svg>
      </EscenaFundido>

      {/* 12 · CIERRE — la misma pantalla, ahora con candado */}
      <EscenaFundido T={T} a={K.C} b={FIN} zoom={0.03} fondo="#0a0d14">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 44%, #141a28 0%, #080a10 76%)' }}></div>
        <PantallaLetras T={T} llenado={1} x={160} y={400} ancho={760} alto={760} brillo={kprog(T, K.C + 0.4, K.C + 1.2)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={kprog(T, K.C + 1.4, K.C + 2.0)} style={{ filter:'drop-shadow(0 0 40px rgba(0,0,0,.85))' }}>
            <Candado T={T} x={540} y={790} s={2.1} cierra={kprog(T, K.C + 1.8, K.C + 2.6, kEase.sale)} />
          </g>
        </svg>
      </EscenaFundido>

      {/* subtítulos */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="Un virus entero: *7,500 letras.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.S - 0.1} texto="En 2002, un equipo *de Nueva York.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.P - 0.1} texto="No usaron el virus: *su secuencia publicada.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.A - 0.1} texto="Más de *cien pedacitos de ADN,* por correo." />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.R - 0.1} texto="Y armaron *un poliovirus que funcionaba.*" />
      <Subtitulo T={T} idx={5} at={K.R + 0.1} until={K.Q - 0.1} texto="En ratones: *se paralizaron.*" />
      <Subtitulo T={T} idx={6} at={K.Q + 0.1} until={K.Po - 0.1} texto="¿Para qué *hacer algo así?*" />
      <Subtitulo T={T} idx={7} at={K.Po + 0.1} until={K.Sc - 0.1} texto="El código ya no solo se lee: *se escribe.*" />
      <Subtitulo T={T} idx={8} at={K.Sc + 0.1} until={K.Cr - 0.1} texto="Science, agosto de 2002: *el mundo se asustó.*" />
      <Subtitulo T={T} idx={9} at={K.Cr + 0.1} until={K.Re - 0.1} texto="«Irresponsable», dijeron. *«Ese era el punto.»*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.H - 0.1} texto="De ahí salieron *las reglas.*" />
      <Subtitulo T={T} idx={11} at={K.H + 0.1} until={K.C - 0.1} texto="Hoy se revisa *qué pides y quién eres.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="La misma herramienta. *Por eso hay reglas.*" />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // el gancho: un virus entero en una pantalla
        [9.8,  13.4, 'avatar_04_bajando_lentes',   'arriba-der'],  // no usaron el virus: su secuencia
        [19.2, 22.8, 'avatar_13_senalando_arriba', 'arriba-der'],  // señala el virus que se arma
        [27.3, 29.4, 'avatar_06_pensativo_menton', 'arriba-der'],  // re-gancho: ¿para qué hacer algo así?
        [34.8, 38.2, 'avatar_12_perfil_serio',     'arriba-der'],  // Science, agosto de 2002
        [38.6, 43.2, 'avatar_10_serio_molesto',    'presentador'],  // GRANDE: «irresponsable», el momento grave
        [48.9, 52.5, 'avatar_02_apuntando_camara', 'abajo-izq'],  // hoy se revisa qué pides y quién eres
        [53.6, 57.9, 'avatar_05_sonriendo_dientes_uniformes', 'gancho'],  // cierre: por eso hay reglas
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ================= GEMELO MUDO (M1 · la música son los datos) ================= */
function PolioDatos() {
  const { T, CUES } = useComposition();
  const K = { V: CUES.Vacio, Ll: CUES.Llena, Co: CUES.Completo, Vi: CUES.Vira, R: CUES.Raton,
    S: CUES.Susto, Re: CUES.Reglas, Ci: CUES.Cierra, Ou: CUES.Outro };
  const llenado = kprog(T, K.Ll, K.Co - 0.2);                        // 150 filas de 50 letras
  const vira = kprog(T, K.Vi + 0.4, K.Vi + 3.2, kEase.suave);
  const vacia = kprog(T, K.Ci + 1.0, K.Ci + 3.0, kEase.suave);       // la pantalla se borra…
  const rellena = kprog(T, K.Ci + 2.4, K.Ou - 0.1) * 0.19;           // …y vuelve a empezar: cierra el loop
  const muestra = kclamp(Math.max(llenado * (1 - vira) * (1 - vacia), rellena), 0, 1);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:'#080a10' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 44%, #141a28 0%, #080a10 76%)' }}></div>
      <Ambiente T={T} n={24} seed={9} color="rgba(120,180,255,.22)" tam={[3, 9]} />

      <div style={{ position:'absolute', inset:0, opacity:1 - vira * 0.9 }}>
        <PantallaLetras T={T} llenado={muestra} x={70} y={330} ancho={940} alto={1000}
          brillo={kprog(T, K.Re + 3.6, K.Re + 4.6) * (1 - vacia)} />
      </div>

      {/* las letras se enrollan y forman la cápside */}
      <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        {vira > 0.02 && <g opacity={Math.min(1, vira * 1.6) * (1 - kprog(T, K.Re + 1.0, K.Re + 2.0))}>
          <Capside T={T} x={540} y={830} r={klerp(60, 300, vira)} rot={(T - K.Vi) * 16} />
        </g>}
        {/* el ratón, sobrio */}
        {T > K.R - 0.4 && T < K.S + 1.0 && <g opacity={kprog(T, K.R - 0.4, K.R + 0.2) * (1 - kprog(T, K.S + 0.2, K.S + 1.0))}>
          <RatonSilueta T={T} x={540} y={1340} s={1.2} quieto={kprog(T, K.R + 1.4, K.R + 3.0, kEase.suave)} />
        </g>}
        {/* las reglas: dos documentos y el candado */}
        {T > K.Re - 0.4 && T < K.Ci + 2.4 && <g opacity={kprog(T, K.Re - 0.4, K.Re + 0.3) * (1 - kprog(T, K.Ci + 1.6, K.Ci + 2.4))}>
          <g opacity={kprog(T, K.Re + 0.2, K.Re + 0.8)}>
            <Documento T={T} x={330} y={760} w={320} h={400} titulo="Fink" pie="2004" rot={-7}
              sello="REGLAS" sellado={kprog(T, K.Re + 1.6, K.Re + 2.1, kEase.sale)} />
          </g>
          <g opacity={kprog(T, K.Re + 1.0, K.Re + 1.6)}>
            <Documento T={T} x={730} y={880} w={320} h={400} titulo="NSABB" pie="2004" rot={6}
              sello="CONSEJO" sellado={kprog(T, K.Re + 3.0, K.Re + 3.5, kEase.sale)} />
          </g>
          <g opacity={kprog(T, K.Re + 4.2, K.Re + 4.8)}>
            <Candado T={T} x={540} y={1360} s={1.5} cierra={kprog(T, K.Re + 4.8, K.Re + 6.0, kEase.sale)} />
          </g>
        </g>}
      </svg>

      {/* poco texto: el contador de letras manda */}
      {(T < K.Vi + 1.0 || T > K.Ci + 2.4) && <Contador T={T} at={T > K.Ci ? K.Ci + 2.4 : K.Ll} desde={0} hasta={T > K.Ci ? 1430 : 7500} dur={T > K.Ci ? K.Ou - 0.1 - K.Ci - 2.4 : K.Co - 0.2 - K.Ll} x={540} y={250} tam={120} color={KC.yellow} />}
      <Chip T={T} at={K.V + 0.4} until={K.Vi - 0.2} texto="el genoma de un virus, letra por letra" y={1480} tam={38} />
      <Chip T={T} at={K.Vi + 1.2} until={K.R - 0.2} texto="escrito desde su secuencia · 2002" y={1480} borde={KC.red} tam={40} />
      <Chip T={T} at={K.S + 1.4} until={K.Re + 0.2} texto="el mundo se asustó" y={1480} borde={KC.red} tam={44} />
      <Chip T={T} at={K.Re + 0.4} until={K.Ci + 2.2} texto="y salieron reglas" y={1480} borde={KC.mint} tam={44} />
      <Chip T={T} at={K.Ci + 2.6} until={K.Ou - 0.1} texto="se lee… y se escribe" y={1480} borde={KC.gold} tam={44} />

      {/* Robert en pantalla (tabla en guion.md) */}
      <Robert T={T} base="assets/stickers/" apariciones={[
        [0,    3.4,  'avatar_11_sorprendido',      'gancho'],  // la pantalla vacía empieza a llenarse
        [8.5,  12.0, 'avatar_06_pensativo_menton', 'arriba-der'],  // las letras suben
        [17.0, 20.5, 'avatar_04_bajando_lentes',   'arriba-der'],  // 7,500: el genoma completo
        [23.5, 27.0, 'avatar_13_senalando_arriba', 'arriba-der'],  // señala la cápside que se forma
        [31.0, 35.0, 'avatar_10_serio_molesto',    'presentador'],  // GRANDE: el ratón, el momento grave
        [36.2, 39.6, 'avatar_12_perfil_serio',     'arriba-der'],  // el mundo se asustó
        [42.2, 45.6, 'avatar_07_pensativo_puno',   'arriba-der'],  // y salieron reglas
        [50.2, 54.0, 'avatar_02_apuntando_camara', 'arriba-der'],  // se lee… y se escribe
      ]} />

      <MarcaAgua T={T} tema="bioquimica" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PolioNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <PolioNarrado />
    </CompositionStage>
  </div>;
}
function PolioDatosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}>
    <CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12">
      <PolioDatos />
    </CompositionStage>
  </div>;
}
window.PantallaLetras = PantallaLetras;
window.Capside = Capside;
window.PolioNarradoApp = PolioNarradoApp;
window.PolioDatosApp = PolioDatosApp;
