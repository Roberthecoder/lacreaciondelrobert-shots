#!/usr/bin/env python3
"""Publicador de redes de La Creación del Robert. Corre SOLO dentro de GitHub Actions (usa los secretos del repo).

Comandos (los llama .github/workflows/publicar.yml, renovar-tokens.yml y tiktok-conectar.yml):
  publicar --clave <shot> --redes facebook,instagram,... --modo prueba|privado|real [--video ruta.mp4]
  renovar                       renueva Threads y TikTok y revisa LinkedIn y YouTube
  tiktok-codigo <codigo>        cambia el código de "Autorizar" de TikTok por el token y lo guarda cifrado

Modos:
  prueba  = revisa tokens, permisos, video y textos; NO sube nada.
  privado = sube como borrador o privado (Facebook: borrador · Instagram/Threads: contenedor listo sin publicar ·
            YouTube: privado · LinkedIn: video subido sin post · TikTok: borrador en la bandeja). Nadie lo ve.
  real    = publica de verdad. Solo con el permiso de Robert para ESA publicación (ver ADMIN.md, "Publicar en redes").

Nunca imprime tokens: todo token nuevo se oculta en los registros con ::add-mask:: (el repo es público).
Los tokens que cambian solos (Threads, TikTok) se guardan cifrados en la referencia refs/estado/tokens.
"""
import argparse, datetime as dt, json, os, re, subprocess, sys, time

import requests

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(AQUI))
from sala import redes_de, titulo_de  # noqa: E402  (motor/sala.py: lee publicacion.md)

G = 'https://graph.facebook.com/v23.0'
TH = 'https://graph.threads.net/v1.0'
TT = 'https://open.tiktokapis.com/v2'
LI = 'https://api.linkedin.com'
LI_VERSIONES = ['202609', '202606', '202603', '202512']   # LinkedIn-Version: se prueba de la más nueva a la más vieja
REDES = ['facebook', 'instagram', 'threads', 'youtube', 'linkedin', 'tiktok']
REDIRECT_TIKTOK = 'https://roberthecoder.github.io/lacreaciondelrobert-shots/'
REF_TOKENS = 'refs/estado/tokens'
REF_LOG = 'refs/estado/publicaciones'
ENV = os.environ.get


def mask(v):
    if v:
        print(f'::add-mask::{v}', flush=True)


def ahora():
    return dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')


class Falla(Exception):
    pass


def j(r):
    try:
        return r.json()
    except ValueError:
        return {'_texto': r.text[:300]}


def err(r, que):
    d = j(r)
    e = d.get('error') if isinstance(d, dict) else None
    msg = (e.get('message') if isinstance(e, dict) else e) or d.get('message') or d.get('error_description') or         (d.get('debug_info') or {}).get('message') or d.get('_texto') or r.text[:300]
    raise Falla(f'{que}: HTTP {r.status_code} {str(msg)[:300]}')


def ok(r, que):
    if r.status_code >= 300:
        err(r, que)
    d = j(r)
    if isinstance(d, dict) and d.get('error') and not (isinstance(d['error'], dict) and d['error'].get('code') == 'ok'):
        err(r, que)
    return d


# ---------- tokens guardados (cifrados) en refs/estado/tokens ----------

def git(*a, entrada=None):
    return subprocess.run(['git', *a], check=True, capture_output=True, text=True, input=entrada).stdout.strip()


def _arbol(ref):
    try:
        git('fetch', '-q', 'origin', f'+{ref}:{ref}')
        return git('rev-parse', ref)
    except subprocess.CalledProcessError:
        return None


def _leer_archivo(ref, nombre):
    sha = _arbol(ref)
    if not sha:
        return None
    try:
        return git('show', f'{sha}:{nombre}')
    except subprocess.CalledProcessError:
        return None


def _escribir_archivos(ref, archivos, mensaje):
    """archivos = {nombre: texto}; conserva los demás archivos de la referencia."""
    sha = _arbol(ref)
    filas = {}
    if sha:
        for linea in git('ls-tree', sha).splitlines():
            meta, nombre = linea.split('\t', 1)
            filas[nombre] = meta
    for nombre, texto in archivos.items():
        blob = git('hash-object', '-w', '--stdin', entrada=texto)
        filas[nombre] = f'100644 blob {blob}'
    arbol = git('mktree', entrada=''.join(f'{m}\t{n}\n' for n, m in sorted(filas.items())))
    env = dict(os.environ, GIT_AUTHOR_NAME='github-actions[bot]', GIT_COMMITTER_NAME='github-actions[bot]',
               GIT_AUTHOR_EMAIL='41898283+github-actions[bot]@users.noreply.github.com',
               GIT_COMMITTER_EMAIL='41898283+github-actions[bot]@users.noreply.github.com')
    args = ['git', 'commit-tree', arbol, '-m', mensaje + ' [sin render]'] + (['-p', sha] if sha else [])
    nuevo = subprocess.run(args, check=True, capture_output=True, text=True, env=env).stdout.strip()
    git('push', '-q', '-f', 'origin', f'{nuevo}:{ref}')


def _openssl(modo, texto, clave):
    env = dict(os.environ, KTOK=clave)
    args = ['openssl', 'enc', '-aes-256-cbc', '-pbkdf2', '-iter', '200000', '-md', 'sha256', '-a', '-A', '-pass', 'env:KTOK']
    if modo == 'd':
        args.insert(2, '-d')
    else:
        args.insert(2, '-salt')
    r = subprocess.run(args, input=texto, capture_output=True, text=True, env=env)
    if r.returncode:
        raise Falla('no se pudo ' + ('descifrar' if modo == 'd' else 'cifrar') + ' el token guardado')
    return r.stdout


# La llave de cada token cifrado es un secreto que ya existe y no caduca:
#   tiktok -> TIKTOK_CLIENT_SECRET · threads -> META_SYSTEM_TOKEN
LLAVES = {'tiktok': 'TIKTOK_CLIENT_SECRET', 'threads': 'META_SYSTEM_TOKEN'}


def leer_guardado(nombre):
    clave = ENV(LLAVES[nombre])
    cifrado = _leer_archivo(REF_TOKENS, f'{nombre}.enc')
    if not (clave and cifrado):
        return None
    try:
        d = json.loads(_openssl('d', cifrado, clave))
    except (Falla, ValueError):
        print(f'Aviso: el token guardado de {nombre} no se pudo leer (¿cambió {LLAVES[nombre]}?).')
        return None
    for v in d.values():
        if isinstance(v, str) and len(v) > 20:
            mask(v)
    return d


def guardar(nombre, datos, estado_extra=None):
    clave = ENV(LLAVES[nombre])
    if not clave:
        raise Falla(f'falta el secreto {LLAVES[nombre]} para cifrar el token de {nombre}')
    archivos = {f'{nombre}.enc': _openssl('e', json.dumps(datos), clave)}
    estado = json.loads(_leer_archivo(REF_TOKENS, 'estado.json') or '{}')
    estado.update(estado_extra or {})
    estado['actualizado'] = ahora()
    archivos['estado.json'] = json.dumps(estado, ensure_ascii=False, indent=1)
    _escribir_archivos(REF_TOKENS, archivos, f'Token {nombre} renovado')


def anotar_estado(cambios):
    estado = json.loads(_leer_archivo(REF_TOKENS, 'estado.json') or '{}')
    estado.update(cambios)
    estado['actualizado'] = ahora()
    _escribir_archivos(REF_TOKENS, {'estado.json': json.dumps(estado, ensure_ascii=False, indent=1)}, 'Estado de tokens')


# ---------- acceso por red ----------

def meta_token():
    t = ENV('META_SYSTEM_TOKEN')
    if not t:
        raise Falla('falta el secreto META_SYSTEM_TOKEN')
    return t


def meta_permisos():
    d = ok(requests.get(f'{G}/me/permissions', params={'access_token': meta_token()}, timeout=30), 'Meta permisos')
    return {p['permission'] for p in d.get('data', []) if p.get('status') == 'granted'}


def pagina_token():
    d = ok(requests.get(f'{G}/{ENV("META_PAGE_ID")}', params={'fields': 'name,access_token', 'access_token': meta_token()},
                        timeout=30), 'Facebook página')
    if not d.get('access_token'):
        raise Falla('Facebook: el token no trae acceso a la página (¿falta asignar la página al usuario del sistema?)')
    mask(d['access_token'])
    return d['access_token'], d.get('name')


def threads_token():
    for origen, t in (('guardado', (leer_guardado('threads') or {}).get('token')), ('secreto', ENV('THREADS_TOKEN'))):
        if not t:
            continue
        r = requests.get(f'{TH}/me', params={'fields': 'id,username', 'access_token': t}, timeout=30)
        if r.status_code == 200 and j(r).get('id'):
            return t, j(r).get('username'), origen
    raise Falla('Threads: ningún token sirve (el guardado y THREADS_TOKEN fallaron). Hay que generar uno nuevo (ADMIN.md).')


def youtube_token():
    d = ok(requests.post('https://oauth2.googleapis.com/token', data={
        'client_id': ENV('YOUTUBE_CLIENT_ID'), 'client_secret': ENV('YOUTUBE_CLIENT_SECRET'),
        'refresh_token': ENV('YOUTUBE_REFRESH_TOKEN'), 'grant_type': 'refresh_token'}, timeout=30), 'YouTube token')
    mask(d.get('access_token'))
    if 'youtube.upload' not in d.get('scope', '') and 'auth/youtube ' not in d.get('scope', '') + ' ':
        raise Falla(f'YouTube: el token no tiene permiso de subir (scope: {d.get("scope")})')
    return d['access_token']


def linkedin_yo():
    t = ENV('LINKEDIN_TOKEN')
    if not t:
        raise Falla('falta el secreto LINKEDIN_TOKEN')
    r = requests.get(f'{LI}/v2/userinfo', headers={'Authorization': f'Bearer {t}'}, timeout=30)
    if r.status_code == 401:
        raise Falla('LinkedIn: el token venció. Robert lo regenera (ADMIN.md, "Renovar tokens") y lo pega en LINKEDIN_TOKEN.')
    d = ok(r, 'LinkedIn userinfo')
    return t, f'urn:li:person:{d["sub"]}', d.get('name')


_li_version = None


def li(metodo, ruta, token, **kw):
    """Llamada a la API REST de LinkedIn probando versiones hasta dar con una vigente."""
    global _li_version
    for v in ([_li_version] if _li_version else LI_VERSIONES):
        h = {'Authorization': f'Bearer {token}', 'LinkedIn-Version': v, 'X-Restli-Protocol-Version': '2.0.0'}
        h.update(kw.pop('headers', {}))
        r = requests.request(metodo, f'{LI}{ruta}', headers=h, timeout=120, **kw)
        if r.status_code == 426 or 'NONEXISTENT_VERSION' in r.text or 'VERSION_MISSING' in r.text:
            continue
        _li_version = v
        return r
    raise Falla('LinkedIn: ninguna LinkedIn-Version funcionó; actualiza LI_VERSIONES en motor/redes/publicar.py')


def tiktok_token():
    g = leer_guardado('tiktok')
    if not g or not g.get('refresh_token'):
        raise Falla('TikTok: todavía no hay token. Robert da clic en "Conectar TikTok" (ADMIN.md, "Publicar en redes").')
    d = requests.post(f'{TT}/oauth/token/', data={
        'client_key': ENV('TIKTOK_CLIENT_KEY', '').strip(), 'client_secret': ENV('TIKTOK_CLIENT_SECRET', '').strip(),
        'grant_type': 'refresh_token', 'refresh_token': g['refresh_token']},
        headers={'Content-Type': 'application/x-www-form-urlencoded'}, timeout=30)
    d = ok(d, 'TikTok renovar token')
    if not d.get('access_token'):
        raise Falla(f'TikTok: no devolvió token ({d.get("error")}: {d.get("error_description")})')
    mask(d['access_token'])
    mask(d.get('refresh_token'))
    vence = (dt.datetime.now(dt.timezone.utc) + dt.timedelta(seconds=int(d.get('refresh_expires_in', 0)))).strftime('%Y-%m-%d')
    if d.get('refresh_token') and d['refresh_token'] != g['refresh_token']:
        guardar('tiktok', {'refresh_token': d['refresh_token'], 'open_id': d.get('open_id'), 'scope': d.get('scope')},
                {'tiktok_refresh_vence': vence})
    return d['access_token'], d.get('scope', ''), vence


def tiktok_usuario(at):
    d = ok(requests.get(f'{TT}/user/info/', params={'fields': 'open_id,display_name'},
                        headers={'Authorization': f'Bearer {at}'}, timeout=30), 'TikTok usuario')
    return (d.get('data') or {}).get('user', {}).get('display_name')


# ---------- video y textos ----------

def info_video(ruta):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=codec_type,codec_name,width,height',
                        '-of', 'json', ruta], capture_output=True, text=True)
    d = json.loads(r.stdout or '{}')
    v = next((s for s in d.get('streams', []) if s.get('codec_type') == 'video'), {})
    a = next((s for s in d.get('streams', []) if s.get('codec_type') == 'audio'), {})
    return {'dur': float(d.get('format', {}).get('duration', 0)), 'w': v.get('width'), 'h': v.get('height'),
            'vcodec': v.get('codec_name'), 'acodec': a.get('codec_name'), 'bytes': os.path.getsize(ruta)}


LIMITES = {'facebook': (3, 90), 'instagram': (3, 90), 'threads': (1, 300), 'youtube': (1, 180), 'linkedin': (3, 600),
           'tiktok': (3, 600)}


def revisar_video(red, iv):
    lo, hi = LIMITES[red]
    problemas = []
    if not lo <= iv['dur'] <= hi:
        problemas.append(f'dura {iv["dur"]:.1f} s (permitido {lo}–{hi} s)')
    if iv['w'] and iv['h'] and abs(iv['w'] / iv['h'] - 9 / 16) > 0.02:
        problemas.append(f'no es vertical 9:16 ({iv["w"]}×{iv["h"]})')
    if iv['vcodec'] not in ('h264', 'hevc'):
        problemas.append(f'códec de video {iv["vcodec"]}')
    if iv['acodec'] != 'aac':
        problemas.append(f'códec de audio {iv["acodec"]}')
    if iv['bytes'] > 280 * 1024 * 1024:
        problemas.append('pesa más de 280 MB')
    return problemas


def textos(clave):
    carpeta = os.path.join('shots', clave)
    r = redes_de(os.path.join(carpeta, 'publicacion.md'))
    return r, titulo_de(carpeta, clave)


def revisar_texto(red, r):
    if red == 'tiktok':
        return []   # en la bandeja de TikTok el texto lo pega Robert en la app; se le deja listo en el resumen
    t = r.get(red)
    if not t or not t.get('texto'):
        return [f'publicacion.md no tiene texto de {red}']
    n = len(t['texto'])
    lim = {'facebook': 5000, 'instagram': 2200, 'threads': 500, 'youtube': 5000, 'linkedin': 3000}[red]
    p = [f'el texto de {red} mide {n} caracteres (máximo {lim})'] if n > lim else []
    if red == 'instagram' and len(re.findall(r'#\w', t['texto'])) > 30:
        p.append('Instagram: más de 30 hashtags')
    if red == 'youtube':
        tit = t.get('titulo', '')
        if not tit or len(tit) > 100:
            p.append(f'título de YouTube vacío o de más de 100 caracteres ({len(tit)})')
        if re.search(r'[<>]', tit + t['texto']):
            p.append('YouTube no acepta los signos < o >')
    return p


# ---------- subidas ----------

def esperar(que, fn, listo, error, max_s=600, paso=8):
    t0 = time.time()
    while time.time() - t0 < max_s:
        d = fn()
        if listo(d):
            return d
        e = error(d)
        if e:
            raise Falla(f'{que}: {e}')
        time.sleep(paso)
    raise Falla(f'{que}: no terminó de procesar en {max_s // 60} min')


def subir_facebook(video, r, modo, titulo):
    pt, _ = pagina_token()
    page = ENV('META_PAGE_ID')
    d = ok(requests.post(f'{G}/{page}/video_reels', data={'upload_phase': 'start', 'access_token': pt}, timeout=60),
           'Facebook iniciar')
    vid, url = d['video_id'], d['upload_url']
    with open(video, 'rb') as f:
        ok(requests.post(url, headers={'Authorization': f'OAuth {pt}', 'offset': '0',
                                       'file_size': str(os.path.getsize(video))}, data=f, timeout=900), 'Facebook subir')
    ok(requests.post(f'{G}/{page}/video_reels', data={
        'upload_phase': 'finish', 'video_id': vid, 'access_token': pt, 'title': titulo[:255],
        'video_state': 'PUBLISHED' if modo == 'real' else 'DRAFT', 'description': r['facebook']['texto']}, timeout=60),
        'Facebook terminar')
    st = esperar('Facebook procesar',
                 lambda: j(requests.get(f'{G}/{vid}', params={'fields': 'status', 'access_token': pt}, timeout=30)),
                 lambda d: (d.get('status') or {}).get('video_status') in ('ready', 'published') or
                 ((d.get('status') or {}).get('processing_phase') or {}).get('status') == 'complete',
                 lambda d: (d.get('status') or {}).get('video_status') == 'error' and json.dumps(d.get('status'))[:300])
    return {'id': vid, 'url': f'https://www.facebook.com/reel/{vid}', 'nota': 'borrador en Meta Business Suite'
            if modo != 'real' else (st.get('status') or {}).get('video_status')}


def subir_instagram(video, r, modo, titulo, video_url=''):
    t, ig = meta_token(), ENV('META_IG_ID')
    base = {'media_type': 'REELS', 'share_to_feed': 'true', 'caption': r['instagram']['texto'], 'access_token': t}
    try:   # 1) subida directa del archivo (rupload)
        d = ok(requests.post(f'{G}/{ig}/media', data={**base, 'upload_type': 'resumable'}, timeout=60), 'Instagram contenedor')
        cid = d['id']
        with open(video, 'rb') as f:
            ok(requests.post(d['uri'], headers={'Authorization': f'OAuth {t}', 'offset': '0',
                                                'file_size': str(os.path.getsize(video))}, data=f, timeout=900), 'Instagram subir')
    except Falla as e:   # 2) si falla, Instagram baja el MP4 del enlace público del Release
        if not video_url:
            raise
        print(f'Instagram: la subida directa falló ({e}); pruebo con el enlace del Release', flush=True)
        cid = ok(requests.post(f'{G}/{ig}/media', data={**base, 'video_url': url_publica(video_url)}, timeout=60),
                 'Instagram contenedor por enlace')['id']
    esperar('Instagram procesar',
            lambda: j(requests.get(f'{G}/{cid}', params={'fields': 'status_code,status', 'access_token': t}, timeout=30)),
            lambda d: d.get('status_code') == 'FINISHED',
            lambda d: d.get('status_code') in ('ERROR', 'EXPIRED') and f'{d.get("status_code")} {d.get("status")}')
    if modo != 'real':
        return {'id': cid, 'nota': 'contenedor listo y NO publicado (Instagram no tiene borradores por API; caduca en 24 h)'}
    p = ok(requests.post(f'{G}/{ig}/media_publish', data={'creation_id': cid, 'access_token': t}, timeout=60),
           'Instagram publicar')
    link = j(requests.get(f'{G}/{p["id"]}', params={'fields': 'permalink', 'access_token': t}, timeout=30)).get('permalink')
    return {'id': p['id'], 'url': link}


def url_publica(url):
    """Las descargas de un Release redirigen a un enlace firmado; se le da a Meta el enlace final."""
    r = requests.head(url, allow_redirects=False, timeout=30)
    return r.headers.get('Location', url) if r.status_code in (301, 302, 303, 307, 308) else url


def subir_threads(video, r, modo, titulo, video_url):
    t, _, _ = threads_token()
    if not video_url:
        raise Falla('Threads necesita el enlace público del MP4 (Release); no se encontró')
    d = ok(requests.post(f'{TH}/me/threads', data={'media_type': 'VIDEO', 'video_url': url_publica(video_url),
                                                   'text': r['threads']['texto'], 'access_token': t}, timeout=60),
           'Threads contenedor')
    cid = d['id']
    esperar('Threads procesar',
            lambda: j(requests.get(f'{TH}/{cid}', params={'fields': 'status,error_message', 'access_token': t}, timeout=30)),
            lambda d: d.get('status') == 'FINISHED',
            lambda d: d.get('status') in ('ERROR', 'EXPIRED') and f'{d.get("status")} {d.get("error_message")}')
    if modo != 'real':
        return {'id': cid, 'nota': 'contenedor listo y NO publicado (Threads no tiene borradores por API)'}
    p = ok(requests.post(f'{TH}/me/threads_publish', data={'creation_id': cid, 'access_token': t}, timeout=60),
           'Threads publicar')
    link = j(requests.get(f'{TH}/{p["id"]}', params={'fields': 'permalink', 'access_token': t}, timeout=30)).get('permalink')
    return {'id': p['id'], 'url': link}


def subir_youtube(video, r, modo, titulo):
    at = youtube_token()
    y = r['youtube']
    tags = list(dict.fromkeys(re.findall(r'#(\w+)', y['texto'])))[:15]
    cuerpo = {'snippet': {'title': y['titulo'], 'description': y['texto'], 'categoryId': '28', 'tags': tags,
                          'defaultLanguage': 'es-419', 'defaultAudioLanguage': 'es-419'},
              'status': {'privacyStatus': 'public' if modo == 'real' else 'private', 'selfDeclaredMadeForKids': False,
                         'containsSyntheticMedia': ENV('YOUTUBE_SINTETICO', 'true') == 'true'}}
    ini = requests.post('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
                        headers={'Authorization': f'Bearer {at}', 'Content-Type': 'application/json; charset=UTF-8',
                                 'X-Upload-Content-Type': 'video/mp4', 'X-Upload-Content-Length': str(os.path.getsize(video))},
                        data=json.dumps(cuerpo), timeout=60)
    if ini.status_code >= 300 or 'Location' not in ini.headers:
        err(ini, 'YouTube iniciar')
    with open(video, 'rb') as f:
        up = ok(requests.put(ini.headers['Location'], headers={'Content-Type': 'video/mp4'}, data=f, timeout=1800),
                'YouTube subir')
    st = up.get('status', {}).get('privacyStatus')
    nota = 'privado' if st == 'private' else st
    if modo == 'real' and st == 'private':
        nota = 'quedó PRIVADO: Google bloquea en privado los videos de apps sin auditoría (ver ADMIN.md)'
    return {'id': up['id'], 'url': f'https://youtube.com/shorts/{up["id"]}', 'nota': nota}


def li_texto(t):
    """Formato "little text" de LinkedIn: escapar reservados y convertir #etiquetas."""
    t = re.sub(r'([\\|{}@\[\]()<>*_~])', r'\\\1', t)
    return re.sub(r'#(\w+)', lambda m: '{hashtag|\\#|' + m.group(1) + '}', t)


def subir_linkedin(video, r, modo, titulo):
    t, urn, _ = linkedin_yo()
    n = os.path.getsize(video)
    d = li('POST', '/rest/videos?action=initializeUpload', t, json={'initializeUploadRequest': {
        'owner': urn, 'fileSizeBytes': n, 'uploadCaptions': False, 'uploadThumbnail': False}})
    d = ok(d, 'LinkedIn iniciar').get('value', {})
    vurn, etags = d['video'], []
    with open(video, 'rb') as f:
        for ins in d['uploadInstructions']:
            f.seek(ins['firstByte'])
            parte = f.read(ins['lastByte'] - ins['firstByte'] + 1)
            u = requests.put(ins['uploadUrl'], data=parte, headers={'Content-Type': 'application/octet-stream'}, timeout=600)
            if u.status_code >= 300:
                err(u, 'LinkedIn subir parte')
            etags.append(u.headers.get('ETag', '').strip('"'))
    f = li('POST', '/rest/videos?action=finalizeUpload', t, json={'finalizeUploadRequest': {
        'video': vurn, 'uploadToken': d.get('uploadToken', ''), 'uploadedPartIds': etags}})
    if f.status_code >= 300:
        err(f, 'LinkedIn terminar subida')
    from urllib.parse import quote
    esperar('LinkedIn procesar', lambda: j(li('GET', f'/rest/videos/{quote(vurn, safe="")}', t)),
            lambda d: d.get('status') == 'AVAILABLE',
            lambda d: d.get('status') in ('PROCESSING_FAILED',) and json.dumps(d)[:300])
    if modo != 'real':
        return {'id': vurn, 'nota': 'video subido SIN publicar post (LinkedIn no tiene borradores por API)'}
    p = li('POST', '/rest/posts', t, json={
        'author': urn, 'commentary': li_texto(r['linkedin']['texto']), 'visibility': 'PUBLIC',
        'distribution': {'feedDistribution': 'MAIN_FEED', 'targetEntities': [], 'thirdPartyDistributionChannels': []},
        'content': {'media': {'title': titulo[:200], 'id': vurn}}, 'lifecycleState': 'PUBLISHED',
        'isReshareDisabledByAuthor': False})
    if p.status_code >= 300:
        err(p, 'LinkedIn publicar')
    pid = p.headers.get('x-restli-id', '')
    return {'id': pid, 'url': f'https://www.linkedin.com/feed/update/{pid}/'}


def subir_tiktok(video, r, modo, titulo):
    at, _, _ = tiktok_token()
    n = os.path.getsize(video)
    if n > 64 * 1024 * 1024:
        raise Falla('TikTok: el video pesa más de 64 MB; falta subirlo en partes')
    d = ok(requests.post(f'{TT}/post/publish/inbox/video/init/', headers={
        'Authorization': f'Bearer {at}', 'Content-Type': 'application/json; charset=UTF-8'},
        json={'source_info': {'source': 'FILE_UPLOAD', 'video_size': n, 'chunk_size': n, 'total_chunk_count': 1}},
        timeout=60), 'TikTok iniciar')['data']
    with open(video, 'rb') as f:
        u = requests.put(d['upload_url'], data=f, timeout=900, headers={
            'Content-Type': 'video/mp4', 'Content-Length': str(n), 'Content-Range': f'bytes 0-{n - 1}/{n}'})
    if u.status_code >= 300:
        err(u, 'TikTok subir')
    pid = d['publish_id']
    st = esperar('TikTok procesar', lambda: j(requests.post(f'{TT}/post/publish/status/fetch/', json={'publish_id': pid},
                                                           headers={'Authorization': f'Bearer {at}'}, timeout=30)),
                 lambda d: (d.get('data') or {}).get('status') in ('SEND_TO_USER_INBOX', 'PUBLISH_COMPLETE'),
                 lambda d: (d.get('data') or {}).get('status') == 'FAILED' and (d.get('data') or {}).get('fail_reason'))
    return {'id': pid, 'nota': 'BORRADOR en la bandeja de TikTok (' + (st.get('data') or {}).get('status', '') +
            '): Robert lo abre en la app, pega el texto y publica él'}


SUBIR = {'facebook': subir_facebook, 'instagram': subir_instagram, 'youtube': subir_youtube, 'linkedin': subir_linkedin,
         'tiktok': subir_tiktok}


# ---------- revisiones (modo prueba) ----------

def probar(red):
    if red == 'facebook':
        faltan = {'pages_manage_posts', 'pages_read_engagement', 'pages_show_list'} - meta_permisos()
        _, nombre = pagina_token()
        if faltan:
            raise Falla(f'Facebook: faltan permisos {sorted(faltan)}')
        return f'página «{nombre}» lista'
    if red == 'instagram':
        faltan = {'instagram_basic', 'instagram_content_publish'} - meta_permisos()
        if faltan:
            raise Falla(f'Instagram: faltan permisos {sorted(faltan)}')
        t, ig = meta_token(), ENV('META_IG_ID')
        u = ok(requests.get(f'{G}/{ig}', params={'fields': 'username', 'access_token': t}, timeout=30), 'Instagram cuenta')
        q = j(requests.get(f'{G}/{ig}/content_publishing_limit', params={'fields': 'quota_usage,config', 'access_token': t},
                           timeout=30)).get('data', [{}])
        q = q[0] if q else {}
        return f'@{u.get("username")} lista (publicaciones usadas en 24 h: {q.get("quota_usage", "?")}/' \
               f'{(q.get("config") or {}).get("quota_total", "?")})'
    if red == 'threads':
        t, user, origen = threads_token()
        return f'@{user} lista (token {origen})'
    if red == 'youtube':
        youtube_token()
        return 'acceso renovado, permiso de subir OK'
    if red == 'linkedin':
        _, _, nombre = linkedin_yo()
        return f'perfil de {nombre} listo'
    if red == 'tiktok':
        at, scope, vence = tiktok_token()
        if 'video.upload' not in scope:
            raise Falla(f'TikTok: el token no trae video.upload (scope: {scope})')
        return f'cuenta «{tiktok_usuario(at)}» lista (permiso video.upload; el refresh vence {vence})'


# ---------- bitácora de publicaciones (refs/estado/publicaciones) ----------

def bitacora():
    try:
        return json.loads(_leer_archivo(REF_LOG, 'publicaciones.json') or '[]')
    except ValueError:
        return []


def anotar(filas):
    log = bitacora() + filas
    _escribir_archivos(REF_LOG, {'publicaciones.json': json.dumps(log, ensure_ascii=False, indent=1)},
                       f'Publicaciones {filas[0]["clave"]}')


# ---------- comandos ----------

def cmd_publicar(a):
    redes = REDES if a.redes in ('todas', '') else [x.strip().lower() for x in a.redes.split(',') if x.strip()]
    malas = [x for x in redes if x not in REDES]
    if malas:
        raise SystemExit(f'Redes desconocidas: {malas}. Usa: {", ".join(REDES)}')
    if a.modo == 'real' and a.confirmar != a.clave:
        raise SystemExit('Modo real: escribe la clave del shot en "confirmar" (y solo con permiso de Robert).')
    carpeta = os.path.join('shots', a.clave)
    if not os.path.isdir(carpeta):
        raise SystemExit(f'No existe {carpeta} en esta rama')
    ver = open(os.path.join(carpeta, 'verificacion.md'), encoding='utf-8').read() if os.path.exists(
        os.path.join(carpeta, 'verificacion.md')) else ''
    if a.clave not in open('.github/verificacion-exentos.txt', encoding='utf-8').read() and \
            'VEREDICTO: APROBADO' not in ver:
        raise SystemExit(f'{a.clave} no tiene "VEREDICTO: APROBADO" en verificacion.md: no se publica.')
    r, titulo = textos(a.clave)
    iv = info_video(a.video)
    ya = {(x['clave'], x['red']) for x in bitacora() if x.get('modo') == 'real' and x.get('ok')}
    filas, lineas = [], [f'## {a.clave} · modo **{a.modo}**', '',
                         f'Video: `{os.path.basename(a.video)}` · {iv["dur"]:.1f} s · {iv["w"]}×{iv["h"]} · '
                         f'{iv["bytes"] / 1048576:.1f} MB · {a.video_url or "sin enlace público"}', '',
                         '| Red | Resultado | Detalle |', '|---|---|---|']
    fallas = 0
    for red in redes:
        fila = {'clave': a.clave, 'red': red, 'modo': a.modo, 'fecha': ahora(), 'run': ENV('GITHUB_RUN_ID'),
                'autorizo': a.autorizo or None}
        try:
            if a.modo == 'real' and (a.clave, red) in ya and not a.repetir:
                raise Falla('ya se publicó antes en modo real (usa "repetir" si de verdad va otra vez)')
            prob = revisar_video(red, iv) + revisar_texto(red, r)
            if prob:
                raise Falla('; '.join(prob))
            if a.modo == 'prueba':
                fila.update(ok=True, nota=probar(red))
            elif red in ('threads', 'instagram'):
                fn = subir_threads if red == 'threads' else subir_instagram
                fila.update(ok=True, **fn(a.video, r, a.modo, titulo, a.video_url))
            else:
                fila.update(ok=True, **SUBIR[red](a.video, r, a.modo, titulo))
        except (Falla, requests.RequestException, KeyError) as e:
            fallas += 1
            fila.update(ok=False, error=str(e) if not isinstance(e, KeyError) else f'respuesta inesperada (falta {e})')
        filas.append(fila)
        detalle = fila.get('error') or ' '.join(str(fila[k]) for k in ('url', 'nota') if fila.get(k)) or fila.get('id', '')
        lineas.append(f'| {red} | {"✅" if fila["ok"] else "❌"} | {detalle} |')
        print(f'{red}: {"OK" if fila["ok"] else "FALLA"} · {detalle}', flush=True)
    if 'tiktok' in redes and r.get('tiktok'):
        lineas += ['', 'Texto para pegar en TikTok:', '```text', r['tiktok']['texto'], '```']
    if a.modo != 'prueba':
        anotar(filas)
    with open(ENV('GITHUB_STEP_SUMMARY', os.devnull), 'a', encoding='utf-8') as s:
        s.write('\n'.join(lineas) + '\n')
    json.dump(filas, open('resultado.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    if fallas:
        sys.exit(1)


def cmd_renovar(a):
    lineas, estado, fallas = ['## Renovación de tokens', ''], {}, 0
    # Threads: th_refresh_token extiende 60 días (el token debe tener más de 24 h).
    try:
        t, user, origen = threads_token()
        d = ok(requests.get('https://graph.threads.net/refresh_access_token',
                            params={'grant_type': 'th_refresh_token', 'access_token': t}, timeout=30), 'Threads renovar')
        mask(d.get('access_token'))
        vence = (dt.datetime.now(dt.timezone.utc) + dt.timedelta(seconds=int(d.get('expires_in', 0)))).strftime('%Y-%m-%d')
        guardar('threads', {'token': d['access_token']}, {'threads_vence': vence})
        lineas.append(f'- Threads (@{user}): renovado, vence {vence}')
    except Falla as e:
        fallas += 1
        lineas.append(f'- Threads: ❌ {e}')
        estado['threads_error'] = str(e)
    # TikTok: renovar el refresh token (dura 365 días) y guardarlo.
    try:
        at, scope, vence = tiktok_token()
        lineas.append(f'- TikTok («{tiktok_usuario(at)}»): OK, refresh vence {vence}')
        estado['tiktok_refresh_vence'] = vence
    except Falla as e:
        lineas.append(f'- TikTok: ⚠️ {e}')
        estado['tiktok_error'] = str(e)
    for red, fn in (('linkedin', linkedin_yo), ('youtube', youtube_token)):
        try:
            fn()
            lineas.append(f'- {red}: OK')
            estado[f'{red}_ok'] = ahora()
        except Falla as e:
            fallas += 1
            lineas.append(f'- {red}: ❌ {e}')
            estado[f'{red}_error'] = str(e)
    estado['linkedin_vence_aprox'] = ENV('LINKEDIN_VENCE', '2026-12-28')
    anotar_estado(estado)
    print('\n'.join(lineas))
    with open(ENV('GITHUB_STEP_SUMMARY', os.devnull), 'a', encoding='utf-8') as s:
        s.write('\n'.join(lineas) + '\n')
    if fallas:
        sys.exit(1)


def cmd_tiktok_codigo(a):
    codigo = a.codigo.strip()
    if '?' in codigo or 'code=' in codigo:   # por si pega el enlace completo
        m = re.search(r'[?&]code=([^&#]+)', codigo)
        codigo = requests.utils.unquote(m.group(1)) if m else codigo
    mask(codigo)
    d = ok(requests.post(f'{TT}/oauth/token/', data={
        'client_key': ENV('TIKTOK_CLIENT_KEY', '').strip(), 'client_secret': ENV('TIKTOK_CLIENT_SECRET', '').strip(), 'code': codigo,
        'grant_type': 'authorization_code', 'redirect_uri': REDIRECT_TIKTOK},
        headers={'Content-Type': 'application/x-www-form-urlencoded'}, timeout=30), 'TikTok código')
    if not d.get('refresh_token'):
        raise SystemExit(f'TikTok no dio token: {d.get("error")} {d.get("error_description")} (el código dura pocos minutos '
                         f'y sirve una sola vez: vuelve a dar clic en Autorizar)')
    mask(d['access_token'])
    mask(d['refresh_token'])
    vence = (dt.datetime.now(dt.timezone.utc) + dt.timedelta(seconds=int(d.get('refresh_expires_in', 0)))).strftime('%Y-%m-%d')
    guardar('tiktok', {'refresh_token': d['refresh_token'], 'open_id': d.get('open_id'), 'scope': d.get('scope')},
            {'tiktok_refresh_vence': vence, 'tiktok_scope': d.get('scope')})
    msg = f'TikTok conectado: cuenta «{tiktok_usuario(d["access_token"])}», permisos {d.get("scope")}, el token dura hasta {vence}.'
    print(msg)
    with open(ENV('GITHUB_STEP_SUMMARY', os.devnull), 'a', encoding='utf-8') as s:
        s.write(msg + '\n')


def main():
    p = argparse.ArgumentParser()
    s = p.add_subparsers(dest='cmd', required=True)
    a = s.add_parser('publicar')
    a.add_argument('--clave', required=True)
    a.add_argument('--redes', default='todas')
    a.add_argument('--modo', choices=['prueba', 'privado', 'real'], default='prueba')
    a.add_argument('--video', required=True)
    a.add_argument('--video-url', default='')
    a.add_argument('--confirmar', default='')
    a.add_argument('--autorizo', default='')
    a.add_argument('--repetir', action='store_true')
    s.add_parser('renovar')
    c = s.add_parser('tiktok-codigo')
    c.add_argument('codigo')
    x = p.parse_args()
    {'publicar': cmd_publicar, 'renovar': cmd_renovar, 'tiktok-codigo': cmd_tiktok_codigo}[x.cmd](x)


if __name__ == '__main__':
    main()
