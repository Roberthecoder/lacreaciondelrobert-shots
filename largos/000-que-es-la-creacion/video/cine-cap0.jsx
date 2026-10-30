// cine-cap0.jsx — escenas de cine del capítulo 0 (gancho): el frijolito y las semillas de la cocina.
// Cada escena: { cam: { z0, z1, fx, fy, x0, x1, y0, y1 }, dibuja({ p, tl, T, v, capa }) }.
// capa(prof) devuelve la transformación de cámara para una capa a esa profundidad (0 = fondo lejano, 1 = sujeto, >1 = primer plano).

const ILUSC = window.ILUSC;

/* ---------- el experimento del frijolito: time-lapse dentro del frasco, al amanecer ---------- */
function Algodon({ x, y, w, h, seed = 5, mojado = 0.5 }) {
  const r = R(seed), motas = [];
  for (let i = 0; i < 150; i++) { const bx = x + r() * w, by = y + h * (0.08 + Math.pow(r(), 0.7) * 0.92), br = 16 + r() * 26; motas.push([bx, by, br, r()]); }
  motas.sort((a, b) => a[1] - b[1]);
  const fibras = Array.from({ length: 90 }, () => { const fx = x + r() * w, fy = y + h * (0.05 + r() * 0.95), a = r() * 6.28, L = 14 + r() * 30; return [fx, fy, a, L]; });
  return <g>
    <path d={`M ${x - 10} ${y + h + 40} L ${x - 10} ${y + h * 0.3} Q ${x + w * 0.2} ${y + h * 0.05} ${x + w * 0.45} ${y + h * 0.16} Q ${x + w * 0.75} ${y} ${x + w + 10} ${y + h * 0.25} L ${x + w + 10} ${y + h + 40} Z`} fill="#e6eaea" filter="url(#c-b8)" />
    <g filter="url(#c-b2)">{motas.map(([bx, by, br, v], i) => {
      const c = mix('#fbf9f4', '#c7d3d8', ((by - y) / h) * mojado * 0.9);
      return <g key={i}><circle cx={bx} cy={by} r={br} fill={c} /><circle cx={bx + br * 0.15} cy={by + br * 0.3} r={br * 0.9} fill="#8fa3ab" opacity={0.12} /><circle cx={bx - br * 0.25} cy={by - br * 0.3} r={br * 0.5} fill="#fff" opacity={0.5} /></g>;
    })}</g>
    {fibras.map(([fx, fy, a, L], i) => <path key={i} d={`M ${fx} ${fy} q ${Math.cos(a) * L * 0.5 + 4} ${Math.sin(a) * L * 0.5 - 4} ${Math.cos(a) * L} ${Math.sin(a) * L}`} stroke="#fff" strokeOpacity={0.55} strokeWidth={1} fill="none" />)}
  </g>;
}
function Raiz({ x, y, g, seed = 3, s = 1 }) {
  if (g <= 0) return null;
  const r = R(seed), L = 260 * g * s;
  const pts = Array.from({ length: 9 }, (_, i) => [x + Math.sin(i * 0.9 + seed) * 10 * s * (i / 8), y + (L * i) / 8]);
  const d = 'M ' + pts.map((q) => q.join(' ')).join(' L ');
  const lat = Math.floor(kclamp((g - 0.35) / 0.65, 0, 1) * 6);
  return <g>
    <path d={d} stroke="#e9dcc0" strokeWidth={9 * s} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d={d} stroke="#fff8ea" strokeWidth={3 * s} fill="none" strokeLinecap="round" opacity={0.8} transform="translate(-2 0)" />
    {/* pelitos absorbentes cerca de la punta */}
    {Array.from({ length: 26 }, (_, i) => { const k = 0.55 + (i / 26) * 0.4, px = lerp(pts[Math.floor(k * 8)][0], pts[Math.min(8, Math.ceil(k * 8))][0], 0.5), py = y + L * k, sd = i % 2 ? 1 : -1;
      return <path key={i} d={`M ${px} ${py} l ${sd * (8 + r() * 10) * s} ${(r() - 0.3) * 6}`} stroke="#fbf6ea" strokeWidth={1.2} opacity={0.75 * kclamp(g * 2 - 0.4, 0, 1)} />; })}
    {Array.from({ length: lat }, (_, i) => { const k = 0.18 + i * 0.12, py = y + L * k, sd = i % 2 ? 1 : -1, ll = (40 + r() * 40) * s * kclamp(g * 1.5 - k, 0, 1);
      return <path key={'l' + i} d={`M ${x} ${py} q ${sd * ll * 0.5} ${ll * 0.1} ${sd * ll} ${ll * 0.55}`} stroke="#eadfc6" strokeWidth={4 * s} fill="none" strokeLinecap="round" />; })}
  </g>;
}
function Gotitas({ x, y, w, h, n = 70, seed = 8, o = 1 }) {
  const r = R(seed);
  return <g opacity={o}>{Array.from({ length: n }, (_, i) => { const gx = x + r() * w, gy = y + Math.pow(r(), 1.6) * h, gr = 2 + r() * 6;
    return <g key={i}><ellipse cx={gx} cy={gy} rx={gr} ry={gr * 1.1} fill="#dbeef2" opacity={0.25} /><ellipse cx={gx} cy={gy + gr * 0.25} rx={gr} ry={gr * 0.9} fill="none" stroke="#2f5560" strokeOpacity={0.25} strokeWidth={1} />
      <circle cx={gx - gr * 0.35} cy={gy - gr * 0.35} r={gr * 0.3} fill="#fff" opacity={0.9} /></g>; })}</g>;
}
ILUSC.frijolito = {
  cam: { z0: 1.75, z1: 1.0, fx: 1000, fy: 600 },
  dibuja: ({ p, tl, capa }) => {
    const g = cpr(p, 0.04, 0.74);            // crecimiento (time-lapse)
    const am = cpr(p, 0, 0.9);               // amanecer
    const dia = 1 + Math.floor(g * 8);
    const cielo1 = mix('#131c33', '#6f9bd0', am), cielo2 = mix('#c8693a', '#ffe0ae', am);
    const sol = lerp(820, 470, am);
    const bx = 1010, by = 640;               // frijol pegado al vidrio
    return <g>
      {/* fondo: ventana al amanecer, todo fuera de foco */}
      <g transform={capa(0.25)}>
        <linearGradient id="c-fr-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={cielo1} /><stop offset="1" stopColor={cielo2} /></linearGradient>
        <rect x={-200} y={-200} width={2320} height={1100} fill="url(#c-fr-cielo)" />
        <Halo x={1500} y={sol} r={260} color="#ffd38a" o={0.9} />
        <circle cx={1500} cy={sol} r={70} fill="#fff1c9" filter="url(#c-b8)" />
        <Desenfoque b={14}>
          {Array.from({ length: 14 }, (_, i) => <rect key={i} x={-200 + i * 170} y={560 - (i % 3) * 60 - (i % 2) * 30} width={150} height={400} fill={mix('#1a2236', '#4a5a74', am * 0.6)} />)}
          {Array.from({ length: 6 }, (_, i) => <circle key={'a' + i} cx={100 + i * 380} cy={560} r={120 + (i % 2) * 50} fill={mix('#142018', '#36503a', am * 0.6)} />)}
        </Desenfoque>
        <Bokeh n={14} seed={3} t={tl} o={0.55 * (1 - am * 0.5)} colores={['#ffcf7a', '#ffe6b0', '#ffb070']} y={380} h={300} />
        {/* marco de la ventana */}
        <Desenfoque b={8}><rect x={-200} y={-200} width={2320} height={60} fill="#2a1d14" /><rect x={940} y={-200} width={46} height={1100} fill="#2a1d14" opacity={0.9} /></Desenfoque>
      </g>
      <Rayos x={1600} y={300} ang={158} abre={26} largo={1700} n={7} ancho={110} o={0.35 + 0.5 * am} t={tl} seed={5} />
      {/* repisa de la ventana con más macetas (se revelan al alejarse la cámara) */}
      <g transform={capa(0.85)}>
        <Tablon x={-200} y={826} w={2320} prof={46} grosor={34} madera="clara" />
        <rect x={-200} y={906} width={2320} height={400} fill="#3a2d26" /><rect x={-200} y={906} width={2320} height={400} fill="url(#c-papel-a)" opacity={0.6} />
        <g filter="url(#c-b2)">
          <MacetaC x={330} y={850} w={170} h={150}><HierbaOlor x={0} y={-135} s={0.8} t={tl} seed={4} /></MacetaC>
          <MacetaC x={590} y={850} w={130} h={115}><PlantulaFrijol x={0} y={-100} g={0.9} t={tl} s={0.8} seed={6} /></MacetaC>
          <MacetaC x={1380} y={850} w={140} h={120} tipo="plastico" color="#2d6a8f"><MataJitomate x={0} y={-105} s={0.55} t={tl} seed={2} /></MacetaC>
          <MacetaC x={1640} y={850} w={180} h={150}><HierbaOlor x={0} y={-135} s={0.85} t={tl} seed={9} tipo="hierbabuena" /></MacetaC>
        </g>
      </g>
      {/* el frasco del experimento */}
      <g transform={capa(1)}>
        <Frasco id="frijolito" x={960} y={850} w={380} h={500} contenido={null} abierto tapa="" luz="der" ventana
          interior={<g>
            {/* agua en el fondo */}
            <rect x={770} y={790} width={380} height={70} fill="#9cc9d6" opacity={0.35} />
            <path d={`M 770 790 Q 960 ${786 + Math.sin(tl * 2) * 2} 1150 790`} stroke="#fff" strokeOpacity={0.6} strokeWidth={2} fill="none" />
            <Algodon x={780} y={520} w={360} h={300} seed={4} />
            {/* raíz y frijol pegados al vidrio */}
            <Raiz x={bx - 6} y={by + 18} g={cpr(g, 0.02, 0.8)} s={1.2} />
            <g transform={`translate(${bx} ${by})`}>
              <Semilla tipo="frijol" x={0} y={0} s={3.3} rot={-12} var={0.35} />
              {g > 0.04 && <path d="M -30 -18 Q -6 -6 28 -22" stroke="#4a2a18" strokeWidth={3} fill="none" opacity={kclamp(g * 8, 0, 1)} />}
            </g>
            <Gotitas x={790} y={420} w={330} h={260} n={60} seed={2} o={0.9} />
          </g>} />
        {/* la plántula sale del frasco */}
        <PlantulaFrijol x={bx + 4} y={by - 26} g={cpr(g, 0.12, 1)} t={tl} s={1.75} seed={3} />
      </g>
      {/* primer plano fuera de foco */}
      <g transform={capa(1.5)}><Desenfoque b={24} o={0.85}>
        <Hoja x={-60} y={1120} len={420} w={0.42} ang={-62} color="#2b5d2a" venas={0} />
        <Hoja x={2000} y={1140} len={380} w={0.4} ang={-118} color="#24502a" venas={0} />
      </Desenfoque></g>
      <Polvo n={70} t={tl} seed={11} o={0.4 + 0.5 * am} />
      <Tinte color="#ff9c4a" o={0.18 * (1 - am * 0.4)} />
      {/* contador del time-lapse */}
      <g opacity={cpop(p, 0.02, 0.1) * (1 - cpr(p, 0.8, 0.9))}>
        <text x={1790} y={96} textAnchor="end" fontFamily={FUENTE.mono} fontWeight={700} fontSize={26} letterSpacing={4} fill="#fff" opacity={0.85}>TIME-LAPSE</text>
        <text x={1790} y={150} textAnchor="end" fontFamily={FUENTE.serif} fontWeight={600} fontSize={52} fill="#fff">Día {dia}</text>
        <rect x={1490} y={168} width={300} height={4} fill="#fff" opacity={0.25} /><rect x={1490} y={168} width={300 * g} height={4} fill="#F4C25A" />
      </g>
      <Rotulo x={120} y={110} arriba="EL EXPERIMENTO" texto="del frijolito" tl={tl} at={0.5} />
    </g>;
  },
};

/* ---------- a los tres años: las semillas "prestadas" de la cocina ---------- */
ILUSC.semillas_cocina = {
  cam: { z0: 1.02, z1: 1.1, fx: 1100, fy: 620, x0: -24, x1: 24 },
  dibuja: ({ p, tl, capa, dur }) => {
    const sube = cpr(p, 0.06, 0.22, kEase.suave);        // el niño se asoma por la barra
    const alcanza = cpr(p, 0.24, 0.38, kEase.suave);     // estira el brazo a los frijoles
    const levanta = cpr(p, 0.42, 0.5, kEase.suave);      // levanta la mano
    const vuela = cpr(p, 0.5, 0.62);                     // el frijol vuela a la maceta
    const crece = cpr(p, 0.64, 0.97);                    // time-lapse del brote
    const kidX = 1720, kidY = lerp(1080, 905, sube);
    const ang = levanta > 0 ? lerp(100, 150, levanta) : lerp(0, 100, alcanza);
    // posición de la mano izquierda (lado de la pantalla izquierdo), misma geometría que Nene (s=1.25, edad 3)
    const s = 1.25, shX = kidX - 52 * s, shY = kidY + (-150 + 18) * s, lb = 100 * s;
    const th = (ang * Math.PI) / 180, mano = [shX - Math.sin(th) * lb, shY + Math.cos(th) * lb];
    const pot = [430, 640];
    const fx = lerp(mano[0], pot[0], vuela), fy = lerp(mano[1], pot[1], vuela) - Math.sin(vuela * Math.PI) * 300;
    return <g>
      {/* pared, ventana y luz */}
      <g transform={capa(0.55)}>
        <Pared color="#efe0c4" luz={[0.15, 0.25]} />
        <Azulejo x={-100} y={330} w={2120} h={420} seed={6} talavera={0.14} />
        <rect x={-100} y={326} width={2120} height={8} fill="#cdbb9b" />
        {/* ventana */}
        <g>
          <rect x={90} y={80} width={560} height={560} fill="#e8d6b4" />
          <linearGradient id="c-sc-cielo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9cc8ee" /><stop offset="1" stopColor="#fff1d2" /></linearGradient>
          <rect x={120} y={110} width={500} height={500} fill="url(#c-sc-cielo)" />
          <Desenfoque b={10}>
            <circle cx={230} cy={470} r={140} fill="#7aa35a" /><circle cx={420} cy={520} r={170} fill="#5f8f4a" /><circle cx={600} cy={430} r={110} fill="#86ad62" />
            <rect x={120} y={540} width={500} height={80} fill="#c9b08a" />
          </Desenfoque>
          <Halo x={300} y={220} r={240} color="#fff7df" o={0.9} />
          <rect x={360} y={110} width={20} height={500} fill="#f3ecdd" /><rect x={120} y={350} width={500} height={20} fill="#f3ecdd" />
          <rect x={120} y={110} width={500} height={500} fill="none" stroke="#d6c7a8" strokeWidth={10} />
          {/* cortina con pliegues */}
          <path d={`M 70 60 L 250 60 Q ${230 + mece(tl, 2, 0.4) * 8} 360 ${200 + mece(tl, 2, 0.4) * 12} 660 L 70 660 Z`} fill="#e5574a" />
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${100 + i * 38} 60 Q ${96 + i * 34 + mece(tl, 2, 0.4) * 6} 360 ${92 + i * 30 + mece(tl, 2, 0.4) * 10} 660`} stroke="#000" strokeOpacity={0.18} strokeWidth={10} fill="none" filter="url(#c-b4)" />)}
          {[0, 1, 2, 3].map((i) => <path key={'b' + i} d={`M ${118 + i * 38} 60 Q ${114 + i * 34} 360 ${110 + i * 30} 660`} stroke="#fff" strokeOpacity={0.12} strokeWidth={6} fill="none" />)}
          <rect x={50} y={52} width={640} height={14} rx={7} fill="url(#c-laton)" />
        </g>
        {/* repisa alta con barro */}
        <Tablon x={760} y={196} w={1260} prof={20} grosor={22} madera="oscura" />
        <g transform="translate(1290 196)"><path d="M -60 0 Q -78 -60 -40 -96 L 40 -96 Q 78 -60 60 0 Z" fill="url(#c-barro)" /><rect x={-46} y={-108} width={92} height={16} rx={6} fill="url(#c-barro-borde)" /><path d="M -56 -40 Q 0 -30 56 -40" stroke="#f1d6a8" strokeWidth={4} fill="none" opacity={0.7} /></g>
        {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${1420 + i * 70} 196)`}><path d="M -26 0 Q -34 -34 -22 -60 L 22 -60 Q 34 -34 26 0 Z" fill="url(#c-barro)" /><path d="M 22 -46 q 22 4 16 26 q -6 10 -14 6" stroke="#9a4a26" strokeWidth={6} fill="none" /></g>)}
        <g transform="translate(1765 196)"><rect x={-70} y={-150} width={140} height={150} rx={8} fill="#2a5aa8" /><rect x={-70} y={-150} width={140} height={150} rx={8} fill="url(#c-cilindro)" /><text x={0} y={-62} textAnchor="middle" fontFamily={FUENTE.serif} fontWeight={700} fontSize={30} fill="#f6e9c9">AVENA</text></g>
        {/* ristra de chiles secos */}
        <g transform={`translate(1890 196) rotate(${mece(tl, 5, 0.4) * 2})`}><path d="M 0 0 L 0 300" stroke="#b08a52" strokeWidth={4} />
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M ${(i % 2 ? 6 : -6)} ${30 + i * 22} q ${(i % 2 ? 1 : -1) * 34} 8 ${(i % 2 ? 1 : -1) * 52} 34`} stroke={i % 3 ? '#7a1712' : '#5a0f0c'} strokeWidth={14} strokeLinecap="round" fill="none" />)}</g>
      </g>
      <Rayos x={420} y={260} ang={28} abre={22} largo={1700} n={6} ancho={120} o={0.75} t={tl} seed={8} />
      {/* barra: el niño se asoma detrás */}
      <g transform={capa(1)}>
        <Nene x={kidX} y={kidY} s={s} edad={3} t={tl} playera="#e8742a" brazoI={ang} brazoD={6} cuerpo="busto"
          mira={[-1, vuela > 0 && vuela < 1 ? -0.6 : 0.4]} boca={crece > 0.4 ? 'risa' : vuela > 0 && vuela < 1 ? 'o' : 'sonrisa'} seed={2} />
        {/* frijol en la mano */}
        {levanta > 0 && vuela <= 0 && <Semilla tipo="frijol" x={mano[0]} y={mano[1] - 12} s={1.2} rot={20} />}
        <Tablon x={-100} y={738} w={2120} prof={34} grosor={30} madera="media" />
        {/* puertas de la alacena */}
        {[0, 1, 2, 3, 4, 5].map((i) => <Puerta key={i} x={-60 + i * 340} y={802} w={330} h={320} madera="media" jal={i % 2 ? 'izq' : 'der'} />)}
        <rect x={-100} y={802} width={2120} height={30} fill="#000" opacity={0.3} filter="url(#c-b8)" />
        {/* frascos de mamá */}
        <Frasco id="sc-maiz" x={665} y={742} w={215} h={330} contenido="maiz" tapa="oro" etiqueta="maíz" seed={3} nivel={0.78} />
        <Frasco id="sc-lenteja" x={890} y={742} w={200} h={300} contenido="lenteja" tapa="roja" etiqueta="lenteja" seed={5} nivel={0.7} />
        <Frasco id="sc-garbanzo" x={1110} y={742} w={210} h={315} contenido="garbanzo" tapa="trapo" etiqueta="garbanzo" seed={7} nivel={0.66} />
        {/* el frasco de frijol, tumbado, con frijoles regados */}
        <g transform={`translate(1232 ${742 - 96}) rotate(90)`}>
          <Frasco id="sc-frijol" x={0} y={0} w={192} h={280} contenido={null} abierto etiqueta="frijol" seed={9} sombra={false} ventana={false}
            interior={<g transform="rotate(-90)"><Monton tipo="frijol" x={6} y={8} w={262} h={86} seed={12} nivel={1} s={0.9} /></g>} />
        </g>
        <Sombra x={1380} y={748} rx={170} ry={10} o={0.5} b="c-b8" />
        <Tapa x={1640} y={758} w={170} />
        {Array.from({ length: 14 }, (_, i) => { const r = R(40 + i); const sx = 1505 + r() * 110 - (alcanza > 0.9 && i < 3 ? 999 : 0), sy = 738 - r() * 6; return sx > 0 && <Semilla key={i} tipo="frijol" x={sx} y={sy} s={0.95} rot={r() * 360} var={r()} />; })}
        {/* maceta junto a la ventana */}
        <MacetaC x={pot[0]} y={744} w={150} h={120}>
          <PlantulaFrijol x={0} y={-104} g={crece} t={tl} s={0.95} seed={4} />
        </MacetaC>
        {vuela > 0 && vuela < 1 && <g><Semilla tipo="frijol" x={fx} y={fy} s={1.2} rot={vuela * 720} />
          {[1, 2, 3].map((k) => <circle key={k} cx={lerp(mano[0], pot[0], Math.max(0, vuela - k * 0.04))} cy={lerp(mano[1], pot[1], Math.max(0, vuela - k * 0.04)) - Math.sin(Math.max(0, vuela - k * 0.04) * Math.PI) * 300} r={8 - k * 2} fill="#fff" opacity={0.3 / k} />)}</g>}
      </g>
      {/* primer plano: albahaca fuera de foco */}
      <g transform={capa(1.45)}><Desenfoque b={14} o={0.95}><HierbaOlor x={120} y={1180} s={2.4} t={tl} seed={12} /></Desenfoque></g>
      <Polvo n={60} t={tl} seed={21} o={0.75} x={100} y={150} w={1100} h={700} />
      <NotaMano x={250} y={280} texto="¿qué saldrá?" tl={tl} at={0.66 * dur} tam={60} color="#fff" rot={-6} o={cpop(p, 0.64)} />
      <Rotulo x={760} y={66} arriba="A LOS TRES AÑOS" texto="La cocina de mamá" tl={tl} at={0.4} tam={52} />
    </g>;
  },
};
