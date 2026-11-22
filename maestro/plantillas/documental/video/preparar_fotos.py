"""Prepara las fotos del largo para el render.

Copia cada imagen de ../fuentes/{fotos_restauradas,fotos_facebook,fotos_basis,logos} a img/,
ya girada según su EXIF y con el lado largo de máximo 2000 px (render más rápido),
y escribe fotos.js con el tamaño final de cada una: window.FOTOS = {"img/...": [ancho, alto]}.

Uso (desde esta carpeta):  python preparar_fotos.py
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

AQUI = Path(__file__).resolve().parent
FUENTES = AQUI.parent / "fuentes"
CARPETAS = ["fotos_restauradas", "fotos_facebook", "fotos_basis"]
LADO_MAX = 2000
EXT = {".jpg", ".jpeg", ".png", ".webp"}

medidas = {}
for carpeta in CARPETAS:
    for src in sorted((FUENTES / carpeta).rglob("*")):
        if src.suffix.lower() not in EXT:
            continue
        rel = src.relative_to(FUENTES / carpeta)
        dst = AQUI / "img" / carpeta / rel.with_suffix(".jpg")
        dst.parent.mkdir(parents=True, exist_ok=True)
        clave = dst.relative_to(AQUI.parent).as_posix()  # p. ej. video/img/fotos_basis/cap0/x.jpg
        if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
            im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
            im.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
            im.save(dst, "JPEG", quality=90)
        with Image.open(dst) as im:
            medidas[clave] = list(im.size)

(AQUI / "fotos.js").write_text(
    "// Generado por preparar_fotos.py: tamaño de cada foto preparada.\nwindow.FOTOS = "
    + json.dumps(medidas, ensure_ascii=False, indent=0)
    + ";\n",
    encoding="utf-8",
)
print(f"{len(medidas)} fotos listas en video/img/")
