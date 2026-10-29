// Shot Ambiental #18 · El filtro de tu cigarro no es algodón: es plástico (colillas) — NARRADO (N1 "Por dentro").
// Datos: Ocean Conservancy, informe ICC 2026 (datos 2025); Slaughter et al. 2011, Tobacco Control; WHO FCTC/PNUMA 2022; Fiocruz/WHO FCTC 2025.
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

const ARENA = '#f2d38b', MAR = '#2f8fd8', FIBRA = '#f7f3ea', CAFE = '#b07a3c';

// Fondo de playa: cielo de la marca (con lunares), mar y arena. hMar = y donde empieza el mar.
function Playa({ T, cielo = KC.cyan, hMar = 900 }) {
  const r = krng(18), granos = Array.from({ length: 90 }, () => ({ x: r() * KW, y: hMar + 110 + r() * (KH - hMar - 110), s: 2 + r() * 4 }));
  return <>
    <FondoLunares color={cielo} />
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <rect x={0} y={hMar} width={KW} height={110} fill={MAR} />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${i * 170 - 40 + Math.sin(T * 1.5 + i) * 12} ${hMar + 30 + (i % 2) * 40} q 30 -14 60 0 t 60 0`} stroke="#bfe7ff" strokeWidth={6} fill="none" strokeLinecap="round" />)}
      <path d={`M 0 ${hMar + 110} Q 270 ${hMar + 90 + Math.sin(T * 1.2) * 8} 540 ${hMar + 108} T ${KW} ${hMar + 104} L ${KW} ${KH} L 0 ${KH} Z`} fill={ARENA} stroke={KC.ink} strokeWidth={6} />
      {granos.map((g, i) => <circle key={i} cx={g.x} cy={g.y} r={g.s} fill="#c9a45c" />)}
    </svg>
  </>;
}

// Colilla de cigarro acostada (esquema). Centro en (x, y); largo ≈ 520 px a s = 1.
// abre 0..1 = el papel boquilla se desvanece y deja ver las fibras del filtro · deshilacha 0..1 = fibras que se salen del extremo
// mancha 0..1 = café del humo en la cara del filtro · plastico 0..1 = contorno brillante "esto es plástico".
function Colilla({ x, y, s = 1, rot = 0, abre = 0, deshilacha = 0, mancha = 1, plastico = 0, quemada = true, T = 0 }) {
  const fibras = Array.from({ length: 9 }, (_, i) => -46 + i * 11.5);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <ellipse cx={0} cy={66} rx={270} ry={16} fill="rgba(0,0,0,.18)" />
    {quemada && <>
      {/* papel del cigarro arrugado y la punta quemada */}
      <path d="M -250 -48 L -40 -52 L -40 52 L -250 46 Q -262 30 -255 10 Q -266 -8 -256 -26 Q -262 -40 -250 -48 Z" fill="#fbfaf6" stroke={KC.ink} strokeWidth={6} />
      <path d="M -170 -50 l 14 22 l -10 30 l 12 46" stroke="rgba(0,0,0,.18)" strokeWidth={4} fill="none" />
      <path d="M -110 -51 l -8 30 l 12 26 l -6 46" stroke="rgba(0,0,0,.18)" strokeWidth={4} fill="none" />
      <path d="M -250 -48 Q -230 -30 -240 -6 Q -226 16 -246 46 Q -262 30 -255 10 Q -266 -8 -256 -26 Q -262 -40 -250 -48 Z" fill="#4a3b30" stroke={KC.ink} strokeWidth={5} />
      <circle cx={-252} cy={-14} r={7} fill="#8f8a84" /><circle cx={-246} cy={18} r={6} fill="#8f8a84" />
    </>}
    {/* filtro: fibras blancas (se ven cuando se abre la boquilla) */}
    <rect x={-40} y={-55} width={290} height={110} fill={FIBRA} stroke={KC.ink} strokeWidth={6} />
    {fibras.map((f, i) => <path key={i} d={`M -36 ${f} q 36 ${i % 2 ? 5 : -5} 72 0 t 72 0 t 72 0 t 72 0`} stroke="#cfc6b4" strokeWidth={3} fill="none" />)}
    {/* papel boquilla (el "corcho") */}
    <g opacity={1 - abre}>
      <rect x={-40} y={-55} width={290} height={110} fill="#e9a35a" stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={-25 + (i * 53) % 270} cy={-40 + ((i * 37) % 80)} r={4} fill="#b9692a" />)}
      <rect x={-40} y={-55} width={16} height={110} fill="#d38c45" />
    </g>
    {/* cara del filtro con la mancha café del humo */}
    <ellipse cx={250} cy={0} rx={24} ry={55} fill={FIBRA} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={250} cy={0} rx={13} ry={30} fill={CAFE} opacity={0.75 * mancha} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={238 + i * 4} y1={-44 + i * 3} x2={238 + i * 4} y2={44 - i * 3} stroke="rgba(0,0,0,.12)" strokeWidth={2} />)}
    {/* fibras que se salen del extremo */}
    {deshilacha > 0 && Array.from({ length: 14 }, (_, i) => { const yy = -42 + i * 6.5, L = (40 + (i * 23) % 70) * deshilacha;
      return <path key={i} d={`M 252 ${yy} q ${L * 0.5} ${(i % 2 ? 1 : -1) * (6 + i % 4 * 3)} ${L} ${(i % 3 - 1) * 10 * deshilacha}`} stroke={FIBRA} strokeWidth={4} fill="none" strokeLinecap="round" style={{ filter:'drop-shadow(0 0 1px #000)' }} />; })}
    {plastico > 0 && <rect x={-48} y={-63} width={330} height={126} rx={18} fill="none" stroke={KC.pink} strokeWidth={8} strokeDasharray="22 14" strokeDashoffset={-T * 40} opacity={plastico} />}
  </g>;
}

// Bolita de algodón (para tacharla).
function Algodon({ x, y, s = 1, o = 1 }) {
  const b = [[-40, 10, 38], [0, -14, 44], [42, 6, 36], [-10, 26, 36], [24, 28, 32]];
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    {b.map(([a, c, r], i) => <circle key={i} cx={a} cy={c} r={r + 4} fill={KC.ink} />)}
    {b.map(([a, c, r], i) => <circle key={'w' + i} cx={a} cy={c} r={r} fill="#ffffff" />)}
    <circle cx={-8} cy={-24} r={12} fill="#eef3f8" />
  </g>;
}

// Haz de fibras de acetato de celulosa al microscopio (esquema). Cada fibra mide ANCHO px = 20 µm.
const ANCHO = 36;
function HazFibras({ T, y0 = 760, n = 11, tinte = 0, destaca = -1, particulas = 0, suelta = 0, entra = 1 }) {
  const col = mixHex(FIBRA, CAFE, tinte), r = krng(7);
  const parts = Array.from({ length: 40 }, () => ({ f: Math.floor(r() * n), x: 60 + r() * 960, c: [KC.yellow, '#9aa3ad', KC.pink][Math.floor(r() * 3)], s: 7 + r() * 6, v: 0.5 + r() }));
  const yF = (i, xx) => y0 + i * (ANCHO - 4) + Math.sin(xx / 70 + i * 1.7 + T * 0.6) * 9;
  const camino = (i) => { let d = ''; for (let xx = -60; xx <= KW + 60; xx += 30) d += `${d ? ' L' : 'M'} ${xx} ${yF(i, xx).toFixed(1)}`; return d; };
  return <g opacity={entra}>
    {Array.from({ length: n }, (_, i) => <g key={i}>
      <path d={camino(i)} stroke={KC.ink} strokeWidth={ANCHO + 6} fill="none" strokeLinejoin="round" />
      <path d={camino(i)} stroke={i === destaca ? KC.gold2 : col} strokeWidth={ANCHO - 2} fill="none" strokeLinejoin="round" />
      <path d={camino(i)} stroke="rgba(255,255,255,.55)" strokeWidth={5} fill="none" transform="translate(0 -9)" />
    </g>)}
    {particulas > 0 && parts.map((p, i) => { const u = kclamp(suelta * p.v, 0, 1);
      return <circle key={i} cx={p.x + u * 40 * Math.sin(i)} cy={yF(p.f, p.x) - u * 520} r={p.s} fill={p.c} stroke={KC.ink} strokeWidth={3} opacity={particulas * (1 - u * 0.85)} />; })}
  </g>;
}

// Vaso de precipitado de 1 litro con agua (tinte 0..1 = café del lixiviado).
function Vaso({ x, y, w = 380, h = 440, tinte = 0, children }) {
  const agua = mixHex('#bfe7ff', '#c79a52', tinte);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 + 10} y={-h + 60} width={w - 20} height={h - 70} rx={20} fill={agua} opacity={0.9} />
    {children}
    <path d={`M ${-w / 2} ${-h} L ${-w / 2} -20 Q ${-w / 2} 0 ${-w / 2 + 20} 0 L ${w / 2 - 20} 0 Q ${w / 2} 0 ${w / 2} -20 L ${w / 2} ${-h}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d={`M ${-w / 2} ${-h} l -22 -16`} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />
    {[0.25, 0.5, 0.75].map((q) => <line key={q} x1={w / 2 - 50} y1={-q * h} x2={w / 2} y2={-q * h} stroke={KC.ink} strokeWidth={4} />)}
    <text x={-w / 2 + 30} y={-h + 110} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>1 L</text>
  </g>;
}
// Pez pequeño esquemático (cuerpo alargado). vida 1 = nada · 0 = gris, panza arriba y se hunde.
function Pez({ T, x, y, s = 1, vida = 1, seed = 1, color = '#9fc4d8' }) {
  const m = 1 - vida, nada = vida * Math.sin(T * 3 + seed) * 18;
  return <g transform={`translate(${x + nada} ${y + m * 60}) scale(${s * (seed % 2 ? 1 : -1)} ${s * (1 - 2 * m)})`}>
    <path d="M 40 0 L 64 -18 L 60 0 L 64 18 Z" fill={vida > 0.5 ? color : '#9a9a9a'} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={46} ry={15} fill={vida > 0.5 ? color : '#a8a8a8'} stroke={KC.ink} strokeWidth={4} />
    <path d="M -30 2 Q 0 8 34 2" stroke="rgba(255,255,255,.7)" strokeWidth={3} fill="none" />
    <circle cx={-30} cy={-3} r={4} fill={KC.ink} />
  </g>;
}
// Íconos pequeños: botella de plástico y taparrosca.
function Botella({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -26 0 L -26 -110 Q -26 -130 -12 -140 L -12 -160 L 12 -160 L 12 -140 Q 26 -130 26 -110 L 26 0 Z" fill="#bfe7ff" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={-14} y={-176} width={28} height={18} rx={4} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
    <rect x={-26} y={-90} width={52} height={36} fill={KC.red} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Tapa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-34} y={-40} width={68} height={40} rx={8} fill={KC.blue} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={-24 + i * 10} y1={-34} x2={-24 + i * 10} y2={-6} stroke="rgba(0,0,0,.35)" strokeWidth={3} />)}
  </g>;
}

function ColillasShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Fibras, Q: CUES.Quimicos, Ti: CUES.Tirada, P: CUES.Pregunta, Pl: CUES.Playa, M: CUES.Mexico, E: CUES.Estudio, X: CUES.Extra, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  // la colilla del inicio (y del cierre): sale de la arena y se acomoda
  const sube = kprog(T, K.G, K.G + 0.7, kEase.rebote);
  const colillaInicio = (abre, extra = {}) => <Colilla x={430} y={1060 + (1 - sube) * 50} s={0.95} rot={-8 + (1 - sube) * 14} abre={abre} T={T} {...extra} />;
  // podio
  const pod = (x, h, n, nombre, c, at) => { const k = kprog(T, at, at + 0.6, kEase.rebote);
    return <g><rect x={x - 130} y={1150 - h * k} width={260} height={h * k} fill={c} stroke={KC.ink} strokeWidth={7} />
      <text x={x} y={1150 - h * k + 90} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.ink} opacity={k}>{n}</text>
      <text x={x} y={1150 - h * k + 140} textAnchor="middle" style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink} opacity={k}>{nombre}</text></g>; };
  // peces del estudio: la mitad se apaga durante las 96 h
  const t96 = kprog(T, K.E + 4.6, K.E + 8.4);
  const peces = [[-110, -300], [60, -330], [-40, -230], [110, -200], [-120, -140], [40, -110]];
  const vidaPez = (i) => (i % 2 ? 1 - kprog(T, K.E + 5.0 + i * 0.5, K.E + 5.6 + i * 0.5) : 1);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la colilla en la arena; no es algodón */}
      <Escena T={T} a={K.G} b={K.F}>
        <Playa T={T} />
        {svg(<>{colillaInicio(kprog(T, K.G + 1.6, K.G + 2.6))}
          <Algodon x={230} y={720} s={kprog(T, K.G + 0.15, K.G + 0.55, kEase.rebote)} o={1 - 0.5 * kprog(T, K.G + 1.0, K.G + 1.4)} /></>)}
      </Escena>
      {/* 2 · fibras: lupa sobre la cara del filtro y luego el microscopio */}
      <Escena T={T} a={K.F} b={K.Q}>
        <Escena T={T} a={K.F - 0.5} b={K.F + 1.7}>
          <Playa T={T} />
          {svg(<Colilla x={330} y={1040} s={1.3} abre={1} T={T} />)}
        </Escena>
        <Escena T={T} a={K.F + 1.7} b={K.Q + 1}>
          <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1b2238 0%, ${KC.dark} 75%)` }}></div>
          {svg(<HazFibras T={T} y0={690} n={13} destaca={kprog(T, K.F + 3.0, K.F + 3.3) > 0.5 ? 6 : -1} />)}
        </Escena>
      </Escena>
      <Lupa T={T} at={K.F + 0.1} until={K.F + 1.6} x={600} y={620} r={200} fx={330 + 250 * 1.3} fy={1040} tinte={KC.cyan} etiqueta="AL MICROSCOPIO"
        interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#1b2238" />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -20 ${40 + i * 40} q 60 ${i % 2 ? 12 : -12} 120 0 t 120 0 t 120 0 t 120 0`} stroke={FIBRA} strokeWidth={26} fill="none" />)}</svg>} />
      {/* 3 · químicos: las fibras se tiñen y sueltan sustancias */}
      <Escena T={T} a={K.Q} b={K.Ti}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, #1b2238 0%, ${KC.dark} 75%)` }}></div>
        {svg(<HazFibras T={T} y0={690} n={13} tinte={kprog(T, K.Q + 0.2, K.Q + 1.6)} particulas={kprog(T, K.Q + 0.8, K.Q + 1.6)} suelta={kprog(T, K.Q + 3.2, K.Ti + 0.4)} />)}
      </Escena>
      {/* 4 · tirada: sol y humedad la rompen en microplástico */}
      <Escena T={T} a={K.Ti} b={K.P}>
        <Playa T={T} />
        {svg(<><Sol T={T} x={230} y={520} r={80} />
          <Goteo T={T} x={380} y0={700} y1={1010} cada={0.25} color="#7fd0ff" desde={K.Ti + 1.2} hasta={K.Ti + 3.4} r={10} />
          <Goteo T={T} x={560} y0={720} y1={1020} cada={0.31} color="#7fd0ff" desde={K.Ti + 1.4} hasta={K.Ti + 3.4} r={10} />
          <Colilla x={420} y={1070} s={0.85} rot={-6} abre={kprog(T, K.Ti + 2.4, K.Ti + 3.4)} deshilacha={kprog(T, K.Ti + 2.6, K.Ti + 4.6)} T={T} />
          {Array.from({ length: 22 }, (_, i) => { const u = kprog(T, K.Ti + 3.4 + i * 0.05, K.Ti + 4.4 + i * 0.05, kEase.sale);
            return <line key={i} x1={650 + (i * 37) % 300} y1={1060 + (i * 29) % 110} x2={650 + (i * 37) % 300 + 18} y2={1060 + (i * 29) % 110 + ((i % 3) - 1) * 8} stroke={FIBRA} strokeWidth={5} strokeLinecap="round" opacity={u} style={{ filter:'drop-shadow(0 0 1.5px #000)' }} />; })}</>)}
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pl} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={290} y={1000} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 290 820)`}>?</text>
          <Colilla x={260} y={1130} s={0.5} rot={8} T={T} /></>)}
      </Escena>
      {/* 6 · playa: limpieza internacional 2025 y el podio */}
      <Escena T={T} a={K.Pl} b={K.M}>
        <Playa T={T} cielo={KC.mint} hMar={760} />
        {svg(<>{pod(540, 340, '1', 'botellas', '#bfe7ff', K.Pl + 3.0)}{pod(230, 260, '2', 'colillas', KC.yellow, K.Pl + 3.4)}{pod(850, 190, '3', 'taparroscas', '#d9dde3', K.Pl + 3.2)}
          <g opacity={kprog(T, K.Pl + 3.6, K.Pl + 3.9)}><Botella x={540} y={800} s={0.75} /><Colilla x={230} y={860} s={0.38} T={T} /><Tapa x={850} y={950} s={0.9} /></g>
          {kprog(T, K.Pl + 3.8, K.Pl + 4.2) > 0 && <circle cx={230} cy={830} r={150} fill="none" stroke={KC.pink} strokeWidth={8} strokeDasharray="22 14" strokeDashoffset={-T * 40} opacity={kprog(T, K.Pl + 3.8, K.Pl + 4.2)} />}</>)}
      </Escena>
      {/* 7 · México: más del doble de colillas que de botellas */}
      <Escena T={T} a={K.M} b={K.E}>
        <FondoLunares color={KC.yellow} />
        {svg(<><MapaMexico x={360} y={420} ancho={680} conCA={false} />
          {[[20571, 'colillas', KC.orange, 860], [7978, 'botellas', '#7fd0ff', 1010]].map(([v, n, c, yy], i) => { const k = kprog(T, K.M + 1.0 + i * 0.5, K.M + 2.6 + i * 0.5, kEase.suave), L = 500 * v / 20571 * k;
            return <g key={n}><rect x={300} y={yy - 45} width={Math.max(0, L)} height={90} rx={14} fill={c} stroke={KC.ink} strokeWidth={6} />
              <text x={280} y={yy + 14} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{n}</text>
              <text x={310 + L} y={yy + 14} style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink} opacity={k}>{kformato(Math.round(v * k))}</text></g>; })}</>)}
      </Escena>
      {/* 8 · el estudio de 2011: un litro, una colilla, 96 horas */}
      <Escena T={T} a={K.E} b={K.X}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<Vaso x={360} y={1160} tinte={kprog(T, K.E + 3.4, K.E + 5.0)}>
          <Colilla x={30} y={-330 + Math.sin(T * 2) * 4} s={0.38} rot={4} T={T} />
          {kprog(T, K.E + 3.4, K.E + 3.6) > 0 && Array.from({ length: 8 }, (_, i) => { const u = ((T - K.E - 3.4) * 0.6 + i / 8) % 1; return <circle key={i} cx={-60 + i * 18} cy={-310 + u * 200} r={6 + (i % 3) * 3} fill={CAFE} opacity={0.6 * (1 - u)} />; })}
          {peces.map(([px, py], i) => <Pez key={i} T={T} x={px} y={py} s={0.85} seed={i + 1} vida={vidaPez(i)} color={i < 3 ? '#9fc4d8' : '#c9b08a'} />)}
        </Vaso>)}
      </Escena>
      {/* 9 · extra: el filtro sin fumar también resultó tóxico */}
      <Escena T={T} a={K.X} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<Vaso x={780} y={1160} w={360} tinte={0.25}>
          <Colilla x={0} y={-330 + Math.sin(T * 2) * 4} s={0.5} rot={-4} quemada={false} mancha={0} abre={1} T={T} />
          {[[-80, -220], [70, -180], [-30, -120]].map(([px, py], i) => <Pez key={i} T={T} x={px} y={py} s={0.8} seed={i + 2} />)}
        </Vaso>)}
      </Escena>
      {/* 10 · cierre: la misma colilla del inicio, ahora marcada como plástico */}
      <Escena T={T} a={K.C} b={FIN}>
        <Playa T={T} />
        {svg(colillaInicio(1, { plastico: kprog(T, K.C + 0.4, K.C + 1.0) }))}
      </Escena>

      {/* datos y etiquetas */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 0.9} until={K.F - 0.3} texto="algodón" x={240} y={560} tam={44} />
      <Chip T={T} at={K.G + 2.2} until={K.F - 0.2} texto="acetato de celulosa = plástico" x={380} y={880} tam={34} borde={KC.pink} />
      <NumeroGigante T={T} at={K.F + 1.9} until={K.Q - 0.2} valor={15000} dur={1.2} prefijo="+" etiqueta="fibras en un filtro" x={360} y={470} tam={130} color={KC.yellow} />
      <Etq T={T} at={K.F + 3.2} until={K.Q - 0.2} x={40} y={1150} texto="1 fibra = 20 µm de grueso" tam={30} color={KC.gold2} />
      <Etq T={T} at={K.F + 2.2} until={K.Q - 0.2} x={40} y={640} texto="acetato de celulosa" tam={28} />
      <Chip T={T} at={K.Q + 1.0} until={K.Ti - 0.2} texto="nicotina" x={240} y={400} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.Q + 1.5} until={K.Ti - 0.2} texto="metales pesados" x={540} y={490} tam={34} borde="#9aa3ad" />
      <Chip T={T} at={K.Q + 2.0} until={K.Ti - 0.2} texto="otras sustancias" x={790} y={400} tam={34} borde={KC.pink} />
      <Chip T={T} at={K.Ti + 3.6} until={K.P - 0.2} texto="microplástico · puede durar años" x={560} y={700} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Ti + 3.8} until={K.P - 0.2} x={640} y={990} texto="fibras sueltas" tam={28} color={KC.ink} />
      {T < K.M + 0.2 && <Contador T={T} at={K.Pl + 0.3} hasta={1197920} dur={2.4} x={360} y={430} tam={92} color={KC.texto} />}
      <Chip T={T} at={K.Pl + 0.5} until={K.M - 0.2} texto="colillas · Limpieza Internacional de Costas 2025" x={540} y={545} tam={26} borde={KC.cyan} />
      <Chip T={T} at={K.M + 0.3} until={K.E - 0.2} texto="México · limpieza de 2025" x={700} y={370} tam={30} borde={KC.orange} />
      <Chip T={T} at={K.M + 3.0} until={K.E - 0.2} texto="más del doble" x={540} y={1150} tam={40} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.2} anio="2011" quien="San Diego State University" revista="Slaughter et al. · Tobacco Control" x={540} y={470} />
      <Chip T={T} at={K.E + 3.4} until={K.X - 0.2} texto="1 colilla fumada por litro" x={380} y={450} tam={32} borde={KC.ink} />
      {T >= K.E + 4.6 && T < K.X + 0.3 && <div style={{ position:'absolute', left:360, top:600, zIndex:41, transform:'translate(-50%,-50%)', font:`700 60px ${KF.mono}`, color:KC.ink }}>{kformato(Math.round(96 * t96))} h</div>}
      <Etq T={T} at={K.E + 3.8} until={K.X - 0.2} x={570} y={880} texto="Atherinops affinis" it tam={28} color={KC.ink} />
      <Etq T={T} at={K.E + 4.1} until={K.X - 0.2} x={570} y={950} texto="Pimephales promelas" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.E + 7.6} until={K.X - 0.2} texto="murió la mitad" x={760} y={1100} tam={34} borde={KC.red} />
      <Chip T={T} at={K.X + 0.3} until={K.C - 0.2} texto="sin fumar: también tóxico" x={760} y={430} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.X + 0.6} until={K.C - 0.2} x={980} y={620} texto="filtro nuevo" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.C + 0.6} until={K.Ou - 0.1} texto="plástico que se queda" x={380} y={470} tam={38} borde={KC.pink} />

      <EscalaFija T={T} texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} o={(T < K.F + 1.7 || (T > K.Ti && T < K.Pl + 0.0) || T > K.C) && T < K.Ou ? 1 : 0} />
      <EscalaFija T={T} texto="20 µm = ancho de una fibra" largo={ANCHO} y={1480} color={KC.texto} o={T > K.F + 1.8 && T < K.Ti - 0.2 ? 1 : 0} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="Esto no es algodón: *es plástico.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.Q - 0.1} texto="Más de 15,000 fibras *de 20 µm.*" />
      <Subtitulo T={T} idx={2} at={K.Q + 0.1} until={K.Ti - 0.1} texto="Nicotina, *metales pesados* y más." />
      <Subtitulo T={T} idx={3} at={K.Ti + 0.1} until={K.P - 0.1} texto="No desaparece: *microplástico.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Pl - 0.1} texto="¿Cuántas terminan *en la playa?*" />
      <Subtitulo T={T} idx={5} at={K.Pl + 0.1} until={K.M - 0.1} texto="Casi 1.2 millones: *el 2.º residuo.*" />
      <Subtitulo T={T} idx={6} at={K.M + 0.1} until={K.E - 0.1} texto="En México: *más del doble.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.X - 0.1} texto="1 colilla por litro: *murió la mitad.*" />
      <Subtitulo T={T} idx={8} at={K.X + 0.1} until={K.C - 0.1} texto="Hasta los filtros *sin fumar.*" />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Es *plástico que se queda.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Fibras + 2.4, CUES.Quimicos - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Tirada + 0.4, CUES.Tirada + 3.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Playa + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Playa + 4.4, CUES.Mexico - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Mexico + 3.0, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Estudio + 4.5, CUES.Extra - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Extra + 0.05, CUES.Cierre + 0.6, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="18" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ColillasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ColillasShot /></CompositionStage></div>;
}
window.ColillasApp = ColillasApp;
