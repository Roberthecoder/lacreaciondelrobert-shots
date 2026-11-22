// Shot Ambiental #34 · El limpiapeceras que se comió la pesca de El Infiernillo (pez diablo) — NARRADO (N1 por dentro + toque N2).
// Datos: CONABIO, Biodiversitas 70 (Mendoza et al. 2007) y Cano-Salgado et al. (Ciência Rural, 2021). Ver guion.md y verificacion.md.
// Dibujos esquemáticos; el pleco (Pterygoplichthys) con su morfología real: cuerpo acorazado de placas en filas, vientre plano,
// boca de ventosa abajo, aleta dorsal alta tipo vela, espinas gruesas en las aletas y patrón de manchas.

const PD = { cafe:'#9a7444', cafeO:'#6e4f2a', mancha:'#3a2614', vientre:'#d8bf8f', agua:'#5ec8e8', aguaO:'#2f8fb8', tierra:'#8a5a32', tierraO:'#5e3a1e', alga:'#4caf50', tilapia:'#9fb6c4' };

// Pleco de lado, mirando a la izquierda. Origen ≈ centro del cuerpo. largo ≈ 650 px a s=1.
// boca 0..1 = abre y cierra la ventosa · vela 0..1 = levanta la dorsal · espinas 0..1 = levanta las espinas (defensa).
function Pleco({ x, y, s = 1, flip = false, T = 0, boca = 0, vela = 1, espinas = 0, o = 1, rot = 0, seed = 3 }) {
  const ond = Math.sin(T * 5 + seed) * 6;              // la cola se mece
  const r = krng(seed), manchas = Array.from({ length: 46 }, () => ({ x: 60 + r() * 460, y: -30 + r() * 80, rr: 5 + r() * 7 }));
  const enCuerpo = (m) => { const top = m.x < 80 ? 30 - m.x * 0.6 : m.x < 180 ? -22 - (m.x - 80) * 0.22 : -44 + (m.x - 180) * 0.095; const bot = m.x < 60 ? 50 : 62 - (m.x - 260) * 0.14 * (m.x > 260 ? 1 : 0); return m.y > top + 8 && m.y < bot - 10; };
  const h = 60 + 95 * vela;                              // alto de la vela
  const dorsal = `M 182 -42 L ${176 - 4 * vela} ${-42 - h} Q ${262} ${-50 - h * 1.08} ${345} ${-42 - h * 0.55} L 335 -36 Z`;
  const rayos = Array.from({ length: 11 }, (_, i) => { const u = i / 10; const bx = 182 + u * 153, by = -42 + u * 6; const tx = 176 + u * 169, ty = -42 - h * (1 - 0.45 * u * u) + (u > 0.5 ? 0 : -h * 0.05 * Math.sin(u * Math.PI)); return <line key={i} x1={bx} y1={by} x2={tx} y2={ty} stroke={PD.mancha} strokeWidth={i === 0 ? 7 : 3} strokeLinecap="round" />; });
  const cuerpo = 'M 0 40 Q 6 2 78 -24 Q 128 -42 182 -44 Q 350 -36 545 -12 L 548 22 Q 400 46 262 62 L 62 66 Q 14 64 0 40 Z';
  const placas = [];
  for (let fila = 0; fila < 3; fila++) for (let i = 0; i < 13; i++) {
    const px = 190 + i * 27 + (fila % 2) * 13, top = -44 + (px - 182) * 0.083, bot = 62 - Math.max(0, px - 262) * 0.14;
    const py = top + (bot - top) * (0.22 + fila * 0.26);
    if (px > 530) continue;
    placas.push(<path key={fila + '-' + i} d={`M ${px - 13} ${py} L ${px} ${py - 9} L ${px + 13} ${py} L ${px} ${py + 9} Z`} fill="none" stroke={PD.cafeO} strokeWidth={2.5} opacity={0.9} />);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s}) translate(-300 0)`} opacity={o}>
    {/* aletas de atrás */}
    <path d={`M 545 -12 L 650 ${-78 + ond} Q 622 4 662 ${92 + ond} L 548 22 Z`} fill={PD.cafeO} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M 560 -8 L 640 ${-62 + ond}`} stroke={PD.mancha} strokeWidth={4} /><path d={`M 560 18 L 650 ${78 + ond}`} stroke={PD.mancha} strokeWidth={4} />
    <path d={dorsal} fill={PD.cafeO} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {rayos}
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={200 + i * 17} cy={-42 - h * (0.3 + 0.35 * ((i * 37) % 10) / 10)} r={5} fill={PD.mancha} />)}
    <path d="M 462 -20 L 492 -46 L 500 -18 Z" fill={PD.cafeO} stroke={KC.ink} strokeWidth={4} />
    {/* cuerpo */}
    <path d={cuerpo} fill={PD.cafe} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 70 64 L 262 62 Q 400 46 548 22 L 548 14 Q 400 36 262 50 L 70 54 Z" fill={PD.vientre} opacity={0.8} />
    {placas}
    {manchas.filter(enCuerpo).map((m, i) => <ellipse key={i} cx={m.x} cy={m.y} rx={m.rr} ry={m.rr * 0.75} fill={PD.mancha} opacity={0.85} />)}
    {/* cabeza acorazada con vermiculado */}
    <path d="M 30 20 Q 60 -8 110 -20 M 40 34 Q 80 6 140 -10 M 70 46 Q 110 20 160 6" stroke={PD.mancha} strokeWidth={5} fill="none" strokeLinecap="round" />
    <path d="M 150 -40 Q 160 10 140 60" stroke={KC.ink} strokeWidth={4} fill="none" opacity={0.6} />
    {/* ojo arriba de la cabeza */}
    <ellipse cx={88} cy={-12} rx={13} ry={11} fill="#f2e6c8" stroke={KC.ink} strokeWidth={4} /><circle cx={85} cy={-12} r={6} fill={KC.ink} />
    {/* boca de ventosa abajo + barbillas */}
    <ellipse cx={30} cy={68} rx={30 + 6 * boca} ry={11 + 8 * boca} fill="#c9a777" stroke={KC.ink} strokeWidth={5} />
    <ellipse cx={30} cy={70} rx={12 + 6 * boca} ry={3 + 5 * boca} fill={KC.ink} />
    <path d="M 6 66 q -16 8 -14 22 M 54 70 q 10 10 6 22" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
    {/* aletas de abajo: pectoral con espina gruesa y pélvica */}
    <g transform={`rotate(${espinas * 32} 110 58)`}>
      <path d="M 110 58 L 250 104 Q 200 120 130 86 Z" fill={PD.cafeO} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <line x1={110} y1={58} x2={252} y2={104} stroke={KC.ink} strokeWidth={11} strokeLinecap="round" />
      {[0.3, 0.55, 0.8].map((u) => <circle key={u} cx={110 + 142 * u} cy={58 + 46 * u} r={3.5} fill={KC.paper} />)}
    </g>
    <path d="M 300 60 L 392 92 Q 350 102 312 80 Z" fill={PD.cafeO} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <line x1={300} y1={60} x2={394} y2={92} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
  </g>;
}

// Pecera de sala (div con svg). Algas en el vidrio: limpio 0..1 = cuánto ya raspó.
function Pecera({ x, y, w, h, T, limpio = 0, children, seed = 4 }) {
  const r = krng(seed), algas = Array.from({ length: 26 }, () => ({ x: 30 + r() * (w - 60), y: 40 + r() * (h - 160), rr: 10 + r() * 22 }));
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-14} y={-26} width={w + 28} height={30} rx={8} fill="#2b2f36" stroke={KC.ink} strokeWidth={6} />
    <rect x={0} y={0} width={w} height={h} rx={10} fill={PD.agua} stroke={KC.ink} strokeWidth={8} />
    <rect x={8} y={8} width={w - 16} height={34} fill="#bff0ff" opacity={0.5} />
    {algas.map((a, i) => <circle key={i} cx={a.x} cy={a.y} r={a.rr} fill={PD.alga} opacity={0.55 * (a.x / w > limpio ? 1 : 0)} />)}
    <path d={`M 8 ${h - 60} Q ${w * 0.3} ${h - 80} ${w * 0.6} ${h - 62} Q ${w * 0.85} ${h - 50} ${w - 8} ${h - 70} L ${w - 8} ${h - 8} L 8 ${h - 8} Z`} fill="#d9b779" stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={20 + i * (w - 40) / 13} cy={h - 30 + (i % 3) * 6} r={8} fill={['#b98c5a', '#e0c08c', '#8f6a42'][i % 3]} stroke={KC.ink} strokeWidth={2} />)}
    {[0.12, 0.2].map((u, i) => <path key={i} d={`M ${w * u} ${h - 60} q ${-20 + mece(T, i + 2) * 30} -90 ${10} -200 q 30 60 0 200`} fill="#2fbf6a" stroke={KC.ink} strokeWidth={4} />)}
    {Array.from({ length: 5 }, (_, i) => { const u = ((T * 0.5 + i / 5) % 1); return <circle key={i} cx={w * 0.85 + Math.sin(T * 3 + i) * 8} cy={h - 70 - u * (h - 100)} r={6 + i % 3 * 2} fill="none" stroke="#e8fbff" strokeWidth={3} />; })}
    {children}
  </g>;
}
// Pez nativo esquemático (cíclido) que se acerca y se da la vuelta.
function PezNativo({ x, y, s = 1, flip = false, color = '#ffb347' }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <path d="M -90 0 Q -40 -60 50 -20 L 100 -50 L 95 0 L 100 50 L 50 20 Q -40 60 -90 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    {[-30, 0, 30].map((b) => <line key={b} x1={b} y1={-30} x2={b - 6} y2={30} stroke={KC.ink} strokeWidth={3} opacity={0.4} />)}
    <circle cx={-55} cy={-8} r={9} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={-57} cy={-8} r={4} fill={KC.ink} />
  </g>;
}
function Tilapia({ x, y, s = 1, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -80 0 Q -30 -55 45 -22 L 85 -45 L 80 0 L 85 45 L 45 22 Q -30 55 -80 0 Z" fill={PD.tilapia} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M -30 -38 Q 10 -60 40 -24" stroke={KC.ink} strokeWidth={4} fill="#7f98a8" />
    <circle cx={-50} cy={-6} r={8} fill="#fff" stroke={KC.ink} strokeWidth={3} /><circle cx={-52} cy={-6} r={4} fill={KC.ink} />
  </g>;
}
function Flecha({ x1, y1, x2, y2, p = 1, color = KC.ink, w = 10 }) {
  const X = klerp(x1, x2, p), Y = klerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return p <= 0 ? null : <g><line x1={x1} y1={y1} x2={X} y2={Y} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray="22 14" />
    <path d="M 0 0 L -34 -20 L -34 20 Z" fill={color} transform={`translate(${X} ${Y}) rotate(${a})`} /></g>;
}
function Costal({ x, y, texto, color = '#e9d7a8', tacha = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -110 -150 Q -130 0 -120 120 Q 0 140 120 120 Q 130 0 110 -150 Q 0 -170 -110 -150 Z" fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -110 -150 Q 0 -120 110 -150" stroke={KC.ink} strokeWidth={5} fill="none" />
    {texto.split('\n').map((t, i) => <text key={i} x={0} y={-20 + i * 46} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.ink}>{t}</text>)}
    {tacha > 0 && <path d={`M -120 -140 L ${-120 + 240 * tacha} ${-140 + 260 * tacha}`} stroke={KC.red} strokeWidth={16} strokeLinecap="round" />}
  </g>;
}

function PezDiabloShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, O: CUES.Origen, S: CUES.Suelta, A: CUES.Armadura, Ai: CUES.Aire, P: CUES.Pregunta, I: CUES.Infiernillo, R: CUES.Redes, Tu: CUES.Tuneles, H: CUES.Harina, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const raspa = (t0) => 0.5 + 0.5 * Math.sin((T - t0) * 9);

  // gancho: el pleco recorre el fondo de la pecera raspando algas
  const avG = kprog(T, K.G, K.O, kEase.suave);
  // suelta: crece hasta 50 cm
  const crece = kprog(T, K.S + 0.2, K.S + 1.6, kEase.sale);
  // redes: de 10 peces, 7–8 se vuelven plecos; la red se rasga
  const redSube = kprog(T, K.R + 0.2, K.R + 1.4, kEase.sale), cambia = kprog(T, K.R + 1.6, K.R + 4.0), rasga = kprog(T, K.R + 5.0, K.R + 6.2, kEase.sale);
  // túneles
  const cava = kprog(T, K.Tu + 0.3, K.Tu + 2.4, kEase.suave), derrumbe = kprog(T, K.Tu + 2.8, K.Tu + 3.8, kEase.entra || ((p) => p * p));
  // cierre
  const giro = kprog(T, K.C + 1.6, K.C + 2.4, kEase.sale);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la pecera de sala y el "limpiapeceras" */}
      <Escena T={T} a={K.G} b={K.O}>
        <FondoLunares color={KC.cyan} />
        {svg(<Pecera x={70} y={760} w={940} h={400} T={T} limpio={0.15 + avG * 0.7}>
          <Pleco x={klerp(250, 760, avG)} y={275} s={0.42} T={T} boca={raspa(K.G)} flip={false} />
        </Pecera>)}
      </Escena>
      {/* 2 · origen: el pleco con su morfología, del Amazonas */}
      <Escena T={T} a={K.O} b={K.S}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g transform="translate(70 360)">
            <path d="M 60 0 Q 150 -10 200 40 Q 240 90 210 150 Q 190 220 140 300 Q 110 330 100 280 Q 80 200 40 150 Q 0 100 20 50 Q 30 10 60 0 Z" fill="#ffe9a8" stroke={KC.ink} strokeWidth={5} />
            <path d="M 40 70 Q 100 60 150 85 Q 180 95 210 80" stroke="#2f8fd8" strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={130} cy={82} r={42} fill="none" stroke={KC.red} strokeWidth={5} strokeDasharray="10 7" />
            <text x={125} y={355} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>Amazonas</text>
          </g>
          <Pleco x={560} y={900} s={1.2} T={T} boca={raspa(K.O) * 0.5} />
        </>)}
      </Escena>
      {/* 3 · suelta: crece a medio metro; escapa de granjas o lo sueltan */}
      <Escena T={T} a={K.S} b={K.A}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Pecera x={260} y={420} w={420} h={250} T={T} seed={7}>
            <Pleco x={210 + crece * 40} y={150} s={klerp(0.3, 0.95, crece)} T={T} />
          </Pecera>
          <g transform="translate(130 760)" opacity={kprog(T, K.S + 0.3, K.S + 0.8)}>
            <rect x={0} y={0} width={klerp(240, 640, crece)} height={44} fill="#fff6d0" stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 11 }, (_, i) => <line key={i} x1={i * klerp(240, 640, crece) / 10} y1={0} x2={i * klerp(240, 640, crece) / 10} y2={i % 5 === 0 ? 30 : 18} stroke={KC.ink} strokeWidth={3} />)}
            <text x={klerp(240, 640, crece) + 20} y={36} style={{ font:`400 54px ${KF.titulo}` }} fill={KC.ink}>{kformato(klerp(10, 50, crece))} cm</text>
          </g>
          {/* río */}
          <path d="M 0 1110 Q 270 1060 540 1110 T 1080 1100 L 1080 1200 Q 800 1160 540 1200 T 0 1190 Z" fill={PD.aguaO} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.S + 1.6, K.S + 2.0)} />
          <g opacity={kprog(T, K.S + 1.8, K.S + 2.2)} transform="translate(170 950)">
            {[0, 1].map((i) => <rect key={i} x={-110 + i * 120} y={-40} width={100} height={60} rx={10} fill={PD.agua} stroke={KC.ink} strokeWidth={5} />)}
            <text x={0} y={-60} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>granja de ornato</text>
          </g>
          <Flecha x1={220} y1={990} x2={330} y2={1110} p={kprog(T, K.S + 2.2, K.S + 2.8)} />
          <g opacity={kprog(T, K.S + 2.8, K.S + 3.2)} transform={`translate(880 950) rotate(${kprog(T, K.S + 3.2, K.S + 3.8) * 40})`}>
            <path d="M -60 -60 L 60 -60 L 45 50 L -45 50 Z" fill="#ff6b5a" stroke={KC.ink} strokeWidth={6} />
            <path d="M -60 -60 Q 0 -130 60 -60" stroke={KC.ink} strokeWidth={5} fill="none" />
          </g>
          <Flecha x1={850} y1={1010} x2={760} y2={1110} p={kprog(T, K.S + 3.4, K.S + 4.0)} />
        </>)}
      </Escena>
      {/* 4 · armadura: placas de hueso y espinas; casi nadie se lo come */}
      <Escena T={T} a={K.A} b={K.Ai}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          <Pleco x={470} y={960} s={1.05} T={T} espinas={kprog(T, K.A + 2.6, K.A + 3.0, kEase.sale)} vela={1} />
          <PezNativo x={klerp(1250, 930, kprog(T, K.A + 1.6, K.A + 2.6, kEase.sale)) + kprog(T, K.A + 3.2, K.A + 4.2) * 400} y={1120} s={0.8} flip={kprog(T, K.A + 3.0, K.A + 3.2) < 0.5 ? false : true} />
        </>)}
      </Escena>
      <Lupa T={T} at={K.A + 0.5} until={K.Ai - 0.25} x={760} y={560} r={170} fx={540} fy={960} tinte={KC.orange} etiqueta="POR DENTRO · PLACAS"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1c140c" />
          {Array.from({ length: 6 }, (_, f) => Array.from({ length: 6 }, (_, i) => { const px = i * 68 + (f % 2) * 34, py = f * 62 + 10; return <path key={f + '-' + i} d={`M ${px - 32} ${py} L ${px} ${py - 30} L ${px + 32} ${py} L ${px} ${py + 30} Z`} fill="#e9dcc0" stroke="#8a6a3f" strokeWidth={4} />; }))}
          {Array.from({ length: 6 }, (_, f) => Array.from({ length: 6 }, (_, i) => <circle key={'s' + f + i} cx={i * 68 + (f % 2) * 34} cy={f * 62 + 10} r={4} fill="#8a6a3f" />))}
        </svg>} />
      {/* 5 · aire: el estómago funciona como pulmón; aguanta cuando el agua se seca (fondo oscuro, esquema) */}
      <Escena T={T} a={K.Ai} b={K.P}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 45% 45%, #13233a 0%, #0d1424 70%)' }}></div>
        {svg(<>
          {(() => { const seca = kprog(T, K.Ai + 3.0, K.Ai + 4.2, kEase.suave); const nivel = klerp(540, 980, seca); const burb = kprog(T, K.Ai + 0.8, K.Ai + 2.2);
            return <>
              <rect x={0} y={nivel} width={KW} height={KH} fill="#1f5d80" opacity={0.55} />
              <line x1={0} y1={nivel} x2={KW} y2={nivel} stroke="#9fe3ff" strokeWidth={5} strokeDasharray="20 12" />
              <path d={`M 0 1060 Q 300 1030 540 1060 T 1080 1050 L 1080 1200 L 0 1200 Z`} fill={mixHex('#3b2a17', '#7a5a35', seca)} stroke={KC.ink} strokeWidth={5} />
              {seca > 0.6 && Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${120 + i * 160} 1080 l 20 30 l -12 30`} stroke={KC.ink} strokeWidth={4} fill="none" opacity={(seca - 0.6) * 2.5} />)}
              <g opacity={0.95}><Pleco x={500} y={klerp(840, 990, seca)} s={0.95} T={T} o={0.35} /></g>
              {/* estómago vascularizado en corte */}
              <g transform={`translate(${430} ${klerp(860, 1010, seca)})`}>
                <ellipse rx={110} ry={42} fill="#ff6b8a" stroke="#ffd0dc" strokeWidth={5} opacity={0.6 + 0.4 * Math.abs(Math.sin(T * 3))} />
                {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-90 + i * 22} ${-30 + (i % 2) * 6} q 10 30 0 58`} stroke="#c2133f" strokeWidth={4} fill="none" />)}
              </g>
              {/* burbuja de aire que baja de la superficie a la boca */}
              {burb > 0 && burb < 1 && seca < 0.1 && <circle cx={klerp(240, 230, burb)} cy={klerp(540, 880, burb)} r={18} fill="none" stroke="#e8fbff" strokeWidth={5} />}
            </>; })()}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.texto} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.I} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <path d="M 0 1000 Q 270 970 540 1000 T 1080 990 L 1080 1200 L 0 1200 Z" fill={PD.aguaO} stroke={KC.ink} strokeWidth={6} />
          <text x={280} y={900} textAnchor="middle" style={{ font:`400 460px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 720)`}>?</text>
          {[0, 1].map((i) => <g key={i} transform={`translate(${160 + i * 260 + Math.sin(T + i) * 10} ${985 + Math.sin(T * 2 + i) * 5})`}><path d="M -80 0 L 80 0 L 55 40 L -55 40 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={0} x2={0} y2={-60} stroke={KC.ink} strokeWidth={5} /></g>)}
        </>)}
      </Escena>
      {/* 7 · El Infiernillo: casi 20 mil toneladas de tilapia y carpa al año (años ochenta) */}
      <Escena T={T} a={K.I} b={K.R}>
        <FondoLunares color={KC.cyan} />
        {svg(<MapaMexico x={110} y={700} ancho={880} conCA={false}>
          {(() => { const [px, py] = mxProy(-101.9, 18.3); const late = 1 + 0.2 * Math.sin(T * 6); return <g>
            <circle cx={px} cy={py} r={34 * late} fill="none" stroke={KC.red} strokeWidth={8} />
            <circle cx={px} cy={py} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
          </g>; })()}
        </MapaMexico>)}
        {svg(<g opacity={kprog(T, K.I + 2.6, K.I + 3.2)}>{Array.from({ length: 6 }, (_, i) => <Tilapia key={i} x={170 + (i % 3) * 120} y={600 - Math.floor(i / 3) * 60} s={0.55} o={kprog(T, K.I + 2.6 + i * 0.12, K.I + 2.9 + i * 0.12)} />)}</g>)}
      </Escena>
      {/* 8 · redes: del 70 al 80 % de la pesca de tilapia ya eran plecos */}
      <Escena T={T} a={K.R} b={K.Tu}>
        <FondoLunares color={KC.teal} />
        {svg(<>
          <path d="M 0 1130 Q 270 1100 540 1130 T 1080 1120 L 1080 1300 L 0 1300 Z" fill={PD.aguaO} opacity={0.8} />
          <g transform={`translate(0 ${(1 - redSube) * 500})`}>
            <path d="M 340 520 Q 640 470 960 520 L 900 1080 Q 650 1130 400 1080 Z" fill="rgba(255,255,255,.12)" stroke={KC.ink} strokeWidth={6} />
            {Array.from({ length: 11 }, (_, i) => <line key={'v' + i} x1={340 + i * 62} y1={510} x2={400 + i * 50} y2={1090} stroke={KC.ink} strokeWidth={2} opacity={0.5} />)}
            {Array.from({ length: 9 }, (_, i) => <line key={'h' + i} x1={340 + i * 7} y1={560 + i * 60} x2={960 - i * 7} y2={560 + i * 60} stroke={KC.ink} strokeWidth={2} opacity={0.5} />)}
            {Array.from({ length: 10 }, (_, i) => { const cx = 470 + (i % 2) * 230, cy = 600 + Math.floor(i / 2) * 95; const esPleco = i < 8 && cambia > (i + 1) / 9;
              return esPleco ? <Pleco key={i} x={cx} y={cy} s={0.3} T={T} seed={i} /> : <Tilapia key={i} x={cx} y={cy} s={0.75} />; })}
            {rasga > 0 && <g>{[[560, 980], [760, 820], [470, 760]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} l ${30 * rasga} ${-24 * rasga} l ${20 * rasga} ${30 * rasga} l ${34 * rasga} ${-20 * rasga}`} stroke={KC.red} strokeWidth={9} fill="none" strokeLinecap="round" />)}</g>}
          </g>
        </>)}
      </Escena>
      {/* 9 · túneles de hasta 1.5 m que erosionan la orilla (corte transversal) */}
      <Escena T={T} a={K.Tu} b={K.H}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <rect x={0} y={620} width={KW} height={600} fill={mixHex(PD.agua, '#a88b5c', derrumbe * 0.6)} />
          <path d={`M 380 620 L 1080 620 L 1080 1220 L 260 1220 Q 300 900 380 620 Z`} fill={PD.tierra} stroke={KC.ink} strokeWidth={7} />
          <rect x={380} y={590} width={700} height={34} fill="#5fae4a" stroke={KC.ink} strokeWidth={5} />
          {/* túneles */}
          {[[330, 760, 0], [300, 900, 0.25]].map(([x0, y0, d], i) => { const p = kclamp((cava - d) / 0.75, 0, 1); return <g key={i}>
            <path d={`M ${x0} ${y0} Q ${x0 + 200 * p} ${y0 + 20 * p} ${x0 + 380 * p} ${y0 + 60 * p}`} stroke={PD.tierraO} strokeWidth={70} fill="none" strokeLinecap="round" />
            {p > 0.6 && <Pleco x={x0 + 300 * p} y={y0 + 40 * p} s={0.22} T={T} flip={true} />}
          </g>; })}
          {/* regla de 1.5 m */}
          <g transform="translate(330 1060)" opacity={kprog(T, K.Tu + 1.6, K.Tu + 2.0)}>
            <line x1={0} y1={0} x2={380} y2={0} stroke={KC.ink} strokeWidth={6} /><line x1={0} y1={-20} x2={0} y2={20} stroke={KC.ink} strokeWidth={6} /><line x1={380} y1={-20} x2={380} y2={20} stroke={KC.ink} strokeWidth={6} />
            <text x={190} y={56} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>hasta 1.5 m</text>
          </g>
          {/* pedazo de orilla que se derrumba */}
          <path d="M 380 620 L 520 620 L 470 760 L 340 760 Q 360 690 380 620 Z" fill={PD.tierra} stroke={KC.ink} strokeWidth={6} transform={`translate(${-derrumbe * 120} ${derrumbe * 380}) rotate(${-derrumbe * 30} 430 690)`} />
          {derrumbe > 0 && Array.from({ length: 10 }, (_, i) => <circle key={i} cx={200 + i * 22 + Math.sin(i) * 30} cy={800 + (i % 4) * 60 + derrumbe * 100} r={10 + i % 3 * 6} fill="#a88b5c" opacity={derrumbe * 0.7} />)}
        </>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · lo bueno: su harina sustituyó a la de sardina para criar tilapias (Tabasco, 2021) */}
      <Escena T={T} a={K.H} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <Costal x={760} y={760} texto={'harina\nde sardina'} color="#d6e4ef" tacha={kprog(T, K.H + 2.0, K.H + 2.6, kEase.sale)} s={0.9} />
          <g opacity={kprog(T, K.H + 2.4, K.H + 2.9)} transform={`translate(0 ${(1 - kprog(T, K.H + 2.4, K.H + 3.0, kEase.rebote)) * -300})`}>
            <Costal x={480} y={800} texto={'harina\nde pleco'} color="#e9c98d" s={1} />
          </g>
          {/* crías de tilapia comiendo */}
          {Array.from({ length: 5 }, (_, i) => <Tilapia key={i} x={300 + i * 130 + Math.sin(T * 2 + i) * 12} y={1080 + (i % 2) * 40} s={0.4} o={kprog(T, K.H + 3.4, K.H + 3.8)} />)}
          {Array.from({ length: 12 }, (_, i) => { const u = ((T * 0.6 + i / 12) % 1); return <circle key={'p' + i} cx={280 + i * 55} cy={960 + u * 150} r={7} fill="#c9a26a" stroke={KC.ink} strokeWidth={2} opacity={kprog(T, K.H + 3.4, K.H + 3.8)} />; })}
        </>)}
      </Escena>
      {/* 11 · cierre: la misma pecera, ahora el pleco ya no cabe; no al río: a un acuario */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Pecera x={70} y={790} w={600} h={330} T={T} limpio={1} seed={4}>
            <Pleco x={320} y={200} s={0.95} T={T} boca={raspa(K.C) * 0.4} />
          </Pecera>
          {/* río (tachado) y acuario */}
          <path d="M 700 1010 Q 860 980 1080 1010 L 1080 1080 Q 860 1050 700 1080 Z" fill={PD.aguaO} stroke={KC.ink} strokeWidth={5} opacity={1 - giro * 0.5} />
          <Flecha x1={640} y1={940} x2={840} y2={1000} p={kprog(T, K.C + 0.4, K.C + 1.2) * (1 - giro)} color={KC.ink} />
          {giro > 0 && <g><line x1={720} y1={900} x2={860} y2={1040} stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={giro} /><line x1={860} y1={900} x2={720} y2={1040} stroke={KC.red} strokeWidth={16} strokeLinecap="round" opacity={giro} /></g>}
          <g opacity={giro} transform="translate(850 560)">
            <path d="M -120 0 L 0 -80 L 120 0 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={6} />
            <rect x={-105} y={0} width={210} height={150} fill="#fff" stroke={KC.ink} strokeWidth={6} />
            <rect x={-80} y={40} width={160} height={80} fill={PD.agua} stroke={KC.ink} strokeWidth={4} />
            <text x={0} y={30} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink}>ACUARIO</text>
          </g>
          <Flecha x1={560} y1={760} x2={720} y2={640} p={kprog(T, K.C + 2.2, K.C + 2.8)} color={KC.leaf} w={12} />
        </>)}
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.0} until={K.O - 0.2} texto="limpiapeceras" x={300} y={420} tam={56} />
      <Chip T={T} at={K.G + 2.5} until={K.O - 0.2} texto="pez diablo · invasor" x={300} y={560} tam={40} borde={KC.red} />
      <Chip T={T} at={K.O + 0.3} until={K.S - 0.2} texto="pleco · Loricariidae" x={540} y={1440} tam={34} borde={KC.cafe || KC.gold} />
      <Etq T={T} at={K.O + 0.8} until={K.S - 0.2} x={630} y={690} texto="dorsal alta (vela)" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.O + 1.4} until={K.S - 0.2} x={240} y={1075} texto="boca de ventosa" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.O + 1.8} until={K.S - 0.2} x={600} y={1065} texto="placas de hueso" lado="der" tam={28} color={KC.ink} />
      <Etq T={T} at={K.O + 2.2} until={K.S - 0.2} x={330} y={625} texto="Pterygoplichthys" it lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.S + 2.0} until={K.A - 0.2} texto="escapan de granjas · los sueltan" x={540} y={1440} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.A + 3.2} until={K.Ai - 0.2} texto="pocos depredadores" x={540} y={1440} tam={36} borde={KC.orange} />
      <Etq T={T} at={K.Ai + 0.6} until={K.Ai + 3.0} x={560} y={760} texto="estómago = pulmón" lado="der" tam={30} />
      <Chip T={T} at={K.Ai + 3.4} until={K.P - 0.2} texto="resiste varios días si el agua se seca" x={540} y={1440} tam={30} borde={KC.cyan} />
      <NumeroGigante T={T} at={K.I + 1.6} until={K.R - 0.2} valor={20000} dur={1.8} prefijo="≈" sufijo=" t" etiqueta="tilapia y carpa al año:" x={330} y={430} tam={110} color={KC.yellow} />
      <Etq T={T} at={K.I + 0.6} until={K.R - 0.2} x={500} y={1110} texto="presa El Infiernillo" lado="der" tam={30} color={KC.ink} />
      <Chip T={T} at={K.I + 4.4} until={K.R - 0.2} texto="años 80 · 119 comunidades vivían de esta pesca" x={540} y={1440} tam={26} borde={KC.ink} />
      <NumeroGigante T={T} at={K.R + 1.8} until={K.Tu - 0.2} valor={80} desde={70} dur={2.2} prefijo="70–" sufijo=" %" etiqueta="de la pesca de tilapia:" x={640} y={400} tam={100} color={KC.yellow} />
      <Chip T={T} at={K.R + 2.6} until={K.Tu - 0.2} texto="CONABIO, 2007" x={540} y={1440} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.R + 5.2} until={K.Tu - 0.2} x={980} y={1110} texto="redes dañadas" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Tu + 3.0} until={K.H - 0.2} texto="erosionan las orillas" x={540} y={1440} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.H + 0.4} until={K.C - 0.2} texto="Tabasco · experimento, 2021" x={620} y={440} tam={32} borde={KC.leaf} />
      <Etq T={T} at={K.H + 3.6} until={K.C - 0.2} x={300} y={1020} texto="crías de tilapia" lado="der" tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 2.4} until={K.Ou - 0.1} texto="no lo sueltes" x={540} y={1440} tam={48} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.O - 0.1} texto="No es tu ayudante: *una amenaza para los ríos.*" />
      <Subtitulo T={T} idx={1} at={K.O + 0.1} until={K.S - 0.1} texto="Pez diablo: *bagre acorazado.*" />
      <Subtitulo T={T} idx={2} at={K.S + 0.1} until={K.A - 0.1} texto="Medio metro… *y alguien lo suelta.*" />
      <Subtitulo T={T} idx={3} at={K.A + 0.1} until={K.Ai - 0.1} texto="Placas de hueso: *pocos depredadores.*" />
      <Subtitulo T={T} idx={4} at={K.Ai + 0.1} until={K.P - 0.1} texto="Respira aire *con el estómago.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.I - 0.1} texto="¿Y en una presa *de pescadores?*" />
      <Subtitulo T={T} idx={6} at={K.I + 0.1} until={K.R - 0.1} texto="El Infiernillo: *casi 20 mil toneladas.*" />
      <Subtitulo T={T} idx={7} at={K.R + 0.1} until={K.Tu - 0.1} texto="70 a 80 % *ya eran plecos.*" />
      <Subtitulo T={T} idx={8} at={K.Tu + 0.1} until={K.H - 0.1} texto="Túneles de *metro y medio.*" />
      <Subtitulo T={T} idx={9} at={K.H + 0.1} until={K.C - 0.1} texto="Su harina *sustituyó a la de sardina.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Ya no cabe: *no lo sueltes.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Origen + 0.8, CUES.Suelta - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Armadura + 1.9, CUES.Aire - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Aire + 2.1, CUES.Pregunta - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Infiernillo + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Infiernillo + 3.2, CUES.Redes - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Redes + 2.9, CUES.Tuneles - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Tuneles + 1.2, CUES.Harina - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Harina + 2.2, CUES.Cierre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cierre + 0.8, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'izq-alto']]} />
      <MarcaAgua T={T} tema="biologia" num="34" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PezDiabloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PezDiabloShot /></CompositionStage></div>;
}
window.PezDiabloApp = PezDiabloApp;
