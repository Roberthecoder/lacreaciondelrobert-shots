// Shot Biotecnológico #32 · Esa célula no está rota: está doblada (anemia falciforme y Casgevy, el primer medicamento con CRISPR) — NARRADO (N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (las moléculas y las células no están a escala entre sí).
const SANGRE = '#d7263d', SANGRE2 = '#a81a2e', HBF = '#2fe0a8', HBS = '#ff3b2f', PARED = '#e8336d', LUMEN = '#ffe3e6';

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Glóbulo rojo normal: disco bicóncavo visto de frente (canto 0) o de lado (canto 1). fetal 0..1 = puntitos de hemoglobina fetal.
function Disco({ x, y, s = 1, rot = 0, canto = 0, fetal = 0, aplasta = 1, brillo = 0, seed = 1 }) {
  const ry = 70 * klerp(1, 0.42, canto) * aplasta, rx = 70 / Math.sqrt(aplasta);
  const R = krng(seed);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {brillo > 0 && <ellipse rx={rx + 26} ry={ry + 26} fill={HBF} opacity={0.35 * brillo} />}
    <ellipse rx={rx} ry={ry} fill={SANGRE} stroke={KC.ink} strokeWidth={7} />
    <ellipse rx={rx * 0.5} ry={ry * 0.5} fill={SANGRE2} opacity={0.75} />
    <ellipse cx={-rx * 0.35} cy={-ry * 0.45} rx={rx * 0.25} ry={ry * 0.14} fill="#fff" opacity={0.3} />
    {fetal > 0 && Array.from({ length: 8 }, (_, i) => { const a = R() * 6.28, d = R() * 0.7; return i / 8 < fetal ? <circle key={i} cx={Math.cos(a) * rx * d} cy={Math.sin(a) * ry * d} r={7} fill={HBF} stroke={KC.ink} strokeWidth={2.5} /> : null; })}
  </g>;
}
// Glóbulo rojo falciforme: media luna tiesa con puntas (forma de hoz).
function Hoz({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -110 18 Q -60 -78 0 -80 Q 60 -78 110 18 Q 60 -34 0 -34 Q -60 -34 -110 18 Z" fill="#c81d34" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M -70 -30 Q -30 -62 20 -62" stroke="#fff" strokeWidth={7} fill="none" opacity={0.3} strokeLinecap="round" />
  </g>;
}
// Molécula de hemoglobina esquemática (4 cadenas).
function Hb({ x, y, s = 1, color = HBS, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    {[[-8, -8], [8, -8], [-8, 8], [8, 8]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={9} fill={i % 2 ? color : mixHex(color, '#ffffff', 0.3)} stroke={KC.ink} strokeWidth={2.5} />)}
  </g>;
}
// Vaso sanguíneo de lado con glóbulos que fluyen. tf = tiempo del flujo; pila 0..1 = se amontonan detrás de hx; hoces = cuáles son falciformes.
function Vaso({ T, tf, cy = 980, h = 380, hx = 620, pila = 0, hoces = [], fetal = 0, hozFija = false, discoFijo = 0, angosto = 0 }) {
  const top = cy - h / 2, bot = cy + h / 2, n = 10;
  const estrecho = (xx) => angosto * 70 * Math.exp(-Math.pow((xx - hx - 40) / 120, 2));
  const pared = (lado) => { let d = ''; for (let xx = -20; xx <= 1100; xx += 20) { const yy = lado < 0 ? top + estrecho(xx) : bot - estrecho(xx); d += `${xx === -20 ? 'M' : 'L'} ${xx} ${yy} `; } return d; };
  return <g>
    <path d={pared(-1) + ` L 1100 ${bot} L -20 ${bot} Z`} fill={LUMEN} />
    <path d={pared(1) + ` L 1100 ${bot + 80} L -20 ${bot + 80} Z`} fill={PARED} opacity={0.9} />
    <path d={pared(-1) + ` L 1100 ${top - 80} L -20 ${top - 80} Z`} fill={PARED} opacity={0.9} />
    <path d={pared(-1)} stroke={KC.ink} strokeWidth={10} fill="none" />
    <path d={pared(1)} stroke={KC.ink} strokeWidth={10} fill="none" />
    {Array.from({ length: n }, (_, i) => {
      const yy = cy + (((i * 37) % 5) - 2) * h * 0.16;
      const xf = ((i * 131 + tf * 230) % 1340) - 130;
      const xp = hx - 120 - (i % 5) * 112 + mece(T, i, 0.8) * 6;
      const xx = klerp(xf, xp, pila), rr = ((i * 53) % 40) - 20 + T * 30 * (1 - pila) * (i % 2 ? 1 : -1);
      return hoces.includes(i) ? <Hoz key={i} x={xx} y={yy} s={0.8} rot={rr * 0.3} />
        : <Disco key={i} x={xx} y={yy} s={0.85} rot={rr} canto={0.5 + 0.5 * Math.sin(i + tf * 1.5)} fetal={fetal} seed={i + 3} />;
    })}
    {hozFija && <Hoz x={hx} y={cy - 10} s={1.2} rot={-8 + Math.sin(T * 5) * 6} />}
    {discoFijo > 0 && <Disco x={hx} y={cy} s={1.25} fetal={1} brillo={discoFijo * (0.6 + 0.4 * Math.sin(T * 5))} seed={44} />}
  </g>;
}
// Interruptor de pared. on 0..1 (1 = prendido, palanca arriba).
function Interruptor({ x, y, s = 1, on = 1, etiqueta }) {
  const ly = klerp(70, -70, on);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-140} y={-210} width={280} height={420} rx={36} fill={KC.paper} stroke={KC.ink} strokeWidth={10} />
    <rect x={-60} y={-140} width={120} height={280} rx={24} fill="#d9d2c2" stroke={KC.ink} strokeWidth={7} />
    <rect x={-50} y={ly - 70} width={100} height={140} rx={20} fill={on > 0.5 ? HBF : '#8a8f99'} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-160} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>{on > 0.5 ? 'PRENDIDO' : 'APAGADO'}</text>
    {etiqueta && <text x={0} y={190} textAnchor="middle" style={{ font:`400 34px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>}
  </g>;
}
// Cas9 con su guía (copiada de bio-03-crispr/crispr-comun.jsx). corta 0..1 cierra la tijera.
function Cas({ x = 0, y = 0, s = 1, guia = KC.pink, corta = 0, T = 0, rot = 0 }) {
  const a = klerp(34, 4, kclamp(corta, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot + mece(T, 7, 0.3) * 4})`}>
    <path d={`M 0 0 L ${120 * Math.cos(a * Math.PI / 180)} ${-120 * Math.sin(a * Math.PI / 180)} A 120 120 0 1 0 ${120 * Math.cos(a * Math.PI / 180)} ${120 * Math.sin(a * Math.PI / 180)} Z`} fill="#8fd8ff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={-30} cy={-50} rx={34} ry={18} fill="#fff" opacity=".35" />
    <path d="M -80 30 C -50 10, -20 50, 10 30 S 50 10, 70 26" stroke={guia} strokeWidth={10} fill="none" strokeLinecap="round" />
    <text x={-46} y={-4} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>Cas9</text>
  </g>;
}
// Hueso largo (fémur esquemático) horizontal.
function Hueso({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 -40 L 300 -40 Q 330 -110 380 -80 Q 430 -40 390 0 Q 430 40 380 80 Q 330 110 300 40 L -300 40 Q -330 110 -380 80 Q -430 40 -390 0 Q -430 -40 -380 -80 Q -330 -110 -300 -40 Z" fill="#f6efd9" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-250} y={-18} width={500} height={36} rx={18} fill="#e46a7a" opacity={0.85} />
  </g>;
}
// Célula madre de la médula (redonda, núcleo grande).
function Madre({ x, y, r = 46, color = KC.lilac, editada = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    {editada > 0 && <circle r={r + 14} fill={HBF} opacity={0.35 * editada} />}
    <circle r={r} fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-4} cy={2} r={r * 0.55} fill="#6a3fc8" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Bolsa de suero con tubo.
function Bolsa({ x, y, s = 1, color = '#cfe9ff', etiqueta, etqColor = KC.paper }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -90 -150 L 90 -150 Q 110 -150 110 -120 L 110 110 Q 110 160 50 170 L -50 170 Q -110 160 -110 110 L -110 -120 Q -110 -150 -90 -150 Z" fill={color} stroke={KC.ink} strokeWidth={8} opacity={0.95} />
    <rect x={-14} y={-190} width={28} height={44} rx={8} fill="#9aa3b5" stroke={KC.ink} strokeWidth={5} />
    <rect x={-20} y={170} width={40} height={60} rx={8} fill="#e8f6ff" stroke={KC.ink} strokeWidth={5} />
    {etiqueta && <g><rect x={-80} y={-60} width={160} height={80} rx={12} fill={etqColor} stroke={KC.ink} strokeWidth={5} />
      <text x={0} y={-8} textAnchor="middle" style={{ font:`400 ${etiqueta.length > 8 ? 28 : 36}px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text></g>}
  </g>;
}
// Figurita de persona (cuadrícula del ensayo).
function Persona({ x, y, s = 1, color = '#8a8f99' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cy={-46} r={26} fill={color} stroke={KC.ink} strokeWidth={5} />
    <path d="M -38 40 Q -38 -14 0 -14 Q 38 -14 38 40 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Sello de aprobación.
function Sello({ x, y, texto, sub, color = KC.blue, p = 1 }) {
  if (p <= 0) return null;
  const s = klerp(1.8, 1, kEase.sale(p));
  return <g transform={`translate(${x} ${y}) rotate(-10) scale(${s})`} opacity={Math.min(1, p * 2)}>
    <circle r={150} fill="rgba(255,255,255,.75)" stroke={color} strokeWidth={14} />
    <circle r={124} fill="none" stroke={color} strokeWidth={5} strokeDasharray="10 8" />
    <text y={-10} textAnchor="middle" style={{ font:`400 54px ${KF.titulo}` }} fill={color}>{texto}</text>
    <text y={48} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={color}>{sub}</text>
  </g>;
}

function Falciforme() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Di: CUES.Disco, Ca: CUES.Cambio, Cr: CUES.Crisis, Fe: CUES.Fetal, In: CUES.Interruptor, Pr: CUES.Pregunta,
    Me: CUES.Medula, Rg: CUES.Regreso, Vi: CUES.Victoria, En: CUES.Ensayo, Li: CUES.Limites, Dl: CUES.Diluye, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const liB = K.Li + 2.8, liC = K.Li + 5.2;            // tramos de "Limites": aprobación → quimio → precio
  const meB = K.Me + 1.9;                               // médula: de las células madre al ADN
  const R = krng(11);
  const libres = Array.from({ length: 40 }, () => { const a = R() * 6.28, d = Math.sqrt(R()) * 0.72; return [Math.cos(a) * d, Math.sin(a) * d, R() * 6]; });
  const R2 = krng(23);
  const mezcla = Array.from({ length: 64 }, (_, i) => { const a = R2() * 6.28, d = Math.sqrt(R2()) * 0.85; return [Math.cos(a) * d, Math.sin(a) * d, R2() * 6, i % 5 === 0]; });
  const dentroHb = (T0, r) => {   // interior de la Lupa: hemoglobina S suelta → varillas
    const u = kprog(T, T0 + 0.6, T0 + 3.2, kEase.suave);
    return <svg width={r * 2} height={r * 2}>
      <rect width={r * 2} height={r * 2} fill="#1a0d14" />
      <path d={`M ${r * 0.2} ${r * 1.1} Q ${r} ${r * (1.1 - 0.9 * u)} ${r * 1.8} ${r * 1.1} Q ${r} ${r * (1.1 - 0.4 * u)} ${r * 0.2} ${r * 1.1} Z`} fill="none" stroke="#c81d34" strokeWidth={10} opacity={0.25 + 0.5 * u} transform={`translate(0 ${-r * 0.1})`} />
      {libres.map(([fx, fy, p], j) => { const k = j % 4, nn = Math.floor(j / 4);
        const ax = r + (nn - 4.5) * 34, ay = r - 30 + (k - 1.5) * 34 - Math.pow((nn - 4.5) / 4.5, 2) * -40 * u;
        const bx = r + fx * r + Math.sin(T * 2 + p) * 10 * (1 - u), by = r + fy * r + Math.cos(T * 2.3 + p) * 10 * (1 - u);
        return <Hb key={j} x={klerp(bx, ax, u)} y={klerp(by, ay, u)} s={0.9} rot={(1 - u) * (T * 60 + p * 50)} />; })}
      {u > 0.9 && [0, 1, 2, 3].map((k) => <line key={k} x1={r - 170} x2={r + 170} y1={r - 30 + (k - 1.5) * 34} y2={r - 30 + (k - 1.5) * 34} stroke={KC.gold2} strokeWidth={3} opacity={0.5} />)}
    </svg>;
  };
  const dentroMedula = (r) => {
    const fase = T >= meB;
    const corta = kprog(T, meB + 0.9, meB + 1.3, kEase.sale), sep = kprog(T, meB + 1.3, meB + 1.9, kEase.sale);
    return <svg width={r * 2} height={r * 2}>
      <rect width={r * 2} height={r * 2} fill={fase ? '#0d1424' : '#3a1020'} />
      {!fase && Array.from({ length: 7 }, (_, i) => <Madre key={i} x={r + Math.cos(i * 0.9 + T * 0.6) * (i ? r * 0.55 : 0)} y={r + Math.sin(i * 0.9 + T * 0.6) * (i ? r * 0.45 : 0)} r={i ? 40 : 56} />)}
      {fase && <g>
        <g transform={`translate(${-sep * 18} 0)`}><ADNHebra T={T} x={10} y={r + 40} largo={r - 10} alto={56} vueltas={2} resalta={(uu) => uu > 0.78} /></g>
        <g transform={`translate(${sep * 18} 0)`}><ADNHebra T={T} x={r} y={r + 40} largo={r - 10} alto={56} vueltas={2} resalta={(uu) => uu < 0.22} /></g>
        <Cas x={klerp(r + 40, r + 20, kprog(T, meB, meB + 0.9, kEase.sale))} y={klerp(-60, r - 60, kprog(T, meB, meB + 0.9, kEase.sale))} s={0.7} corta={corta} T={T} />
        {corta > 0.9 && sep < 1 && <circle cx={r} cy={r + 40} r={30 + sep * 60} fill="none" stroke="#fff" strokeWidth={6} opacity={1 - sep} />}
        <text x={r} y={r * 1.68} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2}>BCL11A</text>
      </g>}
    </svg>;
  };
  // Victoria / ensayo / diluye: progreso
  const lit = Math.floor(kprog(T, K.En + 0.8, K.En + 3.4) * 29);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el vaso con una hoz atorada */}
      <Escena T={T} a={K.G} b={K.Di} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Vaso T={T} tf={T} hozFija hx={560} /></SvgCapa>
        <Escala T={T} z={1} pxPorMm={0.85 * 140 / 0.008} y={1440} />
      </Escena>
      {/* 1 · disco blandito que pasa por un vaso angosto */}
      <Escena T={T} a={K.Di} b={K.Ca} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={-20} y={880} width={1120} height={170} fill={LUMEN} stroke={KC.ink} strokeWidth={10} />
          {[0, 1.1, 2.2].map((d, k) => { const u = kprog(T, K.Di - 0.6 + d, K.Di + 2.4 + d), xx = klerp(-120, 1200, u), dentro = Math.exp(-Math.pow((xx - 540) / 260, 2));
            return u > 0 && u < 1 ? <Disco key={k} x={xx} y={965} s={1.5} aplasta={klerp(1, 0.55, dentro)} rot={(1 - dentro) * 10 * Math.sin(T * 3 + k)} seed={k + 60} /> : null; })}
          <rect x={-20} y={720} width={1120} height={160} fill={PARED} stroke={KC.ink} strokeWidth={10} />
          <rect x={-20} y={1050} width={1120} height={160} fill={PARED} stroke={KC.ink} strokeWidth={10} />
        </SvgCapa>
      </Escena>
      {/* 2 · por dentro: la hemoglobina se pega en varillas */}
      <Escena T={T} a={K.Ca} b={K.Cr} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Vaso T={T} tf={T} hozFija hx={560} cy={1080} /></SvgCapa>
        <Lupa T={T} at={K.Ca + 0.2} until={K.Cr - 0.3} x={540} y={720} r={300} fx={560} fy={1070} interior={(TT, r) => dentroHb(K.Ca, r)} tinte={KC.pink} etiqueta="AL MICROSCOPIO · hemoglobina S" />
      </Escena>
      {/* 3 · crisis: se amontonan y tapan el vaso */}
      <Escena T={T} a={K.Cr} b={K.Fe} zoom={0.06}>
        <FondoLunares color={KC.coral} />
        <SvgCapa>
          <Vaso T={T} tf={K.Cr} hozFija hx={760} pila={kprog(T, K.Cr, K.Cr + 1.2, kEase.suave)} hoces={[0, 3, 6]} angosto={1} />
          <circle cx={760} cy={980} r={160 + 40 * Math.sin(T * 9)} fill={KC.red} opacity={0.25 * kprog(T, K.Cr + 1.2, K.Cr + 1.6)} />
        </SvgCapa>
      </Escena>
      {/* 4 · antes de nacer: hemoglobina fetal */}
      <Escena T={T} a={K.Fe} b={K.In} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <circle cx={360} cy={900} r={270} fill="#ffc2cc" stroke={KC.ink} strokeWidth={10} />
          <g transform={`translate(360 905) rotate(${Math.sin(T * 1.2) * 4})`}>
            <path d="M 30 -60 Q 150 -30 130 80 Q 110 170 0 160 Q -110 150 -100 60 Q -90 -10 -20 -20 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
            <circle cx={-30} cy={-100} r={82} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
            <path d="M -60 -100 q 10 8 20 0" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d="M 10 90 Q 90 140 150 220" stroke="#d98aa0" strokeWidth={14} fill="none" strokeLinecap="round" />
          </g>
          <FlechaCurva x1={560} y1={760} x2={760} y2={830} p={kprog(T, K.Fe + 0.8, K.Fe + 1.4)} curva={-60} color={HBF} T={T} />
          <g opacity={kprog(T, K.Fe + 0.9, K.Fe + 1.4)}><Disco x={840} y={940} s={2} fetal={1} brillo={0.7} seed={9} /></g>
        </SvgCapa>
      </Escena>
      {/* 5 · BCL11A apaga la fetal */}
      <Escena T={T} a={K.In} b={K.Pr} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Interruptor x={330} y={930} on={1 - kprog(T, K.In + 0.9, K.In + 1.3, kEase.sale)} etiqueta="hemoglobina fetal" />
          <Disco x={800} y={930} s={2.1} fetal={1 - kprog(T, K.In + 1.2, K.In + 2.6)} seed={9} />
        </SvgCapa>
      </Escena>
      {/* 6 · re-gancho: ¿y si la prendemos? */}
      <Escena T={T} a={K.Pr} b={K.Me} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <ADNHebra T={T} x={40} y={820} largo={430} alto={70} vueltas={2.5} resalta={(uu) => uu > 0.4 && uu < 0.6} />
          <FlechaCurva x1={250} y1={900} x2={260} y2={1010} p={kprog(T, K.Pr + 1.2, K.Pr + 1.8)} curva={70} color={KC.yellow} T={T} />
          <Interruptor x={260} y={1150} s={0.42} on={kprog(T, K.Pr + 1.9, K.Pr + 2.3, kEase.sale)} />
        </SvgCapa>
      </Escena>
      {/* 7 · Casgevy: médula → CRISPR corta el interruptor */}
      <Escena T={T} a={K.Me} b={K.Rg} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Hueso x={540} y={470} s={1.05} /></SvgCapa>
        <Lupa T={T} at={K.Me + 0.2} until={K.Rg - 0.3} x={500} y={890} r={270} fx={540} fy={470} interior={(TT, r) => dentroMedula(r)} tinte={KC.mint} etiqueta={T < meB ? 'POR DENTRO · médula ósea' : 'AL MICROSCOPIO · ADN'} />
      </Escena>
      {/* 8 · de regreso al cuerpo */}
      <Escena T={T} a={K.Rg} b={K.Vi} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <line x1={250} y1={400} x2={250} y2={1200} stroke="#9aa3b5" strokeWidth={14} />
          <Bolsa x={250} y={560} s={1} color="#e9dcff" etiqueta="editadas" />
          <path d="M 250 790 Q 250 960 480 1010" stroke="#bfe8ff" strokeWidth={10} fill="none" />
          <Goteo T={T} x={250} y0={790} y1={850} cada={0.45} color="#e9dcff" desde={K.Rg} hasta={K.Vi} r={9} />
          <path d="M 420 960 L 1100 900 L 1100 1110 L 420 1070 Q 380 1015 420 960 Z" fill="#f1b48f" stroke={KC.ink} strokeWidth={10} />
          {Array.from({ length: 5 }, (_, i) => { const t0 = K.Rg + 0.8 + i * 0.45, u = kprog(T, t0, t0 + 1.6, kEase.sale);
            return u > 0 ? <Disco key={i} x={klerp(620, 640 + i * 90, u)} y={klerp(1010, 520 + (i % 2) * 120, u)} s={klerp(0.3, 1, u)} fetal={1} brillo={0.6} seed={i + 30} /> : null; })}
        </SvgCapa>
      </Escena>
      {/* 9 · 2019: Victoria Gray (silueta esquemática) */}
      <Escena T={T} a={K.Vi} b={K.En} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <rect x={200} y={1080} width={700} height={70} rx={20} fill="#b9c4d6" stroke={KC.ink} strokeWidth={8} />
          <circle cx={290} cy={1030} r={56} fill="#5b4a6e" stroke={KC.ink} strokeWidth={7} />
          <path d="M 340 1080 Q 360 1000 520 1010 L 880 1020 Q 900 1050 880 1080 Z" fill="#e9dcff" stroke={KC.ink} strokeWidth={8} />
          <line x1={960} y1={700} x2={960} y2={1200} stroke="#9aa3b5" strokeWidth={12} />
          <Bolsa x={960} y={820} s={0.6} color="#e9dcff" />
          <path d="M 960 960 Q 900 1050 700 1030" stroke="#bfe8ff" strokeWidth={8} fill="none" />
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Vi + 0.2} until={K.En - 0.3} anio="2019" quien="Victoria Gray · Nashville, EE. UU." revista="1.ª paciente con anemia falciforme · 34 años" y={660} />
      </Escena>
      {/* 10 · el ensayo: 29 de 30 */}
      <Escena T={T} a={K.En} b={K.Li} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {Array.from({ length: 30 }, (_, i) => { const c = i % 6, f = Math.floor(i / 6), on = i < lit;
            return <Persona key={i} x={190 + c * 140} y={720 + f * 105} s={0.85 * (on ? 1 + 0.08 * Math.max(0, Math.sin((T - K.En) * 6 - i * 0.3)) : 1)} color={on ? HBF : '#8a8f99'} />; })}
        </SvgCapa>
      </Escena>
      {/* 11 · límites: aprobado (2023) → quimioterapia → precio */}
      <Escena T={T} a={K.Li} b={K.Dl} zoom={0.03}>
        <FondoLunares color={T < liB ? KC.mint : T < liC ? KC.orange : KC.yellow} />
        <SvgCapa>
          {T < liB + 0.4 && <g opacity={1 - kprog(T, liB, liB + 0.4)}>
            <Sello x={330} y={900} texto="REINO UNIDO" sub="nov 2023" color={KC.blue} p={kprog(T, K.Li + 0.4, K.Li + 0.8)} />
            <Sello x={740} y={1020} texto="FDA" sub="dic 2023" color={KC.violet} p={kprog(T, K.Li + 1.1, K.Li + 1.5)} />
          </g>}
          {T >= liB - 0.2 && T < liC + 0.4 && <g opacity={kprog(T, liB - 0.2, liB + 0.2) * (1 - kprog(T, liC, liC + 0.4))}>
            <line x1={540} y1={560} x2={540} y2={1220} stroke="#9aa3b5" strokeWidth={14} />
            <Bolsa x={540} y={820} s={1.4} color="#ffe0b8" etiqueta="busulfán" etqColor="#fff" />
            <Goteo T={T} x={540} y0={1140} y1={1220} cada={0.35} color="#ffb070" desde={liB} hasta={liC} r={9} />
          </g>}
        </SvgCapa>
        {T >= liC - 0.1 && <NumeroGigante T={T} at={liC} until={K.Dl - 0.3} valor={2.2} dec={1} dur={1.0} etiqueta="millones de dólares" x={780} y={820} tam={260} color={KC.mint} />}
      </Escena>
      {/* 12 · la fetal diluye a la dañada */}
      <Escena T={T} a={K.Dl} b={K.Ci} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <circle cx={540} cy={950} r={300} fill="#3a0f1a" stroke="#c81d34" strokeWidth={14} />
          {mezcla.map(([x, y, p, mala], i) => <Hb key={i} x={540 + x * 290 + Math.sin(T * 2 + p) * 12} y={950 + y * 290 + Math.cos(T * 1.7 + p) * 12} s={0.95} color={mala ? HBS : HBF} rot={T * 40 + p * 60} />)}
        </SvgCapa>
      </Escena>
      {/* 13 · cierre: el mismo vaso, ahora fluye */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><Vaso T={T} tf={T} hx={560} fetal={1} discoFijo={kprog(T, K.Ci + 0.3, K.Ci + 1.0)} /></SvgCapa>
      </Escena>

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.3} until={K.G + 2.2} texto="¿rota?" x={300} y={480} tam={50} />
      <Chip T={T} at={K.G + 1.6} until={K.Di - 0.2} texto="doblada, como hoz" x={330} y={600} tam={42} borde={KC.red} />
      <Etiqueta T={T} at={K.G + 0.5} until={K.Di - 0.2} x={480} y={1220} texto="glóbulo rojo falciforme" lado="izq" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Di + 0.4} until={K.Ca - 0.2} texto="disco blandito: se dobla y pasa" y={500} tam={40} borde={KC.red} />
      <Chip T={T} at={K.Ca + 1.0} until={K.Cr - 0.3} texto="1 cambio en el gen HBB" y={1490} tam={38} borde={KC.pink} />
      <Chip T={T} at={K.Cr + 1.2} until={K.Fe - 0.2} texto="se tapa el vaso → crisis de dolor" y={1490} tam={38} borde={KC.red} />
      <Etiqueta T={T} at={K.Fe + 1.4} until={K.In - 0.2} x={840} y={1170} texto="hemoglobina fetal" lado="izq" tam={34} color={KC.ink} />
      <Chip T={T} at={K.Fe + 0.3} until={K.In - 0.2} texto="antes de nacer" y={500} tam={42} borde={HBF} />
      <Chip T={T} at={K.In + 0.4} until={K.Pr - 0.2} texto="BCL11A apaga la fetal" y={500} tam={42} borde={KC.violet} />
      <Etiqueta T={T} at={K.In + 2.0} until={K.Pr - 0.2} x={800} y={1180} texto="adulta: la dañada" lado="izq" tam={32} color={KC.ink} />
      <MitoTachado T={T} at={K.Pr + 0.2} tacharEn={K.Pr + 1.0} until={K.Me - 0.2} texto="¿arreglar el gen?" x={270} y={640} tam={38} />
      <Chip T={T} at={meB + 1.3} until={K.Rg - 0.3} texto="CRISPR-Cas9 corta el interruptor" x={400} y={1490} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.Rg + 0.4} until={K.Vi - 0.2} texto="vuelven a la médula" y={1490} tam={40} borde={HBF} />
      <Etiqueta T={T} at={K.Rg + 2.0} until={K.Vi - 0.2} x={560} y={1420} texto="glóbulos con hemoglobina fetal" tam={30} color={KC.ink} />
      <Chip T={T} at={K.En + 0.3} until={K.Li - 0.2} texto="NEJM 2024 · 29 de 30 evaluados" y={1490} tam={42} borde={HBF} />
      <Chip T={T} at={K.En + 2.4} until={K.Li - 0.2} texto="≥ 12 meses seguidos sin crisis graves" y={1575} tam={34} borde={HBF} />
      <Chip T={T} at={K.Li + 0.2} until={liB - 0.1} texto="1.er medicamento con CRISPR aprobado" y={500} tam={38} borde={KC.blue} />
      <Chip T={T} at={liB + 0.2} until={liC - 0.1} texto="antes: quimioterapia fuerte" y={480} tam={42} borde={KC.red} />
      <Etiqueta T={T} at={liB + 1.0} until={liC - 0.1} x={650} y={1060} texto="riesgo de infertilidad" tam={30} color={KC.ink} />
      <Chip T={T} at={liC + 0.5} until={K.Dl - 0.2} texto="precio de lista · EE. UU. · 2023" y={1490} tam={36} borde={KC.gold} />
      <Etiqueta T={T} at={K.Dl + 0.4} until={K.Ci - 0.2} x={60} y={1480} texto="HbS · la dañada" tam={32} color={HBS} />
      <Etiqueta T={T} at={K.Dl + 0.8} until={K.Ci - 0.2} x={1020} y={1480} texto="HbF · la fetal" lado="izq" tam={32} color={HBF} />
      <Chip T={T} at={K.Dl + 1.4} until={K.Ci - 0.2} texto="ya no alcanzan a formar varillas" y={1560} tam={34} borde={HBF} />
      <Chip T={T} at={K.Ci + 1.0} until={K.Ou - 0.1} texto="redonda otra vez" x={330} y={600} tam={44} borde={HBF} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Di - 0.1} texto="No está rota: *está doblada.*" />
      <Subtitulo T={T} idx={1} at={K.Di + 0.1} until={K.Ca - 0.1} texto="Discos *blanditos.*" />
      <Subtitulo T={T} idx={2} at={K.Ca + 0.1} until={K.Cr - 0.1} texto="Un cambio: *varillas tiesas.*" />
      <Subtitulo T={T} idx={3} at={K.Cr + 0.1} until={K.Fe - 0.1} texto="Se atora: *crisis de dolor.*" />
      <Subtitulo T={T} idx={4} at={K.Fe + 0.1} until={K.In - 0.1} texto="Antes de nacer: *la fetal.*" />
      <Subtitulo T={T} idx={5} at={K.In + 0.1} until={K.Pr - 0.1} texto="BCL11A *la apaga.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Me - 0.1} texto="¿Y si *prendemos la fetal?*" />
      <Subtitulo T={T} idx={7} at={K.Me + 0.1} until={K.Rg - 0.1} texto="CRISPR *corta el interruptor.*" />
      <Subtitulo T={T} idx={8} at={K.Rg + 0.1} until={K.Vi - 0.1} texto="Glóbulos con *hemoglobina fetal.*" />
      <Subtitulo T={T} idx={9} at={K.Vi + 0.1} until={K.En - 0.1} texto="2019: *Victoria Gray.*" />
      <Subtitulo T={T} idx={10} at={K.En + 0.1} until={K.Li - 0.1} texto="29 de 30: *un año sin crisis.*" />
      <Subtitulo T={T} idx={11} at={K.Li + 0.1} until={K.Dl - 0.1} texto="Quimio fuerte y *2.2 millones de dólares.*" />
      <Subtitulo T={T} idx={12} at={K.Dl + 0.1} until={K.Ci - 0.1} texto="La fetal *la diluye.*" />
      <Subtitulo T={T} idx={13} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Ya no se dobla: *volvió a la fetal.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho, CUES.Gancho + 3.1, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Crisis + 0.1, CUES.Crisis + 2.9, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Fetal + 0.6, CUES.Fetal + 2.9, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Pregunta + 3.3, 'avatar_06_pensativo_menton', 'grande'],
        [CUES.Medula + 1.8, CUES.Regreso - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [CUES.Victoria + 0.8, CUES.Ensayo - 0.2, 'avatar_07_pensativo_puno', 'bajo-der'],
        [CUES.Ensayo + 1.2, CUES.Limites - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [CUES.Limites + 5.3, CUES.Diluye - 0.2, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Diluye + 0.2, CUES.Cierre - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cierre + 0.2, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="32" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function FalciformeApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Falciforme /></CompositionStage></div>;
}
window.FalciformeApp = FalciformeApp;
