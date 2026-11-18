/* M. Onurcan Kaya: personal site (v2). Plain JavaScript, no dependencies.
 * Everything here is progressive enhancement: the page reads fine without it. */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var storage = function (kind) {
    return {
      get: function (k) { try { return window[kind].getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window[kind].setItem(k, v); } catch (e) { /* private mode */ } }
    };
  };
  var local = storage('localStorage');
  var session = storage('sessionStorage');
  var SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function icon(id) {
    var s = svgEl('svg', { 'class': 'i', 'aria-hidden': 'true' });
    s.appendChild(svgEl('use', { href: '#' + id }));
    return s;
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // Run cb once when target comes within `margin` of the viewport (or is `ratio` visible).
  function when(target, cb, opts) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      cb();
    }, opts);
    io.observe(target);
  }
  var SHAPE_COLORS = { blue: '#2a78d6', orange: '#e0632f', green: '#1a9f6f' }; // validated for color-vision deficiency

  /* ------------------------------------------------------- publication filter */
  (function filters() {
    var pubs = $$('.pub'), chips = $$('.chip'), status = $('#pub-status');
    if (!pubs.length || !chips.length) return;
    var has = function (p, f) { return f === 'all' || (p.dataset.topics || '').split(' ').indexOf(f) !== -1; };
    var apply = function (f) {
      var n = 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === f)); });
      pubs.forEach(function (p) { var show = has(p, f); p.hidden = !show; if (show) n++; });
      if (status) status.textContent = 'Showing ' + n + ' of ' + pubs.length + ' publications';
    };
    chips.forEach(function (c) {
      $('.chip-n', c).textContent = pubs.filter(function (p) { return has(p, c.dataset.filter); }).length;
      c.addEventListener('click', function () { apply(c.dataset.filter); });
    });
    // A link to a paper that is filtered out shows all papers again
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#pub-"]');
      var t = a && document.getElementById(a.getAttribute('href').slice(1));
      if (t && t.hidden) apply('all');
    }, true);
  })();

  /* ------------------------------------- in-page links to a paper: highlight */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#pub-"]');
    var t = a && document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    t.classList.remove('is-flash');
    void t.offsetWidth;
    t.classList.add('is-flash');
  });

  /* ---------------------------------------------------- thumbnails: motion */
  (function thumbs() {
    // Figures with several frames cycle through them while the card is hovered (frames load on first hover)
    $$('.pub-media[data-frames]').forEach(function (box) {
      var rest = $('img', box), frames = null, i = 0, timer = null;
      function build() {
        if (frames) return;
        frames = [rest];
        JSON.parse(box.dataset.frames).forEach(function (f) {
          var im = el('img');
          im.src = f[0]; im.alt = ''; im.decoding = 'async';
          box.appendChild(im);
          frames.push(im);
        });
        box.classList.add('is-ready');
        rest.classList.add('is-active');
      }
      function show(k) { frames[i].classList.remove('is-active'); i = k; frames[i].classList.add('is-active'); }
      function next() { show((i + 1) % frames.length); }
      function play() { build(); if (timer || reduceMotion) return; next(); timer = setInterval(next, 800); }
      function stop() { clearInterval(timer); timer = null; if (frames) show(0); }
      var card = box.closest('.pub');
      card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') play(); });
      card.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') stop(); });
    });
    $$('.hover-video').forEach(function (v) {
      var card = v.closest('.pub'), playing = false;
      var play = function () { playing = true; v.play().catch(function () { playing = false; }); };
      var stop = function () { playing = false; v.pause(); };
      card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !reduceMotion) play(); });
      card.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') stop(); });
    });
  })();

  /* ------------------------------------------------ helpers for the figures */
  function verdict(slot, text, right) { // fill an answer slot with a right/wrong verdict, or reset it to "?"
    slot.textContent = '';
    slot.className = 'verdict demo-out' + (text ? (right ? ' is-right' : ' is-wrong') : '');
    if (!text) { slot.textContent = '?'; return; }
    slot.appendChild(el('b', null, '“' + text + '”'));
    slot.appendChild(icon(right ? 'i-check' : 'i-cross'));
    slot.appendChild(el('span', 'sr-only', right ? '(correct)' : '(wrong)'));
  }
  function stepper(fig) { // numbered steps light up one at a time
    var steps = $$('.step', fig);
    return {
      reset: function () { steps.forEach(function (s, k) { s.classList.toggle('is-dim', k > 0); }); },
      on: function (k) { steps[k].classList.remove('is-dim'); }
    };
  }
  function autoplay(fig, run, delay) { // run once when the figure is well in view
    if (reduceMotion) return;
    when(fig, function () { setTimeout(run, delay || 900); }, { threshold: 0.6 });
  }

  /* ============================================================================
     Fig. 1: practice makes correct (the real SIMIT example from the project page).
     1. The model alone answers "Unanswerable". 2. It writes two related practice
     problems, answer first, then generates a matching image. 3. With them as
     in-context examples it answers "Brown".
     ========================================================================== */
  (function practice() {
    var fig = $('#fig-1');
    if (!fig) return;
    var st = stepper(fig), items = $$('.practice-item', fig), out = $('.demo-out', fig), btn = $('.demo-btn', fig);
    var timers = [], done = false, touched = false;
    function reset() {
      timers.forEach(clearTimeout); timers = [];
      st.reset();
      items.forEach(function (it) { it.classList.remove('has-q', 'has-img'); });
      verdict(out, null);
      btn.textContent = 'Run SIMIT';
      done = false;
    }
    function run(animate) {
      reset();
      done = true;
      btn.textContent = 'Start over';
      var later = function (fn, ms) { if (animate) timers.push(setTimeout(fn, ms)); else fn(); };
      later(function () { st.on(1); }, 100);
      items.forEach(function (it, k) {
        later(function () { it.classList.add('has-q'); }, 400 + k * 1200);    // question and answer first…
        later(function () { it.classList.add('has-img'); }, 1000 + k * 1200); // …then an image that fits them
      });
      var end = 400 + items.length * 1200 + 300;
      later(function () { st.on(2); }, end);
      later(function () { verdict(out, 'Brown', true); }, end + 500);
    }
    btn.addEventListener('click', function () { touched = true; if (done) reset(); else run(!reduceMotion); });
    reset();
    autoplay(fig, function () { if (!touched) run(true); });
  })();

  /* ============================================================================
     Fig. 2: look again (the real GQA example from the TTAug paper).
     1. The original input gives "blinds". 2. 15 altered versions (plus the
     original). 3. Averaging the next-word probabilities over all 16 gives "desk".
     ========================================================================== */
  (function lookAgain() {
    var fig = $('#fig-2');
    if (!fig) return;
    var body = $('.tta', fig), grid = $('.tta-grid', fig), qtag = $('.tta-qtag', fig), qtext = $('.tta-qtext', fig);
    var st = stepper(fig), out = $('.demo-out', fig), btn = $('.tta-btn', fig);
    var ORIG = "What's in front of the window?";
    var QS = ["W hat ' s in feont of the win dow?", "Wh at ' s in fro nt of the window?", "W hat ' s in fro nt of the win dow?", "Wh at ' s in fro nt of the wi ndow?",
      "Wh at ' s in fr ont of the wi ndod?", "W hat ' s in f romt of the window?", "W hat ' s in fro nt of the windo#?", "Wmat ' s in fro nt of the wi ndow?",
      "What ' s in f ront of the !ind ow?", "Wh at ' s in fr0nt of the wi ndow?", "Wh at ' s in front of the qind ow?", "Wh at ' s in f%ont of the win dow?",
      "W hat ' s in front of the wi ndow?", "W hat ' s in front of the winE ow?", "dhat ' s in fro nt of the win dow?", ORIG];
    var timer = null, touched = false, done = false;
    var tiles = QS.map(function (q, i) {
      var li = el('li', 'tta-tile');
      li.style.backgroundPosition = ((i % 4) * 100 / 3) + '% ' + (Math.floor(i / 4) * 100 / 3) + '%';
      li.style.setProperty('--d', (i * 35) + 'ms');
      li.addEventListener('pointerenter', function () { hot(i); });
      li.addEventListener('click', function () { hot(i); });
      grid.appendChild(li);
      return li;
    });
    grid.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') hot(-1); });
    function hot(i) {
      tiles.forEach(function (t, k) { t.classList.toggle('is-hot', k === i); });
      qtag.textContent = i < 0 ? 'Hover a version' : QS[i] === ORIG ? 'Original:' : 'Version ' + (i + 1) + ':';
      qtext.textContent = i < 0 ? 'to read its question.' : QS[i];
      qtext.classList.toggle('is-aug', i >= 0 && QS[i] !== ORIG);
    }
    function reset() {
      clearTimeout(timer);
      st.reset();
      body.classList.remove('is-many');
      verdict(out, null);
      hot(-1);
      btn.textContent = 'Look again';
      done = false;
    }
    function run() {
      reset();
      done = true;
      btn.textContent = 'Start over';
      st.on(1);
      body.classList.add('is-many');
      timer = setTimeout(function () { st.on(2); verdict(out, 'desk', true); }, reduceMotion ? 0 : 1100); // once the versions have landed
    }
    btn.addEventListener('click', function () { touched = true; if (done) reset(); else run(); });
    reset();
    when(fig, function () { body.classList.add('is-near'); }, { rootMargin: '400px 0px' }); // fetch the 16 views only when needed
    autoplay(fig, function () { if (!touched) run(); }, 1000);
  })();

  /* ============================================================================
     Fig. 3: two kinds of edits. "Move an object": the real POEM result for
     "move the lantern to the left by 120 px" (click the photo to apply).
     "Change the light": five real WildLight captures; the sun slider blends them.
     ========================================================================== */
  (function editing() {
    var fig = $('#fig-3');
    if (!fig) return;
    var tabs = $$('.tab', fig), panels = $$('.edit-panel', fig), touched = false;
    function choose(k) {
      tabs.forEach(function (t, j) { t.setAttribute('aria-selected', String(j === k)); t.tabIndex = j === k ? 0 : -1; });
      panels.forEach(function (p, j) { p.hidden = j !== k; });
      if (k === 1) loadLight();
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { touched = true; choose(k); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var n = (k + 1) % tabs.length; choose(n); tabs[n].focus(); e.preventDefault(); }
      });
    });

    var stage = $('.edit-stage', fig), tag = $('.edit-stage .stage-tag', fig);
    function apply(on) {
      stage.classList.toggle('is-after', on);
      stage.setAttribute('aria-pressed', String(on));
      tag.textContent = on ? 'After · click to undo' : 'Before · click to edit';
    }
    var toggle = function () { touched = true; apply(!stage.classList.contains('is-after')); };
    stage.addEventListener('click', toggle);
    stage.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { toggle(); e.preventDefault(); } });

    var lstage = $('.relight-stage', fig), ltag = $('.relight-stage .stage-tag', fig), range = $('.sun-range', fig);
    var ticks = $$('.relight-ticks span', fig), TIMES = ticks.map(function (t) { return t.textContent; }), imgs = [];
    function loadLight() {
      if (imgs.length) return;
      TIMES.forEach(function (t, k) {
        var im = el('img');
        im.src = 'assets/img/relight-' + k + '.webp';
        im.width = 295; im.height = 204; im.decoding = 'async';
        im.alt = k ? '' : 'An outdoor scene with picnic tables, photographed at different times of day';
        lstage.insertBefore(im, ltag);
        imgs.push(im);
      });
      setTime(+range.value);
    }
    function setTime(v) {
      var base = Math.min(Math.floor(v), imgs.length - 1), frac = v - base, near = Math.round(v);
      imgs.forEach(function (im, k) { im.style.opacity = k === base ? 1 : k === base + 1 ? frac : 0; }); // later photo fades in on top
      ticks.forEach(function (t, k) { t.classList.toggle('is-on', k === near); });
      ltag.textContent = TIMES[near];
      range.setAttribute('aria-valuetext', 'Around ' + TIMES[near]);
    }
    range.addEventListener('input', function () { touched = true; setTime(+range.value); });

    autoplay(fig, function () { // once in view: apply the edit, then switch to the light and sweep the afternoon
      if (touched) return;
      apply(true);
      setTimeout(function () {
        if (touched) return;
        choose(1);
        var t0 = null;
        requestAnimationFrame(function step(now) {
          if (touched) return;
          if (t0 === null) t0 = now;
          var p = Math.min((now - t0) / 3200, 1), v = 4 * (0.5 - Math.cos(Math.PI * p) / 2);
          range.value = v; setTime(v);
          if (p < 1) requestAnimationFrame(step);
        });
      }, 2200);
    }, 700);
  })();

  /* ============================================================================
     Fig. 4: classical Fourier phase retrieval, live (Fienup's HIO).
     Noise-free simulation on a 64×64 grayscale version of my photo, zero-padded
     2x. The solver sees only |FFT|; three runs from random starts. The "fit
     error" uses the measurement only, so it cannot tell the photo from its
     upside-down twin. Runs in a Web Worker.
     ========================================================================== */

  // Classical Fourier phase retrieval (Fienup's HIO, then a few error-reduction steps), several runs.
  // Setting as in my papers: grayscale image, zero-padded 2x (oversampling), measurement = |FFT(padded image)|,
  // constraints = known support (the image area) and non-negativity. Pure function: also runs in a Web Worker.
  function hioSolver(gray, n, seeds, iters, every, post) {
    var M = 2 * n, LOG = Math.round(Math.log(M) / Math.LN2), MM = M * M, BETA = 0.9, ER_TAIL = 20, i, r, k;
    var rev = new Uint16Array(M), cosT = new Float64Array(M / 2), sinT = new Float64Array(M / 2);
    for (i = 0; i < M; i++) { r = 0; for (var b = 0; b < LOG; b++) r |= ((i >> b) & 1) << (LOG - 1 - b); rev[i] = r; }
    for (i = 0; i < M / 2; i++) { cosT[i] = Math.cos(2 * Math.PI * i / M); sinT[i] = Math.sin(2 * Math.PI * i / M); }
    function fft1(re, im, off, stride, inv) {
      var i, j, a, b, t;
      for (i = 0; i < M; i++) {
        j = rev[i];
        if (j > i) { a = off + i * stride; b = off + j * stride; t = re[a]; re[a] = re[b]; re[b] = t; t = im[a]; im[a] = im[b]; im[b] = t; }
      }
      for (var size = 2; size <= M; size <<= 1) {
        var half = size >> 1, step = M / size;
        for (i = 0; i < M; i += size) {
          for (j = 0; j < half; j++) {
            var w = j * step, wr = cosT[w], wi = inv ? sinT[w] : -sinT[w];
            a = off + (i + j) * stride; b = a + half * stride;
            var xr = re[b] * wr - im[b] * wi, xi = re[b] * wi + im[b] * wr;
            re[b] = re[a] - xr; im[b] = im[a] - xi; re[a] += xr; im[a] += xi;
          }
        }
      }
    }
    function fft2(re, im, inv) {
      for (var r = 0; r < M; r++) fft1(re, im, r * M, 1, inv);
      for (var c = 0; c < M; c++) fft1(re, im, c, M, inv);
      if (inv) { var s = 1 / MM; for (var i = 0; i < MM; i++) { re[i] *= s; im[i] *= s; } }
    }
    var re = new Float64Array(MM), im = new Float64Array(MM), mag = new Float64Array(MM), supp = new Uint8Array(MM);
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) { re[y * M + x] = gray[y * n + x]; supp[y * M + x] = 1; }
    fft2(re, im, false);
    var magNorm = 0;
    for (i = 0; i < MM; i++) { mag[i] = Math.sqrt(re[i] * re[i] + im[i] * im[i]); magNorm += mag[i] * mag[i]; }
    magNorm = Math.sqrt(magNorm);

    // What is measured: log Fourier magnitude, zero frequency in the centre
    var meas = new Uint8ClampedArray(MM * 4), lg = new Float64Array(MM), hi = 0;
    for (i = 0; i < MM; i++) { lg[i] = Math.log(1 + mag[i]); if (lg[i] > hi) hi = lg[i]; }
    for (y = 0; y < M; y++) for (x = 0; x < M; x++) {
      var g = lg[((y + M / 2) % M) * M + ((x + M / 2) % M)] / hi, o = 4 * (y * M + x);
      meas[o] = meas[o + 1] = meas[o + 2] = Math.pow(g, 1.6) * 255; meas[o + 3] = 255;
    }

    var runs = seeds.map(function (seed) {
      var a = seed | 0, rnd = function () {
        a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
      var xx = new Float64Array(MM);
      for (var i = 0; i < MM; i++) if (supp[i]) xx[i] = rnd();
      return { x: xx, fit: 1 };
    });

    function snapshot(t) {
      var out = runs.map(function (run) {
        var d = new Uint8ClampedArray(n * n * 4);
        for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) {
          var v = Math.max(0, Math.min(1, run.x[y * M + x])) * 255, o = 4 * (y * n + x);
          d[o] = d[o + 1] = d[o + 2] = v; d[o + 3] = 255;
        }
        return { img: d, fit: run.fit };
      });
      post(t, out, t === 0 ? meas : null);
    }

    snapshot(0);
    for (var t = 1; t <= iters; t++) {
      for (k = 0; k < runs.length; k++) {
        var xk = runs[k].x, err = 0;
        for (i = 0; i < MM; i++) { re[i] = xk[i]; im[i] = 0; }
        fft2(re, im, false);
        for (i = 0; i < MM; i++) { // keep the phase, impose the measured magnitude
          var m = Math.sqrt(re[i] * re[i] + im[i] * im[i]), d0 = m - mag[i];
          err += d0 * d0;
          if (m > 1e-12) { var s = mag[i] / m; re[i] *= s; im[i] *= s; } else { re[i] = mag[i]; im[i] = 0; }
        }
        runs[k].fit = Math.sqrt(err) / magNorm; // how badly the current estimate fits the measurement
        fft2(re, im, true);
        var er = t > iters - ER_TAIL;
        for (i = 0; i < MM; i++) {
          var ok = supp[i] && re[i] >= 0;
          xk[i] = ok ? re[i] : (er ? 0 : xk[i] - BETA * re[i]);
        }
      }
      if (t % every === 0 || t === iters) snapshot(t);
    }
  }

  function hioWorkerMain() {
    self.onmessage = function (e) {
      var d = e.data;
      hioSolver(d.gray, d.n, d.seeds, d.iters, d.every, function (t, runs, meas) {
        var transfer = runs.map(function (r) { return r.img.buffer; });
        if (meas) transfer.push(meas.buffer);
        self.postMessage({ t: t, runs: runs, meas: meas }, transfer);
      });
    };
  }

  (function phaseRetrieval() {
    var fig = $('#fig-4');
    if (!fig || !window.Float64Array || !window.ImageData) return;
    var N = 64, ITERS = 300, EVERY = 10, STEP_MS = 90;
    var SEEDS = [95028, 15838, 118785]; // first visit: one success, one stuck run, one upside-down twin (real outcomes)
    var mctx = $('.pr-meas', fig).getContext('2d');
    var tiles = $$('.pr-run', fig), ctxs = tiles.map(function (t) { return $('canvas', t).getContext('2d'); });
    var fits = $$('.pr-fit', fig), range = $('.pr-range', fig), itEl = $('.pr-it', fig);
    range.max = ITERS / EVERY;
    var gray = null, frames = [], shown = 0, scrubbed = false, runId = 0, worker = null, workerUrl = null;

    function show(k) {
      k = Math.max(0, Math.min(k, frames.length - 1));
      var f = frames[k], best = 0;
      shown = k;
      f.runs.forEach(function (r, j) {
        ctxs[j].putImageData(new ImageData(r.img, N, N), 0, 0);
        fits[j].textContent = k ? 'fit error ' + (100 * r.fit).toFixed(2) + '%' : 'random start';
        if (r.fit < f.runs[best].fit) best = j;
      });
      tiles.forEach(function (t, j) { t.classList.toggle('is-best', k === frames.length - 1 && k > 0 && j === best); });
      range.value = k;
      itEl.textContent = f.t;
      range.setAttribute('aria-valuetext', 'Iteration ' + f.t + ' of ' + ITERS);
    }
    function onFrame(id, d) {
      if (id !== runId) return;
      if (d.meas) mctx.putImageData(new ImageData(d.meas, 2 * N, 2 * N), 0, 0);
      frames.push({ t: d.t, runs: d.runs });
      if (frames.length === 1) show(0);
      if (scrubbed || reduceMotion) show(frames.length - 1);
    }
    function start(seeds) {
      var id = ++runId, last = 0;
      frames = []; shown = 0; scrubbed = false;
      if (worker) { worker.terminate(); worker = null; }
      var msg = { gray: gray, n: N, seeds: seeds, iters: ITERS, every: EVERY };
      try {
        if (!workerUrl) {
          var src = hioSolver.toString() + '\n(' + hioWorkerMain.toString() + ')();';
          workerUrl = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
        }
        worker = new Worker(workerUrl);
        worker.onmessage = function (e) { onFrame(id, e.data); };
        worker.postMessage(msg);
      } catch (err) { // no workers: compute on the main thread (about a second), then play
        setTimeout(function () { hioSolver(gray, N, seeds, ITERS, EVERY, function (t, runs, meas) { onFrame(id, { t: t, runs: runs, meas: meas }); }); }, 50);
      }
      requestAnimationFrame(function tick(now) { // play the saved iterations at a steady pace
        if (id !== runId || scrubbed) return;
        if (shown < frames.length - 1 && now - last >= STEP_MS) { last = now; show(shown + 1); }
        if (shown < ITERS / EVERY) requestAnimationFrame(tick);
      });
    }
    function setup() {
      var img = new Image();
      img.onload = function () {
        var c = document.createElement('canvas'), x = c.getContext('2d'), d, i;
        c.width = c.height = N;
        x.drawImage(img, 0, 0, N, N);
        try { d = x.getImageData(0, 0, N, N).data; } catch (e) { return; }
        gray = new Float64Array(N * N);
        for (i = 0; i < N * N; i++) gray[i] = d[4 * i] / 255; // grayscale PNG: R = G = B
        start(SEEDS);
        $('.pr-replay', fig).addEventListener('click', function () {
          start([0, 1, 2].map(function () { return (Math.random() * 1e9) | 0; }));
        });
        range.addEventListener('input', function () {
          if (!frames.length) return;
          scrubbed = true;
          show(+range.value);
        });
      };
      img.src = window.PORTRAIT_GRAY64;
    }
    // The 64×64 grayscale photo comes as an inline data URI (works from file:// too); load it only when the figure is near.
    when(fig, function () {
      var s = document.createElement('script');
      s.src = 'assets/js/portrait-data.js';
      s.onload = function () { if (window.PORTRAIT_GRAY64) when(fig, setup, { threshold: 0.45 }); };
      document.head.appendChild(s);
    }, { rootMargin: '600px 0px' });
  })();
})();
