// Shot Químico #13 · Ese guacamole café no está podrido (polifenol oxidasa y el mito del hueso) — NARRADO (N1 por dentro).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const VERDE = '#86c443', VERDE2 = '#5f9a2c', CAFE = '#7a5226', ENZ = '#9b5de5', COBRE = '#d9822b', PIEDRA = '#4b4f57';

// Molcajete con guacamole (vista de 3/4). cafe 0..1 = capa café de arriba; raya 0..1 = surco verde de la cuchara;
// hueco 0..1 = círculo verde bajo el hueso; tapa 0..1 = plástico pegado.
function Molcajete({ x, y, s = 1, cafe = 0, raya = 0, hueco = 0, tapa = 0, T = 0 }) {
  const R = krng(13);
  const trozos = Array.from({ length: 26 }, () => { const a = R() * Math.PI * 2, d = Math.sqrt(R()); return [Math.cos(a) * d * 270, Math.sin(a) * d * 80, R()]; });
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-200, 0, 200].map((dx, i) => <path key={i} d={`M ${dx - 40} 200 L ${dx - 28} 290 L ${dx + 28} 290 L ${dx + 40} 200 Z`} fill={PIEDRA} stroke={KC.ink} strokeWidth={9} strokeLinejoin="round" />)}
    <path d="M -340 0 Q -330 250 0 260 Q 330 250 340 0 Z" fill={PIEDRA} stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={-280 + (i * 97) % 560} cy={60 + (i * 53) % 160} r={5 + (i % 3) * 2} fill="#363940" />)}
    <ellipse cx={0} cy={0} rx={340} ry={112} fill="#3a3d44" stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={8} rx={300} ry={92} fill={VERDE} />
    {trozos.map(([tx, ty, k], i) => <circle key={i} cx={tx} cy={ty + 8} r={k > 0.8 ? 11 : 7} fill={k > 0.86 ? '#e04a3a' : k > 0.72 ? '#f4f0dc' : VERDE2} opacity={0.9} />)}
    {cafe > 0 && <ellipse cx={0} cy={8} rx={300} ry={92} fill={CAFE} opacity={0.88 * cafe} />}
    {cafe > 0 && Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx={-220 + i * 48} cy={(i % 3 - 1) * 30 + 8} rx={30} ry={12} fill="#5e3c18" opacity={0.6 * cafe} />)}
    {raya > 0 && <path d={`M -200 10 Q 0 ${-10} ${klerp(-200, 210, raya)} ${12}`} stroke={VERDE} strokeWidth={44} fill="none" strokeLinecap="round" />}
    {hueco > 0 && <ellipse cx={0} cy={6} rx={92} ry={32} fill={VERDE} opacity={hueco} />}
    {tapa > 0 && <g opacity={tapa}>
      <ellipse cx={0} cy={6} rx={318} ry={100} fill="rgba(220,240,255,.28)" stroke="rgba(255,255,255,.9)" strokeWidth={6} />
      <path d="M -220 -30 Q -120 -60 40 -50" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8} />
      <path d="M 90 40 Q 170 34 230 10" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.6} />
    </g>}
  </g>;
}
// Cuchara de metal (vista de lado).
function Cuchara({ x, y, rot = -20, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={20} y={-12} width={260} height={24} rx={12} fill="#c9ced6" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={-30} cy={0} rx={70} ry={42} fill="#dfe4ea" stroke={KC.ink} strokeWidth={8} />
    <ellipse cx={-44} cy={-12} rx={26} ry={10} fill="#fff" opacity={0.7} />
  </g>;
}
// Tejolote (la mano del molcajete).
function Tejolote({ x, y, rot = 20, s = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M -40 -220 Q -60 -60 -70 20 Q -70 70 0 70 Q 70 70 70 20 Q 60 -60 40 -220 Q 0 -250 -40 -220 Z" fill={PIEDRA} stroke={KC.ink} strokeWidth={9} />
    {[[-20, -120], [20, -40], [-30, 20], [10, -170]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r={6} fill="#363940" />)}
  </g>;
}
// Medio aguacate: cafe 0..1 oscurece la pulpa. hueso = con semilla.
function MedioAguacate({ x, y, s = 1, cafe = 0, hueso = true, rot = 0 }) {
  const pulpa = mixHex('#d8ec8f', '#8a6a33', cafe), borde = mixHex('#9fcf4f', '#6a4a20', cafe);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d="M 0 -170 Q 70 -170 90 -80 Q 150 20 120 100 Q 80 180 0 180 Q -80 180 -120 100 Q -150 20 -90 -80 Q -70 -170 0 -170 Z" fill="#2f4a1e" stroke={KC.ink} strokeWidth={9} />
    <path d="M 0 -150 Q 58 -150 74 -72 Q 128 20 102 92 Q 68 160 0 160 Q -68 160 -102 92 Q -128 20 -74 -72 Q -58 -150 0 -150 Z" fill={borde} />
    <path d="M 0 -130 Q 46 -130 60 -64 Q 110 20 86 84 Q 58 142 0 142 Q -58 142 -86 84 Q -110 20 -60 -64 Q -46 -130 0 -130 Z" fill={pulpa} />
    {hueso && <g><circle cx={0} cy={40} r={62} fill="#8b5a2b" stroke={KC.ink} strokeWidth={8} /><ellipse cx={-20} cy={20} rx={18} ry={10} fill="#c08a52" /></g>}
  </g>;
}
// Hueso suelto y pelota de golf.
function Hueso({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><ellipse rx={78} ry={66} fill="#8b5a2b" stroke={KC.ink} strokeWidth={8} /><ellipse cx={-24} cy={-22} rx={22} ry={12} fill="#c08a52" /></g>;
}
function PelotaGolf({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}><circle r={66} fill="#fafafa" stroke={KC.ink} strokeWidth={8} />
    {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={Math.cos(i * 2.4) * (12 + (i % 4) * 11)} cy={Math.sin(i * 2.4) * (12 + (i % 4) * 11)} r={5} fill="#d6d6d6" />)}</g>;
}
// Limón partido que se exprime.
function Limon({ x, y, s = 1, rot = 0, aprieta = 0 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s * (1 + aprieta * 0.06)}, ${s * (1 - aprieta * 0.1)})`}>
    <ellipse rx={120} ry={92} fill="#5fbf2a" stroke={KC.ink} strokeWidth={9} />
    <ellipse cx={0} cy={10} rx={100} ry={74} fill="#d9f27a" />
    {Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <line key={i} x1={0} y1={10} x2={Math.cos(a) * 90} y2={10 + Math.sin(a) * 66} stroke="#a7cf3e" strokeWidth={6} />; })}
  </g>;
}
// La enzima polifenol oxidasa como pinza morada. boca 0..1; cobre 0..1 = brillo de los 2 átomos de cobre.
function PPO({ x, y, s = 1, boca = 0, cobre = 0, rot = 0, dormida = false }) {
  const a = 18 + boca * 26, ra = a * Math.PI / 180;
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={`M 0 0 L ${Math.cos(ra) * 80} ${-Math.sin(ra) * 80} A 80 80 0 1 0 ${Math.cos(ra) * 80} ${Math.sin(ra) * 80} Z`} fill={ENZ} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    {dormida ? <path d="M -30 -38 q 10 8 20 0" stroke={KC.ink} strokeWidth={6} fill="none" strokeLinecap="round" />
      : <g><circle cx={-18} cy={-38} r={11} fill="#fff" /><circle cx={-15} cy={-38} r={5} fill={KC.ink} /></g>}
    {cobre > 0 && <g opacity={cobre}>
      <circle cx={-14} cy={-6} r={40} fill={COBRE} opacity={0.25} /><circle cx={-14} cy={22} r={40} fill={COBRE} opacity={0.25} />
      <Atomo x={-14} y={-10} r={17} color={COBRE} letra="Cu" tam={14} /><Atomo x={-14} y={24} r={17} color={COBRE} letra="Cu" tam={14} />
    </g>}
  </g>;
}
// Anillo de polifenol (hexágono con OH) que se vuelve quinona (naranja) y luego café.
function Anillo({ x, y, s = 1, color = '#ffd34d', rot = 0, oh = true, o = 1 }) {
  const pts = Array.from({ length: 6 }, (_, i) => { const a = Math.PI / 6 + i * Math.PI / 3; return `${Math.cos(a) * 40},${Math.sin(a) * 40}`; }).join(' ');
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={o}>
    <polygon points={pts} fill={color} stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle r={16} fill="none" stroke={KC.ink} strokeWidth={4} opacity={0.5} />
    {oh && <g><line x1={34} y1={-20} x2={58} y2={-34} stroke={KC.ink} strokeWidth={6} /><text x={62} y={-30} style={{ font:`700 26px ${KF.mono}` }} fill={KC.texto} stroke={KC.ink} strokeWidth={4} paintOrder="stroke">OH</text></g>}
  </g>;
}
// Célula de la pulpa (~60 µm) con dos "bolsitas": enzima (morada) y polifenoles (amarillos). rompe 0..1.
function CeldaPulpa({ cx, cy, w = 120, rompe = 0, T = 0, seed = 1 }) {
  const R = krng(seed), j = () => (R() - 0.5) * 10;
  const pts = Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3 + 0.3; return [cx + Math.cos(a) * w * 0.55 + j(), cy + Math.sin(a) * w * 0.5 + j()]; });
  const mezcla = rompe * 26;
  return <g>
    <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="rgba(170,220,110,.22)" stroke={rompe > 0.5 ? '#c9e98a' : '#9fd35a'} strokeWidth={5} strokeDasharray={rompe > 0.3 ? '18 10' : 'none'} />
    <ellipse cx={cx - 20 + Math.sin(T * 3 + seed) * mezcla} cy={cy - 6} rx={22} ry={16} fill="none" stroke={ENZ} strokeWidth={4} opacity={1 - rompe} />
    <ellipse cx={cx + 22 - Math.sin(T * 3 + seed) * mezcla} cy={cy + 10} rx={24} ry={18} fill="none" stroke="#ffd34d" strokeWidth={4} opacity={1 - rompe} />
    {[0, 1, 2].map((k) => <circle key={'e' + k} cx={cx - 26 + k * 8 + Math.sin(T * 2 + k + seed) * mezcla * 1.4} cy={cy - 8 + (k % 2) * 6 + Math.cos(T * 2.3 + k) * mezcla * 0.8} r={5} fill={ENZ} />)}
    {[0, 1, 2].map((k) => <rect key={'p' + k} x={cx + 14 + k * 7 - Math.sin(T * 2.2 + k + seed) * mezcla * 1.4} y={cy + 4 + (k % 2) * 6 - Math.cos(T * 2 + k) * mezcla * 0.8} width={8} height={8} fill="#ffd34d" transform={`rotate(45 ${cx + 18 + k * 7} ${cy + 8})`} />)}
  </g>;
}
// O₂ que caen hacia una superficie (y0 → y1) y rebotan (rebota = 1) o entran.
function LluviaO2({ T, desde, hasta, xs, y0, y1, cada = 0.9, rebota = 0, s = 0.5 }) {
  if (T < desde - 0.1 || T > hasta + 0.6) return null;
  return <g>{xs.map((x, i) => { const t0 = desde + (i * cada / xs.length); const u = ((T - t0) % cada + cada) % cada / cada; if (T < t0) return null;
    const pasa = !(i % 4 === 3) && rebota > 0;
    const yy = pasa ? (u < 0.6 ? klerp(y0, y1, u / 0.6) : y1 - Math.sin((u - 0.6) / 0.4 * Math.PI) * 120 * rebota) : klerp(y0, y1 + 30, u);
    const o = (pasa ? 1 : 1 - kprog(u, 0.8, 1)) * (1 - kprog(T, hasta, hasta + 0.5));
    return <Mol key={i} tipo="o2" x={x + Math.sin(T * 2 + i) * 10} y={yy} s={s} rot={T * 60 + i * 40} o={o} />; })}</g>;
}
// Relojito que gira (time-lapse sin cifras).
function Relojito({ T, x, y, r = 50, vel = 6 }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill="#fff" stroke={KC.ink} strokeWidth={7} />
    <line x1={0} y1={0} x2={Math.sin(T * vel) * r * 0.75} y2={-Math.cos(T * vel) * r * 0.75} stroke={KC.ink} strokeWidth={6} strokeLinecap="round" />
    <line x1={0} y1={0} x2={Math.sin(T * vel / 12) * r * 0.5} y2={-Math.cos(T * vel / 12) * r * 0.5} stroke={KC.red} strokeWidth={7} strokeLinecap="round" />
    <circle r={6} fill={KC.ink} /></g>;
}
function Texto({ x, y, t, tam = 40, color = KC.texto, anchor = 'middle', o = 1, mono = true }) {
  return <text x={x} y={y} textAnchor={anchor} opacity={o} style={{ font:`${mono ? 700 : 400} ${tam}px ${mono ? KF.mono : KF.titulo}` }} fill={color} stroke={KC.ink} strokeWidth={Math.max(4, tam / 8)} paintOrder="stroke">{t}</text>;
}

function Aguacate() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ma: CUES.Machacar, En: CUES.Enzima, Me: CUES.Melanina, Pr: CUES.Pregunta, Es: CUES.Estudio, Li: CUES.Limon, Pl: CUES.Plastico, Hu: CUES.Hueso, Co: CUES.Cobre, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  const raya = kprog(T, K.G + 0.1, K.G + 1.3, kEase.suave);
  const golpe = (t0) => { const p = ((T - t0) % 0.7 + 0.7) % 0.7; return T < t0 ? 0 : Math.abs(Math.sin(p / 0.7 * Math.PI)); };
  const rompe = kprog(T, K.Ma + 2.4, K.Ma + 4.0);
  // 3 mordidas de la enzima
  const ciclos = [0, 1, 2].map((i) => K.En + 1.3 + i * 1.35);
  const bocaEn = ciclos.reduce((a, t0) => Math.max(a, 1 - Math.abs(T - t0) / 0.35), 0);
  // pelota y hueso
  const caeHueso = kprog(T, K.Hu + 0.2, K.Hu + 0.7, kEase.rebote), subeHueso = kprog(T, K.Hu + 3.0, K.Hu + 3.6, kEase.suave), caeGolf = kprog(T, K.Hu + 4.1, K.Hu + 4.6, kEase.rebote);
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: el guacamole café y la cuchara */}
      <Escena T={T} a={K.G} b={K.Ma} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Molcajete x={540} y={800} s={1.2} cafe={1} raya={raya} />
          <Cuchara x={klerp(300, 820, raya)} y={790 - Math.sin(raya * Math.PI) * 16} rot={-24 + Math.sin(T * 8) * 3} s={1.1} />
          <LluviaO2 T={T} desde={K.G + 1.4} hasta={K.Ma} xs={[260, 360, 450, 540]} y0={500} y1={770} cada={1.1} />
        </SvgCapa>
      </Escena>
      {/* 1 · machacar: tejolote y la pulpa por dentro */}
      <Escena T={T} a={K.Ma} b={K.En} zoom={0.03}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          <MedioAguacate x={170} y={1000} s={0.7} rot={-14} />
          <Molcajete x={540} y={830} s={1.15} />
          <Tejolote x={600} y={klerp(670, 750, golpe(K.Ma))} rot={18} s={0.9} />
        </SvgCapa>
        <Lupa T={T} at={K.Ma + 1.4} until={K.En - 0.2} x={640} y={630} r={230} fx={480} fy={840} tinte={VERDE} etiqueta="AL MICROSCOPIO · pulpa"
          interior={(t, r) => <svg width={r * 2} height={r * 2} style={{ background:'#0f1f10' }}>
            {Array.from({ length: 20 }, (_, i) => { const c = i % 5, f = Math.floor(i / 5); return <CeldaPulpa key={i} T={t} seed={i + 1} cx={40 + c * 100 + (f % 2) * 50} cy={70 + f * 110} w={120} rompe={rompe * (i % 3 === 1 ? 0.7 : 1)} />; })}
          </svg>} />
        {T > K.Ma + 1.9 && T < K.En - 0.2 && <Escala T={T} z={1} pxPorMm={2000} objetivo={110} x={890} y={600} />}
      </Escena>
      {/* 2 · la enzima toma polifenoles y oxígeno */}
      <Escena T={T} a={K.En} b={K.Me} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(160,220,120,.25)" />
        <SvgCapa>
          <PPO x={420} y={880} s={2.3} boca={bocaEn} />
          {ciclos.map((t0, i) => { const llega = kprog(T, t0 - 1.0, t0, kEase.suave), sale = kprog(T, t0 + 0.1, t0 + 1.1, kEase.sale);
            if (T < t0 - 1.0) return null;
            const yy = 880 + (i - 1) * 40;
            return <g key={i}>
              {sale === 0 && <Anillo x={klerp(1040, 640, llega)} y={yy} s={1.1} rot={T * 30} />}
              {sale === 0 && <Mol tipo="o2" x={klerp(700, 620, llega)} y={klerp(420, yy - 70, llega)} s={0.6} rot={T * 40} />}
              {sale > 0 && <Anillo x={klerp(640, 700 + i * 120, sale)} y={klerp(yy, 1040, sale)} s={1} color={KC.orange} oh={false} rot={T * 20} />}
            </g>; })}
        </SvgCapa>
        <Etq T={T} at={K.En + 0.4} until={K.Me - 0.2} x={80} y={600} texto="polifenol oxidasa" color={ENZ} tam={34} />
        <Etq T={T} at={K.En + 0.8} until={K.En + 2.4} x={760} y={790} texto="polifenol" color="#ffd34d" tam={32} />
        <Etq T={T} at={K.En + 1.4} until={K.Me - 0.2} x={680} y={1110} texto="quinona" color={KC.orange} tam={32} lado="izq" />
      </Escena>
      {/* 3 · las quinonas se encadenan: melaninas */}
      <Escena T={T} a={K.Me} b={K.Pr} zoom={0.05}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={24} color="rgba(255,170,90,.22)" />
        <SvgCapa>
          {Array.from({ length: 11 }, (_, i) => { const t0 = K.Me + 0.3 + i * 0.22, e = kprog(T, t0, t0 + 0.3, kEase.rebote), cafe = kprog(T, K.Me + 1.6 + i * 0.1, K.Me + 2.6 + i * 0.1);
            const x = 110 + i * 86, y = 880 + Math.sin(i * 0.9 + T * 1.5) * 90;
            const xp = 110 + (i - 1) * 86, yp = 880 + Math.sin((i - 1) * 0.9 + T * 1.5) * 90;
            return <g key={i}>
              {i > 0 && e > 0.5 && <line x1={xp} y1={yp} x2={x} y2={y} stroke={mixHex(KC.orange, '#5e3c18', cafe)} strokeWidth={14} strokeLinecap="round" />}
              {e > 0 && <Anillo x={x} y={y} s={1.05 * e} color={mixHex(KC.orange, '#6b4420', cafe)} oh={false} rot={i * 15} />}
            </g>; })}
        </SvgCapa>
        <Chip T={T} at={K.Me + 1.8} until={K.Pr - 0.2} texto="melaninas = el café" y={640} tam={48} borde={CAFE} />
      </Escena>
      {/* 4 · pregunta: café arriba, verde abajo */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Texto x={300} y={640} t="?" tam={260} color={KC.yellow} mono={false} />
          <g transform="translate(300 900)">
            <path d="M -240 -120 Q -240 200 0 210 Q 240 200 240 -120 Z" fill={PIEDRA} stroke={KC.ink} strokeWidth={10} />
            <path d="M -210 -100 Q -205 170 0 178 Q 205 170 210 -100 Z" fill={VERDE} />
            <path d="M -210 -100 L 210 -100 L 210 -80 Q 0 -70 -210 -80 Z" fill={CAFE} opacity={kprog(T, K.Pr + 0.3, K.Pr + 1.2)} />
            <PPO x={20} y={80} s={0.55} dormida={T > K.Pr + 2.6} />
            {T > K.Pr + 2.8 && <Texto x={90} y={40 - ((T * 30) % 30)} t="z z z" tam={34} color={KC.texto} />}
          </g>
        </SvgCapa>
        <SvgCapa><LluviaO2 T={T} desde={K.Pr + 0.2} hasta={K.Es} xs={[140, 230, 320, 410]} y0={520} y1={790} cada={1.0} /></SvgCapa>
        <Chip T={T} at={K.Pr + 3.0} until={K.Es - 0.2} texto="sin O₂, la enzima no trabaja" y={1500} tam={40} borde={ENZ} />
      </Escena>
      {/* 5 · 1975, Israel: tres variedades */}
      <Escena T={T} a={K.Es} b={K.Li} zoom={0.03}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          {[['Fuerte', 1, 2.0], ['Horeshim', 0.6, 3.2], ['Lerman', 0.3, 4.4]].map(([n, ppo, d], i) => { const x = 200 + i * 340, ap = kprog(T, K.Es + 2.4 + i * 0.2, K.Es + 2.8 + i * 0.2, kEase.rebote);
            const cafe = kprog(T, K.Es + 3.2, K.Es + 3.2 + d);
            return ap > 0 && <g key={i} opacity={ap}>
              <MedioAguacate x={x} y={870} s={0.95 * ap} cafe={cafe} />
              <Texto x={x} y={1085} t={n} tam={36} />
              <rect x={x - 120} y={1110} width={240} height={30} rx={15} fill="rgba(0,0,0,.45)" stroke={KC.ink} strokeWidth={4} />
              <rect x={x - 120} y={1110} width={240 * ppo * kprog(T, K.Es + 2.9, K.Es + 3.6)} height={30} rx={15} fill={ENZ} />
              <Texto x={x - 108} y={1134} t="PPO" tam={22} anchor="start" color={KC.texto} />
            </g>; })}
          {T > K.Es + 3.0 && <Relojito T={T} x={540} y={640} r={56} vel={8} />}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.2} until={K.Es + 2.5} anio="1975" quien="V. Kahn · Volcani, Israel" revista="J Sci Food Agric · 3 variedades" y={760} />
        <Chip T={T} at={K.Es + 5.2} until={K.Li - 0.2} texto="más PPO → más rápido café" y={1500} tam={42} borde={ENZ} />
      </Escena>
      {/* 6–7 · limón y plástico */}
      <Escena T={T} a={K.Li} b={K.Hu} zoom={0.03}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Molcajete x={540} y={830} s={1.15} cafe={0.05} tapa={kprog(T, K.Pl + 0.4, K.Pl + 0.9)} />
          {T < K.Pl + 0.3 && <g opacity={1 - kprog(T, K.Pl, K.Pl + 0.3)}>
            <Limon x={360} y={560} s={0.9} rot={150} aprieta={Math.abs(Math.sin((T - K.Li) * 5)) * kprog(T, K.Li + 0.4, K.Li + 0.8)} />
            <Goteo T={T} x={380} y0={680} y1={810} cada={0.35} color="#e9f7a0" desde={K.Li + 0.6} hasta={K.Pl} />
            <PPO x={720} y={815} s={0.5} rot={Math.sin(T * 0.8) * 10} boca={Math.abs(Math.sin(T * 1.2)) * 0.6} />
          </g>}
          {T > K.Pl && T < K.Pl + 0.9 && <rect x={170} y={klerp(380, 770, kprog(T, K.Pl, K.Pl + 0.6, kEase.sale))} width={740} height={18} rx={9} fill="rgba(220,240,255,.7)" stroke="#fff" strokeWidth={5} />}
          <LluviaO2 T={T} desde={K.Pl + 0.8} hasta={K.Hu} xs={[320, 420, 520, 620]} y0={470} y1={770} cada={1.0} rebota={1} />
        </SvgCapa>
        <Etq T={T} at={K.Li + 1.6} until={K.Pl - 0.1} x={700} y={930} texto="enzima lenta" color={ENZ} tam={28} lado="der" />
        <Chip T={T} at={K.Li + 1.0} until={K.Pl - 0.1} texto="ácido → baja el pH" y={1500} tam={44} borde="#c9e64a" />
        <Chip T={T} at={K.Pl + 0.9} until={K.Hu - 0.1} texto="plástico pegado = casi sin O₂" y={1500} tam={40} borde={KC.cyan} />
      </Escena>
      {/* 8 · el hueso (y la pelota de golf) */}
      <Escena T={T} a={K.Hu} b={K.Co} zoom={0.03}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Molcajete x={540} y={830} s={1.15} cafe={kprog(T, K.Hu + 0.9, K.Hu + 2.7)} hueco={T > K.Hu + 0.7 ? 1 : 0} />
          {T > K.Hu + 1.0 && T < K.Hu + 3.0 && <Relojito T={T} x={880} y={560} r={50} vel={14} />}
          {T < K.Hu + 4.0 && <Hueso x={klerp(540, 760, subeHueso)} y={klerp(420, 815, caeHueso) - subeHueso * 300} s={1.05} />}
          {T > K.Hu + 4.1 && <PelotaGolf x={540} y={klerp(420, 815, caeGolf)} s={1.05} />}
        </SvgCapa>
        <Onomato T={T} at={K.Hu + 4.4} until={K.Co - 0.1} x={760} y={640} texto="¡boing!" color={KC.yellow} tam={84} />
        <MitoTachado T={T} at={K.Hu + 0.3} tacharEn={K.Hu + 2.2} until={K.Hu + 3.0} texto="el hueso protege todo" y={1500} tam={44} />
        <Chip T={T} at={K.Hu + 3.1} until={K.Co - 0.1} texto="solo protege lo que toca" y={1500} tam={44} borde={VERDE} />
      </Escena>
      {/* 9 · dos átomos de cobre */}
      <Escena T={T} a={K.Co} b={K.Ci} zoom={0.06} origen="35% 50%">
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={30} color="rgba(217,130,43,.3)" />
        <SvgCapa>
          <PPO x={300} y={920} s={klerp(2.2, 3.2, kprog(T, K.Co, K.Co + 1.2, kEase.suave))} cobre={kprog(T, K.Co + 0.9, K.Co + 1.5)} boca={0.3} />
        </SvgCapa>
        <Etq T={T} at={K.Co + 1.6} until={K.Ci - 0.2} x={60} y={560} texto="2 átomos de cobre (Cu)" color={COBRE} tam={36} lado="der" />
      </Escena>
      {/* 10 · cierre: el mismo guacamole del inicio */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Molcajete x={540} y={800} s={1.2} cafe={1} raya={1} />
          <Limon x={150} y={1060} s={0.55} rot={10} />
          <LluviaO2 T={T} desde={K.Ci + 0.2} hasta={FIN} xs={[260, 360, 450, 540]} y0={500} y1={770} cada={1.1} />
        </SvgCapa>
        <Chip T={T} at={K.Ci + 0.6} until={K.Ou} texto="PPO + polifenoles + O₂ → melaninas" y={1500} tam={36} borde={CAFE} />
      </Escena>

      {/* textos del gancho */}
      <MitoTachado T={T} at={K.G + 0.2} tacharEn={K.G + 1.7} until={K.G + 3.2} texto="¿podrido?" x={290} y={470} tam={50} />
      <Chip T={T} at={K.G + 3.3} until={K.Ma - 0.2} texto="es una enzima + oxígeno" y={1500} tam={42} borde={ENZ} />
      <Chip T={T} at={K.Ma + 0.4} until={K.Ma + 1.6} texto="¡crack! células rotas" y={1500} tam={42} borde={VERDE} />
      <Chip T={T} at={K.Ma + 2.4} until={K.En - 0.2} texto="enzima + polifenoles: juntos" y={1500} tam={38} borde={ENZ} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ma - 0.1} texto="No está podrido: *es una enzima.*" />
      <Subtitulo T={T} idx={1} at={K.Ma + 0.1} until={K.En - 0.1} texto="Machacas: *rompes sus células.*" />
      <Subtitulo T={T} idx={2} at={K.En + 0.1} until={K.Me - 0.1} texto="Polifenol oxidasa *+ oxígeno.*" />
      <Subtitulo T={T} idx={3} at={K.Me + 0.1} until={K.Pr - 0.1} texto="Se encadenan: *melaninas cafés.*" />
      <Subtitulo T={T} idx={4} at={K.Pr + 0.1} until={K.Es - 0.1} texto="Sin oxígeno, *no hay café.*" />
      <Subtitulo T={T} idx={5} at={K.Es + 0.1} until={K.Li - 0.1} texto="1975: *más enzima, más café.*" />
      <Subtitulo T={T} idx={6} at={K.Li + 0.1} until={K.Pl - 0.1} texto="El limón *la frena.*" />
      <Subtitulo T={T} idx={7} at={K.Pl + 0.1} until={K.Hu - 0.1} texto="Plástico pegado: *casi sin aire.*" />
      <Subtitulo T={T} idx={8} at={K.Hu + 0.1} until={K.Co - 0.1} texto="El hueso: *solo lo que toca.*" />
      <Subtitulo T={T} idx={9} at={K.Co + 0.1} until={K.Ci - 0.1} texto="Dos átomos *de cobre.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Es *química con el aire.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 5.0, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Machacar + 1.2, CUES.Enzima - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Enzima + 1.2, CUES.Melanina - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Pregunta + 0.05, CUES.Estudio - 0.4, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 2.8, CUES.Limon - 0.3, 'avatar_04_bajando_lentes', 'izq-alto'],
        [CUES.Limon + 0.5, CUES.Plastico + 3.0, 'avatar_13_senalando_arriba', 'arriba-der'],
        [CUES.Hueso + 0.4, CUES.Cobre - 0.3, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Cobre + 0.3, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'grande'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="quimica" num="13" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function AguacateApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Aguacate /></CompositionStage></div>;
}
window.AguacateApp = AguacateApp;
