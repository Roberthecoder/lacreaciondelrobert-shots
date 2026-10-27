// Ambiental #03 · La verdad incómoda de los bioplásticos — NARRADA (N3 "Capítulos y medidores": 3 problemas)
// y gemelo MUDO (M2 "¿Por qué no…?": pregunta fija, Lupa de rayos X y medidores). Guion y fuentes: guion.md. Dibujo esquemático.
const AVS = (n) => 'assets/stickers/' + n + '.png';
const TIERRA = '#7a5230', TIERRA2 = '#5c3b20', COMPOST = '#3b2a1c', PLA = 'rgba(235,250,255,.55)', PLA_B = '#9fd8ff';

/* ---------- dibujos ---------- */
// Vaso de PLA ("compostable"). roto 0..1 = se fragmenta y desaparece (solo con calor + humedad). deforma 0..1 = se ablanda.
function VasoPLA({ x, y, s = 1, roto = 0, deforma = 0, T = 0, cafe = 0, etiqueta = true }) {
  const tiras = 8, g = krng(77), off = Array.from({ length: tiras }, () => [g() * 2 - 1, g() * 2 - 1, g() * 2 - 1]);
  const W0 = 90, W1 = 130, H = 300;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cafe > 0 && <path d={`M ${-W0 + 8} -8 L ${-W1 + 18} ${-H * 0.8} Q 0 ${-H * 0.8 - 10} ${W1 - 18} ${-H * 0.8} L ${W0 - 8} -8 Z`} fill="#5a3418" opacity={cafe} />}
    {Array.from({ length: tiras }, (_, i) => {
      const a = i / tiras, b = (i + 1) / tiras, [ox, oy, orot] = off[i];
      const k = kprog(roto, i / tiras * 0.5, i / tiras * 0.5 + 0.5);   // cada tira se rompe a su tiempo
      const sag = deforma * Math.sin(Math.PI * (a + b) / 2) * 40;
      const p = (u, v) => [klerp(-klerp(W0, W1, v), klerp(W0, W1, v), u), -H * v + (v > 0.6 ? sag * (v - 0.6) * 2.5 : 0)];
      const pts = [p(a, 0), p(b, 0), p(b, 1), p(a, 1)].map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
      return <g key={i} transform={`translate(${ox * 90 * k} ${oy * 60 * k + 40 * k}) rotate(${orot * 40 * k}) scale(${1 - 0.8 * k})`} opacity={1 - k}>
        <polygon points={pts} fill={PLA} stroke={roto > 0.02 ? KC.ink : 'rgba(22,18,15,.18)'} strokeWidth={roto > 0.02 ? 6 : 2} strokeLinejoin="round" />
      </g>;
    })}
    {roto <= 0.02 && <path d={`M ${-W0} 0 L ${-W1} ${-H + deforma * 30} L ${W1} ${-H + deforma * 30} L ${W0} 0 Z`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />}
    {roto <= 0.02 && <ellipse cx={0} cy={-H + deforma * 30} rx={W1} ry={16} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={6} />}
    {roto <= 0.02 && <path d={`M ${-W1 + 30} ${-H + 40} L ${-W0 + 22} -30`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".55" />}
    {roto < 0.4 && etiqueta && <g opacity={1 - roto * 2.5}>
      <rect x={-80} y={-190} width={160} height={70} rx={14} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={-145} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill="#fff">PLA</text>
      <path d="M -70 -240 L 70 -240" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".5" />
    </g>}
    {cafe > 0 && [0, 1, 2].map((i) => <path key={i} d={`M ${-40 + i * 40} ${-H - 20} q 20 -40 0 -80 q -20 -40 0 -80`} stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.5 * cafe * (0.6 + 0.4 * Math.sin(T * 3 + i))} transform={`translate(${mece(T, i, 0.4) * 10} 0)`} />)}
  </g>;
}
// Jardín en corte: pasto arriba, tierra con lombrices y restos que sí se degradan (cascaras 0..1 = cuánto queda).
function Jardin({ T, cascaras = 1, crece = 0 }) {
  const g = krng(31), pie = Array.from({ length: 12 }, () => [80 + g() * 920, 1000 + g() * 420, g() * 360, g() < 0.5]);
  return <>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff, #00d2ff 60%)' }}></div>
    <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
      <circle cx={880} cy={330} r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
      <rect x={0} y={820} width={KW} height={1100} fill={TIERRA} />
      <path d="M 0 820 Q 270 790 540 820 T 1080 820" fill={KC.leaf} stroke={KC.ink} strokeWidth={8} />
      <rect x={0} y={820} width={KW} height={40} fill={KC.leaf} />
      {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 137) % KW} cy={900 + (i * 89) % 900} r={6 + (i % 4) * 3} fill={TIERRA2} />)}
      {pie.map(([x, y, r, hoja], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${cascaras})`} opacity={cascaras}>
        {hoja ? <path d="M -40 0 Q 0 -30 40 0 Q 0 30 -40 0 Z" fill="#d18f2c" stroke={KC.ink} strokeWidth={4} /> : <path d="M -36 -10 Q 0 -30 36 -10 L 30 12 Q 0 0 -30 12 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={4} />}
      </g>)}
      {[0, 1].map((i) => <path key={i} d={`M ${200 + i * 560 + mece(T, i, 0.2) * 30} ${1200 + i * 180} q 30 -20 60 0 t 60 0 t 60 0`} stroke="#e98a8a" strokeWidth={16} fill="none" strokeLinecap="round" />)}
      {[120, 330, 760, 950].map((x, i) => <g key={i} transform={`translate(${x} 830) scale(${1 + crece * 1.5})`}><path d={`M 0 0 q ${mece(T, i, 0.3) * 10} -60 0 -110`} stroke="#2a9a3c" strokeWidth={10} fill="none" /><ellipse cx={14} cy={-80} rx={22} ry={10} fill={KC.leaf} stroke={KC.ink} strokeWidth={3} /></g>)}
    </svg>
  </>;
}
// Composta industrial (pila caliente con vapor y termómetro).
function PilaIndustrial({ x, y, s = 1, T = 0, temp = 58 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 0 Q -260 -230 0 -260 Q 260 -230 300 0 Z" fill={COMPOST} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 22 }, (_, i) => <circle key={i} cx={-240 + (i * 97) % 480} cy={-20 - (i * 53) % 200} r={6 + (i % 3) * 3} fill="#5a4330" />)}
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-150 + i * 100} -270 q 20 -40 0 -80 q -20 -40 0 -80`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.35 + 0.25 * Math.sin(T * 2 + i)} transform={`translate(${mece(T, i, 0.3) * 12} ${-((T * 30 + i * 40) % 60)})`} />)}
    <rect x={190} y={-330} width={26} height={250} rx={13} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={196} y={-330 + 250 * (1 - temp / 80)} width={14} height={250 * temp / 80} rx={7} fill={KC.red} />
    <circle cx={203} cy={-70} r={26} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Cadena de PLA (ácido láctico unido) que se corta con agua y calor. corte 0..1.
function CadenaPLA({ T, r, corte = 0 }) {
  const D = r * 2, n = 9;
  return <svg width={D} height={D}>
    <rect width={D} height={D} fill="#0b1a26" />
    {Array.from({ length: n }, (_, i) => {
      const k = kprog(corte, i / n * 0.6, i / n * 0.6 + 0.4), bx = 40 + i * (D - 80) / (n - 1), by = r + Math.sin(i * 0.9 + T) * 30;
      const dx = (i % 2 ? 1 : -1) * 40 * k, dy = (i % 3 - 1) * 60 * k;
      return <g key={i} transform={`translate(${bx + dx} ${by + dy})`}>
        {i < n - 1 && k < 0.3 && <line x1={0} y1={0} x2={(D - 80) / (n - 1)} y2={Math.sin((i + 1) * 0.9 + T) * 30 - Math.sin(i * 0.9 + T) * 30} stroke="#9fd8ff" strokeWidth={8} opacity={1 - k * 3} />}
        <circle r={20} fill="#ffd36b" stroke={KC.ink} strokeWidth={4} />
      </g>;
    })}
    {Array.from({ length: 14 }, (_, i) => { const u = ((T * 0.4 + i / 14) % 1); return <g key={'w' + i} transform={`translate(${(i * 83) % D} ${klerp(D, 0, u)})`} opacity={corte > 0 ? 0.9 : 0.3}><circle r={9} fill={KC.red} /><circle cx={-10} cy={7} r={5} fill="#fff" /><circle cx={10} cy={7} r={5} fill="#fff" /></g>; })}
  </svg>;
}
// Botella de PET (para el capítulo del reciclaje).
function BotellaPET({ x, y, s = 1, rot = 0, color = 'rgba(120,200,255,.55)' }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 0 L -40 -150 Q -40 -190 -16 -210 L -16 -240 L 16 -240 L 16 -210 Q 40 -190 40 -150 L 40 0 Q 40 12 28 12 L -28 12 Q -40 12 -40 0 Z" fill={color} stroke={KC.ink} strokeWidth={6} />
    <rect x={-20} y={-262} width={40} height={24} rx={6} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
    <rect x={-40} y={-120} width={80} height={44} fill={KC.red} opacity=".8" />
  </g>;
}
function Maiz({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -120 C 50 -100 60 60 0 120 C -60 60 -50 -100 0 -120 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={(i % 3 - 1) * 22} cy={-90 + Math.floor(i / 3) * 34} r={11} fill="#ffc21a" stroke="#c99200" strokeWidth={2} />)}
    <path d="M 0 120 C -80 60 -90 -40 -60 -90 M 0 120 C 80 60 90 -40 60 -90" stroke={KC.leaf} strokeWidth={22} fill="none" strokeLinecap="round" />
  </g>;
}

/* ---------- versión narrada ---------- */
function BioplasticosNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, U: CUES.Uno, Do: CUES.Donde, E: CUES.Estudio, P: CUES.Pregunta, D2: CUES.Dos, Tr: CUES.Tres, Ca: CUES.Cafe, Es: CUES.Estafa, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G + 0.05, K.G + 0.8, kEase.sale);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* gancho: el vaso cae al jardín y los días pasan; las cáscaras se deshacen, el vaso no */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0}>
        <Jardin T={T} cascaras={1 - kprog(T, K.G + 1.4, K.Q - 0.4)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><VasoPLA x={540} y={klerp(500, 1120, cae)} s={1.1} rot={0} T={T} /></svg>
      </Escena>
      <Escena T={T} a={K.Q} b={K.U}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <Maiz x={180} y={760} s={kentrada(T, K.Q + 0.1, null, 'pop').s} />
          <g transform="translate(450 760)" opacity={kprog(T, K.Q + 0.8, K.Q + 1.2)}>{[0, 1, 2].map((i) => <rect key={i} x={-50 + i * 34} y={-30 - (i % 2) * 34} width={60} height={60} rx={8} fill="#fff" stroke={KC.ink} strokeWidth={5} transform={`rotate(${i * 8})`} />)}</g>
          {T > K.Q + 1.6 && [0, 1, 2].map((i) => <Bacteria key={i} x={720 + i * 70} y={700 + (i % 2) * 90} rot={T * 40 + i * 70} s={0.6} T={T} seed={i} color={KC.mint} />)}
          {/* ácido láctico que se une en cadena */}
          {Array.from({ length: 9 }, (_, i) => { const at = K.Q + 2.4 + i * 0.18; if (T < at) return null; const p = kprog(T, at, at + 0.3, kEase.rebote);
            return <g key={i} transform={`translate(${160 + i * 95} ${1080 + Math.sin(i * 0.9 + T) * 20}) scale(${p})`}>{i < 8 && <line x1={0} y1={0} x2={95} y2={0} stroke="#2a8fd8" strokeWidth={8} />}<circle r={26} fill="#ffd36b" stroke={KC.ink} strokeWidth={5} /></g>; })}
          {[[300, 760], [610, 760], [880, 900]].map(([x, y], i) => <path key={i} d={`M ${x} ${y} l 50 0 m -16 -14 l 16 14 l -16 14`} stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" opacity={kprog(T, K.Q + 0.6 + i * 0.8, K.Q + 0.9 + i * 0.8)} />)}
        </svg>
      </Escena>
      {/* problema 1 (por dentro): la cadena solo se corta con calor y humedad */}
      <Escena T={T} a={K.U} b={K.Do}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #12304a 0%, #0E0F12 75%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><PilaIndustrial x={540} y={1350} s={0.9} T={T} temp={klerp(25, 58, kprog(T, K.U + 0.5, K.U + 3))} /></svg>
      </Escena>
      <Escena T={T} a={K.Do} b={K.E}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[['fábrica', '58 °C', true], ['jardín', '~25 °C', false], ['mar', 'frío', false]].map(([t, c, ok], i) => { const at = K.Do + 0.3 + i * 0.6; if (T < at) return null; const p = kprog(T, at, at + 0.4, kEase.rebote);
            return <g key={i} transform={`translate(${200 + i * 340} 900) scale(${p})`}>
              <rect x={-150} y={-230} width={300} height={420} rx={28} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
              {i === 0 && <PilaIndustrial x={0} y={40} s={0.4} T={T} />}
              {i === 1 && <g><rect x={-120} y={-30} width={240} height={70} fill={TIERRA} /><rect x={-120} y={-44} width={240} height={18} fill={KC.leaf} /><VasoPLA x={0} y={20} s={0.3} etiqueta={false} /></g>}
              {i === 2 && <g><rect x={-120} y={-80} width={240} height={140} rx={10} fill="#2f7fff" /><path d="M -120 -80 q 30 -16 60 0 t 60 0 t 60 0 t 60 0" fill="#7fc4ff" stroke={KC.ink} strokeWidth={4} /><VasoPLA x={0} y={30} s={0.3} etiqueta={false} /></g>}
              <text x={0} y={100} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{t}</text>
              <text x={0} y={145} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="#5a524a">{c}</text>
              <g transform="translate(0 -180)">{ok ? <path d="M -30 0 L -8 22 L 34 -24" stroke={KC.leaf} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke={KC.red} strokeWidth={14} strokeLinecap="round" />}</g>
            </g>; })}
        </svg>
      </Escena>
      {/* estudio: un año en agua de mar de laboratorio */}
      <Escena T={T} a={K.E} b={K.P}>
        <FondoLunares color={KC.cyan} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={190} y={800} width={700} height={430} rx={24} fill="rgba(47,127,255,.55)" stroke={KC.ink} strokeWidth={9} />
          <path d={`M 190 830 q 44 ${-12 + 6 * Math.sin(T * 2)} 88 0 t 88 0 t 88 0 t 88 0 t 88 0 t 88 0 t 88 0 t 88 0`} fill="none" stroke="#fff" strokeWidth={5} opacity=".7" />
          <g transform={`translate(540 ${1020 + mece(T, 2, 0.2) * 14}) rotate(${mece(T, 4, 0.2) * 8})`}><rect x={-110} y={-70} width={220} height={140} rx={8} fill={PLA} stroke={KC.ink} strokeWidth={6} /><text y={14} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink} opacity=".6">PLA</text></g>
        </svg>
      </Escena>
      <Escena T={T} a={K.P} b={K.D2} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <VasoPLA x={330} y={1150} s={1.2} T={T} />
          <g transform={`translate(330 600) rotate(${T * 40})`} opacity={kprog(T, K.P + 0.3, K.P + 0.7)}>{[0, 120, 240].map((r) => <path key={r} d="M 0 -110 L 60 -20 L 20 -20 L 20 30 L -20 30 L -20 -20 L -60 -20 Z" transform={`rotate(${r}) translate(0 -30)`} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />)}</g>
        </svg>
      </Escena>
      {/* problema 2: parece PET pero no lo es */}
      <Escena T={T} a={K.D2} b={K.Tr}>
        <FondoLunares color={KC.yellow} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={0} y={1090} width={KW} height={40} fill="#4a4f5a" stroke={KC.ink} strokeWidth={6} />
          {Array.from({ length: 9 }, (_, i) => { const x = ((i * 150 + (T - K.D2) * 160) % 1350) - 130; return i === 4 ? <VasoPLA key={i} x={x} y={1088} s={0.55} etiqueta={false} /> : <BotellaPET key={i} x={x} y={1080} s={0.9} />; })}
          {/* lote reciclado: se enturbia si entra mucho PLA */}
          <g transform="translate(540 700)"><rect x={-260} y={-110} width={520} height={220} rx={30} fill={mixHex('#9fe0ff', '#c9c2b5', kprog(T, K.D2 + 3.0, K.D2 + 5.0))} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={-220 + (i % 8) * 62} cy={-60 + Math.floor(i / 8) * 60} r={18} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={3} />)}</g>
        </svg>
      </Escena>
      {/* problema 3: cuesta más */}
      <Escena T={T} a={K.Tr} b={K.Ca}><FondoLunares color={KC.mint} /></Escena>
      <Escena T={T} a={K.Ca} b={K.Es}>
        <FondoLunares color={KC.orange} punto="rgba(255,255,255,.22)" />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><VasoPLA x={540} y={1180} s={1.4} T={T} cafe={kprog(T, K.Ca + 0.3, K.Ca + 1)} deforma={kprog(T, K.Ca + 1.5, K.Es - 0.2)} /></svg>
      </Escena>
      <Escena T={T} a={K.Es} b={K.C}><FondoLunares color={KC.lilac} /></Escena>
      <Escena T={T} a={K.C} b={FIN} zoom={0.03}>
        <Jardin T={T} cascaras={0} crece={kprog(T, K.C, K.C + 3)} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><VasoPLA x={540} y={1120} s={1.1} T={T} /></svg>
      </Escena>

      {/* capítulos y medidores */}
      <Capitulo T={T} caps={[{ at: K.U, titulo: 'Problema: calor' }, { at: K.D2, titulo: 'Problema: reciclaje' }, { at: K.Tr, titulo: 'Problema: costo' }]} hasta={K.Ca - 0.2} />
      {T > K.G + 1.2 && T < K.Q - 0.2 && <Contador T={T} at={K.G + 1.2} desde={0} hasta={180} dur={K.Q - K.G - 1.8} sufijo=" días" x={330} y={440} tam={80} color={KC.yellow} />}
      <Chip T={T} at={K.G + 0.6} until={K.Q - 0.3} texto="«compostable»" x={330} y={560} tam={44} borde={KC.leaf} />
      <Etq T={T} at={K.Q + 0.3} until={K.U - 0.3} x={120} y={930} texto="maíz" color={KC.ink} />
      <Etq T={T} at={K.Q + 1.0} until={K.U - 0.3} x={430} y={600} texto="azúcar" color={KC.ink} />
      <Etq T={T} at={K.Q + 1.8} until={K.U - 0.3} x={700} y={600} texto="bacterias" color={KC.ink} />
      <Chip T={T} at={K.Q + 2.6} until={K.U - 0.3} texto="ácido láctico → PLA" y={940} tam={42} />
      <Medidor T={T} at={K.U + 0.3} until={K.Do - 0.3} etiqueta="TEMPERATURA" valor={(t) => klerp(25, 58, kprog(t, K.U + 0.5, K.U + 3)) / 70} texto={(v) => Math.round(v * 70) + ' °C'} y={450} color={KC.red} />
      <Lupa T={T} at={K.U + 1.6} until={K.Do - 0.3} x={540} y={830} r={230} fx={480} fy={1150} interior={(t, r) => <CadenaPLA T={t} r={r} corte={kprog(t, K.U + 3, K.Do - 0.6)} />} etiqueta="RAYOS X · cadena de PLA + agua" tinte={KC.cyan} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.8} anio="2017" quien="Universidad de Bayreuth" revista="Bagheri et al. · Global Challenges" y={600} />
      {T > K.E + 2.6 && T < K.P - 0.2 && <Contador T={T} at={K.E + 2.6} desde={0} hasta={365} dur={K.P - K.E - 3.2} sufijo=" días · agua de mar" x={540} y={720} tam={60} color={KC.yellow} />}
      <Medidor T={T} at={K.E + 2.8} until={K.P - 0.3} etiqueta="PLA DEGRADADO EN 1 AÑO" valor={0} texto={() => '0 %'} y={1460} color={KC.mint} />
      <Chip T={T} at={K.D2 + 0.5} until={K.Tr - 0.3} texto="¿PET o PLA?" y={430} tam={46} />
      <Chip T={T} at={K.D2 + 3.2} until={K.Tr - 0.3} texto="mucho PLA = lote dañado" y={900} tam={40} borde={KC.red} />
      <Comparativa T={T} at={K.Tr + 0.4} until={K.Ca - 0.3} max={2} y={520} alto={420} izq={{ valor: 1, etiqueta: 'PET', texto: '$', color: '#7fc4ff' }} der={{ valor: 1.75, etiqueta: 'PLA', texto: '$$', color: KC.leaf }} />
      <Chip T={T} at={K.Tr + 1.2} until={K.Ca - 0.3} texto="fermentar · purificar · fabricar" y={1490} tam={36} mono />
      <Medidor T={T} at={K.Ca + 0.6} until={K.Es - 0.3} etiqueta="SE ABLANDA DESDE" valor={0.55 / 0.9} texto={() => '~55–60 °C'} y={1440} color={KC.red} />
      <MitoTachado T={T} at={K.Es + 0.2} tacharEn={K.Es + 1.6} until={K.C - 0.3} texto="¿Estafa?" y={700} tam={80} />
      <Medidor T={T} at={K.Es + 1.9} until={K.C - 0.3} etiqueta="TECNOLOGÍA" valor={(t) => 0.5 * kprog(t, K.Es + 2, K.Es + 2.8)} texto={() => 'a medio camino'} y={1000} color={KC.yellow} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="¿compostable DÓNDE?" x={360} y={460} tam={52} borde={KC.leaf} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="En tu jardín no se deshace: *necesita una fábrica.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.U - 0.1} texto="PLA: *ácido láctico* del azúcar del maíz." />
      <Subtitulo T={T} idx={2} at={K.U + 0.1} until={K.Do - 0.1} texto="Necesita humedad *y unos 58 °C* por semanas." />
      <Subtitulo T={T} idx={3} at={K.Do + 0.1} until={K.E - 0.1} texto="En una composta industrial: *no en tu jardín.*" />
      <Subtitulo T={T} idx={4} at={K.E + 0.1} until={K.P - 0.1} texto="Un año en agua de mar: *no se degradó.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.D2 - 0.1} texto="¿Y si mejor *lo reciclo?*" />
      <Subtitulo T={T} idx={6} at={K.D2 + 0.1} until={K.Tr - 0.1} texto="Parece PET… *pero no lo es.*" />
      <Subtitulo T={T} idx={7} at={K.Tr + 0.1} until={K.Ca - 0.1} texto="Problema tres: *cuesta más.*" />
      <Subtitulo T={T} idx={8} at={K.Ca + 0.1} until={K.Es - 0.1} texto="Con café muy caliente *se deforma.*" />
      <Subtitulo T={T} idx={9} at={K.Es + 0.1} until={K.C - 0.1} texto="¿Estafa? No: *a medio camino.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="En tu jardín, *este vaso sigue aquí.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.8, 'avatar_04_bajando_lentes', 'gancho'],
        [CUES.Que + 0.8, CUES.Uno - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Donde + 0.3, CUES.Estudio - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Pregunta - 0.1, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.1, CUES.Dos + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Dos + 3.5, CUES.Tres - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Cafe + 1.0, CUES.Estafa - 0.2, 'avatar_03_aburrido_manos_mejillas', 'arriba-der'],
        [CUES.Estafa + 0.3, CUES.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="03" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={AVS('avatar_13_senalando_arriba')} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo mudo (M2 "¿Por qué no…?") ---------- */
// Pregunta fija arriba. Dos vasos: tu jardín (~25 °C) y composta industrial (58 °C). Time-lapse de 45 días:
// el de la fábrica se deshace, el del jardín no. Lupa de rayos X: el agua corta la cadena con calor. Luego el mar: 365 días, 0 %.
function BioplasticosMudo() {
  const { T, CUES } = useComposition();
  const K = { P: CUES.Pregunta, En: CUES.Entierra, D: CUES.Dias, X: CUES.RayosX, M: CUES.Mar, R: CUES.Respuesta, L: CUES.Loop };
  const FIN = K.L + 7;
  const dias = kprog(T, K.D + 0.5, K.D + 15);                 // 0 → 45 días
  const cae = kprog(T, K.P + 0.2, K.P + 1.4, kEase.sale);
  const lado = (x, w, fondo, children) => <div style={{ position:'absolute', left:x, top:0, width:w, height:KH, overflow:'hidden', background:fondo }}>{children}</div>;
  const vuelve = kprog(T, K.L + 1, K.L + 4);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* dos mitades: jardín | composta industrial */}
      <Escena T={T} a={K.P} b={K.M} zoom={0}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff, #00d2ff 60%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={0} y={1000} width={540} height={920} fill={TIERRA} /><rect x={0} y={985} width={540} height={30} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
          <rect x={540} y={760} width={540} height={1160} fill="#2b1d12" />
          <PilaIndustrial x={810} y={1060} s={0.85} T={T} />
          <line x1={540} y1={600} x2={540} y2={1920} stroke={KC.ink} strokeWidth={10} />
          <VasoPLA x={270} y={klerp(960, 1300, cae)} s={0.75} T={T} />
          <VasoPLA x={810} y={klerp(960, 1300, cae)} s={0.75} T={T} roto={dias} />
        </svg>
      </Escena>
      <Escena T={T} a={K.M} b={K.R}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#7fc4ff, #2346ff 40%, #0d1424)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {Array.from({ length: 20 }, (_, i) => { const u = ((T * 0.15 + i / 20) % 1); return <circle key={i} cx={(i * 113) % KW} cy={klerp(1700, 600, u)} r={8 + (i % 3) * 4} fill="none" stroke="#fff" strokeWidth={3} opacity={0.5 * Math.sin(Math.PI * u)} />; })}
          <g transform={`translate(${330 + mece(T, 3, 0.1) * 60} ${1050 + mece(T, 7, 0.1) * 40}) rotate(${mece(T, 2, 0.1) * 20})`}><VasoPLA x={0} y={150} s={0.9} T={T} /></g>
        </svg>
      </Escena>
      <Escena T={T} a={K.R} b={K.L}>
        <FondoLunares color={KC.mint} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><PilaIndustrial x={540} y={1330} s={1.1} T={T} /></svg>
      </Escena>
      <Escena T={T} a={K.L} b={FIN + 1} zoom={0}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#8fe8ff, #00d2ff 60%)' }}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={0} y={1000} width={540} height={920} fill={TIERRA} /><rect x={0} y={985} width={540} height={30} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
          <rect x={540} y={760} width={540} height={1160} fill="#2b1d12" />
          <PilaIndustrial x={810} y={1060} s={0.85} T={T} />
          <line x1={540} y1={600} x2={540} y2={1920} stroke={KC.ink} strokeWidth={10} />
          <VasoPLA x={270} y={klerp(1300, 960, vuelve)} s={0.75} T={T} />
          <VasoPLA x={810} y={klerp(1300, 960, vuelve)} s={0.75} T={T} roto={1 - kprog(T, K.L + 0.5, K.L + 2)} />
        </svg>
      </Escena>

      {/* la pregunta fija arriba */}
      <Chip T={T} at={K.P - 1} until={FIN + 1} texto="¿Por qué no se deshace en tu jardín?" y={120} tam={40} borde={KC.leaf} />
      {T >= K.En && T < K.M - 0.2 && <>
        <Medidor T={T} at={K.En + 0.4} until={K.M - 0.4} etiqueta="JARDÍN" valor={25 / 70} texto={() => '~25 °C'} x={40} y={1660} ancho={460} color={KC.cyan} />
        <Medidor T={T} at={K.En + 0.6} until={K.M - 0.4} etiqueta="INDUSTRIAL" valor={58 / 70} texto={() => '58 °C'} x={580} y={1660} ancho={460} color={KC.red} />
      </>}
      {T >= K.D && T < K.M - 0.2 && <div style={{ position:'absolute', left:0, right:0, top:1520, textAlign:'center', zIndex:41, font:`700 72px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>día {Math.round(45 * dias)}</div>}
      <Lupa T={T} at={K.X + 0.2} until={K.M - 0.4} x={540} y={1180} r={250} fx={810} fy={1150} interior={(t, r) => <CadenaPLA T={t} r={r} corte={kprog(t, K.X + 1, K.M - 1)} />} etiqueta="58 °C + agua: se corta" tinte={KC.red} />
      {T >= K.M && T < K.R - 0.2 && <div style={{ position:'absolute', left:0, right:0, top:1520, textAlign:'center', zIndex:41, font:`700 72px ${KF.mono}`, color:KC.texto, textShadow:KSOMBRA }}>día {Math.round(365 * kprog(T, K.M + 0.5, K.R - 1))}</div>}
      <Medidor T={T} at={K.M + 1} until={K.R - 0.4} etiqueta="MAR · DEGRADADO" valor={0} texto={() => '0 %'} y={1660} color={KC.mint} />
      <Chip T={T} at={K.R + 0.4} until={K.L - 0.3} texto="58 °C" y={560} tam={70} borde={KC.red} />
      <Chip T={T} at={K.R + 1.6} until={K.L - 0.3} texto="+ humedad" y={700} tam={56} borde={KC.cyan} />
      <Chip T={T} at={K.R + 2.8} until={K.L - 0.3} texto="+ semanas" y={840} tam={56} borde={KC.yellow} />

      <Robert T={T} apariciones={[
        [CUES.Pregunta - 1, CUES.Pregunta + 3.5, 'avatar_06_pensativo_menton', 'gancho'],
        [CUES.Dias + 1, CUES.Dias + 5, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Dias + 9, CUES.Dias + 14, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.RayosX + 2, CUES.RayosX + 6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Mar + 2, CUES.Mar + 7, 'avatar_10_serio_molesto', 'grande'],
        [CUES.Respuesta + 3.5, CUES.Loop - 0.3, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Loop + 2, CUES.Loop + 12, 'avatar_06_pensativo_menton', 'gancho']]} />
      <MarcaAgua T={T} tema="quimica" num="03" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function BioplasticosNarradoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BioplasticosNarrado /></CompositionStage></div>;
}
function BioplasticosMudoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><BioplasticosMudo /></CompositionStage></div>;
}
window.BioplasticosNarradoApp = BioplasticosNarradoApp;
window.BioplasticosMudoApp = BioplasticosMudoApp;
