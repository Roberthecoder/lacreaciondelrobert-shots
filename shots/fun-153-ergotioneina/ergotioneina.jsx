// Shot Fungi Mati #153 · Tus células tienen una puerta especial para una molécula de los hongos — NARRADO (N1 Por dentro).
// Guion y fuentes: guion.md · verificacion.md. El dibujo es esquemático. No es consejo médico.

const EG = { oro:'#F4C25A', oro2:'#E8A62A', azufre:'#ffe11a', memb:'#f2a7c3', memb2:'#c96a93', prot:'#b18cff', prot2:'#6d4bd1',
  tortilla:'#f3d58a', tortilla2:'#d9a94e', comal:'#2b2622', hongo:'#efe2cc', cafe:'#7a4a22', sangre:'#e23b3b' };

// Molécula de ergotioneína (esquemática): anillo de imidazol con el AZUFRE, cadena y la "cabeza" con N y tres metilos.
function EgMolecula({ x, y, s = 1, rot = 0, p = 1 }) {
  const pent = Array.from({ length: 5 }, (_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; return [70 * Math.cos(a), 70 * Math.sin(a)]; });
  const d = 'M ' + pent.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join(' L ') + ' Z';
  const k = (i) => kclamp(p * 5 - i, 0, 1);
  return <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
    <path d={d} fill="rgba(255,255,255,.12)" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" opacity={k(0)} />
    {[[pent[1], 'N'], [pent[4], 'N']].map(([q, t], i) => <g key={i} opacity={k(0)}><circle cx={q[0]} cy={q[1]} r={24} fill={KC.blue} stroke={KC.ink} strokeWidth={5} />
      <text x={q[0]} y={q[1] + 10} textAnchor="middle" style={{ font:`700 28px ${KF.mono}` }} fill="#fff">{t}</text></g>)}
    {/* azufre (S) pegado al carbono entre los dos N */}
    <g opacity={k(1)}><line x1={pent[0][0]} y1={pent[0][1]} x2={pent[0][0]} y2={pent[0][1] - 80} stroke={KC.ink} strokeWidth={9} />
      <line x1={pent[0][0] + 12} y1={pent[0][1]} x2={pent[0][0] + 12} y2={pent[0][1] - 70} stroke={KC.ink} strokeWidth={6} />
      <circle cx={pent[0][0] + 6} cy={pent[0][1] - 110} r={40} fill={EG.azufre} stroke={KC.ink} strokeWidth={7} />
      <text x={pent[0][0] + 6} y={pent[0][1] - 96} textAnchor="middle" style={{ font:`400 46px ${KF.titulo}` }} fill={KC.ink}>S</text></g>
    {/* cadena hacia la cabeza */}
    <path d={`M ${pent[2][0]} ${pent[2][1]} L ${pent[2][0] + 70} ${pent[2][1] + 60} L ${pent[2][0] + 160} ${pent[2][1] + 30}`} stroke={KC.ink} strokeWidth={9} fill="none" opacity={k(2)} />
    <g opacity={k(3)} transform={`translate(${pent[2][0] + 200} ${pent[2][1] + 40})`}>
      <circle r={34} fill={KC.blue} stroke={KC.ink} strokeWidth={6} /><text y={12} textAnchor="middle" style={{ font:`700 32px ${KF.mono}` }} fill="#fff">N⁺</text>
      {[[-10, -80], [70, -30], [40, 70]].map(([a, b], i) => <g key={i}><line x1={0} y1={0} x2={a * 0.7} y2={b * 0.7} stroke={KC.ink} strokeWidth={7} />
        <circle cx={a} cy={b} r={20} fill="#d9d4c7" stroke={KC.ink} strokeWidth={5} /></g>)}
      <line x1={0} y1={30} x2={-30} y2={110} stroke={KC.ink} strokeWidth={8} />
      <circle cx={-34} cy={130} r={22} fill={KC.red} stroke={KC.ink} strokeWidth={5} />
    </g>
  </g>;
}
// Bolita de ergotioneína (la "molécula" en las escenas grandes): dorada con su S.
function EgBola({ x, y, r = 18, o = 1, brillo = 0 }) {
  return <g transform={`translate(${x} ${y})`} opacity={o} style={brillo ? { filter:`drop-shadow(0 0 ${10 * brillo}px ${EG.oro})` } : null}>
    <circle r={r} fill={EG.oro} stroke={KC.ink} strokeWidth={Math.max(3, r * 0.2)} />
    {r >= 16 && <text y={r * 0.38} textAnchor="middle" style={{ font:`700 ${r * 1.05}px ${KF.mono}` }} fill={KC.ink}>S</text>}
  </g>;
}
// Otras moléculas (las que rebotan): bolitas grises/azules.
function EgOtra({ x, y, r = 16, color = '#8fb6ff' }) { return <circle cx={x} cy={y} r={r} fill={color} stroke={KC.ink} strokeWidth={4} />; }

// Quesadilla de champiñones en un comal. dobla 0..1 (la tortilla se cierra). Centro en (x, y).
function EgQuesadilla({ T, x, y, s = 1, dobla = 1, vapor = 1 }) {
  const ang = klerp(-150, 0, kEase.sale(kclamp(dobla, 0, 1)));
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={60} rx={400} ry={110} fill={EG.comal} stroke={KC.ink} strokeWidth={10} />
    <ellipse cx={0} cy={50} rx={360} ry={88} fill="#3a332d" />
    {/* mitad de abajo de la tortilla con el relleno */}
    <path d="M -280 40 A 280 90 0 0 0 280 40 Z" fill={EG.tortilla} stroke={KC.ink} strokeWidth={8} />
    {[-190, -100, -10, 80, 170].map((dx, i) => <g key={i} transform={`translate(${dx} ${30 + (i % 2) * 14}) rotate(${-10 + i * 6})`}>
      <path d="M -36 0 Q -36 -34 0 -36 Q 36 -34 36 0 Z" fill={EG.hongo} stroke={KC.ink} strokeWidth={5} />
      <rect x={-9} y={-2} width={18} height={22} rx={6} fill="#f6eedf" stroke={KC.ink} strokeWidth={4} />
      {[-20, -8, 8, 20].map((l) => <line key={l} x1={l} y1={-4} x2={l * 0.9} y2={-14} stroke="#7a4a3a" strokeWidth={3} />)}
    </g>)}
    {/* mitad de arriba que se dobla sobre la otra (bisagra en el borde) */}
    <g transform={`translate(0 40) scale(1 ${Math.cos(ang * Math.PI / 180)})`}>
      <path d="M -280 0 A 280 90 0 0 1 280 0 Z" fill={dobla >= 0.5 ? EG.tortilla : EG.tortilla2} stroke={KC.ink} strokeWidth={8} />
      {dobla >= 0.5 && [[-140, -30], [30, -50], [160, -22], [-40, -18]].map(([a, b], i) => <ellipse key={i} cx={a} cy={b} rx={26} ry={12} fill="#c0812f" opacity=".55" />)}
    </g>
    {vapor > 0 && [-150, 0, 150].map((dx, i) => { const u = ((T * 0.6 + i * 0.33) % 1);
      return <path key={i} d={`M ${dx} ${-60 - u * 160} q 24 -30 0 -60 q -24 -30 0 -60`} stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" opacity={vapor * (1 - u) * 0.8} />; })}
  </g>;
}
// Célula esquemática con UNA puerta en la membrana (arriba a la derecha). abierta 0..1 = brilla.
function EgCelula({ T, x, y, r = 230, abierta = 0, entra = 0 }) {
  const pa = -0.6; // ángulo de la puerta
  const px = r * Math.cos(pa), py = r * Math.sin(pa);
  return <g transform={`translate(${x} ${y})`}>
    <circle r={r} fill="rgba(255,240,245,.9)" stroke={EG.memb2} strokeWidth={26} />
    <circle r={r} fill="none" stroke={KC.ink} strokeWidth={6} />
    <circle cx={-50} cy={30} r={70} fill="#d9c2ff" stroke={KC.ink} strokeWidth={6} />
    <g transform={`translate(${px} ${py}) rotate(${pa * 57.3 + 90})`} style={abierta ? { filter:`drop-shadow(0 0 ${18 * abierta}px ${EG.oro})` } : null}>
      <rect x={-46} y={-30} width={36} height={60} rx={12} fill={EG.prot} stroke={KC.ink} strokeWidth={6} />
      <rect x={10} y={-30} width={36} height={60} rx={12} fill={EG.prot} stroke={KC.ink} strokeWidth={6} />
    </g>
    {entra > 0 && Array.from({ length: 5 }, (_, i) => { const u = kclamp(entra * 1.6 - i * 0.15, 0, 1); if (u <= 0) return null;
      const ox = px * 1.6, oy = py * 1.6, ix = -40 + i * 26, iy = -60 + (i % 2) * 70;
      const bx = u < 0.5 ? klerp(ox, px, u * 2) : klerp(px, ix, (u - 0.5) * 2), by = u < 0.5 ? klerp(oy, py, u * 2) : klerp(py, iy, (u - 0.5) * 2);
      return <EgBola key={i} x={bx} y={by} r={18} brillo={abierta} />; })}
  </g>;
}
// Fábrica (para "la fabrica / no la fabrica"). tache 0..1 = ✗ roja; ok = ✓ verde.
function EgFabrica({ x, y, s = 1, tache = 0, ok = 0 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -70 40 L -70 -20 L -30 -50 L -30 -20 L 10 -50 L 10 -20 L 50 -50 L 50 40 Z" fill="#f4efe4" stroke={KC.ink} strokeWidth={6} strokeLinejoin="round" />
    <rect x={30} y={-90} width={18} height={40} fill="#f4efe4" stroke={KC.ink} strokeWidth={5} />
    {tache > 0 && <path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke={KC.red} strokeWidth={14} strokeLinecap="round" opacity={tache} transform={`scale(${klerp(1.5, 1, tache)})`} />}
    {ok > 0 && <path d="M -40 0 L -10 30 L 50 -40" stroke="#118a3a" strokeWidth={14} fill="none" strokeLinecap="round" opacity={ok} transform={`scale(${klerp(1.5, 1, ok)})`} />}
  </g>;
}
// Silueta de persona.
function EgPersona({ x, y, s = 1, color = '#ffd2b8' }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-300} r={62} fill={color} stroke={KC.ink} strokeWidth={8} />
    <path d="M -95 0 L -95 -170 Q -95 -225 -40 -225 L 40 -225 Q 95 -225 95 -170 L 95 0 Z" fill={KC.blue} stroke={KC.ink} strokeWidth={8} />
  </g>;
}
// Planta de frijol con flor (angiosperma), en maceta.
function EgFrijol({ T, x, y, s = 1 }) {
  const m = mece(T, 3, 0.6) * 4;
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -80 0 L -60 -110 L 60 -110 L 80 0 Z" fill="#c8693a" stroke={KC.ink} strokeWidth={7} />
    <g transform={`rotate(${m} 0 -110)`}>
      <path d="M 0 -110 Q -10 -220 10 -330" stroke="#2f8f3a" strokeWidth={12} fill="none" />
      {[[-1, -190], [1, -250], [-1, -300]].map(([sg, yy], i) => <path key={i} d={`M 2 ${yy} q ${sg * 60} -40 ${sg * 110} -10 q ${-sg * 50} 30 ${-sg * 110} 10 Z`} fill={KC.leaf} stroke={KC.ink} strokeWidth={5} />)}
      <g transform="translate(14 -340)">{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-18} rx={13} ry={20} fill="#fff" stroke={KC.ink} strokeWidth={4} transform={`rotate(${a})`} />)}
        <circle r={10} fill={KC.yellow} stroke={KC.ink} strokeWidth={4} /></g>
    </g>
  </g>;
}
// Raíz que baja al suelo (corte).
function EgRaiz({ x, y, p = 1 }) {
  const ramas = [[0, 0, 0, 380], [0, 120, -140, 260], [0, 160, 150, 300], [0, 260, -90, 420], [0, 300, 110, 440]];
  return <g transform={`translate(${x} ${y})`}>
    {ramas.map(([a, b, c, d], i) => { const u = kclamp(p * 1.5 - i * 0.12, 0, 1); return <path key={i} d={`M ${a} ${b} L ${klerp(a, c, u)} ${klerp(b, d, u)}`} stroke="#e8d3a8" strokeWidth={i ? 10 : 20} fill="none" strokeLinecap="round" />; })}
  </g>;
}
// Membrana en corte (doble fila de cuentas) a lo ancho, en y. Hueco/puerta en xp si puerta > 0.
function EgMembrana({ T, y, puerta = 0, xp = 540, brillo = 0 }) {
  const cuentas = [];
  for (let x = -20; x < 1110; x += 36) {
    if (puerta > 0 && Math.abs(x - xp) < 80) continue;
    const w = Math.sin(x * 0.02 + T * 1.5) * 4;
    cuentas.push(<g key={x}><line x1={x} y1={y - 40 + w} x2={x} y2={y - 8 + w} stroke="#f7d9e6" strokeWidth={4} /><line x1={x} y1={y + 8 + w} x2={x} y2={y + 40 + w} stroke="#f7d9e6" strokeWidth={4} />
      <circle cx={x} cy={y - 48 + w} r={15} fill={EG.memb} stroke={KC.ink} strokeWidth={3} /><circle cx={x} cy={y + 48 + w} r={15} fill={EG.memb} stroke={KC.ink} strokeWidth={3} /></g>);
  }
  return <g>{cuentas}
    {puerta > 0 && <g transform={`translate(${xp} ${y}) scale(${kEase.rebote(kclamp(puerta, 0, 1))})`} style={brillo ? { filter:`drop-shadow(0 0 ${22 * brillo}px ${EG.oro})` } : null}>
      <path d="M -78 -95 Q -92 0 -78 95 L -22 95 Q -34 0 -22 -95 Z" fill={EG.prot} stroke={KC.ink} strokeWidth={7} />
      <path d="M 78 -95 Q 92 0 78 95 L 22 95 Q 34 0 22 -95 Z" fill={EG.prot} stroke={KC.ink} strokeWidth={7} />
      <path d="M -60 -60 Q -50 0 -60 60 M 60 -60 Q 50 0 60 60" stroke={EG.prot2} strokeWidth={6} fill="none" />
    </g>}
  </g>;
}
// Ratón de perfil con un vaso de sangre visible (lleno 0..1 de bolitas doradas).
function EgRaton({ T, x, y, s = 1, lleno = 1, seed = 1 }) {
  const g = krng(seed), pts = Array.from({ length: 9 }, () => [-150 + g() * 300, -8 + g() * 16]);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={`M 220 -10 Q 330 ${-30 + Math.sin(T * 3 + seed) * 20} 380 ${20 + Math.sin(T * 3 + seed) * 20}`} stroke="#e8a7a7" strokeWidth={12} fill="none" strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={230} ry={120} fill="#d8d2cc" stroke={KC.ink} strokeWidth={8} />
    <path d="M -200 -40 Q -320 -20 -330 30 Q -300 60 -200 50 Z" fill="#d8d2cc" stroke={KC.ink} strokeWidth={8} />
    <circle cx={-150} cy={-110} r={50} fill="#e8b4b4" stroke={KC.ink} strokeWidth={7} />
    <circle cx={-270} cy={0} r={10} fill={KC.ink} /><circle cx={-332} cy={30} r={11} fill="#e86a7a" stroke={KC.ink} strokeWidth={3} />
    {[-120, 60].map((dx) => <rect key={dx} x={dx} y={100} width={34} height={40} rx={10} fill="#e8b4b4" stroke={KC.ink} strokeWidth={5} />)}
    {/* vaso de sangre: corte esquemático */}
    <rect x={-170} y={-24} width={340} height={48} rx={24} fill="#7a1010" stroke={KC.ink} strokeWidth={6} />
    {pts.map(([a, b], i) => { const u = (a + 150 + T * 60) % 300 - 150; return <g key={i}>
      <circle cx={u} cy={b} r={9} fill={EG.sangre} stroke={KC.ink} strokeWidth={2} />
      {i / pts.length < lleno && <EgBola x={(u + 40 + 150) % 300 - 150} y={-b} r={9} />}</g>; })}
  </g>;
}
// Cuerpo con órganos que se iluminan: on = [glóbulos rojos, hígado, riñón, ojo] 0..1
function EgCuerpo({ T, x, y, s = 1, on = [0, 0, 0, 0] }) {
  const halo = (k) => (k > 0 ? { filter:`drop-shadow(0 0 ${20 * k}px ${EG.oro})` } : null);
  const col = (k, base) => mixHex(base, EG.oro, k);
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-470} r={110} fill="#ffd2b8" stroke={KC.ink} strokeWidth={9} />
    <path d="M -170 0 L -170 -290 Q -170 -350 -110 -350 L 110 -350 Q 170 -350 170 -290 L 170 0 Z" fill="#ffd2b8" stroke={KC.ink} strokeWidth={9} />
    {/* ojo */}
    <g style={halo(on[3])}><ellipse cx={42} cy={-480} rx={32} ry={22} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={42} cy={-480} r={13} fill={col(on[3], '#4a6a9a')} stroke={KC.ink} strokeWidth={3} /></g>
    <ellipse cx={-42} cy={-480} rx={32} ry={22} fill="#fff" stroke={KC.ink} strokeWidth={5} /><circle cx={-42} cy={-480} r={13} fill="#4a6a9a" />
    {/* vaso con glóbulos rojos */}
    <path d="M 125 -330 L 125 -20" stroke={col(on[0], '#b02020')} strokeWidth={20} strokeLinecap="round" style={halo(on[0])} />
    {[0, 1, 2, 3, 4].map((i) => { const yy = -320 + ((T * 70 + i * 60) % 300); return <ellipse key={i} cx={125} cy={yy} rx={16} ry={9} fill={col(on[0], EG.sangre)} stroke={KC.ink} strokeWidth={3} />; })}
    {/* hígado */}
    <path d="M -80 -250 Q 0 -300 110 -250 Q 90 -190 0 -190 Q -60 -190 -80 -250 Z" fill={col(on[1], '#9a3a2a')} stroke={KC.ink} strokeWidth={6} style={halo(on[1])} />
    {/* riñones */}
    {[-50, 60].map((dx) => <path key={dx} d={`M ${dx} -150 q -30 0 -30 40 q 0 40 30 40 q 14 -20 0 -40 q 14 -20 0 -40 Z`} fill={col(on[2], '#b0504a')} stroke={KC.ink} strokeWidth={5} style={halo(on[2])} transform={dx > 0 ? `translate(${2 * dx} 0) scale(-1 1)` : ''} />)}
  </g>;
}
// Porcini (Boletus edulis): sombrero café redondeado, poros por abajo, pie grueso y abultado (claro, con retícula).
function EgPorcini({ x, y, s = 1, crece = 1 }) {
  if (crece <= 0) return null;
  const c = kEase.rebote(kclamp(crece, 0, 1));
  return <g transform={`translate(${x} ${y}) scale(${s * c})`}>
    <path d="M -70 0 Q -100 -120 -60 -200 L 60 -200 Q 100 -120 70 0 Z" fill="#efe3c6" stroke={KC.ink} strokeWidth={7} />
    {[-40, -10, 20, 45].map((dx, i) => <path key={i} d={`M ${dx} -30 l 14 -24 l 14 24 M ${dx - 6} -100 l 14 -24 l 14 24`} stroke="#c9b48a" strokeWidth={3} fill="none" />)}
    <path d="M -175 -190 Q -170 -330 0 -340 Q 170 -330 175 -190 Q 0 -165 -175 -190 Z" fill="#8a4f22" stroke={KC.ink} strokeWidth={8} />
    <path d="M -165 -190 Q 0 -170 165 -190 Q 0 -150 -165 -190 Z" fill="#e6d38a" stroke={KC.ink} strokeWidth={5} />
    <path d="M -110 -300 Q -40 -330 40 -322" stroke="#fff" strokeWidth={10} opacity=".3" fill="none" strokeLinecap="round" />
  </g>;
}

function ErgotioneinaShot() {
  const { T, CUES } = useComposition();
  const K = { G: CUES.Gancho, N: CUES.Nombre, NF: CUES.NoFabrica, S: CUES.Suelo, Co: CUES.Comida, M: CUES.Membrana, P: CUES.Pregunta,
    E5: CUES.Estudio2005, C1: CUES.CienVeces, R: CUES.Ratones2010, Te: CUES.Tejidos, Po: CUES.Porcini, A: CUES.Ames, C: CUES.Cierre, Ou: CUES.Outro };
  const FIN = K.Ou + 4;
  // bolitas que rebotan en la membrana (escena 5) y que pasan por la puerta (7–8)
  const rebotes = Array.from({ length: 7 }, (_, i) => { const per = 1.1 + (i % 3) * 0.2, u = ((T - K.M + i * 0.37) % per) / per; return [90 + i * 150, 560 + Math.abs(Math.sin(u * Math.PI)) * 300]; });
  return (
    <div style={{ position:'absolute', left:0, top:0, width:KW, height:KH, overflow:'hidden', background:KC.dark }}>
      {/* 0 · gancho: la quesadilla se dobla y la cámara baja a una célula con una sola puerta */}
      <Escena T={T} a={K.G} b={K.N} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <EgQuesadilla T={T} x={540} y={930} s={1.2} dobla={kprog(T, K.G, K.G + 0.7)} />
          {(() => { const z = kprog(T, K.G + 1.6, K.G + 2.4, kEase.sale); return z > 0 && <g opacity={z} transform={`translate(${klerp(540, 0, z) * 0} 0)`}>
            <circle cx={300} cy={620} r={klerp(0, 250, z)} fill="rgba(14,15,18,.92)" stroke={KC.white} strokeWidth={10} />
            <g transform={`translate(300 620) scale(${0.82 * z}) translate(-300 -620)`}>
              <EgCelula T={T} x={300} y={620} r={200} abierta={kprog(T, K.G + 2.6, K.G + 3.2)} entra={kprog(T, K.G + 2.6, K.G + 5.2)} />
              {[[90, 400], [520, 820], [80, 840], [530, 430]].map(([a, b], i) => <EgOtra key={i} x={a + Math.sin(T * 3 + i) * 10} y={b + Math.cos(T * 2 + i) * 10} r={15} />)}
            </g>
            <line x1={480} y1={880} x2={420} y2={820} stroke={KC.white} strokeWidth={6} strokeDasharray="10 10" />
          </g>; })()}
        </>)}
      </Escena>
      {/* 1 · nombre: la molécula con azufre */}
      <Escena T={T} a={K.N} b={K.NF} zoom={0.06}>
        <FondoLunares color={KC.mint} />
        {fsvg(<EgMolecula x={360} y={780} s={1.45} rot={Math.sin(T * 1.2) * 4} p={kprog(T, K.N + 0.1, K.N + 1.4)} />)}
      </Escena>
      {/* 2 · tu cuerpo no la fabrica; las plantas con flor tampoco */}
      <Escena T={T} a={K.NF} b={K.S} zoom={0.05}>
        <FondoLunares color={KC.pink} />
        {fsvg(<>
          <EgPersona x={280} y={1120} s={1.15} />
          <EgFabrica x={280} y={680} s={1.1} tache={kprog(T, K.NF + 0.5, K.NF + 0.8)} />
          <EgFrijol T={T} x={780} y={1120} s={1.15} />
          <EgFabrica x={780} y={600} s={1.1} tache={kprog(T, K.NF + 1.9, K.NF + 2.2)} />
        </>)}
      </Escena>
      {/* 3 · la hacen hongos y bacterias; la raíz la toma del suelo (corte del suelo, fondo oscuro) */}
      <Escena T={T} a={K.S} b={K.Co} zoom={0.06}>
        <div style={{ position:'absolute', inset:0, background:'#2a1a10' }}></div>
        <div style={{ position:'absolute', left:0, right:0, top:0, height:470, background:KC.cyan }}></div>
        {fsvg(<>
          <rect x={0} y={440} width={1080} height={40} fill="#5b3a22" />
          <g transform="translate(540 470) scale(.55) translate(-780 -1120)"><EgFrijol T={T} x={780} y={1120} s={1} /></g>
          <EgRaiz x={540} y={470} p={kprog(T, K.S, K.S + 1.2)} />
          <RedHifas T={T} x={230} y={860} g={kprog(T, K.S + 0.2, K.S + 2)} seed={4} n={160} escala={0.13} brillo={0.6} />
          <EgFabrica x={230} y={1030} s={0.7} ok={kprog(T, K.S + 1.0, K.S + 1.3)} />
          <Bacteria T={T} x={850} y={760} largo={150} ancho={64} rot={20} seed={2} />
          <Bacteria T={T} x={900} y={950} largo={130} ancho={58} rot={-30} seed={5} color="#9be0a0" />
          <EgFabrica x={870} y={1030} s={0.7} ok={kprog(T, K.S + 1.6, K.S + 1.9)} />
          {Array.from({ length: 8 }, (_, i) => { const u = kclamp(((T - K.S - 1.2 - i * 0.25) / 1.6), 0, 1); if (u <= 0) return null;
            const ox = i % 2 ? 860 : 230, oy = 860 + (i % 3) * 40; return <EgBola key={i} x={klerp(ox, 540 + (i % 2 ? 40 : -40), u)} y={klerp(oy, 700 + (i % 3) * 40, u)} r={16} o={1 - kprog(u, 0.9, 1)} brillo={0.6} />; })}
        </>)}
      </Escena>
      {/* 4 · la que tienes llegó con lo que comiste */}
      <Escena T={T} a={K.Co} b={K.M} zoom={0.05}>
        <FondoLunares color={KC.cyan} />
        {fsvg(<>
          <ellipse cx={540} cy={960} rx={440} ry={150} fill="#fff" stroke={KC.ink} strokeWidth={9} />
          <g transform="translate(380 940) scale(.5) translate(-540 -1060)"><EgQuesadilla T={T} x={540} y={1060} vapor={0} /></g>
          <g transform="translate(700 920)">{Array.from({ length: 14 }, (_, i) => <ellipse key={i} cx={(i % 5) * 30 - 60} cy={Math.floor(i / 5) * 24} rx={16} ry={10} fill="#2a1a2a" stroke={KC.ink} strokeWidth={3} />)}</g>
          <g transform="translate(700 1010)">{Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={(i % 6) * 22 - 55} cy={Math.floor(i / 6) * 16} rx={11} ry={6} fill="#d9b77a" stroke={KC.ink} strokeWidth={2} />)}</g>
          {Array.from({ length: 6 }, (_, i) => { const u = kclamp((T - K.Co - 0.4 - i * 0.18) / 1.2, 0, 1); if (u <= 0) return null;
            return <EgBola key={i} x={klerp(380 + i * 60, 540, u)} y={klerp(900, 640, u)} r={16} o={1 - kprog(u, 0.85, 1)} />; })}
          <g transform="translate(540 760) scale(.75)"><EgPersona x={0} y={0} /></g>
        </>)}
      </Escena>
      {/* 5–8 · por dentro: la membrana, la pregunta, la puerta OCTN1 y "cien veces mejor" (fondo oscuro) */}
      <Escena T={T} a={K.M} b={K.R} zoom={0.03}>
        <div style={{ position:'absolute', inset:0, background:KC.noche }}></div>
        <Ambiente T={T} n={20} />
        {fsvg(<>
          <rect x={0} y={1010} width={1080} height={300} fill="rgba(255,45,120,.10)" />
          <EgMembrana T={T} y={1000} puerta={kprog(T, K.E5 + 0.4, K.E5 + 1.0)} xp={540} brillo={kprog(T, K.E5 + 1.0, K.E5 + 1.6)} />
          {T < K.E5 + 1 && rebotes.map(([bx, by], i) => <EgBola key={i} x={bx} y={by} r={20} o={1 - kprog(T, K.E5 + 0.4, K.E5 + 1)} />)}
          {T > K.E5 + 1 && Array.from({ length: 8 }, (_, i) => { const per = 1.4, u = ((T - K.E5 - 1 + i * per / 8) % per) / per;
            return <EgBola key={i} x={540 + Math.sin(i * 2.1) * (1 - u) * 300 * (u < 0.55 ? 1 : 0)} y={klerp(620, 1180, u)} r={20} brillo={0.8} o={kprog(u, 0, 0.1) * (1 - kprog(u, 0.9, 1))} />; })}
          {T > K.C1 && [[180, 880], [880, 900], [300, 860]].map(([a, b], i) => <EgOtra key={i} x={a + Math.sin(T * 2 + i) * 30} y={b - Math.abs(Math.sin(T * 3 + i)) * 120} r={18} />)}
          {T >= K.P && T < K.E5 + 0.3 && <g opacity={1 - kprog(T, K.E5, K.E5 + 0.3)}><Interrogacion T={T} x={540} y={900} tam={420} /></g>}
        </>)}
      </Escena>
      {/* 9 · 2010, Japón: ratones sin la puerta */}
      <Escena T={T} a={K.R} b={K.Te} zoom={0.05}>
        <FondoLunares color={KC.orange} />
        {fsvg(<>
          <EgRaton T={T} x={480} y={740} s={1} lleno={1} seed={1} />
          <EgRaton T={T} x={480} y={1020} s={1} lleno={1 - kprog(T, K.R + 1.4, K.R + 2.6)} seed={3} />
        </>)}
      </Escena>
      {/* 10 · tejidos que la acumulan */}
      <Escena T={T} a={K.Te} b={K.Po} zoom={0.05}>
        <FondoLunares color={KC.mint} />
        {fsvg(<EgCuerpo T={T} x={400} y={1100} s={1.15} on={[kprog(T, K.Te + 1.5, K.Te + 1.9), kprog(T, K.Te + 2.3, K.Te + 2.7), kprog(T, K.Te + 2.9, K.Te + 3.3), kprog(T, K.Te + 3.6, K.Te + 4.0)]} />)}
      </Escena>
      {/* 11 · porcini contra champiñón blanco */}
      <Escena T={T} a={K.Po} b={K.A} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <EgPorcini x={280} y={780} s={0.9} crece={kprog(T, K.Po, K.Po + 0.6)} />
          <Champinon x={760} y={780} s={1.5} abre={0.55} crece={kprog(T, K.Po + 0.3, K.Po + 0.9)} />
          <line x1={120} y1={1120} x2={960} y2={1120} stroke={KC.ink} strokeWidth={8} />
          {(() => { const u = kprog(T, K.Po + 1.0, K.Po + 2.2, kEase.sale); return <>
            <rect x={190} y={1120 - 280 * u} width={180} height={280 * u} fill="#8a4f22" stroke={KC.ink} strokeWidth={7} />
            <rect x={670} y={1120 - 16 * u} width={180} height={Math.max(2, 16 * u)} fill="#efe2cc" stroke={KC.ink} strokeWidth={7} />
          </>; })()}
          <text x={280} y={1120 - 280 * kprog(T, K.Po + 1.0, K.Po + 2.2, kEase.sale) - 18} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Po + 1.6, K.Po + 2.0)}>&gt;7 mg/g seco</text>
          <text x={760} y={1080} textAnchor="middle" style={{ font:`700 34px ${KF.mono}` }} fill={KC.ink} opacity={kprog(T, K.Po + 1.9, K.Po + 2.3)}>~0.4 mg/g seco</text>
        </>)}
      </Escena>
      {/* 12 · Ames: una propuesta */}
      <Escena T={T} a={K.A} b={K.C} zoom={0.04}>
        <FondoLunares color={KC.pink} />
        {fsvg(<Sello T={T} at={K.A + 2.6} x={540} y={960} texto="PROPUESTA" color={KC.violet} r={120} rot={-8} />)}
      </Escena>
      {/* 13 · cierre: la misma quesadilla, y la puerta ya abierta */}
      <Escena T={T} a={K.C} b={FIN} zoom={0.04}>
        <FondoLunares color={KC.yellow} />
        {fsvg(<>
          <EgQuesadilla T={T} x={540} y={930} s={1.2} />
          <circle cx={300} cy={620} r={250} fill="rgba(14,15,18,.92)" stroke={KC.white} strokeWidth={10} />
          <g transform="translate(300 620) scale(.82) translate(-300 -620)"><EgCelula T={T} x={300} y={620} r={200} abierta={1} entra={kprog(T, K.C + 0.6, K.C + 3.6)} /></g>
          <line x1={480} y1={880} x2={420} y2={820} stroke={KC.white} strokeWidth={6} strokeDasharray="10 10" />
          {Array.from({ length: 6 }, (_, i) => { const u = kclamp((T - K.C - 0.3 - i * 0.4) / 1.4, 0, 1); if (u <= 0 || u >= 1) return null;
            return <EgBola key={i} x={klerp(420 + i * 50, 470, u)} y={klerp(880, 470, u)} r={14} brillo={1} o={1 - kprog(u, 0.8, 1)} />; })}
        </>)}
      </Escena>

      {/* textos */}
      <Chip T={T} at={K.G + 2.6} until={K.N - 0.3} texto="una puerta especial" x={360} y={360} tam={40} borde={KC.gold} />
      <Etq T={T} at={K.G + 0.6} until={K.G + 1.8} x={60} y={740} texto="quesadilla de champiñones" tam={32} color={KC.ink} />
      <Etq T={T} at={K.N + 0.5} until={K.NF - 0.3} x={470} y={470} texto="ergotioneína" tam={52} color={KC.ink} />
      <Etq T={T} at={K.N + 1.0} until={K.NF - 0.3} x={470} y={540} texto="aminoácido con azufre (S)" tam={30} color={KC.ink} />
      <Etq T={T} at={K.NF + 0.4} until={K.S - 0.3} x={120} y={1180} texto="tu cuerpo" tam={30} color={KC.ink} />
      <Chip T={T} at={K.NF + 1.8} until={K.S - 0.3} texto="plantas con flor: no la fabrican" x={400} y={430} tam={28} borde={KC.ink} />
      <Etq T={T} at={K.S + 0.8} until={K.Co - 0.3} x={60} y={1110} texto="hongos" tam={32} color={KC.texto} />
      <Etq T={T} at={K.S + 1.4} until={K.Co - 0.3} x={1020} y={1110} lado="izq" texto="bacterias" tam={32} color={KC.texto} />
      <Etq T={T} at={K.S + 2.0} until={K.Co - 0.3} x={600} y={560} texto="raíz" tam={30} color={KC.texto} />
      <Etq T={T} at={K.Co + 0.3} until={K.M - 0.3} x={60} y={1130} texto="frijoles · salvado de avena" tam={28} color={KC.ink} />
      <Chip T={T} at={K.Co + 1.2} until={K.M - 0.3} texto="toda llega de la comida" x={540} y={440} tam={38} borde={KC.gold} />
      <Chip T={T} at={K.M + 0.2} until={K.P - 0.2} texto="POR DENTRO · MEMBRANA DE TU CÉLULA" x={380} y={420} tam={24} borde={KC.pink} mono />
      <TarjetaEstudio T={T} at={K.E5 + 0.2} until={K.C1 - 0.3} anio="2005" quien="U. de Colonia, Alemania" revista="PNAS, 2005" x={430} y={560} />
      <Etq T={T} at={K.E5 + 1.2} until={K.R - 0.3} x={650} y={850} texto="OCTN1 · gen SLC22A4" tam={30} color={EG.prot} />
      <NumeroGigante T={T} at={K.C1 + 0.3} until={K.R - 0.3} valor={100} dur={1.2} prefijo=">" sufijo="×" etiqueta="mejor que lo que se creía que movía" x={460} y={560} tam={170} color={EG.oro} />
      <TarjetaEstudio T={T} at={K.R + 0.2} until={K.Te - 0.3} anio="2010" quien="U. de Kanazawa, Japón" revista="Pharm. Res., 2010" x={360} y={440} />
      <Etq T={T} at={K.R + 0.8} until={K.Te - 0.3} x={700} y={670} texto="con OCTN1" tam={24} color={KC.ink} />
      <Etq T={T} at={K.R + 1.2} until={K.Te - 0.3} x={560} y={885} texto="sin OCTN1 → sin ergotioneína" tam={24} color={KC.ink} />
      <Etq T={T} at={K.Te + 1.5} until={K.Po - 0.3} x={575} y={1040} texto="glóbulos rojos" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Te + 2.3} until={K.Po - 0.3} x={575} y={812} texto="hígado" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Te + 2.9} until={K.Po - 0.3} x={575} y={950} texto="riñón" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Te + 3.6} until={K.Po - 0.3} x={500} y={548} texto="cristalino del ojo" tam={30} color={KC.ink} />
      <Etq T={T} at={K.Po + 0.5} until={K.A - 0.3} x={60} y={370} texto="porcini · Boletus edulis" it tam={26} color={KC.ink} />
      <Etq T={T} at={K.Po + 0.8} until={K.A - 0.3} x={60} y={410} texto="champiñón · Agaricus bisporus" it tam={26} color={KC.ink} />
      <Chip T={T} at={K.Po + 2.4} until={K.A - 0.3} texto="~17×" x={760} y={930} tam={60} borde={KC.gold} />
      <TarjetaEstudio T={T} at={K.A + 0.2} until={K.C - 0.3} anio="2018" quien="Bruce Ames: «vitamina de la longevidad»" revista="PNAS, 2018 · propuesta" x={540} y={500} />
      <Chip T={T} at={K.A + 3.0} until={K.C - 0.3} texto="en personas: aún no probado" x={540} y={770} tam={38} borde={KC.violet} />
      <Etq T={T} at={K.C + 2.0} until={K.Ou} x={60} y={1500} texto="No es consejo médico. El dibujo es esquemático." tam={22} color={KC.ink} />

      {/* barras de escala */}
      <BarraEscala T={T} at={K.G} until={K.N} texto="5 cm" largo={110} color={KC.ink} />
      <BarraEscala T={T} at={K.N} until={K.NF} texto="1 nm (esquemático)" largo={300} color={KC.ink} />
      <BarraEscala T={T} at={K.NF} until={K.S} texto="10 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.S} until={K.Co} texto="100 µm (suelo, esquemático)" largo={200} />
      <BarraEscala T={T} at={K.Co} until={K.M} texto="5 cm" largo={70} color={KC.ink} />
      <BarraEscala T={T} at={K.M} until={K.R} texto="10 nm (esquemático)" largo={260} />
      <BarraEscala T={T} at={K.R} until={K.Te} texto="2 cm" largo={60} color={KC.ink} />
      <BarraEscala T={T} at={K.Po} until={K.A} texto="5 cm" largo={90} color={KC.ink} />
      <BarraEscala T={T} at={K.C} until={K.Ou} texto="5 cm" largo={110} y={1560} color={KC.ink} />

      {/* subtítulos (idx = línea de narracion.json) */}
      <Subtitulo T={T} idx={0} at={K.G + 0.1} until={K.N - 0.1} texto="Una *puerta especial* en tus células." />
      <Subtitulo T={T} idx={1} at={K.N + 0.1} until={K.NF - 0.1} texto="Ergotioneína: *un aminoácido con azufre.*" />
      <Subtitulo T={T} idx={2} at={K.NF + 0.1} until={K.S - 0.1} texto="Tu cuerpo *no la fabrica.*" />
      <Subtitulo T={T} idx={3} at={K.S + 0.1} until={K.Co - 0.1} texto="La hacen *hongos y bacterias.*" />
      <Subtitulo T={T} idx={4} at={K.Co + 0.1} until={K.M - 0.1} texto="Llegó con *lo que comiste.*" />
      <Subtitulo T={T} idx={5} at={K.M + 0.1} until={K.P - 0.1} texto="La membrana *casi no la deja pasar.*" />
      <Subtitulo T={T} idx={6} at={K.P + 0.1} until={K.E5 - 0.1} texto="¿Entonces *cómo entra?*" />
      <Subtitulo T={T} idx={7} at={K.E5 + 0.1} until={K.C1 - 0.1} texto="2005: *su puerta principal,* OCTN1." />
      <Subtitulo T={T} idx={8} at={K.C1 + 0.1} until={K.R - 0.1} texto="*Más de cien veces* mejor." />
      <Subtitulo T={T} idx={9} at={K.R + 0.1} until={K.Te - 0.1} texto="Sin la puerta: *sin ergotioneína.*" />
      <Subtitulo T={T} idx={10} at={K.Te + 0.1} until={K.Po - 0.1} texto="Glóbulos rojos, hígado, riñón, *ojo.*" />
      <Subtitulo T={T} idx={11} at={K.Po + 0.1} until={K.A - 0.1} texto="Porcini: *unas 17 veces* más." />
      <Subtitulo T={T} idx={12} at={K.A + 0.1} until={K.C - 0.1} texto="«Vitamina de la longevidad»: *una propuesta.*" />
      <Subtitulo T={T} idx={13} at={K.C + 0.1} until={K.Ou - 0.1} texto="Una puerta que *tus células ya tenían.*" />

      <Robert T={T} apariciones={[
        [K.G - 0.45, K.G + 2.4, 'avatar_11_sorprendido', 'gancho'],
        [K.NF + 0.2, K.S - 0.2, 'avatar_12_perfil_serio', 'arriba-der'],
        [K.M + 0.3, K.P - 0.1, 'avatar_13_senalando_arriba', 'arriba-der'],
        [K.P + 0.05, K.E5 + 2.2, 'avatar_07_pensativo_puno', 'presentador-bajo'],
        [K.R + 0.5, K.Te - 0.2, 'avatar_04_bajando_lentes', 'arriba-der'],
        [K.Po + 0.3, K.A - 0.2, 'avatar_05_sonriendo_dientes_uniformes', 'bajo-der'],
        [K.A + 0.3, K.C - 0.2, 'avatar_06_pensativo_menton', 'bajo-der'],
        [K.C + 0.3, K.Ou - 0.1, 'avatar_02_apuntando_camara', 'arriba-der']]} />
      <MarcaAgua T={T} tema="bioquimica" num="153" hasta={K.Ou} />
      <CierreMarca T={T} at={K.Ou} tema="bioquimica" robert={'assets/stickers/avatar_13_senalando_arriba.png'} />
      <AudioPista src={window.AUDIO_SRC} />
    </div>
  );
}

function ErgotioneinaApp() {
  return <div style={{ position:'fixed', inset:0, background:'#000' }}><CompositionStage width={1080} height={1920} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0E0F12"><ErgotioneinaShot /></CompositionStage></div>;
}
window.ErgotioneinaApp = ErgotioneinaApp;
