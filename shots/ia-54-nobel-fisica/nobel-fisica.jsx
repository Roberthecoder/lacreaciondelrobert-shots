// Shot IA #54 · Los imanes que le enseñaron a recordar a una máquina (Nobel de Física 2024) — NARRADO (N3 capítulos y medidores).
// Datos: comunicado y "popular information" del Nobel de Física 2024 (nobelprize.org); Hopfield, PNAS 79(8) 1982;
// discurso de Hinton en el banquete Nobel (10 dic 2024). Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// Carita guardada en la red (10 × 10): '#' = pixel negro (flecha abajo), '.' = blanco (flecha arriba).
const CARA = [
  '..........',
  '..######..',
  '.#......#.',
  '#..#..#..#',
  '#........#',
  '#.#....#.#',
  '#..####..#',
  '.#......#.',
  '..######..',
  '..........'];
const negro = (i, j) => CARA[i][j] === '#';
const hash = (i, j, k = 0) => { const s = Math.sin(i * 12.9898 + j * 78.233 + k * 37.719) * 43758.5453; return s - Math.floor(s); };
// Pixeles "rotos" de la carita (25 de 100) y el orden en que la red los arregla.
const ROTOS = (() => { const r = krng(54), idx = Array.from({ length: 100 }, (_, k) => k);
  for (let k = 99; k > 0; k--) { const m = Math.floor(r() * (k + 1)); [idx[k], idx[m]] = [idx[m], idx[k]]; }
  const set = {}; idx.slice(0, 25).forEach((k, o) => { set[k] = o; }); return set; })();

// Rejilla de espines: cada celda una flechita (átomo-imán). ang(i,j) en grados (0 = arriba).
// pix(i,j) 0..1 convierte la celda en pixel: blanco si apunta arriba, negro si apunta abajo.
function Espines({ x, y, tam, n = 10, ang, pix = 0, marco = true, resalta }) {
  const c = tam / n, out = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const a = ang(i, j), pv = typeof pix === 'function' ? pix(i, j) : pix, co = Math.cos(a * Math.PI / 180);
    const col = mixHex(KC.blue, KC.red, (co + 1) / 2), cx = x + j * c + c / 2, cy = y + i * c + c / 2;
    out.push(<g key={`${i}-${j}`}>
      {pv > 0 && <rect x={x + j * c + 1} y={y + i * c + 1} width={c - 2} height={c - 2} fill={co > 0 ? '#ffffff' : KC.ink} opacity={pv} />}
      <g transform={`translate(${cx} ${cy}) rotate(${a})`} opacity={1 - 0.8 * pv}>
        <line x1={0} y1={c * 0.3} x2={0} y2={-c * 0.12} stroke={col} strokeWidth={c * 0.13} strokeLinecap="round" />
        <path d={`M ${-c * 0.2} ${-c * 0.08} L 0 ${-c * 0.36} L ${c * 0.2} ${-c * 0.08} Z`} fill={col} stroke={KC.ink} strokeWidth={2} strokeLinejoin="round" />
      </g>
    </g>);
  }
  return <g>
    {marco && <rect x={x - 18} y={y - 18} width={tam + 36} height={tam + 36} rx={26} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} />}
    {out}
    {resalta && <circle cx={x + resalta[1] * c + c / 2} cy={y + resalta[0] * c + c / 2} r={c * (0.62 + 0.08 * Math.sin(resalta[2] * 6))} fill="none" stroke={KC.gold} strokeWidth={7} />}
  </g>;
}
// Medalla dorada esquemática con un chip de red neuronal grabado.
function Medalla({ x, y, s = 1, T = 0 }) {
  const g = Math.sin(T * 2) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${g}) scale(${s})`}>
    <path d="M -70 -260 L -20 -110 L 20 -110 L 70 -260 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -30 -260 L 0 -150 L 30 -260 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <circle r={130} fill={KC.gold} stroke={KC.ink} strokeWidth={9} />
    <circle r={104} fill={KC.gold2} stroke="#b07a12" strokeWidth={5} />
    {[[-50, -30], [-50, 30], [0, -45], [0, 0], [0, 45], [50, -20], [50, 20]].map(([a, b], k) => <circle key={k} cx={a} cy={b} r={11} fill="#b07a12" />)}
    {[[-50, -30, 0, -45], [-50, -30, 0, 0], [-50, 30, 0, 0], [-50, 30, 0, 45], [0, -45, 50, -20], [0, 0, 50, -20], [0, 0, 50, 20], [0, 45, 50, 20]].map(([a, b, c, d], k) =>
      <line key={k} x1={a} y1={b} x2={c} y2={d} stroke="#b07a12" strokeWidth={5} />)}
    <text y={86} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill="#7a520a">NOBEL</text>
  </g>;
}
// Retrato esquemático (no es una foto): pelo y lentes según la persona.
function Retrato({ x, y, s = 1, pelo = '#e9e6df', lentes = false, barba = false, T = 0 }) {
  const b = Math.sin(T * 2.4 + x) * 3;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -150 230 Q -150 120 0 110 Q 150 120 150 230 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
    <path d="M -40 112 L 0 170 L 40 112 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={92} ry={110} fill="#f1c6a3" stroke={KC.ink} strokeWidth={8} />
    <path d="M -94 -10 Q -100 -110 0 -116 Q 100 -110 94 -10 Q 80 -70 0 -76 Q -80 -70 -94 -10 Z" fill={pelo} stroke={KC.ink} strokeWidth={7} />
    {lentes ? <g fill="none" stroke={KC.ink} strokeWidth={6}><circle cx={-36} cy={0} r={26} /><circle cx={36} cy={0} r={26} /><line x1={-10} y1={0} x2={10} y2={0} /></g>
      : <><circle cx={-34} cy={2} r={8} fill={KC.ink} /><circle cx={34} cy={2} r={8} fill={KC.ink} /></>}
    {lentes && <><circle cx={-36} cy={2} r={7} fill={KC.ink} /><circle cx={36} cy={2} r={7} fill={KC.ink} /></>}
    {barba && <path d="M -70 40 Q 0 130 70 40 Q 40 70 0 72 Q -40 70 -70 40 Z" fill={pelo} stroke={KC.ink} strokeWidth={5} />}
    <path d="M -26 60 Q 0 78 26 60" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>;
}
// Gatito esquemático (ejemplo de entrenamiento).
function Gato({ x, y, s = 1, color = KC.orange }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -46 -10 L -40 -62 L -10 -34 Z M 46 -10 L 40 -62 L 10 -34 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse rx={50} ry={42} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-18} cy={-6} r={6} fill={KC.ink} /><circle cx={18} cy={-6} r={6} fill={KC.ink} />
    <path d="M -6 10 L 6 10 L 0 18 Z" fill={KC.pink} />
    <path d="M -50 14 L -20 16 M -50 26 L -20 22 M 50 14 L 20 16 M 50 26 L 20 22" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Red con N nodos en círculo, todos conectados (Hopfield 1982: 30 nodos → 435 conexiones).
function RedCirculo({ x, y, r, n = 30, o = 1, T = 0, color = KC.violet }) {
  const p = Array.from({ length: n }, (_, k) => [x + r * Math.cos(2 * Math.PI * k / n - Math.PI / 2), y + r * Math.sin(2 * Math.PI * k / n - Math.PI / 2)]), l = [];
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) l.push(<line key={`${a}-${b}`} x1={p[a][0]} y1={p[a][1]} x2={p[b][0]} y2={p[b][1]} stroke={color} strokeOpacity=".35" strokeWidth={Math.max(1, r / 120)} />);
  return <g opacity={o}>{l}{p.map(([a, b], k) => <circle key={k} cx={a} cy={b} r={Math.max(4, r / 13) * (1 + 0.1 * Math.sin(T * 4 + k))} fill={KC.yellow} stroke={KC.ink} strokeWidth={Math.max(2, r / 50)} />)}</g>;
}
// Red gigante (de hoy): miles de líneas que llenan la pantalla.
const GIG = (() => { const r = krng(7), cols = 15, rows = 22, nodos = [];
  for (let c = 0; c < cols; c++) for (let k = 0; k < rows; k++) nodos.push([40 + c * 1000 / (cols - 1), 360 + k * 1180 / (rows - 1) + (r() - 0.5) * 20, c]);
  const lin = []; for (let q = 0; q < 1600; q++) { const a = Math.floor(r() * (nodos.length - rows)), c = nodos[a][2], b = (c + 1) * rows + Math.floor(r() * rows); if (nodos[b]) lin.push([a, b]); }
  return { nodos, lin }; })();
function RedGigante({ o = 1, T = 0 }) {
  return <g opacity={o}>
    {GIG.lin.map(([a, b], k) => <line key={k} x1={GIG.nodos[a][0]} y1={GIG.nodos[a][1]} x2={GIG.nodos[b][0]} y2={GIG.nodos[b][1]} stroke={KC.violet} strokeOpacity={0.12 + 0.18 * Math.max(0, Math.sin(T * 3 - GIG.nodos[a][0] / 120))} strokeWidth={2} />)}
    {GIG.nodos.map(([a, b], k) => <circle key={k} cx={a} cy={b} r={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={2} />)}
  </g>;
}
// Paisaje de energía: montes y valles (Hopfield: la pelota rueda al valle más cercano).
const hy = (x) => 1010 + 90 * Math.cos(2 * Math.PI * (x - 120) / 460);
function Paisaje({ bx, o = 1 }) {
  let d = 'M 40 1200 L 40 ' + hy(40); for (let x = 50; x <= 1040; x += 10) d += ` L ${x} ${hy(x)}`; d += ' L 1040 1200 Z';
  const by = hy(bx) - 34;
  return <g opacity={o}>
    <path d={d} fill={KC.mint} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <circle cx={bx} cy={by} r={30} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
    <circle cx={bx - 9} cy={by - 10} r={8} fill="#fff" opacity=".8" />
  </g>;
}
// Tarjeta de cita (inglés textual + traducción).
function Cita({ T, at, until, texto, trad, quien, y = 900 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:80, right:80, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'24px 34px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ font:`italic 700 36px/1.3 ${KF.mono}`, color:KC.ink }}>{texto}</div>
    <div style={{ font:`900 38px/1.2 ${KF.texto}`, color:KC.red, marginTop:18 }}>{trad}</div>
    <div style={{ font:`700 26px ${KF.mono}`, color:'#5a524a', marginTop:14 }}>{quien}</div>
  </div>;
}

function NobelFisica() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P: CUES.Premio, I: CUES.Imanes, X: CUES.Pixeles, V: CUES.Valle, Q: CUES.Pregunta, B: CUES.Boltzmann, Ta: CUES.Tamano, A: CUES.Aviso, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 1) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const azar = (i, j, vel = 1) => hash(i, j) * 360 + Math.sin(T * (1.5 + hash(i, j, 1) * 2) * vel + hash(i, j, 2) * 6) * 70;

  // 1 · Gancho: flechitas al azar que se alinean (como en un imán).
  const alG = (i, j) => kprog(T, K.G + 1.4 + hash(i, j, 3) * 1.6, K.G + 2.4 + hash(i, j, 3) * 1.6, kEase.suave);
  const angG = (i, j) => klerp(azar(i, j), 360 * Math.round(azar(i, j) / 360), alG(i, j));
  // 3 · Imanes: la alineación se contagia de vecina en vecina desde el centro.
  const angI = (i, j) => { const d = Math.hypot(i - 3.5, j - 3.5), p = kprog(T, K.I + 0.6 + d * 0.38, K.I + 1.2 + d * 0.38, kEase.suave);
    return klerp(azar(i, j), 360 * Math.round(azar(i, j) / 360), p); };
  // 4 · Pixeles: flechitas que ya forman la carita y se vuelven pixeles.
  const angCara = (i, j) => negro(i, j) ? 180 : 0;
  const pixX = kprog(T, K.X + 1.6, K.X + 3.2, kEase.suave);
  // 5 · Valle: guardar la carita, romperla y que la red la recupere pixel por pixel.
  const rotaEn = K.V + 2.9, arreglo0 = K.V + 3.6, arregloD = 4.6;
  const malo = (i, j) => { const o = ROTOS[i * 10 + j]; return o != null && T >= rotaEn && T < arreglo0 + (o + 1) * arregloD / 25; };
  const angV = (i, j) => (negro(i, j) !== malo(i, j)) ? 180 : 0;
  const nMalos = T < rotaEn ? 0 : Object.values(ROTOS).filter((o) => T < arreglo0 + (o + 1) * arregloD / 25).length;
  const energia = T < rotaEn ? klerp(0.9, 0.12, kprog(T, K.V + 0.4, K.V + 2.4, kEase.suave)) : 0.12 + 0.8 * nMalos / 25;
  const bx = T < rotaEn ? 350 : klerp(160, 350, kEase.suave(1 - nMalos / 25));
  // 7 · Boltzmann: gas que se vuelve red (nodos ocultos y visibles).
  const mB = kprog(T, K.B + 2.8, K.B + 4.4, kEase.suave);
  const NODOS = [...Array.from({ length: 6 }, (_, k) => [270 + k * 108, 640]), ...Array.from({ length: 8 }, (_, k) => [190 + k * 100, 900])];
  const bolas = Array.from({ length: 22 }, (_, k) => { const u = T * (0.35 + hash(k, 1) * 0.5), v = T * (0.3 + hash(k, 2) * 0.5);
    const tri = (q) => Math.abs(((q % 2) + 2) % 2 - 1); const gx = 200 + tri(u + hash(k, 3) * 2) * 680, gy = 540 + tri(v + hash(k, 4) * 2) * 520;
    const n = NODOS[k]; return n ? [klerp(gx, n[0], mB), klerp(gy, n[1], mB), 1] : [gx, gy, 1 - mB]; });
  // 8 · Tamaño: red chiquita de 1982 contra la gigante de hoy.
  const zT = kprog(T, K.Ta + 2.9, K.Ta + 3.8, kEase.suave);
  // 10 · Cierre: la misma rejilla del inicio, ahora acomodada como la carita recordada.
  const alC = (i, j) => kprog(T, K.C + 0.5 + hash(i, j, 5) * 1.4, K.C + 1.3 + hash(i, j, 5) * 1.4, kEase.suave);
  const angC = (i, j) => klerp(0, angCara(i, j), alC(i, j));
  const pixC = (i, j) => 0.55 * alC(i, j) * kprog(T, K.C + 2.0, K.C + 3.0);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · Gancho */}
      <Escena T={T} a={K.G} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Espines x={60} y={620} tam={540} ang={angG} />
          <g opacity={kprog(T, K.G + 3.6, K.G + 4.0)} transform={`translate(0 ${-420 * (1 - kprog(T, K.G + 3.6, K.G + 4.3, kEase.rebote))})`}><Medalla x={840} y={950} s={0.95} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 0.9} until={K.P - 0.2} texto="cada flecha = un átomo-imán" x={330} y={530} tam={34} borde={KC.ink} />

      {/* 2 · El premio */}
      <Escena T={T} a={K.P} b={K.I}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <g opacity={kprog(T, K.P + 0.2, K.P + 0.6)}><rect x={70} y={680} width={440} height={500} rx={30} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} /><Retrato x={290} y={860} s={0.85} pelo="#efece6" T={T} /></g>
          <g opacity={kprog(T, K.P + 1.2, K.P + 1.6)}><rect x={570} y={680} width={440} height={500} rx={30} fill="#fffdf6" stroke={KC.ink} strokeWidth={8} /><Retrato x={790} y={860} s={0.85} pelo="#c9c6c0" lentes T={T} /></g>
        </>)}
        <div style={{ position:'absolute', left:70, width:440, top:1080, textAlign:'center', opacity:kprog(T, K.P + 0.4, K.P + 0.8) }}>
          <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink }}>John Hopfield</div>
          <div style={{ font:`700 24px ${KF.mono}`, color:'#5a524a' }}>Princeton, EE. UU.</div></div>
        <div style={{ position:'absolute', left:570, width:440, top:1080, textAlign:'center', opacity:kprog(T, K.P + 1.4, K.P + 1.8) }}>
          <div style={{ font:`900 40px ${KF.texto}`, color:KC.ink }}>Geoffrey Hinton</div>
          <div style={{ font:`700 24px ${KF.mono}`, color:'#5a524a' }}>Toronto, Canadá</div></div>
      </Escena>
      <Chip T={T} at={K.P + 0.1} until={K.I - 0.2} texto="Nobel de Física 2024" x={360} y={480} tam={46} borde={KC.gold} />
      <Chip T={T} at={K.P + 2.2} until={K.I - 0.2} texto="por las redes neuronales artificiales" x={500} y={590} tam={30} borde={KC.ink} />

      {/* 3 · Cap. 1: imanes */}
      <Escena T={T} a={K.I} b={K.X}>
        <FondoLunares color={KC.mint} />
        {svg(<Espines x={110} y={560} tam={560} n={8} ang={angI} resalta={[3, 3, T]} />)}
      </Escena>
      <Chip T={T} at={K.I + 1.4} until={K.X - 0.2} texto="las vecinas se influyen" x={400} y={1200} tam={36} borde={KC.gold} />

      {/* 4 · Cap. 2: pixeles */}
      <Escena T={T} a={K.X} b={K.V}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Espines x={300} y={690} tam={480} ang={angCara} pix={pixX} />
          <g opacity={0.5 * kprog(T, K.X + 2.8, K.X + 3.8)}>{Array.from({ length: 40 }, (_, k) => { const a = Math.floor(hash(k, 9) * 100), b = Math.floor(hash(k, 8) * 100), c = 48;
            return <line key={k} x1={300 + (a % 10) * c + 24} y1={690 + Math.floor(a / 10) * c + 24} x2={300 + (b % 10) * c + 24} y2={690 + Math.floor(b / 10) * c + 24} stroke={KC.gold} strokeWidth={3} />; })}</g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.X + 0.1} until={K.X + 2.6} anio="1982" quien="John Hopfield · Caltech" revista="PNAS" x={700} y={480} />
      <Chip T={T} at={K.X + 2.8} until={K.V - 0.2} texto="↑ blanco · ↓ negro" x={720} y={470} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.X + 3.4} until={K.V - 0.2} texto="todos conectados" x={720} y={560} tam={32} borde={KC.gold} />

      {/* 5 · el valle: memoria */}
      <Escena T={T} a={K.V} b={K.Q}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <Espines x={300} y={510} tam={340} ang={angV} pix={0.9} />
          <g opacity={kprog(T, rotaEn - 0.2, rotaEn + 0.3)}><Paisaje bx={bx} /></g>
        </>)}
      </Escena>
      <Medidor T={T} at={K.V + 0.3} until={K.Q - 0.2} x={90} y={410} ancho={520} etiqueta="energía" color={energia > 0.4 ? KC.red : KC.mint} valor={energia} texto={(v) => v > 0.4 ? 'alta' : 'baja'} />
      <Chip T={T} at={K.V + 1.6} until={rotaEn - 0.1} texto="imagen guardada ✔" x={830} y={700} tam={30} borde={KC.leaf} />
      <Chip T={T} at={rotaEn} until={arreglo0 + arregloD - 0.2} texto="imagen rota" x={830} y={700} tam={32} borde={KC.red} />
      <Chip T={T} at={arreglo0 + arregloD} until={K.Q - 0.2} texto="la recuperó (casi siempre)" x={540} y={1170} tam={32} borde={KC.leaf} />
      <Etq T={T} at={rotaEn + 0.6} until={K.Q - 0.2} x={350} y={1150} texto="valle = memoria" tam={30} color={KC.ink} />

      {/* 6 · pregunta */}
      <Escena T={T} a={K.Q} b={K.B} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>

      {/* 7 · Cap. 3: máquina de Boltzmann (por dentro) */}
      <Escena T={T} a={K.B} b={K.Ta}>
        <FondoCircuito T={T} color={KC.lilac} />
        {svg(<>
          <rect x={170} y={510} width={740} height={580} rx={40} fill="rgba(177,140,255,.10)" stroke={KC.lilac} strokeWidth={8} opacity={1 - mB} />
          <g opacity={mB}>{NODOS.map((a, p) => NODOS.slice(p + 1).map((b, q) => <line key={`${p}-${q}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={KC.cyan} strokeOpacity=".3" strokeWidth={3} />))}</g>
          {bolas.map(([a, b, o], k) => <circle key={k} cx={a} cy={b} r={k < 6 ? 26 : 22} opacity={o} fill={k < 6 ? KC.lilac : KC.yellow} stroke={KC.ink} strokeWidth={5} />)}
          {[0, 1, 2].map((k) => { const t0 = K.B + 5.0 + k * 0.45, p = kprog(T, t0, t0 + 0.7, kEase.sale);
            return <g key={k} opacity={p}><Gato x={klerp(-80, 330 + k * 210, p)} y={1030} s={0.9} color={[KC.orange, KC.paper, KC.gold2][k]} /></g>; })}
        </>)}
      </Escena>
      <Etq T={T} at={K.B + 4.4} until={K.Ta - 0.2} x={870} y={640} texto="ocultos" tam={28} />
      <Etq T={T} at={K.B + 4.6} until={K.Ta - 0.2} x={970} y={900} texto="visibles" tam={28} lado="izq" />
      <Chip T={T} at={K.B + 0.4} until={K.B + 4.3} texto="física estadística" x={400} y={450} tam={38} borde={KC.lilac} />
      <Chip T={T} at={K.B + 1.8} until={K.B + 4.8} texto="distribución de Boltzmann · siglo XIX" x={540} y={1170} tam={32} borde={KC.gold} />
      <Chip T={T} at={K.B + 4.4} until={K.Ta - 0.2} texto="Hinton + Sejnowski · 1985" x={400} y={450} tam={36} borde={KC.gold} />
      <MitoTachado T={T} at={K.B + 5.2} tacharEn={K.B + 6.2} until={K.Ta - 0.2} texto="instrucciones paso a paso" y={1170} tam={36} />

      {/* 8 · tamaño: 1982 contra hoy */}
      <Escena T={T} a={K.Ta} b={K.A}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity={zT}><RedGigante o={1} T={T} /></g>
          <RedCirculo x={klerp(540, 170, zT)} y={klerp(780, 1110, zT)} r={klerp(230, 60, zT)} T={T} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Ta + 0.5} until={K.Ta + 2.9} texto="1982 · 30 nodos" x={540} y={470} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Ta + 1.2} until={K.Ta + 2.9} texto="menos de 500 parámetros" x={540} y={1100} tam={40} borde={KC.gold} />
      <Chip T={T} at={K.Ta + 3.2} until={K.A - 0.2} texto="1982" x={170} y={1010} tam={28} borde={KC.ink} />
      <NumeroGigante T={T} at={K.Ta + 3.4} until={K.A - 0.2} valor={1} dur={0.4} prefijo="+ de " sufijo=" billón" x={480} y={760} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.Ta + 3.9} until={K.A - 0.2} texto="parámetros · un modelo de lenguaje de hoy" x={540} y={900} tam={30} borde={KC.gold} />
      <Chip T={T} at={K.Ta + 4.4} until={K.A - 0.2} texto="1 billón = 1,000,000,000,000" x={600} y={1000} tam={28} mono borde={KC.ink} />

      {/* 9 · el aviso de Hinton */}
      <Escena T={T} a={K.A} b={K.C}>
        <FondoCircuito T={T} color={KC.red} />
      </Escena>
      <Cita T={T} at={K.A + 0.5} until={K.C - 0.2} y={920}
        texto="“…when we create digital beings that are more intelligent than ourselves. We have no idea whether we can stay in control.”"
        trad="Si creamos máquinas más inteligentes que nosotros, no sabemos si podremos mantener el control."
        quien="Geoffrey Hinton · banquete Nobel · 10 dic 2024" />

      {/* 10 · cierre: la misma rejilla, ahora una memoria */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<><Espines x={60} y={620} tam={540} ang={angC} pix={pixC} /><Medalla x={840} y={950} s={0.95} T={T} /></>)}
      </Escena>
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="imanes → memoria ✔" x={330} y={530} tam={40} borde={KC.leaf} />

      <Capitulo T={T} hasta={K.Ta} caps={[{ at: K.I, titulo: 'Imanes' }, { at: K.X, titulo: 'La memoria de Hopfield' }, { at: K.B, titulo: 'La máquina de Boltzmann' }]} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P - 0.1} texto="Átomos que son imanes… *y un Nobel por la IA.*" />
      <Subtitulo T={T} idx={1} at={K.P + 0.1} until={K.I - 0.1} texto="Física 2024: *Hopfield y Hinton.*" />
      <Subtitulo T={T} idx={2} at={K.I + 0.1} until={K.X - 0.1} texto="Cada átomo, una flechita: *las vecinas se influyen.*" />
      <Subtitulo T={T} idx={3} at={K.X + 0.1} until={K.V - 0.1} texto="1982: *de átomos a pixeles.*" />
      <Subtitulo T={T} idx={4} at={K.V + 0.1} until={K.Q - 0.1} texto="La imagen rota *rueda al valle.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.B - 0.1} texto="¿Y si *aprende sola?*" />
      <Subtitulo T={T} idx={6} at={K.B + 0.1} until={K.Ta - 0.1} texto="Física estadística: *aprende con ejemplos.*" />
      <Subtitulo T={T} idx={7} at={K.Ta + 0.1} until={K.A - 0.1} texto="De 500 parámetros *a más de un billón.*" />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.C - 0.1} texto="¿Podremos *mantener el control?*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Imanes que le enseñaron *a recordar.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [K.P + 0.8, K.I - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.I + 0.5, K.X - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.V + 4.4, K.Q - 0.15, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Q + 0.05, K.B + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [K.B + 4.6, K.Ta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Ta + 3.0, K.A - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.A + 0.4, K.C - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="54" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function NobelFisicaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><NobelFisica /></CompositionStage></div>;
}
window.NobelFisicaApp = NobelFisicaApp;
