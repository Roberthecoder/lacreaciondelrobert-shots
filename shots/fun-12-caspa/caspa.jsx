// Shot Fungi Mati #12 · Esa caspa no es solo piel: Malassezia, la levadura que come la grasa de tu cabeza — NARRADO (N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const CP = { piel:'#eeb08a', piel2:'#d98f6b', pelo:'#2b1d14', pelo2:'#4a3424', playera:'#24304a', escama:'#fbfaf4', sebo:'#f2c14e', sebo2:'#ffe08a',
  levadura:'#f3ead2', nucleo:'#b07fd0', lipasa:'#4fd2ff', oleico:'#ffd23f', acido:'#ff9f6b', capa:'#f6c9a8', basal:'#e58f8f' };

// Escamas fijas (posiciones pseudoaleatorias) sobre hombros y pelo.
const kEscamas = (seed, n, x0, x1, y0, y1) => { const g = krng(seed); return Array.from({ length: n }, () => [klerp(x0, x1, g()), klerp(y0, y1, g()), 5 + g() * 9, g() * 180]); };
const ESC_HOMBRO = kEscamas(12, 34, 120, 690, 1000, 1110);
const ESC_PELO = kEscamas(31, 22, 250, 560, 470, 760);
function Escama({ x, y, r, rot = 0, o = 1, color = CP.escama }) {
  return <path d={`M ${-r} ${-r * 0.3} L ${-r * 0.2} ${-r * 0.8} L ${r} ${-r * 0.4} L ${r * 0.7} ${r * 0.6} L ${-r * 0.5} ${r * 0.7} Z`} transform={`translate(${x} ${y}) rotate(${rot})`} fill={color} stroke="rgba(0,0,0,.35)" strokeWidth={1.5} opacity={o} />;
}

// Busto de espaldas: nuca con pelo, orejas y hombros con playera oscura. Base de los hombros en y + 1250 (coordenadas a s = 1, origen en x - 400, y).
// caspa 0..1 = cuántas escamas se ven; cae = escamas cayendo del pelo; lupa = aro que marca la raya del pelo.
function Busto({ T, x = 400, y = 0, s = 1, caspa = 1, cae = 0, seed = 1 }) {
  const nE = Math.round(ESC_HOMBRO.length * caspa), nP = Math.round(ESC_PELO.length * caspa);
  return <g transform={`translate(${x} ${y}) scale(${s}) translate(-400 0)`}>
    <path d="M -20 1960 L 30 1260 Q 40 1080 140 1035 Q 250 990 330 975 L 470 975 Q 550 990 660 1035 Q 760 1080 770 1260 L 820 1960 Z" fill={CP.playera} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 330 975 Q 400 1010 470 975" stroke="#3a4a6c" strokeWidth={10} fill="none" />
    <rect x={335} y={850} width={130} height={140} rx={30} fill={CP.piel2} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={203} cy={720} rx={36} ry={58} fill={CP.piel} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={597} cy={720} rx={36} ry={58} fill={CP.piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M 205 680 Q 190 430 400 415 Q 610 430 595 680 Q 590 800 520 870 Q 400 905 280 870 Q 210 800 205 680 Z" fill={CP.pelo} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {[[260, 520, 300, 780], [320, 470, 340, 850], [400, 440, 400, 880], [470, 465, 455, 850], [540, 520, 505, 790], [295, 600, 330, 700], [500, 610, 470, 720]].map(([x1, y1, x2, y2], i) =>
      <path key={i} d={`M ${x1} ${y1} Q ${(x1 + x2) / 2 + 14} ${(y1 + y2) / 2} ${x2} ${y2}`} stroke={CP.pelo2} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <path d="M 398 420 Q 404 470 402 540" stroke={CP.piel2} strokeWidth={6} fill="none" strokeLinecap="round" />
    {ESC_PELO.slice(0, nP).map(([ex, ey, r, rot], i) => <Escama key={'p' + i} x={ex} y={ey} r={r * 0.75} rot={rot} />)}
    {ESC_HOMBRO.slice(0, nE).map(([ex, ey, r, rot], i) => <Escama key={'h' + i} x={ex} y={ey + (ex < 330 || ex > 470 ? 0 : 40)} r={r} rot={rot} />)}
    {cae > 0 && Array.from({ length: 7 }, (_, i) => { const u = ((T * 0.55 + i / 7) % 1); const ex = 260 + i * 45 + Math.sin(T * 2 + i) * 18; return <Escama key={'c' + i} x={ex} y={klerp(780, 1060, u)} r={7 + (i % 3) * 3} rot={T * 90 + i * 40} o={cae * (u < 0.85 ? 1 : (1 - u) / 0.15)} />; })}
  </g>;
}

// Malassezia globosa: célula redonda con la célula hija brotando de una base ANGOSTA (cuello estrecho). brote 0..1 = tamaño de la hija.
function Malassezia({ x, y, r = 30, ang = -40, brote = 0.6, color = CP.levadura, apagada = 0, sw }) {
  const a = ang * Math.PI / 180, rd = r * 0.62 * brote, dn = r + rd + r * 0.03;
  const c = mixHex(color, '#6c6f78', apagada), w = sw || Math.max(2, r * 0.13);
  return <g transform={`translate(${x} ${y})`} opacity={1 - apagada * 0.35} style={{ filter:`drop-shadow(0 0 ${Math.max(3, r * 0.08)}px rgba(255,240,200,.35))` }}>
    {brote > 0.05 && <>
      <line x1={Math.cos(a) * r * 0.9} y1={Math.sin(a) * r * 0.9} x2={Math.cos(a) * (dn + rd * 0.2)} y2={Math.sin(a) * (dn + rd * 0.2)} stroke={KC.ink} strokeWidth={r * 0.2 + w * 2} strokeLinecap="butt" />
      <circle cx={Math.cos(a) * dn} cy={Math.sin(a) * dn} r={rd} fill={c} stroke={KC.ink} strokeWidth={w} />
    </>}
    <circle r={r} fill={c} stroke={KC.ink} strokeWidth={w} />
    {brote > 0.05 && <line x1={Math.cos(a) * r * 0.9} y1={Math.sin(a) * r * 0.9} x2={Math.cos(a) * (dn - rd * 0.9)} y2={Math.sin(a) * (dn - rd * 0.9)} stroke={c} strokeWidth={r * 0.18} strokeLinecap="butt" />}
    <circle r={r * 0.82} fill="none" stroke={mixHex('#d8c9a4', '#777777', apagada)} strokeWidth={Math.max(1.5, r * 0.05)} />
    <circle cx={-r * 0.15} cy={r * 0.12} r={r * 0.26} fill={mixHex('#d9c2ec', '#888888', apagada)} stroke={mixHex(CP.nucleo, '#777777', apagada)} strokeWidth={Math.max(1.5, r * 0.04)} />
    {r > 40 && [[0.35, 0.3], [0.1, -0.45], [-0.45, 0.35], [0.42, -0.1]].map(([u, v], i) => <circle key={i} cx={u * r} cy={v * r} r={r * 0.07} fill={CP.sebo} opacity=".8" />)}
    <ellipse cx={-r * 0.35} cy={-r * 0.4} rx={r * 0.25} ry={r * 0.13} fill="#fff" opacity=".7" transform={`rotate(-30 ${-r * 0.35} ${-r * 0.4})`} />
  </g>;
}

// Cola de ácido graso en zigzag. kink = dobla a la mitad (el ácido oleico tiene un doble enlace cis que lo dobla).
function Cola({ x, y, n = 9, paso = 16, alto = 9, ang = 0, kink = false, color = CP.acido, ancho = 6 }) {
  const pts = []; let px = 0, py = 0, dir = 0;
  for (let i = 0; i <= n; i++) { if (kink && i === Math.floor(n / 2)) dir = 0.55; px += Math.cos(dir) * paso; py += Math.sin(dir) * paso; pts.push([px, py + (i % 2 ? -alto : alto)]); }
  const d = 'M 0 0 L ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ');
  return <g transform={`translate(${x} ${y}) rotate(${ang})`}>
    <path d={d} stroke={KC.ink} strokeWidth={ancho + 5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d={d} stroke={color} strokeWidth={ancho} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <circle r={ancho * 1.3} fill={color} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Triglicérido (grasa del sebo): columna de glicerol + 3 colas. corte 0..1 = las colas se separan (las cortó la lipasa).
function Triglicerido({ x, y, s = 1, corte = 0, rot = 0, kinkIdx = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-34, 0, 34].map((dy, i) => corte < 0.2 ? <line key={'e' + i} x1={0} y1={dy} x2={24} y2={dy} stroke={KC.ink} strokeWidth={6} opacity={1 - corte * 5} /> : null)}
    <rect x={-16} y={-54} width={32} height={108} rx={14} fill={CP.sebo} stroke={KC.ink} strokeWidth={5} />
    {[-34, 0, 34].map((dy, i) => <circle key={'g' + i} cx={0} cy={dy} r={7} fill={CP.sebo2} />)}
    {[-34, 0, 34].map((dy, i) => <Cola key={i} x={22 + corte * (40 + i * 25)} y={dy + corte * (i - 1) * 40} n={8} paso={15} alto={7} ang={corte * (i - 1) * 18} kink={i === kinkIdx} color={i === kinkIdx && corte > 0.5 ? CP.oleico : CP.acido} ancho={5} />)}
  </g>;
}
// Tijeras químicas (lipasa): dos hojas que se abren y cierran.
function Lipasa({ x, y, s = 1, abre = 0.5, rot = 0 }) {
  const a = 8 + abre * 26;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[-1, 1].map((k) => <g key={k} transform={`rotate(${k * a})`}>
      <path d="M 0 0 L 58 -7 Q 66 0 58 7 Z" fill={CP.lipasa} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <circle cx={-26} cy={k * 12} r={14} fill="none" stroke={KC.ink} strokeWidth={10} /><circle cx={-26} cy={k * 12} r={14} fill="none" stroke={CP.lipasa} strokeWidth={5} />
    </g>)}
    <circle r={6} fill={KC.ink} />
  </g>;
}
// Gota de sebo.
function Gota({ x, y, r = 30, brillo = 1 }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M 0 ${-r * 1.5} Q ${r} ${-r * 0.2} ${r} ${r * 0.25} A ${r} ${r} 0 0 1 ${-r} ${r * 0.25} Q ${-r} ${-r * 0.2} 0 ${-r * 1.5} Z`} fill={CP.sebo} stroke={KC.ink} strokeWidth={Math.max(3, r * 0.15)} />
    <ellipse cx={-r * 0.35} cy={0} rx={r * 0.18} ry={r * 0.35} fill={CP.sebo2} opacity={brillo} />
  </g>;
}

// Mundo micro del cuero cabelludo (para la Lupa): superficie con escamas, pelos, sebo, levaduras y colitas de ácido graso.
function MicroCuero({ T, w, h, colas = 0, levaduras = 1 }) {
  const g = krng(5);
  const lev = Array.from({ length: 9 }, () => [g() * w, h * 0.42 + g() * h * 0.22, 14 + g() * 9, g() * 360, 0.3 + g() * 0.6]);
  return <svg width={w} height={h} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={w} height={h} fill="#160d0b" />
    <path d={`M 0 ${h * 0.6} Q ${w * 0.25} ${h * 0.56} ${w * 0.5} ${h * 0.6} T ${w} ${h * 0.6} L ${w} ${h} L 0 ${h} Z`} fill={CP.capa} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${i * w / 6 - 40} ${h * 0.6 + 6} l 70 -8 l 6 14 l -70 8 Z`} fill="#fde7d6" stroke="rgba(0,0,0,.3)" strokeWidth={2} />)}
    {[0.2, 0.62].map((u, i) => <g key={i}><rect x={u * w - 22} y={-20} width={44} height={h * 0.62 + 20} fill={CP.pelo2} stroke={KC.ink} strokeWidth={5} transform={`rotate(${i ? 8 : -6} ${u * w} ${h * 0.6})`} />
      <ellipse cx={u * w} cy={h * 0.6} rx={44} ry={12} fill="#a45d3e" stroke={KC.ink} strokeWidth={4} /></g>)}
    {[[0.32, 0.56, 22], [0.8, 0.57, 18], [0.47, 0.585, 14]].map(([u, v, r], i) => <Gota key={i} x={u * w} y={v * h} r={r} />)}
    {levaduras > 0 && lev.map(([lx, ly, r, a, b], i) => <g key={i} opacity={levaduras}><Malassezia x={lx} y={ly + Math.sin(T * 1.5 + i) * 3} r={r} ang={a} brote={b} sw={3} /></g>)}
    {colas > 0 && [[0.1, 0.5, 20], [0.55, 0.47, -30], [0.72, 0.52, 160], [0.38, 0.45, 60]].map(([u, v, a], i) => <g key={'c' + i} opacity={colas}><Cola x={u * w} y={v * h} n={6} paso={10} alto={5} ang={a + Math.sin(T + i) * 8} kink={i === 1} color={i === 1 ? CP.oleico : CP.acido} ancho={4} /></g>)}
  </svg>;
}

// Botella de champú genérica (sin marca).
function Champu({ x, y, s = 1, inclina = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${inclina}) scale(${s})`}>
    <rect x={-90} y={-170} width={180} height={340} rx={50} fill="#5ec8ff" stroke={KC.ink} strokeWidth={9} />
    <rect x={-45} y={-230} width={90} height={70} rx={16} fill="#ffffff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-60} width={120} height={120} rx={22} fill="#ffffff" stroke={KC.ink} strokeWidth={5} />
    <text y={-6} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>ANTI</text>
    <text y={30} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>CASPA</text>
    <rect x={-60} y={-140} width={22} height={240} rx={11} fill="#fff" opacity=".35" />
  </g>;
}
function Burbujas({ T, x, y, n = 10, area = 200, seed = 4, desde = 0 }) {
  const g = krng(seed); const B = Array.from({ length: n }, () => [g() * area - area / 2, g(), 12 + g() * 22]);
  return <g>{B.map(([dx, f, r], i) => { const u = ((T - desde) * 0.35 + f) % 1; return <circle key={i} cx={x + dx + Math.sin(T * 2 + i) * 10} cy={y - u * 300} r={r * (0.6 + u * 0.5)} fill="rgba(255,255,255,.55)" stroke="#ffffff" strokeWidth={3} opacity={1 - u} />; })}</g>;
}

function CaspaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Malassezia, Se: CUES.Sebo, Li: CUES.Lipasas, Ol: CUES.Oleico, P: CUES.Pregunta, Tr: CUES.Tres, Es: CUES.Escamas, Est: CUES.Estudio, Re: CUES.Resultado, Ge: CUES.Genoma, Ch: CUES.Champu, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // lipasas: tres cortes uno tras otro
  const corte = (i) => kprog(T, K.Li + 1.3 + i * 0.7, K.Li + 1.8 + i * 0.7, kEase.sale);
  const TRI = [[640, 780], [830, 930], [600, 1010]];
  // sebo que sube por el folículo
  const sebo = kprog(T, K.Se + 0.4, K.Se + 2.6);
  // escamas: velocidad de la piel (se acelera)
  const vel = klerp(40, 120, kprog(T, K.Es + 0.5, K.Es + 2.0));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho: tu cabeza con caspa → al microscopio hay levaduras */}
      <Escena T={T} a={K.G} b={K.Se} zoom={0.04} origen="40% 40%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<Busto T={T} x={400} y={60} s={1} caspa={0.55 + 0.45 * kprog(T, 0, 0.6)} cae={kprog(T, 0.15, 0.4)} />)}
      </Escena>
      {/* 3 · sebo: corte de piel, glándula sebácea y folículo */}
      <Escena T={T} a={K.Se} b={K.Li} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <rect x={0} y={640} width={KW} height={700} fill="#f0b996" stroke={KC.ink} strokeWidth={8} />
          <rect x={0} y={640} width={KW} height={60} fill="#fbe3cf" stroke={KC.ink} strokeWidth={5} />
          <rect x={0} y={700} width={KW} height={130} fill="#f6caa9" />
          <path d="M 470 640 L 470 1250 Q 540 1300 610 1250 L 610 640 Z" fill="#d98f6b" stroke={KC.ink} strokeWidth={7} />
          <rect x={506} y={330} width={68} height={940} rx={30} fill={CP.pelo2} stroke={KC.ink} strokeWidth={7} transform={`rotate(4 540 640)`} />
          <ellipse cx={540} cy={1250} rx={95} ry={70} fill="#a45d3e" stroke={KC.ink} strokeWidth={7} />
          {[[700, 940, 70], [760, 1030, 60], [690, 1060, 55], [770, 900, 45]].map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={CP.sebo} stroke={KC.ink} strokeWidth={6} />)}
          <path d="M 640 950 Q 615 940 612 900" stroke={CP.sebo} strokeWidth={22} fill="none" />
          {Array.from({ length: 6 }, (_, i) => { const u = kclamp(sebo * 1.6 - i * 0.12, 0, 1); if (u <= 0) return null; const yy = klerp(900, 640, u); const xx = u < 0.95 ? 590 : klerp(590, 640 + i * 60, (u - 0.95) / 0.05);
            return <circle key={i} cx={xx} cy={yy} r={14} fill={CP.sebo2} stroke={KC.ink} strokeWidth={4} />; })}
          <path d={`M 610 640 Q ${klerp(620, 900, sebo)} ${640 - 26 * sebo} ${klerp(620, 1060, sebo)} 640`} fill={CP.sebo} stroke={KC.ink} strokeWidth={5} opacity={sebo} />
          <path d={`M 470 640 Q ${klerp(460, 220, sebo)} ${640 - 22 * sebo} ${klerp(460, 60, sebo)} 640`} fill={CP.sebo} stroke={KC.ink} strokeWidth={5} opacity={sebo} />
          {[[200, 600, -30], [330, 610, 50], [820, 600, 200], [960, 612, 120]].map(([x, y, a], i) => <Malassezia key={i} x={x} y={y + Math.sin(T * 1.6 + i) * 4} r={22} ang={a} brote={0.55} />)}
        </>)}
      </Escena>
      {/* 4–5 · lipasas cortan la grasa; queda el ácido oleico */}
      <Escena T={T} a={K.Li} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={22} />
        {fsvg(<>
          <Malassezia x={250} y={880 + Math.sin(T * 1.4) * 8} r={140} ang={-50} brote={0.55 + 0.1 * Math.sin(T)} />
          {TRI.map(([x, y], i) => { const c = corte(i); const sale = kprog(T, K.Ol + 0.2, K.Ol + 1.2); return <g key={i} opacity={1 - sale * (i === 0 ? 0 : 0.75)}><Triglicerido x={x + Math.sin(T + i) * 6} y={y + Math.cos(T * 0.8 + i) * 6} s={i === 0 ? 1.35 : 1.1} corte={c} rot={i * 25 - 10} kinkIdx={i === 0 ? 1 : -1} /></g>; })}
          {TRI.map(([x, y], i) => { const t0 = K.Li + 0.5 + i * 0.7, t1 = K.Li + 1.4 + i * 0.7; const u = kprog(T, t0, t1, kEase.suave); if (T < t0 || T > K.Ol + 0.4) return null;
            const va = kprog(T, t1 + 0.6, t1 + 1.4, kEase.suave); return <g key={i} opacity={1 - va}><Lipasa x={klerp(390, x + 30 * Math.cos((i * 25 - 10) * Math.PI / 180), u)} y={klerp(860, y + 30 * Math.sin((i * 25 - 10) * Math.PI / 180), u) - va * 120} s={0.85} abre={u < 1 ? 0.6 : 0.5 + 0.5 * Math.sin(T * 14)} rot={-90 + i * 25} /></g>; })}
          {(() => { const p = kprog(T, K.Ol + 0.6, K.Ol + 1.6, kEase.sale); return p > 0 ? <g opacity={p}>
            <g transform={`translate(${klerp(800, 620, p)} ${klerp(760, 1010, p)})`}><Cola x={0} y={0} n={11} paso={22} alto={11} kink color={CP.oleico} ancho={9} /></g>
          </g> : null; })()}
          {(() => { const p = kprog(T, K.Ol + 1.4, K.Ol + 2.2, kEase.rebote); return p > 0 ? <g transform={`translate(880 960) scale(${p})`}>
            <path d="M -60 -150 L -40 -210 L 40 -210 L 60 -150 L 70 140 Q 0 165 -70 140 Z" fill="#c9d65a" stroke={KC.ink} strokeWidth={7} opacity=".95" />
            <rect x={-26} y={-260} width={52} height={54} rx={10} fill="#3b6b2c" stroke={KC.ink} strokeWidth={6} />
            <ellipse cx={0} cy={20} rx={46} ry={22} fill="#7aa63a" stroke={KC.ink} strokeWidth={4} />
            <path d="M -14 10 Q 0 -30 20 0" stroke="#3b6b2c" strokeWidth={6} fill="none" />
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 6 · pregunta: ¿por qué a unos sí y a otros no? */}
      <Escena T={T} a={K.P} b={K.Tr} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Busto T={T} x={170} y={390} s={0.38} caspa={1} cae={1} />
          <Busto T={T} x={410} y={390} s={0.38} caspa={0} />
          <Interrogacion T={T} x={300} y={1170} tam={440} />
        </>)}
      </Escena>
      {/* 7 · tres cosas: grasa + levadura + piel sensible */}
      <Escena T={T} a={K.Tr} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {[0, 1, 2].map((i) => { const p = kprog(T, K.Tr + 0.6 + i * 0.75, K.Tr + 1.1 + i * 0.75, kEase.rebote); if (p <= 0) return null; const x = 200 + i * 340, y = 780;
            return <g key={i} transform={`translate(${x} ${y}) scale(${p})`}>
              <circle r={130} fill={['#fff3c4', '#1b2033', '#ffd9c2'][i]} stroke={KC.ink} strokeWidth={10} />
              {i === 0 && <Gota x={0} y={20} r={58} />}
              {i === 1 && <Malassezia x={-10} y={14} r={56} ang={-45} brote={0.6} />}
              {i === 2 && <g><rect x={-90} y={-20} width={180} height={70} rx={16} fill={CP.capa} stroke={KC.ink} strokeWidth={6} />
                {[-60, -10, 40].map((dx, k) => <path key={k} d={`M ${dx} -30 l 14 -26 l 14 26`} stroke={KC.red} strokeWidth={7} fill="none" strokeLinecap="round" transform={`translate(0 ${Math.sin(T * 8 + k) * 4})`} />)}</g>}
            </g>; })}
          {[0, 1].map((i) => <text key={i} x={370 + i * 340} y={805} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={kprog(T, K.Tr + 1.1 + i * 0.75, K.Tr + 1.3 + i * 0.75)}>+</text>)}
          {(() => { const p = kprog(T, K.Tr + 3.0, K.Tr + 3.5, kEase.rebote); return p > 0 ? <g transform={`translate(520 1080) scale(${p * 1.5})`}>
            <text x={-130} y={30} textAnchor="middle" style={{ font:`400 100px ${KF.titulo}` }} fill={KC.ink}>=</text>
            {[[0, 0, 26, 10], [40, -20, 18, 70], [-10, 30, 16, 130], [60, 20, 22, 200], [100, -5, 14, 40]].map(([dx, dy, r, rot], k) => <Escama key={k} x={dx} y={dy} r={r} rot={rot} />)}
          </g> : null; })()}
        </>)}
      </Escena>
      {/* 8 · escamas: la piel se renueva de más y las células se despegan en grupos */}
      <Escena T={T} a={K.Es} b={K.Est} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <rect x={0} y={640} width={KW} height={620} fill="#c97a5e" stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 7 }, (_, row) => { const H = 560, yy = 1240 - ((row * 80 + (T - K.Es) * vel) % H); const u = (1240 - yy) / H; const ch = klerp(70, 20, u), cw = klerp(100, 170, u);
            return Array.from({ length: 8 }, (_, c) => <rect key={row + '-' + c} x={c * 150 - (row % 2) * 75 - 20 + (150 - cw) / 2} y={yy - ch / 2} width={cw} height={ch} rx={ch / 2.5}
              fill={mixHex(CP.basal, '#fdf3e6', u)} stroke={KC.ink} strokeWidth={4} opacity={u > 0.97 ? 0 : 1} />); })}
          {[0, 1, 2].map((k) => { const t0 = K.Es + 1.2 + k * 0.9; if (T < t0) return null; const u = kprog(T, t0, t0 + 2.6, kEase.suave);
            return <g key={k} transform={`translate(${200 + k * 250 + u * 40} ${klerp(660, 570, u)}) rotate(${u * (k % 2 ? 18 : -14)})`} opacity={1 - kprog(u, 0.85, 1)}>
              {[0, 1, 2, 3].map((j) => <rect key={j} x={-90 + j * 12} y={-j * 16} width={180} height={20} rx={8} fill={CP.escama} stroke={KC.ink} strokeWidth={4} />)}
            </g>; })}
          {[[150, 618, 10], [480, 622, -40], [860, 616, 160]].map(([x, y, a], i) => <Malassezia key={i} x={x} y={y} r={18} ang={a} brote={0.5} sw={3} />)}
        </>)}
      </Escena>
      {/* 9–10 · el estudio de 2005: ácido oleico en voluntarios */}
      <Escena T={T} a={K.Est} b={K.Ge} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Busto T={T} x={290} y={540} s={0.46} caspa={0.15 + 0.85 * kprog(T, K.Re + 0.3, K.Re + 1.6)} cae={kprog(T, K.Re + 0.3, K.Re + 0.8)} />
          <Busto T={T} x={790} y={540} s={0.46} caspa={0} />
          {[290, 790].map((x, i) => { const p = kprog(T, K.Est + 2.4, K.Est + 3.2, kEase.sale); if (p <= 0) return null; const fuera = kprog(T, K.Re - 0.2, K.Re + 0.3);
            return <g key={i} transform={`translate(${x} ${klerp(480, 610, p) - fuera * 400})`} opacity={1 - fuera}>
              <rect x={-14} y={-130} width={28} height={110} rx={8} fill="#e8f6ff" stroke={KC.ink} strokeWidth={5} />
              <rect x={-26} y={-170} width={52} height={50} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
              <path d="M -8 -20 L 0 0 L 8 -20 Z" fill="#e8f6ff" stroke={KC.ink} strokeWidth={4} />
              {Array.from({ length: 3 }, (_, k) => { const u = ((T - K.Est - 3.0) * 1.4 + k / 3) % 1; return T > K.Est + 3.0 ? <circle key={k} cx={0} cy={10 + u * 110} r={8} fill={CP.oleico} stroke={KC.ink} strokeWidth={3} opacity={1 - u} /> : null; })}
            </g>; })}
        </>)}
      </Escena>
      {/* 11 · genoma: le falta el gen para fabricar ácidos grasos */}
      <Escena T={T} a={K.Ge} b={K.Ch} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          {(() => { const p = kprog(T, K.Ge + 0.2, K.Ge + 1.4); const cols = [KC.cyan, KC.pink, KC.mint, KC.yellow, KC.lilac, KC.orange, KC.cyan, KC.mint];
            return <g>
              <rect x={60} y={940} width={960 * p} height={16} rx={8} fill="#8fa3c8" />
              {cols.map((c, i) => { const x = 80 + i * 118; if (x > 60 + 960 * p) return null; return i === 4
                ? <g key={i}><rect x={x} y={895} width={100} height={106} rx={14} fill="none" stroke={KC.red} strokeWidth={6} strokeDasharray="14 9" />
                    <path d={`M ${x + 22} 920 L ${x + 78} 976 M ${x + 78} 920 L ${x + 22} 976`} stroke={KC.red} strokeWidth={12} strokeLinecap="round" opacity={kprog(T, K.Ge + 1.6, K.Ge + 1.9)} /></g>
                : <rect key={i} x={x} y={900} width={100} height={96} rx={14} fill={c} stroke={KC.ink} strokeWidth={6} />; })}
            </g>; })()}
          <Malassezia x={330} y={640 + Math.sin(T * 1.3) * 8} r={120} ang={-35} brote={0.6} />
          {(() => { const p = kprog(T, K.Ge + 3.4, K.Ge + 5.4); return <g>
            <Gota x={700} y={740} r={78 * (1 - 0.55 * p)} />
            {p > 0 && Array.from({ length: 4 }, (_, k) => { const u = (p * 2 + k / 4) % 1; return <g key={k} opacity={Math.sin(u * Math.PI)}><Cola x={klerp(660, 470, u)} y={690 + k * 22 - u * 60} n={5} paso={10} alto={5} ang={180} color={k === 1 ? CP.oleico : CP.acido} ancho={4} kink={k === 1} /></g>; })}
          </g>; })()}
        </>)}
      </Escena>
      {/* 12 · champús anticaspa con antifúngicos */}
      <Escena T={T} a={K.Ch} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Champu x={230} y={930} s={1.05} inclina={-8 + Math.sin(T * 2) * 2} />
          <Burbujas T={T} x={240} y={760} n={9} area={220} desde={K.Ch} />
        </>)}
        <Lupa T={T} at={K.Ch + 1.0} until={K.C - 0.2} x={700} y={860} r={210} fx={320} fy={720} tinte={KC.cyan} etiqueta="AL MICROSCOPIO"
          interior={(T2, r) => { const k = kprog(T2, K.Ch + 1.8, K.Ch + 4.2); return <div style={{ position:'absolute', inset:0 }}>
            <MicroCuero T={T2} w={r * 2} h={r * 2} levaduras={1 - 0.75 * k} />
            {fsvg(<g>{Array.from({ length: 7 }, (_, i) => { const u = ((T2 - K.Ch) * 0.4 + i / 7) % 1; return <circle key={i} cx={30 + i * 55} cy={klerp(r * 2 + 20, -20, u)} r={14 + (i % 3) * 6} fill="rgba(255,255,255,.35)" stroke="#fff" strokeWidth={3} opacity={k > 0 ? 0.9 : 0.4} />; })}</g>)}
          </div>; }} />
      </Escena>
      {/* 13 · cierre: la misma cabeza; ahora sabes lo que hay en la caspa */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="40% 40%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<Busto T={T} x={400} y={60} s={1} caspa={1} cae={0.6} />)}
      </Escena>
      {/* lupas del cuero cabelludo (inicio y cierre) */}
      <Lupa T={T} at={K.Ma + 0.1} until={K.Se - 0.2} x={590} y={790} r={230} fx={402} fy={540} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · cuero cabelludo"
        interior={(T2, r) => <MicroCuero T={T2} w={r * 2} h={r * 2} levaduras={kprog(T2, K.Ma + 0.4, K.Ma + 1.2)} />} />
      <Lupa T={T} at={K.C + 0.6} until={K.Ou - 0.1} x={600} y={860} r={230} fx={360} fy={1060} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · una escama"
        interior={(T2, r) => <MicroCuero T={T2} w={r * 2} h={r * 2} colas={kprog(T2, K.C + 1.2, K.C + 2.0)} />} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.5} until={K.G + 2.1} texto="¿solo piel muerta?" x={300} y={1000} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.G + 2.3} until={K.Ma - 0.2} texto="hay una levadura" x={300} y={1000} tam={40} borde={KC.pink} />
      <Etq T={T} at={K.Ma + 1.0} until={K.Se - 0.3} x={60} y={380} texto="levadura de la piel" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Ma + 1.4} until={K.Se - 0.3} x={60} y={435} texto="Malassezia" it tam={40} color={KC.ink} />
      <Chip T={T} at={K.Ma + 2.0} until={K.Se - 0.3} texto="en la mayoría de los adultos" x={330} y={1200} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Se + 0.5} until={K.Li - 0.3} x={1030} y={1160} texto="glándula sebácea" lado="izq" tam={28} color={CP.sebo2} />
      <Etq T={T} at={K.Se + 1.2} until={K.Li - 0.3} x={60} y={500} texto="sebo: una grasa natural" tam={32} color={CP.sebo2} />
      <Etq T={T} at={K.Se + 0.8} until={K.Li - 0.3} x={60} y={1120} texto="pelo" tam={28} color={KC.texto} />
      <Etq T={T} at={K.Li + 0.4} until={K.Ol - 0.2} x={60} y={470} texto="Malassezia globosa" it tam={36} color={KC.texto} />
      <Etq T={T} at={K.Li + 0.9} until={K.Ol - 0.2} x={440} y={700} texto="célula hija" tam={28} color={KC.texto} />
      <Chip T={T} at={K.Li + 1.3} until={K.Ol - 0.2} texto="lipasas = tijeras químicas" x={560} y={1175} tam={34} borde={CP.lipasa} />
      <Etq T={T} at={K.Li + 1.0} until={K.Ol - 0.2} x={1030} y={1100} texto="grasa del sebo" lado="izq" tam={26} color={CP.sebo2} />
      <Etq T={T} at={K.Ol + 0.4} until={K.P - 0.2} x={60} y={520} texto="ácidos grasos sueltos" tam={32} color={CP.acido} />
      <Etq T={T} at={K.Ol + 1.2} until={K.P - 0.2} x={60} y={1100} texto="ácido oleico (doblado)" tam={32} color={CP.oleico} />
      <Etq T={T} at={K.Ol + 2.0} until={K.P - 0.2} x={1030} y={1150} texto="aceite de oliva" lado="izq" tam={28} color={KC.texto} />
      <Chip T={T} at={K.P + 0.3} until={K.Tr - 0.2} texto="con caspa" x={170} y={490} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.P + 0.5} until={K.Tr - 0.2} texto="sin caspa" x={410} y={490} tam={26} borde={KC.ink} />
      {['grasa', 'levadura', 'piel sensible'].map((t, i) => <Chip key={i} T={T} at={K.Tr + 0.9 + i * 0.75} until={K.Es - 0.2} texto={t} x={200 + i * 340} y={970} tam={32} borde={KC.ink} />)}
      <Chip T={T} at={K.Tr + 0.2} until={K.Es - 0.2} texto="al menos tres cosas" x={540} y={500} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Tr + 3.3} until={K.Es - 0.2} texto="caspa" x={780} y={1080} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.Es + 0.6} until={K.Est - 0.2} texto="se multiplican de más" x={400} y={1180} tam={34} borde={KC.coral} />
      <Etq T={T} at={K.Es + 1.6} until={K.Est - 0.2} x={60} y={430} texto="escama = células pegadas" tam={28} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.Est + 0.2} until={K.Re - 0.3} anio="2005" quien="investigadores de Cincinnati, EE. UU." revista="DeAngelis y col. · J Investig Dermatol Symp Proc" y={410} />
      <Chip T={T} at={K.Est + 3.0} until={K.Re - 0.3} texto="ácido oleico" x={540} y={700} tam={32} borde={CP.oleico} />
      <Chip T={T} at={K.Re + 0.1} until={K.Ge - 0.2} texto="con caspa" x={290} y={680} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Re + 0.3} until={K.Ge - 0.2} texto="sin caspa" x={790} y={680} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Re + 1.4} until={K.Ge - 0.2} texto="✓ se descamó" x={290} y={1165} tam={32} borde={KC.leaf} />
      <Chip T={T} at={K.Re + 2.2} until={K.Ge - 0.2} texto="nada visible" x={790} y={1165} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Ge + 0.5} until={K.Ch - 0.2} x={60} y={440} texto="Malassezia globosa" it tam={36} color={KC.texto} />
      <Chip T={T} at={K.Ge + 0.8} until={K.Ch - 0.2} texto="su genoma (leído en 2007)" x={400} y={830} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Ge + 1.8} until={K.Ch - 0.2} texto="✗ el gen para fabricar ácidos grasos" x={540} y={1090} tam={30} borde={KC.red} />
      <Etq T={T} at={K.Ge + 3.6} until={K.Ch - 0.2} x={1030} y={800} texto="tu sebo" lado="izq" tam={30} color={CP.sebo2} />
      <Chip T={T} at={K.Ch + 0.4} until={K.C - 0.2} texto="antifúngicos" x={300} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Ch + 2.2} until={K.C - 0.2} texto="ketoconazol" x={250} y={560} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Ch + 2.9} until={K.C - 0.2} texto="piritiona de zinc" x={290} y={640} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="grasa + levadura + tu piel" x={300} y={480} tam={34} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Se} texto="10 cm" largo={270} />
      <BarraEscala T={T} at={K.Se} until={K.Li} texto="100 µm" largo={180} />
      <BarraEscala T={T} at={K.Li} until={K.P} texto="2 µm" largo={110} />
      <BarraEscala T={T} at={K.P} until={K.Tr} texto="10 cm" largo={115} color={KC.ink} />
      <BarraEscala T={T} at={K.Es} until={K.Est} texto="20 µm" largo={160} />
      <BarraEscala T={T} at={K.Est} until={K.Ge} texto="10 cm" largo={125} />
      <BarraEscala T={T} at={K.Ge} until={K.Ch} texto="2 µm" largo={90} />
      <BarraEscala T={T} at={K.Ch} until={K.C} texto="5 cm" largo={150} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={270} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="Hay una *levadura.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.Se - 0.1} texto="Se llama *Malassezia.*" />
      <Subtitulo T={T} idx={2} at={K.Se + 0.1} until={K.Li - 0.1} texto="Tu cabeza suelta *sebo.*" />
      <Subtitulo T={T} idx={3} at={K.Li + 0.1} until={K.Ol - 0.1} texto="Lo corta con *lipasas.*" />
      <Subtitulo T={T} idx={4} at={K.Ol + 0.1} until={K.P - 0.1} texto="Suelta *ácido oleico.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Tr - 0.1} texto="¿Por qué a *unos sí?*" />
      <Subtitulo T={T} idx={6} at={K.Tr + 0.1} until={K.Es - 0.1} texto="Y una *piel sensible.*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Est - 0.1} texto="Se despegan *en grupos.*" />
      <Subtitulo T={T} idx={8} at={K.Est + 0.1} until={K.Re - 0.1} texto="2005: *ácido oleico*" />
      <Subtitulo T={T} idx={9} at={K.Re + 0.1} until={K.Ge - 0.1} texto="Con caspa: *se descamó.*" />
      <Subtitulo T={T} idx={10} at={K.Ge + 0.1} until={K.Ch - 0.1} texto="Le falta *un gen.*" />
      <Subtitulo T={T} idx={11} at={K.Ch + 0.1} until={K.C - 0.1} texto="Champú *antifúngico.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es tu piel *reaccionando.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Ma + 0.4, K.Se - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Li + 0.5, K.Ol + 3.6, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Tr + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [K.Es + 0.8, K.Est - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Re + 0.5, K.Ge - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Ge + 3.0, K.Ch - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Ch + 0.5, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="12" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CaspaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CaspaShot /></CompositionStage></div>;
}
window.CaspaApp = CaspaApp;
