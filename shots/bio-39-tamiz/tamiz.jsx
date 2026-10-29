// Shot Biotecnológico #39 · La prueba del talón (tamiz neonatal, fenilcetonuria y la prueba de Guthrie) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const SANGRE = '#c3132b', SECA = '#7d1420', PIEL = '#f6c3a0', PIEL2 = '#e7a37e', PHE = KC.gold2, ENZ = '#9b5de5', FRENO = '#b18cff';

// Capa SVG de pantalla completa.
function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}

// Mancha de sangre irregular dentro de un círculo de radio r. f = 0..1 cuánto se ha extendido. seca = 0..1 color.
function Mancha({ x, y, r, f = 1, seca = 0, seed = 1 }) {
  if (f <= 0) return null;
  const R = krng(seed), n = 18, rr = r * kclamp(f, 0, 1);
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, d = rr * (0.86 + R() * 0.18); return `${(x + Math.cos(a) * d).toFixed(1)},${(y + Math.sin(a) * d).toFixed(1)}`; });
  return <g>
    <polygon points={pts.join(' ')} fill={mixHex(SANGRE, SECA, seca)} stroke={mixHex('#8a0e1e', '#4d0a12', seca)} strokeWidth={3} strokeLinejoin="round" />
    <circle cx={x - rr * 0.3} cy={y - rr * 0.3} r={rr * 0.22} fill="#fff" opacity={0.25 * (1 - seca)} />
  </g>;
}

// Tarjeta de papel filtro (tarjeta de Guthrie): arriba los datos, abajo el papel con 5 círculos.
// llenas: [f0..f4] (0..1), seca 0..1, checks 0..1 (palomitas del final, por círculo con retraso).
function TarjetaFiltro({ x, y, s = 1, rot = 0, llenas = [0, 0, 0, 0, 0], seca = 0, checks = 0, falta = -1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-372} y={-182} width={760} height={380} rx={20} fill="rgba(0,0,0,.25)" transform="translate(14 16)" />
    <rect x={-380} y={-190} width={760} height={380} rx={20} fill="#fbf7ee" stroke={KC.ink} strokeWidth={8} />
    <rect x={-380} y={-190} width={760} height={150} rx={20} fill="#ffe9a8" stroke={KC.ink} strokeWidth={8} />
    <rect x={-376} y={-60} width={752} height={20} fill="#ffe9a8" />
    {[[-340, -150, 300], [-340, -112, 420], [-340, -74, 250], [120, -150, 220], [120, -112, 160]].map(([lx, ly, w], i) =>
      <rect key={i} x={lx} y={ly} width={w} height={12} rx={6} fill="rgba(22,18,15,.28)" />)}
    <text x={250} y={-66} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill="rgba(22,18,15,.55)">TAMIZ NEONATAL</text>
    <path d="M -380 -40 L 380 -40" stroke={KC.ink} strokeWidth={5} strokeDasharray="14 10" />
    {[0, 1, 2, 3, 4].map((i) => { const cx = -280 + i * 140, cy = 70;
      return <g key={i}>
        <circle cx={cx} cy={cy} r={56} fill="none" stroke="rgba(22,18,15,.45)" strokeWidth={4} strokeDasharray="8 7" />
        <Mancha x={cx} y={cy} r={54} f={llenas[i]} seca={seca} seed={i + 3} />
        {i === falta && <circle cx={cx} cy={cy} r={22} fill="#fbf7ee" stroke={KC.ink} strokeWidth={4} />}
        {checks > 0 && (() => { const c = kclamp(checks * 5 - i, 0, 1); return c > 0 ? <path d={`M ${cx - 26} ${cy + 2} l 18 20 l 36 -42`} stroke={KC.mint} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="120" strokeDashoffset={120 * (1 - c)} /> : null; })()}
      </g>; })}
  </g>;
}

// Gota que cae de (x, y0) a (x, y1) entre t0 y t1.
function GotaCae({ T, x, y0, y1, t0, t1, r = 22 }) {
  if (T < t0 || T > t1) return null;
  const p = kprog(T, t0, t1, (q) => q * q), y = klerp(y0, y1, p);
  return <path d={`M ${x} ${y - r * 1.8} Q ${x + r} ${y - r * 0.2} ${x} ${y + r} Q ${x - r} ${y - r * 0.2} ${x} ${y - r * 1.8} Z`} fill={SANGRE} stroke="#8a0e1e" strokeWidth={4} />;
}

// Pie de bebé visto de lado: pierna arriba, talón redondo abajo a la izquierda, dedos a la derecha.
function PieBebe({ x, y, s = 1, T = 0, piquete = 0 }) {
  const m = mece(T, 3, 0.5) * 3;
  return <g transform={`translate(${x} ${y + m}) scale(${s})`}>
    <path d="M -60 -520 L 70 -520 L 80 -160 Q 110 -60 230 -40 Q 360 -20 400 30 Q 420 80 360 100 L -20 110 Q -120 110 -130 20 Q -130 -60 -80 -150 Z" fill={PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {[[-40, -330], [-30, -250]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} q 50 -14 100 0`} stroke={PIEL2} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <path d="M 20 -120 q 30 40 80 50" stroke={PIEL2} strokeWidth={7} fill="none" strokeLinecap="round" />
    {[[372, 40, 30], [338, 88, 22], [300, 100, 20], [262, 104, 18], [226, 106, 16]].map(([a, b, r], i) =>
      <ellipse key={i} cx={a} cy={b} rx={r} ry={r * 0.85} fill={PIEL} stroke={KC.ink} strokeWidth={6} />)}
    <ellipse cx={-70} cy={30} rx={40} ry={26} fill="#f9d6bf" opacity={0.8} />
    {piquete > 0 && <g opacity={piquete}><circle cx={-118} cy={60} r={8} fill="#8a0e1e" /></g>}
  </g>;
}

// Lanceta (el piquetito).
function Lanceta({ x, y, rot = -30 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={0} y={-26} width={180} height={52} rx={20} fill={KC.cyan} stroke={KC.ink} strokeWidth={7} />
    <rect x={40} y={-10} width={90} height={20} rx={10} fill="#fff" opacity={0.6} />
    <path d="M 0 -8 L -34 0 L 0 8 Z" fill="#cfd6df" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Fenilalanina (Phe): anillo + cola. Usa Molecula del kit.
function Phe({ x, y, s = 0.6, rot = 0, o = 1, brillo = 0 }) {
  return <g opacity={o}><Molecula x={x} y={y} s={s} rot={rot} color={PHE} anillos={1} cola={1} brillo={brillo} /></g>;
}

// Enzima (fenilalanina hidroxilasa), a medio gas: atenuada y parpadeando (en la PKU funciona poco o nada).
function Enzima({ x, y, s = 1, T = 0, gas = 0.3 }) {
  const boca = 18 + Math.abs(Math.sin(T * 3)) * 18 * gas, a = boca * Math.PI / 180;
  const titila = 0.45 + 0.25 * Math.max(0, Math.sin(T * 7) * Math.sin(T * 2.3));
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={titila + 0.15}>
    <path d={`M 0 0 L ${Math.cos(a) * 90} ${-Math.sin(a) * 90} A 90 90 0 1 0 ${Math.cos(a) * 90} ${Math.sin(a) * 90} Z`} fill={mixHex(ENZ, '#6b6f7a', 0.55)} stroke={KC.ink} strokeWidth={7} />
    <circle cx={-10} cy={-44} r={12} fill="#fff" /><circle cx={-6} cy={-44} r={6} fill={KC.ink} />
    <path d="M -46 -66 q 18 -14 38 -6" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}

// Cerebro esquemático visto de lado. alerta 0..1 (rojo que late), sano 0..1 (brillo verde).
function Cerebro({ x, y, s = 1, T = 0, alerta = 0, sano = 0 }) {
  const col = mixHex(mixHex('#ffb3c7', '#ff5a6e', alerta * (0.6 + 0.4 * Math.sin(T * 8))), '#9ff0c8', sano);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {sano > 0 && <circle r={190} fill={KC.mint} opacity={0.25 * sano} />}
    {alerta > 0 && <circle r={170 + 14 * Math.sin(T * 8)} fill="none" stroke={KC.red} strokeWidth={10} opacity={0.7 * alerta} />}
    <path d="M -150 20 Q -170 -80 -90 -120 Q -40 -170 30 -140 Q 110 -160 150 -90 Q 190 -30 150 40 Q 130 100 60 100 Q 30 140 -20 110 Q -90 120 -120 80 Q -150 60 -150 20 Z" fill={col} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />
    {['M -110 -20 q 40 -40 80 -10', 'M -40 -100 q 20 40 70 30', 'M 40 -60 q 50 0 70 50', 'M -80 50 q 50 -30 100 10', 'M 30 40 q 30 20 70 0'].map((d, i) =>
      <path key={i} d={d} stroke={mixHex(col, KC.ink, 0.45)} strokeWidth={7} fill="none" strokeLinecap="round" />)}
    <path d="M 40 100 q 10 50 -10 80" stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
  </g>;
}

// Sacabocado (perforadora) que baja.
function Sacabocado({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-50} y={-260} width={100} height={170} rx={18} fill={KC.orange} stroke={KC.ink} strokeWidth={8} />
    <rect x={-22} y={-92} width={44} height={70} fill="#cfd6df" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={-22} rx={22} ry={8} fill="#9aa3b5" stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Espectrómetro de masas (esquemático): caja con ranura, tubo y pantalla de picos.
function Espectrometro({ x, y, T = 0, picos = 0, alto = -1 }) {
  const ps = [0.25, 0.6, 0.35, 0.9, 0.45, 0.3, 0.75, 0.5, 0.2, 0.65, 0.4];
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-300} y={-240} width={600} height={480} rx={34} fill="#e9eef5" stroke={KC.ink} strokeWidth={9} />
    <rect x={-300} y={150} width={600} height={90} rx={0} fill="#c9d3e0" stroke={KC.ink} strokeWidth={9} />
    <rect x={-250} y={-200} width={500} height={250} rx={18} fill={KC.noche} stroke={KC.ink} strokeWidth={7} />
    <path d="M -220 20 L 220 20" stroke="#5f7aa0" strokeWidth={4} />
    {ps.map((h, i) => { const k = kclamp(picos * ps.length - i, 0, 1), px = -200 + i * 40, H = 190 * h * k, alerta = i === alto;
      return <g key={i}><rect x={px - 9} y={20 - H} width={18} height={H} rx={6} fill={alerta ? KC.red : KC.mint} />
        {alerta && k >= 1 && <circle cx={px} cy={6 - H - 10} r={12 + 3 * Math.sin(T * 9)} fill={KC.red} />}</g>; })}
    <rect x={-120} y={90} width={240} height={30} rx={15} fill={KC.ink} />
    {[[-230, 195], [-180, 195], [-130, 195]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={14} fill={[KC.mint, KC.yellow, KC.pink][i]} stroke={KC.ink} strokeWidth={4} opacity={0.5 + 0.5 * Math.max(0, Math.sin(T * 4 + i))} />)}
    <text x={110} y={208} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>MS/MS</text>
  </g>;
}

// Biberón de fórmula especial.
function Biberon({ x, y, s = 1, rot = 0, nivel = 0.7 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -24 -300 Q 0 -350 24 -300 L 34 -240 L -34 -240 Z" fill="#f2c27a" stroke={KC.ink} strokeWidth={7} />
    <rect x={-70} y={-245} width={140} height={46} rx={14} fill={KC.pink} stroke={KC.ink} strokeWidth={7} />
    <rect x={-90} y={-200} width={180} height={380} rx={40} fill="rgba(255,255,255,.75)" stroke={KC.ink} strokeWidth={8} />
    <rect x={-84} y={180 - 370 * nivel} width={168} height={370 * nivel - 6} rx={34} fill="#fff6e0" />
    {[-120, -60, 0, 60, 120].map((yy, i) => <path key={i} d={`M 50 ${yy} l 30 0`} stroke={KC.ink} strokeWidth={5} />)}
    <rect x={-64} y={-40} width={128} height={90} rx={14} fill={KC.mint} stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={18} textAnchor="middle" style={{ font:`400 40px ${KF.titulo}` }} fill={KC.ink}>sin Phe</text>
  </g>;
}

// Lata de refresco que gira (gira = 0..1 muestra la leyenda).
function Lata({ x, y, s = 1, T = 0, gira = 1 }) {
  const sx = 0.35 + 0.65 * Math.abs(Math.cos((1 - gira) * Math.PI * 0.5));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`scale(${sx} 1)`}>
      <rect x={-150} y={-280} width={300} height={560} rx={40} fill="#e9eef5" stroke={KC.ink} strokeWidth={9} />
      <rect x={-150} y={-200} width={300} height={400} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
      <ellipse cx={0} cy={-280} rx={150} ry={34} fill="#cfd6df" stroke={KC.ink} strokeWidth={8} />
      <ellipse cx={30} cy={-284} rx={40} ry={12} fill="#9aa3b5" stroke={KC.ink} strokeWidth={4} />
      <text x={0} y={-110} textAnchor="middle" style={{ font:`400 92px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4}>LIGHT</text>
      <rect x={-130} y={-20} width={260} height={170} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} opacity={gira} />
      <g opacity={gira}>
        <text x={0} y={30} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>contiene aspartame</text>
        <text x={0} y={80} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>FENILCETONÚRICOS:</text>
        <text x={0} y={118} textAnchor="middle" style={{ font:`900 22px ${KF.texto}` }} fill={KC.ink}>CONTIENE FENILALANINA</text>
      </g>
      <rect x={-118} y={-260} width={30} height={500} rx={15} fill="#fff" opacity={0.3} />
    </g>
  </g>;
}

// Interior de la Lupa: sangre seca sobre las fibras del papel (glóbulos rojos y Phe).
function InteriorPapel(T, r, muchaPhe = 1) {
  const R = krng(11), fibras = Array.from({ length: 26 }, () => [R() * 2 * r, R() * 2 * r, R() * 180, 80 + R() * 200]);
  const glob = Array.from({ length: 14 }, () => [R() * 2 * r, R() * 2 * r, R() * 180]);
  const phe = Array.from({ length: 9 }, () => [R() * 2 * r, R() * 2 * r, R() * 6]);
  return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={2 * r} height={2 * r} fill="#3a0d14" />
    {fibras.map(([a, b, rot, l], i) => <line key={i} x1={a} y1={b} x2={a + Math.cos(rot) * l} y2={b + Math.sin(rot) * l} stroke="rgba(255,240,220,.28)" strokeWidth={6} strokeLinecap="round" />)}
    {glob.map(([a, b, rot], i) => <g key={i} transform={`translate(${a} ${b}) rotate(${rot})`}><ellipse rx={34} ry={24} fill={SECA} stroke="#2a0509" strokeWidth={4} /><ellipse rx={16} ry={10} fill="#5a0d17" /></g>)}
    {phe.slice(0, Math.round(phe.length * muchaPhe)).map(([a, b, p], i) => <Phe key={i} x={a} y={b + Math.sin(T * 2 + p) * 4} s={0.42} rot={T * 20 + p * 40} brillo={0.6 + 0.4 * Math.sin(T * 4 + p)} />)}
  </svg>;
}

// Interior de la Lupa del halo: la Phe gana al freno y la bacteria se divide.
function InteriorHalo(T, r, t0) {
  const R = krng(21), n = Math.min(14, 2 + Math.floor(Math.max(0, T - t0) * 5));
  const bs = Array.from({ length: 14 }, () => [40 + R() * (2 * r - 80), 40 + R() * (2 * r - 80), R() * 180]);
  const fr = Array.from({ length: 10 }, () => [R() * 2 * r, R() * 2 * r]);
  const ph = Array.from({ length: 10 }, () => [R() * 2 * r, R() * 2 * r, R() * 6]);
  return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={2 * r} height={2 * r} fill="#0f1a12" />
    {fr.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={9} fill={FRENO} opacity={0.5} />)}
    {ph.map(([a, b, p], i) => <Phe key={i} x={a + Math.sin(T + p) * 6} y={b} s={0.36} rot={T * 30 + p * 50} />)}
    {bs.slice(0, n).map(([a, b, rot], i) => <Bacteria key={i} T={T} x={a} y={b} largo={110} ancho={40} rot={rot} color="#bfe8a0" flagelo={false} seed={i + 2} />)}
  </svg>;
}

function Tamiz() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ta: CUES.Talon, Bu: CUES.Busca, En: CUES.Enzima, Pr: CUES.Pregunta, Gu: CUES.Guthrie, Ag: CUES.Agar, Ha: CUES.Halo, Ho: CUES.Hoy, Di: CUES.Dieta, Re: CUES.Refresco, Mx: CUES.Mexico, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: 5 gotas caen una tras otra sobre la tarjeta
  const gG = [0, 1, 2, 3, 4].map((i) => K.G + 0.05 + i * 0.85);
  const llenasG = gG.map((t) => kprog(T, t + 0.3, t + 0.9, kEase.sale));
  // talón
  const lan = kprog(T, K.Ta + 0.4, K.Ta + 1.0, kEase.sale), lanSale = kprog(T, K.Ta + 1.2, K.Ta + 1.7, kEase.suave);
  const gotaTalon = kprog(T, K.Ta + 1.2, K.Ta + 2.0, kEase.sale) * (1 - kprog(T, K.Ta + 3.1, K.Ta + 3.3));
  const llega = kprog(T, K.Ta + 1.9, K.Ta + 2.8, kEase.sale);
  const llenasT = [kprog(T, K.Ta + 3.3, K.Ta + 3.8), kprog(T, K.Ta + 3.9, K.Ta + 4.4), kprog(T, K.Ta + 4.4, K.Ta + 4.9), 0, 0];
  // enzima: Phe que sale de la proteína y se acumula en el vaso
  const R = krng(7), pheEn = Array.from({ length: 22 }, (_, i) => ({ t0: K.En + 0.4 + i * 0.2, yy: 1040 + (R() - 0.5) * 120, xx: 140 + R() * 820, rot: R() * 360 }));
  // agar y halo
  const discos = [[-170, -110], [40, -170], [190, -20], [-60, 40], [-200, 130], [110, 170]];
  const PKU = 3;
  const halo = kprog(T, K.Ha + 0.5, K.Ha + 3.2, kEase.suave);
  const PLX = 470, PLY = 880;
  // México: hospitales
  const ciudades = [[-99.13, 19.43], [-103.35, 20.67], [-100.31, 25.69], [-89.62, 20.97], [-117.03, 32.51], [-96.72, 17.06], [-106.08, 28.63], [-110.96, 29.07],
    [-96.13, 19.17], [-93.12, 16.75], [-107.39, 24.8], [-100.98, 22.15], [-86.85, 21.16], [-110.31, 24.14], [-98.2, 19.04], [-101.68, 21.12], [-103.41, 25.54], [-99.88, 16.85]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: las gotas caen sobre la tarjeta */}
      <Escena T={T} a={K.G} b={K.Ta} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          {gG.map((t, i) => <GotaCae key={i} T={T} x={540 + (-280 + i * 140) * 1.15} y0={420} y1={900 + 70 * 1.15} t0={t} t1={t + 0.32} />)}
          <TarjetaFiltro x={540} y={900} s={1.15} rot={-2} llenas={llenasG} />
        </SvgCapa>
      </Escena>
      {/* 1 · el piquete en el talón */}
      <Escena T={T} a={K.Ta} b={K.Bu} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <PieBebe x={320} y={760} s={1} T={T} piquete={kprog(T, K.Ta + 1.0, K.Ta + 1.2)} />
          {lan > 0 && lanSale < 1 && <g opacity={1 - lanSale}><Lanceta x={klerp(-40, 168, lan)} y={klerp(990, 835, lan)} rot={-40} /></g>}
          {gotaTalon > 0 && <circle cx={202} cy={830 + 22 * gotaTalon} r={8 + 20 * gotaTalon} fill={SANGRE} stroke="#8a0e1e" strokeWidth={4} />}
          <GotaCae T={T} x={202} y0={850} y1={1060} t0={K.Ta + 3.0} t1={K.Ta + 3.35} />
          <TarjetaFiltro x={klerp(1500, 412, llega)} y={1000} s={0.75} rot={0} llenas={llenasT} />
        </SvgCapa>
      </Escena>
      {/* 2 · la tarjeta llega al laboratorio */}
      <Escena T={T} a={K.Bu} b={K.En} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <TarjetaFiltro x={540} y={560} s={1} rot={2} llenas={[1, 1, 1, 0, 0]} seca={kprog(T, K.Bu, K.Bu + 1.5)} />
        </SvgCapa>
      </Escena>
      {/* 3 · por dentro: la enzima a medio gas y la Phe que se acumula */}
      <Escena T={T} a={K.En} b={K.Pr} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <rect x={-20} y={960} width={KW + 40} height={170} rx={60} fill="#5a0d17" stroke="#ff8fa3" strokeWidth={6} opacity={0.9} />
          {[[120, 1000], [380, 1080], [640, 990], [900, 1070]].map(([a, b], i) => <g key={i} transform={`translate(${(a + T * 40) % 1180 - 50} ${b}) rotate(${i * 30})`}><ellipse rx={44} ry={28} fill={SANGRE} stroke={KC.ink} strokeWidth={5} /><ellipse rx={20} ry={11} fill="#8a0e1e" /></g>)}
          {/* proteína: cadena de cuentas que se suelta */}
          {Array.from({ length: 9 }, (_, i) => { const suelta = kprog(T, K.En + 0.3 + i * 0.25, K.En + 0.9 + i * 0.25);
            return <circle key={i} cx={110 + i * 44 + suelta * 30} cy={760 + Math.sin(i + T * 2) * 16 + suelta * 60} r={20} fill={i % 3 === 1 ? PHE : '#7fc8ff'} stroke={KC.ink} strokeWidth={5} opacity={1 - suelta * 0.6} />; })}
          <Enzima x={560} y={800} s={1} T={T} gas={0.3} />
          {pheEn.map((p, i) => { const v = kprog(T, p.t0, p.t0 + 1.2, kEase.suave); if (v <= 0) return null;
            const x = klerp(330, p.xx, v), y = klerp(780, p.yy, v);
            return <Phe key={i} x={x} y={y + Math.sin(T * 3 + i) * 5} s={0.55} rot={p.rot + T * 25} brillo={0.4} />; })}
          <Cerebro x={930} y={620} s={0.65} T={T} alerta={kprog(T, K.En + 3.2, K.En + 3.8)} />
        </SvgCapa>
        <Medidor T={T} at={K.En + 0.8} until={K.Pr - 0.3} valor={(t) => klerp(0.15, 0.95, kprog(t, K.En + 0.8, K.En + 5.0))} etiqueta="Phe en la sangre" texto={(v) => (v > 0.6 ? 'alta' : 'normal')} x={90} y={1430} color={KC.red} />
      </Escena>
      {/* 4 · re-gancho: el disquito de sangre seca */}
      <Escena T={T} a={K.Pr} b={K.Gu} zoom={0.08}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <TarjetaFiltro x={330} y={1040} s={0.6} rot={-6} llenas={[1, 1, 1, 1, 1]} seca={1} falta={kprog(T, K.Pr + 0.5, K.Pr + 0.55) >= 1 ? 1 : -1} />
          {(() => { const baja = kprog(T, K.Pr, K.Pr + 0.45, kEase.sale) * (1 - kprog(T, K.Pr + 0.6, K.Pr + 1.0)); return <Sacabocado x={330 + (-280 + 140) * 0.6 * Math.cos(-6 * Math.PI / 180)} y={klerp(720, 1070, baja)} />; })()}
          {(() => { const sale = kprog(T, K.Pr + 0.55, K.Pr + 1.3, kEase.sale); if (sale <= 0) return null;
            return <g transform={`translate(${klerp(250, 300, sale)} ${klerp(1080, 760, sale)}) rotate(${T * 60}) scale(${klerp(0.4, 1, sale)} ${klerp(0.4, 1, sale) * (0.6 + 0.4 * Math.abs(Math.cos(T * 2)))})`}>
              <circle r={150} fill="#fbf7ee" stroke={KC.ink} strokeWidth={9} /><Mancha x={0} y={0} r={146} f={1} seca={1} seed={9} />
            </g>; })()}
          <text x={600} y={880} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.cyan} stroke={KC.ink} strokeWidth={12} opacity={kprog(T, K.Pr + 1.0, K.Pr + 1.4)} transform={`rotate(${Math.sin(T * 3) * 6} 600 800)`}>?</text>
        </SvgCapa>
      </Escena>
      {/* 5 · 1963: Guthrie */}
      <Escena T={T} a={K.Gu} b={K.Ag} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {Array.from({ length: 8 }, (_, i) => <Bacteria key={i} T={T} x={(i * 170 + T * 30) % 1200 - 60} y={1580 + Math.sin(i * 2 + T) * 40} largo={140} ancho={52} rot={i * 25} color="#bfe8a0" flagelo={false} seed={i + 5} opacidad={0.75} />)}
        </SvgCapa>
      </Escena>
      {/* 6–7 · el experimento: la placa con Bacillus subtilis, el freno y el halo */}
      <Escena T={T} a={K.Ag} b={K.Ho} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <PlacaPetri x={PLX} y={PLY} r={310} agar="#f1d27a" id="gu">
            {Array.from({ length: 70 }, (_, i) => { const a = i * 2.39996, d = Math.sqrt((i + 0.5) / 70) * 300; return <circle key={i} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={5} fill={FRENO} opacity={0.35 * kprog(T, K.Ag + 0.6, K.Ag + 1.4)} />; })}
            {halo > 0 && <g>
              <circle cx={discos[PKU][0]} cy={discos[PKU][1]} r={50 + 90 * halo} fill="rgba(255,255,255,.55)" stroke="rgba(255,255,255,.9)" strokeWidth={5} />
              {Array.from({ length: 40 }, (_, i) => { const a = i * 2.4, d = 52 + ((i * 37) % 85) * halo; return <rect key={i} x={discos[PKU][0] + Math.cos(a) * d - 7} y={discos[PKU][1] + Math.sin(a) * d - 3} width={14} height={6} rx={3} fill="#8fbf6a" opacity={halo} transform={`rotate(${i * 47} ${discos[PKU][0] + Math.cos(a) * d} ${discos[PKU][1] + Math.sin(a) * d})`} />; })}
              {discos.map(([a, b], i) => i !== PKU && <circle key={i} cx={a} cy={b} r={50 + 8 * halo} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth={4} />)}
            </g>}
            {discos.map(([a, b], i) => { const t0 = K.Ag + 1.6 + i * 0.4, p = kprog(T, t0, t0 + 0.35, kEase.sale); if (p <= 0) return null;
              return <g key={i} transform={`translate(${a} ${klerp(b - 160, b, p)})`} opacity={p}><circle r={44} fill="#fbf7ee" stroke={KC.ink} strokeWidth={5} /><Mancha x={0} y={0} r={42} f={1} seca={1} seed={i + 12} /></g>; })}
          </PlacaPetri>
          {halo > 0.3 && <circle cx={PLX + discos[PKU][0]} cy={PLY + discos[PKU][1]} r={150 + 10 * Math.sin(T * 6)} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray="20 14" opacity={kprog(halo, 0.3, 0.6)} />}
        </SvgCapa>
      </Escena>
      {/* 8 · hoy: espectrometría de masas en tándem */}
      <Escena T={T} a={K.Ho} b={K.Di} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Espectrometro x={400} y={900} T={T} picos={kprog(T, K.Ho + 1.6, K.Ho + 4.2)} />
          {(() => { const p = kprog(T, K.Ho + 0.3, K.Ho + 1.3, kEase.suave); return p < 1 ? <g transform={`translate(${klerp(800, 400, p)} ${klerp(560, 1090, p)}) scale(${klerp(1, 0.5, p)})`}><circle r={60} fill="#fbf7ee" stroke={KC.ink} strokeWidth={6} /><Mancha x={0} y={0} r={58} f={1} seca={1} seed={30} /></g> : null; })()}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Ho + 2.0} until={K.Di - 0.3} valor={30} prefijo="+" dur={1.2} etiqueta="enfermedades en una muestra" y={1560} tam={190} color={KC.yellow} />
      </Escena>
      {/* 9 · la dieta */}
      <Escena T={T} a={K.Di} b={K.Re} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Biberon x={220} y={930} s={0.95} rot={Math.sin(T * 2) * 4} nivel={klerp(0.85, 0.5, kprog(T, K.Di, K.Re))} />
          <Cerebro x={560} y={860} s={0.9} T={T} sano={kprog(T, K.Di + 2.4, K.Di + 3.6)} alerta={1 - kprog(T, K.Di + 1.0, K.Di + 2.6)} />
        </SvgCapa>
        <Medidor T={T} at={K.Di + 0.4} until={K.Re - 0.3} valor={(t) => klerp(0.95, 0.25, kprog(t, K.Di + 0.8, K.Di + 3.2, kEase.suave))} etiqueta="Phe en la sangre" texto={(v) => (v > 0.6 ? 'alta' : 'en control')} x={90} y={1430} color={KC.mint} />
      </Escena>
      {/* 10 · la lata con aspartame */}
      <Escena T={T} a={K.Re} b={K.Mx} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        <SvgCapa><Lata x={300} y={900} s={1.05} T={T} gira={kprog(T, K.Re + 0.4, K.Re + 1.6, kEase.suave)} /></SvgCapa>
      </Escena>
      {/* 11 · México */}
      <Escena T={T} a={K.Mx} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <MapaMexico x={40} y={640} ancho={1000} color="#fff3c4" centro="#e3e3d6">
            {ciudades.map(([lo, la], i) => { const [cx, cy] = mxProy(lo, la), on = kprog(T, K.Mx + 0.4 + i * 0.15, K.Mx + 0.7 + i * 0.15, kEase.rebote);
              return on > 0 ? <g key={i} transform={`translate(${cx} ${cy}) scale(${on})`}><circle r={26 + 4 * Math.sin(T * 5 + i)} fill={KC.pink} opacity={0.35} /><rect x={-13} y={-13} width={26} height={26} rx={5} fill="#fff" stroke={KC.ink} strokeWidth={4} /><path d="M -7 0 L 7 0 M 0 -7 L 0 7" stroke={KC.red} strokeWidth={5} /></g> : null; })}
          </MapaMexico>
        </SvgCapa>
      </Escena>
      {/* 12 · cierre: la tarjeta del inicio, ya revisada */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><TarjetaFiltro x={540} y={900} s={1.15} rot={-2} llenas={[1, 1, 1, 1, 1]} seca={1} checks={kprog(T, K.Ci + 0.6, K.Ci + 2.8)} /></SvgCapa>
      </Escena>

      {/* lupas y escalas */}
      <Lupa T={T} at={K.Bu + 1.0} until={K.En - 0.3} x={540} y={960} r={190} fx={540 - 140} fy={560 + 70} interior={(t, r) => InteriorPapel(t, r)} tinte={KC.red} etiqueta="AL MICROSCOPIO · sangre seca" />
      <Lupa T={T} at={K.Ha + 2.0} until={K.Ho - 0.3} x={830} y={880} r={170} fx={PLX + discos[PKU][0]} fy={PLY + discos[PKU][1]} interior={(t, r) => InteriorHalo(t, r, K.Ha + 2.0)} tinte={KC.mint} etiqueta="AL MICROSCOPIO · halo" />
      {T < K.Ta && <Escala T={T} z={1} pxPorMm={9.4} />}
      {T > K.Pr && T < K.Gu && <Escala T={T} z={1} pxPorMm={100} />}
      {T > K.Bu + 1.4 && T < K.En - 0.3 && <Escala T={T} z={1} pxPorMm={9000} objetivo={260} />}

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 2.2} until={K.Ta - 0.3} texto="¿un análisis cualquiera?" x={300} y={470} tam={40} />
      <Chip T={T} at={K.G + 1.2} until={K.Ta - 0.3} texto="tarjeta de papel filtro" y={1500} tam={42} borde={KC.red} />
      <Medidor T={T} at={K.Ta + 0.3} until={K.Bu - 0.3} valor={(t) => kprog(t, K.Ta + 0.3, K.Ta + 2.4) * 0.6} etiqueta="días de vida" texto={(v) => 'día ' + Math.max(1, Math.round(v * 5))} x={90} y={1430} color={KC.pink} />
      <Chip T={T} at={K.Bu + 0.2} until={K.Bu + 0.9} texto="tamiz metabólico neonatal" x={540} y={830} tam={40} borde={KC.mint} />
      <Etq T={T} at={K.Bu + 1.8} until={K.En - 0.3} x={130} y={1500} texto="fenilcetonuria (PKU)" tam={40} color={KC.texto} />
      <Etq T={T} at={K.En + 0.6} until={K.Pr - 0.3} x={110} y={690} texto="proteína" tam={30} color="#7fc8ff" />
      <Etq T={T} at={K.En + 1.2} until={K.Pr - 0.3} x={330} y={670} texto="enzima a medio gas" tam={30} color={ENZ} />
      <Etq T={T} at={K.En + 1.8} until={K.Pr - 0.3} x={60} y={1185} texto="fenilalanina (Phe) en la sangre" tam={30} color={PHE} />
      <TarjetaEstudio T={T} at={K.Gu + 0.2} until={K.Ag - 0.2} anio="1963" quien="Robert Guthrie y Ada Susi" revista="Pediatrics · Buffalo, EE. UU." x={460} y={900} />
      <Chip T={T} at={K.Gu + 1.4} until={K.Ag - 0.2} texto="¡otro Robert!" x={540} y={1500} tam={46} borde={KC.gold} />
      <Etq T={T} at={K.Ag + 0.4} until={K.Ha - 0.2} x={140} y={1500} texto="Bacillus subtilis" it tam={40} color={KC.texto} />
      <Chip T={T} at={K.Ag + 1.0} until={K.Ha - 0.2} texto="+ β-2-tienilalanina = freno" x={600} y={1590} tam={34} borde={FRENO} />
      <Cronometro T={T} at={K.Ha + 0.3} until={K.Ho - 0.3} factor={3600 * 4} x={480} y={470} etiqueta="TIME-LAPSE" />
      <Chip T={T} at={K.Ha + 1.4} until={K.Ho - 0.3} texto="mucha Phe → la bacteria crece" y={1500} tam={38} borde={KC.mint} />
      <Etq T={T} at={K.Ho + 0.8} until={K.Di - 0.3} x={90} y={610} texto="espectrómetro de masas" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Di + 0.6} until={K.Re - 0.3} x={90} y={590} texto="fórmula especial" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Re + 1.6} until={K.Mx - 0.3} texto="FENILCETONÚRICOS: CONTIENE FENILALANINA" y={1500} tam={30} borde={KC.red} />
      <Chip T={T} at={K.Mx + 0.4} until={K.Ci - 0.3} texto="NOM-034-SSA2-2013" y={1500} tam={42} borde={KC.pink} />
      <Etq T={T} at={K.Mx + 1.2} until={K.Ci - 0.3} x={120} y={560} texto="todo hospital donde nacen bebés" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou} texto="tamiz revisado ✓" y={1500} tam={44} borde={KC.mint} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ta - 0.1} texto="No es un análisis: *caza enfermedades.*" />
      <Subtitulo T={T} idx={1} at={K.Ta + 0.1} until={K.Bu - 0.1} texto="Un piquete en *el talón.*" />
      <Subtitulo T={T} idx={2} at={K.Bu + 0.1} until={K.En - 0.1} texto="Busca la *fenilcetonuria.*" />
      <Subtitulo T={T} idx={3} at={K.En + 0.1} until={K.Pr - 0.1} texto="La Phe *se acumula.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Gu - 0.1} texto="¿En una *gota seca?*" />
      <Subtitulo T={T} idx={5} at={K.Gu + 0.1} until={K.Ag - 0.1} texto="1963: *un truco con bacterias.*" />
      <Subtitulo T={T} idx={6} at={K.Ag + 0.1} until={K.Ha - 0.1} texto="Un gel con *freno.*" />
      <Subtitulo T={T} idx={7} at={K.Ha + 0.1} until={K.Ho - 0.1} texto="Mucha Phe: *crece la bacteria.*" />
      <Subtitulo T={T} idx={8} at={K.Ho + 0.1} until={K.Di - 0.1} texto="Hoy: *más de 30 enfermedades.*" />
      <Subtitulo T={T} idx={9} at={K.Di + 0.1} until={K.Re - 0.1} texto="Una dieta *protege el cerebro.*" />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.Mx - 0.1} texto="Por eso la lata *avisa.*" />
      <Subtitulo T={T} idx={11} at={K.Mx + 0.1} until={K.Ci - 0.1} texto="En México: *obligatorio.*" />
      <Subtitulo T={T} idx={12} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Tus gotitas *salieron a cazar.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Talon + 0.8, CUES.Talon + 4.9, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Enzima + 1.0, CUES.Enzima + 5.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Pregunta + 2.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Guthrie + 0.3, CUES.Guthrie + 3.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Agar + 1.2, CUES.Agar + 4.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Halo + 0.8, CUES.Halo + 4.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Hoy + 1.0, CUES.Hoy + 4.8, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Dieta + 1.5, CUES.Dieta + 5.0, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Refresco + 0.3, CUES.Refresco + 3.7, 'avatar_04_bajando_lentes', 'grande'],
        [CUES.Cierre + 0.3, CUES.Cierre + 3.5, 'avatar_02_apuntando_camara', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="39" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function TamizApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Tamiz /></CompositionStage></div>;
}
window.TamizApp = TamizApp;
