// Shot Químico #17 · Ese anillo verde no es huevo echado a perder (sulfuro ferroso en el huevo cocido) — NARRADO (N3 capítulos y medidores + N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (moléculas, granos de FeS y capas no están a escala).
const YEMA = '#ffc21a', CLARA = '#fbf8f0', FES = '#3f4a32', VERDE = '#6f7d4a', FE_C = '#c0602e', H2S_C = '#c8e65a';

// Mitad de huevo cocido vista de frente. anillo 0..1 = intensidad del verde; grueso = px extra del anillo de un lado (asimétrico).
function HuevoMitad({ x, y, s = 1, anillo = 1, grueso = 0, clara = CLARA, rot = 0, sombra = true }) {
  const R = 100, w = 8 + 18 * Math.min(1, anillo) + grueso, col = mixHex(YEMA, '#5d6b3e', Math.min(1, anillo)), col2 = mixHex(YEMA, FES, Math.min(1, anillo));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {sombra && <ellipse cx={10} cy={222} rx={150} ry={22} fill="rgba(0,0,0,.18)" />}
    <path d="M 0 -215 C 120 -215 165 -60 165 40 C 165 150 95 215 0 215 C -95 215 -165 150 -165 40 C -165 -60 -120 -215 0 -215 Z" fill={clara} stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={30} r={R} fill={anillo > 0.02 ? (anillo > 1 ? col2 : col) : YEMA} stroke={KC.ink} strokeWidth={5} />
    <circle cx={grueso * 0.55} cy={30} r={R - (anillo > 0.02 ? w : 0)} fill={YEMA} />
    <ellipse cx={-30 + grueso * 0.5} cy={0} rx={26} ry={16} fill="#fff3b0" opacity={0.7} />
  </g>;
}
// Huevo entero (cáscara).
function HuevoEntero({ x, y, s = 1, rot = 0, color = '#f3e3cc' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -215 C 120 -215 165 -60 165 40 C 165 150 95 215 0 215 C -95 215 -165 150 -165 40 C -165 -60 -120 -215 0 -215 Z" fill={color} stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-60} cy={-80} rx={30} ry={55} fill="#fff" opacity={0.5} transform="rotate(20 -60 -80)" />
  </g>;
}
function Tabla({ x, y, w = 900, h = 520 }) {
  return <g><rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={60} fill="#d9a066" stroke={KC.ink} strokeWidth={10} />
    {[0.2, 0.45, 0.7].map((k, i) => <path key={i} d={`M ${x - w / 2 + 60} ${y - h / 2 + h * k} q ${w / 3} 20 ${w - 120} 0`} stroke="#b97f45" strokeWidth={6} fill="none" />)}
    <circle cx={x + w / 2 - 70} cy={y - h / 2 + 70} r={24} fill="#b97f45" stroke={KC.ink} strokeWidth={6} /></g>;
}
function Cuchillo({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -20 0 L 20 0 L 26 -420 Q 0 -470 -24 -420 Z" fill="#dfe6ee" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-30} y={0} width={60} height={200} rx={16} fill="#3b2a25" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Olla({ T, x, y, s = 1, agua = '#9fd8ff', hierve = 1, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Llama T={T} x={0} y={250} s={2.2} o={hierve} />
    <rect x={-260} y={-140} width={520} height={360} rx={40} fill="#9aa3b5" stroke={KC.ink} strokeWidth={10} />
    <rect x={-240} y={-100} width={480} height={300} rx={30} fill={agua} opacity={0.9} />
    {children}
    <Burbujas T={T} x={-230} y={-100} w={460} h={290} n={22} f={hierve} vel={220} seed={11} rmax={12} />
    <rect x={-330} y={-130} width={80} height={36} rx={14} fill="#6b7385" stroke={KC.ink} strokeWidth={8} />
    <rect x={250} y={-130} width={80} height={36} rx={14} fill="#6b7385" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-140} rx={262} ry={26} fill="#c4cbd8" stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function Tazon({ x, y, s = 1, T = 0, hielo = true, children }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 -60 Q -250 200 0 210 Q 250 200 260 -60 Z" fill="#7fc8ff" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {children}
    {hielo && [[-170, -40, 10], [-60, -60, -12], [70, -45, 18], [170, -55, -6]].map(([dx, dy, r], i) =>
      <rect key={i} x={dx - 40} y={dy - 36 + Math.sin(T * 2 + i) * 4} width={80} height={72} rx={12} fill="rgba(240,250,255,.92)" stroke="#5aa9d6" strokeWidth={5} transform={`rotate(${r} ${dx} ${dy})`} />)}
    <ellipse cx={0} cy={-60} rx={262} ry={34} fill="none" stroke={KC.ink} strokeWidth={10} />
  </g>;
}
// Termómetro de laboratorio; nivel 0..1.
function Termometro({ x, y, s = 1, nivel = 1, color = KC.red, texto }) {
  const h = 260;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-20} y={-h} width={40} height={h} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-9} y={-h * nivel + 6} width={18} height={h * nivel} rx={9} fill={color} />
    <circle cx={0} cy={20} r={36} fill={color} stroke={KC.ink} strokeWidth={7} />
    {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={20} x2={36} y1={-h * k} y2={-h * k} stroke={KC.ink} strokeWidth={4} />)}
    {texto && <text x={0} y={100} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Molécula de H₂S.
function H2S({ x, y, s = 1, rot = 0, o = 1 }) {
  return <Molecula x={x} y={y} s={s} rot={rot} o={o} atomos={[[0, 0, 32, QA.S, 'S'], [-40, 30, 20, QA.H, 'H'], [40, 30, 20, QA.H, 'H']]} enlaces={[[0, 1], [0, 2]]} />;
}
function Fe({ x, y, r = 30, o = 1 }) { return <g opacity={o}><Atomo x={x} y={y} r={r} color={FE_C} letra="Fe" tam={r * 0.75} /></g>; }
function GranoFeS({ x, y, s = 1, rot = 0, o = 1 }) {
  return <path d="M -16 -10 L 4 -18 L 18 -4 L 12 14 L -10 16 L -20 2 Z" transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} fill={FES} stroke="#1b2014" strokeWidth={3} opacity={o} />;
}
// Barra de escala dibujada.
function BarraEscala({ x, y, largo = 160, texto, color = KC.ink }) {
  return <g><line x1={x} x2={x + largo} y1={y} y2={y} stroke={color} strokeWidth={8} strokeLinecap="round" />
    <line x1={x} x2={x} y1={y - 14} y2={y + 14} stroke={color} strokeWidth={6} /><line x1={x + largo} x2={x + largo} y1={y - 14} y2={y + 14} stroke={color} strokeWidth={6} />
    <text x={x + largo / 2} y={y - 22} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={color}>{texto}</text></g>;
}
// Mundo microscópico de la frontera clara | membrana | yema. capa = grosor 0..1 de la capa de FeS.
const MEMB_X = 520;
function Frontera({ T, capa = 0, seed = 4 }) {
  const R = krng(seed);
  const fes = Array.from({ length: 60 }, () => [MEMB_X + 14 + R() * 60, 420 + R() * 760, R() * 360, R()]);
  const fe = Array.from({ length: 14 }, (_, i) => [MEMB_X + 140 + (i % 3) * 140 + R() * 50, 470 + Math.floor(i / 3) * 150 + R() * 40]);
  return <g>
    <rect x={0} y={0} width={MEMB_X} height={KH} fill="#1d2a44" />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M 40 ${470 + i * 130} q 100 ${-40 + Math.sin(T + i) * 14} 200 0 t 200 0`} stroke="rgba(246,243,236,.35)" strokeWidth={10} fill="none" strokeLinecap="round" />)}
    <rect x={MEMB_X} y={0} width={KW - MEMB_X} height={KH} fill="#5a4410" />
    <rect x={MEMB_X} y={0} width={KW - MEMB_X} height={KH} fill={YEMA} opacity={0.45} />
    {fe.map(([x, y], i) => <Fe key={i} x={x + Math.sin(T * 1.3 + i) * 6} y={y + Math.cos(T + i) * 6} r={24} />)}
    {fes.map(([x, y, r, k], i) => k < capa ? <GranoFeS key={i} x={x} y={y} rot={r} s={1.1} /> : null)}
    <line x1={MEMB_X} x2={MEMB_X} y1={0} y2={KH} stroke={KC.texto} strokeWidth={6} strokeDasharray="22 16" />
  </g>;
}
// Panel de medidores en vivo (reloj de hervor + termómetro).
function Medidores({ T, at, until, minutos, termo }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const m = minutos ? minutos(T) : null, th = termo ? termo(T) : null;
  const txtM = m == null ? '' : m >= 60 ? `${Math.floor(m / 60)} h ${String(Math.floor(m % 60)).padStart(2, '0')} min` : `${Math.floor(m)} min`;
  return <div style={{ position:'absolute', left:KW / 2, top:1640, zIndex:42, transform:`translate(-50%,-50%) translateY(${e.y * 0.5}px)`, opacity:e.o, display:'flex', gap:26,
    background:'rgba(14,15,18,.82)', border:`4px solid ${KC.gold}`, borderRadius:30, padding:'12px 30px', alignItems:'center' }}>
    {m != null && <div style={{ display:'flex', alignItems:'center', gap:14 }}>
      <svg width={84} height={84}><circle cx={42} cy={42} r={36} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
        <line x1={42} y1={42} x2={42 + 28 * Math.sin(m * Math.PI / 30)} y2={42 - 28 * Math.cos(m * Math.PI / 30)} stroke={KC.red} strokeWidth={6} strokeLinecap="round" />
        <circle cx={42} cy={42} r={5} fill={KC.ink} /></svg>
      <div style={{ font:`700 46px ${KF.mono}`, color:KC.texto, whiteSpace:'nowrap' }}>{txtM}</div></div>}
    {th && <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      <svg width={40} height={84}><rect x={12} y={4} width={16} height={60} rx={8} fill="#fff" /><rect x={16} y={4 + 56 * (1 - th.nivel)} width={8} height={56 * th.nivel + 4} fill={th.color} /><circle cx={20} cy={68} r={13} fill={th.color} /></svg>
      <div style={{ font:`700 36px ${KF.mono}`, color:th.color, whiteSpace:'nowrap' }}>{th.texto}</div></div>}
  </div>;
}

function Huevo() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Ga: CUES.Gas, Vi: CUES.Viaje, Re: CUES.Reaccion, Pr: CUES.Pregunta, Es: CUES.Estudio, Tr: CUES.Treinta, Fr: CUES.Frio, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: el cuchillo baja y el huevo se abre
  const corte = kprog(T, K.G, K.G + 0.45, kEase.sale), abre = kprog(T, K.G + 0.45, K.G + 1.1, kEase.sale);
  // estudio: tiempos internos
  const esFrio = K.Es + 3.4, esParte = K.Es + 5.6, frMacro = K.Fr + 3.1;
  const R = krng(9);
  const gasMol = Array.from({ length: 9 }, (_, i) => [R(), R(), R() * 360, i]);
  const minutos = (t) => {
    if (t < K.Pr) return klerp(0, 4, kprog(t, K.Ga + 0.4, K.Vi)) + klerp(0, 8, kprog(t, K.Vi, K.Pr - 0.3));
    if (t < K.Tr) return klerp(0, 15, kprog(t, K.Es + 0.8, esFrio - 0.2, kEase.suave));
    if (t < K.Da) return klerp(15, 30, kprog(t, K.Tr + 0.2, K.Tr + 1.6, kEase.suave));
    return klerp(30, 420, kprog(t, K.Da + 0.2, K.Da + 2.2, kEase.suave));
  };
  const hirv = { nivel: 0.92, color: KC.red, texto: 'hirviendo · ≈ 100 °C' };
  const termo = (t) => {
    if (t >= K.Fr && t < K.Da) { const f = kprog(t, K.Fr + 0.4, K.Fr + 2.6, kEase.suave); return { nivel: klerp(0.92, 0.15, f), color: mixHex('#ff3b2f', '#5fc6ff', f), texto: f < 0.5 ? 'enfriando…' : 'agua fría' }; }
    if (t >= esFrio && t < K.Tr) return null;
    return hirv;
  };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el cuchillo parte el huevo cocido y aparece el anillo */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Tabla x={540} y={1010} />
          {abre <= 0 ? <HuevoEntero x={540} y={1000} s={0.95} /> : <g>
            <HuevoMitad x={klerp(540, 320, abre)} y={1000} s={0.95} rot={klerp(0, -8, abre)} />
            <HuevoMitad x={klerp(540, 760, abre)} y={1000} s={0.95} rot={klerp(0, 8, abre)} />
          </g>}
          <g opacity={1 - kprog(T, K.G + 0.9, K.G + 1.3)}><Cuchillo x={540 + 120} y={klerp(380, 860, corte)} rot={-6} s={1} /></g>
          <BarraEscala x={140} y={830} largo={150} texto="1 cm" />
        </SvgCapa>
      </Escena>
      {/* 1 · la clara tiene azufre, la yema hierro */}
      <Escena T={T} a={K.Q} b={K.Ga} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <HuevoMitad x={540} y={980} s={2.0} anillo={0} sombra={false} />
          {[[300, 640], [790, 640], [250, 1150], [830, 1180], [540, 650], [380, 1400]].map(([x, y], i) => { const o = kprog(T, K.Q + 0.3 + i * 0.15, K.Q + 0.7 + i * 0.15);
            return <g key={i} opacity={o}><path d={`M ${x - 70} ${y + 30} q 35 -40 70 0 t 70 0`} stroke="#8a7f6a" strokeWidth={8} fill="none" />
              <Atomo x={x + Math.sin(T * 2 + i) * 5} y={y} r={30} color={QA.S} letra="S" /></g>; })}
          {[[450, 1000], [620, 1080], [560, 930], [470, 1120], [650, 990], [540, 1040]].map(([x, y], i) => <Fe key={i} x={x + Math.sin(T * 1.6 + i) * 4} y={y} r={36} o={kprog(T, K.Q + 1.9 + i * 0.12, K.Q + 2.3 + i * 0.12)} />)}
        </SvgCapa>
      </Escena>
      {/* 2 · el hervor: la clara suelta H₂S */}
      <Escena T={T} a={K.Ga} b={K.Vi} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Olla T={T} x={540} y={1060} s={1.15}>
            <HuevoEntero x={0} y={60} s={0.62} rot={Math.sin(T * 3) * 6} />
          </Olla>
          {gasMol.map(([u, v, r, i]) => { const t0 = K.Ga + 1.2 + i * 0.35, p = kprog(T, t0, t0 + 2.6);
            return p > 0 && p < 1 ? <H2S key={i} x={420 + u * 240 + Math.sin(T * 2 + i) * 20} y={klerp(990, 560, p)} s={0.9} rot={r + T * 40} o={Math.sin(Math.PI * p)} /> : null; })}
          <Nube T={T} x={780} y={560} f={kprog(T, K.Ga + 3.0, K.Ga + 4.0)} r={130} color={H2S_C} seed={5} />
        </SvgCapa>
        <Onomato T={T} at={K.Ga + 3.2} until={K.Vi - 0.2} x={800} y={600} texto="¡fuchi!" color={H2S_C} tam={84} />
      </Escena>
      {/* 3–4 · micro: el gas cruza la membrana y forma FeS en la orilla */}
      <Escena T={T} a={K.Vi} b={K.Pr} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Frontera T={T} capa={kprog(T, K.Re + 1.0, K.Re + 4.5)} />
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.Vi + 0.2 + i * 0.45, p = kprog(T, t0, t0 + 2.2, kEase.suave), y = 470 + i * 95;
            const llega = T > t0 + 2.2 && T > K.Re + 0.4 + i * 0.3, fl = kprog(T, K.Re + 0.4 + i * 0.3, K.Re + 0.8 + i * 0.3);
            return <g key={i}>
              {!llega && <H2S x={klerp(80, MEMB_X + 70, p)} y={y + Math.sin(T * 3 + i) * 10} s={0.8} rot={T * 50 + i * 40} />}
              {llega && fl < 1 && <circle cx={MEMB_X + 60} cy={y} r={20 + 70 * fl} fill="none" stroke={KC.yellow} strokeWidth={10} opacity={1 - fl} />}
            </g>; })}
          <text x={540} y={1860} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="rgba(246,243,236,.6)">dibujo esquemático</text>
        </SvgCapa>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <text x={270} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 800)`}>?</text>
          <HuevoMitad x={300} y={1560} s={0.6} anillo={1} />
          <HuevoMitad x={780} y={1560} s={0.6} anillo={0} />
        </SvgCapa>
      </Escena>
      {/* 6 · 1920, Londres: 15 minutos, agua fría vs. enfriado lento */}
      <Escena T={T} a={K.Es} b={K.Tr} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {T < esParte ? <g>
            <Olla T={T} x={T < esFrio ? 540 : 760} y={1060} s={T < esFrio ? 1.1 : 0.75} hierve={1 - kprog(T, esFrio, esFrio + 0.6)}>
              <HuevoEntero x={T < esFrio ? -100 : 0} y={60} s={0.55} rot={Math.sin(T * 3) * 5} />
              {T < esFrio && <HuevoEntero x={100} y={60} s={0.55} rot={Math.cos(T * 3) * 5} />}
            </Olla>
            {T >= esFrio && <g>
              <path d="M 110 720 L 110 790 L 220 790" stroke="#9aa3b5" strokeWidth={34} fill="none" strokeLinecap="round" />
              <Chorro T={T} x0={232} y0={800} x1={280} y1={1010} color="#7fc8ff" ancho={22} />
              <Tazon x={300} y={1080} s={0.9} T={T}><HuevoEntero x={0} y={30} s={0.45} rot={-10} color="#fbf8f0" /></Tazon>
              <Termometro x={470} y={860} s={0.55} nivel={klerp(0.92, 0.15, kprog(T, esFrio + 0.2, esFrio + 1.2))} color={KC.blue} texto="rápido" />
              <Termometro x={760} y={830} s={0.55} nivel={klerp(0.92, 0.55, kprog(T, esFrio + 0.2, esFrio + 2.2))} color={KC.red} texto="lento" />
            </g>}
          </g> : <g>
            <HuevoMitad x={300} y={1000} s={0.85} anillo={klerp(0, 0.06, kprog(T, esParte, esParte + 0.5))} />
            <HuevoMitad x={780} y={1000} s={0.85} anillo={klerp(0, 0.45, kprog(T, esParte, esParte + 0.8))} />
          </g>}
        </SvgCapa>
        <Etq T={T} at={esParte + 0.2} until={K.Tr - 0.2} x={300} y={1300} texto="agua fría" lado="izq" color={KC.ink} tam={36} />
        <Etq T={T} at={esParte + 0.4} until={K.Tr - 0.2} x={780} y={1300} texto="enfriado lento" color={KC.ink} tam={36} />
      </Escena>
      {/* 7 · 30 minutos: mucho más intenso en los dos */}
      <Escena T={T} a={K.Tr} b={K.Fr} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {T < K.Tr + 1.7 ? <Olla T={T} x={540} y={1060} s={1.1}>
            <HuevoEntero x={-100} y={60} s={0.55} rot={Math.sin(T * 3) * 5} /><HuevoEntero x={100} y={60} s={0.55} rot={Math.cos(T * 3) * 5} />
          </Olla> : <g>
            <HuevoMitad x={300} y={1000} s={0.85} anillo={klerp(0.45, 1.3, kprog(T, K.Tr + 1.7, K.Tr + 2.4))} />
            <HuevoMitad x={780} y={1000} s={0.85} anillo={klerp(0.45, 1.3, kprog(T, K.Tr + 1.7, K.Tr + 2.4))} />
            <text x={300} y={720} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>agua fría</text>
            <text x={780} y={720} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>lento</text>
          </g>}
        </SvgCapa>
      </Escena>
      {/* 8a · micro: el frío frena la salida del gas y lo aleja de la yema */}
      <Escena T={T} a={K.Fr} b={frMacro} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <Frontera T={T} capa={0.25} />
          {Array.from({ length: 7 }, (_, i) => { const p = kprog(T, K.Fr + 0.6 + i * 0.12, K.Fr + 2.8 + i * 0.12, kEase.suave), y = 500 + i * 110;
            return <H2S key={i} x={klerp(MEMB_X - 80, -60, p)} y={y + Math.sin(T * 2 + i) * 8} s={0.8} rot={i * 50 + T * 20} o={1 - kprog(T, K.Fr + 2.4 + i * 0.1, K.Fr + 2.9 + i * 0.1)} />; })}
          {Array.from({ length: 7 }, (_, i) => <path key={'f' + i} d={`M ${MEMB_X - 120} ${500 + i * 110} l -140 0 m 30 -22 l -30 22 l 30 22`} stroke="#5fc6ff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={kprog(T, K.Fr + 0.4, K.Fr + 0.9) * (1 - kprog(T, frMacro - 0.6, frMacro))} />)}
        </SvgCapa>
      </Escena>
      {/* 8b · macro: tazón con hielo */}
      <Escena T={T} a={frMacro} b={K.Da} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Tazon x={540} y={1000} s={1.25} T={T}><HuevoEntero x={-60} y={20} s={0.45} rot={-12} color="#fbf8f0" /><HuevoEntero x={90} y={30} s={0.45} rot={14} color="#fbf8f0" /></Tazon>
        </SvgCapa>
      </Escena>
      {/* 9 · 7 horas: capa verde de hasta 1 mm */}
      <Escena T={T} a={K.Da} b={K.Ci} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <HuevoMitad x={760} y={960} s={1.05} anillo={1.4} grueso={klerp(0, 30, kprog(T, K.Da + 1.2, K.Da + 2.4))} clara={mixHex(CLARA, '#e2c79a', kprog(T, K.Da + 0.4, K.Da + 2.0))} />
          
        </SvgCapa>
        <Chip T={T} at={K.Da + 2.6} until={K.Ci - 0.2} texto="≈ 1 mm de FeS" x={770} y={1460} tam={44} borde={VERDE} />
      </Escena>
      {/* 10 · cierre: el huevo partido del inicio, ya explicado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="50% 55%">
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Tabla x={540} y={1010} />
          <HuevoMitad x={320} y={1000} s={0.95} rot={-8} />
          <HuevoMitad x={760} y={1000} s={0.95} rot={8} />
          <Marca x={880} y={760} ok s={0.9} o={kprog(T, K.Ci + 1.0, K.Ci + 1.4)} />
          <BarraEscala x={140} y={830} largo={150} texto="1 cm" />
        </SvgCapa>
      </Escena>

      {/* capítulos y medidores */}
      {(T < K.Pr - 0.1 || T >= K.Fr) && <Capitulo T={T} x={200} y={215} hasta={K.Da - 0.1} caps={[{ at: K.Q, titulo: 'El azufre' }, { at: K.Ga, titulo: 'El gas' }, { at: K.Re, titulo: 'El anillo' }, { at: K.Fr, titulo: 'El frío' }]} />}
      <Medidores T={T} at={K.Ga + 0.3} until={K.Pr - 0.3} minutos={minutos} termo={termo} />
      <Medidores T={T} at={K.Es + 0.6} until={K.Fr - 0.3} minutos={minutos} termo={termo} />
      <Medidores T={T} at={K.Fr + 0.3} until={K.Da - 0.3} termo={termo} />
      <Medidores T={T} at={K.Da + 0.1} until={K.Ci - 0.3} minutos={minutos} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 2.4} until={K.G + 3.4} texto="¿echado a perder?" x={330} y={520} tam={46} />
      <Chip T={T} at={K.G + 3.6} until={K.Q - 0.3} texto="sulfuro de hierro (FeS)" y={1460} tam={46} borde={VERDE} />
      <Etq T={T} at={K.Q + 0.6} until={K.Ga - 0.3} x={340} y={480} texto="clara: azufre (S)" lado="der" color={KC.ink} tam={36} />
      <Chip T={T} at={K.Q + 1.9} until={K.Ga - 0.3} texto="yema: hierro (Fe)" y={1460} tam={46} borde={FE_C} />
      <Chip T={T} at={K.Ga + 1.4} until={K.Vi - 0.3} texto="H₂S · sulfuro de hidrógeno" y={1460} tam={40} borde={H2S_C} />
      <Etq T={T} at={K.Vi + 0.3} until={K.Re + 0.4} x={60} y={380} texto="clara" color={KC.texto} tam={36} />
      <Etq T={T} at={K.Vi + 0.5} until={K.Re + 0.4} x={MEMB_X + 160} y={380} texto="yema" color={KC.yellow} tam={36} />
      <Etq T={T} at={K.Vi + 0.9} until={K.Re - 0.2} x={MEMB_X - 10} y={1440} texto="membrana" lado="izq" color={KC.texto} tam={32} />
      <Chip T={T} at={K.Re + 0.5} until={K.Re + 3.4} texto="H₂S + Fe → FeS" y={1460} tam={48} borde={VERDE} mono />
      <Chip T={T} at={K.Re + 3.6} until={K.Pr - 0.2} texto="solo en la superficie" y={1460} tam={44} borde={VERDE} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.2} anio="1920" quien="Tinkler y Soar · Londres" revista="Biochem J · King's College for Women" y={620} />
      <Chip T={T} at={K.Tr + 2.6} until={K.Fr - 0.3} texto="agua fría: casi igual" y={1460} tam={44} borde={KC.blue} />
      <Chip T={T} at={frMacro + 0.3} until={frMacro + 1.6} texto="no lo cuezas de más" y={1460} tam={44} borde={KC.red} />
      <Chip T={T} at={frMacro + 1.7} until={K.Da - 0.3} texto="agua fría al terminar" y={1460} tam={44} borde={KC.blue} />
      <Chip T={T} at={K.Ci + 0.3} until={K.Ou} texto="S de la clara + Fe de la yema → FeS" y={1460} tam={36} borde={VERDE} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="no hace daño" x={540} y={1640} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No está podrido: *es sulfuro de hierro.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Ga - 0.1} texto="Clara: *azufre.* Yema: *hierro.*" />
      <Subtitulo T={T} idx={2} at={K.Ga + 0.1} until={K.Vi - 0.1} texto="La clara suelta *sulfuro de hidrógeno.*" />
      <Subtitulo T={T} idx={3} at={K.Vi + 0.1} until={K.Re - 0.1} texto="El gas llega *a la yema.*" />
      <Subtitulo T={T} idx={4} at={K.Re + 0.1} until={K.Pr - 0.1} texto="Sulfuro ferroso: *verde oscuro.*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Por qué *a veces sale?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.Tr - 0.1} texto="Agua fría: *casi sin anillo.*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.Fr - 0.1} texto="30 minutos: *mucho más intenso.*" />
      <Subtitulo T={T} idx={8} at={K.Fr + 0.1} until={K.Da - 0.1} texto="No lo cuezas de más: *enfríalo.*" />
      <Subtitulo T={T} idx={9} at={K.Da + 0.1} until={K.Ci - 0.1} texto="7 horas: *hasta un milímetro.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No hace daño: *es química.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Gas + 0.8, CUES.Viaje - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Reaccion + 0.6, CUES.Pregunta - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Estudio + 3.5, CUES.Treinta - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Frio + 0.5, CUES.Dato - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Dato + 0.3, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="17" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HuevoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Huevo /></CompositionStage></div>;
}
window.HuevoApp = HuevoApp;
