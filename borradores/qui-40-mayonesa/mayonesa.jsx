// Shot Químico #40 · Esa mayonesa no es una pasta (emulsión de aceite y yema) — NARRADO (N1 por dentro + N5 experimento).
// Guion y fuentes: guion.md · verificación: verificacion.md. El dibujo es esquemático.
const MAYO = '#fff3c4', ACEITE = '#f6b81f', ACEITE_OSC = '#c98a00', AGUA = '#7fc8ff', YEMA = '#ff9a1f', CABEZA = '#2a7bff', PROT = '#b18cff', VINAGRE = '#9be37a';

// Frasco de mayonesa. x, y = centro de la base.
function Frasco({ x, y, s = 1, nivel = 0.86, hueco = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-150} y={-380 + 380 * (1 - nivel)} width={300} height={380 * nivel} rx={40} fill={MAYO} />
    {hueco > 0 && <ellipse cx={30} cy={-380 + 380 * (1 - nivel) + 6} rx={60 * hueco} ry={26 * hueco} fill="#efdc9a" />}
    <rect x={-150} y={-380} width={300} height={380} rx={40} fill="rgba(255,255,255,.22)" stroke={KC.ink} strokeWidth={10} />
    <rect x={-130} y={-440} width={260} height={70} rx={14} fill={KC.blue} stroke={KC.ink} strokeWidth={9} />
    <rect x={-120} y={-250} width={240} height={120} rx={16} fill={KC.paper} stroke={KC.ink} strokeWidth={7} />
    <text x={0} y={-170} textAnchor="middle" style={{ font:`400 50px ${KF.titulo}` }} fill={KC.ink}>MAYONESA</text>
    <rect x={-128} y={-350} width={22} height={300} rx={11} fill="rgba(255,255,255,.55)" />
  </g>;
}
// Cuchara con (o sin) cucharada. x, y = centro del cuenco.
function Cuchara({ x, y, rot = -30, s = 1, carga = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <rect x={40} y={-14} width={300} height={28} rx={14} fill="#c9cfd8" stroke={KC.ink} strokeWidth={7} />
    <ellipse cx={0} cy={0} rx={70} ry={48} fill="#dfe4ea" stroke={KC.ink} strokeWidth={8} />
    {carga > 0 && <path d={`M -62 6 Q -50 ${-50 - 30 * carga} 0 ${-40 - 34 * carga} Q 30 ${-70 * carga} 64 4 Q 0 30 -62 6 Z`} fill={MAYO} stroke={KC.ink} strokeWidth={6} />}
  </g>;
}
// Gotita de aceite; forro 0..1 = cuántas moléculas de la yema ya la rodean.
function Gota({ x, y, r, forro = 0, o = 1 }) {
  const n = Math.max(8, Math.round((2 * Math.PI * r) / 22)), k = Math.round(n * forro);
  return <g opacity={o}>
    <circle cx={x} cy={y} r={r} fill={ACEITE} stroke={KC.ink} strokeWidth={Math.max(3, r / 14)} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.22} fill="#fff" opacity={0.5} />
    {Array.from({ length: k }, (_, i) => { const a = (i / n) * 2 * Math.PI, c = Math.cos(a), s = Math.sin(a), hr = Math.max(3.5, r * 0.09);
      return <g key={i}><line x1={x + c * r} y1={y + s * r} x2={x + c * (r - hr * 3)} y2={y + s * (r - hr * 3)} stroke={ACEITE_OSC} strokeWidth={Math.max(2, hr * 0.6)} strokeLinecap="round" />
        <circle cx={x + c * (r + hr * 0.4)} cy={y + s * (r + hr * 0.4)} r={hr} fill={CABEZA} stroke={KC.ink} strokeWidth={Math.max(1.5, hr * 0.3)} /></g>; })}
  </g>;
}
// Fosfolípido esquemático: cabeza (se lleva con el agua) + 2 colitas (se llevan con el aceite). ang: hacia dónde apuntan las colas.
function Fosfo({ x, y, ang = 90, s = 1, T = 0, o = 1 }) {
  const w = Math.sin(T * 6 + x) * 6;
  return <g transform={`translate(${x} ${y}) rotate(${ang - 90}) scale(${s})`} opacity={o}>
    <path d={`M -9 10 q ${8 + w} 22 0 44 q ${-8 - w} 22 0 44`} stroke={ACEITE_OSC} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d={`M 9 10 q ${-8 - w} 22 0 44 q ${8 + w} 22 0 44`} stroke={ACEITE_OSC} strokeWidth={8} fill="none" strokeLinecap="round" />
    <circle r={24} fill={CABEZA} stroke={KC.ink} strokeWidth={6} />
  </g>;
}
// Proteína esquemática: ovillo con un lado que se lleva con el agua (morado) y otro con el aceite (dorado).
function Proteina({ x, y, s = 1, ang = 0, o = 1 }) {
  return <g transform={`translate(${x} ${y}) rotate(${ang}) scale(${s})`} opacity={o}>
    <path d="M -50 0 Q -50 -40 0 -40 Q 50 -40 50 0 Z" fill={PROT} stroke={KC.ink} strokeWidth={6} />
    <path d="M -50 0 Q -50 36 0 36 Q 50 36 50 0 Z" fill={ACEITE} stroke={KC.ink} strokeWidth={6} />
    <path d="M -34 -14 q 14 -14 28 0 t 28 0" stroke={KC.ink} strokeWidth={4} fill="none" />
  </g>;
}
// Tazón visto de lado. estado: 0 vacío · 'ok' mayonesa · 'cortada' charco de aceite con grumos.
function Tazon({ x, y, s = 1, estado = 0, f = 1, num }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    {estado === 'ok' && <path d={`M -100 -50 Q -60 ${-50 - 70 * f} 0 ${-60 - 80 * f} Q 60 ${-50 - 70 * f} 100 -50 Z`} fill={MAYO} stroke={KC.ink} strokeWidth={6} />}
    {estado === 'cortada' && <g><ellipse cx={0} cy={-50} rx={108} ry={22} fill={ACEITE} stroke={KC.ink} strokeWidth={5} opacity={0.95} />
      {[-60, -20, 30, 70].map((dx, i) => <circle key={i} cx={dx} cy={-52 + (i % 2) * 6} r={9 + (i % 3) * 3} fill={MAYO} stroke={KC.ink} strokeWidth={3} opacity={f} />)}</g>}
    <path d="M -130 -50 L 130 -50 Q 120 60 0 64 Q -120 60 -130 -50 Z" fill={KC.white} stroke={KC.ink} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -100 -30 Q -90 30 -20 46" stroke="rgba(0,0,0,.12)" strokeWidth={14} fill="none" strokeLinecap="round" />
    {num != null && <g><circle cx={0} cy={10} r={28} fill={KC.ink} /><text x={0} y={22} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.white}>{num}</text></g>}
  </g>;
}
// Campo de gotitas apretadas (hexagonal, con tamaños un poco distintos).
function campoGotas(seed, x0, y0, w, h, r) {
  const R = krng(seed), out = [], dy = r * 1.78;
  for (let j = 0; j * dy < h + r; j++) for (let i = 0; (i - 0.5) * r * 2.05 < w + r; i++)
    out.push([x0 + i * r * 2.05 + (j % 2 ? r : 0) + (R() - 0.5) * 6, y0 + j * dy + (R() - 0.5) * 6, r * (0.82 + R() * 0.2), R() * 6]);
  return out;
}
function InteriorMayo({ forro, seed = 4 }) {
  return (T, r) => {
    const gs = campoGotas(seed, -20, -20, 2 * r + 40, 2 * r + 40, 46);
    return <svg width={2 * r} height={2 * r} style={{ position:'absolute', left:0, top:0 }}>
      <rect width={2 * r} height={2 * r} fill="#16304a" />
      {gs.map(([x, y, rr, ph], i) => <Gota key={i} x={x + Math.sin(T * 1.3 + ph) * 3} y={y + Math.cos(T * 1.1 + ph) * 3} r={rr} forro={forro} />)}
    </svg>;
  };
}

function Mayonesa() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, Q: CUES.Que, Pb: CUES.Problema, Y: CUES.Yema, Ec: CUES.Escudo, Ep: CUES.Espesa, Pr: CUES.Pregunta, Es: CUES.Estudio, Re: CUES.Resultado, Le: CUES.Ley, Ci: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // gancho: la cuchara entra al frasco y sale con la cucharada
  const sube = kprog(T, K.G + 0.35, K.G + 1.3, kEase.sale);
  const cx = klerp(250, 520, sube), cy = klerp(800, 700, sube) - Math.sin(sube * Math.PI) * 120;
  const R = krng(11);
  const gotasPb = Array.from({ length: 16 }, () => [380 + R() * 320, 820 + R() * 330, 18 + R() * 22, R() * 6]);
  const pPb = kprog(T, K.Pb + 0.8, K.Pb + 3.8, kEase.suave);
  const yA = K.Y + 1.7;                                    // la yema cae → zoom a las moléculas
  const pYm = (i) => kprog(T, yA + 0.4 + i * 0.18, yA + 1.2 + i * 0.18, kEase.sale);
  const escudoN = 22;
  const choque = K.Ec + 2.7;
  const sep = choque > T ? 0 : kprog(T, choque, choque + 0.8, kEase.sale);
  const vuelve = kprog(T, choque + 0.9, choque + 1.4, kEase.sale);
  const campo = campoGotas(7, -40, 420, 1160, 860, 45);
  const zEp = klerp(1.9, 1, kprog(T, K.Ep, K.Ep + 1.6, kEase.suave));
  const tazones = [[170, 800], [410, 800], [670, 800], [910, 800], [290, 1050], [540, 1050], [790, 1050]];
  const porciones = ['40 × 5 g', '20 × 10 g', '10 × 20 g', '6 × 30 g…', '5 × 40 g', '4 × 50 g', '200 g de golpe'];
  const diag = kprog(T, K.Re + 4.3, K.Re + 4.8);
  const voltea = kprog(T, K.Re + 5.0, K.Re + 5.8, kEase.suave);
  const nivelLey = T < K.Le + 3.0 ? 64 * kprog(T, K.Le + 0.5, K.Le + 2.2, kEase.sale) : klerp(64, 65, kprog(T, K.Le + 3.0, K.Le + 3.4));
  const okLey = T > K.Le + 3.4;
  const fl = (cxx, cyy, rr, aceiteFuera, key) => {
    const gs = campoGotas(3, cxx - rr, cyy - rr, 2 * rr, 2 * rr, 26).filter(([x, y]) => Math.hypot(x - cxx, y - cyy) < rr - 22);
    return <g key={key}><clipPath id={`cl${key}`}><circle cx={cxx} cy={cyy} r={rr} /></clipPath>
      <circle cx={cxx} cy={cyy} r={rr} fill={aceiteFuera ? ACEITE : AGUA} />
      <g clipPath={`url(#cl${key})`}>{gs.map(([x, y, r2], i) => i % 2 ? null : <circle key={i} cx={x} cy={y} r={r2 * 0.9} fill={aceiteFuera ? AGUA : ACEITE} stroke={KC.ink} strokeWidth={3} />)}</g>
      <circle cx={cxx} cy={cyy} r={rr} fill="none" stroke={KC.ink} strokeWidth={9} /></g>;
  };
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la cucharada de mayonesa y la lupa */}
      <Escena T={T} a={K.G} b={K.Q} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Frasco x={260} y={1200} s={1} hueco={sube} />
          <Cuchara x={cx} y={cy} rot={klerp(-60, -25, sube)} s={1.1} carga={sube} />
        </SvgCapa>
      </Escena>
      <Lupa T={T} at={K.G + 1.9} until={K.Q - 0.3} x={650} y={930} r={215} fx={520} fy={690} tinte={KC.orange} interior={InteriorMayo({ forro: 0 })} etiqueta="gotitas de aceite" />

      {/* 1 · qué tiene */}
      <Escena T={T} a={K.Q} b={K.Pb}>
        <FondoLunares color={KC.mint} />
        <SvgCapa>
          {(() => { const top = 660, bot = 1180, H = bot - top, oil = 0.8 * H * kprog(T, K.Q + 0.3, K.Q + 2.0, kEase.sale);
            const capas = [[YEMA, 0.09, K.Q + 2.6], [AGUA, 0.07, K.Q + 3.2], [VINAGRE, 0.04, K.Q + 3.8]];
            let yy = bot - oil; const out = [];
            capas.forEach(([c, f, t0], i) => { const h = f * H * kprog(T, t0, t0 + 0.4, kEase.sale); yy -= h; out.push(<rect key={i} x={386} y={yy} width={308} height={h} fill={c} />); });
            return <g>
              <rect x={386} y={bot - oil} width={308} height={oil} fill={ACEITE} />
              {out}
              {oil > 0 && <path d={`M 386 ${bot - oil} q 77 ${-10 + Math.sin(T * 5) * 6} 154 0 t 154 0`} stroke="rgba(255,255,255,.6)" strokeWidth={5} fill="none" />}
              <path d={`M 370 ${top - 20} L 380 ${top} L 380 ${bot - 10} Q 380 ${bot + 6} 396 ${bot + 6} L 684 ${bot + 6} Q 700 ${bot + 6} 700 ${bot - 10} L 700 ${top} L 710 ${top - 20}`} fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
              <Chorro T={T} x0={700} y0={540} x1={560} y1={bot - oil} color={ACEITE} o={1 - kprog(T, K.Q + 1.9, K.Q + 2.1)} ancho={22} />
            </g>; })()}
        </SvgCapa>
        <Etq T={T} at={K.Q + 1.0} until={K.Pb - 0.3} x={370} y={1000} lado="izq" texto="aceite ≈ 80 %" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Q + 2.7} until={K.Pb - 0.3} x={710} y={745} texto="yema" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Q + 3.3} until={K.Pb - 0.3} x={370} y={700} lado="izq" texto="agua" color={KC.ink} tam={30} />
        <Etq T={T} at={K.Q + 3.9} until={K.Pb - 0.3} x={710} y={660} texto="vinagre o limón" color={KC.ink} tam={30} />
      </Escena>

      {/* 2 · aceite y agua no se mezclan */}
      <Escena T={T} a={K.Pb} b={K.Y}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <g transform={`rotate(${Math.sin(T * 14) * 6 * (1 - kprog(T, K.Pb + 0.2, K.Pb + 1.2))} 540 1180)`}>
            <rect x={380} y={720 + 120 * pPb} width={320} height={460 - 120 * pPb} fill={AGUA} />
            <rect x={380} y={720} width={320} height={120 * pPb} fill={ACEITE} />
            {gotasPb.map(([x, y, r, ph], i) => { const p = kprog(T, K.Pb + 0.8 + (i % 6) * 0.25, K.Pb + 3.4 + (i % 4) * 0.15, kEase.suave);
              const mx = klerp(x, 540 + (i - 8) * 18, p * 0.6), my = klerp(y, 760, p);
              return p < 1 ? <circle key={i} cx={mx + Math.sin(T * 5 + ph) * 6} cy={my} r={r * (1 + p * 0.8)} fill={ACEITE} stroke={KC.ink} strokeWidth={4} opacity={1 - p * 0.6} /> : null; })}
            <path d="M 364 700 L 380 720 L 380 1166 Q 380 1180 396 1180 L 684 1180 Q 700 1180 700 1166 L 700 720 L 716 700" fill="none" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
          </g>
          <Onomato T={T} at={K.Pb + 1.6} until={K.Pb + 2.6} x={820} y={860} texto="¡blop!" color={ACEITE} tam={80} />
        </SvgCapa>
        <Etq T={T} at={K.Pb + 3.4} until={K.Y - 0.3} x={720} y={780} texto="aceite" color={KC.ink} tam={34} />
        <Etq T={T} at={K.Pb + 3.4} until={K.Y - 0.3} x={720} y={1050} texto="agua" color={KC.ink} tam={34} />
      </Escena>

      {/* 3 · entra la yema (macro) → sus moléculas en la orilla agua/aceite (micro) */}
      <Escena T={T} a={K.Y} b={yA}>
        <FondoLunares color={KC.orange} />
        <SvgCapa>
          <Tazon x={540} y={1120} s={2} />
          {(() => { const c = kprog(T, K.Y + 0.1, K.Y + 0.8, (p) => p * p); return <g>
            <ellipse cx={540} cy={klerp(560, 1010, c)} rx={88 + 30 * kprog(T, K.Y + 0.8, K.Y + 1.0)} ry={70 - 18 * kprog(T, K.Y + 0.8, K.Y + 1.0)} fill={YEMA} stroke={KC.ink} strokeWidth={8} />
            <ellipse cx={510} cy={klerp(535, 985, c)} rx={22} ry={14} fill="#fff" opacity={0.6} /></g>; })()}
          <Onomato T={T} at={K.Y + 0.8} until={yA} x={820} y={860} texto="¡plop!" color={KC.yellow} tam={80} />
        </SvgCapa>
      </Escena>
      <Escena T={T} a={yA} b={K.Ec}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <rect x={0} y={520} width={KW} height={340} fill="#1b4f8a" opacity={0.75} />
          <rect x={0} y={860} width={KW} height={320} fill={ACEITE_OSC} opacity={0.55} />
          <line x1={0} y1={860} x2={KW} y2={860} stroke="#fff" strokeWidth={4} strokeDasharray="16 12" opacity={0.6} />
          {Array.from({ length: 9 }, (_, i) => { const p = pYm(i), x = 100 + i * 110, prot = i % 3 === 1;
            const y0 = 580 + (i % 2) * 120, y = klerp(y0, prot ? 860 : 836, p);
            return prot ? <Proteina key={i} x={x} y={y} s={1} ang={klerp(80, 0, p)} /> : <Fosfo key={i} x={x} y={y} T={T} ang={klerp(200 + i * 20, 90, p)} />; })}
        </SvgCapa>
        <Etq T={T} at={yA + 0.3} until={K.Ec - 0.3} x={40} y={560} texto="agua" color={AGUA} tam={34} />
        <Etq T={T} at={yA + 0.3} until={K.Ec - 0.3} x={40} y={1130} texto="aceite" color={ACEITE} tam={34} />
        <Chip T={T} at={yA + 1.4} until={K.Ec - 0.2} texto="fosfolípidos + proteínas de la yema" y={1500} tam={36} borde={CABEZA} />
      </Escena>

      {/* 4 · el escudo en cada gotita */}
      <Escena T={T} a={K.Ec} b={K.Ep} zoom={0.02}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          {T < choque ? <g>
            <Gota x={540} y={900} r={220} forro={0} />
            {Array.from({ length: escudoN }, (_, i) => { const a = (i / escudoN) * 2 * Math.PI, p = kprog(T, K.Ec + 0.2 + i * 0.07, K.Ec + 0.9 + i * 0.07, kEase.sale);
              const rr = klerp(420, 232, p), deg = (a * 180) / Math.PI;
              return <Fosfo key={i} x={540 + Math.cos(a) * rr} y={900 + Math.sin(a) * rr} ang={klerp(deg + 120, deg + 180, p)} s={0.8} T={T} />; })}
          </g> : <g>
            {(() => { const d = klerp(560, 300, kprog(T, choque, choque + 0.7, kEase.suave)) + 160 * vuelve * kprog(T, choque + 0.7, choque + 1.4);
              return [-1, 1].map((sgn) => <Gota key={sgn} x={540 + sgn * d / 2} y={900} r={140} forro={1} />); })()}
          </g>}
          <Onomato T={T} at={choque + 0.75} until={K.Ep - 0.1} x={540} y={660} texto="¡toc!" color={KC.mint} tam={90} rot={0} />
        </SvgCapa>
        <Chip T={T} at={K.Ec + 1.2} until={K.Ep - 0.2} texto={sep > 0 ? 'chocan… y no se funden' : 'un escudo en la orilla'} y={1500} tam={40} borde={CABEZA} />
      </Escena>

      {/* 5 · apretadas = espesa */}
      <Escena T={T} a={K.Ep} b={K.Pr} zoom={0}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <SvgCapa>
          <g transform={`translate(540 860) scale(${zEp}) translate(-540 -860)`}>
            {campo.map(([x, y, r, ph], i) => { const emp = Math.max(0, 1 - Math.hypot(x - klerp(1180, 860, kprog(T, K.Ep + 1.8, K.Ep + 3.2)), y - 860) / 260);
              return <Gota key={i} x={x - emp * 14 + Math.sin(T * 2 + ph) * 1.5} y={y + Math.cos(T * 2 + ph) * 1.5} r={r} forro={1} />; })}
          </g>
          <Cuchara x={klerp(1180, 900, kprog(T, K.Ep + 1.8, K.Ep + 3.2))} y={860} rot={0} s={1.1} carga={0} />
        </SvgCapa>
        {T > K.Ep + 1.6 && <div style={{ position:'absolute', left:70, top:1440, zIndex:40, color:KC.texto, font:`700 28px ${KF.mono}`, textShadow:KSOMBRA, opacity:kprog(T, K.Ep + 1.6, K.Ep + 2.0) }}>
          <div style={{ marginBottom:8 }}>≈ 5 µm (de frasco)</div>
          <div style={{ width:82, height:8, background:KC.texto, borderRadius:4 }}></div></div>}
        <Chip T={T} at={K.Ep + 2.2} until={K.Pr - 0.2} texto="no hay espacio: casi no fluye" x={620} y={1500} tam={36} borde={ACEITE} />
      </Escena>

      {/* 6 · ¿por qué se corta? */}
      <Escena T={T} a={K.Pr} b={K.Es} zoom={0.1}>
        <FondoLunares color={KC.pink} />
        <SvgCapa>
          <Tazon x={640} y={1080} s={1.9} estado="cortada" />
          <text x={250} y={1100} textAnchor="middle" style={{ font:`400 480px ${KF.titulo}` }} fill={KC.yellow} stroke={KC.ink} strokeWidth={14} transform={`rotate(${Math.sin(T * 3) * 6} 250 900)`}>?</text>
        </SvgCapa>
      </Escena>

      {/* 7–8 · el estudio de 2024: siete mayonesas a mano */}
      <Escena T={T} a={K.Es} b={K.Le}>
        <FondoLunares color={KC.lilac} />
        <SvgCapa>
          <g opacity={1 - 0.75 * diag}>
            {tazones.map(([x, y], i) => { const ap = kprog(T, K.Es + 3.4 + i * 0.12, K.Es + 3.8 + i * 0.12, kEase.rebote);
              const ok = i < 2, t0 = ok ? K.Re + 0.3 + i * 0.5 : K.Re + 2.3 + (i - 2) * 0.32, f = kprog(T, t0, t0 + 0.9, kEase.sale);
              return ap > 0 ? <g key={i} transform={`translate(${x} ${y}) scale(${ap}) translate(${-x} ${-y})`}>
                {T > t0 && T < t0 + 0.9 && <Chorro T={T} x0={x + 70} y0={y - 230} x1={x} y1={y - 70} color={ACEITE} o={1} ancho={ok ? 8 : 26} />}
                <Tazon x={x} y={y} s={0.82} num={i + 1} estado={T > t0 ? (ok ? 'ok' : 'cortada') : 0} f={f} />
                {T > K.Re + 0.1 && <text x={x} y={y - 120} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, t0 - 0.3, t0)}>{porciones[i]}</text>}
                <Marca x={x + 80} y={y - 60} ok={ok} s={0.45} o={kprog(T, t0 + 0.9, t0 + 1.2)} />
              </g> : null; })}
          </g>
          {diag > 0 && <g opacity={diag}>
            <rect x={60} y={640} width={960} height={500} rx={40} fill="rgba(14,15,18,.85)" stroke={KC.ink} strokeWidth={8} />
            {fl(300, 870, 190, voltea > 0.5 ? false : false, 'a')}
            <path d="M 520 870 L 580 870" stroke={KC.texto} strokeWidth={14} strokeLinecap="round" />
            <path d="M 560 840 L 600 870 L 560 900" stroke={KC.texto} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <g opacity={voltea}>{fl(790, 870, 190, true, 'b')}</g>
            <text x={300} y={1110} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto}>aceite en agua ✓</text>
            <text x={790} y={1110} textAnchor="middle" style={{ font:`700 30px ${KF.mono}` }} fill={KC.texto} opacity={voltea}>agua en aceite ✗</text>
          </g>}
        </SvgCapa>
        <TarjetaEstudio T={T} at={K.Es + 0.7} until={K.Es + 3.2} anio="2024" quien="Ghaffari et al. · Países Bajos" revista="Physics of Fluids · 7 mayonesas a mano" y={900} />
        <Chip T={T} at={K.Es + 4.0} until={K.Re - 0.2} texto="20 g yema · 200 g aceite · 30 g vinagre" y={1500} tam={32} borde={KC.ink} />
        <Chip T={T} at={K.Re + 0.4} until={K.Re + 2.2} texto="poquito a poquito: salió" y={1500} tam={40} borde={KC.mint} />
        <Chip T={T} at={K.Re + 2.4} until={K.Re + 4.3} texto="mucho de golpe: se cortó" y={1500} tam={40} borde={KC.red} />
        <Chip T={T} at={K.Re + 4.6} until={K.Le - 0.2} texto="se volteó: el aceite quedó por fuera" y={1500} tam={34} borde={ACEITE} />
      </Escena>

      {/* 9 · la ley en EE. UU. */}
      <Escena T={T} a={K.Le} b={K.Ci} zoom={0.03}>
        <FondoLunares color={KC.cyan} />
        <SvgCapa>
          <Frasco x={360} y={1150} s={1.1} />
          <rect x={760} y={640} width={110} height={440} rx={20} fill="rgba(255,255,255,.5)" stroke={KC.ink} strokeWidth={8} />
          <rect x={768} y={1072 - 424 * nivelLey / 100} width={94} height={424 * nivelLey / 100} rx={14} fill={ACEITE} />
          <line x1={740} x2={890} y1={1072 - 424 * 0.65} y2={1072 - 424 * 0.65} stroke={KC.red} strokeWidth={6} strokeDasharray="14 8" />
          <text x={900} y={1072 - 424 * 0.65 + 12} style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink}>65 %</text>
          <text x={815} y={1140} textAnchor="middle" style={{ font:`700 40px ${KF.mono}` }} fill={KC.ink}>{Math.round(nivelLey)} %</text>
          <text x={815} y={1184} textAnchor="middle" style={{ font:`700 26px ${KF.mono}` }} fill={KC.ink}>aceite</text>
          {(() => { const o = okLey ? kprog(T, K.Le + 3.4, K.Le + 3.7, kEase.rebote) : kprog(T, K.Le + 2.3, K.Le + 2.6, kEase.rebote);
            return o > 0 ? <g transform={`translate(360 860) rotate(-12) scale(${klerp(1.6, 1, o)})`} opacity={Math.min(1, o)}>
              <rect x={-230} y={-60} width={460} height={120} rx={20} fill="none" stroke={okLey ? '#1a9b62' : KC.red} strokeWidth={12} />
              <text x={0} y={22} textAnchor="middle" style={{ font:`400 64px ${KF.titulo}` }} fill={okLey ? '#1a9b62' : KC.red}>{okLey ? '✓ MAYONESA' : '✗ NO ES MAYONESA'}</text></g> : null; })()}
        </SvgCapa>
        <Chip T={T} at={K.Le + 0.4} until={K.Ci - 0.2} texto="EE. UU. · FDA · 21 CFR 169.140" y={1500} tam={36} borde={KC.blue} />
      </Escena>

      {/* 10 · cierre: la cucharada del inicio, ahora vista por dentro */}
      <Escena T={T} a={K.Ci} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        <SvgCapa>
          <Frasco x={260} y={1200} s={1} hueco={1} />
          <Cuchara x={520} y={700} rot={-25} s={1.1} carga={1} />
        </SvgCapa>
      </Escena>
      <Lupa T={T} at={K.Ci + 0.6} until={K.Ou + 0.2} x={650} y={930} r={215} fx={520} fy={690} tinte={CABEZA} interior={InteriorMayo({ forro: 1 })} etiqueta="aceite + yema = emulsión" />

      {/* textos */}
      <MitoTachado T={T} at={K.G + 0.3} tacharEn={K.G + 1.5} until={K.G + 2.6} texto="¿pasta?" x={300} y={470} tam={54} />
      <Chip T={T} at={K.G + 2.8} until={K.Q - 0.3} texto="aceite en gotitas" x={320} y={470} tam={40} borde={ACEITE} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.Q - 0.1} texto="No es pasta: *es aceite.*" />
      <Subtitulo T={T} idx={1} at={K.Q + 0.1} until={K.Pb - 0.1} texto="Casi *80 % aceite.*" />
      <Subtitulo T={T} idx={2} at={K.Pb + 0.1} until={K.Y - 0.1} texto="Aceite y agua *no se mezclan.*" />
      <Subtitulo T={T} idx={3} at={K.Y + 0.1} until={K.Ec - 0.1} texto="La yema: *amiga de los dos.*" />
      <Subtitulo T={T} idx={4} at={K.Ec + 0.1} until={K.Ep - 0.1} texto="Un *escudo* en cada gotita." />
      <Subtitulo T={T} idx={5} at={K.Ep + 0.1} until={K.Pr - 0.1} texto="Apretadas: *por eso espesa.*" />
      <Subtitulo T={T} idx={6} at={K.Pr + 0.1} until={K.Es - 0.1} texto="¿Por qué *se corta?*" />
      <Subtitulo T={T} idx={7} at={K.Es + 0.1} until={K.Re - 0.1} texto="2024: *siete mayonesas a mano.*" />
      <Subtitulo T={T} idx={8} at={K.Re + 0.1} until={K.Le - 0.1} texto="Muy rápido: *se volteó.*" />
      <Subtitulo T={T} idx={9} at={K.Le + 0.1} until={K.Ci - 0.1} texto="EE. UU.: *mínimo 65 % aceite.*" />
      <Subtitulo T={T} idx={10} at={K.Ci + 0.1} until={K.Ou - 0.1} texto="Gotitas de aceite *y yema.*" />

      <Robert T={T} apariciones={[
        [CUES.Gancho - 0.45, CUES.Gancho + 4.6, 'avatar_11_sorprendido', 'gancho'],
        [CUES.Que + 1.0, CUES.Problema - 0.3, 'avatar_13_senalando_arriba', 'izq-alto'],
        [CUES.Yema + 2.0, CUES.Escudo - 0.3, 'avatar_06_pensativo_menton', 'arriba-der'],
        [CUES.Espesa + 0.3, CUES.Pregunta - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'izq-alto'],
        [CUES.Pregunta + 0.05, CUES.Estudio + 0.6, 'avatar_07_pensativo_puno', 'grande'],
        [CUES.Estudio + 3.4, CUES.Resultado - 0.3, 'avatar_04_bajando_lentes', 'arriba-der'],
        [CUES.Resultado + 2.4, CUES.Ley - 0.3, 'avatar_10_serio_molesto', 'izq-alto'],
        [CUES.Ley + 0.3, CUES.Cierre - 0.3, 'avatar_11_sorprendido', 'arriba-der'],
        [CUES.Cierre + 0.3, CUES.Outro - 0.1, 'avatar_02_apuntando_camara', 'izq-alto']]} />
      <MarcaAgua T={T} tema="quimica" num="40" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="quimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function MayonesaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><Mayonesa /></CompositionStage></div>;
}
window.MayonesaApp = MayonesaApp;
