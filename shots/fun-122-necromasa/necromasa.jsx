// Shot Fungi Mati #122 · Esta tierra negra es un cementerio de microbios — NARRADO (gancho 1 "Esto no es X: es Y" + N1 Por dentro + N4 Imagen que se llena).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (formas y tamaños aproximados, con barra de escala).

const NC = { tierra:'#2b1d14', tierra2:'#3d2a1c', tierra3:'#5a3d27', hongo:KC.gold2, bact:'#9b6bff', vivo:'#2fe08a', arcilla:'#9aa3ad', arcilla2:'#6f7882', pared:'#e8b04a', cito:'#bfe9d9' };

// Puño de tierra negra (montoncito). pintado 0..1 = brillitos dorados (hongo) y morados (bacteria) por dentro.
const TIERRA_PTS = (() => { const g = krng(122); return Array.from({ length: 70 }, () => ({ x: (g() - 0.5) * 520, y: -g() * 230 + 10, r: 4 + g() * 9, k: g() })); })();
function Tierra({ T, x, y, s = 1, pintado = 0, cae = 1 }) {
  const c = kEase.sale(kclamp(cae, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={18} rx={330} ry={34} fill="rgba(0,0,0,.25)" />
    <path d={`M -300 20 Q -290 ${-60 * c} -200 ${-120 * c} Q -130 ${-230 * c} -20 ${-235 * c} Q 110 ${-245 * c} 190 ${-150 * c} Q 290 ${-70 * c} 300 20 Z`} fill={NC.tierra} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {TIERRA_PTS.map((p, i) => { const dentro = p.y > -220 * c && Math.abs(p.x) < 280 - Math.abs(p.y) * 0.4;
      if (!dentro) return null;
      const col = pintado > 0 && p.k < 0.5 * pintado ? (p.k < 0.34 * pintado ? NC.hongo : NC.bact) : (p.k < 0.6 ? NC.tierra2 : NC.tierra3);
      const brilla = pintado > 0 && p.k < 0.5 * pintado;
      return <circle key={i} cx={p.x} cy={p.y * c} r={p.r * (brilla ? 0.9 + 0.2 * Math.sin(T * 4 + i) : 1)} fill={col} opacity={brilla ? 1 : 0.9} />; })}
    {/* hilitos blancos de hongo asomando */}
    {[[-150, -80, -110, -120], [40, -150, 90, -190], [160, -60, 210, -40], [-60, -30, -20, -70]].map(([a, b, cc, d], i) =>
      <path key={i} d={`M ${a} ${b * c} Q ${(a + cc) / 2 + 10} ${(b + d) / 2 * c - 14} ${cc} ${d * c}`} stroke="#f4ecd8" strokeWidth={3} fill="none" opacity={0.7 * c} />)}
  </g>;
}
// Mata de maíz esquemática (milpa). crece 0..1.
function Maiz({ T, x, y, s = 1, crece = 1, seed = 1 }) {
  const h = 520 * crece, m = mece(T, seed, 0.4) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${m})`}>
    <path d={`M -10 0 L -6 ${-h} L 6 ${-h} L 10 0 Z`} fill="#3f9a3a" stroke={KC.ink} strokeWidth={5} />
    {[0.25, 0.45, 0.65, 0.82].map((k, i) => { const yy = -h * k, d = i % 2 ? 1 : -1;
      return <path key={i} d={`M 0 ${yy} Q ${d * 120} ${yy - 80} ${d * 190} ${yy + 30}`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />; })}
    {[0.25, 0.45, 0.65, 0.82].map((k, i) => { const yy = -h * k, d = i % 2 ? 1 : -1;
      return <path key={'v' + i} d={`M 0 ${yy} Q ${d * 120} ${yy - 80} ${d * 190} ${yy + 30}`} stroke="#4fbf44" strokeWidth={13} fill="none" strokeLinecap="round" />; })}
    {crece > 0.6 && <g transform={`translate(14 ${-h * 0.55}) rotate(25)`}><ellipse rx={20} ry={56} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} /><path d="M -18 20 Q -30 -40 -4 -60 M 18 20 Q 30 -40 4 -60" stroke="#4fbf44" strokeWidth={9} fill="none" /></g>}
    <path d={`M -6 ${-h} L -30 ${-h - 70} M 0 ${-h} L 0 ${-h - 80} M 6 ${-h} L 30 ${-h - 70}`} stroke="#d9b45a" strokeWidth={6} />
  </g>;
}
// Hifa en corte largo: tubo horizontal con pared (quitina) gruesa, septos y núcleos. vida 0..1 (1 = viva, 0 = vacía).
// rompe 0..1: la pared se parte en pedazos que caen (los devuelve la función piezas()).
function Hifa({ T, x0 = -40, x1 = 1120, y = 760, ancho = 200, vida = 1, rompe = 0 }) {
  const pared = 26;
  const segs = 6, L = (x1 - x0) / segs;
  return <g>
    {Array.from({ length: segs }, (_, i) => { const a = x0 + i * L; const r = rompe > 0 ? kclamp(rompe * 2 - i * 0.18, 0, 1) : 0;
      const dy = r * r * (360 + (i % 3) * 60), rot = r * ((i % 2 ? 1 : -1) * 28), dx = r * (i % 2 ? 30 : -30);
      return <g key={i} transform={`translate(${dx} ${dy}) rotate(${rot} ${a + L / 2} ${y})`} opacity={1 - kprog(rompe, 0.55, 0.95)}>
        <rect x={a} y={y - ancho / 2} width={L + 1} height={ancho} fill={mixHex('#1b2433', NC.cito, 0.25 + 0.55 * vida)} opacity={0.35 + 0.65 * vida} />
        {/* pared arriba y abajo */}
        <rect x={a} y={y - ancho / 2} width={L + 1} height={pared} fill={NC.pared} stroke={KC.ink} strokeWidth={4} />
        <rect x={a} y={y + ancho / 2 - pared} width={L + 1} height={pared} fill={NC.pared} stroke={KC.ink} strokeWidth={4} />
        {/* septo */}
        {i > 0 && <rect x={a - 7} y={y - ancho / 2} width={14} height={ancho} fill={NC.pared} stroke={KC.ink} strokeWidth={3} opacity={0.95} />}
        {/* núcleos y gránulos (se apagan al morir) */}
        {vida > 0 && <><ellipse cx={a + L * 0.45 + mece(T, i, 0.3) * 8} cy={y + mece(T, i + 4, 0.3) * 10} rx={30} ry={22} fill="#b18cff" stroke={KC.ink} strokeWidth={3} opacity={vida} />
          {[0.2, 0.7, 0.85].map((k, j) => <circle key={j} cx={a + L * k} cy={y + (j - 1) * 40 + mece(T, i * 3 + j, 0.5) * 8} r={8} fill="#eafff7" opacity={0.8 * vida} />)}</>}
      </g>; })}
  </g>;
}
// Laminillas de arcilla apiladas (minerales finos). (x, y) centro. n láminas.
function Arcilla({ x, y, s = 1, n = 4, rot = 0, aparece = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * kEase.rebote(kclamp(aparece, 0, 1))})`}>
    {Array.from({ length: n }, (_, i) => <rect key={i} x={-150 + (i % 2) * 14} y={-n * 13 + i * 26} width={300} height={20} rx={6} fill={i % 2 ? NC.arcilla : NC.arcilla2} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}
// Pedacito de pared de hifa (resto, necromasa).
function Resto({ x, y, rot = 0, s = 1, color = NC.pared }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -46 -10 L 30 -16 L 48 4 L -20 16 L -50 8 Z" fill={color} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
  </g>;
}
// Reloj de arena: p 0..1 (arena que baja).
function RelojArena({ T, x, y, s = 1, p = 0 }) {
  const a = 1 - p;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 1.5) * 2})`}>
    <rect x={-110} y={-200} width={220} height={22} rx={8} fill="#c98b2b" stroke={KC.ink} strokeWidth={5} />
    <rect x={-110} y={178} width={220} height={22} rx={8} fill="#c98b2b" stroke={KC.ink} strokeWidth={5} />
    <path d="M -90 -178 L 90 -178 Q 90 -60 12 0 Q 90 60 90 178 L -90 178 Q -90 60 -12 0 Q -90 -60 -90 -178 Z" fill="rgba(234,255,247,.25)" stroke={KC.texto} strokeWidth={6} />
    <path d={`M ${-80 * a} ${-20 - 140 * a} L ${80 * a} ${-20 - 140 * a} L 10 -10 L -10 -10 Z`} fill={KC.gold2} opacity={a > 0.02 ? 1 : 0} />
    <path d={`M -82 172 L 82 172 L ${70 * p} ${172 - 120 * p} L ${-70 * p} ${172 - 120 * p} Z`} fill={KC.gold2} />
    <line x1={0} y1={0} x2={0} y2={170} stroke={KC.gold2} strokeWidth={4} strokeDasharray="8 10" strokeDashoffset={-T * 60} opacity={a > 0.02 ? 1 : 0} />
  </g>;
}
// Glucosamina / ácido murámico esquemáticos: anillo de azúcar con "NH₂" (y la cola del ácido murámico).
function AminoAzucar({ x, y, s = 1, color = NC.hongo, cola = false, p = 1 }) {
  const hex = [0, 60, 120, 180, 240, 300].map((a) => `${60 * Math.cos((a + 30) * Math.PI / 180)},${60 * Math.sin((a + 30) * Math.PI / 180)}`).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`} opacity={kclamp(p * 3, 0, 1)}>
    <polygon points={hex} fill={color + '44'} stroke={color} strokeWidth={10} strokeLinejoin="round" />
    <line x1={52} y1={30} x2={100} y2={60} stroke={color} strokeWidth={8} />
    <text x={104} y={80} style={{ font:`700 34px ${KF.mono}` }} fill={KC.texto}>NH₂</text>
    {cola && <><line x1={-52} y1={30} x2={-100} y2={66} stroke={color} strokeWidth={8} /><path d="M -100 66 L -150 46 M -100 66 L -120 116" stroke={color} strokeWidth={8} /><circle cx={-150} cy={46} r={12} fill={KC.red} /></>}
  </g>;
}
// Mapa mundial esquemático (siluetas simples).
const CONTINENTES = [
  'M 60 60 Q 120 20 250 40 Q 330 50 330 110 Q 300 170 250 190 Q 220 240 200 260 Q 170 230 140 180 Q 90 150 70 110 Z',  // Norteamérica
  'M 230 270 Q 280 260 310 300 Q 320 360 290 420 Q 270 470 250 480 Q 240 420 225 360 Q 210 310 230 270 Z',               // Sudamérica
  'M 430 50 Q 480 30 540 50 Q 560 90 520 120 Q 470 130 440 110 Q 420 80 430 50 Z',                                       // Europa
  'M 450 150 Q 520 140 570 170 Q 600 240 570 320 Q 540 380 510 390 Q 480 330 470 270 Q 440 210 450 150 Z',               // África
  'M 560 40 Q 680 10 820 40 Q 880 80 860 140 Q 800 190 740 210 Q 690 240 640 200 Q 600 160 570 120 Q 550 80 560 40 Z',   // Asia
  'M 760 330 Q 830 310 870 340 Q 880 390 840 410 Q 780 410 760 380 Z',                                                   // Australia
];
// 486 sitios ilustrativos, concentrados en Asia oriental, Europa y Norteamérica (Lu et al. 2026, §4.3 y Fig. 1).
const SITIOS = (() => { const g = krng(486), zonas = [[740, 140, 70, 50, 0.52], [480, 85, 50, 28, 0.2], [190, 110, 80, 50, 0.2], [500, 260, 40, 60, 0.03], [270, 340, 30, 60, 0.03], [810, 365, 35, 20, 0.02]];
  const out = []; for (let i = 0; i < 486; i++) { let u = g(), z = zonas[0]; for (const q of zonas) { if (u < q[4]) { z = q; break; } u -= q[4]; }
    out.push([z[0] + (g() - 0.5) * 2 * z[2], z[1] + (g() - 0.5) * 2 * z[3]]); } return out; })();
function MapaMundo({ x, y, s = 1, p = 1 }) {
  const k = Math.floor(486 * kclamp(p, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={20} y={0} width={900} height={500} rx={30} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} />
    <line x1={20} y1={250} x2={920} y2={250} stroke={KC.ink} strokeWidth={3} strokeDasharray="12 10" opacity=".5" />
    {CONTINENTES.map((d, i) => <path key={i} d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
    {SITIOS.slice(0, k).map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill={KC.red} stroke={KC.ink} strokeWidth={1.5} />)}
    <text x={905} y={240} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink} opacity=".6">ecuador</text>
  </g>;
}
// Balanza: inclina 0..1 (lado izquierdo baja).
function Balanza({ x, y, s = 1, inclina = 0 }) {
  const a = -14 * inclina;
  const plato = (dx, col, txt) => { const yy = Math.sin(a * Math.PI / 180) * dx * -1; return <g transform={`translate(${dx * Math.cos(a * Math.PI / 180)} ${-yy})`}>
    <line x1={0} y1={0} x2={-80} y2={160} stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={80} y2={160} stroke={KC.ink} strokeWidth={5} />
    <path d="M -120 160 L 120 160 Q 100 210 0 210 Q -100 210 -120 160 Z" fill={col} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={150} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={col} stroke={KC.ink} strokeWidth={3}>{txt}</text></g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={0} width={28} height={330} fill="#c98b2b" stroke={KC.ink} strokeWidth={6} />
    <rect x={-120} y={320} width={240} height={30} rx={10} fill="#c98b2b" stroke={KC.ink} strokeWidth={6} />
    <g transform={`rotate(${a})`}><rect x={-300} y={-10} width={600} height={20} rx={8} fill="#7a4a22" stroke={KC.ink} strokeWidth={5} /></g>
    {plato(-290, NC.hongo, '34 %')}{plato(290, NC.bact, '16 %')}
    <circle r={18} fill={KC.gold} stroke={KC.ink} strokeWidth={5} />
  </g>;
}

function NecromasaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Comida, Hi: CUES.Hifas, M: CUES.Muere, A: CUES.Arcilla, P: CUES.Pregunta, Hu: CUES.Huella, E19: CUES.Estudio2019, E26: CUES.Estudio2026, D: CUES.Doble, V: CUES.Vivos, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G + 0.05, K.G + 0.6);
  const hongosC = 0.34, bactC = 0.16;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el puño de tierra de la milpa cae y se desmorona */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.06} origen="40% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Maiz T={T} x={860} y={1090} s={1.0} seed={1} />
          <Maiz T={T} x={140} y={1090} s={0.8} seed={2} />
          <rect x={-20} y={1060} width={1120} height={300} fill="#6b4a32" stroke={KC.ink} strokeWidth={8} />
          <g transform={`translate(0 ${(1 - cae) * -620})`}><Tierra T={T} x={430} y={1060} s={1} cae={0.35 + 0.65 * cae} /></g>
          {cae >= 1 && Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.G + 0.6, K.G + 1.5, kEase.sale), d = i % 2 ? 1 : -1;
            return <circle key={i} cx={430 + d * (180 + i * 18) * u} cy={1050 - Math.sin(u * Math.PI) * (60 + i * 6)} r={10 + (i % 3) * 4} fill={NC.tierra} stroke={KC.ink} strokeWidth={3} />; })}
        </>)}
      </Escena>
      {/* 2 · por dentro: hongos y bacterias se comen la hoja y arman su cuerpo con su carbono */}
      <Escena T={T} a={K.Co} b={K.Hi} zoom={0.08}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        <HifasMicro T={T} g={kprog(T, K.Co - 0.2, K.Co + 2.6)} enzimas={kprog(T, K.Co + 1.8, K.Co + 3.0)} comida={{ x: 800, y: 820 }} />
        {fsvg(<>
          {[[700, 960, 20, 1], [880, 960, -30, 2], [940, 700, 70, 3], [640, 700, -60, 4]].map(([bx, by, r, sd], i) => <Bacteria key={i} T={T} x={bx + mece(T, sd, 0.4) * 10} y={by} largo={110} ancho={46} rot={r + mece(T, sd + 5, 0.3) * 10} seed={sd} />)}
          {Array.from({ length: 8 }, (_, i) => { const u = (T * 0.5 + i / 8) % 1, haciaH = i % 2 === 0;
            const tx = haciaH ? klerp(800, 520, u) : klerp(800, [700, 880, 940, 640][(i >> 1) % 4], u), ty = haciaH ? klerp(820, 980, u) : klerp(820, [960, 960, 700, 700][(i >> 1) % 4], u);
            return <g key={i} opacity={Math.sin(Math.PI * u) * kprog(T, K.Co + 1.6, K.Co + 2.2)}><circle cx={tx} cy={ty} r={20} fill="#2a2f3a" stroke={KC.gold2} strokeWidth={4} /><text x={tx} y={ty + 9} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.gold2}>C</text></g>; })}
        </>, 25)}
      </Escena>
      {/* 3–4 · la hifa: pared de quitina; muere y sus restos se pegan a la arcilla */}
      <Escena T={T} a={K.Hi} b={K.A} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        {fsvg(<>
          {(() => { const ent = kprog(T, K.Hi - 0.2, K.Hi + 0.8, kEase.sale); return <g transform={`translate(${(1 - ent) * -900} 0)`}>
            <g opacity={1 - kprog(T, K.M + 1.5, K.M + 2.4)} transform={`translate(0 ${kprog(T, K.M + 1.4, K.M + 2.4) * 40})`}>
              <Hifa T={T} y={800} ancho={200} vida={1 - kprog(T, K.M + 0.1, K.M + 1.4)} />
            </g>
          </g>; })()}
          {/* zoom a la pared: cadena de N-acetilglucosamina (quitina) */}
          {T < K.M + 1.2 && <g opacity={kprog(T, K.Hi + 1.4, K.Hi + 2.0) * (1 - kprog(T, K.M + 0.6, K.M + 1.2))}>
            <path d="M 300 700 L 160 930 M 300 700 L 980 930" stroke={KC.gold2} strokeWidth={3} strokeDasharray="10 10" />
            <rect x={110} y={930} width={880} height={190} rx={30} fill="rgba(14,15,18,.9)" stroke={KC.gold2} strokeWidth={5} />
            <CadenaAnillos x={190} y={1025} n={7} p={kprog(T, K.Hi + 1.6, K.Hi + 2.8)} s={0.9} paso={118} color={NC.pared} T={T} ondula={0.2} />
          </g>}
          {/* arcilla y restos pegados */}
          {[[260, 1020, -6], [700, 1050, 5]].map(([ax, ay, r], i) => <Arcilla key={i} x={ax} y={ay} rot={r} n={5} aparece={kprog(T, K.M + 1.6 + i * 0.3, K.M + 2.2 + i * 0.3)} />)}
          {[[190, 940, -10, 0], [300, 945, 15, 1], [640, 970, -5, 2], [770, 975, 20, 3], [380, 952, 4, 4], [560, 968, -12, 5], [860, 980, 8, 6]].map(([rx, ry, rr, i]) => { const raw = kprog(T, K.M + 1.6 + i * 0.22, K.M + 2.3 + i * 0.22); if (raw <= 0) return null; const u = kEase.rebote(raw);
            return <g key={i} transform={`translate(0 ${(1 - u) * (720 - ry)}) rotate(${(1 - u) * 40} ${rx} ${ry})`}><Resto x={rx} y={ry} rot={rr} s={1.1} /></g>; })}
        </>)}
      </Escena>
      {/* 5 · pegado a minerales: el carbono puede tardar décadas o siglos en renovarse */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <Arcilla x={330} y={1060} n={6} rot={-4} />
          {[[240, 960, -10], [360, 970, 12], [430, 975, -4]].map(([rx, ry, rr], i) => <Resto key={i} x={rx} y={ry} rot={rr} s={1.1} />)}
          <RelojArena T={T} x={330} y={700} s={0.85} p={kprog(T, K.A + 0.3, K.A + 3.6)} />
          <g opacity={1 - kprog(T, K.A + 1.0, K.A + 3.0)} transform={`translate(830 ${1010 - kprog(T, K.A + 1.0, K.A + 3.0) * 40})`}>
            <path d="M -70 0 C -40 -50, 40 -50, 80 0 C 40 40, -40 40, -70 0 Z" fill="#c9822f" stroke="#5a3a1c" strokeWidth={5} />
          </g>
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿cómo sabes que era de un hongo? */}
      <Escena T={T} a={K.P} b={K.Hu} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Resto x={300} y={1050} s={3} rot={-8} /><Interrogacion T={T} x={300} y={880} tam={380} /></>)}
      </Escena>
      {/* 7 · las dos huellas: glucosamina (sobre todo hongos) y ácido murámico (solo bacterias) */}
      <Escena T={T} a={K.Hu} b={K.E19} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        {fsvg(<>
          <CadenaAnillos x={130} y={560} n={4} p={1 - kprog(T, K.Hu + 0.6, K.Hu + 1.2)} s={0.8} color={NC.pared} />
          <AminoAzucar x={280} y={760} s={1.2} color={NC.hongo} p={kprog(T, K.Hu + 0.9, K.Hu + 1.5)} />
          <Bacteria T={T} x={760} y={560} largo={220} ancho={90} rot={-10} seed={7} reventar={kprog(T, K.Hu + 2.4, K.Hu + 3.2)} />
          <AminoAzucar x={790} y={790} s={1.2} color={NC.bact} cola p={kprog(T, K.Hu + 2.9, K.Hu + 3.5)} />
          <line x1={540} y1={480} x2={540} y2={1080} stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeDasharray="12 12" />
        </>)}
      </Escena>
      {/* 8 · el estudio de 2019 (zonas templadas, capa superior) */}
      <Escena T={T} a={K.E19} b={K.E26} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {/* perfil de suelo con la capa de arriba resaltada */}
          <rect x={90} y={800} width={420} height={100} fill="#2b1d14" stroke={KC.ink} strokeWidth={6} />
          <rect x={90} y={900} width={420} height={100} fill="#6b4a32" stroke={KC.ink} strokeWidth={6} />
          <rect x={90} y={1000} width={420} height={100} fill="#a07a52" stroke={KC.ink} strokeWidth={6} />
          <rect x={84} y={794} width={432} height={112} fill="none" stroke={KC.yellow} strokeWidth={8} opacity={0.6 + 0.4 * Math.sin(T * 5)} />
          {/* barras: más de la mitad (cultivos y pastizales) · ~1/3 (bosques) */}
          {(() => { const u = kprog(T, K.E19 + 2.0, K.E19 + 3.2, kEase.sale); return <g>
            <rect x={600} y={840} width={360} height={60} rx={12} fill="rgba(0,0,0,.2)" stroke={KC.ink} strokeWidth={5} />
            <rect x={600} y={840} width={360 * 0.62 * u} height={60} rx={12} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
            <rect x={600} y={990} width={360} height={60} rx={12} fill="rgba(0,0,0,.2)" stroke={KC.ink} strokeWidth={5} />
            <rect x={600} y={990} width={360 * 0.33 * u} height={60} rx={12} fill={KC.gold2} stroke={KC.ink} strokeWidth={5} />
            <line x1={780} y1={820} x2={780} y2={1070} stroke={KC.ink} strokeWidth={5} strokeDasharray="10 8" />
            <text x={780} y={1100} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>mitad</text>
          </g>; })()}
        </>)}
      </Escena>
      {/* 9 · el estudio de 2026: mapa → cuadrícula que se llena (34 % hongos + 16 % bacterias) */}
      <Escena T={T} a={K.E26} b={K.D} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<g opacity={1 - kprog(T, K.E26 + 3.4, K.E26 + 3.9)}><MapaMundo x={70} y={560} s={1.0} p={kprog(T, K.E26 + 0.3, K.E26 + 2.2)} /></g>)}
        {T > K.E26 + 3.4 && <div style={{ opacity:kprog(T, K.E26 + 3.5, K.E26 + 4.0) }}>
          <div style={{ position:'absolute', left:270, top:480, width:540, height:540, borderRadius:40, background:NC.tierra, border:`8px solid ${KC.ink}` }}></div>
          <Cuadricula T={T} cols={10} filas={10} x={290} y={500} ancho={500} alto={500} vacio="rgba(255,255,255,.13)"
            llenado={kprog(T, K.E26 + 4.2, K.E26 + 8.2) * (hongosC + bactC)} tramos={[{ desde: 0, hasta: hongosC, color: NC.hongo }, { desde: hongosC, hasta: hongosC + bactC, color: NC.bact }]} />
        </div>}
      </Escena>
      {/* 10 · el hongo pesa el doble */}
      <Escena T={T} a={K.D} b={K.V} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Balanza x={420} y={820} s={0.95} inclina={kprog(T, K.D + 0.1, K.D + 0.8, kEase.rebote)} />)}
      </Escena>
      {/* 11 · los vivos: ~2 % (valor típico, otra fuente: tarjeta aparte) */}
      <Escena T={T} a={K.V} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <div style={{ position:'absolute', left:90, top:500, width:500, height:500, borderRadius:36, background:'rgba(14,15,18,.88)', border:`6px dashed ${KC.texto}` }}></div>
        <Cuadricula T={T} cols={10} filas={10} x={120} y={530} ancho={440} alto={440} vacio="rgba(255,255,255,.13)" llenado={0.02 * kprog(T, K.V + 0.6, K.V + 1.0)}
          tramos={[{ desde: 0, hasta: 0.02, color: mixHex(NC.vivo, '#ffffff', 0.3 + 0.3 * Math.sin(T * 6)) }]} />
      </Escena>
      {/* 12 · cierre: el mismo puño de tierra, ya pintado por dentro */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05} origen="40% 55%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Maiz T={T} x={860} y={1090} s={1.0} seed={1} crece={klerp(1, 1.1, kprog(T, K.C, K.C + 3))} />
          <Maiz T={T} x={140} y={1090} s={0.8} seed={2} crece={klerp(1, 1.1, kprog(T, K.C, K.C + 3))} />
          <rect x={-20} y={1060} width={1120} height={300} fill="#6b4a32" stroke={KC.ink} strokeWidth={8} />
          <Tierra T={T} x={430} y={1060} s={1} pintado={kprog(T, K.C + 0.4, K.C + 2.4)} />
        </>)}
      </Escena>

      {/* textos */}
      <Etq T={T} at={K.G + 0.6} until={K.Co - 0.3} x={60} y={700} texto="tierra de la milpa" tam={32} color={KC.ink} />
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.6} until={K.Co - 0.3} texto="¿solo planta podrida?" x={330} y={470} tam={40} />
      <Chip T={T} at={K.G + 2.3} until={K.Co - 0.3} texto="cementerio de microbios" x={330} y={570} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Co + 0.1} until={K.Hi - 0.3} texto="POR DENTRO · UN TERRÓN" x={540} y={420} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Co + 0.9} until={K.Hi - 0.3} x={330} y={660} texto="hongo (hifas)" tam={30} color="#eafff7" />
      <Etq T={T} at={K.Co + 1.2} until={K.Hi - 0.3} x={560} y={600} texto="bacterias" tam={30} color="#7fd88a" />
      <Etq T={T} at={K.Co + 1.5} until={K.Hi - 0.3} x={640} y={900} texto="hoja" tam={28} color="#e0a43a" />
      <Chip T={T} at={K.Co + 2.0} until={K.Hi - 0.3} texto="carbono de la hoja → cuerpo del microbio" x={540} y={500} tam={28} borde={KC.gold2} />
      <Chip T={T} at={K.Hi + 0.1} until={K.M - 0.3} texto="AL MICROSCOPIO · UNA HIFA" x={410} y={430} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Hi + 0.8} until={K.M + 0.5} x={70} y={655} texto="pared con quitina" tam={30} color={NC.pared} />
      <Etq T={T} at={K.Hi + 2.2} until={K.M + 0.6} x={130} y={1150} texto="quitina = cadena de N-acetilglucosamina" tam={27} color={NC.pared} />
      <Chip T={T} at={K.M + 0.4} until={K.A - 0.3} texto="la hifa muere" x={330} y={440} tam={36} borde={KC.red} />
      <Etq T={T} at={K.M + 2.2} until={K.A - 0.3} x={90} y={1130} texto="minerales finos (arcilla)" tam={30} color={NC.arcilla} />
      <Chip T={T} at={K.M + 3.2} until={K.A - 0.3} texto="necromasa = restos de microbios muertos" x={540} y={780} tam={30} borde={NC.pared} />
      <Chip T={T} at={K.A + 0.3} until={K.P - 0.3} texto="pegado a minerales" x={330} y={430} tam={34} borde={NC.arcilla} />
      <Etq T={T} at={K.A + 1.0} until={K.P - 0.3} x={1000} y={1110} texto="suelto: se va antes" lado="izq" tam={26} color="#e0a43a" />
      <Etq T={T} at={K.A + 0.9} until={K.P - 0.3} x={560} y={760} texto="décadas" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.A + 1.8} until={K.P - 0.3} x={560} y={900} texto="… o siglos" tam={34} color={KC.gold2} />
      <Etq T={T} at={K.Hu + 0.2} until={K.E19 - 0.3} x={70} y={440} texto="hongo: quitina" tam={30} color={NC.pared} />
      <Etq T={T} at={K.Hu + 0.2} until={K.E19 - 0.3} x={570} y={440} texto="bacteria: peptidoglicano" tam={26} color={NC.bact} />
      <Chip T={T} at={K.Hu + 1.3} until={K.E19 - 0.3} texto="glucosamina" x={290} y={920} tam={34} borde={NC.hongo} />
      <Etq T={T} at={K.Hu + 1.6} until={K.E19 - 0.3} x={60} y={990} texto="en el suelo: sobre todo hongos" tam={26} color={NC.hongo} />
      <Chip T={T} at={K.Hu + 3.3} until={K.E19 - 0.3} texto="ácido murámico" x={800} y={920} tam={34} borde={NC.bact} />
      <Etq T={T} at={K.Hu + 3.6} until={K.E19 - 0.3} x={640} y={990} texto="solo de bacterias" tam={26} color={NC.bact} />
      <TarjetaEstudio T={T} at={K.E19 + 0.1} until={K.E19 + 5.6} anio="2019" quien="Liang, Amelung, Lehmann y Kästner" revista="Global Change Biology · aminoazúcares 1996–2018" x={540} y={500} />
      <Etq T={T} at={K.E19 + 1.4} until={K.E26 - 0.3} x={90} y={765} texto="capa superior" tam={30} color={KC.ink} />
      <Etq T={T} at={K.E19 + 2.2} until={K.E26 - 0.3} x={560} y={808} texto="pastizales: hasta 62 %" tam={26} color={KC.ink} />
      <Etq T={T} at={K.E19 + 2.6} until={K.E26 - 0.3} x={560} y={958} texto="bosques: ~1/3" tam={26} color={KC.ink} />
      <Chip T={T} at={K.E26 + 0.1} until={K.E26 + 3.4} texto="2026 · Lu et al. · Earth Syst. Sci. Data" x={540} y={440} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.E26 + 1.0} until={K.E26 + 3.4} texto="486 sitios · sobre todo hemisferio norte" x={540} y={1140} tam={30} borde={KC.red} />
      <Chip T={T} at={K.E26 + 3.8} until={K.D - 0.2} texto="tierras de cultivo · 0–20 cm · promedio" x={540} y={440} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.E26 + 4.8} until={K.D - 0.2} texto="■ hongos muertos: 34 %" x={290} y={1095} tam={30} borde={NC.hongo} color={NC.hongo} />
      <Chip T={T} at={K.E26 + 7.0} until={K.D - 0.2} texto="■ bacterias muertas: 16 %" x={790} y={1095} tam={30} borde={NC.bact} color="#c7adff" />
      <BarraEscala T={T} at={K.E26 + 3.8} until={K.D} texto="1 cuadrito = 1 % del carbono" largo={58} />
      <NumeroGigante T={T} at={K.D + 0.2} until={K.V - 0.2} valor={2} prefijo="×" dur={0.4} x={300} y={500} tam={190} color={NC.hongo} />
      <Chip T={T} at={K.V + 0.2} until={K.C - 0.3} texto="aparte: otro dato" x={370} y={480} tam={30} borde={KC.texto} mono />
      <Chip T={T} at={K.V + 1.0} until={K.C - 0.3} texto="microbios VIVOS ≈ 2 % del carbono del suelo" x={540} y={1060} tam={28} borde={NC.vivo} />
      <Etq T={T} at={K.V + 1.6} until={K.C - 0.3} x={630} y={820} texto="valor típico" tam={30} color={KC.ink} />
      <Etq T={T} at={K.V + 1.9} until={K.C - 0.3} x={630} y={870} texto="(otros estudios)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="cerca de la mitad: microbios muertos" x={420} y={790} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="promedio de 145 tierras de cultivo · 0–20 cm" x={420} y={870} tam={24} borde={KC.gold} mono />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Co} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.Co} until={K.Hi} texto="100 µm" largo={160} />
      <BarraEscala T={T} at={K.Hi} until={K.M} texto="5 µm" largo={200} />
      <BarraEscala T={T} at={K.M} until={K.P} texto="1 µm (dibujo esquemático)" largo={120} />
      <BarraEscala T={T} at={K.Hu} until={K.E19} texto="moléculas esquemáticas" largo={0} />
      <BarraEscala T={T} at={K.E19} until={K.E26} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.E26} until={K.E26 + 3.6} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.V} until={K.C} texto="1 cuadrito = 1 % del carbono" largo={50} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="No es solo planta podrida: es un *cementerio de microbios.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.Hi - 0.1} texto="Se comen la hoja y *arman su cuerpo.*" />
      <Subtitulo T={T} idx={2} at={K.Hi + 0.1} until={K.M - 0.1} texto="Hifas: hilos *forrados de quitina.*" />
      <Subtitulo T={T} idx={3} at={K.M + 0.1} until={K.A - 0.1} texto="Sus restos se pegan *a minerales finos.*" />
      <Subtitulo T={T} idx={4} at={K.A + 0.1} until={K.P - 0.1} texto="Puede tardar *décadas o siglos* en renovarse." />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Hu - 0.1} texto="¿Cómo sabes que *era de un hongo?*" />
      <Subtitulo T={T} idx={6} at={K.Hu + 0.1} until={K.E19 - 0.1} texto="Glucosamina: *sobre todo hongos.* Ácido murámico: *bacterias.*" />
      <Subtitulo T={T} idx={7} at={K.E19 + 0.1} until={K.E26 - 0.1} texto="2019: pueden ser *más de la mitad.*" />
      <Subtitulo T={T} idx={8} at={K.E26 + 0.1} until={K.D - 0.1} texto="Cultivos: hongos *34 %,* bacterias *16 %.*" />
      <Subtitulo T={T} idx={9} at={K.D + 0.1} until={K.V - 0.1} texto="El hongo pesa *el doble.*" />
      <Subtitulo T={T} idx={10} at={K.V + 0.1} until={K.C - 0.1} texto="Vivos: suelen ser *un 2 %* del carbono del suelo." />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Cerca de *la mitad* viene de microbios muertos." />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Hi + 0.2, K.M - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.4, K.A - 0.3, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.A + 0.2, K.P - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.Hu + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.E19 + 0.4, K.E26 - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.D, K.C - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [K.C + 0.5, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="122" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NecromasaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NecromasaShot /></CompositionStage></div>;
}
window.NecromasaApp = NecromasaApp;
