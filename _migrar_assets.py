"""
Copia los assets del proyecto estático viejo al Astro:
    equipo/, carteles/, logos/, premios/  →  src/assets/
    audio/                                 →  public/audio/

Uso desde la raíz del proyecto Astro:

    python _migrar_assets.py "../Santiago-Pontones de cine"

(cambiando la ruta si tu carpeta hermana se llama de otra forma)
"""
import shutil
import sys
from pathlib import Path


def migrar(fuente: Path):
    if not fuente.exists():
        print(f"✗ No existe la carpeta origen: {fuente}")
        sys.exit(1)

    aqui = Path(".").resolve()
    print(f"Origen: {fuente}")
    print(f"Destino: {aqui}\n")

    # Imágenes a src/assets/
    for carpeta in ("equipo", "carteles", "logos", "premios"):
        origen = fuente / carpeta
        destino = aqui / "src" / "assets" / carpeta
        destino.mkdir(parents=True, exist_ok=True)
        if not origen.exists():
            print(f"  — {carpeta}/ no existe en el origen, salto")
            continue
        n = 0
        for archivo in origen.iterdir():
            if archivo.is_file():
                shutil.copy2(archivo, destino / archivo.name)
                n += 1
        print(f"  ✓ {carpeta}/  →  src/assets/{carpeta}/   ({n} archivos)")

    # Audio a public/audio/
    origen_audio = fuente / "audio"
    destino_audio = aqui / "public" / "audio"
    destino_audio.mkdir(parents=True, exist_ok=True)
    if origen_audio.exists():
        n = 0
        for archivo in origen_audio.iterdir():
            if archivo.is_file():
                shutil.copy2(archivo, destino_audio / archivo.name)
                n += 1
        print(f"  ✓ audio/  →  public/audio/                ({n} archivos)")
    else:
        print("  — audio/ no existe en el origen, salto")

    print("\nHecho.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    migrar(Path(sys.argv[1]).resolve())
