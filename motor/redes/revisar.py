"""Revisión de solo lectura de una publicación: qué dicen Facebook y TikTok de lo que se subió (no publica nada)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import publicar as P  # noqa: E402
import requests  # noqa: E402

clave = sys.argv[1]
filas = [x for x in P.bitacora() if x.get('clave') == clave and x.get('modo') == 'real']
for x in filas:
    red, vid = x['red'], x.get('id')
    try:
        if red == 'facebook':
            pt, _ = P.pagina_token()
            d = requests.get(f'{P.G}/{vid}', params={'fields': 'status,published,permalink_url,title,created_time,from',
                                                    'access_token': pt}, timeout=30).json()
            print('FACEBOOK video:', json.dumps(d, ensure_ascii=False))
            d = requests.get(f'{P.G}/{P.ENV("META_PAGE_ID")}/video_reels', params={'fields': 'id,title,published,status',
                                                                                'limit': 5, 'access_token': pt}, timeout=30).json()
            print('FACEBOOK reels de la página:', json.dumps(d, ensure_ascii=False)[:1500])
            d = requests.get(f'{P.G}/{P.ENV("META_PAGE_ID")}', params={'fields': 'name,link,is_published', 'access_token': pt}, timeout=30).json()
            print('FACEBOOK página:', json.dumps(d, ensure_ascii=False))
        elif red == 'tiktok':
            at, scope, vence = P.tiktok_token()
            d = requests.post(f'{P.TT}/post/publish/status/fetch/', json={'publish_id': vid},
                              headers={'Authorization': f'Bearer {at}', 'Content-Type': 'application/json; charset=UTF-8'}, timeout=30).json()
            print('TIKTOK estado:', json.dumps(d, ensure_ascii=False))
            print('TIKTOK permisos:', scope)
            print('TIKTOK cuenta:', json.dumps(P.tiktok_creador(at), ensure_ascii=False)[:800])
    except Exception as e:  # noqa: BLE001
        print(red, 'ERROR', e)
