// Shot Fungi Mati #80 · Este hongo no tiene dos sexos: tiene más de veintitrés mil — NARRADO (gancho 1 "esto no es X: es Y" + N2 el número).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático (cromosomas, ruedas, mapa y fíbula simplificados).
// TODOS los textos en pantalla viven en TXT (arriba) para cambiarlos fácil si la verificación pide corregir algo.

const TXT = {
  numero: 23328,                                   // tipos de apareamiento posibles (estimación de Raper, 1966)
  numEtq: ['tipos de apareamiento posibles', '(estimación de 1966)'],
  comen: 'y en México se come',
  comun: 'oreja de palo',
  cient: 'Schizophyllum commune',
  tam: '1–4 cm · sin pie',
  pegado: 'pegado de lado a la madera',
  laminas: 'laminillas «partidas»',
  seco: 'seco: se encoge',
  lluvia: 'con lluvia: se abre',
  sexoChip: 'sexo = tipo de apareamiento',
  porDentro: 'AL MICROSCOPIO · UNA HIFA',
  espora: 'espora',
  hifa: 'hifa',
  nucleo: 'núcleo',
  zonaA: 'zona A', zonaB: 'zona B',
  ruedaA: 'A · 288 versiones', ruedaB: 'B · 81',
  cuenta: '288 × 81 = 23,328',
  raper: 'estimación de Raper, 1966',
  reglaChip: 'pareja fértil = A distinta + B distinta',
  pruebas: [['A1 · B1', 'A1 · B2', 'misma A'], ['A2 · B5', 'A4 · B5', 'misma B'], ['A1 · B1', 'A2 · B2', '¡pareja!']],
  dosNucleos: 'dos núcleos por célula: uno de cada pareja',
  fibula: 'fíbula',
  extrano: 'con un extraño', extranoV: 'hasta 98 %',
  hermano: 'con un hermano', hermanoV: '25–30 %',
  extranoChip: 'casi cualquier desconocido le sirve',
  anio: '2000–2002',
  quien: 'Ruán-Soto, Garibay-Orijel y Cifuentes',
  revista: 'UNAM · ECOSUR · Rev. Mex. Micología, 2004',
  entrevistas: '25 mercados · 291 personas',
  estados: [['VERACRUZ', -96.7, 19.3], ['OAXACA', -96.4, 17.15], ['TABASCO', -92.5, 17.35]],
  orejaPalo: 'oreja de palo',
  orejaMulato: 'u «oreja de palo mulato»',
  seisChip: 'en los 6 mercados con hongos',
  mone: 'mone',
  moneEtq: 'Tabasco',
  moneLugar: 'en Tabasco (Teapa y Macuspana)',
  semana: 'más de una vez por semana',
  temporada: 'en temporada de lluvias',
  dias: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  cierreChip: 'no 2 sexos: miles',
};

const MS = { blanco:'#f3efe7', gris:'#c9c3b8', gris2:'#9c968c', lam:'#ddd3c2', madera:'#7a4a22', madera2:'#5a3416', corte:'#d9a86a', hoja:'#2f9a4a', hoja2:'#1f7a38', comal:'#2a2522',
  azul:'#4da3ff', naranja:'#ff9a3c', hifaF:'rgba(244,239,228,.16)' };

// ---------- piezas ----------
// Abanico de Schizophyllum visto por ARRIBA: sombrerito en abanico, blanco-grisáceo, peludo, sin pie (base pegada a la madera en (0,0)).
// seco 0..1: se encoge, se arruga y se pone más gris. abre = escala de aparición.
function Abanico({ T = 0, x, y, s = 1, rot = 0, seco = 0, abre = 1, seed = 1 }) {
  if (abre <= 0) return null;
  const R = 100 * (1 - 0.2 * seco), n = 7, g = krng(seed);
  const pts = [];
  for (let i = 0; i <= 60; i++) { const a = Math.PI * (-0.92 + 0.84 * i / 60); const lob = 1 - (0.06 + 0.12 * seco) * Math.abs(Math.sin(i / 60 * Math.PI * n)); pts.push([Math.cos(a) * R * lob, Math.sin(a) * R * lob * 0.82]); }
  const d = 'M 0 6 ' + pts.map((p) => 'L ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' Z';
  const col = mixHex(MS.blanco, MS.gris2, seco * 0.7);
  return <g transform={`translate(${x} ${y}) rotate(${rot + mece(T, seed, 0.2) * 1.5}) scale(${s * kEase.rebote(kclamp(abre, 0, 1))})`}>
    <path d={d} fill={col} stroke={KC.ink} strokeWidth={6 / Math.max(1, s * 0.6)} strokeLinejoin="round" />
    {/* zonas concéntricas y vello */}
    {[0.75, 0.5].map((k, i) => <path key={i} d={`M ${-R * k * 0.92} ${-R * k * 0.3} Q 0 ${-R * k * 1.05} ${R * k * 0.92} ${-R * k * 0.3}`} stroke={MS.gris2} strokeWidth={1.8} fill="none" opacity=".6" />)}
    {Array.from({ length: 34 }, (_, i) => { const a = Math.PI * (-0.9 + 0.8 * g()), r = R * (0.25 + 0.7 * g()); const cx = Math.cos(a) * r, cy = Math.sin(a) * r * 0.82;
      return <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * 4} y2={cy + Math.sin(a) * 4} stroke={MS.gris2} strokeWidth={1.4} strokeLinecap="round" />; })}
    {s < 2 && pts.filter((_, i) => i % 3 === 0).map((p, i) => <line key={'f' + i} x1={p[0]} y1={p[1]} x2={p[0] * 1.07} y2={p[1] * 1.07} stroke={KC.ink} strokeWidth={2} opacity=".55" />)}
  </g>;
}
// Vista de ABAJO: laminillas radiales que se ven partidas a lo largo. seco 0..1 cierra las mitades (se enrollan) y encoge el abanico.
function Laminillas({ T = 0, x, y, R = 380, seco = 0 }) {
  const n = 24, k = 1 - 0.3 * seco, gap = 7 * (1 - seco);
  const borde = []; for (let i = 0; i <= 60; i++) { const a = Math.PI * (-0.95 + 0.9 * i / 60), lob = 1 - (0.05 + 0.1 * seco) * Math.abs(Math.sin(i / 60 * Math.PI * 7)); borde.push([Math.cos(a) * R * k * lob, Math.sin(a) * R * k * lob]); }
  const d = 'M 0 10 ' + borde.map((p) => 'L ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' Z';
  return <g transform={`translate(${x} ${y})`}>
    <path d={d} fill={mixHex('#efe8dc', '#a39a8a', seco)} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {Array.from({ length: n }, (_, i) => { const a = Math.PI * (-0.92 + 0.84 * (i + 0.5) / n), r1 = R * k * 0.12, r2 = R * k * (0.9 - 0.04 * (i % 2));
      const nx = -Math.sin(a), ny = Math.cos(a), seg = (o) => `M ${(Math.cos(a) * r1 + nx * o).toFixed(1)} ${(Math.sin(a) * r1 + ny * o).toFixed(1)} L ${(Math.cos(a) * r2 + nx * o).toFixed(1)} ${(Math.sin(a) * r2 + ny * o).toFixed(1)}`;
      return <g key={i}>
        <path d={seg(-gap)} stroke={MS.gris2} strokeWidth={5 + 7 * seco} strokeLinecap="round" />
        <path d={seg(gap)} stroke={MS.gris2} strokeWidth={5 + 7 * seco} strokeLinecap="round" />
        {/* el filo partido: una muesca clara en medio */}
        <path d={`M ${Math.cos(a) * r2 * 0.55} ${Math.sin(a) * r2 * 0.55} L ${Math.cos(a) * r2} ${Math.sin(a) * r2}`} stroke="#fffaf0" strokeWidth={Math.max(0.5, 3 * (1 - seco))} strokeLinecap="round" />
      </g>; })}
    <circle cx={0} cy={4} r={22} fill={MS.gris} stroke={KC.ink} strokeWidth={5} />
  </g>;
}
// Tronco muerto horizontal con la cara del corte a la izquierda.
function Tronco({ x, y, w = 900, h = 170 }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={w} height={h} rx={30} fill={MS.madera} stroke={KC.ink} strokeWidth={8} />
    {[30, 70, 110, 140].filter((yy) => yy < h - 10).map((yy, i) => <path key={i} d={`M 60 ${yy} Q ${w * 0.4} ${yy - 14} ${w - 20} ${yy + 6}`} stroke={MS.madera2} strokeWidth={6} fill="none" />)}
    <ellipse cx={0} cy={h / 2} rx={52} ry={h / 2} fill={MS.corte} stroke={KC.ink} strokeWidth={8} />
    {[0.7, 0.45, 0.2].map((k, i) => <ellipse key={i} cx={0} cy={h / 2} rx={52 * k} ry={h / 2 * k} fill="none" stroke="#a8743c" strokeWidth={4} />)}
  </g>;
}
// Abanicos sobre el tronco (posición, escala, giro): los mismos al inicio y al cierre.
const ABS = [[180, 0, 0.95, -8], [300, 6, 0.8, 6], [430, -2, 1.05, -4], [560, 4, 0.75, 10], [690, 0, 0.9, -6], [800, 6, 0.7, 4]];
const COSECHA = [1, 3];   // al cierre, estos ya se cosecharon (queda la marquita)
function Plato({ x, y, s = 1, p = 1, conMone = false }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${s * kEase.rebote(kclamp(p, 0, 1))})`}>
    <ellipse rx={150} ry={56} fill="#fffaf0" stroke={KC.ink} strokeWidth={7} />
    <ellipse rx={108} ry={36} fill="none" stroke="#d8cdb8" strokeWidth={4} />
    {conMone ? <g transform="translate(0 -14)"><Paquete abierto={1} s={0.42} /></g>
      : <g>{[[-40, -10, 0.38, -20], [10, -18, 0.42, 10], [50, -4, 0.34, 25]].map(([a, b, k, r], i) => <Abanico key={i} x={a} y={b} s={k} rot={r} seed={i + 20} />)}</g>}
  </g>;
}
// Tenedor sencillo.
function Tenedor({ x, y, rot = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    <rect x={-8} y={0} width={16} height={150} rx={8} fill="#d9dde3" stroke={KC.ink} strokeWidth={5} />
    {[-18, -6, 6, 18].map((dx) => <rect key={dx} x={dx - 3} y={-60} width={6} height={64} rx={3} fill="#d9dde3" stroke={KC.ink} strokeWidth={3} />)}
    <rect x={-24} y={-4} width={48} height={14} rx={6} fill="#d9dde3" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Símbolos ♀ ♂ dibujados (no depende de la fuente).
function SimbSexo({ x, y, tipo = 'f', s = 1, color = KC.pink }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth={16} fill="none" strokeLinecap="round">
    <circle r={46} stroke={KC.ink} strokeWidth={30} /><circle r={46} />
    {tipo === 'f' ? <><path d="M 0 46 L 0 120 M -32 88 L 32 88" stroke={KC.ink} strokeWidth={30} /><path d="M 0 46 L 0 120 M -32 88 L 32 88" /></>
      : <><path d="M 33 -33 L 84 -84 M 40 -84 L 84 -84 L 84 -40" stroke={KC.ink} strokeWidth={30} /><path d="M 33 -33 L 84 -84 M 40 -84 L 84 -84 L 84 -40" /></>}
  </g>;
}
// Hifa recta (tubo) de x1 a x2 en la altura y. p 0..1 = cuánto creció (desde x1). punta redonda.
function Tubo({ x1, x2, y, h = 70, p = 1, color = KC.mint, septos = [] }) {
  const xe = klerp(x1, x2, p), L = Math.min(x1, xe), R = Math.max(x1, xe);
  if (R - L < 2) return null;
  return <g>
    <rect x={L} y={y - h / 2} width={R - L} height={h} rx={h / 2} fill={MS.hifaF} stroke={color} strokeWidth={7} />
    {septos.filter((sx) => sx > L + 10 && sx < R - 10).map((sx) => <line key={sx} x1={sx} y1={y - h / 2 + 4} x2={sx} y2={y + h / 2 - 4} stroke={color} strokeWidth={5} opacity=".8" />)}
  </g>;
}
function Nucleo({ x, y, r = 16, color = MS.azul, p = 1 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1))})`}><circle r={r} fill={color} stroke={KC.ink} strokeWidth={4} /><circle cx={-r * 0.35} cy={-r * 0.35} r={r * 0.28} fill="#fff" opacity=".5" /></g>;
}
// Rueda de versiones: n gajos de colores. p 0..1 = cuántos se ven.
function Rueda({ x, y, r, n, p = 1, giro = 0 }) {
  const k = Math.ceil(n * p), gajos = [];
  for (let i = 0; i < k; i++) { const a0 = (i / n) * Math.PI * 2 + giro, a1 = ((i + 1) / n) * Math.PI * 2 + giro;
    gajos.push(<path key={i} d={`M 0 0 L ${(Math.cos(a0) * r).toFixed(1)} ${(Math.sin(a0) * r).toFixed(1)} A ${r} ${r} 0 0 1 ${(Math.cos(a1) * r).toFixed(1)} ${(Math.sin(a1) * r).toFixed(1)} Z`} fill={`hsl(${(i * 360 / n * 7) % 360} 85% 60%)`} />); }
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 6} fill={KC.dark} stroke={KC.texto} strokeWidth={6} />
    {gajos}
    <circle r={r * 0.32} fill={KC.dark} stroke={KC.texto} strokeWidth={5} />
  </g>;
}
// Etiqueta de hifa (A? · B?)
function Placa({ x, y, texto, color }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x={-120} y={-34} width={240} height={68} rx={18} fill={KC.dark} stroke={color} strokeWidth={5} />
    <text y={14} textAnchor="middle" style={{ font:`700 36px ${KF.mono}` }} fill={KC.texto}>{texto}</text>
  </g>;
}
// Hoja de plátano con la oreja de palo: abierto 1 = extendida con el guiso; 0 = paquete doblado (mone).
function Paquete({ abierto = 1, s = 1, pHongos = 1, pSofrito = 1, T = 0 }) {
  const a = kclamp(abierto, 0, 1);
  return <g transform={`scale(${s})`}>
    <path d={`M -300 0 Q -150 ${-70 * a - 20} 0 ${-60 * a - 30} Q 150 ${-70 * a - 20} 300 0 Q 150 ${50 * a + 20} 0 ${44 * a + 30} Q -150 ${50 * a + 20} -300 0 Z`} transform={`scale(${klerp(0.55, 1, a)} 1)`} fill={MS.hoja} stroke={KC.ink} strokeWidth={7} />
    <path d="M -280 0 L 280 0" transform={`scale(${klerp(0.55, 1, a)} 1)`} stroke={MS.hoja2} strokeWidth={6} />
    {a > 0.3 && <g opacity={kprog(a, 0.3, 0.7)}>
      {[[-150, -10, -15], [-70, 10, 12], [10, -16, -5], [90, 8, 18], [160, -8, -12], [-20, 22, 6]].map(([px, py, r], i) => <Abanico key={i} x={px} y={py + 20} s={0.55} rot={r} seed={i + 40} abre={kclamp(pHongos * 6 - i, 0, 1)} />)}
      {pSofrito > 0 && [[-120, 18, KC.red], [-30, -22, KC.leaf], [60, 26, KC.red], [130, -20, KC.leaf], [-180, -18, KC.leaf], [200, 16, KC.red]].map(([px, py, c], i) => <circle key={i} cx={px} cy={py} r={13 * kEase.rebote(kclamp(pSofrito * 6 - i, 0, 1))} fill={c} stroke={KC.ink} strokeWidth={3} />)}
    </g>}
    {a < 0.98 && <g opacity={1 - a}>
      <rect x={-170} y={-52} width={340} height={104} rx={26} fill={MS.hoja} stroke={KC.ink} strokeWidth={7} />
      <path d="M -170 0 Q 0 -30 170 0" stroke={MS.hoja2} strokeWidth={6} fill="none" />
      {[-90, 90].map((dx) => <path key={dx} d={`M ${dx} -54 L ${dx} 54`} stroke="#e9d6a8" strokeWidth={9} />)}
    </g>}
  </g>;
}
// Subtítulo con *dorado* y _cursiva_ (para los nombres científicos).
function SubIt({ T, at, until, texto, idx, color = KC.gold2, tam = 62 }) {
  const o = idx != null && window.SUBS && window.SUBS[idx]; if (o) { at = o.at; until = o.until; }
  if (T < at || T > until) return null;
  const out = kprog(T, until - 0.2, until, kEase.suave);
  let on = false, it = false;
  const palabras = texto.split(' ').map((w, i) => {
    let p = w; if (p.startsWith('*')) { on = true; p = p.slice(1); } if (p.startsWith('_')) { it = true; p = p.slice(1); }
    const acc = on, ita = it; if (p.includes('*')) { p = p.replace('*', ''); on = false; } if (p.includes('_')) { p = p.replace('_', ''); it = false; }
    const t0 = at + i * 0.05, e = kprog(T, t0, t0 + 0.3, kEase.sale);
    return <span key={i} style={{ display:'inline-block', opacity:e, transform:`translateY(${(1 - e) * 24}px)`, padding: acc ? '0 .18em' : 0, margin: acc ? '0 .05em' : 0, fontStyle: ita ? 'italic' : 'normal',
      background: acc ? color : 'transparent', color: acc ? KC.dark : KC.texto, textShadow: acc ? 'none' : KSOMBRA, borderRadius:8 }}>{p}</span>;
  });
  const entra = kprog(T, at, at + 0.25, kEase.sale);
  return <div style={{ position:'absolute', left:0, right:0, bottom:560, zIndex:47, display:'flex', justifyContent:'center', opacity:1 - out }}>
    <div style={{ maxWidth:960, display:'flex', flexWrap:'wrap', justifyContent:'center', columnGap:'0.26em', rowGap:6, padding:'14px 26px 18px',
      background:`rgba(10,11,14,${0.62 * entra})`, borderRadius:28, font:`900 ${tam}px/1.12 ${KF.texto}`, textAlign:'center' }}>{palabras}</div>
  </div>;
}
// Gotas de lluvia (en un <svg>): de t0 a t1.
function Lluvia({ T, t0, t1, x0 = 80, x1 = 1000, y0 = 380, y1 = 1150, n = 26, seed = 5 }) {
  if (T < t0 || T > t1 + 0.6) return null;
  const g = krng(seed);
  return <g>{Array.from({ length: n }, (_, i) => { const px = klerp(x0, x1, g()), fase = g(), u = ((T - t0) * 1.6 + fase) % 1; if (T - t0 < fase * 0.6) return null;
    const yy = klerp(y0, y1, u); return <path key={i} d="M 0 -20 Q 8 0 0 8 Q -8 0 0 -20 Z" transform={`translate(${px} ${yy})`} fill="#7fd0ff" stroke={KC.ink} strokeWidth={2.5} opacity={1 - kprog(T, t1, t1 + 0.6)} />; })}</g>;
}
function Sol({ x, y, p = 1, T = 0 }) {
  if (p <= 0) return null;
  return <g transform={`translate(${x} ${y}) scale(${kEase.rebote(kclamp(p, 0, 1))}) rotate(${T * 20})`}>
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-7} y={-112} width={14} height={36} rx={7} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} transform={`rotate(${i * 36})`} />)}
    <circle r={62} fill={KC.yellow} stroke={KC.ink} strokeWidth={7} />
  </g>;
}

// Tarjeta del estudio compacta (el año con guion cabe en una línea).
function TarjetaCorta({ T, at, until, anio, quien, revista, x = KW / 2, y = 600 }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'pop');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:43, transform:`translate(-50%,-50%) scale(${e.s}) rotate(-2deg)`, opacity:e.o,
    background:KC.paper, border:`7px solid ${KC.ink}`, borderRadius:26, padding:'16px 36px 20px', textAlign:'center', boxShadow:`14px 14px 0 ${KC.ink}`, whiteSpace:'nowrap' }}>
    <div style={{ font:`400 120px/1 ${KF.titulo}`, color:KC.gold, WebkitTextStroke:`5px ${KC.ink}` }}>{anio}</div>
    <div style={{ font:`900 34px ${KF.texto}`, color:KC.ink, marginTop:6 }}>{quien}</div>
    <div style={{ font:`700 24px ${KF.mono}`, color:'#5a524a', marginTop:8, fontStyle:'italic' }}>{revista}</div>
  </div>;
}
// ---------- mapa: sureste de México (MapaMexico del kit, ampliado) ----------
const MAPA = { ancho: 5000, x: -2197, y: -1028 };
const mp = (lon, lat) => { const [a, b] = mxProy(lon, lat), s = MAPA.ancho / 1000; return [MAPA.x + a * s, MAPA.y + b * s]; };
// 25 mercados (posiciones ilustrativas alrededor de los municipios visitados) · los 6 con venta de hongos: 4 Oaxaca, 2 Tabasco.
const MUNIS = [[-96.12, 18.09, 'o'], [-96.35, 17.8, 'o'], [-96.48, 18.12, 'o'], [-96.2, 17.95, 'o'], [-95.98, 18.15, 'o'],
  [-95.12, 18.42, 'v'], [-95.31, 18.47, 'v'], [-95.21, 18.44, 'v'], [-94.5, 18.0, 'v'],
  [-92.93, 17.99, 't'], [-92.6, 17.76, 't'], [-92.95, 17.55, 't'], [-93.39, 17.83, 't']];
const MERCADOS = (() => { const g = krng(11), out = []; for (let i = 0; i < 25; i++) { const m = MUNIS[i % MUNIS.length]; out.push([m[0] + (g() - 0.5) * 0.28, m[1] + (g() - 0.5) * 0.22, m[2]]); } return out; })();
const CON_HONGOS = (() => { const o = MERCADOS.map((m, i) => [m, i]).filter(([m]) => m[2] === 'o').slice(0, 4).map(([, i]) => i); const t = MERCADOS.map((m, i) => [m, i]).filter(([m]) => m[2] === 't'); return [...o, t[1][1], t[2][1]]; })();

function MilSexosShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, H: CUES.Hongo, L: CUES.Laminas, S: CUES.Sexo, V: CUES.Versiones, R: CUES.Regla, F: CUES.Fibula, P: CUES.Pregunta, X: CUES.Extrano, E: CUES.Estudio, O: CUES.Oreja, M: CUES.Mone, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const TRON = { x: 70, y: 860, w: 900, h: 160 };
  const abreGota = kprog(T, K.G + 0.35, K.G + 0.9, kEase.sale);   // la gota cae y el abanico seco se abre (antes del s 1)
  const caeGota = kprog(T, K.G, K.G + 0.4);
  // laminillas: se secan y se reabren con la lluvia
  const seco = kprog(T, K.L + 0.7, K.L + 1.8, kEase.suave) * (1 - kprog(T, K.L + 2.6, K.L + 3.6, kEase.suave));
  // regla: 3 pruebas
  const segR = (K.F - K.R) / 3;
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 1 · gancho: tronco con abanicos; ♀ ♂ tachados → 23,328 · y se come */}
      <Escena T={T} a={K.G} b={K.H} zoom={0.05} origen="50% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tronco {...TRON} />
          {ABS.map(([px, py, k, r], i) => <Abanico key={i} T={T} x={TRON.x + px} y={TRON.y + 20 + py} s={k} rot={r} seed={i + 1} seco={i === 2 ? 1 - abreGota : 0} />)}
          {caeGota < 1 && <path d="M 0 -26 Q 11 0 0 11 Q -11 0 0 -26 Z" transform={`translate(${TRON.x + 430} ${klerp(380, TRON.y - 40, caeGota * caeGota)})`} fill="#7fd0ff" stroke={KC.ink} strokeWidth={3} />}
          {T < K.G + 1.4 && <g opacity={1 - kprog(T, K.G + 1.1, K.G + 1.4)}>
            <SimbSexo x={170} y={500} tipo="f" s={kEase.rebote(kprog(T, K.G, K.G + 0.3))} color={KC.pink} />
            <SimbSexo x={400} y={520} tipo="m" s={kEase.rebote(kprog(T, K.G + 0.1, K.G + 0.4))} color={KC.blue} />
            <path d="M 70 640 L 520 400" stroke={KC.red} strokeWidth={22} strokeLinecap="round" strokeDasharray="520" strokeDashoffset={520 * (1 - kprog(T, K.G + 0.6, K.G + 0.9))} />
          </g>}
          <Plato x={850} y={1090} s={0.9} p={kprog(T, K.G + 3.6, K.G + 4.0)} />
          {T > K.G + 3.8 && <Tenedor x={960} y={1010} rot={30 - 10 * kprog(T, K.G + 3.8, K.G + 4.3, kEase.sale)} />}
        </>)}
      </Escena>
      {/* 2 · el hongo de cerca: abanico peludo, sin pie, pegado a la madera */}
      <Escena T={T} a={K.H} b={K.L} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          <rect x={-40} y={560} width={300} height={800} rx={30} fill={MS.madera} stroke={KC.ink} strokeWidth={8} />
          {[660, 760, 880, 1010, 1150, 1260].map((yy, i) => <path key={i} d={`M 20 ${yy} Q 120 ${yy + 20} 240 ${yy - 6}`} stroke={MS.madera2} strokeWidth={6} fill="none" />)}
          <Abanico T={T} x={250} y={880} s={3.3} rot={90} seed={3} abre={kprog(T, K.H, K.H + 0.8)} />
          <Abanico T={T} x={250} y={1230} s={1.0} rot={100} seed={8} abre={kprog(T, K.H + 0.4, K.H + 1.1)} />
        </>)}
      </Escena>
      {/* 3 · laminillas partidas: se secan con el sol, se reabren con la lluvia */}
      <Escena T={T} a={K.L} b={K.S} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <Laminillas T={T} x={470} y={1120} R={370} seco={seco} />
          <Sol x={560} y={610} T={T} p={kprog(T, K.L + 0.3, K.L + 0.7) * (1 - kprog(T, K.L + 2.2, K.L + 2.6))} />
          <Lluvia T={T} t0={K.L + 2.3} t1={K.L + 3.7} x0={80} x1={660} y0={420} y1={1100} />
        </>)}
      </Escena>
      {/* 4 · al microscopio: espora → hifa con un núcleo; zonas A y B del ADN */}
      <Escena T={T} a={K.S} b={K.V} zoom={0.05}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <ellipse cx={120} cy={1010} rx={42} ry={26} fill="#e9dfc9" stroke={KC.ink} strokeWidth={5} transform="rotate(-10 120 1010)" />
          <Tubo x1={150} x2={1040} y={1005} h={56} p={kprog(T, K.S + 0.1, K.S + 1.6, kEase.sale)} color={KC.mint} />
          <Nucleo x={klerp(150, 560, kprog(T, K.S + 0.3, K.S + 1.4))} y={1005} r={18} color={MS.azul} p={kprog(T, K.S + 0.3, K.S + 0.6)} />
          {/* núcleo ampliado con las dos zonas */}
          {(() => { const u = kprog(T, K.S + 1.4, K.S + 2.0, kEase.sale); if (u <= 0) return null; return <g>
            <line x1={560} y1={985} x2={540} y2={950} stroke={KC.texto} strokeWidth={4} strokeDasharray="10 8" opacity={u} />
            <g transform={`translate(540 740) scale(${u})`}>
              <circle r={210} fill="rgba(77,163,255,.18)" stroke={MS.azul} strokeWidth={8} />
              {/* cromosoma con la zona A */}
              <g transform="translate(-80 0) rotate(-12)"><rect x={-22} y={-140} width={44} height={280} rx={22} fill="#e8dcff" stroke={KC.ink} strokeWidth={5} />
                <rect x={-22} y={-60} width={44} height={46} fill={KC.gold} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.S + 2.2, K.S + 2.5)} /></g>
              <g transform="translate(90 10) rotate(14)"><rect x={-22} y={-120} width={44} height={240} rx={22} fill="#e8dcff" stroke={KC.ink} strokeWidth={5} />
                <rect x={-22} y={30} width={44} height={46} fill={KC.cyan} stroke={KC.ink} strokeWidth={4} opacity={kprog(T, K.S + 2.8, K.S + 3.1)} /></g>
            </g></g>; })()}
        </>)}
      </Escena>
      {/* 5 · versiones: rueda A (288) y rueda B (81) */}
      <Escena T={T} a={K.V} b={K.R} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Rueda x={290} y={930} r={200} n={288} p={kprog(T, K.V + 0.2, K.V + 1.8)} giro={T * 0.15} />
          <Rueda x={790} y={950} r={150} n={81} p={kprog(T, K.V + 1.4, K.V + 2.4)} giro={-T * 0.2} />
        </>)}
      </Escena>
      {/* 6 · la regla: distintas en A y en B */}
      <Escena T={T} a={K.R} b={K.F} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={14} />
        {fsvg(<>
          {TXT.pruebas.map(([izq, der, res], i) => { const a = K.R + i * segR, b = a + segR; if (T < a - 0.05 || T > b + 0.05) return null;
            const ap = kprog(T, a + 0.05, a + segR * 0.55, kEase.sale), ok = i === 2, fus = ok ? kprog(T, a + segR * 0.55, a + segR * 0.75) : 0;
            const gap = klerp(330, ok ? 0 : 60, ap);
            return <g key={i} opacity={kprog(T, a - 0.05, a + 0.1) * (1 - kprog(T, b - 0.12, b + 0.02))}>
              <Tubo x1={-60} x2={540 - gap / 2} y={780} h={80} color={MS.azul} />
              <Tubo x1={1140} x2={540 + gap / 2} y={780} h={80} color={MS.naranja} />
              <Nucleo x={540 - gap / 2 - 80} y={780} color={MS.azul} />
              <Nucleo x={540 + gap / 2 + 80} y={780} color={MS.naranja} />
              <Placa x={250 - ap * 40} y={660} texto={izq} color={MS.azul} />
              <Placa x={830 + ap * 40} y={660} texto={der} color={MS.naranja} />
              {fus > 0 && <circle cx={540} cy={780} r={60 + 80 * fus} fill="none" stroke={KC.gold2} strokeWidth={8} opacity={1 - fus} />}
              {(() => { const k = kprog(T, a + segR * 0.58, a + segR * 0.58 + 0.3, kEase.rebote); if (k <= 0) return null; const c = ok ? KC.mint : KC.red;
                return <g transform={`translate(540 950) scale(${k})`}><circle r={74} fill={KC.dark} stroke={c} strokeWidth={12} />
                  <path d={ok ? 'M -34 2 L -8 28 L 38 -26' : 'M -28 -28 L 28 28 M 28 -28 L -28 28'} stroke={c} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g>; })()}
              {T > a + segR * 0.62 && <text x={540} y={1100} textAnchor="middle" style={{ font:`900 46px ${KF.texto}` }} fill={ok ? KC.mint : KC.red}>{res}</text>}
            </g>; })}
        </>)}
      </Escena>
      {/* 7 · la fíbula: dos núcleos por célula y el ganchito que los reparte */}
      <Escena T={T} a={K.F} b={K.P} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <Ambiente T={T} n={14} />
        {fsvg((() => {
          // Esquema (Kleijburg y Wösten 2025): en la punta, el par se divide; un núcleo hijo entra al ganchito (fíbula),
          // se cierran los tabiques y ese núcleo pasa HACIA ATRÁS a la célula de detrás de la punta.
          // Resultado: la punta y la célula de atrás quedan cada una con un núcleo azul y uno naranja.
          const y = 930, SEP = 820;
          const div = kprog(T, K.F + 0.8, K.F + 1.6, kEase.suave);            // se dividen los dos núcleos de la punta
          const gancho = kprog(T, K.F + 0.6, K.F + 1.7, kEase.sale);          // crece el ganchito hacia atrás
          const tabique = kprog(T, K.F + 1.7, K.F + 2.0);                     // aparece el tabique nuevo
          const viaje = kprog(T, K.F + 2.0, K.F + 3.1, kEase.suave);          // el núcleo del gancho pasa a la célula de atrás
          const arco = 'M 900 880 C 900 790 760 790 760 880';
          const bz = (u) => { const P = [[900, 880], [900, 790], [760, 790], [760, 880]], m = 1 - u; return [0, 1].map((k) => m * m * m * P[0][k] + 3 * m * m * u * P[1][k] + 3 * m * u * u * P[2][k] + u * u * u * P[3][k]); };
          const [nx, ny] = viaje > 0 ? bz(viaje) : [klerp(960, 900, div), klerp(y, 880, div)];
          return <>
            <Tubo x1={30} x2={1050} y={y} h={110} color={KC.mint} septos={[300, 560]} />
            <line x1={SEP} y1={y - 51} x2={SEP} y2={y + 51} stroke={KC.mint} strokeWidth={5} opacity={0.8 * tabique} />
            {[165, 430].map((cx, i) => <g key={i}><Nucleo x={cx - 40} y={y} color={MS.azul} /><Nucleo x={cx + 40} y={y} color={MS.naranja} /></g>)}
            <path d={arco} stroke={KC.gold2} strokeWidth={34} fill="none" strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 * (1 - gancho)} />
            <path d={arco} stroke={MS.hifaF} strokeWidth={18} fill="none" strokeLinecap="round" strokeDasharray="300" strokeDashoffset={300 * (1 - gancho)} />
            {/* azules: uno se queda en la punta, su copia se va a la célula de atrás */}
            <Nucleo x={900} y={y} color={MS.azul} />
            {div > 0 && <Nucleo x={klerp(900, 680, div)} y={y} color={MS.azul} p={kprog(T, K.F + 0.8, K.F + 1.0)} />}
            {/* naranjas: uno se queda en la punta; su copia entra al gancho y sale atrás */}
            <Nucleo x={980} y={y} color={MS.naranja} />
            {div > 0 && <Nucleo x={viaje >= 1 ? 760 : nx} y={viaje >= 1 ? y : ny} r={viaje >= 1 ? 16 : 13} color={MS.naranja} p={kprog(T, K.F + 0.8, K.F + 1.0)} />}
          </>; })())}
      </Escena>
      {/* 8 · re-gancho */}
      <Escena T={T} a={K.P} b={K.X} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Interrogacion T={T} x={290} y={1170} tam={480} />)}
      </Escena>
      {/* 9 · con un extraño vs con un hermano */}
      <Escena T={T} a={K.X} b={K.E} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          {/* hifa desconocida (otro color) y hermana (mismo color) junto a cada medidor */}
          <rect x={50} y={700} width={980} height={350} rx={30} fill="rgba(14,15,18,.82)" stroke={KC.ink} strokeWidth={6} opacity={kprog(T, K.X + 0.1, K.X + 0.4)} />
        </>)}
      </Escena>
      {/* 10–11 · el estudio: 25 mercados de Oaxaca, Tabasco y Veracruz; la oreja de palo en los 6 con hongos */}
      <Escena T={T} a={K.E} b={K.M} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <MapaMexico x={MAPA.x} y={MAPA.y} ancho={MAPA.ancho} />
          {TXT.estados.map(([n, lo, la], i) => { const [px, py] = mp(lo, la); return <text key={i} x={px} y={py} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}`, letterSpacing:'.08em' }} fill={KC.ink} opacity={0.75 * kprog(T, K.E + 0.4 + i * 0.3, K.E + 0.8 + i * 0.3)}>{n}</text>; })}
          {MERCADOS.map(([lo, la], i) => { const [px, py] = mp(lo, la), on = 1.35 * kprog(T, K.E + 3.4 + i * 0.07, K.E + 3.7 + i * 0.07, kEase.rebote); if (on <= 0) return null;
            const lit = CON_HONGOS.indexOf(i), lu = lit >= 0 ? kprog(T, K.O + 0.6 + lit * 0.25, K.O + 0.9 + lit * 0.25) : 0;
            return <g key={i} transform={`translate(${px} ${py}) scale(${on})`}>
              <path d="M 0 0 C -18 -26 -22 -36 -22 -46 A 22 22 0 1 1 22 -46 C 22 -36 18 -26 0 0 Z" fill={lu > 0 ? mixHex('#d5d0c6', KC.gold, lu) : '#d5d0c6'} stroke={KC.ink} strokeWidth={4} />
              <circle cy={-46} r={8} fill={KC.ink} opacity={0.6 - 0.6 * lu} />
              {lu > 0 && <Abanico x={0} y={-52} s={0.42 * lu} rot={0} seed={i + 60} />}
            </g>; })}
        </>)}
      </Escena>
      {/* 12 · el mone: oreja de palo en hoja de plátano, al comal */}
      <Escena T={T} a={K.M} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.orange} />
        {fsvg((() => {
          const dobla = kprog(T, K.M + 3.0, K.M + 3.8, kEase.suave);
          return <>
            <ellipse cx={540} cy={1060} rx={420} ry={110} fill={MS.comal} stroke={KC.ink} strokeWidth={8} />
            <ellipse cx={540} cy={1050} rx={380} ry={88} fill="#3a332e" />
            <g transform="translate(540 1030)"><Paquete T={T} abierto={kprog(T, K.M + 0.1, K.M + 0.7, kEase.sale) * (1 - dobla)} s={1.05} pHongos={kprog(T, K.M + 0.8, K.M + 1.8)} pSofrito={kprog(T, K.M + 1.9, K.M + 2.8)} /></g>
            {T > K.M + 3.4 && [0, 1, 2].map((i) => { const u = ((T - K.M - 3.4) * 0.6 + i / 3) % 1; return <path key={i} d={`M ${470 + i * 70} ${950 - u * 260} q 22 -30 0 -60 q -22 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.6 * Math.sin(u * Math.PI)} />; })}
            {/* calendario: más de una vez por semana */}
            <g transform="translate(70 560)" opacity={kprog(T, K.M + 0.6, K.M + 1.0)}>
              <rect x={0} y={0} width={560} height={150} rx={20} fill={KC.paper} stroke={KC.ink} strokeWidth={6} />
              <rect x={0} y={0} width={560} height={40} rx={20} fill={KC.red} stroke={KC.ink} strokeWidth={6} />
              {TXT.dias.map((d, i) => <g key={i}><text x={40 + i * 80} y={95} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill={KC.ink}>{d}</text>
                {(i === 1 || i === 4) && <path d={`M ${22 + i * 80} 110 L ${36 + i * 80} 126 L ${62 + i * 80} 100`} stroke={KC.hoja || MS.hoja} strokeWidth={8} fill="none" strokeLinecap="round" opacity={kprog(T, K.M + (i === 1 ? 1.2 : 1.7), K.M + (i === 1 ? 1.4 : 1.9))} />}</g>)}
            </g>
          </>; })())}
      </Escena>
      {/* 13 · cierre: el mismo tronco del inicio, ya con abanicos cosechados, y el mone servido */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04} origen="50% 50%">
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <Tronco {...TRON} />
          {ABS.map(([px, py, k, r], i) => COSECHA.includes(i)
            ? <ellipse key={i} cx={TRON.x + px} cy={TRON.y + 24 + py} rx={18} ry={9} fill={MS.corte} stroke={KC.ink} strokeWidth={3} />
            : <Abanico key={i} T={T} x={TRON.x + px} y={TRON.y + 20 + py} s={k} rot={r} seed={i + 1} />)}
          <Plato x={850} y={1090} s={0.9} p={kprog(T, K.C + 0.4, K.C + 0.8)} conMone />
        </>)}
      </Escena>

      {/* ---------- textos ---------- */}
      <NumeroGigante T={T} at={K.G + 1.2} until={K.H - 0.3} valor={TXT.numero} dur={1.6} x={300} y={480} tam={150} color={KC.pink} />
      <Etq T={T} at={K.G + 1.6} until={K.H - 0.3} x={40} y={600} texto={TXT.numEtq[0]} tam={24} color={KC.ink} />
      <Etq T={T} at={K.G + 1.9} until={K.H - 0.3} x={40} y={640} texto={TXT.numEtq[1]} tam={24} color={KC.ink} />
      <Chip T={T} at={K.G + 3.5} until={K.H - 0.3} texto={TXT.comen} x={290} y={725} tam={38} borde={KC.ink} />
      <Etq T={T} at={K.H + 0.9} until={K.L - 0.3} x={60} y={430} texto={TXT.comun} tam={46} color={KC.ink} />
      <Etq T={T} at={K.H + 1.3} until={K.L - 0.3} x={60} y={495} texto={TXT.cient} it tam={42} color={KC.ink} />
      <Chip T={T} at={K.H + 2.2} until={K.L - 0.3} texto={TXT.tam} x={790} y={860} tam={34} borde={KC.ink} />
      <Etq T={T} at={K.H + 2.8} until={K.L - 0.3} x={560} y={960} texto={TXT.pegado} tam={24} color={KC.ink} />
      <Etq T={T} at={K.L + 0.2} until={K.S - 0.3} x={60} y={430} texto={TXT.laminas} tam={40} color={KC.ink} />
      <Chip T={T} at={K.L + 1.0} until={K.L + 2.4} texto={TXT.seco} x={300} y={690} tam={34} borde={KC.yellow} />
      <Chip T={T} at={K.L + 2.6} until={K.S - 0.3} texto={TXT.lluvia} x={330} y={690} tam={34} borde={KC.cyan} />
      <Chip T={T} at={K.S + 0.1} until={K.V - 0.3} texto={TXT.porDentro} x={540} y={410} tam={30} borde={KC.cyan} mono />
      <Etq T={T} at={K.S + 0.3} until={K.S + 1.6} x={80} y={1075} texto={TXT.espora} tam={28} />
      <Etq T={T} at={K.S + 0.9} until={K.S + 1.6} x={600} y={1075} texto={TXT.hifa} tam={28} color={KC.mint} />
      <Chip T={T} at={K.S + 1.6} until={K.V - 0.3} texto={TXT.sexoChip} x={540} y={490} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.S + 2.3} until={K.V - 0.3} x={380} y={700} lado="izq" texto={TXT.zonaA} tam={32} color={KC.gold2} />
      <Etq T={T} at={K.S + 2.9} until={K.V - 0.3} x={700} y={820} texto={TXT.zonaB} tam={32} color={KC.cyan} />
      <Etq T={T} at={K.V + 0.5} until={K.R - 0.3} x={110} y={1170} texto={TXT.ruedaA} tam={30} color={KC.gold2} />
      <Etq T={T} at={K.V + 1.6} until={K.R - 0.3} x={660} y={1150} texto={TXT.ruedaB} tam={30} color={KC.cyan} />
      <Chip T={T} at={K.V + 2.5} until={K.R - 0.3} texto={TXT.cuenta} x={350} y={520} tam={52} borde={KC.pink} />
      <Etq T={T} at={K.V + 3.0} until={K.R - 0.3} x={60} y={620} texto={TXT.raper} tam={26} color={KC.texto} />
      <Chip T={T} at={K.R + 0.1} until={K.F - 0.3} texto={TXT.reglaChip} x={540} y={470} tam={36} borde={KC.gold} />
      <Chip T={T} at={K.F + 0.2} until={K.P - 0.3} texto={TXT.dosNucleos} x={430} y={1080} tam={28} borde={KC.mint} />
      <Etq T={T} at={K.F + 1.4} until={K.P - 0.3} x={700} y={780} lado="izq" texto={TXT.fibula} tam={40} color={KC.gold2} />
      <NumeroGigante T={T} at={K.P + 0.05} until={K.X - 0.2} valor={TXT.numero} dur={0.01} desde={TXT.numero} x={290} y={500} tam={130} color={KC.yellow} />
      <Medidor T={T} at={K.X + 0.3} until={K.E - 0.3} valor={(t) => 0.98 * kprog(t, K.X + 0.5, K.X + 1.6, kEase.sale)} etiqueta={TXT.extrano} texto={() => TXT.extranoV} x={90} y={740} />
      <Medidor T={T} at={K.X + 2.2} until={K.E - 0.3} valor={(t) => 0.275 * kprog(t, K.X + 2.4, K.X + 3.2, kEase.sale)} etiqueta={TXT.hermano} texto={() => TXT.hermanoV} x={90} y={900} color={KC.yellow} />
      <Chip T={T} at={K.X + 3.4} until={K.E - 0.3} texto={TXT.extranoChip} x={540} y={1120} tam={34} borde={KC.ink} />
      <TarjetaCorta T={T} at={K.E + 0.3} until={K.E + 3.4} anio={TXT.anio} quien={TXT.quien} revista={TXT.revista} x={540} y={470} />
      <Chip T={T} at={K.E + 3.6} until={K.O - 0.2} texto={TXT.entrevistas} x={540} y={470} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.O + 0.2} until={K.M - 0.3} x={60} y={420} texto={TXT.orejaPalo} tam={44} color={KC.ink} />
      <Etq T={T} at={K.O + 0.7} until={K.M - 0.3} x={60} y={480} texto={TXT.orejaMulato} tam={28} color={KC.ink} />
      <Chip T={T} at={K.O + 1.9} until={K.M - 0.3} texto={TXT.seisChip} x={340} y={580} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.M + 1.0} until={K.C - 0.3} x={70} y={790} texto={TXT.semana} tam={30} color={KC.ink} />
      <Etq T={T} at={K.M + 1.5} until={K.C - 0.3} x={70} y={835} texto={TXT.temporada} tam={26} color={KC.ink} />
      <Chip T={T} at={K.M + 3.6} until={K.C - 0.3} texto={`${TXT.mone} · ${TXT.moneEtq}`} x={800} y={800} tam={34} borde={KC.leaf} />
      <Etq T={T} at={K.M + 0.4} until={K.C - 0.3} x={70} y={460} texto={TXT.moneLugar} tam={28} color={KC.ink} />
      <Chip T={T} at={K.C + 0.8} until={K.Ou} texto={TXT.cierreChip} x={330} y={500} tam={40} borde={KC.pink} />
      <NumeroGigante T={T} at={K.C + 1.6} until={K.Ou} valor={TXT.numero} desde={TXT.numero} dur={0.01} x={330} y={660} tam={100} color={KC.pink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.H} texto="10 cm" largo={170} />
      <BarraEscala T={T} at={K.H} until={K.L} texto="1 cm" largo={150} />
      <BarraEscala T={T} at={K.L} until={K.S} texto="1 cm" largo={190} />
      <BarraEscala T={T} at={K.S} until={K.V} texto="10 µm (núcleo: esquemático)" largo={110} />
      <BarraEscala T={T} at={K.V} until={K.R} texto="esquemático" largo={0} />
      <BarraEscala T={T} at={K.R} until={K.P} texto="10 µm" largo={130} />
      <BarraEscala T={T} at={K.E} until={K.M} texto="mapa esquemático · 100 km" largo={110} />
      <BarraEscala T={T} at={K.M} until={K.C} texto="10 cm" largo={160} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="10 cm" largo={170} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <SubIt T={T} idx={0} at={K.G + 0.1} until={K.H - 0.1} texto="No tiene dos sexos: *más de 23 mil.*" />
      <SubIt T={T} idx={1} at={K.H + 0.1} until={K.L - 0.1} texto="_Schizophyllum commune:_ *abanico peludo.*" />
      <SubIt T={T} idx={2} at={K.L + 0.1} until={K.S - 0.1} texto="Seco, se encoge… *y espera la lluvia.*" />
      <SubIt T={T} idx={3} at={K.S + 0.1} until={K.V - 0.1} texto="Sexo = *tipo de apareamiento:* A y B." />
      <SubIt T={T} idx={4} at={K.V + 0.1} until={K.R - 0.1} texto="A: *288 versiones.* B: *81.*" />
      <SubIt T={T} idx={5} at={K.R + 0.1} until={K.F - 0.1} texto="Pareja fértil: distintas *en A y en B.*" />
      <SubIt T={T} idx={6} at={K.F + 0.1} until={K.P - 0.1} texto="Dos núcleos por célula *y la fíbula.*" />
      <SubIt T={T} idx={7} at={K.P + 0.05} until={K.X - 0.1} texto="¿Para qué *tantos sexos?*" />
      <SubIt T={T} idx={8} at={K.X + 0.1} until={K.E - 0.1} texto="Con un extraño, *casi siempre hay pareja.*" />
      <SubIt T={T} idx={9} at={K.E + 0.1} until={K.O - 0.1} texto="*25 mercados* de Oaxaca, Tabasco y Veracruz." />
      <SubIt T={T} idx={10} at={K.O + 0.1} until={K.M - 0.1} texto="*Oreja de palo:* en los 6 con hongos." />
      <SubIt T={T} idx={11} at={K.M + 0.1} until={K.C - 0.1} texto="Más de una vez por semana. *En Tabasco,* en hoja de plátano." />
      <SubIt T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="No tiene dos sexos: *tiene miles.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.3, 'avatar_11_sorprendido', 'gancho'],
        [K.L + 0.3, K.S - 0.3, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.V + 0.3, K.R - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.F + 0.1, K.P - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.P + 0.0, K.X + 0.3, 'avatar_07_pensativo_puno', 'grande'],
        [K.X + 1.0, K.E - 0.2, 'avatar_11_sorprendido', 'arriba-der'],
        [K.O + 0.1, K.M - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.M + 0.3, K.C - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.C + 0.1, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="biologia" num="80" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

window.MilSexosApp = kApp(MilSexosShot);
