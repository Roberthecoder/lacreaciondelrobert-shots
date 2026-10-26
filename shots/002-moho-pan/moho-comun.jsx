// Piezas compartidas por las dos versiones del Shot 002 (moho del pan).
const PAN = MUNDO_PAN, PM = PAN.mancha;
// punto del mundo micro (px, superficie en y = 0) → coordenadas macro para la cámara
const mp = (x, y, z) => ({ x: PM.x + x / PAN.k, y: PM.y + y / PAN.k, z });
const AVS = (n) => 'assets/stickers/' + n + '.png';

// Etiqueta científica con línea: nombre en cursiva opcional.
function Etq({ T, at, until, x, y, texto, it = false, lado = 'der', color = KC.texto }) {
  if (!kvisible(T, at, until)) return null;
  const e = kentrada(T, at, until, 'sube');
  return <div style={{ position:'absolute', left:x, top:y, zIndex:41, opacity:e.o, display:'flex', alignItems:'center', gap:12, flexDirection: lado === 'der' ? 'row' : 'row-reverse', transform:`translate(${lado === 'der' ? 0 : '-100%'}, -50%)` }}>
    <div style={{ width:70 * kprog(T, at, at + 0.4, kEase.sale), height:4, background:color, borderRadius:2 }}></div>
    <div style={{ font:`700 34px ${KF.mono}`, fontStyle: it ? 'italic' : 'normal', color, textShadow:'0 3px 0 rgba(0,0,0,.8), 0 0 18px rgba(0,0,0,.9)', whiteSpace:'nowrap' }}>{texto}</div>
  </div>;
}

// Mundo completo del moho con su cámara (macro ↔ micro).
function MundoMoho({ T, keys, macro, micro }) {
  return <CamaraAnidada T={T} keys={keys} origen={PM} k={PAN.k}
    macro={(Tl, c) => <MundoPanMacro T={Tl} zCam={c.z} {...macro} />}
    micro={(Tl) => <MundoPanMicro T={Tl} {...micro} />} />;
}

// Queso duro y zanahoria: el moho apenas entra; se corta con 2.5 cm de margen (USDA).
function QuesoZanahoria({ T, at }) {
  const d1 = kprog(T, at + 1.2, at + 2.6, kEase.suave), d2 = kprog(T, at + 2.8, at + 4.2, kEase.suave);
  const caja = (x, y, w, h, p) => { const per = 2 * (w + h); return <rect x={x} y={y} width={w} height={h} fill="none" stroke={KC.red} strokeWidth={8} strokeDasharray={`28 18`} strokeDashoffset={0} style={{ clipPath:`inset(0 ${(1 - p) * 100}% 0 0)` }} />; };
  return (
    <div style={{ position:'absolute', inset:0, background:KC.mint, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.3) 7px, transparent 8px)', backgroundSize:'48px 48px' }}>
      <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0 }}>
        {/* queso duro en corte */}
        <path d="M150 560 L930 560 L930 860 L150 860 Z" fill="#ffd34d" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
        {[[260, 640, 26], [420, 760, 18], [780, 700, 30], [880, 800, 14]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#e8b52e" />)}
        <ellipse cx={560} cy={566} rx={46} ry={12} fill="#5f7d6e" />
        {Array.from({ length: 7 }, (_, i) => <line key={i} x1={530 + i * 10} y1={572} x2={526 + i * 11} y2={590 + (i % 3) * 6} stroke="#eafff7" strokeWidth={3} />)}
        {caja(560 - 46 - 110, 556, 92 + 220, 110 + 22, d1)}
        {/* zanahoria */}
        <path d="M170 1060 Q 140 1120 170 1180 L 880 1150 Q 930 1120 880 1090 Z" fill="#ff8a1f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
        {[300, 450, 600, 750].map((x) => <line key={x} x1={x} y1={1080} x2={x + 12} y2={1100} stroke="#c4600f" strokeWidth={6} strokeLinecap="round" />)}
        <path d="M170 1080 l -70 -40 M170 1100 l -80 0 M170 1120 l -70 40" stroke={KC.leaf} strokeWidth={14} strokeLinecap="round" />
        <ellipse cx={520} cy={1066} rx={36} ry={10} fill="#6d6d64" />
        {caja(520 - 36 - 110, 1052, 72 + 220, 120, d2)}
      </svg>
      <Etq T={T} at={at + 0.3} x={150} y={520} texto="Queso duro" color={KC.ink} />
      <Etq T={T} at={at + 0.6} x={170} y={1020} texto="Zanahoria" color={KC.ink} />
      <Chip T={T} at={at + 1.6} texto="≥ 2.5 cm de margen" x={540} y={950} borde={KC.red} tam={44} />
    </div>
  );
}

// Tempeh: soya unida por micelio blanco de Rhizopus.
function Tempeh({ T, at }) {
  const g = krng(77), e = kentrada(T, at, null, 'pop');
  const frijoles = Array.from({ length: 46 }, () => ({ x: 200 + g() * 680, y: 640 + g() * 420, r: g() * 180 }));
  return (
    <div style={{ position:'absolute', inset:0, background:KC.teal, backgroundImage:'radial-gradient(circle, rgba(255,255,255,.22) 7px, transparent 8px)', backgroundSize:'48px 48px' }}>
      <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, transform:`scale(${e.s})`, transformOrigin:'540px 850px', opacity:e.o }}>
        <rect x={160} y={600} width={760} height={500} rx={60} fill="#f5f0e2" stroke={KC.ink} strokeWidth={10} />
        {frijoles.map((f, i) => <ellipse key={i} cx={f.x} cy={f.y} rx={34} ry={24} transform={`rotate(${f.r} ${f.x} ${f.y})`} fill="#d9b27a" stroke="#a87d45" strokeWidth={4} />)}
        {Array.from({ length: 60 }, (_, i) => { const a = frijoles[i % 46], b = frijoles[(i * 7 + 3) % 46]; return Math.hypot(a.x - b.x, a.y - b.y) < 220 ? <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#ffffff" strokeWidth={5} opacity={0.85} /> : null; })}
      </svg>
      <Chip T={T} at={at + 0.4} texto="Tempeh · Indonesia" x={330} y={420} tam={46} />
      <Etq T={T} at={at + 1.0} x={170} y={540} texto="Rhizopus oligosporus · R. oryzae" it color={KC.texto} />
    </div>
  );
}

// Nariz que se acerca al pan y se detiene (no lo huelas).
function Nariz({ T, at }) {
  const p = kprog(T, at + 0.2, at + 1.4, kEase.sale), x = klerp(-420, 140, p);
  return <svg width={KW} height={KH} style={{ position:'absolute', left:0, top:0, zIndex:30 }}>
    <path d={`M${x - 300} 640 C ${x - 60} 650 ${x + 80} 760 ${x + 110} 860 C ${x + 120} 900 ${x + 60} 920 ${x + 20} 905 L ${x - 300} 905 Z`} fill="#f1b48f" stroke={KC.ink} strokeWidth={10} strokeLinejoin="round" />
    <ellipse cx={x + 30} cy={880} rx={22} ry={12} fill="#a85f45" />
  </svg>;
}

Object.assign(window, { mp, AVS, Etq, MundoMoho, QuesoZanahoria, Tempeh, Nariz });
