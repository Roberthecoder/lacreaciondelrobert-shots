// Shot IA #35 · Los cachalotes tienen un "alfabeto" de clics (y ninguna IA lo tradujo) — NARRADO (N1 "Por dentro" + N4 "La imagen que se llena").
// Datos: Sharma, Gero, Payne, Gruber, Rus, Torralba y Andreas, Nature Communications 15:3617 (2024) y Beguš et al., Open Mind 9 (2025).
// Ver guion.md y verificacion.md. Los colores azul/naranja de las dos ballenas siguen la figura 1 del artículo. Dibujo esquemático.
const BAZUL = '#2f6dff', BNAR = '#ff8a1f', PIEL = '#6f7f99', PANZA = '#a9b4c6';

// Cachalote (Physeter macrocephalus) mirando a la derecha: cabeza enorme y cuadrada (≈ 1/3 del cuerpo), mandíbula delgada abajo,
// joroba en vez de aleta dorsal, piel arrugada, aleta caudal triangular. dir = -1 lo voltea.
function Cachalote({ x, y, s = 1, dir = 1, T = 0, halo = null, seed = 1 }) {
  const nada = Math.sin(T * 1.6 + seed) * 6, cola = Math.sin(T * 2.2 + seed) * 6;
  return <g transform={`translate(${x} ${y + nada}) scale(${s * dir} ${s})`}>
    {halo && <ellipse cx={0} cy={0} rx={300} ry={110} fill={halo} opacity=".22" />}
    <g transform={`rotate(${cola} -200 0)`}>
      <path d="M -196 0 Q -236 -40 -278 -50 Q -252 -12 -238 0 Q -252 12 -278 46 Q -236 38 -196 0 Z" fill={PIEL} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    </g>
    <path d="M 205 -62 Q 234 -56 232 -12 Q 230 30 200 42 L 70 54 Q 0 62 -80 42 Q -150 24 -202 6 L -204 -4 Q -150 -30 -96 -42 Q -70 -60 -44 -50 Q 40 -68 205 -62 Z"
      fill={PIEL} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    <path d="M 196 40 L 74 52 Q 0 58 -60 44 Q 0 48 74 46 Z" fill={PANZA} opacity=".9" />
    <path d="M 198 36 L 78 44" stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
    <circle cx={112} cy={14} r={7} fill={KC.ink} />
    <circle cx={210} cy={-60} r={5} fill={KC.ink} />
    {[[-20, -30], [-50, -18], [0, -8], [-90, -20], [30, -36]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} q 12 -6 24 0`} stroke={KC.ink} strokeWidth={4} fill="none" opacity=".45" />)}
  </g>;
}
// Una coda: clics como puntos. pos = posiciones relativas 0..1 de cada clic; n = cuántos se ven (para que aparezcan uno a uno).
function Coda({ x, y, ancho, pos, color, r = 14, n = 99, brillo = -1, borde = KC.ink }) {
  return <g>{pos.slice(0, Math.max(0, n)).map((p, i) => <g key={i}>
    {i === brillo && <circle cx={x + p * ancho} cy={y} r={r * 2.2} fill={KC.yellow} opacity=".55" />}
    <circle cx={x + p * ancho} cy={y} r={r} fill={color} stroke={borde} strokeWidth={Math.max(3, r / 4)} />
  </g>)}</g>;
}
const RITMOS = [[0, .25, .5, .75, 1], [0, .15, .3, .45, 1], [0, .1, .2, .3, .4], [0, .3, .45, .6, .75, 1], [0, .4, .55, .7, .85], [0, .2, .4, .6, .8, .9, 1], [0, .5, 1]];
// Moñito (el "adorno" del ornamento).
function Monito({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 L -34 -20 L -34 20 Z M 0 0 L 34 -20 L 34 20 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
    <circle r={9} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Mapa esquemático de las Antillas Menores con Dominica resaltada.
const ISLAS = [[-66.5, 18.2, 34, 9], [-64.7, 18.4, 6, 4], [-63.05, 18.2, 5, 3], [-62.75, 17.3, 5, 4], [-61.8, 17.07, 7, 6], [-61.55, 16.2, 12, 9],
  [-61.35, 15.4, 9, 13], [-61.0, 14.65, 9, 12], [-60.97, 13.9, 6, 9], [-61.2, 13.25, 5, 7], [-61.68, 12.1, 5, 6], [-59.55, 13.15, 6, 6], [-61.3, 10.5, 22, 16]];
function MapaCaribe({ T, at, x0 = 80, y0 = 690 }) {
  const e = kprog(T, at, at + 0.6, kEase.sale), px = (lon) => x0 + (lon + 67) * 55, py = (lat) => y0 + (19 - lat) * 52;
  const dx = px(-61.35), dy = py(15.4), pul = 1 + 0.15 * Math.sin(T * 5);
  return <g opacity={e}>
    <rect x={x0 - 10} y={y0 - 20} width={470} height={500} rx={30} fill="#7fd9f2" stroke={KC.ink} strokeWidth={7} />
    {ISLAS.map(([lo, la, rx, ry], i) => i === 6 ? null : <ellipse key={i} cx={px(lo)} cy={py(la)} rx={rx} ry={ry} fill="#bfe3b4" stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={dx} cy={dy} r={34 * pul} fill="none" stroke={KC.red} strokeWidth={6} opacity={kprog(T, at + 0.5, at + 0.9)} />
    <ellipse cx={dx} cy={dy} rx={11} ry={16} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <text x={dx - 46} y={dy + 6} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink} opacity={kprog(T, at + 0.6, at + 1.0)}>Dominica</text>
    <text x={x0 + 16} y={y0 + 462} style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink} opacity=".7">mar Caribe · esquemático</text>
  </g>;
}
// Tira de clics del gancho y del cierre: al principio parece cinta de telégrafo (puntos y rayas); luego son clics azules y naranjas.
function TiraClics({ T, y = 870, morse = 0, piezas = 0, desde = 0 }) {
  const out = [], vel = 120, w = 150, gap = 60;
  for (let k = -1; k < 8; k++) {
    const x0 = ((k * (w + gap) - (T - desde) * vel) % (8 * (w + gap)) + 8 * (w + gap)) % (8 * (w + gap)) - 160;
    const pos = RITMOS[k < 0 ? 6 : k % 6], col = k % 2 ? BNAR : BAZUL;
    pos.forEach((p, i) => {
      const cx = x0 + p * w, raya = (i + k) % 3 === 0;
      if (morse > 0.01) out.push(<rect key={`m${k}-${i}`} x={cx - (raya ? 24 : 9)} y={y - 9} width={raya ? 48 : 18} height={18} rx={9} fill={KC.ink} opacity={morse} />);
      if (morse < 0.99) out.push(<circle key={`c${k}-${i}`} cx={cx} cy={y} r={13} fill={col} stroke={KC.ink} strokeWidth={4} opacity={1 - morse} />);
    });
    if (piezas > 0) [KC.cyan, KC.yellow, KC.pink, KC.mint].forEach((c, j) => out.push(<rect key={`p${k}-${j}`} x={x0 + j * 38} y={y - 64} width={32} height={24} rx={6}
      fill={c} stroke={KC.ink} strokeWidth={4} opacity={piezas} transform={`translate(0 ${(1 - piezas) * 20})`} />));
  }
  return <g>
    <rect x={-20} y={y - 34} width={KW + 40} height={68} fill={KC.paper} stroke={KC.ink} strokeWidth={6} opacity={morse} />
    <rect x={-20} y={y - 34} width={KW + 40} height={68} fill="rgba(13,20,36,.55)" opacity={1 - morse} />
    {out}
  </g>;
}
// Gráfica de intercambio (estilo figura 1): dos carriles en el tiempo, azul y naranja.
function GraficaIntercambio({ T, at, x = 90, y = 470, ancho = 900 }) {
  const p = kprog(T, at, at + 1.4, kEase.suave), out = [];
  for (let k = 0; k < 10; k++) {
    const x0 = x + 70 + k * 82, ok = (x0 - x) / ancho < p, azul = k % 2 === 0;
    if (ok) out.push(<g key={k}><Coda x={x0} y={azul ? y + 60 : y + 130} ancho={52} pos={RITMOS[1]} color={azul ? BAZUL : BNAR} r={8} borde={KC.texto} /></g>);
  }
  return <g opacity={kprog(T, at - 0.2, at + 0.2)}>
    <rect x={x} y={y} width={ancho} height={190} rx={18} fill="rgba(255,255,255,.06)" stroke="rgba(246,243,236,.35)" strokeWidth={3} />
    <text x={x + 18} y={y + 68} style={{ font:`700 22px ${KF.mono}` }} fill={BAZUL}>A</text>
    <text x={x + 18} y={y + 138} style={{ font:`700 22px ${KF.mono}` }} fill={BNAR}>B</text>
    <line x1={x + 50} y1={y + 172} x2={x + 50 + (ancho - 70) * p} y2={y + 172} stroke="rgba(246,243,236,.6)" strokeWidth={3} />
    <text x={x + ancho - 16} y={y + 30} textAnchor="end" style={{ font:`700 22px ${KF.mono}` }} fill="rgba(246,243,236,.7)">intercambio · tiempo →</text>
    {out}
  </g>;
}
// Histograma de duraciones que se agrupa en montoncitos (los "tempos").
function Histograma({ T, at, x = 90, y = 700, ancho = 900, alto = 220 }) {
  const g = kprog(T, at + 0.4, at + 2.0, kEase.suave), r = krng(9), n = 46, bw = ancho / n, picos = [0.12, 0.3, 0.5, 0.7, 0.88];
  return <g opacity={kprog(T, at - 0.2, at + 0.2)}>
    <rect x={x} y={y} width={ancho} height={alto} rx={18} fill="rgba(255,255,255,.06)" stroke="rgba(246,243,236,.35)" strokeWidth={3} />
    {Array.from({ length: n }, (_, i) => { const u = (i + 0.5) / n, ruido = 0.25 + r() * 0.35;
      const mix = picos.reduce((a, c) => a + Math.exp(-((u - c) ** 2) / 0.0012), 0);
      const h = (alto - 40) * klerp(ruido, Math.min(1, mix) * 0.95 + 0.03, g);
      const col = g > 0.6 ? [KC.cyan, KC.yellow, KC.pink, KC.mint, KC.lilac][Math.min(4, Math.floor(u * 5))] : 'rgba(246,243,236,.7)';
      return <rect key={i} x={x + i * bw + 2} y={y + alto - 14 - h} width={bw - 4} height={h} rx={3} fill={col} />; })}
    <text x={x + 16} y={y + 34} style={{ font:`700 22px ${KF.mono}` }} fill="rgba(246,243,236,.8)">duración de las codas</text>
  </g>;
}
// Espectro esquemático de un clic: una banda ("a") o dos bandas ("i").
function Espectro({ T, at, x, y, w = 400, h = 300, bandas, letra, color }) {
  const e = kprog(T, at, at + 0.5, kEase.sale);
  return <g opacity={e} transform={`translate(${x} ${y + (1 - e) * 30})`}>
    <rect width={w} height={h} rx={20} fill="#05070d" stroke={color} strokeWidth={6} />
    {Array.from({ length: 6 }, (_, k) => { const cx = 70 + k * 56, on = kprog(T, at + 0.3 + k * 0.12, at + 0.5 + k * 0.12);
      return <g key={k} opacity={on}>{bandas.map((b, j) => <rect key={j} x={cx - 14} y={h * b - 16} width={28} height={32} rx={10} fill={color} opacity=".9" />)}
        <rect x={cx - 3} y={30} width={6} height={h - 60} fill={color} opacity=".18" /></g>; })}
    <text x={22} y={78} style={{ font:`400 90px ${KF.titulo}` }} fill={KC.texto}>{letra}</text>
    <text x={w - 16} y={h - 16} textAnchor="end" style={{ font:`700 20px ${KF.mono}` }} fill="rgba(246,243,236,.6)">tiempo →</text>
    <text x={16} y={h - 16} style={{ font:`700 20px ${KF.mono}` }} fill="rgba(246,243,236,.6)">↑ frecuencia</text>
  </g>;
}

function Ballenas() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Codas, E: CUES.Estudio, Pi: CUES.Piezas, R: CUES.Rubato, O: CUES.Ornamento, P: CUES.Pregunta, Cb: CUES.Combina, Oj: CUES.Ojo, V: CUES.Vocales, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4, L1 = K.G + (K.Co - K.G) * 0.56;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const sube = (a) => (1 - kprog(T, a, a + 0.8, kEase.sale)) * 500;
  // rubato: la duración de las codas cambia poco a poco; la ballena que contesta copia con retraso
  const estira = (d) => kprog(T, K.R + 0.5 + d, K.R + 3.0 + d, kEase.suave);
  const filaRubato = (y, col, d) => { let xx = 200; const out = [];
    for (let k = 0; k < 4; k++) { const f = 1 + 0.22 * k * estira(d), w = 100 * f; out.push(<g key={k}>
      <Coda x={xx} y={y} ancho={w} pos={RITMOS[0]} color={col} r={9} />
      <line x1={xx} y1={y - 44} x2={xx + w} y2={y - 44} stroke={KC.ink} strokeWidth={5} /><line x1={xx} y1={y - 54} x2={xx} y2={y - 34} stroke={KC.ink} strokeWidth={5} />
      <line x1={xx + w} y1={y - 54} x2={xx + w} y2={y - 34} stroke={KC.ink} strokeWidth={5} /></g>); xx += w + 38; }
    return out; };
  const lit = T < K.Cb + 1.5 ? Math.round(21 * kprog(T, K.Cb + 0.2, K.Cb + 1.2)) : Math.round(klerp(21, 143, kprog(T, K.Cb + 1.6, K.Cb + 4.6, kEase.suave)));
  const rc = krng(35), colCelda = Array.from({ length: 143 }, () => [KC.cyan, KC.yellow, KC.pink, KC.mint][Math.floor(rc() * 4)]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: ¿Morse? No: dos cachalotes contestándose */}
      <Escena T={T} a={K.G} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        <Ambiente T={T} n={26} color="rgba(255,255,255,.5)" />
        {svg(<>
          <TiraClics T={T} y={780} morse={1 - kprog(T, K.G + 1.4, K.G + 2.2)} />
          <g transform={`translate(0 ${sube(K.G + 0.5)})`}><Cachalote x={210} y={960} s={0.72} T={T} halo={BAZUL} /></g>
          <g transform={`translate(0 ${sube(K.G + 0.8)})`}><Cachalote x={870} y={985} s={0.72} dir={-1} T={T} halo={BNAR} seed={3} /></g>
          <g opacity={kprog(T, L1 + 0.2, L1 + 0.8)}>
            <text x={540} y={620} textAnchor="middle" style={{ font:`400 230px ${KF.titulo}` }} fill="none" stroke={KC.ink} strokeWidth={22} strokeDasharray="0.1 34" strokeLinecap="round">A B C</text>
          </g>
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 2.0} until={L1 - 0.2} texto="¿código Morse?" x={290} y={560} tam={44} />
      <Chip T={T} at={L1 + 0.9} until={K.Co - 0.2} texto="como un alfabeto" x={540} y={1100} tam={40} borde={KC.ink} />
      {/* 2 · una coda; antes, 21 tipos */}
      <Escena T={T} a={K.Co} b={K.E}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Coda x={110} y={480} ancho={460} pos={RITMOS[1]} color={BAZUL} r={22} n={Math.floor((T - K.Co - 0.1) / 0.14)} />
          <path d={`M 100 530 Q 100 560 130 560 L 550 560 Q 580 560 580 530`} fill="none" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.Co + 0.8, K.Co + 1.1)} />
          {Array.from({ length: 21 }, (_, i) => { const c = i % 7, f = Math.floor(i / 7), on = kprog(T, K.Co + 1.6 + i * 0.06, K.Co + 1.9 + i * 0.06, kEase.sale), rr = krng(i + 4);
            const pos = RITMOS[i % 7].map((p) => Math.min(1, p * (0.7 + rr() * 0.3)));
            return <g key={i} opacity={on} transform={`translate(${148 + c * 116} ${770 + f * 112}) scale(${0.6 + 0.4 * on})`}>
              <rect x={-50} y={-44} width={100} height={88} rx={14} fill={KC.paper} stroke={KC.ink} strokeWidth={5} />
              <Coda x={-36} y={0} ancho={72} pos={pos} color={i % 2 ? BNAR : BAZUL} r={6} />
            </g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.Co + 0.9} until={K.E - 0.2} texto="1 coda = una serie de clics" x={340} y={620} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Co + 2.6} until={K.E - 0.2} texto="antes: 21 tipos de coda" x={540} y={1130} tam={38} borde={KC.ink} />
      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.Pi}>
        <FondoLunares color={KC.mint} />
        {svg(<>{T > K.E + 3.0 && <MapaCaribe T={T} at={K.E + 3.2} />}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.1} anio="2024" quien="MIT CSAIL + Proyecto CETI" revista="Sharma et al. · Nature Communications" y={640} />
      <NumeroGigante T={T} at={K.E + 3.6} until={K.Pi - 0.2} valor={8719} dur={1.4} etiqueta="codas analizadas" x={790} y={900} tam={130} color={KC.yellow} />
      <Chip T={T} at={K.E + 4.6} until={K.Pi - 0.2} texto="grabadas de 2005 a 2018" x={790} y={1060} tam={28} borde={KC.ink} />
      {/* 4 · cuatro piezas: análisis por computadora */}
      <Escena T={T} a={K.Pi} b={K.R}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <GraficaIntercambio T={T} at={K.Pi + 0.1} />
          <Histograma T={T} at={K.Pi + 0.3} />
          <Ficha x={300} y={1020} texto="ritmo" color={KC.cyan} o={kprog(T, K.Pi + 1.6, K.Pi + 1.9)} s={klerp(0.6, 1, kprog(T, K.Pi + 1.6, K.Pi + 1.9, kEase.rebote))} tam={40} />
          <Ficha x={760} y={1020} texto="tempo" color={KC.yellow} o={kprog(T, K.Pi + 1.9, K.Pi + 2.2)} s={klerp(0.6, 1, kprog(T, K.Pi + 1.9, K.Pi + 2.2, kEase.rebote))} tam={40} />
          <Ficha x={300} y={1120} texto="rubato ★" color={KC.pink} o={kprog(T, K.Pi + 2.4, K.Pi + 2.7)} s={klerp(0.6, 1, kprog(T, K.Pi + 2.4, K.Pi + 2.7, kEase.rebote))} tam={40} />
          <Ficha x={760} y={1120} texto="ornamento ★" color={KC.mint} o={kprog(T, K.Pi + 2.8, K.Pi + 3.1)} s={klerp(0.6, 1, kprog(T, K.Pi + 2.8, K.Pi + 3.1, kEase.rebote))} tam={40} />
        </>)}
      </Escena>
      <Chip T={T} at={K.Pi + 0.1} until={K.R - 0.2} texto="computadora: agrupar + estadística" x={540} y={400} tam={34} borde={KC.cyan} />
      {/* 5 · rubato */}
      <Escena T={T} a={K.R} b={K.O}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Cachalote x={90} y={820} s={0.2} T={T} halo={BAZUL} /><Cachalote x={90} y={1060} s={0.2} T={T} halo={BNAR} seed={3} />
          {filaRubato(820, BAZUL, 0)}{filaRubato(1060, BNAR, 0.5)}
        </>)}
      </Escena>
      <Chip T={T} at={K.R + 0.2} until={K.O - 0.2} texto="rubato" x={250} y={420} tam={52} borde={KC.pink} />
      <Chip T={T} at={K.R + 2.2} until={K.O - 0.2} texto="la que contesta lo imita" x={350} y={560} tam={34} borde={KC.ink} />
      {/* 6 · ornamento */}
      <Escena T={T} a={K.O} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Cachalote x={540} y={600} s={0.5} T={T} halo={BAZUL} />
          <Coda x={90} y={860} ancho={190} pos={RITMOS[0].map((p) => p * 0.8)} color={BAZUL} r={13} />
          <Coda x={330} y={860} ancho={190} pos={RITMOS[0].map((p) => p * 0.8)} color={BAZUL} r={13} />
          <Coda x={590} y={860} ancho={240} pos={[0, .16, .32, .48, .64, .94]} color={BAZUL} r={15} n={T < K.O + 1.0 ? 5 : 6} brillo={T >= K.O + 1.0 ? 5 : -1} />
          {T >= K.O + 1.0 && <Monito x={590 + 0.94 * 240} y={800} s={klerp(0.3, 1, kprog(T, K.O + 1.0, K.O + 1.4, kEase.rebote))} />}
        </>)}
      </Escena>
      <Chip T={T} at={K.O + 0.2} until={K.P - 0.2} texto="ornamento: un clic extra" x={540} y={420} tam={44} borde={KC.mint} />
      <Chip T={T} at={K.O + 1.5} until={K.P - 0.2} texto="≈ 4 % de las codas en intercambios" x={540} y={1040} tam={32} borde={KC.ink} />
      {/* 7 · pregunta */}
      <Escena T={T} a={K.P} b={K.Cb} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 8 · se combinan: de 21 a 143+ (la imagen que se llena) */}
      <Escena T={T} a={K.Cb} b={K.Oj}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>
          {Array.from({ length: 143 }, (_, i) => { const c = i % 13, f = Math.floor(i / 13), on = i < lit;
            return <rect key={i} x={110 + c * 42} y={710 + f * 42} width={36} height={36} rx={7} fill={on ? colCelda[i] : 'rgba(0,0,0,.07)'} stroke={on ? KC.ink : 'rgba(0,0,0,.15)'} strokeWidth={on ? 3 : 2} />; })}
          {[['ritmo', KC.cyan], ['tempo', KC.yellow], ['rubato', KC.pink], ['ornamento', KC.mint]].map(([t, c], j) =>
            <Ficha key={t} x={850} y={790 + j * 100} texto={t} color={c} tam={32} o={kprog(T, K.Cb + 0.4 + j * 0.2, K.Cb + 0.7 + j * 0.2)} />)}
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Cb + 0.3} until={K.Oj - 0.2} valor={lit} desde={lit} dur={0.01} sufijo={T > K.Cb + 4.6 ? '+' : ''} x={390} y={575} tam={170} color={KC.pink} />
      <Chip T={T} at={K.Cb + 0.2} until={K.Cb + 3.2} texto="ritmo × tempo × rubato × ornamento" x={540} y={410} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Cb + 3.6} until={K.Oj - 0.2} texto="como un alfabeto fonético" x={380} y={410} tam={34} borde={KC.pink} />
      {/* 9 · ojo: no es traducir */}
      <Escena T={T} a={K.Oj} b={K.V}>
        <FondoLunares color={KC.cyan} />
      </Escena>
      {T > K.Oj - 0.4 && T < K.V + 0.4 && <div style={{ opacity: kprog(T, K.Oj - 0.3, K.Oj + 0.2) * (1 - kprog(T, K.V - 0.1, K.V + 0.4)) }}>
        <CelularChat T={T} x={720} y={690} s={0.56} tam={62} mensajes={[{ at: K.Oj + 0.6, yo: true, texto: 'clic · clic · clic · clic' }, { at: K.Oj + 1.5, texto: 'Traducción: ???' }]} escribe={[K.Oj + 1.0, K.Oj + 1.5]} />
      </div>}
      <MitoTachado T={T} at={K.Oj + 0.5} tacharEn={K.Oj + 3.1} until={K.V - 0.2} texto="Una IA tradujo a las ballenas" x={540} y={1030} tam={42} />
      <Chip T={T} at={K.Oj + 4.0} until={K.V - 0.2} texto="análisis por computadora ✔" x={540} y={1140} tam={36} borde={KC.leaf} />
      {/* 10 · vocales (2025, Berkeley) */}
      <Escena T={T} a={K.V} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <circle cx={300} cy={500} r={90 + 10 * Math.sin(T * 8)} fill="none" stroke={BAZUL} strokeWidth={8} opacity=".5" />
          <circle cx={300} cy={500} r={56} fill={BAZUL} stroke={KC.texto} strokeWidth={6} />
          <text x={300} y={640} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto}>dentro de cada clic</text>
          <path d="M 260 560 L 310 760 M 340 560 L 770 760" stroke="rgba(246,243,236,.3)" strokeWidth={4} strokeDasharray="10 10" opacity={kprog(T, K.V + 0.6, K.V + 1.0)} />
          <Espectro T={T} at={K.V + 0.9} x={110} y={760} bandas={[0.5]} letra="a" color={KC.cyan} />
          <Espectro T={T} at={K.V + 1.8} x={570} y={760} bandas={[0.36, 0.66]} letra="i" color={KC.pink} />
        </>)}
      </Escena>
      <Chip T={T} at={K.V + 2.4} until={K.C - 0.2} texto="2025 · UC Berkeley · Beguš et al. · Open Mind" x={540} y={1130} tam={28} borde={KC.cyan} />
      {/* 11 · cierre: la misma tira, ahora con sus piezas */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        <Ambiente T={T} n={26} color="rgba(255,255,255,.5)" />
        {svg(<>
          <TiraClics T={T} y={780} morse={0} piezas={kprog(T, K.C + 0.6, K.C + 1.4, kEase.sale)} />
          <Cachalote x={210} y={960} s={0.72} T={T} halo={BAZUL} />
          <Cachalote x={870} y={985} s={0.72} dir={-1} T={T} halo={BNAR} seed={3} />
        </>)}
      </Escena>
      <MitoTachado T={T} at={K.C + 0.2} tacharEn={K.C + 1.0} until={K.Ou} texto="código Morse" x={290} y={560} tam={44} />
      <Chip T={T} at={K.C + 2.0} until={K.Ou} texto="un alfabeto de piezas" x={300} y={680} tam={40} borde={KC.pink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={L1 - 0.1} texto="Esto no es *código Morse:* son cachalotes." />
      <Subtitulo T={T} idx={1} at={L1} until={K.Co - 0.1} texto="Se arman *como un alfabeto.*" />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.E - 0.1} texto="Cada serie de clics: *una coda.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.Pi - 0.1} texto="MIT + CETI, 2024: *8,719 codas.*" />
      <Subtitulo T={T} idx={4} at={K.Pi + 0.1} until={K.R - 0.1} texto="Cuatro piezas, *dos nuevas.*" />
      <Subtitulo T={T} idx={5} at={K.R + 0.1} until={K.O - 0.1} texto="*Rubato:* la otra lo imita." />
      <Subtitulo T={T} idx={6} at={K.O + 0.1} until={K.P - 0.1} texto="*Ornamento:* un clic extra." />
      <Subtitulo T={T} idx={7} at={K.P + 0.1} until={K.Cb - 0.1} texto="¿Y eso *qué cambia?*" />
      <Subtitulo T={T} idx={8} at={K.Cb + 0.1} until={K.Oj - 0.1} texto="De 21 tipos a *143+ combinaciones.*" />
      <Subtitulo T={T} idx={9} at={K.Oj + 0.1} until={K.V - 0.1} texto="No es traducir: *análisis por computadora.*" />
      <Subtitulo T={T} idx={10} at={K.V + 0.1} until={K.C - 0.1} texto="Berkeley, 2025: *«vocales» a e i.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Más que Morse: *un alfabeto de piezas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Codas + 0.6, CUES.Estudio - 0.1, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Piezas - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Rubato + 0.5, CUES.Ornamento - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Combina + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Combina + 3.6, CUES.Ojo - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Ojo + 0.4, CUES.Vocales - 0.1, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Vocales + 2.5, CUES.Cierre - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="ia" num="35" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BallenasApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Ballenas /></CompositionStage></div>;
}
window.BallenasApp = BallenasApp;
