# monurcan.github.io

Personal site of M. Onurcan Kaya. A single static page with no build step and no frameworks.

## Preview

```bash
python3 -m http.server 8000   # from the repository root, then open http://localhost:8000/
```

Opening `index.html` straight from disk works too.

## What's where

```
index.html                 all content (hero, research focus, publications, background)
assets/css/site.css        all styling; light/dark colors are the tokens at the top
assets/js/site.js          the four research figures, publication filters, thumbnail motion
assets/js/portrait-data.js 64×64 grayscale portrait, the hidden ground truth for Fig. 4 (loaded only when needed)
assets/fonts/              Newsreader (headings) and Inter (text), subset and self-hosted, with their licenses
assets/img, assets/video   optimized WebP/MP4 images and video
tools/make_assets.py       regenerates assets/img, assets/video and portrait-data.js
simit/, efficient_test_time_scaling/   project pages
old/                       the previous version of this site (index.html + static/), kept as an archive
```

## Adding a paper

Copy one `<li class="pub">` block in `index.html` and set its `data-topics` (any of `self`, `tts`, `gen`, `pr`); the filter counts update automatically. For the thumbnail, put the figure in `old/static/images/`, add its name to `singles` in `tools/make_assets.py`, and run `python3 tools/make_assets.py` from the repository root. The thumbnail link (`<a class="pub-media" href="…">`) should point to the same place as the title.

Thumbnails zoom in slightly on hover. To make one cycle through extra frames, give it a `data-frames` list of `[image, ""]` pairs (they load only on first hover); a `<video class="hover-video">` plays instead.

## Notes

- The figures are progressive enhancement. Without JavaScript the page still shows all text, publications and links.
- Every research figure uses a real example: the SIMIT VizWiz query and its imagined practice images (Fig. 1), the TTAug ChartQA example (Fig. 2), a POEM result and five WildLight captures (Fig. 3).
- Fig. 4 runs classical Fourier phase retrieval (Fienup's HIO, β = 0.9, 280 HIO + 20 error-reduction iterations) on a noise-free, 2× oversampled 64×64 grayscale simulation, in a Web Worker. Everything shown is the algorithm's own output; the "fit error" uses only the measurement. The three default random starts were picked to show the three typical outcomes (success, stuck, upside-down twin); "New starts" draws fresh random ones.
- There is no header or theme switch: the page follows the visitor's light/dark system setting.
- `favicon.ico` is the original site's icon (16, 32 and 48 px). `assets/img/og.jpg` (the social preview card) is a static image; regenerate it by hand if the name or design changes.
