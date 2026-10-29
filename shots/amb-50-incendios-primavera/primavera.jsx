// Shot Ambiental #50 · De cada mil incendios en Jalisco, solo dos los prende la naturaleza (Bosque La Primavera) — NARRADO
// (N4 la imagen que se llena: el mapa del bosque junto a Guadalajara se colorea con lo quemado + N2 el número: 2 de 1,000).
// Datos: Plan Estatal de Manejo del Fuego de Jalisco (2018, CONAFOR 2005-2013), Ra Ximhai (2012), Sánchez Durán et al. (2014),
// Plan Integral del Agua de Jalisco (2026), notas de prensa de 2025. Ver guion.md y verificacion.md.
// El mapa, las manchas de incendio y los cortes de suelo son esquemáticos.

const PV_BOSQUE = 'M 100 900 Q 140 830 240 835 Q 330 800 420 830 Q 510 845 525 920 Q 540 1000 480 1060 Q 400 1100 300 1085 Q 190 1095 130 1050 Q 80 1000 100 900 Z';
const PV_CIUDAD = 'M 560 760 Q 700 720 860 750 Q 1000 790 1010 900 Q 1020 1050 930 1140 Q 800 1190 660 1150 Q 560 1110 545 1000 Q 535 880 560 760 Z';
const PV_FLAMA = 'M 0 -20 C 8 -10 11 -2 7 4 C 4 9 -4 9 -7 4 C -11 -2 -7 -10 0 -20 Z';
const PV_PINOS = (() => { const r = krng(50), a = []; for (let i = 0; i < 70; i++) { const x = 115 + r() * 400, y = 850 + r() * 225;
  a.push({ x, y, s: 0.7 + r() * 0.5 }); } return a; })();
const PV_PUNTOS25 = (() => { const r = krng(2025), a = []; while (a.length < 50) { const x = 120 + r() * 390, y = 850 + r() * 220;
  const dx = (x - 310) / 215, dy = (y - 960) / 125; if (dx * dx + dy * dy < 1) a.push({ x, y, t: r() }); } return a; })();

// Pinito del mapa (vista de lado, chiquito).
function PinoMini({ x, y, s = 1, color = '#2f7a39' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><rect x={-1.5} y={0} width={3} height={6} fill="#5a3b22" />
    <path d="M 0 -16 L 8 0 L -8 0 Z" fill={color} stroke={KC.ink} strokeWidth={1.5} /></g>;
}
// Mapa esquemático: Guadalajara (gris) y La Primavera (verde) al poniente. q05 / q12: 0..1 crecimiento de lo quemado. p25: 0..1 puntos de 2025.
function Mapa({ T, seco = 0, q05 = 0, q12 = 0, p25 = 0, basura = 0 }) {
  const verde = mixHex('#46a352', '#c9b55a', seco);
  return <g transform="translate(0 -110)">
    <defs><clipPath id="pvClip"><path d={PV_BOSQUE} /></clipPath><clipPath id="pvCiu"><path d={PV_CIUDAD} /></clipPath></defs>
    {/* ciudad */}
    <path d={PV_CIUDAD} fill="#a9b0b9" stroke={KC.ink} strokeWidth={6} />
    <g clipPath="url(#pvCiu)" stroke="#e9ecef" strokeWidth={4}>
      {Array.from({ length: 12 }, (_, i) => <line key={'h' + i} x1={530} y1={740 + i * 40} x2={1030} y2={760 + i * 40} />)}
      {Array.from({ length: 12 }, (_, i) => <line key={'v' + i} x1={560 + i * 40} y1={720} x2={545 + i * 40} y2={1200} />)}
    </g>
    {/* bosque */}
    <path d={PV_BOSQUE} fill={verde} stroke={KC.ink} strokeWidth={6} />
    <g clipPath="url(#pvClip)">
      {PV_PINOS.map((p, i) => <PinoMini key={i} x={p.x} y={p.y} s={p.s} color={mixHex('#2f7a39', '#9a8a3a', seco)} />)}
      {q05 > 0 && <ellipse cx={240} cy={960} rx={135 * q05} ry={95 * q05} fill="#2e221c" opacity={0.92} stroke={q05 < 1 ? KC.orange : '#5a4030'} strokeWidth={10} />}
      {q12 > 0 && <circle cx={455} cy={850} r={125 * q12} fill="#2e221c" opacity={0.92} stroke={q12 < 1 ? KC.orange : '#5a4030'} strokeWidth={10} />}
      {PV_PUNTOS25.map((p, i) => p25 > p.t ? <g key={i}><circle cx={p.x} cy={p.y} r={7} fill="#2e221c" stroke={KC.orange} strokeWidth={3} />
        <path d={PV_FLAMA} transform={`translate(${p.x} ${p.y - 4}) scale(${0.45 * (1 + 0.15 * Math.sin(T * 14 + i))})`} fill={KC.orange} stroke={KC.ink} strokeWidth={2} opacity={kclamp((p25 - p.t) * 8, 0, 1) * (1 - kclamp((p25 - p.t - 0.25) * 4, 0, 1)) } /></g> : null)}
    </g>
    <path d={PV_BOSQUE} fill="none" stroke={KC.ink} strokeWidth={6} />
    {basura > 0 && <g transform={`translate(455 850) scale(${basura})`}>
      <path d="M -30 10 Q -26 -14 -6 -18 Q 10 -26 26 -10 Q 34 4 30 10 Z" fill="#7d8a5a" stroke={KC.ink} strokeWidth={4} />
      <rect x={-18} y={-16} width={14} height={10} fill="#e8e1d0" stroke={KC.ink} strokeWidth={3} transform="rotate(-12)" />
      <circle cx={12} cy={-12} r={7} fill="#4aa0e0" stroke={KC.ink} strokeWidth={3} />
      <path d={PV_FLAMA} transform={`translate(0 -18) scale(${1.6 * (1 + 0.12 * Math.sin(T * 13))})`} fill={KC.orange} stroke={KC.ink} strokeWidth={3} />
      <path d={PV_FLAMA} transform={`translate(0 -16) scale(${0.8 * (1 + 0.12 * Math.sin(T * 17))})`} fill={KC.yellow} />
    </g>}
    <text x={785} y={960} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={8} paintOrder="stroke">Guadalajara</text>
    <text x={60} y={1185} style={{ font:`700 24px ${KF.mono}` }} fill={KC.ink}>esquema</text>
  </g>;
}
// Cabecera de dato a la izquierda (deja libre la zona de Robert a la derecha).
function Cabecera({ T, at, until, grande, linea, sub, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:70, top:410, zIndex:42, opacity:e.o, transform:`scale(${e.s})`, transformOrigin:'0 50%', maxWidth:600 }}>
    <div style={{ font:`400 120px/1 ${KF.titulo}`, color, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>{grande}</div>
    {linea && <div style={{ display:'inline-block', marginTop:12, font:`900 42px/1.1 ${KF.texto}`, color:KC.ink, background:KC.paper, border:`5px solid ${KC.ink}`, borderRadius:18, padding:'6px 18px' }}>{linea}</div>}
    {sub && <div style={{ marginTop:10, font:`700 30px ${KF.mono}`, color:KC.ink }}>{sub}</div>}
  </div>;
}
// 1,000 flamitas en 40 × 25. luz(i) 0..1 = encendida; apaga(i) 0..1 = ya se apagó. Las 2 naturales (rayo y volcán) en cian.
const PV_NAT = [6 * 40 + 9, 17 * 40 + 30];
const PV_ORDEN = (() => { const r = krng(998), a = Array.from({ length: 1000 }, (_, i) => ({ i, k: r() })); a.sort((p, q) => p.k - q.k); const o = new Array(1000); a.forEach((p, n) => { o[p.i] = n / 1000; }); return o; })();
function Flamas({ T, t0, apagarDesde = null, apagarDur = 3.5 }) {
  const cw = 22, ch = 14.6, x0 = 100, y0 = 735;
  const out = [];
  for (let i = 0; i < 1000; i++) {
    const c = i % 40, r = Math.floor(i / 40), x = x0 + c * cw + cw / 2, y = y0 + r * ch + ch;
    const luz = kprog(T, t0 + (c + r) * 0.012, t0 + (c + r) * 0.012 + 0.2, kEase.sale);
    const nat = PV_NAT.includes(i);
    const off = apagarDesde == null || nat ? 0 : kprog(T, apagarDesde + PV_ORDEN[i] * apagarDur, apagarDesde + PV_ORDEN[i] * apagarDur + 0.25);
    const fl = 1 + 0.12 * Math.sin(T * 12 + i * 1.7);
    if (off >= 1) { out.push(<circle key={i} cx={x} cy={y - 4} r={2.5} fill="#5b5f66" />); continue; }
    out.push(<path key={i} d={PV_FLAMA} transform={`translate(${x} ${y}) scale(${0.55 * luz * (1 - off)}, ${0.6 * luz * fl * (1 - off)})`} fill={nat ? KC.cyan : (i % 3 ? KC.orange : '#ff5a1f')} stroke={KC.ink} strokeWidth={2} />);
  }
  const marcas = PV_NAT.map((i, k) => { const c = i % 40, r = Math.floor(i / 40), x = x0 + c * cw + cw / 2, y = y0 + r * ch + ch - 6;
    const p = kprog(T, t0 + 1.0 + k * 0.3, t0 + 1.4 + k * 0.3, kEase.rebote);
    return <g key={'n' + k} opacity={p}><circle cx={x} cy={y} r={20 + 4 * Math.sin(T * 6)} fill="none" stroke="#fff" strokeWidth={6} />
      <circle cx={x} cy={y} r={20 + 4 * Math.sin(T * 6)} fill="none" stroke={KC.ink} strokeWidth={2} />
      {k === 0 ? <path d={`M ${x + 30} ${y - 36} l -14 26 h 12 l -10 24 l 26 -32 h -12 l 10 -18 Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />
        : <g><path d={`M ${x + 24} ${y + 14} l 18 -30 h 12 l 18 30 Z`} fill="#8a5a3a" stroke={KC.ink} strokeWidth={3} /><path d={`M ${x + 44} ${y - 18} q 4 -10 10 -14`} stroke={KC.red} strokeWidth={5} fill="none" /></g>}
    </g>; });
  return <g>{out}{marcas}</g>;
}
// Corte del suelo del bosque: lluvia que se infiltra hacia el acuífero.
function CorteAgua({ T, t0 }) {
  const gotas = [];
  for (let k = 0; k < 18; k++) { const u = ((T - t0) * 0.7 + k / 18) % 1; const x = 150 + (k * 53) % 780;
    if (T < t0) continue;
    gotas.push(u < 0.35 ? <path key={k} d="M 0 -14 Q 9 0 0 9 Q -9 0 0 -14 Z" transform={`translate(${x} ${700 + u / 0.35 * 180})`} fill="#3aa0ff" stroke={KC.ink} strokeWidth={2.5} />
      : <circle key={k} cx={x + Math.sin(u * 20 + k) * 8} cy={880 + (u - 0.35) / 0.65 * 230} r={6} fill="#3aa0ff" stroke={KC.ink} strokeWidth={2} />); }
  return <g transform="translate(0 -150)">
    <rect x={0} y={880} width={1080} height={90} fill="#6b4a2e" />
    <rect x={0} y={970} width={1080} height={130} fill="#c9a27a" />
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 97) % 1080} cy={990 + (i * 37) % 100} r={6 + (i % 3) * 3} fill="#a9825c" />)}
    <rect x={0} y={1100} width={1080} height={110} fill="#2f7fd0" />
    {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${60 + i * 170} ${1150 + Math.sin(T * 2 + i) * 4} q 30 -10 60 0`} stroke="#bfe7ff" strokeWidth={5} fill="none" />)}
    <line x1={0} y1={880} x2={1080} y2={880} stroke={KC.ink} strokeWidth={6} />
    {[130, 260, 400, 560, 700, 840, 960].map((x, i) => <g key={i} transform={`translate(${x} 880) scale(${1.1 + (i % 2) * 0.3})`}>
      <rect x={-6} y={-60} width={12} height={60} fill="#5a3b22" stroke={KC.ink} strokeWidth={3} />
      <path d="M 0 -150 L 34 -90 L 18 -90 L 44 -50 L -44 -50 L -18 -90 L -34 -90 Z" fill="#2f7a39" stroke={KC.ink} strokeWidth={4} transform={`rotate(${Math.sin(T * 1.5 + i) * 2} 0 -50)`} /></g>)}
    {gotas}
    <g transform={`translate(420 640)`}><ellipse cx={0} cy={0} rx={190} ry={60} fill="#e3e9f0" stroke={KC.ink} strokeWidth={6} /><circle cx={-90} cy={-30} r={55} fill="#e3e9f0" stroke={KC.ink} strokeWidth={6} /><circle cx={30} cy={-50} r={70} fill="#e3e9f0" stroke={KC.ink} strokeWidth={6} /><ellipse cx={0} cy={5} rx={182} ry={52} fill="#e3e9f0" /></g>
    <text x={1040} y={1170} textAnchor="end" style={{ font:`900 34px ${KF.texto}` }} fill="#fff" stroke={KC.ink} strokeWidth={7} paintOrder="stroke">acuífero</text>
    <text x={40} y={1040} style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>suelo y roca</text>
  </g>;
}
// Ocote (Pinus oocarpa): tronco con corteza en placas, copa irregular de mechones de acículas y conos ovoides con pedúnculo.
function Ocote({ x, y, s = 1, T = 0, quemado = 0 }) {
  const copa = [[0, -470, 120], [-110, -390, 95], [105, -400, 100], [-60, -300, 105], [70, -300, 100], [0, -360, 110], [-150, -300, 70], [150, -310, 70]];
  const verde = mixHex('#2f7a39', '#4a4036', quemado);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -24 0 L -16 -330 L 16 -330 L 24 0 Z" fill="#6b4a2e" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M -18 ${-20 - i * 34} h 14 M 4 ${-36 - i * 34} h 14`} stroke="#3e2a18" strokeWidth={4} />)}
    <path d="M 0 -250 L -90 -310 M 0 -280 L 95 -330" stroke="#5a3b22" strokeWidth={12} strokeLinecap="round" />
    {copa.map(([cx, cy, r], i) => <g key={i} transform={`rotate(${Math.sin(T * 1.4 + i) * 1.5} ${cx} ${cy + r})`}>
      <circle cx={cx} cy={cy} r={r} fill={verde} stroke={KC.ink} strokeWidth={6} />
      {Array.from({ length: 7 }, (_, k) => { const a = k / 7 * Math.PI * 2; return <line key={k} x1={cx + Math.cos(a) * r * 0.3} y1={cy + Math.sin(a) * r * 0.3} x2={cx + Math.cos(a) * r * 0.85} y2={cy + Math.sin(a) * r * 0.85} stroke="#1f5a28" strokeWidth={4} />; })}
    </g>)}
    {[[-80, -270], [90, -290], [-20, -255]].map(([cx, cy], i) => <g key={'c' + i} transform={`translate(${cx} ${cy})`}>
      <line x1={0} y1={-14} x2={0} y2={4} stroke="#5a3b22" strokeWidth={5} />
      <ellipse cx={0} cy={26} rx={17} ry={26} fill="#8a5a32" stroke={KC.ink} strokeWidth={4} />
      <path d="M -14 20 L 14 20 M -15 32 L 15 32 M -10 44 L 10 44 M -6 10 L 6 10" stroke="#5a3a1e" strokeWidth={3} /></g>)}
  </g>;
}
// Pinito ramoso (estado cespitoso): muchos tallitos cortos con mechones, casi sin altura.
function PinitoRamoso({ x, y, s = 1, T = 0, brote = 1 }) {
  const tallos = [-40, -26, -12, 0, 14, 28, 42];
  return <g transform={`translate(${x} ${y}) scale(${s * brote})`}>
    {tallos.map((dx, i) => { const h = 50 + ((i * 37) % 30), ang = dx * 0.9 + Math.sin(T * 2 + i) * 2;
      return <g key={i} transform={`rotate(${ang})`}><line x1={0} y1={0} x2={0} y2={-h} stroke="#6b4a2e" strokeWidth={6} strokeLinecap="round" />
        {Array.from({ length: 6 }, (_, k) => { const a = -Math.PI / 2 + (k - 2.5) * 0.45; return <line key={k} x1={0} y1={-h} x2={Math.cos(a) * 26} y2={-h + Math.sin(a) * 26} stroke="#2f8a3d" strokeWidth={5} strokeLinecap="round" />; })}
      </g>; })}
  </g>;
}

function PrimaveraShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, B: CUES.Bosque, A: CUES.Agua, F: CUES.Fuego, Ba: CUES.Basura, P: CUES.Pregunta, E: CUES.Estudio, At: CUES.Atorado, H: CUES.Hoy, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const km5 = 90; // 1 km ≈ 18 px en el mapa (esquema)
  const q05 = kprog(T, K.F + 1.2, K.F + 4.0, kEase.suave);
  const q12 = kprog(T, K.Ba + 1.0, K.Ba + 3.8, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: 1,000 flamas, 2 naturales */}
      <Escena T={T} a={K.G} b={K.B}>
        <FondoLunares color={KC.yellow} />
        {svg(<Flamas T={T} t0={K.G} />)}
        <EscalaFija texto="1 flama = 1 incendio · esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 2 · La Primavera junto a Guadalajara */}
      <Escena T={T} a={K.B} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<Mapa T={T} />)}
        <EscalaFija texto="5 km" largo={km5} y={1480} color={KC.ink} />
      </Escena>
      {/* 3 · capta lluvia y recarga acuíferos */}
      <Escena T={T} a={K.A} b={K.F}>
        <FondoLunares color={KC.cyan} />
        {svg(<CorteAgua T={T} t0={K.A + 0.3} />)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 4 · 2005: más de un tercio */}
      <Escena T={T} a={K.F} b={K.Ba}>
        <FondoLunares color={KC.orange} />
        {svg(<Mapa T={T} seco={kprog(T, K.F + 0.1, K.F + 1.2)} q05={q05} />)}
        <EscalaFija texto="5 km" largo={km5} y={1480} color={KC.ink} />
      </Escena>
      {/* 5 · 2012: quema de basura */}
      <Escena T={T} a={K.Ba} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svg(<Mapa T={T} seco={1} q12={q12} basura={kprog(T, K.Ba + 0.2, K.Ba + 0.7, kEase.rebote)} />)}
        <EscalaFija texto="5 km" largo={km5} y={1480} color={KC.ink} />
      </Escena>
      {/* 6 · pregunta: ¿los pinos no aguantan? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {svg(<><Ocote x={330} y={1110} s={1.05} T={T} />
          <text x={120} y={900} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={12} transform={`rotate(${Math.sin(T * 3) * 6} 120 800)`}>?</text></>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 7 · el estudio de 2010: rebrotes de raíz */}
      <Escena T={T} a={K.E} b={K.At}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<><g transform="translate(0 -170)">
          <rect x={0} y={860} width={1080} height={400} fill="#6b4a2e" />
          <rect x={0} y={840} width={1080} height={24} fill="#2e221c" />
          <ellipse cx={540} cy={846} rx={420 * kprog(T, K.E + 0.2, K.E + 1.0, kEase.sale)} ry={30} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="18 12" />
          {/* raíz vieja del pino quemado */}
          <path d="M 120 1010 Q 300 960 540 990 Q 760 1020 960 970" stroke="#c49a6c" strokeWidth={22} fill="none" strokeLinecap="round" />
          <path d="M 120 1010 Q 300 960 540 990 Q 760 1020 960 970" stroke={KC.ink} strokeWidth={4} fill="none" strokeDasharray="2 18" />
          {[200, 300, 400, 480, 590, 680, 770, 870].map((x, i) => { const b = kprog(T, K.E + 2.0 + i * 0.25, K.E + 2.6 + i * 0.25, kEase.rebote);
            const yr = x < 540 ? 985 - (540 - x) * 0.05 : 995 - (x - 540) * 0.03;
            return <g key={i}><line x1={x} y1={yr} x2={x} y2={yr - (yr - 840) * b} stroke={KC.yellow} strokeWidth={6} strokeDasharray="10 6" opacity={b} />
              <PinitoRamoso x={x} y={840} s={0.7} T={T} brote={b} /></g>; })}
          {[250, 820].map((x, i) => { const b = kprog(T, K.E + 4.2 + i * 0.3, K.E + 4.8 + i * 0.3, kEase.rebote); return <PinitoRamoso key={'s' + i} x={x + 40} y={840} s={0.5} T={T} brote={b} />; })}
          <text x={60} y={1190} style={{ font:`700 26px ${KF.mono}` }} fill="#f4efe4">raíz del pino quemado (esquema)</text></g>
          {/* barra 83 % */}
          <g opacity={kprog(T, K.E + 4.6, K.E + 5.0)}><rect x={90} y={900} width={900} height={50} rx={25} fill="rgba(255,255,255,.7)" stroke={KC.ink} strokeWidth={5} />
            <rect x={95} y={905} width={890 * 0.83 * kprog(T, K.E + 4.6, K.E + 5.6, kEase.sale)} height={40} rx={20} fill={KC.gold} /></g>
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 8 · se quedan chaparritos y ramosos */}
      <Escena T={T} a={K.At} b={K.H}>
        <FondoLunares color={KC.mint} />
        {svg(<g transform="translate(0 -90)">
          <rect x={0} y={1150} width={1080} height={110} fill="#6b4a2e" /><line x1={0} y1={1150} x2={1080} y2={1150} stroke={KC.ink} strokeWidth={6} />
          <line x1={120} y1={760} x2={960} y2={760} stroke={KC.ink} strokeWidth={5} strokeDasharray="20 14" />
          <text x={960} y={740} textAnchor="end" style={{ font:`900 32px ${KF.texto}` }} fill={KC.ink}>altura para reproducirse</text>
          <PinitoRamoso x={430} y={1150} s={2.2} T={T} brote={1 + 0.03 * Math.sin((T - K.At) * 6)} />
          <g transform="translate(950 0)"><rect x={0} y={800} width={60} height={350} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 8 }, (_, i) => <line key={i} x1={0} y1={1150 - i * 44} x2={i % 2 ? 22 : 36} y2={1150 - i * 44} stroke={KC.ink} strokeWidth={4} />)}</g>
          <g transform={`translate(800 1000) scale(${kprog(T, K.At + 1.2, K.At + 1.7, kEase.rebote)})`}>
            <ellipse cx={0} cy={0} rx={34} ry={52} fill="#8a5a32" stroke={KC.ink} strokeWidth={5} />
            <path d="M -28 -10 L 28 -10 M -30 12 L 30 12 M -20 34 L 20 34" stroke="#5a3a1e" strokeWidth={4} />
            <path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke={KC.red} strokeWidth={14} strokeLinecap="round" /></g>
        </g>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      {/* 9 · 2025: ~50 incendios, casi 2,000 ha */}
      <Escena T={T} a={K.H} b={K.C}>
        <FondoLunares color={KC.orange} />
        {svg(<Mapa T={T} seco={0.6} p25={kprog(T, K.H + 0.4, K.H + 3.6)} />)}
        <EscalaFija texto="5 km" largo={km5} y={1480} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: no quemes, llama al 911, y regreso a las 1,000 flamas que se apagan */}
      <Escena T={T} a={K.C} b={K.C + 3.0}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          {[[230, 'basura'], [540, 'pastizal']].map(([x, t], i) => { const p = kprog(T, K.C + 0.2 + i * 0.4, K.C + 0.6 + i * 0.4, kEase.rebote), r = kprog(T, K.C + 0.9 + i * 0.4, K.C + 1.2 + i * 0.4);
            return <g key={i} transform={`translate(${x} 880) scale(${p})`}>
              <circle r={120} fill="#fff" stroke={KC.ink} strokeWidth={8} />
              {i === 0 ? <path d="M -60 50 Q -55 0 -15 -10 Q 20 -25 55 5 Q 70 30 62 50 Z" fill="#7d8a5a" stroke={KC.ink} strokeWidth={5} />
                : Array.from({ length: 9 }, (_, k) => <path key={k} d={`M ${-64 + k * 16} 55 q ${4 - (k % 2) * 8} -50 ${(k % 2) * 10 - 5} -80`} stroke="#c9b55a" strokeWidth={7} fill="none" strokeLinecap="round" />)}
              <path d={PV_FLAMA} transform={`translate(0 -10) scale(${2.4 * (1 + 0.1 * Math.sin(T * 13 + i))})`} fill={KC.orange} stroke={KC.ink} strokeWidth={3} />
              <path d="M -85 -85 L 85 85" stroke={KC.red} strokeWidth={18 * r} strokeLinecap="round" />
              <text y={170} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>{t}</text></g>; })}
          <g transform={`translate(850 880) scale(${kprog(T, K.C + 1.6, K.C + 2.0, kEase.rebote)}) rotate(${Math.sin(T * 25) * 4 * (T < K.C + 3 ? 1 : 0)})`}>
            <rect x={-70} y={-130} width={140} height={260} rx={24} fill="#2c2f36" stroke={KC.ink} strokeWidth={7} />
            <rect x={-56} y={-104} width={112} height={180} rx={10} fill="#e8f6ff" />
            <text y={10} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.red}>911</text>
            <circle cy={104} r={12} fill="#555" /></g>
        </>)}
        <EscalaFija texto="esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>
      <Escena T={T} a={K.C + 3.0} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<Flamas T={T} t0={K.C + 2.6} apagarDesde={K.C + 3.6} apagarDur={3.4} />)}
        <EscalaFija texto="1 flama = 1 incendio · esquema" largo={0} y={1480} color={KC.ink} />
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 0.6} until={K.B - 0.2} valor={2} dur={0.6} sufijo=" de 1,000" etiqueta="naturales:" x={320} y={560} tam={110} color={KC.cyan} />
      <Chip T={T} at={K.G + 1.5} until={K.B - 0.2} texto="Jalisco · 2005–2013" y={372} x={300} tam={28} borde={KC.ink} />
      <Chip T={T} at={K.G + 3.0} until={K.B - 0.2} texto="998: personas" y={672} x={320} tam={40} borde={KC.orange} />
      <Chip T={T} at={K.B + 0.2} until={K.B + 2.5} texto="CONAFOR · Jalisco 2005–2013" y={470} x={540} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.B + 2.4} until={K.A - 0.2} texto="La Primavera · 30,500 ha" y={655} x={300} tam={30} borde={KC.leaf} />
      <Chip T={T} at={K.A + 0.5} until={K.F - 0.2} texto="≈ 240 millones de m³ de lluvia al año" y={370} x={380} tam={28} borde={KC.cyan} />
      <Cabecera T={T} at={K.F + 1.0} until={K.Ba - 0.2} grande="2005" linea="más de 11 mil ha · 37 %" sub="temporada seca" color={KC.yellow} />
      <Cabecera T={T} at={K.Ba + 0.8} until={K.P - 0.2} grande="2012" linea="más de 8 mil ha" sub="empezó: quema de basura" color={KC.yellow} />
      <Etq T={T} at={K.P + 0.3} until={K.E - 0.1} x={70} y={440} texto="ocote · Pinus oocarpa" lado="der" tam={30} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 1.6} until={K.E + 4.4} anio="2010" quien="UdeG · La Primavera" revista="Rev. Mex. Cienc. Forestales, 2014" x={540} y={520} />
      <Chip T={T} at={K.E + 4.7} until={K.At - 0.1} texto="83 % rebrotes de raíz" y={560} x={340} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.E + 2.2} until={K.E + 4.4} x={80} y={760} texto="Pinus oocarpa" it lado="der" tam={28} color={KC.paper} />
      <Etq T={T} at={K.At + 0.5} until={K.H - 0.2} x={430} y={780} texto="estado ramoso" lado="der" tam={32} color={KC.ink} />
      <Cabecera T={T} at={K.H + 0.6} until={K.C - 0.2} grande="2025" linea="≈ 50 incendios" sub="casi 2,000 ha" color={KC.yellow} />
      <Chip T={T} at={K.C + 3.4} until={K.Ou - 0.1} texto="que no sea de los 998" y={640} x={400} tam={40} borde={KC.orange} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.B - 0.1} texto="Solo *2 de cada 1,000* los prendió la naturaleza." />
      <Subtitulo T={T} idx={1} at={K.B + 0.1} until={K.A - 0.1} texto="Junto a Guadalajara: *30,500 hectáreas.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.F - 0.1} texto="Capta *240 millones de m³* de lluvia al año." />
      <Subtitulo T={T} idx={3} at={K.F + 0.1} until={K.Ba - 0.1} texto="2005: *más de un tercio* del bosque." />
      <Subtitulo T={T} idx={4} at={K.Ba + 0.1} until={K.P - 0.1} texto="2012: empezó con *una quema de basura.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Los pinos *no aguantan el fuego?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.At - 0.1} texto="*83 %* eran rebrotes de raíz." />
      <Subtitulo T={T} idx={7} at={K.At + 0.1} until={K.H - 0.1} texto="Chaparritos: *casi no dan semilla.*" />
      <Subtitulo T={T} idx={8} at={K.H + 0.1} until={K.C - 0.1} texto="2025: *≈ 50 incendios*, casi 2,000 ha." />
      <Subtitulo T={T} idx={9} at={K.C + 0.1} until={K.Ou - 0.1} texto="Si ves humo: *llama al 911.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Bosque + 2.6, CUES.Agua + 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Agua + 3.5, CUES.Fuego - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Fuego + 2.5, CUES.Basura + 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Basura + 2.0, CUES.Pregunta - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 1.5, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 4.5, CUES.Atorado + 0.5, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Atorado + 1.5, CUES.Hoy + 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Hoy + 2.5, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="50" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PrimaveraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PrimaveraShot /></CompositionStage></div>;
}
window.PrimaveraApp = PrimaveraApp;
