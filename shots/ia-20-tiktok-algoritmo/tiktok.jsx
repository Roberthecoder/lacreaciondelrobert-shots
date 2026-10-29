// Shot IA #20 · TikTok no te lee la mente: te mide — NARRADO (N1 "Por dentro" + N6 "Guía en pasos").
// Datos: TikTok, "Recommendation system" (Centro de seguridad, página vigente); TikTok Newsroom (2020 y 2023);
// Vombatkere et al., "TikTok and the Art of Personalization", WWW '24. Ver guion.md y verificacion.md.

// Colores de las "miniaturas" de video del feed.
const VCOL = [KC.yellow, KC.cyan, KC.mint, KC.lilac, KC.orange, KC.pink, KC.coral, KC.teal];

// Dibujito dentro de una miniatura de video (esquemático): 0 gato, 1 taco, 2 guitarra, 3 pelota, 4 planta, 5 cohete.
function Dibujito({ tipo = 0, s = 1, T = 0 }) {
  const b = Math.sin(T * 4 + tipo) * 4;
  return <g transform={`translate(0 ${b}) scale(${s})`}>
    {tipo % 6 === 0 && <g>{/* gato */}
      <path d="M -60 40 Q -60 -30 0 -30 Q 60 -30 60 40 Z" fill="#f4b860" stroke={KC.ink} strokeWidth={7} />
      <path d="M -55 -10 L -50 -60 L -20 -30 Z M 55 -10 L 50 -60 L 20 -30 Z" fill="#f4b860" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <circle cx={-22} cy={0} r={7} fill={KC.ink} /><circle cx={22} cy={0} r={7} fill={KC.ink} />
      <path d="M -8 16 L 0 22 L 8 16" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>}
    {tipo % 6 === 1 && <g>{/* taco */}
      <path d="M -70 30 A 70 70 0 0 1 70 30 Z" fill="#f2d27a" stroke={KC.ink} strokeWidth={7} />
      <path d="M -54 18 Q -30 -26 0 -20 Q 30 -26 54 18" fill="none" stroke={KC.leaf} strokeWidth={14} strokeLinecap="round" />
      <circle cx={-20} cy={6} r={9} fill={KC.red} stroke={KC.ink} strokeWidth={4} /><circle cx={18} cy={2} r={9} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
    </g>}
    {tipo % 6 === 2 && <g>{/* guitarra */}
      <rect x={-8} y={-80} width={16} height={80} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} />
      <circle cx={0} cy={10} r={34} fill={KC.orange} stroke={KC.ink} strokeWidth={7} /><circle cx={0} cy={44} r={40} fill={KC.orange} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={24} r={11} fill={KC.ink} />
    </g>}
    {tipo % 6 === 3 && <g>{/* pelota */}
      <circle r={52} fill="#fff" stroke={KC.ink} strokeWidth={7} />
      <path d="M 0 -20 L 19 -6 L 12 16 L -12 16 L -19 -6 Z" fill={KC.ink} />
    </g>}
    {tipo % 6 === 4 && <g>{/* planta */}
      <path d="M -36 20 L 36 20 L 26 70 L -26 70 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M 0 20 Q -6 -20 -40 -40 Q -10 -40 0 -6 Q 10 -50 44 -56 Q 20 -20 0 20" fill={KC.leaf} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    </g>}
    {tipo % 6 === 5 && <g>{/* cohete */}
      <path d="M 0 -70 Q 34 -30 26 30 L -26 30 Q -34 -30 0 -70 Z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={-18} r={12} fill={KC.cyan} stroke={KC.ink} strokeWidth={5} />
      <path d="M -14 34 L 0 70 L 14 34 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
    </g>}
  </g>;
}

// Miniatura de video: rectángulo vertical de color con dibujito y barra de progreso (prog 0..1).
function Mini({ x, y, w = 170, h = 250, tipo = 0, color, prog = null, T = 0, borde = KC.ink, o = 1, children }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill={color || VCOL[tipo % VCOL.length]} stroke={borde} strokeWidth={7} />
    <Dibujito tipo={tipo} s={w / 230} T={T} />
    {prog != null && <g><rect x={-w / 2 + 14} y={h / 2 - 24} width={w - 28} height={10} rx={5} fill="rgba(0,0,0,.35)" />
      <rect x={-w / 2 + 14} y={h / 2 - 24} width={(w - 28) * prog} height={10} rx={5} fill="#fff" /></g>}
    {children}
  </g>;
}

// Celular con el feed "Para ti": los videos suben (scroll = número de videos pasados, con decimales).
function CelularFeed({ T, x, y, s = 1, scroll = 0, tipos = [0, 1, 2, 3, 4, 5], colores, rot = 0, etiqueta = 'Para ti' }) {
  const W = 420, H = 820, n = tipos.length;
  const base = Math.floor(scroll), fr = scroll - base;
  const vids = [-1, 0, 1].map((k) => { const i = base + k, t = ((i % n) + n) % n; return { yy: (k - fr) * H, t, c: colores ? colores[t % colores.length] : VCOL[(t * 3) % VCOL.length], key: i }; });
  const id = `clip${Math.round(x)}_${Math.round(y)}`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-W / 2 - 22} y={-H / 2 - 22} width={W + 44} height={H + 44} rx={64} fill={KC.ink} />
    <defs><clipPath id={id}><rect x={-W / 2} y={-H / 2} width={W} height={H} rx={46} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      {vids.map((v) => <g key={v.key} transform={`translate(0 ${v.yy})`}>
        <rect x={-W / 2} y={-H / 2} width={W} height={H} fill={v.c} />
        <Dibujito tipo={v.t} s={2.3} T={T} />
        <rect x={-W / 2 + 30} y={H / 2 - 120} width={200} height={18} rx={9} fill="rgba(0,0,0,.25)" />
        <rect x={-W / 2 + 30} y={H / 2 - 90} width={280} height={14} rx={7} fill="rgba(0,0,0,.18)" />
        {[0, 1, 2].map((k) => <circle key={k} cx={W / 2 - 46} cy={60 + k * 90} r={26} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={4} />)}
      </g>)}
      <text x={0} y={-H / 2 + 66} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={2}>{etiqueta}</text>
    </g>
    <rect x={-70} y={-H / 2 - 8} width={140} height={26} rx={13} fill={KC.ink} />
  </g>;
}

// Pulgar que desliza hacia arriba: fase 0..1 dentro de cada deslizamiento.
function Pulgar({ x, y, fase = 0, s = 1 }) {
  const dy = -160 * kEase.sale(kclamp(fase, 0, 1)), o = fase < 0.85 ? 1 : (1 - fase) / 0.15;
  return <g transform={`translate(${x} ${y + dy}) rotate(-18) scale(${s})`} opacity={o}>
    <path d="M -46 160 L -46 10 Q -46 -60 0 -60 Q 46 -60 46 10 L 46 160 Z" fill="#e9a77c" stroke={KC.ink} strokeWidth={8} />
    <path d="M -26 -10 Q -26 -42 0 -42 Q 26 -42 26 -10 L 26 6 Q 0 14 -26 6 Z" fill="#f7d6c2" stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Bola de cristal ("leer la mente") que se tacha.
function BolaCristal({ x, y, s = 1, T = 0, tacha = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 70 L 80 70 L 60 110 L -60 110 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={0} cy={-10} r={90} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={-10} r={60 + 6 * Math.sin(T * 3)} fill="rgba(255,255,255,.25)" />
    <path d="M -40 -50 Q -20 -70 10 -66" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".8" />
    <text x={0} y={10} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.violet}>?</text>
    {tacha > 0 && <g>
      <line x1={-110} y1={-110} x2={-110 + 220 * Math.min(1, tacha * 2)} y2={-110 + 220 * Math.min(1, tacha * 2)} stroke={KC.red} strokeWidth={20} strokeLinecap="round" />
      {tacha > 0.5 && <line x1={110} y1={-110} x2={110 - 220 * (tacha - 0.5) * 2} y2={-110 + 220 * (tacha - 0.5) * 2} stroke={KC.red} strokeWidth={20} strokeLinecap="round" />}
    </g>}
  </g>;
}

// Urna de votos; boletas ✔ (terminado) o ✖ (saltado). lleno 0..1 sube el montón.
function Urna({ x, y, s = 1, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-40} width={260} height={200} rx={16} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-110} y={160 - 170 * lleno} width={220} height={170 * lleno} fill="rgba(47,224,168,.25)" />
    <rect x={-150} y={-70} width={300} height={40} rx={10} fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <rect x={-70} y={-58} width={140} height={14} rx={7} fill={KC.ink} />
    <text x={0} y={90} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>VOTOS</text>
  </g>;
}
function Boleta({ x, y, ok = true, rot = 0, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-46} y={-32} width={92} height={64} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={18} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={ok ? KC.leaf : KC.red}>{ok ? '✔' : '✖'}</text>
  </g>;
}

// Embudo (señales que entran al sistema).
function Embudo({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -260 -120 L 260 -120 L 60 80 L 60 200 L -60 200 L -60 80 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <path d="M -230 -100 L 230 -100" stroke="rgba(255,255,255,.4)" strokeWidth={10} strokeLinecap="round" />
    <circle cx={0} cy={230 + ((T * 160) % 80)} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Balanza: incl > 0 baja el platillo izquierdo.
function Balanza({ x, y, s = 1, incl = 0, izq, der }) {
  const a = incl * 16, L = 300, r = (a * Math.PI) / 180;
  const pl = { x: -L * Math.cos(r), y: L * Math.sin(r) }, pr = { x: L * Math.cos(r), y: -L * Math.sin(r) };
  const Plato = ({ p, children }) => <g transform={`translate(${p.x} ${p.y})`}>
    <line x1={0} y1={0} x2={-110} y2={150} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={110} y2={150} stroke={KC.ink} strokeWidth={5} />
    <path d="M -150 150 L 150 150 Q 120 200 0 200 Q -120 200 -150 150 Z" fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <g transform="translate(0 150)">{children}</g>
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 520 L 120 520 L 40 470 L -40 470 Z" fill="#7a4a22" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-16} y={0} width={32} height={480} fill="#a8703c" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${-a})`}><rect x={-L - 10} y={-14} width={2 * L + 20} height={28} rx={14} fill="#a8703c" stroke={KC.ink} strokeWidth={7} /></g>
    <circle r={26} fill={KC.gold} stroke={KC.ink} strokeWidth={7} />
    <Plato p={pl}>{izq}</Plato>
    <Plato p={pr}>{der}</Plato>
  </g>;
}

// Globo terráqueo con alfiler (mismo país).
function Globo({ s = 1 }) {
  return <g transform={`scale(${s})`}>
    <circle cx={0} cy={-70} r={66} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <path d="M -40 -110 Q -10 -96 -20 -70 Q -50 -60 -44 -36 M 10 -128 Q 30 -100 50 -96 Q 40 -60 20 -40" stroke={KC.leaf} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M 20 -150 L 20 -100" stroke={KC.ink} strokeWidth={6} /><circle cx={20} cy={-156} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

// Menú del "mantener presionado" (ilustrativo).
function MenuPresion({ T, at, x, y }) {
  const e = kprog(T, at, at + 0.35, kEase.rebote); if (e <= 0) return null;
  const sel = kprog(T, at + 0.9, at + 1.2);
  const items = ['Guardar', 'No me interesa', 'Reportar'];
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.6, 1, e)})`} opacity={Math.min(1, e * 2)}>
    <rect x={-230} y={-150} width={460} height={300} rx={30} fill="#1d222e" stroke={KC.ink} strokeWidth={8} />
    {items.map((it, i) => { const on = i === 1;
      return <g key={i} transform={`translate(0 ${-90 + i * 90})`}>
        {on && <rect x={-205} y={-36} width={410} height={72} rx={20} fill={KC.yellow} opacity={0.25 + 0.75 * sel} stroke={KC.ink} strokeWidth={on && sel > 0.5 ? 5 : 0} />}
        <text x={0} y={14} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={on && sel > 0.5 ? KC.ink : '#c9cfdb'}>{it}</text>
      </g>; })}
  </g>;
}

// Colador: las fichas "#…" rebotan, el resto pasa.
function Colador({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -230 0 Q 0 260 230 0 Z" fill="#cfd6e3" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 30 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10); const xx = -180 + c * 40, yy = 30 + r * 42; const lim = Math.sqrt(Math.max(0, 1 - (xx / 230) ** 2)) * 240;
      return yy < lim - 20 ? <circle key={i} cx={xx} cy={yy} r={7} fill={KC.ink} opacity=".55" /> : null; })}
    <rect x={230} y={-14} width={170} height={28} rx={14} fill="#9aa5b8" stroke={KC.ink} strokeWidth={7} />
    <rect x={-240} y={-16} width={480} height={32} rx={16} fill="#e7ecf4" stroke={KC.ink} strokeWidth={8} />
  </g>;
}

// Flechas de refrescar que giran.
function Refrescar({ x, y, s = 1, ang = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`}>
    <path d="M -110 0 A 110 110 0 0 1 90 -64" stroke={KC.ink} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M -110 0 A 110 110 0 0 1 90 -64" stroke={KC.mint} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M 110 0 A 110 110 0 0 1 -90 64" stroke={KC.ink} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M 110 0 A 110 110 0 0 1 -90 64" stroke={KC.mint} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M 60 -120 L 140 -70 L 50 -20 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -60 120 L -140 70 L -50 20 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
  </g>;
}

// Cajita de datos donados (para los 347).
function Datos347({ T, at, x = 115, y = 800 }) {
  const n = Math.round(347 * kprog(T, at, at + 2.4, kEase.suave)); if (T < at) return null;
  const cols = 25, out = [];
  for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols);
    out.push(<rect key={i} x={x + c * 34} y={y + r * 26} width={28} height={20} rx={4} fill={i % 7 === 0 ? KC.yellow : '#fffdf6'} stroke={KC.ink} strokeWidth={3} />); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>{out}</svg>;
}

// Cuadrícula de 100 videos: n1 "tus gustos" (seguro), n2 hasta donde llega el rango (estimado), el resto "explorar".
function Cien({ T, at, x = 150, y = 680, lado = 78 }) {
  const out = [], p = kprog(T, at, at + 2.6, kEase.suave), k = Math.round(100 * p);
  for (let i = 0; i < 100; i++) { const c = i % 10, r = Math.floor(i / 10), px = x + c * lado, py = y + r * (lado * 0.62);
    const vis = i < k; const tipo = i < 30 ? 'gusto' : i < 50 ? 'rango' : 'explora';
    const fill = !vis ? 'rgba(0,0,0,.08)' : tipo === 'gusto' ? KC.gold : tipo === 'rango' ? KC.gold2 : KC.teal;
    out.push(<g key={i}>
      <rect x={px} y={py} width={lado - 12} height={lado * 0.62 - 10} rx={8} fill={fill} stroke={vis ? KC.ink : 'transparent'} strokeWidth={4} strokeDasharray={tipo === 'rango' && vis ? '8 6' : 'none'} />
      {vis && tipo === 'explora' && <g transform={`translate(${px + (lado - 12) / 2} ${py + (lado * 0.62 - 10) / 2}) rotate(${(T * 60 + i * 37) % 360})`}><path d="M 0 -14 L 6 0 L 0 14 L -6 0 Z" fill="#fff" /></g>}
      {vis && tipo !== 'explora' && <text x={px + (lado - 12) / 2} y={py + 32} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>♥</text>}
    </g>); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>{out}</svg>;
}

// Barras de impacto del estudio (alto / medio).
function Impacto({ T, at, until, y = 640 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  const filas = [{ t: '♥ dar like', v: 1, c: KC.pink, n: 'impacto ALTO', a: at }, { t: '+ seguir cuentas', v: 1, c: KC.mint, n: 'impacto ALTO', a: at + 0.6 }, { t: '% del video visto', v: 0.5, c: '#c9cfdb', n: 'impacto medio', a: at + 1.4 }];
  return <div style={{ position:'absolute', left:70, top:y, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const g = kprog(T, f.a + 0.1, f.a + 1.0, kEase.sale);
      return <div key={i} style={{ marginBottom:26, opacity: T >= f.a ? 1 : 0 }}>
        <div style={{ font:`900 42px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.t}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 560 * f.v * g), height:70, background:f.c, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 46px ${KF.titulo}`, color:KC.ink }}>{f.n}</div>
        </div>
      </div>; })}
  </div>;
}

function TikTok() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, S: CUES.Senales, Pe: CUES.Peso, R: CUES.Ranking, Q: CUES.Pregunta, P1: CUES.Paso1, P2: CUES.Paso2, P3: CUES.Paso3, E: CUES.Estudio, X: CUES.Explora, C: CUES.Cierre, Ou: CUES.Outro };
  // segunda línea del Estudio (idx 9): de la voz si ya existe, si no, estimada
  const E2 = (window.SUBS && window.SUBS[9]) ? window.SUBS[9].at : K.E + 112 / 17.6 + 0.35;
  const FIN = K.Ou + 4;
  const svg = (c, z = 20) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;

  // gancho: deslizamientos cada 1.1 s desde el cuadro 0
  const SW = 1.1, sw = Math.max(0, T - (K.G + 0.05)) / SW, nSw = Math.floor(sw), fSw = sw - nSw;
  const scrollG = nSw + kEase.suave(kclamp((fSw - 0.15) / 0.55, 0, 1));
  const boletas = (t0, t1, x0, y0, x1, y1) => {
    const out = [];
    for (let i = 0; i * SW + 0.6 < t1 - t0; i++) { const ta = t0 + 0.6 + i * SW; const p = kprog(T, ta, ta + 0.7, kEase.suave); if (p <= 0) continue;
      const ok = [1, 0, 1, 1, 0, 1, 1, 0][i % 8] === 1;
      out.push(<Boleta key={i} x={klerp(x0, x1, p)} y={klerp(y0, y1, p) - Math.sin(Math.PI * p) * 160} ok={ok} rot={p * 200} s={klerp(1.1, 0.7, p)} o={p < 0.95 ? 1 : (1 - p) * 20} />); }
    return out;
  };

  // ranking: 5 videos con puntaje (ilustrativo) que se ordenan
  const RK = [{ t: 3, p: 0.41 }, { t: 1, p: 0.88 }, { t: 4, p: 0.23 }, { t: 0, p: 0.67 }, { t: 2, p: 0.52 }];
  const orden = [...RK].map((r, i) => ({ ...r, i })).sort((a, b) => b.p - a.p).map((r) => r.i);
  const ordP = kprog(T, K.R + 2.4, K.R + 3.4, kEase.suave);

  // pregunta: remolino de videos iguales
  const remolino = Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + T * 1.6, rr = 300 + 40 * Math.sin(T * 2 + i);
    return <Mini key={i} x={330 + Math.cos(a) * rr} y={900 + Math.sin(a) * rr * 0.75} w={110} h={160} tipo={0} color={KC.lilac} T={T} />; });

  // paso 2: fichas que caen al colador (los "#" rebotan)
  const fichasP2 = [{ t: '#chisme', bad: true, d: 0.2, x: 600 }, { t: 'gatitos', bad: false, d: 0.6, x: 760 }, { t: '#dieta', bad: true, d: 1.0, x: 680 }, { t: 'ciencia', bad: false, d: 1.4, x: 820 }];

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el pulgar desliza, la bola de cristal se tacha, los votos caen en la urna */}
      <Escena T={T} a={K.G} b={K.S}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <CelularFeed T={T} x={330} y={790} s={0.86} scroll={scrollG} />
          <Pulgar x={400} y={1060} fase={(fSw - 0.1) / 0.6} s={0.9} />
          <g opacity={1 - kprog(T, K.G + 2.6, K.G + 3.0)}><BolaCristal x={810} y={1010} s={0.95} T={T} tacha={kprog(T, K.G + 1.3, K.G + 2.0)} /></g>
          <g opacity={kprog(T, K.G + 2.8, K.G + 3.2)}><Urna x={810} y={1010} s={0.85} lleno={kprog(T, K.G + 3, K.S, kEase.suave) * 0.5} /></g>
          {boletas(K.G + 2.3, K.S, 400, 760, 810, 960)}
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 1.4} until={K.G + 2.9} texto="¿leer la mente?" x={810} y={820} tam={36} borde={KC.red} />
      <Chip T={T} at={K.G + 3.1} until={K.S - 0.2} texto="terminado ✔ · saltado ✖" x={790} y={800} tam={32} borde={KC.leaf} />

      {/* 2 · señales: fichas que entran al embudo */}
      <Escena T={T} a={K.S} b={K.Pe}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Embudo x={540} y={980} s={0.9} T={T} />
          {[['visto', KC.yellow, 0.3, 220, 560], ['terminado ✔', KC.leaf, 0.9, 420, 470], ['saltado ✖', KC.coral, 1.5, 300, 650], ['sigues a…', KC.cyan, 2.4, 560, 560], ['audio ♪', KC.lilac, 3.4, 360, 740], ['#hashtags', KC.orange, 4.0, 600, 690]].map(([tx, c, d, xx, yy], i) => {
            const a = K.S + d, p = kprog(T, a, a + 0.5, kEase.rebote), cae = kprog(T, a + 2.2, a + 2.9, kEase.entra);
            return <Ficha key={i} x={klerp(xx, 540, cae)} y={klerp(yy - 120 * (1 - p), 980, cae)} texto={tx} color={c} s={p * (1 - 0.6 * cae)} o={p * (1 - cae)} rot={(i % 2 ? 6 : -6) * (1 - cae)} tam={38} />; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.S + 0.2} until={K.Pe - 0.2} texto="página oficial de TikTok" x={420} y={400} tam={34} borde={KC.ink} />

      {/* 3 · peso: la balanza */}
      <Escena T={T} a={K.Pe} b={K.R}>
        <FondoLunares color={KC.yellow} />
        {svg(<Balanza x={540} y={640} s={0.95} incl={kprog(T, K.Pe + 1.4, K.Pe + 2.6, kEase.rebote)}
          izq={<Mini x={0} y={-130} w={150} h={220} tipo={2} prog={kprog(T, K.Pe + 0.5, K.Pe + 1.5)} T={T} />}
          der={<Globo s={0.9} />} />)}
      </Escena>
      <Chip T={T} at={K.Pe + 0.6} until={K.R - 0.2} texto="video largo visto completo" x={330} y={1150} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.Pe + 1.2} until={K.R - 0.2} texto="mismo país" x={830} y={1150} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Pe + 0.3} until={K.R - 0.2} texto="TikTok Newsroom · 2020" x={540} y={470} tam={34} borde={KC.gold} />

      {/* 4 · ranking: por dentro de la máquina */}
      <Escena T={T} a={K.R} b={K.Q}>
        <FondoCircuito T={T} />
        {svg(<>{RK.map((r, i) => {
          const pos = klerp(i, orden.indexOf(i), ordP), yy = 470 + pos * 145, top = orden.indexOf(i) === 0 && ordP > 0.95;
          const ap = kprog(T, K.R + 0.2 + i * 0.15, K.R + 0.5 + i * 0.15);
          const g = kprog(T, K.R + 1.0, K.R + 2.0, kEase.sale);
          return <g key={i} opacity={ap} transform={`translate(0 ${(1 - ap) * 40})`}>
            <Mini x={160} y={yy + 55} w={84} h={124} tipo={r.t} T={T} borde={top ? KC.gold2 : KC.ink} />
            <rect x={230} y={yy + 30} width={360} height={50} rx={14} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={3} />
            <rect x={230} y={yy + 30} width={360 * r.p * g} height={50} rx={14} fill={top ? KC.gold2 : KC.cyan} />
            <text x={610} y={yy + 70} style={{ font:`700 40px ${KF.mono}` }} fill={top ? KC.gold2 : KC.texto}>{Math.round(r.p * 100 * g)}</text>
            {top && <text x={680} y={yy + 72} style={{ font:`400 46px ${KF.titulo}` }} fill={KC.gold2}>1.º</text>}
          </g>; })}</>)}
      </Escena>
      <Chip T={T} at={K.R + 0.3} until={K.Q - 0.2} texto="probabilidad de like o de saltarlo" x={480} y={400} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.R + 1.2} until={K.Q - 0.2} texto="puntajes ilustrativos" x={420} y={1215} tam={26} borde={KC.texto} />

      {/* 5 · pregunta: atrapado en un remolino */}
      <Escena T={T} a={K.Q} b={K.P1} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          {remolino}
          <CelularFeed T={T} x={330} y={900} s={0.5} scroll={0} tipos={[0]} colores={[KC.lilac]} rot={Math.sin(T * 5) * 4} />
          <text x={320} y={600} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 320 500)`}>?</text>
        </>)}
      </Escena>

      {/* 6–8 · los tres pasos */}
      <Escena T={T} a={K.P1} b={K.E}>
        <FondoLunares color={KC.lilac} />
      </Escena>
      <Pasos T={T} total={3} hasta={K.E - 0.1} y={380} pasos={[{ at: K.P1, texto: '«No me interesa»' }, { at: K.P2, texto: 'filtra palabras o #' }, { at: K.P3, texto: 'refresca tu Para ti' }]} />
      {T > K.P1 - 0.4 && T < K.P2 + 0.4 && svg(<g opacity={kprog(T, K.P1 - 0.4, K.P1) * (1 - kprog(T, K.P2, K.P2 + 0.4))}>
        <CelularFeed T={T} x={330} y={930} s={0.62} scroll={0} tipos={[0]} colores={[KC.lilac]} />
        <circle cx={330} cy={930} r={30 + 90 * kprog(T, K.P1 + 0.3, K.P1 + 1.0)} fill="none" stroke="#fff" strokeWidth={8} opacity={1 - kprog(T, K.P1 + 0.3, K.P1 + 1.0)} />
        <Pulgar x={350} y={1010} fase={0} s={0.8} />
        <MenuPresion T={T} at={K.P1 + 0.9} x={760} y={900} />
      </g>, 30)}
      {T > K.P2 - 0.4 && T < K.P3 + 0.4 && svg(<g opacity={kprog(T, K.P2 - 0.4, K.P2) * (1 - kprog(T, K.P3, K.P3 + 0.4))}>
        <Colador x={720} y={880} s={0.85} />
        {fichasP2.map((f, i) => { const a = K.P2 + f.d, p = kprog(T, a, a + 0.8); if (p <= 0) return null;
          const yy = f.bad ? 600 + 260 * Math.sin(Math.PI * Math.min(1, p * 1.4)) * (p < 0.7 ? 1 : 1) - (p > 0.7 ? (p - 0.7) * 400 : 0) : klerp(600, 1180, p);
          const xx = f.bad ? f.x + (p > 0.6 ? (p - 0.6) * 400 : 0) : f.x - 60;
          return <Ficha key={i} x={xx} y={yy} texto={f.t} color={f.bad ? KC.coral : KC.mint} s={0.9} rot={f.bad ? p * 40 : 0} o={f.bad && p > 0.9 ? (1 - p) * 10 : 1} tam={34} />; })}
      </g>, 30)}
      {T > K.P3 - 0.4 && svg(<g opacity={kprog(T, K.P3 - 0.4, K.P3) * (1 - kprog(T, K.E - 0.1, K.E + 0.4))}>
        <Refrescar x={720} y={760} s={0.85} ang={360 * kprog(T, K.P3 + 0.2, K.P3 + 1.6, kEase.suave)} />
        {[0, 1, 2].map((k) => { const p = kprog(T, K.P3 + 1.4 + k * 0.3, K.P3 + 1.8 + k * 0.3, kEase.rebote);
          return <Mini key={k} x={600 + k * 130} y={1050} w={110} h={160} tipo={[5, 4, 3][k]} T={T} o={p} />; })}
      </g>, 30)}
      <Chip T={T} at={K.P3 + 2.0} until={K.E - 0.2} texto="temas nuevos" x={730} y={1180} tam={36} borde={KC.mint} />

      {/* 9 · el estudio */}
      <Escena T={T} a={K.E} b={K.X}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="2024" quien="EE. UU. · Alemania · Países Bajos" revista="Vombatkere et al. · The Web Conference (Singapur)" y={600} />
      <Chip T={T} at={K.E + 3.6} until={E2 - 0.2} texto="347 usuarios donaron sus datos" x={540} y={680} tam={40} borde={KC.ink} />
      <Datos347 T={T} at={K.E + 3.7} x={120} y={780} />
      {T > E2 - 0.3 && T < K.X + 0.3 && <div style={{ position:'absolute', inset:0, background:KC.cyan, opacity:kprog(T, E2 - 0.3, E2) * (1 - kprog(T, K.X - 0.1, K.X + 0.3)), zIndex:35,
        backgroundImage:'radial-gradient(circle, rgba(255,255,255,.33) 7px, transparent 8px)', backgroundSize:'52px 52px' }}></div>}
      <Chip T={T} at={E2 + 0.1} until={K.X - 0.2} texto="lo que más personalizaba" x={430} y={540} tam={38} borde={KC.ink} />
      <Impacto T={T} at={E2 + 0.4} until={K.X - 0.2} y={640} />

      {/* 10 · explorar: 100 videos */}
      <Escena T={T} a={K.X} b={K.C}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        <Cien T={T} at={K.X + 0.4} x={170} y={680} lado={78} />
      </Escena>
      <Chip T={T} at={K.X + 0.3} until={K.C - 0.2} texto="de cada 100 de sus primeros mil videos" x={600} y={430} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.X + 2.0} until={K.C - 0.2} texto="30–50 % · estimado del estudio" x={640} y={540} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.X + 3.2} until={K.C - 0.2} x={170} y={1160} texto="♥ tus gustos" color={KC.ink} tam={34} />
      <Etq T={T} at={K.X + 3.8} until={K.C - 0.2} x={930} y={1160} texto="explorar" lado="izq" color={KC.teal} tam={34} />

      {/* 11 · cierre: la misma imagen del inicio, transformada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <CelularFeed T={T} x={330} y={790} s={0.86} scroll={kEase.suave(kprog(T, K.C + 0.3, K.C + 1.0))} tipos={[3, 4, 5]} />
          <Pulgar x={400} y={1060} fase={kprog(T, K.C + 0.2, K.C + 0.9)} s={0.9} />
          <g opacity={1 - kprog(T, K.C + 1.6, K.C + 2.0)}><BolaCristal x={810} y={1010} s={0.95} T={T} tacha={1} /></g>
          <g opacity={kprog(T, K.C + 1.8, K.C + 2.2)}><Urna x={810} y={1010} s={0.85} lleno={0.5 + 0.45 * kprog(T, K.C + 2, K.C + 3.2, kEase.suave)} /></g>
          {boletas(K.C + 1.0, K.Ou, 400, 760, 810, 960)}
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="tú se la enseñas ✔" x={790} y={800} tam={38} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.S - 0.1} texto="No te lee la mente: *te mide.*" />
      <Subtitulo T={T} idx={1} at={K.S + 0.1} until={K.Pe - 0.1} texto="Lo que ves, terminas o saltas: *señales.*" />
      <Subtitulo T={T} idx={2} at={K.Pe + 0.1} until={K.R - 0.1} texto="Verlo completo *pesa más.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.Q - 0.1} texto="Arriba, *el de más puntos.*" />
      <Subtitulo T={T} idx={4} at={K.Q + 0.1} until={K.P1 - 0.1} texto="¿Y si ya *te atrapó?*" />
      <Subtitulo T={T} idx={5} at={K.P1 + 0.1} until={K.P2 - 0.1} texto="Deja presionado: *«No me interesa».*" />
      <Subtitulo T={T} idx={6} at={K.P2 + 0.1} until={K.P3 - 0.1} texto="Filtra *palabras o hashtags.*" />
      <Subtitulo T={T} idx={7} at={K.P3 + 0.1} until={K.E - 0.1} texto="Refresca: *temas nuevos.*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={E2 - 0.1} texto="2024: *347 usuarios* donaron sus datos." />
      <Subtitulo T={T} idx={9} at={E2 + 0.1} until={K.X - 0.1} texto="Lo que más pesó: *like y seguir.*" />
      <Subtitulo T={T} idx={10} at={K.X + 0.1} until={K.C - 0.1} texto="Entre *30 y 50 de cada 100* (estimado)." />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tú se la enseñas *con cada dedazo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Senales + 1.8, CUES.Peso - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Peso + 2.0, CUES.Ranking - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Ranking + 2.2, CUES.Pregunta - 0.15, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Paso1 + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Paso2 + 0.1, CUES.Estudio - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'grande-izq'],
        [E2 + 1.8, CUES.Explora - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Explora + 3.2, CUES.Cierre - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="20" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TikTokApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TikTok /></CompositionStage></div>;
}
window.TikTokApp = TikTokApp;
