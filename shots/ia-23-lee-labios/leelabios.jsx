// Shot IA #23 · La IA que lee labios mejor que los expertos — NARRADO (N5 "El experimento").
// Datos: Chung, Senior, Vinyals y Zisserman, CVPR 2017 · Shillingford et al., arXiv:1807.05162 (2018) · Fernandez-Lopez y Sukno, arXiv:1704.08035 (2017).
// Ver guion.md y verificacion.md. Todo es esquemático.
const PIEL = '#e9b08a', PIEL2 = '#c98a66', LABIO = '#c9455a', LABIO2 = '#9e2f44';

// Apertura de la boca diciendo «peso»/«beso» en loop (labios juntos → e → s → o → juntos). Devuelve 0..1.
function silaba(t, per = 1.7) {
  const u = ((t % per) + per) % per / per;
  const k = [[0, 0], [0.16, 0], [0.26, 0.55], [0.44, 0.5], [0.52, 0.2], [0.64, 0.22], [0.72, 0.7], [0.86, 0.6], [0.94, 0], [1, 0]];
  for (let i = 1; i < k.length; i++) if (u <= k[i][0]) { const p = (u - k[i - 1][0]) / (k[i][0] - k[i - 1][0]); return klerp(k[i - 1][1], k[i][1], kEase.suave(p)); }
  return 0;
}

// Labios (vista de frente). abre 0..1. id único para el recorte de los dientes.
function Labios({ x = 0, y = 0, s = 1, abre = 0, id = 'b' }) {
  const h = 6 + 92 * abre;
  const interior = `M -158 0 Q 0 ${-h * 0.55} 158 0 Q 0 ${h} -158 0 Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><clipPath id={`cl-${id}`}><path d={interior} /></clipPath></defs>
    <path d={interior} fill="#3a0f17" />
    <g clipPath={`url(#cl-${id})`}>
      <rect x={-120} y={-h * 0.55 - 4} width={240} height={26} rx={6} fill="#fffaf0" />
      {[-60, 0, 60].map((tx) => <line key={tx} x1={tx} y1={-h * 0.55} x2={tx} y2={-h * 0.55 + 22} stroke="#d9cfc0" strokeWidth={3} />)}
      <ellipse cx={0} cy={h * 0.75} rx={90} ry={32} fill="#e0607a" />
    </g>
    <path d={`M -172 0 C -122 -52 -62 -74 -24 -58 Q 0 -46 24 -58 C 62 -74 122 -52 172 0 Q 0 ${-h * 0.55} -172 0 Z`} fill={LABIO} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M -172 0 Q 0 ${h} 172 0 C 132 ${h + 58} 62 ${h + 80} 0 ${h + 80} C -62 ${h + 80} -132 ${h + 58} -172 0 Z`} fill={LABIO} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d={`M -70 ${h + 38} Q 0 ${h + 58} 70 ${h + 38}`} stroke="#ef8a9b" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".7" />
    <circle cx={-172} cy={0} r={7} fill={LABIO2} /><circle cx={172} cy={0} r={7} fill={LABIO2} />
  </g>;
}

// Pantalla de video sin sonido con la mitad de abajo de una cara hablando.
function VideoBoca({ x, y, s = 1, T = 0, abre = 0, id = 'v', mudo = true, barra = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-380} y={-270} width={760} height={540} rx={34} fill="#1d1d22" stroke={KC.ink} strokeWidth={10} />
    <defs><clipPath id={`pv-${id}`}><rect x={-350} y={-240} width={700} height={430} rx={18} /></clipPath></defs>
    <g clipPath={`url(#pv-${id})`}>
      <rect x={-350} y={-240} width={700} height={430} fill="#ffd9c4" />
      <ellipse cx={0} cy={60} rx={330} ry={420} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
      <path d="M -60 -170 Q -78 -120 -46 -112 Q 0 -96 46 -112 Q 78 -120 60 -170" fill={PIEL2} stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={-30} cy={-122} rx={14} ry={8} fill="#5a3324" /><ellipse cx={30} cy={-122} rx={14} ry={8} fill="#5a3324" />
      <Labios y={10} s={1.05} abre={abre} id={id} />
      <path d="M -90 170 Q 0 200 90 170" stroke={PIEL2} strokeWidth={8} fill="none" strokeLinecap="round" />
    </g>
    {barra && <g>
      <rect x={-330} y={214} width={560} height={12} rx={6} fill="#444" />
      <rect x={-330} y={214} width={560 * ((T * 0.18) % 1)} height={12} rx={6} fill={KC.red} />
      <path d="M -350 205 L -350 235 L -325 220 Z" fill={KC.texto} />
    </g>}
    {mudo && <g transform="translate(300 220)">
      <path d="M -26 -10 L -12 -10 L 4 -24 L 4 24 L -12 10 L -26 10 Z" fill={KC.texto} />
      <path d="M 14 -12 L 34 12 M 34 -12 L 14 12" stroke={KC.red} strokeWidth={7} strokeLinecap="round" />
    </g>}
  </g>;
}

// Tarjeta de palabra (PESO / BESO). luz 0..1 la ilumina; apaga 0..1 la desvanece.
function Tarjeta({ T, at, x, y, texto, luz = 0, apaga = 0, color = KC.yellow, s = 1 }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), sc = klerp(0.5, 1, e) * (1 + 0.12 * luz) * s;
  return <div style={{ position:'absolute', left:x, top:y, zIndex:40, transform:`translate(-50%,-50%) scale(${sc}) rotate(${(x < 540 ? -3 : 3) * (1 - luz)}deg)`, opacity:kprog(T, at, at + 0.2) * (1 - 0.75 * apaga),
    background: luz > 0.5 ? KC.mint : color, border:`7px solid ${KC.ink}`, borderRadius:24, padding:'8px 36px 12px', font:`400 96px/1 ${KF.titulo}`, color:KC.ink, letterSpacing:'.04em',
    boxShadow: `10px 10px 0 ${KC.ink}${luz > 0.05 ? `, 0 0 ${60 * luz}px ${KC.mint}` : ''}`, filter:`grayscale(${apaga})` }}>{texto}</div>;
}

// Letra que cae en el molde de la boca.
function LetraCae({ T, at, x, y0, y1, letra, color }) {
  if (T < at) return null;
  const p = kprog(T, at, at + 0.7, kEase.rebote), yy = klerp(y0, y1, p);
  return <div style={{ position:'absolute', left:x, top:yy, zIndex:41, transform:`translate(-50%,-50%) rotate(${(1 - p) * 20}deg)`,
    width:130, height:130, borderRadius:24, background:color, border:`7px solid ${KC.ink}`, boxShadow:`8px 8px 0 ${KC.ink}`,
    display:'flex', alignItems:'center', justifyContent:'center', font:`400 100px/1 ${KF.titulo}`, color:KC.ink }}>{letra}</div>;
}

// Persona lectora de labios (cabeza con lentes y lupa).
function Lector({ x, y, s = 1, T = 0, lupa = true }) {
  const b = Math.sin(T * 2.2) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -130 230 Q -130 90 0 90 Q 130 90 130 230 Z" fill="#3e5c9a" stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={0} r={92} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -92 -10 Q -96 -100 0 -100 Q 96 -100 92 -10 Q 60 -60 0 -62 Q -60 -60 -92 -10 Z" fill="#4a3022" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-36} cy={6} r={24} fill="#fff" stroke={KC.ink} strokeWidth={6} /><circle cx={36} cy={6} r={24} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <line x1={-12} y1={6} x2={12} y2={6} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-32 + Math.sin(T * 3) * 5} cy={10} r={8} fill={KC.ink} /><circle cx={40 + Math.sin(T * 3) * 5} cy={10} r={8} fill={KC.ink} />
    <path d="M -24 50 Q 0 60 24 50" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {lupa && <g transform={`translate(120 30) rotate(${-20 + Math.sin(T * 2) * 6})`}>
      <line x1={0} y1={40} x2={0} y2={130} stroke="#6b4a2a" strokeWidth={18} strokeLinecap="round" />
      <circle cx={0} cy={0} r={46} fill="rgba(160,230,255,.45)" stroke={KC.ink} strokeWidth={9} />
    </g>}
  </g>;
}

// Tele con videos de la BBC (sin sonido).
function Tele({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1={-60} y1={-200} x2={-10} y2={-150} stroke={KC.ink} strokeWidth={7} /><line x1={60} y1={-200} x2={10} y2={-150} stroke={KC.ink} strokeWidth={7} />
    <rect x={-200} y={-150} width={400} height={290} rx={30} fill="#7a5235" stroke={KC.ink} strokeWidth={9} />
    <rect x={-175} y={-125} width={300} height={240} rx={18} fill="#ffd9c4" stroke={KC.ink} strokeWidth={6} />
    <Labios x={-25} y={0} s={0.62} abre={silaba(T, 1.3)} id="tele" />
    <circle cx={160} cy={-70} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={5} /><circle cx={160} cy={-20} r={14} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
    <rect x={-160} y={80} width={86} height={26} fill={KC.ink} /><text x={-117} y={101} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.texto}>BBC</text>
    <path d="M 132 40 L 146 40 L 156 30 L 156 70 L 146 60 L 132 60 Z" fill={KC.ink} /><path d="M 164 38 L 182 60 M 182 38 L 164 60" stroke={KC.red} strokeWidth={6} strokeLinecap="round" />
  </g>;
}

// Fila de 12 palabras: se encienden `n` (puede ser decimal).
function FilaPalabras({ T, at, until, y, etiqueta, n, color, texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), g = n * kprog(T, at + 0.3, at + 1.5, kEase.sale);
  return <div style={{ position:'absolute', left:70, width:940, top:y, zIndex:40, opacity:e.o, transform:`translateY(${e.y * 0.5}px)` }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
      <span style={{ font:`900 38px ${KF.texto}`, color:KC.ink }}>{etiqueta}</span>
      <span style={{ font:`400 64px ${KF.titulo}`, color, WebkitTextStroke:`3px ${KC.ink}` }}>{texto}</span>
    </div>
    <div style={{ display:'flex', gap:10 }}>
      {Array.from({ length: 12 }, (_, i) => { const f = kclamp(g - i, 0, 1);
        return <div key={i} style={{ flex:1, height:64, borderRadius:12, border:`5px solid ${KC.ink}`, background:`linear-gradient(90deg, ${color} ${f * 100}%, #fffdf6 ${f * 100}%)` }}></div>; })}
    </div>
  </div>;
}

// Barras de error (menos es mejor).
function BarrasError({ T, at, until, filas, top = 700 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const g = kprog(T, f.at + 0.1, f.at + 1.1, kEase.sale);
      return <div key={i} style={{ marginBottom:22, opacity: T >= f.at ? 1 : 0 }}>
        <div style={{ font:`900 36px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 700 * f.valor / 100 * g), height:72, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 68px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{kformato(f.valor * g, 1)} %</div>
        </div>
      </div>; })}
  </div>;
}

// Tira de película con bocas (datos de entrenamiento) que corre hacia la derecha.
function TiraBocas({ T, y, vel = 160, o = 1 }) {
  const off = (T * vel) % 170;
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o }}>
    <rect x={-20} y={y - 80} width={KW + 40} height={160} fill="#1d1d22" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => { const xx = -170 + i * 170 + off;
      return <g key={i}>
        <rect x={xx + 10} y={y - 60} width={150} height={120} rx={10} fill="#ffd9c4" />
        <Labios x={xx + 85} y={y - 4} s={0.3} abre={silaba(T + i * 0.37, 1.1)} id={`tb${i}`} />
        {[0, 1, 2, 3].map((k) => <rect key={k} x={xx + 18 + k * 38} y={y - 76} width={18} height={10} rx={3} fill="#555" />)}
        {[0, 1, 2, 3].map((k) => <rect key={`b${k}`} x={xx + 18 + k * 38} y={y + 66} width={18} height={10} rx={3} fill="#555" />)}
      </g>; })}
  </svg>;
}

// Paciente en cama con cánula de traqueostomía.
function Paciente({ x, y, s = 1, T = 0, habla = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-400} y={60} width={800} height={70} rx={20} fill="#c7d3e0" stroke={KC.ink} strokeWidth={8} />
    <rect x={-400} y={130} width={30} height={170} fill="#8a96a8" stroke={KC.ink} strokeWidth={6} /><rect x={370} y={130} width={30} height={170} fill="#8a96a8" stroke={KC.ink} strokeWidth={6} />
    <rect x={-420} y={-140} width={40} height={280} rx={14} fill="#8a96a8" stroke={KC.ink} strokeWidth={6} />
    <rect x={-360} y={-20} width={220} height={90} rx={40} fill="#ffffff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 20 Q -60 -60 380 -10 L 380 70 L -150 70 Z" fill="#7fb8ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={-250} cy={-50} r={80} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -330 -60 Q -330 -140 -250 -135 Q -170 -140 -175 -70 Q -210 -105 -250 -105 Q -300 -100 -330 -60 Z" fill="#3a2a20" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-275} cy={-55} r={8} fill={KC.ink} /><circle cx={-222} cy={-55} r={8} fill={KC.ink} />
    <ellipse cx={-248} cy={-12} rx={22} ry={4 + 12 * habla} fill="#3a0f17" stroke={LABIO} strokeWidth={6} />
    <rect x={-195} y={18} width={70} height={36} rx={14} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-160} cy={36} rx={18} ry={16} fill="#ffffff" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-160} cy={36} r={6} fill="#6a7a90" />
    <path d="M -195 30 L -125 30" stroke="#5aa0e0" strokeWidth={5} opacity=".8" />
  </g>;
}

// Cámara de calle en poste.
function CamaraCalle({ x, y, s = 1, T = 0 }) {
  const r = -28 + Math.sin(T * 0.8) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={60} y={-30} width={24} height={560} fill="#7d8796" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${r} 70 0)`}>
      <rect x={-130} y={-40} width={200} height={84} rx={16} fill="#eef1f5" stroke={KC.ink} strokeWidth={8} />
      <rect x={-160} y={-28} width={36} height={60} rx={8} fill="#2b3445" stroke={KC.ink} strokeWidth={6} />
      <circle cx={30} cy={0} r={8} fill={KC.red} opacity={(T % 1) < 0.5 ? 1 : 0.3} />
    </g>
  </g>;
}

// Personita lejana (borrosa).
function Personita({ x, y, s = 1, blur = 0, id = 'p' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><filter id={`f-${id}`}><feGaussianBlur stdDeviation={blur} /></filter></defs>
    <g filter={`url(#f-${id})`}>
      <circle cx={0} cy={-80} r={34} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
      <path d="M -40 -40 Q 0 -50 40 -40 L 50 60 L -50 60 Z" fill="#e05a7a" stroke={KC.ink} strokeWidth={6} />
      <rect x={-34} y={60} width={26} height={70} fill="#33445e" stroke={KC.ink} strokeWidth={5} /><rect x={8} y={60} width={26} height={70} fill="#33445e" stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}

// Marca ✔ / ✗ redonda.
function Marca({ T, at, x, y, ok }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.4, kEase.rebote);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) scale(${e})`, width:130, height:130, borderRadius:65,
    background: ok ? KC.mint : KC.red, border:`7px solid ${KC.ink}`, boxShadow:`8px 8px 0 ${KC.ink}`, display:'flex', alignItems:'center', justifyContent:'center',
    font:`900 80px/1 ${KF.texto}`, color: ok ? KC.ink : KC.texto }}>{ok ? '✔' : '✗'}</div>;
}

// Globo de texto punteado (posibilidad, no hecho).
function Globo({ T, at, until, x, y, texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), n = Math.floor(texto.length * kprog(T, at + 0.3, at + 1.4));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o,
    background:'rgba(255,255,255,.92)', border:`6px dashed ${KC.ink}`, borderRadius:40, padding:'18px 40px', font:`900 54px ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap' }}>
    {texto.slice(0, n)}<span style={{ opacity: (T % 0.8) < 0.4 ? 1 : 0 }}>|</span>
  </div>;
}

// Frase con hueco (contexto) que se llena con la palabra elegida.
function FraseHueco({ T, at, llena, x = KW / 2, y, antes, despues, palabra }) {
  if (T < at) return null;
  const e = kprog(T, at, at + 0.45, kEase.rebote), f = kprog(T, llena, llena + 0.4, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${klerp(0.6, 1, e)})`, opacity:kprog(T, at, at + 0.2),
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'18px 32px', boxShadow:`12px 12px 0 ${KC.ink}`, font:`900 50px ${KF.texto}`, color:KC.ink, whiteSpace:'nowrap' }}>
    {antes} <span style={{ display:'inline-block', minWidth:170, textAlign:'center', borderBottom:`6px solid ${KC.ink}`, background: f > 0 ? `rgba(47,224,168,${f})` : 'transparent', borderRadius:8 }}>{f > 0.3 ? palabra : ' '}</span> {despues}
  </div>;
}

function LeeLabios() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Visemas, E: CUES.Experto, P: CUES.Pregunta, S: CUES.Estudio, D: CUES.Duelo, Vz: CUES.Voz, R: CUES.Riesgo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const E2 = K.E + 7.4, D2 = K.D + 5.2;   // segunda línea de Experto y de Duelo (base; con voz real manda window.SUBS)
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const luzPeso = kprog(T, K.C + 4.0, K.C + 4.5, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: unos labios sin sonido, ¿peso o beso? */}
      <Escena T={T} a={K.G} b={K.V}>
        <FondoLunares color={KC.pink} />
        {svg(<VideoBoca x={400} y={820} s={0.8} T={T} abre={silaba(T + 1.2)} id="g" />)}
      </Escena>
      <Tarjeta T={T} at={K.G + 0.5} x={280} y={1110} texto="PESO" color={KC.yellow} />
      <Tarjeta T={T} at={K.G + 0.9} x={800} y={1110} texto="BESO" color={KC.cyan} />
      {T >= K.G + 1.3 && T < K.V + 0.3 && <div style={{ position:'absolute', left:540, top:1110 - Math.abs(Math.sin(T * 5)) * 40, zIndex:41, transform:'translate(-50%,-50%)',
        font:`400 120px ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`5px ${KC.ink}`, opacity:kprog(T, K.G + 1.3, K.G + 1.5) * (1 - kprog(T, K.V - 0.2, K.V + 0.3)) }}>?</div>}
      <Chip T={T} at={K.G + 3.4} until={K.V - 0.2} texto="P y B: la misma boca" x={400} y={560} tam={36} borde={KC.ink} />

      {/* 2 · visemas: P, B y M caen en el mismo molde */}
      <Escena T={T} a={K.V} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<g>
          <rect x={150} y={700} width={560} height={300} rx={40} fill="#ffd9c4" stroke={KC.ink} strokeWidth={9} />
          <Labios x={430} y={830} s={1.2} abre={0} id="vis" />
        </g>)}
      </Escena>
      <LetraCae T={T} at={K.V + 0.4} x={290} y0={-100} y1={560} letra="P" color={KC.pink} />
      <LetraCae T={T} at={K.V + 0.8} x={430} y0={-100} y1={560} letra="B" color={KC.cyan} />
      <LetraCae T={T} at={K.V + 1.2} x={570} y0={-100} y1={560} letra="M" color={KC.mint} />
      <Chip T={T} at={K.V + 1.9} until={K.E - 0.2} texto="1 visema = labios juntos" x={430} y={1080} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.V + 2.6} until={K.E - 0.2} texto="visema: la forma visible de un sonido" x={540} y={1160} tam={30} borde={KC.gold} />

      {/* 3 · el experto contra la IA de 2017 */}
      <Escena T={T} a={K.E} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {svg(<g opacity={kprog(T, K.E + 3.0, K.E + 3.5)}>
          <Tele x={300} y={560} s={0.85} T={T} />
          <Lector x={600} y={560} s={0.75} T={T} />
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.9} anio="2017" quien="Oxford + DeepMind" revista="Chung, Senior, Vinyals y Zisserman · CVPR" y={640} />
      <Chip T={T} at={K.E + 1.4} until={K.E + 2.9} texto="200 videos de la BBC · sin sonido" y={900} tam={34} borde={KC.ink} />
      <FilaPalabras T={T} at={K.E + 3.8} until={K.P - 0.2} y={820} etiqueta="lector profesional" n={2.8} color={KC.orange} texto="menos de ¼" />
      <FilaPalabras T={T} at={E2} until={K.P - 0.2} y={1010} etiqueta="IA (solo labios)" n={6} color={KC.cyan} texto="½" />

      {/* 4 · pregunta: ¿y con muchas más bocas? */}
      <Escena T={T} a={K.P} b={K.S} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<g>{Array.from({ length: 30 }, (_, i) => { const c = i % 5, r = Math.floor(i / 5), t0 = K.P + 0.1 + i * 0.05;
          return <g key={i} opacity={kprog(T, t0, t0 + 0.2)}><rect x={30 + c * 105} y={330 + r * 125} width={95} height={95} rx={14} fill="#ffd9c4" stroke={KC.ink} strokeWidth={4} />
            <Labios x={77 + c * 105} y={376 + r * 125} s={0.22} abre={silaba(T + i * 0.31, 1.2)} id={`pq${i}`} /></g>; })}</g>)}
        {svg(<text x={760} y={560} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} transform={`rotate(${Math.sin(T * 3) * 6} 760 460)`}>?</text>)}
      </Escena>

      {/* 5 · por dentro de la máquina: 3,886 horas de YouTube */}
      <Escena T={T} a={K.S} b={K.D}>
        <FondoCircuito T={T} />
        <TiraBocas T={T} y={1080} o={kprog(T, K.S + 2.4, K.S + 2.9)} />
        <RedNeuronal T={T} x={170} y={560} ancho={760} alto={400} onda={(T * 0.7) % 1} o={kprog(T, K.S + 2.6, K.S + 3.2)} />
      </Escena>
      <TarjetaEstudio T={T} at={K.S + 0.2} until={K.S + 2.5} anio="2018" quien="DeepMind y Google" revista="Shillingford et al. · arXiv:1807.05162" y={700} />
      <NumeroGigante T={T} at={K.S + 2.8} until={K.D - 0.2} valor={3886} dur={1.6} sufijo=" h" etiqueta="de video de YouTube" x={660} y={430} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.S + 3.6} until={K.D - 0.2} texto="caras hablando · en inglés" y={1190} tam={32} borde={KC.cyan} />

      {/* 6 · el duelo: lectores profesionales contra la IA */}
      <Escena T={T} a={K.D} b={K.Vz}>
        <FondoLunares color={KC.cyan} />
        {svg(<g opacity={1 - kprog(T, D2 - 0.3, D2 + 0.2)}>
          <rect x={60} y={620} width={960} height={520} rx={30} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={8} />
          <Lector x={290} y={820} s={0.95} T={T} lupa={false} />
          <Robotito x={790} y={860} s={1.0} T={T} cara="seguro" />
          <text x={540} y={900} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={6}>VS</text>
        </g>)}
      </Escena>
      <Chip T={T} at={K.D + 1.2} until={D2 - 0.4} texto={`▶ ver otra vez: ${Math.min(10, 1 + Math.floor(kprog(T, K.D + 1.4, K.D + 4.2) * 9.99))} / 10`} x={300} y={1090} tam={34} mono borde={KC.ink} />
      <Chip T={T} at={K.D + 2.0} until={D2 - 0.4} texto="solo la boca" x={790} y={1090} tam={34} borde={KC.ink} />
      <Chip T={T} at={D2} until={K.Vz - 0.2} texto="error de palabras · menos es mejor" y={720} tam={32} borde={KC.ink} />
      <BarrasError T={T} at={D2 + 0.2} until={K.Vz - 0.2} top={800} filas={[
        { valor: 92.9, etiqueta: 'profesionales sin contexto', color: KC.orange, at: D2 + 0.3 },
        { valor: 86.4, etiqueta: 'profesionales con contexto', color: KC.coral, at: D2 + 1.0 },
        { valor: 40.9, etiqueta: 'la IA (2018)', color: KC.mint, at: D2 + 3.6 }]} />

      {/* 7 · una de sus metas: ayudar a quien perdió la voz (posibilidad) */}
      <Escena T={T} a={K.Vz} b={K.R}>
        <FondoLunares color={KC.mint} />
        {svg(<Paciente x={600} y={920} s={1.0} T={T} habla={T > K.Vz + 1.4 ? silaba(T, 1.4) : 0} />)}
      </Escena>
      <Globo T={T} at={K.Vz + 1.6} until={K.R - 0.2} x={480} y={640} texto="tengo sed" />
      <Chip T={T} at={K.Vz + 2.4} until={K.R - 0.2} texto="podría ayudar · ejemplo ilustrativo" y={1160} tam={32} borde={KC.ink} />

      {/* 8 · ¿y espiar con cámaras? */}
      <Escena T={T} a={K.R} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<g>
          <CamaraCalle x={760} y={430} s={1} T={T} />
          <path d="M 640 470 L 180 980 L 470 1010 Z" fill="rgba(255,255,255,.28)" />
          <Personita x={320} y={900} s={0.55} blur={4} id="lej" />
          <g opacity={kprog(T, K.R + 2.6, K.R + 3.0)}>
            <rect x={560} y={700} width={420} height={330} rx={26} fill="#1d1d22" stroke={KC.ink} strokeWidth={8} />
            <VideoBoca x={770} y={865} s={0.5} T={T} abre={silaba(T)} id="r" mudo={false} barra={false} />
          </g>
        </g>)}
      </Escena>
      <Marca T={T} at={K.R + 1.4} x={320} y={720} ok={false} />
      <Marca T={T} at={K.R + 3.0} x={960} y={700} ok />
      <Chip T={T} at={K.R + 3.2} until={K.C - 0.2} texto="de frente" x={200} y={1130} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.R + 3.6} until={K.C - 0.2} texto="de cerca" x={500} y={1130} tam={34} borde={KC.mint} />
      <Chip T={T} at={K.R + 4.0} until={K.C - 0.2} texto="buen video" x={820} y={1130} tam={34} borde={KC.mint} />

      {/* 9 · cierre: los mismos labios; el contexto decide */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<VideoBoca x={400} y={820} s={0.8} T={T} abre={silaba(T + 1.2)} id="c" />)}
      </Escena>
      <Tarjeta T={T} at={K.C + 0.3} x={280} y={1110} texto="PESO" color={KC.yellow} luz={luzPeso} />
      <Tarjeta T={T} at={K.C + 0.5} x={800} y={1110} texto="BESO" color={KC.cyan} apaga={luzPeso} />
      <FraseHueco T={T} at={K.C + 2.8} llena={K.C + 4.0} y={500} antes="¿Cuál es el" despues="de tu maleta?" palabra="peso" />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="¿«Peso» o *«beso»?*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.E - 0.1} texto="Misma boca: *visemas.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={E2 - 0.1} texto="Experto: *menos de 1 de 4.*" />
      <Subtitulo T={T} idx={3} at={E2} until={K.P - 0.1} texto="La IA: *la mitad.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.S - 0.1} texto="¿Y con *muchas más bocas?*" />
      <Subtitulo T={T} idx={5} at={K.S + 0.1} until={K.D - 0.1} texto="*3,886 horas* de video" />
      <Subtitulo T={T} idx={6} at={K.D + 0.1} until={D2 - 0.1} texto="Cada video: *hasta 10 veces.*" />
      <Subtitulo T={T} idx={7} at={D2} until={K.Vz - 0.1} texto="Error: *86–93 %* vs *41 %*" />
      <Subtitulo T={T} idx={8} at={K.Vz + 0.1} until={K.R - 0.1} texto="Para quien *perdió la voz.*" />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.C - 0.1} texto="Solo *de frente y de cerca.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Decide *el contexto.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Visemas + 0.5, CUES.Experto - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Experto + 3.4, CUES.Experto + 7.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Experto + 7.4, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.0, CUES.Duelo - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Duelo + 0.4, CUES.Duelo + 4.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Duelo + 6.0, CUES.Voz - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Voz + 0.4, CUES.Riesgo - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Riesgo + 0.3, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Cierre + 2.6, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="23" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LeeLabiosApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LeeLabios /></CompositionStage></div>;
}
window.LeeLabiosApp = LeeLabiosApp;
