# SIMIT project page

A static, single-page site for sharing the paper. It uses no build step and no frameworks. The only external request is to Google Fonts (Fira Sans).

## Preview

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000        # then open http://localhost:8000
```

`index.html?static` skips every animation, which is useful for screenshots.

## Sections

| Section | What it shows | Source in the paper |
|---|---|---|
| Hero | Title, authors, links, the teaser video (`../video_teaser/simit_teaser.mp4`), TL;DR and headline numbers | Abstract, Table 1 |
| Key idea | An animated comparison: learning from its own guesses (majority vote) vs. imagining practice problems (answer first, then image) on a VizWiz query | Sec. 4.1 (99.2% TTRL statistic), Appendix N |
| How it works | The model's roles (mascots), a clickable walkthrough of Fig. 2, and the four SIMIT variants | Fig. 2, Sec. 3 |
| Skill library | A drag-to-compare slider (native generation vs. skill library) and a flip gallery of renders with their prompts | Fig. 3, 5, 8, Appendix M |
| Results | Mean-gain bar chart (with the full Table 1 as a table view) and per-benchmark gains for each variant | Table 1, Table 8 |
| Why it works | Stratified gains and supervision quality | Fig. 6, Fig. 7 |
| Examples | A browser of 22 precomputed test queries: imagined vs. retrieved samples and every method's answer | Fig. 4, Appendix N |
| BibTeX | Citation with a copy button | |

## Before publishing: TODOs

1. **Paper / arXiv links**: in `index.html`, replace `href="#"` on the elements marked `data-todo` (hero buttons and the nav "Paper" button).
2. **BibTeX**: replace `arXiv:XXXX.XXXXX` in the `#bibtex` section.
3. **Social cards**: once hosted, change `og:image` and `twitter:image` to absolute URLs and add `og:url`. Most platforms ignore relative image paths.
4. **Code**: the "Code (coming soon)" pill is a non-link `<span>`. Turn it into an `<a class="btn btn-ghost" href="...">` when the code is released.
5. `main.tex` still has `https://monurcan.github.io/TODO` as the project page URL.

## Hosting on GitHub Pages

Copy the contents of this folder to a repository (for example `monurcan.github.io/simit`) and enable Pages. Everything is relative and static. The whole folder is about 15 MB, of which the video is 10.5 MB.

## Files

```
index.html              the page
og_card.html            source of the 1200x630 social-media card
prepare_assets.py       regenerates static/img/* and static/video/* from the paper figures
static/css/style.css
static/js/main.js       interactions, charts, and all plotted numbers (copied from the paper)
static/js/examples.js   the 22 qualitative examples (parsed from sections_v0/appendix_qualitative_results.tex)
static/img/             WebP versions of the paper's figures, samples and mascots
static/video/           the teaser video
```

## Regenerating assets

```bash
python prepare_assets.py      # needs poppler (pdfimages, pdftoppm), ffmpeg, Pillow
```

It reads only from `../paper_latex_overleaf/.../figures` and `../video_teaser/`. Notes:

- RefCOCO query images get the red target box redrawn. The model sees this box (lmms-eval draws it), but the paper's image crops leave it out.
- The Fig. 3 "Puzzle" render is not in the gallery because its prompt in the paper (Fig. 8: small/large circle, square, triangle) does not match the image (circle : two circles :: triangle : ?).
- Only the seven skill-ablation pairs that appear in the paper (Fig. 5 and Appendix M) are used.

To re-render the social card after editing `og_card.html`:

```bash
firefox --headless --window-size=1200,630 --screenshot og.png "file://$PWD/og_card.html"
python -c "from PIL import Image; Image.open('og.png').convert('RGB').save('static/img/og_image.jpg', quality=90)"
```
