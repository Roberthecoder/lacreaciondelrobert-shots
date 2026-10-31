// Shot Biotecnológico #38 · Tu genoma en una pantalla (y lo que cuesta leerlo) — NARRADO (N4 la imagen que se llena + N2 el número).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático: las letras son de ejemplo, no una secuencia real.
const BASE = { A: '#2fe0a8', T: '#ff2d78', C: '#00d2ff', G: '#ffe11a' };
const LETRAS = ['A', 'T', 'C', 'G'];

function SvgCapa({ children, z }) {
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:z }}>{children}</svg>;
}
// Letras de ejemplo (siempre las mismas para que la pantalla del cierre sea la del inicio)
const kLetra = (() => { const R = krng(38); const s = Array.from({ length: 600 }, () => LETRAS[Math.floor(R() * 4)]); return (i) => s[i % s.length]; })();

// Celular con la pantalla llena de letras. llenado 0..1; huecos: Set de índices grises; relleno 0..1 llena los huecos en dorado; signo = "$ ?"
function Pantalla({ T, x, y, w = 470, h = 790, cols = 10, filas = 15, llenado = 1, huecos, relleno = 0, signo = 0, precio }) {
  const pad = 26, sw = w - pad * 2, sh = h - pad * 2 - 40, cw = sw / cols, ch = sh / filas, N = cols * filas, k = Math.floor(llenado * N);
  const celdas = [];
  for (let i = 0; i < N; i++) {
    const c = i % cols, r = Math.floor(i / cols), L = kLetra(i), cx = x + pad + c * cw + cw / 2, cy = y + pad + 40 + r * ch + ch / 2;
    if (i >= k) { celdas.push(<rect key={i} x={cx - cw * 0.38} y={cy - ch * 0.38} width={cw * 0.76} height={ch * 0.76} rx={6} fill="rgba(255,255,255,.07)" />); continue; }
    const hueco = huecos && huecos.has(i), lleno = hueco ? kprog(relleno, huecos.orden.get(i) / huecos.size, huecos.orden.get(i) / huecos.size + 0.08) : 1;
    if (hueco && lleno < 1) { celdas.push(<rect key={i} x={cx - cw * 0.4} y={cy - ch * 0.4} width={cw * 0.8} height={ch * 0.8} rx={6} fill="#5b6070" stroke="#8a8f99" strokeWidth={2} />); continue; }
    const recien = i > k - 12 ? (k - i) / 12 : 1;
    celdas.push(<text key={i} x={cx} y={cy + 14 - (1 - recien) * 30} textAnchor="middle" opacity={0.3 + 0.7 * recien}
      style={{ font:`700 40px ${KF.mono}` }} fill={hueco ? KC.gold2 : BASE[L]}>{L}</text>);
  }
  return <g>
    <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={70} fill={KC.ink} />
    <rect x={x} y={y} width={w} height={h} rx={64} fill="#2a2d36" stroke={KC.ink} strokeWidth={8} />
    <rect x={x + pad - 8} y={y + pad + 22} width={sw + 16} height={sh + 30} rx={30} fill={KC.dark} />
    <rect x={x + w / 2 - 60} y={y + 20} width={120} height={22} rx={11} fill={KC.ink} />
    {celdas}
    {signo > 0 && <g opacity={signo}>
      <rect x={x + pad} y={y + h / 2 - 150} width={sw} height={260} rx={30} fill="rgba(14,15,18,.85)" stroke={KC.gold2} strokeWidth={6} />
      <text x={x + w / 2} y={y + h / 2 + 50} textAnchor="middle" style={{ font:`400 200px ${KF.titulo}` }} fill={KC.gold2} opacity={0.6 + 0.4 * Math.abs(Math.sin(T * 5))}>$ ?</text>
    </g>}
    {precio && <g>
      <rect x={x + pad} y={y + h / 2 - 120} width={sw} height={210} rx={30} fill="rgba(14,15,18,.88)" stroke={KC.mint} strokeWidth={6} opacity={precio.o} />
      <text x={x + w / 2} y={y + h / 2 + 30} textAnchor="middle" style={{ font:`400 130px ${KF.titulo}` }} fill={KC.mint} opacity={precio.o}>≈ $525</text>
    </g>}
  </g>;
}

// Persona esquemática (para "tú")
function Persona({ x, y, s = 1, color = KC.blue }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-150} r={52} fill="#f1b48f" stroke={KC.ink} strokeWidth={8} />
    <path d="M -80 120 Q -90 -60 0 -80 Q 90 -60 80 120 Z" fill={color} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Reloj que corre muy rápido
function Reloj({ T, x, y, r = 200 }) {
  const a1 = T * 720, a2 = T * 60;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r + 14} fill={KC.ink} /><circle r={r} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return <line key={i} x1={Math.sin(a) * r * 0.82} y1={-Math.cos(a) * r * 0.82} x2={Math.sin(a) * r * 0.95} y2={-Math.cos(a) * r * 0.95} stroke={KC.ink} strokeWidth={8} strokeLinecap="round" />; })}
    <line x1={0} y1={0} x2={0} y2={-r * 0.55} stroke={KC.ink} strokeWidth={14} strokeLinecap="round" transform={`rotate(${a2})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.8} stroke={KC.red} strokeWidth={8} strokeLinecap="round" transform={`rotate(${a1})`} />
    <circle r={16} fill={KC.ink} />
  </g>;
}
// Secuenciador viejo de tubitos (capilares), esquemático
function Secuenciador({ T, x, y, s = 1, seed = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-130} y={-200} width={260} height={360} rx={18} fill="#d9dde6" stroke={KC.ink} strokeWidth={8} />
    <rect x={-100} y={-170} width={200} height={120} rx={10} fill={KC.dark} stroke={KC.ink} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-90 + i * 24} y={-160 + ((T * 40 + i * 13 + seed * 7) % 90)} width={14} height={10} fill={BASE[LETRAS[(i + seed) % 4]]} />)}
    {Array.from({ length: 6 }, (_, i) => <line key={i} x1={-90 + i * 36} y1={-20} x2={-90 + i * 36} y2={120} stroke="#8a8f99" strokeWidth={6} />)}
    <circle cx={90} cy={130} r={12} fill={Math.sin(T * 6 + seed) > 0 ? KC.mint : '#5b6070'} stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Gráfica del costo por genoma (datos NHGRI, tabla mayo 2022, escala logarítmica)
const COSTO = [[2001.75, 95263072], [2002.75, 61448422], [2003.83, 40157554], [2004.83, 18519312], [2005.83, 13801124], [2006.83, 10474556], [2007.83, 7147571],
  [2008.08, 3063820], [2008.33, 1352982], [2008.58, 752080], [2008.83, 342502], [2009.33, 154714], [2009.83, 70333], [2010.33, 31512], [2011.08, 20963],
  [2011.83, 7743], [2012.83, 6618], [2013.83, 5096], [2014.83, 5731], [2015.08, 3970], [2015.58, 1363], [2016.92, 1356], [2017.92, 1844], [2018.92, 1392],
  [2019.92, 695], [2020.92, 512], [2021.92, 552], [2022.42, 525]];
function Grafica({ T, p = 0, x = 60, y = 380, w = 960, h = 760, marca2008 = 0 }) {
  const X0 = x + 150, X1 = x + w - 50, Y0 = y + 80, Y1 = y + h - 90;
  const gx = (a) => klerp(X0, X1, (a - 2001) / (2023 - 2001)), gy = (v) => klerp(Y1, Y0, (Math.log10(v) - 2) / 6);
  const n = Math.max(1, Math.round(p * COSTO.length));
  const pts = COSTO.slice(0, n).map(([a, v]) => [gx(a), gy(v)]);
  const ult = pts[pts.length - 1];
  return <g>
    <rect x={x + 14} y={y + 14} width={w} height={h} rx={30} fill={KC.ink} />
    <rect x={x} y={y} width={w} height={h} rx={30} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
    <text x={x + w / 2} y={y + 56} textAnchor="middle" style={{ font:`900 36px ${KF.texto}` }} fill={KC.ink}>Costo de leer un genoma humano</text>
    {[[100, '$100'], [1e4, '$10 mil'], [1e6, '$1 millón'], [1e8, '$100 millones']].map(([v, t]) => <g key={t}>
      <line x1={X0} x2={X1} y1={gy(v)} y2={gy(v)} stroke="rgba(22,18,15,.18)" strokeWidth={3} strokeDasharray="10 8" />
      <text x={X0 - 14} y={gy(v) + 10} textAnchor="end" style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">{t}</text></g>)}
    {[2001, 2008, 2015, 2022].map((a) => <text key={a} x={gx(a)} y={Y1 + 50} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#5a524a">{a}</text>)}
    <line x1={X0} x2={X1} y1={Y1} y2={Y1} stroke={KC.ink} strokeWidth={5} />
    <line x1={X0} x2={X0} y1={Y0 - 10} y2={Y1} stroke={KC.ink} strokeWidth={5} />
    {marca2008 > 0 && <g opacity={marca2008}>
      <rect x={gx(2008)} y={Y0} width={gx(2023) - gx(2008)} height={Y1 - Y0} fill="rgba(0,210,255,.14)" />
      <text x={gx(2008) + 14} y={Y0 + 34} style={{ font:`700 26px ${KF.mono}` }} fill={KC.blue}>nueva generación →</text></g>}
    {pts.length > 1 && <path d={'M ' + pts.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ')} stroke={KC.pink} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />}
    {pts.map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r={i === 0 || i === pts.length - 1 ? 14 : 7} fill={KC.pink} stroke={KC.ink} strokeWidth={4} />)}
    <circle cx={ult[0]} cy={ult[1]} r={22 + 8 * Math.abs(Math.sin(T * 5))} fill="none" stroke={KC.pink} strokeWidth={5} />
    <text x={x + w - 30} y={y + h - 22} textAnchor="end" style={{ font:`700 20px ${KF.mono}` }} fill="#8a8178">datos: NHGRI (EE. UU.) · escala logarítmica</text>
  </g>;
}
// Tubitos (capilares): cada pedacito de ADN en el suyo
function Capilares({ T, t0, x0 = 140, y0 = 430, n = 12, paso = 68, alto = 700 }) {
  return <g>{Array.from({ length: n }, (_, i) => {
    const x = x0 + i * paso, f = ((T - t0) * 0.35 + i * 0.13) % 1;
    return <g key={i}>
      <rect x={x - 14} y={y0} width={28} height={alto} rx={14} fill="rgba(180,230,255,.14)" stroke="#bfe8ff" strokeWidth={4} />
      {[0, 1, 2].map((k) => { const yy = y0 + 20 + ((f + k * 0.33) % 1) * (alto - 60); return <rect key={k} x={x - 7} y={yy} width={14} height={30} rx={5} fill={BASE[LETRAS[(i + k) % 4]]} />; })}
    </g>; })}
    <rect x={x0 - 40} y={y0 + alto - 120} width={(n - 1) * paso + 80} height={36} fill="rgba(255,225,26,.25)" stroke={KC.gold2} strokeWidth={3} />
  </g>;
}
// Celda de lectura (vidrio con carriles), vista de afuera
function CeldaLectura({ T, x, y, w = 420, h = 220 }) {
  return <g>
    <rect x={x + 10} y={y + 10} width={w} height={h} rx={20} fill={KC.ink} />
    <rect x={x} y={y} width={w} height={h} rx={20} fill="rgba(230,248,255,.9)" stroke={KC.ink} strokeWidth={7} />
    {Array.from({ length: 4 }, (_, i) => <rect key={i} x={x + 30} y={y + 30 + i * 44} width={w - 60} height={26} rx={13} fill={BASE[LETRAS[(i + Math.floor(T * 2)) % 4]]} opacity={0.75} stroke={KC.ink} strokeWidth={3} />)}
  </g>;
}
// Interior de la Lupa: miles de puntitos que destellan TODOS al mismo tiempo (un ciclo de lectura)
function PuntosParalelo(T, r) {
  const R = krng(12), ciclo = Math.floor(T * 2.2), fase = (T * 2.2) % 1, flash = 1 - fase;
  const pts = [];
  for (let gy = 0; gy < 16; gy++) for (let gx = 0; gx < 16; gx++) {
    const px = 20 + gx * (2 * r - 40) / 15 + (R() - 0.5) * 8, py = 20 + gy * (2 * r - 40) / 15 + (R() - 0.5) * 8, sem = Math.floor(R() * 97);
    pts.push(<circle key={gx + '-' + gy} cx={px} cy={py} r={9} fill={BASE[LETRAS[(sem + ciclo * 7) % 4]]} opacity={0.35 + 0.65 * flash} />);
  }
  return <svg width={2 * r} height={2 * r}><rect width={2 * r} height={2 * r} fill="#040a12" />{pts}</svg>;
}
// Cromosoma horizontal (dos cromátidas, centrómero, telómeros brillando)
function Cromosoma({ T, x, y, largo = 820, alto = 120, cen = 0.38, telo = 1, centro = 0 }) {
  const xc = x + largo * cen, g = 14 + 6 * Math.sin(T * 5);
  const brazo = (x1, x2, yy) => <rect x={x1} y={yy - alto / 4} width={x2 - x1} height={alto / 2} rx={alto / 4} fill="#b18cff" stroke={KC.ink} strokeWidth={7} />;
  return <g>
    {brazo(x, xc - 10, y - alto / 4)}{brazo(xc + 10, x + largo, y - alto / 4)}
    {brazo(x, xc - 10, y + alto / 4)}{brazo(xc + 10, x + largo, y + alto / 4)}
    {[0.12, 0.22, 0.55, 0.68, 0.82].map((u, i) => <rect key={i} x={x + largo * u} y={y - alto / 2 + 4} width={18} height={alto - 8} fill="rgba(43,15,99,.45)" />)}
    <ellipse cx={xc} cy={y} rx={26} ry={alto / 2 - 6} fill={centro > 0 ? mixHex('#b18cff', '#F4C25A', centro) : '#8f6bdc'} stroke={KC.ink} strokeWidth={6} />
    {telo > 0 && [x + 8, x + largo - 8].map((tx, i) => <g key={i} opacity={telo}>
      <circle cx={tx} cy={y - alto / 4} r={g} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />
      <circle cx={tx} cy={y + alto / 4} r={g} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} /></g>)}
  </g>;
}
// Tramo repetido: el mismo bloque una y otra vez, y una lectura larguísima que lo cruza
function Repetido({ T, t0, y = 900 }) {
  const bloque = ['A', 'A', 'T', 'G', 'G', 'C', 'T'];
  const desp = ((T - t0) * 60) % (bloque.length * 30);
  const lect = kprog(T, t0 + 1.0, t0 + 2.6, kEase.sale);
  return <g>
    <rect x={40} y={y - 70} width={1000} height={140} rx={20} fill="rgba(255,255,255,.06)" />
    {Array.from({ length: 42 }, (_, i) => { const L = bloque[i % bloque.length], xx = 40 + i * 30 - desp; return xx > 30 && xx < 1030 ?
      <rect key={i} x={xx} y={y - 50} width={24} height={100} rx={5} fill={BASE[L]} opacity={0.9} /> : null; })}
    {Array.from({ length: 6 }, (_, i) => <rect key={i} x={40 + i * 210 - desp} y={y - 60} width={210} height={120} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth={3} strokeDasharray="8 6" />)}
    <rect x={60} y={y + 90} width={920 * lect} height={34} rx={17} fill={KC.gold2} stroke={KC.ink} strokeWidth={4} />
  </g>;
}

// Huecos del 8 %: tramos seguidos (como los centrómeros y otras zonas repetidas), en la pantalla de 170 letras
const HUECOS = (() => { const s = new Set(); [[18, 3], [47, 3], [80, 2], [112, 2]].forEach(([a, n]) => { for (let i = 0; i < n; i++) s.add(a + i); });
  s.orden = new Map([...s].map((v, i) => [v, i])); return s; })(); // 10 de 130 ≈ 8 %

function Genoma() {
  const { T, CUES } = useComposition();
  const K = CUES;
  const FIN = K.Outro + 4;
  const llena0 = kprog(T, 0, K.Gancho + 4.0, kEase.suave);
  const pGraf = T < K.Hoy ? 1 / COSTO.length : kprog(T, K.Hoy + 0.3, K.Hoy + 2.8);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tu genoma en una pantalla */}
      <Escena T={T} a={K.Gancho} b={K.Letras} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Persona x={830} y={1000} s={0.85} color={KC.blue} />
          <Pantalla T={T} x={110} y={330} llenado={0.08 + 0.92 * llena0} />
          <path d={`M 720 ${930 + Math.sin(T * 4) * 8} L 600 ${880 + Math.sin(T * 4) * 8}`} stroke={KC.ink} strokeWidth={12} strokeLinecap="round" />
          <text x={960} y={960} textAnchor="middle" style={{ font:`900 54px ${KF.texto}` }} fill={KC.ink}>tú</text>
        </SvgCapa>
        <NumeroGigante T={T} at={K.Gancho + 0.3} until={K.Letras - 0.3} valor={3000000000} dur={2.6} etiqueta="letras en tu genoma" y={1600} tam={120} color={KC.yellow} />
      </Escena>
      {/* 1 · cuatro letras */}
      <Escena T={T} a={K.Letras} b={K.Leer} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          {LETRAS.map((L, i) => { const e = kprog(T, K.Letras + i * 0.25, K.Letras + i * 0.25 + 0.4, kEase.rebote); return <g key={L} transform={`translate(${190 + i * 233} ${640}) scale(${e}) rotate(${Math.sin(T * 3 + i) * 5})`}>
            <rect x={-95} y={-95} width={190} height={190} rx={30} fill={BASE[L]} stroke={KC.ink} strokeWidth={10} />
            <text x={0} y={48} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{L}</text></g>; })}
          <ADNHebra T={T} x={90} y={1010} largo={900} alto={150} vueltas={3} colores={[BASE.A, BASE.T, BASE.C, BASE.G]} grosor={10} />
        </SvgCapa>
        <Etq T={T} at={K.Letras + 0.8} until={K.Leer - 0.2} x={300} y={1150} texto="A con T · C con G" tam={40} color={KC.ink} />
      </Escena>
      {/* 2 · más de 90 años leyendo */}
      <Escena T={T} a={K.Leer} b={K.Proyecto} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Reloj T={T} x={330} y={740} r={210} />
          {Array.from({ length: 9 }, (_, i) => { const L = kLetra(i + Math.floor(T * 3)); return <text key={i} x={120 + i * 100} y={1100} textAnchor="middle" style={{ font:`700 64px ${KF.mono}` }} fill={i === 4 ? KC.ink : 'rgba(22,18,15,.45)'}>{L}</text>; })}
          <rect x={440} y={1030} width={100} height={90} rx={14} fill="none" stroke={KC.ink} strokeWidth={6} />
        </SvgCapa>
        <Contador T={T} at={K.Leer + 0.4} hasta={95} dur={2.6} sufijo=" años" x={540} y={1560} tam={130} color={KC.yellow} />
        <Chip T={T} at={K.Leer + 0.3} until={K.Proyecto - 0.2} texto="1 letra por segundo, sin parar" y={1700} tam={36} borde={KC.ink} />
      </Escena>
      {/* 3 · Proyecto Genoma Humano */}
      <Escena T={T} a={K.Proyecto} b={K.Costo} zoom={0.04}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          {[0, 1, 2].map((i) => <Secuenciador key={i} T={T} x={230 + i * 310} y={960} s={0.95} seed={i + 1} />)}
          <rect x={360} y={420} width={360} height={260} rx={24} fill={KC.paper} stroke={KC.ink} strokeWidth={8} />
          <rect x={360} y={420} width={360} height={70} rx={24} fill={KC.red} stroke={KC.ink} strokeWidth={8} />
          <text x={540} y={640} textAnchor="middle" style={{ font:`400 150px ${KF.titulo}` }} fill={KC.ink}>{Math.round(klerp(1990, 2003, kprog(T, K.Proyecto + 0.4, K.Proyecto + 3.2)))}</text>
        </SvgCapa>
        <Chip T={T} at={K.Proyecto + 0.5} until={K.Costo - 0.2} texto="Proyecto Genoma Humano · 13 años" y={1560} tam={40} borde={KC.blue} />
      </Escena>
      {/* 4 · 2,700 millones para todo el proyecto */}
      <Escena T={T} a={K.Costo} b={K.Precio2001} zoom={0.04}>
        <FondoLunares color={KC.leaf} />
        <SvgCapa>
          {Array.from({ length: 4 }, (_, c) => Array.from({ length: 14 }, (_, r) => { const t0 = K.Costo + 0.2 + (c * 14 + r) * 0.045; if (T < t0) return null;
            const cae = kprog(T, t0, t0 + 0.3, kEase.sale); return <g key={c + '-' + r} transform={`translate(${450 + c * 150} ${klerp(300, 1150 - r * 40, cae)})`}>
              <rect x={-70} y={-18} width={140} height={36} rx={5} fill="#9fe39a" stroke={KC.ink} strokeWidth={4} />
              <circle r={11} fill="none" stroke="#2f7a34" strokeWidth={4} /></g>; }))}
        </SvgCapa>
        <NumeroGigante T={T} at={K.Costo + 0.3} until={K.Precio2001 - 0.3} valor={2700} dur={1.6} prefijo="$" sufijo=" millones" etiqueta="EE. UU., todo el proyecto" y={1590} tam={110} />
        <Chip T={T} at={K.Costo + 1.8} until={K.Precio2001 - 0.3} texto="mapas · tecnología · otros organismos" y={1790} tam={30} borde={KC.gold} />
      </Escena>
      {/* 5 · 2001: casi 100 millones por genoma */}
      <Escena T={T} a={K.Precio2001} b={K.Pregunta} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><Grafica T={T} p={1 / COSTO.length} /></SvgCapa>
        <Etq T={T} at={K.Precio2001 + 0.5} until={K.Pregunta - 0.2} x={300} y={548} texto="sept. 2001 · ≈ $95 millones" tam={32} color={KC.ink} />
        <Chip T={T} at={K.Precio2001 + 0.6} until={K.Pregunta - 0.2} texto="un solo genoma" y={1560} tam={44} borde={KC.pink} />
      </Escena>
      {/* 6 · re-gancho: ¿y el tuyo? */}
      <Escena T={T} a={K.Pregunta} b={K.Antes} zoom={0.06}>
        <FondoLunares color={KC.pink} />
        <SvgCapa><Pantalla T={T} x={60} y={330} llenado={1} signo={kprog(T, K.Pregunta + 0.2, K.Pregunta + 0.6)} /></SvgCapa>
      </Escena>
      {/* 7 · antes: cada pedacito en su tubito */}
      <Escena T={T} a={K.Antes} b={K.Paralelo} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa><Capilares T={T} t0={K.Antes} /></SvgCapa>
        <Chip T={T} at={K.Antes + 0.5} until={K.Paralelo - 0.2} texto="≈ 100 tubitos, un pedacito en cada uno" y={1560} tam={32} borde="#bfe8ff" />
        <Etq T={T} at={K.Antes + 1.2} until={K.Paralelo - 0.2} x={140} y={1200} texto="secuenciación de Sanger" tam={30} color={KC.gold2} />
      </Escena>
      {/* 8 · millones a la vez */}
      <Escena T={T} a={K.Paralelo} b={K.Hoy} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa><CeldaLectura T={T} x={70} y={880} /></SvgCapa>
        <Etq T={T} at={K.Paralelo + 0.3} until={K.Paralelo + 1.6} x={90} y={1150} texto="celda de lectura" tam={32} color={KC.ink} />
        <Lupa T={T} at={K.Paralelo + 0.6} until={K.Hoy - 0.4} x={760} y={760} r={250} fx={300} fy={990} interior={PuntosParalelo} tinte={KC.gold2} etiqueta="AL MICROSCOPIO · celda" />
        {T > K.Paralelo + 1.2 && T < K.Hoy - 0.3 && <Escala T={T} z={1} pxPorMm={20000} x={600} y={1430} />}
        <Chip T={T} at={K.Paralelo + 2.0} until={K.Hoy - 0.3} texto="millones de pedacitos a la vez" y={1640} tam={38} borde={KC.gold2} />
      </Escena>
      {/* 9 · 2022: unos 525 dólares */}
      <Escena T={T} a={K.Hoy} b={K.Estudio} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa><Grafica T={T} p={pGraf} marca2008={kprog(T, K.Hoy + 1.0, K.Hoy + 1.4)} /></SvgCapa>
        <NumeroGigante T={T} at={K.Hoy + 2.8} until={K.Estudio - 0.3} valor={525} dur={0.8} prefijo="≈ $" etiqueta="mayo de 2022" x={360} y={1600} tam={150} color={KC.mint} />
      </Escena>
      {/* 10 · T2T, Science 2022 */}
      <Escena T={T} a={K.Estudio} b={K.Faltaba} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa><Cromosoma T={T} x={130} y={1620} largo={820} alto={130} telo={kprog(T, K.Estudio + 2.0, K.Estudio + 2.6)} /></SvgCapa>
        <TarjetaEstudio T={T} at={K.Estudio + 0.2} until={K.Faltaba - 0.3} anio="2022" quien="Consorcio T2T" revista="Science · Telómero a Telómero" x={790} y={720} />
        <Etq T={T} at={K.Estudio + 2.4} until={K.Faltaba - 0.3} x={150} y={1480} texto="telómero" tam={30} color={KC.ink} />
        <Etq T={T} at={K.Estudio + 2.6} until={K.Faltaba - 0.3} x={930} y={1480} texto="telómero" lado="izq" tam={30} color={KC.ink} />
      </Escena>
      {/* 11 · el 8 % que faltaba */}
      <Escena T={T} a={K.Faltaba} b={K.Repetidos} zoom={0.04}>
        <FondoMarca patron="oscuro" />
        <SvgCapa><Pantalla T={T} x={305} y={420} w={470} h={700} filas={13} llenado={1} huecos={HUECOS} relleno={kprog(T, K.Faltaba + 1.0, K.Faltaba + 3.3)} /></SvgCapa>
        <Medidor T={T} at={K.Faltaba + 0.3} until={K.Repetidos - 0.2} valor={(t) => 0.92 + 0.08 * kprog(t, K.Faltaba + 1.0, K.Faltaba + 3.3)} etiqueta="genoma leído" y={1450} color={KC.gold2} />
        <Chip T={T} at={K.Faltaba + 1.2} until={K.Repetidos - 0.2} texto="casi 200 millones de letras nuevas" y={1640} tam={34} borde={KC.gold2} />
      </Escena>
      {/* 12 · los tramos más repetidos */}
      <Escena T={T} a={K.Repetidos} b={K.Cierre} zoom={0.03}>
        <FondoMarca patron="oscuro" />
        <SvgCapa>
          <Cromosoma T={T} x={90} y={560} largo={520} alto={100} cen={0.45} telo={1} centro={0.6 + 0.4 * Math.sin(T * 4)} />
          <path d={`M ${90 + 520 * 0.45} 620 L 540 820`} stroke={KC.gold2} strokeWidth={5} strokeDasharray="12 8" />
          <Repetido T={T} t0={K.Repetidos} y={920} />
        </SvgCapa>
        <Etq T={T} at={K.Repetidos + 0.4} until={K.Cierre - 0.2} x={330} y={680} texto="centrómero" tam={30} color={KC.gold2} />
        <Chip T={T} at={K.Repetidos + 1.3} until={K.Cierre - 0.2} texto="una lectura larguísima lo cruza" y={1560} tam={36} borde={KC.gold2} />
      </Escena>
      {/* 13 · cierre: la pantalla del inicio, ya con el precio nuevo */}
      <Escena T={T} a={K.Cierre} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <Persona x={830} y={1080} s={0.75} color={KC.blue} />
          <Pantalla T={T} x={110} y={330} llenado={1} precio={{ o: kprog(T, K.Cierre + 2.6, K.Cierre + 3.0) }} />
        </SvgCapa>
        <MitoTachado T={T} at={K.Cierre + 0.4} tacharEn={K.Cierre + 2.2} until={K.Outro} texto="casi $100 millones" x={540} y={1520} tam={46} />
        <Chip T={T} at={K.Cierre + 2.8} until={K.Outro} texto="2001 → 2022" y={1680} tam={40} borde={KC.mint} />
      </Escena>

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.Gancho + 0.1} until={K.Letras - 0.1} texto="Tu genoma: *3,000 millones* de letras" />
      <Subtitulo T={T} idx={1} at={K.Letras + 0.1} until={K.Leer - 0.1} texto="Solo *cuatro letras*" />
      <Subtitulo T={T} idx={2} at={K.Leer + 0.1} until={K.Proyecto - 0.1} texto="Una por segundo: *más de 90 años*" />
      <Subtitulo T={T} idx={3} at={K.Proyecto + 0.1} until={K.Costo - 0.1} texto="La primera lectura: *13 años*" />
      <Subtitulo T={T} idx={4} at={K.Costo + 0.1} until={K.Precio2001 - 0.1} texto="*2,700 millones* para todo" />
      <Subtitulo T={T} idx={5} at={K.Precio2001 + 0.1} until={K.Pregunta - 0.1} texto="Un genoma: *casi 100 millones*" />
      <Subtitulo T={T} idx={6} at={K.Pregunta + 0.1} until={K.Antes - 0.1} texto="¿Y *el tuyo*, hoy?" />
      <Subtitulo T={T} idx={7} at={K.Antes + 0.1} until={K.Paralelo - 0.1} texto="Cada pedacito, *su tubito*" />
      <Subtitulo T={T} idx={8} at={K.Paralelo + 0.1} until={K.Hoy - 0.1} texto="*Millones* a la vez" />
      <Subtitulo T={T} idx={9} at={K.Hoy + 0.1} until={K.Estudio - 0.1} texto="2022: *unos 525 dólares*" />
      <Subtitulo T={T} idx={10} at={K.Estudio + 0.1} until={K.Faltaba - 0.1} texto="El primer genoma *completo*" />
      <Subtitulo T={T} idx={11} at={K.Faltaba + 0.1} until={K.Repetidos - 0.1} texto="El *8 %* que faltaba" />
      <Subtitulo T={T} idx={12} at={K.Repetidos + 0.1} until={K.Cierre - 0.1} texto="Los tramos *más repetidos*" />
      <Subtitulo T={T} idx={13} at={K.Cierre + 0.1} until={K.Outro - 0.1} texto="De 100 millones a *unos 500*" />

      <Robert T={T} apariciones={[
        [K.Gancho - 0.45, K.Gancho + 4.4, 'avatar_11_sorprendido', 'gancho'],
        [K.Leer + 0.5, K.Proyecto - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Costo + 0.5, K.Precio2001 - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [K.Pregunta + 0.05, K.Antes + 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [K.Paralelo + 1.4, K.Hoy - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [K.Hoy + 1.0, K.Estudio - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.Estudio + 0.9, K.Faltaba - 0.3, 'avatar_02_apuntando_camara', 'grande-izq'],
        [K.Repetidos + 0.5, K.Cierre - 0.2, 'avatar_06_pensativo_menton', 'arriba-der'],
        [K.Cierre + 0.5, K.Outro - 0.1, 'avatar_05_sonriendo_dientes_uniformes', 'gancho']]} />
      <MarcaAgua T={T} tema="bioquimica" num="38" hasta={K.Outro} />
      <CierreMarca T={T} at={K.Outro} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function GenomaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Genoma /></CompositionStage></div>;
}
window.GenomaApp = GenomaApp;
