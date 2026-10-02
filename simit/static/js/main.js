/* SIMIT project page: interactions. Plain JS, no dependencies.
   All numbers below are copied from the paper (Tables 1 & 8, Figs. 6 & 7). */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const staticMode = /[?&]static\b/.test(location.search); // for screenshots: show every animation's end state
  if (staticMode) document.documentElement.classList.add('no-anim');
  const fmt = (v, d = 2) => (v > 0 ? '+' : v < 0 ? '−' : '+') + Math.abs(v).toFixed(d) + '%';

  /* ------------------------------------------------------------ tooltip */
  const tip = $('#tip');
  function showTip(html, x, y) {
    tip.innerHTML = html;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    let left = x + 14, top = y + 14;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
    if (top + r.height > window.innerHeight - 8) top = y - r.height - 14;
    tip.style.left = Math.max(8, left) + 'px';
    tip.style.top = Math.max(8, top) + 'px';
  }
  function hideTip() { tip.hidden = true; }
  function attachTip(el, htmlFn) {
    el.tabIndex = 0;
    el.addEventListener('mousemove', (e) => showTip(htmlFn(), e.clientX, e.clientY));
    el.addEventListener('mouseleave', hideTip);
    el.addEventListener('focus', () => { const r = el.getBoundingClientRect(); showTip(htmlFn(), r.left + r.width / 2, r.bottom - 6); });
    el.addEventListener('blur', hideTip);
  }
  window.addEventListener('scroll', hideTip, { passive: true });

  /* ------------------------------------------------------------ nav */
  const nav = $('#topnav');
  const hero = $('#top');
  function onScroll() { nav.classList.toggle('show', window.scrollY > hero.offsetHeight * 0.55); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const navLinks = $$('.topnav-links a');
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => secObs.observe(s));

  // placeholder links (paper / arXiv) until the URLs exist
  $$('a[data-todo]').forEach((a) => a.addEventListener('click', (e) => { if (a.getAttribute('href') === '#') e.preventDefault(); }));

  /* ------------------------------------------------------------ teaser video */
  const video = $('#teaser-video');
  const vbtn = $('#video-toggle');
  function syncVideo() {
    vbtn.classList.toggle('paused', video.paused);
    vbtn.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
  }
  function toggleVideo() { if (video.paused) video.play(); else video.pause(); }
  vbtn.addEventListener('click', toggleVideo);
  video.addEventListener('click', toggleVideo);
  video.addEventListener('play', syncVideo);
  video.addEventListener('pause', syncVideo);
  if (reduceMotion) video.pause();
  setTimeout(syncVideo, 800);

  /* ------------------------------------------------------------ idea: guess vs imagine */
  (function duel() {
    const box = $('#duel');
    const c = document.createElement('canvas');
    c.width = c.height = 96;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(96, 96);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 90 + Math.random() * 130;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    const url = c.toDataURL();
    $$('.gen-noise', box).forEach((n) => { n.style.backgroundImage = `url(${url})`; });

    const play = () => {
      box.classList.add('reset');
      box.classList.remove('play');
      void box.offsetWidth;
      box.classList.remove('reset');
      box.classList.add('play');
    };
    if (reduceMotion || staticMode) { box.classList.add('play'); }
    else {
      const io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) { play(); io.disconnect(); }
      }, { threshold: 0.35 });
      io.observe(box);
    }
    $('#duel-replay').addEventListener('click', play);
  })();

  /* ------------------------------------------------------------ method: pipeline walkthrough */
  (function pipeline() {
    // stage regions on Fig. 2, in percent of the figure (measured on the 2000x974 rendering)
    const W = 2000, H = 974;
    const R = {
      aba: [240, 0, 733, 470], tri: [750, 0, 1558, 470], route: [1573, 0, 2000, 470],
      real: [718, 486, 2000, 974], ver: [471, 486, 709, 974], df: [0, 486, 459, 974],
    };
    const T = {
      all: ['From one test query to verified practice data',
        'Given an unlabeled test query, the model decides how much to practice, writes triplets, draws each image with the right tool, checks it, and keeps the informative ones. Click a stage to zoom in.'],
      aba: ['1 · Adaptive budget allocation',
        'Harder queries get more practice. The model’s confidence in its own zero-shot answer sets the number of samples K: low confidence gives a large K and high confidence a small K. The rule comes from a log-odds evidence criterion.'],
      tri: ['2 · Triplet synthesis',
        'Conditioned on the test image and question, the model proposes K diverse triplets: a new question, its intended answer, and a description of an image that would support that answer. Each answer is committed before any image exists.'],
      route: ['3 · Visualization routing',
        'The same model sorts each description into one of 17 visual categories. Natural scenes go to native image generation. Charts, documents, diagrams, molecules and circuits go to a rendering skill.'],
      real: ['4 · Image realization',
        'Natural images come from BAGEL’s own image generation. For structured visuals, a skill-specific prompt guides the model to write a compact spec (HTML, geometry primitives, graph edges and so on). A deterministic renderer draws it, and syntax or rendering errors are fed back for a retry.'],
      ver: ['5 · Verification',
        'Acting as a critic, the model checks each image against its description. Failures trigger repair or regeneration until all K slots hold verified samples.'],
      df: ['6 · Difficulty filtering',
        'The model’s confidence in each intended answer must fall inside a band. Samples that are too hard may carry label noise, and samples that are too easy teach little and take up context.'],
    };
    const spot = $('#pipe-spot');
    const text = $('#pipe-text');
    const tabs = $$('.pipe-tabs button');
    function select(stage) {
      tabs.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.stage === stage)));
      text.innerHTML = `<h4>${T[stage][0]}</h4><p>${T[stage][1]}</p>`;
      if (stage === 'all') { spot.classList.remove('on'); return; }
      const [x0, y0, x1, y1] = R[stage];
      Object.assign(spot.style, {
        left: (x0 / W * 100) + '%', top: (y0 / H * 100) + '%',
        width: ((x1 - x0) / W * 100) + '%', height: ((y1 - y0) / H * 100) + '%',
      });
      spot.classList.add('on');
      const sc = $('#pipe-scroll');
      if (sc.scrollWidth > sc.clientWidth + 4) {
        const fig = sc.firstElementChild;
        sc.scrollTo({ left: (x0 + x1) / 2 / W * fig.offsetWidth - sc.clientWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    tabs.forEach((b) => b.addEventListener('click', () => select(b.dataset.stage)));
    $('.pipe-tabs').addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const i = tabs.findIndex((b) => b.getAttribute('aria-selected') === 'true');
      const j = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      tabs[j].focus();
      select(tabs[j].dataset.stage);
    });
    select('all');
  })();

  /* ------------------------------------------------------------ skills: compare slider (Fig. 5 + Appendix M) */
  (function compare() {
    const PAIRS = [
      ['pie', 'Pie chart', 'Draw a pie chart of programming language popularity: Python 45%, JavaScript 30%, Go 15%, Rust 10%.'],
      ['vector', 'Vectors', 'Draw vector A = (5, 3) and vector B = (2, 4) from the origin, and draw the vector A − B also from the origin, all three labeled.'],
      ['graph', 'Graph', 'Draw a graph with two separate disconnected components: one with nodes A, B, C forming a triangle of edges, another with nodes X and Y connected by one edge.'],
      ['venn', 'Venn diagram', 'Draw a Venn diagram comparing ‘Citrus Fruits’ (Lemon, Lime) and ‘Round Fruits’ (Apple, Grapefruit), with Orange in the overlap of both sets.'],
      ['invoice', 'Invoice', 'Create an invoice for a freelance web developer: company name ‘DevCraft Studio’, client ‘TechCorp Inc’, invoice date 2024-03-15, line items: Frontend Development 60h @ $120/h = $7,200, API Integration 20h @ $100/h = $2,000, Testing 10h @ $80/h = $800. Subtotal $10,000, Tax 10% = $1,000, Total $11,000. Professional dark-header styling.'],
      ['state', 'State machine', 'Draw a state machine: Idle goes to Running on ‘start’, Running goes to Paused on ‘pause’, Paused goes to Running on ‘resume’, Running goes to Idle on ‘stop’.'],
      ['gantt', 'Gantt chart', 'Draw a Gantt chart for a software development project over 8 weeks: Week 1 is Requirements gathering; Weeks 2–3 are System Design; Weeks 3–6 are Backend Development (starting mid-week 3); Weeks 4–6 are Frontend Development; Week 7 is Integration Testing; Week 8 is Deployment.'],
    ];
    const pick = $('#cmp-pick'), box = $('#cmp-box'), range = $('#cmp-range');
    const wo = $('#cmp-wo'), w = $('#cmp-w'), prompt = $('#cmp-prompt');
    const setX = (v) => { box.style.setProperty('--x', v + '%'); };
    PAIRS.forEach(([k, name], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.innerHTML = `<img src="static/img/ablation/${k}_w.webp" alt="" loading="lazy"><span>${name}</span>`;
      b.addEventListener('click', () => select(i));
      pick.appendChild(b);
    });
    function select(i) {
      const [k, name, p] = PAIRS[i];
      $$('button', pick).forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
      wo.src = `static/img/ablation/${k}_wo.webp`;
      wo.alt = `${name} generated natively by BAGEL, without the skill library`;
      w.src = `static/img/ablation/${k}_w.webp`;
      w.alt = `${name} rendered with SIMIT's skill library`;
      prompt.innerHTML = `<b>Prompt:</b> ${esc(p)}`;
      range.value = 50;
      setX(50);
    }
    range.addEventListener('input', () => setX(range.value));
    select(0);

    // one gentle sweep the first time the slider comes into view, to show it can be dragged
    if (!reduceMotion && !staticMode) {
      const io = new IntersectionObserver((es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t) => {
          const u = Math.min(1, (t - t0) / 1800);
          const v = 50 + 28 * Math.sin(u * Math.PI * 2) * (1 - u);
          setX(v);
          range.value = v;
          if (u < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, { threshold: 0.6 });
      io.observe(box);
    }
  })();

  /* ------------------------------------------------------------ skills: flip gallery (Fig. 3 + Fig. 8 prompts) */
  (function gallery() {
    const SKILLS = [
      ['natural', 'Natural', 'nat', 'native generation', 'A glazed donut and a chocolate candy bar placed on a white wooden table, photographed from above.'],
      ['composite', 'Composite', 'nat', 'HTML + native', 'Four panels showing animals labeled 1, 2, 3, 4: panel 1 shows a golden retriever dog, panel 2 shows a tabby cat, panel 3 shows a green parrot perched on a branch, panel 4 shows a colorful tropical fish swimming.'],
      ['html', 'HTML', '', 'skill', 'Create an HTML nutrition facts label similar to a US food product label. Product: ‘Whole Grain Oatmeal’. Serving size 40g, Calories 150, Total Fat 3g (4% DV), Saturated Fat 0.5g, Sodium 0mg, Total Carb 27g (10% DV), Fiber 4g (14% DV), Sugars 1g, Protein 5g, Vitamin D 0%, Calcium 2%, Iron 10%. Black border, thick dividers.'],
      ['figure', 'Figure', '', 'skill', 'Plot y = sin(x) and y = cos(x) on the same axes for x ranging from −2π to 2π, using two different colored lines with a legend distinguishing them, and mark every point in that range where the two curves intersect with a visible dot.'],
      ['table', 'Table', '', 'skill', 'Make a table of the first five elements of the periodic table with columns Name, Symbol, Atomic Number, and Atomic Mass: Hydrogen (H, 1, 1.008), Helium (He, 2, 4.0026), Lithium (Li, 3, 6.94), Beryllium (Be, 4, 9.0122), Boron (B, 5, 10.81).'],
      ['molecule', 'Molecule', '', 'skill', 'Draw the molecular structure of caffeine.'],
      ['circuit', 'Circuit', '', 'skill', 'Draw a circuit with a 9V battery, a 220 ohm resistor, and an LED in series.'],
      ['geometry', 'Geometry', '', 'skill', 'Draw two circles: one centered at (0,0) with radius 3, another centered at (5,0) with radius 2.'],
      ['graph', 'Graph', '', 'skill', 'Draw a directed graph of a small social network’s ‘follows’ relationships: Alice follows Bob, Bob follows Carol, Carol follows Alice, Alice follows Dave, Dave follows Carol, and Dave follows Bob.'],
      ['venn', 'Venn', '', 'skill', 'Draw a Venn diagram of ‘Tools’ (Hammer, Screwdriver) and ‘Kitchen Items’ (Spoon, Knife), with Knife in the overlap since it can be both a tool and a kitchen item in this puzzle.'],
      ['diagram', 'Diagram', '', 'skill', 'Draw a flowchart for an online order system: Customer Places Order, then Check Inventory. If In Stock, go to Process Payment, then Ship Order, then Delivered. If Out of Stock, go to Notify Customer, then Cancel Order.'],
      ['mermaid', 'Mermaid', '', 'skill', 'Draw a UML class diagram for a banking system: Account abstract class with accountNumber and balance fields, and deposit() and withdraw() methods; SavingsAccount subclass with interestRate field; CheckingAccount subclass with overdraftLimit field; Customer class with name and email, associated with Account.'],
      ['vegalite', 'Vega-Lite', '', 'skill', 'Draw a bubble chart comparing 8 countries by GDP per capita (x-axis, in USD), life expectancy (y-axis, in years), and population (bubble size). Include: USA (63k, 79y, 330M), Germany (46k, 81y, 83M), Japan (40k, 84y, 125M), China (12k, 77y, 1400M), Brazil (8.8k, 75y, 213M), India (2.1k, 70y, 1380M), Nigeria (2k, 54y, 210M), Norway (80k, 83y, 5M). Color by country name.'],
      ['vector', 'Vector', '', 'skill', 'Draw three vectors from the origin representing forces: F1 = (4, 0), F2 = (0, 3), F3 = (−2, −1), each labeled with its name.'],
      ['svg', 'SVG', '', 'skill', 'Draw a sun icon with a central yellow circle and 8 yellow rays radiating outward at equal angles. Use line elements for each ray: top, upper-right, right, lower-right, bottom, lower-left, left, upper-left.'],
      ['scene', 'Scene', '', 'skill', 'Draw a scene scattered randomly with 4 overlapping blue circles, 3 red squares that do not overlap each other or anything else, and 2 green triangles that overlap each other.'],
    ];
    const g = $('#gallery');
    SKILLS.forEach(([k, name, cls, tag, p]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'tile ' + cls;
      b.setAttribute('aria-pressed', 'false');
      b.setAttribute('aria-label', `${name}: show the prompt`);
      const how = cls ? 'Drawn with BAGEL’s native image generation' : `Drawn by the ${name} rendering skill`;
      b.innerHTML = `<div class="tile-in">
          <div class="tile-face"><div class="tile-h"><span>${name}</span><span class="tag">${tag}</span></div>
            <div class="tile-b"><img src="static/img/skills/${k}.webp" alt="${name} example synthesized by SIMIT" loading="lazy"${k === 'natural' ? ' class="cover"' : ''}></div></div>
          <div class="tile-face tile-back"><div><div class="tile-back-h">Prompt</div><p>${esc(p)}</p></div><div class="tile-back-f">${how}</div></div>
        </div>`;
      b.addEventListener('click', () => {
        const on = b.classList.toggle('flipped');
        b.setAttribute('aria-pressed', String(on));
        b.setAttribute('aria-label', `${name}: ${on ? 'show the image' : 'show the prompt'}`);
      });
      g.appendChild(b);
    });
  })();

  /* ------------------------------------------------------------ results data (Table 1, Table 8) */
  const DOMAINS = ['Image (CIDEr)', 'VQA', 'Math & Sci.', 'Doc & Info', 'Multi-discipline'];
  const BASE = [1.08, 64.6, 86.4, 78.4, 82.2];
  // [group, name, config, av. gain %, runtime x, domain scores, is SIMIT]
  const TABLE1 = [
    ['Test-time scaling', 'Thinking', '1,000 tokens', -21.59, 19, [0.49, 59.4, 64.2, 72.9, 78.7]],
    ['Test-time scaling', 'Thinking', '10,000 tokens', -21.28, 44, [0.50, 59.5, 64.6, 73.3, 79.1]],
    ['Test-time scaling', 'Self-Refine', '1 iteration', -2.90, 5, [1.00, 62.5, 86.4, 77.0, 83.3]],
    ['Test-time scaling', 'Self-Refine', '3 iterations', -2.87, 16, [1.00, 62.6, 86.4, 77.0, 83.3]],
    ['Test-time scaling', 'Self-Refine', '5 iterations', -2.84, 25, [1.00, 62.6, 86.4, 77.0, 83.4]],
    ['Test-time scaling', 'Self-Consistency', 'K = 8', -0.20, 5, [1.07, 64.5, 86.2, 78.1, 82.6]],
    ['Test-time scaling', 'Self-Consistency', 'K = 16', 0.17, 9, [1.08, 64.8, 86.4, 78.1, 82.4]],
    ['Test-time scaling', 'Self-Consistency', 'K = 32', 0.41, 19, [1.09, 64.7, 86.8, 78.4, 82.0]],
    ['Single-query SIMIT', 'SIMIT-ICL', '', 6.98, 25, [1.17, 68.8, 87.2, 79.3, 84.2], true],
    ['Single-query SIMIT', 'SIMIT-FT', 'single-query', 1.69, 47, [1.09, 65.8, 86.6, 78.9, 83.3], true],
    ['Label-free RL', 'TTRL', 'K = 32', 0.59, 75, [1.08, 64.9, 86.6, 79.6, 81.9]],
    ['Label-free RL', 'EMPO', 'K = 32', 1.82, 58, [1.10, 66.1, 86.4, 79.3, 82.1]],
    ['Label-free RL', 'TTRV', 'K = 32', 2.07, 41, [1.09, 66.4, 86.8, 79.6, 82.8]],
    ['Label-free RL', 'SRLM', 'K = 4', 0.87, 251, [1.07, 66.3, 86.2, 78.6, 82.3]],
    ['Test-set SIMIT', 'SIMIT-FT', 'test-set', 6.39, 55, [1.14, 69.4, 87.6, 79.4, 83.9], true],
    ['Test-set SIMIT', 'SIMIT-FT → ICL', 'test-set', 7.20, 55, [1.15, 69.6, 87.8, 79.7, 84.8], true],
  ];
  // chart: each method at its best configuration, grouped by family
  const pickRow = (name, cfg) => TABLE1.find((r) => r[1] === name && r[2] === cfg);
  const MAIN = [
    ['Test-time scaling', [pickRow('Thinking', '10,000 tokens'), pickRow('Self-Refine', '5 iterations'), pickRow('Self-Consistency', 'K = 32')]],
    ['Label-free RL', [pickRow('TTRL', 'K = 32'), pickRow('SRLM', 'K = 4'), pickRow('EMPO', 'K = 32'), pickRow('TTRV', 'K = 32')]],
    ['SIMIT (ours)', [pickRow('SIMIT-FT', 'single-query'), pickRow('SIMIT-FT', 'test-set'), pickRow('SIMIT-ICL', ''), pickRow('SIMIT-FT → ICL', 'test-set')]],
  ];

  function domainTip(r) {
    const rows = r[5].map((v, i) => {
      const rel = (v / BASE[i] - 1) * 100;
      return `<tr><td class="tm">${DOMAINS[i]}</td><td>${v}</td><td class="tm">${fmt(rel, 1)}</td></tr>`;
    }).join('');
    return `<b>${esc(r[1])}</b>${r[2] ? ' <span class="tm">(' + esc(r[2]) + ')</span>' : ''}<br>
      Mean relative gain <b>${fmt(r[3])}</b> · runtime ${r[4]}×
      <table>${rows}</table>`;
  }

  function hbarScaffold(el, ticks, pct, tickFmt, rtHead) {
    el.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'hbar-head';
    head.innerHTML = `<span></span><span></span><span>${rtHead || ''}</span>`;
    const body = document.createElement('div');
    body.className = 'hbar-body';
    const grid = document.createElement('div');
    grid.className = 'grid-layer';
    ticks.forEach((t) => {
      const l = document.createElement('div');
      l.className = t === 0 ? 'hbar-zero' : 'hbar-grid';
      l.style.left = pct(t) + '%';
      grid.appendChild(l);
    });
    body.appendChild(grid);
    const axis = document.createElement('div');
    axis.className = 'hbar-axis';
    axis.innerHTML = `<span></span><div class="ticks">${ticks.map((t) => `<span style="left:${pct(t)}%">${tickFmt(t)}</span>`).join('')}</div><span></span>`;
    el.append(head, body, axis);
    return body;
  }

  /* chart 1: mean relative gain */
  (function mainChart() {
    const MIN = -4, MAX = 10;
    const pct = (v) => (Math.min(Math.max(v, MIN), MAX) - MIN) / (MAX - MIN) * 100;
    const z = pct(0);
    const narrow = $('#chart-main').clientWidth < 560;
    const body = hbarScaffold($('#chart-main'), narrow ? [-4, 0, 4, 8] : [-4, -2, 0, 2, 4, 6, 8], pct, (t) => (t > 0 ? '+' : t < 0 ? '−' : '') + Math.abs(t) + '%', 'Runtime');
    MAIN.forEach(([group, rows]) => {
      const gh = document.createElement('div');
      gh.className = 'hbar-group';
      gh.textContent = group;
      body.appendChild(gh);
      rows.forEach((r) => {
        const v = r[3], ours = !!r[6];
        const row = document.createElement('div');
        row.className = 'hbar-row' + (ours ? ' ours' : '');
        const cfg = r[2] && !ours ? `<br><small>${esc(r[2])}</small>` : (ours && r[2] ? ` <small>${esc(r[2])}</small>` : '');
        const clipped = v < MIN;
        const left = v >= 0 ? z : pct(v);
        const width = Math.abs(pct(v) - z);
        const valLeft = v >= 0 ? pct(v) : z;
        row.innerHTML = `<div class="hbar-lab">${esc(r[1])}${cfg}</div>
          <div class="hbar-track">
            <div class="hbar-bar ${v >= 0 ? 'pos' : 'neg'}" style="left:${left}%;width:${width}%"></div>
            ${clipped ? `<span class="brk" style="left:${pct(MIN) + 3}%"></span>` : ''}
            <span class="hbar-val" style="left:${valLeft}%">${fmt(v)}${clipped ? ' <small class="muted">(axis cut)</small>' : ''}</span>
          </div>
          <div class="hbar-rt">${r[4]}×</div>`;
        row.setAttribute('aria-label', `${r[1]} ${r[2]}: ${fmt(v)} mean relative gain, ${r[4]} times zero-shot runtime`);
        attachTip(row, () => domainTip(r));
        body.appendChild(row);
      });
    });

    // table view: the full Table 1
    let html = `<table class="data"><thead><tr><th>Method</th>${DOMAINS.map((d) => `<th>${d}</th>`).join('')}<th>Av. gain</th><th>Runtime</th></tr></thead><tbody>
      <tr><td>BAGEL-7B, zero-shot</td>${BASE.map((v) => `<td>${v}</td>`).join('')}<td>0.00%</td><td>1×</td></tr>`;
    let last = '';
    TABLE1.forEach((r) => {
      if (r[0] !== last) { html += `<tr class="sep"><td colspan="8">${r[0]}</td></tr>`; last = r[0]; }
      html += `<tr class="${r[6] ? 'ours' : ''}"><td>${esc(r[1])}${r[2] ? ' (' + esc(r[2]) + ')' : ''}</td>${r[5].map((v, i) => `<td>${v}<span class="d">${fmt((v / BASE[i] - 1) * 100, 1)}</span></td>`).join('')}<td>${fmt(r[3])}</td><td>${r[4]}×</td></tr>`;
    });
    $('#table-main').innerHTML = html + '</tbody></table>';
  })();

  /* chart 2: per-benchmark gains (Table 8) */
  (function benchChart() {
    // [domain, benchmark, metric, BAGEL, ICL, FT-SQ, FT-TS, FT-TS->ICL]
    const B = [
      ['Image & captioning', 'Flickr30k', 'CIDEr', 0.877, 0.886, 0.899, 0.896, 0.896],
      ['Image & captioning', 'NoCaps', 'CIDEr', 0.755, 1.162, 0.762, 0.895, 0.953],
      ['Image & captioning', 'TextCaps', 'CIDEr', 1.586, 1.586, 1.591, 1.591, 1.591],
      ['Image & captioning', 'RefCOCO', 'CIDEr', 0.779, 0.803, 0.814, 0.901, 0.901],
      ['Image & captioning', 'COCO', 'CIDEr', 1.380, 1.385, 1.384, 1.405, 1.406],
      ['Visual question answering', 'GQA', 'accuracy', 76.0, 76.8, 76.4, 77.0, 77.0],
      ['Visual question answering', 'OK-VQA', 'accuracy', 37.6, 48.5, 41.6, 54.2, 54.2],
      ['Visual question answering', 'VizWiz-VQA', 'accuracy', 47.0, 54.6, 47.7, 53.0, 53.0],
      ['Visual question answering', 'VQA-v2', 'accuracy', 78.1, 78.6, 78.6, 78.5, 78.7],
      ['Visual question answering', 'TextVQA', 'accuracy', 84.5, 85.6, 84.9, 84.6, 85.1],
      ['Math & science', 'AI2D', 'accuracy', 86.4, 87.2, 86.6, 87.6, 87.8],
      ['Document & infographic', 'ChartQA', 'relaxed acc.', 80.6, 81.6, 81.2, 83.0, 83.0],
      ['Document & infographic', 'DocVQA', 'ANLS', 93.2, 93.6, 93.2, 93.2, 93.2],
      ['Document & infographic', 'InfoVQA', 'ANLS', 61.5, 62.8, 62.3, 62.0, 62.8],
      ['Multi-discipline', 'MMBench (CN)', 'score', 84.8, 87.2, 85.6, 86.4, 88.0],
      ['Multi-discipline', 'MMBench (EN)', 'score', 84.1, 86.4, 85.6, 85.6, 85.6],
      ['Multi-discipline', 'SEED-Bench', 'accuracy', 77.6, 79.0, 78.6, 79.8, 80.8],
    ];
    // relative gains exactly as printed in Table 8
    const G = {
      icl: [1.1, 53.9, 0.0, 3.1, 0.4, 1.1, 28.9, 16.1, 0.7, 1.3, 0.9, 1.2, 0.4, 2.1, 2.8, 2.7, 1.8],
      sq: [2.5, 0.9, 0.3, 4.4, 0.3, 0.5, 10.7, 1.4, 0.7, 0.5, 0.2, 0.7, 0.0, 1.4, 0.9, 1.8, 1.3],
      ts: [2.2, 18.5, 0.3, 15.6, 1.8, 1.3, 44.0, 12.7, 0.5, 0.1, 1.4, 3.0, 0.0, 0.9, 1.9, 1.8, 2.8],
      tsicl: [2.2, 26.2, 0.3, 15.6, 1.9, 1.3, 44.0, 12.7, 0.7, 0.7, 1.6, 3.0, 0.0, 2.1, 3.8, 1.8, 4.1],
    };
    const VI = { icl: 4, sq: 5, ts: 6, tsicl: 7 };
    const VN = { icl: 'SIMIT-ICL', sq: 'SIMIT-FT (single-query)', ts: 'SIMIT-FT (test-set)', tsicl: 'SIMIT-FT (test-set) → ICL' };
    const MAX = 60;
    const pct = (v) => Math.min(v, MAX) / MAX * 100;
    const narrow = $('#chart-bench').clientWidth < 560;
    const body = hbarScaffold($('#chart-bench'), narrow ? [0, 20, 40] : [0, 10, 20, 30, 40, 50], pct, (t) => (t ? '+' : '') + t + '%');
    let cur = 'icl';
    const rows = [];
    let lastDom = '';
    B.forEach((b, i) => {
      if (b[0] !== lastDom) {
        const gh = document.createElement('div');
        gh.className = 'hbar-group';
        gh.textContent = b[0];
        body.appendChild(gh);
        lastDom = b[0];
      }
      const row = document.createElement('div');
      row.className = 'hbar-row ours';
      row.innerHTML = `<div class="hbar-lab">${b[1]}</div><div class="hbar-track"><div class="hbar-bar pos" style="left:0;width:0"></div><span class="hbar-val" style="left:0">+0.0%</span></div><div class="hbar-rt"></div>`;
      attachTip(row, () => `<b>${b[1]}</b> <span class="tm">${b[2]}</span><br>BAGEL-7B ${b[3]} → ${VN[cur]} <b>${b[VI[cur]]}</b><br>relative gain <b>${fmt(G[cur][i], 1)}</b>`);
      body.appendChild(row);
      rows.push(row);
    });
    function draw(v) {
      cur = v;
      rows.forEach((row, i) => {
        const g = G[v][i];
        $('.hbar-bar', row).style.width = pct(g) + '%';
        const val = $('.hbar-val', row);
        val.style.left = pct(g) + '%';
        val.textContent = fmt(g, 1);
        row.setAttribute('aria-label', `${B[i][1]}: ${fmt(g, 1)} with ${VN[v]}`);
      });
      $$('#variant-seg button').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.v === v)));
    }
    $$('#variant-seg button').forEach((b) => b.addEventListener('click', () => draw(b.dataset.v)));
    draw('icl');

    let html = `<table class="data"><thead><tr><th>Benchmark</th><th>Metric</th><th>BAGEL-7B</th>${Object.values(VN).map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>`;
    B.forEach((b, i) => {
      html += `<tr><td>${b[1]}</td><td>${b[2]}</td><td>${b[3]}</td>${['icl', 'sq', 'ts', 'tsicl'].map((k) => `<td>${b[VI[k]]}<span class="d">${fmt(G[k][i], 1)}</span></td>`).join('')}</tr>`;
    });
    html += `<tr class="ours"><td>Mean relative gain</td><td></td><td>0.00%</td><td>+6.98%</td><td>+1.69%</td><td>+6.39%</td><td>+7.20%</td></tr>`;
    $('#table-bench').innerHTML = html + '</tbody></table>';
  })();

  /* ------------------------------------------------------------ why: Fig. 6 and Fig. 7 */
  (function whyCharts() {
    // Fig. 6: P(correct -> wrong), P(wrong -> correct), macro-averaged over the 17 benchmarks
    const S = [['SIMIT', 2.01, 14.38, true], ['TTRV', 2.03, 9.30], ['TTRL', 2.39, 7.68], ['EMPO', 2.30, 7.26], ['SRLM', 2.94, 6.71]];
    const MIN = -5, MAX = 18; // room right of 15% for the value labels
    const pct = (v) => (v - MIN) / (MAX - MIN) * 100;
    const el = $('#chart-strat');
    S.forEach(([n, c2w, w2c, ours]) => {
      const row = document.createElement('div');
      row.className = 'div-row' + (ours ? ' ours' : '');
      row.innerHTML = `<span class="nm">${n}</span>
        <div class="div-track">
          <span class="zero" style="left:${pct(0)}%"></span>
          <span class="b l" style="left:${pct(-c2w)}%;width:${pct(0) - pct(-c2w)}%"></span>
          <span class="b r" style="left:${pct(0)}%;width:${pct(w2c) - pct(0)}%"></span>
          <span class="v" style="right:${100 - pct(-c2w) + 1.2}%">${c2w.toFixed(1)}%</span>
          <span class="v" style="left:${pct(w2c) + 1.5}%">${w2c.toFixed(1)}%</span>
        </div>
        <span class="dl">+${(w2c - c2w).toFixed(1)}</span>`;
      row.setAttribute('aria-label', `${n}: ${w2c}% of wrong answers corrected, ${c2w}% of correct answers broken`);
      attachTip(row, () => `<b>${n}</b><br>wrong → correct: <b>${w2c.toFixed(2)}%</b><br>correct → wrong: <b>${c2w.toFixed(2)}%</b><br>net Δ = +${(w2c - c2w).toFixed(2)} pp`);
      el.appendChild(row);
    });
    const ax = document.createElement('div');
    ax.className = 'axis-row';
    ax.innerHTML = `<span></span><div class="ticks" style="margin:0">${[-5, 0, 5, 10, 15].map((t) => `<span style="left:${pct(t)}%">${t < 0 ? '−' + -t : t}%</span>`).join('')}</div><span></span>`;
    el.appendChild(ax);

    // Fig. 7: correct / no positive / incorrect supervision on initially misanswered queries
    const N = [['SIMIT', 41.67, 55.56, 2.78, -6.5, true], ['SRLM', 27.78, 38.89, 33.33, 22.3], ['TTRL', 27.78, 27.78, 44.44, 39.9], ['EMPO', 22.22, 27.78, 50.0, 43.8], ['TTRV', 8.33, 44.44, 47.22, 79.1]];
    const el2 = $('#chart-noise');
    N.forEach(([n, c, a, w, d, ours]) => {
      const row = document.createElement('div');
      row.className = 'stack-row' + (ours ? ' ours' : '');
      const seg = (v, k) => `<span class="s ${k}" style="flex:${v} 1 0">${v >= 9 ? Math.round(v) + '%' : ''}</span>`;
      row.innerHTML = `<span class="nm">${n}</span><div class="stack-track">${seg(c, 'c')}${seg(a, 'n')}${seg(w, 'w')}</div><span class="dl">${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(1)}</span>`;
      row.setAttribute('aria-label', `${n}: ${Math.round(c)}% correct, ${Math.round(a)}% no positive supervision, ${Math.round(w)}% incorrect; delta ${d}`);
      attachTip(row, () => `<b>${n}</b><br>correct supervision: <b>${c.toFixed(1)}%</b><br>no positive supervision: <b>${a.toFixed(1)}%</b><br>incorrect supervision: <b>${w.toFixed(1)}%</b><br>δ = ${d > 0 ? '+' : '−'}${Math.abs(d)} pp`);
      el2.appendChild(row);
    });
    const ax2 = document.createElement('div');
    ax2.className = 'axis-row';
    ax2.innerHTML = `<span></span><div class="ticks">${[0, 25, 50, 75, 100].map((t) => `<span style="left:${t}%">${t}%</span>`).join('')}</div><span></span>`;
    el2.appendChild(ax2);
  })();

  /* ------------------------------------------------------------ explore: qualitative examples */
  (function explore() {
    const ALL = window.SIMIT_EXAMPLES || [];
    const BENCHES = ['OK-VQA', 'VizWiz-VQA', 'RefCOCO', 'NoCaps', 'COCO Caption', 'InfoVQA'];
    const filters = $('#ex-filters'), rail = $('#ex-rail'), detail = $('#ex-detail'), count = $('#ex-count');
    let list = ALL, idx = 0;

    const mk = (label, n, val) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.dataset.v = val;
      b.innerHTML = `${label}<span>${n}</span>`;
      b.addEventListener('click', () => setFilter(val));
      filters.appendChild(b);
    };
    mk('All', ALL.length, '');
    BENCHES.forEach((bn) => mk(bn, ALL.filter((e) => e.bench === bn).length, bn));

    function setFilter(v) {
      $$('button', filters).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.v === v)));
      list = v ? ALL.filter((e) => e.bench === v) : ALL;
      rail.innerHTML = '';
      list.forEach((e, i) => {
        const t = document.createElement('button');
        t.type = 'button';
        t.className = 'ex-thumb';
        t.setAttribute('role', 'option');
        t.setAttribute('aria-label', `${e.bench}: ${e.q}`);
        t.innerHTML = `<img src="${e.img}" alt="" loading="lazy"><span class="bench">${esc(e.bench)}</span>`;
        t.addEventListener('click', () => show(i));
        rail.appendChild(t);
      });
      show(0, false);
    }

    const ansRow = (who, a) => `<div class="ans-row ${a.ok ? 'ok' : 'bad'}">
        <span class="ans-who">${who}</span>
        <span class="ans-txt">${esc(a.text)}</span>
        <span class="ans-meta"><i class="mark ${a.ok ? 'ok' : 'x'}" aria-label="${a.ok ? 'correct' : 'wrong'}"></i>${a.metric} ${a.score}</span>
      </div>`;
    const samples = (arr, syn) => `<div class="samples">${arr.map((s) => `<div class="sample">
        <img src="${s.img}" alt="${syn ? 'Imagined' : 'Retrieved'} image for: ${esc(s.q)}" loading="lazy">
        <div class="sample-t"><p><b>Q:</b> ${esc(s.q)}</p><p class="a">A: <span>${esc(s.a)}</span></p></div></div>`).join('')}</div>`;

    function show(i, scroll = true) {
      idx = (i + list.length) % list.length;
      const e = list[idx];
      $$('.ex-thumb', rail).forEach((t, j) => t.setAttribute('aria-selected', String(j === idx)));
      const th = $$('.ex-thumb', rail)[idx];
      if (th && scroll) th.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
      count.textContent = `${idx + 1} / ${list.length}`;
      const instr = e.bench === 'RefCOCO' ? 'The region is marked with a red box.' : e.instr;
      detail.innerHTML = `
        <div class="ex-col q">
          <div class="ex-h">Unlabeled test query <small>${esc(e.bench)}</small></div>
          <div class="ex-body">
            <img class="ex-qimg" src="${e.img}" alt="Test image: ${esc(e.q)}">
            <p class="ex-question"><b>Q:</b> ${esc(e.q)}</p>
            ${instr ? `<p class="ex-instr">${esc(instr)}</p>` : ''}
            <button type="button" class="gt-btn" aria-expanded="false"><b>${e.caption ? 'Reference answers' : 'Ground truth'}:</b> <span class="gt-hidden">hidden from the model. Click to reveal.</span></button>
            <div class="ans-list">${ansRow('BAGEL-7B, zero-shot', e.zs)}</div>
          </div>
        </div>
        <div class="ex-col syn">
          <div class="ex-h">Imagined by SIMIT <small>self-generated, no labels</small></div>
          <div class="ex-body">
            ${samples(e.syn, true)}
            <div class="ans-list">${ansRow('SIMIT-ICL', e.icl)}${ansRow('SIMIT-FT (single-query)', e.ft)}</div>
          </div>
        </div>
        <div class="ex-col real">
          <div class="ex-h">Retrieved real samples <small>needs a labeled pool</small></div>
          <div class="ex-body">
            ${samples(e.real, false)}
            <div class="ans-list">${ansRow('RICES (in-context)', e.rices)}${ansRow('TTT-NN (fine-tuned)', e.tttnn)}</div>
          </div>
        </div>`;
      const gt = $('.gt-btn', detail);
      gt.addEventListener('click', () => {
        gt.setAttribute('aria-expanded', 'true');
        $('.gt-hidden', gt).outerHTML = `<span>${esc(e.gt)}</span>`;
      }, { once: true });
      $$('img', detail).forEach((im) => { if (!im.classList.contains('ex-qimg')) im.addEventListener('click', () => lightbox(im)); });
      $('.ex-qimg', detail).addEventListener('click', (ev) => lightbox(ev.target));
    }

    function lightbox(im) {
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `<img src="${im.src}" alt="${esc(im.alt)}">`;
      const close = () => { lb.remove(); document.removeEventListener('keydown', onKey); };
      const onKey = (e) => { if (e.key === 'Escape') close(); };
      lb.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      document.body.appendChild(lb);
    }

    $('#ex-prev').addEventListener('click', () => show(idx - 1));
    $('#ex-next').addEventListener('click', () => show(idx + 1));
    $('#ex').addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') { show(idx + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { show(idx - 1); e.preventDefault(); }
    });
    setFilter('');
  })();

  /* ------------------------------------------------------------ copy code (try it) */
  $$('.code-copy').forEach((btn) => btn.addEventListener('click', async () => {
    const pre = document.getElementById(btn.dataset.copy);
    try { await navigator.clipboard.writeText(pre.textContent); }
    catch (e) {
      const r = document.createRange();
      r.selectNodeContents(pre);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      document.execCommand('copy');
    }
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  }));

  /* ------------------------------------------------------------ bibtex */
  $('#bib-copy').addEventListener('click', async () => {
    const btn = $('#bib-copy');
    const text = $('#bib-text').textContent;
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const r = document.createRange();
      r.selectNodeContents($('#bib-text'));
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      document.execCommand('copy');
    }
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  });
})();
