// Shot Ambiental #27 · Todos los lobos mexicanos vienen de solo siete — NARRADO (N4 la imagen que se llena + N2 el número).
// Datos: USFWS (historia 2023, "Fostering 101", estadísticas al 31 dic 2025), CONABIO Biodiversitas 119 (2015), Hedrick et al. 1997.
// Ver guion.md y verificacion.md. Todo el dibujo es esquemático.

// Lobo gris mexicano (Canis lupus baileyi) de perfil, mirando a la derecha. Origen = suelo bajo el cuerpo.
// Morfología: lobo chico y esbelto, patas largas, hocico largo, orejas paradas, cola tupida que cuelga con punta negra;
// pelaje gris jaspeado con "silla" negra en el lomo, tonos canela-rojizos en patas, orejas y hocico, y crema por abajo.
// s = 1 → ~360 px de la nariz a la cola. apagado 0..1 lo vuelve gris (perdido). camina: patas que se mueven.
const LB = { gris:'#9b9188', silla:'#2f2925', canela:'#c27a3e', crema:'#eadcc2', nariz:'#16120f' };
function Lobo({ x, y, s = 1, T = 0, flip = false, apagado = 0, camina = 0, fase = 0, o = 1, panza = 0 }) {
  const col = (c) => apagado > 0 ? mixHex(c, '#c9c9c9', apagado) : c;
  const st = KC.ink, sw = 5;
  const p = camina ? Math.sin(T * 9 * camina + fase) : 0;
  const pata = (px, adelante, k) => { const a = p * (k ? 1 : -1) * 14;
    return <g transform={`rotate(${a} ${px} -100)`}>
      <path d={adelante ? `M ${px - 9} -104 L ${px - 7} -14 Q ${px - 8} 0 ${px + 8} 0 L ${px + 14} -2 Q ${px + 8} -10 ${px + 7} -16 L ${px + 9} -104 Z`
        : `M ${px - 12} -112 Q ${px - 20} -70 ${px - 2} -48 L ${px - 8} -14 Q ${px - 10} 0 ${px + 6} 0 L ${px + 12} -2 Q ${px + 6} -10 ${px + 5} -16 L ${px + 12} -50 Q ${px + 10} -80 ${px + 12} -112 Z`}
        fill={col(LB.canela)} stroke={st} strokeWidth={sw - 1} strokeLinejoin="round" />
    </g>; };
  const bob = Math.sin(T * 2.2 + fase) * 2;
  return <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={o * (1 - apagado * 0.45)}>
    {/* patas del fondo */}
    <g opacity=".75">{pata(-58, false, 1)}{pata(62, true, 0)}</g>
    {/* cola tupida, cuelga baja, punta negra */}
    <g transform={`rotate(${Math.sin(T * 1.6 + fase) * 4} -100 -132)`}>
      <path d="M -100 -138 Q -146 -132 -160 -84 Q -168 -50 -150 -40 Q -132 -52 -126 -86 Q -118 -116 -96 -122 Z" fill={col(LB.gris)} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M -162 -70 Q -168 -48 -150 -40 Q -138 -48 -134 -66 Q -148 -60 -162 -70 Z" fill={col(LB.silla)} />
    </g>
    <g transform={`translate(0 ${bob})`}>
      {/* cuerpo */}
      <path d={`M -104 -138 Q -70 -168 30 -160 Q 84 -156 98 -128 Q 104 -98 72 ${-90 + panza * 12} Q 0 ${-84 + panza * 26} -76 -94 Q -110 -104 -104 -138 Z`} fill={col(LB.gris)} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
      {/* panza crema */}
      <path d={`M -70 -98 Q 0 ${-88 + panza * 26} 66 ${-94 + panza * 12} Q 30 -104 -60 -106 Z`} fill={col(LB.crema)} />
      {/* silla negra del lomo */}
      <path d="M -92 -142 Q -50 -170 40 -160 Q 20 -146 -20 -144 Q -60 -140 -92 -134 Z" fill={col(LB.silla)} opacity=".9" />
      {/* jaspeado */}
      {[[-40, -130], [-10, -124], [20, -134], [-62, -122], [48, -128]].map(([a, b], i) => <path key={i} d={`M ${a} ${b} l 8 6`} stroke={col('#6d655e')} strokeWidth={4} strokeLinecap="round" />)}
      {/* cuello y cabeza */}
      <path d="M 60 -150 Q 84 -196 126 -204 Q 150 -208 162 -194 L 206 -184 Q 216 -177 207 -168 L 166 -162 Q 138 -150 112 -120 Q 94 -104 72 -110 Z" fill={col(LB.gris)} stroke={st} strokeWidth={sw} strokeLinejoin="round" />
      {/* hocico canela y mejilla crema */}
      <path d="M 160 -192 L 204 -183 Q 212 -177 205 -170 L 166 -163 Q 150 -168 146 -178 Z" fill={col(LB.canela)} />
      <path d="M 120 -150 Q 148 -158 168 -164 Q 140 -140 112 -122 Z" fill={col(LB.crema)} />
      {/* orejas paradas (canela por dentro) */}
      <path d="M 112 -198 L 116 -238 L 136 -204 Z" fill={col(LB.gris)} stroke={st} strokeWidth={sw - 1} strokeLinejoin="round" />
      <path d="M 116 -203 L 118 -228 L 130 -205 Z" fill={col(LB.canela)} />
      <path d="M 130 -204 L 140 -240 L 152 -200 Z" fill={col(LB.gris)} stroke={st} strokeWidth={sw - 1} strokeLinejoin="round" />
      <path d="M 135 -204 L 141 -230 L 147 -203 Z" fill={col(LB.canela)} />
      {/* ojo ámbar, nariz y boca */}
      <ellipse cx={156} cy={-190} rx={6} ry={4.5} fill={apagado > 0.5 ? '#888' : '#e2a51c'} stroke={st} strokeWidth={2.5} />
      <circle cx={157} cy={-190} r={2} fill={st} />
      <ellipse cx={207} cy={-178} rx={7} ry={6} fill={LB.nariz} />
      <path d="M 170 -166 Q 188 -168 202 -170" stroke={st} strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
    {/* patas de enfrente */}
    {pata(-76, false, 0)}{pata(78, true, 1)}
  </g>;
}
// Mini lobo (silueta simple, para contar cientos). s = 1 → 34 px.
function LoboMini({ x, y, s = 1, color = LB.gris, o = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
    <path d="M -15 -9 Q -8 -14 6 -13 L 10 -18 L 11 -13 L 13 -18 L 15 -12 L 19 -10 L 15 -8 Q 12 -6 10 -2 L 10 6 L 8 6 L 7 -2 Q 0 0 -8 -1 L -9 6 L -11 6 L -11 -2 Q -16 -1 -19 5 Q -20 -2 -15 -9 Z" fill={color} stroke={KC.ink} strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M -12 -11 Q -4 -15 6 -13 Q 0 -10 -12 -9 Z" fill={LB.silla} />
  </g>;
}
// Cachorro de lobo (cabeza grande, hocico corto, orejas chicas). collar = color del collar (cachorro de cautiverio).
function Cachorro({ x, y, s = 1, T = 0, fase = 0, collar, flip = false, o = 1 }) {
  const b = Math.sin(T * 5 + fase) * 3;
  return <g transform={`translate(${x} ${y + b}) scale(${flip ? -s : s} ${s})`} opacity={o}>
    <ellipse cx={-10} cy={-30} rx={40} ry={26} fill="#7d7166" stroke={KC.ink} strokeWidth={4} />
    <path d="M -46 -36 Q -66 -30 -62 -14" stroke={KC.ink} strokeWidth={9} strokeLinecap="round" fill="none" />
    <circle cx={30} cy={-50} r={26} fill="#857a6e" stroke={KC.ink} strokeWidth={4} />
    <path d="M 44 -50 Q 62 -46 60 -36 Q 50 -32 40 -38 Z" fill={LB.canela} stroke={KC.ink} strokeWidth={3} />
    <path d="M 14 -70 L 16 -86 L 28 -73 Z" fill="#6a5f55" stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <path d="M 30 -74 L 38 -88 L 44 -70 Z" fill="#6a5f55" stroke={KC.ink} strokeWidth={3} strokeLinejoin="round" />
    <circle cx={38} cy={-54} r={4} fill={KC.ink} /><circle cx={60} cy={-41} r={4.5} fill={KC.ink} />
    {collar && <path d="M 8 -36 Q 18 -24 34 -26" stroke={collar} strokeWidth={8} fill="none" strokeLinecap="round" />}
    {[-34, -14, 6, 20].map((px, i) => <rect key={i} x={px} y={-12} width={10} height={14} rx={5} fill="#6a5f55" stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Pino esquemático.
function Pino({ x, y, s = 1, color = '#2f8a4a' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-10} y={-40} width={20} height={40} fill="#7a4a22" stroke={KC.ink} strokeWidth={4} />
    {[0, 1, 2].map((i) => <path key={i} d={`M 0 ${-180 + i * 45} L ${50 + i * 16} ${-90 + i * 40} L ${-50 - i * 16} ${-90 + i * 40} Z`} fill={color} stroke={KC.ink} strokeWidth={5} strokeLinejoin="round" />)}
  </g>;
}
// Caja de transporte con puerta que se abre (abre 0..1).
function Caja({ x, y, s = 1, abre = 0, texto }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-80} y={-110} width={160} height={110} rx={10} fill="#d9b27a" stroke={KC.ink} strokeWidth={6} />
    {[-50, -20, 10, 40].map((gx) => <line key={gx} x1={gx + 8} y1={-100} x2={gx + 8} y2={-60} stroke={KC.ink} strokeWidth={4} opacity=".5" />)}
    <g transform={`rotate(${-abre * 100} 80 -110)`}><rect x={70} y={-110} width={16} height={110} rx={4} fill="#b88a50" stroke={KC.ink} strokeWidth={5} /></g>
    {texto && <text x={0} y={-24} textAnchor="middle" style={{ font:`900 24px ${KF.texto}` }} fill={KC.ink}>{texto}</text>}
  </g>;
}
// Íconos de lo que casi acaba con ellos (sin violencia gráfica): trampa de cepo, bala, frasco de veneno.
function Trampa({ x, y, s = 1, cierra = 0 }) {
  const a = cierra * 70;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-14} y={-8} width={28} height={16} rx={4} fill="#666" stroke={KC.ink} strokeWidth={4} />
    <path d="M -10 0 A 46 46 0 0 1 -56 0" transform={`rotate(${a} -10 0)`} stroke="#555" strokeWidth={9} fill="none" />
    <path d="M 10 0 A 46 46 0 0 0 56 0" transform={`rotate(${-a} 10 0)`} stroke="#555" strokeWidth={9} fill="none" />
    <path d="M -56 0 L 56 0" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Bala({ x, y, s = 1, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -30 -12 L 14 -12 Q 40 -12 46 0 Q 40 12 14 12 L -30 12 Z" fill="#d6a23a" stroke={KC.ink} strokeWidth={5} />
    <line x1={6} y1={-12} x2={6} y2={12} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
function Veneno({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-30} y={-70} width={60} height={70} rx={12} fill="#7bd36a" stroke={KC.ink} strokeWidth={5} />
    <rect x={-14} y={-92} width={28} height={24} rx={4} fill="#555" stroke={KC.ink} strokeWidth={4} />
    <text x={0} y={-22} textAnchor="middle" style={{ font:`900 34px ${KF.texto}` }} fill={KC.ink}>☠</text>
  </g>;
}
// Malla del recinto.
function Recinto({ x, y, w = 600, h = 220, o = 1 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o}>
    {Array.from({ length: Math.round(w / 60) + 1 }, (_, i) => <line key={i} x1={i * 60} y1={-h} x2={i * 60} y2={0} stroke="#5d5d5d" strokeWidth={8} />)}
    <line x1={0} y1={-h} x2={w} y2={-h} stroke="#5d5d5d" strokeWidth={8} />
    {Array.from({ length: Math.round(w / 30) }, (_, i) => <path key={'m' + i} d={`M ${i * 30} ${-h} L ${i * 30 + 30} 0 M ${i * 30 + 30} ${-h} L ${i * 30} 0`} stroke="#9a9a9a" strokeWidth={2} opacity=".6" />)}
  </g>;
}
// Mínimos de la tabla USFWS (31 dic de cada año; 2004 y 2005 usan el valor bajo del rango).
const LB_TABLA = { 1998:4, 1999:15, 2000:22, 2001:26, 2002:41, 2003:55, 2004:44, 2005:35, 2006:59, 2007:52, 2008:52, 2009:42, 2010:50, 2011:67, 2012:80, 2013:88, 2014:112, 2015:98, 2016:114, 2017:117, 2018:131, 2019:163, 2020:186, 2021:196, 2022:242, 2023:257, 2024:286, 2025:319 };
// Posiciones de una manada dispersa (para el gancho y el cierre), fuera del centro.
function lbManada(n, seed, y0 = 640, y1 = 1180) {
  const r = krng(seed), out = [];
  while (out.length < n) { const x = 40 + r() * 1000, y = y0 + r() * (y1 - y0); if (Math.abs(x - 540) < 360 && Math.abs(y - 940) < 70) continue; out.push({ x, y, f: r() < 0.5, s: 0.9 + r() * 0.5, p: r() * 6 }); }
  return out;
}
const LB_SIETE = (y = 980) => Array.from({ length: 7 }, (_, i) => ({ x: 120 + i * 140, y }));

function LoboShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ca: CUES.Casi, U: CUES.Ultimo, R: CUES.Rescate, S: CUES.Siete, P: CUES.Pregunta, Su: CUES.Suelta, Co: CUES.Conteo, M: CUES.Mexico, Tr: CUES.Truco, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const svg = (c) => <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>{c}</svg>;
  const suelo = (color = '#c9a86a', y = 1080) => <rect x={0} y={y} width={KW} height={KH - y} fill={color} stroke={KC.ink} strokeWidth={6} />;
  const siete = LB_SIETE();
  // gancho / cierre: la manada se junta en los 7 fundadores (gancho) o sale de ellos (cierre)
  const MAN = lbManada(150, 27, 600, 1000), MAN2 = lbManada(319, 71, 560, 1060);
  const junta = kprog(T, K.G + 0.05, K.G + 2.2, kEase.suave);
  // conteo: año y lobos según la tabla real
  const anioF = klerp(1998, 2025, kprog(T, K.Co + 0.3, K.Co + 4.2, kEase.suave)), anio = Math.floor(anioF + 0.001);
  const nLobos = anio >= 2025 ? 319 : Math.round(klerp(LB_TABLA[anio], LB_TABLA[anio + 1], anioF - anio));
  const sale = kprog(T, K.C + 0.1, K.C + 2.4, kEase.suave);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la manada se recoge en 7 */}
      <Escena T={T} a={K.G} b={K.Ca}>
        <FondoLunares color={KC.mint} />
        {svg(<>{suelo('#9fd28a', 1000)}
          {MAN.map((m, i) => { const k = siete[i % 7]; return <LoboMini key={i} x={klerp(m.x, k.x, junta)} y={klerp(m.y, k.y - 60, junta)} s={1.8 * m.s * (1 - junta * 0.6)} o={1 - kprog(T, K.G + 1.6, K.G + 2.3)} />; })}
          {siete.map((k, i) => <Lobo key={i} x={k.x} y={k.y + 10} s={0.38 * kprog(T, K.G + 1.7 + i * 0.08, K.G + 2.2 + i * 0.08, kEase.rebote)} T={T} fase={i} />)}</>)}
      </Escena>
      {/* 1 · casi borrado: trampas, balas y veneno */}
      <Escena T={T} a={K.Ca} b={K.U}>
        <FondoLunares color={KC.yellow} />
        {svg(<>{suelo('#d7b77c', 1070)}
          {Array.from({ length: 8 }, (_, i) => { const x = 130 + (i % 4) * 260 + (i >= 4 ? 120 : 0), y = i < 4 ? 800 : 1060;
            const off = i === 2 ? 0 : kprog(T, K.Ca + 1.0 + i * 0.32, K.Ca + 1.4 + i * 0.32);
            return <Lobo key={i} x={x - (i >= 4 ? 60 : 0)} y={y} s={0.42} T={T} fase={i} apagado={off} o={1 - off * 0.5} flip={i % 2 === 1} />; })}
          <g opacity={kprog(T, K.Ca + 0.6, K.Ca + 0.9)}><Trampa x={200} y={650} s={1.1} cierra={kprog(T, K.Ca + 1.0, K.Ca + 1.2)} /></g>
          <g opacity={kprog(T, K.Ca + 1.4, K.Ca + 1.7)}><Bala x={klerp(-60, 520, kprog(T, K.Ca + 1.4, K.Ca + 2.0, kEase.sale))} y={620} s={1.1} /></g>
          <g opacity={kprog(T, K.Ca + 2.1, K.Ca + 2.4)}><Veneno x={840} y={680} s={1.1} /></g></>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 2 · EE. UU.: el último confirmado, 1970 */}
      <Escena T={T} a={K.U} b={K.R}>
        <FondoLunares color={KC.lilac} />
        {svg(<><rect x={0} y={860} width={KW} height={KH} fill="#e9d2a0" /><rect x={0} y={0} width={KW} height={860} fill="rgba(255,255,255,.12)" />
          <line x1={0} y1={860} x2={KW} y2={860} stroke={KC.ink} strokeWidth={7} strokeDasharray="26 16" />
          <text x={60} y={650} style={{ font:`400 66px ${KF.titulo}` }} fill={KC.ink}>EE. UU.</text>
          <text x={60} y={940} style={{ font:`400 66px ${KF.titulo}` }} fill={KC.ink}>MÉXICO</text>
          <Lobo x={640} y={820} s={0.5} T={T} o={1 - kprog(T, K.U + 2.2, K.U + 3.6)} />
          {[[330, 1050], [600, 1080], [860, 1040]].map(([x, y], i) => <Lobo key={i} x={x} y={y} s={0.34} T={T} fase={i} flip={i === 1} o={0.9} />)}</>)}
      </Escena>
      {/* 3 · 1977–1980: cinco capturados en México */}
      <Escena T={T} a={K.R} b={K.S}>
        <FondoLunares color={KC.orange} />
        {svg(<>{suelo('#e0c48c', 1080)}<Recinto x={60} y={1080} w={960} h={300} o={kprog(T, K.R + 0.2, K.R + 0.7)} />
          {Array.from({ length: 5 }, (_, i) => { const e = kprog(T, K.R + 0.4 + i * 0.35, K.R + 1.6 + i * 0.35, kEase.sale);
            return <Lobo key={i} x={klerp(-200, 170 + i * 180, e)} y={1070} s={0.4} T={T} fase={i} camina={e < 1 ? 1 : 0} panza={i === 4 ? 1 : 0} />; })}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 4 · 3 fundadores de los capturados + 4 de dos linajes de cautiverio = 7 */}
      <Escena T={T} a={K.S} b={K.P}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{suelo('#9fd28a', 1080)}
          {Array.from({ length: 7 }, (_, i) => { const g = i < 3 ? 0 : i < 5 ? 1 : 2;
            const x0 = [150, 270, 390][i] || (i < 5 ? [620, 740][i - 3] : [860, 980][i - 5]);
            const x0b = i < 3 ? 140 + i * 120 : i < 5 ? 590 + (i - 3) * 120 : 860 + (i - 5) * 120;
            const ap = kprog(T, K.S + 0.2 + g * 0.9, K.S + 0.7 + g * 0.9, kEase.rebote), une = kprog(T, K.S + 3.4, K.S + 4.6, kEase.suave);
            return <Lobo key={i} x={klerp(x0b, siete[i].x, une)} y={klerp(830, 1070, une)} s={0.34 * ap} T={T} fase={i} />; })}</>)}
        <EscalaFija texto="esquema (no a escala)" largo={0} y={1500} color={KC.ink} />
      </Escena>
      {/* 5 · pregunta */}
      <Escena T={T} a={K.P} b={K.Su} zoom={0.1}>
        <FondoLunares color={KC.lilac} />
        {svg(<><text x={260} y={960} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 260 820)`}>?</text>
          {Array.from({ length: 7 }, (_, i) => <LoboMini key={i} x={80 + i * 58} y={1080} s={1.5} />)}</>)}
      </Escena>
      {/* 6 · 1998: tres familias sueltas en Arizona */}
      <Escena T={T} a={K.Su} b={K.Co}>
        <FondoLunares color={KC.cyan} />
        {svg(<>{[80, 230, 420, 610, 800, 980].map((x, i) => <Pino key={i} x={x} y={890 + (i % 2) * 30} s={1.1 + (i % 3) * 0.15} />)}{suelo('#8cc46a', 930)}
          {[0, 1, 2].map((c) => { const ab = kprog(T, K.Su + 0.4 + c * 0.5, K.Su + 0.8 + c * 0.5); const cx = 150 + c * 120;
            return <g key={c}><Caja x={cx} y={1040 + c * 35} s={0.7} abre={ab} />
              {[0, 1].map((j) => { const e = kprog(T, K.Su + 0.8 + c * 0.5 + j * 0.2, K.Su + 2.6 + c * 0.5 + j * 0.2, kEase.sale), libre = (c * 2 + j) % 3 !== 2;
                return <Lobo key={j} x={klerp(cx + 40, 500 + c * 160 + j * 70, e)} y={1030 + c * 35 - j * 20} s={0.3} T={T} fase={c + j} camina={e < 1 ? 1 : 0} o={e > 0 ? (libre ? 1 : 1 - kprog(T, K.Su + 3.2, K.Su + 3.8) * 0.75) : 0} />; })}</g>; })}</>)}
        <EscalaFija texto="esquema" largo={0} y={1520} color={KC.ink} />
      </Escena>
      {/* 7 · conteo 1998 → 2025: la imagen se llena (mínimo USFWS al 31 dic) */}
      <Escena T={T} a={K.Co} b={K.M} zoom={0.02}>
        <FondoLunares color={KC.paper} punto="rgba(0,0,0,.06)" />
        {svg(<>{Array.from({ length: 319 }, (_, i) => { const c = i % 29, r = Math.floor(i / 29), x = 58 + c * 33.5, y = 730 + r * 38;
          return <g key={i}><rect x={x - 16} y={y - 22} width={32} height={34} rx={6} fill={i < 143 ? '#bfe6ff' : '#ffd8b0'} opacity={i < nLobos ? 1 : 0.35} />
            {i < nLobos && <LoboMini x={x} y={y} s={0.85} />}</g>; })}
          <text x={60} y={680} style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{anio}: {kformato(nLobos)} lobos libres</text></>)}
      </Escena>
      {/* 8 · México: primera camada en vida libre (Chihuahua, 2014) */}
      <Escena T={T} a={K.M} b={K.Tr}>
        <FondoLunares color={KC.mint} />
        {svg(<><path d="M 0 860 L 180 640 L 330 780 L 520 600 L 720 780 L 880 650 L 1080 820 L 1080 990 L 0 990 Z" fill="#a9906a" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
          {[90, 300, 760, 1000].map((x, i) => <Pino key={i} x={x} y={970} s={0.8} color="#2f7a44" />)}{suelo('#c7a873', 980)}
          <path d="M 320 990 Q 540 790 760 990 Z" fill="#8d6b45" stroke={KC.ink} strokeWidth={6} />
          <path d="M 470 990 Q 540 900 610 990 Z" fill="#2b1d12" />
          {[0, 1, 2, 3, 4].map((i) => { const e = kprog(T, K.M + 0.8 + i * 0.3, K.M + 1.3 + i * 0.3, kEase.rebote); return <Cachorro key={i} x={300 + i * 110} y={1070 + (i % 2) * 30} s={0.75 * e} T={T} fase={i} flip={i > 2} />; })}
          <Lobo x={900} y={1050} s={0.4} T={T} flip /></>)}
        {svg(<g opacity={kprog(T, K.M + 0.3, K.M + 0.8)}><MapaMexico x={640} y={330} ancho={400} conCA={false} />
          {(() => { const [mx, my] = mxProy(-108.4, 30.2); return <circle cx={640 + mx * 0.4} cy={330 + my * 0.4} r={13 + Math.sin(T * 6) * 3} fill={KC.red} stroke={KC.ink} strokeWidth={4} />; })()}</g>)}
      </Escena>
      {/* 9 · el truco: cachorros de cautiverio adoptados en madrigueras salvajes */}
      <Escena T={T} a={K.Tr} b={K.C}>
        <FondoLunares color={KC.orange} />
        {svg(<>{suelo('#9c7448', 780)}
          <ellipse cx={540} cy={950} rx={420} ry={140} fill="#3a2716" stroke={KC.ink} strokeWidth={7} />
          <path d="M 860 780 Q 900 850 880 890" stroke="#3a2716" strokeWidth={70} fill="none" />
          {(() => { const baja = kprog(T, K.Tr + 0.4, K.Tr + 1.8, kEase.suave), mez = kprog(T, K.Tr + 2.0, K.Tr + 3.2, kEase.suave);
            return <>{[0, 1, 2].map((i) => <Cachorro key={'w' + i} x={klerp(260 + i * 130, 220 + i * 170, mez)} y={1020 - (i % 2) * 40} s={0.8} T={T} fase={i} />)}
              {[0, 1].map((i) => <Cachorro key={'c' + i} x={klerp(760 + i * 110, 340 + i * 170 + 85, mez)} y={klerp(600, 1000 - i * 30, baja)} s={0.8} T={T} fase={i + 4} collar={KC.yellow} flip />)}
              {baja < 1 && <g opacity={1 - kprog(T, K.Tr + 1.6, K.Tr + 2.0)}><Caja x={820} y={klerp(520, 770, baja)} s={0.9} abre={kprog(T, K.Tr + 1.2, K.Tr + 1.6)} /></g>}
              <Goteo T={T} x={420} y0={840} y1={970} cada={0.35} color={KC.yellow} desde={K.Tr + 2.6} hasta={K.Tr + 4.4} r={10} />
              <Goteo T={T} x={640} y0={840} y1={970} cada={0.35} color={KC.yellow} desde={K.Tr + 2.8} hasta={K.Tr + 4.6} r={10} />
              {[0, 1, 2, 3].map((i) => { const u = ((T - K.Tr) * 0.8 + i / 4) % 1, on = kprog(T, K.Tr + 3.6, K.Tr + 4.2);
                return <path key={'o' + i} d={`M ${300 + i * 140} ${900 - u * 120} q 15 -20 0 -40 q -15 -20 0 -40`} stroke="#b8e04a" strokeWidth={8} fill="none" strokeLinecap="round" opacity={on * (1 - u)} />; })}</>; })()}</>)}
        <EscalaFija texto="esquema" largo={0} y={1520} color={KC.ink} />
      </Escena>
      {/* 10 · cierre: regreso a la imagen del inicio, ahora la manada sale de los 7 */}
      <Escena T={T} a={K.C} b={FIN}>
        <FondoLunares color={KC.mint} />
        {svg(<>{suelo('#9fd28a', 1000)}
          {MAN2.map((m, i) => { const k = siete[i % 7], e = kprog(T, K.C + 0.1 + (i % 40) * 0.03, K.C + 1.6 + (i % 40) * 0.03, kEase.sale);
            return <g key={i}><line x1={k.x} y1={k.y - 40} x2={klerp(k.x, m.x, e)} y2={klerp(k.y - 40, m.y, e)} stroke={KC.ink} strokeWidth={1.4} opacity={0.18} />
              <LoboMini x={klerp(k.x, m.x, e)} y={klerp(k.y - 40, m.y, e)} s={1.1} o={e} /></g>; })}
          {siete.map((k, i) => <g key={i}><circle cx={k.x} cy={k.y - 30} r={64} fill="rgba(255,225,26,.55)" stroke={KC.ink} strokeWidth={4} /><Lobo x={k.x} y={k.y + 40} s={0.32} T={T} fase={i} /></g>)}</>)}
      </Escena>

      {/* datos y etiquetas */}
      <NumeroGigante T={T} at={K.G + 1.6} until={K.Ca - 0.2} valor={7} desde={150} dur={0.8} etiqueta="vienen de solo:" x={300} y={500} tam={240} color={KC.yellow} />
      <Chip T={T} at={K.G + 2.6} until={K.Ca - 0.2} texto="en el monte o en cautiverio" y={1450} x={540} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.Ca + 0.2} until={K.U - 0.2} x={60} y={430} texto="lobo gris mexicano" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Ca + 0.4} until={K.U - 0.2} x={60} y={475} texto="Canis lupus baileyi" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.Ca + 0.6} until={K.U - 0.2} texto="siglo XX: trampas, balas y veneno" y={1450} x={540} tam={30} borde={KC.red} />
      <Chip T={T} at={K.U + 1.2} until={K.R - 0.2} texto="EE. UU.: último confirmado en libertad, 1970" y={1450} x={540} tam={26} borde={KC.red} />
      <Chip T={T} at={K.R + 0.3} until={K.S - 0.2} texto="1977–1980 · 5 capturados en México" y={480} x={420} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.R + 2.6} until={K.S - 0.2} x={250} y={690} texto="4 machos" tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 2.9} until={K.S - 0.2} x={1000} y={730} texto="hembra preñada" lado="izq" tam={30} color={KC.ink} />
      <Etq T={T} at={K.S + 0.3} until={K.S + 3.3} x={60} y={690} texto="linaje McBride: 3" tam={26} color={KC.ink} />
      <Etq T={T} at={K.S + 1.2} until={K.S + 3.3} x={540} y={690} texto="Aragón: 2" tam={26} color={KC.ink} />
      <Etq T={T} at={K.S + 2.1} until={K.S + 3.3} x={1060} y={750} texto="Ghost Ranch: 2" lado="izq" tam={26} color={KC.ink} />
      <NumeroGigante T={T} at={K.S + 4.4} until={K.P - 0.2} valor={7} dur={0.4} desde={0} etiqueta="fundadores:" x={700} y={560} tam={220} color={KC.yellow} />
      <Chip T={T} at={K.S + 4.6} until={K.P - 0.2} texto="3 + 2 + 2 = 7" y={1450} x={540} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Su + 0.3} until={K.Co - 0.2} x={1000} y={600} texto="Bosque Nacional Apache, Arizona" lado="izq" tam={26} color={KC.ink} />
      <Chip T={T} at={K.Su + 0.3} until={K.Co - 0.2} texto="1998 · 3 familias sueltas" y={480} x={400} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.Su + 3.4} until={K.Co - 0.2} texto="fin de 1998: 4 lobos libres" y={1450} x={540} tam={36} borde={KC.leaf} />
      <NumeroGigante T={T} at={K.Co + 4.2} until={K.M - 0.2} valor={319} desde={286} dur={0.5} etiqueta="al 31 dic 2025, al menos:" x={350} y={500} tam={190} color={KC.yellow} />
      <Chip T={T} at={K.Co + 4.4} until={K.M - 0.2} texto="Arizona 143 · Nuevo México 176" y={1450} x={540} tam={32} borde={KC.cyan} />
      <Chip T={T} at={K.Co + 0.4} until={K.Co + 4.0} texto="conteo oficial (USFWS): mínimo de cada año" y={1450} x={540} tam={26} borde={KC.ink} />
      <Etq T={T} at={K.M + 0.9} until={K.Tr - 0.2} x={760} y={560} texto="Chihuahua" lado="izq" tam={28} color={KC.ink} />
      <Chip T={T} at={K.M + 1.4} until={K.Tr - 0.2} texto="2014 · primera camada en vida libre en México" y={1450} x={540} tam={26} borde={KC.leaf} />
      <Chip T={T} at={K.Tr + 0.3} until={K.C - 0.2} texto="menos de 14 días de nacidos" y={480} x={340} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.Tr + 0.9} until={K.Tr + 2.2} x={700} y={540} texto="de cautiverio" lado="izq" tam={28} color={KC.ink} />
      <Etq T={T} at={K.Tr + 0.6} until={K.C - 0.2} x={140} y={850} texto="salvajes" tam={28} color={KC.paper} />
      <Chip T={T} at={K.Tr + 3.6} until={K.C - 0.2} texto="todos huelen igual → la madre los cría" y={1450} x={540} tam={28} borde={KC.leaf} />
      <Chip T={T} at={K.C + 1.4} until={K.Ou - 0.1} texto="más de 300 libres · todos de 7" y={480} x={400} tam={30} borde={KC.yellow} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ca - 0.1} texto="Todos vienen *de solo siete.*" />
      <Subtitulo T={T} idx={1} at={K.Ca + 0.1} until={K.U - 0.1} texto="Trampas, balas y veneno: *casi borrado.*" />
      <Subtitulo T={T} idx={2} at={K.U + 0.1} until={K.R - 0.1} texto="EE. UU.: el último libre, *en 1970.*" />
      <Subtitulo T={T} idx={3} at={K.R + 0.1} until={K.S - 0.1} texto="1977–1980: *cinco capturados.*" />
      <Subtitulo T={T} idx={4} at={K.S + 0.1} until={K.P - 0.1} texto="3 + 4 de cautiverio = *7 fundadores.*" />
      <Subtitulo T={T} idx={5} at={K.P + 0.1} until={K.Su - 0.1} texto="¿Una población *con siete?*" />
      <Subtitulo T={T} idx={6} at={K.Su + 0.1} until={K.Co - 0.1} texto="1998: tres familias → *4 libres.*" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.M - 0.1} texto="Fin de 2025: *al menos 319.*" />
      <Subtitulo T={T} idx={8} at={K.M + 0.1} until={K.Tr - 0.1} texto="Chihuahua, 2014: *cachorros libres.*" />
      <Subtitulo T={T} idx={9} at={K.Tr + 0.1} until={K.C - 0.1} texto="Pipí compartida: *huelen igual.*" />
      <Subtitulo T={T} idx={10} at={K.C + 0.1} until={K.Ou - 0.1} texto="Más de 300 libres, *todos de siete.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Casi + 2.6, CUES.Ultimo + 0.6, 'avatar_10_serio_molesto', 'arriba-der'],
        [CUES.Ultimo + 1.6, CUES.Rescate - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [CUES.Siete + 0.4, CUES.Siete + 3.6, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Suelta + 0.8, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Conteo + 2.4, CUES.Mexico + 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [CUES.Mexico + 2.4, CUES.Truco - 0.1, 'avatar_11_sorprendido', 'izq-alto'],
        [CUES.Truco + 2.4, CUES.Cierre - 0.1, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Cierre + 1.0, CUES.Outro - 0.1, 'avatar_06_pensativo_menton', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="27" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_02_apuntando_camara.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function LoboApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><LoboShot /></CompositionStage></div>;
}
window.LoboApp = LoboApp;
