// Shot Biotecnológico #36 · La bacteria que come PET (Ideonella sakaiensis, PETasa y MHETasa; la enzima mejorada de 2020) — NARRADO (N1 + N3).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático y no está a escala (bacterias, enzimas y moléculas).
const PET_AZUL = 'rgba(190,236,255,.62)', ENZ_P = '#9b5de5', ENZ_M = '#00d2ff', ENZ_L = '#ff8a1f', HEX_C = '#F4C25A', EG_C = '#2fe0a8';
const PX_MM = 2.55;  // botella de 600 ml ≈ 22 cm ≈ 560 px con s = 1

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

/* ---------- MACRO ---------- */
// Botella de PET transparente (600 ml). aplasta 0..1 = aplastada; nueva = brillo de botella recién hecha.
function BotellaPET({ x, y, s = 1, rot = 0, aplasta = 0, etiqueta = '#ff2d78', tapa = '#2346ff', nueva = 0, T = 0 }) {
  const a = kclamp(aplasta, 0, 1), sx = 1 + a * 0.28, sy = 1 - a * 0.42;
  const pinch = a * 26;
  const cuerpo = `M -34 -230 L 34 -230 L 36 -200 Q 92 -170 96 -110 L ${96 - pinch} -40 Q ${96 + pinch * 0.6} 20 ${96 - pinch} 80 L 96 210 Q 96 250 60 262 L 30 268 L 0 256 L -30 268 L -60 262 Q -96 250 -96 210 L ${-96 + pinch} 80 Q ${-96 - pinch * 0.6} 20 ${-96 + pinch} -40 L -96 -110 Q -92 -170 -36 -200 Z`;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * sx} ${s * sy})`}>
    {nueva > 0 && <circle r={300} fill="rgba(255,255,255,.35)" opacity={nueva * (0.6 + 0.4 * Math.sin(T * 5))} />}
    <rect x={-30} y={-272} width={60} height={44} rx={8} fill={tapa} stroke={KC.ink} strokeWidth={7} />
    <rect x={-38} y={-232} width={76} height={10} rx={4} fill={tapa} stroke={KC.ink} strokeWidth={5} />
    <path d={cuerpo} fill={PET_AZUL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <rect x={-94} y={-10} width={188} height={110} fill={etiqueta} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={66} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={KC.white} stroke={KC.ink} strokeWidth={2}>PET</text>
    <path d="M -64 -140 Q -76 -60 -66 -20" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" opacity=".75" />
    <path d="M -64 120 L -66 220" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity=".6" />
    {a > 0.2 && [[-40, 150, 30], [30, 170, -20], [10, -80, 15]].map(([px, py, r], i) => <path key={i} d={`M ${px - 30} ${py} l 60 ${r * 0.3}`} stroke={KC.ink} strokeWidth={5} opacity={a * 0.6} strokeLinecap="round" />)}
  </g>;
}
// Paca de botellas compactadas (vista de frente).
function Paca({ x, y, w = 260, h = 190, seed = 1 }) {
  const R = krng(seed), cols = ['#bfeaff', '#9fd8ff', '#e8f6ff', '#ff9ec2', '#7fe0b8', '#ffe57a', '#2346ff'];
  const tapas = Array.from({ length: 26 }, () => [R() * (w - 30) + 15, R() * (h - 30) + 15, 9 + R() * 12, cols[Math.floor(R() * cols.length)]]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={14} fill="#d6eef7" stroke={KC.ink} strokeWidth={7} />
    {tapas.map(([px, py, r, c], i) => <ellipse key={i} cx={px} cy={py} rx={r * 1.4} ry={r} fill={c} stroke={KC.ink} strokeWidth={3} transform={`rotate(${(i * 47) % 180} ${px} ${py})`} />)}
    {[0.3, 0.7].map((f, i) => <rect key={i} x={w * f - 5} y={-4} width={10} height={h + 8} fill="#5a524a" />)}
  </g>;
}
// Charco de lodo con burbujitas.
function Lodo({ T, x, y, w = 760, h = 200 }) {
  return <g>
    <ellipse cx={x} cy={y} rx={w / 2} ry={h / 2} fill="#7a5230" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={x - 60} cy={y - 18} rx={w / 3} ry={h / 4} fill="#8f643c" />
    {[0, 1, 2, 3, 4].map((i) => { const p = ((T * 0.6 + i * 0.23) % 1); return <circle key={i} cx={x - 260 + i * 130} cy={y + 10 - p * 20} r={6 + p * 10} fill="none" stroke="#c9a27a" strokeWidth={3} opacity={1 - p} />; })}
  </g>;
}
function Pala({ x, y, rot = 0, lleno = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-10} y={-420} width={20} height={330} rx={8} fill="#c98a3a" stroke={KC.ink} strokeWidth={6} />
    <path d="M -70 -100 L 70 -100 L 60 20 Q 0 70 -60 20 Z" fill="#9aa3b5" stroke={KC.ink} strokeWidth={7} />
    {lleno > 0 && <ellipse cx={0} cy={-90} rx={62 * lleno} ry={26 * lleno} fill="#7a5230" stroke={KC.ink} strokeWidth={4} />}
  </g>;
}

/* ---------- MICRO (esquemático, no a escala) ---------- */
// Unidad del PET: anillo de tereftalato (hexágono) + puente de etilenglicol (palito en zigzag).
function Hexa({ x, y, r = 40, rot = 0, o = 1 }) {
  const pts = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + (i * Math.PI) / 3; return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <polygon points={pts} fill={HEX_C} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <circle r={r * 0.5} fill="none" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Palito({ x, y, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <path d="M -30 8 L -10 -10 L 10 8 L 30 -10" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -30 8 L -10 -10 L 10 8 L 30 -10" stroke={EG_C} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={-30} cy={8} r={8} fill="#ff3b2f" stroke={KC.ink} strokeWidth={3} /><circle cx={30} cy={-10} r={8} fill="#ff3b2f" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Enzima-tijeras: cuerpo redondo con dos hojas que se abren y cierran.
function EnzimaTijera({ x, y, s = 1, color = ENZ_P, abre = 0.5, rot = 0, chispas = 0, T = 0 }) {
  const a = 6 + kclamp(abre, 0, 1) * 30;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {chispas > 0 && Array.from({ length: 4 }, (_, i) => { const an = (i / 4) * Math.PI * 2 + T * 2, d = 92; return <g key={i} transform={`translate(${Math.cos(an) * d} ${Math.sin(an) * d}) scale(${chispas})`}>
      <path d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>; })}
    <g transform={`rotate(${-a})`}><path d="M 30 -6 L 120 -14 Q 128 0 120 4 L 30 8 Z" fill="#e8f0ff" stroke={KC.ink} strokeWidth={5} /></g>
    <g transform={`rotate(${a})`}><path d="M 30 -8 L 120 -4 Q 128 0 120 14 L 30 6 Z" fill="#e8f0ff" stroke={KC.ink} strokeWidth={5} /></g>
    <path d="M -62 -10 Q -60 -60 -10 -62 Q 50 -60 52 -6 Q 54 50 0 60 Q -56 58 -62 -10 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-6} cy={-26} r={11} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={-3} cy={-26} r={5} fill={KC.ink} />
    <circle cx={22} cy={-24} r={9} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={24} cy={-24} r={4} fill={KC.ink} />
  </g>;
}
// Película de PET vista al microscopio: placa con hoyitos que se agrandan (come 0..1).
function PeliculaMicro({ T, x, y, w, h = 120, come = 0, seed = 3 }) {
  const R = krng(seed);
  const hoyos = Array.from({ length: 9 }, () => [R() * w, 18 + R() * 30, 0.4 + R() * 0.6]);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} fill="rgba(190,236,255,.35)" stroke="#bfeaff" strokeWidth={5} />
    {Array.from({ length: Math.floor(w / 60) }, (_, i) => <line key={i} x1={i * 60 + 20} y1={20} x2={i * 60 + 50} y2={h - 20} stroke="rgba(255,255,255,.25)" strokeWidth={4} />)}
    {hoyos.map(([hx, hr, k], i) => <ellipse key={i} cx={hx} cy={0} rx={hr * (0.3 + come * k * 1.4)} ry={hr * (0.2 + come * k)} fill="#06121c" />)}
  </g>;
}

/* ---------- ESCENAS GRANDES ---------- */
function Composta({ T, x, y }) {
  const R = krng(12);
  const hojas = Array.from({ length: 18 }, () => [(R() - 0.5) * 520, -R() * 170, R() * 360, ['#3fbf4a', '#c98a3a', '#e8a62a', '#8f643c'][Math.floor(R() * 4)]]);
  return <g transform={`translate(${x} ${y})`}>
    <path d="M -320 60 Q -260 -200 0 -230 Q 260 -200 320 60 Z" fill="#6b4423" stroke={KC.ink} strokeWidth={8} />
    {hojas.map(([hx, hy, r, c], i) => <ellipse key={i} cx={hx * (1 + hy / 500)} cy={hy} rx={30} ry={14} fill={c} stroke={KC.ink} strokeWidth={4} transform={`rotate(${r} ${hx * (1 + hy / 500)} ${hy})`} />)}
    {[[-150, -120, 30], [80, -160, -25], [200, -60, 60]].map(([bx, by, r], i) => <rect key={i} x={bx - 70} y={by - 7} width={140} height={14} rx={6} fill="#8f643c" stroke={KC.ink} strokeWidth={4} transform={`rotate(${r} ${bx} ${by})`} />)}
    {[-80, 30, 130].map((sx, i) => { const p = (T * 0.5 + i * 0.33) % 1; return <path key={i} d={`M ${sx} ${-240 - p * 160} q 20 -30 0 -60 q -20 -30 0 -60`} stroke="rgba(255,255,255,.7)" strokeWidth={8} fill="none" strokeLinecap="round" opacity={1 - p} />; })}
  </g>;
}
function Reactor({ T, x, y, nivel = 1, hojuelas = 1 }) {
  const R = krng(4);
  const hj = Array.from({ length: 22 }, () => [R() * 260 - 130, R() * 300 + 60, R() * 360]);
  const th = T * 4;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-60} width={340} height={480} rx={40} fill="#c9d3e0" stroke={KC.ink} strokeWidth={9} />
    <rect x={-150} y={-40 + (1 - nivel) * 300} width={300} height={440 - (1 - nivel) * 300} rx={26} fill="#e8f6ff" opacity=".9" />
    {hj.map(([hx, hy, r], i) => i / hj.length < hojuelas ? <rect key={i} x={hx - 16} y={hy - 8} width={32} height={16} rx={4} fill="#bfeaff" stroke={KC.ink} strokeWidth={3} transform={`rotate(${r + T * 40} ${hx} ${hy})`} /> : null)}
    <line x1={0} y1={-120} x2={0} y2={330} stroke={KC.ink} strokeWidth={10} />
    <g transform={`translate(0 330) scale(${Math.cos(th)} 1)`}><rect x={-80} y={-14} width={160} height={28} rx={10} fill="#9aa3b5" stroke={KC.ink} strokeWidth={5} /></g>
    <rect x={-60} y={-150} width={120} height={50} rx={10} fill={KC.ink} />
    <rect x={-140} y={420} width={60} height={40} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} /><rect x={80} y={420} width={60} height={40} fill="#9aa3b5" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Podio({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-200} width={240} height={200} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} />
    <rect x={-360} y={-120} width={240} height={120} fill="#d9dde6" stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-70} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink}>1</text>
    <text x={-240} y={-28} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>2</text>
  </g>;
}
function Planta({ T, x, y, grua = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-360} y={-200} width={520} height={260} fill="#d9dde6" stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-330 + i * 120} y={-160} width={80} height={80} fill={i % 2 ? '#bfeaff' : 'rgba(0,0,0,.25)'} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={160} y={-330} width={90} height={390} fill="#9aa3b5" stroke={KC.ink} strokeWidth={8} />
    <path d="M -360 -200 L -360 -250 L -200 -250" stroke={KC.ink} strokeWidth={6} fill="none" strokeDasharray="20 14" />
    <g>{/* grúa detenida */}
      <rect x={-470} y={-560} width={36} height={620} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
      <g transform={`rotate(${Math.sin(T * 0.8) * 0.6} -452 -560)`}>
        <rect x={-560} y={-590} width={520} height={32} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
        <line x1={-120} y1={-558} x2={-120} y2={-400 + grua * 10} stroke={KC.ink} strokeWidth={4} />
        <rect x={-150} y={-400} width={60} height={40} fill={KC.orange} stroke={KC.ink} strokeWidth={5} />
      </g>
    </g>
    <rect x={-560} y={60} width={820} height={20} fill="#8f643c" />
  </g>;
}
function Contenedor({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -170 -200 L 170 -200 L 140 220 L -140 220 Z" fill="#2346ff" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <rect x={-190} y={-240} width={380} height={50} rx={12} fill="#1a35c4" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={-240} rx={110} ry={16} fill={KC.ink} />
    <g transform="translate(0 20) scale(1.3)">{[0, 120, 240].map((r) => <path key={r} d="M 0 -60 L 30 -10 L 12 -10 L 12 20 L -12 20 L -12 -10 L -30 -10 Z" fill="#fff" transform={`rotate(${r}) translate(0 -10)`} />)}</g>
  </g>;
}
function Mano({ x, y, rot = 0, cierra = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-60} y={-420} width={120} height={300} rx={50} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d={`M -80 -150 Q -100 ${-40 + cierra * 20} -50 ${20 - cierra * 30} L 50 ${20 - cierra * 30} Q 100 ${-40 + cierra * 20} 80 -150 Z`} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    {[-40, -10, 20, 50].map((fx, i) => <path key={i} d={`M ${fx - 10} -10 Q ${fx} ${30 - cierra * 40} ${fx + 6} ${50 - cierra * 50}`} stroke={KC.ink} strokeWidth={5} fill="none" />)}
  </g>;
}
function Calendario({ T, x, y, dias, total = 42 }) {
  const n = Math.floor(kclamp(dias, 0, total));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={420} height={400} rx={22} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={0} y={0} width={420} height={70} rx={22} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text x={210} y={50} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.white}>DÍA {n}</text>
    {Array.from({ length: total }, (_, i) => { const c = i % 7, r = Math.floor(i / 7); return <g key={i}>
      <rect x={18 + c * 56} y={88 + r * 51} width={46} height={42} rx={8} fill={i < n ? KC.mint : 'rgba(0,0,0,.08)'} stroke={KC.ink} strokeWidth={3} />
      {i < n && <path d={`M ${28 + c * 56} ${110 + r * 51} l 10 10 l 18 -18`} stroke={KC.ink} strokeWidth={4} fill="none" />}</g>; })}
  </g>;
}

function Petasa() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Lo: CUES.Lodo, No: CUES.Nombre, Pe: CUES.Petasa, Mh: CUES.Mhetasa, Pz: CUES.Piezas, Pr: CUES.Pregunta, Le: CUES.Lenta,
    Fr: CUES.Francia, Di: CUES.Diez, Cu: CUES.Curioso, Pl: CUES.Planta, Re: CUES.Recoger, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const D = (a, b) => b - a;

  /* --- la cadena de PET y sus piezas (escenas Petasa → Piezas) --- */
  const N = 6, W = 150, X0 = 160, YC = 840;
  const corte = (k) => K.Pe + 1.0 + k * Math.min(0.62, (D(K.Pe, K.Mh) - 1.6) / 5);       // k = 0..4
  const suelta = (i) => corte(Math.min(i, N - 2));
  const parte = (i) => K.Mh + 0.4 + i * Math.min(0.5, (D(K.Mh, K.Pz) - 0.9) / N);
  const comer = (i) => K.Pz + 1.1 + i * 0.22;
  const BAC = { x: 540, y: 1130 };
  const pieza = (i) => {
    const bx = X0 + i * W, by = YC + (i % 2 ? 1 : -1) * 60 * kprog(T, suelta(i), suelta(i) + 0.5, kEase.sale);
    const sp = kprog(T, parte(i), parte(i) + 0.9, kEase.suave);
    const hx = klerp(bx, 200 + (i % 3) * 70, sp), hy = klerp(by, 1000 - Math.floor(i / 3) * 62 - (i % 2) * 10, sp);
    const px = klerp(bx + 75, 760 + (i % 3) * 80, sp), py = klerp(by, 1000 - Math.floor(i / 3) * 50, sp);
    const ce = kprog(T, comer(i), comer(i) + 0.6, kEase.suave);
    return { hx: klerp(hx, BAC.x - 40, ce), hy: klerp(hy, BAC.y, ce), px: klerp(px, BAC.x + 40, ce), py: klerp(py, BAC.y, ce), o: 1 - kprog(T, comer(i) + 0.45, comer(i) + 0.6), sp };
  };
  const petX = (() => { let k = 0; for (let j = 0; j < N - 1; j++) if (T >= corte(j) - 0.35) k = j; const k0 = Math.max(0, k - 1);
    const p = kprog(T, corte(k) - 0.35, corte(k) - 0.05, kEase.suave); return klerp(X0 + k0 * W + 112, X0 + k * W + 112, k === 0 ? 1 : p); })();
  const petAbre = (() => { let m = 1; for (let j = 0; j < N - 1; j++) m = Math.min(m, Math.abs(T - corte(j)) * 5); return m; })();
  const mhI = (() => { let k = 0; for (let j = 0; j < N; j++) if (T >= parte(j) - 0.3) k = j; return k; })();
  const mhAbre = (() => { let m = 1; for (let j = 0; j < N; j++) m = Math.min(m, Math.abs(T - parte(j)) * 5); return m; })();

  /* --- la botella del gancho y del cierre --- */
  const cae = kprog(T, K.G, K.G + 0.4, (p) => p * p);
  const rebote = Math.abs(Math.sin(kprog(T, K.G + 0.4, K.G + 1.0) * Math.PI)) * (1 - kprog(T, K.G + 0.4, K.G + 1.0)) * 70;
  const recoge = kprog(T, K.Re + 0.9, K.Re + 1.4, kEase.sale), lleva = kprog(T, K.Re + 1.5, K.Re + 2.7, kEase.suave);
  const botR = { x: klerp(330, 760, lleva), y: klerp(1080, 760, lleva) - Math.sin(lleva * Math.PI) * 150 - recoge * 60 + kprog(T, K.Re + 2.7, K.Re + 3.2) * 150 };
  const dias = 42 * kprog(T, K.Le + 2.3, K.Le + 5.2);
  const horas = 10 * kprog(T, K.Di + 0.3, K.Di + 3.2, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la botella cae y rebota */}
      <Escena T={T} a={K.G} b={K.Lo} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <ellipse cx={380} cy={1180} rx={180 * (0.6 + 0.4 * cae)} ry={26} fill="rgba(0,0,0,.18)" />
          <BotellaPET x={380} y={klerp(-400, 960, cae) - rebote} rot={klerp(-30, 78, cae) - rebote * 0.1} aplasta={0.55} T={T} />
        </SvgCapa>
        <Escala T={T} z={1} pxPorMm={PX_MM} x={60} y={1640} color={KC.ink} />
      </Escena>
      {/* 1–2 · la planta de reciclaje, el lodo y la Lupa */}
      <Escena T={T} a={K.Lo} b={K.Pe} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {[[60, 560, 1], [330, 520, 2], [600, 560, 3], [195, 720, 4], [465, 720, 5], [735, 720, 6]].map(([px, py, sd], i) =>
            <g key={i} opacity={kprog(T, K.Lo + i * 0.12, K.Lo + i * 0.12 + 0.3)}><Paca x={px} y={py + Math.sin(T * 1.5 + i) * 3} seed={sd} /></g>)}
          <Lodo T={T} x={540} y={1080} />
          <BotellaPET x={700} y={1060} s={0.42} rot={95} aplasta={0.7} />
          <Pala x={klerp(980, 420, kprog(T, K.Lo + 1.3, K.Lo + 2.0, kEase.sale))} y={klerp(1060, 930, kprog(T, K.Lo + 2.1, K.Lo + 2.7, kEase.suave))} rot={-20}
            lleno={kprog(T, K.Lo + 2.0, K.Lo + 2.2)} />
        </SvgCapa>
        <Escala T={T} z={0.6} pxPorMm={PX_MM} x={60} y={1640} color={KC.ink} />
      </Escena>
      <Lupa T={T} at={K.No + 0.15} until={K.Pe - 0.2} x={400} y={800} r={250} fx={560} fy={1070} tinte={KC.mint} etiqueta="AL MICROSCOPIO · esquemático"
        interior={(T2, r) => <svg width={r * 2} height={r * 2}>
          <rect width={r * 2} height={r * 2} fill="#0b1a24" />
          <PeliculaMicro T={T2} x={-20} y={r * 1.25} w={r * 2 + 40} h={r} come={kprog(T2, K.No + 0.6, K.Pe)} />
          {[[150, 290, -8, 1], [300, 300, 12, 2], [420, 285, -4, 3], [230, 200, 25, 4], [370, 190, -30, 5]].map(([bx, by, br, sd], i) =>
            <Bacteria key={i} T={T2} x={bx + mece(T2, sd, 0.3) * 8} y={by + mece(T2, sd + 4, 0.3) * 6} largo={120} ancho={44} rot={br} color="#f7b2d0" seed={sd} />)}
        </svg>} />
      {/* 3–5 · por dentro: la cadena de PET, la PETasa, la MHETasa y las dos piezas */}
      <Escena T={T} a={K.Pe} b={K.Pr} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={30} color="rgba(127,200,255,.25)" />
        <SvgCapa>
          {Array.from({ length: N }, (_, i) => { const q = pieza(i);
            const enlace = i < N - 1 && T < corte(i);
            const nx = X0 + (i + 1) * W;
            return <g key={i}>
              {enlace && <line x1={q.px + 30} y1={q.py} x2={nx - 34} y2={YC} stroke={KC.ink} strokeWidth={14} />}
              {enlace && <line x1={q.px + 30} y1={q.py} x2={nx - 34} y2={YC} stroke="#e8f0ff" strokeWidth={6} />}
              {q.sp < 0.05 && <line x1={q.hx + 34} y1={q.hy} x2={q.px - 30} y2={q.py} stroke="#e8f0ff" strokeWidth={6} />}
              <Hexa x={q.hx} y={q.hy} rot={q.sp * 120 + Math.sin(T * 2 + i) * 4} o={q.o} />
              <Palito x={q.px} y={q.py} rot={q.sp * -40} o={q.o} />
            </g>; })}
          <g opacity={1 - kprog(T, K.Mh - 0.3, K.Mh + 0.3)}><Bacteria T={T} x={250} y={470} largo={300} ancho={110} rot={-8} color="#f7b2d0" seed={9} />
            {[0, 1, 2].map((j) => { const p = ((T - K.Pe) * 0.7 + j / 3) % 1; return <circle key={j} cx={300 + p * 120} cy={510 + p * 200} r={14 * (1 - p)} fill={ENZ_P} opacity={1 - p} />; })}</g>
          {T > K.Pe + 0.3 && T < K.Mh + 0.4 && <EnzimaTijera x={petX - 20} y={YC - 150 + Math.sin(T * 5) * 6} rot={70} color={ENZ_P} abre={petAbre} s={1.25}
 />}
          {T > K.Mh && T < K.Pz + 0.3 && (() => { const q = pieza(mhI); return <EnzimaTijera x={q.hx + 75 - 20} y={q.hy - 150 + Math.sin(T * 5) * 6} rot={70} color={ENZ_M} abre={mhAbre} s={1.2} />; })()}
          {T > K.Pz + 0.6 && <Bacteria T={T} x={BAC.x} y={klerp(1400, BAC.y, kprog(T, K.Pz + 0.6, K.Pz + 1.1, kEase.sale))} largo={320} ancho={120} color="#f7b2d0" seed={7} />}
        </SvgCapa>
        <Chip T={T} at={K.Pe + 0.2} until={K.Pe + 1.2} texto="esquemático · no a escala" y={1580} tam={28} mono borde="#7fc8ff" />
        <Etiqueta T={T} at={K.Pe + 0.4} until={K.Mh - 0.2} x={Math.min(petX + 40, 400)} y={YC - 250} texto="PETasa" color="#d7b8ff" tam={40} />
        <Chip T={T} at={K.Pe + 1.4} until={K.Mh - 0.2} texto="PET → pedacitos (MHET)" y={1500} tam={42} borde={ENZ_P} />
        <Etiqueta T={T} at={K.Mh + 0.3} until={K.Pz - 0.2} x={80} y={600} texto="MHETasa" color={ENZ_M} tam={40} />
        <Chip T={T} at={K.Mh + 0.6} until={K.Pz - 0.2} texto="pedacito → 2 piezas" y={1500} tam={42} borde={ENZ_M} />
        <Etiqueta T={T} at={K.Pz + 0.1} until={K.Pr - 0.2} x={110} y={880} texto="ácido tereftálico" color={HEX_C} tam={32} />
        <Etiqueta T={T} at={K.Pz + 0.1} until={K.Pr - 0.2} x={1010} y={880} lado="izq" texto="etilenglicol" color={EG_C} tam={32} />
        <Chip T={T} at={K.Pz + 1.2} until={K.Pr - 0.2} texto="y se las come" y={1500} tam={42} borde="#f7b2d0" />
      </Escena>
      {/* 6 · re-gancho: la montaña de botellas */}
      <Escena T={T} a={K.Pr} b={K.Le} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {[[20, 1030], [230, 1030], [125, 860], [335, 870], [230, 700], [10, 1420], [280, 1440], [550, 1420], [820, 1440]].map(([px, py], i) => <g key={i} opacity={kprog(T, K.Pr + i * 0.08, K.Pr + i * 0.08 + 0.3)}>
            <Paca x={px} y={py + Math.sin(T * 2 + i) * 3} w={220} h={165} seed={i + 11} /></g>)}
        </SvgCapa>
        <MitoTachado T={T} at={K.Pr + 0.2} tacharEn={K.Pr + 1.8} until={K.Le - 0.2} texto="¿adiós a la basura?" x={300} y={470} tam={44} />
      </Escena>
      {/* 7 · 2016: lentísima */}
      <Escena T={T} a={K.Le} b={K.Fr} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <g transform="translate(110 790)">
            <rect x={0} y={0} width={400} height={300} rx={8} fill={PET_AZUL} stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 14 }, (_, i) => { const R = krng(i + 40), hx = 30 + R() * 340, hy = 30 + R() * 240, k = kprog(dias, i * 2, 42) ;
              return <ellipse key={i} cx={hx} cy={hy} rx={10 + k * 70} ry={8 + k * 50} fill={KC.cyan} stroke="rgba(22,18,15,.5)" strokeWidth={3} opacity={k > 0 ? 1 : 0} />; })}
            <text x={200} y={340} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>película de PET</text>
          </g>
          <Calendario T={T} x={580} y={760} dias={dias} />
          <g transform="translate(120 1430)" opacity={kprog(T, K.Le + 2.4, K.Le + 2.8)}>
            <text x={0} y={0} style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>de canto, aumentado:</text>
            <rect x={0} y={20} width={560} height={76} rx={8} fill="#ffe11a" stroke={KC.ink} strokeWidth={5} />
            <text x={580} y={72} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>tarjeta 0.76 mm</text>
            <rect x={0} y={120} width={560} height={20} rx={4} fill="#bfeaff" stroke={KC.ink} strokeWidth={4} />
            <text x={580} y={142} style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>película 0.2 mm</text>
          </g>
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Le + 0.1} until={K.Le + 2.2} anio="2016" quien="Yoshida et al. · Japón" revista="Science · a 30 °C" y={600} />
        <Chip T={T} at={K.Le + 2.6} until={K.Fr - 0.2} texto="30 °C · 6 semanas" x={310} y={700} tam={38} borde={KC.red} />
      </Escena>
      {/* 8 · 2020, Francia: la enzima de composta mejorada */}
      <Escena T={T} a={K.Fr} b={K.Di} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <Composta T={T} x={540} y={1120} />
          {(() => { const sal = kprog(T, K.Fr + 0.4, K.Fr + 1.1, kEase.rebote); return <EnzimaTijera x={540} y={klerp(1060, 860, sal)} s={klerp(0.3, 1.25, sal)} color={ENZ_L}
            abre={0.5 + 0.5 * Math.sin(T * 6)} chispas={kprog(T, K.Fr + 2.0, K.Fr + 2.6, kEase.rebote)} T={T} />; })()}
        </SvgCapa>
        <Etiqueta T={T} at={K.Fr + 1.0} until={K.Di - 0.2} x={700} y={830} texto="de composta" color={KC.ink} tam={34} />
        <TarjetaEstudio T={T} at={K.Fr + 1.4} until={K.Di - 0.2} anio="2020" quien="Tournier et al. · Francia" revista="Nature · enzima mejorada" y={560} />
        <Chip T={T} at={K.Fr + 2.0} until={K.Di - 0.2} texto="enzima de composta, mejorada" y={1500} tam={38} borde={ENZ_L} />
      </Escena>
      {/* 9 · 90 % en 10 horas → botellas nuevas */}
      <Escena T={T} a={K.Di} b={K.Cu} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Reactor T={T} x={290} y={720} hojuelas={1 - 0.9 * kprog(T, K.Di + 0.3, K.Di + 3.2)} />
          <text x={290} y={1490} textAnchor="middle" style={{ font:`400 110px ${KF.titulo}` }} fill={KC.ink}>{kformato(horas, 0)} horas</text>
          {Array.from({ length: 5 }, (_, i) => { const t0 = K.Di + 3.3 + i * 0.25, e = kprog(T, t0, t0 + 0.4, kEase.rebote);
            return e > 0 ? <BotellaPET key={i} x={160 + i * 190} y={1630} s={0.42 * e} nueva={1} T={T + i} etiqueta={[KC.pink, KC.orange, KC.blue, KC.red, KC.teal][i]} /> : null; })}
        </SvgCapa>
        <Medidor T={T} at={K.Di + 0.2} until={K.Cu - 0.2} valor={(t) => 0.9 * kprog(t, K.Di + 0.3, K.Di + 3.2, kEase.suave)} etiqueta="PET partido" color={ENZ_L} />
      </Escena>
      {/* 10 · le ganó */}
      <Escena T={T} a={K.Cu} b={K.Pl} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Podio x={480} y={1170} />
          <EnzimaTijera x={480} y={klerp(700, 860, kprog(T, K.Cu + 0.2, K.Cu + 0.7, kEase.rebote))} s={1.1} color={ENZ_L} abre={0.5 + 0.5 * Math.sin(T * 7)} chispas={1} T={T} />
          <EnzimaTijera x={240} y={klerp(800, 950, kprog(T, K.Cu + 0.5, K.Cu + 1.0, kEase.rebote))} s={0.9} color={ENZ_P} abre={0.2} />
        </SvgCapa>
        <Chip T={T} at={K.Cu + 0.8} until={K.Pl - 0.2} texto="1 · composta (mejorada, 2020)" y={1470} tam={34} borde={ENZ_L} />
        <Chip T={T} at={K.Cu + 1.2} until={K.Pl - 0.2} texto="2 · PETasa de Ideonella" y={1560} tam={34} borde={ENZ_P} />
      </Escena>
      {/* 11 · la planta, en pausa */}
      <Escena T={T} a={K.Pl} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Planta T={T} x={600} y={1080} />
          <g transform={`translate(260 1180) rotate(${-3 + Math.sin(T) * 1})`} opacity={kprog(T, K.Pl + 0.6, K.Pl + 1.0)}>
            <rect x={0} y={0} width={10} height={140} fill={KC.ink} /><rect x={-150} y={-10} width={460} height={64} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
            <text x={80} y={34} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>Longlaville, Francia</text>
          </g>
        </SvgCapa>
        <Chip T={T} at={K.Pl + 1.0} until={K.Re - 0.2} texto="en pausa · meta: 2028" y={1500} tam={44} borde={KC.red} />
      </Escena>
      {/* 12–13 · tú la recoges → el contenedor → botella nueva */}
      <Escena T={T} a={K.Re} b={FIN} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Contenedor x={760} y={980} />
          <BotellaPET x={botR.x} y={botR.y} rot={klerp(78, 160, lleva)} aplasta={0.55} s={klerp(1, 0.55, lleva)} />
          {T < K.Re + 2.9 && <Mano x={botR.x + 20} y={klerp(500, botR.y - 160, kprog(T, K.Re + 0.2, K.Re + 0.9, kEase.sale))} rot={-8} cierra={recoge} />}
          {T > K.Ci && (() => { const e = kprog(T, K.Ci + 0.5, K.Ci + 1.3, kEase.rebote); return <BotellaPET x={330} y={klerp(1200, 940, e)} s={klerp(0.2, 1, e)} nueva={1} T={T} etiqueta={KC.teal} />; })()}
        </SvgCapa>
        <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="PET → piezas → PET" x={330} y={470} tam={40} borde={KC.gold} />
        <Escala T={T} z={1} pxPorMm={PX_MM} x={60} y={1640} color={KC.ink} />
      </Escena>

      {/* capítulos y textos del gancho */}
      <Capitulo T={T} hasta={K.Ou} caps={[{ at: K.Lo + 0.2, titulo: 'La bacteria' }, { at: K.Pe + 0.2, titulo: 'Las tijeras' }, { at: K.Fr + 0.2, titulo: 'La enzima mejorada' }]} />
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.3} until={K.G + 2.0} texto="basura" x={300} y={500} tam={54} />
      <Chip T={T} at={K.G + 2.0} until={K.Lo - 0.2} texto="comida para una bacteria" x={330} y={500} tam={38} borde={KC.mint} />
      <Chip T={T} at={K.Lo + 1.0} until={K.No - 0.1} texto="planta de reciclaje · Sakai, Japón" y={1500} tam={36} borde={KC.red} />
      <Etiqueta T={T} at={K.No + 0.9} until={K.Pe - 0.2} x={170} y={1500} texto="Ideonella sakaiensis" it tam={44} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Lo - 0.1} texto="No es basura: *es comida.*" />
      <Subtitulo T={T} idx={1} at={K.Lo + 0.1} until={K.No - 0.1} texto="En el lodo *de una recicladora.*" />
      <Subtitulo T={T} idx={2} at={K.No + 0.1} until={K.Pe - 0.1} texto="Vive *del PET.*" />
      <Subtitulo T={T} idx={3} at={K.Pe + 0.1} until={K.Mh - 0.1} texto="La PETasa *corta.*" />
      <Subtitulo T={T} idx={4} at={K.Mh + 0.1} until={K.Pz - 0.1} texto="La MHETasa *parte en dos.*" />
      <Subtitulo T={T} idx={5} at={K.Pz + 0.1} until={K.Pr - 0.1} texto="Las piezas *de la botella.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Le - 0.1} texto="¿Se acabó *la basura?*" />
      <Subtitulo T={T} idx={7} at={K.Le + 0.1} until={K.Fr - 0.1} texto="Una película: *seis semanas.*" />
      <Subtitulo T={T} idx={8} at={K.Fr + 0.1} until={K.Di - 0.1} texto="2020: *la mejoraron.*" />
      <Subtitulo T={T} idx={9} at={K.Di + 0.1} until={K.Cu - 0.1} texto="90 % *en diez horas.*" />
      <Subtitulo T={T} idx={10} at={K.Cu + 0.1} until={K.Pl - 0.1} texto="Le ganó *a la de Japón.*" />
      <Subtitulo T={T} idx={11} at={K.Pl + 0.1} until={K.Re - 0.1} texto="La planta, *en pausa.*" />
      <Subtitulo T={T} idx={12} at={K.Re + 0.1} until={K.Ci - 0.1} texto="Recogerla *te toca a ti.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Comida, *si llega al reciclaje.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Lodo - 0.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Nombre + 1.5, CUES.Petasa - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Petasa + 3.2, CUES.Mhetasa + 1.5, 'avatar_07_pensativo_puno', 'arriba-der'],
        [CUES.Piezas + 0.3, CUES.Pregunta - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Lenta - 0.2, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Lenta + 2.5, CUES.Francia - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Diez + 1.0, CUES.Curioso - 0.3, 'avatar_02_apuntando_camara', 'grande'],
        [CUES.Curioso + 0.3, CUES.Planta - 0.4, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Planta + 0.3, CUES.Recoger - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Recoger + 0.3, CUES.Cierre - 0.3, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="36" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PetasaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Petasa /></CompositionStage></div>;
}
window.PetasaApp = PetasaApp;
