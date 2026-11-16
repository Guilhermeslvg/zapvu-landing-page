/* Funcionalidades: fila andando, chaves de configuração e pulso do recebimento. Autocontido. */
(function () {
  var root = document.getElementById('funcionalidades');
  if (!root) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- chaves de configuração ---------- */
  var saved = root.querySelector('#fx-saved');
  var savedTimer;
  root.querySelectorAll('.fx-tg').forEach(function (b) {
    b.addEventListener('click', function () {
      b.setAttribute('aria-checked', b.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
      if (!saved) return;
      saved.textContent = 'salvo';
      saved.classList.add('on');
      clearTimeout(savedTimer);
      savedTimer = setTimeout(function () { saved.textContent = 'configurações'; saved.classList.remove('on'); }, 1400);
    });
  });

  /* ---------- pulso do recebimento: distância real do trilho ---------- */
  var steps = root.querySelector('.fx-steps');
  function medeTrilho() {
    if (steps) steps.style.setProperty('--fx-run', Math.max(0, steps.clientWidth * 0.84 - 70) + 'px');
  }
  medeTrilho();
  window.addEventListener('resize', medeTrilho);

  /* ---------- fila ---------- */
  var ul = root.querySelector('#fx-q');
  if (!ul || reduce) return;

  var pool = [
    { id: 'msg_7Hq7', t: 'Pedido #4821 separado' },
    { id: 'msg_7Hq8', t: 'Sua consulta foi confirmada' },
    { id: 'msg_7Hq9', t: 'Segue o link de pagamento' },
    { id: 'msg_7HqA', t: 'Promoção do fim de semana', cancel: true },
    { id: 'msg_7HqB', t: 'Entrega prevista para hoje' },
    { id: 'msg_7HqC', t: 'Obrigado pela compra!' },
    { id: 'msg_7HqD', t: 'Seu protocolo é 20931' }
  ];
  var items = [
    { id: 'msg_7Hq2', t: 'Oi, Carla! Seu pedido saiu…', s: 'ok' },
    { id: 'msg_7Hq3', t: 'Boleto de novembro em anexo', s: 'sent' },
    { id: 'msg_7Hq4', t: 'Lembrete: consulta amanhã às 9h', s: 'wait', w: 2.8 },
    { id: 'msg_7Hq5', t: 'Promoção da semana', s: 'off' },
    { id: 'msg_7Hq6', t: 'Seu código de acesso chegou', s: 'wait', w: 1.9 }
  ];
  var next = 0;
  var label = { ok: 'entregue', sent: 'enviada', send: 'enviando…', off: 'cancelada' };
  var cls = { ok: 'st-ok', sent: 'st-sent', send: 'st-send', off: 'st-off', wait: 'st-wait' };
  var lis = Array.prototype.slice.call(ul.children);

  function paint(li, it, isNew) {
    var code = li.querySelector('code'), span = li.querySelector('span'), em = li.querySelector('em');
    code.textContent = it.id;
    span.textContent = it.t;
    em.className = 'fx-st ' + cls[it.s];
    em.textContent = it.s === 'wait' ? 'na fila · ' + String(it.w.toFixed(1)).replace('.', ',') + ' s' : label[it.s];
    if (isNew) { li.classList.remove('enter'); void li.offsetWidth; li.classList.add('enter'); }
  }
  function render(newIdx) { items.forEach(function (it, i) { paint(lis[i], it, i === newIdx); }); }

  function tick() {
    /* o que estava saindo vira enviada, o que estava enviada vira entregue */
    var sending = false;
    items.forEach(function (it) {
      if (it.s === 'send') { it.s = 'sent'; }
      else if (it.s === 'sent') { it.s = 'ok'; }
    });
    /* o primeiro da fila sai (ou é cancelado) */
    for (var i = 0; i < items.length; i++) {
      if (items[i].s === 'wait') {
        if (items[i].cancel) { items[i].s = 'off'; } else { items[i].s = 'send'; }
        sending = true;
        break;
      }
    }
    /* a pausa dos outros vai diminuindo */
    items.forEach(function (it) { if (it.s === 'wait') it.w = Math.max(1.5, it.w - 0.6); });
    var newIdx = -1;
    var done = items.filter(function (it) { return it.s === 'ok' || it.s === 'off'; }).length;
    if (done > 2 || !sending) {
      items.shift();
      var p = pool[next++ % pool.length];
      items.push({ id: p.id, t: p.t, s: 'wait', w: 1.5 + Math.round(Math.random() * 25) / 10, cancel: !!p.cancel });
      newIdx = items.length - 1;
    }
    render(newIdx);
  }

  var timer;
  function start() { if (!timer) timer = setInterval(tick, 1600); }
  function stop() { clearInterval(timer); timer = null; }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }).observe(ul);
  } else { start(); }
})();
