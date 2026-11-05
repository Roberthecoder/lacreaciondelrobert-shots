// Shot Fungi Mati #61 · Esa cerveza lager la hicieron dos levaduras — NARRADO (N1 "Por dentro": vaso → célula híbrida → Patagonia → el mismo vaso).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Ciencia, sin promover el consumo de alcohol.

const CV = { cerveza:'#f2b51c', cerveza2:'#ffd34d', espuma:'#fffaf0', vidrio:'rgba(255,255,255,.28)', ambar:'#a8501a',
  azul:'#3d7bff', azul2:'#9fbcff', verde:'#2fbf5a', verde2:'#a6f0b8', cel:'#f3e2b0', cel2:'#d9bf7a', nucleo:'#c9a24a',
  pan:'#d9973f', pan2:'#f0c27a', corteza:'#6b4a2e', hoja:'#2f8f3a', hoja2:'#5cc46a', cyttaria:'#f08a24', cyttaria2:'#ffc070', suelo:'#6a4a2a' };

// Vaso de cerveza lager (dorada, con espuma). Base en (x, y). burb = burbujas activas (usa T).
function Vaso({ T = 0, x, y, s = 1, burb = 1, seed = 3 }) {
  const r = krng(seed), B = Array.from({ length: 16 }, () => [r() * 150 - 75, r(), 0.5 + r() * 0.8, 4 + r() * 6]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 -420 L 120 -420 L 96 0 L -96 0 Z" fill={CV.cerveza} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M -96 -380 L -70 -380 L -60 -30 L -80 -30 Z" fill={CV.cerveza2} opacity=".7" />
    {burb > 0 && B.map(([bx, f, v, rr], i) => { const u = ((T * v * 0.6 + f) % 1); return <circle key={i} cx={bx * (1 - u * 0.1)} cy={-20 - u * 360} r={rr} fill="#fff6c8" stroke="#c98a10" strokeWidth={2} opacity={burb * (u < 0.9 ? 0.9 : (1 - u) * 9)} />; })}
    <path d="M -128 -420 Q -140 -470 -90 -478 Q -60 -510 -10 -490 Q 30 -520 70 -490 Q 125 -500 128 -450 Q 140 -420 120 -410 L -120 -410 Q -138 -412 -128 -420 Z" fill={CV.espuma} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -120 -420 L 120 -420 L 96 0 L -96 0 Z" fill="none" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
  </g>;
}
// Azúcar (anillo de glucosa esquemático). n = cuántos anillos en fila (1 glucosa, 2 maltosa, 3 maltotriosa).
function Azucar({ x, y, s = 1, n = 1, color = KC.white, rot = 0, o = 1 }) {
  const hexa = (cx) => Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + 22 * Math.cos(a)).toFixed(1)} ${(22 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {Array.from({ length: n }, (_, i) => <g key={i}>{i > 0 && <line x1={i * 52 - 30} y1={0} x2={i * 52 - 22} y2={0} stroke={color} strokeWidth={5} />}
      <path d={hexa(i * 52)} fill="rgba(255,255,255,.25)" stroke={color} strokeWidth={6} strokeLinejoin="round" /></g>)}
  </g>;
}
// Grano de cebada malteada (ovalado, puntiagudo, con surco). abre 0..1.
function Grano({ x, y, s = 1, rot = 0, abre = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -60 0 Q -30 ${-34 - abre * 8} 0 ${-36 - abre * 10} Q 30 ${-34 - abre * 8} 64 0 Q 30 34 0 36 Q -30 34 -60 0 Z`} fill="#d8a350" stroke={KC.ink} strokeWidth={6} />
    <path d="M -46 0 Q 0 -6 52 0" stroke="#8a5a1e" strokeWidth={4} fill="none" />
    {abre > 0 && <path d={`M -10 -4 L 0 ${-12 - abre * 30} L 10 -4`} fill="#fff3c4" stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Cromosoma en "X" (esquemático).
function Cromo({ x, y, s = 1, rot = 0, color = CV.azul }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -22 -34 Q 0 -4 22 -34 M -22 34 Q 0 4 22 34" stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M -22 -34 Q 0 -4 22 -34 M -22 34 Q 0 4 22 34" stroke={color} strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>;
}
// Célula de levadura (ovalada) con núcleo; yema 0..1 crece a la derecha y suelta 0..1 la separa (queda cicatriz).
// mezcla: 0 = un color de cromosomas · 1 = cromosomas azules y verdes (híbrido).
function Levadura({ T = 0, x, y, r = 60, rot = 0, color = CV.cel, borde = KC.ink, yema = 0, suelta = 0, nucleo = true, mezcla = 0, tinta, bufanda = 0 }) {
  const ry = r * 0.82, by = r * 0.55 * kEase.sale(kclamp(yema, 0, 1)), dx = r * 0.98 + by * 0.55 + suelta * r * 0.4;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {yema > 0 && <ellipse cx={dx} cy={-ry * 0.25} rx={by} ry={by * 0.85} fill={color} stroke={borde} strokeWidth={Math.max(3, r / 14)} />}
    <ellipse rx={r} ry={ry} fill={tinta || color} stroke={borde} strokeWidth={Math.max(3, r / 12)} />
    <ellipse cx={-r * 0.35} cy={-ry * 0.4} rx={r * 0.28} ry={ry * 0.18} fill="#fff" opacity=".35" />
    {suelta > 0.6 && <circle cx={r * 0.92} cy={-ry * 0.2} r={r * 0.12} fill="none" stroke="#8a6a2a" strokeWidth={Math.max(2, r / 20)} opacity={kclamp((suelta - 0.6) * 3, 0, 1)} />}
    {nucleo && <circle cx={-r * 0.1} cy={ry * 0.1} r={r * 0.32} fill={CV.nucleo} stroke={borde} strokeWidth={Math.max(2, r / 20)} opacity=".9" />}
    {mezcla > 0 && <g opacity={mezcla}><circle cx={-r * 0.22} cy={ry * 0.1} r={r * 0.09} fill={CV.azul} /><circle cx={r * 0.02} cy={ry * 0.1} r={r * 0.09} fill={CV.verde} /></g>}
    {bufanda > 0 && <g opacity={bufanda}><path d={`M ${-r * 0.9} ${ry * 0.15} Q 0 ${ry * 0.55} ${r * 0.9} ${ry * 0.15} L ${r * 0.85} ${ry * 0.42} Q 0 ${ry * 0.8} ${-r * 0.85} ${ry * 0.42} Z`} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
      <path d={`M ${r * 0.5} ${ry * 0.5} L ${r * 0.62} ${ry * 1.15} L ${r * 0.85} ${ry * 1.1} L ${r * 0.75} ${ry * 0.45} Z`} fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>}
  </g>;
}
// Panecito (bolillo) que se infla con infla 0..1.
function Pan({ x, y, s = 1, infla = 1 }) {
  const k = 0.75 + 0.25 * infla;
  return <g transform={`translate(${x} ${y}) scale(${s * k} ${s * (0.6 + 0.4 * infla)})`}>
    <path d="M -170 0 Q -190 -110 -60 -130 Q 0 -150 60 -130 Q 190 -110 170 0 Z" fill={CV.pan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -90 -70 Q -50 -110 -20 -90 M 0 -100 Q 40 -130 70 -100" stroke={CV.pan2} strokeWidth={12} fill="none" strokeLinecap="round" />
  </g>;
}
// Árbol Nothofagus (haya del sur): tronco, ramas y copa de hojitas chicas dentadas; Cyttaria: bolitas anaranjadas con hoyitos.
function Nothofagus({ T = 0, x, y, s = 1, cyttaria = 0, seed = 2 }) {
  const r = krng(seed), H = Array.from({ length: 34 }, () => [r() * 360 - 180, -300 - r() * 260, r() * 360]);
  const CY = [[-110, -300], [90, -340], [10, -250], [150, -270], [-60, -380]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 0 Q -24 -160 -40 -260 L -10 -260 Q 0 -180 30 0 Z" fill={CV.corteza} stroke={KC.ink} strokeWidth={7} />
    <path d="M -30 -230 Q -100 -280 -150 -300 M -20 -250 Q 60 -300 150 -280 M -25 -255 Q -10 -330 10 -380" stroke={CV.corteza} strokeWidth={14} fill="none" strokeLinecap="round" />
    {H.map(([hx, hy, a], i) => <path key={i} d="M 0 -16 Q 12 -8 9 0 Q 12 8 0 16 Q -12 8 -9 0 Q -12 -8 0 -16 Z" transform={`translate(${hx} ${hy}) rotate(${a + Math.sin(T * 1.5 + i) * 6}) scale(1.4)`} fill={i % 3 ? CV.hoja : CV.hoja2} stroke={KC.ink} strokeWidth={2.5} />)}
    {CY.map(([cx, cy], i) => { const k = kEase.rebote(kclamp(cyttaria * 1.8 - i * 0.18, 0, 1)); return k > 0 ? <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`}>
      <circle r={22} fill={CV.cyttaria} stroke={KC.ink} strokeWidth={4} />
      {[[-8, -6], [6, -9], [9, 5], [-4, 8], [-11, 3], [2, -1]].map(([a, b], j) => <circle key={j} cx={a} cy={b} r={3.2} fill="#a8501a" />)}
    </g> : null; })}
  </g>;
}
// Mapa esquemático del mundo (siluetas muy simples). puntos: [[x, y, color, r, p]].
function MapaMundo({ x, y, s = 1, puntos = [] }) {
  const C = ['M 40 60 Q 120 10 230 40 Q 290 80 260 150 Q 220 190 200 230 Q 160 220 130 170 Q 70 140 40 60 Z',          // Norteamérica
    'M 215 245 Q 270 240 300 290 Q 300 360 260 420 Q 240 470 225 480 Q 215 420 205 360 Q 190 300 215 245 Z',                    // Sudamérica
    'M 410 60 Q 470 30 540 50 Q 560 90 520 110 Q 470 120 430 110 Q 400 90 410 60 Z',                                                 // Europa
    'M 430 140 Q 500 120 560 150 Q 580 230 540 300 Q 500 350 480 330 Q 450 260 420 200 Q 410 160 430 140 Z',                    // África
    'M 540 40 Q 650 10 780 40 Q 840 80 820 140 Q 760 190 700 200 Q 640 220 600 180 Q 560 140 540 100 Z',                        // Asia
    'M 740 300 Q 800 290 830 320 Q 830 360 790 370 Q 740 360 730 330 Z'];                                                          // Australia
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {C.map((d, i) => <path key={i} d={d} fill="#ffe9a8" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />)}
    {puntos.map(([px, py, color, r, p], i) => p > 0 ? <circle key={i} cx={px} cy={py} r={r * kEase.rebote(kclamp(p, 0, 1))} fill={color} stroke={KC.ink} strokeWidth={4} /> : null)}
  </g>;
}
// Termómetro: nivel 0..1.
function Termometro({ x, y, s = 1, nivel = 0.3, color = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-22} y={-260} width={44} height={250} rx={22} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <rect x={-10} y={-20 - 220 * nivel} width={20} height={220 * nivel + 10} rx={10} fill={color} />
    <circle cy={10} r={40} fill={color} stroke={KC.ink} strokeWidth={7} />
    {[0.25, 0.5, 0.75].map((k) => <line key={k} x1={22} y1={-20 - 220 * k} x2={44} y2={-20 - 220 * k} stroke={KC.ink} strokeWidth={5} />)}
  </g>;
}
// Tira de ADN horizontal: barras de colores (bases). gris = cuántas bases no coinciden (índices).
function TiraADN({ x, y, n = 40, w = 860, p = 1, color = CV.verde, seed = 9, distintas = [] }) {
  const r = krng(seed), BASES = [KC.yellow, KC.pink, KC.cyan, KC.mint], b = Array.from({ length: n }, () => Math.floor(r() * 4));
  const k = Math.ceil(n * p), dx = w / n;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-8} y={-44} width={w + 16} height={14} rx={7} fill={color} stroke={KC.ink} strokeWidth={3} />
    {b.slice(0, k).map((v, i) => <rect key={i} x={i * dx + 2} y={-30} width={dx - 4} height={60} rx={4} fill={distintas.includes(i) ? '#ffffff' : BASES[v]} stroke={KC.ink} strokeWidth={2} />)}
    <rect x={-8} y={30} width={w + 16} height={14} rx={7} fill={color} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Vasito chico (para la escena del mundo).
function Vasito({ x, y, s = 1, color = CV.cerveza }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -26 -80 L 26 -80 L 20 0 L -20 0 Z" fill={color} stroke={KC.ink} strokeWidth={4} />
    <path d="M -28 -80 Q -26 -96 -10 -94 Q 0 -102 12 -94 Q 28 -96 28 -80 Z" fill={CV.espuma} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// posiciones de los cromosomas dentro del núcleo (esquemático: no es el número real)
const CROMOS = Array.from({ length: 14 }, (_, i) => { const a = i * 2.39996, rr = 70 + (i % 5) * 34; return [Math.cos(a) * rr, Math.sin(a) * rr * 0.9, (i * 47) % 180, i % 2 ? CV.verde : CV.azul]; });
// 48 vasitos: casi todos lager (esquemático, sin conteo exacto)
const VASOS48 = Array.from({ length: 48 }, (_, i) => [130 + (i % 8) * 117, 760 + Math.floor(i / 8) * 92]);
const OTRAS = [11, 30, 44];

function CervezaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, M: CUES.Mosto, B: CUES.Burbujas, Ge: CUES.Gemacion, H: CUES.Hibrido, Ce: CUES.Cerevisiae, P: CUES.Pregunta, E: CUES.Estudio,
    Gn: CUES.Genoma, F: CUES.Frio, Ti: CUES.Tibet, Mu: CUES.Mundo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const fusion = kprog(T, K.G + 2.4, K.G + 3.6, kEase.suave);
  // escena de la célula (Burbujas + Gemación + Híbrido): una cámara continua que entra al núcleo
  const zNuc = kprog(T, K.H - 0.2, K.H + 1.0, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el vaso; dos células se funden en una */}
      <Escena T={T} a={K.G} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Vaso T={T} x={330} y={1180} s={1.15} />
          <g transform={`translate(${klerp(700, 790, fusion)} 1010)`} opacity={kprog(T, K.G + 1.4, K.G + 1.8)}><Levadura x={0} y={0} r={58} color={CV.azul2} nucleo={false} /></g>
          <g transform={`translate(${klerp(950, 860, fusion)} 1010)`} opacity={kprog(T, K.G + 1.6, K.G + 2.0) * (1 - kprog(T, K.G + 3.3, K.G + 3.6))}><Levadura x={0} y={0} r={58} color={CV.verde2} nucleo={false} /></g>
          {fusion > 0.85 && <Levadura x={825} y={1010} r={80} color={CV.cel} mezcla={kprog(T, K.G + 3.5, K.G + 3.9)} />}
        </>)}
      </Escena>
      {/* 2 · la malta suelta azúcares; la levadura se los come */}
      <Escena T={T} a={K.M} b={K.B} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Vaso T={T} x={540} y={1200} s={1.25} burb={0.4} />
          {[[200, 640, -20], [330, 600, 10], [760, 620, 25], [880, 660, -10]].map(([gx, gy, ro], i) => <Grano key={i} x={gx} y={gy} rot={ro} s={1.1} abre={kprog(T, K.M + 0.2 + i * 0.15, K.M + 0.7 + i * 0.15)} />)}
          {Array.from({ length: 8 }, (_, i) => { const t0 = K.M + 0.5 + i * 0.18, u = kprog(T, t0, t0 + 1.2, kEase.suave), comido = kprog(T, K.M + 1.9 + i * 0.12, K.M + 2.2 + i * 0.12);
            const sx = [200, 330, 760, 880][i % 4], ex = 470 + (i % 4) * 45 + (i > 3 ? 20 : 0), ey = 860 + Math.floor(i / 4) * 120;
            return u > 0 ? <Azucar key={i} x={klerp(sx, ex, u)} y={klerp(650, ey, u)} n={i % 3 === 0 ? 3 : 2} s={0.8} color={KC.ink} o={1 - comido} rot={u * 90} /> : null; })}
          {[[470, 910], [610, 1030]].map(([lx, ly], i) => <Levadura key={i} x={lx} y={ly + Math.sin(T * 2 + i) * 6} r={42 * kprog(T, K.M + 1.2 + i * 0.2, K.M + 1.6 + i * 0.2, kEase.rebote)} />)}
        </>)}
      </Escena>
      {/* 3–5 · por dentro de una levadura (fondo oscuro): fermentación, gemación y el núcleo híbrido */}
      <Escena T={T} a={K.B} b={K.Ce} zoom={0}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<g>
          <g transform={`translate(${klerp(500, 617, zNuc)} ${klerp(980, 897, zNuc)}) scale(${klerp(1, 3.2, zNuc)})`} opacity={1 - kprog(T, K.H + 0.7, K.H + 1.0)}>
            <Levadura T={T} x={0} y={0} r={240} yema={kprog(T, K.Ge + 0.1, K.Ge + 1.2)} suelta={kprog(T, K.Ge + 1.2, K.Ge + 1.9, kEase.suave)} />
          </g>
          {/* azúcar que entra y se parte en alcohol + CO₂ */}
          {T < K.Ge + 0.2 && (() => { const u = kprog(T, K.B + 0.2, K.B + 1.0, kEase.suave), sp = kprog(T, K.B + 1.0, K.B + 1.4);
            return <g opacity={1 - kprog(T, K.Ge, K.Ge + 0.2)}>
              {sp < 1 && <Azucar x={klerp(80, 470, u)} y={980} n={1} s={1.4} o={1 - sp} />}
              {sp > 0 && [0, 1].map((j) => { const v = kprog(T, K.B + 1.2 + j * 0.2, K.B + 3.2, kEase.suave);
                return <g key={j}>
                  <g transform={`translate(${klerp(480, 900, v)} ${klerp(1000, 1040 + j * 70, v)})`}><circle r={16} fill={KC.lilac} stroke={KC.ink} strokeWidth={3} /><circle cx={22} r={12} fill={KC.lilac} stroke={KC.ink} strokeWidth={3} /><circle cx={-18} cy={-8} r={8} fill="#fff" stroke={KC.ink} strokeWidth={2} /></g>
                  <circle cx={klerp(470, 420 + j * 180, v)} cy={klerp(960, 700, v)} r={28 + v * 22} fill="rgba(255,255,255,.3)" stroke="#fff" strokeWidth={6} />
                </g>; })}
            </g>; })()}
          {/* núcleo: cromosomas de dos especies */}
          {zNuc > 0.6 && <g opacity={kprog(T, K.H + 0.6, K.H + 1.0)} transform="translate(540 960)">
            <circle r={280} fill="#3a2f12" stroke={CV.nucleo} strokeWidth={10} />
            {CROMOS.map(([cx, cy, ro, col], i) => { const pin = kprog(T, K.H + 1.2 + i * 0.1, K.H + 1.5 + i * 0.1);
              const vuela = col === CV.azul ? kprog(T, K.Ce - 0.3 + (i % 7) * 0.05, K.Ce + 0.4 + (i % 7) * 0.05, kEase.suave) : 0;
              return <Cromo key={i} x={cx + vuela * 500} y={cy + vuela * 200} rot={ro + T * 10} s={1.1} color={mixHex('#cfc6b0', col, pin)} />; })}
          </g>}
        </g>)}
      </Escena>
      {/* 6 · una es S. cerevisiae, la del pan */}
      <Escena T={T} a={K.Ce} b={K.P} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <Pan x={360} y={1150} s={1.15} infla={kprog(T, K.Ce + 0.5, K.Ce + 2.2, kEase.sale)} />
          {Array.from({ length: 7 }, (_, i) => { const u = kprog(T, K.Ce + 0.05 + i * 0.06, K.Ce + 0.7 + i * 0.06, kEase.suave);
            return <Cromo key={i} x={klerp(900 - i * 20, 300 + (i % 4) * 40, u)} y={klerp(820 + i * 30, 1060 - Math.floor(i / 4) * 40, u)} s={0.8 * (1 - kprog(T, K.Ce + 0.8, K.Ce + 1.2))} rot={i * 30} color={CV.azul} />; })}
          <Levadura x={800} y={1050} r={70} color={CV.azul2} />
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿y la otra? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {[[200, 1100], [330, 1150], [260, 1010]].map(([cx, cy], i) => <Cromo key={i} x={cx} y={cy} s={1.6} rot={i * 50 + Math.sin(T * 3) * 10} color={CV.verde} />)}
          <Interrogacion T={T} x={290} y={900} tam={360} />
        </>)}
      </Escena>
      {/* 8 · 2011: Patagonia, bosques de Nothofagus */}
      <Escena T={T} a={K.E} b={K.Gn} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.E + 2.7, K.E + 3.1)}>
            <MapaMundo x={-298} y={122} s={2.2} puntos={[[260, 450, KC.red, 18, kprog(T, K.E + 0.6, K.E + 1.0)]]} />
          </g>
          <g opacity={kprog(T, K.E + 2.8, K.E + 3.2)}>
            <rect x={0} y={1180} width={1080} height={120} fill={CV.suelo} />
            <Nothofagus T={T} x={300} y={1200} s={1.1} cyttaria={kprog(T, K.E + 3.6, K.E + 4.6)} seed={2} />
            <Nothofagus T={T} x={790} y={1210} s={1.0} cyttaria={kprog(T, K.E + 3.8, K.E + 4.8)} seed={5} />
            {[[262, 1090], [325, 1010], [770, 1120], [180, 1230], [860, 1240]].map(([lx, ly], i) => { const k = kprog(T, K.E + 4.6 + i * 0.15, K.E + 5.0 + i * 0.15, kEase.rebote);
              return k > 0 ? <Levadura key={i} x={lx} y={ly} r={18 * k} color={CV.verde2} nucleo={false} /> : null; })}
          </g>
        </>)}
      </Escena>
      {/* 9 · el genoma: 99.5 % */}
      <Escena T={T} a={K.Gn} b={K.F} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <TiraADN x={110} y={900} p={kprog(T, K.Gn + 0.4, K.Gn + 2.2)} color={CV.verde} seed={9} />
          <TiraADN x={110} y={1080} p={kprog(T, K.Gn + 0.8, K.Gn + 2.6)} color={CV.cerveza} seed={9} distintas={T > K.Gn + 3.0 ? [27] : []} />
          {(() => { const u = kprog(T, K.Gn + 2.8, K.Gn + 4.6); return u > 0 && u < 1 ? <rect x={100 + u * 880} y={830} width={10} height={320} rx={5} fill="#fff" opacity=".85" /> : null; })()}
          {Array.from({ length: 40 }, (_, i) => { const on = T > K.Gn + 2.8 + i * 0.045; return on ? <text key={i} x={110 + i * 21.5 + 10.75} y={1000} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={i === 27 ? KC.red : KC.mint}>{i === 27 ? '≠' : '='}</text> : null; })}
        </>)}
      </Escena>
      {/* 10 · el frío y el azúcar: dos aportes, una célula */}
      <Escena T={T} a={K.F} b={K.Ti} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {(() => { const jn = kprog(T, K.F + 4.4, K.F + 5.4, kEase.suave); return <>
            <g opacity={1 - kprog(T, K.F + 5.2, K.F + 5.5)}>
              <Levadura T={T} x={klerp(270, 520, jn)} y={980} r={110} color={CV.verde2} bufanda={kprog(T, K.F + 0.3, K.F + 0.8)} />
              <Levadura T={T} x={klerp(810, 560, jn)} y={980} r={110} color={CV.azul2} />
            </g>
            {/* maltotriosa: la verde la rechaza, la azul se la come */}
            {(() => { const a = kprog(T, K.F + 2.0, K.F + 2.8, kEase.suave), b = kprog(T, K.F + 2.9, K.F + 3.6, kEase.suave), c = kprog(T, K.F + 3.6, K.F + 3.9);
              return c < 1 && a > 0 ? <Azucar x={klerp(klerp(470, 390, a), 700, b)} y={klerp(780, 900, a) - Math.sin(b * Math.PI) * 120} n={3} s={1.1} color={KC.ink} o={1 - c} /> : null; })()}
            {T > K.F + 2.8 && T < K.F + 3.5 && <text x={300} y={820} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.red} stroke={KC.ink} strokeWidth={4}>✗</text>}
            {T > K.F + 5.2 && <Levadura T={T} x={540} y={980} r={150 * kprog(T, K.F + 5.2, K.F + 5.6, kEase.rebote)} color={CV.cel} mezcla={1} />}
            <Termometro x={100} y={1150} s={0.75} nivel={klerp(0.75, 0.32, kprog(T, K.F + 0.2, K.F + 1.4))} />
          </>; })()}
        </>)}
      </Escena>
      {/* 11 · el pariente más parecido: Tíbet (y en 2022, Irlanda) */}
      <Escena T={T} a={K.Ti} b={K.Mu} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <MapaMundo x={60} y={640} s={1.1} puntos={[[260, 450, KC.red, 18, kprog(T, K.Ti + 0.3, K.Ti + 0.7)], [680, 140, KC.gold2, 24, kprog(T, K.Ti + 0.9, K.Ti + 1.3)], [418, 72, KC.mint, 13, kprog(T, K.Ti + 3.0, K.Ti + 3.4)]]} />
          {(() => { const gx = 130, gy = 1060, a = kprog(T, K.Ti + 1.4, K.Ti + 2.2, kEase.sale), b = kprog(T, K.Ti + 1.8, K.Ti + 2.6, kEase.sale);
            const P1 = [60 + 680 * 1.1, 640 + 140 * 1.1], P2 = [60 + 260 * 1.1, 640 + 450 * 1.1];
            return <>
              {a > 0 && <line x1={gx} y1={gy - 60} x2={klerp(gx, P1[0], a)} y2={klerp(gy - 60, P1[1], a)} stroke={KC.gold} strokeWidth={14} strokeLinecap="round" />}
              {b > 0 && <line x1={gx} y1={gy - 60} x2={klerp(gx, P2[0], b)} y2={klerp(gy - 60, P2[1], b)} stroke={KC.ink} strokeWidth={5} strokeDasharray="14 12" />}
            </>; })()}
          <Levadura x={130} y={1000} r={56} color={CV.cel} mezcla={1} />
        </>)}
      </Escena>
      {/* 12 · hoy, la gran mayoría de la cerveza del mundo es lager */}
      <Escena T={T} a={K.Mu} b={K.C} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>{VASOS48.map(([vx, vy], i) => { const k = kprog(T, K.Mu + 0.3 + i * 0.03, K.Mu + 0.6 + i * 0.03, kEase.rebote); return k > 0 ? <Vasito key={i} x={vx} y={vy} s={k} color={OTRAS.includes(i) ? CV.ambar : CV.cerveza} /> : null; })}</>)}
      </Escena>
      {/* 13 · cierre: el mismo vaso del inicio, ya "explicado" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Vaso T={T} x={330} y={1180} s={1.15} />
          {(() => { const l = kprog(T, K.C + 0.4, K.C + 1.0, kEase.sale); return l > 0 ? <g transform={`translate(330 960) scale(${l})`}>
            <circle r={120} fill={KC.noche} stroke={KC.white} strokeWidth={12} />
            <Levadura x={0} y={0} r={62} color={CV.cel} mezcla={1} />
            <line x1={86} y1={86} x2={160} y2={160} stroke={KC.ink} strokeWidth={24} strokeLinecap="round" />
          </g> : null; })()}
          <Pan x={790} y={1120} s={0.55} infla={1} />
          {T > K.C + 1.8 && <g transform={`translate(800 1010) scale(${0.5 * kprog(T, K.C + 1.8, K.C + 2.3, kEase.rebote)})`}><Nothofagus T={T} x={0} y={0} s={0.9} cyttaria={1} seed={5} /></g>}
        </>)}
      </Escena>

      {/* textos (nombres científicos en cursiva) */}
      <MitoTachado T={T} at={K.G + 0.15} tacharEn={K.G + 1.4} until={K.M - 0.3} texto="¿una levadura?" x={330} y={530} tam={46} />
      <Chip T={T} at={K.G + 1.9} until={K.M - 0.3} texto="dos, en una sola célula" x={310} y={640} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.G + 0.6} until={K.M - 0.3} x={460} y={900} texto="cerveza lager" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 0.6} until={K.B - 0.3} x={60} y={440} texto="malta (cebada germinada)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.0} until={K.B - 0.3} x={60} y={490} texto="azúcares" tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.5} until={K.B - 0.3} x={650} y={1060} texto="levadura" tam={30} color={KC.ink} />
      <Chip T={T} at={K.B + 0.1} until={K.Ge - 0.2} texto="POR DENTRO · UNA LEVADURA" x={380} y={470} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.B + 0.3} until={K.B + 1.2} x={60} y={860} texto="azúcar" tam={30} />
      <Etq T={T} at={K.B + 1.6} until={K.Ge + 0.1} x={60} y={550} texto="CO₂ = las burbujas" tam={32} color={KC.white} />
      <Etq T={T} at={K.B + 2.0} until={K.Ge + 0.1} x={60} y={605} texto="alcohol (etanol) →" tam={30} color={KC.lilac} />
      <Etq T={T} at={K.Ge + 0.5} until={K.H - 0.2} x={60} y={600} texto="gemación: sale una yema" tam={32} color={KC.gold2} />
      <Chip T={T} at={K.H + 0.4} until={K.Ce - 0.3} texto="híbrido de 2 especies" x={330} y={470} tam={34} borde={KC.gold} />
      <Etq T={T} at={K.H + 0.8} until={K.Ce - 0.3} x={40} y={560} texto="Saccharomyces pastorianus" it tam={32} color={KC.gold2} />
      <Etq T={T} at={K.H + 1.6} until={K.Ce - 0.3} x={40} y={612} texto="● de una especie" tam={28} color={CV.azul2} />
      <Etq T={T} at={K.H + 2.0} until={K.Ce - 0.3} x={40} y={652} texto="● de la otra especie" tam={28} color={CV.verde2} />
      <Etq T={T} at={K.Ce + 0.4} until={K.P - 0.2} x={60} y={600} texto="Saccharomyces cerevisiae" it tam={36} color={KC.ink} />
      <Etq T={T} at={K.Ce + 0.9} until={K.P - 0.2} x={60} y={660} texto="la del pan (y la cerveza ale)" tam={30} color={KC.ink} />
      <Chip T={T} at={K.P + 0.2} until={K.E - 0.2} texto="¿y la otra?" x={300} y={520} tam={48} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.3} until={K.E + 2.7} anio="2011" quien="Argentina · EE. UU. · Portugal" revista="Libkind et al., PNAS 2011 · Patagonia" x={650} y={820} />
      <Etq T={T} at={K.E + 0.8} until={K.E + 2.7} x={300} y={1150} texto="Patagonia, Argentina" tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 3.2} until={K.Gn - 0.3} x={40} y={420} texto="Nothofagus · hayas del sur" it tam={32} color={KC.ink} />
      <Etq T={T} at={K.E + 4.2} until={K.Gn - 0.3} x={40} y={470} texto="hongos Cyttaria en las ramas" it tam={28} color="#8a3a06" />
      <Etq T={T} at={K.E + 4.9} until={K.Gn - 0.3} x={40} y={520} texto="levaduras en corteza y suelo" tam={28} color={KC.ink} />
      <NumeroGigante T={T} at={K.Gn + 3.0} until={K.F - 0.3} valor={99.5} dec={1} dur={1.2} sufijo=" %" etiqueta="idéntico" x={340} y={600} tam={150} color={CV.verde} />
      <Etq T={T} at={K.Gn + 0.5} until={K.F - 0.3} x={100} y={820} texto="Saccharomyces eubayanus (silvestre)" it tam={28} color={CV.verde2} />
      <Etq T={T} at={K.Gn + 0.9} until={K.F - 0.3} x={100} y={1160} texto="la otra parte de la lager" tam={28} color={CV.cerveza2} />
      <Etq T={T} at={K.Gn + 4.0} until={K.F - 0.3} x={100} y={1220} texto="borrador de su genoma · 2011" tam={24} color={KC.texto} />
      <Etq T={T} at={K.F + 0.6} until={K.F + 4.4} x={180} y={1130} texto="aguanta el frío" tam={28} color={KC.ink} />
      <Etq T={T} at={K.F + 3.0} until={K.F + 4.4} x={690} y={1130} texto="come maltotriosa" tam={28} color={KC.ink} />
      <Chip T={T} at={K.F + 5.4} until={K.Ti - 0.3} texto="10–15 °C · fermentación lager" x={380} y={560} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Ti + 0.5} until={K.Mu - 0.3} x={380} y={1135} texto="Patagonia" tam={26} color={KC.red} />
      <Etq T={T} at={K.Ti + 1.1} until={K.Mu - 0.3} x={560} y={900} texto="Tíbet: más parecida" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ti + 3.0} until={K.Mu - 0.3} texto="en 2022, también en Irlanda" x={340} y={470} tam={28} borde={KC.mint} />
      <Chip T={T} at={K.Ti + 3.6} until={K.Mu - 0.3} texto="su historia aún se investiga" x={340} y={555} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.Mu + 0.8} until={K.C - 0.3} texto="la gran mayoría del mercado mundial" x={540} y={520} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Mu + 1.8} until={K.C - 0.3} x={110} y={612} texto="dorado: lager · ámbar: otras (esquemático)" tam={26} color={KC.ink} />
      <Chip T={T} at={K.C + 1.2} until={K.Ou} texto="la hicieron dos" x={330} y={560} tam={44} borde={KC.ink} />
      <Etq T={T} at={K.C + 1.6} until={K.Ou} x={690} y={1080} texto="del pan" lado="izq" tam={26} color={KC.ink} />
      <Etq T={T} at={K.C + 2.3} until={K.Ou} x={700} y={880} texto="salvaje" lado="izq" tam={26} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.M} texto="5 cm" largo={110} y={1480} />
      <BarraEscala T={T} at={K.M} until={K.B} texto="5 cm" largo={120} y={1480} />
      <BarraEscala T={T} at={K.B} until={K.H + 0.5} texto="5 µm" largo={300} y={1480} />
      <BarraEscala T={T} at={K.H + 0.5} until={K.Ce} texto="1 µm (esquemático)" largo={200} y={1480} />
      <BarraEscala T={T} at={K.Ce} until={K.P} texto="5 cm" largo={120} y={1480} />
      <BarraEscala T={T} at={K.E} until={K.E + 3.0} texto="mapa esquemático" largo={0} y={1480} />
      <BarraEscala T={T} at={K.E + 3.0} until={K.Gn} texto="5 m" largo={160} y={1480} />
      <BarraEscala T={T} at={K.Gn} until={K.F} texto="2 nm (ancho del ADN, esquemático)" largo={40} y={1480} />
      <BarraEscala T={T} at={K.F} until={K.Ti} texto="5 µm" largo={200} y={1480} />
      <BarraEscala T={T} at={K.Ti} until={K.Mu} texto="mapa esquemático" largo={0} y={1480} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1480} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.M - 0.1} texto="No la hizo una levadura: *la hicieron dos.*" />
      <Subtitulo T={T} idx={1} at={K.M + 0.1} until={K.B - 0.1} texto="La levadura se come *los azúcares.*" />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.Ge - 0.1} texto="Alcohol y CO₂: *las burbujas.*" />
      <Subtitulo T={T} idx={3} at={K.Ge + 0.1} until={K.H - 0.1} texto="Se multiplica *sacando yemas.*" />
      <Subtitulo T={T} idx={4} at={K.H + 0.1} until={K.Ce - 0.1} texto="La de la lager es *un híbrido.*" />
      <Subtitulo T={T} idx={5} at={K.Ce + 0.1} until={K.P - 0.1} texto="Una es *la del pan.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y la otra? *Un misterio.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.Gn - 0.1} texto="2011: hallada *en la Patagonia.*" />
      <Subtitulo T={T} idx={8} at={K.Gn + 0.1} until={K.F - 0.1} texto="Su genoma coincide *99.5 %.*" />
      <Subtitulo T={T} idx={9} at={K.F + 0.1} until={K.Ti - 0.1} texto="Juntas fermentan *en frío.*" />
      <Subtitulo T={T} idx={10} at={K.Ti + 0.1} until={K.Mu - 0.1} texto="Se parece más a *las del Tíbet.*" />
      <Subtitulo T={T} idx={11} at={K.Mu + 0.1} until={K.C - 0.1} texto="La gran mayoría *es de este tipo.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una del pan *y otra salvaje.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.0, 'avatar_11_sorprendido', 'gancho'],
        [K.B + 0.3, K.Ge - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.H + 0.3, K.Ce - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.E + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.E + 3.2, K.Gn - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Gn + 2.0, K.F - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.F + 1.4, K.F + 6.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Ti + 0.8, K.Mu - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.C + 1.0, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="61" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function CervezaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><CervezaShot /></CompositionStage></div>;
}
window.CervezaApp = CervezaApp;
