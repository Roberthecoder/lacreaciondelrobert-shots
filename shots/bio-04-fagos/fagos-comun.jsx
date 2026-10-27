// Biotecnológico #04 · Virus que matan bacterias (fagos) — dibujos compartidos (narrada y muda).
// Fago T4 (pieza Fago del kit) sobre E. coli; ciclo lítico; placa de Petri con calvas. Dibujo esquemático:
// el fago va agrandado respecto a la bacteria (T4 mide ~0.2 µm; E. coli, ~2 µm).

const AVS = (n) => 'assets/stickers/' + n + '.png';
const SOMBRA = '0 6px 0 rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.9)';
const ECOLI = '#7fd88a';

// La bacteria grande de la escena (E. coli, acostada) con lo que pasa adentro.
// adn: 0..1 el ADN del fago entra (línea rosa que crece) · copias: 0..1 se arman fagos adentro · rev: 0..1 revienta.
function EColiGrande({ T, x = 540, y = 1000, largo = 900, ancho = 380, adn = 0, copias = 0, rev = 0, n = 18 }) {
  const g = krng(31), pos = Array.from({ length: n }, () => [(g() - 0.5) * (largo - ancho * 0.9), (g() - 0.5) * ancho * 0.6, g() * 360]);
  return <g>
    <Bacteria T={T} x={x} y={y} largo={largo} ancho={ancho} color={ECOLI} seed={5} nucleoide={adn < 0.5} flagelo={false} reventar={rev}
      adentro={(L, W) => <g>
        {adn > 0 && <path d={`M 0 ${-W / 2} C -60 -40, 80 0, -40 40 S 120 60, 60 -20`} stroke={KC.pink} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${700 * adn} 900`} />}
        {copias > 0 && pos.map(([px, py, r], i) => { const k = kclamp(copias * n - i, 0, 1); return k > 0 && <g key={i} transform={`translate(${px} ${py}) rotate(${r + T * 20}) scale(${0.16 * k})`}><Fago T={T} color="#ffc4dc" adn={1} seed={i} /></g>; })}
      </g>} />
  </g>;
}

// Explosión de fagos nuevos desde (x, y). p: 0..1.
function Estallido({ T, x = 540, y = 1000, p = 0, n = 26, rad = 520, s = 0.3 }) {
  if (p <= 0) return null;
  const g = krng(8);
  return <g>{Array.from({ length: n }, (_, i) => { const a = (i / n) * 6.283 + g() * 0.3, d = rad * kEase.sale(p) * (0.55 + g() * 0.5);
    return <g key={i} transform={`translate(${x + Math.cos(a) * d} ${y + Math.sin(a) * d * 0.8}) rotate(${a * 57 + 90 + T * 30 * (i % 2 ? 1 : -1)}) scale(${s})`}><Fago T={T} color="#ffc4dc" seed={i} /></g>; })}</g>;
}

// Placa de Petri vista desde arriba: césped de bacterias con calvas (claros) que crecen.
// calvas = [{ x, y, r }] en coordenadas de la placa (radio 1 = borde).
function Petri({ x = 540, y = 860, R = 420, calvas = [], T = 0 }) {
  const g = krng(14), puntos = Array.from({ length: 420 }, () => { const a = g() * 6.283, d = Math.sqrt(g()) * 0.96; return [Math.cos(a) * d, Math.sin(a) * d]; });
  return <g transform={`translate(${x} ${y})`}>
    <circle r={R + 26} fill="#e9f3f7" stroke={KC.ink} strokeWidth={10} opacity=".9" />
    <circle r={R} fill="#f2d98a" stroke="#c9a84f" strokeWidth={6} />
    {puntos.map(([px, py], i) => { const libre = calvas.some((c) => Math.hypot(px - c.x, py - c.y) < c.r); return !libre && <circle key={i} cx={px * R} cy={py * R} r={6} fill="#e3c25f" />; })}
    {calvas.map((c, i) => c.r > 0 && <circle key={'c' + i} cx={c.x * R} cy={c.y * R} r={c.r * R} fill="#fbf2cf" stroke="#d6b75a" strokeWidth={3} />)}
    <ellipse cx={-R * 0.45} cy={-R * 0.6} rx={R * 0.25} ry={R * 0.08} fill="#fff" opacity=".6" transform={`rotate(-30 ${-R * 0.45} ${-R * 0.6})`} />
  </g>;
}

Object.assign(window, { AVS, SOMBRA, ECOLI, EColiGrande, Estallido, Petri });
