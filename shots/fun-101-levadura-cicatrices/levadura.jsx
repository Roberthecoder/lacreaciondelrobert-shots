// Shot Fungi Mati #101 · Esa levadura de tu pan no es inmortal: cuenta a sus hijas en cicatrices — NARRADO
// (gancho 1 "esto no es X: es Y" · formato N1 por dentro + N5 el experimento). Guion y fuentes: guion.md · verificacion.md.
// Morfología: Saccharomyces cerevisiae ovalada (≈5 × 6 µm), sin hifas; la yema brota por un cuello angosto con un anillo de
// quitina; al soltarse, la madre se queda con un cráter (cicatriz de gemación) y la hija con una marca tenue (de nacimiento).
// El dibujo es esquemático.

const LV = { cito:'#f7e3a6', cito2:'#efcf7c', pared:'#c9963a', nucleo:'#b18cff', nucleo2:'#6b4fb5', vac:'#9fd8f0', quitina:'#E8A62A',
  crater:'#b98428', craterIn:'#8a5f18', uv:'#c8ecff', uvFondo:'#0a0a2a', uvCel:'#191a45', masa:'#f3e2bd', masa2:'#e2c48c', masa3:'#c9a463', tazon:'#ff6b5a', tazon2:'#d9483a' };
const PXUM = 66;                     // 66 px = 1 µm en el microscopio (barra de 5 µm = 330 px)
const RX0 = 2.5 * PXUM, RY0 = 3 * PXUM; // célula de 5 × 6 µm
const DEG = Math.PI / 180;
const A1 = 25, A2 = 160, A3 = -150;  // sitios de las 3 primeras yemas (grados)
// posiciones de las cicatrices sobre la cara visible (unidades de la elipse): las 3 primeras donde brotaron las yemas
const CIC = (() => {
  const L = [A1, A2, A3].map((a) => [0.84 * Math.cos(a * DEG), 0.84 * Math.sin(a * DEG)]);
  for (let i = 0; i < 27; i++) { const r = 0.18 + 0.62 * Math.sqrt((i + 0.5) / 27), th = i * 2.39996 + 0.7; L.push([r * Math.cos(th), r * Math.sin(th)]); }
  return L;
})();

// Una cicatriz de gemación (~1 µm): anillo de quitina con borde levantado y una cúpula al centro, sobre la cara visible
// (achatada por la perspectiva). tam = radio en px (33 px ≈ 0.5 µm de radio a escala 1).
function Cicatriz({ u, v, rx, ry, o = 1, uv = 0, tam = 33 }) {
  const rho = Math.min(0.97, Math.hypot(u, v)), ang = Math.atan2(v, u) / DEG, k = Math.sqrt(1 - rho * rho) * 0.75 + 0.25;
  const x = u * rx, y = v * ry;
  return <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})`} opacity={o}>
    {!uv && <ellipse rx={tam * k} ry={tam} fill="#e9c46a" stroke={LV.crater} strokeWidth={7} />}
    {!uv && <ellipse cx={-tam * k * 0.12} cy={-tam * 0.12} rx={tam * k * 0.55} ry={tam * 0.55} fill="#f6dc92" opacity=".9" />}
    {!uv && <ellipse rx={tam * k + 2} ry={tam + 2} fill="none" stroke={KC.ink} strokeWidth={2.5} opacity=".55" />}
    {uv > 0 && <ellipse rx={tam * k} ry={tam} fill="rgba(200,236,255,.12)" stroke={LV.uv} strokeWidth={7}
      style={{ filter:`drop-shadow(0 0 ${8 * uv}px ${LV.uv}) drop-shadow(0 0 ${18 * uv}px #7fd0ff)` }} />}
  </g>;
}

// Célula de levadura. n = cicatrices (puede ser fraccionario), brotes = [{ a, p, sep, anillo, tabique, div }],
// uv 0..1 = vista de fluorescencia (calcoflúor), viejo 0..1 = pared gruesa y arrugada, gris = deja de brotar.
function Celula({ x, y, s = 1, n = 0, uv = 0, viejo = 0, gris = 0, brotes = [], T = 0, seed = 1, numeros = 0, tamCic = 33 }) {
  const rx = RX0, ry = RY0, mov = mece(T, seed, 0.2) * 3;
  const borde = (k = 1, w = 0) => { const N = 72; let d = ''; for (let i = 0; i <= N; i++) { const t = i / N * Math.PI * 2; const r = 1 + w * Math.sin(t * 9 + seed) * 0.03 + w * Math.sin(t * 5 + 2) * 0.02;
    d += `${i ? 'L' : 'M'} ${(rx * k * r * Math.cos(t)).toFixed(1)} ${(ry * k * r * Math.sin(t)).toFixed(1)} `; } return d + 'Z'; };
  const fill = mixHex(mixHex(LV.cito, '#cbbd9a', gris), LV.uvCel, uv), stroke = mixHex(KC.ink, '#3d4592', uv);
  const yemas = brotes.filter((b) => b && b.p > 0);
  const Yema = ({ b }) => {
    const dir = [Math.cos(b.a * DEG), Math.sin(b.a * DEG)], E = [rx * 0.97 * dir[0], ry * 0.97 * dir[1]];
    const bx = 108 * b.p, by = 118 * b.p, d = bx * 0.86 + (b.sep || 0) * 190, C = [E[0] + dir[0] * d, E[1] + dir[1] * d];
    const nac = kclamp(((b.sep || 0) - 0.1) * 2, 0, 1);
    return <g opacity={b.o == null ? 1 : b.o}>
      <g transform={`translate(${C[0].toFixed(1)} ${C[1].toFixed(1)}) rotate(${b.a})`}>
        <ellipse rx={bx} ry={by} fill={fill} stroke={stroke} strokeWidth={6} />
        <ellipse rx={bx * 0.8} ry={by * 0.8} fill="none" stroke={LV.pared} strokeWidth={5} opacity=".35" />
        {b.div >= 0.75 && <circle cx={-bx * 0.1} cy={0} r={26 * b.p} fill={LV.nucleo} stroke={LV.nucleo2} strokeWidth={3} />}
        {nac > 0 && <ellipse cx={-bx * 0.9} cy={0} rx={6} ry={26 * b.p} fill="none" stroke={LV.quitina} strokeWidth={4} opacity={0.55 * nac} />}
      </g>
      {(b.sep || 0) < 0.12 && <ellipse cx={E[0]} cy={E[1]} rx={26 * b.p} ry={46 * b.p} transform={`rotate(${b.a} ${E[0]} ${E[1]})`} fill={fill} />}
    </g>;
  };
  const Anillo = ({ b }) => {
    const dir = [Math.cos(b.a * DEG), Math.sin(b.a * DEG)], E = [rx * 0.97 * dir[0], ry * 0.97 * dir[1]];
    const alto = 44 * Math.min(1, b.p * 1.6), brillo = b.anillo || 0, tab = b.tabique || 0;
    if ((b.sep || 0) > 0.05) return null;
    return <g transform={`translate(${E[0].toFixed(1)} ${E[1].toFixed(1)}) rotate(${b.a})`}>
      <ellipse rx={10} ry={alto} fill="none" stroke={LV.quitina} strokeWidth={8 + brillo * 3} opacity={0.55 + 0.45 * brillo}
        style={brillo ? { filter:`drop-shadow(0 0 ${12 * brillo}px ${LV.quitina})` } : null} />
      {tab > 0 && <line x1={0} y1={-alto * tab} x2={0} y2={alto * tab} stroke={LV.quitina} strokeWidth={9} strokeLinecap="round" />}
    </g>;
  };
  // núcleo de la madre: con la yema que se divide, viaja al cuello, se estira en reloj de arena a través de él y se parte
  const bd = yemas.find((b) => b.div > 0 && b.div < 1);
  let nucleoMadre = { x: -20, y: 14 }, reloj = null;
  if (bd) {
    const dir = [Math.cos(bd.a * DEG), Math.sin(bd.a * DEG)], E = [rx * 0.97 * dir[0], ry * 0.97 * dir[1]];
    const bx = 108 * bd.p, Cb = [E[0] + dir[0] * bx * 0.86, E[1] + dir[1] * bx * 0.86];
    const ida = kEase.suave(kclamp(bd.div / 0.3, 0, 1)), est = kEase.suave(kclamp((bd.div - 0.3) / 0.45, 0, 1)), vuelve = kEase.suave(kclamp((bd.div - 0.75) / 0.25, 0, 1));
    const A = [klerp(-20, E[0] - dir[0] * 40, ida), klerp(14, E[1] - dir[1] * 40, ida)];
    if (bd.div < 0.75) {
      const B = [klerp(A[0], Cb[0] - dir[0] * 10, est), klerp(A[1], Cb[1] - dir[1] * 10, est)];
      reloj = { A, B, cintura: klerp(30, 9, est), r: klerp(34, 28, est) };
    } else {
      nucleoMadre = { x: klerp(E[0] - dir[0] * 40, -20, vuelve), y: klerp(E[1] - dir[1] * 40, 14, vuelve) };
    }
    if (bd.div < 0.75) nucleoMadre = null;
  }
  const k = 1 + viejo * 0.08;
  return <g transform={`translate(${x} ${y}) rotate(${mov}) scale(${s})`}>
    {yemas.map((b, i) => <Yema key={i} b={b} />)}
    <path d={borde(k, viejo)} fill={fill} stroke={stroke} strokeWidth={6 + viejo * 4} strokeLinejoin="round" />
    <path d={borde(k * (0.9 - viejo * 0.04), viejo)} fill="none" stroke={uv ? '#2a2f6a' : LV.pared} strokeWidth={6 + viejo * 8} opacity={uv ? 0.6 : 0.35} />
    {uv < 1 && <g opacity={1 - uv}>
      <ellipse cx={30} cy={-40} rx={62 * k} ry={55 * k} fill={LV.vac} opacity={0.75 - gris * 0.3} />
      {nucleoMadre && <circle cx={nucleoMadre.x} cy={nucleoMadre.y} r={34} fill={LV.nucleo} stroke={LV.nucleo2} strokeWidth={4} opacity={1 - gris * 0.4} />}
      {[[-90, 90], [80, 110], [-60, -120], [100, 30]].map(([a, b], i) => <circle key={i} cx={a * k} cy={b * k} r={9} fill={LV.cito2} />)}
    </g>}
    {CIC.slice(0, Math.ceil(n)).map(([u, v], i) => <Cicatriz key={i} u={u * k} v={v * k} rx={rx} ry={ry} uv={uv} tam={tamCic} o={i === Math.ceil(n) - 1 ? (n - Math.floor(n) || 1) : 1} />)}
    {numeros > 0 && CIC.slice(0, Math.min(Math.ceil(n), 10)).map(([u, v], i) => { const o = kclamp(numeros * 10 - i, 0, 1); return o > 0 ?
      <text key={'n' + i} x={u * k * rx + 26} y={v * k * ry - 18} style={{ font:`700 30px ${KF.mono}` }} fill="#ffffff" stroke={KC.ink} strokeWidth={5} paintOrder="stroke" opacity={o}>{i + 1}</text> : null; })}
    {yemas.map((b, i) => <Anillo key={'a' + i} b={b} />)}
    {reloj && (() => { const { A, B, cintura, r } = reloj, dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      const d = `M ${A[0] + nx * r} ${A[1] + ny * r} Q ${M[0] + nx * cintura} ${M[1] + ny * cintura} ${B[0] + nx * r} ${B[1] + ny * r} A ${r} ${r} 0 1 0 ${B[0] - nx * r} ${B[1] - ny * r} Q ${M[0] - nx * cintura} ${M[1] - ny * cintura} ${A[0] - nx * r} ${A[1] - ny * r} A ${r} ${r} 0 1 0 ${A[0] + nx * r} ${A[1] + ny * r} Z`;
      return <path d={d} fill={LV.nucleo} stroke={LV.nucleo2} strokeWidth={4} opacity={1 - uv} />; })()}
  </g>;
}

// Tazón con masa de pan. sube 0..1 = cuánto ha levado; desborda 0..1 = se sale del tazón.
function Tazon({ T, x, y, s = 1, sube = 0, desborda = 0, plop = -9 }) {
  const h = 70 + 150 * sube + 70 * desborda, w = 310 + 40 * desborda;
  const domo = `M ${-w} 0 Q ${-w - 10} ${-h * 0.75} ${-w * 0.55} ${-h * 0.95} Q 0 ${-h * 1.18} ${w * 0.55} ${-h * 0.95} Q ${w + 10} ${-h * 0.75} ${w} 0 Z`;
  const g = krng(7), burb = Array.from({ length: 14 }, () => ({ x: (g() * 2 - 1) * w * 0.8, y: -h * (0.25 + g() * 0.6), r: 6 + g() * 12 }));
  const pp = kprog(T, plop, plop + 0.35);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={domo} fill={LV.masa} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w * 0.6} ${-h * 0.82} Q 0 ${-h * 1.05} ${w * 0.5} ${-h * 0.86}`} stroke="#fff8e6" strokeWidth={14} fill="none" opacity=".7" strokeLinecap="round" />
    {burb.filter((b) => Math.abs(b.x) < w * 0.75).map((b, i) => <circle key={i} cx={b.x} cy={b.y} r={b.r * (0.8 + 0.2 * Math.sin(T * 2 + i))} fill={LV.masa2} stroke={LV.masa3} strokeWidth={3} />)}
    {pp > 0 && pp < 1 && <g transform={`translate(${-60} ${-h * 1.02})`}>
      <circle r={16 + pp * 30} fill="none" stroke={KC.ink} strokeWidth={5 * (1 - pp)} />
      {[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1={Math.cos(a * DEG) * (20 + pp * 30)} y1={Math.sin(a * DEG) * (20 + pp * 30)} x2={Math.cos(a * DEG) * (32 + pp * 44)} y2={Math.sin(a * DEG) * (32 + pp * 44)} stroke={KC.ink} strokeWidth={5} opacity={1 - pp} strokeLinecap="round" />)}
    </g>}
    {pp <= 0 && <circle cx={-60} cy={-h * 1.0} r={18} fill={LV.masa2} stroke={KC.ink} strokeWidth={4} />}
    {desborda > 0 && [[-w + 20, 1], [w - 30, -1]].map(([dx, sg], i) => <path key={i} d={`M ${dx - 30 * sg} 0 Q ${dx + 10 * sg} ${40 * desborda} ${dx + 20 * sg} ${70 * desborda} Q ${dx + 34 * sg} ${80 * desborda} ${dx + 40 * sg} 0 Z`} fill={LV.masa} stroke={KC.ink} strokeWidth={6} />)}
    <path d="M -340 -6 Q -320 250 0 262 Q 320 250 340 -6 Z" fill={LV.tazon} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -300 40 Q -270 200 -120 236" stroke={LV.tazon2} strokeWidth={16} fill="none" strokeLinecap="round" />
    <path d="M -250 30 Q -230 120 -170 170" stroke="#ffb0a6" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".8" />
    <ellipse cx={0} cy={-6} rx={344} ry={20} fill="none" stroke={KC.ink} strokeWidth={9} />
  </g>;
}

// Rebanada de masa por dentro: burbujas de CO₂ atrapadas en la red de gluten.
function Rebanada({ T, x, y, w = 880, h = 370, p = 1 }) {
  const g = krng(11), B = Array.from({ length: 34 }, (_, i) => ({ x: 40 + g() * (w - 80), y: 40 + g() * (h - 80), r: 10 + g() * 26, f: g() * 6 }));
  const big = [5, 12, 20];
  return <g transform={`translate(${x - w / 2} ${y - h / 2})`}>
    <rect x={0} y={0} width={w} height={h} rx={60} fill={LV.masa} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M 30 ${30 + i * 40} Q ${w * 0.3} ${10 + i * 40 + Math.sin(i) * 20} ${w * 0.55} ${40 + i * 40} T ${w - 30} ${30 + i * 40}`} stroke={LV.masa2} strokeWidth={4} fill="none" opacity=".8" />)}
    {B.map((b, i) => { const r = b.r * (big.includes(i) ? 1.9 : 1) * (0.6 + 0.4 * p) * (1 + 0.06 * Math.sin(T * 1.6 + b.f));
      return <g key={i}>
        <circle cx={b.x} cy={b.y} r={r} fill="#fff6dd" stroke={LV.masa3} strokeWidth={4} />
        <circle cx={b.x - r * 0.3} cy={b.y - r * 0.3} r={r * 0.25} fill="#ffffff" opacity=".8" />
        {big.includes(i) && <text x={b.x} y={b.y + 12} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={p}>CO₂</text>}
      </g>; })}
  </g>;
}
// Sobre genérico de levadura (sin marca real).
function Sobre({ x, y, s = 1, rot = -8 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -90 -110 L -70 -122 L -50 -110 L -30 -122 L -10 -110 L 10 -122 L 30 -110 L 50 -122 L 70 -110 L 90 -122 L 90 110 L -90 110 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-74} y={-60} width={148} height={70} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={-14} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>LEVADURA</text>
    <g transform="translate(0 60)">{[[-30, 0], [0, -10], [30, 4]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={16} ry={19} fill={LV.cito} stroke={KC.ink} strokeWidth={4} />)}</g>
  </g>;
}
// Gotero (calcoflúor).
function Gotero({ x, y, gota = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-22} y={-200} width={44} height={60} rx={18} fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
    <path d="M -16 -142 L 16 -142 L 8 0 L -8 0 Z" fill="rgba(200,236,255,.7)" stroke={KC.ink} strokeWidth={5} />
    {gota > 0 && gota < 1 && <ellipse cx={0} cy={14 + gota * 220} rx={10} ry={14} fill={LV.uv} stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Lupa redonda que muestra lo de adentro (dibujado en coordenadas de la lupa, centro 0,0).
function LupaLev({ x, y, r, o = 1, id, apunta, children }) {
  if (o <= 0) return null;
  return <g opacity={o}>
    {apunta && <line x1={x} y1={y} x2={apunta[0]} y2={apunta[1]} stroke={KC.ink} strokeWidth={8} strokeDasharray="4 14" strokeLinecap="round" />}
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <circle cx={x} cy={y} r={r} fill={KC.dark} />
    <g clipPath={`url(#${id})`}><g transform={`translate(${x} ${y})`}>{children}</g></g>
    <circle cx={x} cy={y} r={r} fill="none" stroke={KC.white} strokeWidth={14} />
    <circle cx={x} cy={y} r={r + 9} fill="none" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Barra de vida (cuántas hijas le quedan), esquemática.
function BarraVida({ x, y, w = 420, p = 1, lleno = 1, color = KC.mint, texto }) {
  return <g transform={`translate(${x} ${y})`} opacity={p > 0 ? 1 : 0}>
    <rect x={0} y={0} width={w} height={40} rx={20} fill="rgba(255,255,255,.12)" stroke={KC.texto} strokeWidth={4} />
    <rect x={4} y={4} width={Math.max(0, (w - 8) * lleno * p)} height={32} rx={16} fill={color} />
    {texto && <text x={0} y={-16} style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>{texto}</text>}
  </g>;
}
// Letrero grande (Anton) con etiqueta arriba.
function Letrero({ T, at, until, texto, etiqueta, x, y, tam = 150, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center' }}>
    {etiqueta && <div style={{ font:`900 40px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA, marginBottom:4, whiteSpace:'nowrap' }}>{etiqueta}</div>}
    <div style={{ font:`400 ${tam}px/0.95 ${KF.titulo}`, color, WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}
function Fondo({ color }) { return <div style={{ position:'absolute', inset:0, background:color }}></div>; }

function LevaduraShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Masa, Ce: CUES.Celula, Y: CUES.Yema, An: CUES.Anillo, Ri: CUES.Ritmo, P: CUES.Pregunta, E: CUES.Estudio,
    Li: CUES.Limite, Ca: CUES.Calcofluor, Cr: CUES.Crece, HJ: CUES.HijaJoven, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const pr = (a, b, e) => kprog(T, a, b, e);

  // —— microscopio A: la primera hija, la segunda y la tercera ——
  const b1 = { a: A1, p: pr(K.Y + 0.3, K.Y + 3.0, kEase.sale), div: pr(K.Y + 2.4, K.An + 0.6), anillo: pr(K.An + 0.1, K.An + 0.6) * (1 - pr(K.An + 2.0, K.An + 2.4)),
    tabique: pr(K.An + 1.0, K.An + 1.6), sep: pr(K.An + 2.1, K.An + 3.6, kEase.suave), o: 1 - pr(K.Ri + 0.2, K.Ri + 0.8) };
  const b2 = { a: A2, p: pr(K.Ri + 0.2, K.Ri + 1.3, kEase.sale), div: pr(K.Ri + 0.9, K.Ri + 1.4), anillo: 0.3, tabique: pr(K.Ri + 1.3, K.Ri + 1.5), sep: pr(K.Ri + 1.5, K.Ri + 2.2, kEase.suave), o: 1 - pr(K.Ri + 2.0, K.Ri + 2.4) };
  const b3 = { a: A3, p: pr(K.Ri + 2.1, K.Ri + 3.0, kEase.sale), div: pr(K.Ri + 2.7, K.Ri + 3.1), anillo: 0.3, tabique: pr(K.Ri + 3.0, K.Ri + 3.2), sep: pr(K.Ri + 3.2, K.Ri + 3.9, kEase.suave), o: 1 - pr(K.Ri + 3.6, K.Ri + 4.0) };
  const nA = (T > K.An + 2.4 ? 1 : 0) + (T > K.Ri + 1.6 ? 1 : 0) + (T > K.Ri + 3.3 ? 1 : 0);
  const hijasA = nA;
  const desplP = pr(K.P - 0.2, K.P + 0.5, kEase.suave);
  const entraCel = pr(K.Ce - 0.3, K.Ce + 0.9, kEase.sale);

  // —— microscopio B: se llena de cicatrices, se detiene, calcoflúor ——
  const nB = 3 + 22 * pr(K.Li + 0.3, K.Li + 3.2, kEase.suave);
  const para = pr(K.Li + 3.3, K.Li + 4.2);
  const uv = pr(K.Ca + 1.2, K.Ca + 1.7) * (1 - pr(K.Cr - 0.1, K.Cr + 0.4));
  const gota = pr(K.Ca + 0.4, K.Ca + 1.1);
  const crece = 1 + 0.25 * pr(K.Li + 0.3, K.Li + 3.2, kEase.suave);

  // —— estudio: hijas que quita el micromanipulador ——
  const cicloE = 1.05, t0E = K.E + 1.0, iE = Math.floor((T - t0E) / cicloE), fE = ((T - t0E) / cicloE) - iE;
  const hijasE = T < t0E ? 0 : Math.min(iE, 5);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la masa de tu pan y, en la lupa, una levadura con cicatrices */}
      <Escena T={T} a={K.G} b={K.Ma} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tazon T={T} x={540} y={1000} s={1.05} sube={0.15 + 0.2 * pr(K.G, K.Ma)} plop={K.G + 0.25} />
          <LupaLev id="lupaG" x={300} y={560} r={185} o={pr(K.G + 0.5, K.G + 1.0, kEase.sale)} apunta={[470, 880]}>
            <Celula T={T} x={0} y={0} s={0.62} n={pr(K.G + 1.0, K.G + 2.4) * 3} brotes={[{ a: A1, p: pr(K.G + 1.6, K.G + 3.6, kEase.sale), anillo: 0.6, div: 0 }]} />
          </LupaLev>
        </>)}
      </Escena>
      {/* 2 · por dentro de la masa: burbujas de CO₂ */}
      <Escena T={T} a={K.Ma} b={K.Ce} zoom={0.12} origen="50% 55%">
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Rebanada T={T} x={540} y={985} p={pr(K.Ma + 0.2, K.Ma + 1.6, kEase.sale)} />
          <Sobre x={180} y={690} s={0.85} />
          {[0, 1, 2, 3, 4].map((i) => { const u = ((T - K.Ma) * 0.5 + i * 0.2) % 1; return <g key={i} opacity={Math.sin(Math.PI * u)}>
            <path d={`M ${330 + i * 110} ${820 - u * 160} l 0 -40 m -14 14 l 14 -14 l 14 14`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" /></g>; })}
        </>)}
      </Escena>
      {/* 3–7 · al microscopio: la madre, su yema, el anillo de quitina, las cicatrices */}
      <Escena T={T} a={K.Ce} b={K.E} zoom={0.04}>
        <Fondo color={KC.dark} />
        <Ambiente T={T} n={22} color="rgba(255,225,140,.18)" />
        {fsvg(<>
          <Celula T={T} x={klerp(540, 400, desplP)} y={klerp(900, 850, desplP)} s={klerp(0.25, 1, entraCel)} n={nA} brotes={[b1, b2, b3]} />
          {T > K.P - 0.2 && <g opacity={desplP}><Interrogacion T={T} x={850} y={860} tam={330} /></g>}
        </>)}
      </Escena>
      {/* 8 · el estudio: Mortimer y Johnston quitan cada hija con el micromanipulador */}
      <Escena T={T} a={K.E} b={K.Li} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <LupaLev id="ocular" x={540} y={950} r={225} o={pr(K.E + 0.5, K.E + 0.9, kEase.sale)}>
            <Celula T={T} x={-40} y={0} s={0.55} n={hijasE} brotes={T > t0E && iE < 5 ? [{ a: 20, p: kclamp(fE * 2.2, 0, 1), anillo: 0.3, div: 0, sep: kclamp((fE - 0.6) * 2.5, 0, 1) * 1.6 }] : []} />
            {T > t0E && iE < 5 && (() => { const u = kclamp((fE - 0.5) * 2.5, 0, 1); return <g>
              <line x1={260} y1={-160} x2={klerp(200, 105, Math.sin(Math.PI * u))} y2={klerp(-60, 25, Math.sin(Math.PI * u))} stroke="#e8f6ff" strokeWidth={10} strokeLinecap="round" />
              <line x1={262} y1={-162} x2={klerp(200, 105, Math.sin(Math.PI * u))} y2={klerp(-60, 25, Math.sin(Math.PI * u))} stroke={KC.ink} strokeWidth={3} opacity=".6" />
            </g>; })()}
          </LupaLev>
        </>)}
      </Escena>
      {/* 9–10 · se llena de cicatrices, se detiene; calcoflúor + luz UV */}
      <Escena T={T} a={K.Li} b={K.Cr} zoom={0.03}>
        <Fondo color={mixHex(KC.dark, LV.uvFondo, uv)} />
        <Ambiente T={T} n={18} color={uv > 0.5 ? 'rgba(150,200,255,.22)' : 'rgba(255,225,140,.18)'} />
        {fsvg(<>
          <Celula T={T} x={540} y={930} s={crece} n={nB} viejo={0.4 * pr(K.Li + 0.3, K.Li + 3.2)} gris={0.6 * para * (1 - uv)} uv={uv} numeros={pr(K.Ca + 2.0, K.Ca + 3.6)} />
          {T > K.Ca && T < K.Ca + 1.6 && <g opacity={1 - pr(K.Ca + 1.2, K.Ca + 1.6)}><Gotero x={540} y={520 + 40 * pr(K.Ca, K.Ca + 0.4, kEase.sale)} gota={gota} /></g>}
        </>)}
        {uv > 0 && <div style={{ position:'absolute', left:0, right:0, top:0, height:300, background:`linear-gradient(rgba(120,90,255,${0.35 * uv}), transparent)` }}></div>}
      </Escena>
      {/* 11 · con cada hija, la madre crece */}
      <Escena T={T} a={K.Cr} b={K.HJ} zoom={0.03}>
        <Fondo color={KC.dark} />
        <Ambiente T={T} n={18} color="rgba(255,225,140,.18)" />
        {fsvg(<>
          <Celula T={T} x={230} y={880} s={0.8 * pr(K.Cr + 0.2, K.Cr + 0.7, kEase.rebote)} n={0} seed={3} />
          <Celula T={T} x={klerp(540, 690, pr(K.Cr - 0.2, K.Cr + 0.7, kEase.suave))} y={klerp(930, 860, pr(K.Cr - 0.2, K.Cr + 0.7, kEase.suave))} s={klerp(1.25, 1.7, pr(K.Cr - 0.2, K.Cr + 0.9, kEase.suave))} n={25} viejo={0.6} />
        </>)}
      </Escena>
      {/* 12 · la hija nace en cero; las de madres muy viejas tienen menos hijas */}
      <Escena T={T} a={K.HJ} b={K.C} zoom={0.03}>
        <Fondo color={KC.dark} />
        <Ambiente T={T} n={18} color="rgba(255,225,140,.18)" />
        {fsvg(<>
          <Celula T={T} x={170} y={660} s={0.62} n={2} seed={4} />
          <Celula T={T} x={350} y={700} s={0.5 * pr(K.HJ + 0.2, K.HJ + 0.7, kEase.rebote)} n={0} seed={5} />
          <BarraVida x={560} y={690} w={440} p={pr(K.HJ + 0.6, K.HJ + 1.6, kEase.sale)} lleno={1} color={KC.mint} texto="hijas que podrá tener" />
          <Celula T={T} x={200} y={1010} s={0.95 * pr(K.HJ + 1.8, K.HJ + 2.3, kEase.rebote)} n={25} viejo={0.6} seed={6} />
          <Celula T={T} x={410} y={1040} s={0.62 * pr(K.HJ + 2.3, K.HJ + 2.8, kEase.rebote)} n={0} seed={7} />
          <BarraVida x={560} y={1030} w={440} p={pr(K.HJ + 2.8, K.HJ + 3.8, kEase.sale)} lleno={0.45} color={KC.coral} texto="hija de madre muy vieja: menos" />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma masa, ya levada; en la lupa, levaduras con sus cicatrices brillando */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tazon T={T} x={540} y={1000} s={1.05} sube={1} desborda={pr(K.C, K.C + 2.5, kEase.suave)} />
          <LupaLev id="lupaC" x={300} y={560} r={185} o={pr(K.C + 0.6, K.C + 1.1, kEase.sale)} apunta={[470, 820]}>
            <rect x={-200} y={-200} width={400} height={400} fill={LV.uvFondo} />
            <Celula T={T} x={-60} y={-30} s={0.5} n={9} uv={1} seed={2} />
            <Celula T={T} x={90} y={70} s={0.38} n={4} uv={1} seed={8} />
            <Celula T={T} x={60} y={-120} s={0.3} n={1} uv={1} seed={9} />
          </LupaLev>
        </>)}
      </Escena>

      {/* textos */}
      <Letrero T={T} at={K.G + 0.2} until={K.Ma - 0.3} texto="NO ES INMORTAL" x={540} y={1440} tam={120} color={KC.white} />
      <Etq T={T} at={K.Ma + 0.5} until={K.Ce - 0.3} x={50} y={500} texto="levadura de pan" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ma + 0.9} until={K.Ce - 0.3} x={50} y={556} texto="Saccharomyces cerevisiae" it tam={34} color={KC.ink} />
      <Chip T={T} at={K.Ce + 0.2} until={K.Y - 0.2} texto="AL MICROSCOPIO" x={330} y={430} tam={36} borde={KC.cyan} mono />
      <Etq T={T} at={K.Ce + 0.9} until={K.Y + 2.0} x={50} y={520} texto="una sola célula · 5 × 6 µm" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.Y + 0.6} until={K.An + 1.8} x={50} y={1150} texto="madre" tam={32} color={KC.texto} />
      <Etq T={T} at={K.Y + 1.4} until={K.An + 1.8} x={1030} y={1170} lado="izq" texto="hija (yema)" tam={32} color={KC.texto} />
      <Etq T={T} at={K.An + 0.4} until={K.An + 2.2} x={50} y={470} texto="anillo de quitina (en el cuello)" tam={28} color={LV.quitina} />
      <Etq T={T} at={K.An + 2.6} until={K.Ri - 0.1} x={50} y={470} texto="madre: cicatriz de gemación" tam={28} color={LV.quitina} />
      <Etq T={T} at={K.An + 3.0} until={K.Ri - 0.1} x={50} y={525} texto="hija: cicatriz de nacimiento (tenue)" tam={26} color={KC.texto} />
      <Chip T={T} at={K.Ri + 0.2} until={K.P - 0.3} texto="≈ 90 min por hija · en el laboratorio" x={540} y={440} tam={32} borde={KC.mint} />
      {T > K.An + 2.4 && T < K.P + 0.1 && <div style={{ position:'absolute', left:540, top:530, zIndex:42, transform:'translate(-50%,-50%)', font:`700 44px ${KF.mono}`, color:KC.gold2, textShadow:KSOMBRA, whiteSpace:'nowrap' }}>hijas: {hijasA}</div>}
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Li - 0.3} anio="1959" quien="Mortimer y Johnston" revista="Nature, 1959 · U. de California, Berkeley" x={540} y={520} />
      <Chip T={T} at={K.E + 1.0} until={K.Li - 0.3} texto="micromanipulador" x={540} y={1230} tam={30} borde={KC.ink} fondo="rgba(14,15,18,.82)" mono />
      {T > t0E && T < K.Li - 0.3 && <div style={{ position:'absolute', left:900, top:760, zIndex:42, transform:'translate(-50%,-50%)', textAlign:'center', font:`700 34px ${KF.mono}`, color:KC.ink }}>hijas<div style={{ font:`400 110px/1 ${KF.titulo}`, color:KC.white, WebkitTextStroke:`4px ${KC.ink}` }}>{hijasE}</div></div>}
      {T > K.Li && T < K.Li + 3.6 && <div style={{ position:'absolute', left:330, top:520, zIndex:42, transform:'translate(-50%,-50%)', font:`700 48px ${KF.mono}`, color:KC.gold2, textShadow:KSOMBRA, whiteSpace:'nowrap', opacity:1 - pr(K.Li + 3.3, K.Li + 3.6) }}>hijas: {Math.floor(nB)}</div>}
      <Letrero T={T} at={K.Li + 3.4} until={K.Ca - 0.3} texto="20–30" etiqueta="hijas · según la cepa" x={330} y={540} tam={140} color={KC.yellow} />
      <Etq T={T} at={K.Ca + 0.3} until={K.Ca + 2.0} x={50} y={430} texto="calcoflúor: tiñe la quitina" tam={28} color={LV.uv} />
      <Chip T={T} at={K.Ca + 1.3} until={K.Ca + 2.4} texto="luz ultravioleta" x={330} y={530} tam={32} borde="#7f6bff" mono />
      <Chip T={T} at={K.Ca + 2.5} until={K.Cr - 0.3} texto="cada anillo = una hija" x={330} y={470} tam={34} borde={LV.uv} />
      <Chip T={T} at={K.Cr + 0.4} until={K.HJ - 0.3} texto="madre joven" x={230} y={640} tam={30} borde={KC.mint} />
      <Chip T={T} at={K.Cr + 0.7} until={K.HJ - 0.3} texto="madre vieja: varias veces más grande" x={600} y={460} tam={30} borde={KC.coral} />
      <Chip T={T} at={K.HJ + 3.4} until={K.C - 0.3} texto="hijas de madres viejas: menos hijas" x={540} y={1150} tam={28} borde={KC.coral} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="no es inmortal" x={540} y={1440} tam={44} borde={KC.ink} fondo={KC.paper} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ma} texto="5 cm" largo={110} y={1560} color={KC.ink} />
      <BarraEscala T={T} at={K.Ma} until={K.Ce} texto="1 cm" largo={90} y={1430} color={KC.ink} />
      <BarraEscala T={T} at={K.Ce + 0.6} until={K.E} texto="5 µm" largo={330 * klerp(0.25, 1, entraCel)} />
      <BarraEscala T={T} at={K.E + 0.6} until={K.Li} texto="5 µm" largo={330 * 0.55} color={KC.ink} />
      <BarraEscala T={T} at={K.Li} until={K.Cr} texto="5 µm" largo={330} />
      <BarraEscala T={T} at={K.Cr} until={K.C} texto="5 µm" largo={330} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1560} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="No es inmortal: cuenta a sus hijas en *cicatrices.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.Ce - 0.1} texto="Las burbujas son *dióxido de carbono.*" />
      <Subtitulo T={T} idx={2} at={K.Ce + 0.1} until={K.Y - 0.1} texto="Una sola célula: *unos 5 µm.*" />
      <Subtitulo T={T} idx={3} at={K.Y + 0.1} until={K.An - 0.1} texto="Para tener una hija, *brota una yema.*" />
      <Subtitulo T={T} idx={4} at={K.An + 0.1} until={K.Ri - 0.1} texto="Anillo de *quitina:* la madre queda marcada." />
      <Subtitulo T={T} idx={5} at={K.Ri + 0.1} until={K.P - 0.1} texto="Una hija cada *hora y media.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cuántas hijas *puede tener?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Li - 0.1} texto="1959, Berkeley: *Mortimer y Johnston.*" />
      <Subtitulo T={T} idx={8} at={K.Li + 0.1} until={K.Ca - 0.1} texto="No era inmortal: *20 a 30 hijas.*" />
      <Subtitulo T={T} idx={9} at={K.Ca + 0.1} until={K.Cr - 0.1} texto="Con calcoflúor, *las cicatrices brillan.*" />
      <Subtitulo T={T} idx={10} at={K.Cr + 0.1} until={K.HJ - 0.1} texto="Con cada hija, la madre *crece.*" />
      <Subtitulo T={T} idx={11} at={K.HJ + 0.1} until={K.C - 0.1} texto="La hija nace *en cero.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Sus hijas, *contadas en cicatrices.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Ma + 0.6, K.Ce - 0.4, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Y + 0.6, K.An - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.An + 2.1, K.Ri - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.0, K.E - 0.1, 'avatar_07_pensativo_puno', 'presentador'],
        [K.E + 0.6, K.Li - 0.4, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Li + 1.0, K.Ca - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ca + 1.1, K.Cr - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.HJ + 0.9, K.C - 0.3, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.C + 0.7, K.Ou - 0.2, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="101" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LevaduraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LevaduraShot /></CompositionStage></div>;
}
window.LevaduraApp = LevaduraApp;
