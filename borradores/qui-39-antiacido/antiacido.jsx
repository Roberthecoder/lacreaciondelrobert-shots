// Shot Químico #39 · Esa pastilla no calma tu estómago: le hace química (antiácidos y neutralización) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (la herida de St. Martin, sin nada gráfico).
const PIEL = '#f1b48f', ACIDO = '#9be15d', NEUTRO = '#7fc8ff', CELULA = '#ff8fa3', HPLUS = '#ffe11a', CLM = '#b6e33a', OHM = '#7fd8ff', OMEP = '#9b5de5';
const PAPEL = '#ead9b3';

// Estómago (forma de J) en coordenadas locales del torso.
const ESTOMAGO = 'M 10 -70 Q 12 -10 -20 40 Q -60 140 40 172 Q 170 196 205 80 Q 222 -20 140 -62 Q 80 -92 10 -70 Z';
function posPastilla(p) { // boca → esófago → charco
  if (p < 0.6) { const u = p / 0.6; return [klerp(0, 14, u), klerp(-392, -70, u)]; }
  const u = (p - 0.6) / 0.4; return [klerp(14, 72, u), klerp(-70, 112, u * u)];
}
function Pastilla({ x, y, s = 1, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <ellipse rx={30} ry={24} fill="#fbfbf7" stroke={KC.ink} strokeWidth={6} />
    <line x1={-18} y1={0} x2={18} y2={0} stroke="#b9b4a8" strokeWidth={4} strokeLinecap="round" />
  </g>;
}
function CapsulaOmep({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-60} y={-26} width={120} height={52} rx={26} fill="#f6f3ec" stroke={KC.ink} strokeWidth={6} />
    <path d="M 0 -26 L 34 -26 A 26 26 0 0 1 34 26 L 0 26 Z" fill={OMEP} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
function Chispas({ T, x, y, at, color = KC.yellow, r0 = 30, r1 = 110 }) {
  const p = kprog(T, at, at + 0.5, kEase.sale); if (p <= 0 || p >= 1) return null;
  return <g opacity={1 - p}>{Array.from({ length: 10 }, (_, i) => { const a = i / 10 * Math.PI * 2;
    return <line key={i} x1={x + Math.cos(a) * klerp(r0, r1 * 0.6, p)} y1={y + Math.sin(a) * klerp(r0, r1 * 0.6, p)} x2={x + Math.cos(a) * klerp(r0 + 20, r1, p)} y2={y + Math.sin(a) * klerp(r0 + 20, r1, p)} stroke={color} strokeWidth={9} strokeLinecap="round" />; })}</g>;
}
// Torso de frente con el esófago y el estómago "por dentro". acido: 0 = verde ácido, 1 = azul neutralizado.
function Torso({ T, x, y, s = 1, acido = 0, sube = 0, ardor = 0, pastilla = -1, golpe = -99, hoyo = 0, organos = 1, id = 'a' }) {
  const col = mixHex(ACIDO, NEUTRO, acido), ola = Math.sin(T * 4) * 6;
  const pp = pastilla >= 0 && pastilla <= 1 ? posPastilla(pastilla) : null;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -250 -270 Q -250 -320 -150 -330 L -55 -335 L -55 -300 L 55 -300 L 55 -335 L 150 -330 Q 250 -320 250 -270 L 262 420 L -262 420 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-50} y={-360} width={100} height={70} fill={PIEL} />
    <circle cx={0} cy={-440} r={112} fill={PIEL} stroke={KC.ink} strokeWidth={10} />
    <circle cx={-38} cy={-462} r={11} fill={KC.ink} /><circle cx={38} cy={-462} r={11} fill={KC.ink} />
    <path d="M -34 -398 Q 0 -372 34 -398" stroke={KC.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M -95 -560 Q -40 -600 30 -585 Q 100 -575 108 -500 Q 70 -545 0 -548 Q -60 -548 -95 -500 Z" fill="#3b2a20" />
    {organos > 0 && <g opacity={organos}>
      <circle cx={70} cy={-60} r={330} fill="rgba(13,20,36,.10)" stroke={KC.ink} strokeWidth={4} strokeDasharray="14 12" />
      <path d="M 0 -380 L 0 -330 Q 4 -200 14 -70" stroke="#e87f8f" strokeWidth={46} fill="none" strokeLinecap="round" />
      <path d="M 0 -380 L 0 -330 Q 4 -200 14 -70" stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="2 0" opacity={0.25} />
      <path d={ESTOMAGO} fill="#f39aa6" stroke={KC.ink} strokeWidth={8} />
      <clipPath id={`est${id}`}><path d={ESTOMAGO} /></clipPath>
      <path d={`M -80 ${90 + ola} Q 0 ${80 - ola} 80 ${92 + ola} T 240 ${88 - ola} L 240 220 L -80 220 Z`} fill={col} clipPath={`url(#est${id})`} />
      {sube > 0 && <path d={`M 14 -70 Q 4 ${-70 - 140 * sube} ${2} ${-70 - 270 * sube}`} stroke={ACIDO} strokeWidth={30} fill="none" strokeLinecap="round" />}
      {ardor > 0 && [-260, -200, -140].map((yy, i) => <circle key={i} cx={4} cy={yy} r={40 + Math.sin(T * 9 + i) * 10} fill="none" stroke={KC.orange} strokeWidth={10} opacity={ardor * (0.5 + 0.5 * Math.sin(T * 7 + i))} />)}
      {hoyo > 0 && <g opacity={hoyo}>
        <circle cx={150} cy={10} r={26} fill="#7a3b46" stroke={KC.ink} strokeWidth={6} />
        <path d="M 124 4 Q 150 -18 176 4" stroke={KC.ink} strokeWidth={6} fill="#e98b98" />
      </g>}
    </g>}
    {pp && <Pastilla x={pp[0]} y={pp[1]} rot={T * 200} s={0.9} />}
    <Chispas T={T} x={72} y={112} at={golpe} />
  </g>;
}
function Ion({ x, y, tipo, o = 1, s = 1 }) {
  const c = tipo === 'H' ? HPLUS : tipo === 'Cl' ? CLM : OHM, t = tipo === 'H' ? 'H⁺' : tipo === 'Cl' ? 'Cl⁻' : 'OH⁻';
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <circle r={tipo === 'H' ? 24 : 30} fill={c} stroke={KC.ink} strokeWidth={5} />
    <text y={9} textAnchor="middle" style={{ font:`700 ${tipo === 'H' ? 24 : 21}px ${KF.mono}` }} fill={KC.ink}>{t}</text>
  </g>;
}
// Célula parietal: ancho 300 px ≈ 27 µm (barra de 10 µm = 110 px). Bombas en el borde de arriba.
function Parietal({ T, x, y, w = 300, h = 240, candados = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={60} fill={CELULA} stroke={KC.ink} strokeWidth={7} />
    <circle cx={10} cy={30} r={46} fill="#b34a7e" stroke={KC.ink} strokeWidth={5} />
    <path d={`M -60 ${-h / 2 + 10} Q -40 -10 -70 30`} stroke="#d36a8a" strokeWidth={10} fill="none" />
    <path d={`M 70 ${-h / 2 + 10} Q 50 -20 80 10`} stroke="#d36a8a" strokeWidth={10} fill="none" />
    {[-90, 0, 90].map((dx, i) => <g key={i} transform={`translate(${dx} ${-h / 2})`}>
      <rect x={-22} y={-14} width={44} height={28} rx={10} fill={HPLUS} stroke={KC.ink} strokeWidth={5} />
      <path d={`M 0 8 L 0 ${-8 - Math.abs(Math.sin(T * 6 + i)) * 6}`} stroke={KC.ink} strokeWidth={5} strokeLinecap="round" />
      {candados > 0 && <g opacity={candados} transform={`translate(0 ${-40 + (1 - candados) * -30})`}>
        <path d="M -14 0 L -14 -14 A 14 14 0 0 1 14 -14 L 14 0" stroke={KC.ink} strokeWidth={6} fill="none" />
        <rect x={-20} y={-2} width={40} height={30} rx={6} fill={OMEP} stroke={KC.ink} strokeWidth={5} />
      </g>}
    </g>)}
  </g>;
}
// Iones H⁺ que salen de las bombas y Cl⁻ que llegan: se juntan como HCl. alto = cuánto suben.
function Emision({ T, x, y, desde, hasta = 1e9, alto = 300, cl = true, seed = 0 }) {
  const out = [];
  [-90, 0, 90].forEach((dx, i) => { for (let k = 0; k < 2; k++) {
    const t0 = desde + i * 0.33 + k * 0.6; if (T < t0) continue;
    const ph = ((T - t0) / 1.2) % 1, nacio = t0 + Math.floor((T - t0) / 1.2) * 1.2; if (nacio > hasta) continue;
    const px = x + dx, py = y - 14;
    if (!cl) { out.push(<Ion key={`${i}${k}`} x={px} y={py - ph * alto} tipo="H" o={1 - ph * 0.7} s={0.9} />); continue; }
    if (ph < 0.5) { const u = ph / 0.5;
      out.push(<Ion key={`h${i}${k}`} x={px} y={py - u * alto * 0.5} tipo="H" s={0.9} />);
      out.push(<Ion key={`c${i}${k}`} x={px + 46} y={py - alto + u * alto * 0.5 - 10} tipo="Cl" s={0.9} o={u} />);
    } else { const u = (ph - 0.5) / 0.5, yy = py - alto * 0.5 - u * alto * 0.4;
      out.push(<g key={`p${i}${k}`} opacity={1 - u}><Ion x={px - 4} y={yy} tipo="H" s={0.8} /><Ion x={px + 34} y={yy} tipo="Cl" s={0.8} />
        <text x={px + 15} y={yy - 40} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.texto}>HCl</text></g>);
    }
  } });
  return <g>{out}</g>;
}
function CO2Sube({ T, x, y, desde, hasta, alto = 520, w = 300, n = 10, seed = 3 }) {
  const R = krng(seed), out = [];
  for (let i = 0; i < n; i++) { const dx = (R() - 0.5) * w, t0 = desde + i * 0.22; if (T < t0 || T > hasta + 1.5) continue;
    const u = kprog(T, t0, t0 + 1.6, kEase.suave);
    out.push(<g key={i}><circle cx={x + dx * (1 - u * 0.6)} cy={y - u * alto} r={44} fill="rgba(255,255,255,.12)" stroke="#d7dde8" strokeWidth={4} />
      <Mol tipo="co2" x={x + dx * (1 - u * 0.6)} y={y - u * alto} s={0.45} rot={T * 40 + i * 30} /></g>);
  }
  return <g>{out}</g>;
}
function Frasco({ T, x, y, s = 1, rot = 0, liquido = '#e9f3d6', nivel = 0.6, carne = -1, etiqueta, children }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-38} y={-200} width={76} height={36} rx={8} fill="#a0784c" stroke={KC.ink} strokeWidth={6} />
    <path d="M -34 -166 L 34 -166 L 34 -130 Q 80 -110 80 -60 L 80 150 Q 80 170 60 170 L -60 170 Q -80 170 -80 150 L -80 -60 Q -80 -110 -34 -130 Z" fill="rgba(230,245,255,.55)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <rect x={-74} y={166 - 230 * nivel} width={148} height={230 * nivel} rx={14} fill={liquido} opacity={0.8} />
    {carne >= 0 && carne < 1 && <rect x={-36 * (1 - carne * 0.85)} y={110 - 40 * (1 - carne * 0.85)} width={72 * (1 - carne * 0.85)} height={52 * (1 - carne * 0.85)} rx={14} fill="#b5523f" stroke={KC.ink} strokeWidth={5} opacity={1 - carne * 0.5} />}
    {etiqueta}
    {children}
  </g>;
}
function Termo({ x, y, nivel = 0.6 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-16} y={-170} width={32} height={200} rx={16} fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <rect x={-7} y={20 - 180 * nivel} width={14} height={180 * nivel} fill={KC.red} />
    <circle cx={0} cy={40} r={28} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
  </g>;
}

function Antiacido() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Acido, P: CUES.Ph, Ag: CUES.Agruras, B: CUES.Base, Ga: CUES.Gas, Pr: CUES.Pregunta, O: CUES.Omeprazol, Be: CUES.Beaumont, M: CUES.Muriatico, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const caida = kprog(T, K.G, K.G + 0.85);
  const mitadB = K.B + 3.9;
  const ph = klerp(7, 1.7, kprog(T, K.P + 1.0, K.P + 2.6, kEase.sale));
  const phX = (v) => 110 + v / 14 * 860;
  const giro = kprog(T, K.M + 2.2, K.M + 2.9, kEase.suave);
  const dia = 1 + Math.floor(kprog(T, K.O + 3.6, K.O + 6.0) * 3 + 0.0001);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la pastilla cae al ácido del estómago */}
      <Escena T={T} a={K.G} b={K.A} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa><Torso T={T} x={380} y={1000} s={0.95} pastilla={caida < 1 ? caida : -1} golpe={K.G + 0.85} id="g" /></SvgCapa>
      </Escena>
      {/* 1 · las células parietales hacen el HCl (micro, fondo noche) */}
      <Escena T={T} a={K.A} b={K.P} fondo={KC.noche}>
        <SvgCapa>
          <rect x={0} y={1060} width={KW} height={260} fill="#3a1830" />
          {[230, 540, 850].map((cx, i) => <Parietal key={i} T={T} x={cx} y={1000} />)}
          {[230, 540, 850].map((cx, i) => <Emision key={i} T={T} x={cx} y={880} desde={K.A + 0.5 + i * 0.2} alto={300} />)}
          <text x={540} y={560} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill="rgba(246,243,236,.7)">interior del estómago</text>
        </SvgCapa>
        <div style={{ position:'absolute', left:80, top:1440, zIndex:40, color:KC.texto, font:`700 26px ${KF.mono}`, textShadow:KSOMBRA }}>
          <div style={{ marginBottom:8 }}>10 µm</div><div style={{ width:110, height:8, background:KC.texto, borderRadius:4 }}></div></div>
      </Escena>
      {/* 2 · pH 1.7 en ayunas (1990) */}
      <Escena T={T} a={K.P} b={K.Ag} fondo="#14301f">
        <SvgCapa>
          <path d={`M 0 ${820 + Math.sin(T * 3) * 10} Q 270 ${800 - Math.sin(T * 3) * 10} 540 ${820} T 1080 ${815} L 1080 1060 L 0 1060 Z`} fill={ACIDO} opacity={0.85} />
          <g transform={`translate(${540 + Math.sin(T * 2) * 30} ${klerp(380, 860, kprog(T, K.P, K.P + 1.2, kEase.sale)) + Math.sin(T * 3) * 6}) rotate(${-20 + Math.sin(T * 2) * 8})`}>
            <rect x={-80} y={-34} width={160} height={68} rx={34} fill="#d9dde3" stroke={KC.ink} strokeWidth={6} />
            <circle cx={40} cy={0} r={12} fill={KC.red} opacity={0.5 + 0.5 * Math.sin(T * 10)} />
            <path d="M -80 0 Q -120 -20 -140 10" stroke={KC.ink} strokeWidth={4} fill="none" />
          </g>
          <defs><linearGradient id="phg" x1="0" x2="1"><stop offset="0" stopColor="#ff3b2f" /><stop offset=".25" stopColor="#ff8a1f" /><stop offset=".45" stopColor="#ffe11a" /><stop offset=".55" stopColor="#2fe0a8" /><stop offset=".8" stopColor="#2346ff" /><stop offset="1" stopColor="#7a2bd6" /></linearGradient></defs>
          <rect x={110} y={1110} width={860} height={44} rx={22} fill="url(#phg)" stroke={KC.ink} strokeWidth={6} />
          {[0, 7, 14].map((v) => <text key={v} x={phX(v)} y={1196} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>{v}</text>)}
          <path d={`M ${phX(ph)} 1104 l -22 -40 l 44 0 Z`} fill={KC.white} stroke={KC.ink} strokeWidth={5} />
        </SvgCapa>
        <NumeroGigante T={T} at={K.P + 1.0} until={K.Ag - 0.2} valor={1.7} desde={7} dur={1.6} dec={1} prefijo="pH " x={540} y={540} tam={230} color={KC.yellow} />
      </Escena>
      {/* 3 · agruras: el ácido sube por el esófago */}
      <Escena T={T} a={K.Ag} b={K.B} fondo={KC.pink}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Torso T={T} x={380} y={1000} s={0.95} sube={kprog(T, K.Ag + 0.3, K.Ag + 1.4, kEase.sale)} ardor={kprog(T, K.Ag + 1.0, K.Ag + 1.6)} id="r" /></SvgCapa>
        <Etq T={T} at={K.Ag + 1.2} until={K.B - 0.2} x={420} y={760} texto="esófago" tam={34} color={KC.ink} />
      </Escena>
      {/* 4 · las bases del antiácido y la neutralización */}
      <Escena T={T} a={K.B} b={K.Ga} fondo={KC.noche}>
        <SvgCapa>
          {T < mitadB ? <g opacity={1 - kprog(T, mitadB - 0.3, mitadB)}>
            <Pastilla x={540} y={600} s={2.6 * (1 - kprog(T, K.B + 0.4, K.B + 0.8)) + 0.01} rot={Math.sin(T * 3) * 10} />
            {[['CaCO₃', 'carbonato de calcio', 190, KC.paper], ['Mg(OH)₂', 'hidróxido de magnesio', 540, OHM], ['NaHCO₃', 'bicarbonato', 890, KC.mint]].map(([f, n, cx, c], i) => {
              const e = kprog(T, K.B + 0.6 + i * 1.1, K.B + 1.0 + i * 1.1, kEase.rebote);
              return <g key={i} transform={`translate(${cx} ${klerp(600, 900, kprog(T, K.B + 0.6 + i * 1.1, K.B + 1.0 + i * 1.1, kEase.sale))}) scale(${e})`}>
                <rect x={-160} y={-110} width={320} height={220} rx={30} fill={c} stroke={KC.ink} strokeWidth={8} />
                <text y={10} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.ink}>{f}</text>
                <text y={72} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>{n}</text>
              </g>; })}
          </g> : <g>
            {[0, 1, 2, 3].map((i) => { const t0 = mitadB + 0.2 + i * 0.45, u = kprog(T, t0, t0 + 0.8, kEase.suave), yy = 760 + i * 120;
              return <g key={i}>
                {u < 1 && <Ion x={klerp(150, 500, u)} y={yy} tipo="H" />}
                {u < 1 && <Ion x={klerp(930, 580, u)} y={yy} tipo="OH" />}
                {u >= 1 && <Mol tipo="agua" x={540} y={yy} s={0.75} rot={Math.sin(T * 2 + i) * 15} />}
                <Chispas T={T} x={540} y={yy} at={t0 + 0.8} color={OHM} r0={20} r1={70} />
              </g>; })}
            <g transform={`translate(${840} ${1010}) scale(${kprog(T, mitadB + 1.6, mitadB + 2.0, kEase.rebote)})`}>
              <rect x={-60} y={-60} width={120} height={120} rx={10} fill="#f4f4f4" stroke={KC.ink} strokeWidth={7} transform="rotate(12)" />
              <text y={110} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>sal</text>
            </g>
            <text x={540} y={640} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.texto} opacity={kprog(T, mitadB, mitadB + 0.4)}>ÁCIDO + BASE</text>
          </g>}
        </SvgCapa>
      </Escena>
      {/* 5 · con carbonatos sale CO₂: ¡burp! */}
      <Escena T={T} a={K.Ga} b={K.Pr} fondo={KC.noche}>
        <SvgCapa>
          <path d={`M 0 ${1060 + Math.sin(T * 3) * 8} Q 270 ${1040} 540 ${1060} T 1080 ${1055} L 1080 1240 L 0 1240 Z`} fill={ACIDO} opacity={0.8} />
          <g transform={`translate(640 1080) scale(${1 - kprog(T, K.Ga + 0.3, K.Pr, kEase.suave) * 0.5})`}>
            <rect x={-70} y={-50} width={140} height={100} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
            <text y={14} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>CaCO₃</text>
          </g>
          <CO2Sube T={T} x={640} y={1000} desde={K.Ga + 0.3} hasta={K.Pr} alto={430} w={320} n={12} />
          <Onomato T={T} at={K.Ga + 2.4} until={K.Pr + 0.3} x={760} y={540} texto="¡BURP!" color={KC.mint} tam={120} rot={-10} />
        </SvgCapa>
      </Escena>
      {/* 6 · pregunta: ¿y el omeprazol? */}
      <Escena T={T} a={K.Pr} b={K.O} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <text x={280} y={1030} textAnchor="middle" style={{ font:`400 470px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 280 850)`}>?</text>
          <Pastilla x={130} y={1130} s={2.1} rot={Math.sin(T * 2) * 10} />
          <CapsulaOmep x={410} y={1130} s={1.6} rot={-20 + Math.sin(T * 2.4) * 10} />
        </SvgCapa>
      </Escena>
      {/* 7 · antiácido vs. omeprazol */}
      <Escena T={T} a={K.O} b={K.Be} fondo={KC.noche}>
        <SvgCapa>
          <line x1={540} y1={780} x2={540} y2={1220} stroke="rgba(246,243,236,.35)" strokeWidth={4} strokeDasharray="12 12" />
          <text x={280} y={830} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.texto}>ANTIÁCIDO</text>
          <text x={800} y={830} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={OMEP}>OMEPRAZOL</text>
          <rect x={70} y={1060} width={420} height={150} rx={30} fill={mixHex(ACIDO, NEUTRO, kprog(T, K.O + 1.0, K.O + 3.0))} stroke={KC.ink} strokeWidth={6} />
          <Pastilla x={280} y={klerp(880, 1100, kprog(T, K.O + 0.3, K.O + 1.0, kEase.sale))} s={1.3} rot={T * 60} />
          {[0, 1, 2, 3].map((i) => { const u = kprog(T, K.O + 1.0 + i * 0.3, K.O + 1.6 + i * 0.3);
            return u < 1 ? <Ion key={i} x={120 + i * 100} y={1000} tipo="H" o={1 - u} s={1 - u * 0.4} /> : <Mol key={i} tipo="agua" x={120 + i * 100} y={1000} s={0.5} rot={T * 30} />; })}
          <Parietal T={T} x={800} y={1100} candados={kprog(T, K.O + 2.0, K.O + 2.6, kEase.rebote)} />
          <Emision T={T} x={800} y={980} desde={K.O + 0.2} hasta={K.O + 2.4} alto={110} cl={false} />
        </SvgCapa>
      </Escena>
      {/* 8 · 1822: Beaumont y St. Martin (esquemático, nada gráfico) */}
      <Escena T={T} a={K.Be} b={K.M} fondo={PAPEL}>
        <FondoLunares color={PAPEL} punto="rgba(255,255,255,.4)" />
        <SvgCapa>
          <Chispas T={T} x={880} y={420} at={K.Be + 0.8} color={KC.orange} r0={20} r1={120} />
          <Onomato T={T} at={K.Be + 0.8} until={K.Be + 2.2} x={880} y={450} texto="¡PUM!" color={KC.orange} tam={90} rot={8} />
          <g opacity={kprog(T, K.Be + 2.4, K.Be + 3.0)}>
            <Torso T={T} x={400} y={1040} s={0.72} hoyo={kprog(T, K.Be + 2.8, K.Be + 3.4)} id="b" />
          </g>
          {T > K.Be + 5.0 && <g>
            <path d={`M ${400 + 150 * 0.72} ${1040 + 10 * 0.72} Q 640 ${900} ${800} ${880}`} stroke="#c9d4b0" strokeWidth={14} fill="none" strokeLinecap="round"
              strokeDasharray="600" strokeDashoffset={600 * (1 - kprog(T, K.Be + 5.0, K.Be + 5.8))} />
            <Goteo T={T} x={800} y0={890} y1={1020} cada={0.35} color="#e9f3d6" desde={K.Be + 5.8} hasta={K.Be + 7.2} />
          </g>}
          {T > K.Be + 4.6 && <Frasco T={T} x={830} y={1060} s={0.95} rot={T > K.Be + 7 ? Math.sin(T * 5) * 6 : 0} nivel={klerp(0.15, 0.55, kprog(T, K.Be + 5.8, K.Be + 7.2))} carne={kprog(T, K.Be + 7.2, K.M - 0.3)} />}
          {T > K.Be + 6.8 && <g><Termo x={990} y={1040} nivel={0.62} />
            <text x={990} y={1130} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill={KC.ink}>≈ 38 °C</text></g>}
        </SvgCapa>
        <Etq T={T} at={K.Be + 3.2} until={K.Be + 6.6} x={520} y={1080} texto="abertura al estómago" tam={30} color={KC.ink} />
      </Escena>
      {/* 9 · ácido muriático = clorhídrico */}
      <Escena T={T} a={K.M} b={K.Ci} fondo={PAPEL} zoom={0.04}>
        <FondoLunares color={PAPEL} punto="rgba(255,255,255,.4)" />
        <SvgCapa>
          <Frasco T={T} x={470} y={960} s={1.7} rot={Math.sin(T * 1.5) * 3} nivel={0.55} etiqueta={
            <g transform={`scale(${Math.abs(Math.cos(Math.PI * giro)) + 0.02} 1)`}>
              <rect x={-70} y={-60} width={140} height={110} rx={6} fill={giro < 0.5 ? '#f3e2b8' : KC.white} stroke={KC.ink} strokeWidth={4} />
              {giro < 0.5 ? <g><text y={-18} textAnchor="middle" style={{ font:`italic 700 19px Georgia, serif` }} fill="#5a3a1a">Muriatic</text>
                <text y={8} textAnchor="middle" style={{ font:`italic 700 19px Georgia, serif` }} fill="#5a3a1a">acid</text>
                <text y={36} textAnchor="middle" style={{ font:`700 18px Georgia, serif` }} fill="#5a3a1a">1833</text></g>
                : <g><text y={-6} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>HCl</text>
                <text y={30} textAnchor="middle" style={{ font:`700 13px ${KF.mono}` }} fill={KC.ink}>ác. clorhídrico</text></g>}
            </g>} />
        </SvgCapa>
      </Escena>
      {/* 10 · cierre: la misma pastilla y el mismo estómago, ahora neutralizado */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Torso T={T} x={380} y={1000} s={0.95} acido={kprog(T, K.Ci + 1.0, K.Ci + 3.0, kEase.suave)} pastilla={kprog(T, K.Ci + 0.1, K.Ci + 0.95) < 1 ? kprog(T, K.Ci + 0.1, K.Ci + 0.95) : -1} golpe={K.Ci + 0.95} id="c" />
          <CO2Sube T={T} x={380 + 72 * 0.95} y={1000 + 100 * 0.95} desde={K.Ci + 1.1} hasta={K.Ci + 2.6} alto={160} w={120} n={6} seed={9} />
        </SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.8} until={K.G + 3.0} texto="¿calma tu estómago?" x={330} y={400} tam={42} />
      <Chip T={T} at={K.G + 3.1} until={K.A - 0.3} texto="base + ácido" x={300} y={400} tam={50} borde={NEUTRO} />
      <Etq T={T} at={K.G + 1.2} until={K.A - 0.3} x={600} y={1180} texto="ácido del estómago" tam={30} color={KC.ink} lado="der" />
      <Chip T={T} at={K.A + 0.4} until={K.P - 0.3} texto="H⁺ + Cl⁻ → HCl" x={540} y={1560} tam={46} borde={HPLUS} mono />
      <Etq T={T} at={K.A + 1.2} until={K.P - 0.3} x={1000} y={1180} texto="células parietales" lado="izq" tam={32} color={CELULA} />
      <Chip T={T} at={K.P + 1.4} until={K.Ag - 0.3} texto="1990 · mediana en ayunas" x={540} y={1500} tam={40} borde={ACIDO} />
      <Chip T={T} at={K.Ag + 1.0} until={K.B - 0.3} texto="ácido en el esófago = agruras" x={540} y={1500} tam={40} borde={KC.orange} />
      <Chip T={T} at={mitadB + 0.2} until={K.Ga - 0.3} texto="ácido + base → sal + agua" x={540} y={1500} tam={46} borde={OHM} />
      <Chip T={T} at={K.Ga + 0.6} until={K.Pr - 0.3} texto="CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂" x={540} y={1500} tam={30} borde={KC.mint} mono />
      <Etq T={T} at={K.O + 1.2} until={K.Be - 0.3} x={70} y={1265} texto="neutraliza el que ya hay" tam={26} color={KC.texto} />
      <Etq T={T} at={K.O + 2.4} until={K.Be - 0.3} x={1040} y={1265} texto="frena las bombas" lado="izq" tam={26} color={OMEP} />
      <Chip T={T} at={K.O + 3.6} until={K.Be - 0.3} texto={`omeprazol: día ${dia} de 4`} x={540} y={1500} tam={40} borde={OMEP} />
      <TarjetaEstudio T={T} at={K.Be + 0.2} until={K.Be + 3.4} anio="1822" quien="Beaumont y St. Martin" revista="Isla Mackinac, Michigan" x={540} y={680} />
      <Chip T={T} at={K.Be + 7.2} until={K.M - 0.3} texto="jugo gástrico: digiere fuera del cuerpo" x={540} y={1500} tam={34} borde={KC.gold} />
      <Chip T={T} at={K.M + 0.4} until={K.Ci - 0.3} texto="1833 · profesores de Virginia" x={540} y={1500} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.Ci + 1.2} until={K.Ci + 3.4} texto="base + ácido → sal + agua (+ CO₂)" x={540} y={1500} tam={34} borde={NEUTRO} />
      <Chip T={T} at={K.Ci + 3.6} until={K.Ou} texto="¿agruras frecuentes? → al médico" x={540} y={1500} tam={36} borde={KC.red} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="No calma: *base contra ácido.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.P - 0.1} texto="Tu estómago hace *ácido clorhídrico.*" />
      <Subtitulo T={T} idx={2} at={K.P + 0.1} until={K.Ag - 0.1} texto="En ayunas: *pH 1.7.*" />
      <Subtitulo T={T} idx={3} at={K.Ag + 0.1} until={K.B - 0.1} texto="Sube y arde: *agruras.*" />
      <Subtitulo T={T} idx={4} at={K.B + 0.1} until={K.Ga - 0.1} texto="Ácido + base = *sal y agua.*" />
      <Subtitulo T={T} idx={5} at={K.Ga + 0.1} until={K.Pr - 0.1} texto="Carbonatos: *gas CO₂.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.O - 0.1} texto="¿Y el *omeprazol?*" />
      <Subtitulo T={T} idx={7} at={K.O + 0.1} until={K.Be - 0.1} texto="Frena *las bombas.*" />
      <Subtitulo T={T} idx={8} at={K.Be + 0.1} until={K.M - 0.1} texto="1822: *un hoyo al estómago.*" />
      <Subtitulo T={T} idx={9} at={K.M + 0.1} until={K.Ci - 0.1} texto="Muriático = *clorhídrico.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Le hace *química.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Acido + 1.0, CUES.Ph - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Agruras + 0.2, CUES.Base - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Gas + 0.3, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Omeprazol + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Omeprazol + 1.5, CUES.Beaumont - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Beaumont + 3.5, CUES.Muriatico - 0.4, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Muriatico + 0.3, CUES.Cierre - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="39" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AntiacidoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Antiacido /></CompositionStage></div>;
}
window.AntiacidoApp = AntiacidoApp;
