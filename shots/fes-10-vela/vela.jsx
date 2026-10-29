// Shot Festivo #10 · Posadas · Científico: tu velita no quema cera: quema cera hecha gas — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md (verificacion.md: APROBADO). El dibujo es esquemático: zonas de la flama, CH / C₂ y hollín simplificados y fuera de escala.
const CERA = '#fbf3df', CERA2 = '#e8dcbc', CERAL = '#f7c65a', PIEL = '#c98a5e', PIEL2 = '#a86d45', HUMO = '#eef0f4';
const AZULF = '#4aa3ff', AMAR = '#ffd23a', NAR = '#ff8a1f';
const PAPEL = [KC.yellow, KC.cyan, KC.mint, KC.orange, KC.lilac, KC.pink];

// Papel picado que se mece arriba de la pantalla
function PapelPicado({ T, y = 0, n = 7, alto = 150 }) {
  const w = KW / n;
  return <svg width={KW} height={alto + 40} style={{ position:'absolute', left:0, top:y, zIndex:5 }}>
    <path d={`M 0 14 Q ${KW / 2} 34 ${KW} 14`} stroke={KC.ink} strokeWidth={4} fill="none" />
    {Array.from({ length: n }, (_, i) => { const a = Math.sin(T * 1.6 + i * 1.3) * 4;
      return <g key={i} transform={`translate(${i * w + w / 2} 20) rotate(${a})`}>
        <path d={`M ${-w / 2 + 6} 0 L ${w / 2 - 6} 0 L ${w / 2 - 6} ${alto - 24} ${[...Array(6)].map((_, k) => `L ${w / 2 - 6 - (k + 0.5) * (w - 12) / 6} ${alto - (k % 2 ? 24 : 4)}`).join(' ')} L ${-w / 2 + 6} ${alto - 24} Z`} fill={PAPEL[i % 6]} opacity=".93" />
        {/* estrella de posada recortada */}
        <path d={Array.from({ length: 10 }, (_, k) => { const r = k % 2 ? 9 : 22, an = (k / 10) * Math.PI * 2 - Math.PI / 2; return `${k ? 'L' : 'M'} ${Math.cos(an) * r} ${alto * 0.4 + Math.sin(an) * r}`; }).join(' ') + ' Z'} fill={KC.blue} opacity=".85" />
        <path d={`M -24 ${alto * 0.7} l 12 -12 l 12 12 l 12 -12 l 12 12`} stroke={KC.blue} strokeWidth={6} fill="none" opacity=".85" />
      </g>; })}
  </svg>;
}

// Forma de la flama (centro = punta del pabilo). esp 0 = gota (Tierra) → 1 = media esfera (microgravedad).
function formaFlama(H, W, esp = 0) {
  const h = klerp(H, W * 0.95, esp), w = klerp(W, W * 0.95, esp), b = klerp(0.14 * H, 0.02 * H, esp);
  const pt = klerp(0.35, 0.55, esp), y1 = klerp(-0.7, -1.0, esp), y2 = klerp(-0.45, -0.55, esp), y3 = klerp(-0.2, -0.05, esp);
  return `M 0 ${-h} C ${w * pt} ${h * y1} ${w} ${h * y2} ${w} ${h * y3} C ${w} ${b * 0.4} ${w * 0.55} ${b} 0 ${b} C ${-w * 0.55} ${b} ${-w} ${b * 0.4} ${-w} ${h * y3} C ${-w} ${h * y2} ${-w * pt} ${h * y1} 0 ${-h} Z`;
}
// Flama de vela con sus zonas: base azul, cono oscuro, zona amarilla (hollín que brilla) y halo.
// id: prefijo único de los degradados. esp: forma del espacio. luz 0..1 (encendido). amarillo 0..1. resalta: aro en la zona amarilla.
function Flama({ T, x, y, H = 260, W = 70, id, esp = 0, luz = 1, amarillo = 1, resalta = 0, viento = 0 }) {
  if (luz <= 0.001) return null;
  const tit = 1 + 0.035 * Math.sin(T * 11.3) + 0.02 * Math.sin(T * 23.7) * (1 - esp);
  const Hh = H * tit * klerp(0.25, 1, luz), Ww = W * klerp(0.5, 1, luz);
  const sk = (Math.sin(T * 2.3) * 2 + viento) * (1 - esp);
  const amar = amarillo * (1 - esp);
  return <g transform={`translate(${x} ${y}) skewX(${sk})`}>
    <defs>
      <radialGradient id={id + 'h'} cx="50%" cy="55%" r="50%"><stop offset="0%" stopColor={esp > 0.5 ? '#7fb8ff' : '#fff2b0'} stopOpacity=".55" /><stop offset="100%" stopColor={esp > 0.5 ? '#2a5cff' : '#ff9a2a'} stopOpacity="0" /></radialGradient>
      <linearGradient id={id + 'a'} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#fff7d6" /><stop offset="45%" stopColor={AMAR} /><stop offset="85%" stopColor={NAR} /><stop offset="100%" stopColor="#ff6a1a" /></linearGradient>
      <linearGradient id={id + 'b'} x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#2e7dff" /><stop offset="100%" stopColor="#9fd0ff" /></linearGradient>
    </defs>
    <ellipse cx={0} cy={-Hh * 0.38} rx={Ww * 3.2} ry={Hh * 0.95} fill={`url(#${id}h)`} opacity={luz * (esp > 0.5 ? 0.6 : 1)} />
    {/* zona amarilla luminosa */}
    <path d={formaFlama(Hh, Ww, esp)} fill={`url(#${id}a)`} opacity={luz * amar} />
    {/* llama azul tenue (espacio) */}
    <path d={formaFlama(Hh, Ww, esp)} fill={`url(#${id}b)`} opacity={luz * (1 - amar) * 0.85} />
    {/* cono oscuro con el vapor, junto al pabilo */}
    <path d={formaFlama(Hh * 0.42, Ww * 0.5, esp)} transform={`translate(0 ${-Hh * 0.02})`} fill="#5a3c78" opacity={0.5 * luz * amar} />
    {/* base azul */}
    <path d={`M ${-Ww * 0.98} ${-Hh * 0.17} C ${-Ww * 0.95} ${Hh * 0.08} ${-Ww * 0.5} ${Hh * 0.145} 0 ${Hh * 0.145} C ${Ww * 0.5} ${Hh * 0.145} ${Ww * 0.95} ${Hh * 0.08} ${Ww * 0.98} ${-Hh * 0.17} C ${Ww * 0.6} ${-Hh * 0.02} ${-Ww * 0.6} ${-Hh * 0.02} ${-Ww * 0.98} ${-Hh * 0.17} Z`} fill={AZULF} opacity={0.85 * luz * amar} />
    {resalta > 0 && <path d={formaFlama(Hh * 1.06, Ww * 1.15, 0)} fill="none" stroke={KC.white} strokeWidth={7} strokeDasharray="18 12" strokeDashoffset={-T * 50} opacity={resalta} />}
  </g>;
}
// Pabilo (mecha) curvo con la punta al rojo. (x, y) = donde sale de la cera.
function Pabilo({ T, x, y, s = 1, brasa = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 C 0 -20 2 -34 8 -46" stroke="#1d1712" strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle cx={8} cy={-47} r={5} fill="#ff5a1f" opacity={brasa * (0.7 + 0.3 * Math.sin(T * 9))} />
  </g>;
}
// Velita de posada: vela delgada de cera con su protector de papel de colores. (x, y) = centro de la cara de arriba.
function Velita({ T, x, y, cw = 70, alto = 700, protector = true, charco = 0.6, mano = true, s = 1 }) {
  const g = krng(4);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-cw / 2} y={0} width={cw} height={alto} fill={CERA} stroke={KC.ink} strokeWidth={6} />
    <rect x={cw * 0.12} y={6} width={cw * 0.18} height={alto - 12} fill={CERA2} opacity=".8" />
    {/* escurrimientos de cera */}
    <path d={`M ${-cw / 2} 6 q 10 40 2 70 q -6 16 6 22`} stroke={CERA2} strokeWidth={7} fill="none" />
    <ellipse cx={0} cy={0} rx={cw / 2} ry={cw * 0.16} fill={CERA} stroke={KC.ink} strokeWidth={6} />
    <ellipse cx={0} cy={0} rx={cw * 0.4 * charco} ry={cw * 0.12 * charco} fill={CERAL} opacity={0.9 * Math.min(1, charco * 2)} />
    {protector && <g transform={`translate(0 ${alto * 0.42})`}>
      <path d={`M ${-cw * 2.1} -60 L ${cw * 2.1} -60 L ${cw * 0.7} 40 L ${-cw * 0.7} 40 Z`} fill={KC.pink} stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
      <path d={`M ${-cw * 2.1} -60 ${Array.from({ length: 12 }, (_, k) => `Q ${-cw * 2.1 + (k + 0.5) * cw * 4.2 / 12} ${-84} ${-cw * 2.1 + (k + 1) * cw * 4.2 / 12} -60`).join(' ')}`} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} />
      {[-1, 0, 1].map((k) => <circle key={k} cx={k * cw * 1.05} cy={-18} r={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={3} />)}
    </g>}
    {mano && <g transform={`translate(0 ${alto * 0.62})`}>
      <path d={`M ${-cw * 1.4} 30 C ${-cw * 1.6} 200 ${cw * 1.6} 200 ${cw * 1.5} 40 Z`} fill={PIEL2} stroke={KC.ink} strokeWidth={6} />
      {[0, 1, 2, 3].map((k) => <rect key={k} x={-cw * 0.95} y={k * 40 - 10} width={cw * 1.9} height={44} rx={22} fill={PIEL} stroke={KC.ink} strokeWidth={5} />)}
      <ellipse cx={-cw * 0.85} cy={-30} rx={cw * 0.42} ry={30} fill={PIEL} stroke={KC.ink} strokeWidth={5} transform={`rotate(-30 ${-cw * 0.85} -30)`} />
    </g>}
  </g>;
}
// Molécula de oxígeno O₂ (dos bolitas rojas)
function O2({ x, y, s = 1, o = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <circle cx={-13} cy={0} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={3} /><circle cx={13} cy={0} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
// Fragmento que brilla azul: CH (C + H) o C₂ (C + C). flash 0..1
function Fragmento({ x, y, tipo = 'CH', flash = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={58} fill={AZULF} opacity={0.5 * flash} /><circle r={36} fill="#bfe3ff" opacity={0.6 * flash} />
    <circle cx={-14} cy={0} r={20} fill="#55595f" stroke={KC.ink} strokeWidth={3} />
    {tipo === 'CH' ? <circle cx={16} cy={-6} r={11} fill="#fff" stroke={KC.ink} strokeWidth={3} /> : <circle cx={20} cy={0} r={20} fill="#55595f" stroke={KC.ink} strokeWidth={3} />}
  </g>;
}
// Granito de hollín: racimo de esferitas de carbón. calor 0..1 (negro → rojo → amarillo que brilla)
function Hollin({ x, y, s = 1, calor = 0, seed = 1 }) {
  const g = krng(seed), n = 6 + Math.floor(g() * 4);
  const col = calor < 0.4 ? mixHex('#1f1a17', '#c4271b', calor / 0.4) : calor < 0.75 ? mixHex('#c4271b', '#ff9a1f', (calor - 0.4) / 0.35) : mixHex('#ff9a1f', '#fff3b0', (calor - 0.75) / 0.25);
  let px = 0, py = 0;
  const bolas = Array.from({ length: n }, () => { const b = [px, py]; px += (g() - 0.5) * 30; py += (g() - 0.5) * 30; return b; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {calor > 0.5 && <circle r={46} fill="#ffcc4a" opacity={(calor - 0.5) * 0.7} />}
    {bolas.map(([bx, by], i) => <circle key={i} cx={bx} cy={by} r={11} fill={col} stroke={calor > 0.6 ? 'none' : KC.ink} strokeWidth={2} />)}
  </g>;
}
// Flecha ondulada de aire que sube (frío = cian, caliente = naranja)
function Aire({ T, x, y0, y1, color = KC.cyan, fase = 0, o = 1, ancho = 8 }) {
  const u = ((T * 0.8 + fase) % 1), yy = klerp(y0, y1, u), al = 120;
  return <g opacity={o * Math.sin(Math.PI * u)}>
    <path d={`M ${x} ${yy + al} q 14 -30 0 -60 q -14 -30 0 -60`} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" />
    <path d={`M ${x - 16} ${yy + 14} L ${x} ${yy - 8} L ${x + 16} ${yy + 14}`} stroke={color} strokeWidth={ancho} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>;
}
// Por dentro de la flama: vapor que sube del pabilo, oxígeno que llega de afuera y la capa de fuego donde se juntan.
function FlamaPorDentro({ T, t0, x = 540, y = 1150, H = 760, W = 250, vapor = 1, oxi = 1, fuego = 1, oxN = 14 }) {
  const g = krng(31);
  const vap = Array.from({ length: 34 }, (_, i) => { const f = g(), ph = (T * 0.45 + f) % 1, sp = (g() - 0.5);
    return <circle key={i} cx={x + sp * W * 1.2 * ph + Math.sin(T * 2 + i) * 6} cy={y - 40 - ph * H * 0.75} r={9 + ph * 12} fill="#b9bcc6" opacity={vapor * (1 - ph) * 0.85} />; });
  const ox = Array.from({ length: oxN }, (_, i) => { const lado = i % 2 ? 1 : -1, f = (i / oxN + T * 0.25) % 1, yy = y - 60 - (i * 47) % (H * 0.8);
    const dist = W * klerp(2.6, 1.05, f) * (0.65 + 0.35 * (1 - (y - yy) / H));
    return <O2 key={i} x={x + lado * dist} y={yy} s={0.9} rot={T * 40 + i * 30} o={oxi * Math.min(1, f * 3) * (f > 0.9 ? (1 - f) * 10 : 1)} />; });
  return <g>
    <path d={formaFlama(H, W)} transform={`translate(${x} ${y})`} fill="rgba(255,200,80,.08)" stroke="rgba(255,255,255,.18)" strokeWidth={4} strokeDasharray="10 12" />
    {vap}{ox}
    <g transform={`translate(${x} ${y})`} opacity={fuego}>
      <path d={formaFlama(H, W)} fill="none" stroke="#ff9a1f" strokeWidth={34} opacity={0.35 + 0.1 * Math.sin(T * 9)} />
      <path d={formaFlama(H, W)} fill="none" stroke="#ffe27a" strokeWidth={12} />
    </g>
    <Pabilo T={T} x={x - 8} y={y + 60} s={2.2} />
  </g>;
}
// Faraday (esquemático) en su mesa de conferencias con una vela; niños en las gradas.
function SalaFaraday({ T, x = 540, y = 1060, ninos = 1, vela = 1 }) {
  const g = krng(9);
  return <g>
    {/* gradas en semicírculo */}
    {[0, 1, 2].map((k) => <path key={k} d={`M ${-40} ${1480 + k * 120} Q 540 ${1380 + k * 120} 1120 ${1480 + k * 120} L 1120 ${1600 + k * 120} Q 540 ${1500 + k * 120} -40 ${1600 + k * 120} Z`} fill={['#8a5a33', '#7a4e2c', '#6b4226'][k]} stroke={KC.ink} strokeWidth={6} />)}
    {Array.from({ length: 18 }, (_, i) => { const fila = Math.floor(i / 6), c = i % 6, px = 110 + c * 172 + (fila % 2) * 60, py = 1470 + fila * 120 - Math.sin((px / 1080) * Math.PI) * 60;
      const brinca = Math.max(0, Math.sin(T * 5 + i)) * 6; const pelo = ['#2b1a10', '#5a3a1a', '#c9a24a', '#1d1712'][Math.floor(g() * 4)];
      return <g key={i} opacity={ninos} transform={`translate(${px} ${py - brinca})`}>
        <path d="M -36 60 Q -36 10 0 10 Q 36 10 36 60 Z" fill={PAPEL[i % 6]} stroke={KC.ink} strokeWidth={4} />
        <circle cx={0} cy={-14} r={26} fill={i % 3 ? '#f1c39a' : PIEL} stroke={KC.ink} strokeWidth={4} />
        <path d="M -27 -18 Q 0 -54 27 -18 Q 10 -30 -27 -18 Z" fill={pelo} />
      </g>; })}
    {/* mesa */}
    <rect x={x - 330} y={y + 120} width={660} height={40} rx={8} fill="#6b4226" stroke={KC.ink} strokeWidth={7} />
    <rect x={x - 300} y={y + 160} width={600} height={200} fill="#8a5a33" stroke={KC.ink} strokeWidth={7} />
    {/* Faraday: levita oscura, camisa blanca, moño, pelo y patillas canosas */}
    <g transform={`translate(${x - 120} ${y - 120})`}>
      <path d="M -120 240 L -90 40 Q 0 0 90 40 L 120 240 Z" fill="#23262e" stroke={KC.ink} strokeWidth={7} />
      <path d="M -30 34 L 0 120 L 30 34 Z" fill="#fff" stroke={KC.ink} strokeWidth={4} />
      <path d="M -18 40 L 18 40 L 0 54 Z" fill={KC.ink} />
      <ellipse cx={0} cy={-36} rx={56} ry={66} fill="#f1c39a" stroke={KC.ink} strokeWidth={6} />
      <path d="M -58 -40 Q -66 -110 0 -106 Q 66 -110 58 -40 Q 52 -80 0 -82 Q -52 -80 -58 -40 Z" fill="#e9e6df" stroke={KC.ink} strokeWidth={4} />
      <path d="M -56 -30 Q -66 10 -40 24 L -36 -20 Z M 56 -30 Q 66 10 40 24 L 36 -20 Z" fill="#e9e6df" stroke={KC.ink} strokeWidth={3} />
      <circle cx={-20} cy={-40} r={6} fill={KC.ink} /><circle cx={20} cy={-40} r={6} fill={KC.ink} />
      <path d="M -18 -4 Q 0 8 18 -4" stroke={KC.ink} strokeWidth={4} fill="none" />
      {/* brazo que señala la vela */}
      <path d={`M 80 60 Q 160 ${80 - Math.sin(T * 3) * 10} 230 ${70 - Math.sin(T * 3) * 10}`} stroke="#23262e" strokeWidth={34} fill="none" strokeLinecap="round" />
      <circle cx={236} cy={68 - Math.sin(T * 3) * 10} r={18} fill="#f1c39a" stroke={KC.ink} strokeWidth={4} />
    </g>
    {/* vela en la mesa */}
    <Velita T={T} x={x + 170} y={y - 60} cw={50} alto={180} protector={false} mano={false} charco={0.7} />
    <Pabilo T={T} x={x + 168} y={y - 60} s={0.8} />
    <Flama T={T} x={x + 175} y={y - 98} H={130} W={30} id="fa" luz={vela} />
  </g>;
}
// Estrellas de fondo (espacio)
function Estrellas({ T, n = 60 }) {
  const g = krng(77);
  return <g>{Array.from({ length: n }, (_, i) => { const px = g() * KW, py = g() * KH, r = 1.5 + g() * 3.5, f = g() * 6; return <circle key={i} cx={px} cy={py} r={r} fill="#fff" opacity={0.4 + 0.5 * Math.max(0, Math.sin(T * 1.4 + f))} />; })}</g>;
}

function Vela() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Co: CUES.Copita, Pa: CUES.Pabilo, Va: CUES.Vapor, Az: CUES.Azul, P: CUES.Pregunta, Ho: CUES.Hollin, Go: CUES.Gota, Es: CUES.Espacio, E: CUES.Estudio, Da: CUES.Dato, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 10) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  // gancho: la velita entra y su flama se aviva con un parpadeo
  const entra = kprog(T, K.G, K.G + 0.5, kEase.sale), prende = kprog(T, K.G + 0.25, K.G + 0.75, kEase.rebote);
  // dato: se apaga (soplido), sube el humo, se acerca otra flama y el fuego baja por el humo
  const sopla = K.Da + 0.6, acerca = kprog(T, K.Da + 2.0, K.Da + 3.2, kEase.suave), baja = kprog(T, K.Da + 3.5, K.Da + 4.3, kEase.suave), reprende = T > K.Da + 4.3;
  const luzDato = T < sopla ? 1 : reprende ? kprog(T, K.Da + 4.3, K.Da + 4.7, kEase.rebote) : 1 - kprog(T, sopla, sopla + 0.25);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: la velita de la posada, en la mano */}
      <Escena T={T} a={K.G} b={K.Co} zoom={0.06}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.16)" />
        <PapelPicado T={T} />
        <Ambiente T={T} n={26} color="rgba(255,225,26,.45)" tam={[3, 8]} vel={10} />
        {svg(<g transform={`translate(0 ${(1 - entra) * 500})`}>
          <Velita T={T} x={330} y={860} cw={74} alto={900} charco={0.7} />
          <Pabilo T={T} x={327} y={860} />
          <Flama T={T} x={335} y={813} H={250} W={62} id="g" luz={prende} />
          {T > K.G + 0.25 && T < K.G + 0.9 && Array.from({ length: 8 }, (_, i) => { const u = (T - K.G - 0.25) / 0.65, an = i * 0.785; return <circle key={i} cx={335 + Math.cos(an) * 120 * u} cy={760 + Math.sin(an) * 120 * u} r={7} fill={KC.yellow} opacity={1 - u} />; })}
        </g>)}
      </Escena>
      {/* 2 · el calor derrite la cera; el aire que sube enfría la orilla: la copita */}
      <Escena T={T} a={K.Co} b={K.Pa}>
        <FondoLunares color={KC.yellow} />
        {svg((() => { const ch = kprog(T, K.Co + 0.3, K.Co + 2.6, kEase.suave), aire = kprog(T, K.Co + 2.4, K.Co + 3.0);
          return <g>
            <g transform="translate(540 980)">
              <rect x={-190} y={0} width={380} height={1000} fill={CERA} stroke={KC.ink} strokeWidth={9} />
              <rect x={60} y={20} width={60} height={980} fill={CERA2} opacity=".7" />
              {/* la copa: orilla sólida que sobresale y el charco de cera líquida */}
              <path d="M -190 0 C -190 -40 -160 -50 -150 -24 L 150 -24 C 160 -50 190 -40 190 0 Z" fill={CERA} stroke={KC.ink} strokeWidth={8} />
              <ellipse cx={0} cy={-6} rx={190} ry={52} fill={CERA} stroke={KC.ink} strokeWidth={8} />
              <ellipse cx={0} cy={-2} rx={150 * (0.2 + 0.8 * ch)} ry={36 * (0.2 + 0.8 * ch)} fill={CERAL} stroke={KC.ink} strokeWidth={4} opacity={0.95} />
              <ellipse cx={-40 * ch} cy={-12} rx={50 * ch} ry={9 * ch} fill="#fff" opacity={0.6 * ch * (0.7 + 0.3 * Math.sin(T * 3))} />
              <path d="M -190 0 L -190 120" stroke={KC.cyan} strokeWidth={14} opacity={aire} strokeLinecap="round" />
              <path d="M 190 0 L 190 120" stroke={KC.cyan} strokeWidth={14} opacity={aire} strokeLinecap="round" />
            </g>
            <Pabilo T={T} x={532} y={978} s={2} />
            <Flama T={T} x={556} y={890} H={480} W={110} id="co" />
            {[0, 0.33, 0.66].map((f, i) => <g key={i}><Aire T={T} x={290} y0={1700} y1={980} fase={f} o={aire} /><Aire T={T} x={790} y0={1700} y1={980} fase={f + 0.15} o={aire} /></g>)}
          </g>; })())}
      </Escena>
      {/* 3 · capilaridad: como el agua que trepa por una servilleta */}
      <Escena T={T} a={K.Pa} b={K.Va}>
        <FondoLunares color={KC.cyan} />
        {svg((() => { const sube = kprog(T, K.Pa + 0.4, K.Pa + 3.2, kEase.suave);
          return <g>
            {/* vaso con agua de color y una servilleta */}
            <g transform="translate(290 1000)">
              <path d="M -150 -160 L 150 -160 L 125 260 Q 0 280 -125 260 Z" fill="rgba(255,255,255,.45)" stroke={KC.ink} strokeWidth={8} />
              <path d="M -140 0 L 140 0 L 125 260 Q 0 280 -125 260 Z" fill={KC.pink} opacity=".75" />
              <g transform="rotate(-6)">
                <rect x={-50} y={-560} width={100} height={760} fill="#fff" stroke={KC.ink} strokeWidth={6} />
                <rect x={-50} y={200 - 200 - 520 * sube} width={100} height={200 + 520 * sube} fill={KC.pink} opacity=".7" />
                {[...Array(10)].map((_, k) => <line key={k} x1={-50} y1={-540 + k * 76} x2={50} y2={-540 + k * 76} stroke="#d9d4ca" strokeWidth={3} />)}
              </g>
            </g>
            {/* pabilo trenzado con la cera líquida que sube entre sus hilos */}
            <g transform="translate(800 1000)">
              <rect x={-200} y={180} width={400} height={240} fill={CERA} stroke={KC.ink} strokeWidth={8} />
              <ellipse cx={0} cy={180} rx={200} ry={44} fill={CERAL} stroke={KC.ink} strokeWidth={6} />
              {[-1, 1].map((k) => <path key={k} d={`M ${k * 20} 200 ${Array.from({ length: 8 }, (_, j) => `Q ${k * 46 * (j % 2 ? -1 : 1)} ${160 - j * 90} 0 ${130 - j * 90}`).join(' ')}`} stroke="#5b4630" strokeWidth={30} fill="none" strokeLinecap="round" />)}
              {[-1, 1].map((k) => <path key={'c' + k} d={`M ${k * 20} 200 ${Array.from({ length: 8 }, (_, j) => `Q ${k * 46 * (j % 2 ? -1 : 1)} ${160 - j * 90} 0 ${130 - j * 90}`).join(' ')}`} stroke={CERAL} strokeWidth={16} fill="none" strokeLinecap="round" strokeDasharray={`${sube * 760} 2000`} />)}
              {Array.from({ length: 6 }, (_, i) => { const u = (T * 0.6 + i / 6) % 1; return <circle key={i} cx={Math.sin(u * 20) * 20} cy={170 - u * 640 * sube} r={9} fill="#fff3c4" opacity={sube * (1 - u)} />; })}
            </g>
          </g>; })())}
      </Escena>
      {/* 4 · por dentro: el vapor de cera se junta con el oxígeno y arde (oscuro: escala de milímetros) */}
      <Escena T={T} a={K.Va} b={K.Az} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} color="rgba(255,200,120,.2)" />
        {svg(<FlamaPorDentro T={T} vapor={kprog(T, K.Va + 0.2, K.Va + 1.0)} oxi={kprog(T, K.Va + 2.2, K.Va + 3.0)} fuego={kprog(T, K.Va + 3.6, K.Va + 4.2)} />)}
      </Escena>
      {/* 5 · la base azul: pedacitos de moléculas que sueltan luz */}
      <Escena T={T} a={K.Az} b={K.P} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {svg((() => { const g = krng(5);
          return <g>
            <path d="M -60 1050 C 100 1220 980 1220 1140 1050 C 900 1150 180 1150 -60 1050 Z" fill={AZULF} opacity={0.25 + 0.1 * Math.sin(T * 5)} />
            <path d="M -60 1050 C 100 1220 980 1220 1140 1050" stroke="#9fd0ff" strokeWidth={10} fill="none" opacity=".7" />
            <path d="M 160 760 Q 540 500 920 760" stroke="rgba(255,210,58,.35)" strokeWidth={60} fill="none" />
            {Array.from({ length: 12 }, (_, i) => { const px = 100 + g() * 880, py = 820 + g() * 300, at = K.Az + 0.4 + i * 0.32, f = Math.max(0, 1 - Math.abs(((T - at) % 2.2 + 2.2) % 2.2 - 0.3) * 2.5) * kprog(T, at, at + 0.1);
              return <Fragmento key={i} x={px + Math.sin(T * 1.5 + i) * 14} y={py + Math.cos(T * 1.2 + i) * 10} tipo={i % 3 ? 'CH' : 'C2'} flash={f} s={1.15} />; })}
          </g>; })())}
      </Escena>
      {/* 6 · pregunta: ¿por qué arriba es amarilla? */}
      <Escena T={T} a={K.P} b={K.Ho} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<g>
          <Velita T={T} x={330} y={1120} cw={90} alto={700} protector={false} mano={false} />
          <Pabilo T={T} x={326} y={1120} s={1.3} />
          <Flama T={T} x={337} y={1060} H={430} W={100} id="p" resalta={kprog(T, K.P + 0.3, K.P + 0.7)} />
          <text x={150} y={640} textAnchor="middle" style={{ font:`400 300px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={10} transform={`rotate(${Math.sin(T * 3) * 6} 150 540)`}>?</text>
        </g>)}
      </Escena>
      {/* 7 · hollín: granitos de carbón tan calientes que brillan (poco oxígeno) */}
      <Escena T={T} a={K.Ho} b={K.Go} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 50%, #3a2a10 0%, #0d1424 70%)' }}></div>
        {svg((() => { const g = krng(12), forma = kprog(T, K.Ho + 0.3, K.Ho + 1.6), calor = kprog(T, K.Ho + 1.8, K.Ho + 4.2, kEase.suave);
          return <g>
            {Array.from({ length: 16 }, (_, i) => { const px = 120 + g() * 840, py = 560 + g() * 700, d = g() * 0.6;
              return <Hollin key={i} x={px + Math.sin(T + i) * 12} y={py - T * 8 % 40} s={(0.6 + g() * 0.8) * kprog(forma, d * 0.6, d * 0.6 + 0.4)} calor={kclamp(calor * 1.3 - d * 0.5, 0, 1)} seed={i + 3} />; })}
            <O2 x={140 + Math.sin(T) * 20} y={1120} s={0.9} o={0.8} rot={T * 30} />
            <O2 x={930} y={700 + Math.sin(T) * 20} s={0.9} o={0.8} rot={T * 40} />
          </g>; })())}
      </Escena>
      {/* 8 · el aire caliente sube y estira la flama como gota; el hollín va a la punta */}
      <Escena T={T} a={K.Go} b={K.Es}>
        <FondoLunares color={KC.mint} />
        {svg((() => { const est = kprog(T, K.Go + 0.4, K.Go + 1.8, kEase.suave), sub = kprog(T, K.Go + 2.0, K.Go + 2.6);
          return <g>
            <Velita T={T} x={540} y={1200} cw={110} alto={700} protector={false} mano={false} charco={0.8} />
            <Pabilo T={T} x={535} y={1200} s={1.5} />
            <Flama T={T} x={546} y={1130} H={klerp(250, 560, est)} W={klerp(150, 120, est)} id="go" />
            {[0, 0.25, 0.5, 0.75].map((f, i) => <g key={i}><Aire T={T} x={360 - i % 2 * 30} y0={1150} y1={360} fase={f} color={NAR} o={est} ancho={10} /><Aire T={T} x={720 + i % 2 * 30} y0={1150} y1={360} fase={f + 0.12} color={NAR} o={est} ancho={10} /></g>)}
            {Array.from({ length: 10 }, (_, i) => { const u = (T * 0.55 + i / 10) % 1; return <circle key={i} cx={546 + Math.sin(i * 2.3) * 50 * (1 - u)} cy={1060 - u * 500 * klerp(0.5, 1, est)} r={8} fill={u > 0.6 ? '#fff3b0' : '#2a211b'} opacity={sub} />; })}
          </g>; })())}
      </Escena>
      {/* 9 · en el espacio (NASA, años 90): sin aire que suba, la flama sale redondita, chiquita y azul */}
      <Escena T={T} a={K.Es} b={K.E}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(#060a1a, #121d44)' }}></div>
        {svg((() => { const m = kprog(T, K.Es + 1.4, K.Es + 3.4, kEase.suave);
          return <g>
            <Estrellas T={T} />
            <line x1={540} y1={620} x2={540} y2={1180} stroke="rgba(255,255,255,.25)" strokeWidth={4} strokeDasharray="12 12" />
            <text x={280} y={700} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.texto}>En la Tierra</text>
            <text x={800} y={700} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={KC.texto} opacity={kprog(T, K.Es + 0.8, K.Es + 1.2)}>En el espacio</text>
            <Velita T={T} x={280} y={1080} cw={90} alto={500} protector={false} mano={false} />
            <Pabilo T={T} x={276} y={1080} s={1.3} />
            <Flama T={T} x={286} y={1020} H={300} W={70} id="ti" />
            {[0, 0.5].map((f, i) => <Aire key={i} T={T} x={170} y0={1050} y1={760} fase={f} color={NAR} ancho={7} />)}
            <g opacity={kprog(T, K.Es + 0.6, K.Es + 1.1)}>
              <Velita T={T} x={800} y={1080} cw={90} alto={500} protector={false} mano={false} />
              <Pabilo T={T} x={796} y={1080} s={1.3} />
              <Flama T={T} x={801} y={klerp(1020, 1052, m)} H={klerp(300, 300, m)} W={klerp(70, 84, m)} id="es" esp={m} />
            </g>
          </g>; })())}
      </Escena>
      {/* 10 · el estudio: Faraday, Navidad de 1860-61, Royal Institution, Londres */}
      <Escena T={T} a={K.E} b={K.Da}>
        <FondoLunares color={KC.yellow} />
        {svg(<SalaFaraday T={T} ninos={kprog(T, K.E + 2.4, K.E + 3.2)} />)}
      </Escena>
      {/* 11 · el truco: se sopla, sube el humo blanco y el fuego baja por él */}
      <Escena T={T} a={K.Da} b={K.Ci}>
        <FondoLunares color={KC.lilac} />
        {svg((() => { const hum = T > sopla ? kprog(T, sopla, sopla + 1.2) * (reprende ? 1 - kprog(T, K.Da + 4.3, K.Da + 5.0) : 1) : 0;
          const tipX = klerp(1150, 640, acerca), tipY = klerp(560, 600, acerca);
          const humoD = `M 540 940 C ${540 + Math.sin(T * 2) * 20} 860 ${560 - Math.sin(T * 1.7) * 30} 780 ${540 + Math.sin(T * 1.3) * 26} 700 C ${520 - Math.sin(T * 1.5) * 30} 620 ${560 + Math.sin(T * 1.1) * 30} 540 ${545} 440`;
          return <g>
            {/* soplido */}
            {T > sopla - 0.4 && T < sopla + 0.5 && [0, 1, 2].map((k) => { const u = kprog(T, sopla - 0.4 + k * 0.08, sopla + 0.3 + k * 0.08); return <path key={k} d={`M ${klerp(80, 420, u)} ${900 + k * 30} q 40 -20 80 0 q 40 20 80 0`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={Math.sin(Math.PI * u)} />; })}
            <Velita T={T} x={540} y={1010} cw={100} alto={800} charco={0.7} />
            <Pabilo T={T} x={536} y={1010} s={1.4} brasa={T < sopla + 1 ? 1 : 0.4} />
            <path d={humoD} stroke={HUMO} strokeWidth={26} fill="none" strokeLinecap="round" opacity={hum * 0.85} strokeDasharray={`${hum * 700} 2000`} />
            <path d={humoD} stroke="#fff" strokeWidth={9} fill="none" strokeLinecap="round" opacity={hum * 0.6} strokeDasharray={`${hum * 700} 2000`} />
            {/* el fuego que baja por el humo */}
            {baja > 0 && baja < 1 && <path d={humoD} stroke={AMAR} strokeWidth={30} fill="none" strokeLinecap="round" strokeDasharray={`${baja * 560} 2000`} strokeDashoffset={-(1 - baja) * 0} opacity={0.95} style={{ filter:'drop-shadow(0 0 16px #ff8a1f)' }} transform="" />}
            <Flama T={T} x={548} y={955} H={330} W={80} id="da" luz={luzDato} />
            {/* otra flama (cerillo largo) que se acerca */}
            {acerca > 0 && <g transform={`translate(${tipX} ${tipY}) rotate(-20)`}>
              <rect x={0} y={-10} width={460} height={20} rx={8} fill="#c9935a" stroke={KC.ink} strokeWidth={5} />
              <circle cx={0} cy={0} r={16} fill="#7a1f12" stroke={KC.ink} strokeWidth={4} />
              <Flama T={T} x={-4} y={-6} H={130} W={32} id="ce" />
            </g>}
          </g>; })())}
      </Escena>
      {/* 12 · cierre: la misma velita del inicio; por dentro, el vapor de cera ardiendo */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.blue} punto="rgba(255,255,255,.16)" />
        <PapelPicado T={T} />
        <Ambiente T={T} n={26} color="rgba(255,225,26,.45)" tam={[3, 8]} vel={10} />
        {svg(<g>
          <Velita T={T} x={330} y={860} cw={74} alto={900} charco={0.7} />
          <Pabilo T={T} x={327} y={860} />
          <Flama T={T} x={335} y={813} H={klerp(250, 290, kprog(T, K.Ci, K.Ci + 0.8, kEase.rebote))} W={66} id="ci" />
        </g>)}
        <Lupa T={T} at={K.Ci + 1.0} until={K.Ou - 0.2} x={800} y={1590} r={190} fx={335} fy={700} tinte={KC.yellow} etiqueta="POR DENTRO · vapor de cera"
          interior={(Tl, r) => <svg width={r * 2} height={r * 2}><g transform={`translate(${r} ${r}) scale(.42) translate(-540 -800)`}><FlamaPorDentro T={Tl} oxN={10} /></g></svg>} />
      </Escena>

      <Capitulo T={T} x={190} y={210} hasta={K.Ou} caps={[{ at: K.Co, titulo: 'La copita' }, { at: K.Va, titulo: 'Por dentro de la flama' }, { at: K.Go, titulo: 'La forma' }, { at: K.E, titulo: 'El experimento' }]} />

      {/* textos */}
      <Chip T={T} at={K.G + 0.2} until={K.Co - 0.2} texto="Especial Posadas" x={540} y={1500} tam={40} borde={KC.yellow} />
      <MitoTachado T={T} at={K.G + 0.5} tacharEn={K.G + 1.8} until={K.G + 2.7} texto="¿cera?" x={330} y={470} tam={52} />
      <Etq T={T} at={K.G + 2.6} until={K.Co - 0.3} x={60} y={470} texto="cera hecha gas" tam={44} color={KC.yellow} />
      <Etq T={T} at={K.Co + 1.2} until={K.Pa - 0.3} x={720} y={1080} texto="cera líquida" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Co + 2.8} until={K.Pa - 0.3} x={60} y={1460} texto="aire que sube: orilla fría" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Co + 3.2} until={K.Pa - 0.3} texto="una copita de cera" x={540} y={1580} tam={44} borde={KC.cyan} />
      <Etq T={T} at={K.Pa + 0.5} until={K.Va - 0.3} x={140} y={1440} texto="servilleta" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Pa + 0.9} until={K.Va - 0.3} x={640} y={1460} texto="pabilo" tam={32} color={KC.ink} />
      <Chip T={T} at={K.Pa + 1.6} until={K.Va - 0.3} texto="capilaridad" x={540} y={1580} tam={52} borde={KC.yellow} />
      {T > K.Va - 0.3 && T < K.P + 0.2 && <Escala T={T} z={1} pxPorMm={60} x={60} y={1440} />}
      <Etq T={T} at={K.Va + 0.6} until={K.Az - 0.3} x={600} y={1060} texto="vapor de cera" tam={34} color="#d6d9e2" />
      <Etq T={T} at={K.Va + 2.4} until={K.Az - 0.3} x={60} y={560} texto="oxígeno del aire" tam={34} color={KC.red} />
      <Chip T={T} at={K.Va + 3.9} until={K.Az - 0.3} texto="aquí arde: vapor + oxígeno" x={540} y={1580} tam={40} borde={NAR} />
      <Etq T={T} at={K.Az + 0.8} until={K.P - 0.3} x={60} y={560} texto="CH · C₂ (pedacitos de moléculas)" tam={30} color="#bfe3ff" />
      <Chip T={T} at={K.Az + 1.8} until={K.P - 0.3} texto="luz azul" x={540} y={1580} tam={52} borde={AZULF} />
      <Etq T={T} at={K.Ho + 0.8} until={K.Go - 0.3} x={60} y={480} texto="hollín (carbón)" tam={36} color={KC.texto} />
      <Etq T={T} at={K.Ho + 1.2} until={K.Go - 0.3} x={60} y={1160} texto="poco oxígeno" tam={30} color={KC.red} />
      <Chip T={T} at={K.Ho + 2.8} until={K.Go - 0.3} texto="tan calientes que brillan" x={540} y={1580} tam={44} borde={AMAR} />
      <Chip T={T} at={K.Go + 1.0} until={K.Es - 0.3} texto="convección" x={540} y={1580} tam={52} borde={NAR} />
      <Etq T={T} at={K.Go + 2.2} until={K.Es - 0.3} x={640} y={600} texto="hollín a la punta" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Es + 3.4} until={K.E - 0.3} x={690} y={1150} texto="≈ 1.5 cm · azul tenue" tam={30} lado="izq" color="#bfe3ff" />
      <Chip T={T} at={K.Es + 0.4} until={K.E - 0.3} texto="NASA · transbordador y Mir · años 90" x={540} y={1530} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Es + 3.6} until={K.E - 0.3} texto="sin aire que suba" x={540} y={1640} tam={40} borde={KC.white} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 5.6} anio="1860" quien="Michael Faraday · Londres" revista="Royal Institution · Navidad de 1860-61" x={400} y={560} />
      <Chip T={T} at={K.E + 2.6} until={K.Da - 0.3} texto="para niños y jóvenes" x={540} y={1400} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Da + 1.4} until={K.Da + 4.0} x={600} y={560} texto="humo blanco = cera" tam={32} color={KC.ink} />
      <Etq T={T} at={K.Da + 2.8} until={K.Da + 4.6} x={700} y={760} texto="a unos centímetros" tam={30} color={KC.ink} />
      <Chip T={T} at={K.Da + 4.6} until={K.Ci - 0.3} texto="¡se vuelve a prender!" x={540} y={1580} tam={46} borde={KC.yellow} />
      <Chip T={T} at={K.Ci + 2.8} until={K.Ou} texto="no es cera: es gas" x={400} y={500} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Co - 0.1} texto="No quema cera: *quema cera hecha gas.*" />
      <Subtitulo T={T} idx={1} at={K.Co + 0.1} until={K.Pa - 0.1} texto="Se derrite y forma *una copita.*" />
      <Subtitulo T={T} idx={2} at={K.Pa + 0.1} until={K.Va - 0.1} texto="El pabilo la sube: *capilaridad.*" />
      <Subtitulo T={T} idx={3} at={K.Va + 0.1} until={K.Az - 0.1} texto="Lo que arde *es el vapor.*" />
      <Subtitulo T={T} idx={4} at={K.Az + 0.1} until={K.P - 0.1} texto="Abajo, con más aire: *azul.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Ho - 0.1} texto="¿Y por qué arriba *es amarilla?*" />
      <Subtitulo T={T} idx={6} at={K.Ho + 0.1} until={K.Go - 0.1} texto="Hollín *tan caliente que brilla.*" />
      <Subtitulo T={T} idx={7} at={K.Go + 0.1} until={K.Es - 0.1} texto="El aire caliente *la estira.*" />
      <Subtitulo T={T} idx={8} at={K.Es + 0.1} until={K.E - 0.1} texto="En el espacio: *redondita y azul.*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.Da - 0.1} texto="Faraday, *Navidad de 1860.*" />
      <Subtitulo T={T} idx={10} at={K.Da + 0.1} until={K.Ci - 0.1} texto="El fuego *baja por el humo.*" />
      <Subtitulo T={T} idx={11} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="No es cera sólida: *es cera hecha gas.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Copita + 0.6, CUES.Copita + 4.6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Vapor + 0.5, CUES.Vapor + 4.8, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Hollin + 1.2, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Gota + 0.5, CUES.Gota + 4.6, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Espacio + 0.6, CUES.Espacio + 6.0, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Estudio + 0.6, CUES.Estudio + 5.6, 'avatar_08_recostado_mano', 'arriba-der'],
        [CUES.Dato + 0.5, CUES.Dato + 5.5, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="fisica" serie="Festivo" num="10" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="fisica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function VelaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Vela /></CompositionStage></div>;
}
window.VelaApp = VelaApp;
