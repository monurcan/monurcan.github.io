# Personal site, v2

A single static page with no build step and no frameworks. The design is self-contained in this folder.

## Preview

```bash
cd ..                      # repository root
python3 -m http.server 8000
# open http://localhost:8000/v2/
```

Opening `index.html` straight from disk works too.

## What's where

```
index.html                 all content (hero, research, publications)
assets/css/site.css        all styling; light/dark colors are the tokens at the top
assets/js/site.js          the four research figures, publication filters, thumbnail motion
assets/js/portrait-data.js 64×64 grayscale portrait, the hidden ground truth for Fig. 4 (loaded only when needed)
assets/fonts/              Newsreader (headings), subset and self-hosted, with its license
assets/img, assets/video   optimized WebP/MP4 copies of ../static
tools/make_assets.py       regenerates assets/img, assets/video, portrait-data.js from ../static
```

## Adding a paper

Copy one `<li class="pub">` block in `index.html` and set its `data-topics` (any of `self`, `tts`, `gen`, `pr`); the filter counts update automatically. For the thumbnail, put the figure in `../static/images/`, add its name to `singles` in `tools/make_assets.py`, and run `python3 v2/tools/make_assets.py` from the repository root.

Thumbnails lift slightly on hover. To make one cycle through extra frames, give its `<div class="pub-media">` a `data-frames` list of `[image, ""]` pairs (they load only on first hover); a `<video class="hover-video">` plays instead.

## Promoting it to the main page

Move the contents of `v2/` to the repository root (replacing `index.html`; `assets/` does not clash with `static/`). Then replace `/v2/assets/` with `/assets/` in the three absolute URLs in the `<head>` (`og:image`, `twitter:image`, and the JSON-LD `image`). The canonical URL already points at the root.

## Notes

- The figures are progressive enhancement. Without JavaScript the page still shows all text, publications and links.
- Every research figure uses a real example: the SIMIT VizWiz query and its imagined practice images (Fig. 1), the TTAug GQA example (Fig. 2), a POEM result and five WildLight captures (Fig. 3).
- Fig. 4 runs classical Fourier phase retrieval (Fienup's HIO, β = 0.9, 280 HIO + 20 error-reduction iterations) on a noise-free, 2× oversampled 64×64 grayscale simulation, in a Web Worker. Everything shown is the algorithm's own output; the "fit error" uses only the measurement. The three default random starts were picked to show the three typical outcomes (success, stuck, upside-down twin); "New starts" draws fresh random ones.
- There is no header or theme switch: the page follows the visitor's light/dark system setting.
- `assets/img/og.jpg` (the social preview card) and `apple-touch-icon.png` are static images; regenerate them by hand if the name or design changes.
