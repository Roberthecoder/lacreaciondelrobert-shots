// Shot Fungi Mati #93 · El hongo que no puede vivir sin sal (Wallemia ichthyophaga) — NARRADO.
// Gancho 1 «Esto no es X: es Y» · formato N1 «Por dentro» + medidor: bacalao salado → células al microscopio → el mismo bacalao.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const SO = { bac:'#f1e6d0', bac2:'#d9c9a8', piel:'#8a8f96', cafe:'#7a4a22', cafe2:'#a8692e', sal:'#ffffff', agua:'#7fd3ff', mar:'#2f7fd6', cec:'#9a3b2a' };

// Trozo de bacalao salado (abierto en abanico) con cristales de sal y manchitas cafés (el hongo).
function Bacalao({ T, x, y, s = 1, rot = 0, manchas = 0, marca = 0 }) {
  const cristales = [[-180, -40], [-120, 30], [-40, -80], [20, 10], [90, -50], [150, 40], [-70, 80], [60, 90], [-200, 60], [180, -10]];
  const mch = [[-110, -10, 16], [30, -40, 12], [100, 30, 18], [-40, 50, 10], [150, -20, 11], [-160, 40, 9]];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -260 -20 Q -200 -150 0 -160 Q 200 -150 270 -40 Q 290 60 200 130 Q 0 190 -200 130 Q -290 60 -260 -20 Z" fill={SO.bac} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -240 -10 Q -190 -130 0 -142 Q 190 -132 250 -36" stroke={SO.piel} strokeWidth={18} fill="none" strokeLinecap="round" />
    {[-120, -40, 40, 120].map((dx, i) => <path key={i} d={`M ${dx} -120 Q ${dx + 20} 0 ${dx - 10} 140`} stroke={SO.bac2} strokeWidth={6} fill="none" />)}
    {cristales.map(([a, b], i) => <rect key={i} x={a - 9} y={b - 9} width={18} height={18} rx={3} fill={SO.sal} stroke="#b9c6d0" strokeWidth={3} transform={`rotate(${i * 23} ${a} ${b})`} />)}
    {mch.map(([a, b, r], i) => { const q = kclamp(manchas * 6 - i, 0, 1); return q > 0 ? <g key={i}>
      <circle cx={a} cy={b} r={r * kEase.rebote(q)} fill={SO.cafe} opacity=".85" />
      <circle cx={a + r * 0.5} cy={b - r * 0.3} r={r * 0.5 * q} fill={SO.cafe2} opacity=".8" />
      {marca > 0 && <circle cx={a} cy={b} r={r + 12} fill="none" stroke={KC.gold2} strokeWidth={5} opacity={marca} />}
    </g> : null; })}
  </g>;
}
// Racimo de células de Wallemia (tipo sarcina: paquetes de células pegadas, cúbicas a redondas, pared gruesa, cafés).
function Racimo2({ T, x, y, s = 1, n = 8, pared = 6, seed = 3, crece = 1 }) {
  const r = krng(seed), cel = [];
  const k = Math.max(1, Math.round(n * crece));
  for (let i = 0; i < k; i++) { const col = i % 3, fil = Math.floor(i / 3); cel.push([col * 40 - 40 + (fil % 2) * 18 + (r() - 0.5) * 6, fil * 38 - 30 + (r() - 0.5) * 6]); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cel.map(([a, b], i) => <rect key={i} x={a - 19} y={b - 18} width={38} height={36} rx={13} fill={SO.cafe2} stroke="#3a2210" strokeWidth={pared} />)}
  </g>;
}
// Medidor de salinidad vertical (0 a saturada). valor 0..1 (1 = saturada ≈ 26 % en peso; solo se rotula como «saturada»).
function MedidorSal({ T, x, y, alto = 760, valor = 0, marcas = 1 }) {
  const Y = (v) => y + alto - v * alto, v = kclamp(valor, 0, 1);
  return <g>
    <rect x={x} y={y} width={120} height={alto} rx={60} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
    <rect x={x + 14} y={Y(v)} width={92} height={alto * v - 14} rx={46} fill={SO.agua} />
    {Array.from({ length: Math.round(v * 40) }, (_, i) => <rect key={i} x={x + 30 + (i * 37) % 60} y={y + alto - 30 - (i * 53) % Math.max(20, alto * v - 40)} width={12} height={12} fill="#fff" opacity=".8" />)}
    {marcas > 0 && [[0.135, 'mar ≈ 3.5 %', SO.mar], [0.385, 'mínimo para crecer ≈ 10 %', KC.orange], [1, 'saturada: ya no cabe más', KC.red]].map(([m, t, c], i) =>
      <g key={i} opacity={kprog(marcas, i * 0.33, i * 0.33 + 0.3)}><line x1={x - 20} y1={Y(m)} x2={x + 150} y2={Y(m)} stroke={c} strokeWidth={8} strokeLinecap="round" />
        <text x={x + 170} y={Y(m) + 12} style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>)}
  </g>;
}
// Vaso con agua saturada: la sal ya no se disuelve.
function Vaso({ x, y, s = 1, cristales = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -200 L -90 160 Q 0 190 90 160 L 110 -200" fill="rgba(127,211,255,.45)" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: Math.round(18 * cristales) }, (_, i) => <rect key={i} x={-80 + (i * 29) % 160} y={130 - Math.floor(i / 6) * 18} width={20} height={20} rx={3} fill="#fff" stroke="#9fb0bd" strokeWidth={3} transform={`rotate(${i * 17} ${-70 + (i * 29) % 160} ${140 - Math.floor(i / 6) * 18})`} />)}
  </g>;
}
// Célula común que pierde agua (se arruga) con flechas de salida.
function CelulaSeca({ T, x, y, r = 170, seca = 0 }) {
  const pts = Array.from({ length: 49 }, (_, i) => { const a = i / 48 * Math.PI * 2, rr = r * (1 - 0.3 * seca) * (1 + 0.08 * seca * Math.sin(a * 9)); return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y})`}>
    <path d={pts} fill={mixHex('#9fe3c0', '#c8b48a', seca)} stroke={KC.ink} strokeWidth={7} />
    <circle r={r * 0.28 * (1 - 0.2 * seca)} fill="#3a8a6a" />
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4, d = r * (1.05 + 0.4 * ((T * 0.8 + i * 0.13) % 1)); return <g key={i} opacity={seca}>
      <circle cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={9} fill={SO.agua} stroke={KC.ink} strokeWidth={3} />
      <path d={`M ${Math.cos(a) * (r * 0.95)} ${Math.sin(a) * (r * 0.95)} L ${Math.cos(a) * (r * 1.3)} ${Math.sin(a) * (r * 1.3)}`} stroke={KC.texto} strokeWidth={5} markerEnd="" opacity=".7" />
    </g>; })}
  </g>;
}
// Corte de una célula de Wallemia: pared delgada o gruesa.
function CeluWal({ x, y, r = 130, pared = 10, T = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-r} y={-r} width={r * 2} height={r * 2} rx={r * 0.55} fill="#3a2210" stroke={KC.ink} strokeWidth={6} />
    <rect x={-r + pared} y={-r + pared} width={r * 2 - pared * 2} height={r * 2 - pared * 2} rx={Math.max(10, r * 0.55 - pared)} fill={SO.cafe2} />
    <circle cx={0} cy={0} r={r * 0.28} fill="#e8b878" stroke="#3a2210" strokeWidth={4} />
  </g>;
}
// Cecina (tira de carne seca).
function Cecina({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -140 -30 Q -60 -60 20 -40 Q 100 -20 150 -40 L 160 20 Q 80 50 0 30 Q -80 10 -150 30 Z" fill={SO.cec} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {[-90, -30, 40, 100].map((dx, i) => <path key={i} d={`M ${dx} -36 Q ${dx + 6} 0 ${dx - 4} 28`} stroke="#6a2418" strokeWidth={4} fill="none" />)}
    {[[-60, -10], [30, 0], [110, -10]].map(([a, b], i) => <rect key={i} x={a} y={b} width={12} height={12} fill="#fff" opacity=".9" />)}
  </g>;
}
// Salinas: estanques rectangulares con orillas blancas de sal.
function Salinas({ T, x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    {[0, 1, 2].map((f) => [0, 1, 2].map((c) => <rect key={f + '' + c} x={c * 300} y={f * 120} width={280} height={100} rx={8} fill={mixHex('#7fd3ff', '#f2f6f8', (f * 3 + c) / 9)} stroke="#e9e2cf" strokeWidth={10} />))}
  </g>;
}
function BanderaFranjas({ x, y, w = 180 }) {
  return <g transform={`translate(${x} ${y})`}><rect width={w} height={w * 0.2} fill="#fff" stroke={KC.ink} strokeWidth={4} /><rect y={w * 0.2} width={w} height={w * 0.2} fill="#0057b8" stroke={KC.ink} strokeWidth={4} /><rect y={w * 0.4} width={w} height={w * 0.2} fill="#ed1c24" stroke={KC.ink} strokeWidth={4} /></g>;
}
function Pez({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -160 0 Q -60 -90 80 -30 L 160 -80 L 140 0 L 160 80 L 80 30 Q -60 90 -160 0 Z" fill={SO.bac} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-110} cy={-10} r={9} fill={KC.ink} />
    {[[-40, -10], [10, 10], [50, -6]].map(([a, b], i) => <rect key={i} x={a} y={b} width={14} height={14} fill="#fff" stroke="#b9c6d0" strokeWidth={2} />)}
  </g>;
}

function SalShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, Mi: CUES.Minimo, Sa: CUES.Saturada, Se: CUES.Seca, P: CUES.Pregunta, Pa: CUES.Pared, B: CUES.Bolitas, E: CUES.Estudio, Pe: CUES.Pescado, Ge: CUES.Genoma, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho: el bacalao salado y sus manchitas; lupa: racimos de células */}
      <Escena T={T} a={K.G} b={K.Mi} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Bacalao T={T} x={430} y={900} s={1.4} rot={Math.sin(T * 2) * 3} manchas={kprog(T, K.G + 0.15, K.G + 1.4)} />)}
        <Lupa T={T} at={K.N + 0.2} until={K.Mi - 0.4} x={760} y={620} r={220} fx={570} fy={940} tinte={KC.gold2} etiqueta="AL MICROSCOPIO"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1c1410" />
            <rect x={r * 1.1} y={r * 0.35} width={110} height={110} rx={6} fill="#e8f3fa" opacity=".85" transform={`rotate(12 ${r * 1.1} ${r * 0.35})`} />
            <Racimo2 T={t} x={r * 0.7} y={r * 1.0} s={1.3} n={9} pared={7} />
            <Racimo2 T={t} x={r * 1.35} y={r * 1.35} s={0.9} n={6} pared={7} seed={7} /></svg>} />
      </Escena>
      {/* 3–4 · medidor: mar, mínimo y saturada; el vaso */}
      <Escena T={T} a={K.Mi} b={K.Se} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <MedidorSal T={T} x={110} y={420} alto={760} valor={T < K.Sa ? klerp(0, 0.385, kprog(T, K.Mi + 0.3, K.Mi + 2.6)) : klerp(0.385, 1, kprog(T, K.Sa + 0.2, K.Sa + 1.6))} marcas={T < K.Sa ? kprog(T, K.Mi + 0.5, K.Mi + 3.0) * 0.66 : 0.66 + kprog(T, K.Sa + 1.2, K.Sa + 1.8) * 0.34} />
          <g opacity={kprog(T, K.Sa + 0.5, K.Sa + 1.0)}><Vaso x={830} y={1000} s={0.7} cristales={kprog(T, K.Sa + 0.8, K.Sa + 2.2)} /></g>
        </>)}
      </Escena>
      {/* 5 · la sal jala el agua: la célula se arruga; cecina y bacalao */}
      <Escena T={T} a={K.Se} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <CelulaSeca T={T} x={540} y={720} r={190} seca={kprog(T, K.Se + 0.4, K.Se + 2.4)} />
          <g opacity={kprog(T, K.Se + 2.8, K.Se + 3.3)}><Cecina x={290} y={1080} s={0.8} /><Bacalao T={T} x={790} y={1090} s={0.55} /></g>
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Pa} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><CeluWal x={300} y={880} r={150} pared={12} /><Interrogacion T={T} x={300} y={600} tam={260} /></>)}
      </Escena>
      {/* 7–8 · la armadura y los racimos */}
      <Escena T={T} a={K.Pa} b={K.E} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.B - 0.2, K.B + 0.2)}>
            <CeluWal x={290} y={830} r={150} pared={12} />
            <CeluWal x={790} y={830} r={150} pared={klerp(12, 28, kprog(T, K.Pa + 0.8, K.Pa + 2.4, kEase.sale))} />
          </g>
          <g opacity={kprog(T, K.B - 0.1, K.B + 0.3)}>
            <Racimo2 T={T} x={290} y={860} s={1.2} n={4} pared={6} />
            <Racimo2 T={T} x={760} y={830} s={klerp(1.2, 2.4, kprog(T, K.B + 1.0, K.B + 3.0, kEase.sale))} n={16} crece={kprog(T, K.B + 0.8, K.B + 3.0)} pared={6} seed={5} />
          </g>
        </>)}
      </Escena>
      {/* 9 · el estudio: salinas de Eslovenia */}
      <Escena T={T} a={K.E} b={K.Pe} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<><g opacity={kprog(T, K.E + 2.6, K.E + 3.2)}><Salinas T={T} x={95} y={820} /></g></>)}
      </Escena>
      {/* 10 · 1887, Noruega: el nombre */}
      <Escena T={T} a={K.Pe} b={K.Ge} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<Pez x={540} y={880} s={1.6} />)}
      </Escena>
      {/* 11 · genoma */}
      <Escena T={T} a={K.Ge} b={K.C} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg((() => { const q = kprog(T, K.Ge + 0.2, K.Ge + 1.6, kEase.sale), q2 = kprog(T, K.Ge + 1.4, K.Ge + 2.2, kEase.sale); return <g>
          <text x={80} y={600} style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>humano · ≈ 3,000 millones de letras</text>
          <rect x={80} y={630} width={2000 * q} height={80} rx={14} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
          <text x={80} y={860} style={{ font:`700 34px ${KF.mono}`, fontStyle:'italic' }} fill={KC.texto} opacity={q2}>W. ichthyophaga</text>
          <text x={420} y={860} style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto} opacity={q2}>· ≈ 9.6 millones</text>
          <rect x={80} y={890} width={Math.max(6, 7 * q2)} height={80} rx={3} fill={KC.mint} stroke={KC.ink} strokeWidth={3} />
        </g>; })())}
      </Escena>
      {/* 12 · cierre: el mismo bacalao, con las manchitas señaladas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Bacalao T={T} x={430} y={900} s={1.4} rot={Math.sin(T * 2) * 3} manchas={1} marca={kprog(T, K.C + 0.5, K.C + 1.2)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.4} until={K.N - 0.3} texto="no es mugre" x={330} y={560} tam={44} borde={KC.red} />
      <EtqMix T={T} at={K.N + 0.6} until={K.Mi - 0.3} x={60} y={430} partes={[['Wallemia ichthyophaga', true]]} tam={40} color={KC.ink} sombra={false} />
      <Chip T={T} at={K.N + 1.6} until={K.Mi - 0.3} texto="de los más halófilos conocidos" x={430} y={1180} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.Se + 0.3} until={K.P - 0.3} texto="AL MICROSCOPIO · LA SAL JALA EL AGUA" x={540} y={420} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.Se + 3.0} until={K.P - 0.3} x={150} y={970} texto="cecina" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Se + 3.2} until={K.P - 0.3} x={630} y={950} texto="bacalao salado" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Pa + 0.3} until={K.B - 0.3} x={150} y={1050} texto="menos sal" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Pa + 0.6} until={K.B - 0.3} x={640} y={1050} texto="más sal" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.Pa + 1.6} until={K.B - 0.3} texto="pared = armadura" x={540} y={470} tam={40} borde={KC.gold2} />
      <Chip T={T} at={K.B + 0.3} until={K.E - 0.3} texto="racimos: casi 4× más grandes con más sal" x={540} y={470} tam={30} borde={KC.mint} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Pe - 0.3} anio="2005" quien="Zalar et al. · U. de Liubliana" revista="Antonie van Leeuwenhoek, 2005" x={460} y={560} />
      <Etq T={T} at={K.E + 2.8} until={K.Pe - 0.3} x={95} y={780} texto="salinas de Eslovenia (esquema)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Pe + 0.3} until={K.Ge - 0.3} texto="1887 · Noruega · bacalao salado" x={540} y={470} tam={36} borde={KC.ink} />
      <EtqMix T={T} at={K.Pe + 2.0} until={K.Ge - 0.3} x={540} y={1150} centro partes={[['ichthyo', true], [' = pez · ', false], ['phaga', true], [' = que come', false]]} tam={38} color={KC.ink} sombra={false} />
      <Chip T={T} at={K.Ge + 0.3} until={K.C - 0.3} texto="esquema · el humano se sale de la pantalla" x={540} y={440} tam={26} borde={KC.lilac} mono />
      <EtqMix T={T} at={K.C + 0.8} until={K.Ou} x={60} y={430} partes={[['Wallemia', true]]} tam={44} color={KC.ink} sombra={false} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="donde casi ningún hongo puede" x={360} y={560} tam={32} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Mi} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.Mi} until={K.Se} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.Se} until={K.P} texto="5 µm (célula común, esquema)" largo={100} />
      <BarraEscala T={T} at={K.Pa} until={K.E} texto="1 µm" largo={100} />
      <BarraEscala T={T} at={K.E} until={K.Pe} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.Pe} until={K.Ge} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.Ge} until={K.C} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Sub T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No son mugre: *un hongo que necesita sal.*" />
      <Sub T={T} idx={1} at={K.N + 0.1} until={K.Mi - 0.1} texto="*_Wallemia ichthyophaga._*" />
      <Sub T={T} idx={2} at={K.Mi + 0.1} until={K.Sa - 0.1} texto="Necesita *al menos 10 %* de sal." />
      <Sub T={T} idx={3} at={K.Sa + 0.1} until={K.Se - 0.1} texto="Crece hasta en *agua saturada.*" />
      <Sub T={T} idx={4} at={K.Se + 0.1} until={K.P - 0.1} texto="La sal *le jala el agua* a las células." />
      <Sub T={T} idx={5} at={K.P + 0.1} until={K.Pa - 0.1} texto="¿Y cómo *le hace?*" />
      <Sub T={T} idx={6} at={K.Pa + 0.1} until={K.B - 0.1} texto="Engrosa su pared: *una armadura.*" />
      <Sub T={T} idx={7} at={K.B + 0.1} until={K.E - 0.1} texto="Células pegadas *en racimos.*" />
      <Sub T={T} idx={8} at={K.E + 0.1} until={K.Pe - 0.1} texto="2005: *especie aparte,* con muestras de salinas." />
      <Sub T={T} idx={9} at={K.Pe + 0.1} until={K.Ge - 0.1} texto="1887, Noruega: *«come pescado».*" />
      <Sub T={T} idx={10} at={K.Ge + 0.1} until={K.C - 0.1} texto="Genoma: *9.6 millones* de letras." />
      <Sub T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Vive donde *casi ningún hongo puede.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.6, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 1.0, K.Mi - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Mi + 3.2, K.Se - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Se + 2.6, K.P - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.P + 0.05, K.Pa + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.B + 1.6, K.E - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Pe + 0.8, K.Ge - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Ge + 1.6, K.C - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="93" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function SalApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><SalShot /></CompositionStage></div>;
}
window.SalApp = SalApp;
