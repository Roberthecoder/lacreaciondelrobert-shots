// Shot IA #14 · ¿Cuál de estas caras es real? — NARRADO (N5 "El experimento" + N2 "El número").
// Datos: Nightingale y Farid, PNAS 119(8):e2120481119 (2022) · Miller et al., Psychological Science 34(12):1390–1403 (2023).
// Ver guion.md y verificacion.md. TODAS las caras son dibujos esquemáticos (ni fotos reales ni de IA).

const PIELES = ['#f1c7a3', '#d9a07a', '#a8714f', '#7a4a33', '#f5d2b8', '#c48a64'];
const PELOS = ['#2a1a12', '#5b3a22', '#111111', '#a8662e', '#d9b45a', '#6b6b6b'];
const ROPAS = [KC.cyan, KC.mint, KC.lilac, KC.orange, KC.yellow, KC.pink, KC.blue];

// Cara dibujada (origen = centro de la cabeza). boceto 0..1 la convierte en dibujo a lápiz (se va el color).
function Cara({ x, y, s = 1, T = 0, piel = PIELES[0], pelo = PELOS[0], ropa = KC.cyan, peinado = 'corto', sonrisa = 0.5, lentes = false, aretes = false, fase = 0, boceto = 0, mira = 0 }) {
  const parp = ((T + fase) % 3.7) < 0.13;
  const fo = 1 - boceto, tinta = boceto > 0.5 ? '#6b6560' : KC.ink, sw = klerp(7, 5, boceto), dash = boceto > 0.5 ? '14 8' : 'none';
  const P = { stroke: tinta, strokeWidth: sw, strokeLinejoin: 'round', strokeLinecap: 'round', strokeDasharray: dash };
  const ox = mira * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* pelo de atrás (largo) */}
    {peinado === 'largo' && <path d="M -128 -40 Q -140 -160 0 -168 Q 140 -160 128 -40 L 136 150 Q 0 175 -136 150 Z" fill={pelo} fillOpacity={fo} {...P} />}
    {/* hombros y cuello */}
    <path d="M -190 260 Q -180 160 -60 140 L 60 140 Q 180 160 190 260 Z" fill={ropa} fillOpacity={fo} {...P} />
    <rect x={-38} y={90} width={76} height={70} fill={piel} fillOpacity={fo} {...P} />
    {/* orejas */}
    <ellipse cx={-104} cy={0} rx={20} ry={30} fill={piel} fillOpacity={fo} {...P} />
    <ellipse cx={104} cy={0} rx={20} ry={30} fill={piel} fillOpacity={fo} {...P} />
    {aretes && <><circle cx={-106} cy={36} r={8} fill={KC.gold} fillOpacity={fo} {...P} strokeWidth={3} /><circle cx={106} cy={36} r={8} fill={KC.gold} fillOpacity={fo} {...P} strokeWidth={3} /></>}
    {/* cabeza */}
    <ellipse cx={0} cy={0} rx={102} ry={128} fill={piel} fillOpacity={fo} {...P} />
    {/* pelo de arriba */}
    {peinado === 'corto' && <path d="M -104 -20 Q -112 -128 0 -136 Q 112 -128 104 -20 Q 92 -70 40 -84 Q -10 -64 -60 -86 Q -96 -66 -104 -20 Z" fill={pelo} fillOpacity={fo} {...P} />}
    {peinado === 'largo' && <path d="M -104 0 Q -112 -128 0 -134 Q 112 -128 104 0 Q 96 -80 20 -96 Q -60 -90 -104 0 Z" fill={pelo} fillOpacity={fo} {...P} />}
    {peinado === 'chongo' && <><circle cx={0} cy={-150} r={44} fill={pelo} fillOpacity={fo} {...P} /><path d="M -104 -10 Q -108 -130 0 -132 Q 108 -130 104 -10 Q 80 -96 0 -100 Q -80 -96 -104 -10 Z" fill={pelo} fillOpacity={fo} {...P} /></>}
    {peinado === 'rapado' && <path d="M -100 -30 Q -100 -126 0 -130 Q 100 -126 100 -30 Q 70 -104 0 -106 Q -70 -104 -100 -30 Z" fill={pelo} fillOpacity={fo * 0.85} {...P} />}
    {/* cejas */}
    <path d={`M -64 -38 Q -42 ${-50 - sonrisa * 4} -20 -40`} fill="none" {...P} strokeWidth={sw + 1} />
    <path d={`M 20 -40 Q 42 ${-50 - sonrisa * 4} 64 -38`} fill="none" {...P} strokeWidth={sw + 1} />
    {/* ojos */}
    {parp ? <><path d="M -62 -10 Q -42 -2 -22 -10" fill="none" {...P} /><path d="M 22 -10 Q 42 -2 62 -10" fill="none" {...P} /></>
      : <>{[-42, 42].map((cx) => <g key={cx}>
          <ellipse cx={cx} cy={-12} rx={20} ry={14} fill="#fff" fillOpacity={klerp(1, 0.2, boceto)} {...P} strokeWidth={4} />
          <circle cx={cx + ox} cy={-11} r={9} fill="#3b2a1e" fillOpacity={fo} stroke={tinta} strokeWidth={boceto > 0.5 ? 3 : 0} />
          <circle cx={cx + ox + 3} cy={-14} r={3} fill="#fff" opacity={fo} />
        </g>)}</>}
    {lentes && <g fill="none" {...P} strokeWidth={5}><rect x={-72} y={-34} width={60} height={44} rx={12} /><rect x={12} y={-34} width={60} height={44} rx={12} /><line x1={-12} y1={-14} x2={12} y2={-14} /></g>}
    {/* nariz */}
    <path d="M 2 0 Q -10 34 -2 42 Q 8 46 14 40" fill="none" {...P} strokeWidth={5} />
    {/* boca */}
    <path d={`M -38 72 Q 0 ${72 + 30 * sonrisa} 38 72`} fill={sonrisa > 0.6 ? '#fff' : 'none'} fillOpacity={fo} {...P} />
    {/* chapas */}
    <ellipse cx={-64} cy={42} rx={18} ry={10} fill={KC.pink} opacity={0.25 * fo} />
    <ellipse cx={64} cy={42} rx={18} ry={10} fill={KC.pink} opacity={0.25 * fo} />
  </g>;
}
// Retrato en marco tipo foto de perfil, con letra (A/B).
function Retrato({ x, y, s = 1, letra, fondo = '#dfe7f2', boceto = 0, sello = 0, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-196} y={-246} width={392} height={492} rx={26} fill={KC.ink} transform="translate(12 12)" />
    <rect x={-196} y={-246} width={392} height={492} rx={26} fill={mixHex(fondo, '#fbf8f0', boceto)} stroke={KC.ink} strokeWidth={9} />
    <clipPath id={`cl-${letra}`}><rect x={-190} y={-240} width={380} height={480} rx={22} /></clipPath>
    <g clipPath={`url(#cl-${letra})`}>{children}</g>
    {letra && <g transform="translate(-160 -210)"><circle r={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} /><text y={18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>{letra}</text></g>}
    {sello > 0 && <g transform={`translate(0 120) rotate(-10) scale(${klerp(2, 1, sello)})`} opacity={Math.min(1, sello * 2)}>
      <rect x={-170} y={-50} width={340} height={100} rx={16} fill="rgba(255,255,255,.85)" stroke={KC.pink} strokeWidth={9} />
      <text y={26} textAnchor="middle" style={{ font:`400 72px ${KF.titulo}` }} fill={KC.pink}>DIBUJO</text>
    </g>}
  </g>;
}
// Las dos caras del reto (las mismas al inicio y al final).
function DosCaras({ T, entra = 1, boceto = 0, sello = 0, mano = null }) {
  const dy = (1 - entra) * 900;
  return <>
    <g transform={`translate(0 ${dy})`}>
      <Retrato x={292} y={930} s={0.9} letra="A" boceto={boceto} sello={sello}>
        <Cara x={0} y={-20} s={1.15} T={T} piel={PIELES[0]} pelo={PELOS[3]} ropa={KC.mint} peinado="largo" sonrisa={0.75} aretes boceto={boceto} mira={Math.sin(T * 1.3)} />
      </Retrato>
      <Retrato x={790} y={930} s={0.9} letra="B" fondo="#efe3d6" boceto={boceto} sello={sello}>
        <Cara x={0} y={-20} s={1.15} T={T} fase={1.4} piel={PIELES[2]} pelo={PELOS[2]} ropa={KC.blue} peinado="corto" sonrisa={0.45} lentes boceto={boceto} mira={Math.sin(T * 1.1 + 2)} />
      </Retrato>
    </g>
    {mano != null && <g transform={`translate(${klerp(292, 790, mano)} ${1105 + Math.sin(T * 9) * 8})`}>
      <path d="M -18 40 L -18 -30 Q -18 -46 -4 -46 Q 10 -46 10 -30 L 10 -6 Q 30 -14 44 -2 L 44 50 Q 30 76 0 76 Q -30 76 -36 54 L -50 22 Q -54 8 -40 6 Q -30 6 -18 22 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </g>}
  </>;
}
// Caras al azar (para la pasarela del estudio y el promedio).
function caraAzar(i) {
  const r = krng(100 + i * 7);
  const pe = ['corto', 'largo', 'chongo', 'rapado'];
  return { piel: PIELES[Math.floor(r() * PIELES.length)], pelo: PELOS[Math.floor(r() * PELOS.length)], ropa: ROPAS[Math.floor(r() * ROPAS.length)],
    peinado: pe[Math.floor(r() * pe.length)], sonrisa: 0.2 + r() * 0.7, lentes: r() > 0.75, aretes: r() > 0.7 };
}
// Moneda del volado que gira.
function Moneda({ x, y, T, r = 130 }) {
  const sx = Math.cos(T * 9), lado = sx >= 0;
  return <g transform={`translate(${x} ${y + Math.abs(Math.sin(T * 4.5)) * -40})`}>
    <ellipse cx={0} cy={r + 60} rx={r * 0.8} ry={16} fill="rgba(0,0,0,.18)" />
    <g transform={`scale(${Math.max(0.08, Math.abs(sx))} 1)`}>
      <circle r={r} fill={lado ? KC.gold2 : KC.gold} stroke={KC.ink} strokeWidth={9} />
      <circle r={r * 0.78} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="10 8" />
      <text y={lado ? 26 : 30} textAnchor="middle" style={{ font:`400 ${lado ? 52 : 80}px ${KF.titulo}` }} fill={KC.ink}>{lado ? 'ÁGUILA' : 'SOL'}</text>
    </g>
  </g>;
}
// Barras horizontales con raya de azar (50 %).
function BarrasAzar({ T, at, until, filas, top = 700, azar = true }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), W = 640;
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:30, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 38px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, W * f.valor / 100 * g), height:76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 70px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{`${kformato(f.valor * g, f.dec || 0)} %`}</div>
        </div>
      </div>; })}
    {azar && <div style={{ position:'absolute', left:W * 0.5 - 3, top:30, bottom:20, width:0, borderLeft:`6px dashed ${KC.ink}` }}>
      <div style={{ position:'absolute', bottom:-40, left:-90, width:180, textAlign:'center', font:`700 28px ${KF.mono}`, color:KC.ink }}>azar 50 %</div>
    </div>}
  </div>;
}
// Estrellitas de calificación 1–7.
function Estrellas({ T, at, x, y, n = 7, llenas = 5 }) {
  if (T < at) return null;
  return <g transform={`translate(${x} ${y})`}>{Array.from({ length: n }, (_, i) => { const e = kprog(T, at + i * 0.1, at + i * 0.1 + 0.3, kEase.rebote);
    return <g key={i} transform={`translate(${i * 78} 0) scale(${e})`}>
      <path d="M 0 -32 L 9 -10 L 32 -10 L 14 4 L 20 28 L 0 14 L -20 28 L -14 4 L -32 -10 L -9 -10 Z" fill={i < llenas ? KC.yellow : '#fff'} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <text y={64} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>{i + 1}</text>
    </g>; })}</g>;
}
// Pizarrón del tutorial (pistas genéricas: el estudio no dice cuáles eran).
function Pizarron({ T, at, until }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), lupa = Math.sin(T * 2) * 60;
  return <div style={{ position:'absolute', left:540, top:600, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, zIndex:40 }}>
    <svg width={860} height={460}>
      <rect x={10} y={10} width={840} height={440} rx={22} fill="#2f5a45" stroke="#8a5a2b" strokeWidth={18} />
      <text x={430} y={86} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill="#f4efe4">Tutorial: errores típicos de la IA</text>
      <Cara x={300} y={250} s={0.62} T={T} piel="#f4efe4" pelo="#f4efe4" ropa="#f4efe4" boceto={1} />
      <g transform={`translate(${300 + lupa} 230)`}><circle r={62} fill="rgba(255,255,255,.15)" stroke={KC.yellow} strokeWidth={10} /><line x1={44} y1={44} x2={100} y2={100} stroke={KC.yellow} strokeWidth={16} strokeLinecap="round" /></g>
      {[0, 1, 2].map((k) => <g key={k} opacity={kprog(T, at + 0.6 + k * 0.4, at + 0.9 + k * 0.4)}>
        <text x={560} y={190 + k * 80} style={{ font:`400 64px ${KF.titulo}` }} fill={KC.yellow}>✓</text>
        <line x1={610} y1={170 + k * 80} x2={780} y2={170 + k * 80} stroke="#f4efe4" strokeWidth={8} strokeLinecap="round" strokeDasharray="4 16" />
      </g>)}
    </svg>
  </div>;
}
// Figurita con dos medidores verticales: cuánto falla y qué tan segura se siente (comparación entre personas, ilustrativa).
function Persona({ x, y, T, falla, seguro, crece = 1, color = KC.cyan, cara = 0 }) {
  const c = caraAzar(cara);
  const Barra = ({ dx, v, col, etq }) => <g transform={`translate(${dx} 0)`}>
    <rect x={-26} y={-240} width={52} height={240} rx={12} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-20} y={-6 - 228 * v * crece} width={40} height={228 * v * crece} rx={8} fill={col} />
    <text y={44} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>{etq}</text>
  </g>;
  return <g transform={`translate(${x} ${y})`}>
    <Cara x={0} y={-340} s={0.42} T={T} fase={cara} {...c} sonrisa={seguro > 0.6 ? 0.8 : 0.3} />
    <Barra dx={-44} v={falla} col={KC.red} etq="falla" />
    <Barra dx={44} v={seguro} col={KC.mint} etq="seguro" />
  </g>;
}
// Celular con un perfil cuya foto es un dibujo, y una lupa.
function PerfilCel({ T, x = 540, y = 960, s = 1 }) {
  const lx = Math.sin(T * 1.8) * 70;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-330} width={420} height={660} rx={56} fill="#10131a" stroke={KC.ink} strokeWidth={12} />
    <rect x={-182} y={-290} width={364} height={590} rx={30} fill="#f4efe4" />
    <rect x={-70} y={-316} width={140} height={22} rx={11} fill={KC.ink} />
    <circle cx={0} cy={-170} r={86} fill="#dfe7f2" stroke={KC.ink} strokeWidth={6} />
    <clipPath id="clperfil"><circle cx={0} cy={-170} r={83} /></clipPath>
    <g clipPath="url(#clperfil)"><Cara x={0} y={-160} s={0.5} T={T} piel={PIELES[1]} pelo={PELOS[1]} ropa={KC.orange} peinado="chongo" sonrisa={0.8} /></g>
    <rect x={-120} y={-60} width={240} height={30} rx={15} fill={KC.ink} opacity=".8" />
    <rect x={-90} y={-14} width={180} height={20} rx={10} fill="#9a948a" />
    {[0, 1, 2].map((k) => <rect key={k} x={-150} y={40 + k * 70} width={300} height={44} rx={14} fill="#e2dccf" />)}
    <g transform={`translate(${lx} -150)`}><circle r={80} fill="rgba(0,210,255,.15)" stroke={KC.ink} strokeWidth={12} /><line x1={58} y1={58} x2={130} y2={130} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" /></g>
  </g>;
}

function CarasFalsas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Estudio, V: CUES.Volado, En: CUES.Entreno, P: CUES.Pregunta, Co: CUES.Confianza, Pm: CUES.Promedio, S: CUES.Seguros, Cs: CUES.Consejo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // pasarela del estudio: una cara nueva cada 0.45 s
  const iPas = Math.max(0, Math.floor((T - K.E - 3.6) / 0.45)), uPas = ((T - K.E - 3.6) / 0.45) % 1;
  // promedio: 8 caras que se juntan
  const junta = kprog(T, K.Pm + 0.6, K.Pm + 3.0, kEase.suave);
  const S2 = K.S + 7.4; // empieza «los que más fallaban…»
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: ¿cuál es real? */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.pink} />
        {svg(<DosCaras T={T} entra={kprog(T, K.G, K.G + 0.55, kEase.sale)} mano={T > K.G + 0.6 ? 0.5 + 0.5 * Math.sin((T - K.G) * 2.4) : null} />)}
      </Escena>
      <Chip T={T} at={K.G + 0.2} until={K.E - 0.2} texto="¿Cuál es real?" x={300} y={470} tam={50} borde={KC.ink} />
      <Chip T={T} at={K.G + 2.0} until={K.E - 0.2} texto="la IA ya inventa caras" x={300} y={575} tam={32} borde={KC.cyan} />

      {/* 2 · el estudio de 2022 */}
      <Escena T={T} a={K.E} b={K.V}>
        <FondoLunares color={KC.lilac} />
        {T > K.E + 3.4 && svg(<g opacity={kprog(T, K.E + 3.4, K.E + 3.8)}>
          <Retrato x={690} y={800} s={0.72} letra="">
            <g transform={`translate(${(1 - kEase.sale(Math.min(1, uPas * 3))) * 300} 0)`}><Cara x={0} y={-20} s={1.1} T={T} fase={iPas} {...caraAzar(iPas)} /></g>
          </Retrato>
          {[['REAL', KC.mint, -110], ['IA', KC.red, 110]].map(([t, c, dx], k) => { const on = (iPas + k) % 2 === 0 && uPas > 0.5;
            return <g key={t} transform={`translate(${690 + dx} 1060)`}><rect x={-90} y={-40} width={180} height={80} rx={22} fill={on ? c : '#fff'} stroke={KC.ink} strokeWidth={7} />
              <text y={18} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>; })}
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.2} anio="2022" quien="Lancaster (Inglaterra) y Berkeley (California)" revista="Nightingale y Farid · PNAS" y={760} />
      <Chip T={T} at={K.E + 3.6} until={K.V - 0.2} texto="315 personas" x={250} y={760} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.E + 4.2} until={K.V - 0.2} texto="128 caras c/u" x={250} y={870} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.E + 5.6} until={K.V - 0.2} texto="IA: StyleGAN2" x={250} y={980} tam={36} mono borde={KC.cyan} />

      {/* 3 · 48 % contra un volado */}
      <Escena T={T} a={K.V} b={K.En}>
        <FondoLunares color={KC.yellow} />
        {T > K.V + 1.8 && svg(<g opacity={kprog(T, K.V + 1.8, K.V + 2.2)}><Moneda x={790} y={860} T={T} /></g>)}
      </Escena>
      <NumeroGigante T={T} at={K.V + 0.2} until={K.En - 0.2} valor={48} dur={1.0} sufijo=" %" etiqueta="aciertos" x={330} y={850} tam={230} color={KC.red} />
      <Chip T={T} at={K.V + 2.2} until={K.En - 0.2} texto="volado: 50 %" x={790} y={1100} tam={40} borde={KC.ink} />

      {/* 4 · con entrenamiento: apenas mejor */}
      <Escena T={T} a={K.En} b={K.P}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Pizarron T={T} at={K.En + 0.2} until={K.En + 2.6} />
      <BarrasAzar T={T} at={K.En + 2.8} until={K.P - 0.2} top={720} filas={[{ valor: 48.2, dec: 1, etiqueta: 'sin entrenar', color: KC.red }, { valor: 59, dec: 0, etiqueta: 'con pistas y avisos de acierto', color: KC.blue, at: K.En + 3.6 }]} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1130} textAnchor="middle" style={{ font:`400 560px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 950)`}>?</text>)}
      </Escena>

      {/* 6 · más confiables */}
      <Escena T={T} a={K.Co} b={K.Pm}>
        <FondoLunares color={KC.cyan} />
        {svg(<Estrellas T={T} at={K.Co + 0.3} x={90} y={470} llenas={5} />)}
      </Escena>
      <Comparativa T={T} at={K.Co + 1.6} until={K.Pm - 0.2} max={7} y={640} alto={400}
        izq={{ valor: 4.48, texto: '4.48', etiqueta: 'caras reales', color: KC.paper }} der={{ valor: 4.82, texto: '4.82', etiqueta: 'caras de IA', color: KC.yellow }} />
      <Chip T={T} at={K.Co + 0.6} until={K.Co + 3.3} texto="confianza: 1 a 7" x={820} y={470} tam={34} borde={KC.ink} />

      {/* 7 · la cara promedio (hipótesis) — por dentro de la máquina */}
      <Escena T={T} a={K.Pm} b={K.S}>
        <FondoCircuito T={T} />
        {svg(<>
          {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + T * 0.3, R = klerp(330, 0, junta);
            return <g key={i} opacity={1 - junta * 0.9}><Cara x={540 + Math.cos(a) * R} y={880 + Math.sin(a) * R * 0.9} s={klerp(0.42, 0.9, junta)} T={T} fase={i} {...caraAzar(i + 30)} /></g>; })}
          <g opacity={kprog(T, K.Pm + 2.2, K.Pm + 3.0)}><circle cx={540} cy={880} r={250} fill="none" stroke={KC.yellow} strokeWidth={8} strokeDasharray="20 14" />
            <Cara x={540} y={860} s={1.0} T={T} piel="#d4a07c" pelo="#4a3324" ropa={KC.teal} peinado="corto" sonrisa={0.65} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Pm + 2.6} until={K.S - 0.2} texto="cara «promedio»" x={540} y={520} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Pm + 1.0} until={K.S - 0.2} texto="hipótesis de los autores" x={540} y={1170} tam={34} borde={KC.cyan} />

      {/* 8 · 2023: caras blancas de IA, más «humanas» · los que más fallan, más seguros */}
      <Escena T={T} a={K.S} b={K.Cs}>
        <FondoLunares color={KC.lilac} />
        {T > S2 - 0.3 && svg(<g opacity={kprog(T, S2 - 0.3, S2 + 0.2)}>
          <Persona x={700} y={1130} T={T} falla={0.85} seguro={0.9} crece={kprog(T, S2, S2 + 0.9, kEase.sale)} cara={3} />
          <Persona x={940} y={1130} T={T} falla={0.3} seguro={0.45} crece={kprog(T, S2 + 0.4, S2 + 1.3, kEase.sale)} cara={8} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.S + 0.2} until={K.S + 3.2} anio="2023" quien="Universidad Nacional Australiana y colaboradores" revista="Miller et al. · Psychological Science" y={760} />
      <Chip T={T} at={K.S + 3.3} until={S2 - 0.3} texto="% juzgadas «humanas» · caras blancas" x={540} y={640} tam={32} borde={KC.ink} />
      <BarrasAzar T={T} at={K.S + 3.5} until={S2 - 0.3} top={720} azar={false} filas={[{ valor: 65.9, dec: 1, etiqueta: 'caras blancas de IA', color: KC.red }, { valor: 51.1, dec: 1, etiqueta: 'caras blancas reales', color: KC.blue, at: K.S + 4.6 }]} />
      <Chip T={T} at={S2 + 0.4} until={K.Cs - 0.2} texto="entre personas · ilustrativo" x={820} y={560} tam={28} borde={KC.ink} />

      {/* 9 · el consejo */}
      <Escena T={T} a={K.Cs} b={K.C}>
        <FondoLunares color={KC.coral} />
        {svg(<PerfilCel T={T} x={720} y={900} s={0.9} />)}
      </Escena>
      <MitoTachado T={T} at={K.Cs + 0.2} tacharEn={K.Cs + 1.3} until={K.C - 0.2} texto="«se ve real» = es real" x={640} y={470} tam={42} />
      <Chip T={T} at={K.Cs + 2.2} until={K.C - 0.2} texto="¿quién la publicó?" x={290} y={820} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Cs + 2.9} until={K.C - 0.2} texto="¿de dónde salió?" x={290} y={940} tam={34} borde={KC.ink} />

      {/* 10 · cierre: las mismas dos caras… eran dibujos */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<DosCaras T={T} boceto={kprog(T, K.C + 1.2, K.C + 2.0, kEase.suave)} sello={kprog(T, K.C + 1.6, K.C + 2.0, kEase.sale)} />)}
        {svg(<g opacity={kprog(T, K.C + 0.9, K.C + 1.2) * (1 - kprog(T, K.C + 2.3, K.C + 2.7))} transform={`translate(${klerp(120, 960, kprog(T, K.C + 1.0, K.C + 2.2, kEase.suave))} ${760 + Math.sin(T * 14) * 30}) rotate(35)`}>
          <rect x={-22} y={-170} width={44} height={260} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
          <rect x={-22} y={-200} width={44} height={36} rx={6} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
          <path d="M -22 90 L 0 150 L 22 90 Z" fill="#f1c7a3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /><path d="M -7 132 L 0 150 L 7 132 Z" fill={KC.ink} />
        </g>)}
      </Escena>
      <Chip T={T} at={K.C + 0.2} until={K.Ou} texto="¿Cuál era real?" x={300} y={470} tam={46} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="ninguna ✏️" x={300} y={570} tam={40} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="¿Cuál de estas caras *es real?*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.V - 0.1} texto="2022: *315 personas* contra la IA StyleGAN2." />
      <Subtitulo T={T} idx={2} at={K.V + 0.1} until={K.En - 0.1} texto="Atinaron *48 %.* Un volado: 50 %." />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.P - 0.1} texto="Con pistas: *59 %.* Apenas mejor." />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Y si eliges *la más confiable?*" />
      <Subtitulo T={T} idx={5} at={K.Co + 0.1} until={K.Pm - 0.1} texto="Las de la IA: *más confiables.*" />
      <Subtitulo T={T} idx={6} at={K.Pm + 0.1} until={K.S - 0.1} texto="Hipótesis: *lo promedio* da confianza." />
      <Subtitulo T={T} idx={7} at={K.S + 0.1} until={S2 - 0.1} texto="Caras blancas de IA: *más «humanas»* que las reales." />
      <Subtitulo T={T} idx={8} at={S2 + 0.1} until={K.Cs - 0.1} texto="Los que más fallaban: *los más seguros.*" />
      <Subtitulo T={T} idx={9} at={K.Cs + 0.1} until={K.C - 0.1} texto="No le creas a *«se ve real».*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="¿Cuál era real? *Ninguna: son dibujos.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Estudio + 4.4, CUES.Estudio + 8.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Volado + 1.0, CUES.Volado + 3.9, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Entreno + 3.4, CUES.Entreno + 5.8, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Confianza + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Confianza + 3.6, CUES.Confianza + 5.5, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Promedio + 2.2, CUES.Promedio + 5.0, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Seguros + 7.4, CUES.Consejo - 0.15, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Consejo + 0.3, CUES.Cierre - 0.15, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="14" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CarasFalsasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CarasFalsas /></CompositionStage></div>;
}
window.CarasFalsasApp = CarasFalsasApp;
