// Shot IA #33 · La IA que sabe a qué huele una molécula sin olerla — NARRADO (N4 "La imagen que se llena" + N1 "Por dentro").
// Datos: Lee, Mayhew… Mainland y Wiltschko, "A principal odor map unifies diverse tasks in olfactory perception", Science 381:999 (2023);
// carvona: Friedman y Miller, Science 172:1044 (1971). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.
const PIEL = '#f2b48c', MENTA = '#3fbf4a', CAFE = '#9a6a3a', IAC = KC.cyan;

/* ---------- carvona (2-metil-5-isopropenil-ciclohex-2-en-1-ona), fórmula de esqueleto ---------- */
const CARV_N = [[0, -80], [69, -40], [69, 40], [0, 80], [-69, 40], [-69, -40], [0, -160], [138, -80], [-138, 80], [-138, 160], [-207, 40]];
const CARV_E = [[0, 1, 1], [1, 2, 2], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 0, 1], [0, 6, 2], [1, 7, 1], [4, 8, 1], [8, 9, 2], [8, 10, 1]];
// modo grafo g (0..1): los átomos se vuelven puntos y los enlaces líneas de color.
function Carvona({ x, y, s = 1, espejo = false, g = 0, o = 1, T = 0, brillo = 0 }) {
  const lin = mixHex(KC.ink, IAC, g);
  const dobles = (a, b) => { const [x1, y1] = CARV_N[a], [x2, y2] = CARV_N[b], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * 9, ny = dx / L * 9;
    return <><line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} stroke={lin} strokeWidth={8} strokeLinecap="round" />
      <line x1={x1 - nx} y1={y1 - ny} x2={x2 - nx} y2={y2 - ny} stroke={lin} strokeWidth={8} strokeLinecap="round" /></>; };
  return <g transform={`translate(${x} ${y}) scale(${espejo ? -s : s} ${s})`} opacity={o}>
    {brillo > 0 && <circle r={230} fill={IAC} opacity={0.18 * brillo} />}
    {CARV_E.map(([a, b, k], i) => {
      if (a === 4 && b === 8 && g < 0.5) { const [x1, y1] = CARV_N[a], [x2, y2] = CARV_N[b]; // cuña (estereocentro)
        return <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2 - 12} L ${x2} ${y2 + 12} Z`} fill={lin} stroke={lin} strokeWidth={3} strokeLinejoin="round" />; }
      return k === 2 ? <g key={i}>{dobles(a, b)}</g> : <line key={i} x1={CARV_N[a][0]} y1={CARV_N[a][1]} x2={CARV_N[b][0]} y2={CARV_N[b][1]} stroke={lin} strokeWidth={8} strokeLinecap="round" />;
    })}
    {g < 0.5 && <g transform={`translate(0 -172) scale(${espejo ? -1 : 1} 1)`}><circle r={30} fill={KC.paper} /><text y={16} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.red}>O</text></g>}
    {g > 0 && CARV_N.map(([nx, ny], i) => <circle key={i} cx={nx} cy={ny} r={(i === 6 ? 24 : 20) * (1 + 0.08 * Math.sin(T * 5 + i))} fill={i === 6 ? KC.red : '#1d2b4a'} stroke={i === 6 ? KC.ink : IAC} strokeWidth={6} opacity={g} />)}
  </g>;
}
// Hoja de papel con la molécula dibujada.
function HojaMolecula({ x, y, s = 1, T, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(3)`} opacity={o}>
    <rect x={-190} y={-150} width={380} height={300} rx={16} fill="#fffdf6" stroke={KC.ink} strokeWidth={7} />
    <Carvona x={30} y={10} s={0.62} />
  </g>;
}
/* ---------- la nariz (perfil, la cabeza se sale del cuadro a la izquierda) ---------- */
function Nariz({ x, y, s = 1, T, inhala = 1 }) {
  const f = 1 + 0.12 * inhala * Math.max(0, Math.sin(T * 3.2));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={-260} cy={-30} r={250} fill={PIEL} stroke={KC.ink} strokeWidth={9} />
    <path d="M -40 -210 C -10 -130 50 -50 115 30 C 145 70 125 112 78 110 C 60 132 25 134 2 116 L -60 116 L -60 -210 Z" fill={PIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-70} y={-205} width={30} height={318} fill={PIEL} />
    <ellipse cx={52} cy={100} rx={22 * f} ry={11 * f} fill="#7a3b2a" />
    <path d="M -120 -150 q 30 -26 60 0" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M -40 190 q 40 18 80 0" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
  </g>;
}
// Ramita de hierbabuena (hojas aserradas opuestas).
function Hierbabuena({ x, y, s = 1, T = 0 }) {
  const hoja = (k, lado, yy, sz) => { const a = lado * (38 + 6 * Math.sin(T * 1.5 + k));
    let d = 'M 0 0'; for (let i = 1; i <= 6; i++) d += ` L ${i * 13 * sz} ${-((i % 2) ? 26 : 20) * sz * Math.sin(Math.PI * i / 7)}`;
    for (let i = 6; i >= 1; i--) d += ` L ${i * 13 * sz} ${((i % 2) ? 26 : 20) * sz * Math.sin(Math.PI * i / 7)}`;
    return <g key={k} transform={`translate(0 ${yy}) rotate(${lado > 0 ? -a : 180 + a})`}>
      <path d={d + ' Z'} fill={MENTA} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <line x1={4} y1={0} x2={80 * sz} y2={0} stroke="#1f7a2a" strokeWidth={4} /></g>; };
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${4 * Math.sin(T * 1.2)})`}>
    <path d="M 0 140 Q 6 40 0 -120" stroke="#2d7a34" strokeWidth={10} fill="none" strokeLinecap="round" />
    {[[0, 1, 90, 1.1], [1, -1, 90, 1.1], [2, 1, 10, 1], [3, -1, 10, 1], [4, 1, -70, 0.8], [5, -1, -70, 0.8]].map(([k, l, yy, sz]) => hoja(k, l, yy, sz))}
    <ellipse cx={0} cy={-128} rx={18} ry={26} fill={MENTA} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Semillas de alcaravea (aquenios alargados, un poco curvos, con costillas claras).
function Alcaravea({ x, y, s = 1 }) {
  const sem = [[-110, -10, -25], [-35, -40, 10], [45, -5, -15], [120, -35, 25], [-70, 50, 35], [20, 60, -40], [100, 45, 5]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {sem.map(([sx, sy, r], i) => <g key={i} transform={`translate(${sx} ${sy}) rotate(${r})`}>
      <path d="M -46 4 Q -20 -14 0 -13 Q 24 -12 46 2 Q 22 8 0 9 Q -22 12 -46 4 Z" fill={CAFE} stroke={KC.ink} strokeWidth={4.5} strokeLinejoin="round" />
      <path d="M -36 1 Q 0 -10 36 0 M -34 5 Q 0 -2 34 3" stroke="#e6c38f" strokeWidth={2.5} fill="none" />
    </g>)}
  </g>;
}
// Ondas de olor que viajan de (x1,y1) a (x2,y2).
function Ondas({ x1, y1, x2, y2, T, color = MENTA, o = 1 }) {
  return <g opacity={o}>{[0, 1, 2].map((k) => { const dy = (k - 1) * 34;
    return <path key={k} d={`M ${x1} ${y1 + dy} C ${klerp(x1, x2, 0.33)} ${y1 + dy - 40} ${klerp(x1, x2, 0.66)} ${y2 + dy + 40} ${x2} ${y2 + dy * 0.4}`}
      stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" strokeDasharray="26 22" strokeDashoffset={T * 90 + k * 15} opacity={0.85} />; })}</g>;
}
// Robotito con pinza en la nariz (nunca ha olido nada).
function RobotPinza({ x, y, s = 1, T, pinza = 1, cara = 'feliz' }) {
  const b = Math.sin(T * 3) * 6;
  return <g>
    <Robotito x={x} y={y} s={s} T={T} cara={cara} />
    <g transform={`translate(${x} ${y + b + 2 * s}) scale(${s})`}>
      <path d="M 0 -14 L 13 10 L -13 10 Z" fill="#ffb38a" stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      {pinza > 0 && <g transform={`translate(0 ${-2 - (1 - pinza) * 60}) rotate(${-8 + (1 - pinza) * 30})`} opacity={Math.min(1, pinza * 3)}>
        <rect x={-46} y={-9} width={92} height={18} rx={6} fill="#e7b46a" stroke={KC.ink} strokeWidth={4} />
        <rect x={-46} y={5} width={92} height={14} rx={6} fill="#d29a4c" stroke={KC.ink} strokeWidth={4} />
        <circle cx={-18} cy={5} r={7} fill="#9aa3ad" stroke={KC.ink} strokeWidth={3} />
      </g>}
    </g>
  </g>;
}
/* ---------- el mapa de olores (esquema; zonas y colores ilustrativos) ---------- */
const ZONAS = [
  { n: 'floral', x: 0.22, y: 0.28, c: KC.pink }, { n: 'cremoso', x: 0.5, y: 0.2, c: '#fff1c9' }, { n: 'a pasto', x: 0.8, y: 0.3, c: MENTA },
  { n: 'a nuez', x: 0.3, y: 0.68, c: '#c98a4b' }, { n: 'a ajo', x: 0.58, y: 0.55, c: KC.yellow }, { n: 'a pescado', x: 0.84, y: 0.74, c: KC.cyan }, { n: 'a carne', x: 0.12, y: 0.82, c: KC.red },
];
const PUNTOS = (() => { const r = krng(33), out = [];
  for (let i = 0; i < 1600; i++) { const z = ZONAS[Math.floor(r() * ZONAS.length)], a = r() * 6.283, d = Math.pow(r(), 0.7) * 0.2;
    out.push({ x: kclamp(z.x + Math.cos(a) * d, 0.03, 0.97), y: kclamp(z.y + Math.sin(a) * d * 1.1, 0.04, 0.96), c: z.c }); }
  return out; })();
function MapaOlores({ x, y, w, h, T, n = 0, etiquetas = 1, nuevo = null, o = 1, tam = 30 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <rect width={w} height={h} rx={28} fill="#0f1830" stroke={KC.ink} strokeWidth={8} />
    {ZONAS.map((z, i) => <circle key={i} cx={z.x * w} cy={z.y * h} r={Math.min(w, h) * 0.2} fill={z.c} opacity={0.16} />)}
    {PUNTOS.slice(0, n).map((p, i) => <circle key={i} cx={p.x * w} cy={p.y * h} r={Math.max(3, w / 160)} fill={p.c} opacity={0.85} />)}
    {etiquetas > 0 && ZONAS.map((z, i) => <text key={'t' + i} x={z.x * w} y={z.y * h + tam * 0.35} textAnchor="middle" opacity={etiquetas}
      style={{ font:`900 ${tam}px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={tam / 6} paintOrder="stroke">{z.n}</text>)}
    {nuevo && <g opacity={nuevo.o}><circle cx={nuevo.x * w} cy={nuevo.y * h} r={18 + 6 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={6} />
      <circle cx={nuevo.x * w} cy={nuevo.y * h} r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>}
  </g>;
}
/* ---------- las cinco familias del almizcle (glifos esquemáticos) ---------- */
const hexP = (cx, cy, r, lados = 6, rot = -90) => Array.from({ length: lados }, (_, i) => { const a = (rot + i * 360 / lados) * Math.PI / 180; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
function GlifoAlmizcle({ tipo, x, y, s = 1, o = 1 }) {
  const st = { fill: 'none', stroke: KC.ink, strokeWidth: 7, strokeLinejoin: 'round', strokeLinecap: 'round' };
  let c = null;
  if (tipo === 'macro') c = <><polygon points={hexP(0, 0, 66, 15)} {...st} /><line x1={0} y1={-66} x2={0} y2={-98} {...st} stroke={KC.red} /></>;
  if (tipo === 'poli') c = <><polygon points={hexP(-30, 0, 34)} {...st} /><polygon points={hexP(29, 0, 34)} {...st} /><polygon points={hexP(59, -51, 34, 5)} {...st} /></>;
  if (tipo === 'nitro') c = <><polygon points={hexP(0, 8, 32)} {...st} /><text x={-62} y={-36} style={{ font:`900 28px ${KF.texto}` }} fill={KC.blue}>NO₂</text><text x={6} y={-36} style={{ font:`900 28px ${KF.texto}` }} fill={KC.blue}>NO₂</text></>;
  if (tipo === 'esteroide') c = <><polygon points={hexP(-60, 18, 30, 6, 0)} {...st} /><polygon points={hexP(-15, -8, 30, 6, 0)} {...st} /><polygon points={hexP(30, 18, 30, 6, 0)} {...st} /><polygon points={hexP(72, -8, 26, 5, 0)} {...st} /></>;
  if (tipo === 'cadena') c = <polyline points={Array.from({ length: 10 }, (_, i) => `${-100 + i * 22},${i % 2 ? -14 : 14}`).join(' ')} {...st} />;
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={92} fill="#fff" stroke={KC.ink} strokeWidth={6} />{c}</g>;
}
/* ---------- panelista con frasco ---------- */
function Panelista({ x, y, s = 1, T, color, k = 0 }) {
  const b = Math.sin(T * 2.4 + k) * 4, olfa = (Math.sin(T * 2 + k * 1.3) + 1) / 2;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -46 90 Q -46 20 0 20 Q 46 20 46 90 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={0} cy={-14} r={34} fill={PIEL} stroke={KC.ink} strokeWidth={6} />
    <path d="M 22 -18 l 12 10 l -12 4" fill={PIEL} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <g transform={`translate(${44 + 4 * olfa} ${4 - 6 * olfa})`}>
      <rect x={-9} y={-8} width={18} height={40} rx={6} fill="#dff6ff" stroke={KC.ink} strokeWidth={4} />
      <rect x={-11} y={-16} width={22} height={10} rx={3} fill={KC.ink} />
      <rect x={-6} y={12} width={12} height={16} rx={3} fill={KC.mint} opacity=".8" />
    </g>
  </g>;
}

// Contador con salida (el del kit no se apaga).
function ContadorH({ T, at, until, hasta, dur = 2, sufijo = '', prefijo = '', x, y, tam = 72, color = KC.ink }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube'), v = hasta * kprog(T, at, at + dur, kEase.suave);
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) translateY(${e.y * 0.4}px)`, opacity:e.o, font:`700 ${tam}px ${KF.mono}`, color, whiteSpace:'nowrap' }}>{prefijo}{kformato(v, 0)}{sufijo}</div>;
}

function Olor() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, E: CUES.Espejo, Ca: CUES.Catalogo, R: CUES.Red, P: CUES.Pregunta, Es: CUES.Estudio, Re: CUES.Resultado, A: CUES.Almizcle, M: CUES.Mapa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // escena del inicio (se repite transformada en el cierre)
  const inicio = (t0, fin) => <>
    <Nariz x={330} y={560} s={0.95} T={T} />
    <Hierbabuena x={520} y={660} s={0.85} T={T} />
    <Ondas x1={480} y1={600} x2={380} y2={650} T={T} o={kprog(T, t0, t0 + 0.4)} />
    <HojaMolecula x={770} y={1010} s={0.95} T={T} />
    <RobotPinza x={290} y={1010} s={0.85} T={T} pinza={fin ? 1 : kprog(T, t0 + 1.4, t0 + 1.8, kEase.rebote)} cara={fin ? 'feliz' : 'duda'} />
  </>;
  // escaneo del robot a la hoja
  const esc = kprog(T, K.G + 2.6, K.G + 3.4);
  // Catálogo: 50 cuadritos (1 = 100 moléculas)
  const llenos = Math.round(50 * kprog(T, K.Ca + 0.3, K.Ca + 3.2, kEase.suave));
  const pal = [KC.pink, KC.yellow, MENTA, KC.orange, KC.cyan, KC.lilac, '#fff1c9'];
  // Resultado: 100 moléculas, 53 donde la IA quedó más cerca (orden esquemático)
  const ordenR = React.useMemo(() => { const r = krng(53), a = Array.from({ length: 100 }, (_, i) => i); for (let i = 99; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } const m = {}; a.forEach((v, i) => { m[v] = i; }); return m; }, []);
  const pintadas = Math.round(100 * kprog(T, K.Re + 0.3, K.Re + 2.6, kEase.suave));
  // Mapa: medio millón de puntos (esquema: 1,600 puntos dibujados)
  const nMapa = Math.round(1600 * kprog(T, K.M + 0.4, K.M + 3.6, (p) => p * p));
  const dimMapa = 1 - 0.7 * kprog(T, K.M + 3.9, K.M + 4.4);
  // Red: la molécula entra como grafo, cruza la red y cae en el mapa
  const gR = kprog(T, K.R + 0.2, K.R + 1.2, kEase.suave), onda = kprog(T, K.R + 1.2, K.R + 2.6);
  const vuelo = kprog(T, K.R + 2.6, K.R + 3.4, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tú hueles; la IA con pinza solo ve el dibujo */}
      <Escena T={T} a={K.G} b={K.E}>
        <FondoLunares color={KC.pink} />
        {svg(<>{inicio(K.G, false)}
          {esc > 0 && esc < 1 && <path d={`M 330 990 L 600 ${900 + 220 * esc} L 600 ${900 + 220 * esc - 40} Z`} fill={IAC} opacity={0.45} />}
          <g opacity={kprog(T, K.G + 2.6, K.G + 3.0)}><rect x={610} y={880 + 240 * ((T * 0.8) % 1)} width={330} height={6} fill={IAC} opacity={0.7} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 4.2} until={K.E - 0.1} texto="«huele a hierbabuena»" x={330} y={790} tam={36} borde={IAC} />
      {/* 2 · el espejo: carvona */}
      <Escena T={T} a={K.E} b={K.Ca}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <rect x={526} y={560} width={28} height={540} rx={10} fill="#cfe9f5" stroke={KC.ink} strokeWidth={6} />
          <line x1={534} y1={640} x2={534} y2={760} stroke="#fff" strokeWidth={5} opacity=".8" />
          <Carvona x={300} y={760} s={0.85} T={T} o={kprog(T, K.E + 0.1, K.E + 0.5)} />
          <g opacity={kprog(T, K.E + 0.8, K.E + 1.4)} transform={`translate(${(1 - kprog(T, K.E + 0.8, K.E + 1.4, kEase.sale)) * -120} 0)`}><Carvona x={780} y={760} s={0.85} espejo T={T} /></g>
          <g opacity={kprog(T, K.E + 3.4, K.E + 3.8)}><Hierbabuena x={290} y={1010} s={0.62} T={T} /></g>
          <g opacity={kprog(T, K.E + 4.6, K.E + 5.0)}><Alcaravea x={790} y={1030} s={0.85} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.E + 1.8} until={K.Ca - 0.2} texto="carvona: mismos átomos, en espejo" x={420} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.E + 3.6} until={K.Ca - 0.2} texto="huele a hierbabuena" x={280} y={1150} tam={30} borde={MENTA} />
      <Chip T={T} at={K.E + 4.8} until={K.Ca - 0.2} texto="huele a alcaravea" x={800} y={1150} tam={30} borde={CAFE} />
      {/* 3 · el catálogo: 5,000 moléculas ya descritas */}
      <Escena T={T} a={K.Ca} b={K.R}>
        <FondoLunares color={KC.mint} />
        {svg(<g transform="translate(140 520)">
          {Array.from({ length: 50 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10), on = i < llenos, e = kprog(T, K.Ca + 0.3 + i * 0.058, K.Ca + 0.5 + i * 0.058, kEase.rebote);
            return <g key={i} transform={`translate(${c * 80 + 36} ${r * 80 + 36}) scale(${on ? klerp(0.4, 1, e) : 1})`}>
              <rect x={-33} y={-33} width={66} height={66} rx={12} fill={on ? pal[(i * 3) % pal.length] : 'rgba(255,255,255,.35)'} stroke={KC.ink} strokeWidth={on ? 5 : 3} />
              {on && <polygon points={hexP(0, 0, 16)} fill="none" stroke={KC.ink} strokeWidth={4} />}
            </g>; })}
        </g>)}
      </Escena>
      <ContadorH T={T} at={K.Ca + 0.3} until={K.R - 0.2} prefijo="≈ " hasta={5000} dur={2.9} x={540} y={440} tam={64} sufijo=" moléculas" />
      <Chip T={T} at={K.Ca + 1.4} until={K.R - 0.2} texto="1 cuadrito = 100 moléculas" x={540} y={965} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Ca + 3.3} until={K.R - 0.2} texto="cremoso" x={250} y={1080} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 3.9} until={K.R - 0.2} texto="a ajo" x={540} y={1110} tam={40} borde={KC.yellow} />
      <Chip T={T} at={K.Ca + 4.5} until={K.R - 0.2} texto="a pasto" x={830} y={1080} tam={40} borde={KC.yellow} />
      {/* 4 · por dentro de la máquina: átomos y enlaces → red → mapa */}
      <Escena T={T} a={K.R} b={K.P}>
        <FondoCircuito T={T} />
        {svg(<>
          <Carvona x={680} y={470} s={0.8} g={gR} T={T} brillo={onda > 0 && onda < 1 ? 1 : 0} />
          <MapaOlores x={290} y={990} w={500} h={190} T={T} n={260} tam={20} o={kprog(T, K.R + 2.2, K.R + 2.6)}
            nuevo={{ x: 0.24, y: 0.3, o: kprog(T, K.R + 3.3, K.R + 3.4) }} />
          {vuelo > 0 && vuelo < 1 && <circle cx={klerp(900, 290 + 0.24 * 500, vuelo)} cy={klerp(820, 990 + 0.3 * 190, vuelo) - Math.sin(Math.PI * vuelo) * 120} r={14} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />}
        </>)}
        <RedNeuronal T={T} x={180} y={650} ancho={720} alto={300} capas={[4, 6, 6, 3]} onda={onda > 0 && onda < 1 ? onda : null} o={kprog(T, K.R + 0.8, K.R + 1.2)} />
      </Escena>
      <Chip T={T} at={K.R + 0.5} until={K.P - 0.2} texto="átomos = puntos · enlaces = líneas" x={540} y={640} tam={30} borde={IAC} />
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={290} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 900)`}>?</text>)}
      </Escena>
      {/* 6 · el estudio */}
      <Escena T={T} a={K.Es} b={K.Re}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 15 }, (_, i) => { const c = i % 5, r = Math.floor(i / 5), t0 = K.Es + 4.4 + i * 0.08;
          return <g key={i} opacity={kprog(T, t0, t0 + 0.3)}><Panelista x={170 + c * 185} y={730 + r * 140} s={0.95} T={T} k={i} color={pal[i % pal.length]} /></g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 4.1} anio="2023" quien="Google Research + Centro Monell (Filadelfia)" revista="Lee, Mayhew… Mainland y Wiltschko · Science" y={680} />
      <Chip T={T} at={K.Es + 4.3} until={K.Re - 0.2} texto="15 personas entrenadas" x={360} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Es + 6.4} until={K.Re - 0.2} texto="400 moléculas nuevas" x={360} y={560} tam={38} borde={IAC} />
      <Chip T={T} at={K.Es + 8.0} until={K.Re - 0.2} texto="55 palabras de olor" x={540} y={1140} tam={36} borde={KC.yellow} />
      {/* 7 · resultado: 53 de cada 100 */}
      <Escena T={T} a={K.Re} b={K.A}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g transform="translate(320 650)">
          {Array.from({ length: 100 }, (_, i) => { const c = i % 10, r = Math.floor(i / 10), ord = ordenR[i], on = ord < pintadas, ia = ord < 53;
            return <rect key={i} x={c * 44 + 3} y={r * 44 + 3} width={38} height={38} rx={7} fill={!on ? 'rgba(0,0,0,.08)' : ia ? IAC : KC.gold2} stroke={KC.ink} strokeWidth={on ? 4 : 2} />; })}
        </g>)}
      </Escena>
      <NumeroGigante T={T} at={K.Re + 2.4} until={K.A - 0.2} valor={53} dur={0.8} sufijo=" %" x={380} y={470} tam={170} color={IAC} />
      <Chip T={T} at={K.Re + 0.6} until={K.A - 0.2} texto="■ IA más cerca   ■ catador típico más cerca" x={540} y={1130} tam={26} borde={KC.ink} />
      {/* 8 · el almizcle, su peor resultado */}
      <Escena T={T} a={K.A} b={K.M}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{[['macro', 220, 780, 'macrociclo'], ['poli', 860, 760, 'policíclico'], ['nitro', 200, 1070, 'nitro'], ['esteroide', 880, 1060, 'tipo esteroide'], ['cadena', 540, 1100, 'cadena recta']].map(([t, gx, gy, nom], i) => {
          const t0 = K.A + 1.6 + i * 0.3, e = kprog(T, t0, t0 + 0.4, kEase.rebote), jx = klerp(gx, 540, 0.12 * kprog(T, K.A + 3.4, K.A + 4.6)), jy = klerp(gy, 860, 0.12 * kprog(T, K.A + 3.4, K.A + 4.6));
          return <g key={i} opacity={kprog(T, t0, t0 + 0.2)}>
            <line x1={jx} y1={jy} x2={540} y2={860} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 12" opacity=".5" />
            <GlifoAlmizcle tipo={t} x={jx} y={jy} s={0.75 * klerp(0.5, 1, e)} />
            <text x={jx} y={jy + 96} textAnchor="middle" style={{ font:`900 28px ${KF.texto}` }} fill={KC.ink}>{nom}</text>
          </g>; })}
          <g transform={`translate(540 860) scale(${klerp(0.6, 1, kprog(T, K.A + 0.2, K.A + 0.6, kEase.rebote))})`} opacity={kprog(T, K.A + 0.1, K.A + 0.4)}>
            {[[-70, 0, 70], [10, -30, 80], [80, 10, 65], [0, 40, 70]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" stroke={KC.ink} strokeWidth={6} />)}
            {[[-70, 0, 64], [10, -30, 74], [80, 10, 59], [0, 40, 64]].map(([cx, cy, r], i) => <circle key={'b' + i} cx={cx} cy={cy} r={r} fill="#fff" />)}
            <text y={22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.violet}>almizcle</text>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.A + 0.5} until={K.M - 0.2} texto="✗ su peor resultado" x={660} y={500} tam={40} borde={KC.red} />
      {/* 9 · el mapa: medio millón de moléculas de olor desconocido */}
      <Escena T={T} a={K.M} b={K.C}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaOlores x={70} y={640} w={940} h={530} T={T} n={nMapa} tam={34} etiquetas={kprog(T, K.M + 0.2, K.M + 0.6)} o={dimMapa} />)}
      </Escena>
      <ContadorH T={T} at={K.M + 0.4} until={K.C - 0.2} prefijo="≈ " hasta={500000} dur={3.2} x={360} y={430} tam={70} />
      <Chip T={T} at={K.M + 1.0} until={K.C - 0.2} texto="moléculas de olor desconocido" x={360} y={520} tam={30} borde={KC.ink} />
      <NumeroGigante T={T} at={K.M + 4.0} until={K.C - 0.2} valor={70} dur={1.4} sufijo=" años" etiqueta="olerlas todas: 1 persona" x={540} y={880} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.M + 5.0} until={K.C - 0.2} texto="oliendo sin parar" x={540} y={1080} tam={40} borde={KC.yellow} />
      {/* 10 · cierre: la misma imagen del inicio, ya con su punto en el mapa */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<>{inicio(K.C, true)}
          <MapaOlores x={640} y={690} w={340} h={130} T={T} n={500} etiquetas={0} o={kprog(T, K.C + 0.8, K.C + 1.2)} nuevo={{ x: 0.24, y: 0.3, o: 1 }} />
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.5} until={K.Ou} texto="«huele a hierbabuena» ✔" x={330} y={790} tam={34} borde={KC.leaf} />
      <Chip T={T} at={K.C + 2.2} until={K.Ou} texto="sin olerlo nunca" x={770} y={1190} tam={34} borde={IAC} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.E - 0.1} texto="Tú hueles… *la IA solo mira.*" />
      <Subtitulo T={T} idx={1} at={K.E + 0.1} until={K.Ca - 0.1} texto="Mismos átomos, *otro olor.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.R - 0.1} texto="*5,000 moléculas* ya descritas" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.P - 0.1} texto="Átomos y enlaces → *un mapa*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Es - 0.1} texto="¿Mejor que *una persona?*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.Re - 0.1} texto="2023: *15 catadores, 400 moléculas*" />
      <Subtitulo T={T} idx={6} at={K.Re + 0.1} until={K.A - 0.1} texto="*53 de cada 100:* más cerca la IA" />
      <Subtitulo T={T} idx={7} at={K.A + 0.1} until={K.M - 0.1} texto="Su peor olor: *almizcle*" />
      <Subtitulo T={T} idx={8} at={K.M + 0.1} until={K.C - 0.1} texto="*Medio millón* de olores por conocer" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo lee en un dibujo… *sin olerlo.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Espejo + 3.5, CUES.Catalogo - 0.15, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Red + 0.3, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.8, CUES.Resultado - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Resultado + 1.2, CUES.Almizcle - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Almizcle + 0.3, CUES.Mapa - 0.15, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Mapa + 3.0, CUES.Cierre - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="33" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function OlorApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Olor /></CompositionStage></div>;
}
window.OlorApp = OlorApp;
