/* Documentação + Segurança: fios entre os anéis e as camadas, sombra de rolagem do terminal. Autocontido. */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  /* sombra na borda direita do código quando ainda tem o que rolar */
  var term = document.querySelector('#documentacao .dx-term:not(.dx-term-sm)');
  if (term) {
    var update = function () {
      var pre = term.querySelector('pre:not([hidden])');
      if (!pre) return;
      term.classList.toggle('has-more', pre.scrollWidth - pre.clientWidth - pre.scrollLeft > 4);
    };
    term.addEventListener('scroll', update, true);
    var card = term.closest('.dx-card');
    if (card) card.addEventListener('click', function () { setTimeout(update, 30); });
    window.addEventListener('resize', update);
    update();
    setTimeout(update, 500);
  }

  /* fios: etiqueta do anel -> card da camada */
  var main = document.querySelector('#seguranca .sg-main');
  if (!main) return;
  var svg = main.querySelector('.sg-wires');
  if (!svg) return;

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (window.innerWidth <= 1080) return;
    var mb = main.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + mb.width + ' ' + mb.height);
    var cards = {}, l;
    for (l = 1; l <= 4; l++) {
      var pill = main.querySelector('.rl[data-l="' + l + '"]');
      var card = main.querySelector('.sg-layer[data-l="' + l + '"]');
      if (pill && card) cards[l] = { pr: pill.getBoundingClientRect(), cr: card.getBoundingClientRect() };
    }
    for (var n = 1; n <= 4; n++) {
      var c = cards[n];
      if (!c) continue;
      var x0 = c.pr.right - mb.left + 2, y0 = c.pr.top + c.pr.height / 2 - mb.top;
      var cl = c.cr.left - mb.left, ct = c.cr.top - mb.top, cb = c.cr.bottom - mb.top;
      var d, ex, ey;
      if (n === 3 && cards[4]) {
        /* a camada 3 fica ao lado da 2: o fio entra pela fresta de baixo */
        var gapY = (cb + (cards[4].cr.top - mb.top)) / 2;
        var xt = x0 + 18;
        ex = cl + 44; ey = cb;
        d = 'M' + x0 + ' ' + y0 + ' H' + (xt - 8) + ' Q' + xt + ' ' + y0 + ' ' + xt + ' ' + (y0 + 8) +
            ' V' + (gapY - 8) + ' Q' + xt + ' ' + gapY + ' ' + (xt + 8) + ' ' + gapY +
            ' H' + (ex - 8) + ' Q' + ex + ' ' + gapY + ' ' + ex + ' ' + (gapY - 8) + ' V' + ey;
      } else {
        ex = cl; ey = clamp(y0, ct + 40, cb - 40);
        var xm = (x0 + cl) / 2;
        d = Math.abs(ey - y0) < 2
          ? 'M' + x0 + ' ' + y0 + ' H' + ex
          : 'M' + x0 + ' ' + y0 + ' C' + xm + ' ' + y0 + ' ' + xm + ' ' + ey + ' ' + ex + ' ' + ey;
      }
      var g = el('g', { 'data-l': n });
      g.appendChild(el('path', { d: d, 'class': 'w' }));
      g.appendChild(el('path', { d: d, 'class': 'wp', pathLength: 100 }));
      g.appendChild(el('circle', { cx: ex, cy: ey, r: 3.5, 'class': 'wd' }));
      svg.appendChild(g);
    }
  }

  var raf = 0;
  function schedule() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  if (window.ResizeObserver) new ResizeObserver(schedule).observe(main);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  schedule();
})();
