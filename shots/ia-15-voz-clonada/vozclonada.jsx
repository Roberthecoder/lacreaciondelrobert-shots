// Shot IA #15 · Tu voz se clona con segundos — NARRADO (N6 "Guía en pasos").
// Datos: Wang et al. 2023 (VALL-E, Microsoft, arXiv:2301.02111); Mai et al. 2023 (PLOS ONE, UCL); FTC 2023; FBI/IC3 2024;
// Guardia Nacional/SEP 2026. Ver guion.md y verificacion.md. El dibujo es esquemático.

// Robert con un lado extra 'bajo-der' (debajo del subtítulo, nunca lo tapa). Misma animación que Sticker del kit.
const VC_LADOS = { 'arriba-der': { left:690, top:300, width:330 }, 'gancho': { left:600, top:230, width:460 }, 'izq-alto': { left:-10, top:300, width:330 },
  'grande': { left:520, top:560, width:580 }, 'grande-izq': { left:-20, top:580, width:520 }, 'bajo-der': { left:730, top:1400, width:340 } };
function StickerVC({ T, src, at, until, lado = 'arriba-der' }) {
  if (T < at || T > until + 0.45) return null;
  const L = VC_LADOS[lado] || VC_LADOS['arriba-der'];
  const i = kprog(T, at, at + 0.5, kEase.rebote), o = kprog(T, until - 0.05, until + 0.4, kEase.suave);
  const w = Math.exp(-(T - at - 0.35) * 6) * Math.cos((T - at - 0.35) * 20) * 0.08 * (T > at + 0.35 ? 1 : 0);
  const desdeAbajo = lado !== 'arriba-der';
  const ty = desdeAbajo ? (1 - i) * 800 + o * 800 : 0, tx = desdeAbajo ? 0 : (1 - i) * 420 + o * 420;
  return <img src={src} alt="" style={{ position:'absolute', left:L.left, top:L.top, width:L.width, zIndex:46, transformOrigin:'50% 100%',
    transform:`translate(${tx}px, ${ty}px) scale(${1 - w}, ${1 + w})`, filter:'drop-shadow(0 22px 34px rgba(0,0,0,.55))' }} />;
}
function RobertVC({ T, apariciones = [], base = 'assets/stickers/' }) {
  return <>{apariciones.map(([at, until, pose, lado], i) => <StickerVC key={i} T={T} src={`${base}${pose}.png`} at={at} until={until} lado={lado} />)}</>;
}

// Celular. modo: 'llamada' (contacto entrante) | 'video' (un video de redes con la persona hablando).
function Telefono({ x, y, s = 1, T = 0, vibra = 0, modo = 'llamada', contacto = 'Hijo', burbuja = null }) {
  const dx = vibra ? Math.sin(T * 70) * 7 * vibra : 0, rot = vibra ? Math.sin(T * 55) * 2.2 * vibra : 0;
  return <g transform={`translate(${x + dx} ${y}) rotate(${rot}) scale(${s})`}>
    {vibra > 0 && [0, 1].map((k) => <g key={k} opacity={0.4 + 0.6 * Math.abs(Math.sin(T * 9 + k))}>
      <path d={`M ${-200 - k * 26} -60 q -22 60 0 120`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
      <path d={`M ${200 + k * 26} -60 q 22 60 0 120`} stroke={KC.ink} strokeWidth={9} fill="none" strokeLinecap="round" />
    </g>)}
    <rect x={-165} y={-320} width={330} height={640} rx={54} fill="#1b1f2a" stroke={KC.ink} strokeWidth={10} />
    <rect x={-145} y={-296} width={290} height={592} rx={40} fill={modo === 'video' ? '#2a1f4a' : '#10131a'} />
    <rect x={-50} y={-286} width={100} height={22} rx={11} fill={KC.ink} />
    {modo === 'llamada' && <>
      <circle cx={0} cy={-120} r={78} fill={KC.lilac} stroke={KC.ink} strokeWidth={7} />
      <circle cx={0} cy={-140} r={30} fill="#f1b48f" stroke={KC.ink} strokeWidth={6} />
      <path d="M -50 -62 Q 0 -110 50 -62" fill="#f1b48f" stroke={KC.ink} strokeWidth={6} />
      <text x={0} y={10} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.texto}>{contacto}</text>
      <text x={0} y={58} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="rgba(246,243,236,.7)">llamando…</text>
      <circle cx={-72} cy={200} r={44} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
      <circle cx={72} cy={200} r={44 * (1 + 0.08 * Math.sin(T * 8))} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
      <path d="M 52 196 q 20 20 40 0" stroke={KC.white} strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M -92 206 q 20 -20 40 0" stroke={KC.white} strokeWidth={8} fill="none" strokeLinecap="round" />
    </>}
    {modo === 'video' && <>
      <rect x={-145} y={-296} width={290} height={592} rx={40} fill="url(#gradVideo)" />
      <circle cx={0} cy={-60} r={62} fill="#f1b48f" stroke={KC.ink} strokeWidth={6} />
      <path d="M -60 -100 Q 0 -150 60 -100 L 56 -84 Q 0 -110 -56 -84 Z" fill="#3a2a1a" />
      <circle cx={-20} cy={-66} r={7} fill={KC.ink} /><circle cx={20} cy={-66} r={7} fill={KC.ink} />
      <ellipse cx={0} cy={-30} rx={18} ry={6 + 8 * Math.abs(Math.sin(T * 11))} fill="#7a1f2a" />
      <path d="M -110 120 Q 0 10 110 120 L 110 200 L -110 200 Z" fill={KC.coral} stroke={KC.ink} strokeWidth={6} />
      {[0, 1, 2].map((k) => { const u = ((T * 0.6 + k / 3) % 1); return <text key={k} x={110} y={170 - u * 260} textAnchor="middle" opacity={Math.sin(Math.PI * u)} style={{ font:`900 40px ${KF.texto}` }} fill={KC.pink}>♥</text>; })}
      <rect x={-120} y={256} width={240} height={8} rx={4} fill="rgba(255,255,255,.3)" />
      <rect x={-120} y={256} width={240 * ((T * 0.12) % 1)} height={8} rx={4} fill={KC.white} />
    </>}
    {burbuja && <g transform="translate(150 -330)">
      <rect x={-20} y={-70} width={burbuja.length * 30 + 60} height={96} rx={40} fill={KC.white} stroke={KC.ink} strokeWidth={7} />
      <path d="M 10 22 L -14 60 L 40 24" fill={KC.white} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      <text x={10} y={-6} style={{ font:`900 44px ${KF.texto}` }} fill={KC.ink}>{burbuja}</text>
    </g>}
  </g>;
}
// Onda de voz en barras. pixel 0..1 = se vuelve bloques de computadora (copia); cae 0..1 = las barras se desarman.
function Onda({ x, y, ancho = 460, alto = 200, T = 0, n = 28, seed = 4, color = KC.ink, copia = KC.cyan, pixel = 0, cae = 0, vivo = 1, sel = null }) {
  const r = krng(seed), base = Array.from({ length: n }, (_, i) => 0.25 + 0.75 * r() * Math.sin(Math.PI * (i + 0.5) / n));
  const w = ancho / n;
  return <g transform={`translate(${x} ${y})`}>
    {base.map((b, i) => {
      let h = alto * b * (0.75 + 0.25 * Math.sin(T * 9 * vivo + i * 1.7));
      if (pixel > 0) h = klerp(h, Math.max(1, Math.round(h / 34)) * 34, pixel);
      const enSel = sel && i >= sel[0] && i < sel[1];
      const c = pixel > 0.5 ? copia : (enSel ? KC.yellow : color);
      const fy = cae * (300 + (i % 5) * 90) * cae, fr = cae * ((i % 2 ? 1 : -1) * 40);
      return <g key={i} transform={`translate(${i * w + w / 2} ${fy}) rotate(${fr})`} opacity={1 - cae}>
        <rect x={-w * 0.32} y={-h / 2} width={w * 0.64} height={h} rx={pixel > 0.5 ? 2 : w * 0.3} fill={c} stroke={pixel > 0.5 || enSel ? KC.ink : 'none'} strokeWidth={4} />
      </g>; })}
  </g>;
}
// Tijeras que se abren y cierran.
function Tijeras({ x, y, s = 1, T = 0, rot = 0 }) {
  const a = 14 + 12 * Math.sin(T * 12);
  const hoja = (sg) => <g transform={`rotate(${sg * a})`}>
    <path d={`M 0 0 L 170 ${sg * -10} L 170 ${sg * 6} Z`} fill="#cfd6e3" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={-60} cy={sg * 26} rx={42} ry={26} fill="none" stroke={KC.red} strokeWidth={16} />
  </g>;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>{hoja(1)}{hoja(-1)}<circle r={9} fill={KC.ink} /></g>;
}
// Coche chocado con estrellita.
function Choque({ x, y, s = 1, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -120 20 L -100 -30 Q -80 -60 -40 -60 L 40 -60 Q 70 -60 90 -30 L 120 0 L 120 40 L -120 40 Z" fill={KC.cyan} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" transform="rotate(-8)" />
    <circle cx={-70} cy={46} r={26} fill={KC.ink} /><circle cx={70} cy={36} r={26} fill={KC.ink} />
    <g transform={`translate(130 -40) rotate(${T * 90}) scale(${1 + 0.1 * Math.sin(T * 10)})`}>
      <path d="M 0 -56 L 14 -16 L 56 -16 L 22 8 L 36 50 L 0 24 L -36 50 L -22 8 L -56 -16 L -14 -16 Z" fill={KC.yellow} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    </g>
  </g>;
}
// Torreta de patrulla que alterna rojo y azul.
function Torreta({ x, y, s = 1, T = 0 }) {
  const on = Math.floor(T * 6) % 2;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((k) => <circle key={k} cx={k * 50} cy={-50} r={70} fill={(k < 0) === !!on ? KC.red : KC.blue} opacity=".25" />)}
    <rect x={-110} y={10} width={220} height={40} rx={10} fill="#2b3445" stroke={KC.ink} strokeWidth={7} />
    <path d="M -90 10 Q -90 -70 0 -70 Q 90 -70 90 10 Z" fill="#dfe6f2" stroke={KC.ink} strokeWidth={7} />
    <path d="M -90 10 Q -90 -70 0 -70 L 0 10 Z" fill={on ? KC.red : '#7a2a2a'} stroke={KC.ink} strokeWidth={7} />
    <path d="M 0 -70 Q 90 -70 90 10 L 0 10 Z" fill={on ? '#22306a' : KC.blue} stroke={KC.ink} strokeWidth={7} />
  </g>;
}
// Cuadrícula de 529 personitas: las primeras `verdes` atinaron (mint), las demás no (rojo).
function Personas({ T, at, until, total = 529, verdes = 0, rojas = 0, x = 80, y = 950, paso = 20 }) {
  if (T < at || T > until + 0.4) return null;
  const o = 1 - kprog(T, until - 0.05, until + 0.4);
  const cols = 46, out = [], vis = Math.round(total * kprog(T, at, at + 1.6, kEase.sale));
  for (let i = 0; i < vis; i++) { const c = i % cols, rr = Math.floor(i / cols), px = x + c * paso, py = y + rr * 22;
    const col = i < verdes ? KC.mint : i >= total - rojas ? KC.red : KC.paper;
    out.push(<g key={i} transform={`translate(${px} ${py}) scale(.78)`}><circle cy={-6} r={6} fill={col} stroke={KC.ink} strokeWidth={1.5} /><path d="M -9 9 Q 0 -4 9 9 Z" fill={col} stroke={KC.ink} strokeWidth={1.5} /></g>); }
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30, opacity:o }}>{out}</svg>;
}
// Tarjeta de paso de defensa (ícono + texto).
function PasoDefensa({ T, at, until, n, icono, texto, y }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:90, right:90, top:y, zIndex:42, transform:`translateY(-50%) scale(${e.s})`, opacity:e.o, display:'flex', alignItems:'center', gap:26,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:30, padding:'20px 30px', boxShadow:`12px 12px 0 ${KC.ink}` }}>
    <div style={{ width:96, height:96, borderRadius:24, background:KC.leaf, border:`5px solid ${KC.ink}`, display:'flex', alignItems:'center', justifyContent:'center', font:`400 66px ${KF.titulo}`, color:KC.paper }}>{n}</div>
    <div style={{ font:`900 50px/1.1 ${KF.texto}`, color:KC.ink, flex:1 }}>{texto}</div>
    <div style={{ font:`400 76px ${KF.texto}` }}>{icono}</div>
  </div>;
}
// Candado que se cierra (c 0..1).
function Candado({ x, y, s = 1, c = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M -50 ${-10 - 40 * (1 - c)} L -50 -60 Q -50 -120 0 -120 Q 50 -120 50 -60 L 50 ${-10 - 40 * (1 - c)}`} fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
    <path d={`M -50 ${-10 - 40 * (1 - c)} L -50 -60 Q -50 -120 0 -120 Q 50 -120 50 -60 L 50 ${-10 - 40 * (1 - c)}`} fill="none" stroke="#cfd6e3" strokeWidth={10} strokeLinecap="round" />
    <rect x={-80} y={-20} width={160} height={130} rx={22} fill={KC.gold} stroke={KC.ink} strokeWidth={8} />
    <circle cx={0} cy={36} r={16} fill={KC.ink} /><rect x={-6} y={40} width={12} height={36} rx={5} fill={KC.ink} />
  </g>;
}

function VozClonada() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, P1: CUES.Paso1, P2: CUES.Paso2, P3: CUES.Paso3, S: CUES.Segundos, Q: CUES.Pregunta, O: CUES.Oidos, C: CUES.Confesion, D: CUES.Defensa, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const D2 = K.D + (K.Ci - K.D) * 0.54; // segunda línea de la defensa
  const svg = (c, z = 20) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>
    <defs><linearGradient id="gradVideo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7b5cff" /><stop offset="1" stopColor="#ff6bb0" /></linearGradient></defs>{c}</svg>;
  const pix = kprog(T, K.G + 2.0, K.G + 2.8, kEase.sale);
  const fal = Math.round(529 * 0.73);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el celular suena; la voz se vuelve bloques de IA */}
      <Escena T={T} a={K.G} b={K.P1}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Telefono x={300} y={760} s={0.95} T={T} vibra={1} />
          <Onda x={90} y={1110} ancho={900} alto={150} T={T} n={34} pixel={pix} />
        </>)}
      </Escena>
      <Chip T={T} at={K.G + 2.2} until={K.P1 - 0.2} texto="COPIA HECHA POR IA" x={540} y={980} tam={46} fondo={KC.ink} color={KC.cyan} borde={KC.cyan} />

      {/* 2 · paso 1: un audio corto de un video */}
      <Escena T={T} a={K.P1} b={K.P2}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Telefono x={260} y={820} s={0.78} T={T} modo="video" />
          <Onda x={470} y={830} ancho={560} alto={190} T={T} n={22} seed={9} sel={T > K.P1 + 2.6 ? [8, 13] : null} />
          <g opacity={kprog(T, K.P1 + 1.8, K.P1 + 2.2)}><Tijeras x={klerp(1180, 900, kprog(T, K.P1 + 1.8, K.P1 + 2.8, kEase.sale))} y={830} s={1.1} T={T} rot={180} /></g>
          {T > K.P1 + 3.2 && <g transform={`translate(0 ${-kprog(T, K.P1 + 3.2, K.P1 + 4.0, kEase.sale) * 0})`}>
            <rect x={600} y={960} width={300} height={110} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.P1 + 3.2, K.P1 + 3.6)} />
            <g opacity={kprog(T, K.P1 + 3.2, K.P1 + 3.6)}><Onda x={620} y={1015} ancho={260} alto={70} T={T} n={5} seed={11} color={KC.yellow} sel={[0, 5]} /></g>
          </g>}
        </>)}
      </Escena>
      <Chip T={T} at={K.P1 + 1.0} until={K.P2 - 0.2} texto="video en redes" x={260} y={1150} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.P1 + 3.4} until={K.P2 - 0.2} texto="audio corto ✂" x={750} y={1150} tam={34} borde={KC.ink} />

      {/* 3 · paso 2: el programa aprende a imitarla (por dentro de la máquina) */}
      <Escena T={T} a={K.P2} b={K.P3}>
        <FondoCircuito T={T} />
        <RedNeuronal T={T} x={250} y={640} ancho={580} alto={460} capas={[3, 5, 6, 5, 3]} onda={kprog(T, K.P2 + 0.4, K.P2 + 2.6)} />
        {svg(<>
          <Onda x={40} y={870} ancho={170} alto={110} T={T} n={5} seed={11} color={KC.yellow} sel={[0, 5]} />
          <g opacity={kprog(T, K.P2 + 2.2, K.P2 + 2.6)}><Onda x={860} y={870} ancho={190} alto={160} T={T} n={9} seed={4} color={KC.cyan} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.P2 + 0.3} until={K.P3 - 0.2} texto="su voz" x={125} y={1010} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.P2 + 2.4} until={K.P3 - 0.2} texto="la imitación" x={930} y={1010} tam={30} borde={KC.cyan} />

      {/* 4 · paso 3: te llaman con prisa */}
      <Escena T={T} a={K.P3} b={K.S}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Telefono x={540} y={800} s={0.72} T={T} vibra={1} />
          <g opacity={kprog(T, K.P3 + 1.6, K.P3 + 2.0)}><Choque x={190} y={880} s={0.85} T={T} /></g>
          <g opacity={kprog(T, K.P3 + 2.3, K.P3 + 2.7)}><Torreta x={890} y={880} s={0.85} T={T} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.P3 + 3.3} until={K.S - 0.2} texto="¡deposita YA!" x={540} y={1130} tam={56} fondo={KC.red} color={KC.paper} borde={KC.ink} />

      <Pasos T={T} y={330} total={3} hasta={K.S - 0.15} pasos={[
        { at: K.P1 + 0.9, texto: 'un audio corto de su voz' },
        { at: K.P2 + 0.05, texto: 'un programa la imita' },
        { at: K.P3 + 0.05, texto: 'te llaman con prisa' }]} />

      {/* 5 · ¿cuánto audio? VALL-E, 3 segundos */}
      <Escena T={T} a={K.S} b={K.Q}>
        <FondoLunares color={KC.lilac} />
        {svg(T > K.S + 5.0 ? <Onda x={240} y={1020} ancho={600} alto={150} T={T} n={9} seed={11} color={KC.yellow} sel={[0, 9]} /> : null)}
      </Escena>
      <Chip T={T} at={K.S + 0.2} until={K.S + 1.4} texto="¿cuánto audio necesitan?" y={600} tam={50} borde={KC.ink} />
      <TarjetaEstudio T={T} at={K.S + 1.5} until={K.S + 4.8} anio="2023" quien="Microsoft · modelo VALL-E" revista="Wang et al. · arXiv:2301.02111" y={660} />
      <NumeroGigante T={T} at={K.S + 5.0} until={K.Q - 0.2} valor={3} dur={1.0} sufijo=" s" etiqueta="de grabación" x={600} y={660} tam={300} color={KC.yellow} />
      <Chip T={T} at={K.S + 6.0} until={K.Q - 0.2} texto="voces que nunca había oído" y={1150} tam={36} borde={KC.ink} />

      {/* 6 · re-gancho: ¿lo notarías? */}
      <Escena T={T} a={K.Q} b={K.O} zoom={0.1}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <Onda x={60} y={720} ancho={420} alto={150} T={T} n={14} seed={21} />
          <Onda x={60} y={1010} ancho={420} alto={150} T={T} n={14} seed={21} pixel={0.35} copia={KC.ink} />
          <text x={270} y={620} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={4}>¿REAL?</text>
          <text x={270} y={910} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.paper} stroke={KC.ink} strokeWidth={4}>¿FALSA?</text>
        </>)}
      </Escena>

      {/* 7 · el estudio de Londres: 529 personas, 73 % */}
      <Escena T={T} a={K.O} b={K.C}>
        <FondoLunares color={KC.mint} />
      </Escena>
      <TarjetaEstudio T={T} at={K.O + 0.2} until={K.O + 4.6} anio="2023" quien="científicos de Londres (UCL)" revista="Mai et al. · PLOS ONE" y={600} />
      <Chip T={T} at={K.O + 2.0} until={K.C - 0.2} texto="529 personas escucharon" y={835} tam={38} borde={KC.ink} />
      <Personas T={T} at={K.O + 2.2} until={K.C - 0.2} verdes={T > K.O + 6.0 ? Math.round(fal * kprog(T, K.O + 6.0, K.O + 7.6, kEase.suave)) : 0} rojas={T > K.O + 7.8 ? 529 - fal : 0} x={90} y={905} />
      <NumeroGigante T={T} at={K.O + 5.6} until={K.C - 0.2} valor={73} dur={1.6} sufijo=" %" etiqueta="falsas descubiertas" x={380} y={620} tam={220} color={KC.paper} />

      {/* 8 · la confesión: esta voz es clonada, con permiso */}
      <Escena T={T} a={K.C} b={K.D}>
        <FondoLunares color={KC.yellow} />
        {svg(<Onda x={560} y={1060} ancho={460} alto={140} T={T} n={16} seed={31} color={KC.gold} />)}
      </Escena>
      <Chip T={T} at={K.C + 0.8} until={K.D - 0.2} texto="esta voz: clonada" x={790} y={720} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.C + 2.4} until={K.D - 0.2} texto="con mi permiso ✔" x={790} y={840} tam={44} borde={KC.leaf} />

      {/* 9 · cómo defenderte */}
      <Escena T={T} a={K.D} b={K.Ci}>
        <FondoLunares color={KC.teal} />
      </Escena>
      <MitoTachado T={T} at={K.D + 0.3} tacharEn={K.D + 1.5} until={K.Ci - 0.2} texto="confiar solo en la voz" y={470} />
      <PasoDefensa T={T} at={K.D + 2.4} until={K.Ci - 0.2} n="1" icono="🔑" texto="palabra clave en familia" y={680} />
      <PasoDefensa T={T} at={D2 + 0.8} until={K.Ci - 0.2} n="2" icono="☎️" texto="cuelga y marca tú al número que ya conoces" y={930} />

      {/* 10 · cierre: el mismo celular; la copia se desarma */}
      <Escena T={T} a={K.Ci} b={FIN}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          <Telefono x={300} y={760} s={0.95} T={T} vibra={1 - kprog(T, K.Ci + 2.6, K.Ci + 3.0)} burbuja={T > K.Ci + 0.8 ? '¿palabra clave?' : null} />
          <Onda x={90} y={1110} ancho={900} alto={150} T={T} n={34} pixel={1} cae={kprog(T, K.Ci + 2.0, K.Ci + 3.2, kEase.suave)} />
          <g opacity={kprog(T, K.Ci + 2.8, K.Ci + 3.2)}><Candado x={780} y={880} s={1.1} c={kprog(T, K.Ci + 3.0, K.Ci + 3.4, kEase.sale)} /></g>
        </>)}
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.P1 - 0.1} texto="Esa no es su voz: *es una copia de IA.*" />
      <Subtitulo T={T} idx={1} at={K.P1 + 0.1} until={K.P2 - 0.1} texto="Paso 1: *un audio corto* de su voz." />
      <Subtitulo T={T} idx={2} at={K.P2 + 0.1} until={K.P3 - 0.1} texto="Paso 2: *un programa la imita.*" />
      <Subtitulo T={T} idx={3} at={K.P3 + 0.1} until={K.S - 0.1} texto="Paso 3: prisa y *¡dinero ya!*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.Q - 0.1} texto="VALL-E, 2023: *solo 3 segundos.*" />
      <Subtitulo T={T} idx={5} at={K.Q + 0.1} until={K.O - 0.1} texto="¿Tú *lo notarías?*" />
      <Subtitulo T={T} idx={6} at={K.O + 0.1} until={K.C - 0.1} texto="Descubrieron las falsas *solo 73 %.*" />
      <Subtitulo T={T} idx={7} at={K.C + 0.1} until={K.D - 0.1} texto="Esta voz: *mi voz clonada,* con permiso." />
      <Subtitulo T={T} idx={8} at={K.D + 0.1} until={D2 - 0.1} texto="No confíes solo en la voz: *palabra clave.*" />
      <Subtitulo T={T} idx={9} at={D2 + 0.1} until={K.Ci - 0.1} texto="Cuelga y *marca tú.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="La voz se copia. *Su palabra, no.*" />

      <RobertVC T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Paso1 + 2.6, CUES.Paso2 - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [CUES.Paso3 + 1.2, CUES.Segundos - 0.2, 'avatar_10_serio_molesto', 'bajo-der'],
        [CUES.Segundos + 5.2, CUES.Pregunta - 0.2, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Oidos + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Oidos + 5.6, CUES.Confesion - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Confesion + 0.2, CUES.Defensa - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'grande-izq'],
        [CUES.Defensa + 0.3, CUES.Defensa + 4.8, 'avatar_13_senalando_arriba', 'bajo-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="ia" num="15" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VozClonadaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><VozClonada /></CompositionStage></div>;
}
window.VozClonadaApp = VozClonadaApp;
