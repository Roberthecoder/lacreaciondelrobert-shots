// Shot Fungi Mati #59 · Ese frasco de reishi no siempre trae lo que dice — NARRADO (gancho 4 "un número que contradice" + mito vs dato con sellos).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const RX = { rojo:'#a82a14', rojo2:'#d4521f', rojo3:'#6a160a', pie:'#4a120a', ambar:'#c9772b', ambar2:'#e7a35a', tapa:'#f4f1ea', morado:'#4b2a7a', verde:'#2fbf5a' };

// Frasco genérico de suplemento (sin marca real). Base en (x, y). etiqueta = texto; tapa 0..1 = se abre.
function Frasco({ x, y, s = 1, rot = 0, etiqueta = 'REISHI', tapa = 0, color = RX.ambar, brillo = RX.ambar2, children }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-110} y={-300} width={220} height={300} rx={36} fill={color} stroke={KC.ink} strokeWidth={8} />
    <rect x={-84} y={-280} width={26} height={240} rx={13} fill={brillo} opacity=".55" />
    <rect x={-96} y={-218} width={192} height={140} rx={12} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
    <text x={0} y={-160} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{etiqueta}</text>
    <path d="M -34 -110 Q -36 -136 0 -138 Q 36 -136 34 -110 Q 0 -100 -34 -110 Z" fill={RX.rojo2} stroke={KC.ink} strokeWidth={4} />
    {children}
    <g transform={`translate(${tapa * 40} ${-300 - tapa * 70}) rotate(${tapa * 28})`}>
      <rect x={-92} y={-58} width={184} height={62} rx={14} fill={RX.tapa} stroke={KC.ink} strokeWidth={8} />
      {[-60, -30, 0, 30, 60].map((dx) => <line key={dx} x1={dx} y1={-48} x2={dx} y2={-6} stroke="#c9c2b0" strokeWidth={5} />)}
    </g>
  </g>;
}
// Frasco chiquito (para las filas de 19). estado: 0 gris · color libre en 'tinte'.
function MiniFrasco({ x, y, s = 1, tinte = '#b9b2a6', marca }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-80} width={60} height={80} rx={12} fill={tinte} stroke={KC.ink} strokeWidth={5} />
    <rect x={-26} y={-98} width={52} height={20} rx={6} fill={RX.tapa} stroke={KC.ink} strokeWidth={5} />
    <rect x={-22} y={-58} width={44} height={30} rx={4} fill={KC.paper} stroke={KC.ink} strokeWidth={3} />
    {marca === 'si' && <path d="M -14 -44 L -4 -34 L 16 -54" stroke={RX.verde} strokeWidth={7} fill="none" strokeLinecap="round" />}
    {marca === 'no' && <path d="M -12 -54 L 12 -32 M 12 -54 L -12 -32" stroke={KC.red} strokeWidth={6} strokeLinecap="round" />}
  </g>;
}
// Cápsula.
function Capsula({ x, y, rot = 0, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={-44} y={-18} width={88} height={36} rx={18} fill={RX.rojo2} stroke={KC.ink} strokeWidth={5} />
    <path d="M 0 -18 L 26 -18 Q 44 -18 44 0 Q 44 18 26 18 L 0 18 Z" fill="#f2e3c4" stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Reishi (Ganoderma) visto un poco desde arriba: sombrero en forma de riñón, rojizo y lacado, con pie LATERAL brillante
// que sale de la madera. Base del pie en (x, y). crece 0..1.
function Reishi({ T = 0, x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const p = kEase.sale(kclamp(crece * 1.4, 0, 1)), c = kEase.rebote(kclamp(crece * 1.6 - 0.5, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs>
      <radialGradient id="rxSomb" cx="35%" cy="70%" r="80%">
        <stop offset="0%" stopColor={RX.rojo3} /><stop offset="45%" stopColor={RX.rojo} /><stop offset="100%" stopColor={RX.rojo2} />
      </radialGradient>
      <linearGradient id="rxPie" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={RX.pie} /><stop offset="50%" stopColor="#7a2414" /><stop offset="100%" stopColor={RX.pie} /></linearGradient>
    </defs>
    {/* pie lateral: sale de la madera y se curva hasta la orilla del sombrero */}
    <path d={`M -26 0 Q ${-30} ${-90 * p} ${10 * p} ${-150 * p} L ${44 * p} ${-130 * p} Q ${8} ${-70 * p} 26 0 Z`} fill="url(#rxPie)" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d={`M -10 -10 Q -14 ${-70 * p} ${12 * p} ${-128 * p}`} stroke="#ffffff" strokeWidth={6} fill="none" opacity=".45" strokeLinecap="round" />
    {c > 0 && <g transform={`translate(${30} ${-150 * p}) scale(${c} ${c * 0.72})`}>
      {/* sombrero en riñón: la muesca (donde entra el pie) queda abajo a la izquierda */}
      <path d="M -10 10 Q -60 -10 -40 -80 Q -10 -170 140 -175 Q 300 -170 330 -70 Q 345 20 240 50 Q 120 75 40 45 Q 10 35 -10 10 Z" fill="url(#rxSomb)" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
      {/* zonas de crecimiento concéntricas */}
      {[0.78, 0.56, 0.34].map((k, i) => <path key={i} d={`M ${-10 + (1 - k) * 30} ${10 - (1 - k) * 30} Q ${-60 * k} ${-10 * k - (1 - k) * 60} ${-40 * k} ${-80 * k - (1 - k) * 40} Q ${-10 * k} ${-170 * k} ${140 * k} ${-175 * k} Q ${300 * k} ${-170 * k} ${330 * k} ${-70 * k} Q ${345 * k} ${20 * k} ${240 * k} ${50 * k}`} stroke="#3a0c06" strokeWidth={4} fill="none" opacity=".45" />)}
      {/* brillo de laca */}
      <path d="M 40 -140 Q 140 -165 250 -140" stroke="#ffffff" strokeWidth={14} fill="none" opacity={0.35 + 0.15 * Math.sin(T * 2)} strokeLinecap="round" />
      <ellipse cx={210} cy={-90} rx={46} ry={16} fill="#ffffff" opacity=".28" transform="rotate(-12 210 -90)" />
    </g>}
  </g>;
}
// Tronco horizontal (madera) con la cara del corte a la izquierda.
function Tronco({ x, y, w = 900, h = 170 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={30} fill="#7a4a22" stroke={KC.ink} strokeWidth={8} />
    {[30, 70, 110, 140].map((yy, i) => <path key={i} d={`M 60 ${yy} Q ${w * 0.4} ${yy - 14} ${w - 20} ${yy + 6}`} stroke="#5a3416" strokeWidth={6} fill="none" />)}
    <ellipse cx={0} cy={h / 2} rx={52} ry={h / 2} fill="#d9a86a" stroke={KC.ink} strokeWidth={8} />
    {[0.7, 0.45, 0.2].map((k, i) => <ellipse key={i} cx={0} cy={h / 2} rx={52 * k} ry={h / 2 * k} fill="none" stroke="#a8743c" strokeWidth={4} />)}
  </g>;
}
// Triterpeno esquemático (anillos fusionados: tres hexágonos y un pentágono).
function Triterpeno({ x, y, s = 1, rot = 0, color = KC.yellow, p = 1 }) {
  const hexa = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + 40 * Math.cos(a)).toFixed(1)} ${(cy + 40 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  const anillos = [hexa(0, 0), hexa(69, 0), hexa(104.5, 60), 'M 139 0 L 174 -12 L 190 22 L 163 47 L 139 40 Z'];
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={p}>
    {anillos.map((d, i) => <path key={i} d={d} fill="none" stroke={color} strokeWidth={9} strokeLinejoin="round" opacity={kclamp(p * 4 - i, 0, 1)} />)}
    <path d="M 190 22 L 230 10 L 262 30" stroke={color} strokeWidth={8} fill="none" opacity={p} />
    <circle cx={-40} cy={20} r={10} fill={KC.red} opacity={p} />
  </g>;
}
// Cadena de betaglucano: anillos de glucosa unidos, con una rama. n = cuántos, p 0..1 = cuántos se ven.
function Betaglucano({ x, y, s = 1, n = 7, p = 1, color = KC.mint, brillo = 0 }) {
  const k = Math.ceil(n * p);
  const hexa = (cx, cy) => Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return `${i ? 'L' : 'M'} ${(cx + 26 * Math.cos(a)).toFixed(1)} ${(cy + 26 * Math.sin(a)).toFixed(1)}`; }).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`} style={brillo ? { filter:`drop-shadow(0 0 ${14 * brillo}px ${color})` } : null}>
    {Array.from({ length: k }, (_, i) => { const cx = i * 70, cy = (i % 2) * 22; return <g key={i}>
      {i > 0 && <line x1={cx - 44} y1={((i - 1) % 2) * 22} x2={cx - 26} y2={cy} stroke={color} strokeWidth={6} />}
      <path d={hexa(cx, cy)} fill="rgba(47,224,168,.18)" stroke={color} strokeWidth={7} strokeLinejoin="round" />
      {i === 3 && <><line x1={cx} y1={cy + 26} x2={cx} y2={cy + 66} stroke={color} strokeWidth={6} /><path d={hexa(cx, cy + 92)} fill="rgba(47,224,168,.18)" stroke={color} strokeWidth={7} /></>}
    </g>; })}
  </g>;
}
// Producto (para la cuadrícula de 20): 0 cápsula, 1 bolsita de té, 2 frasco con polvo.
function Producto({ x, y, tipo = 0, s = 1, tache = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {tipo === 0 && <Capsula x={0} y={0} rot={-20} s={0.9} />}
    {tipo === 1 && <g><rect x={-30} y={-36} width={60} height={70} rx={8} fill="#f3e6c4" stroke={KC.ink} strokeWidth={5} /><line x1={0} y1={-36} x2={0} y2={-62} stroke={KC.ink} strokeWidth={3} /><rect x={-14} y={-80} width={28} height={20} fill={RX.rojo2} stroke={KC.ink} strokeWidth={3} /></g>}
    {tipo === 2 && <MiniFrasco x={0} y={40} s={0.85} tinte={RX.ambar} />}
    {tache > 0 && <path d="M -36 -36 L 36 36 M 36 -36 L -36 36" stroke={KC.red} strokeWidth={12} strokeLinecap="round" opacity={tache} transform={`scale(${klerp(1.6, 1, tache)})`} />}
  </g>;
}
// Hebra de ADN horizontal que corre (se "lee").
function ADN({ T, x, y, w = 900, amp = 60, vel = 2, lectura = 1 }) {
  const N = 60, pts = (f) => Array.from({ length: N + 1 }, (_, i) => { const u = i / N; return [x + u * w, y + Math.sin(u * Math.PI * 6 - T * vel + f) * amp]; });
  const a = pts(0), b = pts(Math.PI), d = (q) => 'M ' + q.map((z) => z[0].toFixed(1) + ' ' + z[1].toFixed(1)).join(' L ');
  const BASES = [KC.yellow, KC.pink, KC.cyan, KC.mint];
  return <g>
    {a.map((q, i) => i % 3 === 0 ? <line key={i} x1={q[0]} y1={q[1]} x2={b[i][0]} y2={b[i][1]} stroke={BASES[(i / 3) % 4]} strokeWidth={7} opacity={i / N <= lectura ? 1 : 0.25} /> : null)}
    <path d={d(a)} stroke={KC.lilac} strokeWidth={10} fill="none" /><path d={d(b)} stroke={KC.lilac} strokeWidth={10} fill="none" opacity=".8" />
    <rect x={x + lectura * w - 6} y={y - amp - 30} width={12} height={amp * 2 + 60} rx={6} fill="#fff" opacity={lectura < 1 ? 0.8 : 0} />
  </g>;
}
// Mapa esquemático de Eurasia (silueta simple) con zonas: lucidum (Europa y partes de China) y lingzhi (Asia).
function MapaEurasia({ x, y, s = 1, pLuc = 1, pLing = 1 }) {
  const contorno = 'M 20 120 Q 40 60 120 50 Q 170 20 230 40 Q 300 10 380 30 Q 470 0 560 20 Q 650 10 720 50 Q 800 60 820 120 Q 810 180 760 210 Q 740 260 690 300 Q 640 330 600 300 Q 560 330 520 300 Q 470 330 430 290 Q 380 300 340 250 Q 300 230 260 250 Q 220 220 180 230 Q 130 250 100 220 Q 50 200 40 170 Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={contorno} fill="#ffe9a8" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <path d="M 250 40 Q 240 140 260 250" stroke="#c9a85a" strokeWidth={5} fill="none" strokeDasharray="14 10" />
    {pLuc > 0 && [[90, 110], [140, 150], [170, 90], [200, 180], [620, 170], [660, 210]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={20 * kEase.rebote(kclamp(pLuc * 1.6 - i * 0.12, 0, 1))} fill={KC.red} stroke={KC.ink} strokeWidth={4} />)}
    {pLing > 0 && [[560, 150], [600, 230], [650, 120], [700, 170], [720, 240], [520, 220], [680, 280]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={20 * kEase.rebote(kclamp(pLing * 1.6 - i * 0.12, 0, 1))} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />)}
  </g>;
}

// posiciones de los 19 frascos (2 filas: 10 + 9)
const FR19 = Array.from({ length: 19 }, (_, i) => [i < 10 ? 100 + i * 98 : 149 + (i - 10) * 98, i < 10 ? 900 : 1040]);
const SI5 = [1, 4, 8, 12, 16];                  // los 5 que cumplían la etiqueta (posición ilustrativa)
const ALM13 = [0, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 17, 18]; // los 13 con tipo almidón (posición ilustrativa)
const BG5 = [1, 4, 8, 15, 16];                  // los 5 con el betaglucano (posición ilustrativa)

function ReishiShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, Co: CUES.Contiene, MC: CUES.MitoCancer, DC: CUES.DatoCancer, J: CUES.Junto, P: CUES.Pregunta, E: CUES.Estudio, A: CUES.Almidon, B: CUES.Betaglucano, ME: CUES.MitoEspecie, L: CUES.Lingzhi, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const tapa = kprog(T, K.G + 0.1, K.G + 0.45, kEase.sale);
  const caida = kprog(T, K.G + 0.3, K.G + 1.1);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el frasco se abre; 19 frascos, solo 5 cumplen */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Frasco x={300} y={780} s={0.95} rot={Math.sin(T * 5) * 3 * (1 - kprog(T, K.G + 1.2, K.G + 2))} tapa={tapa} />
          {caida > 0 && caida < 1 && <Capsula x={300 + caida * 170} y={440 - Math.sin(caida * Math.PI) * 160 + caida * 330} rot={caida * 540} />}
          {caida >= 1 && <Capsula x={470} y={770} rot={20} />}
          {FR19.map(([fx, fy], i) => { const on = kprog(T, K.G + 1.2 + i * 0.05, K.G + 1.5 + i * 0.05, kEase.rebote); const ok = SI5.includes(i) && T > K.G + 2.8;
            return on > 0 ? <MiniFrasco key={i} x={fx} y={fy} s={on * 0.9} tinte={ok ? RX.verde : '#b9b2a6'} marca={T > K.G + 2.8 ? (ok ? 'si' : null) : null} /> : null; })}
        </>)}
      </Escena>
      {/* 2 · el hongo: Ganoderma en un tronco */}
      <Escena T={T} a={K.H} b={K.Co} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <Tronco x={120} y={1060} w={900} h={170} />
          <Reishi T={T} x={360} y={1068} s={1.35} crece={kprog(T, K.H, K.H + 1.6)} />
        </>)}
      </Escena>
      {/* 3 · por dentro: triterpenos y polisacáridos */}
      <Escena T={T} a={K.Co} b={K.MC} zoom={0.08}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} />
        {fsvg(<>
          <Triterpeno x={170} y={760} s={1.5} rot={Math.sin(T) * 4} p={kprog(T, K.Co + 0.2, K.Co + 1.0)} />
          <Betaglucano x={150} y={1010} s={1.25} n={8} p={kprog(T, K.Co + 0.9, K.Co + 1.9)} />
        </>)}
      </Escena>
      {/* 4–5 · mito y dato del cáncer */}
      <Escena T={T} a={K.MC} b={K.J}>
        <FondoLunares color={T < K.DC ? KC.orange : KC.cyan} />
        {fsvg(<>
          {T < K.DC && <g opacity={1 - kprog(T, K.DC - 0.3, K.DC)}><Sello T={T} at={K.MC + 0.9} x={790} y={1040} texto="MITO" color={KC.red} r={110} /></g>}
          {T > K.DC - 0.2 && <g opacity={kprog(T, K.DC - 0.2, K.DC + 0.2)}><Sello T={T} at={K.DC + 0.1} x={780} y={1010} texto="DATO" color="#118a3a" r={120} rot={10} /></g>}
        </>)}
      </Escena>
      {/* 6 · junto con quimio o radioterapia: algo mejor, estudios de baja calidad */}
      <Escena T={T} a={K.J} b={K.P}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <line x1={140} y1={1060} x2={940} y2={1060} stroke={KC.ink} strokeWidth={8} />
          {(() => { const u = kprog(T, K.J + 0.3, K.J + 1.6, kEase.sale); return <>
            <rect x={230} y={1060 - 300 * u} width={220} height={300 * u} fill="#8fb6ff" stroke={KC.ink} strokeWidth={7} />
            <rect x={600} y={1060 - 381 * u} width={220} height={381 * u} fill={RX.rojo2} stroke={KC.ink} strokeWidth={7} />
          </>; })()}
          <text x={340} y={1105} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>solo el tratamiento</text>
          <text x={710} y={1105} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.ink}>+ reishi</text>
          {/* lupa sobre los estudios: baja calidad */}
          <g transform={`translate(${klerp(1100, 710, kprog(T, K.J + 2.0, K.J + 2.8, kEase.sale))} 800)`}>
            <circle r={90} fill="rgba(255,255,255,.35)" stroke={KC.ink} strokeWidth={12} />
            <line x1={64} y1={64} x2={140} y2={140} stroke={KC.ink} strokeWidth={22} strokeLinecap="round" />
            <text y={22} textAnchor="middle" style={{ font:`400 70px ${KF.titulo}` }} fill={KC.red}>?</text>
          </g>
        </>)}
      </Escena>
      {/* 7 · re-gancho: ¿qué hay dentro del frasco? */}
      <Escena T={T} a={K.P} b={K.E} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<><Frasco x={300} y={1120} s={1.3} rot={Math.sin(T * 4) * 4} /><Interrogacion T={T} x={300} y={700} tam={360} /></>)}
      </Escena>
      {/* 8–10 · el estudio de 2017: 19 frascos, 13 con tipo almidón, 5 con el betaglucano */}
      <Escena T={T} a={K.E} b={K.ME}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          {FR19.map(([fx, fy], i) => { const on = kprog(T, K.E + 1.4 + i * 0.07, K.E + 1.7 + i * 0.07, kEase.rebote); if (on <= 0) return null;
            const t13 = ALM13.indexOf(i), mor = t13 >= 0 ? kprog(T, K.A + 0.3 + t13 * 0.12, K.A + 0.6 + t13 * 0.12) : 0;
            const bg = BG5.includes(i) && T > K.B + 0.4;
            return <g key={i}><MiniFrasco x={fx} y={fy} s={on} tinte={mixHex(RX.ambar, '#4b2a7a', mor)} marca={bg ? 'si' : null} />
              {mor > 0 && mor < 1 && <circle cx={fx} cy={fy - 120 + mor * 60} r={9} fill="#5a3a1a" stroke={KC.ink} strokeWidth={2} />}
              {bg && <g transform={`translate(${fx - 28} ${fy - 150}) scale(.32)`}><Betaglucano x={0} y={0} n={3} brillo={1} /></g>}</g>; })}
        </>)}
      </Escena>
      {/* 11 · mito de la especie: el ADN de 20 productos (fondo oscuro: lo microscópico) */}
      <Escena T={T} a={K.ME} b={K.L}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={18} />
        {fsvg(<>
          <ADN T={T} x={90} y={720} w={900} amp={55} vel={3} lectura={kprog(T, K.ME + 0.5, K.ME + 3.6)} />
          {Array.from({ length: 20 }, (_, i) => { const on = kprog(T, K.ME + 3.7 + i * 0.04, K.ME + 4.0 + i * 0.04, kEase.rebote); if (on <= 0) return null;
            return <Producto key={i} x={140 + (i % 5) * 200} y={880 + Math.floor(i / 5) * 72} s={on * 0.62} tipo={i % 3} tache={kprog(T, K.ME + 4.6 + i * 0.07, K.ME + 4.8 + i * 0.07)} />; })}
          {T < K.ME + 4.6 && <g opacity={1 - kprog(T, K.ME + 4.2, K.ME + 4.6)}><Sello T={T} at={K.ME + 1.2} x={830} y={500} texto="MITO" color={KC.red} r={100} /></g>}
        </>)}
      </Escena>
      {/* 12 · dato: la mayoría eran G. lingzhi; mapa */}
      <Escena T={T} a={K.L} b={K.C}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <MapaEurasia x={160} y={745} s={0.9} pLuc={kprog(T, K.L + 2.0, K.L + 2.8)} pLing={kprog(T, K.L + 3.0, K.L + 3.8)} />
          <Sello T={T} at={K.L + 0.3} x={170} y={420} texto="DATO" color="#118a3a" r={95} rot={8} />
        </>)}
      </Escena>
      {/* 13 · cierre: el mismo frasco del inicio, ya "leído" */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Frasco x={300} y={780} s={0.95} etiqueta="REISHI?" />
          <g opacity={kprog(T, K.C + 0.6, K.C + 1.0)} transform="translate(300 780) scale(0.95)">
            <rect x={-104} y={-226} width={208} height={156} rx={12} fill="#fffbe8" stroke={KC.ink} strokeWidth={6} transform="rotate(-4)" />
            {['¿especie?', '¿relleno?', '¿pruebas?'].map((t, i) => <text key={i} x={-86} y={-186 + i * 44} transform="rotate(-4)" style={{ font:`700 34px ${KF.mono}` }} fill={i === 1 ? KC.red : KC.ink} opacity={kprog(T, K.C + 0.8 + i * 0.4, K.C + 1.1 + i * 0.4)}>{t}</text>)}
          </g>
          <Sello T={T} at={K.C + 2.0} x={560} y={570} texto="MITO" color={KC.red} r={80} rot={-14} />
          <Sello T={T} at={K.C + 2.4} x={600} y={730} texto="DATO" color="#118a3a" r={80} rot={10} />
          {FR19.map(([fx, fy], i) => <MiniFrasco key={i} x={fx} y={fy} s={0.9} tinte={SI5.includes(i) ? RX.verde : '#b9b2a6'} marca={SI5.includes(i) ? 'si' : null} />)}
        </>)}
      </Escena>

      {/* textos */}
      <NumeroGigante T={T} at={K.G + 2.8} until={K.H - 0.3} valor={5} dur={0.5} sufijo=" de 19" etiqueta="cumplían su etiqueta" x={720} y={560} tam={140} color={RX.verde} />
      <Etq T={T} at={K.H + 1.3} until={K.Co - 0.3} x={60} y={520} texto="reishi · lingzhi" tam={42} color={KC.ink} />
      <Etq T={T} at={K.H + 1.8} until={K.Co - 0.3} x={60} y={580} texto="Ganoderma" it tam={40} color={KC.ink} />
      <Etq T={T} at={K.H + 2.3} until={K.Co - 0.3} x={430} y={1015} texto="pie lateral, brillante" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Co + 0.1} until={K.MC - 0.3} texto="POR DENTRO · LO QUE TRAE" x={440} y={470} tam={34} borde={KC.cyan} mono />
      <Etq T={T} at={K.Co + 0.8} until={K.MC - 0.3} x={60} y={640} texto="triterpenos · ácidos ganodéricos" tam={30} color={KC.yellow} />
      <Etq T={T} at={K.Co + 1.6} until={K.MC - 0.3} x={60} y={920} texto="polisacáridos · betaglucanos" tam={30} color={KC.mint} />
      <Chip T={T} at={K.Co + 2.0} until={K.MC - 0.3} texto="sí se estudian" x={540} y={1160} tam={36} borde={KC.mint} />
      <MitoTachado T={T} at={K.MC + 0.2} tacharEn={K.MC + 0.9} until={K.DC - 0.3} texto="cura el cáncer" x={330} y={1040} tam={50} />
      <TarjetaEstudio T={T} at={K.MC + 1.8} until={K.DC - 0.3} anio="2016" quien="Cochrane · 5 ensayos · 373 personas" revista="Cochrane Database Syst. Rev., 2016" x={440} y={760} />
      <Chip T={T} at={K.DC + 0.5} until={K.J - 0.3} texto="¿Solo, como tratamiento?" x={420} y={520} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.DC + 1.2} until={K.J - 0.3} texto="pruebas insuficientes" x={420} y={610} tam={40} borde={KC.red} />
      <Chip T={T} at={K.DC + 2.4} until={K.J - 0.3} texto="¿Alarga la vida?" x={420} y={760} tam={40} borde={KC.ink} />
      <Chip T={T} at={K.DC + 3.0} until={K.J - 0.3} texto="ningún ensayo lo midió" x={420} y={850} tam={40} borde={KC.red} />
      <Chip T={T} at={K.J + 0.4} until={K.P - 0.3} texto="con quimio o radioterapia" x={400} y={470} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.J + 1.2} until={K.P - 0.3} x={60} y={545} texto="respuesta al tratamiento" tam={28} color={KC.ink} />
      <Chip T={T} at={K.J + 2.2} until={K.P - 0.3} texto="calidad de los estudios: baja" x={400} y={640} tam={34} borde={KC.yellow} />
      <TarjetaEstudio T={T} at={K.E + 0.2} until={K.A - 0.3} anio="2017" quien="U. de Macao + Farmacopea de EE. UU." revista="Sci. Reports, 2017 · comprados en línea en 2015" x={540} y={560} />
      <NumeroGigante T={T} at={K.A + 0.4} until={K.B - 0.3} valor={13} dur={1.5} sufijo=" de 19" etiqueta="con polisacáridos tipo almidón" x={360} y={520} tam={140} color={KC.lilac} />
      <Chip T={T} at={K.A + 1.6} until={K.B - 0.3} texto="tipo almidón: el cuerpo del hongo no lo tiene" x={500} y={690} tam={30} borde={KC.lilac} />
      <NumeroGigante T={T} at={K.B + 0.3} until={K.ME - 0.3} valor={5} dur={0.6} sufijo=" de 19" etiqueta="con el betaglucano del reishi" x={360} y={520} tam={140} color={KC.mint} />
      <Etq T={T} at={K.ME + 0.3} until={K.L - 0.3} x={60} y={470} texto="Ganoderma lucidum" it tam={44} color={KC.texto} />
      <Etq T={T} at={K.ME + 0.6} until={K.ME + 3.6} x={60} y={560} texto="leyendo ADN…" tam={30} color={KC.lilac} />
      <TarjetaEstudio T={T} at={K.ME + 1.6} until={K.ME + 3.6} anio="2018" quien="ADN de 20 productos" revista="Frontiers in Microbiology, 2018" x={540} y={1000} />
      <Chip T={T} at={K.ME + 4.8} until={K.L - 0.3} texto="G. lucidum: en ninguno" x={420} y={600} tam={38} borde={KC.red} />
      <Etq T={T} at={K.L + 0.6} until={K.C - 0.3} x={60} y={575} texto="la mayoría: Ganoderma lingzhi" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.L + 1.1} until={K.C - 0.3} x={60} y={620} texto="el más usado en la medicina china" tam={26} color={KC.ink} />
      <Etq T={T} at={K.L + 2.2} until={K.C - 0.3} x={60} y={1075} texto="● G. lucidum: Europa (y partes de China)" it tam={28} color={KC.red} />
      <Etq T={T} at={K.L + 3.2} until={K.C - 0.3} x={60} y={1125} texto="● G. lingzhi: Asia" it tam={28} color={KC.ink} />
      <Chip T={T} at={K.L + 4.2} until={K.C - 0.3} texto="falla el nombre, no el hongo" x={420} y={700} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou} texto="no siempre trae lo que dice" x={470} y={370} tam={32} borde={KC.red} />
      <Etq T={T} at={K.C + 2.8} until={K.Ou} x={60} y={1500} texto="No es consejo médico. Si tomas medicamentos o" tam={22} color={KC.ink} />
      <Etq T={T} at={K.C + 2.8} until={K.Ou} x={60} y={1535} texto="estás en tratamiento, platícalo con tu médico." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="5 cm" largo={110} />
      <BarraEscala T={T} at={K.H} until={K.Co} texto="10 cm" largo={180} />
      <BarraEscala T={T} at={K.Co} until={K.MC} texto="1 nm" largo={140} />
      <BarraEscala T={T} at={K.P} until={K.E} texto="5 cm" largo={140} />
      <BarraEscala T={T} at={K.E} until={K.ME} texto="5 cm" largo={100} />
      <BarraEscala T={T} at={K.ME} until={K.L} texto="2 nm (ancho del ADN)" largo={110} />
      <BarraEscala T={T} at={K.L} until={K.C} texto="mapa esquemático" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1600} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="Solo *5 de 19* cumplían su etiqueta." />
      <Subtitulo T={T} idx={1} at={K.H + 0.1} until={K.Co - 0.1} texto="Reishi: *Ganoderma.* En China, lingzhi." />
      <Subtitulo T={T} idx={2} at={K.Co + 0.1} until={K.MC - 0.1} texto="Triterpenos y polisacáridos: *sí se estudian.*" />
      <Subtitulo T={T} idx={3} at={K.MC + 0.1} until={K.DC - 0.1} texto="Mito: *cura el cáncer.*" />
      <Subtitulo T={T} idx={4} at={K.DC + 0.1} until={K.J - 0.1} texto="No hay pruebas para usarlo *solo.*" />
      <Subtitulo T={T} idx={5} at={K.J + 0.1} until={K.P - 0.1} texto="Algo mejor… en estudios *de baja calidad.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E - 0.1} texto="¿Qué hay *dentro del frasco?*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.A - 0.1} texto="2017: *19 suplementos* analizados." />
      <Subtitulo T={T} idx={8} at={K.A + 0.1} until={K.B - 0.1} texto="13 traían *almidón:* suele ser relleno." />
      <Subtitulo T={T} idx={9} at={K.B + 0.1} until={K.ME - 0.1} texto="El betaglucano: *solo en 5.*" />
      <Subtitulo T={T} idx={10} at={K.ME + 0.1} until={K.L - 0.1} texto="20 productos: *ningún G. lucidum.*" />
      <Subtitulo T={T} idx={11} at={K.L + 0.1} until={K.C - 0.1} texto="Falla el nombre, *no el hongo.*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Lo que promete *aún no está probado.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.5, 'avatar_11_sorprendido', 'gancho'],
        [K.H + 0.6, K.Co - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.MC + 0.5, K.DC - 0.3, 'avatar_10_serio_molesto', 'arriba-der'],
        [K.J + 0.4, K.P - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.05, K.E + 0.2, 'avatar_07_pensativo_puno', 'grande'],
        [K.A + 0.3, K.B + 2.6, 'avatar_11_sorprendido', 'arriba-der'],
        [K.ME + 4.7, K.L - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.L + 0.5, K.C - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.C + 0.4, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="59" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ReishiApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ReishiShot /></CompositionStage></div>;
}
window.ReishiApp = ReishiApp;
