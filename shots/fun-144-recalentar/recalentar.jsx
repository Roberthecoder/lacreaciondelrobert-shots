// Shot Fungi Mati #144 · Esos hongos recalentados no son veneno — NARRADO (gancho 1 «Esto no es X: es Y» + mito de la abuela, formato N2).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Reglas generales de inocuidad, no consejo médico.

const RC = { champ:'#e9d3ae', champ2:'#b98a55', champ3:'#7a4a2a', lam:'#8a5a44', plato:'#ffffff', plato2:'#d8d4cc', vidrio:'#1d2a33',
  barro:'#b8642f', barro2:'#8a4520', ladrillo:'#b5532c', fuego:'#ff8a1f', fuego2:'#ffe11a', toxina:'#b04bff', toxina2:'#e7a6ff',
  bac:'#8fd18a', arroz:'#fbf7ea', sopa:'#e2832b', frijol:'#5a2e1c', pasta:'#f2c94c', acero:'#c9d0d6', acero2:'#8d979f' };

// Rebanada de champiñón guisado (corte longitudinal): sombrero + pie, orilla dorada por la cocción.
function Rebanada({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -50 0 Q -54 -42 0 -46 Q 54 -42 50 0 Q 30 5 15 6 L 13 40 Q 0 47 -13 40 L -15 6 Q -30 5 -50 0 Z" fill={RC.champ} stroke={RC.champ3} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -42 -2 Q 0 -10 42 -2" stroke={RC.lam} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M -30 -30 Q 0 -40 26 -30" stroke="#fff" strokeWidth={5} fill="none" opacity=".45" strokeLinecap="round" />
  </g>;
}
const REB = [[-70, -10, 0.9, -14], [10, -24, 1, 8], [80, -6, 0.85, 20], [-30, 22, 0.95, -4], [50, 26, 0.8, -22], [-95, 26, 0.75, 16]];
// Plato con rebanadas. gira = ángulo (rad) del plato giratorio.
function Plato({ x, y, s = 1, gira = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse rx={190} ry={62} cy={14} fill={RC.plato2} stroke={KC.ink} strokeWidth={7} />
    <ellipse rx={190} ry={58} fill={RC.plato} stroke={KC.ink} strokeWidth={7} />
    <ellipse rx={130} ry={36} fill="#f1ede6" />
    {REB.map(([dx, dy, k, r], i) => { const a = gira + i; const ox = Math.cos(gira) * dx - Math.sin(gira) * dy * 2.4, oy = (Math.sin(gira) * dx * 0.3 + Math.cos(gira) * dy) * 0.55;
      return <Rebanada key={i} x={ox * 0.95} y={oy - 8} s={k * 0.95} rot={r + gira * 30} />; })}
  </g>;
}
// Vapor que sube.
function Vapor({ T, x, y, o = 1, n = 3, alto = 160 }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const dx = (i - (n - 1) / 2) * 60, f = T * 2 + i;
    return <path key={i} d={`M ${x + dx} ${y} q ${20 * Math.sin(f)} ${-alto / 3} 0 ${-alto / 2} t 0 ${-alto / 2}`} stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.55 + 0.25 * Math.sin(f * 1.3)} />; })}</g>;
}
// Microondas de frente. on = encendido (luz adentro), gira = ángulo del plato.
function Microondas({ T, x, y, w = 680, h = 420, on = 1, gira = 0, display = '0:45' }) {
  const vw = w * 0.66, vh = h * 0.7;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={34} fill="#f4efe4" stroke={KC.ink} strokeWidth={9} />
    <rect x={-w / 2 + 34} y={-vh / 2} width={vw} height={vh} rx={20} fill={on ? mixHex(RC.vidrio, '#ffcf6a', 0.55 * on) : RC.vidrio} stroke={KC.ink} strokeWidth={7} />
    <clipPath id="mwClip"><rect x={-w / 2 + 34} y={-vh / 2} width={vw} height={vh} rx={20} /></clipPath>
    <g clipPath="url(#mwClip)">
      <Plato x={-w / 2 + 34 + vw / 2} y={vh / 2 - 70} s={0.95} gira={gira} />
      <rect x={-w / 2 + 34} y={-vh / 2} width={vw} height={vh} fill="url(#mwBrillo)" opacity=".3" />
    </g>
    <defs><linearGradient id="mwBrillo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff" /><stop offset="40%" stopColor="#fff" stopOpacity="0" /></linearGradient></defs>
    <rect x={w / 2 - 150} y={-vh / 2} width={116} height={64} rx={10} fill="#0e1a12" stroke={KC.ink} strokeWidth={5} />
    <text x={w / 2 - 92} y={-vh / 2 + 46} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill="#5dff9a">{display}</text>
    {[0, 1, 2].map((r) => [0, 1].map((c) => <circle key={r + '_' + c} cx={w / 2 - 120 + c * 56} cy={-vh / 2 + 110 + r * 54} r={18} fill="#d9d2c4" stroke={KC.ink} strokeWidth={4} />))}
    <rect x={-w / 2 + 20} y={h / 2 - 4} width={60} height={20} rx={6} fill={KC.ink} /><rect x={w / 2 - 80} y={h / 2 - 4} width={60} height={20} rx={6} fill={KC.ink} />
  </g>;
}
// Abuela (silueta amable, sin cara real). (x, y) = pies.
function Abuela({ T, x, y, s = 1 }) {
  const m = Math.sin(T * 2.2) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m * 0.4})`}>
    <path d="M -110 0 L -80 -280 Q 0 -310 80 -280 L 110 0 Z" fill={KC.lilac} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -60 -250 Q 0 -230 60 -250 L 52 -150 Q 0 -140 -52 -150 Z" fill="#fff" opacity=".35" />
    <rect x={-22} y={-330} width={44} height={40} fill="#f1c9a5" stroke={KC.ink} strokeWidth={6} />
    <circle cy={-395} r={78} fill="#f1c9a5" stroke={KC.ink} strokeWidth={8} />
    <path d="M -80 -400 Q -84 -480 0 -478 Q 84 -480 80 -400 Q 60 -450 0 -448 Q -60 -450 -80 -400 Z" fill="#eeeeee" stroke={KC.ink} strokeWidth={6} />
    <circle cy={-488} r={34} fill="#eeeeee" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-30} cy={-398} r={22} fill="none" stroke={KC.ink} strokeWidth={6} /><circle cx={30} cy={-398} r={22} fill="none" stroke={KC.ink} strokeWidth={6} />
    <line x1={-8} y1={-398} x2={8} y2={-398} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-30} cy={-398} r={5} fill={KC.ink} /><circle cx={30} cy={-398} r={5} fill={KC.ink} />
    <path d="M -24 -352 Q 0 -336 24 -352" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <circle cx={-52} cy={-370} r={10} fill={KC.pink} opacity=".45" /><circle cx={52} cy={-370} r={10} fill={KC.pink} opacity=".45" />
    {/* brazo levantado con el dedo (advierte) */}
    <path d={`M 70 -260 Q 140 -300 150 ${-370 + m * 2}`} stroke={KC.lilac} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d={`M 70 -260 Q 140 -300 150 ${-370 + m * 2}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" opacity=".0" />
    <circle cx={150} cy={-378 + m * 2} r={20} fill="#f1c9a5" stroke={KC.ink} strokeWidth={6} />
    <rect x={143} y={-428 + m * 2} width={14} height={40} rx={7} fill="#f1c9a5" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Globo de diálogo (HTML).
function Globo({ T, at, until, x, y, w = 560, texto, tam = 50 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, width:w, zIndex:42, transform:`scale(${e.s})`, transformOrigin:'0% 100%', opacity:e.o }}>
    <div style={{ background:'#fff', border:`7px solid ${KC.ink}`, borderRadius:40, padding:'26px 34px', font:`900 ${tam}px/1.1 ${KF.texto}`, color:KC.ink, textAlign:'center', boxShadow:`10px 10px 0 ${KC.ink}` }}>{texto}</div>
    <svg width={120} height={90} style={{ position:'absolute', left:30, bottom:-80 }}><path d="M 10 0 L 30 80 L 90 0 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" /><rect x={14} y={0} width={72} height={10} fill="#fff" /></svg>
  </div>;
}
// Fogón de ladrillo con olla de barro (cocina antigua).
function Llamas({ T, x, y, s = 1, o = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>{[-50, -15, 20, 52].map((dx, i) => { const h = 70 + 22 * Math.sin(T * 9 + i * 1.7);
    return <g key={i}><path d={`M ${dx - 20} 0 Q ${dx - 22} ${-h * 0.5} ${dx} ${-h} Q ${dx + 22} ${-h * 0.5} ${dx + 20} 0 Z`} fill={RC.fuego} stroke={KC.ink} strokeWidth={4} />
      <path d={`M ${dx - 9} 0 Q ${dx - 10} ${-h * 0.3} ${dx} ${-h * 0.55} Q ${dx + 10} ${-h * 0.3} ${dx + 9} 0 Z`} fill={RC.fuego2} /></g>; })}</g>;
}
function OllaBarro({ x, y, s = 1, tapa = true }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -170 Q -175 -40 -110 0 L 110 0 Q 175 -40 150 -170 Z" fill={RC.barro} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -150 -170 Q -200 -150 -185 -110" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" /><path d="M 150 -170 Q 200 -150 185 -110" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
    <ellipse cy={-170} rx={156} ry={30} fill={RC.barro2} stroke={KC.ink} strokeWidth={7} />
    {tapa && <><ellipse cy={-180} rx={140} ry={26} fill={RC.barro} stroke={KC.ink} strokeWidth={7} /><circle cy={-210} r={16} fill={RC.barro2} stroke={KC.ink} strokeWidth={6} /></>}
    <path d="M -120 -120 Q -125 -60 -95 -30" stroke="#fff" strokeWidth={10} opacity=".3" fill="none" strokeLinecap="round" />
  </g>;
}
function Fogon({ T, x, y, w = 420, fuego = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={0} width={w} height={230} fill={RC.ladrillo} stroke={KC.ink} strokeWidth={8} />
    {[40, 90, 140, 190].map((yy, i) => <line key={i} x1={-w / 2} y1={yy} x2={w / 2} y2={yy} stroke="#7e3418" strokeWidth={5} />)}
    {[0, 1, 2, 3, 4].map((i) => [0, 1, 2, 3].map((r) => <line key={i + '_' + r} x1={-w / 2 + 50 + i * 80 + (r % 2) * 40} y1={r * 50 + (r ? -10 : 0)} x2={-w / 2 + 50 + i * 80 + (r % 2) * 40} y2={r * 50 + 40} stroke="#7e3418" strokeWidth={5} />))}
    <path d="M -80 230 L -80 140 Q 0 90 80 140 L 80 230 Z" fill="#2a120a" stroke={KC.ink} strokeWidth={7} />
    <Llamas T={T} x={0} y={225} s={0.7} o={fuego} />
  </g>;
}
// Refrigerador. abre 0..1 = puerta abierta (se ve el interior con repisas).
function Refri({ x, y, w = 300, h = 470, abre = 0, children }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h} width={w} height={h} rx={26} fill="#eef6fb" stroke={KC.ink} strokeWidth={8} />
    <rect x={-w / 2 + 16} y={-h + 16} width={w - 32} height={h - 32} rx={14} fill="#d6ecf7" stroke={KC.ink} strokeWidth={5} opacity={abre} />
    {[0.33, 0.62].map((k, i) => <line key={i} x1={-w / 2 + 20} y1={-h + h * k} x2={w / 2 - 20} y2={-h + h * k} stroke="#8fb3c4" strokeWidth={8} opacity={abre} />)}
    {children}
    <g transform={`translate(${-w / 2} 0) scale(${1 - abre * 0.92} 1)`}>
      <rect x={0} y={-h} width={w} height={h} rx={26} fill="#f7fbfd" stroke={KC.ink} strokeWidth={8} />
      <line x1={0} y1={-h * 0.62} x2={w} y2={-h * 0.62} stroke={KC.ink} strokeWidth={6} />
      <rect x={w - 40} y={-h + 50} width={14} height={90} rx={7} fill={KC.ink} /><rect x={w - 40} y={-h * 0.55} width={14} height={110} rx={7} fill={KC.ink} />
    </g>
  </g>;
}
// Recipiente bajito con tapa (para enfriar rápido).
function Recipiente({ x, y, s = 1, tapa = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -46 L 90 -46 L 78 0 L -78 0 Z" fill="rgba(220,240,255,.85)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-80} y={-36} width={160} height={26} rx={6} fill={RC.champ2} />
    {[-50, -10, 30, 60].map((dx, i) => <ellipse key={i} cx={dx} cy={-34} rx={18} ry={8} fill={RC.champ} stroke={RC.champ3} strokeWidth={3} />)}
    <g transform={`translate(0 ${-(1 - tapa) * 60}) rotate(${(1 - tapa) * -12})`} opacity={tapa > 0 ? 1 : 0}><rect x={-96} y={-60} width={192} height={18} rx={8} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} /></g>
  </g>;
}
// Sartén con rebanadas.
function Sarten({ T, x, y, s = 1, chis = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={200} y={-22} width={250} height={36} rx={18} fill="#2b2b2b" stroke={KC.ink} strokeWidth={7} />
    <ellipse rx={230} ry={78} cy={10} fill="#3a3a3a" stroke={KC.ink} strokeWidth={8} />
    <ellipse rx={200} ry={60} fill="#232323" />
    {REB.map(([dx, dy, k, r], i) => <Rebanada key={i} x={dx * 1.2} y={dy * 0.9 + 6 + Math.sin(T * 14 + i) * 2 * chis} s={k} rot={r} />)}
    {chis > 0 && Array.from({ length: 8 }, (_, i) => { const u = ((T * 1.7 + i * 0.37) % 1); return <circle key={i} cx={-160 + i * 45} cy={-20 - u * 70} r={4} fill="#fff" opacity={(1 - u) * 0.8 * chis} />; })}
  </g>;
}
// Termómetro de cocina de carátula con varilla. valor °C (0..100 en la carátula).
function TermoPinche({ x, y, valor, r = 100, largo = 220 }) {
  const a = -220 + 260 * kclamp(valor / 100, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-8} y={r - 6} width={16} height={largo} rx={8} fill={RC.acero} stroke={KC.ink} strokeWidth={5} />
    <circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <circle r={r - 14} fill="none" stroke={RC.acero2} strokeWidth={4} />
    {[0, 25, 50, 75, 100].map((c) => { const b = (-220 + 2.6 * c) * Math.PI / 180; return <line key={c} x1={Math.cos(b) * (r - 18)} y1={Math.sin(b) * (r - 18)} x2={Math.cos(b) * (r - 34)} y2={Math.sin(b) * (r - 34)} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={0} y1={0} x2={Math.cos(a * Math.PI / 180) * (r - 26)} y2={Math.sin(a * Math.PI / 180) * (r - 26)} stroke={KC.red} strokeWidth={8} strokeLinecap="round" />
    <circle r={10} fill={KC.ink} />
    <text y={r * 0.55} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>{Math.round(valor)}°C</text>
  </g>;
}
// Tazón con comida: 'arroz' | 'sopa' | 'frijoles' | 'pasta' | 'hongos'.
function Tazon({ x, y, s = 1, tipo = 'arroz', seed = 3 }) {
  const g = krng(seed);
  const cont = tipo === 'arroz' ? RC.arroz : tipo === 'sopa' ? RC.sopa : tipo === 'frijoles' ? '#7a3b22' : tipo === 'pasta' ? RC.pasta : RC.champ2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -40 Q -150 90 0 100 Q 150 90 150 -40 Z" fill="#f6f1e6" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 40 Q 0 70 120 40" stroke={KC.cyan} strokeWidth={10} fill="none" opacity=".7" />
    <ellipse cy={-40} rx={150} ry={36} fill={cont} stroke={KC.ink} strokeWidth={7} />
    {tipo === 'arroz' && <>{Array.from({ length: 30 }, (_, i) => <ellipse key={i} cx={(g() - 0.5) * 240} cy={-58 + (g() - 0.5) * 30 - 10} rx={11} ry={5} transform={`rotate(${g() * 180})`} fill="#fff" stroke="#c9c2b0" strokeWidth={2} />)}
      <path d="M -150 -40 Q 0 -110 150 -40" fill={RC.arroz} stroke={KC.ink} strokeWidth={7} /></>}
    {tipo === 'frijoles' && Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={(g() - 0.5) * 230} cy={-40 + (g() - 0.5) * 34} rx={13} ry={8} fill={RC.frijol} stroke={KC.ink} strokeWidth={2} />)}
    {tipo === 'pasta' && Array.from({ length: 8 }, (_, i) => <path key={i} d={`M ${-110 + i * 30} -40 q 15 -24 30 0 t 30 0`} stroke="#c9952a" strokeWidth={8} fill="none" />)}
    {tipo === 'sopa' && <><circle cx={-40} cy={-44} r={12} fill="#ffd27a" /><circle cx={50} cy={-36} r={9} fill="#ffd27a" /></>}
    {tipo === 'hongos' && [-70, -10, 50].map((dx, i) => <Rebanada key={i} x={dx} y={-34} s={0.6} rot={(i - 1) * 15} />)}
  </g>;
}
// Cereulida esquemática: anillo de 12 eslabones (es un dodecadepsipéptido cíclico).
function Cereulida({ T, x, y, r = 70, brillo = 1, o = 1, s = 1 }) {
  if (o <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${T * 12})`} opacity={o} style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${RC.toxina})` } : null}>
    <circle r={r} fill="none" stroke={RC.toxina} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r} r={r * 0.2} fill={i % 2 ? RC.toxina : RC.toxina2} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Colonia de bacilos que se duplican: n = cuántos (1..32). muerte 0..1 = el calor los apaga.
const POS32 = Array.from({ length: 32 }, (_, i) => { const a = i * 2.39996, rr = 60 * Math.sqrt(i + 0.5); return [Math.cos(a) * rr * 1.25, Math.sin(a) * rr * 0.8, (i * 47) % 180]; });
function Colonia32({ T, x, y, n, muerte = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{POS32.slice(0, n).map(([dx, dy, r], i) =>
    <Bacteria key={i} T={T} x={dx} y={dy} largo={110} ancho={40} rot={r} seed={i + 2} flagelo={false} color={mixHex(RC.bac, '#6b6b6b', muerte)} opacidad={1 - muerte * 0.35} />)}</g>;
}

function RecalentarShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ab: CUES.Abuela, Or: CUES.Origen, Bq: CUES.Banquete, Tb: CUES.Tibio, P: CUES.Pregunta, To: CUES.Toxina, Ca: CUES.Calor,
    En: CUES.Enfriar, Rf: CUES.Refri, Rc: CUES.Recalentar, Ar: CUES.Arroz, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const gira = T * 1.6;
  // bacterias del guiso tibio: 1 → 32 (se duplican)
  const nDup = (t0, t1) => Math.min(32, Math.pow(2, Math.floor(kprog(T, t0, t1) * 5.999)));
  const temp = klerp(20, 121, kprog(T, K.To + 2.3, K.To + 4.4, kEase.suave));
  const muerte = kprog(T, K.Ca + 0.2, K.Ca + 1.4);
  const llena = kprog(T, K.En + 1.0, K.En + 2.0), entra = kprog(T, K.En + 3.0, K.En + 4.0, kEase.suave);
  const t74 = klerp(20, 74, kprog(T, K.Rc + 0.4, K.Rc + 2.2, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: hongos recalentados en el microondas */}
      <Escena T={T} a={K.G} b={K.Ab} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Microondas T={T} x={470} y={900} on={kprog(T, K.G, K.G + 0.3)} gira={gira} display={`0:${String(45 - Math.min(45, Math.floor(T * 2))).padStart(2, '0')}`} />
          <Vapor T={T} x={420} y={660} o={kprog(T, K.G + 0.4, K.G + 1.2)} />
        </>)}
      </Escena>
      {/* 1 · la abuela */}
      <Escena T={T} a={K.Ab} b={K.Or} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Abuela T={T} x={250} y={1130} s={1.05} />)}
      </Escena>
      {/* 2 · cocina sin refrigerador */}
      <Escena T={T} a={K.Or} b={K.Bq} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={60} y={560} width={420} height={18} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
          {[110, 200, 290, 390].map((xx, i) => <g key={i}><rect x={xx} y={490 - (i % 2) * 20} width={56} height={70 + (i % 2) * 20} rx={10} fill={['#b8642f', '#e9d3ae', '#9ad0c2', '#b8642f'][i]} stroke={KC.ink} strokeWidth={5} /></g>)}
          <Fogon T={T} x={360} y={900} />
          <OllaBarro x={360} y={900} s={0.9} />
          <Vapor T={T} x={360} y={700} o={0.8} n={2} alto={120} />
          {(() => { const o = kprog(T, K.Or + 0.9, K.Or + 1.4); return <g opacity={o}>
            <rect x={700} y={640} width={290} height={480} rx={26} fill="rgba(255,255,255,.25)" stroke={KC.ink} strokeWidth={7} strokeDasharray="22 16" />
            <path d={`M 760 790 L 930 970 M 930 790 L 760 970`} stroke={KC.red} strokeWidth={22} strokeLinecap="round" strokeDasharray={`${300 * kprog(T, K.Or + 1.4, K.Or + 1.9)} 999`} />
          </g>; })()}
        </>)}
      </Escena>
      {/* 3 · mucha agua: un caldo para las bacterias (champiñón partido) */}
      <Escena T={T} a={K.Bq} b={K.Tb} zoom={0.1} origen="55% 60%">
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Champinon x={600} y={1090} s={2.0} />
          {Array.from({ length: 14 }, (_, i) => { const g = krng(i + 11); const sx = 380 + g() * 440, sy = 630 + g() * 300; const p = kprog(T, K.Bq + 0.2 + i * 0.08, K.Bq + 0.6 + i * 0.08, kEase.rebote);
            return p > 0 ? <path key={i} transform={`translate(${sx} ${sy + Math.sin(T * 3 + i) * 6}) scale(${p})`} d="M 0 -22 Q 16 0 12 10 Q 0 22 -12 10 Q -16 0 0 -22 Z" fill="#7fd8ff" stroke={KC.ink} strokeWidth={4} /> : null; })}
          {Array.from({ length: 6 }, (_, i) => { const p = kprog(T, K.Bq + 1.8 + i * 0.15, K.Bq + 2.2 + i * 0.15, kEase.rebote);
            return p > 0 ? <rect key={i} x={430 + i * 62} y={600 + (i % 2) * 26} width={30 * p} height={13 * p} rx={6} fill={RC.bac} stroke={KC.ink} strokeWidth={3} transform={`rotate(${i * 30} ${445 + i * 62} ${606 + (i % 2) * 26})`} /> : null; })}
        </>)}
      </Escena>
      {/* 4 · AL MICROSCOPIO: tibio por horas, se duplican y dejan toxinas */}
      <Escena T={T} a={K.Tb} b={K.P} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.dark }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Colonia32 T={T} x={540} y={880} n={nDup(K.Tb + 0.3, K.Tb + 3.0)} />
          {Array.from({ length: 10 }, (_, i) => { const p = kprog(T, K.Tb + 2.0 + i * 0.12, K.Tb + 2.4 + i * 0.12, kEase.rebote); const a = i * 1.7, rr = 120 + (i % 3) * 90;
            return p > 0 ? <Cereulida key={i} T={T} x={540 + Math.cos(a) * rr * 1.3} y={900 + Math.sin(a) * rr * 0.9} r={16} s={p} brillo={0.8} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · re-gancho: ¿y si lo recalientas fuerte? */}
      <Escena T={T} a={K.P} b={K.To} zoom={0.08}>
        <FondoLunares color={KC.orange} />
        {fsvg(<><Fogon T={T} x={270} y={900} w={380} fuego={1} /><OllaBarro x={270} y={900} s={0.8} /><Vapor T={T} x={270} y={720} o={1} n={3} alto={140} />
          <Interrogacion T={T} x={300} y={660} tam={300} color={KC.yellow} /></>)}
      </Escena>
      {/* 6–7 · la toxina del vómito de Bacillus cereus (ejemplo: arroz) aguanta 121 °C 30 min; el calor mata a las bacterias, no a la toxina */}
      <Escena T={T} a={K.To} b={K.En} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <Tazon x={360} y={1010} s={1.15} tipo="arroz" />
          <Colonia32 T={T} x={360} y={925} s={0.42} n={T < K.To + 0.2 ? 0 : 32} muerte={muerte} />
          {[[300, 905], [420, 915], [360, 885]].map(([xx, yy], i) => <Cereulida key={i} T={T} x={xx} y={yy} r={14} brillo={1} o={kprog(T, K.To + 0.6, K.To + 1.0)} />)}
          <Cereulida T={T} x={300} y={720} r={72} brillo={1} o={kprog(T, K.To + 1.0, K.To + 1.5)} s={1 + 0.06 * Math.sin(T * 4)} />
          {muerte > 0 && Array.from({ length: 8 }, (_, i) => <Llamas key={i} T={T + i} x={150 + i * 60} y={1150} s={0.35} o={muerte * (1 - kprog(T, K.En - 0.6, K.En))} />)}
        </>)}
      </Escena>
      {/* 8 · enfriar rápido: al refri antes de 2 h, en recipientes bajitos */}
      <Escena T={T} a={K.En} b={K.Rf} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {T < K.En + 1.3 && <g opacity={1 - kprog(T, K.En + 1.0, K.En + 1.3)}><OllaBarro x={300} y={1080} s={0.8} tapa={false} /></g>}
          <Refri x={830} y={1130} w={300} h={420} abre={kprog(T, K.En + 2.4, K.En + 3.0, kEase.sale) * (1 - kprog(T, K.En + 4.4, K.En + 4.9))}>
            {[0, 1, 2].map((i) => entra > 0 ? <Recipiente key={i} x={830 - 830 + klerp(0, 0, entra)} y={-420 + 130 + i * 110} s={0.7 * entra} /> : null)}
          </Refri>
          {[0, 1, 2].map((i) => { const p = kprog(T, K.En + 1.0 + i * 0.25, K.En + 1.5 + i * 0.25, kEase.rebote); if (p <= 0 || entra >= 1) return null;
            const x0 = 160 + i * 190, y0 = 1110, x1 = 830, y1 = 1130 - 420 + 130 + i * 110;
            return <Recipiente key={i} x={klerp(x0, x1, entra)} y={klerp(y0, y1, entra)} s={p * klerp(1, 0.7, entra)} tapa={kprog(T, K.En + 2.0 + i * 0.15, K.En + 2.3 + i * 0.15)} />; })}
        </>)}
      </Escena>
      {/* 9 · refri a máximo 4 °C y comerlos en 24 h */}
      <Escena T={T} a={K.Rf} b={K.Rc} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#cfeefc' }}></div>
        {fsvg(<>
          <rect x={60} y={400} width={960} height={800} rx={40} fill="#e8f7ff" stroke={KC.ink} strokeWidth={9} />
          {[760, 990].map((yy, i) => <rect key={i} x={80} y={yy} width={920} height={16} rx={6} fill="#9cc7da" stroke={KC.ink} strokeWidth={4} />)}
          <Recipiente x={300} y={988} s={1.2} /><Recipiente x={560} y={988} s={1.2} /><Recipiente x={820} y={988} s={1.2} />
          <Tazon x={260} y={710} s={0.5} tipo="sopa" /><Tazon x={760} y={712} s={0.5} tipo="frijoles" />
          {Array.from({ length: 12 }, (_, i) => { const g = krng(i + 40); return <path key={i} transform={`translate(${100 + g() * 880} ${440 + g() * 720}) rotate(${T * 20 + i * 30})`} d="M -10 0 L 10 0 M 0 -10 L 0 10 M -7 -7 L 7 7 M 7 -7 L -7 7" stroke="#fff" strokeWidth={4} opacity=".8" />; })}
        </>)}
      </Escena>
      {/* 10 · recalentar a 74 °C por dentro, una sola vez */}
      <Escena T={T} a={K.Rc} b={K.Ar} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Llamas T={T} x={400} y={1090} s={1.2} />
          <Sarten T={T} x={400} y={990} s={1.05} />
          <TermoPinche x={720} y={800} valor={t74} r={100} largo={200} />
        </>)}
      </Escena>
      {/* 11 · la regla es de todas las sobras */}
      <Escena T={T} a={K.Ar} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {[['hongos', 250, 760], ['arroz', 560, 760], ['sopa', 200, 1010], ['frijoles', 540, 1010], ['pasta', 880, 1010]].map(([tp, xx, yy], i) => { const p = kprog(T, K.Ar + 0.3 + i * 0.3, K.Ar + 0.7 + i * 0.3, kEase.rebote);
            return p > 0 ? <Tazon key={tp} x={xx} y={yy} s={0.8 * p} tipo={tp} seed={i + 3} /> : null; })}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo microondas, con las reglas pegadas */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Microondas T={T} x={470} y={900} on={1} gira={gira} display="0:45" />
          <Vapor T={T} x={420} y={660} o={0.9} />
        </>)}
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.6} until={K.Ab - 0.3} texto="¿veneno?" x={300} y={560} tam={64} />
      <Chip T={T} at={K.G + 2.6} until={K.Ab - 0.3} texto="el peligro: horas tibio" x={330} y={690} tam={40} borde={KC.red} />
      <Etq T={T} at={K.G + 1.0} until={K.Ab - 0.3} x={60} y={1290 - 70} texto="champiñón · Agaricus bisporus" tam={26} color={KC.ink} />
      <Globo T={T} at={K.Ab + 0.3} until={K.Or - 0.3} x={420} y={700} w={600} texto="«Los hongos no se recalientan»" tam={50} />
      <Sello T={T} at={K.Ab + 2.2} x={200} y={560} texto="MITO" color={KC.red} r={95} />
      <Chip T={T} at={K.Or + 0.3} until={K.Bq - 0.3} texto="antes, sin refrigerador" x={540} y={420} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Or + 2.0} until={K.Bq - 0.3} texto="probablemente" x={845} y={640} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.Or + 1.4} until={K.Bq - 0.3} x={700} y={1150} texto="refri: no había" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Bq + 0.4} until={K.Tb - 0.3} texto="mucha agua" x={620} y={470} tam={44} borde={KC.cyan} />
      <Etq T={T} at={K.Bq + 1.9} until={K.Tb - 0.3} x={380} y={540} texto="bacterias" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Tb + 0.1} until={K.P - 0.3} texto="AL MICROSCOPIO · TIBIO POR HORAS" x={540} y={430} tam={32} borde={KC.cyan} mono />
      <Cronometro T={T} at={K.Tb + 0.3} until={K.P - 0.3} factor={1800} x={540} y={560} etiqueta="TIEMPO TIBIO (time-lapse)" />
      {T > K.Tb + 0.3 && T < K.P - 0.3 && <Contador T={T} at={K.Tb + 0.3} desde={nDup(K.Tb + 0.3, K.Tb + 3.0)} hasta={nDup(K.Tb + 0.3, K.Tb + 3.0)} dur={0.01} sufijo=" bacterias" x={540} y={660} tam={44} color={RC.bac} />}
      <Etq T={T} at={K.Tb + 2.2} until={K.P - 0.3} x={60} y={1130} texto="● toxinas" tam={32} color={RC.toxina2} />
      <TarjetaEstudio T={T} at={K.To + 0.2} until={K.To + 2.0} anio="FDA" quien="Bad Bug Book · 2.ª ed." revista="manual de la FDA de EE. UU., 2012" x={540} y={560} />
      <Etq T={T} at={K.To + 0.4} until={K.Ca - 0.3} x={560} y={960} texto="Bacillus cereus" it tam={30} color={RC.bac} />
      <Chip T={T} at={K.To + 0.5} until={K.Ca - 0.3} texto="ejemplo: arroz" x={720} y={1060} tam={30} borde={KC.yellow} />
      <Etq T={T} at={K.To + 1.3} until={K.En - 0.3} x={400} y={720} texto="cereulida · toxina del vómito" tam={28} color={RC.toxina2} />
      <NumeroGigante T={T} at={K.To + 2.3} until={K.Ca - 0.3} valor={121} dur={2.0} sufijo=" °C" x={420} y={530} tam={120} color={KC.red} />
      <Chip T={T} at={K.To + 4.4} until={K.Ca - 0.3} texto="30 min a 121 °C: sigue intacta" x={540} y={830} tam={34} borde={RC.toxina} />
      <Chip T={T} at={K.Ca + 0.4} until={K.En - 0.3} texto="bacterias: mueren" x={540} y={440} tam={40} borde={RC.bac} />
      <Chip T={T} at={K.Ca + 1.4} until={K.En - 0.3} texto="toxina ya hecha: se queda" x={540} y={540} tam={40} borde={RC.toxina} />
      <NumeroGigante T={T} at={K.En + 0.2} until={K.Rf - 0.3} valor={2} dur={0.4} sufijo=" h" etiqueta="al refri antes de" x={330} y={560} tam={170} color={KC.yellow} />
      <Chip T={T} at={K.En + 1.4} until={K.Rf - 0.3} texto="recipientes bajitos" x={330} y={820} tam={36} borde={KC.ink} />
      <Etq T={T} at={K.En + 0.6} until={K.Rf - 0.3} x={60} y={700} texto="FDA (EE. UU.), 2024" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.Rf + 0.3} until={K.Rc - 0.3} valor={4} dur={0.5} prefijo="≤ " sufijo=" °C" etiqueta="refri a máximo" x={540} y={560} tam={150} color={KC.cyan} />
      <Chip T={T} at={K.Rf + 2.4} until={K.Rc - 0.3} texto="comerlos en 24 h" x={540} y={860} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.Rf + 0.8} until={K.Rc - 0.3} x={90} y={1100} texto="Verbraucherzentrale NRW (Alemania), 2025" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Rc + 2.3} until={K.Ar - 0.3} texto="74 °C por dentro · FDA" x={330} y={520} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Rc + 3.3} until={K.Ar - 0.3} texto="1 sola vez" x={330} y={620} tam={44} borde={KC.gold} />
      <Etq T={T} at={K.Rc + 3.5} until={K.Ar - 0.3} x={60} y={700} texto="Verbraucherzentrale Bremen, 2025" tam={24} color={KC.ink} />
      <Chip T={T} at={K.Ar + 0.2} until={K.C - 0.3} texto="todas las sobras" x={340} y={500} tam={48} borde={KC.ink} />
      <MitoTachado T={T} at={K.C + 0.1} tacharEn={K.C + 0.5} until={K.Ou} texto="¿veneno?" x={300} y={470} tam={52} />
      {['2 h · al refri', '≤ 4 °C · 24 h', '74 °C · 1 vez'].map((t, i) => <Chip key={i} T={T} at={K.C + 1.0 + i * 0.5} until={K.Ou} texto={t} x={300} y={580 + i * 84} tam={34} borde={[KC.yellow, KC.cyan, KC.red][i]} />)}
      <Etq T={T} at={K.C + 2.6} until={K.Ou} x={60} y={1500} texto="Reglas generales de inocuidad. Dibujo esquemático." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ab} texto="10 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.Bq} until={K.Tb} texto="2 cm" largo={140} color={KC.ink} />
      <BarraEscala T={T} at={K.Tb} until={K.P} texto="2 µm (esquemático)" largo={74} />
      <BarraEscala T={T} at={K.To} until={K.En} texto="tazón ≈ 15 cm · toxina: esquemática" largo={0} />
      <BarraEscala T={T} at={K.Rc} until={K.Ar} texto="10 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={150} y={1600} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ab - 0.1} texto="No son veneno: *el peligro es lo tibio.*" />
      <Subtitulo T={T} idx={1} at={K.Ab + 0.1} until={K.Or - 0.1} texto="«Los hongos *no se recalientan*»" />
      <Subtitulo T={T} idx={2} at={K.Or + 0.1} until={K.Bq - 0.1} texto="Viene de cuando *no había refri.*" />
      <Subtitulo T={T} idx={3} at={K.Bq + 0.1} until={K.Tb - 0.1} texto="Mucha agua: *caldo para bacterias.*" />
      <Subtitulo T={T} idx={4} at={K.Tb + 0.1} until={K.P - 0.1} texto="Horas tibio: *se multiplican.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.To - 0.1} texto="¿Y si lo *recalientas fuerte?*" />
      <Subtitulo T={T} idx={6} at={K.To + 0.1} until={K.Ca - 0.1} texto="Su toxina aguanta *121 °C media hora.*" />
      <Subtitulo T={T} idx={7} at={K.Ca + 0.1} until={K.En - 0.1} texto="Muere la bacteria, *no su toxina.*" />
      <Subtitulo T={T} idx={8} at={K.En + 0.1} until={K.Rf - 0.1} texto="Al refri *antes de 2 horas.*" />
      <Subtitulo T={T} idx={9} at={K.Rf + 0.1} until={K.Rc - 0.1} texto="Máximo 4 °C y *en 24 horas.*" />
      <Subtitulo T={T} idx={10} at={K.Rc + 0.1} until={K.Ar - 0.1} texto="74 °C por dentro, *una sola vez.*" />
      <Subtitulo T={T} idx={11} at={K.Ar + 0.1} until={K.C - 0.1} texto="La regla es de *todas las sobras.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo peligroso es *dejarlos tibios.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Ab + 0.2, K.Or - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Bq + 0.2, K.Tb - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.P + 0.05, K.To + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.To + 2.2, K.Ca - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.En + 0.3, K.Rf - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Rc + 0.6, K.Ar - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ar + 0.2, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="144" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RecalentarApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><RecalentarShot /></CompositionStage></div>;
}
window.RecalentarApp = RecalentarApp;
