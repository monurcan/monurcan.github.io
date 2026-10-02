"""Build the web assets for the SIMIT project page from the paper's own figures.

Reads only from ../paper_latex_overleaf/.../figures and ../video_teaser, and writes to ./static.
Requires poppler (pdfimages, pdftoppm), ffmpeg and Pillow (with WebP support).

    python prepare_assets.py
"""

import shutil
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
FIG = HERE.parent / "paper_latex_overleaf" / "Self-Improving VLMs - ICLR - Onur" / "figures"
VIDEO = HERE.parent / "video_teaser" / "simit_teaser.mp4"
OUT = HERE / "static"

# RefCOCO queries are shown to the model with the target region drawn in red
# (lmms-eval refcoco_bbox_doc_to_visual). The paper's query crops omit the box, so we
# redraw it. Boxes are (x, y, w, h) of refcoco_bbox_val docs 90/205/211 in LMMs-Eval-Lite.
REFCOCO_BBOX = {
    "refcoco_bbox_val_90": (375.37, 282.61, 84.14, 192.0),
    "refcoco_bbox_val_205": (307.65, 116.33, 75.14, 242.62),
    "refcoco_bbox_val_211": (0.0, 151.64, 164.01, 231.34),
}

# Fig. 3 (ImageGenerationSamples): pdfimages index -> skill name. Each render has its prompt
# printed underneath, which is cropped away automatically.
SKILL_TILES = {
    0: "diagram", 2: "composite", 4: "html", 6: "vegalite", 8: "svg", 10: "venn", 12: "mermaid",
    14: "natural", 16: "figure", 18: "geometry", 22: "scene", 24: "table",
    26: "circuit", 28: "vector", 30: "molecule", 32: "graph",
}
# Renders whose caption sits too close for the automatic cut: explicit bottom edge (px)
SKILL_CUT = {"vegalite": 893}

# Skill-library ablation pairs shown in Appendix M: key -> (w/o skills, w/ skills)
ABL = FIG / "samples_skills_ablation"
ABLATION = {
    name: (ABL / "wo_skills" / f"{stem}.png", ABL / "w_skills" / f"{stem}.png")
    for name, stem in {
        "pie": "FIGURE_plot_pie_chart",
        "graph": "GRAPH_graph_disconnected",
        "venn": "VENN_venn_fruits_overlap",
        "invoice": "HTML_html_invoice",
        "state": "DIAGRAM_diagram_state_machine",
        "gantt": "MERMAID_mermaid_software_gantt",
    }.items()
}


def extract(pdf: Path, tmp: Path) -> dict:
    """pdfimages -> {index: RGBA image}; each image is merged with the soft mask that follows it."""
    out = tmp / pdf.stem.replace(" ", "_")
    out.mkdir()
    subprocess.run(["pdfimages", "-png", str(pdf), str(out / "i")], check=True, stderr=subprocess.DEVNULL)
    files = sorted(out.glob("i-*.png"))
    images, k = {}, 0
    while k < len(files):
        im = Image.open(files[k]).convert("RGB")
        idx = int(files[k].stem.split("-")[1])
        if k + 1 < len(files):
            m = Image.open(files[k + 1])
            if m.mode == "L" and m.size == im.size:
                im.putalpha(m)
                k += 1
        images[idx] = im.convert("RGBA")
        k += 1
    return images


def on_white(im: Image.Image) -> Image.Image:
    bg = Image.new("RGBA", im.size, "white")
    bg.alpha_composite(im.convert("RGBA"))
    return bg.convert("RGB")


def trim(im: Image.Image, pad=6) -> Image.Image:
    """Crop white margins."""
    g = im.convert("L").point(lambda v: 255 if v < 245 else 0)
    box = g.getbbox()
    if box is None:
        return im
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))


def drop_caption(im: Image.Image) -> Image.Image:
    """Remove the 'Prompt: ...' text block printed below a Fig. 3 render."""
    g = im.convert("L")
    w, h = g.size
    px = g.load()
    ink = [sum(1 for x in range(0, w, 2) if px[x, y] < 200) for y in range(h)]
    y = h - 1
    while y > 0 and ink[y] == 0:  # bottom margin
        y -= 1
    gap_needed = max(12, h // 40)
    gap = 0
    while y > 0:  # walk up through the caption lines until a clear gap
        gap = gap + 1 if ink[y] == 0 else 0
        if gap >= gap_needed:
            return im.crop((0, 0, w, y + gap // 2))
        y -= 1
    return im


def save_webp(im: Image.Image, path: Path, max_side: int, quality=82):
    im = im.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)


def main():
    img = OUT / "img"
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)

        # Qualitative samples (Fig. 4 + Appendix N)
        for f in sorted((FIG / "samples_images").glob("*.png")):
            im = Image.open(f).convert("RGB")
            stem = f.stem
            base = stem.rsplit("_", 1)[0]
            if stem.endswith("_query") and base in REFCOCO_BBOX:
                x, y, w, h = REFCOCO_BBOX[base]
                ImageDraw.Draw(im).rectangle([x, y, x + w, y + h], outline=(255, 0, 0), width=3)
            big = stem.endswith("_query") or stem.startswith("infovqa")
            save_webp(im, img / "samples" / f"{stem}.webp", 1100 if big else 560)

        # Fig. 3: skill-library renders
        gen = extract(FIG / "ImageGenerationSamples (4).pdf", tmp)
        for idx, name in SKILL_TILES.items():
            tile = on_white(gen[idx])
            if name in SKILL_CUT:
                tile = trim(tile.crop((0, 0, tile.width, SKILL_CUT[name])))
            elif name != "natural":
                tile = trim(drop_caption(tile))
            save_webp(tile, img / "skills" / f"{name}.webp", 720)

        # Fig. 5 + Appendix M: with / without skill library
        for name, (wo, w) in ABLATION.items():
            save_webp(on_white(Image.open(wo)), img / "ablation" / f"{name}_wo.webp", 640)
            save_webp(trim(on_white(Image.open(w))), img / "ablation" / f"{name}_w.webp", 640)
        fig5 = extract(FIG / "samples_skills_ablation" / "SamplesSkillLibraryAblation_Horizontal (2).pdf", tmp)
        save_webp(on_white(fig5[4]), img / "ablation" / "vector_wo.webp", 640)
        save_webp(trim(on_white(fig5[6])), img / "ablation" / "vector_w.webp", 640)

        # Mascots: Fig. 1 (initial / self-improved VLM) and Fig. 2 (roles)
        teaser = extract(FIG / "TeaserFig (41).pdf", tmp)
        pipe = extract(FIG / "MainPipelineFig (26).pdf", tmp)
        mascots = {
            "initial": (teaser[8], (0, 258, 453, 820)),
            "improved": (teaser[8], (523, 213, 1011, 855)),
            "artist": (pipe[22], (68, 21, 503, 433)),
            "architect": (pipe[22], (551, 52, 948, 433)),
            "solver": (pipe[12], (10, 18, 272, 252)),
            "synthesizer": (pipe[12], (365, 12, 640, 250)),
            "router": (pipe[12], (775, 12, 1024, 222)),
            "generator": (pipe[12], (560, 262, 835, 448)),
            "critic": (pipe[12], (860, 250, 1024, 446)),
        }
        # blank out the neighbouring "VLM Triplet Synthesizer" label above the generator
        pipe[12].paste((0, 0, 0, 0), (420, 255, 612, 283))
        for name, (sheet, box) in mascots.items():
            m = sheet.crop(box)
            m = m.crop(m.getchannel("A").getbbox())
            save_webp(m, img / "mascots" / f"{name}.webp", 420, quality=88)
        head = teaser[8].crop((523, 213, 1011, 855))
        head = head.crop(head.getchannel("A").getbbox())
        fav = head.crop((0, 0, head.width, int(head.width * 0.95)))
        fav.thumbnail((128, 128), Image.LANCZOS)
        canvas = Image.new("RGBA", (128, 128), (0, 0, 0, 0))
        canvas.alpha_composite(fav, ((128 - fav.width) // 2, (128 - fav.height) // 2))
        canvas.save(img / "favicon.png")

    # Fig. 2 (pipeline), rasterized for the interactive walkthrough
    png = OUT / "img" / "_pipeline"
    subprocess.run(["pdftoppm", "-png", "-singlefile", "-scale-to-x", "2400", "-scale-to-y", "-1",
                    str(FIG / "MainPipelineFig (26).pdf"), str(png)], check=True, stderr=subprocess.DEVNULL)
    save_webp(Image.open(f"{png}.png").convert("RGB"), img / "pipeline.webp", 2400, quality=86)
    Path(f"{png}.png").unlink()

    # Teaser video and its poster frame. (The social card, og_image.jpg, is rendered from og_card.html.)
    (OUT / "video").mkdir(parents=True, exist_ok=True)
    shutil.copy(VIDEO, OUT / "video" / "simit_teaser.mp4")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", "3.6", "-i", str(VIDEO), "-frames:v", "1",
                    str(img / "poster.png")], check=True)
    Image.open(img / "poster.png").convert("RGB").resize((1280, 720), Image.LANCZOS).save(img / "poster.jpg", quality=86)
    (img / "poster.png").unlink()
    print("assets written to", OUT)


if __name__ == "__main__":
    main()
