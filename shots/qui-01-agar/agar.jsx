// Químico #01 · El agar, la "gelatina" de la microbiología — NARRADA (N3 "Capítulos y medidores") y MUDO (M2 "¿Por qué NO…?").
// Guion y fuentes: guion.md. El dibujo es esquemático (las cadenas y hélices no están a escala).
const AVS = (n) => 'assets/stickers/' + n + '.png';
const fondoPuntos = (c) => ({ position:'absolute', inset:0, background:c, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' });
const AGAR = '#f1d79a';

// Colonias sobre una placa (coordenadas de la placa). n colonias, crecen con g.
function Colonias({ g = 1, n = 14, seed = 3, R = 330, color = '#f4efe4', borde = '#c9b48c', escurre = 0 }) {
  const r = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const a = r() * 6.28, d = Math.sqrt(r()) * R * 0.8, rr = (14 + r() * 26) * kclamp(g * 1.4 - i * 0.03, 0, 1);
    if (rr <= 0.5) return null; const x = Math.cos(a) * d, y = Math.sin(a) * d + escurre * (60 + (i % 4) * 30);
    return <g key={i}><ellipse cx={x} cy={y} rx={rr} ry={rr * (1 + escurre * 1.5)} fill={color} stroke={borde} strokeWidth={4} /><circle cx={x - rr * 0.3} cy={y - rr * 0.3} r={rr * 0.25} fill="#fff" opacity=".7" /></g>; })}</g>;
}
// Alga roja ramificada (tipo Gelidium) que se mece. Base en (x, y).
function AlgaRoja({ T, x, y, s = 1, seed = 1 }) {
  const ramas = (d, len, ang, k) => { if (d > 4) return null; const a = ang + mece(T, seed + k, 0.25) * 6, rad = a * Math.PI / 180, x2 = Math.sin(rad) * len, y2 = -Math.cos(rad) * len;
    return <g key={k}><line x1={0} y1={0} x2={x2} y2={y2} stroke="#c0263f" strokeWidth={14 - d * 2.4} strokeLinecap="round" />
      <g transform={`translate(${x2} ${y2})`}>{ramas(d + 1, len * 0.72, a - 28, k * 2 + 1)}{ramas(d + 1, len * 0.72, a + 24, k * 2 + 2)}</g></g>; };
  return <g transform={`translate(${x} ${y}) scale(${s})`}><g stroke={KC.ink}>{ramas(0, 150, 0, 1)}</g></g>;
}
// Bacteria en bastón, con o sin "boca" (agarasa).
function Bacilo({ x, y, rot = 0, s = 1, color = KC.mint, T = 0, come = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, x, 0.4) * 6}) scale(${s})`}>
    <rect x={-46} y={-20} width={92} height={40} rx={20} fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={-14} cy={-4} r={5} fill={KC.ink} /><circle cx={10} cy={-4} r={5} fill={KC.ink} />
    {come > 0 ? <path d={`M -10 8 Q 0 ${8 + 10 * Math.abs(Math.sin(T * 10))} 10 8`} fill="none" stroke={KC.ink} strokeWidth={4} /> : <path d="M -8 10 L 8 10" stroke={KC.ink} strokeWidth={4} />}
    <path d="M 46 0 q 20 -10 34 6" fill="none" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Curva de histéresis: estado del agar según la temperatura. temp = °C del punto; fase 'sube' o 'baja'.
function CurvaAgar({ T, temp, fase = 'sube', x = 100, y = 520, w = 880, h = 560, o = 1 }) {
  const tx = (c) => x + 40 + (c / 100) * (w - 80), yS = y + h - 90, yL = y + 120;
  const solido = fase === 'sube' ? temp < 85 : temp < 35;
  const py = fase === 'sube' ? (temp < 85 ? yS : yL) : (temp > 35 ? yL : yS);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, opacity:o, zIndex:30 }}>
    <rect x={x} y={y} width={w} height={h} rx={30} fill="rgba(14,15,18,.85)" stroke={KC.gold} strokeWidth={6} />
    <text x={x + 40} y={yL - 30} style={{ font:`700 30px ${KF.mono}` }} fill={KC.cyan}>LÍQUIDO</text>
    <text x={x + 40} y={yS + 60} style={{ font:`700 30px ${KF.mono}` }} fill={KC.gold2}>SÓLIDO (gel)</text>
    <path d={`M ${tx(0)} ${yS} L ${tx(85)} ${yS} L ${tx(85)} ${yL} L ${tx(100)} ${yL}`} fill="none" stroke={KC.red} strokeWidth={7} strokeDasharray={fase === 'sube' ? '0' : '14 10'} opacity={fase === 'sube' ? 1 : 0.45} />
    <path d={`M ${tx(100)} ${yL - 14} L ${tx(35)} ${yL - 14} L ${tx(35)} ${yS + 14} L ${tx(0)} ${yS + 14}`} fill="none" stroke={KC.cyan} strokeWidth={7} strokeDasharray={fase === 'baja' ? '0' : '14 10'} opacity={fase === 'baja' ? 1 : 0.35} />
    {[0, 35, 85, 100].map((c) => <g key={c}><line x1={tx(c)} y1={y + h - 40} x2={tx(c)} y2={y + h - 26} stroke={KC.texto} strokeWidth={4} /><text x={tx(c)} y={y + h - 0} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={c === 35 || c === 85 ? KC.yellow : KC.texto}>{c}°</text></g>)}
    <circle cx={tx(temp)} cy={py + (fase === 'baja' ? (py === yL ? -14 : 14) : 0)} r={22} fill={solido ? KC.gold2 : KC.cyan} stroke={KC.ink} strokeWidth={5} />
  </svg>;
}
// Doble hélice / manojo de cadenas: forma 0 = cadenas sueltas que se agitan (caliente), 1 = pares enroscados en red (frío).
function RedAgarosa({ T, forma = 0, agua = 1 }) {
  const cad = Array.from({ length: 8 }, (_, i) => i);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
    {cad.map((i) => { const par = Math.floor(i / 2), lado = i % 2 ? 1 : -1, cy = 560 + par * 230, pts = [];
      for (let k = 0; k <= 40; k++) { const u = k / 40, xx = 60 + u * 960;
        const suelta = cy + lado * 60 + Math.sin(u * 9 + T * 3 + i) * 70 + Math.sin(u * 23 + T * 5 + i * 2) * 26;
        const helice = cy + lado * 26 * Math.sin(u * 22 + par) ;
        pts.push(`${xx} ${klerp(suelta, helice, forma)}`); }
      return <path key={i} d={'M' + pts.join(' L ')} fill="none" stroke={i % 2 ? KC.gold2 : '#ff9fb4'} strokeWidth={12} strokeLinecap="round" />; })}
    {forma > 0.5 && [0, 1, 2].map((k) => <line key={k} x1={300 + k * 230} y1={560} x2={300 + k * 230 + 40} y2={1250} stroke="#8fa3c0" strokeWidth={8} strokeDasharray="12 10" opacity={kprog(forma, 0.5, 1)} />)}
    {agua > 0 && Array.from({ length: 46 }, (_, i) => { const xx = (i * 97) % 1000 + 40, yy = 470 + (i * 61) % 860, j = (1 - forma) * 18;
      return <circle key={'w' + i} cx={xx + Math.sin(T * 4 + i) * j} cy={yy + Math.cos(T * 4 + i) * j} r={10} fill="#5ac8ff" stroke={KC.ink} strokeWidth={2} opacity={agua * 0.85} />; })}
  </svg>;
}
// Flan / postre de agar que tiembla.
function Postre({ T, x, y, s = 1, tiembla = 1 }) {
  const w = 1 + 0.05 * Math.sin(T * 14) * tiembla;
  return <g transform={`translate(${x} ${y}) scale(${s * w} ${s / w})`}>
    <ellipse cx={0} cy={10} rx={200} ry={40} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <path d="M -150 0 L -110 -190 Q 0 -215 110 -190 L 150 0 Q 0 30 -150 0 Z" fill="#ff8fb0" stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <ellipse cx={0} cy={-192} rx={110} ry={22} fill="#ffb3c8" stroke={KC.ink} strokeWidth={6} />
    <path d="M -90 -150 Q -80 -60 -110 -20" fill="none" stroke="#fff" strokeWidth={10} strokeLinecap="round" opacity=".5" />
  </g>;
}

/* ---------- versión NARRADA ---------- */
function AgarNarrado() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Al: CUES.Alga, Q: CUES.Quimica, Rd: CUES.Red, Tp: CUES.Temp, P: CUES.Pregunta, I: CUES.Incuba, E: CUES.Estudio, C: CUES.Come, X: CUES.Extra, Ci: CUES.Cierre, O: CUES.Outro };
  const FIN = K.O + 4;
  const caps = [{ at: K.Al, titulo: 'De dónde sale' }, { at: K.Q, titulo: 'Su química' }, { at: K.I, titulo: 'Por qué sirve' }, { at: K.C, titulo: 'Casi nadie se lo come' }];
  const tembla = (t0) => Math.exp(-Math.max(0, T - t0) * 2.2) * Math.sin((T - t0) * 18) * (T > t0 ? 1 : 0);
  // temperatura del capítulo de histéresis: sube a 100 y baja a 20
  const tempT = T < K.Tp + 2.8 ? klerp(20, 100, kprog(T, K.Tp + 0.2, K.Tp + 2.8)) : klerp(100, 20, kprog(T, K.Tp + 2.9, K.Tp + 5.6));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la placa tiembla como gelatina */}
      <Escena T={T} a={K.G} b={K.Al} fondo={KC.yellow}>
        <div style={fondoPuntos(KC.yellow)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform={`translate(520 1000) scale(${1 + 0.04 * tembla(K.G + 0.05)}, ${1 - 0.04 * tembla(K.G + 0.05)})`}>
            <PlacaPetri x={0} y={0} r={320} agar={AGAR} id="pg"><Colonias g={kprog(T, K.G + 2.2, K.G + 4.5)} n={16} /></PlacaPetri>
          </g>
        </svg>
      </Escena>
      {/* 1 · algas rojas → hervir, filtrar, secar */}
      <Escena T={T} a={K.Al} b={K.Q} fondo="linear-gradient(#00d2ff, #2346ff)">
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {[[200, 1500, 1.4, 1], [520, 1560, 1.8, 2], [860, 1500, 1.3, 3]].map(([x, y, s, k]) => <AlgaRoja key={k} T={T} x={x} y={y} s={s} seed={k} />)}
          {[0, 1, 2].map((i) => { const at = K.Al + 1.2 + i * 1.0, e = kentrada(T, at, null, 'pop'); if (T < at) return null;
            return <g key={i} transform={`translate(${200 + i * 340} 640) scale(${e.s})`} opacity={e.o}>
              <circle r={120} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
              {i === 0 && <g><path d="M -70 -10 L -60 60 Q 0 75 60 60 L 70 -10 Z" fill="#9aa4ae" stroke={KC.ink} strokeWidth={6} />{[0, 1, 2].map((k) => <path key={k} d={`M ${-30 + k * 30} -25 q 12 -20 0 -40`} fill="none" stroke="#9aa4ae" strokeWidth={6} transform={`translate(0 ${-((T * 30 + k * 10) % 20)})`} />)}</g>}
              {i === 1 && <g><path d="M -70 -50 L 70 -50 L 10 30 L 10 70 L -10 70 L -10 30 Z" fill="#cfe9f5" stroke={KC.ink} strokeWidth={6} /><circle cx={0} cy={80 + ((T * 60) % 30)} r={7} fill="#5ac8ff" /></g>}
              {i === 2 && <g>{[-1, 0, 1].map((k) => <rect key={k} x={-80} y={-50 + k * 40} width={160} height={26} rx={6} fill={AGAR} stroke={KC.ink} strokeWidth={5} transform={`rotate(${k * 4})`} />)}</g>}
            </g>; })}
        </svg>
        {['hervir', 'filtrar', 'secar'].map((t, i) => <Chip key={t} T={T} at={K.Al + 1.4 + i * 1.0} until={K.Q - 0.2} texto={t} x={200 + i * 340} y={810} borde={KC.red} tam={36} />)}
      </Escena>
      {/* 2 · polisacárido: cadenas de anillos */}
      <Escena T={T} a={K.Q} b={K.Rd} fondo="radial-gradient(circle at 50% 45%, #1b2333 0%, #0E0F12 75%)">
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <CadenaAnillos x={110} y={620} n={8} p={kprog(T, K.Q + 0.3, K.Q + 2.4)} s={1} ondula={0.4} T={T} />
          <CadenaAnillos x={110} y={1000} n={8} p={kprog(T, K.Q + 2.2, K.Q + 4.2)} s={1} ondula={0.4} T={T} color="#ff9fb4" marca={(i) => (i % 3 === 1 ? KC.lilac : null)} />
        </svg>
        <Etq T={T} at={K.Q + 1.4} until={K.Rd - 0.2} x={110} y={520} texto="agarosa (≈ 70 %)" color={KC.gold2} />
        <Etq T={T} at={K.Q + 3.4} until={K.Rd - 0.2} x={110} y={900} texto="agaropectina (con sulfato)" color="#ff9fb4" tam={30} />
        <Chip T={T} at={K.Q + 0.2} until={K.Rd - 0.2} texto="polisacárido = muchos azúcares" y={450} borde={KC.gold} tam={38} />
      </Escena>
      {/* 3 · al enfriarse: hélices y red que atrapa agua */}
      <Escena T={T} a={K.Rd} b={K.Tp} fondo="radial-gradient(circle at 50% 45%, #1b2333 0%, #0E0F12 75%)">
        <RedAgarosa T={T} forma={kprog(T, K.Rd + 1, K.Rd + 4, kEase.suave)} agua={1} />
        <Medidor T={T} at={K.Rd + 0.2} until={K.Tp - 0.2} etiqueta="TEMPERATURA" valor={(t) => 0.9 - 0.55 * kprog(t, K.Rd + 0.6, K.Rd + 4)} texto={(v) => Math.round(v * 100) + ' °C'} y={450} color={KC.cyan} />
        <Etq T={T} at={K.Rd + 4.2} until={K.Tp - 0.2} x={980} y={1320} texto="agua atrapada" color="#5ac8ff" lado="izq" />
      </Escena>
      {/* 4 · histéresis */}
      <Escena T={T} a={K.Tp} b={K.P} fondo={KC.lilac}>
        <div style={fondoPuntos(KC.lilac)}></div>
        <CurvaAgar T={T} temp={tempT} fase={T < K.Tp + 2.85 ? 'sube' : 'baja'} />
        <Chip T={T} at={K.Tp + 2.4} until={K.Tp + 3.2} texto="se derrite: ~85 °C" y={430} borde={KC.red} tam={42} />
        <Chip T={T} at={K.Tp + 5.2} until={K.P - 0.1} texto="cuaja: ~35 °C" y={430} borde={KC.cyan} tam={42} />
      </Escena>
      {/* 5-6 · incubadora a 37 °C: gelatina vs agar */}
      <Escena T={T} a={K.P} b={K.E} fondo={KC.orange}>
        <div style={fondoPuntos(KC.orange)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={60} y={460} width={960} height={760} rx={40} fill="#e9edf1" stroke={KC.ink} strokeWidth={10} />
          <rect x={90} y={490} width={900} height={700} rx={26} fill="#c9d2da" />
          {(() => { const d = kprog(T, K.I + 1, K.I + 4, kEase.suave); return <>
            <g transform={`translate(300 860) rotate(${-8 * d})`}><PlacaPetri x={0} y={0} r={190} agar={mixHex('#f6c36a', '#f9dca0', d)} id="pgel" tapa={0}>
              <Colonias g={1} n={9} R={170} escurre={d} seed={5} />
              {d > 0 && <ellipse cx={0} cy={110 * d} rx={180} ry={70 * d} fill="#f9dca0" opacity={0.8 * d} />}</PlacaPetri></g>
            <g transform="translate(780 860)"><PlacaPetri x={0} y={0} r={190} agar={AGAR} id="pag"><Colonias g={1} n={9} R={170} seed={5} /></PlacaPetri></g>
          </>; })()}
        </svg>
        <Chip T={T} at={K.I + 0.2} until={K.E - 0.2} texto="gelatina" x={300} y={1110} borde={KC.red} tam={38} />
        <Chip T={T} at={K.I + 0.4} until={K.E - 0.2} texto="agar" x={780} y={1110} borde={KC.mint} tam={38} />
        <Chip T={T} at={K.P + 0.3} until={K.E - 0.2} texto="incubadora · 37 °C" x={400} y={1300} borde={KC.gold} tam={42} mono />
      </Escena>
      {/* 7 · el estudio: Fanny Hesse, 1881 */}
      <Escena T={T} a={K.E} b={K.C} fondo={KC.pink}>
        <div style={fondoPuntos(KC.pink)}></div>
        <TarjetaEstudio T={T} at={K.E + 0.2} until={K.E + 3.4} anio="1881" quien="Fanny Hesse" revista="se lo sugiere a Walther Hesse · lab. de Robert Koch" y={760} />
        {T > K.E + 3.2 && <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g opacity={kprog(T, K.E + 3.2, K.E + 3.7)}><Postre T={T} x={300} y={1040} s={1.1} /></g>
          <path d="M 520 900 L 640 900" stroke={KC.ink} strokeWidth={12} opacity={kprog(T, K.E + 3.8, K.E + 4.2)} />
          <path d="M 620 870 L 660 900 L 620 930" fill="none" stroke={KC.ink} strokeWidth={12} opacity={kprog(T, K.E + 3.8, K.E + 4.2)} strokeLinejoin="round" />
          <g opacity={kprog(T, K.E + 4.2, K.E + 4.7)}><PlacaPetri x={830} y={900} r={170} agar={AGAR} id="pes"><Colonias g={kprog(T, K.E + 4.4, K.E + 6)} n={8} R={150} /></PlacaPetri></g>
        </svg>}
        <Chip T={T} at={K.E + 3.4} until={K.C - 0.2} texto="de la cocina al laboratorio" y={430} borde={KC.gold} tam={40} />
      </Escena>
      {/* 8 · casi nadie se lo come */}
      <Escena T={T} a={K.C} b={K.X} fondo="radial-gradient(circle at 50% 45%, #1b2333 0%, #0E0F12 75%)">
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}><g transform="translate(540 1000) scale(1.7) translate(-560 -960)">
          <rect x={-400} y={960} width={KW + 800} height={980} fill={AGAR} stroke={KC.ink} strokeWidth={8} />
          {(() => { const p = kprog(T, K.C + 2.6, K.C + 5); return <path d={`M 640 962 Q 780 ${962 + 160 * p} 920 962 Z`} fill="#c9a85e" opacity={p} />; })()}
          {[160, 320, 470].map((x, i) => <g key={i}><Bacilo x={x} y={930} T={T} s={1.1} come={0} />
            <ellipse cx={x} cy={940} rx={70 * kprog(T, K.C + 1 + i * 0.3, K.C + 4)} ry={30 * kprog(T, K.C + 1 + i * 0.3, K.C + 4)} fill="#f4efe4" stroke="#c9b48c" strokeWidth={4} opacity={0.9} /></g>)}
          <Bacilo x={780} y={960 + 120 * kprog(T, K.C + 2.6, K.C + 5)} T={T} s={1.2} color={KC.lilac} come={1} />
        </g></svg>
        <Chip T={T} at={K.C + 0.3} until={K.X - 0.2} texto="sin enzimas para romperlo" x={540} y={620} borde={KC.mint} tam={34} />
        <Etq T={T} at={K.C + 3} until={K.X - 0.2} x={1010} y={800} texto="bacteria marina con agarasa" lado="izq" tam={30} color={KC.lilac} />
      </Escena>
      {/* 9 · dato extra: genes del mar en el intestino */}
      <Escena T={T} a={K.X} b={K.Ci} fondo={KC.mint}>
        <div style={fondoPuntos(KC.mint)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          {/* rollo de sushi con nori */}
          <g transform={`translate(270 720) rotate(${mece(T, 1, 0.2) * 4})`}><circle r={130} fill="#1f3d2b" stroke={KC.ink} strokeWidth={8} /><circle r={100} fill="#fbfbf5" /><circle r={42} fill={KC.coral} /><circle cx={-50} cy={30} r={18} fill={KC.leaf} /></g>
          {/* intestino */}
          <path d="M 560 1000 C 560 880, 980 880, 980 1000 C 980 1120, 560 1120, 560 1240 C 560 1360, 980 1360, 980 1240" fill="none" stroke="#e88aa0" strokeWidth={110} strokeLinecap="round" />
          <path d="M 560 1000 C 560 880, 980 880, 980 1000 C 980 1120, 560 1120, 560 1240 C 560 1360, 980 1360, 980 1240" fill="none" stroke="#f6c1cd" strokeWidth={80} strokeLinecap="round" />
          <Bacilo x={300} y={980} T={T} s={1} color={KC.cyan} />
          <Bacilo x={760} y={1120} T={T} s={1} color={KC.gold2} come={kprog(T, K.X + 4, K.X + 4.5)} />
          {/* un trocito de ADN que viaja de la bacteria marina a la del intestino */}
          {(() => { const u = kprog(T, K.X + 1.8, K.X + 4, kEase.suave), x = klerp(300, 760, u), y = klerp(980, 1120, u) - Math.sin(Math.PI * u) * 260;
            return T > K.X + 1.6 && <g transform={`translate(${x} ${y}) rotate(${T * 90})`}>{Array.from({ length: 6 }, (_, k) => <g key={k}><circle cx={-50 + k * 20} cy={Math.sin(k) * 14} r={7} fill={KC.red} /><circle cx={-50 + k * 20} cy={-Math.sin(k) * 14} r={7} fill={KC.blue} /></g>)}</g>; })()}
        </svg>
        <Etq T={T} at={K.X + 0.6} until={K.Ci - 0.2} x={420} y={970} texto="nori (alga)" tam={28} color={KC.ink} />
        <Etq T={T} at={K.X + 1.2} until={K.Ci - 0.2} x={150} y={1050} texto="Zobellia (del mar)" it tam={26} color={KC.ink} />
        <Etq T={T} at={K.X + 4.2} until={K.Ci - 0.2} x={1010} y={860} texto="Bacteroides plebeius" it tam={28} color={KC.ink} lado="izq" />
        <TarjetaEstudio T={T} at={K.X + 0.1} until={K.X + 1.6} anio="2010" quien="Hehemann et al." revista="Nature 464: 908" y={560} />
      </Escena>
      {/* 10 · cierre: la misma placa del inicio, ahora llena de colonias */}
      <Escena T={T} a={K.Ci} b={FIN} fondo={KC.yellow} zoom={0.03}>
        <div style={fondoPuntos(KC.yellow)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(540 900)"><PlacaPetri x={0} y={0} r={360} agar={AGAR} id="pc"><Colonias g={1} n={16} /><Colonias g={kprog(T, K.Ci + 0.5, K.Ci + 3)} n={24} seed={8} color="#ffd1dc" borde="#d98aa0" /></PlacaPetri></g>
        </svg>
      </Escena>

      <Capitulo T={T} caps={caps} hasta={K.Ci} />
      <MitoTachado T={T} at={K.G + 0.4} tacharEn={K.G + 1.4} until={K.Al - 0.3} texto="gelatina" x={330} y={420} />
      <Chip T={T} at={K.G + 1.8} until={K.Al - 0.2} texto="azúcar de alga" y={1500} x={400} borde={KC.red} tam={44} />
      <Etq T={T} at={K.Al + 0.4} until={K.Q - 0.2} x={540} y={1180} texto="Gelidium (alga roja)" it tam={30} />
      <Chip T={T} at={K.Ci + 0.3} until={K.O} texto="el piso de la microbiología" y={430} borde={KC.gold} tam={42} />

      <Subtitulo T={T} idx={0} at={K.G + 0.2} until={K.Al - 0.1} texto="No es gelatina: *es azúcar de alga.*" />
      <Subtitulo T={T} idx={1} at={K.Al + 0.1} until={K.Q - 0.1} texto="Sale de *algas rojas.*" />
      <Subtitulo T={T} idx={2} at={K.Q + 0.1} until={K.Rd - 0.1} texto="*Agarosa y agaropectina:* cadenas de azúcar." />
      <Subtitulo T={T} idx={3} at={K.Rd + 0.1} until={K.Tp - 0.1} texto="Al enfriarse arman *una red que atrapa agua.*" />
      <Subtitulo T={T} idx={4} at={K.Tp + 0.1} until={K.P - 0.1} texto="Se derrite a 85 °C… *cuaja a 35.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.I - 0.1} texto="¿Y eso *para qué sirve?*" />
      <Subtitulo T={T} idx={6} at={K.I + 0.1} until={K.E - 0.1} texto="A 37 °C la gelatina se derrite: *el agar no.*" />
      <Subtitulo T={T} idx={7} at={K.E + 0.1} until={K.C - 0.1} texto="Fanny Hesse lo usaba *en sus postres.*" />
      <Subtitulo T={T} idx={8} at={K.C + 0.1} until={K.X - 0.1} texto="Casi nadie puede *romperlo.*" />
      <Subtitulo T={T} idx={9} at={K.X + 0.1} until={K.Ci - 0.1} texto="Genes del mar *en intestinos de Japón.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.O - 0.1} texto="Es *el piso* de la microbiología." />

      <Robert T={T} apariciones={[[0, 3.6, 'avatar_11_sorprendido', 'gancho'], [6, 9.5, 'avatar_13_senalando_arriba', 'bajo-der'], [12, 15, 'avatar_07_pensativo_puno', 'bajo-der'], [17, 20.5, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'], [22, 26, 'avatar_02_apuntando_camara', 'presentador-bajo'], [27.5, 30.5, 'avatar_06_pensativo_menton', 'arriba-der'], [31.5, 34.5, 'avatar_10_serio_molesto', 'bajo-der'], [38.5, 41, 'avatar_04_bajando_lentes', 'bajo-der'], [43.5, 46.8, 'avatar_12_perfil_serio', 'bajo-der'], [51.5, 55, 'avatar_11_sorprendido', 'arriba-der'], [55.5, 58.2, 'avatar_13_senalando_arriba', 'bajo-der']]} />
      <MarcaAgua T={T} tema="quimica" num="01" hasta={K.O} />
      <CierreMarca T={T} at={K.O} tema="quimica" robert="assets/stickers/avatar_02_apuntando_camara.png" />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

/* ---------- gemelo MUDO: ¿Por qué NO usar gelatina en vez de agar? (M2) ---------- */
function AgarMudo() {
  const { T, CUES } = useComposition();
  const K = { P: CUES.Pregunta, Ca: CUES.Calienta, Co: CUES.Comen, A: CUES.Agar, D: CUES.Derrite, Cu: CUES.Cuaja, R: CUES.Respuesta, F: CUES.Outro };
  // temperatura de la incubadora y del agar (dato que también suena)
  const tInc = klerp(20, 37, kprog(T, K.Ca + 0.5, K.Ca + 6));
  const tAgar = T < K.D ? 37 : T < K.Cu ? klerp(37, 95, kprog(T, K.D + 0.5, K.Cu - 1)) : klerp(95, 25, kprog(T, K.Cu + 0.3, K.R - 1));
  const gelLiq = kprog(T, K.Ca + 4, K.Ca + 7, kEase.suave);          // la gelatina se vuelve líquida al acercarse a 37 °C
  const comen = kprog(T, K.Co + 1.5, K.Co + 7, kEase.suave);          // bacterias que digieren la gelatina (aunque esté fría)
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      <Escena T={T} a={K.P - 1} b={K.D} fondo={KC.orange} zoom={0.02}>
        <div style={fondoPuntos(KC.orange)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={60} y={560} width={960} height={720} rx={40} fill="#e9edf1" stroke={KC.ink} strokeWidth={10} />
          <rect x={90} y={590} width={900} height={660} rx={26} fill={mixHex('#c9d2da', '#ffcf9a', kprog(T, K.Ca, K.Ca + 6))} />
          {(() => { const d = T < K.Co ? gelLiq : T < K.A ? 0.15 + 0.85 * comen : 1; return <>
            <g transform={`translate(300 920) rotate(${-8 * d})`}><PlacaPetri x={0} y={0} r={190} agar={mixHex('#f6c36a', '#f9dca0', d)} id="mgel">
              <Colonias g={1} n={9} R={170} escurre={d} seed={5} />{d > 0 && <ellipse cx={0} cy={110 * d} rx={180} ry={70 * d} fill="#f9dca0" opacity={0.8 * d} />}</PlacaPetri></g>
            <g transform="translate(780 920)"><PlacaPetri x={0} y={0} r={190} agar={AGAR} id="mag"><Colonias g={1} n={9} R={170} seed={5} /></PlacaPetri></g>
            {T > K.Co && T < K.A + 0.5 && [0, 1, 2, 3].map((i) => <Bacilo key={i} x={220 + (i % 2) * 150} y={850 + Math.floor(i / 2) * 120 + d * 40} T={T} s={0.8} color={KC.lilac} come={1} />)}
          </>; })()}
        </svg>
        <Termometro x={110} y={1310} valor={T < K.Co ? tInc : T < K.A ? 22 : 37} max={50} alto={240} marcas={[0, 25, 50]} rango={[36, 38]} />
      </Escena>
      {/* el agar: se derrite a ~85 °C y cuaja a ~35 °C (curva) */}
      <Escena T={T} a={K.D} b={K.R} fondo={KC.lilac}>
        <div style={fondoPuntos(KC.lilac)}></div>
        <CurvaAgar T={T} temp={tAgar} fase={T < K.Cu ? 'sube' : 'baja'} y={560} />
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <g transform="translate(300 1360)"><PlacaPetri x={0} y={0} r={150} agar={(T < K.Cu ? tAgar > 85 : tAgar > 35) ? '#ffe9b8' : AGAR} id="mcu">
            {(T < K.Cu ? tAgar > 85 : tAgar > 35) && Array.from({ length: 8 }, (_, i) => <circle key={i} cx={Math.cos(T * 3 + i) * 80} cy={Math.sin(T * 2 + i) * 60} r={10} fill="#fff" opacity=".7" />)}</PlacaPetri></g>
        </svg>
      </Escena>
      <Escena T={T} a={K.R} b={K.F + 4} fondo={KC.orange}>
        <div style={fondoPuntos(KC.orange)}></div>
        <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
          <rect x={60} y={560} width={960} height={720} rx={40} fill="#e9edf1" stroke={KC.ink} strokeWidth={10} />
          <rect x={90} y={590} width={900} height={660} rx={26} fill="#c9d2da" />
          <g transform="translate(300 920)"><PlacaPetri x={0} y={0} r={190} agar="#f6c36a" id="mrg"><Colonias g={1} n={9} R={170} seed={5} /></PlacaPetri></g>
          <g transform="translate(780 920)"><PlacaPetri x={0} y={0} r={190} agar={AGAR} id="mra"><Colonias g={1} n={9} R={170} seed={5} /></PlacaPetri></g>
        </svg>
        <Termometro x={110} y={1310} valor={20} max={50} alto={240} marcas={[0, 25, 50]} rango={[36, 38]} />
      </Escena>

      {T < K.F && <div style={{ position:'absolute', left:60, right:60, top:330, zIndex:44, textAlign:'center', opacity:kprog(T, K.P, K.P + 0.3) }}>
        <div style={{ display:'inline-block', background:KC.paper, border:`6px solid ${KC.ink}`, borderRadius:26, padding:'14px 30px', boxShadow:`10px 10px 0 ${KC.ink}`, font:`900 50px/1.1 ${KF.texto}`, color:KC.ink }}>
          ¿Por qué <span style={{ color:KC.red }}>NO</span> usar gelatina en vez de agar?</div></div>}
      <Chip T={T} at={K.P + 0.6} until={K.D - 0.2} texto="gelatina" x={300} y={1180} borde={KC.red} tam={36} />
      <Chip T={T} at={K.P + 0.8} until={K.D - 0.2} texto="agar" x={780} y={1180} borde={KC.mint} tam={36} />
      <Chip T={T} at={K.Ca + 0.4} until={K.Co - 0.2} texto="la incubadora sube a 37 °C" y={548} borde={KC.gold} tam={36} />
      <Chip T={T} at={K.Co + 0.4} until={K.A - 0.2} texto="y muchos microbios se la comen" y={548} borde={KC.red} tam={36} />
      <Chip T={T} at={K.A + 0.4} until={K.D - 0.2} texto="el agar sigue firme" y={548} borde={KC.mint} tam={40} />
      <Chip T={T} at={K.D + 2} until={K.Cu - 0.2} texto="se derrite hasta ~85 °C" y={548} borde={KC.red} tam={38} />
      <Chip T={T} at={K.Cu + 2} until={K.R - 0.2} texto="y cuaja hasta ~35 °C" y={548} borde={KC.cyan} tam={38} />
      <Chip T={T} at={K.R + 0.3} until={K.F - 0.2} texto="a 37 °C el agar no se mueve" y={548} borde={KC.gold} tam={38} />
      <Medidor T={T} at={K.Ca + 0.6} until={K.D - 0.3} etiqueta="GELATINA SÓLIDA" valor={() => 1 - (T < K.Co ? gelLiq : T < K.A ? 0.15 + 0.85 * comen : 1)} texto={(v) => Math.round(v * 100) + ' %'} x={280} ancho={720} y={1250} color={KC.red} />
      <Robert T={T} apariciones={[[0, 3.6, 'avatar_11_sorprendido', 'bajo-der'], [7, 10.5, 'avatar_13_senalando_arriba', 'bajo-der'], [16, 19.5, 'avatar_10_serio_molesto', 'bajo-der'], [24.5, 28, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'], [34, 38, 'avatar_02_apuntando_camara', 'presentador-bajo'], [44, 47.5, 'avatar_07_pensativo_puno', 'bajo-der'], [52.5, 57.5, 'avatar_04_bajando_lentes', 'bajo-der']]} />
      <MarcaAgua T={T} tema="quimica" num="01" hasta={K.F} />
      <CierreMarca T={T} at={K.F} tema="quimica" robert="assets/stickers/avatar_02_apuntando_camara.png" frase="Por qué el agar y no la gelatina" />
      <AudioPista src={window.AUDIO_SRC || 'assets/mezcla_mudo.wav'} />
    </div>
  );
}

window.AgarNarradoApp = kApp(AgarNarrado);
window.AgarMudoApp = kApp(AgarMudo);
