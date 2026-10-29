// Shot Fungi Mati #20 · La rana no está dormida: el quitridio — NARRADO (N1 "Por dentro", gancho 7 "algo que tus ojos nunca van a ver").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (capas, tamaños y colores ilustrativos).

const QT = { rana:'#5fbf4a', rana2:'#2f7a2a', ranaGris:'#9aa197', hoja:'#2f9e44', hoja2:'#7fd18a', ojo:'#e8c94a',
  queratina:'#f2d98c', queratina2:'#b08d3c', epi:'#f0a6a0', epi2:'#c76d6d', nucleo:'#7b4a9a', dermis:'#e9bfae', sangre:'#d6403a',
  espora:'#bff0ff', saco:'#f8f3e3', escama:'#eef2dc', sala:'#1c1a1a', salaAm:'#ffd21a' };

// Latido que se va haciendo lento: frecuencia f0 − k·t (se detiene en t = f0/k). Devuelve 0..1 (pico del latido).
const LAT = { f0: 1.6, k: 0.16 };
function latidoEn(T) { const tc = Math.min(Math.max(T, 0), LAT.f0 / LAT.k); const ph = LAT.f0 * tc - LAT.k * tc * tc / 2; return Math.pow(Math.max(0, Math.sin(2 * Math.PI * ph)), 10); }

// Hoja grande donde está la rana.
function Hoja({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -470 90 Q -240 -300 380 -170 Q 500 -100 470 30 Q 140 330 -470 90 Z" fill={QT.hoja} stroke={KC.ink} strokeWidth={9} />
    <path d="M -440 80 Q 0 -60 450 -40" stroke={QT.hoja2} strokeWidth={9} fill="none" strokeLinecap="round" />
    {[-300, -150, 0, 150, 300].map((vx, i) => <path key={i} d={`M ${vx} ${-14 - vx * 0.06} q 60 ${-90 + i * 8} 140 ${-130 + i * 10} M ${vx} ${-14 - vx * 0.06} q 60 ${70 - i * 6} 130 ${110 - i * 8}`} stroke={QT.hoja2} strokeWidth={5} fill="none" opacity=".75" strokeLinecap="round" />)}
  </g>;
}

// Rana vista desde arriba, con las patas abiertas (postura de rana enferma).
// enferma 0..1 = se vuelve gris · ojos 0..1 = párpado cerrado · latido 0..1 (null = sin latido) · escamas 0..1 = la piel se cae en copos chicos.
function Rana({ T, x, y, s = 1, color = QT.rana, enferma = 0, ojos = 0.55, latido = null, escamas = 0, id = 'r' }) {
  const c = mixHex(color, QT.ranaGris, enferma * 0.85), d = mixHex(c, '#1d3a12', 0.35), cl = mixHex(c, '#ffffff', 0.3);
  const pata = (pts, w) => <><path d={pts} stroke={KC.ink} strokeWidth={w + 12} fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d={pts} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" /></>;
  const dedos = (px, py, angs, L) => angs.map((a, i) => { const ex = px + Math.cos(a) * L, ey = py + Math.sin(a) * L; return <g key={i}><line x1={px} y1={py} x2={ex} y2={ey} stroke={KC.ink} strokeWidth={15} strokeLinecap="round" /><line x1={px} y1={py} x2={ex} y2={ey} stroke={c} strokeWidth={7} strokeLinecap="round" /><circle cx={ex} cy={ey} r={8} fill={c} stroke={KC.ink} strokeWidth={3} /></g>; });
  const g = krng(7);
  const copos = Array.from({ length: 22 }, (_, i) => { const a = g() * Math.PI * 2, rr = Math.sqrt(g()); return { bx: Math.cos(a) * rr * 105, by: 20 + Math.sin(a) * rr * 140, f: g(), sz: 6 + g() * 7, sg: g() < 0.5 ? -1 : 1 }; });
  const pegados = Array.from({ length: 16 }, (_, i) => { const a = g() * Math.PI * 2, rr = Math.sqrt(g()); return [Math.cos(a) * rr * 95, Math.sin(a) * rr * 125 + 10, 5 + g() * 6, g() * 180]; });
  const copo = (sz, rot) => `M ${-sz} ${-sz * 0.3} L ${-sz * 0.2} ${-sz * 0.9} L ${sz * 0.9} ${-sz * 0.4} L ${sz * 0.6} ${sz * 0.7} L ${-sz * 0.5} ${sz * 0.6} Z`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* patas traseras abiertas hacia afuera */}
    {[-1, 1].map((k) => <g key={k}>{pata(`M ${k * 70} 120 L ${k * 215} 165 L ${k * 262} 285`, 44)}{dedos(k * 262, 285, [Math.PI / 2 + k * -0.9, Math.PI / 2 + k * -0.4, Math.PI / 2 + k * 0.05, Math.PI / 2 + k * 0.45].map((a) => a), 66)}</g>)}
    {/* patas delanteras */}
    {[-1, 1].map((k) => <g key={'d' + k}>{pata(`M ${k * 78} -40 L ${k * 165} -10 L ${k * 200} -95`, 30)}{dedos(k * 200, -95, [-Math.PI / 2 + k * 0.7, -Math.PI / 2 + k * 0.2, -Math.PI / 2 + k * 1.2], 38)}</g>)}
    {/* cuerpo y cabeza: contorno y relleno */}
    <ellipse cx={0} cy={40} rx={128} ry={152} fill={KC.ink} /><ellipse cx={0} cy={-95} rx={120} ry={98} fill={KC.ink} />
    <ellipse cx={0} cy={40} rx={120} ry={144} fill={c} /><ellipse cx={0} cy={-95} rx={112} ry={90} fill={c} />
    {/* pliegues claros del dorso y manchas */}
    <path d="M -70 -110 Q -95 40 -55 160 M 70 -110 Q 95 40 55 160" stroke={cl} strokeWidth={9} fill="none" strokeLinecap="round" opacity=".8" />
    {[[-30, 10, 22, 14], [28, 70, 26, 16], [-20, 120, 18, 12], [35, -30, 16, 11], [-50, 70, 14, 10]].map(([ex, ey, rx, ry], i) => <ellipse key={i} cx={ex} cy={ey} rx={rx} ry={ry} fill={d} opacity=".8" />)}
    {/* parches de piel engrosada (enferma) */}
    {pegados.map(([px, py, sz, r], i) => <path key={i} d={copo(sz)} transform={`translate(${px} ${py}) rotate(${r})`} fill={QT.escama} stroke={KC.ink} strokeWidth={2} opacity={escamas * 0.95} />)}
    {/* ojos con párpado */}
    {[-1, 1].map((k) => <g key={'o' + k} transform={`translate(${k * 64} -150)`}>
      <circle r={36} fill={c} stroke={KC.ink} strokeWidth={7} />
      <clipPath id={`ojo-${id}-${k}`}><circle r={24} /></clipPath>
      <g clipPath={`url(#ojo-${id}-${k})`}>
        <circle r={24} fill={mixHex(QT.ojo, '#8d8d7a', enferma)} />
        <ellipse rx={15} ry={7} fill={KC.ink} />
        <rect x={-26} y={-26} width={52} height={52 * ojos} fill={c} />
      </g>
      <circle r={24} fill="none" stroke={KC.ink} strokeWidth={4} />
      <path d={`M -23 ${-24 + 48 * ojos} Q 0 ${-18 + 48 * ojos} 23 ${-24 + 48 * ojos}`} stroke={KC.ink} strokeWidth={4} fill="none" />
    </g>)}
    <circle cx={-18} cy={-178} r={5} fill={KC.ink} /><circle cx={18} cy={-178} r={5} fill={KC.ink} />
    {/* corazón (esquema, se ve "a través" del pecho) */}
    <g transform={`translate(0 -20) scale(${1 + 0.28 * (latido || 0)})`} opacity={0.92}>
      {latido != null && latido > 0.05 && <circle r={34 + 40 * latido} fill="none" stroke="#ff8a8a" strokeWidth={4} opacity={latido * 0.8} />}
      <path d="M 0 22 C -40 -4 -30 -36 0 -18 C 30 -36 40 -4 0 22 Z" fill={latido == null ? '#8d8f8f' : KC.red} stroke={KC.ink} strokeWidth={4} />
    </g>
    {/* copos de piel que se caen */}
    {escamas > 0 && copos.map((q, i) => { const u = ((T * 0.32 + q.f) % 1 + 1) % 1; return <path key={'c' + i} d={copo(q.sz)}
      transform={`translate(${q.bx + q.sg * u * (60 + q.f * 70)} ${q.by + u * u * 170}) rotate(${T * 70 * q.sg + i * 40})`} fill={QT.escama} stroke={KC.ink} strokeWidth={2} opacity={escamas * Math.min(1, u * 6) * (1 - u)} />; })}
  </g>;
}

// Zoospora: cuerpo redondo con un flagelo atrás ("colita"). ang = hacia dónde nada (grados). cola 0..1 (0 = la absorbió).
function Zoospora({ T, x, y, r = 40, ang = 0, cola = 1, seed = 1, color = QT.espora }) {
  const L = r * 4.6 * cola, w = Math.sin(T * 14 + seed) * r * 0.35;
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    {cola > 0.02 && <path d={`M ${-r * 0.9} 0 q ${-L / 4} ${w} ${-L / 2} 0 t ${-L / 2} 0`} stroke={color} strokeWidth={Math.max(2, r * 0.14)} fill="none" strokeLinecap="round" />}
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={Math.max(2, r * 0.12)} />
    <circle cx={r * 0.15} cy={-r * 0.05} r={r * 0.38} fill="#6cb6d9" opacity=".8" />
    <circle cx={r * 0.35} cy={-r * 0.35} r={r * 0.16} fill="#fff" opacity=".9" />
  </g>;
}

// Corte de piel de rana (esquema). W = ancho del cuadro; sy = superficie (cuando no está engrosada).
// gros 0..1 = la capa de queratina se engruesa · sacos = [{x, crece, tubo, suelta}] · flechas 0..1 = O₂, agua y sales cruzando · atoro 0..1 = las sales se atoran.
function PielCorte({ T, W = 1080, sy = 760, alto = 420, gros = 0, sacos = [], flechas = 0, atoro = 0, seed = 3 }) {
  const g = krng(seed), hk = 46 + 90 * gros, kb = sy + 46, top = kb - hk, eb = kb + 150;
  const filas = [];
  const nf = Math.ceil(hk / 23);
  for (let r = 0; r < nf; r++) { const yy = kb - (r + 1) * 23; const off = (r % 2) * 45; for (let cx = -off; cx < W + 90; cx += 90) { const j = g(); const hh = r === nf - 1 ? Math.max(6, hk - r * 23) * (0.7 + 0.3 * j) : 20; filas.push(<rect key={r + '-' + cx} x={cx + 2} y={kb - r * 23 - hh - 2} width={86} height={hh} rx={9} fill={QT.queratina} stroke={QT.queratina2} strokeWidth={3} />); } }
  const celulas = [];
  for (let r = 0; r < 2; r++) for (let cx = (r % 2) * 40; cx < W + 80; cx += 80) celulas.push(<g key={'e' + r + cx}><ellipse cx={cx} cy={kb + 38 + r * 74} rx={38} ry={34} fill={QT.epi} stroke={QT.epi2} strokeWidth={3} /><circle cx={cx + 4} cy={kb + 38 + r * 74} r={11} fill={QT.nucleo} /></g>);
  const tipos = [['O₂', '#7fe3ff', 1], ['H₂O', '#4f8dff', -1], ['Na⁺', '#ffd84a', 1], ['K⁺', '#c48bff', -1], ['O₂', '#7fe3ff', 1], ['Na⁺', '#ffd84a', -1], ['K⁺', '#c48bff', 1], ['H₂O', '#4f8dff', 1]];
  return <g>
    <rect x={0} y={eb} width={W} height={alto} fill={QT.dermis} />
    <rect x={-20} y={eb + 70} width={W + 40} height={46} rx={23} fill={QT.sangre} stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx={((i * 160 + T * 120) % (W + 160)) - 60} cy={eb + 93} rx={20} ry={11} fill="#ff8a7a" stroke={KC.ink} strokeWidth={2} />)}
    {celulas}
    {filas}
    <path d={`M 0 ${top} L ${W} ${top}`} stroke="rgba(255,255,255,.35)" strokeWidth={3} strokeDasharray="10 10" />
    {sacos.map((q, i) => { const cr = kclamp(q.crece, 0, 1); if (cr <= 0) return null; const r = 8 + 30 * kEase.sale(cr), cy = kb - 30 - 8 * gros; const n = Math.floor(cr * 9);
      return <g key={'s' + i}>
        {q.tubo > 0 && <rect x={q.x - 7} y={klerp(cy - r, top - 6, q.tubo)} width={14} height={Math.max(0, (cy - r) - klerp(cy - r, top - 6, q.tubo) + 4)} fill={QT.saco} stroke={KC.ink} strokeWidth={3} />}
        <circle cx={q.x} cy={cy} r={r} fill={QT.saco} stroke={KC.ink} strokeWidth={4} />
        {Array.from({ length: n }, (_, j) => <circle key={j} cx={q.x + Math.cos(j * 2.4 + T * 2) * r * 0.5 * (j % 3 ? 1 : 0.4)} cy={cy + Math.sin(j * 2.4 + T * 2) * r * 0.5 * (j % 3 ? 1 : 0.4)} r={5} fill="#7fd3ff" stroke={KC.ink} strokeWidth={1.5} />)}
        {q.suelta > 0 && [0, 1, 2].map((j) => { const u = kclamp(q.suelta * 1.6 - j * 0.3, 0, 1); return u > 0 && u < 1 ? <Zoospora key={'z' + j} T={T} x={q.x + (j - 1) * 30 * u} y={top - 10 - u * 200} r={9} ang={-90 + (j - 1) * 25} seed={j + i} /> : null; })}
      </g>; })}
    {flechas > 0 && tipos.map(([lab, col, dir], i) => {
      const u = ((T * 0.42 + i / tipos.length) % 1 + 1) % 1, x = 70 + (i * (W - 140)) / (tipos.length - 1);
      const y0 = dir > 0 ? top - 150 : eb + 60, y1 = dir > 0 ? eb + 60 : top - 150; let yy = klerp(y0, y1, u);
      const sal = lab !== 'O₂';
      let o = flechas * Math.min(1, u * 5, (1 - u) * 5);
      if (sal && atoro > 0) { const tope = dir > 0 ? top - 26 : kb + 10; yy = dir > 0 ? Math.min(yy, klerp(yy, tope, atoro)) : Math.max(yy, klerp(yy, tope, atoro)); }
      return <g key={'f' + i} opacity={o}>
        <line x1={x} y1={yy - dir * 50} x2={x} y2={yy - dir * 16} stroke={col} strokeWidth={6} strokeLinecap="round" opacity=".7" />
        <circle cx={x} cy={yy} r={26} fill={col} stroke={KC.ink} strokeWidth={4} />
        <text x={x} y={yy + 8} textAnchor="middle" style={{ font:`700 ${lab.length > 2 ? 18 : 22}px ${KF.mono}` }} fill={KC.ink}>{lab}</text>
        {sal && atoro > 0.6 && <path d={`M ${x - 16} ${yy - 46} l 32 32 M ${x + 16} ${yy - 46} l -32 32`} transform={`translate(0 ${dir > 0 ? 0 : 60})`} stroke={KC.red} strokeWidth={8} strokeLinecap="round" opacity={kclamp((atoro - 0.6) * 2.5, 0, 1)} />}
      </g>; })}
  </g>;
}

// Rana chiquita (ícono) para la cuadrícula de especies.
function RanaIcono({ x, y, s = 1, color }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={3} rx={11} ry={10} fill={color} />
    <circle cx={-6} cy={-7} r={4.5} fill={color} /><circle cx={6} cy={-7} r={4.5} fill={color} />
    <path d="M -10 8 L -15 13 M 10 8 L 15 13" stroke={color} strokeWidth={4} strokeLinecap="round" />
  </g>;
}

// Salamandra de fuego vista desde arriba (negra con manchas amarillas). Largo ≈ 600 a s = 1, cabeza a la izquierda.
function Salamandra({ T = 0, x, y, s = 1, gris = 0, mueve = 1 }) {
  const n = mixHex(QT.sala, '#8a8a8a', gris), am = mixHex(QT.salaAm, '#c9c9c9', gris), w = Math.sin(T * 4) * 10 * mueve;
  const pata = (px, py, k, a) => <g><path d={`M ${px} ${py} q ${k * 10} ${a * 40} ${k * 30} ${a * 60}`} stroke={KC.ink} strokeWidth={26} fill="none" strokeLinecap="round" /><path d={`M ${px} ${py} q ${k * 10} ${a * 40} ${k * 30} ${a * 60}`} stroke={n} strokeWidth={16} fill="none" strokeLinecap="round" /></g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {pata(110, -20, 1, -1)}{pata(110, 20, 1, 1)}{pata(290, -22, -1, -1)}{pata(290, 22, -1, 1)}
    <path d={`M 320 -26 Q 460 ${-14 + w} 600 ${w * 1.6} Q 460 ${14 + w} 320 26 Z`} fill={n} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={205} cy={0} rx={140} ry={38} fill={n} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={52} cy={0} rx={64} ry={46} fill={n} stroke={KC.ink} strokeWidth={6} />
    {[[30, -26, 20, 12], [30, 26, 20, 12], [120, -16, 22, 10], [170, 14, 26, 10], [235, -14, 24, 10], [290, 12, 22, 9], [380, -6, 20, 7], [460, 4, 16, 6]].map(([cx, cy, rx, ry], i) => <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={am} />)}
    <circle cx={8} cy={-30} r={9} fill="#333" stroke={am} strokeWidth={3} /><circle cx={8} cy={30} r={9} fill="#333" stroke={am} strokeWidth={3} />
  </g>;
}

// Frasco de museo con un ejemplar en alcohol.
function Frasco({ x, y, s = 1, tipo = 'rana' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-150} width={140} height={34} rx={8} fill="#5b5f66" stroke={KC.ink} strokeWidth={5} />
    <rect x={-80} y={-118} width={160} height={210} rx={30} fill="rgba(230,245,255,.55)" stroke={KC.ink} strokeWidth={6} />
    <rect x={-72} y={-80} width={144} height={164} rx={24} fill="rgba(243,227,161,.55)" />
    {tipo === 'rana' ? <Rana T={0} x={0} y={8} s={0.2} color="#c9c39a" ojos={0.9} id={'fr' + x} /> : <Salamandra x={-56} y={4} s={0.19} gris={0.6} mueve={0} />}
    <rect x={-46} y={40} width={92} height={36} rx={4} fill="#fff8e6" stroke={KC.ink} strokeWidth={3} />
    <line x1={-34} y1={52} x2={30} y2={52} stroke="#7a6a50" strokeWidth={3} /><line x1={-34} y1={64} x2={14} y2={64} stroke="#7a6a50" strokeWidth={3} />
    <path d="M -60 -100 L -60 60" stroke="#fff" strokeWidth={8} opacity=".5" strokeLinecap="round" />
  </g>;
}

// Bloque de número con texto arriba y abajo.
function NumeroBloque({ T, at, until, valor, dur = 1.6, arriba, abajo, x, y, tam = 150, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = Math.round(klerp(0, valor, kprog(T, at, at + dur, kEase.sale)));
  const t = { font:`900 36px ${KF.texto}`, color:KC.ink, textShadow:'0 2px 0 rgba(255,255,255,.6)' };
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center', whiteSpace:'nowrap' }}>
    {arriba && <div style={t}>{arriba}</div>}
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}` }}>{kformato(v)}</div>
    {abajo && <div style={t}>{abajo}</div>}
  </div>;
}

// Electrocardiograma esquemático: latidos cada vez más separados y débiles, luego línea plana.
const ECG_LAT = [[330, 1], [450, 0.9], [590, 0.72], [760, 0.5], [930, 0.28]];
const ECG = { x0: 280, x1: 1020, y: 960, a: 0.4, d: 3.6 };
function ecgY(x) { let v = 0; for (const [b, A] of ECG_LAT) { v += -A * 120 * Math.exp(-Math.pow((x - b) / 7, 2)) + A * 45 * Math.exp(-Math.pow((x - b - 13) / 7, 2)) - A * 22 * Math.exp(-Math.pow((x - b - 55) / 18, 2)); } return ECG.y + v; }

function QuitridioShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Piel, Z: CUES.Zoosporas, Q: CUES.Queratina, E: CUES.Engrosa, Pr: CUES.Pregunta, Es: CUES.Estudio, C: CUES.Corazon, Sp: CUES.Especies, M: CUES.Mexico, Sa: CUES.Salamandras, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const lat = latidoEn(T);
  // cámara del corte: sacos de esporas que crecen en la capa de queratina
  const sacos = [
    { x: 420, crece: kprog(T, K.Q + 2.0, K.Q + 3.2), tubo: kprog(T, K.Q + 3.0, K.Q + 3.4), suelta: T < K.E ? kprog(T, K.Q + 3.5, K.Q + 4.4) : ((T - K.E) * 0.6) % 1 },
    { x: 720, crece: kprog(T, K.Q + 2.4, K.Q + 3.5), tubo: kprog(T, K.Q + 3.6, K.Q + 4.0), suelta: T < K.E ? 0 : ((T - K.E) * 0.6 + 0.4) % 1 },
    { x: 180, crece: kprog(T, K.Q + 2.9, K.Q + 3.9), tubo: kprog(T, K.E + 0.2, K.E + 0.6), suelta: T < K.E + 0.6 ? 0 : ((T - K.E) * 0.6 + 0.7) % 1 },
    { x: 920, crece: kprog(T, K.Q + 3.3, K.Q + 4.3), tubo: kprog(T, K.E + 0.5, K.E + 0.9), suelta: 0 },
  ];
  // la espora que llega, se pega, pierde la cola y entra
  const llega = kprog(T, K.Q, K.Q + 1.0, kEase.suave), entra = kprog(T, K.Q + 1.5, K.Q + 2.0, kEase.suave);
  const heroY = klerp(klerp(380, 760 - 12, llega), 806 - 30, entra);
  const gros = kprog(T, K.E, K.E + 1.4, kEase.suave);
  // la cuadrícula de 501 especies
  const g = krng(20), orden = Array.from({ length: 501 }, (_, i) => [g(), i]).sort((a, b) => a[0] - b[0]).map(([, i], k) => [i, k]).sort((a, b) => a[0] - b[0]).map(([, k]) => k);
  const ext = new Set(orden.map((k, i) => [k, i]).filter(([k]) => k < 90).map(([, i]) => i));
  const RESTAN = [12, 47, 63, 88];
  const P1 = mxProy(-96.6, 16.9), P2 = mxProy(-91.6, 15.2), P3 = mxProy(-84.8, 10.3);
  const MX = { x: 40, y: 560 }, pt = (p) => [MX.x + p[0], MX.y + p[1]];
  const [a1, a2, a3] = [pt(P1), pt(P2), pt(P3)];
  const ola = kprog(T, K.M + 1.4, K.M + 4.0, kEase.suave);
  const olaPunto = ola < 0.45 ? [klerp(a1[0], a2[0], ola / 0.45), klerp(a1[1], a2[1], ola / 0.45)] : [klerp(a2[0], a3[0], (ola - 0.45) / 0.55), klerp(a2[1], a3[1], (ola - 0.45) / 0.55)];
  const lupaPiel = (sacosL, gr, fl) => (Tl, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#0d2233" /><g transform={`scale(${(r * 2) / 560})`}><PielCorte T={Tl} W={560} sy={210} alto={500} gros={gr} sacos={sacosL} flechas={fl} seed={8} /></g></svg>;
  const sacosCierre = [{ x: 110, crece: 1, tubo: 1, suelta: (T * 0.6) % 1 }, { x: 290, crece: 1, tubo: 1, suelta: (T * 0.6 + 0.5) % 1 }, { x: 460, crece: 1, tubo: 0.6, suelta: 0 }];
  const sweep = kprog(T, K.C + ECG.a, K.C + ECG.a + ECG.d), xs = klerp(ECG.x0, ECG.x1, sweep);
  const ecgPath = (() => { let d = ''; for (let x = ECG.x0; x <= xs; x += 3) d += (d ? ' L ' : 'M ') + x + ' ' + ecgY(x).toFixed(1); return d; })();
  const corazonPulso = ECG_LAT.reduce((a, [b, A]) => Math.max(a, A * Math.exp(-Math.pow((xs - b) / 18, 2))), 0);
  const parado = xs > 980;

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la rana "dormida" en su hoja; la piel se le cae en copos chicos y el latido se hace lento */}
      <Escena T={T} a={K.G} b={K.P} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<><Hoja x={540} y={960} s={0.92} /><Rana T={T} x={540} y={900} s={0.75} enferma={0.25} ojos={0.62} latido={lat} escamas={kprog(T, K.G + 0.1, K.G + 0.8)} id="g" /></>)}
      </Escena>
      {/* 2 · la piel respira y controla agua y sales (lupa en rayos X) */}
      <Escena T={T} a={K.P} b={K.Z} zoom={0.1} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<><Hoja x={540} y={960} s={0.92} /><Rana T={T} x={540} y={900} s={0.75} enferma={0.3} ojos={0.66} latido={lat} escamas={1} id="p" /></>)}
      </Escena>
      <Lupa T={T} at={K.P + 0.3} until={K.Z - 0.4} x={460} y={470} r={190} fx={560} fy={900} tinte={KC.cyan} etiqueta="la piel = pulmón + riñón (en parte)" interior={lupaPiel([], 0, 1)} />
      {/* 3 · zoosporas nadando en el agua (fondo oscuro) */}
      <Escena T={T} a={K.Z} b={K.Q} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={26} color="rgba(127,211,255,.25)" />
        {fsvg(<>
          {Array.from({ length: 8 }, (_, i) => { const vx = 120 + (i % 3) * 40, xx = ((((T - K.Z) * vx + i * 173) % 1300) + 1300) % 1300 - 120, yy = 680 + i * 58 + Math.sin(T * 3 + i) * 34, dy = Math.cos(T * 3 + i) * 34 * 3;
            return <Zoospora key={i} T={T} x={xx} y={yy} r={i % 2 ? 30 : 38} ang={Math.atan2(dy, vx) * 180 / Math.PI} seed={i} />; })}
          {(() => { const p = kprog(T, K.Z, K.Z + 1.2, kEase.sale); const x = klerp(-80, 560, p) + Math.sin(T * 2) * 20, y = 560 + Math.sin(T * 2.6) * 26; return <Zoospora T={T} x={x} y={y} r={50} ang={Math.cos(T * 2.6) * 20} seed={9} />; })()}
        </>)}
      </Escena>
      {/* 4–5 · se meten en la queratina, crecen como bolsitas; la piel se engruesa y las sales se atoran */}
      <Escena T={T} a={K.Q} b={K.Pr} zoom={0.04} origen="50% 40%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} color="rgba(127,211,255,.22)" area={{ x: 0, y: 0, w: KW, h: 700 }} />
        {fsvg(<>
          <PielCorte T={T} W={1080} sy={760} alto={600} gros={gros} sacos={sacos} flechas={T > K.E - 0.2 ? kprog(T, K.E - 0.2, K.E + 0.3) : 0} atoro={kprog(T, K.E + 1.0, K.E + 2.0)} />
          {entra < 1 && <Zoospora T={T} x={420} y={heroY} r={13 + (1 - llega) * 26} ang={90} cola={1 - kprog(T, K.Q + 1.0, K.Q + 1.5)} seed={4} />}
          {T > K.Q + 0.95 && T < K.Q + 1.6 && <circle cx={420} cy={748} r={20 + 30 * kprog(T, K.Q + 0.95, K.Q + 1.5)} fill="none" stroke={KC.cyan} strokeWidth={4} opacity={1 - kprog(T, K.Q + 0.95, K.Q + 1.5)} />}
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={290} y={1010} tam={480} /><Rana T={T} x={290} y={470} s={0.45} enferma={0.55} ojos={0.75} latido={0} escamas={1} id="q" /></>)}
      </Escena>
      {/* 7 · el estudio de 2009 (Australia): rana arborícola verde y su sangre */}
      <Escena T={T} a={K.Es} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Rana T={T} x={400} y={1040} s={0.62} color="#6fcf6a" enferma={0.15} ojos={0.4} latido={latidoEn(T - K.Es)} escamas={0.6} id="l" />
          <g transform={`translate(820 ${klerp(1250, 1000, kprog(T, K.Es + 1.4, K.Es + 2.0, kEase.rebote))})`}>
            <rect x={-38} y={-150} width={76} height={260} rx={36} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={7} />
            <rect x={-30} y={-40} width={60} height={142} rx={28} fill={QT.sangre} />
            <rect x={-46} y={-176} width={92} height={40} rx={10} fill={KC.lilac} stroke={KC.ink} strokeWidth={6} />
          </g>
        </>)}
      </Escena>
      {/* 8 · sodio y potasio bajan; el corazón se detiene (fondo oscuro: dentro del cuerpo) */}
      <Escena T={T} a={K.C} b={K.Sp} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          {[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={ECG.x0} y1={830 + i * 52} x2={ECG.x1} y2={830 + i * 52} stroke="rgba(47,224,168,.12)" strokeWidth={2} />)}
          {Array.from({ length: 15 }, (_, i) => <line key={'v' + i} x1={ECG.x0 + i * 52} y1={830} x2={ECG.x0 + i * 52} y2={1090} stroke="rgba(47,224,168,.12)" strokeWidth={2} />)}
          {ecgPath && <path d={ecgPath} stroke={KC.mint} strokeWidth={7} fill="none" strokeLinejoin="round" style={{ filter:`drop-shadow(0 0 8px ${KC.mint})` }} />}
          {sweep > 0 && sweep < 1 && <circle cx={xs} cy={ecgY(xs)} r={10} fill="#fff" />}
          <g transform={`translate(150 960) scale(${2.3 * (1 + 0.3 * corazonPulso)})`}>
            <path d="M 0 22 C -40 -4 -30 -36 0 -18 C 30 -36 40 -4 0 22 Z" fill={parado ? '#6d7078' : KC.red} stroke={KC.ink} strokeWidth={4} />
          </g>
        </>)}
      </Escena>
      {/* 9 · al menos 501 especies en declive y 90 presuntas extinciones */}
      <Escena T={T} a={K.Sp} b={K.M} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {Array.from({ length: 501 }, (_, i) => { const k = orden[i], t0 = K.Sp + 0.3 + (k / 501) * 1.8; if (T < t0) return null;
            const on = kprog(T, t0, t0 + 0.25, kEase.rebote), apaga = kprog(T, K.Sp + 2.2, K.Sp + 3.0), muere = ext.has(i) ? kprog(T, K.Sp + 3.3 + (k / 90) * 1.0, K.Sp + 3.6 + (k / 90) * 1.0) : 0;
            const col = muere > 0 ? mixHex('#8fa37f', '#1b1b1b', muere) : mixHex('#36b23a', '#8fa37f', apaga);
            return <RanaIcono key={i} x={120 + (i % 29) * 29.5} y={668 + Math.floor(i / 29) * 30} s={on * 1.05} color={col} />; })}
        </>)}
      </Escena>
      {/* 10 · ejemplares de museo: la ola salió del sur de México */}
      <Escena T={T} a={K.M} b={K.Sa} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <MapaMexico x={MX.x} y={MX.y} ancho={1000} />
          {ola > 0 && <path d={`M ${a1[0]} ${a1[1]} L ${a2[0]} ${a2[1]} L ${a3[0]} ${a3[1]}`} stroke={KC.red} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${ola * 520} 999`} />}
          {ola > 0 && [0, 1, 2].map((j) => { const u = ((T * 0.9 + j / 3) % 1); return <circle key={j} cx={olaPunto[0]} cy={olaPunto[1]} r={14 + u * 70} fill="none" stroke={KC.red} strokeWidth={6} opacity={(1 - u) * 0.9} />; })}
          {[[a1, K.M + 1.4], [a2, K.M + 2.6], [a3, K.M + 4.0]].map(([p, t], i) => T > t - 0.05 && <circle key={i} cx={p[0]} cy={p[1]} r={16 * kprog(T, t - 0.05, t + 0.3, kEase.rebote)} fill={KC.red} stroke={KC.ink} strokeWidth={5} />)}
          {[[150, 'rana', 0], [330, 'salamandra', 0.25], [510, 'rana', 0.5]].map(([fx, tp, d], i) => { const p = kprog(T, K.M + d, K.M + d + 0.45, kEase.rebote); return p > 0 ? <g key={i} transform={`translate(${fx} 460) scale(${p})`}><Frasco x={0} y={0} s={0.85} tipo={tp} /></g> : null; })}
        </>)}
      </Escena>
      {/* 11 · el primo: Batrachochytrium salamandrivorans y las salamandras de fuego */}
      <Escena T={T} a={K.Sa} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Salamandra T={T} x={klerp(-700, 60, kprog(T, K.Sa, K.Sa + 1.0, kEase.sale))} y={470} s={1} gris={kprog(T, K.Sa + 2.6, K.Sa + 4.2) * 0.7} />
          {Array.from({ length: 100 }, (_, i) => { const t0 = K.Sa + 1.0 + i * 0.012, on = kprog(T, t0, t0 + 0.25, kEase.rebote); if (on <= 0) return null;
            const queda = RESTAN.includes(i), fade = queda ? 0 : kprog(T, K.Sa + 2.6 + ((i * 7) % 17) / 17 * 1.4, K.Sa + 2.9 + ((i * 7) % 17) / 17 * 1.4);
            return <g key={i} opacity={1 - fade * 0.85}><Salamandra x={95 + (i % 10) * 90} y={790 + Math.floor(i / 10) * 40} s={0.14 * on} gris={fade} mueve={0} /></g>; })}
          {T > K.Sa + 4.2 && RESTAN.map((i) => <circle key={'h' + i} cx={95 + (i % 10) * 90 + 42} cy={790 + Math.floor(i / 10) * 40} r={30 + 4 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={5} opacity={kprog(T, K.Sa + 4.2, K.Sa + 4.5)} />)}
        </>)}
      </Escena>
      {/* 12 · cierre: la misma rana en la misma hoja, ya gris; la lupa muestra las bolsitas del hongo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<><Hoja x={540} y={960} s={0.92} /><Rana T={T} x={540} y={900} s={0.75} enferma={kprog(T, K.Ci, K.Ci + 1.6)} ojos={klerp(0.66, 0.9, kprog(T, K.Ci, K.Ci + 1.6))} latido={null} escamas={1} id="c" /></>)}
      </Escena>
      <Lupa T={T} at={K.Ci + 1.2} until={K.Ou - 0.2} x={460} y={470} r={190} fx={560} fy={900} tinte={KC.yellow} etiqueta="zoosporangios" interior={lupaPiel(sacosCierre, 1, 0)} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.2} until={K.G + 4.8} texto="¿dormida?" x={290} y={520} tam={60} />
      <Etq T={T} at={K.Z + 0.6} until={K.Q - 0.3} x={60} y={380} texto="quitridio" tam={40} color={KC.texto} />
      <Etq T={T} at={K.Z + 1.0} until={K.Q - 0.3} x={60} y={440} texto="Batrachochytrium dendrobatidis (Bd)" it tam={32} color={KC.cyan} />
      <Chip T={T} at={K.Z + 2.0} until={K.Q - 0.3} texto="3–5 µm cada espora" x={540} y={1110} tam={36} borde={KC.cyan} />
      <Etq T={T} at={K.Q + 0.4} until={K.Pr - 0.3} x={60} y={T < K.E ? 690 : 600} texto="capa de queratina" tam={32} color={QT.queratina} />
      <Etq T={T} at={K.Q + 2.4} until={K.E - 0.2} x={480} y={690} texto="zoosporangio" tam={30} color={KC.texto} />
      <Medidor T={T} at={K.E + 0.3} until={K.Pr - 0.3} valor={(t) => 1 - 0.55 * kprog(t, K.E + 0.9, K.E + 2.6, kEase.suave)} etiqueta="paso de sales" texto={(v) => (v > 0.5 ? Math.round(v * 100) + ' %' : '< 50 %')} x={90} y={360} ancho={900} color={KC.red} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.C - 0.3} anio="2009" quien="Australia" revista="Voyles et al., Science 2009" y={560} />
      <Etq T={T} at={K.Es + 1.0} until={K.C - 0.3} x={60} y={790} texto="rana arborícola verde" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Es + 1.3} until={K.C - 0.3} x={60} y={836} texto="Litoria caerulea" it tam={30} color={KC.ink} />
      <Medidor T={T} at={K.C + 0.3} until={K.Sp - 0.3} valor={(t) => 1 - 0.2 * kprog(t, K.C + 0.8, K.C + 1.8, kEase.suave)} etiqueta="sodio (Na⁺)" texto={(v) => (v > 0.995 ? '100 %' : '≈ −' + Math.round((1 - v) * 100) + ' %')} x={60} y={440} ancho={600} color={KC.yellow} />
      <Medidor T={T} at={K.C + 0.6} until={K.Sp - 0.3} valor={(t) => 1 - 0.5 * kprog(t, K.C + 1.4, K.C + 2.6, kEase.suave)} etiqueta="potasio (K⁺)" texto={(v) => (v > 0.995 ? '100 %' : '≈ −' + Math.round((1 - v) * 100) + ' %')} x={60} y={580} ancho={600} color={KC.lilac} />
      <Chip T={T} at={K.C + 3.6} until={K.Sp - 0.3} texto="el corazón se detuvo" x={540} y={740} tam={40} borde={KC.red} />
      <NumeroBloque T={T} at={K.Sp + 0.3} until={K.Sp + 3.1} valor={501} dur={1.8} arriba="al menos" abajo="especies en declive" x={340} y={430} tam={150} color={KC.paper} />
      <NumeroBloque T={T} at={K.Sp + 3.3} until={K.M - 0.3} valor={90} dur={1.0} arriba="y" abajo="presuntas extinciones" x={340} y={430} tam={150} color="#4a4a4a" />
      <Chip T={T} at={K.Sp + 0.8} until={K.Sp + 4.2} texto="Scheele et al., Science 2019" x={340} y={612} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.Sp + 4.4} until={K.M - 0.3} texto="cifras debatidas (Lambert et al. 2020)" x={370} y={612} tam={26} borde={KC.red} />
      <Etq T={T} at={K.M + 0.7} until={K.Sa - 0.3} x={60} y={600} texto="frascos de museo" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 1.5} until={K.Sa - 0.3} x={60} y={a1[1] - 80} texto="sur de México · inicios de los 70" tam={26} color={KC.ink} />
      <Etq T={T} at={K.M + 2.7} until={K.Sa - 0.3} x={a2[0] + 14} y={a2[1] + 46} texto="Guatemala · 80s–90s" tam={24} color={KC.ink} />
      <Etq T={T} at={K.M + 4.0} until={K.Sa - 0.3} x={a3[0] - 26} y={a3[1] + 6} texto="Costa Rica · 1987" lado="izq" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Sa + 0.8} until={K.Sa + 2.5} x={60} y={650} texto="Batrachochytrium salamandrivorans (Bsal)" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.Sa + 1.0} until={K.Ci - 0.3} x={500} y={560} texto="salamandra de fuego" tam={26} color={KC.ink} />
      <Etq T={T} at={K.Sa + 1.2} until={K.Ci - 0.3} x={500} y={600} texto="Salamandra salamandra" it tam={26} color={KC.ink} />
      <Chip T={T} at={K.Sa + 2.6} until={K.Ci - 0.3} texto="Países Bajos · 2010 → 2013" x={330} y={650} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Sa + 4.3} until={K.Ci - 0.3} valor={4} dur={0.5} sufijo=" %" x={540} y={1000} tam={220} color={KC.yellow} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Z} texto="5 cm" largo={235} />
      <BarraEscala T={T} at={K.Z} until={K.Q} texto="5 µm" largo={100} />
      <BarraEscala T={T} at={K.Q} until={K.Pr} texto="50 µm" largo={180} />
      <BarraEscala T={T} at={K.Pr} until={K.Es} texto="5 cm" largo={140} />
      <BarraEscala T={T} at={K.Es} until={K.C} texto="5 cm" largo={160} />
      <BarraEscala T={T} at={K.M} until={K.Sa} texto="500 km" largo={113} />
      <BarraEscala T={T} at={K.Sa} until={K.Ci} texto="10 cm" largo={333} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="5 cm" largo={235} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="No está dormida: *un hongo le para el corazón.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.Z - 0.1} texto="Por la piel: *aire, agua y sales.*" />
      <Subtitulo T={T} idx={2} at={K.Z + 0.1} until={K.Q - 0.1} texto="Esporas del *quitridio*, con colita." />
      <Subtitulo T={T} idx={3} at={K.Q + 0.1} until={K.E - 0.1} texto="Se meten en la *queratina* y crecen." />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.Pr - 0.1} texto="Piel gruesa: *menos de la mitad* de sales." />
      <Subtitulo T={T} idx={5} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Cómo mata *a una rana entera?*" />
      <Subtitulo T={T} idx={6} at={K.Es + 0.1} until={K.C - 0.1} texto="2009, Australia: *sangre de ranas infectadas.*" />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.Sp - 0.1} texto="Menos sodio y potasio: *el corazón se detuvo.*" />
      <Subtitulo T={T} idx={8} at={K.Sp + 0.1} until={K.M - 0.1} texto="Al menos *501 especies* (2019)." />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.Sa - 0.1} texto="La ola salió *del sur de México.*" />
      <Subtitulo T={T} idx={10} at={K.Sa + 0.1} until={K.Ci - 0.1} texto="Su primo: quedó *el 4 %* de las salamandras." />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No está dormida: *algo que nunca verás.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.P + 0.5, K.Z - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Q + 0.4, K.E - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Pr + 0.05, K.Es + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.C + 0.5, K.Sp - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Sp + 0.4, K.Sp + 4.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.M + 0.5, K.Sa - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Sa + 2.6, K.Ci - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ci + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="20" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function QuitridioApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><QuitridioShot /></CompositionStage></div>;
}
window.QuitridioApp = QuitridioApp;
