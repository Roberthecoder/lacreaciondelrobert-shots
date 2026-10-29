// Shot IA #12 · La IA no vio al lobo: vio la nieve — NARRADO (N5 "El experimento" + N1 "Por dentro").
// Datos: Ribeiro, Singh y Guestrin, KDD 2016 (LIME, lobo/husky entrenado mal a propósito); Zech et al., PLOS Medicine 2018
// (neumonía y hospital); Winkler et al., JAMA Dermatology 2019 (tinta quirúrgica en lunares). Ver guion.md y verificacion.md.
const LN_AZUL = '#2f6dff', VIOLETA = '#6a2bd9';

/* ---------- La foto: lobo o husky, sobre nieve o pasto, con zonas tipo LIME ---------- */
// Caja local de 400 × 300. Celdas jitter de 6 × 5 (superpíxeles esquemáticos).
const LN_COLS = 6, LN_FILAS = 5;
function lnVertices(seed) {
  const r = krng(seed), V = [];
  for (let j = 0; j <= LN_FILAS; j++) { V.push([]); for (let i = 0; i <= LN_COLS; i++) {
    const borde = i === 0 || j === 0 || i === LN_COLS || j === LN_FILAS;
    V[j].push([i * 400 / LN_COLS + (borde ? 0 : (r() - 0.5) * 34), j * 300 / LN_FILAS + (borde ? 0 : (r() - 0.5) * 30)]); } }
  return V;
}
const LN_V = lnVertices(12);
// ¿La celda (i, j) es "nieve/suelo" o "animal"? (centros: x 33…366, y 30…270)
function lnTipo(i, j, animal) {
  const cx = (i + 0.5) * 400 / LN_COLS, cy = (j + 0.5) * 300 / LN_FILAS;
  if (animal === 'husky' || animal === 'lobo') {
    if (cy > 240) return 'suelo';
    if (cy > 180 && (cx < 110 || cx > 330)) return 'suelo';
    if (cy > 120 && cx < 70) return 'suelo';
    if (cx > 120 && cx < 340 && cy > 70 && cy < 200) return 'animal';
  }
  return 'otro';
}
function Perro({ animal = 'lobo', T = 0 }) {
  const lobo = animal === 'lobo';
  const lomo = lobo ? '#8b8178' : '#33353f', panza = lobo ? '#d9cfc0' : '#f4f1ea', cola = Math.sin(T * 5) * (lobo ? 3 : 8);
  const S = { stroke: KC.ink, strokeWidth: 5, strokeLinejoin: 'round' };
  return <g>
    <ellipse cx={210} cy={262} rx={120} ry={12} fill="rgba(0,0,0,.18)" />
    {/* cola */}
    {lobo ? <path d={`M 112 150 Q 70 ${185 + cola} 78 ${228 + cola} Q 96 ${215 + cola} 118 168 Z`} fill={lomo} {...S} />
      : <path d={`M 115 140 Q 70 ${100 + cola} 110 ${78 + cola} Q 128 ${96 + cola} 128 ${118} Q 132 136 120 150 Z`} fill={panza} {...S} />}
    {/* patas traseras y delanteras */}
    {[[135, 0], [165, 1], [262, 0], [292, 1]].map(([x, k]) => <rect key={x} x={x - 13} y={180} width={26} height={78} rx={11} fill={k ? panza : lomo} {...S} />)}
    {/* cuerpo */}
    <path d="M 110 150 Q 110 105 175 102 L 280 100 Q 330 104 330 150 Q 330 200 280 205 L 160 205 Q 110 200 110 150 Z" fill={lomo} {...S} />
    <path d="M 150 200 Q 215 222 300 196 Q 290 178 220 182 Q 170 182 150 200 Z" fill={panza} />
    {/* cuello y cabeza */}
    <path d="M 270 112 Q 300 70 330 66 L 350 120 Q 330 160 300 160 Z" fill={lomo} {...S} />
    <path d="M 322 40 L 332 8 L 346 38 Z" fill={lomo} {...S} /><path d="M 344 40 L 360 10 L 368 44 Z" fill={lomo} {...S} />
    <path d="M 310 70 Q 318 34 350 36 Q 378 40 382 66 L 400 78 Q 402 96 384 98 L 352 100 Q 320 100 310 70 Z" fill={lomo} {...S} />
    {!lobo && <path d="M 334 62 Q 352 50 372 62 L 398 80 Q 398 94 384 96 L 352 98 Q 334 92 334 62 Z" fill={panza} />}
    {lobo && <path d="M 356 74 L 398 80 Q 398 94 384 96 L 356 96 Z" fill={panza} />}
    <ellipse cx={398} cy={80} rx={7} ry={6} fill={KC.ink} />
    <circle cx={350} cy={58} r={6} fill={lobo ? '#e8a62a' : '#58b7ff'} stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Fondo({ fondo = 'nieve', T = 0, seed = 3 }) {
  const r = krng(seed);
  if (fondo === 'nieve') return <g>
    <rect width={400} height={300} fill="#cfe6fb" />
    {[30, 110, 330, 380].map((x, k) => <g key={k} transform={`translate(${x} ${150 + (k % 2) * 10})`}>
      <path d="M 0 -95 L 34 0 L -34 0 Z" fill="#2e6b4f" stroke={KC.ink} strokeWidth={4} /><path d="M 0 -95 L 16 -50 L -16 -50 Z" fill="#fff" />
    </g>)}
    <path d="M 0 185 Q 120 165 220 182 Q 320 196 400 178 L 400 300 L 0 300 Z" fill="#fbfdff" stroke="#b9d3ea" strokeWidth={4} />
    {Array.from({ length: 26 }, (_, k) => { const x = r() * 400, y0 = r() * 300, y = (y0 + T * 22 * (0.6 + r())) % 300; return <circle key={k} cx={x} cy={y} r={2 + r() * 2.5} fill="#fff" opacity=".9" />; })}
  </g>;
  return <g>
    <rect width={400} height={300} fill="#bfe6ff" />
    {[40, 140, 300, 370].map((x, k) => <circle key={k} cx={x} cy={170} r={44 + (k % 2) * 12} fill="#2f8f4e" stroke={KC.ink} strokeWidth={4} />)}
    <path d="M 0 185 Q 120 170 220 184 Q 320 196 400 180 L 400 300 L 0 300 Z" fill="#6cc24a" stroke={KC.ink} strokeWidth={4} />
    {Array.from({ length: 22 }, (_, k) => { const x = r() * 400, y = 200 + r() * 95; return <path key={k} d={`M ${x} ${y} l -4 -12 M ${x} ${y} l 4 -11`} stroke="#3e9a2e" strokeWidth={3} />; })}
  </g>;
}
// zonas: 0..1 (gris + bordes); en: 'suelo' | 'animal'. scan: 0..1 franja que barre. id único por instancia.
function FotoIA({ id, x, y, w = 600, T = 0, animal = 'lobo', fondo = 'nieve', zonas = 0, en = 'suelo', scan = -1, rot = 0, o = 1, s = 1 }) {
  const k = w / 400, h = 300 * k;
  const celdas = [];
  for (let j = 0; j < LN_FILAS; j++) for (let i = 0; i < LN_COLS; i++) {
    const V = LN_V, p = [V[j][i], V[j][i + 1], V[j + 1][i + 1], V[j + 1][i]];
    const d = 'M ' + p.map((q) => `${q[0]} ${q[1]}`).join(' L ') + ' Z';
    const si = lnTipo(i, j, animal) === en;
    celdas.push(<path key={`${i}-${j}`} d={d} fill={si ? 'rgba(255,225,26,.10)' : `rgba(70,72,80,${0.82 * zonas})`} stroke={si ? KC.yellow : 'rgba(0,0,0,0)'} strokeWidth={si ? 5 * zonas : 0} strokeOpacity={zonas} />);
  }
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <rect x={-w / 2 - 22} y={-h / 2 - 22} width={w + 44} height={h + 44} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={8} />
    <clipPath id={`ln-${id}`}><rect x={0} y={0} width={400} height={300} /></clipPath>
    <g transform={`translate(${-w / 2} ${-h / 2}) scale(${k})`}>
      <g clipPath={`url(#ln-${id})`}>
        <Fondo fondo={fondo} T={T} />
        <g transform={animal === 'husky' ? 'translate(-30 10)' : 'translate(-30 10)'}><Perro animal={animal} T={T} /></g>
        {zonas > 0 && celdas}
        {scan >= 0 && scan <= 1 && <rect x={0} y={scan * 300 - 6} width={400} height={12} fill={KC.cyan} opacity=".75" />}
      </g>
      <rect x={0} y={0} width={400} height={300} fill="none" stroke={KC.ink} strokeWidth={4 / k * 1.5} />
    </g>
  </g>;
}
// Miniatura sin marco grueso (para la cuadrícula de 20 fotos).
function MiniFoto({ id, x, y, animal, fondo, o = 1, T }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    <clipPath id={`mn-${id}`}><rect x={0} y={0} width={400} height={300} /></clipPath>
    <g transform="scale(0.43)"><g clipPath={`url(#mn-${id})`}><Fondo fondo={fondo} T={T} seed={id} /><g transform="translate(-30 10)"><Perro animal={animal} T={T + id} /></g></g>
      <rect x={0} y={0} width={400} height={300} fill="none" stroke={KC.ink} strokeWidth={12} rx={10} /></g>
  </g>;
}

/* ---------- personas (27 estudiantes) ---------- */
function Persona({ x, y, color, confia = 0, nieve = 0, T = 0, k = 0 }) {
  const b = Math.sin(T * 3 + k) * 3;
  return <g transform={`translate(${x} ${y + b})`}>
    <path d="M -34 70 Q -34 18 0 18 Q 34 18 34 70 Z" fill={color} stroke={KC.ink} strokeWidth={5} />
    <circle cx={0} cy={-6} r={24} fill="#f1c39a" stroke={KC.ink} strokeWidth={5} />
    {confia > 0 && <g transform={`translate(30 -30) scale(${confia})`}><circle r={20} fill={KC.leaf} stroke={KC.ink} strokeWidth={4} /><path d="M -9 0 L -2 8 L 10 -8" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" /></g>}
    {nieve > 0 && <g transform={`translate(-30 -34) scale(${nieve})`}><circle r={22} fill="#fff" stroke={KC.ink} strokeWidth={4} />
      {[0, 60, 120].map((a) => <line key={a} x1={-13} y1={0} x2={13} y2={0} transform={`rotate(${a})`} stroke={LN_AZUL} strokeWidth={4} strokeLinecap="round" />)}</g>}
  </g>;
}

/* ---------- hospital, radiografía, lunar, tijeras ---------- */
function Hospital({ x, y, s = 1, nombre, color = '#fffdf6' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-150} width={240} height={220} rx={10} fill={color} stroke={KC.ink} strokeWidth={7} />
    <rect x={-50} y={-210} width={100} height={70} rx={8} fill={color} stroke={KC.ink} strokeWidth={7} />
    <path d="M -12 -198 h 24 v 16 h 16 v 24 h -16 v 16 h -24 v -16 h -16 v -24 h 16 Z" fill={KC.red} />
    {[-80, -25, 30, 85].map((wx) => [-110, -50].map((wy) => <rect key={`${wx}${wy}`} x={wx - 18} y={wy} width={36} height={36} rx={4} fill="#9fd6ff" stroke={KC.ink} strokeWidth={4} />))}
    <rect x={-26} y={10} width={52} height={60} fill="#7a5a3a" stroke={KC.ink} strokeWidth={5} />
    <text y={118} textAnchor="middle" style={{ font:`900 40px ${KF.texto}` }} fill={KC.ink}>{nombre}</text>
  </g>;
}
// Radiografía de tórax esquemática (caja 520 × 560). ficha: brillo 0..1 de la ficha metálica; calor: 0..1 mapa de activación.
function Radiografia({ x, y, s = 1, ficha = 0.6, calor = 0, scan = -1, T = 0, letra = 'R' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={0} y={0} width={520} height={560} rx={16} fill="#07090d" stroke="#3a4a66" strokeWidth={8} />
    <path d="M 40 560 Q 50 170 160 120 L 200 95 Q 260 70 320 95 L 360 120 Q 470 170 480 560 Z" fill="#3b4250" />
    <ellipse cx={180} cy={300} rx={95} ry={175} fill="#151a23" /><ellipse cx={345} cy={300} rx={95} ry={175} fill="#151a23" />
    {Array.from({ length: 8 }, (_, i) => <g key={i} opacity=".75">
      <path d={`M 255 ${160 + i * 40} Q 160 ${140 + i * 40} 95 ${190 + i * 42}`} stroke="#c9d2e0" strokeWidth={8} fill="none" />
      <path d={`M 265 ${160 + i * 40} Q 360 ${140 + i * 40} 425 ${190 + i * 42}`} stroke="#c9d2e0" strokeWidth={8} fill="none" />
    </g>)}
    <rect x={244} y={80} width={32} height={470} rx={10} fill="#d7dde8" opacity=".85" />
    <ellipse cx={300} cy={420} rx={90} ry={70} fill="#8d97a8" opacity=".55" />
    <path d="M 130 120 Q 200 100 245 112 M 395 120 Q 320 100 275 112" stroke="#e3e8f0" strokeWidth={12} fill="none" strokeLinecap="round" />
    {/* ficha metálica de lado (L/R) en la esquina */}
    <g transform="translate(430 28)">
      <rect width={62} height={62} rx={8} fill={mixHex('#9aa3b2', '#ffffff', ficha)} stroke={KC.ink} strokeWidth={4} />
      <text x={31} y={48} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>{letra}</text>
    </g>
    {calor > 0 && <g opacity={calor}>
      <defs><radialGradient id="ln-calor"><stop offset="0" stopColor="#ff3b2f" stopOpacity=".95" /><stop offset=".45" stopColor="#ffe11a" stopOpacity=".6" /><stop offset="1" stopColor="#ffe11a" stopOpacity="0" /></radialGradient></defs>
      <circle cx={461} cy={59} r={120 + 8 * Math.sin(T * 5)} fill="url(#ln-calor)" />
      <circle cx={40} cy={40} r={70} fill="url(#ln-calor)" opacity=".5" /><circle cx={480} cy={520} r={70} fill="url(#ln-calor)" opacity=".45" />
    </g>}
    {scan >= 0 && scan <= 1 && <rect x={0} y={scan * 560 - 5} width={520} height={10} fill={KC.cyan} opacity=".7" />}
  </g>;
}
// Vista de dermatoscopio: piel en círculo con un lunar; tinta violeta alrededor (0..1, se dibuja).
function Dermatoscopio({ x, y, r = 240, tinta = 0, recorte = 0, T = 0 }) {
  const L = 2 * Math.PI * 150;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 26} fill="#2b3445" stroke={KC.ink} strokeWidth={8} />
    <clipPath id="ln-derma"><circle r={r} /></clipPath>
    <g clipPath="url(#ln-derma)">
      <rect x={-r} y={-r} width={2 * r} height={2 * r} fill="#e9b48f" />
      {Array.from({ length: 40 }, (_, k) => { const a = k * 2.4, d = 40 + (k * 37) % (r - 30); return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={2.5} fill="#c98f6c" opacity=".6" />; })}
      <path d="M -62 -10 Q -60 -66 0 -70 Q 64 -66 66 -6 Q 70 56 6 66 Q -58 64 -62 -10 Z" fill="#7a4a2c" stroke="#5a321c" strokeWidth={6} />
      <circle cx={-14} cy={-12} r={22} fill="#5e371f" opacity=".7" /><circle cx={22} cy={18} r={16} fill="#5e371f" opacity=".6" />
      {tinta > 0 && <circle r={150} fill="none" stroke={VIOLETA} strokeWidth={22} strokeLinecap="round" strokeDasharray={`${L * tinta} ${L}`} opacity=".9" transform="rotate(-90)" />}
      {tinta > 0 && <path d={`M -190 120 Q -120 ${150} -40 ${170}`} stroke={VIOLETA} strokeWidth={16} fill="none" strokeLinecap="round" opacity={0.85 * kclamp(tinta * 2 - 1, 0, 1)} />}
      {recorte > 0 && <path d={`M ${-r} ${-r} H ${r} V ${r} H ${-r} Z M -100 -100 V 100 H 100 V -100 Z`} fillRule="evenodd" fill={`rgba(20,22,28,${0.92 * recorte})`} />}
    </g>
    {recorte > 0 && <rect x={-100} y={-100} width={200} height={200} fill="none" stroke={KC.yellow} strokeWidth={6} strokeDasharray="18 12" opacity={recorte} />}
  </g>;
}
function Tijeras({ x, y, s = 1, abre = 0 }) {
  const a = 12 + 14 * abre;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <g transform={`rotate(${-a})`}><path d="M 0 0 L 150 -10 L 150 4 Z" fill="#d7dde8" stroke={KC.ink} strokeWidth={5} /><circle cx={-48} cy={-6} r={30} fill="none" stroke={KC.red} strokeWidth={14} /></g>
    <g transform={`rotate(${a})`}><path d="M 0 0 L 150 10 L 150 -4 Z" fill="#c4ccd8" stroke={KC.ink} strokeWidth={5} /><circle cx={-48} cy={6} r={30} fill="none" stroke={KC.red} strokeWidth={14} /></g>
    <circle r={8} fill={KC.ink} />
  </g>;
}
// Barras horizontales (copiadas del modelo ia-09).
function BarrasLN({ T, at, until, filas, top = 760 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:70, top, width:940, zIndex:40, opacity:e.o }}>
    {filas.map((f, i) => { const a0 = f.at || at, g = kprog(T, a0 + 0.1, a0 + 1.2, kEase.sale);
      return <div key={i} style={{ marginBottom:24, opacity: T >= a0 ? 1 : 0 }}>
        <div style={{ font:`900 36px ${KF.texto}`, color:f.tinta || KC.ink, marginBottom:6 }}>{f.etiqueta}</div>
        <div style={{ display:'flex', alignItems:'center', gap:18 }}>
          <div style={{ width:Math.max(14, 700 * f.valor / 100 * g), height:72, background:f.color, border:`6px solid ${KC.ink}`, borderRadius:16 }}></div>
          <div style={{ font:`400 66px ${KF.titulo}`, color:f.color, WebkitTextStroke:`3px ${KC.ink}` }}>{f.texto || `${kformato(f.valor * g, 0)} %`}</div>
        </div>
      </div>; })}
  </div>;
}

function LoboNieve() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, F: CUES.Fotos, R: CUES.Regla, Pu: CUES.Prueba, P: CUES.Pregunta, H: CUES.Hospital, Fi: CUES.Ficha, L: CUES.Lunares, Re: CUES.Recorte, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c, z = 0) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{c}</svg>;
  const PU2 = K.Pu + 5.8, H2 = K.H + 5.9;   // segunda frase de Prueba y de Hospital (tiempos de la base)
  // 27 estudiantes: 10 confían antes; después 25 ven la nieve y solo 3 siguen confiando.
  const confAntes = Math.round(10 * kprog(T, K.Pu + 2.6, K.Pu + 4.4)), vieron = Math.round(25 * kprog(T, PU2 + 0.6, PU2 + 2.4)), confDesp = T < PU2 + 0.6 ? confAntes : Math.round(klerp(10, 3, kprog(T, PU2 + 0.6, PU2 + 2.4)));
  const ORDEN = [3, 21, 8, 14, 0, 25, 11, 17, 5, 19, 1, 23, 9, 13, 26, 6, 16, 2, 20, 10, 24, 4, 15, 7, 22, 12, 18];
  const rojosL = Math.round(54 * kprog(T, K.L + 4.6, K.L + 6.6, kEase.suave));
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: el lobo en la nieve… y lo que de verdad miró la IA */}
      <Escena T={T} a={K.G} b={K.F}>
        <FondoLunares color={KC.cyan} />
        {svg(<FotoIA id="g" x={400} y={930} w={600} T={T} animal="lobo" fondo="nieve" scan={kprog(T, K.G + 0.05, K.G + 0.95)} zonas={kprog(T, K.G + 1.5, K.G + 2.3, kEase.sale)} rot={-2} />)}
      </Escena>
      <Chip T={T} at={K.G + 0.9} until={K.F - 0.2} texto="IA: «LOBO» ✔" x={300} y={690} tam={44} borde={KC.leaf} />
      <Chip T={T} at={K.G + 1.9} until={K.F - 0.2} texto="lo que miró la IA ↓" x={330} y={570} tam={34} borde={KC.yellow} />

      {/* 2 · las 20 fotos de entrenamiento */}
      <Escena T={T} a={K.F} b={K.R}>
        <FondoLunares color={KC.lilac} />
        {svg(<>{Array.from({ length: 20 }, (_, n) => { const c = n % 5, f = Math.floor(n / 5), lobo = f < 2, a0 = K.F + 2.3 + n * 0.08;
          return <MiniFoto key={n} id={n + 1} x={62 + c * 196} y={700 + f * 122} animal={lobo ? 'lobo' : 'husky'} fondo={lobo ? 'nieve' : 'pasto'} o={kprog(T, a0, a0 + 0.25)} T={T} />; })}
          <g opacity={kprog(T, K.F + 4.0, K.F + 4.4)}>
            <text x={40} y={690} style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink} transform="rotate(-90 40 690)" textAnchor="end">lobos</text>
            <text x={40} y={934} style={{ font:`900 30px ${KF.texto}` }} fill={KC.ink} transform="rotate(-90 40 934)" textAnchor="end">huskies</text>
          </g>
        </>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.F + 0.2} until={K.F + 2.2} anio="2016" quien="Universidad de Washington" revista="Ribeiro, Singh y Guestrin · KDD 2016" y={700} />
      <Chip T={T} at={K.F + 2.4} until={K.F + 4.3} texto="20 fotos para entrenarla" x={340} y={560} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.F + 4.4} until={K.R - 0.2} texto="entrenada mal a propósito" x={340} y={560} tam={36} borde={KC.red} />

      {/* 3 · la regla tramposa: un husky en la nieve = "lobo" */}
      <Escena T={T} a={K.R} b={K.Pu}>
        <FondoLunares color={KC.yellow} />
        {svg(<FotoIA id="r" x={560} y={910} w={620} T={T} animal="husky" fondo="nieve" scan={kprog(T, K.R + 1.0, K.R + 1.9)} rot={2} />)}
      </Escena>
      <Chip T={T} at={K.R + 0.3} until={K.Pu - 0.2} texto="si hay nieve ➜ «LOBO»" x={650} y={520} tam={46} borde={KC.red} />
      <Chip T={T} at={K.R + 2.0} until={K.Pu - 0.2} texto="IA: «LOBO» ✖" x={420} y={680} tam={44} borde={KC.red} />
      <Chip T={T} at={K.R + 2.8} until={K.Pu - 0.2} texto="(era un husky)" x={760} y={1170} tam={34} borde={KC.ink} />

      {/* 4 · la prueba con 27 estudiantes de posgrado */}
      <Escena T={T} a={K.Pu} b={K.P}>
        <FondoLunares color={KC.mint} />
        {svg(<>{Array.from({ length: 27 }, (_, n) => { const c = n % 9, f = Math.floor(n / 9), a0 = K.Pu + 0.3 + n * 0.05, rk = ORDEN.indexOf(n);
          const resto = [1, 2, 3, 5, 6, 8, 9].indexOf(rk);   // los 7 que dejan de confiar
          const conf = T < PU2 + 0.6 ? (rk < confAntes ? 1 : 0) : (rk === 0 || rk === 4 || rk === 7 ? 1 : (resto >= 0 && resto < confDesp - 3 ? 1 : 0));
          const nv = rk < vieron ? 1 : 0;
          return <g key={n} opacity={kprog(T, a0, a0 + 0.3)}><Persona x={110 + c * 108} y={760 + f * 150} k={n} T={T} color={[KC.pink, LN_AZUL, KC.orange, KC.lilac, KC.teal][n % 5]} confia={conf} nieve={nv} /></g>; })}
          {T > PU2 - 0.2 && <g opacity={kprog(T, PU2 - 0.2, PU2 + 0.3)}><FotoIA id="p" x={300} y={560} w={300} T={T} animal="husky" fondo="nieve" zonas={kprog(T, PU2, PU2 + 0.6)} s={1} rot={-3} /></g>}
        </>)}
      </Escena>
      <Chip T={T} at={K.Pu + 0.4} until={PU2 - 0.3} texto="27 estudiantes de posgrado" x={360} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.Pu + 2.6} until={PU2 - 0.3} texto={`confían en la IA: ${confAntes} de 27`} x={360} y={570} tam={36} borde={KC.leaf} />
      <Chip T={T} at={PU2 + 0.6} until={K.P - 0.2} texto={`vieron la nieve: ${vieron} de 27`} x={760} y={500} tam={32} borde={LN_AZUL} />
      <Chip T={T} at={PU2 + 1.4} until={K.P - 0.2} texto={`confían: ${confDesp} de 27`} x={760} y={590} tam={32} borde={KC.leaf} />

      {/* 5 · re-gancho */}
      <Escena T={T} a={K.P} b={K.H} zoom={0.1}>
        <FondoLunares color={KC.orange} />
        {svg(<text x={300} y={1080} textAnchor="middle" style={{ font:`400 520px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 300 900)`}>?</text>)}
      </Escena>

      {/* 6 · tres hospitales, neumonía muy distinta */}
      <Escena T={T} a={K.H} b={K.Fi}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<g opacity={1 - kprog(T, H2 - 0.4, H2 + 0.1)}>
          {[['NIH', 200], ['Mount Sinai', 540], ['Indiana', 880]].map(([n, x], i) => <g key={n} opacity={kprog(T, K.H + 2.6 + i * 0.3, K.H + 3.0 + i * 0.3)}>
            <Hospital x={x} y={930} s={0.95} nombre={n} />
            {[0, 1, 2].map((k) => <g key={k} transform={`translate(${x - 70 + k * 18} ${1010 - k * 12}) rotate(${-8 + k * 8})`}><rect width={90} height={100} rx={6} fill="#10141c" stroke={KC.ink} strokeWidth={4} /><ellipse cx={30} cy={50} rx={14} ry={30} fill="#3a4250" /><ellipse cx={60} cy={50} rx={14} ry={30} fill="#3a4250" /></g>)}
          </g>)}
        </g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.H + 0.2} until={K.H + 2.6} anio="2018" quien="3 hospitales de EE. UU." revista="Zech et al. · PLOS Medicine" y={680} />
      <Chip T={T} at={K.H + 3.2} until={H2 - 0.3} texto="IA que busca neumonía" x={540} y={560} tam={38} borde={KC.ink} />
      <Chip T={T} at={H2 + 0.1} until={K.Fi - 0.2} texto="radiografías con neumonía" x={600} y={560} tam={36} borde={KC.ink} />
      <BarrasLN T={T} at={H2 + 0.2} until={K.Fi - 0.2} top={680} filas={[{ valor: 34.2, texto: '34 %', etiqueta: 'Mount Sinai: 1 de cada 3', color: KC.red }, { valor: 1.2, texto: '1 %', etiqueta: 'NIH: casi ninguna', color: LN_AZUL, at: H2 + 1.8 }]} />

      {/* 7 · por dentro: la red reconoce el hospital, hasta por la ficha de metal */}
      <Escena T={T} a={K.Fi} b={K.L}>
        <FondoCircuito T={T} />
        {svg(<Radiografia x={70} y={630} s={0.98} T={T} ficha={0.5 + 0.5 * kprog(T, K.Fi + 1.6, K.Fi + 2.0)} calor={kprog(T, K.Fi + 1.8, K.Fi + 2.6, kEase.sale)} scan={kprog(T, K.Fi + 0.3, K.Fi + 1.5)} />)}
      </Escena>
      <Chip T={T} at={K.Fi + 0.3} until={K.L - 0.2} texto="¿de qué hospital es esta placa?" x={380} y={470} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.Fi + 2.0} until={K.L - 0.2} texto="ficha de metal (lado R/L)" x={330} y={560} tam={30} borde={KC.yellow} />
      <Chip T={T} at={K.Fi + 2.6} until={K.L - 0.2} texto="NIH 99.95 %" x={840} y={760} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Fi + 2.9} until={K.L - 0.2} texto="Mount Sinai 99.98 %" x={840} y={870} tam={30} borde={KC.cyan} />
      <Chip T={T} at={K.Fi + 3.2} until={K.L - 0.2} texto="Indiana 95.6 %" x={840} y={980} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.Fi + 3.5} until={K.L - 0.2} texto="placas reconocidas" x={840} y={1080} tam={28} borde={KC.texto} />

      {/* 8 · la tinta del cirujano en los lunares */}
      <Escena T={T} a={K.L} b={K.Re}>
        <FondoLunares color={KC.pink} />
        {svg(<g opacity={1 - kprog(T, K.L + 4.1, K.L + 4.6)}><Dermatoscopio x={540} y={930} r={230} T={T} tinta={kprog(T, K.L + 2.4, K.L + 3.2, kEase.sale)} /></g>)}
        {svg(<g opacity={kprog(T, K.L + 4.3, K.L + 4.8)}>{Array.from({ length: 100 }, (_, n) => { const c = n % 10, f = Math.floor(n / 10), roja = n < rojosL;
          return <g key={n} transform={`translate(${600 + c * 44} ${690 + f * 40})`}><rect width={36} height={34} rx={8} fill={roja ? KC.red : '#e9b48f'} stroke={KC.ink} strokeWidth={3} /><circle cx={18} cy={17} r={7} fill={roja ? '#5a0e09' : '#7a4a2c'} /><circle cx={18} cy={17} r={12} fill="none" stroke={VIOLETA} strokeWidth={3} /></g>; })}</g>)}
      </Escena>
      <TarjetaEstudio T={T} at={K.L + 0.2} until={K.L + 2.3} anio="2019" quien="Universidad de Heidelberg, Alemania" revista="Winkler et al. · JAMA Dermatology" y={560} />
      <Chip T={T} at={K.L + 1.2} until={K.L + 2.6} texto="IA: «lunar sano» ✔" x={540} y={1150} tam={40} borde={KC.leaf} />
      <Chip T={T} at={K.L + 2.6} until={K.L + 4.1} texto="tinta de cirujano" x={540} y={560} tam={38} borde={VIOLETA} />
      <Chip T={T} at={K.L + 3.2} until={K.L + 4.1} texto="IA: «MELANOMA» ✖" x={540} y={1150} tam={40} borde={KC.red} />
      <Chip T={T} at={K.L + 4.4} until={K.Re - 0.2} texto="lunares sanos con tinta" x={820} y={620} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.L + 4.8} until={K.Re - 0.2} texto={`«melanoma»: ${rojosL} %`} x={820} y={1150} tam={38} borde={KC.red} />

      {/* 9 · recortar la tinta */}
      <Escena T={T} a={K.Re} b={K.C}>
        <FondoLunares color={KC.mint} />
        {svg(<><Dermatoscopio x={540} y={900} r={230} T={T} tinta={1} recorte={kprog(T, K.Re + 0.4, K.Re + 1.2, kEase.sale)} />
          <g opacity={1 - kprog(T, K.Re + 1.3, K.Re + 1.7)}><Tijeras x={klerp(260, 820, kprog(T, K.Re + 0.1, K.Re + 1.2))} y={790} s={1} abre={Math.abs(Math.sin(T * 12))} /></g></>)}
      </Escena>
      <Chip T={T} at={K.Re + 0.2} until={K.C - 0.2} texto="foto recortada" x={540} y={560} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Re + 1.3} until={K.C - 0.2} texto="IA: «lunar sano» ✔" x={540} y={1170} tam={40} borde={KC.leaf} />

      {/* 10 · cierre: la misma foto, probada con datos de fuera */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.cyan} />
        {svg(<>
          <FotoIA id="c1" x={klerp(400, 300, kprog(T, K.C + 1.6, K.C + 2.4, kEase.suave))} y={klerp(930, 760, kprog(T, K.C + 1.6, K.C + 2.4, kEase.suave))} s={klerp(1, 0.7, kprog(T, K.C + 1.6, K.C + 2.4, kEase.suave))} w={600} T={T} animal="lobo" fondo="nieve" zonas={1} rot={-2} />
          <g opacity={kprog(T, K.C + 2.2, K.C + 2.7)}><FotoIA id="c2" x={640} y={1010} w={420} T={T} animal="lobo" fondo="pasto" rot={3} scan={kprog(T, K.C + 2.6, K.C + 3.3)} /></g>
        </>)}
      </Escena>
      <Chip T={T} at={K.C + 0.3} until={K.C + 2.0} texto="pruébala con datos de fuera" x={420} y={470} tam={34} borde={KC.ink} />
      <Chip T={T} at={K.C + 3.3} until={K.Ou} texto="IA: «husky» ✖" x={740} y={770} tam={36} borde={KC.red} />
      <Chip T={T} at={K.C + 3.9} until={K.Ou} texto="¡atajo descubierto!" x={420} y={470} tam={44} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.F - 0.1} texto="No vio al lobo: *vio la nieve.*" />
      <Subtitulo T={T} idx={1} at={K.F + 0.1} until={K.R - 0.1} texto="*20 fotos:* lobos en nieve; huskies, nunca." />
      <Subtitulo T={T} idx={2} at={K.R + 0.1} until={K.Pu - 0.1} texto="Regla tramposa: *nieve = lobo.*" />
      <Subtitulo T={T} idx={3} at={K.Pu + 0.1} until={PU2 - 0.1} texto="*10 de 27* confiaron en ella." />
      <Subtitulo T={T} idx={4} at={PU2 + 0.05} until={K.P - 0.1} texto="Al ver la explicación: *¡la nieve!*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.H - 0.1} texto="¿Y si nadie pone *el atajo?*" />
      <Subtitulo T={T} idx={6} at={K.H + 0.1} until={H2 - 0.1} texto="Neumonía en *3 hospitales.*" />
      <Subtitulo T={T} idx={7} at={H2 + 0.05} until={K.Fi - 0.1} texto="*1 de cada 3* placas… o *casi ninguna.*" />
      <Subtitulo T={T} idx={8} at={K.Fi + 0.1} until={K.L - 0.1} texto="Reconocía el hospital… *hasta por una ficha.*" />
      <Subtitulo T={T} idx={9} at={K.L + 0.1} until={K.Re - 0.1} texto="Con tinta: *más de la mitad,* «melanoma»." />
      <Subtitulo T={T} idx={10} at={K.Re + 0.1} until={K.C - 0.1} texto="Sin tinta: *volvió a acertar.*" />
      <Subtitulo T={T} idx={11} at={K.C + 0.1} until={K.Ou - 0.1} texto="Pruébala en *otros hospitales.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 3.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Fotos + 3.0, CUES.Regla - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Regla + 1.5, CUES.Prueba - 0.2, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Prueba + 6.0, CUES.Pregunta - 0.15, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Hospital + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Hospital + 6.2, CUES.Ficha - 0.2, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Ficha + 2.2, CUES.Lunares - 0.15, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Lunares + 4.5, CUES.Recorte - 0.1, 'avatar_11_sorprendido', 'grande-izq'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_13_senalando_arriba', 'arriba-der']]} />
      <MarcaAgua T={T} tema="ia" num="12" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="ia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LoboNieveApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LoboNieve /></CompositionStage></div>;
}
window.LoboNieveApp = LoboNieveApp;
