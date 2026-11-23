"""Estadísticas de lo publicado (SOLO LECTURA: no publica, no borra, no cambia nada en las redes).
Lee la bitácora refs/estado/publicaciones y pide a cada red las cifras de cada video. Escribe estadisticas.json y un resumen."""
import json, os, sys, statistics as st
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import publicar as P  # noqa: E402
import requests  # noqa: E402

filas = [x for x in P.bitacora() if x.get('modo') == 'real' and x.get('ok') and x.get('id')]
res, errores = [], {}


def anota(red, e):
    errores.setdefault(red, str(e)[:300])


def num(v):
    try:
        return int(v)
    except (TypeError, ValueError):
        return None


# YouTube
try:
    at = P.youtube_token()
    ids = [x for x in filas if x['red'] == 'youtube']
    for i in range(0, len(ids), 50):
        lote = ids[i:i + 50]
        d = requests.get('https://www.googleapis.com/youtube/v3/videos', params={
            'part': 'statistics,contentDetails', 'id': ','.join(x['id'] for x in lote)},
            headers={'Authorization': f'Bearer {at}'}, timeout=30).json()
        por = {v['id']: v for v in d.get('items', [])}
        if 'error' in d:
            anota('youtube', d['error'])
        for x in lote:
            s = por.get(x['id'], {}).get('statistics', {})
            res.append({'red': 'youtube', 'clave': x['clave'], 'fecha': x['fecha'], 'vistas': num(s.get('viewCount')),
                        'likes': num(s.get('likeCount')), 'comentarios': num(s.get('commentCount'))})
    # Retención (necesita permiso de YouTube Analytics; si no lo hay, se avisa)
    try:
        d = requests.get('https://youtubeanalytics.googleapis.com/v2/reports', params={
            'ids': 'channel==MINE', 'startDate': '2026-10-01', 'endDate': '2026-12-31', 'dimensions': 'video',
            'metrics': 'views,averageViewPercentage,averageViewDuration', 'maxResults': 200, 'sort': '-views'},
            headers={'Authorization': f'Bearer {at}'}, timeout=30).json()
        if 'rows' in d:
            ret = {r[0]: (r[2], r[3]) for r in d['rows']}
            por_id = {x['id']: x['clave'] for x in ids}
            for r in res:
                if r['red'] == 'youtube':
                    vid = next((k for k, c in por_id.items() if c == r['clave']), None)
                    if vid in ret:
                        r['pct_visto'], r['seg_promedio'] = ret[vid]
        else:
            anota('youtube_retencion', d.get('error', d))
    except Exception as e:  # noqa: BLE001
        anota('youtube_retencion', e)
except Exception as e:  # noqa: BLE001
    anota('youtube', e)

# Facebook (reels de la página)
try:
    pt, _ = P.pagina_token()
    for x in [x for x in filas if x['red'] == 'facebook']:
        r = {'red': 'facebook', 'clave': x['clave'], 'fecha': x['fecha']}
        d = requests.get(f'{P.G}/{x["id"]}/video_insights', params={'access_token': pt}, timeout=30).json()
        for m in d.get('data', []):
            v = (m.get('values') or [{}])[0].get('value')
            if m['name'] in ('blue_reels_play_count', 'fb_reels_total_plays'):
                r['vistas'] = num(v)
            elif m['name'] == 'post_impressions_unique':
                r['alcance'] = num(v)
            elif m['name'] == 'post_video_avg_time_watched':
                r['seg_promedio'] = round((num(v) or 0) / 1000, 1)
        if 'error' in d:
            anota('facebook', d['error'])
        res.append(r)
except Exception as e:  # noqa: BLE001
    anota('facebook', e)

# Instagram
try:
    t = P.meta_token()
    for x in [x for x in filas if x['red'] == 'instagram']:
        r = {'red': 'instagram', 'clave': x['clave'], 'fecha': x['fecha']}
        d = requests.get(f'{P.G}/{x["id"]}/insights', params={
            'metric': 'views,reach,likes,comments,saved,shares,ig_reels_avg_watch_time', 'access_token': t}, timeout=30).json()
        if 'error' in d:
            d = requests.get(f'{P.G}/{x["id"]}/insights', params={
                'metric': 'views,reach,likes,comments,saved,shares', 'access_token': t}, timeout=30).json()
        for m in d.get('data', []):
            v = (m.get('values') or [{}])[0].get('value')
            k = {'views': 'vistas', 'reach': 'alcance', 'likes': 'likes', 'comments': 'comentarios', 'saved': 'guardados',
                 'shares': 'compartidos', 'ig_reels_avg_watch_time': 'seg_promedio'}.get(m['name'])
            if k:
                r[k] = round(v / 1000, 1) if k == 'seg_promedio' and v else num(v)
        if 'error' in d:
            anota('instagram', d['error'])
        res.append(r)
except Exception as e:  # noqa: BLE001
    anota('instagram', e)

# Threads
try:
    tt, _, _ = P.threads_token()
    for x in [x for x in filas if x['red'] == 'threads']:
        r = {'red': 'threads', 'clave': x['clave'], 'fecha': x['fecha']}
        d = requests.get(f'{P.TH}/{x["id"]}/insights', params={'metric': 'views,likes,replies,reposts', 'access_token': tt},
                         timeout=30).json()
        for m in d.get('data', []):
            v = (m.get('values') or [{}])[0].get('value', (m.get('total_value') or {}).get('value'))
            r[{'views': 'vistas', 'likes': 'likes', 'replies': 'comentarios', 'reposts': 'compartidos'}[m['name']]] = num(v)
        if 'error' in d:
            anota('threads', d['error'])
        res.append(r)
except Exception as e:  # noqa: BLE001
    anota('threads', e)

# LinkedIn (perfil personal: la API suele dar solo reacciones y comentarios)
try:
    lt, _, _ = P.linkedin_yo()
    for x in [x for x in filas if x['red'] == 'linkedin']:
        r = {'red': 'linkedin', 'clave': x['clave'], 'fecha': x['fecha']}
        q = requests.utils.quote(x['id'], safe='')
        d = P.li('GET', f'/rest/socialMetadata/{q}', lt)
        if d.status_code == 200:
            j = d.json()
            r['likes'] = sum((v or {}).get('count', 0) for v in (j.get('reactionSummaries') or {}).values())
            r['comentarios'] = (j.get('commentSummary') or {}).get('count')
        else:
            anota('linkedin', f'{d.status_code} {d.text[:200]}')
        res.append(r)
except Exception as e:  # noqa: BLE001
    anota('linkedin', e)

# TikTok (solo si la app tiene permiso video.list; los borradores no tienen cifras)
try:
    at, scope, _ = P.tiktok_token()
    if 'video.list' in scope:
        cursor, vids = None, []
        for _ in range(10):
            body = {'max_count': 20}
            if cursor:
                body['cursor'] = cursor
            d = requests.post(f'{P.TT}/video/list/?fields=id,title,create_time,view_count,like_count,comment_count,share_count',
                              json=body, headers={'Authorization': f'Bearer {at}', 'Content-Type': 'application/json'},
                              timeout=30).json()
            dd = d.get('data') or {}
            vids += dd.get('videos', [])
            if not dd.get('has_more'):
                break
            cursor = dd.get('cursor')
        for v in vids:
            res.append({'red': 'tiktok', 'clave': (v.get('title') or '')[:60], 'fecha': v.get('create_time'),
                        'vistas': v.get('view_count'), 'likes': v.get('like_count'), 'comentarios': v.get('comment_count'),
                        'compartidos': v.get('share_count')})
    else:
        anota('tiktok', f'la app no tiene permiso para leer videos (permisos: {scope}); además se publican como borrador')
except Exception as e:  # noqa: BLE001
    anota('tiktok', e)

json.dump({'videos': res, 'errores': errores}, open('estadisticas.json', 'w'), ensure_ascii=False, indent=1)
print('ERRORES:', json.dumps(errores, ensure_ascii=False))
for red in ['youtube', 'facebook', 'instagram', 'threads', 'linkedin', 'tiktok']:
    xs = [r for r in res if r['red'] == red]
    v = [r['vistas'] for r in xs if r.get('vistas') is not None]
    if not xs:
        continue
    print(f'\n== {red}: {len(xs)} videos · vistas total {sum(v) if v else "-"} · mediana {st.median(v) if v else "-"}')
    for r in sorted(xs, key=lambda r: -(r.get('vistas') or 0)):
        print('  ', json.dumps(r, ensure_ascii=False))
