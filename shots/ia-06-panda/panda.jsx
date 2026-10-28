// Shot IA #06 · Esto no es un panda: es un gibón (para la IA) — NARRADO (N3 + N2).
// Datos: Goodfellow, Shlens y Szegedy, arXiv:1412.6572 (2014) y Eykholt et al., arXiv:1707.08945 (2017). Ver guion.md y verificacion.md.
const AZUL = '#2f6dff';

// Panda esquemático sentado. s = escala.
function PandaDib({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2.2) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <ellipse cx={0} cy={150} rx={170} ry={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <path d="M -170 120 Q -175 40 -100 40 L 100 40 Q 175 40 170 120 L 120 130 Q 0 100 -120 130 Z" fill="#1d1d22" />
    <ellipse cx={-120} cy={270} rx={60} ry={42} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={120} cy={270} rx={60} ry={42} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-105} cy={-130} r={50} fill="#1d1d22" stroke={KC.ink} strokeWidth={7} />
    <circle cx={105} cy={-130} r={50} fill="#1d1d22" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={-40} rx={150} ry={130} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-55} cy={-55} rx={36} ry={48} fill="#1d1d22" transform="rotate(25 -55 -55)" />
    <ellipse cx={55} cy={-55} rx={36} ry={48} fill="#1d1d22" transform="rotate(-25 55 -55)" />
    <circle cx={-50} cy={-60} r={11} fill="#fff" /><circle cx={50} cy={-60} r={11} fill="#fff" />
    <ellipse cx={0} cy={0} rx={22} ry={15} fill="#1d1d22" />
    <path d="M -22 28 Q 0 46 22 28" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d="M -150 90 Q -200 160 -140 200" stroke="#1d1d22" strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M 150 90 Q 200 160 140 200" stroke="#1d1d22" strokeWidth={46} fill="none" strokeLinecap="round" />
  </g>;
}
// Foto con marco (fondo de bambú) y el panda dentro.
function FotoPanda({ T, x = 540, y = 860, s = 1, tinte = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-330} y={-330} width={660} height={660} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={10} />
    <rect x={-300} y={-300} width={600} height={600} rx={12} fill="#9fd88a" />
    {[-240, -170, 190, 255].map((bx, i) => <g key={i}><rect x={bx} y={-300} width={26} height={600} fill="#4f9a3a" />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={bx - 2} y={-260 + k * 150} width={30} height={8} fill="#2f6b26" />)}</g>)}
    <PandaDib x={0} y={0} s={0.95} T={T} />
    {tinte > 0 && <rect x={-300} y={-300} width={600} height={600} rx={12} fill={KC.pink} opacity={tinte * 0.08} />}
  </g>;
}
// Gibón colgado de una rama (lo que "ve" la IA).
function GibonDib({ x, y, s = 1, T = 0 }) {
  const m = Math.sin(T * 2.5) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m})`}>
    <rect x={-150} y={-150} width={300} height={22} rx={11} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
    <path d="M -40 -140 Q -60 -60 -20 -20" stroke="#8a5a32" strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M 40 -140 Q 60 -60 20 -20" stroke="#8a5a32" strokeWidth={22} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={20} rx={44} ry={56} fill="#a06b3a" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-40} r={34} fill="#a06b3a" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-34} rx={22} ry={18} fill="#e8c9a0" />
    <circle cx={-9} cy={-40} r={4} fill={KC.ink} /><circle cx={9} cy={-40} r={4} fill={KC.ink} />
    <path d="M -20 70 Q -30 110 -10 120 M 20 70 Q 30 110 10 120" stroke="#8a5a32" strokeWidth={16} fill="none" strokeLinecap="round" />
  </g>;
}
// Etiqueta de la IA (como en un programa de visión): texto + porcentaje.
function EtiquetaIA({ T, at, until, x, y, texto, pct, color, tam = 58 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, display:'flex', alignItems:'center', gap:14,
    background:color, border:`7px solid ${KC.ink}`, borderRadius:20, padding:'10px 28px', boxShadow:`10px 10px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>
    <span style={{ font:`700 30px ${KF.mono}`, color:KC.ink }}>IA:</span>
    <span style={{ font:`900 ${tam}px ${KF.texto}`, color:KC.ink }}>{texto}</span>
    <span style={{ font:`400 ${tam + 8}px ${KF.titulo}`, color:KC.ink }}>{pct}</span>
  </div>;
}
// Cuadro de ruido de colores (exagerado para que se vea).
function Ruido({ T, x, y, lado = 260, n = 14, seed = 9, o = 1 }) {
  const paso = Math.floor(T * 12), r = krng(seed + paso), c = lado / n, cols = [KC.pink, KC.cyan, KC.yellow, KC.mint, KC.lilac, '#7f8ba3'];
  const cel = [];
  for (let i = 0; i < n * n; i++) cel.push(<rect key={i} x={(i % n) * c} y={Math.floor(i / n) * c} width={c} height={c} fill={cols[Math.floor(r() * cols.length)]} />);
  return <g transform={`translate(${x - lado / 2} ${y - lado / 2})`} opacity={o}>
    <rect x={-8} y={-8} width={lado + 16} height={lado + 16} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    {cel}
  </g>;
}
// Medidor de aguja panda ↔ gibón. v: 0 (panda) .. 1 (gibón).
function Aguja({ x, y, v, r = 320 }) {
  const a = Math.PI * (1 - v), nx = x + Math.cos(a) * (r - 40), ny = y - Math.sin(a) * (r - 40);
  return <g>
    <path d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`} fill="none" stroke="#263451" strokeWidth={60} />
    <path d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x} ${y - r}`} fill="none" stroke={KC.mint} strokeWidth={60} opacity=".85" />
    <path d={`M ${x} ${y - r} A ${r} ${r} 0 0 1 ${x + r} ${y}`} fill="none" stroke={KC.orange} strokeWidth={60} opacity=".85" />
    <text x={x - r} y={y + 70} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.mint}>panda</text>
    <text x={x + r} y={y + 70} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.orange}>gibón</text>
    <line x1={x} y1={y} x2={nx} y2={ny} stroke={KC.yellow} strokeWidth={16} strokeLinecap="round" />
    <circle cx={x} cy={y} r={30} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Señal de alto (STOP, como en el estudio) con estampas que se van pegando.
const ESTAMPAS = [[-150, -120, 90, 34, '#fff'], [60, -128, 100, 34, KC.ink], [-140, 110, 110, 34, KC.ink], [40, 118, 110, 34, '#fff'], [-30, -175, 70, 28, '#fff'], [-20, 168, 80, 28, KC.ink]];
function SenalAlto({ T, x, y, s = 1, pegaDesde = null, poste = true }) {
  const pts = Array.from({ length: 8 }, (_, i) => { const a = Math.PI / 8 + i * Math.PI / 4; return `${Math.cos(a) * 230},${Math.sin(a) * 230}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {poste && <rect x={-16} y={200} width={32} height={700} fill="#8a8f99" stroke={KC.ink} strokeWidth={6} />}
    <polygon points={pts} fill="#d8261f" stroke={KC.ink} strokeWidth={10} />
    <polygon points={pts} fill="none" stroke="#fff" strokeWidth={12} transform="scale(0.9)" />
    <text x={0} y={42} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill="#fff">STOP</text>
    {pegaDesde != null && ESTAMPAS.map(([ex, ey, w, h, c], i) => { const at = pegaDesde + i * 0.45; if (T < at) return null; const e = kprog(T, at, at + 0.25, kEase.rebote);
      return <rect key={i} x={ex} y={ey} width={w} height={h} rx={4} fill={c} stroke={c === '#fff' ? '#999' : KC.ink} strokeWidth={3} transform={`rotate(${(i % 2 ? 6 : -5)} ${ex + w / 2} ${ey + h / 2}) translate(${ex + w / 2} ${ey + h / 2}) scale(${e}) translate(${-(ex + w / 2)} ${-(ey + h / 2)})`} />; })}
  </g>;
}
// Barras horizontales con decimales (arriba del subtítulo).
function BarrasPct({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const g = kprog(T, (f.at || at) + 0.1, (f.at || at) + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:24, opacity: T >= (f.at || at) ? 1 : 0 }}>
        <div style={{ font:`900 38px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:700 * f.valor / 100 * g, height:70, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 70px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{kformato(f.valor * g, f.dec == null ? 1 : f.dec)} %</div>
        </div>
      </div>; })}
  </div>;
}

function Panda() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Antes, Ru: CUES.Ruido, P: CUES.Pregunta, S: CUES.Suma, E: CUES.Estudio, Al: CUES.Alto, Au: CUES.Auto, D: CUES.Defensa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // aguja: se va de panda a gibón con empujoncitos
  const empujes = 14, vAguja = kclamp(Array.from({ length: empujes }, (_, i) => kprog(T, K.S + 1.4 + i * 0.25, K.S + 1.6 + i * 0.25, kEase.sale)).reduce((a, b) => a + b, 0) / empujes, 0, 1);
  const acerca = kprog(T, K.Au, K.Au + 6, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y antes: la foto del panda */}
      <Escena T={T} a={K.G} b={K.Ru}>
        <FondoLunares color={K.A <= T ? KC.mint : KC.yellow} />
        {svg(<>
          <FotoPanda T={T} x={400} y={880} s={0.9} />
          {T < K.A && <g transform={`translate(870 965) scale(${kprog(T, K.G + 1.2, K.G + 1.7, kEase.rebote)})`}>
            <circle cx={-170} cy={150} r={16} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={-140} cy={110} r={24} fill="#fff" stroke={KC.ink} strokeWidth={5} />
            <ellipse cx={0} cy={0} rx={150} ry={130} fill="#fff" stroke={KC.ink} strokeWidth={7} />
            <GibonDib x={0} y={20} s={0.62} T={T} />
          </g>}
          {/* escaneo de la IA */}
          <rect x={103} y={583 + ((T * 260) % 594)} width={594} height={8} fill={KC.cyan} opacity={T < K.Ru ? 0.7 : 0} />
        </>)}
      </Escena>
      {/* 3 · el ruido: foto + 0.007 × ruido = foto */}
      <Escena T={T} a={K.Ru} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <FotoPanda T={T} x={240} y={830} s={0.42} />
          <text x={520} y={860} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Ru + 0.3, K.Ru + 0.6)}>+</text>
          {T > K.Ru + 0.4 && <Ruido T={T} x={810} y={830} lado={270} o={kprog(T, K.Ru + 0.4, K.Ru + 0.9)} />}
          <text x={810} y={665} textAnchor="middle" style={{ font:`700 44px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Ru + 0.6, K.Ru + 1.0)}>0.007 ×</text>
          {T > K.Ru + 1.6 && <text x={330} y={1120} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={KC.ink}>=</text>}
          {T > K.Ru + 1.7 && <g opacity={kprog(T, K.Ru + 1.7, K.Ru + 2.2)}><FotoPanda T={T} x={570} y={1085} s={0.36} tinte={1} /></g>}
        </>)}
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.P} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 5 · por dentro: suma de números */}
      <Escena T={T} a={K.S} b={K.E}>
        <FondoCircuito T={T} />
        {svg(<>
          {Array.from({ length: 60 }, (_, i) => { const r = krng(40 + i), x0 = 90 + r() * 860, y0 = 560 + r() * 230, at = K.S + 0.2 + r() * 1.0;
            return <text key={i} x={x0} y={y0} style={{ font:`700 ${26 + r() * 12}px ${KF.mono}` }} fill={i % 3 ? KC.cyan : KC.mint} opacity={kprog(T, at, at + 0.3) * 0.85}>{(r() * 0.99).toFixed(2)}</text>; })}
          <Aguja x={540} y={1180} v={vAguja} r={330} />
          {Array.from({ length: empujes }, (_, i) => { const t0 = K.S + 1.4 + i * 0.25, u = kprog(T, t0 - 0.4, t0);
            if (T < t0 - 0.4 || T > t0 + 0.15) return null;
            return <path key={i} d="M 0 0 l 46 0 m -16 -14 l 16 14 l -16 14" transform={`translate(${klerp(120, 470, u)} ${980 - (i % 5) * 26})`} stroke={KC.yellow} strokeWidth={8} fill="none" strokeLinecap="round" />; })}
        </>)}
      </Escena>
      {/* 6 · el estudio */}
      <Escena T={T} a={K.E} b={K.Al}>
        <FondoLunares color={KC.yellow} />
        {svg(<g opacity={0.9}><FotoPanda T={T} x={230} y={1080} s={0.3} /><Ruido T={T} x={540} y={1080} lado={170} /><FotoPanda T={T} x={850} y={1080} s={0.3} /></g>)}
      </Escena>
      {/* 7 · el alto con estampas */}
      <Escena T={T} a={K.Al} b={K.Au}>
        <FondoLunares color={KC.pink} />
        {svg(<SenalAlto T={T} x={540} y={820} s={1.1} pegaDesde={K.Al + 1.6} />)}
      </Escena>
      {/* 8 · desde el auto */}
      <Escena T={T} a={K.Au} b={K.D} zoom={0}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fd3ff 0%, #c9ecff 45%, #6fbf5a 45%, #5aa548 100%)' }}></div>
        {svg(<>
          <polygon points={`540,864 ${540 - 40},864 -200,1920 1280,1920 ${540 + 40},864`} fill="#3d4250" />
          {Array.from({ length: 6 }, (_, i) => { const u = ((T * 0.8 + i / 6) % 1), yy = 870 + Math.pow(u, 2.2) * 1050, w = 6 + u * 40, h = 20 + u * 140; return <rect key={i} x={540 - w / 2} y={yy} width={w} height={h} fill={KC.yellow} />; })}
          <g transform={`translate(${klerp(640, 880, acerca)} ${klerp(780, 660, acerca)})`}><SenalAlto T={T} x={0} y={0} s={klerp(0.18, 0.62, acerca)} pegaDesde={-99} /></g>
          {T > K.Au + 1.0 && (() => { const sx = klerp(640, 880, acerca), sy = klerp(780, 660, acerca), w = klerp(0.18, 0.62, acerca) * 520, parp = Math.sin(T * 10) > -0.6;
            return <g opacity={parp ? 1 : 0.4}><rect x={sx - w / 2 - 10} y={sy - w / 2 - 10} width={w + 20} height={w + 20} fill="none" stroke="#00ff6a" strokeWidth={8} />
              <rect x={sx + w / 2 + 10 - 360} y={sy - w / 2 - 80} width={360} height={70} fill="#00ff6a" />
              <text x={sx + w / 2 - 340} y={sy - w / 2 - 30} style={{ font:`700 48px ${KF.mono}` }} fill={KC.ink}>LÍMITE 45</text></g>; })()}
          {/* tablero */}
          <path d="M 0 1500 Q 540 1380 1080 1500 L 1080 1920 L 0 1920 Z" fill="#20232b" />
          <circle cx={300} cy={1700} r={170} fill="none" stroke="#111" strokeWidth={50} />
        </>)}
      </Escena>
      {/* 9 · la defensa (MNIST: números escritos a mano) */}
      <Escena T={T} a={K.D} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>{['3', '7', '1', '5', '0', '9'].map((d, i) => <text key={i} x={140 + i * 160} y={640 + (i % 2) * 30} textAnchor="middle" style={{ font:`italic 700 120px ${KF.mono}` }} fill={KC.ink} opacity={0.55 * kprog(T, K.D + 0.2 + i * 0.12, K.D + 0.5 + i * 0.12)} transform={`rotate(${(i % 2 ? 8 : -7)} ${140 + i * 160} 640)`}>{d}</text>)}</>)}
      </Escena>
      {/* 10 · cierre: el mismo panda */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<FotoPanda T={T} x={400} y={880} s={0.9} />)}
      </Escena>

      {/* datos y textos */}
      <EtiquetaIA T={T} at={K.G + 0.05} until={K.A - 0.2} x={330} y={430} texto="gibón" pct="99.3 %" color={KC.orange} />
      <EtiquetaIA T={T} at={K.A + 0.3} until={K.Ru - 0.2} x={400} y={430} texto="panda" pct="57.7 %" color={KC.mint} />
      <Chip T={T} at={K.A + 0.8} until={K.Ru - 0.2} texto="antes del truco" x={400} y={1170} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ru + 2.0} until={K.P - 0.2} texto="cada pixel: ±1 tono de 256" x={370} y={440} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.Ru + 2.2} until={K.P - 0.2} x={700} y={1085} texto="¡se ve igual!" color={KC.ink} />
      <NumeroGigante T={T} at={K.S + 0.3} until={K.E - 0.2} valor={150528} dur={1.0} etiqueta="224 × 224 × 3 números" y={420} tam={110} color={KC.cyan} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Al - 0.3} anio="2014" quien="Google" revista="Goodfellow, Shlens y Szegedy" y={700} />
      <Chip T={T} at={K.E + 2.4} until={K.Al - 0.3} texto="«ejemplo adversario»" y={950} tam={44} borde={KC.red} />
      <Chip T={T} at={K.Al + 0.3} until={K.Au - 0.2} texto="2017 · estampas blancas y negras" y={430} tam={36} borde={KC.ink} />
      <BarrasPct T={T} at={K.Au + 3.4} until={K.D - 0.2} top={900} filas={[{ valor: 100, dec: 0, etiqueta: 'fotos de laboratorio', color: KC.orange }, { valor: 84.8, etiqueta: 'cuadros desde un auto en marcha', color: KC.red, at: K.Au + 5.0 }]} />
      <BarrasPct T={T} at={K.D + 1.6} until={K.C - 0.2} top={760} filas={[{ valor: 89.4, etiqueta: 'errores · sin entrenar con engaños', color: KC.red }, { valor: 17.9, etiqueta: 'errores · entrenada con engaños', color: AZUL, at: K.D + 3.2 }]} />
      <Chip T={T} at={K.D + 0.4} until={K.C - 0.2} texto="prueba: números escritos a mano" y={1120} tam={36} borde={KC.ink} />
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 2.2} until={K.Ou} texto="IA: gibón 99.3 %" x={560} y={430} tam={46} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="tú: panda ✔" x={850} y={760} tam={54} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Para la IA no es un panda: *es un gibón.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.Ru - 0.1} texto="Antes decía panda: *57.7 %.*" />
      <Subtitulo T={T} idx={2} at={K.Ru + 0.1} until={K.P - 0.1} texto="Un ruido que *tus ojos no ven.*" />
      <Subtitulo T={T} idx={3} at={K.P + 0.1} until={K.S - 0.1} texto="¿Cómo falla con *algo invisible?*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.E - 0.1} texto="Muchos empujoncitos: *un brinco enorme.*" />
      <Subtitulo T={T} idx={5} at={K.E + 0.1} until={K.Al - 0.1} texto="Google, 2014: *ejemplos adversarios.*" />
      <Subtitulo T={T} idx={6} at={K.Al + 0.1} until={K.Au - 0.1} texto="Estampas en *un alto de verdad.*" />
      <Subtitulo T={T} idx={7} at={K.Au + 0.1} until={K.D - 0.1} texto="La IA leyó: *límite 45.*" />
      <Subtitulo T={T} idx={8} at={K.D + 0.1} until={K.C - 0.1} texto="Entrenarla con engaños: *89 → 18 %.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tú sigues *viendo un panda.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Antes + 1.5, CUES.Ruido + 0.4, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Ruido + 2.0, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Suma + 0.7, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 2.5, CUES.Alto - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Auto + 0.5, CUES.Auto + 3.1, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Defensa + 3.0, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto']]} />
      <MarcaAgua T={T} tema="ia" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PandaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Panda /></CompositionStage></div>;
}
window.PandaApp = PandaApp;
