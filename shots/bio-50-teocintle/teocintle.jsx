// Shot Biotecnológico #50 · Tu tortilla era un pasto: del teocintle al maíz — NARRADO (N1 por dentro + toque de N2).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (no está a escala).
const PIEDRA = '#a08a68', PIEDRA2 = '#7a6548', GRANO = '#ffd23f', HOJA = '#3fbf4a', HOJA2 = '#2a8f37', TALLO = '#7cc35a';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Espiga (flor macho) en la punta de una rama: un eje con ramitas y espiguillas.
function Espiga({ x, y, s = 1, rot = 0, T = 0, seed = 1 }) {
  const m = mece(T, seed, 0.4) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${rot + m}) scale(${s})`}>
    {[-1, 1, -1, 1, 0].map((d, i) => { const yy = -i * 22, L = 70 - i * 10;
      return <g key={i}>
        <path d={`M 0 ${yy} Q ${d * L * 0.5} ${yy - 20} ${d * L} ${yy - 8 - (d === 0 ? 50 : 0)}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
        <path d={`M 0 ${yy} Q ${d * L * 0.5} ${yy - 20} ${d * L} ${yy - 8 - (d === 0 ? 50 : 0)}`} stroke="#e9d27a" strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="6 5" />
      </g>; })}
    <path d="M 0 30 L 0 -110" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M 0 30 L 0 -110" stroke="#e9d27a" strokeWidth={5} strokeLinecap="round" />
  </g>;
}

// Mazorquita de teocintle: 2 hileras de estuches de piedra que alternan (zigzag). abre 0..1 = se desarma.
function MazorquitaTeo({ x, y, s = 1, n = 8, rot = 0, abre = 0, T = 0, grano = 0 }) {
  const R = krng(11);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => {
      const lado = i % 2 ? 1 : -1, yy = -i * 34, w = 46 - i * 1.5;
      const dx = abre * (R() - 0.5) * 520, dy = abre * (60 + R() * 160), rr = abre * (R() - 0.5) * 160;
      return <g key={i} transform={`translate(${lado * 12 + dx} ${yy + dy}) rotate(${lado * 8 + rr})`}>
        <path d={`M ${-w / 2} 18 L ${w / 2} 18 L ${w / 2 - 6} -22 L ${-w / 2 + 6} -22 Z`} fill={PIEDRA} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        <path d={`M ${-w / 2 + 8} -16 Q 0 -26 ${w / 2 - 8} -16 L ${w / 2 - 10} 4 Q 0 -6 ${-w / 2 + 10} 4 Z`} fill="#c9b48c" opacity=".9" />
        <path d={`M ${-w / 2 + 10} -14 L ${-w / 2 + 16} 10`} stroke="#fff" strokeWidth={3} opacity=".5" strokeLinecap="round" />
        {grano > 0 && <ellipse cx={0} cy={-2} rx={12 * grano} ry={9 * grano} fill={GRANO} stroke={KC.ink} strokeWidth={3} />}
      </g>; })}
    {abre < 0.3 && <path d={`M 0 ${-n * 34 + 10} q 10 -40 -6 -80 M 6 ${-n * 34 + 10} q 22 -30 18 -70`} stroke="#f2e6c4" strokeWidth={4} fill="none" opacity={1 - abre * 3} />}
  </g>;
}

// Mazorca de maíz con hileras de granos y hojas (totomoxtle).
function Mazorca({ x, y, s = 1, rot = 0, hojas = 1, cols = 7, filas = 16 }) {
  const H = 380, W = 150;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {hojas > 0 && <g opacity={hojas}>
      <path d={`M 0 ${H / 2 + 20} Q -150 ${H / 2 - 40} -120 ${-H / 2 + 60} Q -70 ${-H / 2 - 30} -40 ${-H / 2 - 60} Q -40 0 0 ${H / 2 + 20} Z`} fill="#b8d97a" stroke={KC.ink} strokeWidth={6} />
      <path d={`M 0 ${H / 2 + 20} Q 150 ${H / 2 - 40} 125 ${-H / 2 + 80} Q 90 ${-H / 2 - 10} 60 ${-H / 2 - 40} Q 50 0 0 ${H / 2 + 20} Z`} fill="#9fcb5e" stroke={KC.ink} strokeWidth={6} />
    </g>}
    <path d={`M ${-W / 2} ${H / 2 - 20} Q ${-W / 2 - 6} ${-H / 4} ${-W / 4} ${-H / 2} Q 0 ${-H / 2 - 24} ${W / 4} ${-H / 2} Q ${W / 2 + 6} ${-H / 4} ${W / 2} ${H / 2 - 20} Q 0 ${H / 2 + 22} ${-W / 2} ${H / 2 - 20} Z`} fill="#f2b632" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: filas }, (_, r) => Array.from({ length: cols }, (_, c) => {
      const v = r / (filas - 1), ancho = W * (0.62 + 0.38 * Math.sin(Math.PI * (0.15 + v * 0.75))), u = (c + 0.5) / cols - 0.5;
      const kx = u * ancho, ky = -H / 2 + 22 + v * (H - 50), kw = ancho / cols * Math.cos(u * 2.2) * 0.92;
      return <rect key={r * cols + c} x={kx - kw / 2} y={ky - 10} width={kw} height={19} rx={6} fill={mixHex(GRANO, '#fff1a8', 0.35 - Math.abs(u) * 0.6)} stroke="#a8740c" strokeWidth={2.5} />;
    }))}
    <path d={`M -18 ${-H / 2 + 10} q -20 -60 -10 -110 M 0 ${-H / 2 + 6} q 6 -60 30 -110 M 14 ${-H / 2 + 10} q 30 -40 54 -80`} stroke="#c98a4a" strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}

// Planta: u = 0 teocintle (muchas ramas largas con espiga en la punta) → u = 1 maíz (una caña; mazorcas en ramitas cortas).
function Planta({ T, x, y, s = 1, u = 0, seed = 1, marca = 0 }) {
  const H = 620, sway = mece(T, seed, 0.3) * 3;
  const ramas = [-34, -18, 18, 34];
  const hoja = (yy, d, L, k) => <path key={k} d={`M 0 ${yy} Q ${d * L * 0.55} ${yy - 70} ${d * L} ${yy - 10 + mece(T, seed + k, 0.5) * 14}`} stroke={KC.ink} strokeWidth={22} fill="none" strokeLinecap="round" />;
  const hojaC = (yy, d, L, k) => <path key={'c' + k} d={`M 0 ${yy} Q ${d * L * 0.55} ${yy - 70} ${d * L} ${yy - 10 + mece(T, seed + k, 0.5) * 14}`} stroke={HOJA} strokeWidth={13} fill="none" strokeLinecap="round" />;
  const tallo = (L, ang, k, ancho) => <g key={k} transform={`rotate(${ang})`}>
    <path d={`M 0 0 L 0 ${-L}`} stroke={KC.ink} strokeWidth={ancho + 8} strokeLinecap="round" />
    <path d={`M 0 0 L 0 ${-L}`} stroke={TALLO} strokeWidth={ancho} strokeLinecap="round" />
    {[0.35, 0.6, 0.8].map((f, j) => hoja(-L * f, j % 2 ? 1 : -1, 150 * (1 - f * 0.4), k * 10 + j))}
    {[0.35, 0.6, 0.8].map((f, j) => hojaC(-L * f, j % 2 ? 1 : -1, 150 * (1 - f * 0.4), k * 10 + j))}
    <Espiga x={0} y={-L - 20} s={0.7} T={T} seed={seed + k} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${sway}) scale(${s})`}>
    {/* ramas largas del teocintle: se recogen hacia la caña cuando u sube */}
    {ramas.map((a, i) => <g key={i} opacity={1 - kprog(u, 0.55, 0.95)}>{tallo(H * (0.78 - Math.abs(a) / 300) * (1 - u * 0.5), a * (1 - u), i + 1, 14)}</g>)}
    {tallo(H, 0, 0, 20 + u * 8)}
    {/* mazorquitas de teocintle (pequeñas) → mazorcas de maíz (grandes, en ramas cortas) */}
    {u < 0.6 && [[-0.42, -1], [-0.58, 1]].map(([f, d], i) => <MazorquitaTeo key={i} x={d * 22} y={H * f} s={0.42} rot={d * 24} n={7} />)}
    {u > 0.35 && [[-0.4, 1], [-0.55, -1]].map(([f, d], i) => <Mazorca key={i} x={d * 50} y={H * f} s={0.32 * kprog(u, 0.35, 1)} rot={d * 18} />)}
    {marca > 0 && <g opacity={marca}><circle cx={0} cy={-H * 0.35} r={110 + Math.sin(T * 6) * 12} fill="rgba(244,194,90,.25)" stroke={KC.gold2} strokeWidth={16} /><circle cx={0} cy={-H * 0.35} r={30} fill={KC.gold2} stroke={KC.ink} strokeWidth={8} /></g>}
  </g>;
}

// Comal con tortilla que se infla.
function Comal({ T, x, y, s = 1, inflar = 1 }) {
  const b = inflar * (26 + Math.sin(T * 2.4) * 8);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={36} rx={250} ry={62} fill="#2b2b2b" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={0} cy={26} rx={236} ry={52} fill="#444" />
    <path d={`M -175 22 Q -170 ${-b * 1.6} 0 ${-b * 2} Q 170 ${-b * 1.6} 175 22 Q 0 70 -175 22 Z`} fill="#f3dfa0" stroke={KC.ink} strokeWidth={6} />
    {[[-90, 0], [-20, -b], [60, -6], [110, 10], [-40, 24], [30, 30]].map(([dx, dy], i) => <ellipse key={i} cx={dx} cy={dy} rx={14} ry={7} fill="#b9873f" opacity=".7" />)}
    {[0, 1, 2].map((i) => { const p = ((T * 0.6 + i / 3) % 1); return <path key={i} d={`M ${-60 + i * 60} ${-30 - p * 160} q 16 -20 0 -40 q -16 -20 0 -40`} stroke="#fff" strokeWidth={6} fill="none" opacity={(1 - p) * 0.55 * inflar} strokeLinecap="round" />; })}
  </g>;
}

// Piedra de moler (metate) con su mano.
function Metate({ T, x, y, s = 1, mueve = 1 }) {
  const mx = Math.sin(T * 3.2) * 90 * mueve;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 0 L 300 -60 L 310 -10 L -290 60 Z" fill="#8f8a83" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {[[-250, 50], [250, -8], [0, 30]].map(([lx, ly], i) => <path key={i} d={`M ${lx - 20} ${ly} L ${lx - 14} ${ly + 70} L ${lx + 14} ${ly + 70} L ${lx + 20} ${ly - 4} Z`} fill="#77726b" stroke={KC.ink} strokeWidth={6} />)}
    <g transform={`translate(${mx} ${-30 - mx * 0.1}) rotate(-6)`}><rect x={-150} y={-34} width={300} height={56} rx={28} fill="#a6a19a" stroke={KC.ink} strokeWidth={7} /><rect x={-130} y={-24} width={120} height={10} rx={5} fill="#fff" opacity=".3" /></g>
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-220 + i * 38} cy={26 - i * 4.4} r={6} fill="#fff4d2" opacity=".8" />)}
  </g>;
}

// Granos de almidón (al microscopio): poliédricos con el hilo al centro.
function Almidon({ T, w, h, n = 16 }) {
  const R = krng(23);
  return <svg width={w} height={h} style={{ position:'absolute', left:0, top:0 }}>
    {Array.from({ length: n }, (_, i) => { const cx = 40 + R() * (w - 80), cy = 40 + R() * (h - 80), r = 26 + R() * 30, k = 5 + Math.floor(R() * 3), ph = R() * 6, f = kprog(T, 0, 1);
      const pts = Array.from({ length: k }, (_, j) => { const a = ph + j / k * Math.PI * 2; const rr = r * (0.85 + 0.15 * Math.sin(j * 3 + i)); return `${cx + Math.cos(a) * rr},${cy + Math.sin(a) * rr}`; }).join(' ');
      return <g key={i} transform={`translate(${Math.sin(T * 0.8 + i) * 4} ${Math.cos(T * 0.7 + i) * 4})`}>
        <polygon points={pts} fill="rgba(240,248,255,.22)" stroke="#dff3ff" strokeWidth={4} strokeLinejoin="round" />
        <circle cx={cx} cy={cy} r={4} fill="#dff3ff" />
        <path d={`M ${cx - 9} ${cy} L ${cx + 9} ${cy} M ${cx} ${cy - 9} L ${cx} ${cy + 9}`} stroke="#dff3ff" strokeWidth={2.5} opacity=".7" />
      </g>; })}
  </svg>;
}

// Corte del estuche de teocintle: la cúpula y la gluma de piedra rodean el grano; con tga1 de maíz se encogen y el grano queda desnudo.
function CorteGrano({ T, w, h, libre = 0, at }) {
  const cx = w / 2, cy = h * 0.42;
  const cup = 1 - libre * 0.75, glu = 1 - libre;
  return <svg width={w} height={h} style={{ position:'absolute', left:0, top:0 }}>
    {/* grano */}
    <ellipse cx={cx} cy={cy - libre * 30} rx={80 + libre * 30} ry={60 + libre * 22} fill={GRANO} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={cx - 22} cy={cy - 20 - libre * 30} rx={22} ry={12} fill="#fff" opacity=".45" />
    {/* cúpula (taza dura) */}
    <path d={`M ${cx - 140 * cup - 20} ${cy - 10} Q ${cx - 150 * cup} ${cy + 120} ${cx} ${cy + 130} Q ${cx + 150 * cup} ${cy + 120} ${cx + 140 * cup + 20} ${cy - 10} L ${cx + 100 * cup} ${cy - 10} Q ${cx + 90 * cup} ${cy + 80} ${cx} ${cy + 86} Q ${cx - 90 * cup} ${cy + 80} ${cx - 100 * cup} ${cy - 10} Z`} fill={PIEDRA2} stroke={KC.ink} strokeWidth={6} opacity={0.4 + 0.6 * cup} />
    {/* gluma (tapa dura) */}
    {glu > 0.02 && <path d={`M ${cx - 120} ${cy - 6} Q ${cx - 110} ${cy - 120 * glu - 10} ${cx} ${cy - 130 * glu - 20} Q ${cx + 110} ${cy - 120 * glu - 10} ${cx + 120} ${cy - 6} L ${cx + 96} ${cy - 6} Q ${cx + 80} ${cy - 90 * glu} ${cx} ${cy - 100 * glu - 10} Q ${cx - 80} ${cy - 90 * glu} ${cx - 96} ${cy - 6} Z`} fill={PIEDRA} stroke={KC.ink} strokeWidth={6} opacity={glu} transform={`translate(0 ${-libre * 60})`} />}
    {/* destellos de sílice en la piedra */}
    {glu > 0.2 && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={cx - 80 + i * 40} cy={cy - 70 - (i % 2) * 20} r={4 + Math.sin(T * 5 + i) * 2} fill="#fff" opacity={glu * 0.7} />)}
  </svg>;
}

function Teocintle() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Te: CUES.Teocintle, Mq: CUES.Mazorquita, Ma: CUES.Mazorca, Pr: CUES.Pregunta, Se: CUES.Seleccion, Ga: CUES.Tga1, Tb: CUES.Tb1,
    Es: CUES.Estudio, Ho: CUES.Hopscotch, De: CUES.Dependencia, Bi: CUES.Biotec, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const viento = (k) => mece(T, k, 0.25);
  // Balsas (esquemático): contorno aproximado de la cuenca y el río
  const CUENCA = [[-103.2, 19.6], [-101.6, 19.9], [-99.6, 19.4], [-98.0, 19.3], [-97.5, 18.6], [-97.9, 17.7], [-99.6, 17.4], [-101.3, 17.7], [-102.4, 17.9]];
  const RIO = [[-98.2, 19.0], [-98.8, 18.4], [-99.6, 18.0], [-100.6, 18.2], [-101.3, 18.4], [-101.9, 18.2], [-102.2, 17.95]];
  const ruta = (pts) => 'M ' + pts.map(([a, b]) => mxProy(a, b).map((v) => v.toFixed(1)).join(' ')).join(' L ');
  const libre = kprog(T, K.Ga + 1.4, K.Ga + 2.8, kEase.suave);
  const uTb = kprog(T, K.Tb + 0.6, K.Tb + 3.2, kEase.suave);
  const crece = kprog(T, K.De + 1.6, K.De + 3.6, kEase.sale);
  const desarma = kprog(T, K.De + 0.4, K.De + 1.6, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la mata de teocintle se mece junto al comal */}
      <Escena T={T} a={K.G} b={K.Te} zoom={0.06} origen="35% 55%">
        <FondoMarca color={KC.yellow} T={T} />
        <SvgCapa>
          <rect x={0} y={1250} width={KW} height={700} fill="#c98a4a" /><rect x={0} y={1250} width={KW} height={18} fill={KC.ink} />
          <Planta T={T} x={300} y={1260} s={1.05} u={0} seed={2} />
          <Comal T={T} x={760} y={1150} s={0.9} inflar={kprog(T, K.G + 0.2, K.G + 1.4, kEase.rebote)} />
        </SvgCapa>
      </Escena>
      {/* 1 · dónde vive: la cuenca del Balsas */}
      <Escena T={T} a={K.Te} b={K.Mq} zoom={0.08} origen="55% 45%">
        <FondoMarca color={KC.cyan} patron="rayas" />
        <SvgCapa>
          <MapaMexico x={-230} y={300} ancho={1800} conCA={false}>
            <path d={'M ' + CUENCA.map(([a, b]) => mxProy(a, b).join(' ')).join(' L ') + ' Z'} fill={KC.mint} stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Te + 0.4, K.Te + 1.2)} />
            <path d={ruta(RIO)} stroke={KC.blue} strokeWidth={5} fill="none" strokeLinecap="round" strokeDasharray="400" strokeDashoffset={400 * (1 - kprog(T, K.Te + 1.0, K.Te + 2.6))} />
            {[[-100.2, 18.7], [-101.6, 18.9], [-99.0, 18.6], [-100.9, 18.0]].map(([a, b], i) => { const [px, py] = mxProy(a, b), e = kprog(T, K.Te + 1.6 + i * 0.3, K.Te + 2.0 + i * 0.3, kEase.rebote);
              return <g key={i} transform={`translate(${px} ${py}) scale(${e * 0.6})`}><path d="M 0 0 L -6 -26 M 0 0 L 0 -32 M 0 0 L 6 -26" stroke={HOJA2} strokeWidth={5} strokeLinecap="round" /></g>; })}
          </MapaMexico>
        </SvgCapa>
        <Etq T={T} at={K.Te + 1.2} until={K.Mq - 0.3} x={90} y={1080} texto="cuenca del río Balsas" lado="der" tam={36} />
        <Etq T={T} at={K.Te + 2.4} until={K.Mq - 0.3} x={60} y={1440} texto="Zea mays ssp. parviglumis" it lado="der" tam={36} color={KC.texto} />
        <Chip T={T} at={K.Te + 0.3} until={K.Mq - 0.3} texto="teocintle · pasto silvestre" y={1580} tam={40} borde={KC.mint} />
      </Escena>
      {/* 2 · la mazorquita: 5 a 12 granos en cáscara de piedra */}
      <Escena T={T} a={K.Mq} b={K.Ma} zoom={0.06}>
        <FondoMarca color={KC.pink} T={T} />
        <SvgCapa>
          <MazorquitaTeo x={540} y={1180} s={1.7} n={9} T={T} rot={Math.sin(T * 0.8) * 3} />
          {Array.from({ length: 9 }, (_, i) => { const e = kprog(T, K.Mq + 0.8 + i * 0.22, K.Mq + 1.0 + i * 0.22); const lado = i % 2 ? 1 : -1;
            return <circle key={i} cx={540 + lado * 20 * 1.7} cy={1180 - i * 34 * 1.7} r={44 * e} fill="none" stroke={KC.yellow} strokeWidth={6} opacity={e * (1 - kprog(T, K.Ma - 0.6, K.Ma))} />; })}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Mq + 0.4} until={K.Ma - 0.3} valor={12} desde={12} prefijo="5–" etiqueta="granos" y={560} tam={220} color={KC.yellow} />
        <Etq T={T} at={K.Mq + 1.8} until={K.Ma - 0.3} x={600} y={980} texto="cáscara de piedra" lado="der" tam={32} />
      </Escena>
      {/* 3 · la mazorca: 500 o más */}
      <Escena T={T} a={K.Ma} b={K.Pr} zoom={0.05}>
        <FondoMarca color={KC.mint} T={T} />
        <SvgCapa>
          <MazorquitaTeo x={250} y={1150} s={1.1} n={8} T={T} />
          <Mazorca x={700} y={960} s={1.25} rot={Math.sin(T) * 2} hojas={kprog(T, K.Ma + 0.3, K.Ma + 0.9)} />
        </SvgCapa>
        <NumeroGigante T={T} at={K.Ma + 0.5} until={K.Pr - 0.3} valor={500} dur={1.6} sufijo="+" etiqueta="granos (maíz)" y={520} tam={220} color={KC.yellow} />
        <Etq T={T} at={K.Ma + 0.4} until={K.Pr - 0.3} x={150} y={800} texto="teocintle" lado="der" tam={32} />
        <Etq T={T} at={K.Ma + 1.4} until={K.Pr - 0.3} x={860} y={1210} texto="sin cáscara" lado="izq" tam={34} />
      </Escena>
      {/* 4 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Se} zoom={0.08}>
        <FondoMarca color={KC.lilac} patron="rayas" />
        <SvgCapa>
          <MazorquitaTeo x={690} y={900} s={0.9} n={8} T={T} />
          <FlechaCurva x1={730} y1={940} x2={860} y2={1020} p={kprog(T, K.Pr + 0.3, K.Pr + 1.1)} curva={-60} color={KC.yellow} T={T} />
          <Mazorca x={900} y={1080} s={0.55} hojas={0} />
          <text x={830} y={760} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} transform={`rotate(${Math.sin(T * 3) * 6} 830 660)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 5 · selección: generación tras generación */}
      <Escena T={T} a={K.Se} b={K.Ga} zoom={0.04}>
        <FondoMarca color={KC.orange} T={T} />
        <SvgCapa>
          <rect x={0} y={1240} width={KW} height={700} fill="#b5763c" /><rect x={0} y={1240} width={KW} height={16} fill={KC.ink} />
          {[0, 1, 2, 3].map((i) => { const e = kprog(T, K.Se + 0.3 + i * 0.75, K.Se + 0.8 + i * 0.75, kEase.rebote);
            return e > 0 && <g key={i} opacity={Math.min(1, e * 1.5)}><Planta T={T} x={150 + i * 260} y={1250} s={0.55 * e} u={i / 3} seed={i + 4} /></g>; })}
          {[0, 1, 2].map((i) => <FlechaCurva key={i} x1={190 + i * 260} y1={840} x2={370 + i * 260} y2={840} p={kprog(T, K.Se + 0.9 + i * 0.75, K.Se + 1.3 + i * 0.75)} curva={40} color={KC.texto} grosor={6} T={T} />)}
        </SvgCapa>
        <Chip T={T} at={K.Se + 1.7} until={K.Ga - 0.3} texto="≈ 9,000 años · según el ADN (2002)" y={1520} tam={38} borde={KC.gold} />
      </Escena>
      {/* 6 · tga1: por dentro del grano */}
      <Escena T={T} a={K.Ga} b={K.Tb} zoom={0.03}>
        <FondoMarca color={KC.pink} T={T} />
        <SvgCapa><MazorquitaTeo x={180} y={1200} s={1.3} n={8} T={T} /></SvgCapa>
        <Lupa T={T} at={K.Ga + 0.2} until={K.Tb - 0.3} x={600} y={800} r={300} fx={196} fy={1150} tinte={KC.gold2} etiqueta="POR DENTRO · el grano"
          interior={(t, r) => <div style={{ position:'absolute', inset:0, background:'#0d1424' }}>
            <CorteGrano T={t} w={r * 2} h={r * 2} libre={libre} />
            <svg width={r * 2} height={r * 2} style={{ position:'absolute', left:0, top:0 }}><ADNHebra T={t} x={70} y={r * 2 - 120} largo={r * 2 - 140} alto={44} vueltas={3} resalta={(u) => u > 0.4 && u < 0.62 && t > K.Ga + 0.8} /></svg>
            <div style={{ position:'absolute', left:0, right:0, top:r * 2 - 80, textAlign:'center', font:`700 34px ${KF.mono}`, fontStyle:'italic', color:KC.gold2, opacity:kprog(t, K.Ga + 0.9, K.Ga + 1.2) }}>tga1</div>
          </div>} />
        <Chip T={T} at={K.Ga + 2.4} until={K.Tb - 0.3} texto="un solo gen: grano desnudo" y={1520} tam={40} borde={KC.gold2} />
      </Escena>
      {/* 7 · tb1: muchas ramas → una caña */}
      <Escena T={T} a={K.Tb} b={K.Es} zoom={0.04}>
        <FondoMarca color={KC.cyan} T={T} />
        <SvgCapa>
          <rect x={0} y={1250} width={KW} height={700} fill="#c98a4a" /><rect x={0} y={1250} width={KW} height={18} fill={KC.ink} />
          <Planta T={T} x={460} y={1260} s={0.95} u={uTb} seed={9} />
        </SvgCapa>
        <Chip T={T} at={K.Tb + 0.3} until={K.Es - 0.3} texto="tb1 · una caña en vez de muchas ramas" y={1520} tam={36} borde={KC.mint} />
      </Escena>
      {/* 8 · el estudio: almidón en piedras de moler, Guerrero */}
      <Escena T={T} a={K.Es} b={K.Ho} zoom={0.04}>
        <FondoMarca color="#d9b98a" T={T} />
        <SvgCapa>
          <path d="M 0 700 Q 300 560 620 640 Q 900 700 1080 600 L 1080 1920 L 0 1920 Z" fill="#b08a5c" />
          <path d="M -40 760 Q 260 520 700 600 Q 980 650 1120 540" stroke={KC.ink} strokeWidth={10} fill="none" />
          <Metate T={T} x={560} y={1060} s={1.1} mueve={1 - kprog(T, K.Es + 3.0, K.Es + 3.4)} />
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 3.2} anio="2009" quien="Xihuatoxtla, Guerrero" revista="Piperno et al. · PNAS · estudio" y={600} />
        <Lupa T={T} at={K.Es + 3.4} until={K.Ho - 0.3} x={640} y={760} r={250} fx={560} fy={1010} tinte={KC.cyan} etiqueta="AL MICROSCOPIO · almidón"
          interior={(t, r) => <div style={{ position:'absolute', inset:0, background:'#0d1424' }}><Almidon T={t - K.Es - 3.4} w={r * 2} h={r * 2} /></div>} />
        <Chip T={T} at={K.Es + 3.8} until={K.Ho - 0.3} texto="almidón de maíz · hace 8,700 años" y={1520} tam={38} borde={KC.cyan} />
      </Escena>
      {/* 9 · Hopscotch: la versión de tb1 ya estaba en el teocintle */}
      <Escena T={T} a={K.Ho} b={K.De} zoom={0.04}>
        <FondoMarca color={KC.mint} T={T} />
        <SvgCapa>
          <rect x={0} y={900} width={KW} height={1000} fill="#9bcf7a" /><rect x={0} y={900} width={KW} height={14} fill={KC.ink} />
          {[0, 1, 2].map((i) => <Planta key={i} T={T} x={110 + i * 170} y={910} s={0.4} u={0} seed={i + 12} marca={i === 1 ? kprog(T, K.Ho + 0.8, K.Ho + 1.3) : 0} />)}
          <ADNHebra T={T} x={50} y={1020} largo={460} alto={50} vueltas={3} resalta={(u) => u > 0.45 && u < 0.7 && T > K.Ho + 1.6} />
          {T > K.Ho + 1.6 && <text x={280} y={1110} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.ink}>Hopscotch</text>}
        </SvgCapa>
        <Chip T={T} at={K.Ho + 2.0} until={K.De - 0.3} texto="≥ 10,000 años antes de domesticarlo" y={1520} tam={38} borde={KC.gold2} />
      </Escena>
      {/* 10 · dependencia: la mazorca no se suelta */}
      <Escena T={T} a={K.De} b={K.Bi} zoom={0.04}>
        <FondoMarca color={KC.yellow} T={T} />
        <SvgCapa>
          <rect x={0} y={1150} width={KW} height={800} fill="#a8703a" /><rect x={0} y={1150} width={KW} height={16} fill={KC.ink} />
          <MazorquitaTeo x={250} y={1100} s={1.1} n={8} T={T} abre={desarma * 0.6} />
          <g transform={`translate(0 ${klerp(-500, 0, kprog(T, K.De + 0.2, K.De + 0.9, kEase.rebote))})`}><Mazorca x={760} y={1090} s={0.95} rot={88} hojas={0.6} /></g>
          {Array.from({ length: 14 }, (_, i) => { const x = 600 + (i % 7) * 50, y = 1060 - Math.floor(i / 7) * 16, h = crece * (70 + (i * 23) % 50);
            return <path key={i} d={`M ${x} ${y} q ${(i % 2 ? 6 : -6)} ${-h * 0.6} ${(i % 2 ? 14 : -14)} ${-h}`} stroke={HOJA2} strokeWidth={7} fill="none" strokeLinecap="round" opacity={crece > 0 ? 1 : 0} />; })}
        </SvgCapa>
        <Etq T={T} at={K.De + 1.2} until={K.Bi - 0.3} x={40} y={760} texto="teocintle: se desarma" lado="der" tam={32} />
        <Etq T={T} at={K.De + 2.2} until={K.Bi - 0.3} x={1040} y={940} texto="maíz: brotan apretados" lado="izq" tam={32} />
        <Chip T={T} at={K.De + 2.6} until={K.Bi - 0.3} texto="el maíz depende de nosotros" y={1520} tam={40} borde={KC.red} />
      </Escena>
      {/* 11 · biotecnología: escoger semillas */}
      <Escena T={T} a={K.Bi} b={K.Ci} zoom={0.05}>
        <FondoMarca color={KC.cyan} T={T} />
        <SvgCapa>
          <g transform="translate(540 1080)">
            <path d="M -260 -40 Q -250 160 0 170 Q 250 160 260 -40 Z" fill="#c4632f" stroke={KC.ink} strokeWidth={9} />
            <ellipse cx={0} cy={-40} rx={260} ry={50} fill="#8a3f1b" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 26 }, (_, i) => { const R = krng(40 + i); const cx = (R() - 0.5) * 420, cy = -44 + (R() - 0.5) * 50; const col = ['#ffd23f', '#f6f3ec', '#3b2a7a', '#d7263d'][i % 4];
              return <ellipse key={i} cx={cx} cy={cy} rx={20} ry={15} fill={col} stroke={KC.ink} strokeWidth={3} />; })}
            {[0, 1, 2].map((i) => { const p = ((T - K.Bi) * 0.9 + i / 3) % 1; return <ellipse key={'c' + i} cx={-60 + i * 60} cy={-420 + p * 360} rx={20} ry={15} fill={['#ffd23f', '#3b2a7a', '#f6f3ec'][i]} stroke={KC.ink} strokeWidth={3} opacity={T > K.Bi + 0.3 ? 1 - p * 0.3 : 0} />; })}
          </g>
          <g transform={`translate(850 700) rotate(${Math.sin(T * 2) * 4})`} opacity={kprog(T, K.Bi + 0.6, K.Bi + 1.0)}>
            <path d="M -30 -110 L 30 -110 L 30 -30 L 90 80 Q 95 100 75 100 L -75 100 Q -95 100 -90 80 L -30 -30 Z" fill="#e8f6ff" stroke={KC.ink} strokeWidth={7} />
            <path d="M -62 40 L 62 40 L 85 85 L -85 85 Z" fill={KC.lilac} />
            <path d={`M -110 -130 L ${-110 + 220 * kprog(T, K.Bi + 1.2, K.Bi + 1.6)} ${-130 + 260 * kprog(T, K.Bi + 1.2, K.Bi + 1.6)}`} stroke={KC.red} strokeWidth={18} strokeLinecap="round" />
          </g>
        </SvgCapa>
        <Chip T={T} at={K.Bi + 0.4} until={K.Ci - 0.3} texto="biotecnología = escoger semillas" y={1520} tam={40} borde={KC.gold2} />
      </Escena>
      {/* 12 · cierre: la misma mata, ahora con su mazorca y la tortilla */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05} origen="35% 55%">
        <FondoMarca color={KC.yellow} T={T} />
        <SvgCapa>
          <rect x={0} y={1250} width={KW} height={700} fill="#c98a4a" /><rect x={0} y={1250} width={KW} height={18} fill={KC.ink} />
          <Planta T={T} x={300} y={1260} s={1.05} u={0} seed={2} />
          <Comal T={T} x={760} y={1150} s={0.9} inflar={1} />
          <g transform={`translate(0 ${klerp(300, 0, kprog(T, K.Ci + 0.4, K.Ci + 1.2, kEase.rebote))})`} opacity={kprog(T, K.Ci + 0.4, K.Ci + 0.8)}><Mazorca x={600} y={1000} s={0.55} rot={-20} hojas={1} /></g>
        </SvgCapa>
      </Escena>

      {/* textos del gancho y el cierre */}
      <Chip T={T} at={K.G + 0.2} until={K.Te - 0.3} texto="¿una hierba más?" x={330} y={520} tam={44} borde={KC.ink} fondo={KC.paper} color={KC.ink} />
      <Etq T={T} at={K.G + 1.0} until={K.Te - 0.3} x={460} y={900} texto="teocintle" lado="der" tam={36} />
      <Chip T={T} at={K.Ci + 1.4} until={K.Ou} texto="teocintle → maíz → tu tortilla" y={1520} tam={40} borde={KC.gold2} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.05} until={K.Te - 0.1} texto="Parece maleza: *es el abuelo de tu tortilla.*" />
      <Subtitulo T={T} idx={1} at={K.Te + 0.1} until={K.Mq - 0.1} texto="Teocintle: *cuenca del río Balsas.*" />
      <Subtitulo T={T} idx={2} at={K.Mq + 0.1} until={K.Ma - 0.1} texto="De 5 a 12 granos, *en cáscara de piedra.*" />
      <Subtitulo T={T} idx={3} at={K.Ma + 0.1} until={K.Pr - 0.1} texto="Maíz: *500 granos o más.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Se - 0.1} texto="¿Cómo se volvió *tu elote?*" />
      <Subtitulo T={T} idx={5} at={K.Se + 0.1} until={K.Ga - 0.1} texto="Hace unos 9 mil años: *a escoger.*" />
      <Subtitulo T={T} idx={6} at={K.Ga + 0.1} until={K.Tb - 0.1} texto="Un solo gen: *tga1.*" />
      <Subtitulo T={T} idx={7} at={K.Tb + 0.1} until={K.Es - 0.1} texto="tb1: *una sola caña.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.Ho - 0.1} texto="Guerrero: *almidón de hace 8,700 años.*" />
      <Subtitulo T={T} idx={9} at={K.Ho + 0.1} until={K.De - 0.1} texto="Ya existía: *solo la escogieron.*" />
      <Subtitulo T={T} idx={10} at={K.De + 0.1} until={K.Bi - 0.1} texto="El maíz *no sobrevive solo.*" />
      <Subtitulo T={T} idx={11} at={K.Bi + 0.1} until={K.Ci - 0.1} texto="Biotecnología: *escoger semillas.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Parece maleza: *es el abuelo de tu tortilla.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Mazorquita + 0.8, CUES.Mazorca - 0.2, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Seleccion + 1.4, 'avatar_06_pensativo_menton', 'grande-izq'],
        [CUES.Tb1 + 0.5, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Hopscotch - 0.2, 'avatar_02_apuntando_camara', 'izq-alto'],
        [CUES.Hopscotch + 0.6, CUES.Dependencia - 0.2, 'avatar_11_sorprendido', 'grande'],
        [CUES.Dependencia + 0.8, CUES.Biotec - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 0.2, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="50" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TeocintleApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Teocintle /></CompositionStage></div>;
}
window.TeocintleApp = TeocintleApp;
