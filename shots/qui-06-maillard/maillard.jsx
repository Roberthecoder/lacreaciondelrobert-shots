// Shot Químico #06 · Ese dorado no es quemado: la reacción de Maillard — NARRADO (N1 por dentro + medidores N3).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const CRUDO = '#e7737a', DORADO = '#9a5a2a', CAFE = '#6b3a1c';

function Sarten({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={300} y={-26} width={300} height={52} rx={26} fill="#2a2d33" stroke={KC.ink} strokeWidth={9} />
    <ellipse rx={330} ry={90} fill="#3b3f48" stroke={KC.ink} strokeWidth={10} />
    <ellipse rx={290} ry={66} fill="#23262c" />
  </g>;
}
function Bistec({ x, y, s = 1, dorado = 0, T = 0 }) {
  const c = mixHex(CRUDO, DORADO, dorado);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -210 -10 Q -220 -70 -120 -80 Q 40 -100 170 -60 Q 230 -30 200 20 Q 150 70 0 70 Q -180 70 -210 -10 Z" fill={c} stroke={KC.ink} strokeWidth={9} />
    <path d="M -150 -20 Q -60 -50 60 -30 Q 120 -20 150 0" stroke={mixHex('#fbe2d0', '#d8a46a', dorado)} strokeWidth={14} fill="none" opacity={0.8} />
    {dorado > 0.3 && [-120, -40, 40, 120].map((dx, i) => <line key={i} x1={dx - 30} y1={-50} x2={dx + 30} y2={50} stroke={CAFE} strokeWidth={14} opacity={(dorado - 0.3) * 1.4} strokeLinecap="round" />)}
  </g>;
}
function Vapor({ T, x, y, n = 4, o = 1, color = 'rgba(255,255,255,.6)' }) {
  if (o <= 0) return null;
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const u = ((T * 0.6 + i / n) % 1); return <path key={i} d={`M ${x + (i - n / 2) * 60} ${y - u * 260} q 22 -30 0 -60 q -22 -30 0 -60`} stroke={color} strokeWidth={12} fill="none" strokeLinecap="round" opacity={Math.sin(u * Math.PI)} />; })}</g>;
}
const hexPts = (r) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${Math.cos(a) * r},${Math.sin(a) * r}`; }).join(' ');
function Azucar({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={hexPts(58)} fill={KC.white} stroke={KC.ink} strokeWidth={8} />
    <Atomo x={0} y={-58} r={20} color={QA.O} letra="O" tam={16} />
    <text x={0} y={14} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>azúcar</text>
  </g>;
}
function Aminoacido({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <line x1={-70} y1={0} x2={70} y2={0} stroke={KC.ink} strokeWidth={14} />
    <Atomo x={-70} y={0} r={34} color={QA.N} letra="N" tam={28} /><Atomo x={0} y={0} r={30} color={QA.C} /><Atomo x={70} y={0} r={34} color={QA.O} letra="O" tam={26} />
    <line x1={0} y1={0} x2={0} y2={60} stroke={KC.ink} strokeWidth={12} /><circle cx={0} cy={72} r={22} fill={KC.mint} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Pirazina({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={hexPts(46)} fill="#ffcf6b" stroke={KC.ink} strokeWidth={7} />
    <Atomo x={0} y={-46} r={18} color={QA.N} letra="N" tam={16} /><Atomo x={0} y={46} r={18} color={QA.N} letra="N" tam={16} />
  </g>;
}
// Red café de melanoidinas que crece (f 0..1).
function RedCafe({ T, f = 0, x = 120, y = 760, w = 840, h = 420, seed = 6 }) {
  if (f <= 0) return null;
  const R = krng(seed);
  const nod = Array.from({ length: 34 }, () => [x + R() * w, y + R() * h]);
  const n = Math.floor(f * nod.length);
  return <g>{nod.slice(0, n).map(([a, b], i) => { const [c, d] = nod[Math.max(0, i - 1 - (i % 3))]; return <g key={i}>
    <line x1={a} y1={b} x2={c} y2={d} stroke={CAFE} strokeWidth={16} strokeLinecap="round" />
    <circle cx={a} cy={b} r={20} fill={DORADO} stroke={KC.ink} strokeWidth={5} /></g>; })}</g>;
}
function TuboEnsayo({ x, y, s = 1, color = '#f6f3ec' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -40 -300 L -40 40 Q -40 90 0 90 Q 40 90 40 40 L 40 -300" fill="rgba(255,255,255,.2)" stroke={KC.ink} strokeWidth={8} />
    <path d="M -34 -100 L -34 40 Q -34 84 0 84 Q 34 84 34 40 L 34 -100 Z" fill={color} />
    <rect x={-56} y={-310} width={112} height={20} rx={8} fill="#c3cbd3" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Acrilamida({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <line x1={-120} y1={0} x2={0} y2={0} stroke={KC.ink} strokeWidth={12} /><line x1={-120} y1={-12} x2={-60} y2={-12} stroke={KC.ink} strokeWidth={8} />
    <line x1={0} y1={0} x2={60} y2={-50} stroke={KC.ink} strokeWidth={12} /><line x1={60} y1={-50} x2={60} y2={-130} stroke={KC.ink} strokeWidth={12} />
    <line x1={60} y1={-50} x2={140} y2={-10} stroke={KC.ink} strokeWidth={12} />
    <Atomo x={-120} y={0} r={30} color={QA.C} /><Atomo x={-60} y={0} r={30} color={QA.C} /><Atomo x={0} y={0} r={30} color={QA.C} /><Atomo x={60} y={-50} r={30} color={QA.C} />
    <Atomo x={60} y={-130} r={30} color={QA.O} letra="O" tam={24} /><Atomo x={140} y={-10} r={32} color={QA.N} letra="N" tam={26} />
  </g>;
}
function Papas({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-50, -20, 10, 40, 60].map((dx, i) => <rect key={i} x={dx - 14} y={-140 + (i % 2) * 20} width={28} height={150} rx={6} fill="#f2c14e" stroke={KC.ink} strokeWidth={5} transform={`rotate(${(i - 2) * 8} ${dx} 0)`} />)}
    <path d="M -90 -40 L 90 -40 L 70 80 L -70 80 Z" fill={KC.red} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
function PanTostado({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -100 100 L -100 -40 Q -130 -120 -40 -120 Q 0 -150 40 -120 Q 130 -120 100 -40 L 100 100 Z" fill="#c98a3c" stroke={KC.ink} strokeWidth={8} />
    <path d="M -80 85 L -80 -35 Q -100 -100 -35 -100 Q 0 -125 35 -100 Q 100 -100 80 -35 L 80 85 Z" fill="#e9b96a" />
  </g>;
}
function Congelador({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-260} y={-300} width={520} height={600} rx={30} fill="#e8f4fb" stroke={KC.ink} strokeWidth={10} />
    <rect x={-230} y={-270} width={460} height={540} rx={20} fill="#bfe3f5" />
    {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${-220 + i * 40} -270 l 10 ${20 + (i % 3) * 14} l 10 ${-20 - (i % 3) * 14}`} fill="#fff" />)}
    <line x1={-230} y1={0} x2={230} y2={0} stroke="#8ab6cc" strokeWidth={8} />
  </g>;
}
function Albondiga({ x, y, s = 1, dorado = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={70} fill={mixHex('#b4655a', '#8a5a3a', dorado)} stroke={KC.ink} strokeWidth={8} />
    {[[-20, -20], [25, 10], [-10, 30], [30, -30]].map(([dx, dy], i) => <circle key={i} cx={dx} cy={dy} r={9} fill="rgba(0,0,0,.18)" />)}
  </g>;
}

function Maillard() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, U: CUES.Union, Ca: CUES.Cadena, Ar: CUES.Aroma, Co: CUES.Color, Ag: CUES.Agua, Pr: CUES.Pregunta, Ma: CUES.Maillard, Ac: CUES.Acrilamida, Ri: CUES.Riesgo, Cg: CUES.Congelador, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const cae = kprog(T, K.G, K.G + 0.5, kEase.rebote);
  const dorado0 = kprog(T, K.G + 0.6, K.G + 4.5, kEase.suave);
  const une = kprog(T, K.U + 0.5, K.U + 2.6, kEase.suave);
  const rompe = kprog(T, K.Ca + 0.4, K.Ca + 3.4, kEase.sale);
  const temp = (t) => klerp(20, 160, kprog(t, K.U, K.U + 3));
  const vel = (t) => kclamp(0.15 + 0.75 * kprog(t, K.Ag + 0.2, K.Ag + 1.6) - 0.6 * kprog(t, K.Ag + 2.0, K.Ag + 3.2), 0, 1);
  const cafe = kprog(T, K.Ma + 2.0, K.Ma + 5.0);
  const R = krng(21);
  const frag = Array.from({ length: 16 }, () => [R() * 2 - 1, R() * 2 - 1, R() * 360, R() < 0.3]);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el bistec cae al sartén y se dora */}
      <Escena T={T} a={K.G} b={K.U} zoom={0.06} origen="50% 55%">
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Sarten x={460} y={1040} s={1.2} />
          <Bistec x={430} y={klerp(500, 1010, cae)} s={1.25} dorado={dorado0} T={T} />
          <Vapor T={T} x={430} y={950} n={5} o={kprog(T, K.G + 0.5, K.G + 1)} />
          {T > K.G + 0.45 && T < K.G + 1.2 && Array.from({ length: 10 }, (_, i) => { const u = kprog(T, K.G + 0.45, K.G + 1.2); return <circle key={i} cx={430 + Math.cos(i) * 300 * u} cy={1010 - Math.abs(Math.sin(i * 2)) * 200 * u} r={8} fill={KC.yellow} opacity={1 - u} />; })}
        </SvgCapa>
      </Escena>
      {/* 1–5 · por dentro de la superficie */}
      <Escena T={T} a={K.U} b={K.Pr}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={1200} width={KW} height={720} fill={mixHex('#5a2a2a', '#3a2214', kprog(T, K.Co, K.Co + 3))} />
          {T < K.Ca + 0.5 && <g>
            <Azucar x={klerp(200, 420, une)} y={860} s={1.8} rot={T * 30} />
            <Aminoacido x={klerp(880, 660, une)} y={880} s={1.6} rot={-T * 20} />
            {une > 0.98 && <circle cx={540} cy={870} r={90 * (1 - kprog(T, K.U + 2.6, K.U + 3.2))} fill={KC.yellow} opacity={0.8} />}
          </g>}
          {T >= K.Ca + 0.5 && T < K.Ag && frag.map(([u, v, r, esP], i) => {
            const sube = esP ? kprog(T, K.Ar + 0.2, K.Ar + 2.6, kEase.suave) : 0;
            const junta = !esP ? kprog(T, K.Co + 0.2, K.Co + 1.2) : 0;
            const px = 540 + u * 380 * rompe, py = 880 + v * 260 * rompe - sube * 560;
            if (junta > 0.9) return null;
            return esP ? <Pirazina key={i} x={px} y={py} s={1.15} rot={r + T * 40} />
              : <circle key={i} cx={klerp(px, 540, junta)} cy={klerp(py, 1000, junta)} r={26} fill={i % 2 ? "#c9a14a" : "#e0b070"} stroke={KC.ink} strokeWidth={5} opacity={1 - junta} />;
          })}
          {T > K.Ar && T < K.Ag && <g opacity={kprog(T, K.Ar + 0.3, K.Ar + 0.8) * (1 - kprog(T, K.Co + 0.5, K.Co + 1))}><path d="M 540 400 q 60 40 40 120 q -20 20 -60 10" stroke={KC.texto} strokeWidth={14} fill="none" strokeLinecap="round" /></g>}
          <RedCafe T={T} f={kprog(T, K.Co + 0.6, K.Co + 3.4) * (1 - kprog(T, K.Pr - 0.4, K.Pr))} />
          {T > K.Ag && Array.from({ length: 12 }, (_, i) => { const t0 = K.Ag + 1.8 + (i % 6) * 0.12, u = kprog(T, t0, t0 + 0.7); return u > 0 && u < 1 ? <path key={i} d="M 0 -26 Q 18 0 0 14 Q -18 0 0 -26 Z" transform={`translate(${200 + (i * 71) % 680} ${klerp(500, 1100, u)})`} fill="#7fc8ff" stroke={KC.ink} strokeWidth={4} /> : null; })}
        </SvgCapa>
        <Medidor T={T} at={K.U + 0.2} until={K.Pr - 0.2} valor={(t) => (temp(t) - 20) / 180} etiqueta="temperatura" texto={(v) => Math.round(temp(T)) + ' °C'} y={1480} color={KC.orange} />
        <Medidor T={T} at={K.Ag + 0.1} until={K.Pr - 0.2} valor={vel} etiqueta="velocidad de la reacción" texto={(v) => v > 0.5 ? 'rápida' : 'lenta'} y={1610} color={KC.yellow} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.Pr} b={K.Ma} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><text x={280} y={1100} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 900)`}>?</text></SvgCapa>
      </Escena>
      {/* 7 · 1912: Maillard */}
      <Escena T={T} a={K.Ma} b={K.Ac}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <TuboEnsayo x={760} y={1050} s={1.1} color={mixHex('#f6f3ec', CAFE, cafe)} />
          <Llama T={T} x={760} y={1230} s={0.8} o={kprog(T, K.Ma + 1.2, K.Ma + 1.6)} />
        </SvgCapa>
      </Escena>
      {/* 8–9 · 2002: acrilamida */}
      <Escena T={T} a={K.Ac} b={K.Cg}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Papas x={220} y={1130} s={1.2} />
          <PanTostado x={850} y={1110} s={1.0} />
          <g opacity={kprog(T, K.Ac + 3.5, K.Ac + 4.2)}><Acrilamida x={520} y={960} s={1.2} rot={Math.sin(T) * 5} /></g>
          {T > K.Ri && <g transform={`translate(540 620) scale(${kprog(T, K.Ri, K.Ri + 0.4, kEase.rebote)})`}><path d="M 0 -120 L 130 100 L -130 100 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" /><text y={80} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>!</text></g>}
        </SvgCapa>
      </Escena>
      {/* 10 · el congelador */}
      <Escena T={T} a={K.Cg} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Congelador x={540} y={900} s={1.0} T={T} />
          <Albondiga x={400} y={1080} s={1.0} dorado={kprog(T, K.Cg + 0.8, K.Cg + 4)} />
          <Albondiga x={600} y={1090} s={0.9} dorado={kprog(T, K.Cg + 0.8, K.Cg + 4)} />
        </SvgCapa>
        <Contador T={T} at={K.Cg + 0.5} desde={0} hasta={4} dur={3.5} sufijo=" meses · −18 °C" x={540} y={1500} tam={60} color={KC.ink} />
      </Escena>
      {/* 11 · cierre: el mismo sartén, ya dorado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04} origen="50% 55%">
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Sarten x={460} y={1040} s={1.2} />
          <Bistec x={430} y={1010} s={1.25} dorado={1} T={T} />
          <Vapor T={T} x={430} y={950} n={5} o={1} color="rgba(255,240,200,.75)" />
          {[0, 1, 2].map((i) => <Pirazina key={i} x={300 + i * 140} y={720 - ((T * 60 + i * 80) % 200)} s={0.5} rot={T * 50} o={0.8} />)}
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.6} until={K.G + 2.8} texto="¿quemado?" x={330} y={470} tam={50} />
      <Chip T={T} at={K.G + 3.0} until={K.U - 0.3} texto="química: azúcar + proteína" x={400} y={470} tam={40} borde={KC.yellow} />
      <Etq T={T} at={K.U + 1.0} until={K.Ca - 0.2} x={60} y={700} texto="azúcar" tam={34} />
      <Etq T={T} at={K.U + 1.0} until={K.Ca - 0.2} x={1030} y={1060} texto="aminoácido" lado="izq" tam={34} />
      <Chip T={T} at={K.Ca + 0.6} until={K.Ar - 0.2} texto="se reacomoda · se rompe · se junta" x={540} y={1100} tam={36} borde={KC.yellow} />
      <Chip T={T} at={K.Ar + 0.4} until={K.Co - 0.2} texto="pirazinas → olor a tostado" x={540} y={1100} tam={40} borde="#ffcf6b" />
      <Chip T={T} at={K.Co + 0.8} until={K.Ag - 0.2} texto="melanoidinas → el dorado" x={540} y={680} tam={40} borde={DORADO} />
      <TarjetaEstudio T={T} at={K.Ma + 0.2} until={K.Ac - 0.3} anio="1912" quien="Louis Camille Maillard" revista="químico francés · azúcar + aminoácido" x={420} y={1580} />
      <TarjetaEstudio T={T} at={K.Ac + 0.2} until={K.Ac + 3.4} anio="2002" quien="Mottram et al. · U. de Reading" revista="Nature · Inglaterra" y={700} />
      <Chip T={T} at={K.Ac + 3.6} until={K.Ri - 0.2} texto="asparagina (papa y cereales) → acrilamida" y={1500} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Ri + 0.3} until={K.Cg - 0.3} texto="probablemente cancerígena · IARC" y={1500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="no es quemado: es Maillard" y={1500} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.U - 0.1} texto="No es quemado: *es química.*" />
      <Subtitulo T={T} idx={1} at={K.U + 0.1} until={K.Ca - 0.1} texto="Azúcar + *aminoácido.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Ar - 0.1} texto="Un montón de *moléculas nuevas.*" />
      <Subtitulo T={T} idx={3} at={K.Ar + 0.1} until={K.Co - 0.1} texto="Pirazinas: *olor a tostado.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.Ag - 0.1} texto="Melanoidinas: *el dorado.*" />
      <Subtitulo T={T} idx={5} at={K.Ag + 0.1} until={K.Pr - 0.1} texto="Más calor, más rápido; *agua, más lento.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Ma - 0.1} texto="¿Quién *se dio cuenta?*" />
      <Subtitulo T={T} idx={7} at={K.Ma + 0.1} until={K.Ac - 0.1} texto="1912: *Louis Camille Maillard.*" />
      <Subtitulo T={T} idx={8} at={K.Ac + 0.1} until={K.Ri - 0.1} texto="2002: también forma *acrilamida.*" />
      <Subtitulo T={T} idx={9} at={K.Ri + 0.1} until={K.Cg - 0.1} texto="*Probablemente cancerígena.*" />
      <Subtitulo T={T} idx={10} at={K.Cg + 0.1} until={K.Ci - 0.1} texto="También en el congelador: *lentísimo.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Así huele *tu carne asada.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Union + 1.0, CUES.Union + 5.1, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Aroma + 0.2, CUES.Aroma + 3.0, 'avatar_01_riendo_lengua', 'arriba-der'],
        [CUES.Color + 1.0, CUES.Agua - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Maillard + 1.0, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Maillard + 1.2, CUES.Maillard + 6.7, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Riesgo + 0.2, CUES.Congelador - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Congelador + 0.8, CUES.Cierre - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="06" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MaillardApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Maillard /></CompositionStage></div>;
}
window.MaillardApp = MaillardApp;
