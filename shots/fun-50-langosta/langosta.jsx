// Shot Fungi Mati #50 · La langosta con fiebre: el hongo que frena plagas (Metarhizium acridum) — NARRADO.
// Formato N1 "Por dentro" + gancho 1 "Esto no es X: es Y". Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

/* ---------- piezas de este shot ---------- */
// Langosta del desierto (Schistocerca) de perfil, mirando a la izquierda. Patas en y = 0. ~600 px de largo a s = 1.
// Cabeza con ojo compuesto, antenas cortas, pronoto, alas (tegminas) plegadas con manchas, fémur posterior grueso
// con espiguilla, tibia con espinas. color = cuerpo; gris 0..1 = se apaga (muere).
function Langosta({ T = 0, x, y, s = 1, color = '#e2b93b', ala = '#c9a45a', gris = 0, flip = false, rot = 0, seed = 1 }) {
  const c = mixHex(color, '#8d8a80', gris), a = mixHex(ala, '#7d7a72', gris), osc = mixHex('#7a5a1e', '#55524c', gris);
  const ant = Math.sin(T * 2.2 + seed) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`}>
    {/* patas delanteras y medias */}
    <path d="M -150 -78 L -175 -36 L -196 0" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -150 -78 L -175 -36 L -196 0" stroke={c} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -96 -78 L -86 -34 L -60 0" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -96 -78 L -86 -34 L -60 0" stroke={c} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* abdomen */}
    <path d="M -70 -140 Q 90 -150 236 -112 Q 250 -96 236 -84 Q 90 -66 -70 -76 Z" fill={c} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M ${-30 + i * 42} -142 Q ${-24 + i * 42} -108 ${-30 + i * 42} -74`} stroke={osc} strokeWidth={3} fill="none" opacity=".6" />)}
    {/* tórax (pronoto en silla de montar) */}
    <path d="M -178 -170 Q -120 -186 -60 -166 L -48 -92 Q -110 -66 -170 -84 Z" fill={c} stroke={KC.ink} strokeWidth={7} />
    <path d="M -166 -150 Q -112 -162 -62 -148" stroke={osc} strokeWidth={4} fill="none" opacity=".7" />
    {/* alas plegadas (tegminas), más largas que el abdomen, con manchas oscuras */}
    <path d="M -78 -168 Q 110 -186 296 -142 Q 304 -128 290 -122 Q 110 -128 -70 -118 Z" fill={a} stroke={KC.ink} strokeWidth={6} />
    {[[40, -150], [90, -152], [140, -148], [190, -144], [240, -138], [10, -146], [120, -138], [215, -132]].map(([px, py], i) => <ellipse key={i} cx={px} cy={py} rx={9} ry={6} fill={osc} opacity=".75" />)}
    {/* pata trasera: fémur grueso con espiguilla y tibia con espinas */}
    <path d="M -46 -112 Q 70 -196 214 -214 Q 232 -206 222 -190 Q 90 -150 -26 -86 Z" fill={c} stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${10 + i * 38} ${-128 - i * 14} l 16 -18 l 16 14`} stroke={osc} strokeWidth={4} fill="none" />)}
    <path d="M 216 -204 L 150 -100 L 96 0" stroke={KC.ink} strokeWidth={15} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 216 -204 L 150 -100 L 96 0" stroke={mixHex('#c0392b', '#77746c', gris)} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {[0, 1, 2, 3, 4].map((i) => { const u = 0.2 + i * 0.15, px = klerp(216, 150, u * 1.6 > 1 ? 1 : u * 1.6), py = klerp(-204, -100, u * 1.6 > 1 ? 1 : u * 1.6); return <line key={i} x1={px} y1={py} x2={px + 12} y2={py + 4} stroke={KC.ink} strokeWidth={4} />; })}
    {/* cabeza, ojo compuesto, antena, piezas bucales */}
    <ellipse cx={-212} cy={-128} rx={56} ry={62} fill={c} stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-226} cy={-150} rx={20} ry={27} fill={mixHex('#6b4a1c', '#444', gris)} stroke={KC.ink} strokeWidth={4} />
    <ellipse cx={-232} cy={-160} rx={6} ry={8} fill="#fff" opacity=".7" />
    <path d="M -252 -82 Q -262 -66 -246 -60 Q -232 -64 -236 -80 Z" fill={osc} stroke={KC.ink} strokeWidth={4} />
    <path d={`M -238 -184 Q -272 ${-230 + ant} -316 ${-252 + ant}`} stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    <path d={`M -224 -186 Q -250 ${-236 - ant} -290 ${-268 - ant}`} stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}
// Chapulín (más chico y verde, alas cortas): misma silueta con otro color.
function Chapulin(p) { return <Langosta {...p} color="#7cc04a" ala="#5c9a3a" />; }

// Termómetro esquemático. nivel 0..1.
function Termo({ x, y, alto = 300, nivel = 0.5 }) {
  const h = alto * kclamp(nivel, 0, 1);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-26} y={-alto} width={52} height={alto} rx={26} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-13} y={-h} width={26} height={h} rx={12} fill={KC.red} />
    <circle cx={0} cy={30} r={44} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={14} x2={26} y1={-alto + 40 + i * (alto - 60) / 6} y2={-alto + 40 + i * (alto - 60) / 6} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Sol con rayos que giran.
function Sol({ T, x, y, r = 100 }) {
  return <g transform={`translate(${x} ${y})`}>
    <g transform={`rotate(${T * 12})`}>{Array.from({ length: 12 }, (_, i) => <rect key={i} x={-9} y={-r - 70} width={18} height={50} rx={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 30})`} />)}</g>
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
    <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.25} fill="#fff" opacity=".5" />
  </g>;
}
// Ondas de calor que suben.
function Calor({ T, x, y, n = 4, k = 1, ancho = 300 }) {
  if (k <= 0) return null;
  return <g opacity={k}>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.7 + i / n) % 1);
    return <path key={i} d={`M ${x - ancho / 2 + i * ancho / (n - 1)} ${y - u * 160} q 14 -20 0 -40 t 0 -40`} stroke={KC.orange} strokeWidth={8} fill="none" strokeLinecap="round" opacity={Math.sin(u * Math.PI)} />; })}</g>;
}
// Rama donde se asolea la langosta.
function Rama({ x, y, largo = 900 }) {
  return <g>
    <path d={`M ${x - largo / 2} ${y + 20} Q ${x} ${y - 6} ${x + largo / 2} ${y + 30}`} stroke={KC.ink} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d={`M ${x - largo / 2} ${y + 20} Q ${x} ${y - 6} ${x + largo / 2} ${y + 30}`} stroke="#8a5a34" strokeWidth={32} fill="none" strokeLinecap="round" />
    <path d={`M ${x + 240} ${y + 18} q 60 -60 130 -70`} stroke="#8a5a34" strokeWidth={18} fill="none" strokeLinecap="round" />
    <path d={`M ${x + 360} ${y - 50} q 40 -40 80 -10 q -40 30 -80 10 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Conidio de Metarhizium acridum: ovoide corto (4–5.5 × 3–4 µm). A 10 µm = 150 px: ~75 × 52 px.
function Conidio({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <ellipse rx={38} ry={27} fill="#b9c46a" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={-10} cy={-8} rx={10} ry={6} fill="#fff" opacity=".55" />
  </g>;
}
// Cuerpo tipo levadura (hyphal body) en la hemolinfa, con yema opcional.
function CuerpoLevadura({ x, y, s = 1, rot = 0, yema = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse rx={34} ry={15} fill="#e9f0b0" stroke={KC.ink} strokeWidth={4} />
    <circle cx={-6} cy={0} r={5} fill="#8a9a3a" />
    {yema > 0 && <ellipse cx={36 + 8 * yema} cy={-4} rx={12 * yema} ry={8 * yema} fill="#e9f0b0" stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Trehalosa (azúcar de la hemolinfa): dos anillos unidos.
function Trehalosa({ x, y, s = 1, rot = 0, o = 1 }) {
  const hexa = (cx) => 'M ' + Array.from({ length: 6 }, (_, i) => [cx + 16 * Math.cos(i * Math.PI / 3), 16 * Math.sin(i * Math.PI / 3)].map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <path d={hexa(-22)} fill="#ffd8f0" stroke={KC.pink} strokeWidth={4} /><path d={hexa(22)} fill="#ffd8f0" stroke={KC.pink} strokeWidth={4} />
  </g>;
}
// Mundo microscópico: corte de la cutícula (cera, exocutícula, endocutícula, epidermis) y hemolinfa abajo.
const SUP = 760, EPI = 1060, HEMO = 1120;
function MundoCuticula({ T, K, pan }) {
  const r = krng(7);
  const caida = kprog(T, K.Es + 0.2, K.Es + 1.3, kEase.sale);
  const tubo = kprog(T, K.Pf + 0.1, K.Pf + 1.2, kEase.suave);        // tubo germinativo
  const apr = kprog(T, K.Pf + 1.0, K.Pf + 1.5, kEase.rebote);         // apresorio
  const peg = kprog(T, K.Pf + 1.6, K.Ad + 0.2, kEase.suave);         // punta de penetración
  const AX = 640, PY = SUP + peg * (HEMO - SUP + 20);
  const nHB = Math.floor(kprog(T, K.Ad + 0.3, K.Pr + 0.4) * 16);
  const comer = kprog(T, K.Ad + 1.0, K.Pr + 0.2);
  const hb = Array.from({ length: 16 }, () => [120 + r() * 840, HEMO + 120 + r() * 640, r() * 180]);
  const az = Array.from({ length: 12 }, () => [100 + r() * 880, HEMO + 100 + r() * 680, r() * 180]);
  return <g transform={`translate(0 ${-pan})`}>
    {/* hemolinfa */}
    <rect x={0} y={HEMO} width={KW} height={1100} fill="#163a3a" />
    {az.map(([ax, ay, ar], i) => <Trehalosa key={i} x={ax + mece(T, i, 0.3) * 14} y={ay + mece(T, i + 9, 0.3) * 10} rot={ar + T * 10} o={1 - kclamp(comer * 1.4 - i / 12, 0, 1)} />)}
    {hb.slice(0, nHB).map(([hx, hy, hr], i) => <CuerpoLevadura key={i} x={hx + mece(T, i, 0.4) * 12} y={hy + mece(T, i + 4, 0.4) * 10} rot={hr + T * 8} s={kprog(T, K.Ad + 0.3 + i * 0.13, K.Ad + 0.6 + i * 0.13, kEase.rebote)} yema={(Math.sin(T * 2 + i) + 1) / 2} />)}
    {/* epidermis */}
    <rect x={0} y={EPI} width={KW} height={HEMO - EPI} fill="#d98c6a" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 12 }, (_, i) => <g key={i}><line x1={i * 90} y1={EPI} x2={i * 90} y2={HEMO} stroke={KC.ink} strokeWidth={3} /><circle cx={i * 90 + 45} cy={(EPI + HEMO) / 2} r={11} fill="#7a3a2a" /></g>)}
    {/* endocutícula y exocutícula en capas */}
    <rect x={0} y={SUP + 20} width={KW} height={EPI - SUP - 20} fill="#e8c27a" stroke={KC.ink} strokeWidth={5} />
    <rect x={0} y={SUP + 20} width={KW} height={110} fill="#b9773a" />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M 0 ${SUP + 40 + i * 30} Q 270 ${SUP + 34 + i * 30} 540 ${SUP + 40 + i * 30} T 1080 ${SUP + 40 + i * 30}`} stroke={i < 3 ? '#8a5226' : '#c79a52'} strokeWidth={3} fill="none" />)}
    {/* capa de cera (epicutícula) */}
    <rect x={0} y={SUP} width={KW} height={20} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
    {/* zona disuelta por las enzimas alrededor de la punta */}
    {peg > 0 && <path d={`M ${AX - 30} ${SUP} Q ${AX - 46} ${(SUP + PY) / 2} ${AX - 22} ${PY} L ${AX + 22} ${PY} Q ${AX + 46} ${(SUP + PY) / 2} ${AX + 30} ${SUP} Z`} fill="#f8ecc8" opacity=".85" />}
    {peg > 0 && <path d={`M ${AX} ${SUP - 10} L ${AX} ${PY}`} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />}
    {peg > 0 && <path d={`M ${AX} ${SUP - 10} L ${AX} ${PY}`} stroke="#e9f0b0" strokeWidth={12} strokeLinecap="round" />}
    {peg > 0 && peg < 1 && Array.from({ length: 8 }, (_, i) => { const an = i * Math.PI / 4 + T * 3; return <circle key={i} cx={AX + Math.cos(an) * 42} cy={PY + Math.sin(an) * 30} r={7} fill={KC.cyan} stroke={KC.ink} strokeWidth={2} />; })}
    {/* tubo germinativo y apresorio sobre la superficie */}
    {tubo > 0 && <path d={`M 470 ${SUP - 26} Q ${klerp(470, AX, 0.5)} ${SUP - 44} ${klerp(470, AX - 30, tubo)} ${SUP - 22}`} stroke={KC.ink} strokeWidth={20} fill="none" strokeLinecap="round" />}
    {tubo > 0 && <path d={`M 470 ${SUP - 26} Q ${klerp(470, AX, 0.5)} ${SUP - 44} ${klerp(470, AX - 30, tubo)} ${SUP - 22}`} stroke="#e9f0b0" strokeWidth={11} fill="none" strokeLinecap="round" />}
    {apr > 0 && <ellipse cx={AX} cy={SUP - 26} rx={40 * apr} ry={30 * apr} fill="#e9f0b0" stroke={KC.ink} strokeWidth={5} />}
    {apr > 0.9 && peg < 1 && [-50, 50].map((dx, i) => <path key={i} d={`M ${AX + dx} ${SUP - 110 + Math.sin(T * 8) * 6} l 0 46 m -14 -16 l 14 16 l 14 -16`} stroke={KC.red} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />)}
    {/* la espora (conidio) cae y se pega */}
    <Conidio x={430} y={klerp(260, SUP - 27, caida)} rot={klerp(-40, 0, caida)} />
  </g>;
}
// Mapa esquemático de África con Níger resaltado. (lon, lat) → px.
const AF = [[-17, 21], [-16, 28], [-10, 30], [-6, 35.8], [10, 37], [11, 33], [20, 31], [25, 31.5], [32, 31.3], [34, 28], [36, 22], [39, 15], [43, 12], [51, 11.8], [48, 5], [40, -3], [39, -8], [40.5, -15], [35, -20], [35.5, -24], [32.5, -28.5], [27, -34], [20, -34.8], [18, -32], [15, -27], [12, -18], [13.5, -12], [12, -5], [9, -1], [9.5, 4], [7, 4.4], [3, 6.3], [-2, 4.7], [-8, 4.3], [-12, 7], [-15, 11], [-17.5, 14.7]];
const NE = [[0.2, 14.9], [3.6, 15.6], [4.2, 16.9], [4.2, 19.2], [5.8, 19.4], [11.9, 23.5], [13.5, 23.2], [15, 22.6], [15.2, 21], [16, 20.4], [15.5, 16.8], [13.9, 15.6], [13.6, 13.7], [12.3, 13.1], [10.7, 13.3], [8.4, 13], [7.1, 13], [4.4, 13.6], [3.6, 11.7], [2.4, 12.2], [2.2, 12.6], [0.9, 13], [1, 13.3], [0.2, 14]];
const afP = (lon, lat, k) => [(lon + 18) * k, (38 - lat) * k];
const afPath = (pts, k) => 'M ' + pts.map(([a, b]) => afP(a, b, k).map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
function MapaAfrica({ T, x, y, k = 8, p = 1, punto = 0 }) {
  const [px, py] = afP(7.52, 18.77, k);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.85, 1, p)})`} opacity={p}>
    <path d={afPath(AF, k)} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={afPath(NE, k)} fill={KC.orange} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    {punto > 0 && <g transform={`translate(${px} ${py})`}><circle r={26 * (1 + 0.3 * Math.sin(T * 6))} fill={KC.red} opacity=".3" /><circle r={11 * punto} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>}
    <text x={afP(8, 15.5, k)[0]} y={afP(8, 15.5, k)[1] + 10} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>NÍGER</text>
  </g>;
}
// Avioneta de fumigación (vista de lado) que suelta una nube fina. p 0..1 = recorrido de derecha a izquierda.
function Avioneta({ T, p, y = 640 }) {
  if (p <= 0 || p >= 1) return null;
  const x = klerp(1250, -250, p);
  return <g>
    {Array.from({ length: 40 }, (_, i) => { const t0 = i / 40; if (p < t0) return null; const fx = klerp(1250, -250, t0); const u = Math.min(1, (p - t0) * 4);
      return <circle key={i} cx={fx + 60 + Math.sin(i * 3) * 30} cy={y + 30 + u * 320} r={6 + u * 10} fill="#e9f0b0" opacity={0.55 * (1 - u * 0.5)} />; })}
    <g transform={`translate(${x} ${y})`}>
      <rect x={-130} y={-26} width={260} height={52} rx={26} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      <rect x={-50} y={-14} width={70} height={14} rx={6} fill={KC.ink} />
      <rect x={-70} y={-6} width={120} height={20} rx={8} fill={KC.orange} stroke={KC.ink} strokeWidth={6} />
      <path d="M 110 -26 L 165 -82 L 178 -22 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <path d="M -60 -26 Q -40 -60 0 -60 L 20 -26 Z" fill="#bfefff" stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={-138} cy={0} rx={8} ry={44 * Math.abs(Math.sin(T * 30))} fill="#666" />
      <line x1={-60} y1={26} x2={70} y2={26} stroke={KC.ink} strokeWidth={6} />
    </g>
  </g>;
}
// Ave pequeña en vuelo (silueta con aleteo).
function AveVuelo({ T, x, y, s = 1, seed = 1, color = '#5a4632' }) {
  const a = Math.sin(T * 10 + seed) * 22;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -70 ${-a} Q -30 -20 0 0 Q 30 -20 70 ${-a}`} stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M -70 ${-a} Q -30 -20 0 0 Q 30 -20 70 ${-a}`} stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx={0} cy={4} rx={18} ry={11} fill={color} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Cernícalo (Falco tinnunculus) posado de perfil, mirando a la derecha: dorso rojizo con manchas, cabeza gris,
// "bigote" oscuro, pico ganchudo, cola gris con banda negra. presa 0..1 = langosta en el pico.
function Cernicalo({ T, x, y, s = 1, presa = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 40 L -120 200 L -80 214 L -10 60 Z" fill="#9aa3ad" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -112 186 L -82 198" stroke={KC.ink} strokeWidth={14} />
    <path d="M -60 -40 Q -80 60 -20 90 Q 50 100 60 20 Q 64 -40 30 -70 Q -20 -90 -60 -40 Z" fill="#c8743a" stroke={KC.ink} strokeWidth={7} />
    <path d="M 10 -20 Q 50 10 40 70 Q 20 90 0 80 Q 20 30 10 -20 Z" fill="#f2d6a8" stroke={KC.ink} strokeWidth={4} />
    {[[-30, -20], [-40, 20], [-20, 50], [-50, 60], [-10, 10]].map(([dx, dy], i) => <path key={i} d={`M ${dx} ${dy} l 8 -10 l 8 10 Z`} fill={KC.ink} />)}
    <circle cx={40} cy={-90} r={46} fill="#9aa8b8" stroke={KC.ink} strokeWidth={7} />
    <path d="M 44 -70 Q 40 -40 30 -36" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle cx={56} cy={-98} r={13} fill="#fff" stroke={KC.ink} strokeWidth={4} /><circle cx={60} cy={-98} r={7} fill={KC.ink} />
    <path d="M 80 -96 Q 104 -92 100 -70 L 86 -76 Z" fill="#f2c94c" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <path d="M 0 90 L -6 120 M 20 92 L 26 120" stroke="#f2c94c" strokeWidth={10} strokeLinecap="round" />
    {presa > 0 && <g opacity={presa}><Langosta T={T} x={120} y={-50} s={0.16} rot={-20} flip /></g>}
  </g>;
}
// Hormiga esquemática.
function Hormiga({ T, x, y, s = 1, seed = 1 }) {
  const p = Math.sin(T * 12 + seed) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-14, 0, 14].map((dx, i) => <path key={i} d={`M ${dx} 0 l ${-10 + (i % 2 ? p : -p)} 22 M ${dx} 0 l ${10 + (i % 2 ? -p : p)} 22`} stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={-34} cy={-4} r={12} fill="#5a2a1a" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={0} cy={0} rx={12} ry={9} fill="#5a2a1a" stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={34} cy={-2} rx={20} ry={14} fill="#5a2a1a" stroke={KC.ink} strokeWidth={3} />
    <path d="M -42 -12 q -10 -16 -22 -14" stroke={KC.ink} strokeWidth={3} fill="none" />
  </g>;
}
// Frasquito con la cepa.
function Frasco({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-26} y={-70} width={52} height={20} rx={6} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    <path d="M -34 -50 L 34 -50 L 40 30 Q 0 46 -40 30 Z" fill="#e8f6ff" stroke={KC.ink} strokeWidth={6} />
    <path d="M -36 0 L 37 0 L 40 30 Q 0 46 -40 30 Z" fill="#b9c46a" />
  </g>;
}
// Contador de días (para el campo de Níger).
function Dias({ T, at, until, desde = 0, hasta = 21, dur = 4, x = 300, y = 520 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), d = Math.round(klerp(desde, hasta, kprog(T, at, at + dur)));
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, textAlign:'center',
    background:'rgba(14,15,18,.82)', border:`4px solid ${KC.gold}`, borderRadius:24, padding:'8px 34px' }}>
    <div style={{ font:`700 26px ${KF.mono}`, color:KC.gold2, letterSpacing:'.12em' }}>DESPUÉS DEL ROCÍO</div>
    <div style={{ font:`400 92px/1 ${KF.titulo}`, color:KC.texto }}>DÍA {d}</div>
  </div>;
}

/* ---------- el shot ---------- */
function LangostaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Es: CUES.Espora, Pf: CUES.Perfora, Ad: CUES.Adentro, P: CUES.Pregunta, F: CUES.Fiebre, E: CUES.Estudio, R: CUES.Resultado, L: CUES.Lento, C: CUES.Cernicalos, M: CUES.Mexico, Ci: CUES.Cierre, Ou: CUES.Outro };
  K.Pr = K.P;
  const FIN = K.Ou + 4;
  const calor = kprog(T, K.G + 0.2, K.G + 1.6, kEase.sale);
  const pan = 430 * kprog(T, K.Ad - 0.2, K.Ad + 0.9, kEase.suave);
  const iris = kprog(T, K.Es - 0.4, K.Es + 0.5, kEase.suave);
  // campo de Níger: langostas en el suelo que van cayendo desde el "día 5"
  const r = krng(21);
  const campo = Array.from({ length: 18 }, (_, i) => [60 + (i % 6) * 180 + r() * 60, 980 + Math.floor(i / 6) * 80 + r() * 20, r()]);
  const diaU = kprog(T, K.R + 0.2, K.R + 4.2);           // 0 → 21 días
  const muerta = (i) => { const umbral = 5 / 21 + (campo[i][2] * 0.75) * (16 / 21); return i % 5 === 4 ? 0 : kprog(diaU, umbral, umbral + 0.08); };
  const tec = mxProy(-103.87, 18.91), cr = mxProy(-84.1, 9.9);
  const vMx = kprog(T, K.M + 3.2, K.M + 4.8, kEase.suave);
  const MS = 0.8, MX0 = 140, MY0 = 560;
  const mx = (pt) => [MX0 + pt[0] * MS, MY0 + pt[1] * MS];
  const frX = klerp(mx(tec)[0], mx(cr)[0], vMx), frY = klerp(mx(tec)[1], mx(cr)[1], vMx) - Math.sin(vMx * Math.PI) * 160;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la langosta se calienta al sol = fiebre */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Sol T={T} x={250} y={540} r={95} />
          <Rama x={520} y={1040} />
          <Calor T={T} x={500} y={730} k={calor} ancho={420} n={5} />
          <Langosta T={T} x={540} y={1030} s={1.15} rot={klerp(0, -6, calor)} />
          <Termo x={970} y={1060} alto={240} nivel={klerp(0.25, 0.92, calor)} />
        </>)}
      </Escena>
      {/* 1 · el hongo especialista */}
      <Escena T={T} a={K.H} b={K.Es} zoom={0.06}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={0} y={1140} width={KW} height={800} fill="#d8b878" stroke={KC.ink} strokeWidth={8} />
          <Langosta T={T} x={330} y={1000} s={0.75} />
          <Chapulin T={T} x={760} y={1150} s={0.5} seed={3} />
          {Array.from({ length: 14 }, (_, i) => { const u = kprog(T, K.H + 0.3 + i * 0.12, K.H + 2.2 + i * 0.12); const tx = i % 2 ? 330 + (i - 7) * 18 : 760 + (i - 7) * 10, ty = i % 2 ? 900 : 1090;
            return u > 0 ? <Conidio key={i} x={klerp(80 + i * 40, tx, u) + mece(T, i, 0.5) * 10} y={klerp(380, ty, u)} s={0.3} rot={i * 30 + T * 40} o={1 - u * 0.4} /> : null; })}
          {[[480, 760], [880, 960]].map(([cx, cy], i) => { const k = kprog(T, K.H + 2.0 + i * 0.4, K.H + 2.4 + i * 0.4, kEase.rebote); return k > 0 ? <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`}><circle r={44} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><path d="M -20 0 L -6 16 L 22 -14" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g> : null; })}
        </>)}
      </Escena>
      {/* 2–4 · al microscopio: la espora, la perforación y la sangre del insecto */}
      <Escena T={T} a={K.Es} b={K.P} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<MundoCuticula T={T} K={K} pan={pan} />)}
        <div style={{ position:'absolute', left:'50%', top:'55%', width:2400, height:2400, marginLeft:-1200, marginTop:-1200, borderRadius:'50%', boxShadow:`0 0 0 2000px ${KC.lilac}`, transform:`scale(${klerp(0.02, 1, iris)})`, opacity:1 - kprog(T, K.Es + 0.4, K.Es + 0.6), pointerEvents:'none' }}></div>
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.F} zoom={0.1}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<><Interrogacion T={T} x={300} y={1080} color={KC.orange} /><Termo x={440} y={1150} alto={220} nivel={0.85} /></>)}
      </Escena>
      {/* 6 · la fiebre frena al hongo, pero no lo cura */}
      <Escena T={T} a={K.F} b={K.E}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {[0, 1].map((j) => { const cx = j ? 810 : 270, fiebre = j === 0, grow = kprog(T, K.F + 0.3, K.E - 0.3);
            const n = Math.round(fiebre ? 2 + grow * 5 : 2 + grow * 20), gris = kprog(T, fiebre ? K.F + 4.6 : K.F + 3.0, fiebre ? K.F + 5.4 : K.F + 3.8);
            const rr = krng(40 + j);
            return <g key={j}>
              <rect x={cx - 250} y={650} width={500} height={440} rx={34} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} />
              <text x={cx} y={712} textAnchor="middle" style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{fiebre ? 'con fiebre' : 'sin fiebre'}</text>
              <Langosta T={T} x={cx - 10} y={850} s={0.42} gris={gris} seed={j + 2} />
              <Termo x={cx + 190} y={850} alto={110} nivel={fiebre ? 0.9 : 0.3} />
              <circle cx={cx} cy={985} r={90} fill={KC.noche} stroke={KC.ink} strokeWidth={6} />
              {Array.from({ length: n }, (_, i) => <CuerpoLevadura key={i} x={cx - 60 + rr() * 120} y={950 + rr() * 70} s={0.5} rot={rr() * 180 + T * 10} />)}
            </g>; })}
        </>)}
      </Escena>
      {/* 7–8 · Níger, 2005: la avioneta, el día 5 y el 80 % */}
      <Escena T={T} a={K.E} b={K.L} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={900} width={KW} height={1100} fill="#e2c27a" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${40 + i * 125} 920 q 30 -60 60 0 q 20 -40 40 0`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />)}
          {campo.map(([cx, cy], i) => { const m = muerta(i); return <Langosta key={i} T={T} x={cx} y={cy} s={0.2} rot={m * 90} gris={m} seed={i} flip={i % 3 === 0} />; })}
          <MapaAfrica T={T} x={300} y={420} k={8.4} p={kprog(T, K.E + 1.4, K.E + 1.8) * (1 - kprog(T, K.E + 3.0, K.E + 3.4))} punto={kprog(T, K.E + 2.0, K.E + 2.4, kEase.rebote)} />
          <Avioneta T={T} p={kprog(T, K.E + 3.0, K.R + 1.6)} y={600} />
        </>)}
      </Escena>
      {/* 9 · más lento que un insecticida, sin dañar hormigas ni aves */}
      <Escena T={T} a={K.L} b={K.C}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={60} y={470} width={600} height={200} rx={30} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.L + 0.2, K.L + 0.5)} />
          <text x={90} y={550} style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.L + 0.2, K.L + 0.5)}>insecticida químico</text>
          <text x={90} y={630} style={{ font:`700 40px ${KF.mono}` }} fill={KC.red} opacity={kprog(T, K.L + 0.6, K.L + 0.9)}>mata en horas</text>
          <rect x={60} y={710} width={600} height={200} rx={30} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.L + 0.9, K.L + 1.2)} />
          <text x={90} y={790} style={{ font:`900 46px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.L + 0.9, K.L + 1.2)}>el hongo</text>
          <text x={90} y={870} style={{ font:`700 40px ${KF.mono}` }} fill={KC.leaf} opacity={kprog(T, K.L + 1.3, K.L + 1.6)}>tarda días o semanas</text>
          <rect x={0} y={1000} width={KW} height={950} fill="#e2c27a" stroke={KC.ink} strokeWidth={8} opacity={kprog(T, K.L + 2.2, K.L + 2.6)} />
          {[0, 1, 2, 3].map((i) => kprog(T, K.L + 2.4, K.L + 2.6) > 0 ? <Hormiga key={i} T={T} x={140 + i * 90 + ((T * 30) % 60)} y={1050 + (i % 2) * 30} s={1.1} seed={i} /> : null)}
          {kprog(T, K.L + 2.8, K.L + 3.0) > 0 && <AveVuelo T={T} x={klerp(1150, 760, kprog(T, K.L + 2.8, K.L + 3.6, kEase.sale))} y={960} s={1.2} seed={2} />}
          {[[480, 1100], [960, 1100]].map(([cx, cy], i) => { const k = kprog(T, K.L + 3.0 + i * 0.3, K.L + 3.3 + i * 0.3, kEase.rebote); return k > 0 ? <g key={i} transform={`translate(${cx} ${cy - 90}) scale(${k})`}><circle r={40} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><path d="M -18 0 L -5 14 L 20 -12" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g> : null; })}
        </>)}
      </Escena>
      {/* 10 · llegan más aves; los cernícalos se llevan más hembras */}
      <Escena T={T} a={K.C} b={K.M} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={0} y={1010} width={KW} height={1000} fill="#e2c27a" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 7 }, (_, i) => { const u = kprog(T, K.C + 0.2 + i * 0.25, K.C + 2.2 + i * 0.25, kEase.sale); const izq = i % 2 === 0;
            return u > 0 ? <AveVuelo key={i} T={T} x={klerp(izq ? -120 : 1200, 160 + i * 120, u)} y={klerp(380, 560 + (i % 3) * 110, u) + mece(T, i, 0.6) * 20} s={0.7 + (i % 3) * 0.15} seed={i} color={i % 3 ? '#6e5a40' : '#8a8f99'} /> : null; })}
          <rect x={250} y={960} width={30} height={70} fill="#8a5a34" stroke={KC.ink} strokeWidth={6} />
          <Cernicalo T={T} x={260} y={860} s={0.95} presa={kprog(T, K.C + 2.6, K.C + 3.0)} />
          <Langosta T={T} x={640} y={1080} s={0.3} seed={5} />
          <Langosta T={T} x={930} y={1080} s={0.21} seed={6} />
        </>)}
      </Escena>
      {/* 11 · México: SENASICA y la cepa donada a Costa Rica */}
      <Escena T={T} a={K.M} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaMexico x={MX0} y={MY0} ancho={1000 * MS} />
          {(() => { const [px, py] = mx(tec), k = kprog(T, K.M + 0.6, K.M + 1.0, kEase.rebote); return <g transform={`translate(${px} ${py})`}><circle r={30 * (1 + 0.3 * Math.sin(T * 6))} fill={KC.red} opacity=".3" /><circle r={13 * k} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>; })()}
          {(() => { const [px, py] = mx(cr), k = kprog(T, K.M + 4.6, K.M + 5.0, kEase.rebote); return <g transform={`translate(${px} ${py})`}><circle r={13 * k} fill={KC.blue} stroke={KC.ink} strokeWidth={4} /></g>; })()}
          {vMx > 0 && (() => { const pts = Array.from({ length: 30 }, (_, i) => { const u = (i / 29) * vMx; return [klerp(mx(tec)[0], mx(cr)[0], u), klerp(mx(tec)[1], mx(cr)[1], u) - Math.sin(u * Math.PI) * 160]; });
            return <path d={'M ' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L ')} stroke={KC.ink} strokeWidth={7} fill="none" strokeDasharray="18 12" strokeLinecap="round" />; })()}
          {vMx > 0 && <Frasco x={frX} y={frY} s={0.9} />}
          <g opacity={kprog(T, K.M + 1.4, K.M + 1.8)}><Langosta T={T} x={mx(mxProy(-89.5, 20.2))[0]} y={mx(mxProy(-89.5, 20.2))[1] + 10} s={0.22} color="#d9a04a" /></g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma langosta al sol, ahora vista por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Sol T={T} x={250} y={540} r={95} />
          <Rama x={520} y={1040} />
          <Calor T={T} x={500} y={730} k={1} ancho={420} n={5} />
          <Langosta T={T} x={540} y={1030} s={1.15} rot={-6} />
          <Termo x={970} y={1060} alto={240} nivel={0.92} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.Ci + 0.6} until={K.Ou - 0.2} x={340} y={600} r={150} fx={660} fy={900} tinte={KC.gold2} etiqueta="POR DENTRO · el hongo sigue"
        interior={(T2, rr) => { const q = krng(77); return <svg width={rr * 2} height={rr * 2}><rect width={rr * 2} height={rr * 2} fill="#163a3a" />
          {Array.from({ length: 9 }, (_, i) => <CuerpoLevadura key={i} x={40 + q() * (rr * 2 - 80)} y={40 + q() * (rr * 2 - 80)} s={0.9} rot={q() * 180 + T2 * 12} yema={(Math.sin(T2 * 2 + i) + 1) / 2} />)}</svg>; }} />

      {/* textos */}
      <Chip T={T} at={K.G + 1.2} until={K.H - 0.2} texto="no es descanso: es FIEBRE" x={300} y={720} tam={34} borde={KC.red} />
      <Etq T={T} at={K.G + 2.0} until={K.H - 0.2} x={60} y={1490} texto="langosta del desierto" tam={28} color={KC.ink} />
      <Etq T={T} at={K.G + 2.3} until={K.H - 0.2} x={60} y={1540} texto="Schistocerca gregaria" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.H + 0.5} until={K.Es - 0.3} x={60} y={470} texto="hongo de las langostas" tam={34} color={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.Es - 0.3} x={60} y={530} texto="Metarhizium acridum" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.H + 1.6} until={K.Es - 0.3} texto="ESPECIALISTA" x={300} y={640} tam={40} borde={KC.leaf} />
      <Etq T={T} at={K.H + 2.0} until={K.Es - 0.3} x={150} y={1060} texto="langosta" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 2.4} until={K.Es - 0.3} x={560} y={1210} texto="chapulín" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Es + 0.5} until={K.Pf - 0.2} texto="AL MICROSCOPIO · la cutícula" x={360} y={470} tam={32} borde={KC.cyan} mono />
      <Etq T={T} at={K.Es + 1.2} until={K.Pf + 1.2} x={480} y={640} texto="espora (conidio)" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Es + 1.6} until={K.Ad - 0.3} x={40} y={900} texto="cutícula = su cáscara" tam={30} />
      <Etq T={T} at={K.Pf + 0.6} until={K.Ad - 0.3} x={40} y={600} texto="tubo germinativo" tam={26} color={KC.gold2} />
      <Etq T={T} at={K.Pf + 1.4} until={K.Ad - 0.3} x={1040} y={660} lado="izq" texto="apresorio" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Pf + 1.5} until={K.Ad - 0.2} texto="presión ↓" x={200} y={470} tam={34} borde={KC.red} />
      <Chip T={T} at={K.Pf + 2.2} until={K.Ad - 0.2} texto="enzimas" x={480} y={470} tam={34} borde={KC.cyan} />
      <Etq T={T} at={K.Ad + 0.6} until={K.P - 0.2} x={40} y={760} texto="hemolinfa = su sangre" tam={30} />
      <Etq T={T} at={K.Ad + 1.0} until={K.P - 0.2} x={40} y={1490} texto="células tipo levadura" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.Ad + 1.4} until={K.P - 0.2} x={1040} y={1550} lado="izq" texto="azúcar (trehalosa)" tam={26} color={KC.pink} />
      <Chip T={T} at={K.F + 0.3} until={K.F + 2.0} texto="el calor lo frena, no lo cura" x={540} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.F + 3.4} until={K.E - 0.2} texto="la mayoría muere" x={330} y={470} tam={38} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 1.4} anio="2005" quien="norte de Níger · campo real" revista="Mullié et al., PLoS ONE, 2021" y={640} />
      <Etq T={T} at={K.E + 2.2} until={K.E + 3.2} x={560} y={600} texto="norte de Níger" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E + 3.4} until={K.R - 0.2} x={40} y={1490} texto="langosta del desierto" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 3.6} until={K.R - 0.2} x={40} y={1540} texto="Schistocerca gregaria" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.E + 3.6} until={K.R + 0.6} texto="avioneta: rocía esporas" x={330} y={470} tam={32} borde={KC.ink} />
      <Dias T={T} at={K.R + 0.2} until={K.L - 0.2} hasta={21} dur={4.0} x={300} y={520} />
      <Chip T={T} at={K.R + 1.1} until={K.R + 2.6} texto="día 5: empiezan a morir" x={330} y={690} tam={32} borde={KC.red} />
      <Medidor T={T} at={K.R + 2.6} until={K.L - 0.2} x={60} y={680} ancho={600} etiqueta="eficacia" valor={(t) => 0.8 * kprog(t, K.R + 2.7, K.R + 4.2, kEase.sale)} texto={(v) => Math.round(v * 100) + ' %'} color={KC.leaf} />
      <Chip T={T} at={K.R + 4.2} until={K.L - 0.2} texto="80 % de eficacia contra las langostas (día 21)" x={540} y={850} tam={30} borde={KC.leaf} />
      <Etq T={T} at={K.L + 2.6} until={K.C - 0.2} x={140} y={1130} texto="hormigas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.L + 3.0} until={K.C - 0.2} x={1040} y={1130} lado="izq" texto="aves" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 0.3} until={K.M - 0.2} texto="llegan más aves" x={330} y={470} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.C + 1.6} until={K.M - 0.2} x={400} y={800} texto="cernícalo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.C + 1.9} until={K.M - 0.2} x={400} y={850} texto="Falco tinnunculus" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 2.8} until={K.M - 0.2} texto="más hembras (75–80 %)" x={700} y={960} tam={34} borde={KC.pink} />
      <Etq T={T} at={K.C + 3.2} until={K.M - 0.2} x={600} y={1130} lado="izq" texto="hembra (más grande)" tam={26} color={KC.ink} />
      <Etq T={T} at={K.C + 3.5} until={K.M - 0.2} x={1040} y={1130} texto="macho" tam={26} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.M + 0.4} until={K.M + 3.0} texto="SENASICA · control biológico" x={360} y={470} tam={34} borde={KC.leaf} />
      <Etq T={T} at={K.M + 0.9} until={K.Ci - 0.2} x={mx(tec)[0] - 30} y={mx(tec)[1] + 20} lado="izq" texto="Tecomán, Col." tam={24} color={KC.ink} />
      <Etq T={T} at={K.M + 1.6} until={K.Ci - 0.2} x={40} y={1490} texto="langosta centroamericana" tam={28} color={KC.ink} />
      <Etq T={T} at={K.M + 1.9} until={K.Ci - 0.2} x={40} y={1540} texto="Schistocerca piceifrons" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 3.6} until={K.Ci - 0.2} texto="2020 · cepa donada a Costa Rica" x={380} y={470} tam={34} borde={KC.blue} />
      <Etq T={T} at={K.M + 4.8} until={K.Ci - 0.2} x={mx(cr)[0] + 30} y={mx(cr)[1] + 30} texto="Costa Rica" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ou} texto="fiebre vs. hongo" x={300} y={1150} tam={36} borde={KC.red} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={190} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.H} until={K.Es} texto="5 cm" largo={130} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.P} texto="10 µm" largo={150} x={600} />
      <BarraEscala T={T} at={K.P} until={K.F} texto="5 cm" largo={200} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.F} until={K.E} texto="5 cm" largo={84} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.E} until={K.L} texto="5 cm" largo={30} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.L} until={K.C} texto="1 cm" largo={60} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.M} texto="10 cm" largo={150} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.Ci} texto="500 km" largo={92} x={600} color={KC.ink} />
      <BarraEscala T={T} at={K.Ci} until={K.Ou} texto="5 cm" largo={190} x={600} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No se calienta por gusto: *tiene fiebre.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Es - 0.1} texto="Metarhizium acridum: *especialista.*" />
      <Subtitulo T={T} idx={2} at={K.Es + 0.1} until={K.Pf - 0.1} texto="Una espora *se pega a su cáscara.*" />
      <Subtitulo T={T} idx={3} at={K.Pf + 0.1} until={K.Ad - 0.1} texto="Presión y enzimas: *la perfora.*" />
      <Subtitulo T={T} idx={4} at={K.Ad + 0.1} until={K.P - 0.1} texto="Crece en su sangre *y se come sus azúcares.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.F - 0.1} texto="¿Y para qué *la fiebre?*" />
      <Subtitulo T={T} idx={6} at={K.F + 0.1} until={K.E - 0.1} texto="El calor lo frena, *pero no lo elimina.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.R - 0.1} texto="2005, norte de Níger: *una avioneta.*" />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.L - 0.1} texto="Día 5 empiezan a morir; *80 % a las 3 semanas.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.C - 0.1} texto="Más lento, pero *no dañó hormigas ni aves.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.M - 0.1} texto="Más aves; los cernícalos, *sobre todo hembras.*" />
      <Subtitulo T={T} idx={11} at={K.M + 0.1} until={K.Ci - 0.1} texto="SENASICA desarrolló cómo usarlo; *en 2020, cepa a Costa Rica.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Pelea con un hongo *que suele ganar.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 1.0, K.Es + 0.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Pf + 0.4, K.Ad + 1.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.F + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [K.F + 2.1, K.F + 5.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.R + 2.5, K.L + 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.L + 1.9, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.9, K.M - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 2.0, K.M + 6.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ci + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="biologia" num="50" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LangostaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LangostaShot /></CompositionStage></div>;
}
window.LangostaApp = LangostaApp;
