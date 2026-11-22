// Shot Científico #31 · Respiras más por un lado de la nariz, y se turnan — NARRADO (N1 "Por dentro" + participación).
// Datos: Pendolino et al. 2018 (Rhinology Online), Hasegawa y Kern 1977 (Mayo Clin. Proc.), Eccles 1996 (Acta Otolaryngol.).
// Ver guion.md y verificacion.md. Dibujo esquemático: los cornetes, la sangre y el aire no van a escala.
const NZ_PIEL = '#f1b48f', NZ_PIEL2 = '#d98f6b', NZ_HOYO = '#5a1f22', NZ_ROSA = '#f27fa0', NZ_SANGRE = '#c8102e', NZ_HUESO = '#f1e6c8', NZ_AIRE = '#bfe9ff';

// Cambio suave entre dos estados: 0 antes de a, 1 después de b.
const nzSw = (T, a, b) => kprog(T, a, b, kEase.suave);

// Corriente de aire que entra (de x0,y0 a x1,y1). w 0..1 = cuánto aire pasa (grosor).
function FlujoAire({ T, x0, y0, x1, y1, w = 1, color = KC.cyan, seed = 1 }) {
  if (w < 0.04) return null;
  const sw = 14 + 78 * w, mx = (x0 + x1) / 2 + Math.sin(T * 2 + seed) * 18, my = (y0 + y1) / 2;
  const d = `M ${x0} ${y0} Q ${mx} ${my} ${x1} ${y1}`, a = Math.atan2(y1 - my, x1 - mx) * 180 / Math.PI;
  return <g opacity={kclamp(w * 3, 0, 1)}>
    <path d={d} fill="none" stroke={KC.ink} strokeWidth={sw + 12} strokeLinecap="round" />
    <path d={d} fill="none" stroke="#ffffff" strokeWidth={sw} strokeLinecap="round" />
    <path d={d} fill="none" stroke={color} strokeWidth={sw * 0.4} strokeLinecap="round" strokeDasharray="26 34" strokeDashoffset={-T * 170} />
    <path d={`M 0 0 L ${-sw * 0.9} ${-sw * 0.85} L ${-sw * 0.9} ${sw * 0.85} Z`} transform={`translate(${x1} ${y1}) rotate(${a})`} fill="#fff" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
  </g>;
}

// Dedo que tapa un lado (en coordenadas de la nariz). lado -1 izquierda de la pantalla, +1 derecha. p 0..1 = cuánto entra.
function Dedo({ lado = -1, p = 0 }) {
  if (p <= 0.01) return null;
  const off = (1 - p) * 420;
  return <g transform={`scale(${lado < 0 ? 1 : -1} 1) translate(${-off} 0)`}>
    <rect x={-560} y={-20} width={420} height={86} rx={43} fill={NZ_PIEL} stroke={KC.ink} strokeWidth={9} transform="rotate(-8 -150 20)" />
    <rect x={-215} y={-6} width={56} height={56} rx={20} fill="#fbe2d2" stroke={KC.ink} strokeWidth={5} transform="rotate(-8 -150 20)" />
    {[-330, -420].map((x) => <path key={x} d={`M ${x} -8 Q ${x + 10} 24 ${x} 56`} fill="none" stroke={NZ_PIEL2} strokeWidth={6} strokeLinecap="round" transform="rotate(-8 -150 20)" />)}
  </g>;
}

// Cara de frente con nariz grande. (x, y) = base de la nariz. fl, fr: aire por cada lado (0..1). tl, tr: tapado (0..1).
// dl, dr: dedo que tapa. roja: punta roja (gripa). cansado: párpados a media asta. largo: largo de las corrientes.
function NarizGrande({ T, x, y, s = 1, fl = 0, fr = 0, tl = 0, tr = 0, dl = 0, dr = 0, roja = 0, cansado = 0, largo = 380, cara = true }) {
  const parpa = cansado > 0 ? cansado : (T % 4.3 < 0.12 ? 1 : 0);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {cara && <>
      <ellipse cx={0} cy={-250} rx={440} ry={600} fill={NZ_PIEL} stroke={KC.ink} strokeWidth={12} />
      <path d="M -440 -330 C -470 -800 470 -800 440 -330 C 360 -600 -360 -600 -440 -330 Z" fill={CPELO} stroke={KC.ink} strokeWidth={9} />
      <circle cx={-265} cy={-140} r={70} fill={KC.pink} opacity={0.18 + roja * 0.25} />
      <circle cx={265} cy={-140} r={70} fill={KC.pink} opacity={0.18 + roja * 0.25} />
      {[-1, 1].map((k) => <g key={k}>
        <ellipse cx={k * 190} cy={-410} rx={58} ry={44} fill="#fff" stroke={KC.ink} strokeWidth={8} />
        <circle cx={k * 190 + k * 6} cy={-404} r={22} fill={KC.ink} />
        <circle cx={k * 190 + k * 6 + 8} cy={-412} r={7} fill="#fff" />
        {parpa > 0 && <path d={`M ${k * 190 - 62} -410 L ${k * 190 - 62} -456 L ${k * 190 + 62} -456 L ${k * 190 + 62} -410 Z`} transform={`translate(0 ${-4 + 44 * (1 - parpa) * -1})`} fill={NZ_PIEL} stroke={KC.ink} strokeWidth={7} />}
        <path d={`M ${k * 120} -485 Q ${k * 190} ${cansado > 0 ? -490 : -515} ${k * 255} -480`} fill="none" stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
      </g>)}
      <path d="M -120 330 Q 0 380 120 330" fill="none" stroke={KC.ink} strokeWidth={11} strokeLinecap="round" />
    </>}
    <path d="M -60 -470 C -70 -330 -110 -200 -150 -60" fill="none" stroke={NZ_PIEL2} strokeWidth={11} strokeLinecap="round" />
    <path d="M 60 -470 C 70 -330 110 -200 150 -60" fill="none" stroke={NZ_PIEL2} strokeWidth={11} strokeLinecap="round" />
    <path d="M -150 -60 C -235 -40 -240 95 -150 108 C -110 140 -40 126 0 132 C 40 126 110 140 150 108 C 240 95 235 -40 150 -60 C 110 -150 -110 -150 -150 -60 Z" fill={NZ_PIEL} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={0} cy={-20} rx={78} ry={66} fill={roja > 0 ? '#ff6b6b' : '#f7c7a6'} opacity={0.55 + roja * 0.4} />
    <path d="M -150 -55 C -112 -30 -106 40 -132 84" fill="none" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <path d="M 150 -55 C 112 -30 106 40 132 84" fill="none" stroke={KC.ink} strokeWidth={7} strokeLinecap="round" />
    <FlujoAire T={T} x0={-150} y0={92 + largo} x1={-64} y1={112} w={fl} seed={1} />
    <FlujoAire T={T} x0={150} y0={92 + largo} x1={64} y1={112} w={fr} seed={2} />
    {[[-1, tl, dl], [1, tr, dr]].map(([k, t, dd]) => { const cerr = Math.max(t * 0.6, dd * 0.75);
      return <g key={k}>
        <ellipse cx={k * 64} cy={94} rx={36} ry={20 * (1 - cerr)} fill={NZ_HOYO} stroke={KC.ink} strokeWidth={5} transform={`rotate(${k * 16} ${k * 64} 94)`} />
        {t > 0.02 && <ellipse cx={k * 64} cy={94} rx={44 * (0.6 + 0.4 * t)} ry={26 * (0.6 + 0.4 * t)} fill="#e05570" stroke={KC.ink} strokeWidth={6} opacity={t} transform={`rotate(${k * 16} ${k * 64} 94)`} />}
      </g>; })}
    <Dedo lado={-1} p={dl} />
    <Dedo lado={1} p={dr} />
  </g>;
}

// Un cornete: lámina de hueso pegada a la pared, forrada de tejido rosado que se infla con sangre (h 0..1).
function Cornete({ T, wx, y, dir = 1, L = 160, grueso = 34, h = 0, seed = 1 }) {
  const cx = wx + dir * L * 0.42, rx = L * 0.42 + 58 * h, ry = grueso * (0.75 + 0.7 * h), cxx = cx + dir * 58 * h * 0.5;
  const col = h > 0.5 ? '#ea5f86' : NZ_ROSA, g = krng(seed), n = Math.round(3 + 11 * h);
  return <g>
    <ellipse cx={cxx} cy={y + 8} rx={rx} ry={ry} fill={col} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: n }, (_, i) => { const a = g() * 6.28, rr = g() * 0.7, ph = (T * 0.8 + g()) % 1;
      return <circle key={i} cx={cxx + Math.cos(a + ph * 2) * rx * rr} cy={y + 8 + Math.sin(a + ph * 2) * ry * rr} r={4 + 3 * h} fill={NZ_SANGRE} opacity={0.85} />; })}
    <path d={`M ${wx} ${y - 6} C ${wx + dir * L * 0.4} ${y - 22} ${wx + dir * L * 0.75} ${y - 16} ${wx + dir * L * 0.78} ${y + 8} C ${wx + dir * L * 0.8} ${y + 26} ${wx + dir * L * 0.6} ${y + 30} ${wx + dir * L * 0.55} ${y + 18}`}
      fill="none" stroke={NZ_HUESO} strokeWidth={10} strokeLinecap="round" />
  </g>;
}

// Corte de la nariz por dentro (de frente), en un cuadro de 640 × 640. hl, hr = cuánto se inflan los cornetes de cada lado.
function CorteNariz({ T, hl = 0.3, hr = 0.3, gotas = 0, escoba = 0, zz = 0 }) {
  const wallL = [105, 76, 66], wallR = [535, 564, 574], ys = [190, 330, 470], Ls = [110, 160, 190], gs = [26, 34, 40];
  const aire = (lado, h) => { const g = krng(lado < 0 ? 5 : 9), n = Math.round(2 + 12 * (1 - h)), out = [];
    for (let i = 0; i < n; i++) { const x0 = lado < 0 ? 262 + g() * 26 : 352 + g() * 26, f = (T * 0.55 + g()) % 1;
      out.push(<circle key={i} cx={x0} cy={600 - f * 560} r={5 + g() * 4} fill="#fff" opacity={0.85 * Math.sin(Math.PI * f)} />); }
    return out; };
  return <g>
    <rect x={0} y={0} width={640} height={640} fill="#4a2232" />
    <path d="M 296 30 C 220 30 150 70 120 150 C 70 270 56 450 62 620 L 296 620 Z" fill={NZ_AIRE} stroke={KC.ink} strokeWidth={6} />
    <path d="M 344 30 C 420 30 490 70 520 150 C 570 270 584 450 578 620 L 344 620 Z" fill={NZ_AIRE} stroke={KC.ink} strokeWidth={6} />
    <rect x={296} y={24} width={48} height={600} fill={NZ_HUESO} stroke={KC.ink} strokeWidth={5} />
    <rect x={290} y={24} width={10} height={600} fill={NZ_ROSA} /><rect x={340} y={24} width={10} height={600} fill={NZ_ROSA} />
    {aire(-1, hl)}{aire(1, hr)}
    {ys.map((y, i) => <Cornete key={'l' + i} T={T} wx={wallL[i]} y={y} dir={1} L={Ls[i]} grueso={gs[i]} h={hl} seed={10 + i} />)}
    {ys.map((y, i) => <Cornete key={'r' + i} T={T} wx={wallR[i]} y={y} dir={-1} L={Ls[i]} grueso={gs[i]} h={hr} seed={20 + i} />)}
    {gotas > 0 && Array.from({ length: 9 }, (_, i) => { const g = krng(40 + i), f = (T * 0.7 + g()) % 1, x = 90 + g() * 170, y = 120 + g() * 420;
      return <path key={i} d={`M ${x} ${y - 16} C ${x + 12} ${y} ${x + 12} ${y + 12} ${x} ${y + 12} C ${x - 12} ${y + 12} ${x - 12} ${y} ${x} ${y - 16} Z`} transform={`translate(0 ${f * 20})`}
        fill="#7fd3ff" stroke={KC.ink} strokeWidth={3} opacity={gotas * Math.sin(Math.PI * f)} />; })}
    {escoba > 0 && (() => { const yy = 560 - ((T * 0.5) % 1) * 420, sw = Math.sin(T * 9) * 12;
      return <g transform={`translate(262 ${yy}) rotate(${-20 + sw})`} opacity={escoba}>
        <rect x={-6} y={-130} width={12} height={110} rx={5} fill="#a0662c" stroke={KC.ink} strokeWidth={4} />
        <path d="M -24 -24 L 24 -24 L 34 30 L -34 30 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
        {[-20, -7, 7, 20].map((x) => <line key={x} x1={x} y1={-18} x2={x * 1.3} y2={26} stroke="#c9a200" strokeWidth={3} />)}
      </g>; })()}
    {zz > 0 && ['z', 'z', 'Z'].map((c, i) => { const f = (T * 0.6 + i * 0.33) % 1;
      return <text key={i} x={140 + i * 30} y={110 - f * 60} style={{ font:`400 ${30 + i * 10}px ${KF.titulo}` }} fill="#fff" stroke={KC.ink} strokeWidth={4} paintOrder="stroke" opacity={zz * Math.sin(Math.PI * f)}>{c}</text>; })}
  </g>;
}

// Reloj de pared con manecillas que corren (vel = vueltas por segundo del minutero).
function Reloj({ T, x, y, r = 90, vel = 0.5, color = KC.paper, borde = KC.ink, o = 1 }) {
  const am = T * vel * 360, ah = am / 12;
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <circle r={r} fill={color} stroke={borde} strokeWidth={r * 0.1} />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-r * 0.78} x2={0} y2={-r * (i % 3 ? 0.7 : 0.62)} stroke={KC.ink} strokeWidth={r * 0.05} strokeLinecap="round" transform={`rotate(${i * 30})`} />)}
    <line x1={0} y1={0} x2={0} y2={-r * 0.45} stroke={KC.ink} strokeWidth={r * 0.09} strokeLinecap="round" transform={`rotate(${ah})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.7} stroke={KC.red} strokeWidth={r * 0.06} strokeLinecap="round" transform={`rotate(${am})`} />
    <circle r={r * 0.08} fill={KC.ink} />
  </g>;
}

// Cama con una persona acostada de lado, viendo a la cámara (cabeza a la izquierda). tb = tapado del lado de abajo.
function Acostada({ T, tb = 0, fArriba = 0.8 }) {
  const resp = Math.sin(T * 1.6) * 6;
  return <g>
    <rect x={40} y={1010} width={1000} height={110} rx={30} fill="#fff" stroke={KC.ink} strokeWidth={9} />
    <rect x={40} y={1100} width={1000} height={70} rx={14} fill="#8a5a3c" stroke={KC.ink} strokeWidth={9} />
    <path d="M 30 1010 C 10 880 120 850 330 870 C 420 880 440 960 420 1010 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <path d={`M 470 1012 C 480 ${880 + resp} 640 ${820 + resp} 820 ${850 + resp} C 960 ${870 + resp} 1030 920 1030 1012 Z`} fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
    <path d={`M 560 ${930 + resp} C 650 ${900 + resp} 760 ${905 + resp} 880 ${935 + resp}`} fill="none" stroke="#1a35c9" strokeWidth={8} strokeLinecap="round" />
    <g transform="translate(300 850) rotate(-90) scale(0.34)">
      <NarizGrande T={T} x={0} y={0} s={1} fl={fArriba * (1 - 0) * 0} fr={0} tl={tb} cansado={0.6} largo={0} />
    </g>
    <FlujoAire T={T} x0={600} y0={700} x1={346} y1={824} w={fArriba} seed={4} />
  </g>;
}

function Nariz() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  const NX = 540, NY = 800, NS = 0.85, NL = 300;
  // gancho: el lado grueso se intercambia
  const gL = 1 - nzSw(T, 2.6, 3.7) + nzSw(T, 5.4, 6.4);
  // prueba: tapa un lado (dedo izq.) y luego el otro (dedo der.)
  const P = K.Prueba, d1 = kprog(T, P + 0.4, P + 0.9, kEase.sale) * (1 - kprog(T, P + 2.4, P + 2.8)), d2 = kprog(T, P + 2.8, P + 3.3, kEase.sale) * (1 - kprog(T, K.Cornetes - 0.3, K.Cornetes + 0.1));
  // turno: un lado se hincha y el otro se deshincha, luego cambian
  const tA = nzSw(T, K.Turno + 0.9, K.Turno + 2.6) - nzSw(T, K.Turno + 3.6, K.Turno + 5.0);
  const hlT = klerp(0.15, 0.9, tA), hrT = klerp(0.9, 0.15, tA);
  // ciclo: sigue turnándose despacio
  const cA = 0.5 + 0.5 * Math.sin((T - K.Ciclo) * 1.1 - Math.PI / 2);
  // total: los dos lados se turnan poco a poco; el total casi no cambia
  const tt = 0.5 + 0.32 * Math.sin((T - K.Total) * 0.9);
  // gripa: lo tapado salta de lado
  const G = K.Gripa, gpL = 1 - nzSw(T, G + 2.3, G + 2.7) + nzSw(T, G + 4.4, G + 4.8);
  // cierre: dos relojes, uno por lado
  const cL = 0.5 + 0.5 * Math.cos((T - K.Cierre) * 1.4);
  const corte = (hl, hr, extra = {}) => (Tl, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 640 640"><CorteNariz T={Tl} hl={hl} hr={hr} {...extra} /></svg>;
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.pink }}>
      {/* 0 · gancho: la nariz y dos corrientes que se intercambian */}
      <Escena T={T} a={K.Gancho} b={K.Prueba} fondo={KC.pink} zoom={0.02}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <NarizGrande T={T} x={NX} y={NY} s={NS} largo={NL} fl={klerp(0.18, 1, gL)} fr={klerp(1, 0.18, gL)} />
        </Lienzo>
      </Escena>
      {/* 1 · la prueba: tápate un lado y luego el otro */}
      <Escena T={T} a={K.Prueba} b={K.Cornetes} fondo={KC.yellow} zoom={0.02}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <NarizGrande T={T} x={NX} y={NY} s={NS} largo={NL} dl={d1} dr={d2} fl={0.12 + 0.3 * d2} fr={0.12 + 0.73 * d1} />
          {[[930, 'lado 1', 0.85, 0, KC.cyan], [150, 'lado 2', 0.42, 0, KC.orange]].map(([x, lbl, v, on, col]) => { const at = lbl === 'lado 1' ? P + 0.9 : P + 3.3, k = kprog(T, at, at + 0.9, kEase.sale);
            return <g key={lbl} opacity={kprog(T, P + 0.3, P + 0.6)}>
              <rect x={x - 45} y={560} width={90} height={420} rx={40} fill="rgba(14,15,18,.75)" stroke={KC.ink} strokeWidth={8} />
              <rect x={x - 32} y={970 - 400 * v * k} width={64} height={Math.max(0, 400 * v * k - 3)} rx={30} fill={col} />
              <TextoSvg x={x} y={1040} tam={40} fuente="texto" color={KC.texto}>{lbl}</TextoSvg>
            </g>; })}
        </Lienzo>
        <Chip T={T} at={P + 0.2} until={K.Cornetes - 0.1} texto="tápate un lado y respira" x={540} y={330} tam={44} borde={KC.ink} />
        <Etq T={T} at={P + 4.0} until={K.Cornetes - 0.1} x={880} y={520} texto="pasa más aire" lado="izq" color={KC.texto} tam={34} />
      </Escena>
      {/* 2 · por dentro: los cornetes forrados de tejido que se llena de sangre */}
      <Escena T={T} a={K.Cornetes} b={K.Turno} fondo={KC.pink} zoom={0.06} origen="50% 40%">
        <FondoLunares color={KC.pink} />
        <Lienzo><NarizGrande T={T} x={NX} y={NY} s={NS} largo={NL} fl={0.4} fr={0.4} /></Lienzo>
        <Lupa T={T} at={K.Cornetes + 0.1} until={K.Turno + 0.3} x={540} y={560} r={330} fx={540} fy={740} tinte={KC.cyan}
          etiqueta="POR DENTRO · NARIZ" interior={corte(0.25 + 0.5 * (0.5 + 0.5 * Math.sin((T - K.Cornetes) * 2.2)), 0.25 + 0.5 * (0.5 + 0.5 * Math.sin((T - K.Cornetes) * 2.2)))} />
        <Etq T={T} at={K.Cornetes + 1.2} until={K.Turno - 0.1} x={300} y={500} texto="cornetes" lado="izq" color={KC.texto} tam={36} />
        <Chip T={T} at={K.Cornetes + 2.4} until={K.Turno - 0.1} texto="tejido que se llena de sangre" x={540} y={1110} tam={40} borde={NZ_SANGRE} />
      </Escena>
      {/* 3 · el turno: un lado se hincha y el otro se deshincha */}
      <Escena T={T} a={K.Turno} b={K.Ciclo} fondo={KC.dark} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <g transform="translate(204 440) scale(1.05)"><CorteNariz T={T} hl={hlT} hr={hrT} /></g>
          <Reloj T={T} x={900} y={330} r={70} vel={0.6} />
          {(() => { const o = kprog(T, K.Turno + 1.4, K.Turno + 1.8) * (1 - kprog(T, K.Turno + 3.3, K.Turno + 3.6)), o2 = kprog(T, K.Turno + 4.4, K.Turno + 4.8);
            return <g>
              <TextoSvg x={380} y={1070} tam={40} fuente="texto" color={KC.pink} o={Math.max(o, o2 * 0)}>se hincha</TextoSvg>
              <TextoSvg x={700} y={1070} tam={40} fuente="texto" color={KC.cyan} o={o}>se deshincha</TextoSvg>
              <TextoSvg x={380} y={1070} tam={40} fuente="texto" color={KC.cyan} o={o2}>se deshincha</TextoSvg>
              <TextoSvg x={700} y={1070} tam={40} fuente="texto" color={KC.pink} o={o2}>se hincha</TextoSvg>
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Turno + 0.2} until={K.Turno + 3.4} texto="tu sistema nervioso" x={430} y={330} tam={42} borde={KC.cyan} />
        <Chip T={T} at={K.Turno + 3.7} until={K.Ciclo - 0.1} texto="y luego cambian" x={430} y={330} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 4 · ciclo nasal: cada turno, de media hora a varias horas */}
      <Escena T={T} a={K.Ciclo} b={K.Pregunta} fondo={KC.dark} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <g transform="translate(204 440) scale(1.05)" opacity={0.35}><CorteNariz T={T} hl={klerp(0.15, 0.9, cA)} hr={klerp(0.9, 0.15, cA)} /></g>
          <g transform={`translate(540 800) scale(${klerp(0.3, 1, kprog(T, K.Ciclo + 1.6, K.Ciclo + 2.1, kEase.rebote))})`} opacity={kprog(T, K.Ciclo + 1.6, K.Ciclo + 1.8)}>
            <Reloj T={T} x={0} y={0} r={210} vel={0.9} />
          </g>
        </Lienzo>
        <Chip T={T} at={K.Ciclo + 0.2} until={K.Pregunta - 0.1} texto="ciclo nasal" x={540} y={420} tam={70} borde={KC.gold} />
        <Chip T={T} at={K.Ciclo + 2.4} until={K.Pregunta - 0.1} texto="de media hora a varias horas" x={540} y={1110} tam={42} borde={KC.cyan} />
      </Escena>
      {/* 5 · ¿y por qué no lo notas? */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Total} color={KC.lilac} />
      {/* 6 · el aire total casi no cambia */}
      <Escena T={T} a={K.Total} b={K.Para} fondo={KC.mint} zoom={0.02}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g opacity={kprog(T, K.Total - 0.2, K.Total + 0.3)}><NarizGrande T={T} x={540} y={560} s={0.55} fl={tt} fr={1 - tt} largo={330} /></g>
          {(() => { const k = kprog(T, K.Total + 1.0, K.Total + 1.6, kEase.sale), X = 90, W = 900, Y = 930, wl = W * tt * k;
            return <g opacity={kprog(T, K.Total + 1.0, K.Total + 1.3)}>
              <rect x={X - 8} y={Y - 8} width={W + 16} height={116} rx={30} fill="rgba(14,15,18,.75)" stroke={KC.ink} strokeWidth={8} />
              <rect x={X} y={Y} width={wl} height={100} rx={22} fill={KC.cyan} />
              <rect x={X + wl} y={Y} width={(W - wl) * k} height={100} rx={22} fill={KC.orange} />
              <line x1={X + wl} y1={Y - 14} x2={X + wl} y2={Y + 114} stroke={KC.ink} strokeWidth={8} />
              <TextoSvg x={X + 20} y={Y - 26} tam={40} fuente="texto" ancla="start" color={KC.texto}>lado 1</TextoSvg>
              <TextoSvg x={X + W - 20} y={Y - 26} tam={40} fuente="texto" ancla="end" color={KC.texto}>lado 2</TextoSvg>
              <path d={`M ${X} ${Y + 130} L ${X} ${Y + 150} L ${X + W} ${Y + 150} L ${X + W} ${Y + 130}`} fill="none" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" opacity={kprog(T, K.Total + 2.4, K.Total + 2.8)} />
            </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Total + 2.6} until={K.Para - 0.1} texto="total: casi igual" x={540} y={1150} tam={46} borde={KC.yellow} />
      </Escena>
      {/* 7 · ¿para qué sirve? se cree que deja descansar a cada lado */}
      <Escena T={T} a={K.Para} b={K.Acostado} fondo={KC.dark} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Lienzo>
          <g transform="translate(420 480) scale(0.95)"><CorteNariz T={T} hl={0.85} hr={0.2} zz={kprog(T, K.Para + 1.6, K.Para + 2.0)} gotas={kprog(T, K.Para + 3.0, K.Para + 3.4)} escoba={kprog(T, K.Para + 4.0, K.Para + 4.4)} /></g>
        </Lienzo>
        <Chip T={T} at={K.Para + 0.9} until={K.Acostado - 0.1} texto="se cree" x={540} y={360} tam={56} borde={KC.orange} />
        <Etq T={T} at={K.Para + 1.8} until={K.Acostado - 0.1} x={470} y={590} texto="descansa" lado="izq" color={KC.texto} tam={32} />
        <Etq T={T} at={K.Para + 3.1} until={K.Acostado - 0.1} x={470} y={800} texto="se humedece" lado="izq" color={NZ_AIRE} tam={32} />
        <Etq T={T} at={K.Para + 4.1} until={K.Acostado - 0.1} x={470} y={1000} texto="se limpia" lado="izq" color={KC.yellow} tam={32} />
      </Escena>
      {/* 8 · acostado de lado: a veces se tapa el lado de abajo */}
      <Escena T={T} a={K.Acostado} b={K.Gripa} fondo={KC.lilac} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <g transform="translate(860 470)"><circle r={80} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} /><circle cx={36} cy={-22} r={74} fill={KC.lilac} /></g>
          <Acostada T={T} tb={kprog(T, K.Acostado + 1.8, K.Acostado + 2.6)} fArriba={0.75} />
        </Lienzo>
        <Etq T={T} at={K.Acostado + 2.6} until={K.Gripa - 0.1} x={352} y={880} texto="lado de abajo: tapado" lado="der" color={KC.texto} tam={34} />
        <Chip T={T} at={K.Acostado + 0.4} until={K.Gripa - 0.1} texto="a veces" x={540} y={360} tam={46} borde={KC.ink} />
      </Escena>
      {/* 9 · con gripa: lo tapado salta de un lado al otro durante el día */}
      <Escena T={T} a={K.Gripa} b={K.Cierre} fondo={KC.orange} zoom={0.02}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <path d="M 140 560 Q 540 400 940 560" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth={8} strokeDasharray="16 16" />
          {(() => { const f = kprog(T, G + 0.4, K.Cierre - 0.2), x = klerp(140, 940, f), y = 560 - 160 * 4 * f * (1 - f) * 0.5 * 2; return <SolDibujo x={x} y={y} r={46} T={T} />; })()}
          <NarizGrande T={T} x={NX} y={960} s={0.8} roja={1} cansado={0.55} tl={gpL * kprog(T, G + 0.6, G + 1.0)} tr={1 - gpL} fl={0.08 + 0.8 * (1 - gpL)} fr={0.08 + 0.8 * gpL * kprog(T, G + 0.6, G + 1.0)} largo={300} />
          {[G + 2.5, G + 4.6].map((t0, i) => T > t0 - 0.2 && T < t0 + 0.6 && <path key={i} d={`M ${i ? 610 : 470} 1020 Q 540 ${900 - 60 * Math.sin(Math.PI * kprog(T, t0 - 0.2, t0 + 0.2))} ${i ? 470 : 610} 1020`} fill="none" stroke={KC.ink} strokeWidth={8} strokeDasharray="14 12" opacity={1 - kprog(T, t0 + 0.2, t0 + 0.6)} />)}
        </Lienzo>
        <Chip T={T} at={G + 0.3} until={K.Cierre - 0.1} texto="con gripa: lo notas más" x={540} y={330} tam={42} borde={KC.ink} />
        <Etq T={T} at={G + 1.0} until={G + 2.3} x={470} y={1035} texto="tapado" lado="izq" color={KC.texto} tam={36} />
        <Etq T={T} at={G + 2.75} until={G + 4.4} x={610} y={1035} texto="tapado" lado="der" color={KC.texto} tam={36} />
        <Etq T={T} at={G + 4.85} until={K.Cierre - 0.1} x={470} y={1035} texto="tapado" lado="izq" color={KC.texto} tam={36} />
      </Escena>
      {/* 10 · cierre: la nariz del inicio, ahora con dos relojes: tiene turnos */}
      <Escena T={T} a={K.Cierre} b={FIN} fondo={KC.pink} zoom={0.02}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <NarizGrande T={T} x={NX} y={NY} s={NS} largo={NL} fl={klerp(0.18, 1, cL)} fr={klerp(1, 0.18, cL)} />
          {[[150, 1020, -1], [930, 1020, 1]].map(([x, y, k]) => { const at = K.Cierre + (k < 0 ? 0.6 : 1.0), e = kprog(T, at, at + 0.45, kEase.rebote);
            return <g key={k} transform={`translate(${x} ${y}) scale(${klerp(0.2, 1, e)})`} opacity={kprog(T, at, at + 0.2)}>
              <Reloj T={T + (k < 0 ? 0 : 1.3)} x={0} y={0} r={100} vel={0.35} color={k < 0 ? KC.cyan : KC.yellow} />
            </g>; })}
        </Lienzo>
        <Chip T={T} at={K.Cierre + 1.8} until={K.Outro - 0.1} texto="como si fueran dos narices" x={540} y={330} tam={44} borde={KC.ink} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Prueba - 0.1} texto="Respiras más por *un lado.*" />
      <Subtitulo T={T} idx={1} at={K.Prueba + 0.1} until={K.Cornetes - 0.1} texto="Tápate un lado… *y luego el otro.*" />
      <Subtitulo T={T} idx={2} at={K.Cornetes + 0.1} until={K.Turno - 0.1} texto="Cornetes: se llenan *de sangre.*" />
      <Subtitulo T={T} idx={3} at={K.Turno + 0.1} until={K.Ciclo - 0.1} texto="Uno se hincha, *el otro no.*" />
      <Subtitulo T={T} idx={4} at={K.Ciclo + 0.1} until={K.Pregunta - 0.1} texto="Se llama *ciclo nasal.*" />
      <Subtitulo T={T} idx={5} at={K.Pregunta + 0.1} until={K.Total - 0.1} texto="¿Por qué *no lo notas?*" />
      <Subtitulo T={T} idx={6} at={K.Total + 0.1} until={K.Para - 0.1} texto="El total *casi no cambia.*" />
      <Subtitulo T={T} idx={7} at={K.Para + 0.1} until={K.Acostado - 0.1} texto="Se cree: *descansa cada lado.*" />
      <Subtitulo T={T} idx={8} at={K.Acostado + 0.1} until={K.Gripa - 0.1} texto="Acostado: *el de abajo se tapa.*" />
      <Subtitulo T={T} idx={9} at={K.Gripa + 0.1} until={K.Cierre - 0.1} texto="Con gripa, *lo tapado salta.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Tu nariz *tiene turnos.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Prueba + 0.5, K.Cornetes - 0.15, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Turno + 0.8, K.Ciclo - 0.1, 'avatar_12_perfil_serio', 'bajo-der'],
        [K.Pregunta + 0.05, K.Total + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [K.Total + 1.6, K.Para - 0.15, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Para + 0.5, K.Acostado - 0.1, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Acostado + 0.4, K.Gripa - 0.1, 'avatar_08_recostado_mano', 'izq-alto'],
        [K.Gripa + 1.0, K.Cierre - 0.1, 'avatar_10_serio_molesto', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="31" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function NarizApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Nariz /></CompositionStage></div>;
}
window.NarizApp = NarizApp;
