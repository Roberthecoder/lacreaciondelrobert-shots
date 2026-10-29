// Shot Fungi Mati #40 · El hongo que se derrite en tinta: Coprinus comatus — NARRADO (gancho 1 "Esto no es X: es Y" + N1 Por dentro + N5).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const CP = { blanco:'#fbf8f2', escama:'#d8c3a0', cafe:'#b38656', rosa:'#e7a2a6', tinta:'#15110f', pasto:'#2f9a3a', pasto2:'#46c050', agar:'#f2e2b0' };

// Coprinus comatus de perfil: sombrero alto y cilíndrico, blanco con escamas lanudas y centro café; pie blanco alto con anillo suelto.
// tinta 0..1: la autodigestión sube desde el borde del sombrero; el borde se abre en campana y se enrolla; el pie queda en pie.
function Barbuda({ T = 0, x, y, s = 1, crece = 1, tinta = 0, rot = 0, charco = 0, gotas = true, seed = 1 }) {
  if (crece <= 0) return null;
  const H = 230 * kEase.sale(kclamp(crece * 1.3, 0, 1)), w = 120 * (0.7 + 0.3 * kclamp(crece * 1.5, 0, 1)), ch = 280 * (0.6 + 0.4 * kclamp(crece * 1.5, 0, 1));
  const c = kclamp(tinta, 0, 1);
  const yt = -H - ch * 0.75, yb0 = yt + ch;
  const yb = yb0 - c * ch * 0.65;                 // el borde sube conforme se digiere
  const fl = Math.pow(c, 1.4) * 60;                               // el borde se abre en campana
  const ys = Math.max(yt + w * 0.5, yb - 30);
  const ym = yb - fl * 0.55;                       // la orilla se enrolla hacia arriba
  const cap = `M ${-w / 2 - fl} ${ym} Q ${-w / 2 - fl * 0.2} ${ys} ${-w / 2} ${ys} L ${-w / 2} ${yt + w * 0.5} Q ${-w / 2} ${yt} 0 ${yt} Q ${w / 2} ${yt} ${w / 2} ${yt + w * 0.5} L ${w / 2} ${ys} Q ${w / 2 + fl * 0.2} ${ys} ${w / 2 + fl} ${ym} Z`;
  const ng = kclamp(c * 4, 0, 1), banda = 16 + c * 26;
  const bandaP = `M ${-w / 2 - fl} ${ym} Q ${-w / 2 - fl * 0.2} ${ys} ${-w / 2} ${ys} L ${-w / 2} ${ys - banda} L ${w / 2} ${ys - banda} L ${w / 2} ${ys} Q ${w / 2 + fl * 0.2} ${ys} ${w / 2 + fl} ${ym} Z`;
  const r = krng(seed * 7 + 3), esc = [];
  for (let fy = yt + 34; fy < ys - banda - 22; fy += 30) for (let k = 0; k < 4; k++) { const fx = -w / 2 + 16 + ((k + (Math.round((fy - yt) / 30) % 2) * 0.5) * (w - 30)) / 4 + (r() - 0.5) * 6; if (fx < w / 2 - 10) esc.push([fx, fy]); }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {charco > 0 && <ellipse cx={8} cy={4} rx={30 + 110 * charco} ry={8 + 22 * charco} fill={CP.tinta} stroke={KC.ink} strokeWidth={4} />}
    <path d={`M -16 0 Q -20 -10 -13 -24 L -10 ${yt + 40} L 10 ${yt + 40} L 13 -24 Q 20 -10 16 0 Z`} fill={CP.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {H > 80 && <ellipse cx={0} cy={-H * 0.3} rx={19} ry={6} fill={CP.blanco} stroke={KC.ink} strokeWidth={4} />}
    <path d={cap} fill={CP.blanco} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {ng > 0 && <rect x={-w / 2 + 3} y={ys - banda - 14} width={w - 6} height={14} fill={CP.rosa} opacity={ng} />}
    {ng > 0 && <path d={bandaP} fill={CP.tinta} stroke={KC.ink} strokeWidth={5} opacity={ng} strokeLinejoin="round" />}
    <ellipse cx={0} cy={yt + 18} rx={w * 0.32} ry={14} fill={CP.cafe} />
    {esc.map(([ex, ey], i) => <path key={i} d={`M ${ex - 10} ${ey} Q ${ex} ${ey - 13} ${ex + 10} ${ey} Q ${ex + 2} ${ey - 4} ${ex - 10} ${ey} Z`} fill={CP.escama} stroke={KC.ink} strokeWidth={2.5} />)}
    {gotas && c > 0.05 && <><Goteo T={T} x={-w / 2 - fl} y0={ym + 8} y1={-4} cada={0.8} desde={seed * 0.3} color={CP.tinta} r={9} />
      <Goteo T={T} x={w / 2 + fl} y0={ym + 8} y1={-4} cada={0.95} desde={seed * 0.3 + 0.4} color={CP.tinta} r={9} /></>}
  </g>;
}

function Pasto({ T, y = 1180, color = CP.pasto }) {
  return <g>
    <rect x={-20} y={y} width={KW + 40} height={KH - y + 20} fill={color} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 34 }, (_, i) => { const x = 10 + i * 32, h = 30 + (i * 37) % 28, m = Math.sin(T * 2 + i) * 5; return <path key={i} d={`M ${x - 8} ${y + 4} Q ${x + m} ${y - h * 0.5} ${x + m * 1.5} ${y - h} Q ${x + 4} ${y - h * 0.4} ${x + 8} ${y + 4} Z`} fill={CP.pasto2} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}

// Sombrero cortado a lo largo: laminillas muy delgadas y muy pegadas, con esporas atoradas.
function SombreroCorte({ T, x = 540, y0 = 380, y1 = 1170, w = 520, mov = 1 }) {
  const n = 34, xs = Array.from({ length: n }, (_, i) => x - w / 2 + 26 + i * (w - 52) / (n - 1));
  const cap = `M ${x - w / 2} ${y1} L ${x - w / 2} ${y0 + w * 0.45} Q ${x - w / 2} ${y0} ${x} ${y0} Q ${x + w / 2} ${y0} ${x + w / 2} ${y0 + w * 0.45} L ${x + w / 2} ${y1} Z`;
  return <g>
    <path d={cap} fill={CP.blanco} stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${x - w / 2 + 22} ${y1} L ${x - w / 2 + 22} ${y0 + w * 0.5} Q ${x - w / 2 + 22} ${y0 + 26} ${x} ${y0 + 26} Q ${x + w / 2 - 22} ${y0 + 26} ${x + w / 2 - 22} ${y0 + w * 0.5} L ${x + w / 2 - 22} ${y1} Z`} fill="#efe2d6" />
    <rect x={x - 20} y={y0 + 60} width={40} height={y1 - y0 - 60} fill="#f6efe6" stroke={KC.ink} strokeWidth={4} />
    {xs.map((lx, i) => Math.abs(lx - x) < 26 ? null : <line key={i} x1={lx} y1={y0 + w * 0.42 - Math.cos((lx - x) / w * Math.PI) * 120 + 40} x2={lx} y2={y1 - 6} stroke="#cbb8a8" strokeWidth={5} />)}
    {Array.from({ length: 40 }, (_, i) => { const lx = xs[(i * 7) % (n - 1)] + 7, ly = y0 + 330 + ((i * 53) % (y1 - y0 - 380)); return <ellipse key={i} cx={lx + Math.sin(T * 9 + i) * 1.5 * mov} cy={ly} rx={4} ry={5.5} fill={i % 5 === 0 ? '#555' : '#b9a59a'} />; })}
  </g>;
}

// Laminillas al microscopio (3 placas). madura: y abajo de la cual las esporas ya son negras.
// disuelve: y abajo de la cual la placa ya se digirió. lluvia 0..1: esporas negras que caen al aire.
const PLACAS = [300, 540, 780];
function LaminasMicro({ T, madura = 1200, disuelve = 1160, lluvia = 0, enzimas = 0 }) {
  const top = 600, base = 1160, yb = Math.min(base, disuelve);
  return <g>
    {PLACAS.map((px, j) => <g key={j}>
      <path d={`M ${px - 34} ${top} L ${px - 34} ${yb} ${disuelve < base ? `Q ${px - 20} ${yb + 26} ${px} ${yb + 8} Q ${px + 20} ${yb + 30} ${px + 34} ${yb}` : `L ${px + 34} ${yb}`} L ${px + 34} ${top} Z`} fill="#efe4dc" stroke={KC.ink} strokeWidth={6} />
      <rect x={px - 31} y={Math.max(top, madura - 40)} width={62} height={Math.max(0, yb - Math.max(top, madura - 40))} fill="#7b6a6a" opacity=".55" />
      {disuelve < base && <path d={`M ${px - 34} ${yb - 6} Q ${px - 20} ${yb + 26} ${px} ${yb + 8} Q ${px + 20} ${yb + 30} ${px + 34} ${yb - 6} Z`} fill={CP.tinta} />}
      {disuelve < base && [0, 1].map((k) => { const u = ((T * 0.9 + j * 0.37 + k * 0.5) % 1); return <path key={k} d="M 0 -14 Q 9 0 0 9 Q -9 0 0 -14 Z" transform={`translate(${px - 10 + k * 20} ${yb + 20 + u * 140})`} fill={CP.tinta} stroke="#3a3330" strokeWidth={2} opacity={1 - u} />; })}
      {Array.from({ length: 12 }, (_, i) => { const sy = top + 30 + i * 46; if (sy > yb - 18) return null; const negra = sy > madura;
        return [-1, 1].map((sd) => <g key={sd + '' + i}>
          <line x1={px + sd * 34} y1={sy} x2={px + sd * 44} y2={sy} stroke="#cdbfb5" strokeWidth={4} />
          <ellipse cx={px + sd * 64} cy={sy} rx={28} ry={20} fill={negra ? '#1a1412' : '#f3ece6'} stroke={negra ? '#d6cbc2' : KC.ink} strokeWidth={3} />
        </g>); })}
    </g>)}
    {lluvia > 0 && Array.from({ length: 21 }, (_, i) => { const u = ((T * 0.32 + i / 21) % 1), px = PLACAS[i % 3] + (i % 2 ? 62 : -62) + Math.sin(T * 2 + i) * 20 + (i % 2 ? 1 : -1) * u * 90;
      return <ellipse key={i} cx={px} cy={Math.min(1160, disuelve) + 10 + u * 520} rx={28} ry={20} fill="#1a1412" stroke="#d6cbc2" strokeWidth={3} opacity={lluvia * (1 - u * u)} transform={`rotate(${T * 60 + i * 30} ${px} ${Math.min(1160, disuelve) + 10 + u * 520})`} />; })}
    {enzimas > 0 && PLACAS.map((px, j) => [0, 1, 2].map((k) => { const a = T * 8 + k * 2 + j; const ex = px - 40 + k * 40, ey = Math.min(1160, disuelve) - 4 + Math.sin(a) * 6;
      return <g key={j + '-' + k} transform={`translate(${ex} ${ey}) scale(${enzimas})`}><path d={`M 0 0 L 13 ${-6 - 4 * Math.abs(Math.sin(a * 1.6))} A 14 14 0 1 0 13 ${6 + 4 * Math.abs(Math.sin(a * 1.6))} Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} /></g>; }))}
  </g>;
}

// Bolita con espinas (spiny ball): núcleo y muchas puntas con la punta contraída, sobre una ramita de la hifa.
function BolaEspinas({ x, y, r = 24, k = 1, rot = 0 }) {
  if (k <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${k}) rotate(${rot})`}>
    <line x1={0} y1={0} x2={0} y2={46} stroke={FK.hifa} strokeWidth={6} />
    {Array.from({ length: 18 }, (_, i) => { const a = i / 18 * Math.PI * 2; return <g key={i}><line x1={Math.cos(a) * r * 0.6} y1={Math.sin(a) * r * 0.6} x2={Math.cos(a) * r * 1.5} y2={Math.sin(a) * r * 1.5} stroke="#f7e7b0" strokeWidth={4} />
      <circle cx={Math.cos(a) * r * 1.55} cy={Math.sin(a) * r * 1.55} r={3.5} fill="#f7e7b0" /></g>; })}
    <ellipse rx={r * 0.7} ry={r * 0.9} fill="#e8d28a" stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// Hifas del cultivo al microscopio (líneas largas con ramitas).
const HIFAS = (() => { const r = krng(40), L = []; [700, 900, 1080].forEach((y0, j) => { let x = -20, y = y0; const pts = [[x, y]]; while (x < KW + 20) { x += 60; y += (r() - 0.5) * 40; pts.push([x, y]); } L.push({ pts, ramas: Array.from({ length: 6 }, (_, i) => { const p = pts[2 + i * 3] || pts[pts.length - 1]; return [p[0], p[1], (r() - 0.5) * 120, (j % 2 ? 1 : -1) * (60 + r() * 60)]; }) }); }); return L; })();
function HifasCultivo({ g = 1 }) {
  return <g opacity={g}>{HIFAS.map((h, i) => <g key={i}>
    <path d={'M ' + h.pts.map((p) => p.join(' ')).join(' L ')} stroke={FK.hifa} strokeWidth={6} fill="none" strokeLinejoin="round" opacity=".85" />
    {h.ramas.map(([x, y, dx, dy], k) => <path key={k} d={`M ${x} ${y} q ${dx * 0.3} ${dy * 0.6} ${dx} ${dy}`} stroke={FK.hifa} strokeWidth={4} fill="none" opacity=".7" />)}
  </g>)}</g>;
}
// Molécula de toxina (esquemática): anillo de 5 con un oxígeno.
function Toxina({ x, y, s = 1, rot = 0 }) {
  const P = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [Math.cos(a) * 20, Math.sin(a) * 20]; });
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={'M ' + P.map((p) => p.join(' ')).join(' L ') + ' Z'} fill="none" stroke={KC.pink} strokeWidth={6} strokeLinejoin="round" />
    <circle cx={P[0][0]} cy={P[0][1]} r={8} fill={KC.red} stroke={KC.ink} strokeWidth={2} />
  </g>;
}
// Pluma que escribe con tinta.
function Pluma({ x, y, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <path d="M 0 0 L 10 -40 Q 40 -200 120 -300 Q 70 -170 26 -36 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <line x1={8} y1={-30} x2={100} y2={-270} stroke="#c9c2b0" strokeWidth={3} />
    <path d="M 0 0 L 6 -16 L 14 -12 Z" fill={CP.tinta} />
  </g>;
}

function CoprinusShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, L: CUES.Laminillas, O: CUES.Orilla, D: CUES.Digiere, Ola: CUES.Ola, Ti: CUES.Tinta, P: CUES.Pregunta, E: CUES.Estudio, B: CUES.Bolitas, Tx: CUES.Toxinas, Co: CUES.Comer, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const MIC = K.E + 3.0;  // entra la vista al microscopio de la caja de cultivo
  // nematodo principal: entra (Estudio), pasa por las bolitas (Bolitas), se queda quieto (Toxinas), se lo comen (Comer)
  const w1x = T < K.B ? klerp(1250, 860, kprog(T, MIC + 0.2, K.B, kEase.sale)) : klerp(860, 240, kprog(T, K.B, K.Tx + 0.8, kEase.suave));
  const quieto = kprog(T, K.Tx + 0.3, K.Tx + 2.6, kEase.suave);
  const ond = 1 - quieto;
  const herida = kprog(T, K.B + 1.4, K.B + 2.2);
  const lleno = kprog(T, K.Co + 0.8, K.Co + 3.4), apaga = kprog(T, K.Co + 1.6, K.Co + 3.6) * 0.75;
  const tintaOla = kprog(T, K.Ola + 0.2, K.Ti - 0.3, kEase.suave);
  const orillaOla = 910 - 1.75 * 182 * (0.08 + 0.92 * tintaOla); // la flecha llega justo a la orilla que se va digiriendo (Barbuda s=1.75 en y=1190)
  const esc = (T >= K.Ti + 2.4 && T < K.P + 0.5);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el charco de tinta bajo una barbuda que gotea · 2 · nombre: brotan barbudas jóvenes */}
      <Escena T={T} a={K.G} b={K.L} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          {T < K.N + 0.4 && <g opacity={1 - kprog(T, K.N - 0.2, K.N + 0.4)}>
            <Barbuda T={T} x={360} y={1190} s={1.55} tinta={0.3 + 0.12 * kprog(T, K.G, K.N)} charco={0.35 + 0.35 * kprog(T, K.G, K.N)} rot={mece(T, 2, 0.4) * 2} />
            {T > 0.25 && <path d="M 0 -18 Q 12 0 0 12 Q -12 0 0 -18 Z" transform={`translate(${360 - 92} ${klerp(1000, 1180, kprog(T, 0.25, 0.75) ** 2)})`} fill={CP.tinta} stroke={KC.ink} strokeWidth={3} opacity={1 - kprog(T, 0.75, 0.85)} />}
          </g>}
          {T > K.N - 0.4 && <g opacity={kprog(T, K.N - 0.4, K.N + 0.2)}>
            <Barbuda T={T} x={210} y={1195} s={1.1} crece={kprog(T, K.N + 0.3, K.N + 1.5)} seed={3} rot={-4} />
            <Barbuda T={T} x={470} y={1190} s={1.5} crece={kprog(T, K.N, K.N + 1.2)} seed={4} />
            <Barbuda T={T} x={660} y={1200} s={0.85} crece={kprog(T, K.N + 0.6, K.N + 1.8)} seed={5} rot={6} />
          </g>}
        </>)}
      </Escena>
      {/* 3 · bajo el sombrero: laminillas delgadas y pegadas */}
      <Escena T={T} a={K.L} b={K.O} zoom={0.08}>
        <FondoLunares color={KC.pink} />
        {fsvg(<SombreroCorte T={T} />)}
      </Escena>
      {/* 4–5 · al microscopio: maduran abajo, caen al aire, y sus enzimas disuelven la parte vacía */}
      <Escena T={T} a={K.O} b={K.Ola} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<LaminasMicro T={T}
          madura={T < K.D ? klerp(1160, 1000, kprog(T, K.O + 0.3, K.O + 2.0)) : klerp(1000, 760, kprog(T, K.D + 0.6, K.Ola - 0.4))}
          disuelve={T < K.D ? 1160 : klerp(1160, 860, kprog(T, K.D + 0.6, K.Ola - 0.4, kEase.suave))}
          lluvia={kprog(T, K.O + 1.6, K.O + 2.4)} enzimas={kprog(T, K.D + 0.2, K.D + 0.6) * (1 - kprog(T, K.Ola - 0.6, K.Ola - 0.2))} />)}
      </Escena>
      {/* 6 · la ola sube del borde a la punta; el pie queda en pie */}
      <Escena T={T} a={K.Ola} b={K.Ti} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          <Barbuda T={T} x={400} y={1190} s={1.75} tinta={0.08 + 0.92 * tintaOla} charco={0.2 + 0.7 * tintaOla} seed={6} />
          <g opacity={kprog(T, K.Ola + 0.4, K.Ola + 0.8)}>
            <line x1={640} y1={430} x2={640} y2={900} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 14" opacity=".45" />
            <line x1={640} y1={900} x2={640} y2={orillaOla} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
            <line x1={640} y1={900} x2={640} y2={orillaOla} stroke={KC.yellow} strokeWidth={8} strokeLinecap="round" />
            <path d="M -22 14 L 0 -18 L 22 14 Z" transform={`translate(640 ${orillaOla - 6})`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
          </g>
        </>)}
      </Escena>
      {/* 7 · la tinta: esporas negras en tejido derretido · antes se usaba para escribir */}
      <Escena T={T} a={K.Ti} b={K.Ti + 2.5} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <circle cx={540} cy={800} r={360} fill="#8f8780" stroke={KC.cyan} strokeWidth={10} />
          {Array.from({ length: 30 }, (_, i) => { const a = i * 2.4, rr = 40 + (i * 47) % 300, px = 540 + Math.cos(a + T * 0.2) * rr * 0.95, py = 800 + Math.sin(a + T * 0.2) * rr * 0.95;
            return <ellipse key={i} cx={px} cy={py} rx={28} ry={20} fill="#1a1412" stroke="#4a403a" strokeWidth={3} transform={`rotate(${i * 40 + T * 20} ${px} ${py})`} />; })}
          {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${300 + i * 90} ${620 + (i % 3) * 140} q 40 ${-30 + Math.sin(T * 2 + i) * 10} 80 0`} stroke="#b4aaa2" strokeWidth={8} fill="none" strokeLinecap="round" />)}
        </>)}
      </Escena>
      <Escena T={T} a={K.Ti + 2.5} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={150} y={560} width={780} height={560} rx={10} fill={KC.paper} stroke={KC.ink} strokeWidth={8} transform="rotate(-3 540 840)" />
          {[640, 700, 760].map((ly, i) => <line key={i} x1={210} y1={ly + 260} x2={870} y2={ly + 230} stroke="#d8cfbd" strokeWidth={3} />)}
          <g transform="rotate(-3 540 840)">
            <clipPath id="escribe"><rect x={200} y={700} width={680 * kprog(T, K.Ti + 2.9, K.P - 0.4)} height={200} /></clipPath>
            <text x={210} y={840} clipPath="url(#escribe)" style={{ font:`italic 400 92px Georgia, 'Times New Roman', serif` }} fill={CP.tinta}>tinta de hongo</text>
          </g>
          {esc && <Pluma x={210 + 650 * kprog(T, K.Ti + 2.9, K.P - 0.4)} y={826 - 34 * kprog(T, K.Ti + 2.9, K.P - 0.4) + Math.sin(T * 22) * 6} />}
          <g transform="translate(830 1130)"><path d="M -70 0 L -60 -110 L 60 -110 L 70 0 Z" fill="#cfe3ea" stroke={KC.ink} strokeWidth={6} /><rect x={-60} y={-80} width={120} height={76} fill={CP.tinta} /><rect x={-34} y={-140} width={68} height={34} rx={6} fill="#8a6a4a" stroke={KC.ink} strokeWidth={5} /></g>
        </>)}
      </Escena>
      {/* 8 · re-gancho: ¿qué más come, además de restos de plantas? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <rect x={-20} y={1180} width={KW + 40} height={800} fill={FK.tierra} stroke={KC.ink} strokeWidth={8} />
          {[[120, 1186, -20, '#c0702a'], [300, 1192, 25, '#a9612a'], [460, 1184, -40, '#d08a3a'], [80, 1205, 10, '#8f5a2b']].map(([x, y, r, c], i) => <path key={i} d="M -60 0 Q 0 -34 60 0 Q 0 22 -60 0 Z" transform={`translate(${x} ${y}) rotate(${r})`} fill={c} stroke={KC.ink} strokeWidth={4} />)}
          <line x1={180} y1={1200} x2={420} y2={1170} stroke="#6b4a2b" strokeWidth={12} strokeLinecap="round" />
          <Barbuda T={T} x={280} y={1190} s={0.9} seed={8} />
          <Interrogacion T={T} x={260} y={980} />
        </>)}
      </Escena>
      {/* 9 · el estudio: caja de cultivo en laboratorio */}
      <Escena T={T} a={K.E} b={MIC} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Petri x={540} y={960} r={200}>
          <Colonia cx={0} cy={0} r={160 * kprog(T, K.E, K.E + 1.5) + 20} seed={4} />
          {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={-60 + i * 30} cy={-90 + (i % 2) * 40} r={3} fill="#7a6a58" opacity={kprog(T, K.E + 2.2, K.E + 2.6)} />)}
        </Petri>)}
      </Escena>
      {/* 9–12 · al microscopio: nematodos, bolitas con espinas, toxinas, y se lo comen */}
      <Escena T={T} a={MIC} b={K.C} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#14182a' }}></div>
        <Ambiente T={T} n={14} />
        {fsvg(<>
          <path d="M -200 2200 A 1500 1500 0 0 1 1300 380" stroke="rgba(255,255,255,.18)" strokeWidth={24} fill="none" />
          <HifasCultivo />
          {[[300, 852], [520, 856], [760, 846]].map(([bx, by], i) => <BolaEspinas key={i} x={bx} y={by - 50} k={kprog(T, MIC + 0.3 + i * 0.2, MIC + 0.8 + i * 0.2, kEase.rebote)} rot={T * 6 + i * 20} />)}
          {T > K.Tx - 0.2 && Array.from({ length: 12 }, (_, i) => { const u = kprog(T, K.Tx + i * 0.12, K.Tx + 1.6 + i * 0.12); if (u <= 0) return null; const sx = 120 + (i * 83) % 860, sy = [700, 900, 1080][i % 3];
            return <g key={i} opacity={1 - kprog(T, K.Co + 0.2, K.Co + 1.0)}><Toxina x={sx + Math.sin(i + T) * 20} y={sy - u * 120 * (i % 2 ? 1 : -1)} s={0.9} rot={T * 40 + i * 30} /></g>; })}
          <Gusano T={T} x={w1x} y={800} largo={450} ancho={30} ang={180} ondula={ond} lleno={lleno} apagado={apaga} seed={1} />
          <Gusano T={T} x={klerp(-120, 360, kprog(T, MIC + 0.6, K.B + 2.0, kEase.sale))} y={1000} largo={380} ancho={26} ang={0} ondula={ond} fase={1.5} seed={2} />
          <Gusano T={T} x={klerp(1300, 880, kprog(T, MIC + 1.0, K.B + 2.5, kEase.sale))} y={600} largo={330} ancho={24} ang={180} ondula={ond} fase={3} seed={3} />
          {herida > 0 && [[300, 800], [520, 806], [420, 796]].map(([hx, hy], i) => <g key={i} opacity={herida * (1 - lleno * 0.6)}>
            <path d={`M ${hx - 14} ${hy - 10} L ${hx + 12} ${hy + 8} M ${hx - 4} ${hy - 14} L ${hx + 16} ${hy}`} stroke={KC.red} strokeWidth={5} strokeLinecap="round" />
            {[0, 1, 2].map((k) => { const u = ((T * 0.8 + k / 3 + i * 0.2) % 1); return <circle key={k} cx={hx + k * 8} cy={hy - 20 - u * 70} r={6 * (1 - u) + 2} fill="#9fe6ff" opacity={1 - u} />; })}
          </g>)}
          {lleno > 0.4 && [300, 420, 560].map((hx, i) => { const p = kprog(T, K.Co + 2.2 + i * 0.3, K.Co + 3.4 + i * 0.3); return <path key={i} d={`M ${hx} 790 q ${12 - i * 8} ${-60 * p} ${30 * p} ${-130 * p}`} stroke={FK.hifa} strokeWidth={5} fill="none" strokeLinecap="round" />; })}
        </>)}
      </Escena>
      {/* 13 · cierre: la misma barbuda del inicio, ya casi toda tinta; y en la caja, el gusano atrapado */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Pasto T={T} />
          <Barbuda T={T} x={560} y={1190} s={1.55} tinta={0.85} charco={0.95} seed={9} />
          <Petri x={190} y={1040} r={110}><Colonia cx={0} cy={0} r={90} seed={5} />
            <path d="M -50 10 q 25 -20 50 0 t 50 0" stroke="#9a8064" strokeWidth={8} fill="none" strokeLinecap="round" /></Petri>
        </>)}
      </Escena>
      <Lupa T={T} at={K.C + 1.2} until={K.Ou - 0.2} x={830} y={1020} r={120} fx={600} fy={1190} interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#8f8780" />
        {Array.from({ length: 12 }, (_, i) => { const px = r + Math.cos(i * 2.1 + t * 0.3) * (20 + (i * 31) % 90), py = r + Math.sin(i * 2.1 + t * 0.3) * (20 + (i * 31) % 90); return <ellipse key={i} cx={px} cy={py} rx={16} ry={11} fill="#1a1412" transform={`rotate(${i * 50} ${px} ${py})`} />; })}</svg>} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.9} until={K.G + 2.6} texto="¿podrido?" x={300} y={380} tam={50} />
      <Chip T={T} at={K.G + 2.9} until={K.N - 0.3} texto="se digiere solo" x={300} y={380} tam={42} borde={KC.ink} />
      <Etq T={T} at={K.N + 1.0} until={K.L - 0.3} x={60} y={400} texto="barbuda" tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 1.4} until={K.L - 0.3} x={60} y={455} texto="Coprinus comatus" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.N + 2.0} until={K.L - 0.3} x={385} y={640} lado="izq" texto="escamas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.L + 0.3} until={K.O - 0.3} texto="POR DENTRO · sombrero" x={540} y={330} tam={34} mono borde={KC.ink} />
      <Etq T={T} at={K.L + 0.9} until={K.O - 0.3} x={1040} y={760} lado="izq" texto="laminillas" tam={30} color={KC.ink} />
      <Chip T={T} at={K.L + 1.8} until={K.O - 0.3} texto="muy delgadas y muy pegadas" x={540} y={1120} tam={36} borde={KC.pink} />
      <Chip T={T} at={K.O + 0.2} until={K.Ola - 0.3} texto="AL MICROSCOPIO · laminillas" x={560} y={310} tam={30} mono borde={KC.cyan} />
      <Etq T={T} at={K.O + 0.8} until={K.D - 0.3} x={60} y={540} texto="esporas maduras" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.D + 0.6} until={K.Ola - 0.3} x={60} y={540} texto="enzimas" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.Ola + 0.6} until={K.Ti - 0.3} x={560} y={1060} texto="del borde a la punta" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Ola + 1.6} until={K.Ti - 0.3} x={60} y={1120} texto="el pie queda" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ti + 0.2} until={K.Ti + 2.3} texto="AL MICROSCOPIO · tinta" x={540} y={330} tam={30} mono borde={KC.cyan} />
      <Etq T={T} at={K.Ti + 0.6} until={K.Ti + 2.3} x={60} y={470} texto="esporas negras" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Ti + 1.0} until={K.Ti + 2.3} x={1040} y={460} lado="izq" texto="tejido derretido" tam={28} color={'#cfc6be'} />
      <Chip T={T} at={K.Ti + 3.0} until={K.P - 0.3} texto="siglos XVII y XVIII" x={420} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.P + 0.6} until={K.E - 0.3} texto="¿solo restos de plantas?" x={360} y={420} tam={36} borde={KC.lilac} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={MIC - 0.4} anio="2004 y 2007" quien="Yunnan, China" revista="Luo et al., Mycologia y AEM" y={430} />
      <Chip T={T} at={K.E + 1.4} until={K.C - 0.3} texto="en laboratorio" x={540} y={T < MIC ? 1260 : 330} tam={36} borde={KC.yellow} />
      <Etq T={T} at={MIC + 1.6} until={K.B - 0.2} x={60} y={540} texto="nematodo" tam={30} color={KC.texto} />
      <Etq T={T} at={MIC + 1.9} until={K.B - 0.2} x={60} y={590} texto="Panagrellus redivivus" it tam={30} color={KC.texto} />
      <Etq T={T} at={K.B + 0.3} until={K.Tx - 0.2} x={60} y={660} texto="bolitas con espinas" tam={30} color={KC.gold2} />
      <Etq T={T} at={MIC + 0.8} until={K.C - 0.3} x={60} y={1150} texto="hifas y bolitas: dibujadas más grandes" tam={26} color={KC.texto} />
      <Chip T={T} at={K.B + 1.6} until={K.Tx - 0.2} texto="rompe su cubierta" x={540} y={460} tam={34} borde={KC.red} />
      <Cronometro T={T} at={K.Tx + 0.2} until={K.Co - 0.2} factor={3600} etiqueta="EN LA CAJA" x={540} y={470} />
      <Etq T={T} at={K.Tx + 0.5} until={K.Co - 0.2} x={60} y={560} texto="toxinas" tam={30} color={KC.pink} />
      <Chip T={T} at={K.Co + 0.4} until={K.C - 0.3} texto="días después" x={540} y={470} tam={38} borde={KC.gold} />
      <Etq T={T} at={K.Co + 1.2} until={K.C - 0.3} x={60} y={560} texto="hifas por dentro" tam={30} color={KC.gold2} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="también caza gusanos" x={420} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={900} texto="en laboratorio" tam={28} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.L} texto="5 cm" largo={180} />
      <BarraEscala T={T} at={K.L} until={K.O} texto="2 cm" largo={200} />
      <BarraEscala T={T} at={K.O} until={K.Ola} texto="20 µm" largo={110} />
      <BarraEscala T={T} at={K.Ola} until={K.Ti} texto="5 cm" largo={200} />
      <BarraEscala T={T} at={K.Ti} until={K.Ti + 2.5} texto="20 µm" largo={110} />
      <BarraEscala T={T} at={K.Ti + 2.5} until={K.P} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.E} until={MIC} texto="2 cm" largo={110} />
      <BarraEscala T={T} at={MIC} until={K.C} texto="0.5 mm" largo={150} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={180} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="No está podrido: *se digiere solo.*" />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.L - 0.1} texto="Coprinus comatus, *la barbuda*" />
      <Subtitulo T={T} idx={2} at={K.L + 0.1} until={K.O - 0.1} texto="Laminillas *muy pegadas*" />
      <Subtitulo T={T} idx={3} at={K.O + 0.1} until={K.D - 0.1} texto="Maduran abajo y *caen al aire*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.Ola - 0.1} texto="Sus enzimas *la disuelven*" />
      <Subtitulo T={T} idx={5} at={K.Ola + 0.1} until={K.Ti - 0.1} texto="Todo el sombrero, *tinta*" />
      <Subtitulo T={T} idx={6} at={K.Ti + 0.1} until={K.P - 0.1} texto="Antes se usaba *para escribir*" />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué más *come?*" />
      <Subtitulo T={T} idx={8} at={K.E + 0.1} until={K.B - 0.1} texto="Yunnan, China: *nematodos*" />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.Tx - 0.1} texto="Bolitas con *espinas*" />
      <Subtitulo T={T} idx={10} at={K.Tx + 0.1} until={K.Co - 0.1} texto="Inmóvil *en horas*" />
      <Subtitulo T={T} idx={11} at={K.Co + 0.1} until={K.C - 0.1} texto="Se lo come *por dentro*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="También *caza gusanos*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.N + 0.5, K.L - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.O + 0.4, K.O + 3.8, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Ola + 0.5, K.Ti - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ti + 2.6, K.P - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.E - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [MIC + 0.2, K.B - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.B + 1.0, K.Tx + 2.6, 'avatar_11_sorprendido', 'arriba-der'],
        [K.Co + 0.4, K.C - 0.4, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="40" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CoprinusApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CoprinusShot /></CompositionStage></div>;
}
window.CoprinusApp = CoprinusApp;
