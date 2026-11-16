/* Calculadora de preço (valores de exemplo). Autocontido: usa só ids pq-* e data-pq-step. */
(function () {
  var range = document.getElementById('pq-qtd');
  if (!range) return;
  var out = document.getElementById('pq-out');
  var word = document.getElementById('pq-word');
  var totalEl = document.getElementById('pq-total');
  var unitEl = document.getElementById('pq-unit');
  var saveEl = document.getElementById('pq-save');
  var srEl = document.getElementById('pq-sr');
  var tiers = Array.prototype.slice.call(document.querySelectorAll('#planos .pq-tier'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('#planos .pq-rack i'));
  var steps = Array.prototype.slice.call(document.querySelectorAll('[data-pq-step]'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var BASE = 39;
  var price = function (n) { return n >= 20 ? 27 : n >= 5 ? 33 : 39; };
  var brl = function (v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); };

  var shown = null, raf = 0, srTimer = 0;
  function tween(to) {
    if (reduce || shown === null) { shown = to; totalEl.textContent = brl(to); return; }
    cancelAnimationFrame(raf);
    var from = shown, t0 = performance.now(), dur = 380;
    (function tick(now) {
      var k = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      shown = Math.round(from + (to - from) * e);
      totalEl.textContent = brl(shown);
      if (k < 1) raf = requestAnimationFrame(tick); else { shown = to; totalEl.textContent = brl(to); }
    })(t0);
  }

  function update(bump) {
    var n = Number(range.value);
    var p = price(n);
    var total = n * p;
    var pct = (n - 1) / 49;
    range.style.setProperty('--pq-fill', (pct * 100).toFixed(2) + '%');
    out.textContent = n;
    word.textContent = n === 1 ? 'número' : 'números';
    tween(total);
    unitEl.textContent = n + ' ' + (n === 1 ? 'número' : 'números') + ' × ' + brl(p);
    var save = n * (BASE - p);
    if (save > 0) { saveEl.hidden = false; saveEl.textContent = 'Você economiza ' + brl(save) + ' por mês com o desconto'; }
    else { saveEl.hidden = true; }
    tiers.forEach(function (t) {
      var on = n >= Number(t.dataset.min) && n <= Number(t.dataset.max);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
      t.classList.toggle('is-on', on);
    });
    dots.forEach(function (d, i) { d.classList.toggle('on', i < n); });
    steps.forEach(function (b) { b.disabled = (Number(b.dataset.pqStep) < 0 && n <= 1) || (Number(b.dataset.pqStep) > 0 && n >= 50); });
    clearTimeout(srTimer);
    srTimer = setTimeout(function () { srEl.textContent = n + ' ' + (n === 1 ? 'número' : 'números') + ', ' + brl(total) + ' por mês'; }, 400);
    if (bump && !reduce && out.animate) out.animate([{ transform: 'translateY(4px)', opacity: 0.4 }, { transform: 'none', opacity: 1 }], { duration: 180, easing: 'cubic-bezier(0.2,0.7,0.2,1)' });
  }

  range.addEventListener('input', function () { update(true); });
  steps.forEach(function (b) {
    b.addEventListener('click', function () {
      range.value = Math.min(50, Math.max(1, Number(range.value) + Number(b.dataset.pqStep)));
      update(true);
    });
  });
  tiers.forEach(function (t) {
    t.addEventListener('click', function () {
      var n = Number(range.value), min = Number(t.dataset.min), max = Number(t.dataset.max);
      if (n < min || n > max) { range.value = min; update(true); }
    });
  });
  update(false);
})();
