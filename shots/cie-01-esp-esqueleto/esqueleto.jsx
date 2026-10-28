// Shot Científico #01 · Especial Día de Muertos: tu calavera se está reconstruyendo — NARRADO (N1 "Por dentro": macro → micro → macro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático (la calavera es de Día de Muertos, no una anatomía exacta).
const HUESO = '#efe2c4', HUESO2 = '#dcc89f', MEDULA = '#3a1420';
const PX_MM = 3; // calavera dibujada a ~3 px por mm a z = 1 (esquemático)

// Papel picado que se mece arriba (fondo de Día de Muertos).
function PapelPicado({ T, y = 0, colores = [KC.pink, KC.orange, KC.lilac, KC.mint, KC.cyan, KC.yellow] }) {
  return <svg width={KW} height={240} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M -20 26 Q ${KW / 2} 60 ${KW + 20} 26`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: 7 }, (_, i) => { const x = 10 + i * 155, c = colores[i % colores.length], r = mece(T, i + 2, 0.5) * 5;
      return <g key={i} transform={`translate(${x} ${38 + Math.sin(i / 6 * Math.PI) * 14}) rotate(${r} 70 0)`}>
        <path d="M 0 0 L 140 0 L 140 150 L 126 162 L 112 150 L 98 162 L 84 150 L 70 162 L 56 150 L 42 162 L 28 150 L 14 162 L 0 150 Z" fill={c} stroke={KC.ink} strokeWidth={3} opacity=".95" />
        <circle cx={70} cy={60} r={22} fill={KC.ink} opacity=".25" /><path d="M 30 105 L 50 90 L 70 105 L 90 90 L 110 105" stroke={KC.ink} strokeOpacity=".25" strokeWidth={8} fill="none" />
        <rect x={20} y={22} width={16} height={16} transform="rotate(45 28 30)" fill={KC.ink} opacity=".25" /><rect x={104} y={22} width={16} height={16} transform="rotate(45 112 30)" fill={KC.ink} opacity=".25" />
      </g>; })}
  </svg>;
}

// Calaverita (estilo dulce de Día de Muertos, esquemática). brilla 0..1 = "obra viva".
function Calavera({ T, x, y, s = 1, gira = 1, brilla = 0 }) {
  const sx = gira, r = mece(T, 5, 0.6) * 4;
  return <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s * sx} ${s})`}>
    {brilla > 0 && <circle cx={0} cy={-20} r={330} fill={KC.yellow} opacity={0.25 * brilla * (0.7 + 0.3 * Math.sin(T * 5))} />}
    <path d="M -230 -40 C -240 -260 -120 -330 0 -330 C 120 -330 240 -260 230 -40 C 228 40 200 80 170 110 L 165 190 C 120 240 -120 240 -165 190 L -170 110 C -200 80 -228 40 -230 -40 Z" fill={HUESO} stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    {/* frente decorada */}
    {[[-90, KC.pink], [0, KC.cyan], [90, KC.orange]].map(([px, c], i) => <g key={i} transform={`translate(${px} -230)`}>
      {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-18} rx={13} ry={22} fill={c} stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />)}
      <circle r={11} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>)}
    {/* ojos con pétalos */}
    {[-95, 95].map((ex) => <g key={ex} transform={`translate(${ex} -40)`}>
      {Array.from({ length: 10 }, (_, k) => <ellipse key={k} cx={0} cy={-78} rx={16} ry={26} fill={k % 2 ? KC.mint : KC.pink} stroke={KC.ink} strokeWidth={4} transform={`rotate(${k * 36})`} />)}
      <circle r={62} fill={KC.ink} /><circle cx={-16} cy={-18} r={13} fill="#fff" opacity=".8" /></g>)}
    {/* nariz de corazón */}
    <path d="M 0 90 C -40 60 -34 30 -14 32 C -4 32 0 42 0 48 C 0 42 4 32 14 32 C 34 30 40 60 0 90 Z" fill={KC.ink} />
    {/* dientes */}
    <path d="M -130 150 L 130 150" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 9 }, (_, k) => <line key={k} x1={-120 + k * 30} y1={128} x2={-120 + k * 30} y2={176} stroke={KC.ink} strokeWidth={6} />)}
    <path d="M -150 108 Q -110 125 -70 108 M 70 108 Q 110 125 150 108" stroke={KC.lilac} strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}

// Hueso compacto por dentro (vista en corte): periostio arriba con nervios y vasos, osteonas abajo.
const OSTEONAS = [[230, 900], [560, 820], [880, 930], [380, 1180], [720, 1150], [180, 1420], [560, 1430], [930, 1400]];
function HuesoCorte({ T, etiquetas = 1 }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={0} width={KW} height={KH} fill={KC.noche} />
    {/* matriz de hueso */}
    <rect x={0} y={680} width={KW} height={KH} fill={HUESO2} />
    {/* periostio: membrana en la superficie con nervios (amarillo) y vasos (rojo/azul) */}
    <path d={`M 0 600 Q 270 ${585 + Math.sin(T) * 6} 540 600 T 1080 600 L 1080 690 L 0 690 Z`} fill="#f2a2a8" stroke={KC.ink} strokeWidth={6} />
    <path d={`M 0 625 C 200 ${610 + Math.sin(T * 2) * 5} 400 650 600 628 S 900 615 1080 632`} stroke={KC.red} strokeWidth={14} fill="none" />
    <path d={`M 0 660 C 250 645 420 ${675 + Math.sin(T * 2 + 1) * 5} 650 655 S 950 650 1080 662`} stroke="#3c5bd6" strokeWidth={12} fill="none" />
    <path d="M 0 645 C 300 640 500 650 1080 642" stroke={KC.yellow} strokeWidth={6} strokeDasharray="2 0" fill="none" />
    {/* glóbulos que corren por el vaso */}
    {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={((T * 160 + i * 140) % 1140) - 30} cy={626} r={7} fill="#ffd0d0" />)}
    {OSTEONAS.map(([cx, cy], i) => <g key={i}>
      {[150, 118, 88, 60].map((r, k) => <circle key={k} cx={cx} cy={cy} r={r} fill={k % 2 ? '#e8d6b0' : '#f3e6c8'} stroke="#b89c68" strokeWidth={3} />)}
      {Array.from({ length: 10 }, (_, k) => { const a = k * 0.63 + i, rr = 104 + (k % 2) * 30;
        return <g key={k}><line x1={cx + Math.cos(a) * rr} y1={cy + Math.sin(a) * rr} x2={cx + Math.cos(a) * (rr - 26)} y2={cy + Math.sin(a) * (rr - 26)} stroke="#6b4a2a" strokeWidth={2} />
          <ellipse cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr} rx={9} ry={5} transform={`rotate(${a * 57.3 + 90} ${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr})`} fill="#6b4a2a" /></g>; })}
      <circle cx={cx} cy={cy} r={32} fill={MEDULA} stroke={KC.ink} strokeWidth={4} />
      <circle cx={cx - 10} cy={cy} r={10} fill={KC.red} opacity={0.75 + 0.25 * Math.sin(T * 6 + i)} /><circle cx={cx + 11} cy={cy + 2} r={9} fill="#3c5bd6" />
      <circle cx={cx + 2} cy={cy - 14} r={4} fill={KC.yellow} />
    </g>)}
  </svg>;
}

// Superficie del hueso (por dentro): arriba médula, abajo hueso. Un osteoclasto excava y los osteoblastos rellenan.
function Superficie({ T, a, b }) {
  // a = inicio de "Clastos", b = inicio de "Blastos"
  const cava = kprog(T, a + 0.4, b - 0.1, kEase.suave);            // qué tan hondo excavó
  const relleno = kprog(T, b + 0.6, b + 3.4, kEase.suave);           // capas nuevas
  const sx = 540, sup = 980, ancho = 380, hondo = 170 * cava * (1 - relleno);
  const clastoX = klerp(sx, sx + 520, kprog(T, b, b + 1.2, kEase.suave)), clastoO = 1 - kprog(T, b + 0.6, b + 1.3);
  const pit = `M 0 ${sup} L ${sx - ancho / 2} ${sup} C ${sx - ancho / 3} ${sup + hondo} ${sx + ancho / 3} ${sup + hondo} ${sx + ancho / 2} ${sup} L ${KW} ${sup} L ${KW} ${KH} L 0 ${KH} Z`;
  const nCapas = Math.floor(relleno * 5);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    <rect x={0} y={0} width={KW} height={KH} fill={MEDULA} />
    {Array.from({ length: 30 }, (_, i) => { const r = krng(i + 7); return <circle key={i} cx={r() * KW} cy={r() * 900} r={6 + r() * 10} fill="#7a2f44" opacity=".55" />; })}
    <path d={pit} fill={HUESO} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 6 }, (_, k) => <path key={k} d={`M 0 ${sup + 60 + k * 70} Q 540 ${sup + 80 + k * 70} 1080 ${sup + 60 + k * 70}`} stroke="#c9b17f" strokeWidth={4} fill="none" />)}
    {/* capas nuevas que rellenan el hueco (azul claro = hueso nuevo) */}
    {cava > 0.05 && Array.from({ length: nCapas }, (_, k) => { const h0 = 170 * (1 - k / 5), h1 = 170 * (1 - (k + 1) / 5);
      return <path key={k} d={`M ${sx - ancho / 2} ${sup} C ${sx - ancho / 3} ${sup + h0} ${sx + ancho / 3} ${sup + h0} ${sx + ancho / 2} ${sup} C ${sx + ancho / 3} ${sup + h1} ${sx - ancho / 3} ${sup + h1} ${sx - ancho / 2} ${sup} Z`} fill={k % 2 ? '#bff3ff' : '#9fe6f5'} stroke="#3aa6c2" strokeWidth={3} />; })}
    {/* osteoclasto: célula gigante, morada, con varios núcleos, sobre el hueco */}
    {clastoO > 0 && <g transform={`translate(${clastoX} ${sup - 70 + hondo * 0.5})`} opacity={clastoO}>
      <path d={`M -200 60 C -230 -40 -120 -${110 + Math.sin(T * 3) * 8} 0 -100 C 130 -${110 + Math.cos(T * 3) * 8} 230 -40 200 60 C 120 ${80 + hondo * 0.3} -120 ${80 + hondo * 0.3} -200 60 Z`} fill={KC.lilac} stroke={KC.ink} strokeWidth={8} />
      {[[-90, -20], [-20, -45], [55, -15], [120, -40], [-140, 15]].map(([nx, ny], i) => <ellipse key={i} cx={nx} cy={ny} rx={26} ry={20} fill="#6b3fc0" stroke={KC.ink} strokeWidth={4} />)}
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={-170 + i * 30} y1={62} x2={-170 + i * 30 + Math.sin(T * 9 + i) * 5} y2={82} stroke={KC.ink} strokeWidth={5} />)}
      {/* ácido que disuelve (burbujitas) */}
      {cava < 0.99 && Array.from({ length: 8 }, (_, i) => <circle key={i} cx={-150 + i * 42} cy={95 + ((T * 60 + i * 13) % 50)} r={6} fill={KC.yellow} opacity=".8" />)}
    </g>}
    {/* osteoblastos: cubitos cian que llegan y forran el hueco */}
    {T > b && Array.from({ length: 9 }, (_, i) => { const u = (i + 0.5) / 9, llega = kprog(T, b + 0.2 + i * 0.08, b + 0.8 + i * 0.08, kEase.rebote);
      const px = sx - ancho / 2 + u * ancho, hh = 170 * (1 - relleno) * Math.sin(Math.PI * u) * 0.95;
      return <g key={i} transform={`translate(${px} ${klerp(sup - 420, sup + hh - 30, llega)})`}>
        <rect x={-20} y={-24} width={40} height={44} rx={8} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} /><circle cx={0} cy={-6} r={8} fill={KC.blue} /></g>; })}
  </svg>;
}

// Hueso largo (fémur esquemático) que se engrosa con el ejercicio.
function HuesoLargo({ x, y, s = 1, grosor = 0, rot = 0, color = HUESO }) {
  const w = 34 + grosor * 18;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M -${w} -260 L -${w} 260 M ${w} -260 L ${w} 260`} stroke={KC.ink} strokeWidth={10} />
    <rect x={-w} y={-260} width={w * 2} height={520} fill={color} />
    {[-1, 1].map((k) => <g key={k} transform={`translate(0 ${k * 290})`}><circle cx={-46} cy={0} r={58} fill={color} stroke={KC.ink} strokeWidth={10} /><circle cx={46} cy={0} r={58} fill={color} stroke={KC.ink} strokeWidth={10} /></g>)}
    <rect x={-w + 5} y={-262} width={w * 2 - 10} height={524} fill={color} />
    {grosor > 0 && [0.3, 0.6, 0.9].map((k, i) => grosor > k - 0.3 ? <path key={i} d={`M -${w - 6} ${-200 + i * 150} L ${w - 6} ${-190 + i * 150}`} stroke={KC.cyan} strokeWidth={6} opacity={kclamp((grosor - k + 0.3) / 0.3, 0, 1)} /> : null)}
  </g>;
}
function Pesa({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-12} width={300} height={24} rx={10} fill="#5c667a" stroke={KC.ink} strokeWidth={6} />
    {[-1, 1].map((k) => <g key={k}><rect x={k * 120 - 22} y={-70} width={44} height={140} rx={10} fill={KC.ink} /><rect x={k * 165 - 16} y={-50} width={32} height={100} rx={8} fill="#2b3445" /></g>)}
  </g>;
}
// Diente esquemático (para el 99 % del calcio).
function Diente({ x, y, s = 1 }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M -70 -80 C -90 -130 -40 -140 0 -115 C 40 -140 90 -130 70 -80 C 60 -30 55 20 45 90 C 40 120 15 120 10 80 C 5 50 -5 50 -10 80 C -15 120 -40 120 -45 90 C -55 20 -60 -30 -70 -80 Z" fill="#fffaf0" stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />;
}

function Esqueleto() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, V: CUES.Vivo, Cl: CUES.Clastos, Bl: CUES.Blastos, O: CUES.Obra, P: CUES.Pregunta, E: CUES.Estudio, D: CUES.Diez, Ca: CUES.Calcio, Ej: CUES.Ejercicio, Da: CUES.Dato, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: la calavera llega girando (de perfil a frente) en el cuadro 0
  const giraG = Math.max(0.12, Math.abs(Math.cos(Math.PI * (1 - kprog(T, K.G, K.G + 1.1, kEase.sale)))));
  const llega = kprog(T, K.G, K.G + 0.7, kEase.rebote);
  // viaje macro → micro: zoom sobre la frente al empezar "Vivo"
  const zoomV = kprog(T, K.V - 0.2, K.V + 1.3, kEase.suave);
  const zEsc = T < K.V + 1.3 ? Math.exp(klerp(0, Math.log(600), zoomV)) : (T < K.O ? (T < K.Cl ? 600 : 1500) : 1);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: calaverita de Día de Muertos que gira; rayos X: hueso vivo */}
      <Escena T={T} a={K.G} b={K.V + 0.9} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <PapelPicado T={T} />
        <div style={{ position:'absolute', inset:0, transformOrigin:'400px 900px', transform:`scale(${Math.exp(zoomV * Math.log(30))})`, opacity:1 - kprog(T, K.V + 0.5, K.V + 0.9) }}>
          {svg(<Calavera T={T} x={400} y={1010} s={klerp(0.3, 1.0, llega)} gira={giraG} />)}
        </div>
      </Escena>
      <Lupa T={T} at={K.G + 2.0} until={K.V - 0.3} x={780} y={1580} r={170} fx={400} fy={1000} tinte={KC.cyan} etiqueta="hueso vivo"
        interior={(Tl, r) => <svg width={r * 2} height={r * 2} viewBox="0 400 1080 1080" preserveAspectRatio="xMidYMid slice"><g><HuesoCortePlano T={Tl} /></g></svg>} />

      {/* 2 · por dentro: periostio con vasos y nervios, osteonas con su canal */}
      <Escena T={T} a={K.V + 0.6} b={K.Cl} zoom={0.05}>
        <HuesoCorte T={T} />
      </Escena>
      {/* 3–4 · el osteoclasto excava, los osteoblastos rellenan */}
      <Escena T={T} a={K.Cl} b={K.O} zoom={0.04}>
        <Superficie T={T} a={K.Cl} b={K.Bl} />
      </Escena>
      {/* 5 · la obra que nunca termina: ~10 % en obra */}
      <Escena T={T} a={K.O} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>
          <HuesoLargo x={300} y={1020} s={0.85} rot={-12} />
          {[[140, 1290], [470, 1290], [610, 760]].map(([cx, cy], i) => <g key={i} transform={`translate(${cx} ${cy}) scale(${kprog(T, K.O + 0.3 + i * 0.25, K.O + 0.6 + i * 0.25, kEase.rebote)})`}>
            <path d="M -40 40 L 0 -70 L 40 40 Z" fill={KC.orange} stroke={KC.ink} strokeWidth={6} /><rect x={-26} y={-12} width={52} height={14} fill="#fff" /><rect x={-56} y={36} width={112} height={18} rx={4} fill={KC.ink} /></g>)}
          <g transform={`rotate(-12 300 1020)`}><rect x={180} y={kprog(T, K.O + 0.8, K.O + 1.4) > 0 ? 940 : -999} width={240 * kprog(T, K.O + 0.8, K.O + 1.4)} height={40} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
            {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M ${190 + i * 40} 940 l 20 0 l -20 40 l -20 0 z`} fill={KC.ink} opacity={kprog(T, K.O + 0.8, K.O + 1.4)} />)}</g>
        </>)}
        <Cuadricula T={T} cols={10} filas={10} llenado={(t) => 1} tramos={[{ desde: 0, hasta: 0.1 * kprog(T, K.O + 1.5, K.O + 3.0), color: KC.orange }]} lleno={HUESO} x={600} y={900} ancho={400} alto={400} />
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>
      {/* 7 · el estudio (revisión de 2013) */}
      <Escena T={T} a={K.E} b={K.D}>
        <FondoLunares color={KC.orange} />
        {svg(<g opacity=".9"><Calavera T={T} x={540} y={1560} s={0.45} /></g>)}
      </Escena>
      {/* 8 · cada ~10 años: el esqueleto se pinta de nuevo */}
      <Escena T={T} a={K.D} b={K.Ca} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          {Array.from({ length: 10 }, (_, i) => { const on = kprog(T, K.D + 0.4 + i * 0.28, K.D + 0.6 + i * 0.28);
            return <g key={i} transform={`translate(${110 + (i % 5) * 215} ${800 + Math.floor(i / 5) * 290})`}>
              <rect x={-80} y={-100} width={160} height={200} rx={18} fill="#fff" stroke={KC.ink} strokeWidth={6} />
              <rect x={-80} y={-100} width={160} height={50} rx={18} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
              <text x={0} y={50} textAnchor="middle" style={{ font:`400 80px ${KF.titulo}` }} fill={KC.ink}>{i + 1}</text>
              <path d="M -50 70 L 50 -60" stroke={KC.mint} strokeWidth={14} strokeLinecap="round" opacity={on} />
            </g>; })}
        </>)}
        <Chip T={T} at={K.D + 3.0} until={K.Ca - 0.3} texto="años" x={540} y={1520} tam={40} borde={KC.ink} />
      </Escena>
      {/* 9 · 99 % del calcio en huesos y dientes */}
      <Escena T={T} a={K.Ca} b={K.Ej}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg(<>
          <HuesoLargo x={330} y={1020} s={0.75} rot={8} />
          <Diente x={790} y={1000} s={1.3} />
          {Array.from({ length: 26 }, (_, i) => { const r = krng(i + 3), u = kprog(T, K.Ca + 0.6 + r() * 2.5, K.Ca + 1.6 + r() * 2.5, kEase.suave), tx = i % 3 ? 330 + (r() - 0.5) * 60 : 790, ty = 1000 + (r() - 0.5) * 300;
            return u < 1 ? <g key={i} transform={`translate(${klerp(r() * KW, tx, u)} ${klerp(560 + r() * 200, ty, u)})`} opacity={1 - u * 0.6}><circle r={24} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /><text y={9} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.ink}>Ca</text></g> : null; })}
        </>)}
      </Escena>
      {/* 10 · ejercicio con peso: el hueso se refuerza */}
      <Escena T={T} a={K.Ej} b={K.Da}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <HuesoLargo x={300} y={1000} s={0.8} grosor={kprog(T, K.Ej + 1.2, K.Ej + 4.0)} />
          <g transform={`translate(0 ${-Math.abs(Math.sin((T - K.Ej) * 2.6)) * 160 * kprog(T, K.Ej + 0.4, K.Ej + 0.8)})`}><Pesa x={760} y={1150} s={1.1} /></g>
        </>)}
        <Etq T={T} at={K.Ej + 1.4} until={K.Da - 0.3} x={420} y={760} texto="más trabajo = más hueso" tam={30} color={KC.ink} />
      </Escena>
      {/* 11 · dato: ~300 al nacer → 206 de adulto */}
      <Escena T={T} a={K.Da} b={K.C}>
        <FondoLunares color={KC.yellow} />
        {svg(Array.from({ length: 300 }, (_, i) => { const c = i % 25, r = Math.floor(i / 25), x0 = 80 + c * 38, y0 = 760 + r * 38;
          const junta = i >= 206 ? kprog(T, K.Da + 1.6 + (i % 7) * 0.12, K.Da + 2.4 + (i % 7) * 0.12, kEase.suave) : 0;
          const j = i - 206, dst = (j * 7) % 206, tx = 80 + (dst % 25) * 38, ty = 760 + Math.floor(dst / 25) * 38;
          return junta < 1 ? <rect key={i} x={klerp(x0, tx, junta) - 14} y={klerp(y0, ty, junta) - 7} width={26} height={13} rx={6} fill={HUESO} stroke={KC.ink} strokeWidth={3} opacity={1 - junta * 0.3} /> : null; }))}
        <Contador T={T} at={K.Da + 1.5} desde={300} hasta={206} dur={1.6} x={540} y={1530} tam={110} color={KC.ink} />
        <Etq T={T} at={K.Da + 0.4} until={K.Da + 1.5} x={70} y={700} texto="al nacer: unos 300" tam={34} color={KC.ink} />
        <Etq T={T} at={K.Da + 3.2} until={K.C - 0.3} x={70} y={700} texto="de adulto: 206" tam={34} color={KC.ink} />
      </Escena>
      {/* 12 · cierre: la misma calavera, ya entendida: obra viva */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <PapelPicado T={T} />
        {svg(<Calavera T={T} x={400} y={1010} s={1.0} brilla={kprog(T, K.C + 1.0, K.C + 2.0)} />)}
      </Escena>
      <Lupa T={T} at={K.C + 2.2} until={K.Ou - 0.2} x={780} y={1580} r={170} fx={400} fy={1000} tinte={KC.mint} etiqueta="en obra"
        interior={(Tl, r) => <svg width={r * 2} height={r * 2} viewBox="200 650 680 680" preserveAspectRatio="xMidYMid slice"><SuperficieRelleno T={Tl} /></svg>} />

      {/* escala real (macro y micro) */}
      {T < K.O && T > K.G + 0.6 && <Escala T={T} z={zEsc} pxPorMm={PX_MM} />}

      {/* textos */}
      <Chip T={T} at={K.G + 0.3} until={K.V - 0.3} texto="Especial Día de Muertos" x={300} y={470} tam={36} borde={KC.pink} />
      <Etq T={T} at={K.V + 1.6} until={K.Cl - 0.3} x={60} y={560} texto="periostio: nervios y vasos" tam={30} />
      <Etq T={T} at={K.V + 2.4} until={K.Cl - 0.3} x={1030} y={1060} texto="osteona" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.V + 3.0} until={K.Cl - 0.3} x={60} y={1580} texto="células del hueso" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Cl + 0.6} until={K.Bl - 0.1} x={60} y={700} texto="osteoclasto (disuelve)" tam={32} color={KC.lilac} />
      <Etq T={T} at={K.Bl + 0.5} until={K.O - 0.3} x={60} y={700} texto="osteoblastos (rellenan)" tam={32} color={KC.cyan} />
      <Medidor T={T} at={K.O + 1.4} until={K.P - 0.3} valor={(t) => 0.1 * kprog(t, K.O + 1.5, K.O + 3.0)} etiqueta="en obra ahora" texto={(v) => '~' + Math.round(v * 100) + ' %'} x={90} y={470} ancho={900} color={KC.orange} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.D - 0.3} anio="2013" quien="Coates · revisión médica" revista="Australian Family Physician · Australia" y={820} />
      <NumeroGigante T={T} at={K.D + 0.2} until={K.Ca - 0.3} valor={10} dur={2.8} etiqueta="cada ~10 años" sufijo="" y={470} tam={150} />
      <Chip T={T} at={K.D + 2.4} until={K.Ca - 0.3} texto="casi todo renovado" x={540} y={1600} tam={40} borde={KC.mint} />
      <NumeroGigante T={T} at={K.Ca + 0.3} until={K.Ej - 0.3} valor={99} dur={1.4} sufijo=" %" etiqueta="del calcio de tu cuerpo" y={500} tam={170} />
      <Etq T={T} at={K.Ca + 1.6} until={K.Ej - 0.3} x={140} y={1490} texto="huesos" tam={32} />
      <Etq T={T} at={K.Ca + 1.9} until={K.Ej - 0.3} x={700} y={1490} texto="dientes" tam={32} />
      <Chip T={T} at={K.Ej + 0.5} until={K.Da - 0.3} texto="ejercicio con peso" x={540} y={1520} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.8} until={K.Ou} texto="obra viva" x={300} y={1560} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.V - 0.1} texto="No es un adorno: *eres tú por dentro.*" />
      <Subtitulo T={T} idx={1} at={K.V + 0.1} until={K.Cl - 0.1} texto="Hueso: *tejido vivo.*" />
      <Subtitulo T={T} idx={2} at={K.Cl + 0.1} until={K.Bl - 0.1} texto="Osteoclastos: *disuelven.*" />
      <Subtitulo T={T} idx={3} at={K.Bl + 0.1} until={K.O - 0.1} texto="Osteoblastos: *rellenan.*" />
      <Subtitulo T={T} idx={4} at={K.O + 0.1} until={K.P - 0.1} texto="Siempre hay *~10 % en obra.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Cada cuánto *estrenas esqueleto?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.D - 0.1} texto="Una revisión de *2013* dio la cuenta:" />
      <Subtitulo T={T} idx={7} at={K.D + 0.1} until={K.Ca - 0.1} texto="Cada ~10 años: *casi todo nuevo.*" />
      <Subtitulo T={T} idx={8} at={K.Ca + 0.1} until={K.Ej - 0.1} texto="*99 % del calcio:* huesos y dientes." />
      <Subtitulo T={T} idx={9} at={K.Ej + 0.1} until={K.Da - 0.1} texto="El hueso que trabaja *se refuerza.*" />
      <Subtitulo T={T} idx={10} at={K.Da + 0.1} until={K.C - 0.1} texto="Unos 300 al nacer, *206 de adulto.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="No es un adorno: *es una obra viva.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Vivo + 1.0, CUES.Vivo + 4.6, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Clastos + 0.5, CUES.Blastos + 3.0, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Diez + 0.4, CUES.Diez + 3.7, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Ejercicio + 0.5, CUES.Ejercicio + 4.8, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Dato + 0.6, CUES.Dato + 5.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.4, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="01" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

// Versiones "planas" (sin fondo completo) para dibujar dentro de la Lupa.
function HuesoCortePlano({ T }) {
  return <>{OSTEONAS.slice(0, 5).map(([cx, cy], i) => <g key={i}>
    {[150, 118, 88, 60].map((r, k) => <circle key={k} cx={cx} cy={cy} r={r} fill={k % 2 ? '#e8d6b0' : '#f3e6c8'} stroke="#b89c68" strokeWidth={3} />)}
    <circle cx={cx} cy={cy} r={32} fill={MEDULA} stroke={KC.ink} strokeWidth={4} />
    <circle cx={cx - 10} cy={cy} r={10} fill={KC.red} opacity={0.75 + 0.25 * Math.sin(T * 6 + i)} /><circle cx={cx + 11} cy={cy + 2} r={9} fill="#3c5bd6" />
  </g>)}</>;
}
function SuperficieRelleno({ T }) {
  const u = (T * 0.6) % 1;
  return <>
    <rect x={0} y={0} width={KW} height={980} fill={MEDULA} />
    <rect x={0} y={980} width={KW} height={600} fill={HUESO} />
    {Array.from({ length: 5 }, (_, k) => k < u * 5 ? <rect key={k} x={360} y={1150 - k * 34} width={360} height={30} fill={k % 2 ? '#bff3ff' : '#9fe6f5'} /> : null)}
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={370 + i * 50} y={1110 - u * 170} width={40} height={40} rx={8} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} />)}
  </>;
}

function EsqueletoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Esqueleto /></CompositionStage></div>;
}
window.EsqueletoApp = EsqueletoApp;
