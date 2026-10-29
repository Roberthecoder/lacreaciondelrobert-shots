// Shot Fungi Mati #07 · El cañón de esporas (Pilobolus) — NARRADO (N3 "Capítulos y medidores" + viaje N1).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. Escala de los acercamientos: 1 mm = 200 px × s.
const PASTO = '#58c763';

// Un esporangióforo de Pilobolus. Base (trofocisto) en (0,0), crece hacia arriba. infla 0..1.2 = presión,
// dispara = 0..1 progreso del disparo (la bolsita sale volando), rot = inclinación hacia la luz (grados).
function Pilo({ x, y, s = 1, rot = 0, infla = 1, sale = 0, T = 0, brillo = 1, chorro = 0 }) {
  const H = 400, rx = 45 * (0.8 + 0.2 * infla), ry = 60 * (0.8 + 0.25 * infla), vy = -H - ry;
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rot})`}>
    <ellipse cx={0} cy={6} rx={46} ry={22} fill="#e9c35a" stroke={KC.ink} strokeWidth={5} />
    <rect x={-12} y={-H} width={24} height={H} rx={10} fill="rgba(225,245,255,.75)" stroke={KC.ink} strokeWidth={5} />
    <rect x={-13} y={-16} width={26} height={12} fill={KC.orange} opacity=".8" />
    {sale < 0.02 && <>
      <ellipse cx={0} cy={vy} rx={rx} ry={ry} fill="rgba(215,243,255,.7)" stroke={KC.ink} strokeWidth={6} />
      <ellipse cx={-rx * 0.35} cy={vy - ry * 0.35} rx={rx * 0.25} ry={ry * 0.18} fill="#fff" opacity={0.8 * brillo} />
      <rect x={-16} y={-H - 8} width={32} height={10} fill={KC.orange} opacity=".9" />
    </>}
    {sale >= 0.02 && sale < 0.5 && Array.from({ length: 8 }, (_, i) => { const a = -Math.PI / 2 + (i - 3.5) * 0.35, d = 30 + sale * 260; return <circle key={i} cx={Math.cos(a) * d} cy={vy + Math.sin(a) * d} r={9 * (1 - sale * 1.5)} fill="#c9eeff" stroke={KC.ink} strokeWidth={3} />; })}
    {chorro > 0 && <path d={`M 0 ${vy - ry} L 0 ${vy - ry - chorro * 700}`} stroke="#c9eeff" strokeWidth={10} strokeLinecap="round" opacity={0.7} />}
    <g transform={`translate(0 ${vy - ry - 14 - sale * 1600})`}>
      <ellipse cx={0} cy={0} rx={34} ry={24} fill={KC.ink} stroke="#000" strokeWidth={4} />
      <ellipse cx={-10} cy={-8} rx={9} ry={5} fill="#fff" opacity=".35" />
    </g>
  </g>;
}
// Caca de vaca (de frente, en el pasto).
function Boñiga({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={40} rx={330} ry={60} fill="rgba(0,0,0,.18)" />
    <path d="M -320 40 Q -330 -40 -200 -70 Q -120 -140 0 -120 Q 140 -150 220 -80 Q 330 -50 320 40 Z" fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
    <path d="M -230 -20 Q -120 -60 0 -40 Q 120 -70 230 -20" stroke="#4e341e" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Sol con rayos.
function Sol({ x, y, r = 80, T }) {
  return <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6 + T * 0.3; return <line key={i} x1={Math.cos(a) * (r + 14)} y1={Math.sin(a) * (r + 14)} x2={Math.cos(a) * (r + 46)} y2={Math.sin(a) * (r + 46)} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />; })}
    <circle r={r} fill={KC.yellow} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Vaca de perfil (cabeza y cuello).
function Vaca({ x, y, s = 1, mastica = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 260 -260 L 120 -120 L 160 40 L 400 40 L 400 -300 Z" fill="#fff" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M 300 -200 q 60 10 70 80 q -60 20 -90 -20 z" fill={KC.ink} />
    <rect x={-40} y={-120 + mastica * 6} width={230} height={150} rx={60} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <rect x={-60} y={-40 + mastica * 10} width={120} height={80} rx={36} fill="#f6a7b8" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-20} cy={-5 + mastica * 10} r={8} fill={KC.ink} /><circle cx={20} cy={-5 + mastica * 10} r={8} fill={KC.ink} />
    <circle cx={110} cy={-70} r={14} fill={KC.ink} />
    <path d="M 160 -110 q 50 -50 90 -20 q -30 40 -90 20 z" fill="#fff" stroke={KC.ink} strokeWidth={7} />
  </g>;
}

function Pilobolus() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, A: CUES.Apunta, Ca: CUES.Carga, D: CUES.Dispara, P: CUES.Pregunta, E: CUES.Estudio, V: CUES.Velocidad, Gr: CUES.Gravedad, Di: CUES.Distancia, Va: CUES.Vaca, Po: CUES.Polizon, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const giro = klerp(28, -18, kprog(T, K.A + 0.8, K.A + 3.2, kEase.suave));        // se voltea hacia el sol
  const infla = klerp(0.6, 1.25, kprog(T, K.Ca + 0.3, K.Ca + 3.6, kEase.suave));
  const sale = kprog(T, K.D + 1.6, K.D + 2.6);
  // gancho: en el pasto, una caca con gotitas; a los 0.6 s una dispara
  const disparoG = kprog(T, K.G + 0.5, K.G + 1.3);
  const POS = [[-210, -80], [-120, -110], [-30, -125], [60, -120], [150, -105], [230, -80], [-160, -40], [100, -60]];
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1–2 · gancho y el hongo: pasto, caca de vaca y gotitas que disparan */}
      <Escena T={T} a={K.G} b={K.A} zoom={0} >
        <FondoLunares color={KC.cyan} />
        <div style={{ position:'absolute', inset:0, transform:`scale(${klerp(1, 1.7, kprog(T, K.H, K.H + 2.5, kEase.suave))})`, transformOrigin:'52% 52%' }}>
          {fsvg(<>
            <rect x={-200} y={1060} width={1500} height={900} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M ${i * 30 - 40} 1065 l 10 -40 l 10 40`} fill={PASTO} stroke={KC.ink} strokeWidth={4} />)}
            <Sol x={190} y={480} r={62} T={T} />
            <Boñiga x={540} y={1050} />
            {POS.map(([dx, dy], i) => <Pilo key={i} T={T} x={540 + dx} y={1050 + dy} s={0.26} rot={-18 + mece(T, i, 0.3) * 3} sale={i === 2 ? disparoG : 0} infla={1} />)}
          </>)}
        </div>
      </Escena>
      {/* 3–5 · los tres capítulos: apunta, carga, dispara (acercamiento a un solo esporangióforo) */}
      <Escena T={T} a={K.A} b={K.P} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Sol x={190} y={560} r={62} T={T} />
          {kprog(T, K.A + 0.6, K.A + 1.2) > 0 && [0, 1, 2].map((k) => <line key={k} x1={230 + k * 30} y1={600 + k * 20} x2={400} y2={600} stroke={KC.yellow} strokeWidth={10} strokeDasharray="20 16" strokeDashoffset={-T * 60} opacity={0.8 * kprog(T, K.A + 0.6, K.A + 1.2) * (1 - kprog(T, K.D, K.D + 0.5))} />)}
          <rect x={0} y={1200} width={KW} height={800} fill="#6b4a2b" stroke={KC.ink} strokeWidth={8} />
          <Pilo T={T} x={600} y={1210} s={1.35} rot={giro} infla={infla} sale={sale} chorro={kprog(T, K.D + 1.6, K.D + 1.9) * (1 - kprog(T, K.D + 1.9, K.D + 2.5))} />
          {sale > 0 && sale < 0.6 && <circle cx={380} cy={520} r={140 * sale + 30} fill="none" stroke={KC.yellow} strokeWidth={14} opacity={1 - sale * 1.6} />}
        </>)}
      </Escena>
      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={300} y={1080} />)}
      </Escena>
      {/* 7–9 · el estudio: video de alta velocidad, rapidez y aceleración */}
      <Escena T={T} a={K.E} b={K.Di}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          {Array.from({ length: 6 }, (_, i) => { const on = kprog(T, K.E + 1.0 + i * 0.25, K.E + 1.2 + i * 0.25); return on > 0 ? <g key={i} opacity={on * (T > K.V ? 0.35 : 1)}>
            <rect x={60 + i * 162} y={860} width={150} height={220} rx={8} fill="#1d2433" stroke={KC.texto} strokeWidth={4} />
            {[0, 1, 2, 3].map((k) => <rect key={k} x={66 + i * 162 + k * 38} y={866} width={22} height={12} fill={KC.texto} opacity=".6" />)}
            <ellipse cx={135 + i * 162} cy={1040 - i * 30} rx={14} ry={10} fill="#fff" />
            <line x1={135 + i * 162} y1={1052 - i * 30} x2={135 + i * 162} y2={1075} stroke="#c9eeff" strokeWidth={5} opacity={i < 3 ? 1 : 0.3} />
          </g> : null; })}
          {T > K.V && <g transform={`translate(540 1000)`}>
            <path d="M -260 0 A 260 260 0 0 1 260 0" fill="none" stroke={KC.texto} strokeWidth={14} />
            {Array.from({ length: 11 }, (_, i) => { const a = Math.PI + i * Math.PI / 10; return <line key={i} x1={Math.cos(a) * 230} y1={Math.sin(a) * 230} x2={Math.cos(a) * 258} y2={Math.sin(a) * 258} stroke={KC.texto} strokeWidth={6} />; })}
            <line x1={0} y1={0} x2={Math.cos(Math.PI + Math.PI * kprog(T, K.V + 0.3, K.V + 1.6, kEase.sale) * 0.87) * 220} y2={Math.sin(Math.PI + Math.PI * kprog(T, K.V + 0.3, K.V + 1.6, kEase.sale) * 0.87) * 220} stroke={KC.red} strokeWidth={12} strokeLinecap="round" />
            <circle r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
          </g>}
        </>)}
      </Escena>
      {/* 10 · distancia: de la caca al pasto limpio */}
      <Escena T={T} a={K.Di} b={K.Va}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={-100} y={1080} width={1300} height={900} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
          <Boñiga x={190} y={1080} s={0.42} />
          <rect x={120} y={1100} width={140} height={0} />
          {(() => { const u = kprog(T, K.Di + 0.3, K.Di + 2.2, kEase.suave); const pts = Array.from({ length: 31 }, (_, i) => { const v = i / 30 * u; return [190 + v * 760, 1030 - Math.sin(v * Math.PI) * 520]; });
            const d = 'M ' + pts.map((p) => p[0].toFixed(0) + ' ' + p[1].toFixed(0)).join(' L '); const [ex, ey] = pts[pts.length - 1];
            return <><path d={d} stroke={KC.ink} strokeWidth={6} strokeDasharray="16 12" fill="none" /><ellipse cx={ex} cy={ey} rx={16} ry={11} fill={KC.ink} /></>; })()}
          <g opacity={kprog(T, K.Di + 2.2, K.Di + 2.6)}>
            <line x1={190} y1={1140} x2={950} y2={1140} stroke={KC.ink} strokeWidth={8} /><line x1={190} y1={1115} x2={190} y2={1165} stroke={KC.ink} strokeWidth={8} /><line x1={950} y1={1115} x2={950} y2={1165} stroke={KC.ink} strokeWidth={8} />
            <text x={570} y={880} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={KC.ink}>2.5 m</text>
            <text x={570} y={930} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>dato de 1934</text>
          </g>
        </>)}
      </Escena>
      {/* 11 · la vaca se la come; las esporas despiertan en la panza */}
      <Escena T={T} a={K.Va} b={K.Po}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <rect x={-100} y={1080} width={1300} height={900} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
          <Vaca x={klerp(900, 520, kprog(T, K.Va, K.Va + 1.2, kEase.sale))} y={1000} s={1.05} mastica={Math.max(0, Math.sin(T * 9)) * kprog(T, K.Va + 1.4, K.Va + 1.6)} />
          {T < K.Va + 1.5 && <ellipse cx={500} cy={1050} rx={16} ry={11} fill={KC.ink} />}
          {kprog(T, K.Va + 2.4, K.Va + 2.8) > 0 && <g opacity={kprog(T, K.Va + 2.4, K.Va + 2.8)}>
            <circle cx={300} cy={700} r={150} fill="#ffd2dc" stroke={KC.ink} strokeWidth={7} />
            {Array.from({ length: 7 }, (_, i) => { const a = i * 0.9, w = kprog(T, K.Va + 3.0 + i * 0.12, K.Va + 3.4 + i * 0.12); return <g key={i}><circle cx={300 + Math.cos(a) * 70} cy={700 + Math.sin(a) * 60} r={14} fill={mixHex('#8a8f99', KC.yellow, w)} stroke={KC.ink} strokeWidth={4} />
              {w > 0.5 && <path d={`M ${300 + Math.cos(a) * 70} ${686 + Math.sin(a) * 60} l 0 -18`} stroke={KC.ink} strokeWidth={4} />}</g>; })}
          </g>}
        </>)}
      </Escena>
      {/* 12 · polizones: larvas sobre la bolsita negra */}
      <Escena T={T} a={K.Po} b={K.C}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<g transform={`translate(${klerp(300, 640, kprog(T, K.Po, K.C))} ${klerp(1000, 700, kprog(T, K.Po, K.C))}) rotate(${T * 20})`}>
          <ellipse rx={220} ry={150} fill={KC.ink} stroke="#000" strokeWidth={6} />
          <ellipse cx={-70} cy={-60} rx={60} ry={30} fill="#fff" opacity=".2" />
          {Array.from({ length: 5 }, (_, i) => { const a = -2.6 + i * 0.5; return kprog(T, K.Po + 0.6 + i * 0.25, K.Po + 1.0 + i * 0.25) > 0 ? <g key={i} transform={`translate(${Math.cos(a) * 210} ${Math.sin(a) * 140}) rotate(${a * 57 + 90})`}><Gusano T={T} x={0} y={0} largo={150} ancho={14} ang={-90} fase={i} ondula={0.7} color="#fff3dc" /></g> : null; })}
        </g>)}
      </Escena>
      {/* 13 · cierre: la misma caca con sus cañones, todos apuntando al sol */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={-200} y={1060} width={1500} height={900} fill={PASTO} stroke={KC.ink} strokeWidth={8} />
          <Sol x={190} y={480} r={62} T={T} />
          {Array.from({ length: 4 }, (_, k) => <line key={k} x1={190} y1={480} x2={380 + k * 90} y2={900} stroke={KC.yellow} strokeWidth={8} strokeDasharray="18 14" strokeDashoffset={-T * 50} opacity={kprog(T, K.C + 0.6, K.C + 1.2)} />)}
          <Boñiga x={540} y={1050} />
          {POS.map(([dx, dy], i) => <Pilo key={i} T={T} x={540 + dx} y={1050 + dy} s={0.26} rot={klerp(0, -30, kprog(T, K.C + 0.4, K.C + 1.6))} infla={1} />)}
        </>)}
      </Escena>

      {/* capítulos y medidores */}
      <Capitulo T={T} caps={[{ at: K.A, titulo: 'Apunta' }, { at: K.Ca, titulo: 'Carga' }, { at: K.D, titulo: '¡Dispara!' }]} hasta={K.P - 0.1} x={170} y={210} />
      <Medidor T={T} at={K.Ca + 0.2} until={K.D + 1.6} valor={(t) => kprog(t, K.Ca + 0.3, K.Ca + 3.6)} etiqueta="presión" x={90} y={360} ancho={560} color={KC.orange} />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.6} tacharEn={K.G + 2.4} until={K.G + 4.4} texto="¿rocío?" x={360} y={560} />
      <Chip T={T} at={K.G + 2.8} until={K.H - 0.2} texto="cañón de esporas" x={360} y={680} tam={44} borde={KC.yellow} />
      <Etq T={T} at={K.H + 1.0} until={K.A - 0.3} x={60} y={560} texto="Pilobolus" it tam={44} color={KC.ink} />
      <Etq T={T} at={K.H + 1.8} until={K.A - 0.3} x={60} y={630} texto="en estiércol de herbívoros" tam={30} color={KC.ink} />
      <Etq T={T} at={K.A + 1.4} until={K.Ca - 0.2} x={680} y={640} texto="ampolla = lente" tam={32} color={KC.ink} />
      <Etq T={T} at={K.D + 0.6} until={K.P - 0.2} x={300} y={420} texto="bolsita de esporas" tam={32} color={KC.ink} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.V - 0.3} anio="2008" quien="Yafetto et al. · Ohio, EE. UU." revista="PLoS ONE · 50,000 cuadros por segundo" y={560} />
      <NumeroGigante T={T} at={K.V + 0.2} until={K.Gr - 0.3} valor={13} dur={1.4} sufijo=" m/s" etiqueta="hasta" x={640} y={520} tam={190} />
      <Chip T={T} at={K.V + 2.0} until={K.Gr - 0.3} texto="≈ 47 km/h" y={1120} tam={52} borde={KC.red} />
      <NumeroGigante T={T} at={K.Gr + 0.2} until={K.Di - 0.3} valor={20000} prefijo="+" dur={1.2} sufijo=" g" etiqueta="aceleración al despegar" x={640} y={520} tam={170} color={KC.orange} />
      <Chip T={T} at={K.Gr + 1.2} until={K.Di - 0.3} texto="g = la gravedad de la Tierra" y={1120} tam={36} borde={KC.orange} />
      <Etq T={T} at={K.Di + 2.4} until={K.Va - 0.3} x={700} y={1020} texto="pasto limpio" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Va + 2.8} until={K.Po - 0.3} x={460} y={700} texto="las esporas despiertan" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Po + 1.4} until={K.C - 0.3} x={60} y={1120} texto="larvas de Dictyocaulus viviparus" it tam={32} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="un cañón apuntando al sol" x={380} y={660} tam={36} borde={KC.yellow} />

      {/* barra de escala */}
      <BarraEscala T={T} at={K.G} until={K.A} texto="5 cm" largo={170} />
      <BarraEscala T={T} at={K.A} until={K.P} texto="1 mm" largo={230} />
      <BarraEscala T={T} at={K.Di} until={K.Va} texto="1 m" largo={304} />
      <BarraEscala T={T} at={K.Po} until={K.C} texto="0.1 mm" largo={140} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No es rocío: *es un cañón.*" />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.A - 0.1} texto="Pilobolus vive *en el estiércol.*" />
      <Subtitulo T={T} idx={2} at={K.A + 0.1} until={K.Ca - 0.1} texto="1: apunta *hacia la luz.*" />
      <Subtitulo T={T} idx={3} at={K.Ca + 0.1} until={K.D - 0.1} texto="2: carga: *sube la presión.*" />
      <Subtitulo T={T} idx={4} at={K.D + 0.1} until={K.P - 0.1} texto="3: ¡dispara *su bolsita negra!*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué tan *rápido?*" />
      <Subtitulo T={T} idx={6} at={K.E + 0.1} until={K.V - 0.1} texto="2008: *50,000 cuadros por segundo.*" />
      <Subtitulo T={T} idx={7} at={K.V + 0.1} until={K.Gr - 0.1} texto="Hasta 13 m/s: *≈ 47 km/h.*" />
      <Subtitulo T={T} idx={8} at={K.Gr + 0.1} until={K.Di - 0.1} texto="Más de *20,000 veces la gravedad.*" />
      <Subtitulo T={T} idx={9} at={K.Di + 0.1} until={K.Va - 0.1} texto="2.5 m (dato de 1934): *pasto limpio.*" />
      <Subtitulo T={T} idx={10} at={K.Va + 0.1} until={K.Po - 0.1} texto="Despiertan *en la panza de la vaca.*" />
      <Subtitulo T={T} idx={11} at={K.Po + 0.1} until={K.C - 0.1} texto="Polizones: *larvas de gusano.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Un cañón *apuntando al sol.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 4.2, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.8, K.A - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Ca + 0.4, K.D + 1.4, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.P + 0.05, K.E + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.V + 0.4, K.Gr + 3.2, 'avatar_11_sorprendido', 'izq-alto'],
        [K.Di + 0.4, K.Va - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Va + 2.6, K.Po - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Po + 0.4, K.C - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="07" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PiloboloApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Pilobolus /></CompositionStage></div>;
}
window.PiloboloApp = PiloboloApp;
