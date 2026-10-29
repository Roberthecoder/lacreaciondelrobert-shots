// Shot IA #16 · Creían que la IA los hacía más rápidos: tardaron 19 % más — NARRADO (N2 "El número").
// Datos: Becker, Rush, Barnes y Rein (METR), arXiv:2507.09089 (2025); METR, actualización del 24 feb 2026;
// Peng, Kalliamvakou, Cihon y Demirer, arXiv:2302.06590 (2023). Ver guion.md y verificacion.md. Dibujo esquemático.
const VERDE = '#1fbf6a';

// Programadora en su escritorio con laptop; robotito chiquito al lado. reloj 0..1 = cronómetro en el escritorio.
function Escritorio({ T, reloj = 0, robot = 1, codigo = 1, fondoPared = null }) {
  const r = krng(7), lineas = Array.from({ length: 7 }, () => ({ l: 60 + r() * 200, c: [KC.mint, KC.pink, KC.yellow, KC.cyan][Math.floor(r() * 4)], ind: Math.floor(r() * 3) }));
  const teclea = Math.sin(T * 18) * 4, ang = T * 240;
  const n = Math.min(7, Math.floor(codigo * 7 + (T * 1.6) % 7));
  return <g>
    {/* escritorio */}
    <rect x={-20} y={1130} width={1120} height={60} rx={10} fill="#b8794a" stroke={KC.ink} strokeWidth={8} />
    <rect x={-20} y={1186} width={1120} height={40} fill="#8a5632" stroke={KC.ink} strokeWidth={6} />
    {/* programadora (detrás de la laptop) */}
    <path d="M 340 1135 Q 350 930 540 915 Q 730 930 740 1135 Z" fill={KC.pink} stroke={KC.ink} strokeWidth={8} />
    <rect x={505} y={860} width={70} height={70} fill="#d99a6c" stroke={KC.ink} strokeWidth={7} />
    <circle cx={540} cy={790} r={92} fill="#e8ad7f" stroke={KC.ink} strokeWidth={8} />
    <path d="M 446 790 Q 440 680 545 690 Q 650 690 636 800 Q 622 730 560 735 Q 500 720 470 760 Z" fill="#2a1c18" stroke={KC.ink} strokeWidth={7} />
    <circle cx={505} cy={800} r={24} fill="none" stroke={KC.ink} strokeWidth={6} /><circle cx={578} cy={800} r={24} fill="none" stroke={KC.ink} strokeWidth={6} />
    <line x1={529} y1={800} x2={554} y2={800} stroke={KC.ink} strokeWidth={6} />
    <circle cx={507} cy={803} r={6} fill={KC.ink} /><circle cx={580} cy={803} r={6} fill={KC.ink} />
    <path d="M 515 845 Q 541 858 567 845" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
    {/* manos tecleando */}
    <ellipse cx={440} cy={1118 + teclea} rx={34} ry={20} fill="#e8ad7f" stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={640} cy={1118 - teclea} rx={34} ry={20} fill="#e8ad7f" stroke={KC.ink} strokeWidth={6} />
    {/* laptop */}
    <rect x={330} y={880} width={420} height={250} rx={18} fill="#2b3445" stroke={KC.ink} strokeWidth={9} />
    <rect x={352} y={902} width={376} height={206} rx={8} fill="#0d1424" />
    {lineas.slice(0, n).map((L, i) => <rect key={i} x={372 + L.ind * 24} y={920 + i * 26} width={L.l} height={12} rx={6} fill={L.c} opacity=".85" />)}
    <path d="M 290 1130 L 790 1130 L 760 1146 L 320 1146 Z" fill="#7f8ba3" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {/* taza */}
    <g transform="translate(160 1070)"><rect x={-40} y={-50} width={80} height={110} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
      <path d="M 40 -20 Q 75 -20 75 10 Q 75 40 40 40" fill="none" stroke={KC.ink} strokeWidth={7} />
      {[0, 1].map((k) => <path key={k} d={`M ${-14 + k * 26} -70 q 12 -18 0 -36 q -12 -18 0 -36`} stroke="#fff" strokeWidth={6} fill="none" opacity={0.55 + 0.4 * Math.sin(T * 4 + k)} />)}</g>
    {/* robotito asistente */}
    {robot > 0 && <g opacity={robot}><Robotito x={900} y={1000} s={0.5} T={T} cara="feliz" /></g>}
    {/* cronómetro */}
    {reloj > 0 && <g transform={`translate(905 ${klerp(900, 1010, reloj)}) scale(${klerp(0.3, 0.9, reloj)})`} opacity={Math.min(1, reloj * 1.5)}>
      <rect x={-22} y={-150} width={44} height={36} rx={8} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
      <circle r={115} fill={KC.paper} stroke={KC.ink} strokeWidth={11} />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={-92} x2={0} y2={-78} stroke={KC.ink} strokeWidth={6} transform={`rotate(${i * 30})`} />)}
      <line x1={0} y1={0} x2={0} y2={-80} stroke={KC.red} strokeWidth={9} strokeLinecap="round" transform={`rotate(${ang})`} />
      <circle r={12} fill={KC.ink} />
    </g>}
  </g>;
}

// Barras con texto libre (−24 %, −20 %, +19 %). lado: 'izq' crece hacia la izquierda desde el centro (menos tiempo).
function BarrasTiempo({ T, at, until, filas, top = 700 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:60, top, width:960, zIndex:40, opacity:e.o }}>
    <div style={{ position:'absolute', left:480, top:-20, bottom:0, width:8, marginLeft:-4, background:KC.ink, borderRadius:4 }}></div>
    <div style={{ position:'absolute', left:0, top:-74, width:470, textAlign:'right', font:`700 28px ${KF.mono}`, color:KC.ink }}>◀ menos tiempo</div>
    <div style={{ position:'absolute', left:490, top:-74, width:470, font:`700 28px ${KF.mono}`, color:KC.ink }}>más tiempo ▶</div>
    {filas.map((f, i) => { const g = kprog(T, f.at + 0.1, f.at + 0.9, kEase.sale), w = 16 * f.valor * g, izq = f.valor < 0;
      return <div key={i} style={{ position:'relative', height:150, opacity: T >= f.at ? 1 : 0 }}>
        <div style={{ position:'absolute', left: izq ? 0 : 490, width:470, textAlign: izq ? 'right' : 'left', top:0, font:`900 34px ${KF.texto}`, color:KC.ink }}>{f.etiqueta}</div>
        <div style={{ position:'absolute', top:48, height:70, left: izq ? 480 - Math.abs(w) : 480, width:Math.abs(w), background:f.color, border:`6px solid ${KC.ink}`, borderRadius:14 }}></div>
        <div style={{ position:'absolute', top:44, left: izq ? 480 - Math.abs(w) - 230 : 480 + Math.abs(w) + 18, width:212, textAlign: izq ? 'right' : 'left',
          font:`400 68px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}`, opacity:g }}>{f.texto}</div>
      </div>; })}
  </div>;
}

// Carita de programador (para los 16).
function Carita({ x, y, s = 1, piel = '#e8ad7f', pelo = '#2a1c18', playera = KC.cyan }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -46 70 Q -44 26 0 24 Q 44 26 46 70 Z" fill={playera} stroke={KC.ink} strokeWidth={5} />
    <circle cy={-6} r={32} fill={piel} stroke={KC.ink} strokeWidth={5} />
    <path d="M -32 -10 Q -34 -46 0 -42 Q 34 -46 32 -10 Q 24 -30 0 -30 Q -24 -30 -32 -10 Z" fill={pelo} stroke={KC.ink} strokeWidth={4} />
    <circle cx={-11} cy={-4} r={4} fill={KC.ink} /><circle cx={11} cy={-4} r={4} fill={KC.ink} />
    <path d="M -10 10 Q 0 16 10 10" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>;
}

// Tarjeta de tarea (issue) chiquita.
function Tarea({ x, y, s = 1, color = KC.paper, rot = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-60} y={-40} width={120} height={80} rx={10} fill={color} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-36} cy={-16} r={9} fill={VERDE} stroke={KC.ink} strokeWidth={3} />
    <rect x={-20} y={-22} width={64} height={10} rx={5} fill={KC.ink} opacity=".7" />
    <rect x={-44} y={4} width={88} height={8} rx={4} fill={KC.ink} opacity=".35" />
    <rect x={-44} y={20} width={60} height={8} rx={4} fill={KC.ink} opacity=".35" />
  </g>;
}

// Íconos de la escena "Pantalla" (pedirle / esperar / revisar).
function Burbuja({ T }) {
  return <g><path d="M -110 -70 h 220 a 26 26 0 0 1 26 26 v 90 a 26 26 0 0 1 -26 26 h -150 l -40 34 v -34 h -30 a 26 26 0 0 1 -26 -26 v -90 a 26 26 0 0 1 26 -26 z" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} />
    {[0, 1, 2].map((k) => <rect key={k} x={-80} y={-40 + k * 30} width={[160, 120, 140][k]} height={14} rx={7} fill={KC.ink} opacity={0.3 + 0.6 * Math.max(0, Math.sin(T * 5 - k))} />)}</g>;
}
function ArenaReloj({ T }) {
  const g = (T * 0.7) % 1, rot = g > 0.85 ? (g - 0.85) / 0.15 * 180 : 0;
  return <g transform={`rotate(${rot})`}>
    <rect x={-80} y={-110} width={160} height={20} rx={8} fill="#8a5632" stroke={KC.ink} strokeWidth={6} />
    <rect x={-80} y={90} width={160} height={20} rx={8} fill="#8a5632" stroke={KC.ink} strokeWidth={6} />
    <path d="M -60 -90 L 60 -90 L 8 0 L 60 90 L -60 90 L -8 0 Z" fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M ${-50 + 42 * Math.min(g, 0.85) / 0.85} ${-80 + 74 * Math.min(g, 0.85) / 0.85} L ${50 - 42 * Math.min(g, 0.85) / 0.85} ${-80 + 74 * Math.min(g, 0.85) / 0.85} L 6 -4 L -6 -4 Z`} fill={KC.gold} />
    <path d={`M -50 82 L 50 82 L ${50 - 30 * (1 - Math.min(g, 0.85) / 0.85)} ${82 - 60 * Math.min(g, 0.85) / 0.85} L ${-50 + 30 * (1 - Math.min(g, 0.85) / 0.85)} ${82 - 60 * Math.min(g, 0.85) / 0.85} Z`} fill={KC.gold} />
    <line x1={0} y1={0} x2={0} y2={80} stroke={KC.gold} strokeWidth={4} />
  </g>;
}
function LupaCodigo({ T }) {
  const dx = Math.sin(T * 2) * 40;
  return <g>
    <rect x={-120} y={-90} width={240} height={180} rx={14} fill="#0d1424" stroke={KC.ink} strokeWidth={7} />
    {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={-96 + (k % 2) * 20} y={-66 + k * 30} width={[150, 110, 170, 90, 130][k]} height={12} rx={6} fill={[KC.mint, KC.pink, KC.yellow, KC.cyan, KC.mint][k]} opacity=".8" />)}
    <g transform={`translate(${dx} 10)`}><circle r={58} fill="rgba(255,255,255,.2)" stroke={KC.ink} strokeWidth={10} /><circle r={58} fill="none" stroke={KC.gold} strokeWidth={5} />
      <line x1={42} y1={42} x2={100} y2={100} stroke={KC.ink} strokeWidth={20} strokeLinecap="round" /></g>
  </g>;
}
function Tarjeta3({ T, at, x, y, titulo, children }) {
  const e = kprog(T, at, at + 0.45, kEase.rebote), o = kprog(T, at, at + 0.2);
  return <g transform={`translate(${x} ${y}) scale(${klerp(0.4, 1, e)})`} opacity={o}>
    <rect x={-150} y={-150} width={300} height={330} rx={28} fill="#1a2236" stroke={KC.cyan} strokeWidth={5} />
    <g transform="translate(0 -20) scale(0.95)">{children}</g>
    <text y={150} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.texto}>{titulo}</text>
  </g>;
}

// Sugerencias de código: 25 tarjetitas; las primeras `ok` se aceptan (✔ verde), el resto se rechaza (✖).
function Sugerencias({ T, at, x = 150, y = 560 }) {
  const out = [], orden = [3, 11, 0, 19, 7, 22, 14, 5, 17, 9]; // aceptadas (10 de 25 = 40 %, "menos de 44 %")
  for (let i = 0; i < 25; i++) {
    const c = i % 5, f = Math.floor(i / 5), t0 = at + 0.15 + i * 0.07, a = kprog(T, t0, t0 + 0.25, kEase.sale);
    const dec = kprog(T, at + 2.2 + (i % 7) * 0.06, at + 2.5 + (i % 7) * 0.06), ok = orden.includes(i);
    const fill = dec > 0.5 ? (ok ? VERDE : '#3a4152') : '#1a2236';
    out.push(<g key={i} transform={`translate(${x + c * 195} ${y + f * 116}) scale(${a})`} opacity={dec > 0.5 && !ok ? 0.55 : 1}>
      <rect x={-80} y={-46} width={160} height={92} rx={12} fill={fill} stroke={dec > 0.5 && ok ? KC.ink : KC.cyan} strokeWidth={5} />
      <rect x={-60} y={-26} width={90} height={10} rx={5} fill={KC.texto} opacity=".7" /><rect x={-60} y={-4} width={120} height={10} rx={5} fill={KC.texto} opacity=".45" /><rect x={-60} y={18} width={70} height={10} rx={5} fill={KC.texto} opacity=".45" />
      {dec > 0.5 && <text x={52} y={26} textAnchor="middle" style={{ font:`900 50px ${KF.texto}` }} fill={ok ? KC.paper : KC.red}>{ok ? '✔' : '✖'}</text>}
    </g>);
  }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{out}</svg>;
}

// Torre de páginas de código (repositorio enorme).
function Repositorio({ T, x, y, s = 1, alto = 1 }) {
  const n = Math.round(14 * alto);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {Array.from({ length: n }, (_, i) => <g key={i} transform={`translate(${(i % 2) * 8 - 4} ${-i * 34})`}>
      <rect x={-170} y={-30} width={340} height={40} rx={6} fill={i % 3 === 0 ? KC.paper : i % 3 === 1 ? '#efe4cc' : '#fff8e8'} stroke={KC.ink} strokeWidth={5} />
      <rect x={-140} y={-18} width={120 + (i * 37) % 120} height={8} rx={4} fill={[KC.pink, KC.cyan, VERDE][i % 3]} opacity=".8" />
    </g>)}
  </g>;
}

// Hoja de calendario.
function Calendario({ x, y, s = 1, anio = '2026' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-170} y={-150} width={340} height={300} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={9} />
    <rect x={-170} y={-150} width={340} height={90} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={9} />
    {[-90, 90].map((cx) => <rect key={cx} x={cx - 12} y={-180} width={24} height={60} rx={10} fill={KC.ink} />)}
    <text y={90} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{anio}</text>
  </g>;
}

function Programadores() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, A: CUES.Apuesta, E: CUES.Estudio, S: CUES.Sorteo, P: CUES.Pregunta, Pa: CUES.Pantalla, M: CUES.Matices, Co: CUES.Contraste, Gi: CUES.Giro, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const PA2 = K.Pa + 5.1; // segunda línea de "Pantalla" (aceptaron menos de la mitad)
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: se sintieron más rápidos… el reloj dice otra cosa */}
      <Escena T={T} a={K.G} b={K.A}>
        <FondoLunares color={KC.mint} />
        {svg(<Escritorio T={T} reloj={kprog(T, K.G + 4.3, K.G + 5.0, kEase.rebote)} />)}
      </Escena>
      <NumeroGigante T={T} at={K.G + 0.15} until={K.G + 4.4} valor={20} dur={0.8} prefijo="−" sufijo=" %" etiqueta="lo que sintieron: tiempo" x={300} y={500} tam={190} color={VERDE} />
      <MitoTachado T={T} at={K.G + 4.5} tacharEn={K.G + 4.7} until={K.A - 0.2} texto="se sintieron 20 % más rápidos" y={380} tam={42} />
      <NumeroGigante T={T} at={K.G + 4.6} until={K.A - 0.2} valor={19} dur={0.9} prefijo="+" sufijo=" %" etiqueta="el reloj: más tiempo" x={540} y={560} tam={210} color={KC.red} />

      {/* 2 · la apuesta: antes / después / el reloj */}
      <Escena T={T} a={K.A} b={K.E}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      <BarrasTiempo T={T} at={K.A + 0.1} until={K.E - 0.2} top={760} filas={[
        { at: K.A + 0.2, valor: -24, texto: '−24 %', etiqueta: 'antes: esperaban', color: VERDE },
        { at: K.A + 1.2, valor: -20, texto: '−20 %', etiqueta: 'después: creían', color: VERDE },
        { at: K.A + 2.0, valor: 19, texto: '+19 %', etiqueta: 'el reloj', color: KC.red }]} />

      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.S}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 16 }, (_, i) => { const c = i % 8, f = Math.floor(i / 8), t0 = K.E + 3.4 + i * 0.07;
          return <g key={i} opacity={kprog(T, t0, t0 + 0.2)}><Carita x={170 + c * 106} y={f ? 900 : 760} s={kprog(T, t0, t0 + 0.35, kEase.rebote)}
            piel={['#e8ad7f', '#c98a5e', '#f1c7a0', '#8d5a3b'][i % 4]} pelo={['#2a1c18', '#6b3e1f', '#151515', '#c99a4a'][(i * 3) % 4]} playera={[KC.cyan, KC.pink, KC.yellow, VERDE, KC.orange][i % 5]} /></g>; })}</>)}
        <Contador T={T} at={K.E + 4.0} hasta={246} dur={2.6} x={540} y={1060} tam={110} color={KC.yellow} />
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.2} anio="2025" quien="laboratorio METR" revista="Becker, Rush, Barnes y Rein · arXiv 2507.09089" y={720} />
      <Chip T={T} at={K.E + 3.5} until={K.S - 0.25} texto="16 programadores con experiencia" x={540} y={620} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.E + 4.2} until={K.S - 0.25} texto="tareas reales de sus proyectos" x={540} y={1160} tam={34} borde={KC.ink} />

      {/* 4 · el sorteo: con IA / sin IA, pantallas grabadas */}
      <Escena T={T} a={K.S} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Robotito x={270} y={560} s={0.55} T={T} cara="feliz" />
          <Carita x={810} y={545} s={1.5} playera={KC.pink} />
          {Array.from({ length: 10 }, (_, i) => { const t0 = K.S + 0.4 + i * 0.3, u = kprog(T, t0, t0 + 0.5, kEase.sale), izq = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0][i];
            const fila = Math.floor(i / 2), tx = izq ? 270 : 810;
            return <Tarea key={i} x={klerp(540, tx + ((i % 2) ? 40 : -40) * 0, u)} y={klerp(700, 790 + fila * 70, u)} s={0.8} rot={(1 - u) * 30 * (izq ? -1 : 1)} o={T >= t0 ? 1 : 0} color={izq ? '#d6f7ff' : '#ffe0ec'} />; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.S + 0.2} until={K.P - 0.2} texto="con IA" x={270} y={410} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.2} until={K.P - 0.2} texto="sin IA" x={810} y={410} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.S + 0.5} until={K.P - 0.2} texto="🎲 al azar" x={540} y={620} tam={40} borde={KC.gold} />
      {kvisible(T, K.S + 2.6, K.P - 0.2) && <div style={{ position:'absolute', left:540, top:1150, transform:'translate(-50%,-50%)', zIndex:42, display:'flex', alignItems:'center', gap:16,
        background:'rgba(14,15,18,.85)', borderRadius:999, padding:'12px 30px', opacity:kprog(T, K.S + 2.6, K.S + 2.9) * (1 - kprog(T, K.P - 0.2, K.P + 0.2)) }}>
        <div style={{ width:34, height:34, borderRadius:17, background:KC.red, opacity:(T * 2) % 1 < 0.6 ? 1 : 0.25 }}></div>
        <div style={{ font:`700 36px ${KF.mono}`, color:KC.texto }}>REC · pantallas grabadas</div></div>}

      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pa} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>

      {/* 6 · lo que mostraron las pantallas */}
      <Escena T={T} a={K.Pa} b={K.M}>
        <FondoCircuito T={T} />
        {T < PA2 + 0.3 && <div style={{ position:'absolute', inset:0, opacity:1 - kprog(T, PA2 - 0.1, PA2 + 0.3) }}>{svg(<>
          <Tarjeta3 T={T} at={K.Pa + 1.6} x={200} y={800} titulo="pedirle"><Burbuja T={T} /></Tarjeta3>
          <Tarjeta3 T={T} at={K.Pa + 2.8} x={540} y={800} titulo="esperar"><ArenaReloj T={T} /></Tarjeta3>
          <Tarjeta3 T={T} at={K.Pa + 3.8} x={880} y={800} titulo="revisar"><LupaCodigo T={T} /></Tarjeta3>
        </>)}</div>}
        {T >= PA2 - 0.2 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, PA2 - 0.2, PA2 + 0.2) }}><Sugerencias T={T} at={PA2} /></div>}
      </Escena>
      <Chip T={T} at={K.Pa + 0.4} until={PA2 - 0.2} texto="con IA, el tiempo se iba en…" x={540} y={520} tam={40} borde={KC.cyan} />
      <Chip T={T} at={PA2 + 0.2} until={K.M - 0.2} texto="sugerencias de la IA" x={330} y={430} tam={36} borde={KC.cyan} />
      <Chip T={T} at={PA2 + 2.6} until={K.M - 0.2} texto="aceptadas: menos del 44 %" x={540} y={1150} tam={42} borde={VERDE} />

      {/* 7 · matices: expertos, proyectos enormes, no vale para todos */}
      <Escena T={T} a={K.M} b={K.Co}>
        <FondoLunares color={KC.pink} />
        {svg(<Repositorio T={T} x={760} y={1110} s={0.95} alto={kprog(T, K.M + 0.3, K.M + 2.0, kEase.sale)} />)}
      </Escena>
      <Chip T={T} at={K.M + 1.0} until={K.Co - 0.2} texto="en promedio: 5 años en su proyecto" x={430} y={640} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.M + 2.0} until={K.Co - 0.2} texto="en promedio: +1 millón de líneas" x={430} y={760} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.M + 3.6} until={K.Co - 0.2} texto="los autores: no vale para todos" x={430} y={1000} tam={40} borde={KC.red} fondo={KC.ink} />

      {/* 8 · contraste: Copilot 2023 */}
      <Escena T={T} a={K.Co} b={K.Gi}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      <TarjetaEstudio T={T} at={K.Co + 0.2} until={K.Co + 2.6} anio="2023" quien="Peng y colegas · Copilot" revista="Microsoft Research, GitHub y MIT · arXiv 2302.06590" y={700} />
      <Chip T={T} at={K.Co + 2.7} until={K.Gi - 0.2} texto="tarea sencilla: un servidor web" x={540} y={460} tam={38} borde={KC.ink} />
      <Comparativa T={T} at={K.Co + 2.9} until={K.Gi - 0.2} y={560} alto={420} max={161}
        izq={{ valor: 161, texto: '161 min', etiqueta: 'sin IA', color: KC.red }} der={{ valor: 71, texto: '71 min', etiqueta: 'con Copilot', color: VERDE }} />
      <Chip T={T} at={K.Co + 4.4} until={K.Gi - 0.2} texto="55.8 % menos tiempo" x={540} y={1160} tam={44} borde={VERDE} />

      {/* 9 · giro: 2026 */}
      <Escena T={T} a={K.Gi} b={K.C}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Calendario x={540} y={700} s={klerp(0.6, 1, kprog(T, K.Gi + 0.1, K.Gi + 0.6, kEase.rebote))} />
          <g opacity={kprog(T, K.Gi + 1.6, K.Gi + 2.0)} transform={`translate(0 ${-Math.sin(T * 3) * 8})`}>
            <path d="M 830 1000 L 830 880 L 790 880 L 870 790 L 950 880 L 910 880 L 910 1000 Z" fill={VERDE} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
            <text x={870} y={980} textAnchor="middle" style={{ font:`400 90px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={3}>?</text>
          </g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Gi + 1.8} until={K.C - 0.2} texto="METR: «probablemente» más rápido hoy" x={540} y={1000} tam={34} borde={VERDE} />
      <Chip T={T} at={K.Gi + 3.6} until={K.C - 0.2} texto="pero sus datos nuevos: poco confiables" x={540} y={1110} tam={34} borde={KC.red} />

      {/* 10 · cierre: la misma programadora, ahora con cronómetro */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<Escritorio T={T} reloj={1} />)}
      </Escena>
      <MitoTachado T={T} at={K.C + 0.4} tacharEn={K.C + 2.2} until={K.Ou} texto="lo que sentí" x={330} y={420} tam={46} />
      <Chip T={T} at={K.C + 2.6} until={K.Ou} texto="lo que medí ✔" x={330} y={560} tam={50} borde={VERDE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.A - 0.1} texto="Se sintieron más rápidos… *y tardaron 19 % más.*" />
      <Subtitulo T={T} idx={1} at={K.A + 0.1} until={K.E - 0.1} texto="Antes apostaban: *24 % más rápido.*" />
      <Subtitulo T={T} idx={2} at={K.E + 0.1} until={K.S - 0.1} texto="METR, 2025: *16 expertos, 246 tareas.*" />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.P - 0.1} texto="Con IA o sin IA: *al azar.*" />
      <Subtitulo T={T} idx={4} at={K.P + 0.1} until={K.Pa - 0.1} texto="¿Más rápido *si vas más lento?*" />
      <Subtitulo T={T} idx={5} at={K.Pa + 0.1} until={PA2 - 0.1} texto="Pedirle, *esperar* y revisar." />
      <Subtitulo T={T} idx={6} at={PA2 + 0.1} until={K.M - 0.1} texto="Aceptaron *menos de la mitad.*" />
      <Subtitulo T={T} idx={7} at={K.M + 0.1} until={K.Co - 0.1} texto="Expertos en proyectos enormes: *no vale para todos.*" />
      <Subtitulo T={T} idx={8} at={K.Co + 0.1} until={K.Gi - 0.1} texto="2023, Copilot: *56 % más rápido.*" />
      <Subtitulo T={T} idx={9} at={K.Gi + 0.1} until={K.C - 0.1} texto="2026: *quizá ya más rápido.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Mide con el reloj, *no con la sensación.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Apuesta + 0.4, CUES.Estudio - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 3.6, CUES.Sorteo - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Pantalla + 0.9, 'avatar_07_pensativo_puno', 'grande'],
        [PA2 + 0.3, CUES.Matices - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Matices + 0.4, CUES.Contraste - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Contraste + 3.0, CUES.Giro - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Giro + 0.5, CUES.Cierre - 0.2, 'avatar_12_perfil_serio', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="16" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ProgramadoresApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Programadores /></CompositionStage></div>;
}
window.ProgramadoresApp = ProgramadoresApp;
