/* Funcionalidades (bento): as demos dentro dos cards.
   Tudo só anda com a seção na tela. Conteúdo de exemplo, sem dados reais de cliente. */
(() => {
  const bn = document.querySelector('[data-bn]');
  if (!bn) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let live = false;
  new IntersectionObserver(([e]) => { live = e.isIntersecting; bn.classList.toggle('is-live', live); }, { threshold: 0.1 }).observe(bn);
  const idle = () => !live || document.hidden;
  const enter = (el) => { el.classList.add('enter'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove('enter'))); };
  const every = (ms, fn) => setInterval(() => { if (!idle()) fn(); }, ms);
  const now = () => new Date().toTimeString().slice(0, 8);
  const TK = '<svg class="bn-tk" viewBox="0 0 18 11"><path d="M1 6l3.2 3.2L11 2"/><path d="M7.2 9.2 7.6 9.6 15 2"/></svg>';

  /* 01 envio: conversa dos dois lados; a loja (pela API) manda cada tipo de mensagem */
  const chat = bn.querySelector('[data-bn-chat]');
  const route = bn.querySelector('[data-bn-route]');
  const MSGS = [
    ['in', null, 'Oi! Meu pedido já saiu?'],
    ['out', 'text', 'Saiu sim, Carla! Pedido #4821 a caminho.'],
    ['in', null, 'Pode mandar a nota fiscal?'],
    ['out', 'document', '<span class="bn-doc"><i>PDF</i><span>nota-fiscal-4821.pdf<small>84 KB</small></span></span>'],
    ['out', 'image', '<span class="bn-img"><span class="bn-box"><i></i></span></span><span class="bn-cap">foto-pedido.jpg · 240 KB</span>'],
    ['out', 'location', '<span class="bn-map"><i></i></span><span class="bn-cap">Local da entrega</span>'],
    ['in', null, 'Perfeito, obrigada!'],
    ['out', 'reaction', null],
    ['out', 'audio', '<span class="bn-aud"><i class="pl"></i><span class="wv">' + '<i></i>'.repeat(18) + '</span><small>0:09</small></span>'],
  ];
  let mi = 0, min = 2;
  function sendNext(quiet) {
    const [side, type, html] = MSGS[mi % MSGS.length];
    if (type) route.innerHTML = `<b>POST</b> /messages/${type}`;
    if (type === 'reaction') {
      const lastIn = [...chat.querySelectorAll('.bn-b.in')].pop();
      if (lastIn && !lastIn.querySelector('.bn-react')) { const r = document.createElement('span'); r.className = 'bn-react'; r.textContent = '♥'; lastIn.appendChild(r); if (!quiet) enter(r); }
    } else {
      const b = document.createElement('div');
      b.className = `bn-b ${side}`;
      const t = `14:${String(min++ % 60).padStart(2, '0')}`;
      b.innerHTML = side === 'out' ? `${html}<time>${t} ${TK}</time>` : `${html}<time>${t}</time>`;
      const put = () => {
        chat.appendChild(b);
        if (!quiet) { enter(b); setTimeout(() => b.classList.add('is-read'), 900); } else b.classList.add('is-read');
        while (chat.children.length > 6) chat.firstElementChild.remove();
      };
      if (!quiet && side === 'out') {
        const ty = document.createElement('div');
        ty.className = 'bn-b out bn-typing'; ty.innerHTML = '<i></i><i></i><i></i>';
        chat.appendChild(ty); enter(ty);
        setTimeout(() => { ty.remove(); put(); }, 750);
      } else put();
    }
    mi++;
  }
  for (let k = 0; k < 4; k++) sendNext(true);

  /* 02 instâncias: contadores sobem; uma volta a conectar e outra cai depois */
  const inst = bn.querySelector('[data-bn-inst]');
  const counts = [...inst.querySelectorAll('[data-c]')];
  const rows = [...inst.children];
  let tick = 0;
  function instStep() {
    counts.forEach((c) => { if (Math.random() < 0.6) c.textContent = (parseInt(c.textContent.replace('.', ''), 10) + 1).toLocaleString('pt-BR'); });
    tick++;
    if (tick % 8 === 4) { const r = rows[2]; r.dataset.s = 'on'; r.querySelector('em').innerHTML = '<span data-c>45</span> msgs'; }
    if (tick % 8 === 0) { const r = rows[2]; r.dataset.s = 'retry'; r.querySelector('em').textContent = 'reconectando'; }
  }

  /* 03 webhooks: eventos chegando no terminal */
  const term = bn.querySelector('[data-bn-term]');
  const EV = ['message.received', 'message.delivered', 'message.read', 'message.sent', 'connection.update', 'message.received'];
  let ei = 0;
  function hookStep() {
    const li = document.createElement('li');
    li.innerHTML = `<time>${now()}</time><b>${EV[ei++ % EV.length]}</b><em>✓ assinado</em>`;
    term.appendChild(li); enter(li);
    while (term.children.length > 6) term.firstElementChild.remove();
  }
  for (let k = 0; k < 4; k++) hookStep();

  /* 05 fila: pendente -> processando -> enviado; às vezes uma repetida é ignorada */
  const cols = [0, 1, 2].map((k) => bn.querySelector(`[data-bn-q="${k}"]`));
  let qn = 7240;
  const item = (id, note = '', cls = '') => { const li = document.createElement('li'); li.dataset.id = id; if (cls) li.className = cls; li.innerHTML = `msg_${id}${note ? `<small>${note}</small>` : ''}`; return li; };
  [0, 1, 2].forEach(() => cols[0].appendChild(item(qn++)));
  cols[1].appendChild(item(qn++));
  cols[2].appendChild(item(qn++, '✓'));
  let qt = 0;
  function queueStep() {
    qt++;
    // processando -> enviado
    const p = cols[1].firstElementChild;
    if (p) { p.remove(); const done = item(p.dataset.id, '✓'); cols[2].prepend(done); enter(done); }
    while (cols[2].children.length > 4) cols[2].lastElementChild.remove();
    // pendente -> processando (a repetida some sem ir adiante)
    let n = cols[0].firstElementChild;
    while (n && n.classList.contains('dup')) { n.remove(); n = cols[0].firstElementChild; }
    if (n) { n.remove(); const pr = item(n.dataset.id); cols[1].appendChild(pr); enter(pr); }
    // entra uma nova; a cada 4, uma chamada repetida é reconhecida
    const fresh = qt % 4 === 0 ? item(qn - 1, 'duplicada', 'dup') : item(qn++);
    cols[0].appendChild(fresh); enter(fresh);
  }

  /* 06 reconexão */
  const rec = bn.querySelector('[data-bn-rec]');
  const recT = bn.querySelector('[data-bn-rec-t]');
  const recEv = bn.querySelector('[data-bn-rec-ev]');
  const SEQ = [['on', 'conectado', 'connection.open', 5], ['off', 'conexão perdida', 'instance.disconnected', 2], ['retry', 'tentando em 1 s', 'instance.disconnected', 1], ['retry', 'tentando em 2 s', 'instance.disconnected', 1], ['retry', 'tentando em 4 s', 'instance.disconnected', 2]];
  let rs = 0, rc = 0;
  const tries = [...bn.querySelectorAll('[data-bn-tries] li')];
  function recStep() {
    const [st, t, ev, len] = SEQ[rs];
    rec.dataset.s = st; recT.textContent = t; recEv.textContent = ev;
    const lit = st === 'on' ? 4 : rs - 1; // 1 s, 2 s, 4 s, ok
    tries.forEach((li, k) => li.classList.toggle('on', k < lit));
    if (++rc >= len) { rc = 0; rs = (rs + 1) % SEQ.length; }
  }

  /* 08 monitoramento: barras andam, números mudam */
  const bars = [...bn.querySelectorAll('[data-bn-chart] i')];
  const kq = bn.querySelector('[data-bn-kq]'), km = bn.querySelector('[data-bn-km]');
  let hs = bars.map((_, k) => 0.35 + 0.35 * Math.abs(Math.sin(k * 0.6)));
  const paint = () => bars.forEach((b, k) => b.style.setProperty('--h', hs[k].toFixed(2)));
  paint();
  function monStep() {
    const last = hs[hs.length - 1];
    hs = hs.slice(1).concat(Math.min(0.95, Math.max(0.15, last + (Math.random() - 0.5) * 0.35)));
    paint();
    km.textContent = String(Math.round(60 + hs[hs.length - 1] * 60));
    kq.textContent = String(Math.max(0, Math.round(4 + Math.random() * 14)));
  }

  if (reduce) return;
  every(2200, sendNext);
  every(1100, instStep);
  every(1500, hookStep);
  every(1400, queueStep);
  every(900, recStep);
  every(900, monStep);
})();

/* Abas: lista à esquerda, demonstração da escolhida à direita.
   Avança sozinho enquanto a pessoa não mexe; clique, teclado ou passar o mouse param o avanço. */
(() => {
  const bt = document.querySelector('.bt');
  if (!bt) return;
  const tabs = [...bt.querySelectorAll('[data-bt]')];
  const panes = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MS = 6500;
  bt.style.setProperty('--bt-ms', `${MS}ms`);
  let cur = 0, auto = !reduce, timer = 0, visible = false, hover = false;

  function show(i, focus) {
    cur = (i + tabs.length) % tabs.length;
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === cur ? 'true' : 'false'); t.tabIndex = k === cur ? 0 : -1; });
    panes.forEach((p, k) => { p.hidden = k !== cur; });
    const ttl = bt.querySelector('[data-bt-title]'); if (ttl) ttl.textContent = tabs[cur].querySelector('.bt-h').textContent;
    if (focus) tabs[cur].focus();
    // reinicia a barrinha
    const bar = tabs[cur].querySelector('.bt-prog'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    bt.classList.toggle('is-auto', auto && visible && !hover);
    if (!auto || !visible || hover) return;
    timer = setTimeout(() => show(cur + 1), MS);
  }
  tabs.forEach((t, k) => t.addEventListener('click', () => { auto = false; show(k); }));
  bt.querySelector('.bt-list').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); auto = false; show(cur + 1, true); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); auto = false; show(cur - 1, true); }
  });
  bt.addEventListener('pointerenter', () => { hover = true; schedule(); });
  bt.addEventListener('pointerleave', () => { hover = false; schedule(); });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; schedule(); }, { threshold: 0.3 }).observe(bt);
  show(0);
})();
