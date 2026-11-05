// Shot Fungi Mati #69 · Un hongo ya vivió en tus pulmones: Pneumocystis jirovecii — NARRADO (gancho 3 "Tu cuerpo en una imagen" + N1 "Por dentro").
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const PC = { piel:'#f2c29b', pulmon:'#ff8fa6', pulmon2:'#e45d7a', bronquio:'#f7d2da', hongo:'#c9a7ff', hongo2:'#8f63e0', quiste:'#f4c25a', espora:'#7a4fd0', macro:'rgba(140,240,190,.5)', ergo:'#b18cff', coles:'#ffd23f', fosfo:'#7fd6ff' };

// respiración: 0..1 (ciclo de 4 s)
const resp = (T) => 0.5 + 0.5 * Math.sin(T * Math.PI / 2);

// Torso con pulmones que se inflan. brillo 0..1 = el puntito del hongo en un pulmón.
function Torso({ x, y, s = 1, T, brillo = 0 }) {
  const r = resp(T), k = 1 + 0.06 * r;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -300 520 Q -330 120 -250 -40 Q -170 -150 -80 -170 L 80 -170 Q 170 -150 250 -40 Q 330 120 300 520 Z" fill={PC.piel} stroke={KC.ink} strokeWidth={9} />
    <rect x={-60} y={-330} width={120} height={180} rx={40} fill={PC.piel} stroke={KC.ink} strokeWidth={9} />
    <circle cx={0} cy={-420} r={120} fill={PC.piel} stroke={KC.ink} strokeWidth={9} />
    <path d="M -110 -460 Q 0 -580 110 -460 Q 60 -520 0 -515 Q -60 -520 -110 -460 Z" fill="#3a2a20" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-40} cy={-420} r={11} fill={KC.ink} /><circle cx={40} cy={-420} r={11} fill={KC.ink} />
    <path d="M -30 -365 Q 0 -350 30 -365" stroke={KC.ink} strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M 0 -160 L 0 -40 M 0 -40 Q -60 -20 -90 30 M 0 -40 Q 60 -20 90 30" stroke={PC.bronquio} strokeWidth={26} fill="none" strokeLinecap="round" />
    <path d="M 0 -160 L 0 -40 M 0 -40 Q -60 -20 -90 30 M 0 -40 Q 60 -20 90 30" stroke={KC.ink} strokeWidth={4} fill="none" strokeLinecap="round" opacity=".4" />
    <g transform={`translate(-120 140) scale(${k})`}><path d="M 40 -170 Q -120 -160 -150 40 Q -160 200 -40 210 Q 30 200 40 120 Z" fill={PC.pulmon} stroke={KC.ink} strokeWidth={8} /></g>
    <g transform={`translate(120 140) scale(${k})`}><path d="M -40 -170 Q 120 -160 150 40 Q 160 200 40 210 Q -30 200 -40 120 Z" fill={PC.pulmon} stroke={KC.ink} strokeWidth={8} /></g>
    {brillo > 0 && <g transform="translate(-170 190)" opacity={brillo}>
      <circle r={50 * brillo} fill={KC.gold2} opacity=".35" style={{ filter:'blur(6px)' }} />
      <circle r={16} fill={PC.hongo} stroke={KC.ink} strokeWidth={4} />
      <circle cx={18} cy={-10} r={9} fill={PC.hongo} stroke={KC.ink} strokeWidth={3} />
    </g>}
  </g>;
}

function Personita({ x, y, s = 1, color = '#8fb6ff' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-34} r={14} fill={PC.piel} stroke={KC.ink} strokeWidth={3.5} />
    <path d="M -20 14 Q -22 -14 0 -16 Q 22 -14 20 14 Z" fill={color} stroke={KC.ink} strokeWidth={3.5} />
  </g>;
}

// Bebé chiquito (cara redonda con un rulito).
function Bebe({ x, y, s = 1, color = '#e6e1d6' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={20} fill={color} stroke={KC.ink} strokeWidth={3} />
    <path d="M -4 -20 Q 2 -30 8 -22" stroke={KC.ink} strokeWidth={3} fill="none" strokeLinecap="round" />
    <circle cx={-7} cy={-2} r={2.6} fill={KC.ink} /><circle cx={7} cy={-2} r={2.6} fill={KC.ink} />
    <path d="M -6 8 Q 0 12 6 8" stroke={KC.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />
  </g>;
}

// Racimo de alvéolos al final de un bronquiolo.
function Racimo({ x, y, s = 1, T }) {
  const r = resp(T), k = 1 + 0.05 * r;
  const B = [[0, 0], [-70, -40], [70, -40], [-110, 40], [110, 40], [-50, 70], [50, 70], [0, 110], [-130, -90], [130, -90], [0, -80]];
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 -420 L 0 -160 Q -10 -120 -60 -90 M 0 -160 Q 10 -120 60 -90" stroke={PC.bronquio} strokeWidth={34} fill="none" strokeLinecap="round" />
    <path d="M 0 -420 L 0 -160 Q -10 -120 -60 -90 M 0 -160 Q 10 -120 60 -90" stroke={KC.ink} strokeWidth={5} fill="none" strokeLinecap="round" opacity=".35" />
    {B.map(([bx, by], i) => <circle key={i} cx={bx * k} cy={by * k} r={58 * k} fill={i % 2 ? PC.pulmon : '#ffa3b6'} stroke={KC.ink} strokeWidth={6} />)}
  </g>;
}

// Forma trófica: manchita irregular pegada a la pared.
function Trofica({ x, y, s = 1, T = 0, seed = 1 }) {
  const N = 9, pts = Array.from({ length: N }, (_, i) => { const a = i / N * Math.PI * 2; const rr = 1 + 0.25 * Math.sin(a * 3 + seed * 2 + T * 1.5); return [Math.cos(a) * 34 * rr, Math.sin(a) * 24 * rr]; });
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ') + ' Z';
  return <g transform={`translate(${x} ${y}) scale(${s})`}><path d={d} fill={PC.hongo} stroke={KC.ink} strokeWidth={4} strokeLinejoin="round" /><circle r={7} fill={PC.hongo2} /></g>;
}
// Quiste redondo con 8 esporas (n = cuántas se ven).
function Quiste({ x, y, s = 1, n = 8 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle r={78} fill={PC.quiste} stroke={KC.ink} strokeWidth={7} />
    <circle r={66} fill="#ffe6a3" />
    {Array.from({ length: 8 }, (_, i) => { if (i >= n) return null; const a = i / 8 * Math.PI * 2 + 0.3; const rr = i % 2 ? 22 : 42;
      return <ellipse key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} rx={15} ry={11} transform={`rotate(${a * 57} ${Math.cos(a) * rr} ${Math.sin(a) * rr})`} fill={PC.espora} stroke={KC.ink} strokeWidth={3} />; })}
  </g>;
}
// Pared del alvéolo vista al microscopio: banda curva con células planas.
function Pared({ y = 1100, T }) {
  return <g>
    <path d={`M -20 ${y} Q 540 ${y - 120} 1100 ${y} L 1100 ${y + 400} L -20 ${y + 400} Z`} fill="#5a1f33" />
    <path d={`M -20 ${y} Q 540 ${y - 120} 1100 ${y}`} stroke="#ff9db4" strokeWidth={26} fill="none" />
    {[100, 330, 560, 790, 1000].map((x, i) => <ellipse key={i} cx={x} cy={y - 60 + Math.abs(x - 540) * Math.abs(x - 540) / 2400} rx={95} ry={16} fill="#ffc2d0" stroke={KC.ink} strokeWidth={3} />)}
    {[140, 420, 700, 960].map((x, i) => <circle key={i} cx={x} cy={y + 120 + (i % 2) * 40} r={26} fill="#e23b3b" stroke={KC.ink} strokeWidth={3} opacity=".8" />)}
  </g>;
}
// Macrófago (célula de defensa) que se acerca y rodea.
function Macrofago({ T, cx, cy, s = 1 }) {
  const N = 20, pts = Array.from({ length: N }, (_, i) => { const a = (i / N) * Math.PI * 2; const rr = 120 + Math.sin(a * 3 + T * 2) * 12 + Math.sin(a * 5 - T * 1.3) * 8; return [Math.cos(a) * rr, Math.sin(a) * rr]; });
  const d = 'M ' + pts.map((q) => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L ') + ' Z';
  return <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <path d={d} fill={PC.macro} stroke="#a8ffd3" strokeWidth={6} strokeLinejoin="round" />
    <ellipse cx={-40} cy={30} rx={34} ry={26} fill="#2fae7a" stroke={KC.ink} strokeWidth={4} />
  </g>;
}
// Membrana: fila de fosfolípidos con esteroles intercalados (ergosterol lila o colesterol amarillo).
function Membrana({ x, y, w = 420, esterol = PC.ergo, rota = 0 }) {
  const n = 9, out = [];
  for (let i = 0; i < n; i++) { const xx = x + i * w / (n - 1);
    out.push(<g key={'f' + i}><circle cx={xx} cy={y - 50} r={16} fill={PC.fosfo} stroke={KC.ink} strokeWidth={3} /><circle cx={xx} cy={y + 50} r={16} fill={PC.fosfo} stroke={KC.ink} strokeWidth={3} />
      <path d={`M ${xx - 5} ${y - 34} L ${xx - 5} ${y + 34} M ${xx + 5} ${y - 34} L ${xx + 5} ${y + 34}`} stroke="#e8e2d2" strokeWidth={3} /></g>);
    if (i < n - 1 && i % 2 === 0) { const ex = xx + w / (n - 1) / 2, rt = i === 4 ? rota : 0;
      out.push(<g key={'e' + i} transform={`translate(${ex} ${y - 10}) rotate(${rt})`}><rect x={-9} y={-30} width={18} height={56} rx={6} fill={esterol} stroke={KC.ink} strokeWidth={3} /></g>); }
  }
  return <g>{out}</g>;
}
function Frasco({ x, y, s = 1, texto = 'TMP-SMX', sub = 'antibiótico' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-70} y={-200} width={140} height={60} rx={12} fill="#f4efe4" stroke={KC.ink} strokeWidth={8} />
    <rect x={-120} y={-150} width={240} height={330} rx={40} fill={KC.cyan} stroke={KC.ink} strokeWidth={9} />
    <rect x={-100} y={-60} width={200} height={150} rx={14} fill="#fff" stroke={KC.ink} strokeWidth={5} />
    <text x={0} y={10} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    <text x={0} y={58} textAnchor="middle" style={{ font:`700 24px ${KF.mono}` }} fill="#5a524a">{sub}</text>
  </g>;
}
function Rata({ x, y, s = 1, T = 0 }) {
  const c = Math.sin(T * 3) * 6;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 120 30 Q 220 ${40 + c} 280 ${-10 + c}`} stroke="#e9a1a8" strokeWidth={10} fill="none" strokeLinecap="round" />
    <ellipse cx={20} cy={0} rx={130} ry={75} fill="#9c958d" stroke={KC.ink} strokeWidth={7} />
    <path d="M -90 -30 Q -190 -10 -200 20 Q -150 50 -80 40 Z" fill="#9c958d" stroke={KC.ink} strokeWidth={7} strokeLinejoin="round" />
    <circle cx={-80} cy={-70} r={34} fill="#c9bfb6" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-140} cy={0} r={7} fill={KC.ink} /><circle cx={-200} cy={22} r={9} fill="#e9a1a8" stroke={KC.ink} strokeWidth={3} />
  </g>;
}
function Ficha({ x, y, texto, tachar = 0, color = KC.paper, sub }) {
  return <g transform={`translate(${x} ${y}) rotate(-3)`}>
    <rect x={-300} y={-150} width={600} height={300} rx={14} fill={color} stroke={KC.ink} strokeWidth={8} />
    <text x={0} y={-80} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill="#5a524a">{sub || 'CLASIFICACIÓN'}</text>
    <text x={0} y={30} textAnchor="middle" style={{ font:`400 84px ${KF.titulo}` }} fill={KC.ink}>{texto}</text>
    {tachar > 0 && <line x1={-260} y1={0} x2={klerp(-260, 260, tachar)} y2={0} stroke={KC.red} strokeWidth={18} strokeLinecap="round" />}
  </g>;
}

function PneumoShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Ai: CUES.Aire, Al: CUES.Alveolo, Fo: CUES.Formas, Sa: CUES.Sano, Di: CUES.Disfraz, P: CUES.Pregunta, Co: CUES.Colesterol, An: CUES.Antibiotico, E: CUES.Estudio, B: CUES.Bebes, R: CUES.Ratas, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;

  const interiorAlv = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 1080 1080" style={{ display:'block' }}>
    <rect width={1080} height={1080} fill="#2a0f1a" />
    <circle cx={540} cy={540} r={430} fill="#3a1424" stroke="#ff9db4" strokeWidth={30} />
    {[[540, 140, 0], [880, 420, 1], [250, 300, 2], [800, 800, 3]].map(([x, y, s], i) => <Trofica key={i} x={x} y={y} s={1.6} T={t} seed={s} />)}
    <Quiste x={300} y={780} s={1.3} />
  </svg>;
  const interiorCierre = (t, r) => <svg width={r * 2} height={r * 2} viewBox="0 0 1080 1080" style={{ display:'block' }}>
    <rect width={1080} height={1080} fill="#2a0f1a" />
    <circle cx={540} cy={540} r={430} fill="#3a1424" stroke="#ff9db4" strokeWidth={30} />
    <Trofica x={560} y={160} s={1.6} T={t} seed={1} /><Trofica x={860} y={440} s={1.5} T={t} seed={3} />
    <Macrofago T={t} cx={420} cy={600} s={1.7} />
  </svg>;

  // conteo de esporas del quiste
  const nEsp = Math.floor(8 * kprog(T, K.Fo + 2.0, K.Fo + 3.6));
  // bebés: 67 de 79 se pintan
  const nB = Math.floor(67 * kprog(T, K.B + 0.8, K.B + 3.2));
  // membranas: el antifúngico baja
  const fBaja = kprog(T, K.Co + 0.6, K.Co + 1.6, kEase.suave), fRebota = kprog(T, K.Co + 2.0, K.Co + 3.0, kEase.suave);

  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: tus pulmones, con un hongo */}
      <Escena T={T} a={K.G} b={K.Ai} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Torso x={390} y={960} s={0.8} T={T} brillo={kprog(T, K.G + 0.4, K.G + 1.2, kEase.sale)} />)}
      </Escena>
      {/* 1 · pasa por el aire de persona a persona */}
      <Escena T={T} a={K.Ai} b={K.Al} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <g transform="translate(230 1040) scale(5.4)"><Personita x={0} y={0} color="#8fb6ff" /></g>
          <g transform="translate(850 1040) scale(5.4)"><Personita x={0} y={0} color="#ff8a1f" /></g>
          {Array.from({ length: 16 }, (_, i) => { const u = kprog(T, K.Ai + 0.4 + i * 0.12, K.Ai + 2.6 + i * 0.12, kEase.suave);
            const px = klerp(320, 760, u), py = 860 + Math.sin(u * Math.PI) * -120 + ((i * 37) % 60) - 30 + Math.sin(T * 3 + i) * 8;
            return u > 0 && u < 1 ? <circle key={i} cx={px} cy={py} r={9} fill={PC.hongo} stroke={KC.ink} strokeWidth={2.5} /> : null; })}
        </>)}
      </Escena>
      {/* 2 · baja a los alvéolos */}
      <Escena T={T} a={K.Al} b={K.Fo} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Racimo x={540} y={1050} s={1.25} T={T} />)}
        <Lupa T={T} at={K.Al + 1.6} until={K.Fo - 0.2} x={300} y={760} r={190} fx={600} fy={1000} interior={interiorAlv} tinte={KC.lilac} etiqueta="AL MICROSCOPIO · alvéolo" />
      </Escena>
      {/* 3 · dos formas: tróficas pegadas y quiste con 8 esporas */}
      <Escena T={T} a={K.Fo} b={K.Sa} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={16} />
        {fsvg(<>
          <Pared y={1150} T={T} />
          {[[180, 1068], [270, 1050], [380, 1035], [640, 1032], [740, 1046]].map(([x, y], i) => { const p = kprog(T, K.Fo + 0.3 + i * 0.15, K.Fo + 0.7 + i * 0.15, kEase.rebote);
            return p > 0 ? <Trofica key={i} x={x} y={y} s={p * 1.1} T={T} seed={i} /> : null; })}
          {(() => { const p = kprog(T, K.Fo + 1.4, K.Fo + 2.0, kEase.rebote); return p > 0 ? <Quiste x={540} y={800} s={p * 1.8} n={nEsp} /> : null; })()}
        </>)}
      </Escena>
      {/* 4 · con defensas bien, casi nunca da neumonía */}
      <Escena T={T} a={K.Sa} b={K.Di} zoom={0.04}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <Pared y={1150} T={T} />
          <Trofica x={560} y={1030} s={1.2} T={T} seed={2} />
          <Macrofago T={T} cx={klerp(1150, 640, kprog(T, K.Sa + 0.2, K.Sa + 1.6, kEase.sale))} cy={900} s={1.4} />
          {(() => { const p = kprog(T, K.Sa + 1.6, K.Sa + 2.1, kEase.rebote); return p > 0 ? <g transform={`translate(300 720) scale(${p})`}>
            <path d="M 0 -110 L 95 -70 Q 95 60 0 115 Q -95 60 -95 -70 Z" fill={KC.mint} stroke={KC.ink} strokeWidth={8} />
            <path d="M -40 0 L -8 34 L 46 -32" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" /></g> : null; })()}
        </>)}
      </Escena>
      {/* 5 · lo creyeron protozoario; sus genes lo delataron */}
      <Escena T={T} a={K.Di} b={K.P} zoom={0.04}>
        <FondoLunares color={KC.mint} />
        {fsvg(<>
          {T < K.Di + 3.0 ? <Ficha x={540} y={800} texto="PROTOZOARIO" tachar={kprog(T, K.Di + 2.0, K.Di + 2.6, kEase.sale)} />
            : <Ficha x={540} y={800} texto="HONGO" color="#fff4c2" sub="CLASIFICACIÓN · 1988" />}
          <g transform="translate(540 1110)">
            {Array.from({ length: 22 }, (_, i) => { const xx = -440 + i * 42, f = T * 2 + i * 0.5, on = kprog(T, K.Di + 1.0 + i * 0.04, K.Di + 1.3 + i * 0.04);
              return <g key={i}><circle cx={xx} cy={Math.sin(f) * 40} r={12} fill={on > 0.5 ? KC.gold2 : '#9fd0ff'} stroke={KC.ink} strokeWidth={3} />
                <circle cx={xx} cy={-Math.sin(f) * 40} r={12} fill={on > 0.5 ? KC.gold : '#ff8fa6'} stroke={KC.ink} strokeWidth={3} />
                <line x1={xx} y1={Math.sin(f) * 40} x2={xx} y2={-Math.sin(f) * 40} stroke={KC.ink} strokeWidth={3} opacity=".5" /></g>; })}
          </g>
        </>)}
      </Escena>
      {/* 6 · re-gancho */}
      <Escena T={T} a={K.P} b={K.Co} zoom={0.08}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<Interrogacion T={T} x={250} y={1080} tam={460} />)}
      </Escena>
      {/* 7 · ergosterol vs colesterol */}
      <Escena T={T} a={K.Co} b={K.An} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        {fsvg(<>
          <rect x={40} y={620} width={480} height={460} rx={26} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.25)" strokeWidth={4} />
          <rect x={560} y={620} width={480} height={460} rx={26} fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.25)" strokeWidth={4} />
          <Membrana x={70} y={900} w={420} esterol={PC.ergo} rota={fBaja > 0.95 ? 35 : 0} />
          <Membrana x={590} y={900} w={420} esterol={PC.coles} />
          {/* antifúngico: rombito rojo */}
          <g transform={`translate(280 ${klerp(700, 830, fBaja)})`}><rect x={-22} y={-22} width={44} height={44} transform="rotate(45)" fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>
          {fBaja > 0.95 && <path d="M 230 860 L 250 890 L 240 920 L 262 950" stroke={KC.red} strokeWidth={8} fill="none" strokeLinecap="round" />}
          <g transform={`translate(${800 + 60 * Math.sin(fRebota * Math.PI) * 0} ${fRebota < 0.5 ? klerp(700, 830, fRebota * 2) : klerp(830, 700, (fRebota - 0.5) * 2)}) rotate(${fRebota * 300})`}><rect x={-22} y={-22} width={44} height={44} transform="rotate(45)" fill={KC.red} stroke={KC.ink} strokeWidth={4} /></g>
        </>)}
      </Escena>
      {/* 8 · en su lugar, un antibiótico */}
      <Escena T={T} a={K.An} b={K.E} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<Frasco x={540} y={860} s={1.2} />)}
      </Escena>
      {/* 9 · 1981, Los Ángeles, 5 hombres jóvenes */}
      <Escena T={T} a={K.E} b={K.B} zoom={0.03}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>{Array.from({ length: 5 }, (_, i) => { const on = T > K.E + 2.6 + i * 0.4;
          return <g key={i} transform={`translate(${170 + i * 185} 1090) scale(3.6)`}><Personita x={0} y={0} color={on ? KC.gold2 : '#c9ccd4'} /></g>; })}</>)}
      </Escena>
      {/* 10 · Chile: 67 de 79 bebés con anticuerpos a los 20 meses */}
      <Escena T={T} a={K.B} b={K.R} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <rect x={60} y={640} width={640} height={560} rx={26} fill="rgba(255,255,255,.85)" stroke={KC.ink} strokeWidth={7} />
          {Array.from({ length: 79 }, (_, i) => <Bebe key={i} x={105 + (i % 10) * 61} y={690 + Math.floor(i / 10) * 64} s={1.15} color={i < nB ? KC.gold2 : '#e6e1d6'} />)}
        </>)}
        <NumeroGigante T={T} at={K.B + 1.0} until={K.R - 0.2} valor={85} dur={2.0} sufijo=" %" etiqueta="con anticuerpos" x={880} y={900} tam={130} color={KC.gold2} />
      </Escena>
      {/* 11 · la de las ratas no te infecta */}
      <Escena T={T} a={K.R} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.lilac} />
        {fsvg(<>
          <Rata x={300} y={980} s={1.1} T={T} />
          <g transform="translate(840 1060) scale(4.6)"><Personita x={0} y={0} color="#8fb6ff" /></g>
          {(() => { const p = kprog(T, K.R + 0.4, K.R + 1.1, kEase.sale), x = kprog(T, K.R + 1.3, K.R + 1.6, kEase.rebote); return <g>
            <path d={`M 470 880 L ${klerp(470, 700, p)} 880`} stroke={KC.ink} strokeWidth={14} strokeDasharray="26 16" strokeLinecap="round" />
            {p > 0.95 && <path d="M 700 850 L 730 880 L 700 910" stroke={KC.ink} strokeWidth={14} fill="none" strokeLinecap="round" />}
            {x > 0 && <g transform={`translate(590 880) scale(${x})`}><path d="M -70 -70 L 70 70 M 70 -70 L -70 70" stroke={KC.red} strokeWidth={26} strokeLinecap="round" /></g>}
          </g>; })()}
        </>)}
      </Escena>
      {/* 12 · cierre: el mismo torso; por dentro, el alvéolo con el hongo y la defensa */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<Torso x={390} y={960} s={0.8} T={T} brillo={1} />)}
        <Lupa T={T} at={K.C + 0.5} until={K.Ou} x={790} y={700} r={180} fx={254} fy={1112} interior={interiorCierre} tinte={KC.gold2} etiqueta="POR DENTRO" />
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 0.6} until={K.Ai - 0.2} texto="un hongo" x={250} y={420} tam={44} borde={KC.ink} />
      <Chip T={T} at={K.G + 2.2} until={K.Ai - 0.2} texto="probablemente de bebé" x={300} y={500} tam={36} borde={KC.gold} />
      <Etq T={T} at={K.Ai + 0.6} until={K.Al - 0.3} x={70} y={520} texto="Pneumocystis jirovecii" it tam={38} color={KC.ink} />
      <Chip T={T} at={K.Ai + 1.6} until={K.Al - 0.3} texto="por el aire" x={540} y={1170} tam={40} borde={KC.ink} />
      <Etq T={T} at={K.Al + 0.6} until={K.Fo - 0.3} x={640} y={1150} texto="alvéolos" tam={34} color={KC.ink} />
      <Etq T={T} at={K.Fo + 0.8} until={K.Sa - 0.3} x={60} y={960} texto="forma trófica (2–10 µm)" tam={28} color={PC.hongo} />
      <Etq T={T} at={K.Fo + 1.8} until={K.Sa - 0.3} x={700} y={640} texto="quiste (5–8 µm)" tam={28} color={KC.gold2} />
      <Chip T={T} at={K.Fo + 2.0} until={K.Sa - 0.3} texto={`${Math.max(1, nEsp)} / 8 esporas`} x={540} y={470} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.Fo + 0.6} until={K.Sa - 0.3} x={60} y={1260} texto="pared del alvéolo" tam={26} color="#ffc2d0" />
      <Etq T={T} at={K.Sa + 1.0} until={K.Di - 0.3} x={720} y={700} texto="macrófago (defensa)" tam={28} color="#a8ffd3" />
      <Chip T={T} at={K.Sa + 1.8} until={K.Di - 0.3} texto="defensas bien → casi nunca neumonía" x={540} y={470} tam={32} borde={KC.mint} />
      <Chip T={T} at={K.Di + 1.0} until={K.P - 0.3} texto="sus genes (ARN ribosomal)" x={540} y={1250} tam={32} borde={KC.gold} />
      <Etq T={T} at={K.Di + 3.2} until={K.P - 0.3} x={60} y={470} texto="Edman et al., Nature, 1988" tam={26} color={KC.ink} />
      <Chip T={T} at={K.P + 0.2} until={K.Co - 0.2} texto="antifúngicos comunes" x={420} y={470} tam={38} borde={KC.ink} />
      <Chip T={T} at={K.Co + 0.2} until={K.An - 0.3} texto="hongo común" x={280} y={680} tam={30} borde={PC.ergo} />
      <Chip T={T} at={K.Co + 0.4} until={K.An - 0.3} texto="Pneumocystis" x={800} y={680} tam={30} borde={PC.coles} />
      <Etq T={T} at={K.Co + 0.8} until={K.An - 0.3} x={60} y={1040} texto="ergosterol" tam={30} color={PC.ergo} />
      <Etq T={T} at={K.Co + 1.6} until={K.An - 0.3} x={580} y={1040} texto="colesterol (como tú)" tam={30} color={PC.coles} />
      <Chip T={T} at={K.Co + 2.6} until={K.An - 0.3} texto="el antifúngico rebota" x={800} y={560} tam={28} borde={KC.red} />
      <Chip T={T} at={K.An + 0.5} until={K.E - 0.3} texto="es un antibiótico" x={320} y={470} tam={42} borde={KC.gold} />
      <Etq T={T} at={K.An + 1.0} until={K.E - 0.3} x={60} y={1110} texto="trimetoprim + sulfametoxazol" tam={30} color={KC.ink} />
      <Chip T={T} at={K.An + 1.6} until={K.E - 0.3} texto="esto no es consejo médico" x={300} y={550} tam={26} borde={KC.red} />
      <TarjetaEstudio T={T} at={K.E + 0.15} until={K.E + 4.6} anio="1981" quien="5 hombres jóvenes · Los Ángeles · 5 de junio" revista="MMWR (CDC), 1981" y={480} />
      <Chip T={T} at={K.E + 4.7} until={K.B - 0.2} texto="primer reporte de lo que luego se llamó sida" x={540} y={520} tam={30} borde={KC.ink} />
      <Chip T={T} at={K.B + 0.1} until={K.R - 0.2} texto="67 de 79 bebés sanos · a los 20 meses" x={540} y={470} tam={32} borde={KC.ink} />
      <Etq T={T} at={K.B + 0.5} until={K.R - 0.2} x={60} y={560} texto="Chile · Vargas et al., Clin Infect Dis, 2001" tam={24} color={KC.ink} />
      <Etq T={T} at={K.R + 0.5} until={K.C - 0.3} x={110} y={1120} texto="P. carinii (rata)" it tam={30} color={KC.ink} />
      <Etq T={T} at={K.R + 0.7} until={K.C - 0.3} x={1040} y={1170} lado="izq" texto="P. jirovecii (humano)" it tam={30} color={KC.ink} />
      <Chip T={T} at={K.R + 1.5} until={K.C - 0.3} texto="cada mamífero tiene las suyas" x={400} y={760} tam={36} borde={KC.ink} />
      <Chip T={T} at={K.C + 1.6} until={K.Ou} texto="a raya" x={250} y={470} tam={44} borde={KC.mint} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.Ai} texto="20 cm" largo={240} />
      <BarraEscala T={T} at={K.Ai} until={K.Al} texto="50 cm" largo={290} />
      <BarraEscala T={T} at={K.Al} until={K.Fo} texto="0.2 mm" largo={100} />
      <BarraEscala T={T} at={K.Fo} until={K.Sa} texto="5 µm" largo={180} />
      <BarraEscala T={T} at={K.Sa} until={K.Di} texto="5 µm" largo={90} />
      <BarraEscala T={T} at={K.Co} until={K.An} texto="5 nm" largo={130} />
      <BarraEscala T={T} at={K.R} until={K.C} texto="dibujos no a escala" largo={0} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="20 cm" largo={240} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Ai - 0.1} texto="Tus pulmones ya tuvieron *un hongo*" />
      <Subtitulo T={T} idx={1} at={K.Ai + 0.1} until={K.Al - 0.1} texto="Pasa de persona a persona *por el aire*" />
      <Subtitulo T={T} idx={2} at={K.Al + 0.1} until={K.Fo - 0.1} texto="Se pega a los *alvéolos*" />
      <Subtitulo T={T} idx={3} at={K.Fo + 0.1} until={K.Sa - 0.1} texto="Quistes con *ocho esporas*" />
      <Subtitulo T={T} idx={4} at={K.Sa + 0.1} until={K.Di - 0.1} texto="Casi nunca te da *neumonía*" />
      <Subtitulo T={T} idx={5} at={K.Di + 0.1} until={K.P - 0.1} texto="Sus genes lo delataron: *hongo*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.Co - 0.1} texto="¿Por qué *no lo matan*?" />
      <Subtitulo T={T} idx={7} at={K.Co + 0.1} until={K.An - 0.1} texto="Su membrana lleva *colesterol*" />
      <Subtitulo T={T} idx={8} at={K.An + 0.1} until={K.E - 0.1} texto="Se usa *un antibiótico*" />
      <Subtitulo T={T} idx={9} at={K.E + 0.1} until={K.B - 0.1} texto="1981: el primer reporte del *sida*" />
      <Subtitulo T={T} idx={10} at={K.B + 0.1} until={K.R - 0.1} texto="*67 de 79* bebés con anticuerpos" />
      <Subtitulo T={T} idx={11} at={K.R + 0.1} until={K.C - 0.1} texto="La de las ratas *no te infecta*" />
      <Subtitulo T={T} idx={12} at={K.C + 0.1} until={K.Ou - 0.1} texto="Tus defensas lo tienen *a raya*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 3.9, 'avatar_11_sorprendido', 'gancho'],
        [K.Ai + 0.5, K.Al - 0.2, 'avatar_02_apuntando_camara', 'arriba-der'],
        [K.Fo + 0.3, K.Sa - 0.3, 'avatar_06_pensativo_menton', 'izq-alto'],
        [K.Sa + 0.2, K.Di - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'arriba-der'],
        [K.Di + 0.6, K.P - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.P + 0.05, K.Co - 0.05, 'avatar_07_pensativo_puno', 'grande'],
        [K.An + 0.5, K.E - 0.2, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.E + 4.6, K.B - 0.1, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.B + 1.4, K.R - 0.2, 'avatar_11_sorprendido', 'bajo-der'],
        [K.R + 0.6, K.C - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'bajo-der']]} />
      <MarcaAgua T={T} tema="biologia" num="69" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="biologia" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function PneumoApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><PneumoShot /></CompositionStage></div>;
}
window.PneumoApp = PneumoApp;
