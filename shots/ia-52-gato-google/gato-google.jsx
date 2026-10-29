// Shot IA #52 · El gato que una computadora aprendió sola — NARRADO (N1 "Por dentro" + N2 "El número").
// Datos: Le, Ranzato, Monga, Devin, Chen, Corrado, Dean y Ng, "Building High-level Features Using Large Scale Unsupervised Learning",
// ICML 2012 (Edimburgo), arXiv:1112.6209; blog de Google (Dean y Ng, 26 jun 2012). Ver guion.md y verificacion.md.
// Todos los dibujos son esquemáticos (la cara del gato se inspira en la Figura 6 del artículo; no es la imagen original).

// ---------- Cara borrosa "lo que enciende a la neurona" (gato, cara humana o cuerpo) ----------
// nitidez 0..1 (0 = mancha gris, 1 = se distingue la cara). id único por instancia (filtro SVG).
function CaraNeurona({ x, y, s = 1, nitidez = 1, T = 0, id = 'a', cara = 'gato', marco = true }) {
  const r = krng(cara === 'gato' ? 7 : cara === 'humana' ? 11 : 13), celdas = [];
  for (let i = 0; i < 20; i++) for (let j = 0; j < 20; j++) { const g = Math.round(105 + r() * 70 + 12 * Math.sin(T * 1.6 + i * 0.7 + j * 0.5));
    celdas.push(<rect key={`${i}-${j}`} x={-260 + i * 26} y={-260 + j * 26} width={27} height={27} fill={`rgb(${g},${g},${g})`} />); }
  const blur = klerp(28, 5, kclamp(nitidez, 0, 1)), cl = `clip-${id}`;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <filter id={`bl-${id}`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={blur} /></filter>
      <clipPath id={cl}><rect x={-260} y={-260} width={520} height={520} rx={18} /></clipPath>
    </defs>
    <g clipPath={`url(#${cl})`}>
      <g filter={`url(#bl-${id})`}>
        {celdas}
        <g opacity={0.25 + 0.75 * kclamp(nitidez * 1.4, 0, 1)}>
          {cara === 'gato' && <>
            <polygon points="-150,-30 -120,-200 -35,-95" fill="#dadada" /><polygon points="150,-30 120,-200 35,-95" fill="#dadada" />
            <polygon points="-128,-60 -112,-160 -62,-98" fill="#7d7d7d" /><polygon points="128,-60 112,-160 62,-98" fill="#7d7d7d" />
            <ellipse cx={0} cy={35} rx={165} ry={140} fill="#d2d2d2" />
            <ellipse cx={-62} cy={10} rx={34} ry={26} fill="#262626" /><ellipse cx={62} cy={10} rx={34} ry={26} fill="#262626" />
            <polygon points="-22,62 22,62 0,88" fill="#3a3a3a" />
            <path d="M 0 88 Q -26 116 -50 104 M 0 88 Q 26 116 50 104" stroke="#3a3a3a" strokeWidth={9} fill="none" />
            {[-1, 1].map((k) => [0, 1, 2].map((w) => <line key={`${k}${w}`} x1={k * 60} y1={80 + w * 14} x2={k * 210} y2={60 + w * 30} stroke="#efefef" strokeWidth={6} />))}
          </>}
          {cara === 'humana' && <>
            <ellipse cx={0} cy={-150} rx={150} ry={80} fill="#4a4a4a" />
            <ellipse cx={0} cy={10} rx={135} ry={175} fill="#d6d6d6" />
            <ellipse cx={-50} cy={-20} rx={28} ry={16} fill="#2a2a2a" /><ellipse cx={50} cy={-20} rx={28} ry={16} fill="#2a2a2a" />
            <path d="M 0 -5 L -14 60 L 12 62" stroke="#6a6a6a" strokeWidth={10} fill="none" />
            <path d="M -48 105 Q 0 128 48 105" stroke="#3a3a3a" strokeWidth={12} fill="none" />
          </>}
          {cara === 'cuerpo' && <>
            <circle cx={0} cy={-150} r={58} fill="#dcdcdc" />
            <path d="M -80 -80 L 80 -80 L 70 120 L -70 120 Z" fill="#cfcfcf" />
            <path d="M -80 -70 L -130 90 M 80 -70 L 130 90" stroke="#cfcfcf" strokeWidth={38} strokeLinecap="round" />
            <path d="M -40 120 L -50 260 M 40 120 L 50 260" stroke="#cfcfcf" strokeWidth={44} strokeLinecap="round" />
          </>}
        </g>
      </g>
    </g>
    {marco && <rect x={-260} y={-260} width={520} height={520} rx={18} fill="none" stroke={KC.ink} strokeWidth={12} />}
  </g>;
}

// ---------- Cuadrito de video (esquemático): dibujo dentro de una caja 100×75 ----------
const MINI_FONDO = { gato:'#ffd28a', perro:'#bde7ff', coche:'#c9f2d0', persona:'#ffc2d6', paisaje:'#9fd8ff', pelota:'#efe4ff' };
function Miniatura({ x, y, w = 200, tipo = 'gato', o = 1, rot = 0, borde = 5 }) {
  const h = w * 0.75, k = w / 100;
  return <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={o}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={6 * k} fill={MINI_FONDO[tipo]} stroke={KC.ink} strokeWidth={borde} />
    <g transform={`translate(${-w / 2} ${-h / 2}) scale(${k})`}>
      {tipo === 'gato' && <g>
        <polygon points="30,30 34,10 46,24" fill="#f08a24" stroke={KC.ink} strokeWidth={1.6} /><polygon points="70,30 66,10 54,24" fill="#f08a24" stroke={KC.ink} strokeWidth={1.6} />
        <ellipse cx={50} cy={42} rx={24} ry={20} fill="#f6a03c" stroke={KC.ink} strokeWidth={1.8} />
        <ellipse cx={41} cy={39} rx={3.4} ry={4.4} fill={KC.ink} /><ellipse cx={59} cy={39} rx={3.4} ry={4.4} fill={KC.ink} />
        <polygon points="47,47 53,47 50,51" fill="#e2557a" />
        <path d="M 30 48 L 16 46 M 30 52 L 17 55 M 70 48 L 84 46 M 70 52 L 83 55" stroke={KC.ink} strokeWidth={1.2} />
      </g>}
      {tipo === 'perro' && <g>
        <ellipse cx={50} cy={42} rx={22} ry={22} fill="#b7834f" stroke={KC.ink} strokeWidth={1.8} />
        <ellipse cx={28} cy={42} rx={8} ry={16} fill="#7a5130" stroke={KC.ink} strokeWidth={1.6} /><ellipse cx={72} cy={42} rx={8} ry={16} fill="#7a5130" stroke={KC.ink} strokeWidth={1.6} />
        <circle cx={42} cy={38} r={3.2} fill={KC.ink} /><circle cx={58} cy={38} r={3.2} fill={KC.ink} />
        <ellipse cx={50} cy={52} rx={9} ry={6} fill="#e9cfae" /><ellipse cx={50} cy={49} rx={4} ry={3} fill={KC.ink} />
      </g>}
      {tipo === 'coche' && <g>
        <path d="M 14 52 L 20 40 L 36 30 L 64 30 L 78 40 L 88 44 L 88 54 L 14 54 Z" fill="#ff3b2f" stroke={KC.ink} strokeWidth={1.8} />
        <path d="M 38 33 L 50 33 L 50 41 L 30 41 Z M 54 33 L 63 33 L 72 41 L 54 41 Z" fill="#cfefff" stroke={KC.ink} strokeWidth={1.2} />
        <circle cx={30} cy={56} r={7} fill="#333" stroke={KC.ink} strokeWidth={1.6} /><circle cx={72} cy={56} r={7} fill="#333" stroke={KC.ink} strokeWidth={1.6} />
        <rect x={0} y={63} width={100} height={12} fill="#888" />
      </g>}
      {tipo === 'persona' && <g>
        <path d="M 22 75 Q 26 52 50 52 Q 74 52 78 75 Z" fill="#2f6dff" stroke={KC.ink} strokeWidth={1.8} />
        <circle cx={50} cy={34} r={15} fill="#e6b08a" stroke={KC.ink} strokeWidth={1.8} />
        <path d="M 35 30 Q 50 12 65 30 Q 58 22 50 23 Q 42 22 35 30 Z" fill="#3b2a1e" />
        <circle cx={45} cy={35} r={1.8} fill={KC.ink} /><circle cx={55} cy={35} r={1.8} fill={KC.ink} />
        <path d="M 45 42 Q 50 46 55 42" stroke={KC.ink} strokeWidth={1.4} fill="none" />
      </g>}
      {tipo === 'paisaje' && <g>
        <circle cx={78} cy={18} r={9} fill="#ffe11a" stroke={KC.ink} strokeWidth={1.4} />
        <path d="M 0 60 Q 25 30 50 55 Q 72 34 100 52 L 100 75 L 0 75 Z" fill="#3fbf4a" stroke={KC.ink} strokeWidth={1.6} />
      </g>}
      {tipo === 'pelota' && <g>
        <circle cx={50} cy={40} r={20} fill="#fff" stroke={KC.ink} strokeWidth={1.8} />
        <polygon points="50,32 57,37 54,45 46,45 43,37" fill={KC.ink} />
        <rect x={0} y={62} width={100} height={13} fill="#3fbf4a" />
      </g>}
    </g>
  </g>;
}
const TIPOS = ['gato', 'coche', 'persona', 'paisaje', 'perro', 'pelota', 'gato', 'persona', 'coche', 'paisaje', 'gato', 'perro'];

// ---------- Reproductor de video genérico (pantalla + barra roja) ----------
function Reproductor({ x, y, w = 600, T = 0, prog = 0, children }) {
  const h = w * 0.62;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2 - 14} y={-h / 2 - 14} width={w + 28} height={h + 64} rx={28} fill="#1d1d22" stroke={KC.ink} strokeWidth={8} />
    {children}
    <rect x={-w / 2} y={h / 2 + 16} width={w} height={10} rx={5} fill="#555" />
    <rect x={-w / 2} y={h / 2 + 16} width={w * kclamp(prog, 0, 1)} height={10} rx={5} fill={KC.red} />
    <circle cx={-w / 2 + w * kclamp(prog, 0, 1)} cy={h / 2 + 21} r={11} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}

// ---------- Rack de servidores: unidades con foquitos que se encienden ----------
function Rack({ x, y, T, on = 1, seed = 1 }) {
  const r = krng(seed);
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-80} y={-210} width={160} height={420} rx={14} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 11 }, (_, i) => { const lit = (i + 1) / 11 <= on, f = r();
      return <g key={i} transform={`translate(0 ${-185 + i * 36})`}>
        <rect x={-64} y={0} width={128} height={28} rx={5} fill={lit ? '#1b2333' : '#151a24'} stroke="#0b0e14" strokeWidth={3} />
        <circle cx={-46} cy={14} r={6} fill={lit ? (Math.sin(T * (6 + f * 8) + i) > -0.3 ? KC.mint : '#145c47') : '#333'} />
        <circle cx={-28} cy={14} r={6} fill={lit ? (Math.sin(T * (4 + f * 9) + i * 2) > 0.2 ? KC.cyan : '#0d4a5c') : '#333'} />
        {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={0 + k * 11} y={7} width={6} height={14} fill="#0b0e14" />)}
      </g>; })}
  </g>;
}

// ---------- Cerebro esquemático (vista lateral) ----------
function Cerebro({ x, y, s = 1, T = 0 }) {
  const b = 1 + 0.015 * Math.sin(T * 2.4);
  return <g transform={`translate(${x} ${y}) scale(${s * b})`}>
    <path d="M -230 40 Q -260 -90 -150 -150 Q -90 -215 10 -190 Q 110 -220 180 -150 Q 270 -95 240 10 Q 260 100 170 130 Q 120 190 30 160 Q -40 200 -110 160 Q -230 160 -230 40 Z" fill="#ff9ec4" stroke={KC.ink} strokeWidth={9} />
    {['M -170 -60 Q -120 -110 -60 -80 Q -10 -50 40 -100', 'M -190 30 Q -140 -20 -80 10 Q -20 40 30 0 Q 80 -40 140 -10',
      'M 70 -150 Q 60 -100 110 -80 Q 170 -60 200 -100', 'M -120 110 Q -70 70 -10 100 Q 50 130 100 80 Q 150 40 210 60',
      'M -40 -160 Q -60 -120 -20 -110', 'M 150 40 Q 120 0 170 -30'].map((d, i) =>
      <path key={i} d={d} stroke="#c2477a" strokeWidth={8} fill="none" strokeLinecap="round" />)}
    <path d="M 40 160 Q 60 220 30 260" stroke={KC.ink} strokeWidth={30} strokeLinecap="round" fill="none" />
    <path d="M 40 160 Q 60 220 30 260" stroke="#ff9ec4" strokeWidth={16} strokeLinecap="round" fill="none" />
  </g>;
}

// ---------- Barras horizontales con escala propia (max) ----------
function BarrasEsc({ T, at, until, filas, top = 640, max = 20 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.1, kEase.sale);
      return <div key={i} style={{ marginBottom:22, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 38px ${KF.texto}`, color:KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 640 * f.valor / max * g), height:76, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 70px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{`${kformato(f.valor * g, 1)} %`}</div>
        </div>
      </div>; })}
  </div>;
}

function GatoGoogle() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Videos, Ma: CUES.Maquina, N: CUES.Neurona, P: CUES.Pregunta, Me: CUES.Mecanismo, E: CUES.Estudio, O: CUES.Objetos, Ce: CUES.Cerebro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const cuadroVideo = TIPOS[Math.floor(Math.max(0, T - K.V) * 4) % TIPOS.length];
  const onRacks = kprog(T, K.Ma + 2.5, K.Ma + 3.6, kEase.suave);
  const est = K.E + 4.3; // segunda frase de la escena Estudio
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la cara borrosa se enfoca */}
      <Escena T={T} a={K.G} b={K.V}>
        <FondoCircuito T={T} color={KC.lilac} />
        {svg(<CaraNeurona id="g" x={390} y={880} s={1.05} T={T} nitidez={kprog(T, K.G + 0.05, K.G + 3.2, kEase.suave)} />)}
      </Escena>
      <Chip T={T} at={K.G + 0.3} until={K.G + 1.9} texto="¿un fantasma?" x={330} y={470} tam={44} borde={KC.lilac} />
      <Chip T={T} at={K.G + 2.1} until={K.V - 0.2} texto="es un gato 🐱" x={330} y={470} tam={48} borde={KC.yellow} />
      <Chip T={T} at={K.G + 3.6} until={K.V - 0.2} texto="nadie le dijo qué es un gato" x={360} y={560} tam={28} borde={KC.texto} />

      {/* 2 · diez millones de cuadros de YouTube, sin etiquetas */}
      <Escena T={T} a={K.V} b={K.Ma}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Reproductor x={360} y={640} w={560} T={T} prog={kprog(T, K.V, K.Ma, null)}>
            <Miniatura x={0} y={0} w={560} tipo={cuadroVideo} borde={0} />
          </Reproductor>
          {/* la pila de cuadros */}
          {Array.from({ length: 6 }, (_, k) => <g key={k} opacity={kprog(T, K.V + 1.0 + k * 0.5, K.V + 1.3 + k * 0.5)}>
            <Miniatura x={860 + (k % 2) * 10} y={900 - k * 14} w={170} tipo={TIPOS[(k * 5) % TIPOS.length]} rot={(k % 3 - 1) * 6} borde={4} /></g>)}
          {Array.from({ length: 16 }, (_, i) => { const t0 = K.V + 0.6 + i * 0.3, u = kprog(T, t0, t0 + 0.8, kEase.suave);
            if (u <= 0 || u >= 1) return null;
            return <Miniatura key={i} x={klerp(360, 860, u)} y={klerp(640, 890, u) - Math.sin(Math.PI * u) * 160} w={klerp(220, 170, u)} tipo={TIPOS[i % TIPOS.length]} rot={u * 20 - 10} borde={4} />; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.V + 0.2} until={K.Ma - 0.2} texto="estudio publicado en 2012" x={360} y={400} tam={34} borde={KC.ink} />
      <NumeroGigante T={T} at={K.V + 2.2} until={K.Ma - 0.2} valor={10000000} dur={1.2} etiqueta="" x={540} y={1010} tam={120} color={KC.yellow} />
      <Chip T={T} at={K.V + 2.6} until={K.Ma - 0.2} texto="imágenes · 1 por video · 200 × 200 píxeles" x={540} y={1110} tam={28} borde={KC.ink} />
      <MitoTachado T={T} at={K.V + 4.0} tacharEn={K.V + 4.7} until={K.Ma - 0.2} texto="etiqueta: «gato»" x={330} y={920} tam={40} />

      {/* 3 · la máquina: conexiones, computadoras, días */}
      <Escena T={T} a={K.Ma} b={K.N}>
        <FondoCircuito T={T} />
        {svg(<>{[0, 1, 2, 3, 4].map((i) => <Rack key={i} x={150 + i * 195} y={960} T={T} on={onRacks} seed={i + 2} />)}
          {[0, 1, 2].map((d) => { const o = kprog(T, K.Ma + 3.9 + d * 0.3, K.Ma + 4.2 + d * 0.3);
            return <g key={d} opacity={o} transform={`translate(${420 + d * 120} 690) rotate(${T * 40})`}>
              <circle r={30} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
              {Array.from({ length: 8 }, (_, k) => <line key={k} x1={0} y1={-40} x2={0} y2={-54} stroke={KC.yellow} strokeWidth={7} strokeLinecap="round" transform={`rotate(${k * 45})`} />)}
            </g>; })}
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Ma + 0.6} until={K.Ma + 2.3} valor={1000000000} dur={1.0} etiqueta="conexiones" x={540} y={500} tam={118} color={KC.cyan} />
      <NumeroGigante T={T} at={K.Ma + 2.5} until={K.Ma + 3.6} valor={1000} dur={0.8} etiqueta="computadoras" x={540} y={500} tam={170} color={KC.mint} />
      <Chip T={T} at={K.Ma + 2.8} until={K.Ma + 3.6} texto="16,000 núcleos" x={540} y={660} tam={34} borde={KC.mint} />
      <NumeroGigante T={T} at={K.Ma + 3.8} until={K.N - 0.2} valor={3} dur={0.4} sufijo=" días" etiqueta="entrenando" x={540} y={500} tam={170} color={KC.yellow} />

      {/* 4 · una neurona se enciende con caras de gato */}
      <Escena T={T} a={K.N} b={K.P}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={330} y={700} ancho={600} alto={440} capas={[5, 6, 6, 6, 1]} onda={kprog(T, K.N + 0.2, K.N + 1.6)} />
        {svg(<>
          <Miniatura x={160} y={920} w={200} tipo="gato" />
          <path d="M 262 920 L 312 920" stroke={KC.cyan} strokeWidth={8} markerEnd="" />
          {(() => { const e = kprog(T, K.N + 1.5, K.N + 2.0, kEase.rebote); return <g opacity={e}>
            <circle cx={930} cy={920} r={70 + 8 * Math.sin(T * 6)} fill={KC.yellow} opacity=".35" />
            <circle cx={930} cy={920} r={58} fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
            <CaraNeurona id="n" x={930} y={920} s={0.17} T={T} nitidez={0.9} marco={false} />
          </g>; })()}
        </>, 20)}
      </Escena>
      <Chip T={T} at={K.N + 1.8} until={K.P - 0.2} texto="1 neurona → «cara de gato»" x={620} y={600} tam={36} borde={KC.yellow} />

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Me} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      <Chip T={T} at={K.P + 0.3} until={K.Me - 0.2} texto="¿sin maestro?" x={300} y={470} tam={40} borde={KC.ink} />

      {/* 6 · el truco: resumir y volver a dibujar; lo que más se repite */}
      <Escena T={T} a={K.Me} b={K.E}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <g opacity={1 - kprog(T, K.Me + 2.6, K.Me + 3.0)}>
            <g opacity={kprog(T, K.Me + 0.2, K.Me + 0.5)}><Miniatura x={210} y={840} w={240} tipo="gato" /></g>
            <g opacity={kprog(T, K.Me + 0.8, K.Me + 1.1)}>
              <path d="M 345 840 L 430 840" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><polygon points="430,822 456,840 430,858" fill={KC.ink} />
              {Array.from({ length: 6 }, (_, k) => <rect key={k} x={490 + (k % 2) * 54} y={760 + Math.floor(k / 2) * 54} width={44} height={44} rx={8}
                fill={['#f6a03c', '#262626', '#d2d2d2', '#e2557a', '#ffd28a', '#7d7d7d'][k]} stroke={KC.ink} strokeWidth={5} />)}
            </g>
            <g opacity={kprog(T, K.Me + 1.6, K.Me + 1.9)}>
              <path d="M 624 840 L 700 840" stroke={KC.ink} strokeWidth={10} strokeLinecap="round" /><polygon points="700,822 726,840 700,858" fill={KC.ink} />
              <defs><filter id="reblur"><feGaussianBlur stdDeviation={klerp(14, 3.5, kprog(T, K.Me + 1.7, K.Me + 2.5))} /></filter></defs>
              <g filter="url(#reblur)"><Miniatura x={880} y={840} w={240} tipo="gato" /></g>
            </g>
          </g>
          {Array.from({ length: 12 }, (_, i) => { const c = i % 4, rr = Math.floor(i / 4), t0 = K.Me + 2.8 + i * 0.09, o = kprog(T, t0, t0 + 0.3);
            const gato = TIPOS[i] === 'gato', late = gato ? 1 + 0.06 * Math.max(0, Math.sin((T - K.Me) * 5)) * kprog(T, K.Me + 4.4, K.Me + 4.8) : 1;
            return <g key={i} opacity={o} transform={`translate(${180 + c * 240} ${720 + rr * 170}) scale(${late})`}>
              {gato && T > K.Me + 4.4 && <rect x={-112} y={-86} width={224} height={172} rx={16} fill="none" stroke={KC.yellow} strokeWidth={10} />}
              <Miniatura x={0} y={0} w={196} tipo={TIPOS[i]} borde={5} /></g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.Me + 0.4} until={K.Me + 2.6} texto="1 · resume" x={210} y={1000} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Me + 1.7} until={K.Me + 2.6} texto="2 · vuelve a dibujar" x={820} y={1000} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Me + 4.4} until={K.E - 0.2} texto="lo que más se repite → se guarda" x={620} y={570} tam={32} borde={KC.yellow} />

      {/* 7 · el estudio y las otras neuronas */}
      <Escena T={T} a={K.E} b={K.O}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{[['gato', 'e1'], ['humana', 'e2'], ['cuerpo', 'e3']].map(([c, id], i) => { const o = kprog(T, est + i * 0.35, est + 0.35 + i * 0.35);
          return <g key={id} opacity={o}><CaraNeurona id={id} cara={c} x={200 + i * 340} y={900} s={0.55} T={T} nitidez={kprog(T, est + i * 0.35, est + 1.6 + i * 0.35)} /></g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={est - 0.3} anio="2012" quien="Google y Stanford" revista="Le, Ng, Dean y 5 más · congreso ICML, Edimburgo" y={860} />
      <Chip T={T} at={est} until={K.O - 0.2} texto="otras neuronas, solas:" x={360} y={560} tam={36} borde={KC.ink} />
      {[['gato', 200], ['cara humana', 540], ['cuerpo', 880]].map(([t, x], i) =>
        <Chip key={t} T={T} at={est + 0.4 + i * 0.35} until={K.O - 0.2} texto={t} x={x} y={1100} tam={32} borde={KC.ink} />)}

      {/* 8 · con fotos etiquetadas: +70 %… pero 16 de cada 100 */}
      <Escena T={T} a={K.O} b={K.Ce}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      <Chip T={T} at={K.O + 0.3} until={K.O + 6.6} texto="después: fotos con nombre" x={540} y={420} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.O + 1.9} until={K.O + 6.6} texto="ImageNet · 22,000 tipos de objetos" x={540} y={520} tam={34} borde={KC.ink} />
      <BarrasEsc T={T} at={K.O + 3.6} until={K.O + 6.6} top={630} max={20} filas={[{ valor: 9.3, etiqueta: 'mejor sistema previo', color: '#9aa3b5' }, { valor: 15.8, etiqueta: 'esta red', color: KC.pink, at: K.O + 4.4 }]} />
      <Chip T={T} at={K.O + 5.0} until={K.O + 6.6} texto="+70 % relativo" x={540} y={1010} tam={48} borde={KC.pink} />
      <Chip T={T} at={K.O + 5.3} until={K.O + 6.6} texto="con ajuste usando fotos etiquetadas" x={540} y={1100} tam={28} borde={KC.ink} />
      {T > K.O + 6.7 && <div style={{ opacity:kprog(T, K.O + 6.8, K.O + 7.2) * (1 - kprog(T, K.Ce - 0.05, K.Ce + 0.4)) }}>
        <Cuadricula T={T} cols={10} filas={10} x={380} y={690} ancho={600} alto={420} llenado={kprog(T, K.O + 7.0, K.O + 8.2, kEase.suave) * 0.16} vacio="rgba(22,18,15,.18)" lleno={KC.pink} />
      </div>}
      <Chip T={T} at={K.O + 7.4} until={K.Ce - 0.2} texto="aciertos: 16 de cada 100" x={680} y={620} tam={34} borde={KC.pink} />

      {/* 9 · y era chiquita */}
      <Escena T={T} a={K.Ce} b={K.C}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <g opacity={kprog(T, K.Ce + 0.2, K.Ce + 0.5)}>
            <circle cx={150} cy={960} r={9} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />
            <text x={150} y={920} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>la red</text>
          </g>
          <g opacity={kprog(T, K.Ce + 0.6, K.Ce + 1.1)}><Cerebro x={600} y={960} s={klerp(0.5, 0.8, kprog(T, K.Ce + 0.6, K.Ce + 1.6, kEase.rebote))} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Ce + 2.2} until={K.C - 0.2} texto="≈ 100,000 × más conexiones" x={540} y={690} tam={42} borde={KC.ink} />
      <Chip T={T} at={K.Ce + 2.6} until={K.C - 0.2} texto="comparación muy aproximada (Google, 2012)" x={540} y={760} tam={24} borde={KC.ink} />

      {/* 10 · cierre: la misma cara, ahora dentro de un video */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          {[[960, 980, 'gato', -8], [940, 760, 'gato', 7], [130, 1090, 'gato', 6], [960, 1100, 'gato', -6], [640, 1110, 'gato', 3]].map(([x, y, t, r], i) =>
            <g key={i} opacity={kprog(T, K.C + 0.8 + i * 0.2, K.C + 1.1 + i * 0.2)}><Miniatura x={x} y={y} w={180} tipo={t} rot={r} /></g>)}
          <CaraNeurona id="c" x={390} y={880} s={klerp(1.05, 0.9, kprog(T, K.C, K.C + 1.2, kEase.suave))} T={T} nitidez={1} />
          <g opacity={kprog(T, K.C + 0.3, K.C + 0.8)}>
            <rect x={390 - 260 * 0.95 - 22} y={880 - 260 * 0.95 - 22} width={520 * 0.95 + 44} height={520 * 0.95 + 80} rx={30} fill="none" stroke="#1d1d22" strokeWidth={22} />
            <rect x={390 - 247} y={880 + 247 + 22} width={494} height={10} rx={5} fill="#555" />
            <rect x={390 - 247} y={880 + 247 + 22} width={494 * kprog(T, K.C + 0.3, K.Ou)} height={10} rx={5} fill={KC.red} />
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 1.5} until={K.Ou} texto="aprendido de videos sin etiquetas" x={400} y={540} tam={32} borde={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No es un fantasma: *es un gato.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.Ma - 0.1} texto="10 millones de imágenes, *sin etiquetas.*" />
      <Subtitulo T={T} idx={2} at={K.Ma + 0.1} until={K.N - 0.1} texto="1,000 computadoras, *3 días.*" />
      <Subtitulo T={T} idx={3} at={K.N + 0.1} until={K.P - 0.1} texto="Una neurona: *caras de gato.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Me - 0.1} texto="¿Cómo aprende *sin que le expliquen?*" />
      <Subtitulo T={T} idx={5} at={K.Me + 0.1} until={K.E - 0.1} texto="Resume, redibuja… *guarda lo repetido.*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={est - 0.1} texto="Le, Ng, Dean y equipo: *Escocia, 2012.*" />
      <Subtitulo T={T} idx={7} at={est + 0.1} until={K.O - 0.1} texto="También aprendió *caras y cuerpos.*" />
      <Subtitulo T={T} idx={8} at={K.O + 0.1} until={K.Ce - 0.1} texto="Con fotos con nombre: *16 de cada 100.*" />
      <Subtitulo T={T} idx={9} at={K.Ce + 0.1} until={K.C - 0.1} texto="Tu cerebro: *~100,000 veces más.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un gato que *nadie le enseñó.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Videos + 3.0, CUES.Maquina - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Neurona + 0.6, CUES.Pregunta - 0.15, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Mecanismo + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Mecanismo + 3.3, CUES.Estudio - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Estudio + 4.5, CUES.Objetos - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Objetos + 6.6, CUES.Cerebro - 0.15, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cerebro + 0.3, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="52" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GatoGoogleApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><GatoGoogle /></CompositionStage></div>;
}
window.GatoGoogleApp = GatoGoogleApp;
