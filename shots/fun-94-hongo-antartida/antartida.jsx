// Shot Fungi Mati #94 · El hongo de las rocas de la Antártida que aguantó el espacio (Cryomyces antarcticus) — NARRADO.
// Gancho 1 «Esto no es X: es Y» · formato N1 con Lupa: piedra partida → granos y células → Estación Espacial → la misma piedra.
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const AO = { arena:'#e9dcc0', arena2:'#d8c69e', costra:'#a5552e', negra:'#1d1a18', blanca:'#f6f2ea', verde:'#3f9a4a', cuarzo:'#f3efe6', cel:'#15110f', uv:'#9b5cff', marte:'#c1440e', marte2:'#e0703a', iss:'#c9d3e0', panel:'#2a4a9a' };

// Media piedra de arenisca partida, vista por la cara del corte: costra, franja negra, blanca y verde bajo la superficie.
function Piedra({ T, x, y, s = 1, parte = 1, brilla = 0 }) {
  const ab = kEase.sale(kclamp(parte, 0, 1)) * 70;
  const mitad = (sign) => <g transform={`translate(${sign * ab} ${-Math.abs(sign) * ab * 0.15}) rotate(${sign * ab * 0.08})`}>
    <path d={sign < 0 ? 'M 0 -170 L -210 -150 Q -300 -40 -260 90 Q -200 170 0 170 Z' : 'M 0 -170 L 210 -150 Q 300 -40 260 90 Q 200 170 0 170 Z'} fill={AO.arena} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={sign * (30 + ((i * 53) % 210))} cy={-90 + ((i * 71) % 230)} r={4} fill={AO.arena2} />)}
    {parte > 0.3 && <g opacity={kprog(parte, 0.3, 0.8)}>
      <path d={sign < 0 ? 'M 0 -168 L -208 -148 L -214 -136 L 0 -156 Z' : 'M 0 -168 L 208 -148 L 214 -136 L 0 -156 Z'} fill={AO.costra} />
      <path d={sign < 0 ? 'M 0 -156 L -214 -136 L -224 -106 L 0 -126 Z' : 'M 0 -156 L 214 -136 L 224 -106 L 0 -126 Z'} fill={AO.negra} style={brilla ? { filter:`drop-shadow(0 0 ${18 * brilla}px ${KC.gold2})` } : null} />
      <path d={sign < 0 ? 'M 0 -126 L -224 -106 L -230 -90 L 0 -110 Z' : 'M 0 -126 L 224 -106 L 230 -90 L 0 -110 Z'} fill={AO.blanca} />
      <path d={sign < 0 ? 'M 0 -110 L -230 -90 L -236 -72 L 0 -92 Z' : 'M 0 -110 L 230 -90 L 236 -72 L 0 -92 Z'} fill={AO.verde} />
    </g>}
  </g>;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {mitad(-1)}{mitad(1)}
  </g>;
}
// Mapa esquemático de la Antártida con punto en los Valles Secos de McMurdo.
function MapaAntartida({ T, x, y, s = 1, punto = 1 }) {
  const c = 'M 0 -220 Q 120 -240 220 -170 Q 300 -90 280 20 Q 300 140 180 210 Q 60 260 -60 230 Q -200 220 -260 120 Q -320 40 -280 -60 Q -250 -150 -140 -200 Q -80 -230 0 -220 Z';
  const late = 1 + 0.2 * Math.sin(T * 6);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={c} fill="#f4fbff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -60 -40 Q 0 -10 40 60" stroke="#c9dbe6" strokeWidth={6} fill="none" />
    <path d="M 110 120 Q 70 60 120 20" stroke="#9ec9e6" strokeWidth={8} fill="none" />
    {punto > 0 && <g transform={`translate(95 75) scale(${kEase.rebote(punto)})`}><circle r={30 * late} fill="none" stroke={KC.red} strokeWidth={6} opacity=".7" /><circle r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} /></g>}
  </g>;
}
// Paisaje de los Valles Secos: roca café, sin hielo, viento.
function Valles({ T }) {
  return <g>
    <path d="M 0 760 L 180 620 L 330 700 L 520 560 L 700 680 L 880 590 L 1080 690 L 1080 1300 L 0 1300 Z" fill="#8a6a4a" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 0 900 Q 300 860 540 920 Q 800 980 1080 900 L 1080 1300 L 0 1300 Z" fill="#a07a52" />
    {[[200, 980], [520, 1040], [820, 1000], [380, 1140], [700, 1180]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={60} ry={30} fill={AO.arena} stroke={KC.ink} strokeWidth={5} />)}
    {Array.from({ length: 6 }, (_, i) => { const xx = ((T * 300 + i * 220) % 1300) - 110; return <path key={i} d={`M ${xx} ${640 + i * 40} q 60 -14 120 0`} stroke="#fff" strokeWidth={5} fill="none" opacity=".6" />; })}
  </g>;
}
// Dentro de la roca: granos de cuarzo y racimos/cadenitas de células negras entre ellos (para la Lupa).
function DentroRoca({ T, r, p = 1 }) {
  const g = krng(5), granos = Array.from({ length: 16 }, () => ({ x: g() * r * 2, y: g() * r * 2, rr: 46 + g() * 40, a: g() * 180 }));
  return <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#3a3028" />
    {granos.map((q, i) => <ellipse key={i} cx={q.x} cy={q.y} rx={q.rr} ry={q.rr * 0.75} transform={`rotate(${q.a} ${q.x} ${q.y})`} fill={AO.cuarzo} stroke="#8a7a60" strokeWidth={4} opacity=".95" />)}
    {Array.from({ length: 22 }, (_, i) => { const q = kclamp(p * 22 - i, 0, 1); const a = granos[i % 16], b = granos[(i + 5) % 16]; const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
      return q > 0 ? <g key={i}>{[0, 1, 2].map((k) => <circle key={k} cx={cx + k * 13 * Math.cos(i)} cy={cy + k * 13 * Math.sin(i)} r={8 * q} fill={AO.cel} stroke="#000" strokeWidth={2} />)}</g> : null; })}
  </svg>;
}
// Célula de Cryomyces de cerca: redonda, pared gruesa, rugosa y negra.
function CelCryo({ T, x, y, r = 120, seed = 1 }) {
  const rr = (a) => r * (1 + 0.05 * Math.sin(a * 11 + seed) + 0.03 * Math.sin(a * 23 + seed * 2));
  const d = Array.from({ length: 73 }, (_, i) => { const a = i / 72 * Math.PI * 2; return `${i ? 'L' : 'M'} ${(Math.cos(a) * rr(a)).toFixed(1)} ${(Math.sin(a) * rr(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={AO.cel} stroke="#000" strokeWidth={6} />
    <circle r={r * 0.62} fill="#4a3a30" />
    <circle cx={r * 0.12} cy={-r * 0.08} r={r * 0.2} fill="#7a6250" />
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={Math.cos(i * 0.8) * r * 0.92} cy={Math.sin(i * 0.8) * r * 0.92} r={r * 0.07} fill="#2b2420" />)}
  </g>;
}
// Brazo esquemático (piel) para comparar la melanina.
function Brazo({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d="M -40 -220 Q -70 0 -50 200 L 50 200 Q 70 0 40 -220 Z" fill="#b8754f" stroke={KC.ink} strokeWidth={7} />
    {[[-10, -120], [20, -40], [-20, 40], [15, 120]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={5} fill="#6a3a22" />)}</g>;
}
// Estación Espacial esquemática con charola de muestras afuera.
function Estacion({ T, x, y, s = 1, charola = 1, marte = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(T * 0.6) * 2})`}>
    <rect x={-420} y={-10} width={840} height={20} fill={AO.iss} stroke={KC.ink} strokeWidth={5} />
    {[-380, -280, 200, 300].map((px, i) => <rect key={i} x={px} y={-150} width={80} height={300} fill={AO.panel} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-150} y={-50} width={300} height={100} rx={30} fill={AO.iss} stroke={KC.ink} strokeWidth={6} />
    <rect x={-60} y={-110} width={120} height={70} rx={20} fill={AO.iss} stroke={KC.ink} strokeWidth={6} />
    {charola > 0 && <g opacity={charola} transform="translate(0 75)">
      <rect x={-110} y={0} width={220} height={60} rx={8} fill="#5a6070" stroke={KC.ink} strokeWidth={5} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-100 + i * 26} y={10} width={20} height={40} rx={4} fill={i >= 4 && marte > 0 ? mixHex('#2a2a2a', AO.marte2, marte) : '#2a2a2a'} stroke="#000" strokeWidth={2} />)}
    </g>}
  </g>;
}
function Tierra({ x, y, r = 520 }) {
  return <g><circle cx={x} cy={y} r={r} fill="#2f7fd6" /><path d={`M ${x - r * 0.6} ${y - r * 0.5} q 120 -60 220 20 q 80 80 200 40 q 60 60 -20 120 q -160 40 -260 -40 Z`} fill={KC.leaf} opacity=".85" /><circle cx={x} cy={y} r={r} fill="none" stroke="#9fd0ff" strokeWidth={16} opacity=".6" /></g>;
}
// Transbordador esquemático.
function Transbordador({ x, y, s = 1, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -150 Q 30 -110 34 -40 L 34 90 L 80 140 L -80 140 L -34 90 L -34 -40 Q -30 -110 0 -150 Z" fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -34 -40 Q -30 -110 0 -150 Q 30 -110 34 -40 Z" fill="#2b2b2b" opacity=".85" />
    <path d="M -20 150 Q 0 230 20 150" fill={KC.orange} />
  </g>;
}
// Placa de Petri con pocas colonias negras «tipo cerebrito».
function PlacaCol({ x, y, r = 70, colonias = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={r} fill="#f1d27a" stroke={KC.ink} strokeWidth={5} /><circle r={r - 8} fill="none" stroke="#fff" strokeWidth={3} opacity=".6" />
    {colonias > 0 && [[-18, -10], [16, 14], [8, -22]].map(([a, b], i) => <g key={i} transform={`translate(${a} ${b}) scale(${kEase.rebote(kclamp(colonias * 3 - i, 0, 1))})`}><circle r={11} fill={AO.cel} /><path d="M -6 -3 q 3 -4 6 0 q 3 4 6 0 M -6 4 q 3 -4 6 0" stroke="#3a3028" strokeWidth={2} fill="none" /></g>)}</g>;
}

function AntartidaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Valles, A: CUES.Adentro, N: CUES.Nombre, Es: CUES.Escudo, P: CUES.Pregunta, E: CUES.Estudio, M: CUES.Marte, R: CUES.Resultado, Co: CUES.Colonias, Pa: CUES.Para, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la piedra se parte */}
      <Escena T={T} a={K.G} b={K.V} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Piedra T={T} x={450} y={900} s={1.4} parte={kprog(T, K.G + 0.3, K.G + 1.1)} />)}
      </Escena>
      {/* 2 · los Valles Secos de McMurdo */}
      <Escena T={T} a={K.V} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.V + 2.6, K.V + 3.0)}><MapaAntartida T={T} x={540} y={860} s={1.3} punto={kprog(T, K.V + 0.6, K.V + 1.1)} /></g>
          <g opacity={kprog(T, K.V + 2.8, K.V + 3.2)}><Valles T={T} /></g>
        </>)}
      </Escena>
      {/* 3 · dentro de la roca (Lupa) */}
      <Escena T={T} a={K.A} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Piedra T={T} x={450} y={980} s={1.2} parte={1} />)}
        <Lupa T={T} at={K.A + 0.3} until={K.N - 0.3} x={560} y={620} r={230} fx={440} fy={790} tinte={KC.gold2} etiqueta="AL MICROSCOPIO · DENTRO DE LA ROCA"
          interior={(t, r) => <DentroRoca T={t} r={r} p={kprog(t, K.A + 0.8, K.A + 3.2)} />} />
      </Escena>
      {/* 4–5 · la célula negra, la melanina y el escudo UV */}
      <Escena T={T} a={K.N} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <CelCryo T={T} x={480} y={820} r={190} />
          <CelCryo T={T} x={260} y={1060} r={100} seed={3} />
          <CelCryo T={T} x={700} y={1080} r={80} seed={5} />
          <g opacity={kprog(T, K.N + 2.4, K.N + 2.9) * (1 - kprog(T, K.Es - 0.2, K.Es + 0.2))}><Brazo x={900} y={860} s={1.0} /></g>
          {T > K.Es && Array.from({ length: 7 }, (_, i) => { const u = ((T - K.Es) * 0.9 + i / 7) % 1, x0 = 80 + i * 70, y0 = 380;
            const pasa = i === 3; const L = pasa ? 1 : 0.62; const q = Math.min(u, L);
            const x1 = klerp(x0, 480 + (i - 3) * 30, q / 0.62 * 0.62), y1 = klerp(y0, 820, q);
            return <g key={i} opacity={kprog(T, K.Es, K.Es + 0.3)}>
              <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={AO.uv} strokeWidth={pasa ? 3 : 9} strokeDasharray="18 10" opacity={pasa ? 0.5 : 1} />
              {!pasa && u > 0.6 && <circle cx={x1} cy={y1} r={14 * (1 - (u - 0.6) / 0.4)} fill={AO.uv} opacity=".7" />}
            </g>; })}
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿y si lo mandamos al espacio? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Piedra T={T} x={300} y={1060} s={0.8} parte={1} /><Transbordador x={300 + kprog(T, K.P, K.E + 0.4) * 200} y={760 - kprog(T, K.P, K.E + 0.4) * 300} s={0.9} /></>)}
      </Escena>
      {/* 7–8 · afuera de la Estación Espacial, 18 meses, una parte como en Marte */}
      <Escena T={T} a={K.E} b={K.R} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:'#060a18' }}></div>
        <Ambiente T={T} n={40} color="rgba(255,255,255,.6)" tam={[2, 5]} vel={4} />
        {fsvg(<><Tierra x={540} y={1700} r={620} /><Estacion T={T} x={540} y={820} s={1.0} charola={kprog(T, K.E + 2.0, K.E + 2.6)} marte={kprog(T, K.M + 1.6, K.M + 2.4)} /></>)}
      </Escena>
      {/* 9 · más del 60 % de las células seguían enteras (cuadrícula de 100) */}
      <Escena T={T} a={K.R} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<g>{Array.from({ length: 100 }, (_, i) => { const col = i % 10, fil = Math.floor(i / 10), on = kprog(T, K.R + 0.5 + i * 0.02, K.R + 0.8 + i * 0.02); if (on <= 0) return null;
          const entera = i < 62; const rota = !entera && T > K.R + 3.0;
          return <g key={i} transform={`translate(${210 + col * 66} ${560 + fil * 66}) scale(${on})`}>
            <circle r={26} fill={rota ? '#9a948c' : AO.cel} stroke={KC.ink} strokeWidth={3} />
            {rota && <path d="M -14 -14 L 4 2 L -6 14 M 8 -16 L 2 2 L 16 10" stroke={KC.ink} strokeWidth={4} fill="none" />}
          </g>; })}</g>)}
      </Escena>
      {/* 10 · menos del 10 % de las muestras formó colonias */}
      <Escena T={T} a={K.Co} b={K.Pa} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<g>{Array.from({ length: 10 }, (_, i) => <PlacaCol key={i} x={160 + (i % 5) * 190} y={760 + Math.floor(i / 5) * 200} r={78} colonias={i === 9 ? kprog(T, K.Co + 1.6, K.Co + 2.6) * 0.67 : 0} />)}</g>)}
      </Escena>
      {/* 11 · ¿Marte? ¿una nave? ¿una roca? */}
      <Escena T={T} a={K.Pa} b={K.C} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:'#060a18' }}></div>
        <Ambiente T={T} n={30} color="rgba(255,255,255,.6)" tam={[2, 5]} vel={4} />
        {fsvg(<>
          <circle cx={760} cy={880} r={250} fill={AO.marte} stroke={KC.ink} strokeWidth={8} />
          {[[700, 800, 40], [840, 950, 30], [690, 990, 22]].map(([a, b, r], i) => <circle key={i} cx={a} cy={b} r={r} fill="#9a330a" />)}
          <g opacity={kprog(T, K.Pa + 1.6, K.Pa + 2.0)}><Transbordador x={260} y={760} s={0.7} rot={60} /></g>
          <g opacity={kprog(T, K.Pa + 3.0, K.Pa + 3.4)} transform={`translate(260 1120) rotate(${T * 20})`}><path d="M -70 -40 L 20 -70 L 80 -10 L 50 60 L -40 70 L -80 10 Z" fill="#8a7a6a" stroke={KC.ink} strokeWidth={6} /></g>
        </>)}
      </Escena>
      {/* 12 · cierre: la misma piedra partida, la franja negra brilla */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Piedra T={T} x={450} y={900} s={1.4} parte={1} brilla={kprog(T, K.C + 0.4, K.C + 1.2)} />)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.4} until={K.V - 0.3} texto="no es una mancha" x={330} y={560} tam={42} borde={KC.red} />
      <EtqMix T={T} at={K.G + 1.6} until={K.V - 0.3} x={540} y={1170} centro partes={[['franjas a < 1 cm bajo la superficie', false]]} tam={26} color={KC.ink} sombra={false} />
      <Etq T={T} at={K.V + 1.0} until={K.V + 2.6} x={630} y={1050} texto="Valles Secos de McMurdo" lado="izq" tam={30} color={KC.ink} />
      <Chip T={T} at={K.V + 3.0} until={K.A - 0.3} texto="de lo más frío y seco del planeta" x={540} y={470} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.A + 2.6} until={K.N - 0.3} texto="afuera, casi nada sobrevive" x={540} y={330} tam={32} borde={KC.ink} />
      <EtqMix T={T} at={K.N + 0.4} until={K.P - 0.3} x={60} y={470} partes={[['Cryomyces antarcticus', true]]} tam={42} color={KC.texto} />
      <Etq T={T} at={K.N + 1.4} until={K.Es - 0.3} x={60} y={540} texto="pared gruesa con melanina" tam={28} color={KC.gold2} />
      <Etq T={T} at={K.N + 2.6} until={K.Es - 0.3} x={860} y={620} texto="tu piel: otra melanina" tam={26} color={KC.texto} lado="izq" />
      <Chip T={T} at={K.Es + 0.4} until={K.P - 0.3} texto="escudo contra UV y radiación" x={560} y={560} tam={34} borde={AO.uv} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.M - 0.3} anio="2008" quien="ESA · EXPOSE-E · experimento LIFE" revista="afuera de la Estación, 2008–2009" x={540} y={430} />
      <Chip T={T} at={K.M + 0.3} until={K.R - 0.3} texto="18 meses afuera" x={540} y={400} tam={42} borde={KC.gold2} />
      <EtqMix T={T} at={K.M + 1.6} until={K.R - 0.3} x={540} y={1010} centro partes={[['espacio  |  ', false], ['como en Marte (CO₂, ~1 % de la presión)', false]]} tam={26} color={KC.texto} />
      <NumeroGigante T={T} at={K.R + 2.6} until={K.Co - 0.3} valor={60} dur={0.6} prefijo="> " sufijo=" %" etiqueta="células enteras" x={540} y={370} tam={110} color={KC.texto} />
      <Etq T={T} at={K.R + 3.2} until={K.Co - 0.3} x={210} y={480} texto="hongos y rocas de la prueba · medido por ADN" tam={24} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.R + 0.3} until={K.R + 2.4} anio="2015" quien="Onofri et al." revista="Astrobiology, 2015" x={540} y={860} />
      <Chip T={T} at={K.Co + 0.4} until={K.Pa - 0.3} texto="< 10 % de las muestras formó colonias" x={540} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.Co + 2.0} until={K.Pa - 0.3} x={900} y={1090} texto="colonias negras" tam={26} color={KC.ink} lado="izq" />
      <Chip T={T} at={K.Pa + 0.3} until={K.C - 0.3} texto="astrobiología" x={330} y={470} tam={40} borde={KC.cyan} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="sobreviviente del espacio" x={350} y={560} tam={36} borde={KC.gold} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.V} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.V} until={K.A} texto="mapa y paisaje esquemáticos" largo={0} />
      <BarraEscala T={T} at={K.A} until={K.N} texto="5 cm · lupa: esquema" largo={140} />
      <BarraEscala T={T} at={K.N} until={K.P} texto="10 µm" largo={320} />
      <BarraEscala T={T} at={K.E} until={K.Co} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.Co} until={K.Pa} texto="esquema · 10 muestras" largo={0} />
      <BarraEscala T={T} at={K.Pa} until={K.C} texto="esquema" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Sub T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="Adentro vive un hongo *que fue al espacio.*" />
      <Sub T={T} idx={1} at={K.V + 0.1} until={K.A - 0.1} texto="Valles Secos de McMurdo, *Antártida.*" />
      <Sub T={T} idx={2} at={K.A + 0.1} until={K.N - 0.1} texto="Vive *dentro de la roca.*" />
      <Sub T={T} idx={3} at={K.N + 0.1} until={K.Es - 0.1} texto="*_Cryomyces antarcticus:_* negro por la melanina." />
      <Sub T={T} idx={4} at={K.Es + 0.1} until={K.P - 0.1} texto="Escudo contra *ultravioleta y radiación.*" />
      <Sub T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Y si lo mandamos *al espacio?*" />
      <Sub T={T} idx={6} at={K.E + 0.1} until={K.M - 0.1} texto="2008: afuera de la *Estación Espacial.*" />
      <Sub T={T} idx={7} at={K.M + 0.1} until={K.R - 0.1} texto="18 meses; una parte, *como en Marte.*" />
      <Sub T={T} idx={8} at={K.R + 0.1} until={K.Co - 0.1} texto="Más del 60 %: *células enteras.*" />
      <Sub T={T} idx={9} at={K.Co + 0.1} until={K.Pa - 0.1} texto="Pocas muestras crecieron, *pero algunas sí.*" />
      <Sub T={T} idx={10} at={K.Pa + 0.1} until={K.C - 0.1} texto="¿Podría vivir *en Marte?*" />
      <Sub T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un *sobreviviente del espacio.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.4, 'avatar_11_sorprendido', 'gancho'],
        [K.V + 3.2, K.A - 0.2, 'avatar_03_aburrido_manos_mejillas', 'bajo-der'],
        [K.A + 2.8, K.N - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Es + 0.6, K.P - 0.2, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_11_sorprendido', 'grande'],
        [K.M + 0.6, K.R - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.R + 3.0, K.Co - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Co + 2.2, K.Pa - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Pa + 2.0, K.C - 0.2, 'avatar_07_pensativo_puno', 'bajo-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="94" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AntartidaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><AntartidaShot /></CompositionStage></div>;
}
window.AntartidaApp = AntartidaApp;
