// Shot IA #18 · Una IA ve en tu retina lo que los oftalmólogos no saben ver — NARRADO (N1 "Por dentro": del ojo a la foto de la retina).
// Datos: Poplin et al., Nature Biomedical Engineering 2(3):158–164 (2018); Korot et al., Sci Rep (2021); Abràmoff et al., npj Digit Med (2018).
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const RET = { fondo1:'#f0793a', fondo2:'#b8361c', borde:'#5a1408', vena:'#7d150d', arteria:'#c92e1c', disco:'#ffe0a3', macula:'#8a2412', verde:'#39ff9a' };
const PIEL = '#f1b48f', PIEL2 = '#d98f6b';

// ---------- vasos de la retina (precalculados, en unidades de r = 1) ----------
function bez(p0, p1, p2, p3, t) { const u = 1 - t; return [u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0], u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]]; }
const VASOS = (() => {
  const r = krng(18), D = [0.42, -0.02], out = [];
  const main = (sy, k, w) => { // arcadas temporales (rodean la mácula) y ramas nasales
    const arcs = [
      [D, [0.30, -0.36 * sy], [-0.25, -0.52 * sy], [-0.92, -0.30 * sy]],
      [D, [0.22, -0.18 * sy], [-0.05, -0.30 * sy], [-0.55, -0.12 * sy]],
      [D, [0.62, -0.30 * sy], [0.78, -0.55 * sy], [0.86, -0.62 * sy]],
      [D, [0.70, -0.08 * sy], [0.90, -0.18 * sy], [1.0, -0.22 * sy]],
    ];
    arcs.forEach((a, ai) => {
      out.push({ d: `M ${a[0][0]} ${a[0][1]} C ${a[1][0]} ${a[1][1]} ${a[2][0]} ${a[2][1]} ${a[3][0]} ${a[3][1]}`, w: (ai === 0 ? 1 : 0.7) * w, k });
      const nb = ai === 0 ? 5 : 3;
      for (let b = 0; b < nb; b++) {
        const t = 0.25 + (b / nb) * 0.7, p = bez(...a, t), q = bez(...a, Math.min(1, t + 0.02));
        const nx = -(q[1] - p[1]), ny = q[0] - p[0], L = Math.hypot(nx, ny) || 1, side = (b % 2 ? 1 : -1) * (ai === 0 ? 1 : -1);
        const len = 0.14 + r() * 0.16, ex = p[0] + (nx / L) * len * side + (q[0] - p[0]) * 4, ey = p[1] + (ny / L) * len * side + (q[1] - p[1]) * 4;
        out.push({ d: `M ${p[0]} ${p[1]} Q ${(p[0] + ex) / 2 + (r() - 0.5) * 0.08} ${(p[1] + ey) / 2 + (r() - 0.5) * 0.08} ${ex} ${ey}`, w: w * 0.45, k });
      }
    });
  };
  main(1, 'vena', 0.032); main(-1, 'vena', 0.032);
  // arterias: un poco desplazadas y más finas
  out.slice().forEach((v) => out.push({ d: v.d.replace(/(-?\d*\.?\d+) (-?\d*\.?\d+)/g, (m, a, b) => `${(+a + 0.025).toFixed(3)} ${(+b + 0.03).toFixed(3)}`), w: v.w * 0.7, k: 'arteria' }));
  return out;
})();

// Foto del fondo de ojo (retina). calor: null | 'vasos' | 'disco' (mapa de atención, 0..1 en fuerza); gris 0..1.
function Retina({ id, x, y, r, T = 0, calor = null, fuerza = 1, gris = 0, o = 1, etiquetas = 0 }) {
  const D = [0.42 * r, -0.02 * r];
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <defs>
      <radialGradient id={`rg${id}`} cx="45%" cy="48%" r="60%"><stop offset="0" stopColor={RET.fondo1} /><stop offset="0.75" stopColor={RET.fondo2} /><stop offset="1" stopColor="#5e160b" /></radialGradient>
      <radialGradient id={`rd${id}`}><stop offset="0" stopColor="#fff6dc" /><stop offset="0.6" stopColor={RET.disco} /><stop offset="1" stopColor="#f2a95e" stopOpacity="0" /></radialGradient>
      <radialGradient id={`rm${id}`}><stop offset="0" stopColor="#5a1508" stopOpacity=".85" /><stop offset="1" stopColor="#5a1508" stopOpacity="0" /></radialGradient>
      <clipPath id={`rc${id}`}><circle r={r} /></clipPath>
      <filter id={`rb${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={r * 0.035} /></filter>
    </defs>
    <circle r={r + 14} fill="#0b0b0e" />
    <g clipPath={`url(#rc${id})`} style={{ filter: `grayscale(${gris})` }}>
      <circle r={r} fill={`url(#rg${id})`} />
      <circle cx={-0.05 * r} cy={0.02 * r} r={r * 0.2} fill={`url(#rm${id})`} />
      <circle cx={D[0]} cy={D[1]} r={r * 0.2} fill={`url(#rd${id})`} />
      <g transform={`scale(${r})`}>
        {VASOS.map((v, i) => <path key={i} d={v.d} fill="none" stroke={v.k === 'vena' ? RET.vena : RET.arteria} strokeWidth={v.w} strokeLinecap="round" />)}
      </g>
      <circle cx={D[0]} cy={D[1]} r={r * 0.1} fill={RET.disco} opacity=".9" />
    </g>
    {calor === 'vasos' && fuerza > 0 && <g clipPath={`url(#rc${id})`} opacity={fuerza * (0.75 + 0.25 * Math.sin(T * 5))}>
      <g transform={`scale(${r})`} filter={`url(#rb${id})`}>{VASOS.filter((v) => v.k === 'vena').map((v, i) => <path key={i} d={v.d} fill="none" stroke={RET.verde} strokeWidth={v.w * 2.6} strokeLinecap="round" />)}</g>
    </g>}
    {calor === 'disco' && fuerza > 0 && <g opacity={fuerza * (0.8 + 0.2 * Math.sin(T * 5))}>
      <circle cx={D[0]} cy={D[1]} r={r * 0.24} fill={RET.verde} filter={`url(#rb${id})`} opacity=".85" />
      <circle cx={D[0]} cy={D[1]} r={r * 0.27} fill="none" stroke={RET.verde} strokeWidth={6} strokeDasharray="14 10" transform={`rotate(${T * 40} ${D[0]} ${D[1]})`} />
    </g>}
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={Math.max(4, r * 0.03)} />
  </g>;
}

// Ojo de frente, con párpados que parpadean. dentro: 0..1 brillo verde en la pupila (cierre).
function Ojo({ x, y, s = 1, T = 0, parpadeo = 0, dentro = 0, mira = 0 }) {
  const cierra = 1 - parpadeo * 0.94, ix = mira * 30;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={10} rx={400} ry={290} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -300 -210 Q 0 -330 310 -200" stroke="#4a2c1a" strokeWidth={46} fill="none" strokeLinecap="round" />
    <g transform={`scale(1 ${cierra})`}>
      <defs><clipPath id="ojoClip"><path d="M -300 0 Q 0 -250 300 0 Q 0 250 -300 0 Z" /></clipPath></defs>
      <path d="M -300 0 Q 0 -250 300 0 Q 0 250 -300 0 Z" fill="#fffdf7" />
      <g clipPath="url(#ojoClip)">
        <circle cx={ix} cy={0} r={128} fill="#7a4a22" stroke={KC.ink} strokeWidth={6} />
        {Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2; return <line key={i} x1={ix + Math.cos(a) * 60} y1={Math.sin(a) * 60} x2={ix + Math.cos(a) * 122} y2={Math.sin(a) * 122} stroke="#a8692f" strokeWidth={5} />; })}
        <circle cx={ix} cy={0} r={58} fill="#0c0c10" />
        {dentro > 0 && <><circle cx={ix} cy={0} r={52} fill={RET.fondo2} opacity={dentro} />
          <circle cx={ix} cy={0} r={52} fill={RET.verde} opacity={dentro * (0.35 + 0.2 * Math.sin(T * 5))} /></>}
        <circle cx={ix - 34} cy={-38} r={20} fill="#fff" opacity=".9" />
      </g>
      <path d="M -300 0 Q 0 -250 300 0 Q 0 250 -300 0 Z" fill="none" stroke={KC.ink} strokeWidth={9} />
      {Array.from({ length: 9 }, (_, i) => { const t = 0.12 + i * 0.095, px = klerp(-300, 300, t), py = -250 * 2 * t * (1 - t) * 1; return <line key={i} x1={px} y1={py} x2={px + (t - 0.5) * 40} y2={py - 34} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />; })}
    </g>
    {parpadeo > 0.02 && <path d={`M -300 0 Q 0 ${-250 * cierra * 1.02} 300 0`} fill="none" stroke={PIEL2} strokeWidth={10} />}
  </g>;
}

// Corte de lado del ojo con la cámara de fondo de ojo y el haz que entra por la pupila. haz 0..1.
function CorteOjo({ x, y, s = 1, T = 0, haz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* cámara */}
    <rect x={-560} y={-90} width={190} height={180} rx={24} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <rect x={-380} y={-50} width={70} height={100} rx={12} fill="#1b2130" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-510} cy={-50} r={12} fill={KC.red} />
    {/* haz de luz */}
    {haz > 0 && <path d={`M -310 -36 L ${klerp(-310, -255, Math.min(1, haz * 3))} -22 L ${klerp(-310, 240, haz)} ${klerp(-36, -150, haz)} L ${klerp(-310, 240, haz)} ${klerp(36, 150, haz)} L ${klerp(-310, -255, Math.min(1, haz * 3))} 22 L -310 36 Z`} fill={KC.yellow} opacity={0.55 + 0.15 * Math.sin(T * 8)} />}
    {/* globo ocular */}
    <circle r={250} fill="#fffdf7" stroke={KC.ink} strokeWidth={9} />
    <path d="M -238 -78 Q -300 0 -238 78" fill="rgba(160,220,255,.5)" stroke={KC.ink} strokeWidth={7} />
    <line x1={-232} y1={-110} x2={-232} y2={-30} stroke="#7a4a22" strokeWidth={16} strokeLinecap="round" />
    <line x1={-232} y1={30} x2={-232} y2={110} stroke="#7a4a22" strokeWidth={16} strokeLinecap="round" />
    <ellipse cx={-185} cy={0} rx={34} ry={78} fill="rgba(200,230,255,.85)" stroke={KC.ink} strokeWidth={6} />
    {/* retina al fondo + nervio óptico */}
    <path d="M 120 -219 A 250 250 0 0 1 120 219" fill="none" stroke={RET.arteria} strokeWidth={22} />
    <path d="M 238 -40 L 360 -55 L 360 55 L 238 40 Z" fill="#f5d27a" stroke={KC.ink} strokeWidth={7} />
    <circle r={250} fill="none" stroke={KC.ink} strokeWidth={9} />
    {haz > 0.95 && <circle cx={240} cy={0} r={30 + 8 * Math.sin(T * 6)} fill={KC.yellow} opacity=".5" />}
  </g>;
}

// Baumanómetro esquemático (brazalete + reloj).
function Baumanometro({ x, y, s = 1, T = 0, aguja = 0 }) {
  const a = -120 + 200 * aguja;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={40} width={340} height={130} rx={30} fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <path d="M 0 40 Q 30 -20 0 -60" stroke={KC.ink} strokeWidth={8} fill="none" />
    <circle cx={0} cy={-150} r={110} fill="#fffdf7" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 11 }, (_, i) => { const g = (-120 + i * 20) * Math.PI / 180; return <line key={i} x1={Math.sin(g) * 80} y1={-150 - Math.cos(g) * 80} x2={Math.sin(g) * 96} y2={-150 - Math.cos(g) * 96} stroke={KC.ink} strokeWidth={5} />; })}
    <line x1={0} y1={-150} x2={Math.sin(a * Math.PI / 180) * 78} y2={-150 - Math.cos(a * Math.PI / 180) * 78} stroke={KC.red} strokeWidth={9} strokeLinecap="round" />
    <circle cx={0} cy={-150} r={12} fill={KC.ink} />
  </g>;
}
// Cigarro con humo.
function Cigarro({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}>
    <rect x={-180} y={-26} width={290} height={52} fill="#fffdf7" stroke={KC.ink} strokeWidth={7} />
    <rect x={-180} y={-26} width={90} height={52} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
    <rect x={110} y={-26} width={30} height={52} fill="#8a8a8a" stroke={KC.ink} strokeWidth={7} />
    <circle cx={148} cy={0} r={10} fill={KC.red} opacity={0.6 + 0.4 * Math.sin(T * 9)} />
    {[0, 1, 2].map((k) => { const u = ((T * 0.6 + k / 3) % 1); return <circle key={k} cx={160 + u * 60 + Math.sin(u * 8) * 16} cy={-30 - u * 200} r={18 + u * 26} fill="#d8d8e0" opacity={(1 - u) * 0.8} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Oftalmólogo esquemático con lupa, rascándose la cabeza.
function Oftalmologo({ x, y, s = 1, T = 0 }) {
  const rasca = Math.sin(T * 10) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 330 Q -150 120 0 110 Q 150 120 150 330 Z" fill="#fffdf7" stroke={KC.ink} strokeWidth={8} />
    <path d="M -30 112 L 0 190 L 30 112" fill="none" stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={10} r={100} fill={PIEL} stroke={KC.ink} strokeWidth={8} />
    <path d="M -100 -10 Q -90 -110 0 -105 Q 90 -110 100 -10 Q 60 -60 0 -60 Q -60 -60 -100 -10 Z" fill="#3b2a20" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-36} cy={10} r={13} fill={KC.ink} /><circle cx={36} cy={10} r={13} fill={KC.ink} />
    <path d="M -30 60 Q 0 45 30 60" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M 120 200 Q 170 60 ${110 + rasca} -60`} stroke={KC.ink} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d={`M 120 200 Q 170 60 ${110 + rasca} -60`} stroke="#fffdf7" strokeWidth={20} fill="none" strokeLinecap="round" />
    <g transform={`translate(-170 160) rotate(-25)`}><line x1={0} y1={60} x2={0} y2={150} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" /><circle r={64} fill="rgba(170,225,255,.5)" stroke={KC.ink} strokeWidth={12} /></g>
  </g>;
}
// Cámara de retina de consultorio.
function CamaraRetina({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-200} y={130} width={400} height={50} rx={14} fill="#c9ccd6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-40} width={120} height={180} fill="#9aa1b3" stroke={KC.ink} strokeWidth={8} />
    <rect x={-170} y={-200} width={300} height={180} rx={30} fill="#f4f4f8" stroke={KC.ink} strokeWidth={8} />
    <rect x={-250} y={-150} width={90} height={80} rx={12} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-250} cy={-110} r={24} fill={KC.cyan} stroke={KC.ink} strokeWidth={6} opacity={0.7 + 0.3 * Math.sin(T * 4)} />
    <rect x={60} y={-180} width={50} height={30} rx={6} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Portapapeles (expediente) con sello.
function Expediente({ x, y, s = 1, sello = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(4)`}>
    <rect x={-190} y={-250} width={380} height={500} rx={20} fill="#c98a4a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-160} y={-215} width={320} height={440} rx={8} fill="#fffdf7" stroke={KC.ink} strokeWidth={6} />
    <rect x={-70} y={-275} width={140} height={60} rx={14} fill="#9aa1b3" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-80} cy={-120} r={56} fill={RET.fondo2} stroke={KC.ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-120} y1={-20 + i * 46} x2={120 - (i % 2) * 60} y2={-20 + i * 46} stroke="#9aa1b3" strokeWidth={10} strokeLinecap="round" />)}
    {sello > 0 && <g transform={`translate(20 60) rotate(-16) scale(${klerp(2, 1, sello)})`} opacity={Math.min(1, sello * 2)}>
      <rect x={-170} y={-50} width={340} height={100} rx={14} fill="rgba(255,59,47,.12)" stroke={KC.red} strokeWidth={9} />
      <text y={18} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.red}>FALTAN PRUEBAS</text>
    </g>}
  </g>;
}

// Cuadrícula de 100 pares (retina ♂ + retina ♀): 97 con palomita, 3 con tache.
function Pares({ T, at, until, x = 120, y = 860 }) {
  if (T > until + 0.5) return null;
  const fuera = kprog(T, until, until + 0.4);
  const out = [], malos = [23, 58, 86];
  for (let i = 0; i < 100; i++) {
    const c = i % 10, f = Math.floor(i / 10), px = x + c * 86, py = y + f * 34, t0 = at + i * 0.022;
    if (T < t0) continue;
    const e = kprog(T, t0, t0 + 0.2, kEase.sale), mal = malos.includes(i);
    out.push(<g key={i} transform={`translate(${px} ${py}) scale(${e})`}>
      <circle cx={0} cy={0} r={12} fill={RET.fondo2} stroke={KC.ink} strokeWidth={3} />
      <circle cx={26} cy={0} r={12} fill={RET.fondo1} stroke={KC.ink} strokeWidth={3} />
      {mal ? <path d="M 44 -9 L 60 9 M 60 -9 L 44 9" stroke={KC.red} strokeWidth={6} strokeLinecap="round" />
        : <path d="M 43 0 L 50 8 L 63 -9" stroke={KC.leaf} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    </g>);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30, opacity:1 - fuera }}>
    <rect x={x - 40} y={y - 34} width={900} height={372} rx={26} fill="rgba(255,253,247,.92)" stroke={KC.ink} strokeWidth={7} opacity={kprog(T, at - 0.3, at)} />
    {out}
  </svg>;
}

// Pantalla del consultorio con las dos respuestas.
function Monitor({ T, at, until, x = 700, y = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  const fila = (t0, texto, color) => { const p = kprog(T, t0, t0 + 0.35, kEase.sale);
    return <div style={{ opacity:p, transform:`translateX(${(1 - p) * 40}px)`, background:color, border:`5px solid ${KC.ink}`, borderRadius:18, padding:'14px 20px', font:`900 34px/1.15 ${KF.texto}`, color:KC.ink, marginTop:16 }}>{texto}</div>; };
  return <div style={{ position:'absolute', left:x, top:y, width:560, zIndex:40, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o }}>
    <div style={{ background:'#10131a', border:`10px solid ${KC.ink}`, borderRadius:30, padding:'22px 24px 28px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
      <div style={{ font:`700 26px ${KF.mono}`, color:KC.cyan }}>análisis de retina · IA</div>
      {fila(at + 0.8, 'Referir a especialista de la vista', KC.yellow)}
      {fila(at + 1.6, 'Sin daño importante: repetir en 12 meses', KC.mint)}
    </div>
    <div style={{ width:60, height:60, background:'#2b3445', margin:'0 auto', border:`6px solid ${KC.ink}`, borderTop:'none' }}></div>
  </div>;
}

// Signo de interrogación grande.
function Interroga({ T, x, y, tam = 520 }) {
  return <text x={x} y={y} textAnchor="middle" style={{ font:`400 ${tam}px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} ${x} ${y - tam / 3})`}>?</text>;
}

function Retinas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Foto, E: CUES.Estudio, Ed: CUES.Edad, S: CUES.Sexo, Pr: CUES.Presion, P: CUES.Pregunta, M: CUES.Mapa, O: CUES.Ojo, U: CUES.UsoReal, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: parpadeo a los 0.35 s y zoom por la pupila
  const blink = (t0) => Math.max(0, 1 - Math.abs(T - t0) / 0.12);
  const zoomG = kprog(T, K.G + 1.2, K.G + 3.2, kEase.suave);
  const OJO = { x: 400, y: 900 };
  const zOjo = 1 + zoomG * 9, rRet = klerp(52 * 0.9, 330, kprog(T, K.G + 2.2, K.G + 3.6, kEase.sale));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tu ojo → la foto de tu retina */}
      <Escena T={T} a={K.G} b={K.F}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g opacity={1 - kprog(T, K.G + 2.6, K.G + 3.2)}>
            <g transform={`translate(${OJO.x} ${OJO.y}) scale(${zOjo}) translate(${-OJO.x} ${-OJO.y})`}><Ojo x={OJO.x} y={OJO.y} s={0.9} T={T} parpadeo={blink(K.G + 0.35)} /></g>
          </g>
          {T > K.G + 2.2 && <Retina id="g" x={klerp(OJO.x, 470, kprog(T, K.G + 2.4, K.G + 3.6, kEase.suave))} y={klerp(OJO.y, 880, kprog(T, K.G + 2.4, K.G + 3.6, kEase.suave))} r={rRet} T={T} />}
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 4.0} until={K.F - 0.2} texto="¿hombre?" x={300} y={1150} tam={40} borde={KC.blue} />
      <Chip T={T} at={K.G + 4.3} until={K.F - 0.2} texto="¿mujer?" x={680} y={1150} tam={40} borde={KC.pink} />
      {/* 2 · cómo se toma la foto → la retina por dentro */}
      <Escena T={T} a={K.F} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<g opacity={1 - kprog(T, K.F + 2.6, K.F + 3.1)}><CorteOjo x={600} y={880} s={0.88} T={T} haz={kprog(T, K.F + 0.3, K.F + 1.6, kEase.sale)} /></g>)}
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:kprog(T, K.F + 2.6, K.F + 3.1) }}></div>
        {T > K.F + 2.6 && svg(<Retina id="f" x={520} y={880} r={290} T={T} o={kprog(T, K.F + 2.6, K.F + 3.1)} />)}
      </Escena>
      <Etq T={T} at={K.F + 0.6} until={K.F + 2.5} x={60} y={1010} texto="cámara de retina" />
      <Etq T={T} at={K.F + 1.0} until={K.F + 2.5} x={300} y={610} texto="por la pupila" />
      <Etq T={T} at={K.F + 1.6} until={K.F + 2.5} x={830} y={1110} texto="retina" />
      <Etq T={T} at={K.F + 3.3} until={K.E - 0.2} x={40} y={560} texto="vasos sanguíneos" />
      <Etq T={T} at={K.F + 4.0} until={K.E - 0.2} x={1050} y={800} texto="disco óptico" lado="izq" color={RET.disco} />
      <Etq T={T} at={K.F + 4.6} until={K.E - 0.2} x={440} y={980} texto="mácula" lado="izq" tam={28} />
      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.Ed}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{[0, 1, 2].map((i) => <Retina key={i} id={`e${i}`} x={110} y={940 + i * 90} r={38} o={kprog(T, K.E + 1.8 + i * 0.2, K.E + 2.1 + i * 0.2)} />)}</>, 12)}
      </Escena>
      <RedNeuronal T={T} x={240} y={910} ancho={640} alto={240} capas={[3, 5, 5, 2]} onda={((T - K.E) * 0.7) % 1} o={kprog(T, K.E + 2.0, K.E + 2.6)} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ed - 0.3} anio="2018" quien="Google (con Verily)" revista="Poplin et al. · Nature Biomedical Engineering" y={470} />
      <div style={{ position:'absolute', left:540, top:770, zIndex:44, transform:'translate(-50%,-50%)', opacity:kprog(T, K.E + 1.2, K.E + 1.5) * (1 - kprog(T, K.Ed - 0.3, K.Ed)), textAlign:'center',
        background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:24, padding:'8px 30px', boxShadow:`8px 8px 0 ${KC.ink}` }}>
        <div style={{ font:`400 96px/1 ${KF.titulo}`, color:KC.ink }}>{kformato(Math.round(284335 * kprog(T, K.E + 1.2, K.E + 3.4, kEase.suave)))}</div>
        <div style={{ font:`900 30px ${KF.texto}`, color:KC.ink }}>pacientes · UK Biobank + EyePACS</div>
      </div>
      {/* 4 · la edad */}
      <Escena T={T} a={K.Ed} b={K.S}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Retina id="ed" x={260} y={760} r={170} T={T} />
          <path d={`M 470 760 L ${klerp(470, 640, kprog(T, K.Ed + 0.4, K.Ed + 0.9))} 760`} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
          {T > K.Ed + 0.9 && <path d="M 620 735 L 655 760 L 620 785" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <Robotito x={820} y={790} s={0.8} T={T} cara="seguro" />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Ed + 1.0} until={K.S - 0.2} valor={3} dur={0.6} prefijo="± " sufijo=" años" x={540} y={1110} tam={120} color={KC.orange} />
      <Chip T={T} at={K.Ed + 0.6} until={K.S - 0.2} texto="edad (ejemplo): 57 ± 3 años" x={540} y={975} tam={38} borde={KC.ink} />
      {/* 5 · el sexo: 97 de cada 100 pares */}
      <Escena T={T} a={K.S} b={K.Pr}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Retina id="s1" x={230} y={640} r={130} T={T} />
          <Retina id="s2" x={560} y={640} r={130} T={T} />
        </>)}
      </Escena>
      <Chip T={T} at={K.S + 0.5} until={K.Pr - 0.2} texto="hombre" x={230} y={790} tam={34} borde={KC.blue} />
      <Chip T={T} at={K.S + 0.7} until={K.Pr - 0.2} texto="mujer" x={560} y={790} tam={34} borde={KC.pink} />
      <Pares T={T} at={K.S + 1.4} until={K.Pr - 0.2} x={120} y={930} />
      <Chip T={T} at={K.S + 3.8} until={K.Pr - 0.2} texto="acierta 97 de 100 pares · al azar: 50" x={540} y={856} tam={34} borde={KC.leaf} />
      {/* 6 · presión y tabaco */}
      <Escena T={T} a={K.Pr} b={K.P}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Baumanometro x={300} y={760} s={0.9} T={T} aguja={0.5 + 0.3 * Math.sin(T * 2)} />
          <g opacity={kprog(T, K.Pr + 1.0, K.Pr + 1.4)}><Cigarro x={760} y={800} s={0.95} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Pr + 0.5} until={K.P - 0.2} texto="presión sistólica: ± 11 mmHg de error" x={540} y={1040} tam={36} borde={KC.blue} />
      <Chip T={T} at={K.Pr + 1.4} until={K.P - 0.2} texto="fuma: acierta 71 de 100 pares" x={540} y={1130} tam={36} borde={KC.red} />
      {/* 7 · la pregunta */}
      <Escena T={T} a={K.P} b={K.M} zoom={0.1}>
        <FondoLunares color={KC.violet} punto="rgba(255,255,255,.12)" />
        {svg(<><Oftalmologo x={270} y={820} s={0.95} T={T} /><Interroga T={T} x={300} y={620} tam={300} /></>)}
      </Escena>
      {/* 8 · el mapa de atención (por dentro de la máquina) */}
      <Escena T={T} a={K.M} b={K.O}>
        <FondoCircuito T={T} />
        {svg(<Retina id="m" x={560} y={880} r={320} T={T} gris={kprog(T, K.M + 0.2, K.M + 0.8)}
          calor={T < K.M + 3.6 ? 'vasos' : 'disco'} fuerza={T < K.M + 3.6 ? kprog(T, K.M + 0.9, K.M + 1.6) * (1 - kprog(T, K.M + 3.2, K.M + 3.6)) : kprog(T, K.M + 3.7, K.M + 4.3)} />)}
      </Escena>
      <Chip T={T} at={K.M + 0.3} until={K.O - 0.2} texto="mapa de atención de la IA" x={560} y={470} tam={34} mono borde={RET.verde} />
      <Chip T={T} at={K.M + 1.4} until={K.M + 3.4} texto="edad · presión → vasos" x={560} y={1150} tam={40} borde={RET.verde} />
      <Chip T={T} at={K.M + 4.0} until={K.O - 0.2} texto="sexo → disco óptico" x={560} y={1150} tam={40} borde={RET.verde} />
      {/* 9 · ojo: pista, no diagnóstico */}
      <Escena T={T} a={K.O} b={K.U}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Expediente x={400} y={860} s={0.95} sello={kprog(T, K.O + 1.6, K.O + 2.0, kEase.sale)} />)}
      </Escena>
      <MitoTachado T={T} at={K.O + 0.2} tacharEn={K.O + 1.0} until={K.O + 1.5} texto="diagnóstico" x={440} y={520} tam={50} />
      <Chip T={T} at={K.O + 1.5} until={K.U - 0.2} texto="pista ≠ diagnóstico" x={420} y={520} tam={48} borde={KC.red} />
      {/* 10 · lo que sí se usa: retinopatía diabética */}
      <Escena T={T} a={K.U} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<CamaraRetina x={260} y={1000} s={0.85} T={T} />)}
      </Escena>
      <Monitor T={T} at={K.U + 0.6} until={K.C - 0.2} x={720} y={860} />
      <Chip T={T} at={K.U + 0.2} until={K.C - 0.2} texto="en personas con diabetes" x={620} y={460} tam={38} borde={KC.ink} />
      <div style={{ position:'absolute', left:560, top:590, zIndex:44, opacity:Math.min(kprog(T, K.U + 3.0, K.U + 3.3), 1 - kprog(T, K.C - 0.2, K.C + 0.2)),
        transform:`translate(-50%,-50%) rotate(-10deg) scale(${klerp(2, 1, kprog(T, K.U + 3.0, K.U + 3.4, kEase.sale))})`,
        border:`8px solid ${KC.red}`, borderRadius:18, padding:'8px 26px', background:'rgba(255,255,255,.8)', textAlign:'center' }}>
        <div style={{ font:`400 64px/1 ${KF.titulo}`, color:KC.red }}>FDA · abril 2018</div>
        <div style={{ font:`900 26px ${KF.texto}`, color:KC.red }}>IA autónoma (IDx-DR)</div>
      </div>
      {/* 11 · cierre: el mismo ojo, ahora "leído" */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<Ojo x={OJO.x} y={OJO.y} s={0.9} T={T} parpadeo={blink(K.C + 0.6)} dentro={kprog(T, K.C + 0.8, K.C + 1.6)} />)}
      </Escena>
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="edad" x={200} y={600} tam={40} borde={RET.verde} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="presión" x={760} y={1160} tam={40} borde={RET.verde} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou} texto="sexo" x={150} y={1160} tam={40} borde={RET.verde} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="Algo que tus ojos *no saben ver*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.E - 0.1} texto="La foto entra *por la pupila*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.Ed - 0.1} texto="2018: *284 mil pacientes*" />
      <Subtitulo T={T} idx={3} at={K.Ed + 0.1} until={K.S - 0.1} texto="Tu edad, *± 3 años*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.Pr - 0.1} texto="Hombre o mujer: *97 de 100*" />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.P - 0.1} texto="Presión y tabaco: *acertó menos*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.M - 0.1} texto="¿Cómo ve *lo que nadie ve?*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.O - 0.1} texto="Miraba *vasos y disco óptico*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.U - 0.1} texto="Una pista, *no un diagnóstico*" />
      <Subtitulo T={T} idx={9} at={K.U + 0.1} until={K.C - 0.1} texto="Ya se usa: *daño por diabetes*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tu ojo cuenta *mucho más*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Foto + 2.7, CUES.Estudio - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Edad + 0.4, CUES.Sexo - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Sexo + 1.8, CUES.Presion - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Mapa + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Mapa + 3.9, CUES.Ojo - 0.15, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Ojo + 0.3, CUES.UsoReal - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.UsoReal + 2.0, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="18" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function RetinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Retinas /></CompositionStage></div>;
}
window.RetinaApp = RetinaApp;
