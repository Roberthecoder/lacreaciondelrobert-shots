// Shot Fungi Mati #22 · Las arrieras no cargan hojas para comérselas: son granjeras — NARRADO (N1 "Por dentro", gancho 1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const AR = { cafe:'#a8451c', cafe2:'#7a3317', hoja:'#3fbf4a', hoja2:'#2f9e44', hongo:'#f3efe2', hongo2:'#cfc7b0', tierra:'#6b4a2b', tierra2:'#4a3220', parasito:'#6e5b2a', bulbo:'#fff3d1' };
const HOJAS = ['#3fbf4a', '#2f9e44', '#58c95f', '#7cc04a', '#2c8a3c'];

// Hormiga cortadora de perfil, mirando a la derecha (dir = -1 la voltea). Origen ≈ bajo el tórax.
// Morfología de Atta: cabeza en corazón con espinas atrás, tórax (mesosoma) con 3 pares de espinas, pecíolo y pospecíolo (2 nudos), gáster.
// hoja = carga un pedazo de hoja con las mandíbulas · alas 0..1 = reina/macho con alas · capa 0..1 = capa blanca de bacterias (Acromyrmex).
function Hormiga({ T, x, y, s = 1, dir = 1, paso = 1, fase = 0, hoja = false, hojaColor = AR.hoja, color = AR.cafe, alas = 0, capa = 0, gaster = 1, vel = 11, espinas = 1, cabeza = 1 }) {
  const osc = color === AR.cafe ? AR.cafe2 : mixHex(color, '#000000', 0.3);
  const pierna = (hx, adel, ph, lejos, k) => {
    const sw = Math.sin(ph) * 13 * paso, lev = Math.max(0, Math.cos(ph)) * 7 * paso;
    const fx = hx + adel + sw, fy = 46 - lev;
    const kx = hx + adel * 0.45 + sw * 0.4, ky = 18 - lev * 0.5;
    return <path key={k} d={`M ${hx} 0 L ${kx} ${ky - 12} L ${fx} ${fy}`} stroke={lejos ? mixHex(osc, '#ffffff', 0.15) : KC.ink} strokeWidth={lejos ? 5 : 6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={lejos ? 0.6 : 1} />;
  };
  const P = [[4, -24], [18, 2], [32, 22]];
  const base = T * vel + fase;
  const ant = Math.sin(T * 5 + fase) * 6;
  const aleteo = alas > 0 ? Math.sin(T * 48 + fase) * 10 * alas : 0;
  return <g transform={`translate(${x} ${y}) scale(${s * dir} ${s})`}>
    {hoja && <g transform={`translate(92 -8) rotate(${-8 + Math.sin(T * 4 + fase) * 4})`}>
      <path d="M 0 0 L -8 -40" stroke={KC.ink} strokeWidth={4} />
      <path d="M -8 -40 Q -90 -60 -96 -130 Q -40 -170 30 -150 Q 60 -100 20 -60 Q 10 -46 -8 -40 Z" fill={hojaColor} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d="M -8 -40 Q -30 -100 -20 -150" stroke="rgba(255,255,255,.45)" strokeWidth={4} fill="none" />
    </g>}
    {P.map(([hx, ad], i) => pierna(hx, ad, base + i * Math.PI + Math.PI, true, 'l' + i))}
    {alas > 0 && <g transform={`translate(14 -26) rotate(${-14 + aleteo})`}>
      <path d="M 0 0 Q -60 -60 -150 -50 Q -160 -30 -120 -14 Q -60 -4 0 0 Z" fill="rgba(225,240,255,.55)" stroke={KC.ink} strokeWidth={3} />
      <path d="M -10 -4 Q -70 -30 -140 -36" stroke="rgba(22,18,15,.4)" strokeWidth={2} fill="none" />
    </g>}
    <ellipse cx={-62 - (gaster - 1) * 30} cy={-6} rx={34 * gaster} ry={27 * gaster} fill={color} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={-70 - (gaster - 1) * 30} cy={-16 * gaster} rx={14 * gaster} ry={6 * gaster} fill="rgba(255,255,255,.28)" />
    <circle cx={-30} cy={-6} r={9} fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-15} cy={-8} r={10} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -6 -2 Q -8 -26 14 -29 Q 36 -31 42 -14 Q 44 2 30 3 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {espinas > 0 && [[4, -27, -4], [20, -30, 0], [34, -25, 8]].map(([sx, sy, r], i) => <path key={i} d={`M ${sx - 5} ${sy + 2} L ${sx - 2} ${sy - 12 * espinas} L ${sx + 4} ${sy + 1} Z`} fill={color} stroke={KC.ink} strokeWidth={3.5} strokeLinejoin="round" transform={`rotate(${r} ${sx} ${sy})`} />)}
    {alas > 0 && <path d="M 0 -24 Q 20 -40 40 -20" stroke="rgba(255,255,255,.3)" strokeWidth={5} fill="none" />}
    {capa > 0 && <g opacity={capa}>
      {[[2, -14, 10], [14, -20, 12], [28, -16, 11], [36, -6, 8], [-15, -12, 7], [8, -4, 9], [22, -4, 9]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill="#f6f2e4" stroke="rgba(22,18,15,.35)" strokeWidth={2} />)}
    </g>}
    <g transform={`translate(62 -18) scale(${cabeza})`}>
      <path d="M -22 -6 Q -26 -26 -8 -26 Q 2 -18 6 -26 Q 26 -26 26 -4 Q 24 18 0 20 Q -24 16 -22 -6 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M -18 -20 L -26 -32 L -12 -24 Z" fill={color} stroke={KC.ink} strokeWidth={3.5} />
      <circle cx={6} cy={-6} r={4.5} fill={KC.ink} />
      <path d="M 20 4 L 38 12 L 24 16 Z" fill={osc} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
      <path d={`M 10 -18 L 28 ${-46 + ant * 0.3} L ${54} ${-36 + ant}`} stroke={KC.ink} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    {P.map(([hx, ad], i) => pierna(hx, ad, base + i * Math.PI, false, 'c' + i))}
  </g>;
}

// Larva: gusanito blanco en forma de C.
function Larva({ T, x, y, s = 1, come = 0 }) {
  const r = Math.sin(T * 3) * 3;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}>
    <path d="M -44 -26 Q -60 30 0 36 Q 50 34 46 -6" stroke={KC.ink} strokeWidth={56} fill="none" strokeLinecap="round" />
    <path d="M -44 -26 Q -60 30 0 36 Q 50 34 46 -6" stroke="#fbf6e8" strokeWidth={46} fill="none" strokeLinecap="round" />
    {[-0.8, -0.4, 0, 0.4].map((u, i) => <path key={i} d={`M ${-30 + i * 22} ${8 + Math.abs(u) * 8} l ${-6} ${-16}`} stroke="rgba(22,18,15,.25)" strokeWidth={4} />)}
    <circle cx={46} cy={-10} r={15} fill="#efdcb0" stroke={KC.ink} strokeWidth={5} />
    <path d={`M 56 -2 L ${62 + come * 4} 4`} stroke={KC.ink} strokeWidth={4} strokeLinecap="round" />
  </g>;
}

// Jardín de hongo (esponja blanca con huecos y pedacitos de hoja). manchas 0..1 = avanza el parásito desde 'focos'.
function Jardin({ T, x, y, rx = 300, ry = 180, seed = 4, n = 120, manchas = 0, focos = [[0.4, -0.2], [-0.5, 0.3]], hojas = 14, tam = 1, estafilas = 0 }) {
  const g = krng(seed);
  const cs = Array.from({ length: n }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()); return { x: Math.cos(a) * d * rx, y: Math.sin(a) * d * ry, r: (16 + g() * 26) * tam, h: g() }; });
  const hs = Array.from({ length: hojas }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * 0.85; return { x: Math.cos(a) * d * rx, y: Math.sin(a) * d * ry, r: g() * 180, c: HOJAS[Math.floor(g() * 5)] }; });
  const es = Array.from({ length: Math.round(estafilas * 16) }, () => { const a = g() * Math.PI * 2, d = Math.sqrt(g()) * 0.8; return { x: Math.cos(a) * d * rx, y: Math.sin(a) * d * ry }; });
  const dMan = (c) => Math.min(...focos.map(([fx, fy]) => Math.hypot(c.x / rx - fx, c.y / ry - fy)));
  return <g transform={`translate(${x} ${y})`}>
    <ellipse rx={rx + 20 * tam} ry={ry + 18 * tam} fill="#d8d0b8" stroke={KC.ink} strokeWidth={6} />
    {cs.map((c, i) => { const m = manchas > 0 ? kclamp((manchas * 1.1 - dMan(c)) * 4, 0, 1) : 0;
      return <g key={i}><circle cx={c.x} cy={c.y} r={c.r} fill={mixHex(c.h > 0.5 ? AR.hongo : '#e9e3d1', AR.parasito, m)} stroke={mixHex(AR.hongo2, '#3c3115', m)} strokeWidth={3} />
        {c.h > 0.7 && <circle cx={c.x + c.r * 0.2} cy={c.y + c.r * 0.1} r={c.r * 0.35} fill={mixHex('#9c927a', '#2e2611', m)} />}</g>; })}
    {hs.map((h, i) => <path key={i} d="M -9 -6 L 10 -8 L 12 6 L -6 9 Z" transform={`translate(${h.x} ${h.y}) rotate(${h.r}) scale(${tam})`} fill={h.c} stroke={KC.ink} strokeWidth={2.5} />)}
    {es.map((e, i) => <g key={i} transform={`translate(${e.x} ${e.y}) scale(${tam})`}>{[[0, 0], [7, -4], [-6, -5], [2, -10], [8, 5], [-5, 5]].map(([a, b], k) => <circle key={k} cx={a} cy={b} r={4.2} fill="#fffdf2" stroke="rgba(22,18,15,.45)" strokeWidth={1.5} />)}</g>)}
  </g>;
}

// Gongilidios al microscopio: hifas con las puntas hinchadas en racimos (estafilas). Cada bulbo ≈ 30–50 µm (3–5× la barra de 10 µm = 40 px).
function Estafila({ T, x, y, at, s = 1, seed = 2, n = 7 }) {
  const g = krng(seed);
  const bs = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (g() - 0.5) * 2.4, d = 70 + g() * 120; return { x: Math.cos(a) * d, y: Math.sin(a) * d - 60, r: 60 + g() * 40, t: i * 0.12 }; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {bs.map((b, i) => <path key={'h' + i} d={`M 0 120 Q ${b.x * 0.3} ${b.y * 0.2 + 60} ${b.x} ${b.y}`} stroke="#e9dfc2" strokeWidth={14} fill="none" opacity={kprog(T, at + b.t - 0.2, at + b.t + 0.1)} />)}
    <path d="M 0 120 L 0 600" stroke="#e9dfc2" strokeWidth={16} />
    {bs.map((b, i) => { const k = kprog(T, at + b.t, at + b.t + 0.45, kEase.rebote); if (k <= 0) return null;
      return <g key={i} transform={`translate(${b.x} ${b.y}) scale(${k})`}>
        <ellipse rx={b.r} ry={b.r * 0.86} fill={AR.bulbo} stroke={KC.ink} strokeWidth={6} style={{ filter:`drop-shadow(0 0 14px rgba(255,230,160,.5))` }} />
        {[[-0.3, -0.2], [0.25, 0.1], [-0.05, 0.35], [0.3, -0.35]].map(([a, c], k2) => <circle key={k2} cx={a * b.r} cy={c * b.r} r={b.r * 0.12} fill={KC.gold2} opacity={0.75} />)}
        <ellipse cx={-b.r * 0.35} cy={-b.r * 0.4} rx={b.r * 0.25} ry={b.r * 0.12} fill="#fff" opacity=".55" />
      </g>; })}
  </g>;
}

// Suelo en corte: superficie en ySup, túnel hacia una cámara con el jardín.
function CorteSuelo({ T, ySup = 600, cam = [540, 1020, 380, 210], tunel = true, children }) {
  const [cx, cy, rx, ry] = cam;
  return <g>
    <rect x={0} y={ySup} width={KW} height={KH - ySup} fill={AR.tierra} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 40 }, (_, i) => { const g = krng(i + 7); return <circle key={i} cx={g() * KW} cy={ySup + 30 + g() * (KH - ySup)} r={4 + g() * 9} fill={g() > 0.5 ? AR.tierra2 : '#8a6440'} />; })}
    <path d={`M 0 ${ySup} Q 270 ${ySup - 10} 470 ${ySup} L 610 ${ySup} Q 820 ${ySup - 12} ${KW} ${ySup}`} stroke="#5aa040" strokeWidth={14} fill="none" />
    {tunel && <path d={`M 540 ${ySup - 4} Q 480 ${(ySup + cy - ry) / 2} 560 ${cy - ry + 10}`} stroke="#2a1a10" strokeWidth={56} fill="none" strokeLinecap="round" />}
    <ellipse cx={cx} cy={cy} rx={rx + 26} ry={ry + 24} fill="#2a1a10" stroke={KC.ink} strokeWidth={6} />
    {children}
  </g>;
}

// Rótulo con partes en cursiva: partes = [['Acromyrmex', true], [', otra arriera', false]]
function Rotulo({ T, at, until, x, y, partes, tam = 32, color = KC.texto, linea = true }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, transform:`translateY(-50%) translateY(${e.y * 0.3}px)` }}>
    {linea && <div style={{ width:60 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:color, borderRadius:2 }}></div>}
    <div style={{ font:`700 ${tam}px ${KF.mono}`, color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>
      {partes.map(([t, it], i) => <span key={i} style={{ fontStyle: it ? 'italic' : 'normal' }}>{t}</span>)}
    </div>
  </div>;
}

// Molcajete con salsa (chicatanas).
function Molcajete({ T, x, y, s = 1, llena = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-90, 0, 90].map((dx, i) => <path key={i} d={`M ${dx - 22} 60 L ${dx - 14} 110 L ${dx + 14} 110 L ${dx + 22} 60 Z`} fill="#4b4b50" stroke={KC.ink} strokeWidth={6} />)}
    <path d="M -170 -10 Q -160 90 0 90 Q 160 90 170 -10 Z" fill="#55555b" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 16 }, (_, i) => { const g = krng(i + 30); return <circle key={i} cx={-130 + g() * 260} cy={10 + g() * 60} r={3 + g() * 4} fill="#3a3a3e" />; })}
    <ellipse cx={0} cy={-10} rx={170} ry={30} fill="#3f3f44" stroke={KC.ink} strokeWidth={7} />
    {llena > 0 && <ellipse cx={0} cy={-8} rx={150 * llena} ry={22 * llena} fill="#b8341f" />}
    {llena > 0.6 && [[-70, -10], [-20, -4], [40, -12], [90, -6], [10, -16]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={12} ry={6} fill="#4a2410" transform={`rotate(${i * 30} ${a} ${b})`} />)}
  </g>;
}

// Hilera de hormigas que caminan a la derecha cargando hojas.
function Hilera({ T, y, n = 6, s = 1, vel = 70, sep = 260, x0 = -260, conHoja = true, dy = 0 }) {
  const L = n * sep;
  return <g>{Array.from({ length: n }, (_, i) => { const x = ((x0 + i * sep + T * vel) % L + L) % L - 200;
    return <Hormiga key={i} T={T} x={x} y={y + (i % 2) * dy} s={s} fase={i * 1.7} hoja={conHoja && i % 3 !== 2} hojaColor={HOJAS[i % 5]} />; })}</g>;
}

function ArrierasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Pa: CUES.Pasta, B: CUES.Bolitas, E: CUES.Edad, P: CUES.Pregunta, Pl: CUES.Plaga, Es: CUES.Estudio, Ba: CUES.Bacterias, To: CUES.Todas, Ch: CUES.Chicatanas, R: CUES.Reina, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const Bm = K.B + (K.E - K.B) * 0.52;   // en "Bolitas": primero el microscopio, luego quién se las come
  const corte = kprog(T, K.Pa + 0.4, K.Pa + 2.2);
  const pasta = kprog(T, K.Pa + 2.3, K.Pa + 3.3);
  const alJardin = kprog(T, K.Pa + 3.4, K.Pa + 4.4, kEase.suave);
  const pan = [K.Es, K.Ba];
  const panama = mxProy(-79.6, 9.0);
  const linea = kprog(T, K.E + 1.0, K.E + 3.0, kEase.suave);
  const tx = (ma) => 960 - (ma / 66) * 840;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la hilera de arrieras con sus hojas */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1110} width={KW} height={900} fill={AR.tierra} stroke={KC.ink} strokeWidth={8} />
          <path d="M 0 1110 Q 300 1100 540 1110 Q 800 1120 1080 1108" stroke="#5aa040" strokeWidth={14} fill="none" />
          <Hilera T={T} y={1060} n={6} s={0.95} vel={95} sep={300} x0={-80} />
          <Sello T={T} at={K.G + 2.3} x={330} y={720} texto="NO" color={KC.red} r={110} />
        </>)}
      </Escena>
      {/* 2 · bajo tierra: las hojas bajan a una cámara con un hongo cultivado */}
      <Escena T={T} a={K.H} b={K.Pa} zoom={0.16} origen="50% 62%">
        <FondoLunares color={KC.mint} />
        {fsvg(<CorteSuelo T={T} ySup={560} cam={[540, 1030, 400, 220]}>
          <Jardin T={T} x={540} y={1030} rx={370} ry={196} seed={4} n={130} />
          {Array.from({ length: 7 }, (_, i) => { const u = ((T - K.H) * 0.35 + i / 7) % 1; const px = klerp(540, 560, u) - Math.sin(u * Math.PI) * 50, py = klerp(560, 830, u);
            return <Hormiga key={i} T={T} x={px} y={py} s={0.13} dir={1} fase={i} hoja hojaColor={HOJAS[i % 5]} />; })}
          <Hilera T={T} y={548} n={8} s={0.13} vel={40} sep={140} />
        </CorteSuelo>)}
      </Escena>
      {/* 3 · las grandes cortan; las chiquitas hacen pasta con saliva y la meten al jardín */}
      <Escena T={T} a={K.Pa} b={K.B} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <defs><mask id="ar-corte"><rect x={0} y={0} width={KW} height={KH} fill="#fff" /><circle cx={300} cy={850} r={10 + 150 * corte} fill="#000" /></mask></defs>
          <path d="M 640 600 Q 660 760 610 1010" stroke="#5a7a2a" strokeWidth={16} fill="none" />
          <g mask="url(#ar-corte)">
            <path d="M 620 640 Q 380 560 190 760 Q 260 960 620 900 Q 660 760 620 640 Z" fill={AR.hoja} stroke={KC.ink} strokeWidth={7} />
            <path d="M 620 650 Q 420 760 220 770" stroke="rgba(255,255,255,.45)" strokeWidth={6} fill="none" />
          </g>
          {corte > 0.95 && <g transform={`translate(${klerp(300, 470, pasta)} ${klerp(850, 1010, pasta)}) scale(${klerp(1, 0.25, pasta)})`}>
            <circle r={150} fill={AR.hoja} stroke={KC.ink} strokeWidth={7} opacity={1 - pasta * 0.6} />
          </g>}
          <Hormiga T={T} x={130} y={900} s={1.75} paso={0.15} fase={1} />
          {/* cortadora: mandíbula que hace tijera */}
          <path d={`M 300 862 L ${318 + Math.sin(T * 22) * 8} 840`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" opacity={corte < 1 ? 1 : 0} />
          <Jardin T={T} x={860} y={1130} rx={200} ry={90} seed={8} n={50} hojas={8} tam={0.8} />
          <Hormiga T={T} x={klerp(420, 650, alJardin)} y={1120} s={0.62} paso={alJardin > 0 && alJardin < 1 ? 1 : 0.1} fase={2} />
          {pasta > 0 && <g transform={`translate(${klerp(470, 708, alJardin)} ${klerp(1080, 1090, alJardin)})`}>
            <circle r={klerp(34, 20, pasta)} fill={mixHex(AR.hoja, '#2c6b2a', pasta)} stroke={KC.ink} strokeWidth={4} />
            {pasta > 0.3 && pasta < 1 && <circle cx={14} cy={-22} r={8 * Math.sin(pasta * Math.PI)} fill="#9fe6ff" stroke={KC.ink} strokeWidth={2} />}
          </g>}
        </>)}
      </Escena>
      {/* 4a · al microscopio: las bolitas del hongo (gongilidios) */}
      <Escena T={T} a={K.B} b={Bm}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Estafila T={T} x={360} y={820} at={K.B + 0.2} seed={3} />
          <Estafila T={T} x={790} y={980} at={K.B + 0.6} s={0.85} seed={9} n={6} />
        </>)}
      </Escena>
      {/* 4b · de eso comen las larvas y casi todas las adultas */}
      <Escena T={T} a={Bm} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:'#3a2716' }}></div>
        {fsvg(<>
          <Jardin T={T} x={540} y={1060} rx={620} ry={330} seed={12} n={170} hojas={20} tam={1.1} estafilas={1} />
          <Larva T={T} x={420} y={900} s={1.5} come={Math.max(0, Math.sin(T * 8))} />
          <Larva T={T} x={760} y={1090} s={1.2} />
          <Hormiga T={T} x={klerp(760, 610, kprog(T, Bm + 0.2, Bm + 1.2, kEase.suave))} y={940} s={0.95} dir={-1} paso={0.6} fase={3} />
          <g transform={`translate(${klerp(660, 535, kprog(T, Bm + 0.2, Bm + 1.2, kEase.suave))} 925)`} opacity={1 - kprog(T, Bm + 1.6, Bm + 1.9)}>{[[0, 0], [8, -5], [-7, -5], [2, -12], [9, 6], [-6, 6]].map(([a, b], k) => <circle key={k} cx={a} cy={b} r={6} fill="#fffdf2" stroke={KC.ink} strokeWidth={2} />)}</g>
          <Hormiga T={T} x={250} y={1150} s={0.8} paso={0.3} fase={5} />
        </>)}
      </Escena>
      {/* 5 · hace ~66 millones de años: hormigas jardineras; las arrieras, mucho después; los humanos, un punto al final */}
      <Escena T={T} a={K.E} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <line x1={120} y1={1010} x2={klerp(120, 960, linea)} y2={1010} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />
          {linea > 0.98 && <path d="M 960 990 L 1000 1010 L 960 1030 Z" fill={KC.ink} />}
          {[66, 50, 40, 30, 20, 10].map((ma, i) => linea > (66 - ma) / 66 && <line key={i} x1={tx(ma)} y1={990} x2={tx(ma)} y2={1030} stroke={KC.ink} strokeWidth={5} />)}
          <g opacity={kprog(T, K.E + 0.6, K.E + 1.0)}>
            <Jardin T={T} x={tx(66) + 20} y={900} rx={70} ry={40} seed={2} n={24} hojas={3} tam={0.5} />
            <Hormiga T={T} x={tx(66) + 10} y={865} s={0.38} paso={0.4} />
            <text x={tx(66) - 10} y={1080} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>hormigas jardineras</text>
          </g>
          {linea > 0.7 && <g opacity={kprog(T, K.E + 2.4, K.E + 2.8)}>
            <Hormiga T={T} x={tx(19) - 10} y={960} s={0.34} hoja paso={0.5} />
            <text x={tx(19)} y={1080} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>arrieras</text>
          </g>}
          {linea > 0.98 && <g opacity={kprog(T, K.E + 3.4, K.E + 3.8)}>
            <circle cx={tx(0.3)} cy={1010} r={12 + 4 * Math.sin(T * 8)} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
            <text x={tx(0.3) - 6} y={960} textAnchor="end" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>humanos</text>
            <text x={tx(0.3) - 6} y={1124} textAnchor="end" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>hoy</text>
          </g>}
        </>)}
      </Escena>
      {/* 6 · re-gancho: un solo cultivo… ¿y si le cae una plaga? */}
      <Escena T={T} a={K.P} b={K.Pl} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:'#3a2716' }}></div>
        {fsvg(<>
          <Jardin T={T} x={540} y={1080} rx={640} ry={300} seed={21} n={160} hojas={20} />
          <Interrogacion T={T} x={290} y={900} />
        </>)}
      </Escena>
      {/* 7 · el parásito Escovopsis avanza sobre el jardín */}
      <Escena T={T} a={K.Pl} b={K.Es} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#3a2716' }}></div>
        {fsvg(<Jardin T={T} x={540} y={1000} rx={620} ry={380} seed={21} n={190} hojas={20} manchas={kprog(T, K.Pl + 0.6, K.Es + 0.4)} focos={[[0.45, -0.3], [-0.4, 0.35], [0.1, 0.6]]} />)}
      </Escena>
      {/* 8 · el estudio: 1999, Universidad de Toronto, trabajo en Panamá */}
      <Escena T={T} a={K.Es} b={K.Ba} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<g opacity={kprog(T, K.Es + 0.8, K.Es + 1.3)}>
          <MapaMexico x={300} y={780} ancho={720} />
          <g transform={`translate(${300 + panama[0] * 0.72} ${780 + panama[1] * 0.72})`}>
            <circle r={22 + 10 * Math.abs(Math.sin(T * 4))} fill="none" stroke={KC.red} strokeWidth={6} />
            <circle r={11} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          </g>
          <text x={300 + panama[0] * 0.72 - 30} y={780 + panama[1] * 0.72 + 70} textAnchor="end" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, K.Es + 1.6, K.Es + 2.0)}>Panamá</text>
        </g>)}
      </Escena>
      {/* 9 · bacterias en el cuerpo que hacen antibióticos (capa visible en Acromyrmex) */}
      <Escena T={T} a={K.Ba} b={K.To} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1140} width={KW} height={900} fill={AR.tierra} stroke={KC.ink} strokeWidth={8} />
          <Hormiga T={T} x={470} y={1050} s={3.0} paso={0.12} color="#7c4a26" capa={kprog(T, K.Ba + 0.4, K.Ba + 1.2)} espinas={1.6} />
        </>)}
      </Escena>
      {/* 10 · estaban en todas las especies de hormigas jardineras que revisaron */}
      <Escena T={T} a={K.To} b={K.Ch} zoom={0.05}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          {[[230, 820, 0.95, '#a8451c', 1, 1], [560, 820, 0.75, '#6b3b1e', 1.4, 0.9], [880, 820, 0.85, '#c9772e', 0.6, 1.1], [380, 1080, 0.7, '#4a2c1a', 0.3, 0.85], [740, 1080, 1.0, '#8e5a2b', 1.2, 1.2]].map(([x, y, s, c, es, gs], i) => {
            const k = kprog(T, K.To + 0.3 + i * 0.35, K.To + 0.6 + i * 0.35, kEase.rebote), ok = kprog(T, K.To + 0.7 + i * 0.35, K.To + 1.0 + i * 0.35, kEase.rebote);
            return <g key={i}>
              {k > 0 && <g transform={`translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})`}><Hormiga T={T} x={x - 20} y={y} s={s} color={c} espinas={es} gaster={gs} paso={0.4} fase={i * 2} /></g>}
              {ok > 0 && <g transform={`translate(${x + 10} ${y - 150}) scale(${ok})`}><circle r={36} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} /><path d="M -16 2 L -4 14 L 18 -12" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>}
            </g>; })}
        </>)}
      </Escena>
      {/* 11 · chicatanas: las arrieras con alas salen con la lluvia */}
      <Escena T={T} a={K.Ch} b={K.R} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          {Array.from({ length: 26 }, (_, i) => { const g = krng(i + 50); const xx = g() * KW, v = 900 + g() * 400, yy = ((g() * KH + (T - K.Ch) * v) % 1200) + 200; return <line key={i} x1={xx} y1={yy} x2={xx - 8} y2={yy + 40} stroke="#4aa3d8" strokeWidth={5} strokeLinecap="round" opacity=".7" />; })}
          <rect x={0} y={1110} width={KW} height={900} fill={AR.tierra} stroke={KC.ink} strokeWidth={8} />
          <path d="M 170 1112 Q 300 1020 430 1112 Z" fill="#8a6440" stroke={KC.ink} strokeWidth={6} />
          <ellipse cx={300} cy={1080} rx={34} ry={14} fill="#2a1a10" />
          {Array.from({ length: 4 }, (_, i) => { const u = kprog(T, K.Ch + 0.3 + i * 0.7, K.Ch + 3.0 + i * 0.7); if (u <= 0) return null;
            const px = 300 + Math.sin(u * 4 + i) * 60 + (i - 1.5) * 120 * u, py = 1060 - u * (420 + i * 50);
            return <Hormiga key={i} T={T} x={px} y={py} s={0.8} alas={1} gaster={1.45} cabeza={1.1} paso={0.3} fase={i * 3} dir={i % 2 ? -1 : 1} />; })}
          <Molcajete T={T} x={790} y={1010} s={0.95} llena={kprog(T, K.Ch + 2.4, K.Ch + 3.4, kEase.sale)} />
        </>)}
      </Escena>
      {/* 12 · la futura reina se lleva un pedacito del hongo en la bolsa infrabucal */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <rect x={0} y={1160} width={KW} height={900} fill={AR.tierra} stroke={KC.ink} strokeWidth={8} />
          <Hormiga T={T} x={300} y={1090} s={2.4} alas={0.4} gaster={1.45} cabeza={1.1} paso={0.15} fase={2} />
        </>)}
      </Escena>
      {/* 13 · cierre: la misma hilera; debajo, el jardín que esas hojas alimentan */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<CorteSuelo T={T} ySup={kprog(T, K.C, K.C + 1.6, kEase.suave) > 0 ? klerp(1110, 760, kprog(T, K.C + 0.2, K.C + 1.6, kEase.suave)) : 1110} cam={[540, 1330, 520, 300]}>
          <Jardin T={T} x={540} y={1330} rx={500} ry={280} seed={4} n={150} hojas={22} />
          <Hilera T={T} y={klerp(1060, 712, kprog(T, K.C + 0.2, K.C + 1.6, kEase.suave))} n={6} s={0.95} vel={95} sep={300} x0={-80} />
          {Array.from({ length: 5 }, (_, i) => { const u = ((T - K.C) * 0.5 + i / 5) % 1; const o = kprog(T, K.C + 1.6, K.C + 2.2);
            return <path key={i} d="M -12 -8 L 12 -10 L 14 8 L -8 11 Z" transform={`translate(${klerp(545, 560, u) - Math.sin(u * Math.PI) * 40} ${klerp(780, 1040, u)}) rotate(${u * 300})`} fill={HOJAS[i]} stroke={KC.ink} strokeWidth={3} opacity={o} />; })}
        </CorteSuelo>)}
      </Escena>

      {/* lupas (por dentro / al microscopio) */}
      <Lupa T={T} at={K.Ba + 1.3} until={K.To - 0.2} x={360} y={560} r={220} fx={530} fy={1010} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · bacterias" interior={(T2, r) => {
        const v = kprog(T2, K.Ba + 1.6, K.To - 0.4);
        return <svg width={r * 2} height={r * 2}>
          <RedHifas T={T2} x={r * 1.75} y={r * 0.9} g={klerp(0.9, 0.35, v)} seed={5} n={160} escala={0.32} color="#b8a15a" ancho={5} rot={180} />
          <RedHifas T={T2} x={r * 0.25} y={r * 1.1} g={klerp(0.35, 0.95, v)} seed={8} n={220} escala={0.3} color={KC.mint} ancho={3} />
          {Array.from({ length: 10 }, (_, i) => { const u = ((T2 * 0.6 + i / 10) % 1); const g = krng(i + 3); return <circle key={i} cx={r * (0.5 + u * 0.9)} cy={r * (0.4 + g() * 1.2)} r={6 + u * 10} fill="#9fe6ff" opacity={(1 - u) * 0.8 * kprog(T2, K.Ba + 1.8, K.Ba + 2.2)} />; })}
        </svg>; }} />
      <Lupa T={T} at={K.R + 0.8} until={K.C - 0.2} x={380} y={600} r={230} fx={548} fy={1052} tinte={KC.yellow} etiqueta="POR DENTRO · bolsa infrabucal" interior={(T2, r) => {
        const k = kprog(T2, K.R + 1.3, K.R + 2.3, kEase.rebote);
        return <svg width={r * 2} height={r * 2}>
          <path d={`M ${r * 0.1} ${r * 0.7} Q ${r * 0.6} ${r * 0.15} ${r * 1.5} ${r * 0.55} Q ${r * 1.9} ${r * 0.9} ${r * 1.7} ${r * 1.35} Q ${r} ${r * 1.95} ${r * 0.2} ${r * 1.5} Z`} fill="#c25f2c" stroke="#f3e6c4" strokeWidth={5} opacity=".9" />
          <path d={`M ${r * 1.7} ${r * 1.15} L ${r * 2} ${r * 1.25} M ${r * 1.65} ${r * 1.3} L ${r * 1.95} ${r * 1.45}`} stroke="#f3e6c4" strokeWidth={8} strokeLinecap="round" />
          <path d={`M ${r * 1.62} ${r * 1.22} Q ${r * 1.3} ${r * 1.25} ${r * 1.2} ${r * 1.15}`} stroke="#f3e6c4" strokeWidth={6} fill="none" />
          <ellipse cx={r * 1.05} cy={r * 1.2} rx={r * 0.34} ry={r * 0.26} fill="#3b1a0c" stroke="#f3e6c4" strokeWidth={5} />
          <g transform={`translate(${r * 1.05} ${r * 1.2}) scale(${k})`}>
            <circle r={r * 0.2} fill="#fffaf0" stroke={KC.ink} strokeWidth={4} />
            <RedHifas T={T2} x={0} y={0} g={0.9} seed={2} n={60} escala={0.12} color="#e9dfc2" ancho={2} circ />
          </g>
        </svg>; }} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.5} until={K.H - 0.2} texto="¿las cargan para comérselas?" x={330} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.G + 1.2} until={K.H - 0.2} x={60} y={900} texto="hormiga arriera" tam={32} color={KC.ink} />
      <Etq T={T} at={K.G + 1.6} until={K.H - 0.2} x={60} y={950} texto="Atta mexicana" it tam={32} color={KC.ink} />
      <Rotulo T={T} at={K.H + 1.2} until={K.Pa - 0.2} x={40} y={700} partes={[['hongo cultivado', false]]} tam={32} />
      <Rotulo T={T} at={K.H + 1.6} until={K.Pa - 0.2} x={40} y={750} partes={[['Leucoagaricus gongylophorus', true]]} tam={32} />
      <Chip T={T} at={K.Pa + 0.4} until={K.B - 0.2} texto="cortadora" x={240} y={560} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 2.3} until={K.B - 0.2} texto="jardinera" x={560} y={940} tam={34} borde={KC.ink} />
      <Rotulo T={T} at={K.B + 0.9} until={Bm - 0.2} x={40} y={430} partes={[['gongilidios: puntas hinchadas del hongo', false]]} tam={30} />
      <Chip T={T} at={K.B + 0.4} until={Bm - 0.2} texto="AL MICROSCOPIO" x={540} y={1150} tam={30} mono borde={KC.cyan} />
      <Rotulo T={T} at={Bm + 0.3} until={K.E - 0.2} x={40} y={720} partes={[['larva', false]]} tam={30} />
      <NumeroGigante T={T} at={K.E + 0.2} until={K.P - 0.2} valor={66} prefijo="~" dur={0.8} x={380} y={500} tam={240} />
      <Chip T={T} at={K.E + 0.7} until={K.P - 0.2} texto="millones de años · hormigas jardineras" x={540} y={720} tam={34} borde={KC.ink} />
      <Rotulo T={T} at={K.Pl + 0.8} until={K.Es - 0.2} x={40} y={470} partes={[['hongo parásito', false]]} tam={34} />
      <Rotulo T={T} at={K.Pl + 1.2} until={K.Es - 0.2} x={40} y={525} partes={[['Escovopsis', true]]} tam={34} />
      <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Ba - 0.2} anio="1999" quien="Univ. de Toronto · Panamá" revista="Currie et al. · Nature, 1999" y={500} />
      <Rotulo T={T} at={K.Ba + 0.6} until={K.To - 0.2} x={40} y={1180} partes={[['Acromyrmex', true], [', otra arriera', false]]} tam={30} color={KC.ink} linea={false} />
      <Rotulo T={T} at={K.Ba + 1.0} until={K.To - 0.2} x={40} y={1225} partes={[['bacterias ', false], ['Pseudonocardia', true]]} tam={30} color={KC.ink} linea={false} />
      <Chip T={T} at={K.Ba + 2.2} until={K.To - 0.2} texto="antibiótico vs. parásito" x={360} y={890} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.To + 0.3} until={K.Ch - 0.2} texto="22 especies revisadas en Panamá (1999)" x={540} y={480} tam={34} borde={KC.leaf} />
      <Rotulo T={T} at={K.Ch + 1.0} until={K.R - 0.2} x={40} y={430} partes={[['chicatana', false]]} tam={34} color={KC.ink} linea={false} />
      <Rotulo T={T} at={K.Ch + 1.4} until={K.R - 0.2} x={40} y={480} partes={[['Atta mexicana', true], [' (con alas)', false]]} tam={30} color={KC.ink} linea={false} />
      <Chip T={T} at={K.Ch + 2.6} until={K.R - 0.2} texto="en salsa" x={790} y={880} tam={34} borde={KC.red} />
      <Rotulo T={T} at={K.R + 0.3} until={K.C - 0.2} x={40} y={1220} partes={[['futura reina', false]]} tam={30} color={KC.ink} linea={false} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="la hoja = abono" x={330} y={470} tam={40} borde={KC.leaf} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 mm" largo={120} />
      <BarraEscala T={T} at={K.H} until={K.Pa} texto="5 cm" largo={150} />
      <BarraEscala T={T} at={K.Pa} until={K.B} texto="5 mm" largo={200} />
      <BarraEscala T={T} at={K.B} until={Bm} texto="10 µm" largo={40} />
      <BarraEscala T={T} at={Bm} until={K.E} texto="1 mm" largo={60} />
      <BarraEscala T={T} at={K.E} until={K.P} texto="10 millones de años" largo={127} />
      <BarraEscala T={T} at={K.P} until={K.Es} texto="1 cm" largo={150} />
      <BarraEscala T={T} at={K.Es} until={K.Ba} texto="500 km" largo={82} />
      <BarraEscala T={T} at={K.Ba} until={K.To} texto="1 mm" largo={90} />
      <BarraEscala T={T} at={K.To} until={K.Ch} texto="5 mm" largo={120} />
      <BarraEscala T={T} at={K.Ch} until={K.R} texto="1 cm" largo={80} />
      <BarraEscala T={T} at={K.R} until={K.C} texto="2 mm" largo={60} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 mm" largo={120} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No las cargan para comérselas: *son granjeras.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Pa - 0.1} texto="Las hojas son *abono para un hongo.*" />
      <Subtitulo T={T} idx={2} at={K.Pa + 0.1} until={K.B - 0.1} texto="Unas cortan; otras hacen *pasta con saliva.*" />
      <Subtitulo T={T} idx={3} at={K.B + 0.1} until={K.E - 0.1} texto="El hongo les da *bolitas nutritivas.*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.P - 0.1} texto="Sus ancestros, hace *~66 millones de años.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Pl - 0.1} texto="Un solo cultivo… *¿y si le cae una plaga?*" />
      <Subtitulo T={T} idx={6} at={K.Pl + 0.1} until={K.Es - 0.1} texto="Un hongo parásito: *Escovopsis.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Ba - 0.1} texto="1999, Toronto y Panamá: *su defensa.*" />
      <Subtitulo T={T} idx={8} at={K.Ba + 0.1} until={K.To - 0.1} texto="Bacterias que hacen *antibióticos.*" />
      <Subtitulo T={T} idx={9} at={K.To + 0.1} until={K.Ch - 0.1} texto="En *todas las especies* revisadas." />
      <Subtitulo T={T} idx={10} at={K.Ch + 0.1} until={K.R - 0.1} texto="Con alas les dicen *chicatanas.*" />
      <Subtitulo T={T} idx={11} at={K.R + 0.1} until={K.C - 0.1} texto="La reina se lleva *un pedacito del hongo.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="La hoja es *abono para su granja.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.5, 'avatar_11_sorprendido', 'gancho'],
        [K.Pa + 0.5, K.B - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 0.6, K.P - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Pl - 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.Pl + 0.5, K.Es - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Ba + 1.2, K.To - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ch + 0.9, K.R - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.R + 0.5, K.C - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="22" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ArrierasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ArrierasShot /></CompositionStage></div>;
}
window.ArrierasApp = ArrierasApp;
