// Shot Fungi Mati #91 · Nueve de cada diez hongos todavía no tienen nombre — NARRADO.
// Gancho 4 «Un número que contradice» · formato N4 (la cuadrícula que se llena) + viaje setas → suelo por dentro → las mismas setas.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const EO = { gris:'#9a958c', gris2:'#c9c3b8', dorado:'#F4C25A', tierra:'#6b4a32', tierra2:'#3e2a1c', hifa:'#f4ecd8', pelo:'#3a2416' };
const SETAS10 = Array.from({ length: 10 }, (_, i) => ({ x: 100 + i * 98, s: 0.42 + ((i * 37) % 5) * 0.04, c: ['#c98b2b', '#e85a3a', '#f4c25a', '#a8743c', '#d9668a'][i % 5] }));
const CON_NOMBRE = 4;   // la única a color (posición ilustrativa)

// Fila de 10 setas que brotan; las 9 sin nombre se vuelven siluetas grises con «?».
function FilaSetas({ T, at, y = 1060, gris = 0, brilla = 0 }) {
  return <g>
    {SETAS10.map((st, i) => { const c = kprog(T, at + i * 0.08, at + 0.5 + i * 0.08); if (c <= 0) return null;
      const g = i === CON_NOMBRE ? 0 : gris;
      return <g key={i}>
        <Seta x={st.x} y={y} s={st.s} crece={c} sombrero={mixHex(st.c, EO.gris, g)} pie={mixHex('#f3e6c4', EO.gris2, g)} escamas={false} anillo={i % 3 === 0} />
        {g > 0.5 && <text x={st.x} y={y - st.s * 300} textAnchor="middle" style={{ font:`400 ${60}px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(g, 0.5, 1)}>?</text>}
        {i === CON_NOMBRE && brilla > 0 && <circle cx={st.x} cy={y - st.s * 160} r={110} fill="none" stroke={KC.gold2} strokeWidth={8} opacity={brilla} />}
      </g>; })}
  </g>;
}
// Cuadrícula 10 × 10 (1 cuadrito ≈ 25,000 especies). gris 0..1 = cuántos se pintan gris; oro 0..1 = los 6 dorados;
// franjas = cuántas franjitas de 1/10 de cuadrito (≈ 2,500 especies, un año) se pintan después de los 6.
function Cuad({ T, x = 190, y = 470, c = 70, gris = 1, oro = 0, franjas = 0 }) {
  const out = [];
  for (let i = 0; i < 100; i++) {
    const col = i % 10, fil = Math.floor(i / 10), on = kclamp(gris * 100 - i, 0, 1), dor = i < 6 ? kclamp(oro * 6 - i, 0, 1) : 0;
    out.push(<rect key={i} x={x + col * c + 4} y={y + fil * c + 4} width={c - 8} height={c - 8} rx={8} fill={dor > 0 ? mixHex(EO.gris2, EO.dorado, dor) : (on > 0 ? mixHex('#ffffff', EO.gris2, on) : 'rgba(255,255,255,.35)')} stroke={KC.ink} strokeWidth={4} />);
  }
  // franjitas del 7.º cuadrito en adelante (1/10 de cuadrito cada año)
  for (let k = 0; k < Math.floor(franjas); k++) { const cel = 6 + Math.floor(k / 10), sub = k % 10, col = cel % 10, fil = Math.floor(cel / 10);
    out.push(<rect key={'f' + k} x={x + col * c + 4 + sub * (c - 8) / 10} y={y + fil * c + 4} width={(c - 8) / 10} height={c - 8} fill={KC.orange} />); }
  return <g>{out}</g>;
}
// Corte del suelo al microscopio: granos minerales, raicilla, hifas finas y un pelo humano para comparar (1 µm ≈ 1.5 px).
function SueloMicro({ T, g = 1, pelo = 0, brillo = 0, seed = 11 }) {
  const r = krng(seed);
  const granos = Array.from({ length: 34 }, () => ({ x: r() * 1080, y: 380 + r() * 900, rx: 26 + r() * 70, ry: 20 + r() * 50, a: r() * 180, c: ['#7a5a40', '#8f6d4f', '#5e4430', '#a07a52'][Math.floor(r() * 4)] }));
  const hif = Array.from({ length: 22 }, (_, i) => { const x0 = r() * 1080, y0 = 420 + r() * 820, a = r() * Math.PI * 2, L = 220 + r() * 380;
    return { d: `M ${x0} ${y0} q ${Math.cos(a + 0.6) * L * 0.5} ${Math.sin(a + 0.6) * L * 0.5} ${Math.cos(a) * L} ${Math.sin(a) * L}`, k: i / 22 }; });
  return <g>
    {granos.map((q, i) => <ellipse key={i} cx={q.x} cy={q.y} rx={q.rx} ry={q.ry} transform={`rotate(${q.a} ${q.x} ${q.y})`} fill={q.c} stroke="#2a1a10" strokeWidth={4} />)}
    <path d="M 760 360 Q 720 700 800 1000 Q 840 1150 820 1300" stroke="#c9a46a" strokeWidth={46} fill="none" strokeLinecap="round" />
    <g style={{ filter: brillo > 0 ? `drop-shadow(0 0 ${8 * brillo}px #2fe0a8)` : 'none' }}>
      {hif.map((h, i) => { const q = kclamp(g * 1.6 - h.k, 0, 1); return q > 0 ? <path key={i} d={h.d} pathLength={1} strokeDasharray={`${q} 1`} stroke={brillo > 0 ? mixHex(EO.hifa, KC.mint, brillo) : EO.hifa} strokeWidth={7} fill="none" strokeLinecap="round" /> : null; })}
    </g>
    {pelo > 0 && <g opacity={pelo} transform={`translate(${klerp(-300, 0, kEase.sale(pelo))} 0)`}>
      <rect x={-40} y={560} width={1200} height={90} rx={45} fill={EO.pelo} stroke={KC.ink} strokeWidth={6} transform="rotate(-8 540 605)" />
      <path d="M 0 590 L 1100 440" stroke="#6a4a30" strokeWidth={10} opacity=".6" />
    </g>}
  </g>;
}
// Hongos sin seta: moho (pelusa con cabecitas), levaduras y una raíz con hongo micorrícico.
function SinSetaIcons({ T, p = 1 }) {
  const a = kprog(p, 0, 0.35), b = kprog(p, 0.3, 0.65), c = kprog(p, 0.6, 1);
  return <g>
    {a > 0 && <g opacity={a} transform="translate(230 1020)">{Array.from({ length: 9 }, (_, i) => <g key={i}><line x1={-80 + i * 20} y1={0} x2={-80 + i * 20 + Math.sin(T * 2 + i) * 6} y2={-90 - (i % 3) * 20} stroke="#e8f0e0" strokeWidth={5} /><circle cx={-80 + i * 20 + Math.sin(T * 2 + i) * 6} cy={-96 - (i % 3) * 20} r={9} fill="#5aa65a" stroke={KC.ink} strokeWidth={3} /></g>)}</g>}
    {b > 0 && <g opacity={b}><Levadura x={520} y={960} r={46} brote={0.6} T={T} /><Levadura x={600} y={1020} r={38} brote={0.3} T={T} seed={2} /></g>}
    {c > 0 && <g opacity={c} transform="translate(860 860)"><path d="M 0 -120 Q -10 0 20 200" stroke="#c9a46a" strokeWidth={30} fill="none" strokeLinecap="round" />
      {[-60, 0, 60, 120].map((yy, i) => <path key={i} d={`M ${10 + yy * 0.05} ${yy} q ${-50} ${20} ${-90} ${-10} M ${10 + yy * 0.05} ${yy} q 50 20 90 -10`} stroke={EO.hifa} strokeWidth={6} fill="none" />)}</g>}
  </g>;
}
// Mano que toma un puñado de tierra; tubito de muestra.
function ManoTierra({ T, x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-40} rx={150} ry={60} fill={EO.tierra} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-110 + i * 20} cy={-60 + (i % 3) * 14} r={8} fill={EO.tierra2} />)}
    <path d="M -200 -20 Q -200 120 0 140 Q 200 120 200 -20 Q 120 30 0 30 Q -120 30 -200 -20 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
function Tubo({ x, y, s = 1, lleno = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -200 L -40 120 Q 0 190 40 120 L 40 -200 Z" fill="rgba(255,255,255,.6)" stroke={KC.ink} strokeWidth={7} />
    <path d={`M -36 ${120 - 260 * lleno} L -36 120 Q 0 182 36 120 L 36 ${120 - 260 * lleno} Z`} fill={EO.tierra} opacity=".85" />
    <rect x={-52} y={-240} width={104} height={46} rx={10} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Reloj de arena.
function RelojArena({ T, x, y, s = 1, p = 0 }) {
  const arriba = 1 - p, abajo = p;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.5) * 3})`}>
    <rect x={-120} y={-220} width={240} height={28} rx={10} fill="#8a5a2b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={192} width={240} height={28} rx={10} fill="#8a5a2b" stroke={KC.ink} strokeWidth={6} />
    <path d="M -95 -192 Q -95 -40 -10 0 Q -95 40 -95 192 L 95 192 Q 95 40 10 0 Q 95 -40 95 -192 Z" fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${-80 * arriba - 8} ${-10 - 150 * arriba} L ${80 * arriba + 8} ${-10 - 150 * arriba} L 8 -6 L -8 -6 Z`} fill={KC.gold2} />
    <path d={`M -88 188 Q 0 ${188 - 170 * abajo - 10} 88 188 Z`} fill={KC.gold2} />
    <line x1={0} y1={0} x2={0} y2={188} stroke={KC.gold2} strokeWidth={5} strokeDasharray="6 8" strokeDashoffset={-T * 60} />
  </g>;
}
// Paquete genérico de hongos secos (sin marca) que se abre; rebanadas de porcini.
function Paquete({ T, x, y, s = 1, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -230 L 170 -230 L 190 230 L -190 230 Z" fill="#8bc34a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-120} y={-120} width={240} height={150} rx={18} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-60} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>HONGOS</text>
    <text x={0} y={0} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>SECOS</text>
    <g transform={`translate(0 ${-230 - abre * 60}) rotate(${-abre * 25})`}><path d="M -170 0 L 170 0 L 150 -40 L -150 -40 Z" fill="#6a9a36" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" /></g>
  </g>;
}
function Rebanada({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 -40 Q -90 -110 0 -110 Q 90 -110 90 -40 L 34 -36 Q 30 40 40 110 L -40 110 Q -30 40 -34 -36 Z" fill="#c9a06a" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -80 -50 Q 0 -100 80 -50" stroke="#8a5a2b" strokeWidth={10} fill="none" />
  </g>;
}

function EspeciesShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, To: CUES.Total, N: CUES.Nombradas, Mi: CUES.Micelio, S: CUES.SinSeta, A: CUES.ADN, P: CUES.Pregunta, E: CUES.Estudio, Ri: CUES.Ritmo, Mil: CUES.Mil, Po: CUES.Porcini, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 10 setas, 9 sin nombre */}
      <Escena T={T} a={K.G} b={K.To} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<FilaSetas T={T} at={K.G} gris={kprog(T, K.G + 1.4, K.G + 2.4)} brilla={kprog(T, K.G + 2.4, K.G + 2.9)} />)}
      </Escena>
      {/* 2–3 · la cuadrícula: 2.5 millones estimadas, 155,000 con nombre */}
      <Escena T={T} a={K.To} b={K.Mi} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Cuad T={T} gris={kprog(T, K.To + 0.4, K.To + 2.8)} oro={kprog(T, K.N + 0.6, K.N + 1.6)} />)}
      </Escena>
      {/* 4 · por dentro del suelo: hilos más delgados que un pelo */}
      <Escena T={T} a={K.Mi} b={K.S} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'#24170e' }}></div>
        {fsvg(<SueloMicro T={T} g={kprog(T, K.Mi + 0.3, K.Mi + 2.6)} pelo={kprog(T, K.Mi + 2.4, K.Mi + 3.2)} />)}
      </Escena>
      {/* 5 · sin seta visible */}
      <Escena T={T} a={K.S} b={K.A} zoom={0.04}>
        <MundoSuelo T={T} red={1} sup={660} cielo={KC.yellow} escala={0.12}>
          <g transform="translate(0 -170)"><SinSetaIcons T={T} p={kprog(T, K.S + 0.4, K.S + 2.4)} /></g>
        </MundoSuelo>
      </Escena>
      {/* 6 · ADN del suelo */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.A + 1.6, K.A + 2.0)}><ManoTierra T={T} x={klerp(540, 300, kprog(T, K.A + 0.6, K.A + 1.4))} y={900} /></g>
          <g opacity={kprog(T, K.A + 1.0, K.A + 1.4)}><Tubo x={200} y={900} lleno={kprog(T, K.A + 1.2, K.A + 1.8)} /></g>
          <g opacity={kprog(T, K.A + 1.8, K.A + 2.2)}><ADNHebra T={T} x={330} y={700} largo={640} alto={70} /></g>
          {Array.from({ length: 40 }, (_, i) => { const on = kprog(T, K.A + 3.0 + i * 0.05, K.A + 3.3 + i * 0.05, kEase.rebote); if (on <= 0) return null;
            const r = krng(i + 3); const px = 320 + r() * 680, py = 820 + r() * 340;
            return <circle key={i} cx={px} cy={py} r={14 * on} fill={[KC.pink, KC.yellow, KC.mint, KC.cyan, KC.orange][i % 5]} stroke={KC.ink} strokeWidth={3} />; })}
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿cuánto tardaríamos? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.pink }}></div>
        {fsvg(<><g opacity=".45"><Cuad T={T} x={120} y={520} c={60} gris={1} oro={1} /></g><RelojArena T={T} x={300} y={900} s={0.9} p={kprog(T, K.P, K.E + 1)} /></>)}
      </Escena>
      {/* 8–10 · el reporte de Kew: +2,500 al año, 750–1,000 años */}
      <Escena T={T} a={K.E} b={K.Po} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g opacity={kprog(T, K.Ri, K.Ri + 0.4)}><Cuad T={T} x={190} y={560} c={70} gris={1} oro={1} franjas={kprog(T, K.Ri + 0.8, K.Mil + 3.5) * 24} /></g>)}
        {fsvg(<g opacity={kprog(T, K.Mil, K.Mil + 0.4)}><RelojArena T={T} x={870} y={430} s={0.5} p={kprog(T, K.Mil, K.Po)} /></g>)}
      </Escena>
      {/* 11 · el paquete de hongos secos */}
      <Escena T={T} a={K.Po} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Paquete T={T} x={300} y={980} s={0.95} abre={kprog(T, K.Po + 0.6, K.Po + 1.2, kEase.sale)} />
          {[0, 1, 2].map((i) => { const q = kprog(T, K.Po + 1.4 + i * 0.4, K.Po + 2.2 + i * 0.4, kEase.sale); if (q <= 0) return null;
            const nueva = T > K.Po + 4.4 + i * 0.3;
            return <g key={i}><Rebanada x={klerp(300, 610 + i * 150, q)} y={klerp(760, 900 + (i % 2) * 120, q)} s={0.75} rot={q * (i - 1) * 20} />
              <text x={610 + i * 150} y={760 + (i % 2) * 120} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={nueva ? '#118a3a' : KC.ink} opacity={q}>{nueva ? '✓' : '?'}</text></g>; })}
        </>)}
      </Escena>
      {/* 12 · cierre: las mismas setas, el suelo se enciende con hongos sin nombre */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <MundoSuelo T={T} red={1} sup={1060} cielo={KC.mint} escala={0.16} brillo={kprog(T, K.C + 0.8, K.C + 1.8)}>
          <FilaSetas T={T} at={K.C - 2} y={1066} gris={1} />
          {Array.from({ length: 30 }, (_, i) => { const on = kprog(T, K.C + 1.2 + i * 0.05, K.C + 1.5 + i * 0.05, kEase.rebote); if (on <= 0) return null; const r = krng(i + 40);
            return <circle key={i} cx={40 + r() * 1000} cy={1100 + r() * 120} r={9 * on} fill={[KC.pink, KC.yellow, KC.cyan, KC.orange][i % 4]} stroke={KC.ink} strokeWidth={2} />; })}
        </MundoSuelo>
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 2.3} until={K.To - 0.3} valor={9} dur={0.4} sufijo=" de 10" etiqueta="sin nombre" x={540} y={560} tam={150} color={KC.gold2} />
      <NumeroGigante T={T} at={K.To + 0.5} until={K.N - 0.2} valor={2500000} dur={2} prefijo="≈ " etiqueta="especies de hongos (estimadas)" x={540} y={330} tam={96} color={KC.texto} />
      <Chip T={T} at={K.To + 2.4} until={K.Mi - 0.3} texto="1 cuadrito ≈ 25,000 especies" x={540} y={1230} tam={30} borde={KC.ink} mono />
      <NumeroGigante T={T} at={K.N + 0.5} until={K.Mi - 0.3} valor={155000} dur={1.2} prefijo="≈ " etiqueta="con nombre (2023)" x={540} y={330} tam={96} color={KC.gold2} />
      <Chip T={T} at={K.Mi + 0.2} until={K.S - 0.3} texto="POR DENTRO · EL SUELO" x={540} y={400} tam={32} borde={KC.mint} mono />
      <Etq T={T} at={K.Mi + 1.4} until={K.S - 0.3} x={60} y={1130} texto="hilos de hongo (hifas) · 3–6 µm" tam={28} color={EO.hifa} />
      <Etq T={T} at={K.Mi + 2.8} until={K.S - 0.3} x={60} y={500} texto="un pelo tuyo · 50–120 µm" tam={30} color={KC.texto} />
      <Chip T={T} at={K.S + 0.5} until={K.A - 0.3} texto="sin seta visible" x={540} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.S + 0.8} until={K.A - 0.3} x={140} y={990} texto="moho" tam={28} color={KC.texto} />
      <Etq T={T} at={K.S + 1.4} until={K.A - 0.3} x={440} y={990} texto="levaduras" tam={28} color={KC.texto} />
      <Etq T={T} at={K.S + 2.0} until={K.A - 0.3} x={700} y={1060} texto="en raíces" tam={28} color={KC.texto} />
      <Chip T={T} at={K.A + 2.0} until={K.A + 3.2} texto="leyendo su ADN…" x={660} y={600} tam={34} borde={KC.cyan} mono />
      <Chip T={T} at={K.A + 3.4} until={K.P - 0.3} texto="solo conocidos por su ADN" x={600} y={600} tam={36} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ri - 0.2} anio="2023" quien="Real Jardín Botánico de Kew" revista="State of the World's Plants and Fungi" x={540} y={800} />
      <Chip T={T} at={K.Ri + 0.3} until={K.Mil - 0.2} texto="+2,500 especies nombradas al año" x={540} y={400} tam={34} borde={KC.orange} />
      <Chip T={T} at={K.Ri + 1.2} until={K.Mil - 0.2} texto="1 año = 1 franjita naranja (1/10 de cuadrito)" x={540} y={485} tam={24} borde={KC.orange} mono />
      <div style={{ position:'absolute', left:540, top:440, transform:'translate(-50%,-50%)', zIndex:41, opacity:kprog(T, K.Mil + 0.4, K.Mil + 0.8) * (1 - kprog(T, K.Po - 0.3, K.Po)), font:`400 120px ${KF.titulo}`, color:KC.gold2, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}`, whiteSpace:'nowrap', display: T > K.Mil && T < K.Po + 0.2 ? 'block' : 'none' }}>750–1,000 AÑOS</div>
      <TarjetaEstudio T={T} at={K.Po + 2.6} until={K.C - 0.3} anio="2014" quien="Dentinger y Suz · comprado en 2013" revista="PeerJ, 2014" x={540} y={480} />
      <Etq T={T} at={K.Po + 1.0} until={K.Po + 2.5} x={460} y={660} texto="hongos secos de China · Londres" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Po + 4.6} until={K.C - 0.3} texto="3 especies sin nombre" x={680} y={1180} tam={36} borde="#118a3a" />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="9 de 10 sin nombre" x={330} y={480} tam={44} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.To} texto="5 cm" largo={90} />
      <BarraEscala T={T} at={K.To} until={K.Mi} texto="1 cuadrito ≈ 25,000 especies" largo={0} />
      <BarraEscala T={T} at={K.Mi} until={K.S} texto="100 µm" largo={150} />
      <BarraEscala T={T} at={K.S} until={K.A} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.Ri} until={K.Po} texto="1 cuadrito ≈ 25,000 especies" largo={0} />
      <BarraEscala T={T} at={K.Po} until={K.C} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={90} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Sub T={T} idx={0} at={K.G + 0.1} until={K.To - 0.1} texto="De cada 10 hongos, *9 no tienen nombre.*" />
      <Sub T={T} idx={1} at={K.To + 0.1} until={K.N - 0.1} texto="Mejor estimación: *unos 2.5 millones.*" />
      <Sub T={T} idx={2} at={K.N + 0.1} until={K.Mi - 0.1} texto="Con nombre, hasta 2023: *unas 155,000.*" />
      <Sub T={T} idx={3} at={K.Mi + 0.1} until={K.S - 0.1} texto="Hilos *más delgados que un pelo.*" />
      <Sub T={T} idx={4} at={K.S + 0.1} until={K.A - 0.1} texto="Muchos *nunca sacan seta.*" />
      <Sub T={T} idx={5} at={K.A + 0.1} until={K.P - 0.1} texto="Los buscan *por su ADN.*" />
      <Sub T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cuánto tardaríamos en *nombrarlos todos?*" />
      <Sub T={T} idx={7} at={K.E + 0.1} until={K.Ri - 0.1} texto="2023: el reporte de *Kew, en Londres.*" />
      <Sub T={T} idx={8} at={K.Ri + 0.1} until={K.Mil - 0.1} texto="Más de *2,500 nuevas* al año." />
      <Sub T={T} idx={9} at={K.Mil + 0.1} until={K.Po - 0.1} texto="Terminar: *750 a 1,000 años.*" />
      <Sub T={T} idx={10} at={K.Po + 0.1} until={K.C - 0.1} texto="En un paquete de hongos secos: *3 sin nombre.*" />
      <Sub T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Bajo tus pies, *hongos sin nombre.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.1, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 1.2, K.Mi - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Mi + 3.0, K.S - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.A + 3.4, K.P - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 2.4, K.Ri + 2.6, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Mil + 0.3, K.Po - 0.2, 'avatar_03_aburrido_manos_mejillas', 'bajo-der'],
        [K.Po + 4.4, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="91" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function EspeciesApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><EspeciesShot /></CompositionStage></div>;
}
window.EspeciesApp = EspeciesApp;
