# subir.py — sube el pitch de Fungi Mati a YouTube (no listado), con título, descripción (capítulos + guion),
# etiquetas y portada. Usa la misma app de YouTube del publicador de la sala (secretos YOUTUBE_*).
# Uso (en GitHub Actions): python subir.py <video.mp4> <portada.jpg> <salida.json>
import json, os, sys, requests

AQUI = os.path.dirname(os.path.abspath(__file__))
video, portada, salida = sys.argv[1:4]
meta = json.load(open(os.path.join(AQUI, 'meta.json'), encoding='utf-8'))
desc = open(os.path.join(AQUI, 'descripcion.txt'), encoding='utf-8').read().strip()
assert len(meta['titulo']) <= 100 and len(desc.encode()) <= 5000 and not any(c in desc + meta['titulo'] for c in '<>')

tok = requests.post('https://oauth2.googleapis.com/token', data={
    'client_id': os.environ['YOUTUBE_CLIENT_ID'], 'client_secret': os.environ['YOUTUBE_CLIENT_SECRET'],
    'refresh_token': os.environ['YOUTUBE_REFRESH_TOKEN'], 'grant_type': 'refresh_token'}, timeout=30)
tok.raise_for_status()
at = tok.json()['access_token']
print(f'::add-mask::{at}')
H = {'Authorization': f'Bearer {at}'}

cuerpo = {'snippet': {'title': meta['titulo'], 'description': desc, 'tags': meta['etiquetas'], 'categoryId': meta['categoria'],
                      'defaultLanguage': meta['idioma'], 'defaultAudioLanguage': meta['idioma']},
          'status': {'privacyStatus': meta['privacidad'], 'selfDeclaredMadeForKids': False, 'embeddable': True,
                     'license': 'youtube', 'publicStatsViewable': True, 'containsSyntheticMedia': True}}
ini = requests.post('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
                    headers={**H, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': 'video/mp4',
                             'X-Upload-Content-Length': str(os.path.getsize(video))}, data=json.dumps(cuerpo), timeout=60)
if ini.status_code >= 300 or 'Location' not in ini.headers:
    sys.exit(f'YouTube no aceptó el inicio: {ini.status_code} {ini.text[:800]}')
with open(video, 'rb') as f:
    up = requests.put(ini.headers['Location'], headers={'Content-Type': 'video/mp4'}, data=f, timeout=3600)
if up.status_code >= 300:
    sys.exit(f'YouTube no aceptó el video: {up.status_code} {up.text[:800]}')
v = up.json()
res = {'id': v['id'], 'url': f'https://youtu.be/{v["id"]}', 'privacidad': v.get('status', {}).get('privacyStatus'),
       'titulo': meta['titulo']}
print('Subido:', res)

with open(portada, 'rb') as f:
    th = requests.post(f'https://www.googleapis.com/upload/youtube/v3/thumbnails/set?videoId={v["id"]}',
                       headers={**H, 'Content-Type': 'image/jpeg'}, data=f, timeout=120)
res['portada'] = 'ok' if th.status_code < 300 else f'no se pudo ({th.status_code}): {th.text[:300]}'
print('Portada:', res['portada'])
json.dump(res, open(salida, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
