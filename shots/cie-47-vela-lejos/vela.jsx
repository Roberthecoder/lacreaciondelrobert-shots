// Shot Científico #47 · ¿A qué distancia puedes ver una vela? — NARRADO (N5 "El experimento" + N2 2.6 km contra 50 km).
// Datos: Krisciunas y Carona (2015), arXiv:1507.06270 (Texas A&M): vela a 338 m comparada con Vega y medida con CCD; magnitud 6;
// ≈ 2,576 m. Ver guion.md y verificacion.md. El dibujo es esquemático (distancias y tamaños no a escala).
const LLAMA = '#ffcf3a', LLAMA2 = '#ff8a1f', CERA = '#fff4dc';

// Cielo nocturno con colinas (escenas al aire libre de noche).
function Noche({ T, colina = '#1f6b5a', horizonte = 1060 }) {
  return <>
    <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${KC.violet} 0%, #141a3a 55%, ${KC.noche} 100%)` }}></div>
    <Lienzo z={1}>
      <EstrellasFondo T={T} n={80} seed={47} alto={horizonte} />
      <path d={`M 0 ${horizonte} Q 300 ${horizonte - 50} 620 ${horizonte - 10} T 1080 ${horizonte - 30} L 1080 1920 L 0 1920 Z`} fill={colina} stroke={KC.ink} strokeWidth={8} />
      <path d={`M 0 ${horizonte + 120} Q 400 ${horizonte + 70} 1080 ${horizonte + 140} L 1080 1920 L 0 1920 Z`} fill="#174f44" />
    </Lienzo>
  </>;
}
// Vela con llama que titila y resplandor. (x, y) = base de la vela. glow 0..1.
function VelaDib({ x, y, s = 1, T = 0, glow = 1, id = 'v' }) {
  const fl = 1 + 0.08 * Math.sin(T * 23) + 0.05 * Math.sin(T * 37 + 1), ld = Math.sin(T * 9) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><radialGradient id={`g${id}`}><stop offset="0%" stopColor="#fff3b0" stopOpacity=".9" /><stop offset="35%" stopColor={LLAMA} stopOpacity=".45" /><stop offset="100%" stopColor={LLAMA2} stopOpacity="0" /></radialGradient></defs>
    <circle cx={0} cy={-250} r={170 * glow * (0.95 + 0.05 * Math.sin(T * 11))} fill={`url(#g${id})`} />
    <rect x={-48} y={-200} width={96} height={200} rx={12} fill={CERA} stroke={KC.ink} strokeWidth={8} />
    <path d="M -48 -190 Q -20 -170 0 -188 Q 22 -205 48 -186" fill="none" stroke="#e8d8b4" strokeWidth={6} />
    <line x1={0} y1={-200} x2={0} y2={-222} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <g transform={`translate(0 -218) scale(1 ${fl})`}>
      <path d={`M 0 -82 C ${22 + ld} -50 26 -14 0 0 C -26 -14 ${-22 + ld} -50 0 -82 Z`} fill={LLAMA} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
      <path d={`M 0 -46 C 10 -28 12 -10 0 -2 C -12 -10 -10 -28 0 -46 Z`} fill="#fff6d0" />
    </g>
    <ellipse cx={0} cy={4} rx={70} ry={14} fill="#c9b48a" stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Puntito de luz lejano (la vela vista de lejos).
function LuzLejana({ x, y, T, r = 10, glow = 1 }) {
  const p = 0.85 + 0.15 * Math.sin(T * 13);
  return <g><circle cx={x} cy={y} r={r * 6 * glow * p} fill={LLAMA} opacity={0.18} /><circle cx={x} cy={y} r={r * 3 * glow * p} fill={LLAMA} opacity={0.35} /><circle cx={x} cy={y} r={r * p} fill="#fff6d0" /></g>;
}
// Estrella de 4 puntas que brilla. b 0..1 = brillo (tamaño).
function Estrella({ x, y, b = 1, T = 0, color = '#fffbe6', fase = 0 }) {
  const r = 10 + 70 * b, t = 1 + 0.08 * Math.sin(T * 5 + fase);
  return <g transform={`translate(${x} ${y}) scale(${t})`}>
    <circle r={r * 0.9} fill={color} opacity={0.18 * b + 0.05} />
    <path d={`M 0 ${-r} Q ${r * 0.16} ${-r * 0.16} ${r} 0 Q ${r * 0.16} ${r * 0.16} 0 ${r} Q ${-r * 0.16} ${r * 0.16} ${-r} 0 Q ${-r * 0.16} ${-r * 0.16} 0 ${-r} Z`} fill={color} />
    <circle r={r * 0.18} fill="#fff" />
  </g>;
}
// Cámara CCD pequeña sobre tripié, con el objetivo hacia la izquierda.
function CamaraCCD({ x, y, s = 1, T = 0, luz = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[[-90, 330], [0, 340], [90, 330]].map(([dx, dy], i) => <line key={i} x1={0} y1={90} x2={dx} y2={dy} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" />)}
    <rect x={-30} y={70} width={60} height={40} rx={8} fill="#555" stroke={KC.ink} strokeWidth={7} />
    <rect x={-120} y={-80} width={240} height={160} rx={20} fill="#2f3542" stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={30 + i * 14} y1={-60} x2={30 + i * 14} y2={-10} stroke="#556" strokeWidth={6} />)}
    <rect x={-215} y={-55} width={100} height={110} rx={14} fill="#3b4252" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={-218} cy={0} rx={18} ry={52} fill="#123" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-218} cy={0} rx={10} ry={30} fill={LLAMA} opacity={luz * (0.6 + 0.4 * Math.sin(T * 13))} />
    <text x={-60} y={52} style={{ font:`400 46px ${KF.titulo}` }} fill={KC.gold2}>CCD</text>
  </g>;
}
// Cancha de fútbol en trapecio (vista en perspectiva). y0 = borde de abajo, y1 = borde de arriba, w0/w1 = anchos.
function Cancha({ cx, y0, y1, w0, w1, o = 1 }) {
  const P = (u, v) => [cx + (u - 0.5) * klerp(w0, w1, v), klerp(y0, y1, v)];
  const pts = [P(0, 0), P(1, 0), P(1, 1), P(0, 1)].map((p) => p.join(',')).join(' ');
  const [a1, a2] = [P(0, 0.5), P(1, 0.5)], c = P(0.5, 0.5), h = Math.abs(y0 - y1);
  return <g opacity={o}>
    <polygon points={pts} fill="#3fbf4a" stroke="#fff" strokeWidth={Math.max(1.5, h * 0.06)} />
    <line x1={a1[0]} y1={a1[1]} x2={a2[0]} y2={a2[1]} stroke="#fff" strokeWidth={Math.max(1, h * 0.04)} />
    <ellipse cx={c[0]} cy={c[1]} rx={klerp(w0, w1, 0.5) * 0.09} ry={h * 0.16} fill="none" stroke="#fff" strokeWidth={Math.max(1, h * 0.04)} />
  </g>;
}
// Ojo grande de frente; pupila 0..1 (abierta).
function OjoGrande({ x, y, s = 1, pupila = 0.3, T = 0 }) {
  const rp = klerp(34, 96, pupila);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 0 Q 0 -230 300 0 Q 0 230 -300 0 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={12} strokeLinejoin="round" />
    <circle r={140} fill={KC.teal} stroke={KC.ink} strokeWidth={9} />
    {Array.from({ length: 18 }, (_, i) => { const a = i / 18 * Math.PI * 2; return <line key={i} x1={Math.cos(a) * (rp + 8)} y1={Math.sin(a) * (rp + 8)} x2={Math.cos(a) * 132} y2={Math.sin(a) * 132} stroke="#0b6f68" strokeWidth={5} />; })}
    <circle r={rp} fill="#07080b" />
    <circle cx={-rp * 0.4} cy={-rp * 0.45} r={14} fill="#fff" opacity=".9" />
    <path d="M -300 0 Q 0 -230 300 0" fill="none" stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
  </g>;
}

function Vela() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // escena del inicio (y del cierre): persona a la izquierda, la luz de la vela en el horizonte
  const P0 = [230, 850], L0 = [800, 1010];
  const lineaDist = (p, col = '#fff') => <line x1={P0[0] + 40} y1={P0[1]} x2={klerp(P0[0] + 40, L0[0] - 20, p)} y2={klerp(P0[1], L0[1], p)} stroke={col} strokeWidth={7} strokeDasharray="22 16" strokeLinecap="round" />;
  const alejar = kprog(T, K.Calculo + 0.4, K.Calculo + 4.2, kEase.suave);
  const brillo = klerp(1, 0.12, alejar);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: noche oscura, una vela a lo lejos */}
      <Escena T={T} a={K.Gancho} b={K.Estudio} zoom={0.12} origen="70% 52%">
        <Noche T={T} />
        <Lienzo>
          <LuzLejana x={L0[0]} y={L0[1]} T={T} r={12} glow={klerp(0.4, 1.2, kprog(T, 0, 0.8, kEase.sale))} />
          <PersonaSimple x={P0[0]} yPies={1230} alto={460} color={KC.pink} cara="o" />
          {lineaDist(kprog(T, K.Gancho + 1.2, K.Gancho + 2.6, kEase.sale))}
          <TextoSvg x={560} y={900} tam={110} color={KC.yellow} rot={-6} o={kprog(T, K.Gancho + 2.4, K.Gancho + 2.8)} s={klerp(0.5, 1, kprog(T, K.Gancho + 2.4, K.Gancho + 2.9, kEase.rebote))}>?</TextoSvg>
        </Lienzo>
        <MitoTachado T={T} at={K.Gancho + 3.9} tacharEn={K.Gancho + 7.4} until={K.Estudio - 0.1} texto="internet: ¿casi 50 km?" x={540} y={500} tam={40} />
        <Chip T={T} at={K.Gancho + 8.6} until={K.Estudio - 0.1} texto="calculado: mucho menos" x={540} y={640} tam={38} borde={KC.yellow} />
      </Escena>

      {/* 1 · el estudio */}
      <Escena T={T} a={K.Estudio} b={K.Vela} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo><VelaDib x={190} y={1190} s={0.75} T={T} id="e" glow={kprog(T, K.Estudio + 3.2, K.Estudio + 3.8)} /></Lienzo>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Vela - 0.1} anio="2015" quien="Krisciunas y Carona" revista="Universidad Texas A&M" x={540} y={830} />
        <Chip T={T} at={K.Estudio + 3.2} until={K.Vela - 0.1} texto="¡a prueba!" x={330} y={460} tam={46} borde={KC.ink} />
      </Escena>

      {/* 2 · la vela a 338 m y Vega */}
      <Escena T={T} a={K.Vela} b={K.Camara} zoom={0.04}>
        <Noche T={T} horizonte={1000} />
        <Lienzo>
          <PersonaSimple x={170} yPies={1060} alto={330} color={KC.pink} />
          <VelaDib x={900} y={1060} s={0.55} T={T} id="m" />
          {(() => { const p = kprog(T, K.Vela + 0.4, K.Vela + 1.6, kEase.sale), x1 = 250, x2 = klerp(250, 860, p);
            return p > 0 && <g><line x1={x1} y1={1150} x2={x2} y2={1150} stroke={KC.yellow} strokeWidth={12} strokeLinecap="round" />
              {Array.from({ length: 11 }, (_, i) => 250 + i * 61).filter((xx) => xx <= x2).map((xx) => <line key={xx} x1={xx} y1={1132} x2={xx} y2={1168} stroke={KC.yellow} strokeWidth={6} />)}
              <TextoSvg x={555} y={1115} tam={72} color={KC.yellow} o={kprog(T, K.Vela + 1.2, K.Vela + 1.6)}>338 m</TextoSvg></g>; })()}
          <g opacity={kprog(T, K.Vela + 3.0, K.Vela + 3.6)}>
            <Estrella x={820} y={540} b={0.75} T={T} />
            <line x1={830} y1={610} x2={895} y2={800} stroke="#fff" strokeWidth={6} strokeDasharray="14 12" strokeDashoffset={-T * 40} opacity={kprog(T, K.Vela + 4.2, K.Vela + 4.8)} />
            <TextoSvg x={760} y={730} tam={60} color={KC.cyan} o={kprog(T, K.Vela + 4.2, K.Vela + 4.8)}>VS</TextoSvg>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Vela + 3.3} until={K.Camara - 0.1} texto="Vega: una estrella muy brillante" x={650} y={400} tam={32} borde={KC.cyan} />
      </Escena>

      {/* 3 · la cámara CCD */}
      <Escena T={T} a={K.Camara} b={K.Estrellas} fondo={KC.orange}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <VelaDib x={190} y={1150} s={0.7} T={T} id="c" />
          {Array.from({ length: 4 }, (_, i) => { const f = ((T * 0.9 + i / 4) % 1); return <circle key={i} cx={klerp(195, 470, f)} cy={klerp(990, 820, f)} r={10} fill={LLAMA} stroke={KC.ink} strokeWidth={3} opacity={kprog(T, K.Camara + 0.8, K.Camara + 1.2) * (1 - f * 0.6)} />; })}
          <g transform={`translate(0 ${(1 - kprog(T, K.Camara + 0.1, K.Camara + 0.7, kEase.rebote)) * 600})`}><CamaraCCD x={700} y={820} s={1.2} T={T} luz={kprog(T, K.Camara + 1.1, K.Camara + 1.5)} /></g>
          {/* pantalla: los píxeles que reciben la luz */}
          <g transform="translate(560 460)" opacity={kprog(T, K.Camara + 2.0, K.Camara + 2.4)}>
            <rect x={-10} y={-10} width={300} height={220} rx={16} fill="#0e1a2b" stroke={KC.ink} strokeWidth={8} />
            {Array.from({ length: 48 }, (_, i) => { const cx = i % 8, cy = Math.floor(i / 8), d = Math.hypot(cx - 3.5, cy - 2.5), v = Math.max(0, 1 - d / 2.6) * kprog(T, K.Camara + 2.3, K.Camara + 3.2);
              return <rect key={i} x={6 + cx * 34} y={6 + cy * 33} width={30} height={29} rx={4} fill={v > 0.02 ? LLAMA : '#1c2a40'} opacity={v > 0.02 ? 0.3 + 0.7 * v : 1} />; })}
          </g>
        </Lienzo>
        <Chip T={T} at={K.Camara + 0.5} until={K.Estrellas - 0.1} texto="cámara CCD de astronomía" x={620} y={1150} tam={38} borde={KC.ink} />
      </Escena>

      {/* 4 · escala de brillo de las estrellas */}
      <Escena T={T} a={K.Estrellas} b={K.Calculo} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 40%, #1d2550 0%, ${KC.noche} 75%)` }}></div>
        <Lienzo>
          <EstrellasFondo T={T} n={40} seed={3} alto={1900} />
          {Array.from({ length: 7 }, (_, i) => { const x = 120 + i * 140, e = kprog(T, K.Estrellas + 0.4 + i * 0.25, K.Estrellas + 0.7 + i * 0.25, kEase.rebote), seis = i === 6 && T > K.Estrellas + 3.2;
            return <g key={i} opacity={e}>
              <Estrella x={x} y={780} b={0.9 - i * 0.135} T={T} fase={i} />
              {seis && <circle cx={x} cy={780} r={60 + 6 * Math.sin(T * 6)} fill="none" stroke={KC.yellow} strokeWidth={8} />}
              <text x={x} y={900} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={seis ? KC.yellow : KC.texto} stroke={KC.ink} strokeWidth={6} paintOrder="stroke">{i}</text>
            </g>; })}
          <text x={120} y={660} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.cyan} opacity={kprog(T, K.Estrellas + 0.6, K.Estrellas + 1)}>Vega</text>
          <g opacity={kprog(T, K.Estrellas + 2.2, K.Estrellas + 2.7)}>
            <FlechaRecta x1={150} y1={980} x2={930} y2={980} p={kprog(T, K.Estrellas + 2.2, K.Estrellas + 3, kEase.sale)} color={KC.lilac} grosor={10} punta={28} />
            <text x={540} y={1060} textAnchor="middle" style={{ font:`900 38px ${KF.texto}` }} fill={KC.texto}>más débil →</text>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Estrellas + 0.2} until={K.Calculo - 0.1} texto="cielo oscuro" x={540} y={440} tam={40} borde={KC.cyan} />
        <Chip T={T} at={K.Estrellas + 3.4} until={K.Calculo - 0.1} texto="magnitud 6 ≈ lo más débil que casi cualquiera ve" x={540} y={560} tam={30} borde={KC.yellow} />
      </Escena>

      {/* 5 · el cálculo: la vela se aleja hasta brillar como una estrella de magnitud 6 */}
      <Escena T={T} a={K.Calculo} b={K.Resultado} fondo={KC.lilac} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <path d="M 60 1220 L 300 640 L 360 640 L 600 1220 Z" fill="#8f6bdf" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
          <VelaDib x={330} y={klerp(1180, 660, alejar)} s={klerp(0.9, 0.12, alejar)} T={T} id="k" glow={brillo} />
          {/* medidor de brillo */}
          <g transform="translate(880 520)">
            <text x={0} y={-24} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={7} paintOrder="stroke">brillo</text>
            <rect x={-50} y={0} width={100} height={640} rx={26} fill="rgba(14,15,18,.7)" stroke={KC.ink} strokeWidth={8} />
            <rect x={-38} y={12 + 616 * (1 - brillo)} width={76} height={616 * brillo} rx={18} fill={LLAMA} />
            <line x1={-80} y1={12 + 616 * 0.88} x2={80} y2={12 + 616 * 0.88} stroke={KC.cyan} strokeWidth={8} />
            <Estrella x={-130} y={12 + 616 * 0.88} b={0.15} T={T} />
          </g>
          {T > K.Calculo + 4.2 && <circle cx={880} cy={520 + 12 + 616 * 0.88} r={40 + 90 * kprog(T, K.Calculo + 4.2, K.Calculo + 4.9)} fill="none" stroke={KC.yellow} strokeWidth={10} opacity={1 - kprog(T, K.Calculo + 4.2, K.Calculo + 4.9)} />}
        </Lienzo>
        <Chip T={T} at={K.Calculo + 1.0} until={K.Resultado - 0.1} texto="★ = estrella de magnitud 6" x={640} y={1170} tam={32} borde={KC.cyan} />
        <Contador T={T} at={K.Calculo + 0.4} desde={338} hasta={2576} dur={3.8} sufijo=" m" x={330} y={470} tam={76} color={KC.yellow} />
      </Escena>

      {/* 6 · el resultado */}
      <Escena T={T} a={K.Resultado} b={K.Pregunta} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <NumeroGigante T={T} at={K.Resultado + 0.2} until={K.Pregunta - 0.1} valor={2.6} desde={0} dec={1} prefijo="≈ " sufijo=" km" etiqueta="su resultado" x={540} y={700} tam={210} color={KC.pink} />
        <Chip T={T} at={K.Resultado + 2.3} until={K.Pregunta - 0.1} texto="en condiciones ideales" x={540} y={1020} tam={44} borde={KC.ink} />
        <Lienzo><VelaDib x={160} y={1200} s={0.5} T={T} id="r" /></Lienzo>
      </Escena>

      {/* 7 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Real} />

      {/* 8 · 25 canchas en fila */}
      <Escena T={T} a={K.Real} b={K.Ojo} fondo={KC.cyan} zoom={0.06} origen="50% 30%">
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, ${KC.cyan} 0%, #7fe9ff 30%, #2fbf6a 30.5%, #1f8f4f 100%)` }}></div>
        <Lienzo>
          {Array.from({ length: 25 }, (_, k) => { const i = 24 - k, z0 = 1 / (1 + 0.32 * i), z1 = 1 / (1 + 0.32 * (i + 1)), y0 = 580 + 640 * z0, y1 = 580 + 640 * z1;
            const e = kprog(T, K.Real + 0.4 + i * 0.1, K.Real + 0.6 + i * 0.1);
            return <Cancha key={i} cx={540} y0={y0} y1={y1} w0={900 * z0} w1={900 * z1} o={e} />; })}
          <LuzLejana x={540} y={588} T={T} r={6} glow={kprog(T, K.Real + 2.9, K.Real + 3.3)} />
        </Lienzo>
        {(() => { const n = Math.max(0, Math.min(25, Math.floor((T - K.Real - 0.4) / 0.1) + 1)); return T > K.Real + 0.4 &&
          <div style={{ position:'absolute', left:860, top:420, transform:'translate(-50%,-50%)', zIndex:41, font:`400 110px ${KF.titulo}`, color:KC.yellow, WebkitTextStroke:`4px ${KC.ink}`, textShadow:`5px 5px 0 ${KC.ink}` }}>×{n}</div>; })()}
        <Chip T={T} at={K.Real + 3.0} until={K.Ojo - 0.1} texto="≈ 2.6 km" x={340} y={430} tam={44} borde={KC.yellow} />
      </Escena>

      {/* 9 · el ojo en la oscuridad */}
      <Escena T={T} a={K.Ojo} b={K.Cierre} fondo={KC.noche} zoom={0.08}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} color="rgba(255,225,26,.25)" />
        <Lienzo>
          <OjoGrande x={540} y={900} s={1.4} pupila={kprog(T, K.Ojo + 0.2, K.Ojo + 1.6, kEase.sale)} T={T} />
          {Array.from({ length: 6 }, (_, i) => { const f = ((T * 0.7 + i / 6) % 1); return <circle key={i} cx={klerp(1040, 560, f)} cy={klerp(700 + i * 30, 890, f)} r={7} fill={LLAMA} opacity={kprog(T, K.Ojo + 0.6, K.Ojo + 1)} />; })}
        </Lienzo>
        <Etq T={T} at={K.Ojo + 0.8} until={K.Cierre - 0.1} x={700} y={1130} texto="pupila abierta" lado="der" color={KC.texto} tam={30} />
        <Lupa T={T} at={K.Ojo + 1.5} until={K.Cierre - 0.1} x={290} y={470} r={130} fx={540} fy={900} tinte={KC.yellow} etiqueta="POR DENTRO · RETINA"
          interior={(t, r) => <svg width={r * 2} height={r * 2}><rect width={r * 2} height={r * 2} fill="#140d22" />
            {Array.from({ length: 9 }, (_, i) => { const x = 22 + i * (r * 2 - 44) / 8, on = ((t * 1.3 + i * 0.37) % 1) < 0.25;
              return <g key={i}><rect x={x - 9} y={r * 0.7} width={18} height={r * 1.2} rx={9} fill={on ? LLAMA : '#9a7fd8'} stroke={KC.ink} strokeWidth={3} />
                <circle cx={x} cy={r * 0.7 - 60 + ((t * 120 + i * 37) % 60)} r={5} fill="#fff6d0" /></g>; })}
            <text x={r} y={r * 0.42} textAnchor="middle" style={{ font:`700 22px ${KF.mono}` }} fill={KC.texto}>bastones</text></svg>} />
      </Escena>

      {/* 10 · cierre: la misma noche, ahora con la respuesta */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.06} origen="70% 52%">
        <Noche T={T} />
        <Lienzo>
          <LuzLejana x={L0[0]} y={L0[1]} T={T} r={14} glow={1.3} />
          <PersonaSimple x={P0[0]} yPies={1230} alto={460} color={KC.pink} cara="sonrie" />
          {lineaDist(kprog(T, K.Cierre + 0.2, K.Cierre + 1.0, kEase.sale), KC.yellow)}
          <TextoSvg x={500} y={870} tam={80} color={KC.yellow} rot={17} o={kprog(T, K.Cierre + 0.8, K.Cierre + 1.2)} s={klerp(0.5, 1, kprog(T, K.Cierre + 0.8, K.Cierre + 1.3, kEase.rebote))}>≈ 2.6 km</TextoSvg>
        </Lienzo>
        <MitoTachado T={T} at={K.Cierre + 0.1} tacharEn={K.Cierre + 0.6} until={K.Outro + 3.5} texto="¿casi 50 km?" x={540} y={500} tam={40} />
        <Chip T={T} at={K.Cierre + 1.6} until={K.Outro - 0.1} texto="lejos, pero no a 50 km" x={540} y={650} tam={44} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Estudio - 0.1} texto="¿Hasta dónde ves *una vela* de noche?" />
      <Subtitulo T={T} idx={1} at={K.Estudio + 0.1} until={K.Vela - 0.1} texto="Un estudio de 2015: *Texas A&M.*" />
      <Subtitulo T={T} idx={2} at={K.Vela + 0.1} until={K.Camara - 0.1} texto="Una vela a *338 metros* contra Vega." />
      <Subtitulo T={T} idx={3} at={K.Camara + 0.1} until={K.Estrellas - 0.1} texto="Su luz: *cámara CCD.*" />
      <Subtitulo T={T} idx={4} at={K.Estrellas + 0.1} until={K.Calculo - 0.1} texto="Lo más débil que ves: *magnitud 6.*" />
      <Subtitulo T={T} idx={5} at={K.Calculo + 0.1} until={K.Resultado - 0.1} texto="¿Dónde *brilla igual?*" />
      <Subtitulo T={T} idx={6} at={K.Resultado + 0.1} until={K.Pregunta - 0.1} texto="Resultado: *unos 2.6 km.*" />
      <Subtitulo T={T} idx={7} at={K.Pregunta + 0.1} until={K.Real - 0.1} texto="¿Se ve lejos *o no?*" />
      <Subtitulo T={T} idx={8} at={K.Real + 0.1} until={K.Ojo - 0.1} texto="*25 canchas* de fútbol en fila." />
      <Subtitulo T={T} idx={9} at={K.Ojo + 0.1} until={K.Cierre - 0.1} texto="Ojos *increíblemente sensibles.*" />
      <Subtitulo T={T} idx={10} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Lejos, pero *no a 50 km.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [K.Estudio + 2.6, K.Vela - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Vela + 3.6, K.Camara - 0.1, 'avatar_04_bajando_lentes', 'izq-alto'],
        [K.Estrellas + 2.5, K.Calculo + 1.5, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Resultado + 0.8, K.Pregunta - 0.1, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Pregunta + 0.05, K.Real + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.Real + 2.0, K.Ojo - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Ojo + 0.8, K.Cierre - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_12_perfil_serio', 'bajo-der']]} />
      <MarcaAgua T={T} tema="fisica" num="47" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function VelaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Vela /></CompositionStage></div>;
}
window.VelaApp = VelaApp;
