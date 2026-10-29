// Shot IA #46 · La molécula para la diabetes que una IA convirtió en antibiótico — NARRADO (N3 "Capítulos y medidores" + toque N1).
// Datos: Stokes et al., "A Deep Learning Approach to Antibiotic Discovery", Cell 180(4):688–702 (2020); MIT News (20 feb 2020);
// Liu et al., Nature Chemical Biology 19:1342 (2023). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const ABAU = '#ff6b5a';   // color de Acinetobacter baumannii en pantalla

// Vértices de un pentágono (ángulos en grados, 0 = derecha, positivos hacia arriba).
function pent(cx, cy, r, angs) { return angs.map((a) => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)]); }
// Molécula de halicina (SU3327), fórmula esquemática: 2-amino-1,3,4-tiadiazol — S — 5-nitrotiazol.
// Solo se rotulan los heteroátomos (S, N) y los grupos NH₂ y NO₂, como en una fórmula de esqueleto.
function Halicina({ x, y, s = 1, rot = 0, brillo = 0, T = 0, o = 1 }) {
  const r = 92;
  const L = pent(-170, 20, r, [0, 72, 144, 216, 288]);      // tiadiazol: C5, S1, C2, N3, N4
  const R = pent(170, 20, r, [180, 108, 36, -36, -108]);    // tiazol: C2, S1, C5, C4, N3
  const Sb = [0, -50];
  const lado = (P, i, j, doble) => { const [a, b] = [P[i], P[j]]; const mx = (P.reduce((s, p) => s + p[0], 0)) / 5, my = (P.reduce((s, p) => s + p[1], 0)) / 5;
    const k = 0.2, a2 = [klerp(a[0], mx, k), klerp(a[1], my, k)], b2 = [klerp(b[0], mx, k), klerp(b[1], my, k)];
    return <g key={`${i}${j}`}><line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
      {doble && <line x1={klerp(a2[0], b2[0], 0.15)} y1={klerp(a2[1], b2[1], 0.15)} x2={klerp(a2[0], b2[0], 0.85)} y2={klerp(a2[1], b2[1], 0.85)} stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />}</g>; };
  const atomo = (p, t, c = KC.yellow, key) => <g key={key || t + p[0]}><circle cx={p[0]} cy={p[1]} r={34} fill={c} stroke={KC.ink} strokeWidth={6} />
    <text x={p[0]} y={p[1] + 15} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>{t}</text></g>;
  const grupo = (p, t, c, key) => { const w = t.length * 30 + 30; return <g key={key}><rect x={p[0] - w / 2} y={p[1] - 34} width={w} height={68} rx={24} fill={c} stroke={KC.ink} strokeWidth={6} />
    <text x={p[0]} y={p[1] + 15} textAnchor="middle" style={{ font:`400 44px ${KF.titulo}` }} fill={KC.ink}>{t}</text></g>; };
  const nh2 = [L[2][0] - 90, L[2][1] - 60], no2 = [R[2][0] + 90, R[2][1] - 60];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    {brillo > 0 && <ellipse cx={0} cy={10} rx={430} ry={210} fill={KC.yellow} opacity={0.35 * brillo} />}
    <line x1={L[0][0]} y1={L[0][1]} x2={Sb[0]} y2={Sb[1]} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={R[0][0]} y1={R[0][1]} x2={Sb[0]} y2={Sb[1]} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={L[2][0]} y1={L[2][1]} x2={nh2[0]} y2={nh2[1]} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <line x1={R[2][0]} y1={R[2][1]} x2={no2[0]} y2={no2[1]} stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <polygon points={L.map((p) => p.join(',')).join(' ')} fill="rgba(255,255,255,.55)" />
    <polygon points={R.map((p) => p.join(',')).join(' ')} fill="rgba(255,255,255,.55)" />
    {lado(L, 0, 1)}{lado(L, 1, 2)}{lado(L, 2, 3, true)}{lado(L, 3, 4)}{lado(L, 4, 0, true)}
    {lado(R, 0, 1)}{lado(R, 1, 2)}{lado(R, 2, 3, true)}{lado(R, 3, 4)}{lado(R, 4, 0, true)}
    {atomo(L[1], 'S', KC.yellow, 'ls')}{atomo(L[3], 'N', KC.cyan, 'ln3')}{atomo(L[4], 'N', KC.cyan, 'ln4')}
    {atomo(R[1], 'S', KC.yellow, 'rs')}{atomo(R[4], 'N', KC.cyan, 'rn')}
    {atomo(Sb, 'S', KC.yellow, 'sb')}
    {grupo(nh2, 'NH₂', KC.cyan, 'nh2')}{grupo(no2, 'NO₂', KC.pink, 'no2')}
  </g>;
}
// Abaucina: solo un esquema (otra molécula, distinta a la halicina), dibujada como anillos unidos.
function Abaucina({ x, y, s = 1, T = 0 }) {
  const b = Math.sin(T * 3) * 6;
  const hexa = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos((i * 60 + 30) * Math.PI / 180), cy + r * Math.sin((i * 60 + 30) * Math.PI / 180)].join(',')).join(' ');
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <polygon points={hexa(-120, 0, 62)} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
    <polygon points={hexa(0, -36, 62)} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
    <polygon points={hexa(120, 0, 62)} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Ojo rojo de computadora (dibujo propio, inspirado en la computadora de la película; sin logos).
function OjoRojo({ x, y, s = 1, T = 0, o = 1 }) {
  const lat = 0.85 + 0.15 * Math.sin(T * 3);
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <rect x={-150} y={-190} width={300} height={380} rx={30} fill="#2b2f38" stroke={KC.ink} strokeWidth={8} />
    <circle r={112} fill="#8b929e" stroke={KC.ink} strokeWidth={8} />
    <circle r={90} fill="#120607" />
    <circle r={62 * lat} fill="#b3120c" opacity=".7" />
    <circle r={34 * lat} fill={KC.red} />
    <circle r={12} fill={KC.yellow} />
    <circle cx={-30} cy={-38} r={14} fill="#fff" opacity=".5" />
  </g>;
}
// Ratoncito esquemático (vista de lado).
function Raton({ x, y, s = 1, T = 0, color = '#d9d4cc', mancha }) {
  const b = Math.sin(T * 4 + x) * 4, cola = Math.sin(T * 3 + x) * 14;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d={`M -150 30 q -70 ${-10 + cola} -130 ${30 + cola}`} stroke="#e7a3a3" strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={10} rx={160} ry={95} fill={color} stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={150} cy={-20} rx={80} ry={62} fill={color} stroke={KC.ink} strokeWidth={8} />
    <circle cx={120} cy={-90} r={42} fill="#f2b6b6" stroke={KC.ink} strokeWidth={8} />
    <circle cx={180} cy={-30} r={9} fill={KC.ink} />
    <circle cx={228} cy={-10} r={12} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />
    <line x1={215} y1={-4} x2={262} y2={-20} stroke={KC.ink} strokeWidth={3} /><line x1={215} y1={2} x2={264} y2={8} stroke={KC.ink} strokeWidth={3} />
    <ellipse cx={-70} cy={100} rx={30} ry={14} fill="#f2b6b6" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={80} cy={100} rx={30} ry={14} fill="#f2b6b6" stroke={KC.ink} strokeWidth={5} />
    {mancha}
  </g>;
}
// Membrana de la bacteria por dentro: H⁺ acumulados afuera; "deshacer" (0..1) los iguala adentro y afuera.
function Membrana({ T, deshace = 0, moleculas = 0 }) {
  const r = krng(11), out = [];
  const yM = 760;
  for (let i = 0; i < 46; i++) {
    const x0 = 60 + r() * 960, yAf = 590 + r() * 100, yAd = yM + 110 + r() * 260;
    const cruza = i % 2 === 0 ? kclamp(deshace * 1.2 - (i / 46) * 0.2, 0, 1) : 0;
    const yy = klerp(yAf, yAd, kEase.suave(cruza)) + Math.sin(T * 2 + i) * 8, xx = x0 + Math.cos(T * 1.5 + i) * 8;
    out.push(<g key={i} transform={`translate(${xx} ${yy})`}><circle r={24} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      <text y={9} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>H⁺</text></g>);
  }
  for (let i = 0; i < 6; i++) {   // unos pocos H⁺ adentro desde el principio
    const xx = 120 + i * 170, yy = yM + 150 + (i % 2) * 140;
    out.push(<g key={'d' + i} transform={`translate(${xx} ${yy})`}><circle r={24} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      <text y={9} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>H⁺</text></g>);
  }
  const fosf = Array.from({ length: 28 }, (_, i) => { const xx = 20 + i * 38;
    return <g key={'f' + i}><circle cx={xx} cy={yM - 42} r={15} fill={KC.coral} stroke={KC.ink} strokeWidth={4} /><circle cx={xx} cy={yM + 42} r={15} fill={KC.coral} stroke={KC.ink} strokeWidth={4} />
      <line x1={xx - 5} y1={yM - 28} x2={xx - 5} y2={yM + 28} stroke="#f4d9a8" strokeWidth={4} /><line x1={xx + 5} y1={yM - 28} x2={xx + 5} y2={yM + 28} stroke="#f4d9a8" strokeWidth={4} /></g>; });
  const mols = [180, 540, 900].map((xx, i) => { const p = kclamp(moleculas * 1.4 - i * 0.2, 0, 1);
    return p > 0 && <g key={'m' + i} opacity={p}><Halicina x={xx} y={klerp(400, yM - 4, kEase.sale(p))} s={0.28} /></g>; });
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{fosf}{out}{mols}</svg>;
}
// Pila / batería con nivel 0..1.
function Pila({ T, at, until, nivel, x = 540, y = 330 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop'), v = kclamp(nivel, 0, 1), col = v > 0.5 ? KC.mint : v > 0.2 ? KC.orange : KC.red;
  return <div style={{ position:'absolute', left:x, top:y, zIndex:42, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
    <div style={{ position:'relative', width:300, height:110, border:`8px solid ${KC.texto}`, borderRadius:22, padding:8, boxSizing:'border-box' }}>
      <div style={{ width:`${v * 100}%`, height:'100%', background:col, borderRadius:10, boxShadow:`0 0 24px ${col}` }}></div>
      <div style={{ position:'absolute', right:-26, top:28, width:18, height:38, background:KC.texto, borderRadius:5 }}></div>
    </div>
    <div style={{ font:`700 34px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA, whiteSpace:'nowrap' }}>{v > 0.15 ? 'batería de la bacteria' : '¡se vacía!'}</div>
  </div>;
}
// Calendario de 30 días que se van tachando.
function Calendario({ x, y, dias, s = 1 }) {
  const out = [];
  for (let i = 0; i < 30; i++) { const c = i % 6, f = Math.floor(i / 6), px = c * 100, py = f * 92, on = i < dias;
    out.push(<g key={i} transform={`translate(${px} ${py})`}><rect width={86} height={78} rx={12} fill={on ? '#fff3c4' : '#fffdf6'} stroke={KC.ink} strokeWidth={5} />
      <text x={43} y={50} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{i + 1}</text>
      {on && <path d="M 16 16 L 70 62 M 70 16 L 16 62" stroke={KC.red} strokeWidth={7} strokeLinecap="round" opacity=".8" />}</g>); }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-24} y={-90} width={624} height={570} rx={26} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <rect x={-24} y={-90} width={624} height={70} rx={26} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
    <text x={288} y={-40} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.texto}>30 DÍAS EN EL LABORATORIO</text>
    {out}
  </g>;
}
// Frasco de medicina con sello.
function Frasco({ x, y, s = 1, sello = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-250} width={240} height={70} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-150} y={-190} width={300} height={400} rx={40} fill="#f0a35a" stroke={KC.ink} strokeWidth={8} opacity=".95" />
    <rect x={-120} y={-80} width={240} height={180} rx={14} fill="#fffdf6" stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-20} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>HALICINA</text>
    <text x={0} y={40} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#5a524a">ABAUCINA</text>
    {sello > 0 && <g transform={`translate(0 20) rotate(-14) scale(${klerp(2.2, 1, sello)})`} opacity={Math.min(1, sello * 2)}>
      <rect x={-240} y={-64} width={480} height={128} rx={18} fill="rgba(255,240,235,.92)" stroke={KC.red} strokeWidth={10} />
      <text y={-6} textAnchor="middle" style={{ font:`400 52px ${KF.titulo}` }} fill={KC.red}>AÚN NO APROBADA</text>
      <text y={42} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.red}>para personas</text>
    </g>}
  </g>;
}
// Mira de francotirador.
function Mira({ x, y, r = 90, T = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${T * 30})`} opacity={o}>
    <circle r={r} fill="none" stroke={KC.red} strokeWidth={8} /><circle r={r * 0.45} fill="none" stroke={KC.red} strokeWidth={5} />
    {[0, 90, 180, 270].map((a) => <line key={a} x1={r * 0.55} y1={0} x2={r * 1.25} y2={0} stroke={KC.red} strokeWidth={8} transform={`rotate(${a})`} strokeLinecap="round" />)}
  </g>;
}
// Capítulo con número fijo (aparece solo dentro de su tramo).
function Cap({ T, at, until, n, titulo }) {
  if (!kvisible(T, at, until, 0.3)) return null;
  const e = kprog(T, at, at + 0.4, kEase.sale) * (1 - kprog(T, until, until + 0.3));
  return <div style={{ position:'absolute', left:40, top:330, zIndex:44, display:'flex', alignItems:'center', gap:14, opacity:e, transform:`translateX(${(1 - e) * -40}px)` }}>
    <div style={{ width:56, height:56, borderRadius:14, background:KC.gold, color:KC.dark, display:'flex', alignItems:'center', justifyContent:'center', font:`400 40px ${KF.titulo}`, boxShadow:'0 6px 0 rgba(0,0,0,.6)' }}>{n}</div>
    <div style={{ font:`900 34px ${KF.texto}`, color:KC.texto, textShadow:KSOMBRA }}>{titulo}</div>
  </div>;
}
// Brillitos de IA.
function Brillos({ T, x, y, n = 5, r0 = 260, o = 1 }) {
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const a = i * (360 / n) + T * 20, rr = r0 + Math.sin(T * 2 + i) * 20, s = 0.6 + 0.4 * Math.sin(T * 4 + i * 2);
    const px = x + rr * Math.cos(a * Math.PI / 180), py = y + rr * 0.55 * Math.sin(a * Math.PI / 180);
    return <path key={i} d="M 0 -34 Q 6 -6 34 0 Q 6 6 0 34 Q -6 6 -34 0 Q -6 -6 0 -34 Z" transform={`translate(${px} ${py}) scale(${s})`} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />; })}</g>;
}

function HalicinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Aprende, B: CUES.Busca, H: CUES.Halicina, P: CUES.Pregunta, Ba: CUES.Bateria, R: CUES.Ratones, Tr: CUES.Treinta, Ab: CUES.Abaucina, O: CUES.Ojo, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const giro = (t) => Math.sin(t * 1.2) * 8;
  // fichas de entrenamiento (moléculas que frenan o no a E. coli)
  const fichas = Array.from({ length: 10 }, (_, i) => ({ t0: K.A + 0.6 + i * 0.6, si: [1, 0, 0, 1, 0, 1, 0, 0, 1, 0][i] }));
  const r = krng(7), celdas = Array.from({ length: 24 * 26 }, () => r());
  const scan = kprog(T, K.B + 0.3, K.B + 4.2, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la molécula de halicina gira; "para diabetes" se tacha */}
      <Escena T={T} a={K.G} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={kprog(T, K.G, K.G + 0.3)}><Halicina x={420} y={900 + Math.sin(T * 2) * 10} s={klerp(0.6, 0.95, kprog(T, K.G, K.G + 0.6, kEase.rebote))} rot={giro(T)} brillo={kprog(T, K.G + 4.2, K.G + 5)} /></g>
          <Brillos T={T} x={420} y={900} o={kprog(T, K.G + 4.2, K.G + 4.8)} />
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.6} until={K.G + 3.6} texto="para la diabetes" x={330} y={560} tam={50} />
      <Chip T={T} at={K.G + 4.0} until={K.A - 0.2} texto="IA: «mata bacterias»" x={330} y={540} tam={44} borde={KC.violet} fondo={KC.violet} />
      <Chip T={T} at={K.G + 4.6} until={K.A - 0.2} texto="(predicción)" x={330} y={630} tam={30} borde={KC.texto} />
      {/* 2 · cap. 1: la red aprende con 2,335 moléculas */}
      <Escena T={T} a={K.A} b={K.B}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={260} y={640} ancho={560} alto={480} capas={[4, 6, 6, 4, 1]} onda={((T - K.A) * 0.6) % 1} />
        {svg(<>
          {fichas.map((f, i) => { const p = kprog(T, f.t0, f.t0 + 0.55, kEase.sale), q = kprog(T, f.t0 + 0.55, f.t0 + 0.8); if (p <= 0 || q >= 1) return null;
            return <g key={i} opacity={1 - q}><Halicina x={klerp(-120, 200, p)} y={880 + ((i % 3) - 1) * 130} s={0.16} rot={i * 40} />
              <text x={klerp(-120, 200, p)} y={880 + ((i % 3) - 1) * 130 - 50} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={f.si ? KC.mint : KC.red} stroke={KC.ink} strokeWidth={3}>{f.si ? '✔' : '✘'}</text></g>; })}
          <Bacteria x={930} y={880} s={1.3} T={T} color={KC.cyan} vida={T > K.A + 3 ? 0.55 + 0.45 * Math.cos((T - K.A) * 2) ** 2 : 1} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.A + 0.6} until={K.B - 0.2} valor={2335} dur={4.5} x={330} y={470} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.A + 1.0} until={K.B - 0.2} texto="moléculas para aprender" x={330} y={570} tam={30} borde={KC.cyan} />
      <Etq T={T} at={K.A + 2.2} until={K.B - 0.2} x={930} y={980} texto="Escherichia coli" it lado="izq" tam={34} />
      <Chip T={T} at={K.A + 3.4} until={K.B - 0.2} texto="✔ la frena   ✘ no la frena" x={540} y={1150} tam={34} borde={KC.texto} />
      {/* 3 · cap. 2: revisa 6,111 moléculas ya estudiadas */}
      <Escena T={T} a={K.B} b={K.H}>
        <FondoCircuito T={T} color={KC.lilac} />
        {svg(<>
          {celdas.map((v, i) => { const c = i % 24, f = Math.floor(i / 24), px = 72 + c * 39, py = 680 + f * 20; const pasado = f / 26 < scan;
            const oro = v > 0.985 && pasado, elegida = i === 24 * 13 + 11;
            return <rect key={i} x={px} y={py} width={30} height={16} rx={5} fill={elegida && T > K.B + 4.3 ? KC.yellow : oro ? KC.gold : pasado ? '#3b2f66' : '#1d2b4a'} stroke={elegida && T > K.B + 4.3 ? KC.ink : 'none'} strokeWidth={3} />; })}
          <rect x={60} y={680 + scan * 26 * 20 - 6} width={960} height={12} rx={6} fill={KC.cyan} opacity={scan > 0 && scan < 1 ? 0.8 : 0} />
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.B + 0.3} until={K.H - 0.2} valor={6111} dur={3.8} x={330} y={470} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.B + 0.8} until={K.H - 0.2} texto="ya estudiadas para otras enfermedades" x={400} y={590} tam={30} borde={KC.lilac} />
      <Cap T={T} at={K.A + 0.2} until={K.B - 0.1} n={1} titulo="Aprende" /><Cap T={T} at={K.B + 0.2} until={K.H - 0.2} n={2} titulo="Busca" /><Cap T={T} at={K.R + 0.2} until={K.Ab - 0.2} n={3} titulo="La prueba" />
      {/* 4 · la elegida: halicina, por HAL */}
      <Escena T={T} a={K.H} b={K.P}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.H + 1.6, K.H + 2.1)}><OjoRojo x={190} y={640} s={0.6} T={T} /></g>
          <Halicina x={540} y={1020} s={klerp(0.3, 0.8, kprog(T, K.H, K.H + 0.8, kEase.rebote))} rot={giro(T)} brillo={1} />
        </>)}
      </Escena>
      <Chip T={T} at={K.H + 0.4} until={K.P - 0.2} texto="HALICINA" x={470} y={470} tam={70} borde={KC.ink} fondo={KC.ink} color={KC.yellow} />
      <Chip T={T} at={K.H + 2.0} until={K.P - 0.2} texto="por HAL, de «2001: odisea del espacio»" x={620} y={810} tam={30} borde={KC.red} />
      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Ba} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <text x={270} y={1000} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 820)`}>?</text>
          {[0, 1, 2].map((i) => <g key={i}><Bacteria x={180 + i * 120} y={1120 + (i % 2) * 40} rot={i * 25 - 20} s={0.9} T={T} color={ABAU} gen />
            <path d={`M ${180 + i * 120} ${1070 + (i % 2) * 40} l 34 14 v 26 q 0 22 -34 34 q -34 -12 -34 -34 v -26 z`} fill={KC.blue} stroke={KC.ink} strokeWidth={4} opacity=".85" /></g>)}
        </>)}
      </Escena>
      <Chip T={T} at={K.P + 0.4} until={K.Ba - 0.2} texto="resisten a casi todo" x={300} y={480} tam={36} borde={KC.blue} />
      {/* 6 · la batería: por dentro de la bacteria */}
      <Escena T={T} a={K.Ba} b={K.R}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Membrana T={T} deshace={kprog(T, K.Ba + 2.2, K.Ba + 5.4, kEase.suave)} moleculas={kprog(T, K.Ba + 1.0, K.Ba + 2.4)} />
      </Escena>
      <Pila T={T} at={K.Ba + 0.4} until={K.R - 0.2} nivel={1 - kprog(T, K.Ba + 2.2, K.Ba + 5.4, kEase.suave)} x={330} y={400} />
      <Etq T={T} at={K.Ba + 0.6} until={K.R - 0.2} x={30} y={505} texto="afuera: más H⁺ (más ácido)" tam={30} />
      <Etq T={T} at={K.Ba + 0.9} until={K.R - 0.2} x={30} y={1150} texto="adentro de la bacteria" tam={30} />
      <Etq T={T} at={K.Ba + 1.4} until={K.R - 0.2} x={1050} y={830} texto="membrana" lado="izq" tam={28} color={KC.coral} />
      <Chip T={T} at={K.Ba + 2.6} until={K.R - 0.2} texto="esquema" x={960} y={1150} tam={24} borde={KC.texto} />
      {/* 7 · cap. 3: Cell 2020, ratones */}
      <Escena T={T} a={K.R} b={K.Tr}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g opacity={kprog(T, K.R + 2.6, K.R + 3.0)}><Raton x={300} y={740} s={0.9} T={T} mancha={<ellipse cx={-30} cy={-30} rx={44} ry={24} fill={T > K.R + 4.4 ? '#f2b6b6' : '#d65a5a'} stroke={KC.ink} strokeWidth={4} />} /></g>
          <g opacity={kprog(T, K.R + 3.4, K.R + 3.8)}><Raton x={760} y={1010} s={0.8} T={T + 1} color="#c9c3b8" mancha={<circle cx={20} cy={20} r={30} fill="none" stroke={KC.ink} strokeWidth={4} strokeDasharray="8 8" />} /></g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.R + 0.2} until={K.R + 2.5} anio="2020" quien="MIT · Stokes, Barzilay, Collins y col." revista="Cell" y={760} />
      <Etq T={T} at={K.R + 3.0} until={K.Tr - 0.2} x={60} y={880} texto="A. baumannii · herida en la piel" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 3.8} until={K.Tr - 0.2} x={560} y={1010} texto="C. difficile · intestino" lado="izq" tam={30} color={KC.ink} />
      {/* 8 · treinta días sin resistencia */}
      <Escena T={T} a={K.Tr} b={K.Ab}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Calendario x={130} y={660} s={0.92} dias={Math.round(30 * kprog(T, K.Tr + 0.2, K.Tr + 2.4, kEase.suave))} />)}
      </Escena>
      <Chip T={T} at={K.Tr + 0.5} until={K.Ab - 0.2} texto="resistencia de E. coli: ninguna" x={560} y={470} tam={36} borde={KC.red} />
      {/* 9 · abaucina: espectro estrecho */}
      <Escena T={T} a={K.Ab} b={K.O}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          {[[200, 860, ABAU], [430, 920, KC.mint], [720, 840, ABAU], [900, 960, KC.cyan], [300, 1030, KC.mint], [620, 1020, ABAU], [900, 760, KC.mint]].map(([bx, by, c], i) => {
            const es = c === ABAU, golpe = es ? kprog(T, K.Ab + 1.6 + i * 0.12, K.Ab + 2.4 + i * 0.12) : (i === 1 ? 0.2 * kprog(T, K.Ab + 2.2, K.Ab + 2.8) : 0);
            return <Bacteria key={i} x={bx} y={by} rot={i * 37} s={0.95} T={T} seed={i} color={c} vida={1 - golpe * (es ? 0.9 : 1)} />; })}
          <Mira x={klerp(540, 720, kprog(T, K.Ab + 0.6, K.Ab + 1.5, kEase.suave))} y={klerp(950, 840, kprog(T, K.Ab + 0.6, K.Ab + 1.5, kEase.suave))} T={T} o={kprog(T, K.Ab + 0.5, K.Ab + 0.8)} />
          <Abaucina x={250} y={650} s={0.7} T={T} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ab + 0.2} until={K.O - 0.2} texto="2023 · Nature Chemical Biology" x={360} y={470} tam={30} borde={KC.ink} />
      <Etq T={T} at={K.Ab + 0.5} until={K.O - 0.2} x={430} y={650} texto="abaucina (esquema)" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Ab + 2.0} until={K.O - 0.2} texto="espectro estrecho: casi solo A. baumannii" x={540} y={1125} tam={30} borde={ABAU} />
      {/* 10 · ojo: no es medicina aprobada */}
      <Escena T={T} a={K.O} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<Frasco x={540} y={880} s={1.05} sello={kprog(T, K.O + 0.8, K.O + 1.2, kEase.sale)} />)}
      </Escena>
      {/* 11 · cierre: la misma molécula, ahora candidata a antibiótico */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Halicina x={420} y={920 + Math.sin(T * 2) * 10} s={0.95} rot={giro(T)} brillo={1} />
          <Brillos T={T} x={420} y={920} o={kprog(T, K.C + 2.6, K.C + 3.2)} />
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 1.0} until={K.Ou} texto="para la diabetes" x={330} y={560} tam={44} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="¿candidata a antibiótico?" x={400} y={660} tam={42} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="¿Diabetes? Una IA predijo: *mata bacterias.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.B - 0.1} texto="Una red neuronal aprende con *2,335 moléculas.*" />
      <Subtitulo T={T} idx={2} at={K.B + 0.1} until={K.H - 0.1} texto="Luego revisa *6,111 moléculas.*" />
      <Subtitulo T={T} idx={3} at={K.H + 0.1} until={K.P - 0.1} texto="La elegida: *halicina,* por HAL." />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Ba - 0.1} texto="¿Cómo mata a las que *resisten a casi todo?*" />
      <Subtitulo T={T} idx={5} at={K.Ba + 0.1} until={K.R - 0.1} texto="Deshace la *diferencia de acidez:* su batería." />
      <Subtitulo T={T} idx={6} at={K.R + 0.1} until={K.Tr - 0.1} texto="Cell, 2020: *funcionó en ratones.*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.Ab - 0.1} texto="30 días: *E. coli no se hizo resistente.*" />
      <Subtitulo T={T} idx={8} at={K.Ab + 0.1} until={K.O - 0.1} texto="2023: *abaucina,* casi solo contra Acinetobacter." />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.C - 0.1} texto="Ojo: *aún no es medicina* para personas." />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Podría volverse *antibiótico.* La encontró una IA." />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.5, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Aprende + 2.0, CUES.Aprende + 6.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Busca + 1.2, CUES.Halicina - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Halicina + 1.0, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Bateria - 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Bateria + 3.5, CUES.Ratones - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Ratones + 3.0, CUES.Treinta - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Abaucina + 0.5, CUES.Ojo - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Ojo + 0.2, CUES.Cierre - 0.1, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="46" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function HalicinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><HalicinaShot /></CompositionStage></div>;
}
window.HalicinaApp = HalicinaApp;
