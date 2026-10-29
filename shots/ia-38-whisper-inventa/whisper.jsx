// Shot IA #38 · La IA que transcribe tu voz a veces escribe lo que nadie dijo — NARRADO (N5 "El experimento" + N1 "Por dentro").
// Datos: Koenecke, Choi, Mei, Schellmann y Sloane, "Careless Whisper: Speech-to-Text Hallucination Harms", ACM FAccT 2024
// (pruebas de abril–mayo de 2023) y AP (Burke y Schellmann, 26 oct 2024). Ver guion.md y verificacion.md.
const AZULW = '#2f6dff';
const L1 = 'Toma el pan y la crema de cacahuate.';
const L2 = 'En un tazón grande, mezcla la mantequilla.';

// Onda de audio: barras que se mueven donde hay voz (activo 0..1); línea plana donde hay silencio.
// tramos: [[desde, hasta]] en fracción 0..1 del ancho donde SÍ hay voz (por defecto, todo).
function Onda({ T, x, y, w, h = 160, activo = 1, tramos = [[0, 1]], color = KC.ink, n = 34, cabeza = null, seed = 4 }) {
  const r = krng(seed), fase = Array.from({ length: n }, () => r() * 6.28), paso = w / n;
  const voz = (f) => tramos.some(([a, b]) => f >= a && f <= b);
  return <g>
    <line x1={x} y1={y} x2={x + w} y2={y} stroke={color} strokeWidth={5} strokeLinecap="round" opacity=".5" />
    {Array.from({ length: n }, (_, i) => { const f = (i + 0.5) / n; if (!voz(f)) return null;
      const a = (0.25 + 0.75 * Math.abs(Math.sin(T * 7 + fase[i]))) * activo, hh = Math.max(8, h * a * (0.4 + 0.6 * Math.abs(Math.sin(fase[i] * 3))));
      return <rect key={i} x={x + i * paso + paso * 0.18} y={y - hh / 2} width={paso * 0.64} height={hh} rx={paso * 0.3} fill={color} />; })}
    {cabeza != null && <line x1={x + w * cabeza} y1={y - h * 0.65} x2={x + w * cabeza} y2={y + h * 0.65} stroke={KC.red} strokeWidth={6} strokeLinecap="round" />}
  </g>;
}
// Micrófono de escritorio.
function Microfono({ x, y, s = 1, rec = true, T = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-46} y={-130} width={92} height={160} rx={46} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    {[-80, -50, -20].map((yy) => <line key={yy} x1={-30} y1={yy} x2={30} y2={yy} stroke="#7f8ba3" strokeWidth={6} strokeLinecap="round" />)}
    <path d="M -72 -20 Q -72 70 0 70 Q 72 70 72 -20" fill="none" stroke={KC.ink} strokeWidth={9} strokeLinecap="round" />
    <line x1={0} y1={70} x2={0} y2={120} stroke={KC.ink} strokeWidth={9} /><rect x={-60} y={118} width={120} height={20} rx={10} fill={KC.ink} />
    {rec && <circle cx={58} cy={-118} r={14} fill={KC.red} stroke={KC.ink} strokeWidth={4} opacity={0.4 + 0.6 * (Math.sin(T * 6) > 0 ? 1 : 0)} />}
  </g>;
}
// Hoja de transcripción con dos renglones: el que sí se dijo (ok) y el inventado (rojo). Cosas por tiempo.
function HojaT({ T, at = 0, y = 760, tipo1 = 0, tipo2 = 0, brilla = 0, ok1 = 0, tacha2 = 0, sello = 0, selloTxt = 'NADIE LO DIJO', selloColor = KC.red, revisado = 0, nota = 0 }) {
  const tl = (txt, t0, t1) => txt.slice(0, Math.round(txt.length * kprog(T, t0, t1)));
  const e = kprog(T, at, at + 0.35, kEase.sale);
  const glow = brilla * (0.5 + 0.5 * Math.sin(T * 8));
  return <div style={{ position:'absolute', left:60, top:y, width:960, zIndex:30, opacity:e, transform:`translateY(${(1 - e) * 40}px) rotate(-1deg)`,
    background:'#fffdf6', border:`8px solid ${KC.ink}`, borderRadius:28, boxShadow:`14px 14px 0 ${KC.ink}`, padding:'20px 36px 26px', boxSizing:'border-box' }}>
    <div style={{ display:'flex', alignItems:'center', gap:14, font:`700 30px ${KF.mono}`, color:'#5a524a', marginBottom:14 }}>
      <div style={{ width:22, height:22, borderRadius:11, background:KC.red }}></div>Transcripción automática
    </div>
    <div style={{ position:'relative', font:`900 50px/1.18 ${KF.texto}`, color:KC.ink, marginBottom:14, paddingRight:90 }}>
      {tipo1 ? tl(L1, tipo1[0], tipo1[1]) : L1}
      {ok1 > 0 && <span style={{ position:'absolute', right:0, top:0, font:`400 64px ${KF.titulo}`, color:KC.leaf, opacity:ok1, transform:`scale(${klerp(1.8, 1, ok1)})`, WebkitTextStroke:`2px ${KC.ink}` }}>✔</span>}
    </div>
    <div style={{ position:'relative', font:`900 50px/1.18 ${KF.texto}`, color: tacha2 > 0.5 ? '#a49a8e' : KC.red, display:'inline-block',
      background:`rgba(255,59,47,${0.12 + 0.2 * glow})`, borderRadius:12, padding:'2px 10px', margin:'0 -10px' }}>
      {tipo2 ? tl(L2, tipo2[0], tipo2[1]) : L2}
      {tacha2 > 0 && <div style={{ position:'absolute', left:-6, top:'50%', height:10, width:`calc(${tacha2 * 100}% + 12px)`, background:KC.ink, borderRadius:5, transform:'rotate(-3deg)' }}></div>}
    </div>
    {nota > 0 && <div style={{ font:`700 24px ${KF.mono}`, color:'#7a7064', marginTop:14, opacity:nota }}>ejemplo real del estudio (traducido)</div>}
    {sello > 0 && <div style={{ position:'absolute', left:330, top:-62, transform:`rotate(-6deg) scale(${klerp(2.2, 1, kEase.sale(sello))})`, opacity:Math.min(1, sello * 2),
      border:`9px solid ${selloColor}`, borderRadius:18, padding:'4px 22px', font:`400 64px ${KF.titulo}`, color:selloColor, background:'rgba(255,253,246,.92)' }}>{selloTxt}</div>}
    {revisado > 0 && <div style={{ position:'absolute', right:40, bottom:-40, transform:`rotate(-6deg) scale(${klerp(2, 1, kEase.sale(revisado))})`, opacity:Math.min(1, revisado * 2),
      border:`9px solid ${KC.leaf}`, borderRadius:18, padding:'4px 22px', font:`400 60px ${KF.titulo}`, color:KC.leaf, background:'rgba(255,253,246,.95)' }}>REVISADO ✔</div>}
  </div>;
}
// Lupa simple (svg) para el cierre.
function LupaIcono({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-30)`}>
    <rect x={-16} y={70} width={32} height={120} rx={14} fill="#6b3f1f" stroke={KC.ink} strokeWidth={7} />
    <circle r={80} fill="rgba(0,210,255,.25)" stroke={KC.ink} strokeWidth={14} />
    <path d="M -40 -30 Q -30 -55 -5 -60" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" />
  </g>;
}
// Audífonos sobre el robotito.
function Audifonos({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -150 -10 Q -150 -190 0 -190 Q 150 -190 150 -10" fill="none" stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
    {[-1, 1].map((k) => <rect key={k} x={k * 150 - 28} y={-60} width={56} height={110} rx={22} fill={KC.pink} stroke={KC.ink} strokeWidth={8} />)}
  </g>;
}
// Hojita (para la cuadrícula de 100).
function Hojita({ x, y, roja, latido = 0 }) {
  const s = 1 + latido;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-20} y={-26} width={40} height={52} rx={6} fill={roja ? KC.red : '#fffdf6'} stroke={KC.ink} strokeWidth={4} />
    {[-12, 0, 12].map((ly) => <line key={ly} x1={-12} y1={ly} x2={12} y2={ly} stroke={roja ? '#ffd0cc' : '#2b3a8a'} strokeWidth={3} opacity=".7" />)}
  </g>;
}
// Globito de "frase inventada".
function Globito({ x, y, malo = 0, s = 1 }) {
  const c = mixHex('#fffdf6', '#c0261d', malo);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 -50 H 70 Q 85 -50 85 -35 V 30 Q 85 45 70 45 H -10 L -40 72 L -34 45 H -70 Q -85 45 -85 30 V -35 Q -85 -50 -70 -50 Z" fill={c} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {malo > 0.5 ? <text y={26} textAnchor="middle" style={{ font:`400 76px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={3}>!</text>
      : [-15, 5, 25].map((ly) => <line key={ly} x1={-48} y1={ly - 8} x2={48} y2={ly - 8} stroke="#9a8f80" strokeWidth={6} strokeLinecap="round" />)}
  </g>;
}
// Íconos de los tipos de daño.
function IcoViolencia({ x, y, s = 1 }) {
  const pts = Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, rr = i % 2 ? 46 : 92; return `${Math.cos(a) * rr},${Math.sin(a) * rr}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) scale(${s})`}><polygon points={pts} fill={KC.orange} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <text y={22} textAnchor="middle" style={{ font:`400 60px ${KF.titulo}` }} fill={KC.ink}>!</text></g>;
}
function IcoTermometro({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-20} y={-90} width={40} height={130} rx={20} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <circle cy={56} r={34} fill={KC.red} stroke={KC.ink} strokeWidth={7} /><rect x={-9} y={-30} width={18} height={80} fill={KC.red} />
    <text x={58} y={-36} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={AZULW} stroke={KC.ink} strokeWidth={3}>?</text>
  </g>;
}
function IcoPlay({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-90} y={-62} width={180} height={124} rx={34} fill={KC.red} stroke={KC.ink} strokeWidth={7} />
    <path d="M -24 -34 L 38 0 L -24 34 Z" fill="#fff" stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
  </g>;
}
// Tarjeta de un servicio de transcripción (sin logos: solo el nombre).
function Servicio({ T, at, x, y, nombre, ok = true }) {
  const e = kprog(T, at, at + 0.4, kEase.rebote), st = kprog(T, at + 0.5, at + 0.8, kEase.sale);
  return <div style={{ position:'absolute', left:x, top:y, width:420, height:210, transform:`translate(-50%,-50%) scale(${klerp(0.5, 1, e)})`, opacity:Math.min(1, e * 2), zIndex:30,
    background: ok ? '#fffdf6' : '#ffe1dd', border:`7px solid ${KC.ink}`, borderRadius:26, boxShadow:`10px 10px 0 ${KC.ink}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
    <div style={{ font:`900 52px ${KF.texto}`, color:KC.ink }}>{nombre}</div>
    <div style={{ opacity:st, font:`900 36px ${KF.texto}`, color:'#fff', background: ok ? KC.leaf : KC.red, border:`4px solid ${KC.ink}`, borderRadius:999, padding:'6px 22px' }}>{ok ? '0 inventos así ✔' : 'inventó ✖'}</div>
  </div>;
}
// Personita simple (consultorio).
function Persona({ x, y, s = 1, ropa = KC.white, piel = '#e7a77f', pelo = '#3b2414', bata = false, T = 0, seed = 1 }) {
  const b = mece(T, seed, 0.4) * 4;
  return <g transform={`translate(${x} ${y + b}) scale(${s})`}>
    <path d="M -120 220 Q -120 40 0 40 Q 120 40 120 220 Z" fill={ropa} stroke={KC.ink} strokeWidth={8} />
    {bata && <><path d="M -10 50 L 0 220 L 10 50" stroke={KC.ink} strokeWidth={5} fill="none" /><path d="M -50 60 Q -60 150 0 160 Q 60 150 50 60" stroke="#2b3445" strokeWidth={8} fill="none" /><circle cx={0} cy={165} r={14} fill="#7f8ba3" stroke={KC.ink} strokeWidth={4} /></>}
    <circle cy={-30} r={72} fill={piel} stroke={KC.ink} strokeWidth={8} />
    <path d="M -72 -40 Q -70 -110 0 -108 Q 70 -110 72 -40 Q 40 -80 -72 -40 Z" fill={pelo} stroke={KC.ink} strokeWidth={6} />
    <circle cx={-24} cy={-26} r={7} fill={KC.ink} /><circle cx={24} cy={-26} r={7} fill={KC.ink} />
    <path d="M -20 8 Q 0 20 20 8" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" />
  </g>;
}

function Whisper() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, W: CUES.Whisper, E: CUES.Estudio, Ci: CUES.Cifra, D: CUES.Danos, P: CUES.Pregunta, Pa: CUES.Pausas, S: CUES.Silencio, O: CUES.Otros, Co: CUES.Consulta, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const G2 = K.G + 5.9; // segunda frase del gancho («La IA le agregó una receta…»)
  const svg = (c, z) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // en el gancho: la voz se oye mientras se dice la frase 1; luego la onda queda plana (nadie habla)
  const hablaG = kprog(T, K.G + 3.0, K.G + 3.3) * (1 - kprog(T, K.G + 5.5, K.G + 5.9));
  const marcados = Math.round(4 * kprog(T, K.D + 1.0, K.D + 2.4));
  const rr = krng(9);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la transcripción con una frase que nadie dijo */}
      <Escena T={T} a={K.G} b={K.W}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Microfono x={150} y={500} s={0.95} T={T} />
          <Onda T={T} x={250} y={500} w={320} h={170} activo={0.15 + 0.85 * hablaG + 0.6 * (1 - kprog(T, K.G + 0.1, K.G + 1.2))} />
          {T > K.G + 5.6 && <text x={410} y={620} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.G + 5.6, K.G + 6.0)}>(silencio)</text>}
        </>)}
        <HojaT T={T} at={K.G} y={760} tipo1={[K.G, K.G + 0.55]} tipo2={[K.G + 0.5, K.G + 1.15]} sello={kprog(T, K.G + 1.0, K.G + 1.4)}
          ok1={kprog(T, K.G + 3.3, K.G + 3.6)} brilla={kprog(T, G2, G2 + 0.3)} nota={kprog(T, G2 + 1.0, G2 + 1.4)} />
      </Escena>
      <Chip T={T} at={G2 + 0.3} until={K.W - 0.2} texto="✨ lo agregó la IA" x={300} y={700} tam={34} borde={KC.red} />

      {/* 2 · Whisper: la IA que pasa voz a texto */}
      <Escena T={T} a={K.W} b={K.E}>
        <FondoLunares color={KC.lilac} />
        {svg(<>
          <Onda T={T} x={40} y={860} w={250} h={150} activo={1} n={14} color={KC.ink} />
          <Robotito x={540} y={880} s={1.05} T={T} cara="feliz" />
          <Audifonos x={540} y={880 + Math.sin(T * 3) * 6} s={1.05} />
          {['toma', 'el', 'pan'].map((w, i) => { const t0 = K.W + 0.5 + i * 0.35, u = kprog(T, t0, t0 + 0.5, kEase.sale);
            return <Ficha key={i} x={klerp(700, 900, u)} y={760 + i * 120} texto={w} s={u} o={u} color={[KC.yellow, KC.mint, KC.cyan][i]} tam={40} />; })}
          {Array.from({ length: 7 }, (_, i) => { const t0 = K.W + 1.9 + i * 0.16, u = kprog(T, t0, t0 + 0.3, kEase.rebote);
            return <g key={i} transform={`translate(${150 + i * 130} 1120) scale(${u})`}><circle r={40} fill={KC.leaf} stroke={KC.ink} strokeWidth={6} />
              <path d="M -18 0 L -4 14 L 20 -14" stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })}
        </>)}
      </Escena>
      <Chip T={T} at={K.W + 0.2} until={K.E - 0.2} texto="Whisper · OpenAI" x={540} y={520} tam={50} borde={KC.ink} />
      <Chip T={T} at={K.W + 0.6} until={K.E - 0.2} texto="voz → texto" x={540} y={620} tam={34} borde={KC.cyan} />

      {/* 3 · el estudio */}
      <Escena T={T} a={K.E} b={K.Ci}>
        <FondoLunares color={KC.mint} />
        {svg(<>{Array.from({ length: 18 }, (_, i) => { const x = 60 + rr() * 960, v = 60 + rr() * 80, y0 = rr() * 1900, y = ((y0 + (T - K.E) * v) % 1900);
          return <g key={i} transform={`translate(${x} ${y})`} opacity=".35"><rect x={-34} y={-24} width={68} height={48} rx={10} fill="#fff" stroke={KC.ink} strokeWidth={4} />
            {[-18, -6, 6, 18].map((bx, k) => <rect key={k} x={bx - 3} y={-8 - k % 2 * 6} width={6} height={16 + k % 2 * 12} fill={KC.ink} />)}</g>; })}</>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.Ci - 0.3} anio="2023" quien="Cornell y otras universidades" revista="Koenecke, Choi, Mei, Schellmann y Sloane" y={700} />
      <Chip T={T} at={K.E + 1.6} until={K.Ci - 0.3} texto="publicado en ACM FAccT 2024" x={540} y={975} tam={30} borde={KC.ink} />
      {T < K.Ci + 0.3 && <div style={{ opacity:1 - kprog(T, K.Ci - 0.3, K.Ci + 0.1) }}><Contador T={T} at={K.E + 2.6} hasta={13140} dur={1.6} x={540} y={1060} tam={86} color={KC.ink} /></div>}
      <Chip T={T} at={K.E + 3.0} until={K.Ci - 0.3} texto="fragmentos de audio" x={540} y={1140} tam={32} borde={KC.ink} />

      {/* 4 · una de cada cien */}
      <Escena T={T} a={K.Ci} b={K.D}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{Array.from({ length: 100 }, (_, i) => { const c = i % 10, f = Math.floor(i / 10), roja = i === 46 && T > K.Ci + 1.4;
          const ap = kprog(T, K.Ci + 0.1 + i * 0.008, K.Ci + 0.3 + i * 0.008);
          return <g key={i} opacity={ap}><Hojita x={180 + c * 80} y={640 + f * 56} roja={roja} latido={roja ? 0.25 * Math.max(0, Math.sin((T - K.Ci) * 6)) : 0} /></g>; })}</>)}
      </Escena>
      <NumeroGigante T={T} at={K.Ci + 0.2} until={K.D - 0.2} valor={1} dur={0.3} prefijo="≈ " sufijo=" de cada 100" x={540} y={420} tam={110} color={KC.red} />
      <Chip T={T} at={K.Ci + 1.6} until={K.D - 0.2} texto="frases enteras inventadas · 2023" x={540} y={548} tam={30} borde={KC.red} />

      {/* 5 · casi 4 de cada 10 inventos, dañinos */}
      <Escena T={T} a={K.D} b={K.P}>
        <FondoLunares color={KC.pink} />
        {svg(<>
          {Array.from({ length: 10 }, (_, i) => { const c = i % 5, f = Math.floor(i / 5), malo = [1, 3, 5, 8].indexOf(i) >= 0 && [1, 3, 5, 8].indexOf(i) < marcados;
            const ap = kprog(T, K.D + 0.1 + i * 0.05, K.D + 0.4 + i * 0.05, kEase.rebote);
            return <Globito key={i} x={140 + c * 200} y={730 + f * 150} malo={malo ? 1 : 0} s={0.82 * ap} />; })}
          <g opacity={kprog(T, K.D + 2.9, K.D + 3.2)}><IcoViolencia x={200} y={1040} s={0.85} /></g>
          <g opacity={kprog(T, K.D + 3.8, K.D + 4.1)}><IcoTermometro x={530} y={1030} s={0.75} /></g>
          <g opacity={kprog(T, K.D + 4.8, K.D + 5.1)}><IcoPlay x={860} y={1040} s={0.8} /></g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.D + 0.9} until={K.P - 0.2} valor={38} dur={1.4} sufijo=" %" etiqueta="de los inventos: dañinos" x={330} y={470} tam={150} color={KC.yellow} />
      <Chip T={T} at={K.D + 3.0} until={K.P - 0.2} texto="violencia" x={200} y={1130} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.D + 3.9} until={K.P - 0.2} texto="enfermedad falsa" x={530} y={1130} tam={26} borde={KC.ink} />
      <Chip T={T} at={K.D + 4.9} until={K.P - 0.2} texto="«¡gracias por ver!»" x={860} y={1130} tam={26} borde={KC.ink} />

      {/* 6 · pregunta */}
      <Escena T={T} a={K.P} b={K.Pa} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<>
          <Onda T={T} x={60} y={1120} w={420} h={60} activo={0} tramos={[]} />
          <text x={270} y={1040} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 270 860)`}>?</text>
        </>)}
      </Escena>

      {/* 7 · pausas largas */}
      <Escena T={T} a={K.Pa} b={K.S}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <g opacity={kprog(T, K.Pa + 0.05, K.Pa + 0.35)}><Onda T={T} x={90} y={620} w={900} h={130} n={40} seed={2} tramos={[[0, 0.3], [0.36, 0.7], [0.75, 1]]} cabeza={kprog(T, K.Pa + 0.4, K.S, null)} /></g>
          <g opacity={kprog(T, K.Pa + 1.2, K.Pa + 1.5)}><Onda T={T} x={90} y={900} w={900} h={130} n={40} seed={6} tramos={[[0, 0.18], [0.5, 0.62], [0.9, 1]]} cabeza={kprog(T, K.Pa + 1.3, K.S, null)} />
            {[[0.18, 0.5], [0.62, 0.9]].map(([a, b], i) => <g key={i} opacity={kprog(T, K.Pa + 1.8 + i * 0.3, K.Pa + 2.1 + i * 0.3)}>
              <rect x={90 + 900 * a + 10} y={845} width={900 * (b - a) - 20} height={110} rx={18} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={4} strokeDasharray="14 10" />
              <text x={90 + 900 * (a + b) / 2} y={912} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>pausa</text></g>)}</g>
        </>)}
      </Escena>
      <Chip T={T} at={K.Pa + 0.4} until={K.S - 0.2} texto="sin afasia" x={230} y={515} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Pa + 1.2} until={K.S - 0.2} texto="con afasia" x={230} y={795} tam={32} borde={KC.red} />
      <Chip T={T} at={K.Pa + 2.4} until={K.S - 0.2} texto="inventó más: 1.7 % vs 1.2 %" x={540} y={1100} tam={36} borde={KC.red} />

      {/* 8 · por dentro: el silencio se rellena (hipótesis) */}
      <Escena T={T} a={K.S} b={K.O}>
        <FondoCircuito T={T} />
        {svg(<>
          <line x1={50} y1={800} x2={290} y2={800} stroke={KC.cyan} strokeWidth={6} strokeLinecap="round" strokeDasharray="4 16" />
          <text x={170} y={870} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.cyan}>silencio</text>
        </>)}
        <RedNeuronal T={T} x={340} y={600} ancho={380} alto={400} capas={[3, 5, 5, 3]} onda={((T - K.S - 0.6) / 1.6) % 1.2} />
        {svg(<>{['gracias', 'por', 'ver'].map((w, i) => { const t0 = K.S + 1.8 + i * 0.5, u = kprog(T, t0, t0 + 0.45, kEase.rebote);
          return <Ficha key={i} x={890} y={680 + i * 130} texto={w} s={u * 0.95} o={Math.min(1, u * 2)} color={[KC.yellow, KC.pink, KC.mint][i]} tam={40} />; })}</>)}
      </Escena>
      <Chip T={T} at={K.S + 0.2} until={K.O - 0.2} texto="HIPÓTESIS de las autoras" x={680} y={470} tam={36} borde={KC.yellow} color={KC.yellow} />
      <Chip T={T} at={K.S + 3.2} until={K.O - 0.2} texto="rellena el hueco con texto" x={540} y={1110} tam={32} borde={KC.cyan} />

      {/* 9 · los otros servicios no inventaron */}
      <Escena T={T} a={K.O} b={K.Co}>
        <FondoLunares color={KC.yellow} />
      </Escena>
      <Chip T={T} at={K.O + 0.1} until={K.Co - 0.2} texto="los mismos 187 audios" x={400} y={480} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.O + 0.4} until={K.Co - 0.2} texto="probados en 2023 y 2024" x={400} y={560} tam={26} borde={KC.ink} />
      {T > K.O - 0.5 && T < K.Co + 0.5 && <div style={{ position:'absolute', inset:0, opacity:kprog(T, K.O - 0.3, K.O + 0.1) * (1 - kprog(T, K.Co - 0.05, K.Co + 0.45)) }}>
        <Servicio T={T} at={K.O + 0.6} x={290} y={770} nombre="Google" />
        <Servicio T={T} at={K.O + 0.9} x={790} y={770} nombre="Amazon" />
        <Servicio T={T} at={K.O + 1.2} x={290} y={1030} nombre="Microsoft" />
        <Servicio T={T} at={K.O + 1.5} x={790} y={1030} nombre="Whisper" ok={false} />
      </div>}

      {/* 10 · la consulta médica */}
      <Escena T={T} a={K.Co} b={K.C}>
        <FondoLunares color="#bfe9ff" punto="rgba(255,255,255,.5)" />
        {svg(<>
          <Persona x={250} y={820} s={0.95} ropa="#fff" bata T={T} seed={2} />
          <Persona x={830} y={820} s={0.95} ropa={KC.mint} piel="#c98a62" pelo="#16120f" T={T} seed={5} />
          <rect x={40} y={1000} width={1000} height={46} rx={14} fill="#a8703f" stroke={KC.ink} strokeWidth={8} />
          <rect x={60} y={1046} width={40} height={140} fill="#7a4f2a" stroke={KC.ink} strokeWidth={6} /><rect x={980} y={1046} width={40} height={140} fill="#7a4f2a" stroke={KC.ink} strokeWidth={6} />
          <g transform="translate(540 960)">
            <rect x={-70} y={-40} width={140} height={80} rx={16} fill="#10131a" stroke={KC.ink} strokeWidth={6} />
            <circle cx={-40} cy={0} r={12} fill={KC.red} opacity={Math.sin(T * 6) > 0 ? 1 : 0.3} />
            <Onda T={T} x={-18} y={0} w={78} h={44} n={6} color={KC.mint} />
          </g>
        </>)}
      </Escena>
      <NumeroGigante T={T} at={K.Co + 1.6} until={K.C - 0.2} valor={30000} dur={1.2} prefijo="+" etiqueta="clínicos" x={600} y={470} tam={130} color={KC.cyan} />
      <Chip T={T} at={K.Co + 0.3} until={K.C - 0.2} texto="AP · octubre 2024" x={540} y={640} tam={32} borde={KC.ink} />
      <Chip T={T} at={K.Co + 3.0} until={K.C - 0.2} texto="herramienta de Nabla basada en Whisper" x={540} y={1110} tam={30} borde={KC.ink} />

      {/* 11 · cierre: la misma transcripción, revisada */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.yellow} />
        {svg(<>
          <Microfono x={150} y={500} s={0.95} T={T} rec={false} />
          <Onda T={T} x={250} y={500} w={320} h={170} activo={0.2} />
        </>)}
        <HojaT T={T} at={K.C - 0.4} y={760} tacha2={kprog(T, K.C + 1.7, K.C + 2.3, kEase.sale)} ok1={1} revisado={kprog(T, K.C + 2.5, K.C + 2.9)} />
        {svg(<g transform={`translate(${klerp(1150, 700, kprog(T, K.C + 0.6, K.C + 1.5, kEase.sale)) + (T > K.C + 1.7 ? klerp(0, -360, kprog(T, K.C + 1.7, K.C + 2.3, kEase.suave)) : 0)} 1010)`}><LupaIcono x={0} y={0} s={0.8} /></g>, 35)}
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={G2 - 0.1} texto="Eso no lo dijo nadie: *lo escribió la IA.*" />
      <Subtitulo T={T} idx={1} at={G2} until={K.W - 0.1} texto="Le agregó *una receta.*" />
      <Subtitulo T={T} idx={2} at={K.W + 0.1} until={K.E - 0.1} texto="Whisper: *voz a texto.*" />
      <Subtitulo T={T} idx={3} at={K.E + 0.1} until={K.Ci - 0.1} texto="2023: *más de 13 mil audios.*" />
      <Subtitulo T={T} idx={4} at={K.Ci + 0.1} until={K.D - 0.1} texto="1 de cada 100: *frases inventadas.*" />
      <Subtitulo T={T} idx={5} at={K.D + 0.1} until={K.P - 0.1} texto="Casi 4 de cada 10: *dañinos.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Pa - 0.1} texto="¿Por qué *inventa?*" />
      <Subtitulo T={T} idx={7} at={K.Pa + 0.1} until={K.S - 0.1} texto="Más con *pausas largas.*" />
      <Subtitulo T={T} idx={8} at={K.S + 0.1} until={K.O - 0.1} texto="En el silencio, *rellena el hueco.*" />
      <Subtitulo T={T} idx={9} at={K.O + 0.1} until={K.Co - 0.1} texto="Los otros: *nada parecido.*" />
      <Subtitulo T={T} idx={10} at={K.Co + 0.1} until={K.C - 0.1} texto="2024: *+30 mil clínicos.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Pide *revisar tu transcripción.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.8, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Gancho + 6.2, CUES.Whisper - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Estudio + 3.0, CUES.Cifra - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Danos + 3.0, CUES.Pregunta - 0.15, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Pausas + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Silencio + 1.0, CUES.Otros - 0.2, 'avatar_06_pensativo_menton', 'izq-alto'],
        [CUES.Otros + 1.8, CUES.Consulta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Consulta + 2.5, CUES.Cierre - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Cierre + 0.5, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="38" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function WhisperApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Whisper /></CompositionStage></div>;
}
window.WhisperApp = WhisperApp;
