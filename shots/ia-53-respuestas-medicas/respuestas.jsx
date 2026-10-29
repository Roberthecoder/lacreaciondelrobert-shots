// Shot IA #53 · ¿Un chatbot contesta mejor que tu médico? — NARRADO (N5 "El experimento" + N2 "El número").
// Datos: Ayers et al., "Comparing Physician and Artificial Intelligence Chatbot Responses to Patient Questions Posted to a
// Public Social Media Forum", JAMA Internal Medicine 183(6):589–596 (2023). Ver guion.md y verificacion.md.
// Todo el dibujo es esquemático (foro, globos y personas inventados; sin logos reales).
const AZUL = '#2f6dff', PIEL = '#f2c29b', VERDE = '#1f9d55';

// Cara del médico: cabeza con bata y estetoscopio.
function CaraMedico({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={44} fill="#dff3ff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -30 44 Q -30 18 0 16 Q 30 18 30 44 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />
    <circle cy={-6} r={18} fill={PIEL} stroke={KC.ink} strokeWidth={4} />
    <path d="M -18 -12 Q -16 -30 0 -28 Q 16 -30 18 -12 Q 8 -20 -18 -12 Z" fill="#3a2a20" />
    <path d="M -12 18 Q -14 36 0 38 Q 14 36 12 18" stroke="#56606e" strokeWidth={4} fill="none" />
    <circle cx={0} cy={38} r={5} fill="#9aa6b6" stroke={KC.ink} strokeWidth={2} />
  </g>;
}
// Cara del chatbot (pantallita con ojos).
function CaraBot({ x, y, s = 1, T = 0 }) {
  const parp = (T % 3) < 0.12;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={44} fill="#e6f9ff" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={-30} x2={0} y2={-20} stroke={KC.ink} strokeWidth={4} /><circle cy={-32} r={5} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />
    <rect x={-26} y={-20} width={52} height={40} rx={12} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
    <rect x={-19} y={-13} width={38} height={26} rx={7} fill="#10131a" />
    {parp ? <><line x1={-12} y1={0} x2={-4} y2={0} stroke={KC.mint} strokeWidth={3} /><line x1={4} y1={0} x2={12} y2={0} stroke={KC.mint} strokeWidth={3} /></>
      : <><circle cx={-8} cy={0} r={4} fill={KC.mint} /><circle cx={8} cy={0} r={4} fill={KC.mint} /></>}
  </g>;
}
// Renglones "escritos" (garabatos). n renglones, ancho w, p = cuánto se ha escrito (0..1).
function Renglones({ x, y, w, n, p = 1, color = '#2b3a8a', paso = 34, seed = 4, grosor = 5 }) {
  const r = krng(seed);
  return <>{Array.from({ length: n }, (_, i) => {
    const l = (i === n - 1 ? 0.55 : 0.82 + r() * 0.18) * w, vis = kclamp(p * n - i, 0, 1);
    if (vis <= 0) return null;
    let d = `M ${x} ${y + i * paso}`; const seg = 12;
    for (let k = 0; k < seg; k++) d += ` q ${l * vis / seg / 2} ${-5 - r() * 5} ${l * vis / seg} 0`;
    return <path key={i} d={d} stroke={color} strokeWidth={grosor} fill="none" strokeLinecap="round" opacity=".8" />;
  })}</>;
}
// Globo de respuesta. quien: 'medico' | 'chatbot'. n = renglones; p = escritura 0..1; check / sello 0..1.
function Globo({ x, y, w, h, quien, n, p = 1, T = 0, check = 0, borrador = 0, sello = 0, o = 1 }) {
  const med = quien === 'medico';
  return <g opacity={o}>
    <path d={`M ${x + 50} ${y + h} L ${x + 30} ${y + h + 46} L ${x + 110} ${y + h} Z`} fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={x} y={y} width={w} height={h} rx={34} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={x + 30} y={y + h - 8} width={86} height={14} fill="#fff" />
    {med ? <CaraMedico x={x + 66} y={y + 66} s={0.95} /> : <CaraBot x={x + 66} y={y + 66} s={0.95} T={T} />}
    <text x={x + 128} y={y + 80} style={{ font:`900 38px ${KF.texto}` }} fill={med ? AZUL : '#0a7f99'}>{med ? 'médico' : 'chatbot'}</text>
    <Renglones x={x + 34} y={y + 150} w={w - 70} n={n} p={p} seed={med ? 3 : 8} paso={34} />
    {borrador > 0 && <g opacity={borrador}><rect x={x + w - 230} y={y + 36} width={200} height={50} rx={10} fill="#fff4c2" stroke={KC.ink} strokeWidth={4} />
      <text x={x + w - 130} y={y + 72} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>BORRADOR</text></g>}
    {check > 0 && <g transform={`translate(${x + w - 10} ${y - 6}) scale(${klerp(1.8, 1, check)})`} opacity={Math.min(1, check * 2)}>
      <circle r={50} fill={KC.leaf} stroke={KC.ink} strokeWidth={7} />
      <path d="M -24 0 L -6 18 L 26 -18" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
    {sello > 0 && <g transform={`translate(${x + w / 2} ${y + h / 2 + 40}) rotate(-10) scale(${klerp(2.2, 1, sello)})`} opacity={Math.min(1, sello * 2)}>
      <rect x={-205} y={-70} width={410} height={140} rx={20} fill="rgba(63,191,74,.16)" stroke={VERDE} strokeWidth={9} />
      <text y={-12} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={VERDE}>REVISADO POR</text>
      <text y={42} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={VERDE}>TU MÉDICO ✔</text></g>}
  </g>;
}
// Tarjeta con la duda del paciente.
function Duda({ x, y, o = 1, T = 0 }) {
  const b = Math.sin(T * 2.2) * 4;
  return <g opacity={o} transform={`translate(0 ${b})`}>
    <rect x={x} y={y} width={500} height={150} rx={30} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    <path d={`M ${x + 420} ${y + 150} L ${x + 460} ${y + 196} L ${x + 380} ${y + 150} Z`} fill={KC.cyan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={x + 370} y={y + 140} width={100} height={14} fill={KC.cyan} />
    <text x={x + 34} y={y + 62} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>tu duda:</text>
    <text x={x + 34} y={y + 116} style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>«¿Esto es grave?»</text>
  </g>;
}
// La escena del gancho (y del cierre): la duda y las dos respuestas lado a lado.
function DosRespuestas({ T, t0, check = 0, borrador = 0, sello = 0, pMed = 1, pBot = 1 }) {
  return <>
    <Duda x={60} y={330} T={T} o={kprog(T, t0 - 0.4, t0)} />
    <Globo x={50} y={640} w={470} h={300} quien="medico" n={2} p={pMed} T={T} />
    <Globo x={560} y={740} w={470} h={420} quien="chatbot" n={7} p={pBot} T={T} check={check} borrador={borrador} sello={sello} />
  </>;
}
// Barras horizontales con decimales (copiadas del #09), con icono opcional.
function BarrasH({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 40px ${KF.texto}`, color:f.tinta || KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 640 * f.valor / 100 * g), height:80, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 76px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{`${kformato(f.valor * g, 1)} %`}</div>
        </div>
      </div>; })}
  </div>;
}
// Foro esquemático: encabezado, preguntas y respuestas con insignia de médico verificado.
function ForoPanel({ T, at, top = 640, n = 3 }) {
  const e = kprog(T, at, at + 0.5, kEase.sale), sc = ((T - at) * 26) % 170;
  const posts = ['me duele la cabeza desde ayer…', '¿es normal esta roncha?', 'tos que no se quita…', '¿y si mezclo dos medicinas?'];
  return <div style={{ position:'absolute', left:70, top, width:940, height:540, zIndex:20, opacity:e, transform:`translateY(${(1 - e) * 60}px)`,
    background:'#fff', border:`8px solid ${KC.ink}`, borderRadius:34, overflow:'hidden', boxShadow:`14px 14px 0 ${KC.ink}` }}>
    <div style={{ height:80, background:'#ff6b3d', borderBottom:`6px solid ${KC.ink}`, display:'flex', alignItems:'center', padding:'0 30px', gap:16 }}>
      <div style={{ width:44, height:44, borderRadius:22, background:'#fff', border:`4px solid ${KC.ink}` }}></div>
      <div style={{ font:`700 36px ${KF.mono}`, color:'#fff' }}>r/AskDocs</div>
      <div style={{ marginLeft:'auto', font:`900 28px ${KF.texto}`, color:'#fff' }}>foro público</div>
    </div>
    <div style={{ position:'absolute', left:0, right:0, top:86, transform:`translateY(${-sc}px)` }}>
      {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ padding:'18px 30px', borderBottom:'4px solid #e7e2d8', height:134, boxSizing:'border-box' }}>
        <div style={{ font:`800 32px ${KF.texto}`, color:KC.ink }}>{posts[i % 4]}</div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:12 }}>
          <div style={{ background:AZUL, color:'#fff', font:`900 24px ${KF.texto}`, padding:'5px 14px', borderRadius:999 }}>✔ médico verificado</div>
          <div style={{ flex:1, height:10, borderRadius:5, background:'#cfd6e4' }}></div>
        </div>
      </div>)}
    </div>
  </div>;
}
// Evaluador con antifaz (no sabe quién escribió cada respuesta).
function Evaluador({ x, y, s = 1, T = 0, k = 0, pelo = '#3a2a20', bata = '#fff' }) {
  const b = Math.sin(T * 2 + k) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -110 200 Q -110 90 0 86 Q 110 90 110 200 Z" fill={bata} stroke={KC.ink} strokeWidth={8} />
    <path d="M -20 88 L 0 140 L 20 88" fill="none" stroke={KC.ink} strokeWidth={6} />
    <circle cy={0} r={78} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -78 -8 Q -80 -84 0 -84 Q 80 -84 78 -8 Q 40 -50 -78 -8 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />
    <rect x={-86} y={-14} width={172} height={42} rx={14} fill="#1d1d22" stroke={KC.ink} strokeWidth={5} />
    <path d="M 84 4 q 30 6 34 34" stroke="#1d1d22" strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M -24 50 Q 0 62 24 50" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
// Carta "A" / "B" con una respuesta escondida.
function Carta({ x, y, letra, rot = 0, color = KC.paper }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-130} y={-170} width={260} height={340} rx={26} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text y={10} textAnchor="middle" style={{ font:`400 170px ${KF.titulo}` }} fill={KC.ink}>{letra}</text>
    <text y={120} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill="#5a524a">¿quién?</text>
  </g>;
}
// Tira de papel con renglones (para comparar lo largo de cada respuesta).
function Tira({ x, y, w, h = 130, color = '#fff', p = 1, seed = 2 }) {
  const ww = Math.max(20, w * p);
  return <g>
    <rect x={x} y={y} width={ww} height={h} rx={14} fill={color} stroke={KC.ink} strokeWidth={7} />
    <Renglones x={x + 22} y={y + 42} w={Math.max(0, ww - 44)} n={3} paso={30} seed={seed} grosor={4} />
    {p < 1 && <ellipse cx={x + ww} cy={y + h / 2} rx={22} ry={h / 2 + 4} fill="#efe9dc" stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
// Laptop con el foro.
function Laptop({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-210} y={-160} width={420} height={280} rx={20} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={-186} y={-136} width={372} height={232} rx={8} fill="#fff" />
    <rect x={-186} y={-136} width={372} height={42} fill="#ff6b3d" />
    {[0, 1, 2].map((i) => <g key={i}><rect x={-166} y={-78 + i * 60} width={250 - i * 30} height={14} rx={7} fill="#c9cfdc" />
      <rect x={-166} y={-56 + i * 60} width={92} height={18} rx={9} fill={AZUL} /></g>)}
    <path d="M -250 120 L 250 120 L 220 160 L -220 160 Z" fill="#9aa6b6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}
// Expediente con candado.
function Expediente({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 2.4) * 5;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -170 -120 L -60 -120 L -30 -150 L 170 -150 L 170 130 L -170 130 Z" fill="#f6b73c" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-170} y={-100} width={340} height={230} rx={10} fill="#ffcf5c" stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-40} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>tu historial</text>
    <g transform="translate(0 50)">
      <path d="M -34 -10 L -34 -40 Q -34 -74 0 -74 Q 34 -74 34 -40 L 34 -10" stroke={KC.ink} strokeWidth={12} fill="none" />
      <rect x={-52} y={-14} width={104} height={80} rx={14} fill="#56606e" stroke={KC.ink} strokeWidth={7} />
      <circle cy={22} r={10} fill={KC.ink} />
    </g>
  </g>;
}
// Pluma roja del médico.
function Pluma({ x, y, rot = -35 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M 0 0 L 16 -26 L 16 -250 L -16 -250 L -16 -26 Z" fill={KC.red} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 0 0 L 8 -14 L -8 -14 Z" fill={KC.ink} />
    <rect x={-16} y={-200} width={32} height={22} fill="#fff" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Corazón que late.
function Corazon({ x, y, s = 1, T = 0 }) {
  const l = 1 + 0.08 * Math.max(0, Math.sin(T * 7));
  return <g transform={`translate(${x} ${y}) scale(${s * l})`}>
    <path d="M 0 60 C -110 -10 -80 -100 0 -50 C 80 -100 110 -10 0 60 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -50 -40 Q -60 -20 -50 0" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity=".7" />
  </g>;
}
// Lista de límites (tarjeta tipo portapapeles).
function Limites({ T, at, until, items, top = 690 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o, transform:`translateY(${e.y}px)`,
    background:KC.paper, border:`8px solid ${KC.ink}`, borderRadius:30, padding:'26px 34px', boxSizing:'border-box', boxShadow:`14px 14px 0 ${KC.ink}` }}>
    <div style={{ font:`400 60px/1 ${KF.titulo}`, color:KC.ink, marginBottom:16 }}>LÍMITES DEL ESTUDIO</div>
    {items.map((it, i) => { const p = kprog(T, it.at, it.at + 0.4, kEase.sale); if (T < it.at) return null;
      return <div key={i} style={{ display:'flex', alignItems:'center', gap:18, marginTop:14, opacity:p * (it.viejo ? 0.55 : 1), transform:`translateX(${(1 - p) * 60}px)` }}>
        <div style={{ width:56, height:56, borderRadius:14, background: it.viejo ? '#9aa6b6' : KC.orange, border:`5px solid ${KC.ink}`, font:`900 36px/46px ${KF.texto}`, textAlign:'center', color:KC.ink, flex:'none' }}>!</div>
        <div style={{ font:`900 40px/1.15 ${KF.texto}`, color:KC.ink }}>{it.texto}</div>
      </div>; })}
  </div>;
}

function Respuestas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Fo: CUES.Foro, E: CUES.Estudio, Ci: CUES.Ciegas, Ca: CUES.Calidad, Em: CUES.Empatia, P: CUES.Pregunta,
    L: CUES.Largo, F2: CUES.Foro2, Li: CUES.Limites, B: CUES.Borrador, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const baraja = kprog(T, K.Ci + 1.0, K.Ci + 2.6, kEase.suave), swap = Math.sin(baraja * Math.PI * 3);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu duda, dos respuestas */}
      <Escena T={T} a={K.G} b={K.Fo}>
        <FondoLunares color={KC.mint} />
        {svg(<DosRespuestas T={T} t0={K.G} pMed={kprog(T, K.G + 0.1, K.G + 0.9)} pBot={kprog(T, K.G + 0.5, K.G + 2.6)} check={kprog(T, K.G + 3.3, K.G + 3.7, kEase.sale)} />)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 4.9} until={K.Fo - 0.2} valor={78.6} dec={1} dur={1.0} sufijo=" %" etiqueta="" x={790} y={430} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.G + 5.3} until={K.Fo - 0.2} texto="de 585 evaluaciones" x={790} y={560} tam={30} borde={KC.ink} />
      {/* 2 · el foro */}
      <Escena T={T} a={K.Fo} b={K.E}>
        <FondoLunares color={KC.cyan} />
        <ForoPanel T={T} at={K.Fo + 0.1} />
      </Escena>
      <NumeroGigante T={T} at={K.Fo + 0.3} until={K.E - 0.2} valor={195} dur={1.6} etiqueta="" x={330} y={430} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Fo + 0.9} until={K.E - 0.2} texto="preguntas reales" x={330} y={560} tam={34} borde={KC.ink} />
      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ci - 0.3} anio="2023" quien="Universidad de California, San Diego" revista="Ayers et al. · JAMA Internal Medicine" y={830} />
      <Chip T={T} at={K.E + 1.6} until={K.Ci - 0.3} texto="ChatGPT (GPT-3.5) · dic. 2022" x={540} y={1110} tam={36} borde={KC.ink} />
      {/* 4 · a ciegas */}
      <Escena T={T} a={K.Ci} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {[0, 1, 2].map((i) => <g key={i} opacity={kprog(T, K.Ci + 0.1 + i * 0.2, K.Ci + 0.4 + i * 0.2)}>
            <Evaluador x={230 + i * 310} y={520} s={0.85} T={T} k={i} pelo={['#3a2a20', '#7a4a22', '#1d1d22'][i]} bata={['#fff', '#cfe9ff', '#fff'][i]} /></g>)}
          <g opacity={kprog(T, K.Ci + 0.5, K.Ci + 0.9)}>
            <Carta x={540 - 200 * Math.cos(baraja * Math.PI * 3)} y={930 - 40 * swap} letra="A" rot={-6 + 10 * swap} />
            <Carta x={540 + 200 * Math.cos(baraja * Math.PI * 3)} y={930 + 40 * swap} letra="B" rot={6 - 10 * swap} color="#e8f7ff" />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ci + 2.4} until={K.Ca - 0.2} texto="3 evaluadores por respuesta" x={540} y={1150} tam={34} borde={KC.ink} />
      {/* 5 · calidad */}
      <Escena T={T} a={K.Ca} b={K.Em}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <Chip T={T} at={K.Ca + 0.2} until={K.Em - 0.2} texto="calidad buena o muy buena" x={540} y={720} tam={40} borde={KC.ink} />
      <BarrasH T={T} at={K.Ca + 0.5} until={K.Em - 0.2} top={800} filas={[{ valor: 78.5, etiqueta: 'chatbot', color: KC.cyan }, { valor: 22.1, etiqueta: 'médicos', color: AZUL, at: K.Ca + 2.6 }]} />
      {/* 6 · empatía */}
      <Escena T={T} a={K.Em} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svg(<g opacity={kprog(T, K.Em, K.Em + 0.4)}><Corazon x={540} y={470} s={1.3} T={T} /></g>)}
      </Escena>
      <Chip T={T} at={K.Em + 0.2} until={K.P - 0.2} texto="empáticas o muy empáticas" x={540} y={720} tam={40} borde={KC.ink} />
      <BarrasH T={T} at={K.Em + 0.5} until={K.P - 0.2} top={800} filas={[{ valor: 45.1, etiqueta: 'chatbot', color: KC.cyan }, { valor: 4.6, etiqueta: 'médicos', color: AZUL, at: K.Em + 2.4 }]} />
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.L} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.P + 1.3} until={K.L - 0.1} texto="Calma." x={290} y={1150} tam={56} borde={KC.yellow} />
      {/* 8 · más largas */}
      <Escena T={T} a={K.L} b={K.F2}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <g opacity={kprog(T, K.L + 0.2, K.L + 0.5)}>
            <text x={70} y={720} style={{ font:`900 40px ${KF.texto}` }} fill={AZUL}>médico · 52 palabras</text>
            <Tira x={70} y={745} w={940 * 52 / 211} seed={3} />
          </g>
          <g opacity={kprog(T, K.L + 0.6, K.L + 0.9)}>
            <text x={70} y={955} style={{ font:`900 40px ${KF.texto}` }} fill="#0a7f99">chatbot · 211 palabras</text>
            <Tira x={70} y={980} w={940} color="#e8f7ff" p={kprog(T, K.L + 0.7, K.L + 2.0, kEase.suave)} seed={8} />
          </g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.L + 1.7} until={K.F2 - 0.2} valor={4} prefijo="×" dur={0.6} etiqueta="" x={640} y={470} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.L + 0.3} until={K.F2 - 0.2} texto="promedio de palabras" x={780} y={600} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.L + 3.0} until={K.F2 - 0.2} texto="¿más largo = más empático?" x={540} y={1170} tam={38} borde={KC.red} />
      {/* 9 · foro, no consulta */}
      <Escena T={T} a={K.F2} b={K.Li}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Laptop x={280} y={820} s={0.95} T={T} />
          <g opacity={kprog(T, K.F2 + 0.6, K.F2 + 1.0)}><Expediente x={800} y={810} s={0.9} T={T} /></g>
          <line x1={520} y1={820} x2={600} y2={820} stroke={KC.ink} strokeWidth={8} strokeDasharray="14 12" opacity={kprog(T, K.F2 + 1.0, K.F2 + 1.3)} />
          <g opacity={kprog(T, K.F2 + 1.3, K.F2 + 1.6)} transform={`translate(560 820) scale(${klerp(1.6, 1, kprog(T, K.F2 + 1.3, K.F2 + 1.6, kEase.sale))})`}>
            <circle r={44} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
            <path d="M -18 -18 L 18 18 M 18 -18 L -18 18" stroke="#fff" strokeWidth={10} strokeLinecap="round" /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.F2 + 0.2} until={K.Li - 0.2} texto="foro ≠ consulta" x={540} y={470} tam={56} borde={KC.ink} />
      {/* 10 · límites */}
      <Escena T={T} a={K.Li} b={K.B}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      <Limites T={T} at={K.Li + 0.1} until={K.B - 0.2} items={[
        { at: K.Li + 0.15, texto: 'respuestas más largas', viejo: true },
        { at: K.Li + 0.3, texto: 'un foro, no una consulta', viejo: true },
        { at: K.Li + 0.8, texto: 'exactitud: no se midió aparte' },
        { at: K.Li + 3.2, texto: 'evaluadores = coautores' }]} />
      {/* 11 · borrador + médico */}
      <Escena T={T} a={K.B} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Robotito x={210} y={930} s={0.7} T={T} cara="feliz" />
          <g transform={`rotate(3 680 860)`}>
            <rect x={440} y={600} width={500} height={540} rx={20} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
            <text x={690} y={670} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill="#5a524a">BORRADOR</text>
            <Renglones x={480} y={740} w={420} n={7} p={kprog(T, K.B + 0.2, K.B + 1.6)} seed={8} paso={52} />
            {[0, 1].map((k) => { const p = kprog(T, K.B + 2.0 + k * 0.7, K.B + 2.4 + k * 0.7, kEase.sale), yy = 792 + k * 156;
              return <g key={k}><line x1={478} y1={yy - 4} x2={478 + 380 * p} y2={yy - 8} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
                {p > 0.9 && <path d={`M 560 ${yy + 22} q 30 -18 60 0 t 60 0 t 60 0`} stroke={KC.red} strokeWidth={6} fill="none" strokeLinecap="round" />}</g>; })}
          </g>
          {T > K.B + 1.8 && <Pluma x={klerp(480, 860, kprog(T, K.B + 2.0, K.B + 3.4) % 0.5 * 2)} y={T < K.B + 2.7 ? 792 : 948} rot={-35} />}
        </>)}
      </Escena>
      <Chip T={T} at={K.B + 0.3} until={K.C - 0.2} texto="IA: borrador" x={260} y={700} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.B + 2.0} until={K.C - 0.2} texto="médico: corrige" x={700} y={1180} tam={36} borde={KC.red} />
      {/* 12 · cierre: la misma imagen del inicio, ya revisada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<DosRespuestas T={T} t0={K.C - 1} borrador={kprog(T, K.C + 0.6, K.C + 1.0)} sello={kprog(T, K.C + 1.8, K.C + 2.2, kEase.sale)} />)}
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Fo - 0.1} texto="Eligieron al chatbot *casi 8 de cada 10.*" />
      <Subtitulo T={T} idx={1} at={K.Fo + 0.1} until={K.E - 0.1} texto="*195 preguntas* reales de un foro" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.Ci - 0.1} texto="2023 · *UC San Diego*" />
      <Subtitulo T={T} idx={3} at={K.Ci + 0.1} until={K.Ca - 0.1} texto="Sin saber *cuál era cuál.*" />
      <Subtitulo T={T} idx={4} at={K.Ca + 0.1} until={K.Em - 0.1} texto="Calidad: *78.5 %* contra *22.1 %*" />
      <Subtitulo T={T} idx={5} at={K.Em + 0.1} until={K.P - 0.1} texto="Empatía: *45.1 %* contra *4.6 %*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.L - 0.1} texto="¿Ya no *necesitas al médico?*" />
      <Subtitulo T={T} idx={7} at={K.L + 0.1} until={K.F2 - 0.1} texto="*4 veces* más largas" />
      <Subtitulo T={T} idx={8} at={K.F2 + 0.1} until={K.Li - 0.1} texto="Un foro *no es una consulta.*" />
      <Subtitulo T={T} idx={9} at={K.Li + 0.1} until={K.B - 0.1} texto="No midieron *la exactitud aparte.*" />
      <Subtitulo T={T} idx={10} at={K.B + 0.1} until={K.C - 0.1} texto="IA: borrador. *Médico: corrige.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="La última palabra: *tu médico.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Foro + 1.0, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 2.2, CUES.Ciegas - 0.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Calidad + 2.5, CUES.Empatia - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Largo + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Largo + 2.5, CUES.Foro2 - 0.15, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Limites + 0.5, CUES.Borrador - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Borrador + 1.8, CUES.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="53" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RespuestasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Respuestas /></CompositionStage></div>;
}
window.RespuestasApp = RespuestasApp;
