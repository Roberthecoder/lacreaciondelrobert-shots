// Shot Fungi Mati #31 · ¿Hongos que comen plástico? Lo que sí y lo que no — NARRADO (gancho 4 "número que contradice" + N2 "lo que sí sirve").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático.

const PL = { leche:'#f6f2e6', agua:'#cdeefa', cafe:'#7a4a24', cafe2:'#9a6232', hialino:'#eef7f1', pur:'#ffcf4a', pe:'#f2f6ff', verde:'#3e9b47', verde2:'#2c7a36' };

// Tubo de ensayo. (x, y) = centro de la boca; h = alto; claro 0..1 = cuánto se aclaró la suspensión lechosa.
function Tubo({ T, x, y, w = 170, h = 640, claro = 0, hongo = 1, gotitas = 0, seed = 2 }) {
  const r = w / 2, nivel = y + h * 0.28, fondo = y + h;
  const cuerpo = `M ${x - r} ${y} L ${x - r} ${fondo - r} A ${r} ${r} 0 0 0 ${x + r} ${fondo - r} L ${x + r} ${y}`;
  const liquido = `M ${x - r + 8} ${nivel} L ${x - r + 8} ${fondo - r} A ${r - 8} ${r - 8} 0 0 0 ${x + r - 8} ${fondo - r} L ${x + r - 8} ${nivel} Z`;
  const g = krng(seed);
  return <g>
    <path d={liquido} fill={PL.agua} />
    <path d={liquido} fill={PL.leche} opacity={1 - claro} />
    {gotitas > 0 && Array.from({ length: 26 }, (_, i) => { const gx = x - r + 22 + g() * (w - 44), gy = nivel + 20 + g() * (h * 0.66 - 40); const rr = 6 + g() * 8;
      return <circle key={i} cx={gx + Math.sin(T * 1.5 + i) * 4} cy={gy + Math.cos(T * 1.2 + i) * 4} r={rr} fill="#fff8e0" stroke={KC.ink} strokeWidth={2.5} opacity={gotitas} />; })}
    {hongo > 0 && <g opacity={hongo}><RedHifas T={T} x={x} y={nivel + 40} g={hongo} seed={seed + 5} n={140} escala={0.085 * w / 170} color="#fffdf2" ancho={3} circ /></g>}
    <path d={cuerpo} fill="rgba(255,255,255,.18)" stroke={KC.ink} strokeWidth={8} />
    <rect x={x - r - 16} y={y - 14} width={w + 32} height={22} rx={10} fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={7} />
    <path d={`M ${x - r + 18} ${y + 30} L ${x - r + 18} ${fondo - r - 20}`} stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".55" />
  </g>;
}

// Conidio de Pestalotiopsis: fusiforme, 5 células (4 septos), 3 centrales cafés, puntas hialinas,
// 2–3 apéndices tubulares en la punta y 1 en la base. Largo L px (≈ 25 µm).
function Conidio({ x, y, L = 280, rot = 0, s = 1, apendices = 3, crece = 1 }) {
  if (crece <= 0) return null;
  const W = L * 0.29, half = L / 2;
  const ancho = (u) => (W / 2) * Math.pow(Math.max(0, 1 - Math.pow(u / half, 2)), 0.55);
  const celda = (a, b) => { const n = 10, top = [], bot = [];
    for (let i = 0; i <= n; i++) { const u = klerp(a, b, i / n); top.push(`${u.toFixed(1)} ${(-ancho(u)).toFixed(1)}`); bot.unshift(`${u.toFixed(1)} ${ancho(u).toFixed(1)}`); }
    return 'M ' + top.join(' L ') + ' L ' + bot.join(' L ') + ' Z'; };
  const cortes = [-half, -half * 0.68, -half * 0.22, half * 0.22, half * 0.68, half];
  const colores = [PL.hialino, PL.cafe2, PL.cafe, PL.cafe2, PL.hialino];
  const ap = apendices === 2 ? [-14, 14] : [-26, 0, 26];
  const k = kEase.sale(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * k})`}>
    {ap.map((a, i) => <path key={i} d={`M ${half - 4} 0 q ${L * 0.25} ${a * 0.6} ${L * 0.62} ${a * 3.2}`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />)}
    {ap.map((a, i) => <path key={'b' + i} d={`M ${half - 4} 0 q ${L * 0.25} ${a * 0.6} ${L * 0.62} ${a * 3.2}`} stroke={PL.hialino} strokeWidth={4} fill="none" strokeLinecap="round" />)}
    <path d={`M ${-half + 4} 0 L ${-half - L * 0.22} 0`} stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <path d={`M ${-half + 4} 0 L ${-half - L * 0.22} 0`} stroke={PL.hialino} strokeWidth={4} strokeLinecap="round" />
    {colores.map((c, i) => <path key={'c' + i} d={celda(cortes[i], cortes[i + 1])} fill={c} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
  </g>;
}

// Bolsa del súper (polietileno), de frente.
function Bolsa({ x, y, s = 1, rot = 0, color = PL.pe, arrugas = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -95 -150 Q -100 -230 -55 -230 Q -20 -230 -25 -150 M 25 -150 Q 20 -230 55 -230 Q 100 -230 95 -150" stroke={KC.ink} strokeWidth={10} fill="none" />
    <path d="M -95 -150 Q -100 -230 -55 -230 Q -20 -230 -25 -150 M 25 -150 Q 20 -230 55 -230 Q 100 -230 95 -150" stroke={color} strokeWidth={4} fill="none" />
    <path d="M -120 -150 L 120 -150 L 135 120 Q 0 150 -135 120 Z" fill={color} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    {arrugas > 0 && <path d="M -70 -110 L -50 60 M 10 -120 L 30 90 M 70 -100 L 85 40" stroke="#c9d3e6" strokeWidth={6} strokeLinecap="round" opacity={arrugas} />}
  </g>;
}

// Enzima (tijerita esquemática que muerde).
function Tijera({ x, y, s = 1, T = 0, fase = 0 }) {
  const a = 18 + 16 * Math.abs(Math.sin(T * 9 + fase));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 0 0 L ${40 * Math.cos(a * Math.PI / 180)} ${-40 * Math.sin(a * Math.PI / 180)} A 40 40 0 1 0 ${40 * Math.cos(a * Math.PI / 180)} ${40 * Math.sin(a * Math.PI / 180)} Z`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-10} cy={-16} r={5} fill={KC.ink} />
  </g>;
}

// Báscula con aguja (sin número: solo dirección).
function Bascula({ x, y, baja = 0 }) {
  const ang = -40 + 0 - baja * 50;
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-230} y={0} width={460} height={190} rx={26} fill="#e9edf2" stroke={KC.ink} strokeWidth={9} />
    <rect x={-250} y={-24} width={500} height={34} rx={12} fill="#c7cdd6" stroke={KC.ink} strokeWidth={8} />
    <path d="M -110 160 A 110 110 0 0 1 110 160" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    <line x1={0} y1={160} x2={95 * Math.sin(ang * Math.PI / 180)} y2={160 - 95 * Math.cos(ang * Math.PI / 180)} stroke={KC.red} strokeWidth={9} strokeLinecap="round" />
    <circle cx={0} cy={160} r={12} fill={KC.ink} />
  </g>;
}

// Bote de basura lleno de bolsas.
function Bote({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Bolsa x={-50} y={-120} s={0.6} rot={-14} color="#f7f7f7" />
    <Bolsa x={60} y={-140} s={0.55} rot={12} color="#bfe0ff" />
    <Bolsa x={0} y={-170} s={0.5} rot={4} color="#ffd6e6" />
    <path d="M -170 -60 L 170 -60 L 140 300 L -140 300 Z" fill="#5c6670" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-190} y={-90} width={380} height={40} rx={14} fill="#77828d" stroke={KC.ink} strokeWidth={9} />
    {[-80, 0, 80].map((dx, i) => <line key={i} x1={dx} y1={-20} x2={dx * 0.85} y2={260} stroke="#46505a" strokeWidth={12} strokeLinecap="round" />)}
  </g>;
}

// Planeta con basura flotando.
function Planeta({ T, x, y, r = 200 }) {
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="#2f7fe0" stroke={KC.ink} strokeWidth={9} />
    <path d={`M ${-r * 0.7} ${-r * 0.3} Q ${-r * 0.3} ${-r * 0.7} 0 ${-r * 0.4} Q ${r * 0.2} ${-r * 0.1} ${-r * 0.2} ${r * 0.2} Q ${-r * 0.6} ${r * 0.3} ${-r * 0.7} ${-r * 0.3} Z`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} />
    <path d={`M ${r * 0.3} ${r * 0.2} Q ${r * 0.7} ${r * 0.1} ${r * 0.6} ${r * 0.5} Q ${r * 0.3} ${r * 0.7} ${r * 0.3} ${r * 0.2} Z`} fill="#3fbf4a" stroke={KC.ink} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, i) => { const a = T * 0.6 + i * 0.9, rr = r * 1.25; return <g key={i} transform={`translate(${Math.cos(a) * rr} ${Math.sin(a) * rr * 0.55}) rotate(${a * 60})`}>
      {i % 2 ? <rect x={-16} y={-26} width={32} height={52} rx={8} fill="#bfe0ff" stroke={KC.ink} strokeWidth={4} /> : <Bolsa x={0} y={0} s={0.18} />}</g>; })}
  </g>;
}

// Texto titular grande (Anton con contorno).
function Titular({ T, at, until, texto, x, y, tam = 120, color = KC.yellow }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, transform:`translate(-50%,-50%) scale(${e.s})`, opacity:e.o, font:`400 ${tam}px/1 ${KF.titulo}`, color,
    WebkitTextStroke:`${tam / 30}px ${KC.ink}`, textShadow:`${tam / 24}px ${tam / 24}px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>{texto}</div>;
}

// Lo de adentro del tallo (para la Lupa): células vegetales y una hifa que pasa entre ellas.
function TalloAdentro(T, r, g) {
  const D = r * 2, cel = [];
  for (let fy = 0; fy < 6; fy++) for (let fx = 0; fx < 4; fx++) cel.push([fx * 130 - (fy % 2) * 65 + 10, fy * 80 + 10]);
  const pts = [[-20, 60], [80, 120], [140, 210], [230, 250], [300, 330], [380, 360], [470, 440]];
  const n = Math.max(2, Math.ceil(g * pts.length));
  return <svg width={D} height={D} style={{ position:'absolute', left:0, top:0 }}>
    <rect width={D} height={D} fill="#123b22" />
    {cel.map(([cx, cy], i) => <rect key={i} x={cx} y={cy} width={120} height={70} rx={14} fill="#2f8a45" stroke="#0c2414" strokeWidth={5} />)}
    {cel.map(([cx, cy], i) => <circle key={'n' + i} cx={cx + 40} cy={cy + 35} r={9} fill="#a6e07a" opacity=".7" />)}
    <path d={'M ' + pts.slice(0, n).map((p) => p.join(' ')).join(' L ')} stroke={FK.hifa} strokeWidth={12} fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M 140 210 L 160 140 M 300 330 L 360 300" stroke={FK.hifa} strokeWidth={9} fill="none" strokeLinecap="round" opacity={g > 0.6 ? 1 : 0} />
  </svg>;
}

function PlasticoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, E: CUES.Estudio, Z: CUES.Enzima, O: CUES.SinOxigeno, P: CUES.Pregunta, Tr: CUES.Truco, Pk: CUES.Pakistan, R: CUES.Revision, Pe: CUES.Peso, S: CUES.Sirve, F: CUES.Futuro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const claroG = 0.5 * kprog(T, K.G + 0.3, K.G + 3.0, kEase.suave);
  const dia = Math.round(5 * kprog(T, K.G + 0.3, K.G + 3.0, kEase.suave) * 10) / 10;
  const micro = kprog(T, K.H + 2.3, K.H + 2.8);
  const romper = kprog(T, K.Pk + 2.6, K.Pk + 5.2);
  const aditivos = kprog(T, K.Pe + 0.6, K.Pe + 3.4);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el tubo lechoso se aclara a la mitad en ~5 días */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={330} cy={1115} rx={150} ry={22} fill="rgba(0,0,0,.15)" />
          <Tubo T={T} x={330} y={500} h={600} claro={claroG} hongo={kprog(T, K.G, K.G + 2.5)} />
        </>)}
        <div style={{ position:'absolute', left:740, top:810, transform:'translate(-50%,-50%)', zIndex:41, font:`700 64px ${KF.mono}`, color:KC.ink, opacity:kprog(T, K.G + 0.2, K.G + 0.4) }}>día {kformato(dia, 1)}</div>
      </Escena>
      {/* 2 · Pestalotiopsis microspora: vive dentro de tallos (endófito) · luego sus conidios al microscopio */}
      <Escena T={T} a={K.H} b={K.E} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={0} y={1180} width={KW} height={800} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          <path d="M 230 1190 L 245 560 L 285 560 L 300 1190 Z" fill={PL.verde} stroke={KC.ink} strokeWidth={8} />
          {[[265, 660, -1], [265, 820, 1], [265, 980, -1]].map(([x, y, d], i) => <path key={i} d={`M ${x} ${y} q ${d * 120} -80 ${d * 200} -20 q ${d * -90} 50 ${d * -200} 20 Z`} fill={PL.verde2} stroke={KC.ink} strokeWidth={6} />)}
          {[[60, 1190], [880, 1190], [960, 1190]].map(([x, y], i) => <path key={'p' + i} d={`M ${x - 30} ${y} L ${x - 10} ${y - 300 - i * 60} L ${x + 10} ${y - 300 - i * 60} L ${x + 30} ${y} Z`} fill="#2c7a36" stroke={KC.ink} strokeWidth={6} opacity=".8" />)}
        </>)}
        <Lupa T={T} at={K.H + 0.4} until={K.H + 2.3} x={630} y={800} r={220} fx={265} fy={820} interior={(t, r) => TalloAdentro(t, r, kprog(t, K.H + 0.7, K.H + 2.0))} etiqueta="POR DENTRO · tallo" tinte={KC.yellow} />
        <div style={{ position:'absolute', inset:0, background:KC.noche, opacity:micro, zIndex:30 }}>
          {micro > 0 && <Ambiente T={T} n={16} />}
        </div>
        {micro > 0 && fsvg(<g opacity={micro}>
          <Conidio x={430} y={820} L={280} rot={-18} crece={kprog(T, K.H + 2.5, K.H + 3.0)} />
          <Conidio x={560} y={1030} L={260} rot={12} apendices={2} crece={kprog(T, K.H + 2.8, K.H + 3.3)} />
          <Conidio x={290} y={1080} L={270} rot={-40} crece={kprog(T, K.H + 3.1, K.H + 3.6)} />
        </g>, 31)}
      </Escena>
      {/* 3 · el estudio: 59 hongos probados, uno destaca */}
      <Escena T={T} a={K.E} b={K.Z}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {Array.from({ length: 59 }, (_, i) => { const on = kprog(T, K.E + 0.4 + i * 0.03, K.E + 0.7 + i * 0.03, kEase.rebote); if (on <= 0) return null;
            const cx = 110 + (i % 10) * 95, cy = 770 + Math.floor(i / 10) * 68, gana = i === 23 ? kprog(T, K.E + 3.0, K.E + 3.4) : 0;
            return <g key={i} transform={`translate(${cx} ${cy}) scale(${on * (1 + gana * 0.5)})`}>
              {gana > 0 && <circle r={52} fill={KC.yellow} opacity={0.7 * gana} />}
              <circle r={32} fill="rgba(255,255,255,.55)" stroke={KC.ink} strokeWidth={4} />
              <circle r={14 + (i * 7) % 9} fill={['#fff6e0', '#e8f0c8', '#ffe6f0', '#f0e2c8'][i % 4]} stroke="rgba(0,0,0,.3)" strokeWidth={2} />
            </g>; })}
        </>)}
      </Escena>
      {/* 4 · al microscopio: la enzima corta el poliuretano */}
      <Escena T={T} a={K.Z} b={K.O}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <path d="M -20 900 Q 160 880 330 905" stroke={KC.ink} strokeWidth={80} fill="none" strokeLinecap="round" />
          <path d="M -20 900 Q 160 880 330 905" stroke={FK.hifa} strokeWidth={64} fill="none" strokeLinecap="round" />
          {Array.from({ length: 12 }, (_, i) => { const corte = [2, 5, 8].includes(i) ? kprog(T, K.Z + 0.9 + [2, 5, 8].indexOf(i) * 0.4, K.Z + 1.3 + [2, 5, 8].indexOf(i) * 0.4) : 0;
            const grupo = i <= 2 ? 0 : i <= 5 ? 1 : i <= 8 ? 2 : 3; const sep = (kprog(T, K.Z + 1.0, K.Z + 2.4)) * (grupo - 1.5) * 30;
            const bx = 420 + i * 54 + sep, by = 900 + Math.sin(T * 2 + i * 0.7) * 10 + grupo * kprog(T, K.Z + 1.2, K.Z + 2.4) * (grupo % 2 ? -20 : 20);
            return <g key={i}>
              {i < 11 && <line x1={bx} y1={by} x2={bx + 54} y2={by} stroke={PL.pur} strokeWidth={12} opacity={1 - corte} />}
              <circle cx={bx} cy={by} r={25} fill={PL.pur} stroke={KC.ink} strokeWidth={5} />
            </g>; })}
          {[0, 1, 2].map((k) => { const p = kprog(T, K.Z + 0.2 + k * 0.4, K.Z + 1.1 + k * 0.4, kEase.sale); return p > 0 ? <Tijera key={k} T={T} fase={k} x={klerp(330, 557 + k * 162, p)} y={klerp(905, 830, p)} s={1.3} /> : null; })}
        </>)}
      </Escena>
      {/* 5 · igual de rápido con o sin oxígeno */}
      <Escena T={T} a={K.O} b={K.P}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Tubo T={T} x={260} y={620} h={580} w={150} claro={0.5 * kprog(T, K.O + 0.3, K.O + 2.2)} seed={4} />
          <Tubo T={T} x={560} y={620} h={580} w={150} claro={0.5 * kprog(T, K.O + 0.3, K.O + 2.2)} seed={7} />
          <path d="M 470 560 Q 560 540 650 560" stroke="none" fill="none" />
        </>)}
      </Escena>
      {/* 6 · re-gancho: ¿limpiarán el planeta? */}
      <Escena T={T} a={K.P} b={K.Tr} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<><Interrogacion T={T} x={300} y={700} tam={300} /><Planeta T={T} x={300} y={940} r={190} /></>)}
      </Escena>
      {/* 7 · ojo: era poliuretano suspendido en agua, no una bolsa */}
      <Escena T={T} a={K.Tr} b={K.Pk}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tubo T={T} x={260} y={520} w={220} h={700} claro={0.6} hongo={0} gotitas={kprog(T, K.Tr + 0.3, K.Tr + 0.9)} seed={9} />
          <rect x={560} y={1120} width={520} height={90} fill="#8a6a3e" stroke={KC.ink} strokeWidth={6} />
          <g opacity={kprog(T, K.Tr + 1.8, K.Tr + 2.2)}><Bolsa x={800} y={1010} s={0.95} rot={-8} /></g>
          <path d="M 680 860 L 920 1120 M 920 860 L 680 1120" stroke={KC.red} strokeWidth={22} strokeLinecap="round" opacity={kprog(T, K.Tr + 2.6, K.Tr + 2.9)} />
        </>)}
      </Escena>
      {/* 8 · Pakistán: Aspergillus tubingensis rompe una película en 2 meses (con glucosa) */}
      <Escena T={T} a={K.Pk} b={K.R}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <Petri x={480} y={960} r={215} medio="#e9f3f7">
            {romper < 1 && <g opacity={1 - romper}><rect x={-140} y={-110} width={280} height={220} rx={10} fill="rgba(255,240,200,.9)" stroke={KC.ink} strokeWidth={5} /></g>}
            {romper > 0 && Array.from({ length: 9 }, (_, i) => { const gx = (i % 3) - 1, gy = Math.floor(i / 3) - 1; const d = romper * 40;
              return <path key={i} d="M -40 -30 L 38 -36 L 44 30 L -34 38 Z" transform={`translate(${gx * (93 + d)} ${gy * (73 + d)}) rotate(${romper * (i * 23 % 40 - 20)}) scale(${1 - romper * 0.25})`} fill="rgba(255,240,200,.95)" stroke={KC.ink} strokeWidth={4} opacity={romper} />; })}
            {Array.from({ length: 14 }, (_, i) => { const p = kprog(T, K.Pk + 2.4 + i * 0.1, K.Pk + 2.8 + i * 0.1); const a = i * 2.4, rr = 60 + (i * 37) % 120;
              return p > 0 ? <circle key={'n' + i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr * 0.8} r={10 * p} fill="#1b1a1a" stroke="#555" strokeWidth={2} /> : null; })}
          </Petri>
        </>)}
      </Escena>
      {/* 9 · la revisión de 2022: 664 reportes · polietileno */}
      <Escena T={T} a={K.R} b={K.Pe}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <g opacity={1 - kprog(T, K.R + 3.4, K.R + 3.8)}>
            {Array.from({ length: 664 }, (_, i) => { const p = kprog(T, K.R + 0.3 + i * 0.0035, K.R + 0.5 + i * 0.0035); return p > 0 ? <circle key={i} cx={100 + (i % 37) * 24.5} cy={760 + Math.floor(i / 37) * 24} r={8 * p} fill={i % 3 ? KC.mint : '#fff4d6'} stroke={KC.ink} strokeWidth={2} /> : null; })}
          </g>
          <g opacity={kprog(T, K.R + 3.6, K.R + 4.1)}>
            <Bolsa x={420} y={990} s={1.0} rot={-4} />
            {[[300, 820], [560, 860], [360, 1150], [600, 1100]].map(([x, y], i) => <g key={i} transform={`translate(${x + Math.sin(T * 2 + i) * 8} ${y})`}><ellipse rx={26} ry={12} fill={KC.mint} stroke={KC.ink} strokeWidth={3} /></g>)}
          </g>
        </>)}
      </Escena>
      {/* 10 · pesa menos porque suelta aditivos */}
      <Escena T={T} a={K.Pe} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Bascula x={420} y={980} baja={aditivos} />
          <Bolsa x={420} y={810} s={0.9} />
          {Array.from({ length: 14 }, (_, i) => { const t0 = K.Pe + 0.6 + i * 0.18, p = kprog(T, t0, t0 + 1.2); if (p <= 0 || p >= 1) return null;
            const a = -Math.PI / 2 + (i % 7 - 3) * 0.35; return <circle key={i} cx={420 + Math.cos(a) * (60 + p * 320)} cy={780 + Math.sin(a) * (40 + p * 260)} r={11} fill={[KC.pink, KC.yellow, KC.lilac, KC.orange][i % 4]} stroke={KC.ink} strokeWidth={3} opacity={1 - p * 0.6} />; })}
        </>)}
      </Escena>
      {/* 11 · lo que sí sirve */}
      <Escena T={T} a={K.S} b={K.F}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {[[KC.blue, 220], [KC.leaf, 440], [KC.yellow, 660]].map(([c, x], i) => <g key={i} opacity={kprog(T, K.S + 0.6 + i * 0.8, K.S + 0.9 + i * 0.8)} transform={`translate(${x} 1040)`}>
            <path d="M -80 -100 L 80 -100 L 66 120 L -66 120 Z" fill={c} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <rect x={-94} y={-128} width={188} height={32} rx={10} fill={c} stroke={KC.ink} strokeWidth={7} />
          </g>)}
        </>)}
      </Escena>
      {/* 12 · los hongos: una pista para el futuro */}
      <Escena T={T} a={K.F} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<RedHifas T={T} x={480} y={920} g={kprog(T, K.F, K.F + 2.8)} seed={11} n={320} escala={0.5} color={KC.gold2} ancho={4} circ brillo={1} />)}
      </Escena>
      {/* 13 · cierre: el mismo tubo del inicio… al lado de la basura de verdad */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <ellipse cx={330} cy={1115} rx={150} ry={22} fill="rgba(0,0,0,.15)" />
          <Tubo T={T} x={330} y={500} h={600} claro={0.5} hongo={1} />
          <g opacity={kprog(T, K.C + 1.0, K.C + 1.6)} transform={`translate(${klerp(240, 0, kprog(T, K.C + 1.0, K.C + 1.8, kEase.sale))} 0)`}><Bote x={760} y={900} s={0.95} /></g>
        </>)}
      </Escena>

      {/* textos */}
      <Titular T={T} at={K.G + 0.6} until={K.H - 0.3} texto="½ en ~5 días" x={740} y={950} tam={110} />
      <MitoTachado T={T} at={K.G + 3.4} tacharEn={K.G + 4.4} until={K.H - 0.3} texto="¿adiós a la basura?" x={720} y={1090} tam={40} />
      <Chip T={T} at={K.H + 0.3} until={K.H + 2.3} texto="Ecuador · Amazonía (Yasuní)" x={400} y={400} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.H + 0.8} until={K.E - 0.3} x={60} y={490} texto="Pestalotiopsis microspora" it tam={36} color={micro > 0.5 ? KC.yellow : KC.ink} />
      <Etq T={T} at={K.H + 1.2} until={K.H + 2.3} x={330} y={1130} texto="vive dentro de la planta" tam={30} color={KC.ink} />
      <Etq T={T} at={K.H + 3.0} until={K.E - 0.3} x={60} y={550} texto="sus esporas (conidios)" tam={30} color={KC.texto} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 2.5} anio="2011" quien="Yale · 59 hongos probados" revista="Russell et al., Appl. Environ. Microbiol." y={560} x={460} />
      <Chip T={T} at={K.Z + 0.1} until={K.O - 0.3} texto="AL MICROSCOPIO · esquemático" x={420} y={470} tam={32} mono borde={KC.cyan} />
      <Etq T={T} at={K.Z + 0.5} until={K.O - 0.3} x={560} y={790} texto="poliuretano" tam={32} color={PL.pur} />
      <Etq T={T} at={K.Z + 0.8} until={K.O - 0.3} x={60} y={1070} texto="enzima (serina hidrolasa)" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.Z + 0.3} until={K.O - 0.3} x={60} y={790} texto="hifa" tam={30} color={FK.hifa} />
      <Chip T={T} at={K.O + 0.2} until={K.P - 0.3} texto="con O₂" x={260} y={540} tam={36} borde={KC.cyan} />
      <Chip T={T} at={K.O + 0.4} until={K.P - 0.3} texto="sin O₂" x={560} y={540} tam={36} borde={KC.red} />
      <Chip T={T} at={K.Tr + 0.3} until={K.Pk - 0.3} texto="en laboratorio" x={380} y={400} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Tr + 0.8} until={K.Pk - 0.3} x={60} y={475} texto="poliuretano suspendido en agua" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Tr + 2.7} until={K.Pk - 0.3} texto="esto NO" x={800} y={800} tam={40} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.Pk + 0.1} until={K.Pk + 2.3} anio="2017" quien="Islamabad · suelo de un basurero" revista="Khan et al., Environ. Pollut." y={560} x={470} />
      <Etq T={T} at={K.Pk + 2.5} until={K.R - 0.3} x={60} y={690} texto="Aspergillus tubingensis" it tam={36} color={KC.ink} />
      <Chip T={T} at={K.Pk + 2.8} until={K.R - 0.3} texto="2 meses" x={870} y={800} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.Pk + 3.6} until={K.R - 0.3} texto="+ 2 % de glucosa" x={480} y={1130} tam={36} borde={KC.yellow} />
      <NumeroGigante T={T} at={K.R + 0.2} until={K.R + 3.4} valor={664} dur={1.2} etiqueta="reportes de microbios" x={380} y={540} tam={220} color={KC.yellow} />
      <Chip T={T} at={K.R + 4.0} until={K.Pe - 0.3} texto="polietileno (PE), el plástico de las bolsas" x={540} y={700} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.R + 5.0} until={K.Pe - 0.3} texto="sin pruebas de que se lo coman mucho" x={500} y={1100} tam={30} borde={KC.red} />
      <Etq T={T} at={K.R + 5.4} until={K.Pe - 0.3} x={60} y={470} texto="Lear et al., 2022" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Pe + 0.3} until={K.S - 0.3} texto="pesa menos ≠ se lo comieron" x={400} y={470} tam={34} borde={KC.red} />
      <Etq T={T} at={K.Pe + 1.2} until={K.S - 0.3} x={660} y={760} texto="aditivos" tam={32} color={KC.ink} />
      <Chip T={T} at={K.S + 0.6} until={K.F - 0.3} texto="✓ usar menos" x={380} y={500} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.S + 1.4} until={K.F - 0.3} texto="✓ reusar" x={380} y={620} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.S + 2.2} until={K.F - 0.3} texto="✓ separar para reciclar" x={430} y={740} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.F + 0.6} until={K.C - 0.3} texto="una pista, no un permiso" x={400} y={470} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.8} until={K.Ou} texto="en un tubo, no en tu basura" x={390} y={470} tam={32} borde={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={210} />
      <BarraEscala T={T} at={K.H} until={K.H + 2.4} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.H + 2.4} until={K.E} texto="10 µm" largo={112} />
      <BarraEscala T={T} at={K.E} until={K.Z} texto="10 cm" largo={110} />
      <BarraEscala T={T} at={K.Z} until={K.O} texto="10 nm (esquemático)" largo={150} />
      <BarraEscala T={T} at={K.O} until={K.P} texto="5 cm" largo={190} />
      <BarraEscala T={T} at={K.P} until={K.Tr} texto="5000 km" largo={150} />
      <BarraEscala T={T} at={K.Tr} until={K.Pk} texto="5 cm" largo={240} />
      <BarraEscala T={T} at={K.Pk} until={K.R} texto="5 cm" largo={260} />
      <BarraEscala T={T} at={K.R + 3.6} until={K.Pe} texto="10 cm" largo={150} />
      <BarraEscala T={T} at={K.Pe} until={K.S} texto="10 cm" largo={130} />
      <BarraEscala T={T} at={K.S} until={K.F} texto="20 cm" largo={130} />
      <BarraEscala T={T} at={K.F} until={K.C} texto="1 cm" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={210} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="En un tubo: *la mitad en ~5 días.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.E - 0.1} texto="Vivía *dentro de tallos* en Ecuador." />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.Z - 0.1} texto="Estudiantes de Yale, *2011.*" />
      <Subtitulo T={T} idx={3} at={K.Z + 0.1} until={K.O - 0.1} texto="Una enzima *corta el poliuretano.*" />
      <Subtitulo T={T} idx={4} at={K.O + 0.1} until={K.P - 0.1} texto="Igual de rápido *sin oxígeno.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Tr - 0.1} texto="¿Limpiarán *el planeta?*" />
      <Subtitulo T={T} idx={6} at={K.Tr + 0.1} until={K.Pk - 0.1} texto="Poliuretano *en agua*, no una bolsa." />
      <Subtitulo T={T} idx={7} at={K.Pk + 0.1} until={K.R - 0.1} texto="Pakistán: *dos meses*, y con azúcar." />
      <Subtitulo T={T} idx={8} at={K.R + 0.1} until={K.Pe - 0.1} texto="Polietileno puro: *sin pruebas.*" />
      <Subtitulo T={T} idx={9} at={K.Pe + 0.1} until={K.S - 0.1} texto="Suelta aditivos, *no se lo comen.*" />
      <Subtitulo T={T} idx={10} at={K.S + 0.1} until={K.F - 0.1} texto="Usar menos, reusar, *separar.*" />
      <Subtitulo T={T} idx={11} at={K.F + 0.1} until={K.C - 0.1} texto="Una pista, *no un permiso.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="En un tubo, *no en tu basura.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.3, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 2.6, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 2.7, K.Z - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.O + 0.3, K.P - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.P + 0.05, K.Tr + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Tr + 0.9, K.Pk - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.Pk + 2.6, K.R - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.R + 0.5, K.R + 3.4, 'avatar_11_sorprendido', 'arriba-der'],
        [K.R + 4.4, K.Pe - 0.2, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.Pe + 1.0, K.S - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.S + 0.4, K.F - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.F + 0.3, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="31" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PlasticoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PlasticoShot /></CompositionStage></div>;
}
window.PlasticoApp = PlasticoApp;
