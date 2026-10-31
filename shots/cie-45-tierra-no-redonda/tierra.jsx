// Shot Científico #45 · La Tierra no es una esfera perfecta — NARRADO (N2 "El número": 43 km + Everest vs Chimborazo).
// Datos: NASA Earth Fact Sheet (WGS84), NOAA Ocean Service (Chimborazo), medición China–Nepal 2020, gravedad normal WGS84.
// El aplastamiento se dibuja EXAGERADO (el real es ≈ 0.3 %) y en pantalla se dice. Ver guion.md y verificacion.md.
const OCEANO = '#2f7fd9', OCEANO2 = '#1d5fb0', VERDE = '#5cc46a', HIELO = '#f4fbff';

// Continentes esquemáticos (manchas) repartidos en longitud y latitud.
const T45_CONT = (() => {
  const g = krng(45), m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return Array.from({ length: 9 }, (_, i) => {
    const n = 9, pts = Array.from({ length: n }, (_, k) => { const a = k / n * Math.PI * 2, rr = 0.6 + g() * 0.5; return [Math.cos(a) * rr, Math.sin(a) * rr * 0.8]; });
    let d = ''; const s = m(pts[n - 1], pts[0]); d += `M ${s[0].toFixed(3)} ${s[1].toFixed(3)}`;
    for (let k = 0; k < n; k++) { const p = pts[k], q = m(p, pts[(k + 1) % n]); d += ` Q ${p[0].toFixed(3)} ${p[1].toFixed(3)} ${q[0].toFixed(3)} ${q[1].toFixed(3)}`; }
    return { lon: i / 9 * Math.PI * 2 + g() * 0.4, lat: (g() - 0.5) * 1.3, tam: 0.2 + g() * 0.14, d: d + ' Z' };
  });
})();

// La Tierra (dentro de un <svg>). rx/ry = semiejes (ry < rx = aplastada). gira = velocidad de giro.
function Globo({ x, y, rx, ry, T = 0, gira = 0.35, id = 'g', ecuador = 0, eje = 0, cara = 0, cinta = 0, centro = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <defs>
      <clipPath id={`clip-${id}`}><ellipse cx={0} cy={0} rx={rx} ry={ry} /></clipPath>
      <radialGradient id={`luz-${id}`} cx="35%" cy="30%" r="75%"><stop offset="0%" stopColor="#fff" stopOpacity=".38" /><stop offset="55%" stopColor="#fff" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity=".38" /></radialGradient>
    </defs>
    {eje > 0 && <line x1={0} y1={-ry - 80} x2={0} y2={ry + 80} stroke={KC.ink} strokeWidth={8} strokeDasharray="18 12" opacity={eje} />}
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={OCEANO} />
    <g clipPath={`url(#clip-${id})`}>
      {T45_CONT.map((c, i) => { const lon = c.lon + T * gira, cl = Math.cos(lon); if (cl < 0.02) return null;
        const sx = rx * Math.sin(lon) * Math.cos(c.lat), sy = -ry * Math.sin(c.lat), k = c.tam * rx;
        return <path key={i} d={c.d} transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${(k * cl).toFixed(2)} ${(k * Math.cos(c.lat) * ry / rx).toFixed(2)})`}
          fill={VERDE} stroke={KC.ink} strokeWidth={5 / k} opacity={Math.min(1, cl * 4)} />; })}
      <ellipse cx={0} cy={-ry} rx={rx * 0.5} ry={ry * 0.17} fill={HIELO} stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={0} cy={ry} rx={rx * 0.55} ry={ry * 0.15} fill={HIELO} stroke={KC.ink} strokeWidth={5} />
      <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={`url(#luz-${id})`} />
    </g>
    {ecuador > 0 && <line x1={-rx} y1={0} x2={rx} y2={0} stroke={KC.yellow} strokeWidth={7} strokeDasharray="20 12" strokeDashoffset={-T * 40} opacity={ecuador} />}
    {cinta > 0 && <g opacity={cinta}><rect x={-rx} y={-18} width={rx * 2} height={36} fill={KC.yellow} stroke={KC.ink} strokeWidth={5} clipPath={`url(#clip-${id})`} />
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={-rx + (i + 0.5) * rx * 2 / 13} y1={-18} x2={-rx + (i + 0.5) * rx * 2 / 13} y2={i % 2 ? -4 : 4} stroke={KC.ink} strokeWidth={4} />)}</g>}
    <ellipse cx={0} cy={0} rx={rx} ry={ry} fill="none" stroke={KC.ink} strokeWidth={10} />
    {eje > 0 && <g opacity={eje}><path d={`M ${-60} ${-ry - 50} A 60 18 0 1 0 60 ${-ry - 50}`} fill="none" stroke={KC.ink} strokeWidth={7} />
      <path d={`M 60 ${-ry - 50} l -26 -12 l 6 26 Z`} fill={KC.ink} /></g>}
    {centro > 0 && <g opacity={centro}><circle r={22} fill={KC.red} stroke={KC.ink} strokeWidth={6} /><circle r={7} fill="#fff" /></g>}
    {cara > 0 && <g opacity={cara}>
      {[-1, 1].map((s) => <g key={s}><ellipse cx={s * rx * 0.3} cy={-ry * 0.45} rx={30} ry={38} fill="#fff" stroke={KC.ink} strokeWidth={7} />
        <circle cx={s * rx * 0.3 + 6} cy={-ry * 0.43} r={15} fill={KC.ink} /><circle cx={s * rx * 0.3 + 11} cy={-ry * 0.48} r={5} fill="#fff" />
        <ellipse cx={s * rx * 0.48} cy={-ry * 0.2} rx={34} ry={18} fill={KC.pink} opacity=".55" /></g>)}
      <path d={`M ${-rx * 0.18} ${-ry * 0.3} Q 0 ${-ry * 0.02} ${rx * 0.18} ${-ry * 0.3}`} fill="#7a1f2b" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    </g>}
  </g>;
}
// Distancia del centro a la orilla de la elipse en el ángulo phi (grados, 0 = ecuador derecha, + = hacia el norte).
function rElipse(a, b, phi) { const p = phi * Math.PI / 180; return a * b / Math.hypot(b * Math.cos(p), a * Math.sin(p)); }
// Montaña que apunta hacia afuera desde la orilla del globo.
function MontanaOrilla({ cx, cy, a, b, phi, alto, ancho, color, p = 1 }) {
  const r = rElipse(a, b, phi), q = phi * Math.PI / 180;
  return <g transform={`translate(${cx + Math.cos(q) * r} ${cy - Math.sin(q) * r}) rotate(${90 - phi}) scale(1 ${Math.max(0.01, p)})`}><Montana x={0} y={6} ancho={ancho} alto={alto} color={color} /></g>;
}
// Báscula con carátula de aguja. aguja: grados.
function Bascula({ x, y, aguja = 0 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={0} width={340} height={70} rx={20} fill="#e9edf3" stroke={KC.ink} strokeWidth={8} />
    <path d="M -46 62 A 46 46 0 0 1 46 62 Z" fill="#fff" stroke={KC.ink} strokeWidth={6} />
    {[-50, -25, 0, 25, 50].map((a) => <line key={a} x1={0} y1={62} x2={0} y2={26} stroke={KC.ink} strokeWidth={3} transform={`rotate(${a} 0 62)`} strokeDasharray="0 26 10 0" />)}
    <line x1={0} y1={62} x2={0} y2={24} stroke={KC.red} strokeWidth={6} strokeLinecap="round" transform={`rotate(${aguja} 0 62)`} />
  </g>;
}

function TierraNoRedonda() {
  const { T, CUES } = useComposition();
  const K = CUES, FIN = K.Outro + 4;
  // gancho y cierre: la misma pelota
  const apG = kprog(T, K.Gancho + 0.3, K.Gancho + 2.2, kEase.sale);
  const GR = 270;
  // corte para Chimborazo / Panza
  const C = { x: 300, y: 860, a: 500, b: 360 };
  const PH_EV = 28, PH_CH = -1.5, H_EV = 78, H_CH = 55;
  const dEv = rElipse(C.a, C.b, PH_EV) + H_EV, dCh = rElipse(C.a, C.b, PH_CH) + H_CH;
  const punta = (phi, d) => [C.x + Math.cos(phi * Math.PI / 180) * d, C.y - Math.sin(phi * Math.PI / 180) * d];
  const EV = punta(PH_EV, dEv), CH = punta(PH_CH, dCh);
  // poco: de exagerada a real (achatamiento 0.00335)
  const rel = kprog(T, K.Poco + 0.3, K.Poco + 1.8, kEase.suave);
  const pulso = (a) => 1 + 0.06 * Math.sin((T - a) * 6);
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: una pelota perfecta que gira… y se aplasta (exagerado) */}
      <Escena T={T} a={K.Gancho} b={K.Gira}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Globo id="g0" x={380} y={860} rx={GR * (1 + 0.1 * apG)} ry={GR * (1 - 0.16 * apG)} T={T} gira={0.6} ecuador={kprog(T, K.Gancho + 1.6, K.Gancho + 2.2)} />
          {apG > 0.05 && apG < 0.99 && [-1, 1].map((s) => <FlechaRecta key={s} x1={380 + s * (GR + 20)} y1={860} x2={380 + s * (GR + 110)} y2={860} p={apG} color={KC.yellow} />)}
          <g opacity={1 - kprog(T, K.Gancho + 4.0, K.Gancho + 4.4)}>
            <TextoSvg x={330} y={470} tam={92} color={KC.yellow} rot={-4} s={klerp(0.5, 1, kprog(T, K.Gancho + 0.05, K.Gancho + 0.45, kEase.rebote))}>¿PELOTA</TextoSvg>
            <TextoSvg x={330} y={570} tam={92} color={KC.yellow} rot={-4} s={klerp(0.5, 1, kprog(T, K.Gancho + 0.15, K.Gancho + 0.55, kEase.rebote))}>PERFECTA?</TextoSvg>
          </g>
        </Lienzo>
        <Chip T={T} at={K.Gancho + 2.0} until={K.Gira - 0.1} texto="exagerado para que se vea" x={380} y={1150} tam={32} borde={KC.yellow} />
        <MitoTachado T={T} at={K.Gancho + 4.4} tacharEn={K.Gancho + 5.6} until={K.Gira - 0.1} texto="¿lo más lejano del centro: el Everest?" x={540} y={470} tam={40} />
      </Escena>
      {/* 1 · gira: se ensancha en el ecuador, se aplana en los polos */}
      <Escena T={T} a={K.Gira} b={K.Medida} fondo={KC.cyan}>
        <FondoLunares color={KC.cyan} />
        <Lienzo>
          <Globo id="g1" x={540} y={820} rx={330} ry={252} T={T} gira={0.9} ecuador={1} eje={kprog(T, K.Gira + 0.1, K.Gira + 0.6)} />
          {[-1, 1].map((s) => <FlechaRecta key={s} x1={540 + s * 345} y1={820} x2={540 + s * 470 * pulso(K.Gira)} y2={820} p={kprog(T, K.Gira + 0.8, K.Gira + 1.4, kEase.sale)} color={KC.yellow} />)}
          <FlechaRecta x1={720} y1={420} x2={620} y2={560} p={kprog(T, K.Gira + 2.0, K.Gira + 2.6, kEase.sale)} color={KC.pink} />
          <FlechaRecta x1={720} y1={1200} x2={620} y2={1080} p={kprog(T, K.Gira + 2.2, K.Gira + 2.8, kEase.sale)} color={KC.pink} />
        </Lienzo>
        <Etq T={T} at={K.Gira + 1.0} until={K.Medida - 0.2} x={560} y={860} texto="ecuador" color={KC.yellow} />
        <Etq T={T} at={K.Gira + 2.4} until={K.Medida - 0.2} x={735} y={410} texto="polos" color={KC.texto} />
        <Chip T={T} at={K.Gira + 0.3} until={K.Medida - 0.1} texto="exagerado para que se vea" x={640} y={300} tam={32} borde={KC.yellow} />
      </Escena>
      {/* 2 · medida: 43 km más de ecuador a ecuador */}
      <Escena T={T} a={K.Medida} b={K.Poco} fondo={KC.yellow}>
        <FondoLunares color={KC.yellow} />
        <Lienzo>
          <Globo id="g2" x={540} y={840} rx={330} ry={252} T={T} gira={0.25} />
          {(() => { const p1 = kprog(T, K.Medida + 0.4, K.Medida + 1.4, kEase.sale), p2 = kprog(T, K.Medida + 1.6, K.Medida + 2.6, kEase.sale);
            return <g>
              <line x1={210} y1={840} x2={klerp(210, 870, p1)} y2={840} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
              <line x1={210} y1={840} x2={klerp(210, 870, p1)} y2={840} stroke={KC.orange} strokeWidth={8} strokeLinecap="round" />
              <line x1={540} y1={588} x2={540} y2={klerp(588, 1092, p2)} stroke={KC.ink} strokeWidth={16} strokeLinecap="round" />
              <line x1={540} y1={588} x2={540} y2={klerp(588, 1092, p2)} stroke={KC.pink} strokeWidth={8} strokeLinecap="round" />
              <TextoSvg x={380} y={800} tam={46} color={KC.orange} o={kprog(T, K.Medida + 1.2, K.Medida + 1.5)}>12,756 km</TextoSvg>
              <TextoSvg x={555} y={1000} tam={46} color={KC.pink} ancla="start" o={kprog(T, K.Medida + 2.4, K.Medida + 2.7)}>12,714 km</TextoSvg>
            </g>; })()}
        </Lienzo>
        <Etq T={T} at={K.Medida + 0.9} until={K.Poco - 0.2} x={240} y={885} texto="ecuador a ecuador" color={KC.texto} tam={28} />
        <Etq T={T} at={K.Medida + 2.1} until={K.Poco - 0.2} x={555} y={640} texto="polo a polo" color={KC.texto} tam={28} />
        <NumeroGigante T={T} at={K.Medida + 2.9} until={K.Poco - 0.1} valor={43} desde={0} prefijo="≈ " sufijo=" km más" etiqueta="de ecuador a ecuador" y={420} tam={150} />
        <Chip T={T} at={K.Medida + 0.2} until={K.Poco - 0.1} texto="dibujo exagerado" x={300} y={1150} tam={30} borde={KC.ink} />
      </Escena>
      {/* 3 · poco: sin exagerar, desde el espacio se ve redonda */}
      <Escena T={T} a={K.Poco} b={K.Pregunta} fondo={KC.noche}>
        <Lienzo><EstrellasFondo T={T} n={90} />
          <Globo id="g3" x={540} y={860} rx={klerp(330, 300 * 1.0017, rel)} ry={klerp(252, 300 * 0.9983, rel)} T={T} gira={0.3} />
        </Lienzo>
        <Chip T={T} at={K.Poco + 1.4} until={K.Pregunta - 0.1} texto="apenas un tercio de 1 %" x={540} y={320} tam={40} borde={KC.cyan} />
        <Chip T={T} at={K.Poco + 0.4} until={K.Pregunta - 0.1} texto="sin exagerar" x={540} y={1150} tam={40} borde={KC.cyan} />
        <NumeroGigante T={T} at={K.Poco + 1.6} until={K.Pregunta - 0.1} valor={0.3} dec={1} prefijo="≈ " sufijo=" %" x={540} y={470} tam={150} color={KC.cyan} />
      </Escena>
      {/* 4 · pregunta */}
      <EscenaPregunta T={T} a={K.Pregunta} b={K.Everest} />
      {/* 5 · Everest: medido desde el nivel del mar */}
      <Escena T={T} a={K.Everest} b={K.Chimborazo} fondo={KC.mint}>
        <FondoLunares color={KC.mint} />
        <Lienzo>
          <g transform={`translate(0 ${(1 - kprog(T, K.Everest + 0.1, K.Everest + 0.9, kEase.sale)) * 700})`}>
            <Montana x={480} y={1100} ancho={820} alto={600} color="#8a7b9e" />
            <path d="M 476 500 L 476 430 L 540 448 L 476 466" fill={KC.red} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />
          </g>
          <rect x={0} y={1090} width={1080} height={200} fill={OCEANO} stroke={KC.ink} strokeWidth={8} />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${i * 130 + ((T * 30) % 130) - 60} 1130 q 25 -18 50 0 t 50 0`} stroke="#fff" strokeWidth={5} fill="none" opacity=".6" />)}
          {(() => { const p = kprog(T, K.Everest + 1.4, K.Everest + 2.6, kEase.sale); return p > 0 && <g>
            <line x1={880} y1={1090} x2={880} y2={klerp(1090, 500, p)} stroke={KC.ink} strokeWidth={18} strokeLinecap="round" />
            <line x1={880} y1={1090} x2={880} y2={klerp(1090, 500, p)} stroke={KC.yellow} strokeWidth={10} strokeLinecap="round" />
            <line x1={820} y1={1090} x2={940} y2={1090} stroke={KC.ink} strokeWidth={8} />
            {p > 0.98 && <><line x1={820} y1={500} x2={940} y2={500} stroke={KC.ink} strokeWidth={8} /><line x1={540} y1={500} x2={820} y2={500} stroke={KC.ink} strokeWidth={4} strokeDasharray="12 10" /></>}
          </g>; })()}
        </Lienzo>
        <Chip T={T} at={K.Everest + 0.3} until={K.Chimborazo - 0.1} texto="desde el nivel del mar" x={540} y={300} tam={36} borde={KC.cyan} />
        <Chip T={T} at={K.Everest + 2.6} until={K.Chimborazo - 0.1} texto="≈ 8,849 m (medición 2020)" x={560} y={390} tam={46} borde={KC.yellow} />
        <Etq T={T} at={K.Everest + 1.0} until={K.Chimborazo - 0.2} x={470} y={640} texto="Everest" lado="izq" color={KC.texto} />
        <Etq T={T} at={K.Everest + 1.3} until={K.Chimborazo - 0.2} x={40} y={1160} texto="nivel del mar" color={KC.texto} tam={30} />
      </Escena>
      {/* 6–7 · Chimborazo: medido desde el centro de la Tierra (corte, exagerado) */}
      <Escena T={T} a={K.Chimborazo} b={K.Peso} fondo={KC.orange} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        <Lienzo>
          <Globo id="g6" x={C.x} y={C.y} rx={C.a} ry={C.b} T={T} gira={0} ecuador={0.7} centro={kprog(T, K.Chimborazo + 0.2, K.Chimborazo + 0.6)} />
          <MontanaOrilla cx={C.x} cy={C.y} a={C.a} b={C.b} phi={PH_EV} alto={H_EV} ancho={110} color="#8a7b9e" />
          <MontanaOrilla cx={C.x} cy={C.y} a={C.a} b={C.b} phi={PH_CH} alto={H_CH} ancho={110} color="#9a6b52" p={kprog(T, K.Chimborazo + 0.6, K.Chimborazo + 1.2, kEase.rebote)} />
          <FlechaRecta x1={C.x} y1={C.y} x2={CH[0]} y2={CH[1]} p={kprog(T, K.Chimborazo + 1.2, K.Chimborazo + 2.2, kEase.sale)} color={KC.yellow} />
          {T > K.Panza && <>
            <FlechaRecta x1={C.x} y1={C.y} x2={EV[0]} y2={EV[1]} p={kprog(T, K.Panza + 0.2, K.Panza + 1.1, kEase.sale)} color={KC.cyan} />
            <circle cx={C.x} cy={C.y} r={dEv} fill="none" stroke={KC.cyan} strokeWidth={6} strokeDasharray="16 12" opacity={kprog(T, K.Panza + 1.6, K.Panza + 2.2)} />
            {(() => { const p = kprog(T, K.Panza + 2.4, K.Panza + 3.0, kEase.rebote); return p > 0 && <g transform={`translate(${C.x + dEv + (dCh - dEv) / 2} ${CH[1] - 70}) scale(${p})`}>
              <path d={`M ${-(dCh - dEv) / 2} 40 L ${-(dCh - dEv) / 2} 0 L ${(dCh - dEv) / 2} 0 L ${(dCh - dEv) / 2} 40`} fill="none" stroke={KC.ink} strokeWidth={14} />
              <path d={`M ${-(dCh - dEv) / 2} 40 L ${-(dCh - dEv) / 2} 0 L ${(dCh - dEv) / 2} 0 L ${(dCh - dEv) / 2} 40`} fill="none" stroke={KC.yellow} strokeWidth={7} /></g>; })()}
          </>}
        </Lienzo>
        <Etq T={T} at={K.Chimborazo + 0.6} until={K.Peso - 0.2} x={C.x - 10} y={C.y + 60} texto="centro" lado="der" color={KC.texto} tam={30} />
        <Etq T={T} at={K.Chimborazo + 1.4} until={K.Peso - 0.2} x={840} y={950} texto="Chimborazo" lado="izq" color={KC.yellow} />
        <Etq T={T} at={K.Chimborazo + 2.0} until={K.Peso - 0.2} x={840} y={995} texto="volcán de Ecuador" lado="izq" color={KC.texto} tam={28} />
        <Etq T={T} at={K.Panza + 0.8} until={K.Peso - 0.2} x={EV[0] - 20} y={EV[1] - 40} texto="Everest" lado="izq" color={KC.texto} />
        <Chip T={T} at={K.Chimborazo + 0.3} until={K.Panza - 0.1} texto="desde el centro de la Tierra" x={600} y={330} tam={38} borde={KC.yellow} />
        <Chip T={T} at={K.Panza + 0.3} until={K.Peso - 0.1} texto="casi sobre el ecuador: la parte más ancha" x={540} y={330} tam={32} borde={KC.yellow} />
        <Chip T={T} at={K.Panza + 2.6} until={K.Peso - 0.1} texto="su cima: ≈ 2 km más lejos del centro" x={540} y={410} tam={34} borde={KC.cyan} />
        <Chip T={T} at={K.Chimborazo + 0.3} until={K.Peso - 0.1} texto="dibujo exagerado" x={300} y={1150} tam={28} borde={KC.ink} />
      </Escena>
      {/* 8 · peso: en el ecuador pesas un poquito menos */}
      <Escena T={T} a={K.Peso} b={K.Cierre} fondo={KC.lilac}>
        <FondoLunares color={KC.lilac} />
        <Lienzo>
          <Globo id="g8a" x={280} y={540} rx={95} ry={80} T={T} gira={0.8} ecuador={1} />
          <Globo id="g8b" x={800} y={540} rx={95} ry={80} T={T} gira={0.8} />
          <circle cx={280 + 95} cy={540} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Peso + 0.4, K.Peso + 0.6)} />
          <circle cx={800} cy={540 - 80} r={16} fill={KC.red} stroke={KC.ink} strokeWidth={5} opacity={kprog(T, K.Peso + 0.6, K.Peso + 0.8)} />
          {[[280, -8], [800, 8]].map(([x, ag], i) => { const e = kprog(T, K.Peso + 0.5 + i * 0.25, K.Peso + 1.0 + i * 0.25, kEase.rebote);
            const ang = klerp(-50, ag, kprog(T, K.Peso + 3.0, K.Peso + 3.8, kEase.rebote));
            return <g key={i} transform={`translate(0 ${(1 - e) * 800})`}><PersonaSimple x={x} yPies={1050} alto={300} color={i ? KC.cyan : KC.yellow} cara={i ? 'normal' : 'sonrie'} /><Bascula x={x} y={1040} aguja={ang} /></g>; })}
        </Lienzo>
        <Etq T={T} at={K.Peso + 0.7} until={K.Cierre - 0.2} x={180} y={655} texto="ecuador" color={KC.texto} tam={30} />
        <Etq T={T} at={K.Peso + 0.9} until={K.Cierre - 0.2} x={700} y={655} texto="polo" color={KC.texto} tam={30} />
        <Chip T={T} at={K.Peso + 0.4} until={K.Peso + 3.2} texto="1 · el giro" x={430} y={300} tam={36} borde={KC.yellow} />
        <Chip T={T} at={K.Peso + 1.4} until={K.Peso + 3.2} texto="2 · la panza" x={720} y={380} tam={36} borde={KC.pink} />
        <Chip T={T} at={K.Peso + 3.6} until={K.Cierre - 0.1} texto="en el ecuador: ≈ 0.5 % menos" x={540} y={340} tam={42} borde={KC.yellow} />
      </Escena>
      {/* 9 · cierre: la misma pelota del inicio, ahora panzona y simpática */}
      <Escena T={T} a={K.Cierre} b={FIN}>
        <FondoLunares color={KC.pink} />
        <Lienzo>
          <Globo id="g9" x={380} y={860} rx={GR * 1.1 * (1 + 0.02 * Math.sin(T * 4))} ry={GR * 0.84} T={T} gira={0.6} cara={kprog(T, K.Cierre + 0.4, K.Cierre + 1.0)} cinta={kprog(T, K.Cierre + 1.6, K.Cierre + 2.2)} />
          <TextoSvg x={330} y={470} tam={84} color={KC.yellow} rot={-4} s={klerp(0.5, 1, kprog(T, K.Cierre + 2.4, K.Cierre + 2.8, kEase.rebote))} o={kprog(T, K.Cierre + 2.4, K.Cierre + 2.5)}>UN POQUITO</TextoSvg>
          <TextoSvg x={330} y={565} tam={96} color={KC.yellow} rot={-4} s={klerp(0.5, 1, kprog(T, K.Cierre + 2.6, K.Cierre + 3.0, kEase.rebote))} o={kprog(T, K.Cierre + 2.6, K.Cierre + 2.7)}>PANZONA</TextoSvg>
        </Lienzo>
        <Chip T={T} at={K.Cierre + 0.3} until={K.Outro - 0.1} texto="exagerado para que se vea" x={380} y={1150} tam={32} borde={KC.yellow} />
      </Escena>

      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Gira - 0.1} texto="No es pelota: *está aplastada.*" />
      <Subtitulo T={T} idx={1} at={K.Gira + 0.1} until={K.Medida - 0.1} texto="Gira y *se ensancha.*" />
      <Subtitulo T={T} idx={2} at={K.Medida + 0.1} until={K.Poco - 0.1} texto="*≈ 43 km más* de ancho." />
      <Subtitulo T={T} idx={3} at={K.Poco + 0.1} until={K.Pregunta - 0.1} texto="Desde el espacio: *redonda.*" />
      <Subtitulo T={T} idx={4} at={K.Pregunta + 0.1} until={K.Everest - 0.1} texto="¿Cuál es *la más alta?*" />
      <Subtitulo T={T} idx={5} at={K.Everest + 0.1} until={K.Chimborazo - 0.1} texto="Desde el mar: *Everest.*" />
      <Subtitulo T={T} idx={6} at={K.Chimborazo + 0.1} until={K.Panza - 0.1} texto="Desde el centro: *Chimborazo.*" />
      <Subtitulo T={T} idx={7} at={K.Panza + 0.1} until={K.Peso - 0.1} texto="Su cima: *≈ 2 km más lejos.*" />
      <Subtitulo T={T} idx={8} at={K.Peso + 0.1} until={K.Cierre - 0.1} texto="En el ecuador *pesas menos.*" />
      <Subtitulo T={T} idx={9} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="Una pelota *panzona.*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.0, 'avatar_11_sorprendido', 'gancho'],
        [K.Gira + 0.6, K.Medida - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Medida + 2.8, K.Poco - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.Poco + 0.8, K.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Pregunta + 0.05, K.Everest + 0.1, 'avatar_07_pensativo_puno', 'grande'],
        [K.Everest + 3.4, K.Chimborazo - 0.2, 'avatar_04_bajando_lentes', 'bajo-der'],
        [K.Chimborazo + 0.5, K.Panza - 0.2, 'avatar_13_senalando_arriba', 'bajo-der'],
        [K.Panza + 3.2, K.Peso - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Peso + 3.4, K.Cierre - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.Cierre + 0.4, K.Outro - 0.1, 'avatar_08_recostado_mano', 'gancho']]} />
      <MarcaAgua T={T} tema="fisica" num="45" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="fisica" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}
function TierraApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><TierraNoRedonda /></CompositionStage></div>;
}
window.TierraApp = TierraApp;
