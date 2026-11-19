# Arma publicar/rednote/paquete-02.md… con los zh/publicacion.md en orden de calendario (paquete 1 ya entregado). Uso: python3 publicar/rednote/armar_paquetes.py
import sys, os, re, glob, datetime as dt
sys.path.insert(0, 'calendario'); import fecha as F
hoy = dt.date(2026, 11, 19)
ya = set(re.findall(r'^## \d+ · (\S+) ·', open('publicar/rednote/paquete-01.md').read(), re.M))
orden = []; vistos = set()
for d, xs in F.calendario(1200):
    for x in xs:
        k = x[2]
        if k and k not in vistos and os.path.exists(f'shots/{k}/zh/publicacion.md'):
            vistos.add(k); orden.append((d, k))
extra = sorted(os.path.basename(os.path.dirname(os.path.dirname(p))) for p in glob.glob('shots/*/zh/publicacion.md'))
extra = [k for k in extra if k not in vistos and k not in ya]
orden = [(d, k) for d, k in orden if k not in ya] + [(None, k) for k in extra]
N = 30; os.makedirs('publicar/rednote', exist_ok=True)
for i in range(0, len(orden), N):
    lote = orden[i:i+N]; num = i // N + 2
    fs = [d for d, _ in lote if d]
    rango = f'del {fs[0]} al {fs[-1]}' if fs else 'sin fecha en el calendario'
    out = [f'# RedNote (小红书) · paquete {num}: {len(lote)} shots ({rango})', '',
           'Súbelos en este orden desde https://creator.xiaohongshu.com → 发布笔记 → 上传视频. Video: `<clave>_zh.mp4` (Release «idioma-zh» o el chat).',
           'Pega el título en 标题, el texto en 正文 y las etiquetas al final del texto. Para repartirlos, usa 定时发布 (publicación programada).', '']
    for j, (d, k) in enumerate(lote, 1):
        cuando = '(sin fecha en el calendario en español)' if not d else (f'(en español salió el {d})' if d <= hoy else f'(en español sale el {d})')
        out += [f'## {j:02d} · {k} · {cuando}', '', '```text', open(f'shots/{k}/zh/publicacion.md').read().strip(), '```', '']
    open(f'publicar/rednote/paquete-{num:02d}.md', 'w').write('\n'.join(out))
    print(num, len(lote), rango)
print('total', len(orden), 'extra', extra)
